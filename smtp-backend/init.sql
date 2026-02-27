-- ══════════════════════════════════════════════════════════════════════════════
-- FORGE3D DATABASE SCHEMA
-- ══════════════════════════════════════════════════════════════════════════════

-- ── Table: contact_requests ───────────────────────────────────────────────────
-- Stocke toutes les demandes de contact depuis le formulaire

CREATE TABLE IF NOT EXISTS contact_requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'new',
    -- Statuts possibles: 'new', 'read', 'in_progress', 'resolved', 'archived'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT,
    -- Métadonnées
    notes TEXT,
    assigned_to VARCHAR(255)
);

-- Index pour performances
CREATE INDEX idx_contact_status ON contact_requests(status);
CREATE INDEX idx_contact_created ON contact_requests(created_at DESC);
CREATE INDEX idx_contact_email ON contact_requests(email);

-- ── Table: testimonials ───────────────────────────────────────────────────────
-- Stocke les témoignages clients (avec modération)

CREATE TABLE IF NOT EXISTS testimonials (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    company VARCHAR(255) NOT NULL,
    sector VARCHAR(255),
    email VARCHAR(255),
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    quote TEXT NOT NULL,
    avatar VARCHAR(10),
    -- Initiales (ex: 'MB')
    avatar_color VARCHAR(50),
    -- Gradient CSS
    status VARCHAR(50) DEFAULT 'pending',
    -- Statuts: 'pending', 'approved', 'rejected', 'archived'
    is_featured BOOLEAN DEFAULT FALSE,
    -- Afficher sur homepage?
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP,
    approved_by VARCHAR(255)
);

-- Index
CREATE INDEX idx_testimonials_status ON testimonials(status);
CREATE INDEX idx_testimonials_featured ON testimonials(is_featured);
CREATE INDEX idx_testimonials_rating ON testimonials(rating DESC);

-- ── Table: email_logs ─────────────────────────────────────────────────────────
-- Journal de tous les emails envoyés

CREATE TABLE IF NOT EXISTS email_logs (
    id SERIAL PRIMARY KEY,
    contact_request_id INTEGER REFERENCES contact_requests(id) ON DELETE SET NULL,
    to_email VARCHAR(255) NOT NULL,
    from_email VARCHAR(255) NOT NULL,
    subject VARCHAR(500) NOT NULL,
    body TEXT,
    status VARCHAR(50) DEFAULT 'pending',
    -- Statuts: 'pending', 'sent', 'failed', 'bounced'
    error_message TEXT,
    sent_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index
CREATE INDEX idx_email_status ON email_logs(status);
CREATE INDEX idx_email_contact ON email_logs(contact_request_id);

-- ── Table: client_reviews ─────────────────────────────────────────────────────
-- Avis clients détaillés (pour analyse et amélioration)

CREATE TABLE IF NOT EXISTS client_reviews (
    id SERIAL PRIMARY KEY,
    contact_request_id INTEGER REFERENCES contact_requests(id) ON DELETE SET NULL,
    client_name VARCHAR(255),
    client_email VARCHAR(255),
    service_type VARCHAR(255),
    -- 'IT', '3D', 'Both'
    rating_quality INTEGER CHECK (rating_quality >= 1 AND rating_quality <= 5),
    rating_speed INTEGER CHECK (rating_speed >= 1 AND rating_speed <= 5),
    rating_communication INTEGER CHECK (rating_communication >= 1 AND rating_communication <= 5),
    rating_price INTEGER CHECK (rating_price >= 1 AND rating_price <= 5),
    overall_rating INTEGER CHECK (overall_rating >= 1 AND overall_rating <= 5),
    comment TEXT,
    would_recommend BOOLEAN,
    is_public BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Index
CREATE INDEX idx_reviews_service ON client_reviews(service_type);
CREATE INDEX idx_reviews_rating ON client_reviews(overall_rating DESC);

-- ── Trigger: mise à jour automatique updated_at ──────────────────────────────

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contact_requests_updated_at BEFORE UPDATE ON contact_requests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON testimonials
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ── Vue: statistiques des demandes ────────────────────────────────────────────

CREATE OR REPLACE VIEW contact_stats AS
SELECT
    COUNT(*) AS total_requests,
    COUNT(*) FILTER (WHERE status = 'new') AS new_requests,
    COUNT(*) FILTER (WHERE status = 'in_progress') AS in_progress,
    COUNT(*) FILTER (WHERE status = 'resolved') AS resolved,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '7 days') AS last_7_days,
    COUNT(*) FILTER (WHERE created_at >= NOW() - INTERVAL '30 days') AS last_30_days
FROM contact_requests;

-- ══════════════════════════════════════════════════════════════════════════════
-- DONNÉES DE TEST (optionnel)
-- ══════════════════════════════════════════════════════════════════════════════

-- Exemple de témoignage approuvé
INSERT INTO testimonials (name, role, company, sector, rating, quote, avatar, avatar_color, status, is_featured, approved_at)
VALUES
    ('Youssef K.', 'DSI', 'Groupe Industriel International', 'Infrastructure IT', 5,
     'Forge3D a sécurisé notre infrastructure sur 3 sites avec une architecture Zero Trust impeccable.',
     'YK', 'from-blue-600 to-blue-800', 'approved', TRUE, NOW()),
    ('Leila B.', 'Responsable IT', 'PME Export', 'Migration Cloud', 5,
     'Migration Office 365 sans aucune interruption pour nos 150 utilisateurs. Nos coûts IT ont baissé de 35%.',
     'LB', 'from-green-600 to-green-800', 'approved', TRUE, NOW());

-- ══════════════════════════════════════════════════════════════════════════════
-- FIN DU SCHEMA
-- ══════════════════════════════════════════════════════════════════════════════
