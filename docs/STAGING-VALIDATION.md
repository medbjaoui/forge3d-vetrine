# ForgeOria — validation réelle du staging

20 octobre 2026, Africa/Tunis.

## Réalisé
Nouvelle marque proposée : **ForgeOria**, signature « L’automatisation qui fait avancer votre entreprise. ». Logo original généré dans `public/brand/forgeoria-logo.png` : orange, blanc, fond anthracite opaque. Utilisation sur fonds sombres ; fallback texte si le chargement échoue.

Motion design avec framer-motion, issu de [Motion](https://github.com/motiondivision/motion), licence MIT. Workflow animé en quatre étapes, trois scénarios fictifs, pause/reprise, clavier, reveals joués une fois, prise en compte de prefers-reduced-motion. Aucun appel IA ni action externe dans les démos.

ForgeAssist est remplacé dans les menus, l’accueil, Company, le footer et les métadonnées. Nouvelle page `/forgeoria`, bilingue FR/EN. Ancien chemin `/forgeassist` redirigé en 301. Sitemap et JSON-LD actualisés.

## Staging réellement démarré
Répertoire : `/home/debian/forge3d-forgeoria-staging`, branche `feat/forgeoria-brand`, issue du commit `0a1de46`.

Projet Compose `forgeoria-vitrine-staging`, service unique `vitrine`. Image statique Vite/React servie par Nginx non root ; Node 22 à la construction. Limites 128 Mio RAM / 0,5 CPU / 100 processus ; fichiers en lecture seule, capabilities supprimées, no-new-privileges et rotation des logs.

Port **127.0.0.1:3282** uniquement. Bridge dédié et réseau privé `agency-autopilot-staging_app` pour joindre l’API du MVP. Aucun accès à `cloudflarenet`, au réseau data PostgreSQL/Redis ou aux réseaux des autres projets.

La vitrine publique existante et ses conteneurs sont inchangés. Cloudflare, DNS, Traefik et pare-feu inchangés. Nginx de production et override `docker-compose.forgeoria-production.yml` préparés mais non appliqués.

## Contrôles passés
- Compilation TypeScript/Vite et 51 assertions de `verify:forgeoria` : réussies.
- Audit npm de production : zéro vulnérabilité signalée à cet instant.
- Syntaxe Nginx du staging et du candidat production validée dans des conteneurs jetables. Résolution du backend historique simulée pour le contrôle de syntaxe.
- Frontend staging healthy.
- Routes marketing, health et logo : HTTP 200, noindex.
- `/forgeassist?lang=fr` : HTTP 301 vers `/forgeoria?lang=fr`.
- Administration derrière `/api/autopilot/` : 404. Contact historique `/api/contact` : 503 explicite en staging, sans accès SMTP.
- Formulaire vide refusé en 400 ; corps supérieur à 16 Kio refusé en 413.
- Navigateur : logo, bloc de marque sur l’accueil, bascule FR/EN, changement de scénario et Pause vérifiés.
- Demande fictive envoyée depuis le navigateur : confirmation après vrai HTTP 201. Présence et consentement confirmés dans le CRM ; enregistrement fictif supprimé après test.

Captures conservées dans `brand-assets` de la conversation. La réduction des animations est contrôlée dans le code ; les préférences système de l’utilisateur n’ont pas été modifiées.

## Non publié et suite
Le site public `forge3d.tech` reste sur son ancien commit. L’accord explicite du propriétaire est requis avant remplacement public de ForgeAssist par ForgeOria.

Après accord : intégrer la branche, construire le commit revu, conserver l’image précédente, appliquer l’override au seul service vitrine avec `--no-deps`, vérifier domaine, redirection et formulaire. Seul le réseau app est partagé avec la vitrine ; jamais le réseau data. Le tunnel existant semble pouvoir conserver son point d’entrée ; son routage distant reste à confirmer avant publication.

Avant de recueillir de vrais prospects : valider sauvegarde hors serveur, protection CRM, conservation et consentement. n8n et tout envoi externe restent désactivés.

## Retour arrière
Conserver commit et image publics antérieurs. Revenir à cette image et retirer l’override réseau du seul service vitrine. La refonte ne nécessite aucun changement de schéma ni restauration de base. Ne pas arrêter les projets tiers.
