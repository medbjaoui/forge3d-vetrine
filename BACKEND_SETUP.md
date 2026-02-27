# 🚀 Forge3D Backend - Guide de déploiement

## Architecture complète

```
┌─────────────────────────────────────────────────────────────────┐
│                        FORGE3D PLATFORM                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐      ┌──────────────┐      ┌──────────────┐ │
│  │   Frontend   │──────│   Backend    │──────│  PostgreSQL  │ │
│  │   (Nginx)    │ API  │  (Node.js)   │ SQL  │   Database   │ │
│  │   Port 80    │      │  Port 3001   │      │   Port 5432  │ │
│  └──────────────┘      └──────────────┘      └──────────────┘ │
│         │                     │                       │         │
│         │                     ├── SMTP (Nodemailer) ──┤         │
│         │                     │   pro3.mail.ovh.net   │         │
│         │                     └───────────────────────┘         │
│         │                                                       │
│         └─── Cloudflare Tunnel (cloudflarenet) ────────────────┤
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## ✨ Fonctionnalités

### Backend API
- ✅ Formulaire de contact avec envoi SMTP
- ✅ Enregistrement des demandes en base PostgreSQL
- ✅ Gestion des témoignages clients
- ✅ Avis et reviews avec notation
- ✅ Journal des emails envoyés
- ✅ Statistiques et analytics
- ✅ Rate limiting anti-spam
- ✅ Validation des données

### Base de données
- ✅ **contact_requests** : Toutes les demandes de contact
- ✅ **testimonials** : Témoignages clients (avec modération)
- ✅ **email_logs** : Journal de tous les emails
- ✅ **client_reviews** : Avis détaillés avec notes

## 📦 Démarrage rapide

### 1. Configuration des variables d'environnement

Éditer `.env` à la racine du projet :

```bash
# Base de données
DB_PASSWORD=VotreMotDePasseSécurisé123!

# SMTP OVH
SMTP_HOST=pro3.mail.ovh.net
SMTP_PORT=587
SMTP_USER=contact@forge3d.tech
SMTP_PASSWORD=VotreMotDePasseSMTP
SMTP_FROM=contact@forge3d.tech
SMTP_TO=contact@forge3d.tech
```

### 2. Démarrer les services

```bash
# Build et démarrer tous les containers
sudo docker compose up -d --build

# Voir les logs en temps réel
sudo docker compose logs -f

# Voir seulement les logs du backend
sudo docker compose logs -f backend

# Voir les logs de PostgreSQL
sudo docker compose logs -f postgres
```

### 3. Vérifier le fonctionnement

```bash
# Vérifier les containers
sudo docker compose ps

# Test de santé du backend
curl http://localhost:3001/health

# Test de santé du frontend (via Nginx)
curl http://localhost/health
```

## 📡 API Endpoints

### Public

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/contact` | Envoyer une demande de contact |
| GET | `/api/testimonials` | Récupérer les témoignages approuvés |
| POST | `/api/testimonials` | Soumettre un témoignage |

### Admin (à sécuriser)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/contacts` | Lister toutes les demandes |
| GET | `/api/stats` | Statistiques globales |

## 🔍 Exemple d'utilisation de l'API

### Envoyer un contact

```bash
curl -X POST http://localhost/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jean Dupont",
    "company": "Acme Corp",
    "email": "jean@acme.com",
    "phone": "+216 12 345 678",
    "subject": "Infrastructure IT & Cloud",
    "message": "Nous souhaitons migrer vers Office 365..."
  }'
```

**Réponse** :
```json
{
  "success": true,
  "message": "Votre demande a été envoyée avec succès. Nous vous répondrons sous 24h.",
  "contactId": 42
}
```

### Récupérer les témoignages

```bash
curl http://localhost/api/testimonials
```

## 🗄️ Accéder à la base de données

### Via Docker

```bash
# Se connecter à PostgreSQL
sudo docker exec -it forge3d-postgres psql -U forge3d -d forge3d

# Lister les tables
\dt

# Voir les dernières demandes
SELECT id, name, email, subject, created_at FROM contact_requests ORDER BY created_at DESC LIMIT 10;

# Voir les témoignages
SELECT id, name, company, rating, status FROM testimonials;

# Quitter
\q
```

### Requêtes utiles

```sql
-- Statistiques des demandes
SELECT * FROM contact_stats;

-- Demandes par statut
SELECT status, COUNT(*) FROM contact_requests GROUP BY status;

-- Témoignages par note
SELECT rating, COUNT(*) FROM testimonials GROUP BY rating ORDER BY rating DESC;

-- Emails envoyés/échoués
SELECT status, COUNT(*) FROM email_logs GROUP BY status;

-- Dernières demandes (7 derniers jours)
SELECT name, email, subject, created_at
FROM contact_requests
WHERE created_at >= NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

## 🔧 Maintenance

### Sauvegarder la base de données

```bash
# Backup complet
sudo docker exec forge3d-postgres pg_dump -U forge3d forge3d > backup_$(date +%Y%m%d).sql

# Backup avec compression
sudo docker exec forge3d-postgres pg_dump -U forge3d forge3d | gzip > backup_$(date +%Y%m%d).sql.gz
```

### Restaurer une sauvegarde

```bash
# Restaurer depuis un backup
sudo docker exec -i forge3d-postgres psql -U forge3d forge3d < backup_20260227.sql
```

### Nettoyer les anciennes demandes

```sql
-- Archiver les demandes résolues de plus de 6 mois
UPDATE contact_requests
SET status = 'archived'
WHERE status = 'resolved'
AND created_at < NOW() - INTERVAL '6 months';
```

## 📊 Monitoring

### Logs des emails

```sql
-- Voir les emails échoués
SELECT * FROM email_logs WHERE status = 'failed' ORDER BY created_at DESC;

-- Taux de succès d'envoi
SELECT
    status,
    COUNT(*) as total,
    ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 2) as percentage
FROM email_logs
GROUP BY status;
```

### Statistiques de performance

```sql
-- Demandes par jour (derniers 30 jours)
SELECT
    DATE(created_at) as date,
    COUNT(*) as requests
FROM contact_requests
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Sujets les plus demandés
SELECT subject, COUNT(*) as total
FROM contact_requests
GROUP BY subject
ORDER BY total DESC;
```

## 🐛 Dépannage

### Le backend ne démarre pas

```bash
# Vérifier les logs
sudo docker compose logs backend

# Vérifier que PostgreSQL est prêt
sudo docker compose logs postgres | grep "ready"

# Redémarrer le backend seul
sudo docker compose restart backend
```

### Les emails ne partent pas

```bash
# Vérifier la configuration SMTP dans les logs
sudo docker compose logs backend | grep SMTP

# Tester la connexion SMTP depuis le container
sudo docker exec -it forge3d-backend node -e "
const nodemailer = require('nodemailer');
const t = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
});
t.verify().then(console.log).catch(console.error);
"
```

### Problèmes de connexion à la DB

```bash
# Vérifier que PostgreSQL écoute
sudo docker exec forge3d-postgres pg_isready -U forge3d

# Vérifier les connexions actives
sudo docker exec forge3d-postgres psql -U forge3d -d forge3d -c "SELECT count(*) FROM pg_stat_activity;"
```

## 🔐 Sécurité

### Recommandations

1. ✅ **Variables sensibles** : Ne jamais committer `.env`
2. ✅ **Mot de passe DB** : Utiliser un mot de passe fort (> 20 caractères)
3. ✅ **Rate limiting** : Déjà activé (10 req/15min par IP)
4. ✅ **HTTPS** : Utiliser Cloudflare Tunnel (déjà configuré)
5. ⚠️ **Routes admin** : Ajouter authentification JWT (à implémenter)

### Ajouter une authentification admin (TODO)

Pour sécuriser les endpoints `/api/contacts` et `/api/stats`, ajouter :

```javascript
// middleware/auth.js
import jwt from 'jsonwebtoken';

export const authenticateAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Non autorisé' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ error: 'Token invalide' });
  }
};
```

## 📞 Support

- Documentation complète : `/BACKEND_SETUP.md`
- Problème SMTP : Vérifier les identifiants OVH
- Problème DB : Vérifier `DB_PASSWORD` dans `.env`
- Contact : contact@forge3d.tech

---

**Version** : 1.0.0
**Dernière mise à jour** : 2026-02-27
