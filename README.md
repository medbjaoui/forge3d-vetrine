# Forge3D — Site Vitrine

Site institutionnel de **Forge3D** hébergé sur `www.forge3d.tech`.
La boutique e-commerce est disponible séparément sur `shop.forge3d.tech` (projet `ForgeStore_prod`).

---

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Framework | React 18 + TypeScript |
| Bundler | Vite 5 |
| CSS | TailwindCSS 3 |
| Animations | Framer Motion |
| Icônes | Lucide React |
| Formulaire de contact | EmailJS ou Formspree |
| Serveur (prod) | Nginx (Alpine) |
| Containerisation | Docker multi-stage |
| Réseau | `cloudflarenet` (tunnel Cloudflare) |

---

## Structure du projet

```
forge3D-vitrine/
├── public/
│   ├── logo-forge3d.png       # Logo principal
│   ├── favicon.png            # Favicon
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── Header.tsx         # Navigation fixe + menu mobile + LinkedIn CTA
│   │   ├── Hero.tsx           # Section pleine page + stats animés
│   │   ├── Services.tsx       # 6 services en cards
│   │   ├── Portfolio.tsx      # 4 projets avec métriques chiffrées
│   │   ├── About.tsx          # Mission / Vision / Valeurs / Stats
│   │   ├── Testimonials.tsx   # 4 témoignages clients B2B
│   │   ├── Pricing.tsx        # 3 offres (Starter / Pro / Enterprise)
│   │   ├── Contact.tsx        # Formulaire de contact (EmailJS / Formspree)
│   │   ├── Footer.tsx         # Liens, réseaux sociaux, mentions légales
│   │   └── ScrollToTop.tsx    # Bouton retour en haut
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css              # Variables CSS + utilitaires Tailwind
├── Dockerfile                 # Multi-stage: Node build → Nginx serve
├── nginx.conf                 # Gzip, cache, SPA routing, headers sécurité
├── docker-compose.yml         # Service vitrine (réseau cloudflarenet)
├── .env.example               # Variables d'environnement à configurer
└── DEPLOY.md                  # Guide de déploiement détaillé
```

---

## Démarrage rapide

### Développement local

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer les variables d'environnement
cp .env.example .env

# 3. Lancer le serveur de développement
npm run dev
# → http://localhost:3000
```

### Build de production

```bash
npm run build
# → Fichiers statiques dans dist/
```

---

## Variables d'environnement

Copier `.env.example` en `.env` et remplir les valeurs :

```env
# Formulaire de contact – EmailJS (Option A, recommandé)
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxxxx

# Formulaire de contact – Formspree (Option B, fallback)
VITE_FORMSPREE_ID=

# Google Analytics 4 (optionnel)
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Configurer EmailJS (recommandé)

1. Créer un compte gratuit sur [emailjs.com](https://www.emailjs.com)
2. Ajouter un service email (Gmail ou SMTP)
3. Créer un template avec les variables :
   `from_name`, `from_email`, `from_company`, `from_phone`, `subject`, `message`
4. Copier les IDs dans `.env`

### Configurer Formspree (alternative)

1. Créer un compte sur [formspree.io](https://formspree.io)
2. Créer un formulaire avec l'email `contact@forge3d.tech`
3. Copier l'ID du formulaire dans `VITE_FORMSPREE_ID`

---

## Déploiement Docker

### Prérequis

- Docker & Docker Compose installés sur le serveur
- Réseau `cloudflarenet` existant (partagé avec `ForgeStore_prod`)
- Tunnel Cloudflare configuré pour `forge3d.tech` → `http://forge3d-vitrine:80`

### Créer le réseau (une seule fois)

```bash
docker network create cloudflarenet
```

### Démarrer la vitrine

```bash
docker compose up -d --build
```

### Commandes utiles

```bash
# Voir les logs en temps réel
docker compose logs -f vitrine

# Vérifier l'état des containers
docker compose ps

# Redémarrer sans reconstruire
docker compose restart vitrine

# Arrêter et supprimer
docker compose down

# Reconstruire et redémarrer
docker compose up -d --build --force-recreate
```

---

## Architecture de déploiement

```
Internet
    │
    ▼
Cloudflare Tunnel
    ├── forge3d.tech / www.forge3d.tech  ──→  forge3d-vitrine:80   (ce projet)
    └── shop.forge3d.tech                ──→  forge3d_app:5000      (ForgeStore_prod)
                                                      │
                                              Réseau Docker partagé
                                                 cloudflarenet
```

---

## Palette de couleurs

| Nom | Valeur | Usage |
|-----|--------|-------|
| Orange primaire | `#f97316` | CTA, accents, liens actifs |
| Orange foncé | `#ea6c0a` | Hover states |
| Fond sombre | `#0d0f16` | Hero, Contact, Footer |
| Fond sombre 2 | `#13161f` | Cards sombres |
| Fond sombre 3 | `#1a1f2e` | Sections sombres |
| Fond clair | `#f8fafc` | Sections claires |
| Texte principal | `#1e293b` | Corps de texte |
| Texte secondaire | `#64748b` | Descriptions |

**Typographies** : `Rajdhani` (titres) · `Inter` (corps)
Identiques à celles utilisées dans `ForgeStore_prod`.

---

## SEO & Performance

- ✅ Meta tags complets (Open Graph, Twitter Card, JSON-LD)
- ✅ `sitemap.xml` → `/sitemap.xml`
- ✅ `robots.txt` → `/robots.txt`
- ✅ Nginx gzip + cache headers (assets : 1 an, HTML : 1h)
- ✅ Mobile-first responsive (sm / md / lg / xl)
- ✅ Scroll reveal avec `IntersectionObserver`
- ✅ WCAG 2.1 AA (aria-labels, focus visible, contraste)
- ✅ SPA routing (fallback `index.html`)
- ✅ Headers de sécurité (CSP, X-Frame-Options, HSTS via Cloudflare)

---

## Lien avec ForgeStore_prod

| Élément | Vitrine (`forge3d.tech`) | Boutique (`shop.forge3d.tech`) |
|---------|--------------------------|-------------------------------|
| Objectif | Présentation B2B / leads | Vente en ligne |
| Stack | React + Vite + Nginx | React + Express + PostgreSQL |
| Réseau Docker | `cloudflarenet` | `cloudflarenet` |
| Container | `forge3d-vitrine` | `forge3d_app` |
| Port interne | `80` | `5000` |

Le header et le footer de la vitrine contiennent un lien direct vers `shop.forge3d.tech`.
