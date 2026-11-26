import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { body, validationResult } from 'express-validator';
import pkg from 'nodemailer';
const { createTransport } = pkg;
import pg from 'pg';
import dotenv from 'dotenv';
import { createHash } from 'node:crypto';

// Only load .env in development (Docker Compose provides env vars in production)
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const app = express();
const PORT = process.env.PORT || 3001;

// ══════════════════════════════════════════════════════════════════════════════
// DATABASE CONNECTION
// ══════════════════════════════════════════════════════════════════════════════

const { Pool } = pg;
console.log('🔐 DB_PASSWORD from env:', process.env.DB_PASSWORD ? '✅ Set' : '❌ Not set');
console.log('🔐 DB_HOST value:', process.env.DB_HOST || 'postgres');
const poolConfig = {
  host: process.env.DB_HOST || 'postgres',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'forge3d',
  user: process.env.DB_USER || 'forge3d',
  password: process.env.DB_PASSWORD || 'forge3d_password',
};
const pool = new Pool(poolConfig);
const VIGIPARC_CENTRAL_URL = process.env.VIGIPARC_CENTRAL_URL || 'http://vigiparc-central:8000/api/v1/prospects';

const initialiserFileVigiParc = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS vigiparc_prospect_queue (
      id BIGSERIAL PRIMARY KEY,
      dedupe_key CHAR(64) UNIQUE NOT NULL,
      payload JSONB NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'pending',
      attempts INTEGER NOT NULL DEFAULT 0,
      next_attempt_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      last_error_code VARCHAR(40),
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      delivered_at TIMESTAMPTZ
    );
    CREATE INDEX IF NOT EXISTS idx_vigiparc_queue_due
      ON vigiparc_prospect_queue(status, next_attempt_at);
  `);
};

const empreinteProspect = (payload) => createHash('sha256').update(JSON.stringify({
  nom: payload.nom.trim().toLowerCase(),
  organisation: payload.organisation.trim().toLowerCase(),
  email: payload.email.trim().toLowerCase(),
  telephone: payload.telephone || null,
  postes: payload.postes,
  message: payload.message || null,
  jour: new Date().toISOString().slice(0, 10),
})).digest('hex');

const transmettreACentral = async (payload) => {
  const response = await fetch(VIGIPARC_CENTRAL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(8_000),
  });
  if (response.ok) return;
  const error = new Error(`central_${response.status}`);
  error.status = response.status;
  throw error;
};

const mettreEnAttente = async (payload, code = 'unavailable') => {
  const result = await pool.query(
    `INSERT INTO vigiparc_prospect_queue (dedupe_key, payload, last_error_code)
     VALUES ($1, $2::jsonb, $3)
     ON CONFLICT (dedupe_key) DO UPDATE SET updated_at = NOW()
     RETURNING id`,
    [empreinteProspect(payload), JSON.stringify(payload), String(code).slice(0, 40)]
  );
  return result.rows[0].id;
};

const notifierProspect = async (payload, queued) => {
  if (!process.env.SMTP_PASSWORD) return;
  const etat = queued ? 'mise en attente et sera transmise automatiquement' : 'transmise à notre équipe';
  await Promise.allSettled([
    transporter.sendMail({
      from: `"VigiParc" <${process.env.SMTP_FROM || 'contact@forge3d.tech'}>`,
      to: process.env.SMTP_TO || 'contact@forge3d.tech',
      replyTo: payload.email,
      subject: `Nouvelle demande VigiParc — ${payload.organisation}`,
      text: `Une demande VigiParc a été ${etat}.\nOrganisation : ${payload.organisation}\nContact : ${payload.nom}\nE-mail : ${payload.email}\nParc : ${payload.postes}\n`,
    }),
    transporter.sendMail({
      from: `"VigiParc" <${process.env.SMTP_FROM || 'contact@forge3d.tech'}>`,
      to: payload.email,
      subject: 'Votre demande VigiParc a bien été reçue',
      text: `Bonjour ${payload.nom},\n\nVotre demande VigiParc a bien été reçue et ${etat}. Forge 3D reviendra vers vous pour préciser le périmètre.\n\nForge 3D`,
    }),
  ]);
};

// Test connexion DB
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('❌ Database connection error:', err);
  } else {
    console.log('✅ Database connected:', res.rows[0].now);
  }
});

// ══════════════════════════════════════════════════════════════════════════════
// SMTP TRANSPORTER
// ══════════════════════════════════════════════════════════════════════════════

const transporter = createTransport({
  host: process.env.SMTP_HOST || 'pro3.mail.ovh.net',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER || 'contact@forge3d.tech',
    pass: process.env.SMTP_PASSWORD,
  },
});

// Vérifier la connexion SMTP
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP connection error:', error);
  } else {
    console.log('✅ SMTP server ready to send emails');
  }
});

// ══════════════════════════════════════════════════════════════════════════════
// MIDDLEWARE
// ══════════════════════════════════════════════════════════════════════════════

// Trust proxy - Important pour récupérer la vraie IP du client derrière Nginx
app.set('trust proxy', true);

app.use(helmet());
const allowedOrigins = new Set(
  (process.env.CORS_ORIGIN || 'https://forge3d.tech,https://www.forge3d.tech')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.has(origin)) return callback(null, true);
    return callback(new Error('Origin not allowed'));
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // 10 requêtes max par IP
  message: 'Trop de requêtes depuis cette IP, réessayez dans 15 minutes.',
});

// ══════════════════════════════════════════════════════════════════════════════
// ROUTES
// ══════════════════════════════════════════════════════════════════════════════

// ── Health check ──────────────────────────────────────────────────────────────

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ── POST /api/v1/vigiparc-prospects ─────────────────────────────────────────
// Point d'entrée durable : transmission directe à Central, sinon file PostgreSQL.

const validationProspectVigiParc = [
  body('nom').trim().isLength({ min: 2, max: 160 }),
  body('fonction').trim().isLength({ min: 2, max: 160 }),
  body('organisation').trim().isLength({ min: 2, max: 200 }),
  body('email').isEmail().normalizeEmail().isLength({ max: 254 }),
  body('telephone').optional({ nullable: true }).trim().isLength({ max: 40 }),
  body('postes').isIn(['<20', '20-50', '50-150', '150-500', '>500']),
  body('message').optional({ nullable: true }).trim().isLength({ max: 4000 }),
  body('consentement').equals('true'),
  body('piege').optional().isLength({ max: 200 }),
  body('duree_saisie_ms').isInt({ min: 0, max: 86_400_000 }),
];

app.post('/api/v1/vigiparc-prospects', limiter, validationProspectVigiParc, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ ok: false, error: 'invalid_request' });

  const payload = {
    nom: req.body.nom,
    fonction: req.body.fonction,
    organisation: req.body.organisation,
    email: req.body.email,
    telephone: req.body.telephone || null,
    postes: req.body.postes,
    message: req.body.message || null,
    consentement: true,
    piege: req.body.piege || '',
    duree_saisie_ms: Number(req.body.duree_saisie_ms),
  };

  // Le pot de miel et le temps minimal conservent une réponse neutre.
  if (payload.piege || payload.duree_saisie_ms < 3_000) return res.status(202).json({ ok: true, queued: false });

  try {
    await transmettreACentral(payload);
    void notifierProspect(payload, false);
    return res.status(202).json({ ok: true, queued: false });
  } catch (error) {
    if (error.status && error.status >= 400 && error.status < 500 && error.status !== 429) {
      return res.status(error.status).json({ ok: false, error: 'central_rejected' });
    }
    const queueId = await mettreEnAttente(payload, error.status ? `central_${error.status}` : 'central_unavailable');
    console.warn(`VigiParc prospect queued: ${queueId}`);
    void notifierProspect(payload, true);
    return res.status(202).json({ ok: true, queued: true });
  }
});

// ── POST /api/contact ─────────────────────────────────────────────────────────
// Recevoir une demande de contact

app.post(
  '/api/contact',
  limiter,
  [
    body('name').trim().notEmpty().withMessage('Le nom est requis'),
    body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
    body('phone').optional().trim(),
    body('company').optional().trim(),
    body('subject').trim().notEmpty().withMessage('Le sujet est requis'),
    body('message').trim().notEmpty().withMessage('Le message est requis'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, company, email, phone, subject, message } = req.body;

    // Récupérer la vraie IP du client (en tenant compte des proxies)
    const ipAddress = req.headers['x-forwarded-for']?.split(',')[0].trim() ||
                      req.headers['x-real-ip'] ||
                      req.ip ||
                      req.connection.remoteAddress;

    const userAgent = req.get('User-Agent');

    let contactId;
    let mailOptions;

    try {
      // 1. Enregistrer dans la base de données
      const result = await pool.query(
        `INSERT INTO contact_requests (name, company, email, phone, subject, message, ip_address, user_agent)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
         RETURNING id`,
        [name, company, email, phone, subject, message, ipAddress, userAgent]
      );

      contactId = result.rows[0].id;

      // 2. Préparer et envoyer l'email
      const emailBody = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NOUVELLE DEMANDE DE CONTACT - FORGE3D
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 INFORMATIONS DU CLIENT

Nom          : ${name}
Entreprise   : ${company || 'Non renseignée'}
Email        : ${email}
Téléphone    : ${phone || 'Non renseigné'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 SUJET : ${subject}

💬 MESSAGE :

${message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 MÉTADONNÉES

ID Demande   : #${contactId}
Date/Heure   : ${new Date().toLocaleString('fr-FR', { timeZone: 'Africa/Tunis' })}
IP Adresse   : ${ipAddress}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ce message a été envoyé depuis le formulaire de contact de www.forge3d.tech

🔗 Voir dans l'admin : http://admin.forge3d.tech/contacts/${contactId}
      `;

      mailOptions = {
        from: `"Forge3D Contact Form" <${process.env.SMTP_FROM || 'contact@forge3d.tech'}>`,
        to: process.env.SMTP_TO || 'contact@forge3d.tech',
        replyTo: email,
        subject: `Nouveau contact: ${subject} - ${name}`,
        text: emailBody,
      };

      await transporter.sendMail(mailOptions);

      // 3. Logger l'envoi d'email
      await pool.query(
        `INSERT INTO email_logs (contact_request_id, to_email, from_email, subject, body, status, sent_at)
         VALUES ($1, $2, $3, $4, $5, $6, NOW())`,
        [contactId, mailOptions.to, email, mailOptions.subject, emailBody, 'sent']
      );

      res.json({
        success: true,
        message: 'Votre demande a été envoyée avec succès. Nous vous répondrons sous 24h.',
        contactId,
      });
    } catch (error) {
      console.error('Error processing contact:', error);

      // Logger l'échec d'envoi
      if (contactId && mailOptions) {
        await pool.query(
          `INSERT INTO email_logs (contact_request_id, to_email, from_email, subject, status, error_message)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [contactId, mailOptions.to, email, mailOptions.subject, 'failed', error.message]
        );
      }

      res.status(500).json({
        success: false,
        message: 'Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement.',
      });
    }
  }
);

// ── GET /api/contacts ─────────────────────────────────────────────────────────
// Lister toutes les demandes de contact (admin)

app.get('/api/contacts', async (req, res) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query;

    let query = 'SELECT * FROM contact_requests';
    const params = [];

    if (status) {
      query += ' WHERE status = $1';
      params.push(status);
    }

    query += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(limit, offset);

    const result = await pool.query(query, params);

    res.json({
      success: true,
      total: result.rowCount,
      contacts: result.rows,
    });
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// ── GET /api/testimonials ─────────────────────────────────────────────────────
// Récupérer les témoignages approuvés

app.get('/api/testimonials', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, name, role, company, sector, rating, quote, avatar, avatar_color
       FROM testimonials
       WHERE status = 'approved' AND is_featured = true
       ORDER BY created_at DESC
       LIMIT 10`
    );

    res.json({
      success: true,
      testimonials: result.rows,
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

// ── POST /api/testimonials ────────────────────────────────────────────────────
// Soumettre un témoignage (en attente de modération)

app.post(
  '/api/testimonials',
  limiter,
  [
    body('name').trim().notEmpty(),
    body('company').trim().notEmpty(),
    body('rating').isInt({ min: 1, max: 5 }),
    body('quote').trim().notEmpty().isLength({ min: 20, max: 500 }),
    body('email').optional().isEmail(),
    body('role').optional().trim(),
    body('sector').optional().trim(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { name, role, company, sector, email, rating, quote } = req.body;

    // Générer avatar (initiales)
    const avatar = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    const colors = [
      'from-blue-600 to-blue-800',
      'from-green-600 to-green-800',
      'from-purple-600 to-purple-800',
      'from-orange-600 to-orange-800',
    ];
    const avatarColor = colors[Math.floor(Math.random() * colors.length)];

    try {
      const result = await pool.query(
        `INSERT INTO testimonials (name, role, company, sector, email, rating, quote, avatar, avatar_color, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, 'pending')
         RETURNING id`,
        [name, role, company, sector, email, rating, quote, avatar, avatarColor]
      );

      res.json({
        success: true,
        message: 'Merci pour votre témoignage ! Il sera publié après validation.',
        testimonialId: result.rows[0].id,
      });
    } catch (error) {
      console.error('Error creating testimonial:', error);
      res.status(500).json({ success: false, message: 'Erreur serveur' });
    }
  }
);

// ── GET /api/stats ────────────────────────────────────────────────────────────
// Statistiques (admin)

app.get('/api/stats', async (req, res) => {
  try {
    const contactStats = await pool.query('SELECT * FROM contact_stats');
    const emailStats = await pool.query(
      `SELECT status, COUNT(*) as count FROM email_logs GROUP BY status`
    );
    const testimonialStats = await pool.query(
      `SELECT status, COUNT(*) as count FROM testimonials GROUP BY status`
    );

    res.json({
      success: true,
      stats: {
        contacts: contactStats.rows[0],
        emails: emailStats.rows,
        testimonials: testimonialStats.rows,
      },
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, message: 'Erreur serveur' });
  }
});

const retraiterFileVigiParc = async () => {
  await pool.query(
    `UPDATE vigiparc_prospect_queue
     SET status = 'pending', next_attempt_at = NOW(), updated_at = NOW(), last_error_code = 'worker_recovered'
     WHERE status = 'processing' AND updated_at < NOW() - INTERVAL '15 minutes'`
  );
  const { rows } = await pool.query(
    `WITH due AS (
       SELECT id
       FROM vigiparc_prospect_queue
       WHERE status = 'pending' AND next_attempt_at <= NOW()
       ORDER BY created_at ASC
       FOR UPDATE SKIP LOCKED
       LIMIT 20
     )
     UPDATE vigiparc_prospect_queue AS queue
     SET status = 'processing', updated_at = NOW()
     FROM due
     WHERE queue.id = due.id
     RETURNING queue.id, queue.payload, queue.attempts`
  );
  for (const item of rows) {
    try {
      await transmettreACentral(item.payload);
      await pool.query(
        `UPDATE vigiparc_prospect_queue
         SET status = 'delivered', payload = '{}'::jsonb, delivered_at = NOW(), updated_at = NOW(), last_error_code = NULL
         WHERE id = $1`,
        [item.id]
      );
      console.info(`VigiParc prospect delivered: ${item.id}`);
    } catch (error) {
      const attempts = item.attempts + 1;
      const delayMinutes = Math.min(360, 2 ** Math.min(attempts, 8));
      await pool.query(
        `UPDATE vigiparc_prospect_queue
         SET status = 'pending',
             attempts = $2,
             next_attempt_at = NOW() + ($3 * INTERVAL '1 minute'),
             updated_at = NOW(),
             last_error_code = $4
         WHERE id = $1`,
        [item.id, attempts, delayMinutes, error.status ? `central_${error.status}` : 'central_unavailable']
      );
    }
  }
};

// ══════════════════════════════════════════════════════════════════════════════
// ERROR HANDLING
// ══════════════════════════════════════════════════════════════════════════════

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route non trouvée' });
});

app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ success: false, message: 'Erreur interne du serveur' });
});

// ══════════════════════════════════════════════════════════════════════════════
// START SERVER
// ══════════════════════════════════════════════════════════════════════════════

const demarrer = async () => {
  await initialiserFileVigiParc();
  await retraiterFileVigiParc();
  setInterval(() => void retraiterFileVigiParc().catch((error) => console.error('VigiParc queue worker failed:', error.message)), 60_000).unref();
  app.listen(PORT, '0.0.0.0', () => {
  console.log(`
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   🚀 FORGE3D BACKEND API                                      ║
║                                                               ║
║   📡 Server running on port ${PORT}                             ║
║   🗄️  Database: PostgreSQL                                    ║
║   📧 SMTP: ${process.env.SMTP_HOST || 'pro3.mail.ovh.net'}                               ║
║   🌐 Environment: ${process.env.NODE_ENV || 'development'}                          ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
  `);
  });
};

demarrer().catch((error) => {
  console.error('Backend startup failed:', error.message);
  process.exit(1);
});
