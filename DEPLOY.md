# Forge3D Vitrine – Guide de déploiement

## Architecture cible
```
www.forge3d.tech    →  forge3D-vitrine  (ce projet)
shop.forge3d.tech   →  ForgeStore_prod  (application e-commerce)
```

---

## 1. Développement local

```bash
cd "forge3D-vitrine"
npm install
cp .env.example .env    # Configurer les variables
npm run dev             # http://localhost:3000
```

---

## 2. Configuration du formulaire de contact

### Option A – EmailJS (recommandé, gratuit)
1. Créer un compte sur https://www.emailjs.com
2. Ajouter un service email (Gmail ou SMTP)
3. Créer un template avec les variables : `from_name`, `from_email`, `from_company`, `from_phone`, `subject`, `message`
4. Copier les IDs dans `.env` :
```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxxxxxxx
```

### Option B – Formspree (fallback)
1. Créer un compte sur https://formspree.io
2. Créer un nouveau formulaire (endpoint: `contact@forge3d.tech`)
3. Copier l'ID dans `.env` :
```env
VITE_FORMSPREE_ID=xyzabc123
```

---

## 3. Déploiement Docker simple (sans SSL)

```bash
# Build & run
docker compose up -d --build

# Vérifier les logs
docker compose logs -f vitrine

# Arrêter
docker compose down
```

---

## 4. Déploiement avec Traefik + SSL (recommandé en production)

### Prérequis sur le serveur
- Docker & Docker Compose installés
- DNS : `forge3d.tech` et `www.forge3d.tech` pointent vers l'IP du serveur

### Étapes

```bash
# 1. Créer le réseau externe partagé
docker network create forge3d-network

# 2. Préparer le fichier acme.json pour Let's Encrypt
mkdir -p traefik
touch traefik/acme.json
chmod 600 traefik/acme.json

# 3. Éditer l'email dans traefik/traefik.yml
#    → Changer "contact@forge3d.tech" par votre email réel

# 4. Démarrer Traefik
docker compose -f docker-compose.traefik.yml up -d

# 5. Démarrer le site vitrine
docker compose up -d --build

# 6. Démarrer la boutique (depuis ForgeStore_prod/)
#    → S'assurer que ForgeStore_prod utilise aussi forge3d-network
#      et a les labels Traefik pour shop.forge3d.tech
cd ../ForgeStore_prod
docker compose up -d
```

### Vérification
```bash
# Vérifier les certificats SSL
curl -I https://www.forge3d.tech

# Vérifier le health check
curl http://localhost/health

# Voir les containers actifs
docker compose ps
```

---

## 5. Structure des fichiers Docker

```
forge3D-vitrine/
├── Dockerfile                  # Multi-stage: Node build + Nginx serve
├── nginx.conf                  # Config Nginx (gzip, cache, SPA routing, headers)
├── docker-compose.yml          # Service vitrine seul
├── docker-compose.traefik.yml  # Traefik reverse proxy avec SSL
└── traefik/
    └── traefik.yml             # Config statique Traefik
```

---

## 6. Variables d'environnement (.env)

| Variable | Description | Requis |
|----------|-------------|--------|
| `VITRINE_PORT` | Port hôte Docker (défaut: 80) | Non |
| `VITE_EMAILJS_SERVICE_ID` | ID service EmailJS | Option A |
| `VITE_EMAILJS_TEMPLATE_ID` | ID template EmailJS | Option A |
| `VITE_EMAILJS_PUBLIC_KEY` | Clé publique EmailJS | Option A |
| `VITE_FORMSPREE_ID` | ID formulaire Formspree | Option B |
| `VITE_GA_MEASUREMENT_ID` | ID Google Analytics 4 | Non |

---

## 7. Logo & Assets

Les fichiers suivants doivent être dans `public/` :
- `logo-forge3d.png` – Logo principal (copié depuis ForgeStore_prod)
- `favicon.png` – Favicon
- `og-image.png` – Image pour Open Graph (à créer : 1200×630px)

---

## 8. Performance & SEO

Le site est optimisé pour :
- ✅ PageSpeed > 90 (Nginx gzip + cache headers + lazy loading)
- ✅ Mobile-first responsive design
- ✅ SEO meta tags complets (Open Graph, Twitter Card, JSON-LD)
- ✅ Sitemap XML : `/sitemap.xml`
- ✅ Robots.txt : `/robots.txt`
- ✅ WCAG 2.1 AA (aria-labels, focus states, contrast ratios)
- ✅ HTTP/2 via Traefik
- ✅ SSL/TLS automatique via Let's Encrypt
