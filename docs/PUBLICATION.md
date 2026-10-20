# Publication ForgeOria — 20/10/2026 19:20 CET

Publication autorisée explicitement par le propriétaire dans cette conversation (« publie le »).

## En ligne
- Site principal : https://forge3d.tech/
- Page produit FR : https://forge3d.tech/forgeoria?lang=fr
- Page produit EN : https://forge3d.tech/forgeoria?lang=en
- ForgeAssist remplacé par ForgeOria dans les menus, accueil, Company, footer, sitemap et métadonnées.
- Logo original et animations publiés ; trois scénarios explicitement simulés.
- Formulaire public relié à l’API privée et au CRM. Aucun accès public aux routes administratives.

## Déploiement effectué
Source revue : commit `985324d`. Image `forge3d-vitrine:forgeoria-reviewed`, identifiant `sha256:6082f9770b48ffdd63819b141b9cd271a5756233829d826c018244ce78d10421`. Seul le service `vitrine` du projet `forge3d-vetrine` a été recréé avec l’override de production. Il est healthy. Il rejoint désormais le réseau app privé du MVP, sans accès au réseau data. Le tunnel existant, Cloudflare/DNS, les bases et les autres projets n’ont pas été modifiés.

Commandes de maintenance pour cette version :

```sh
cd /home/debian/forge3d-vetrine
docker compose -f docker-compose.yml -f docker-compose.forgeoria-production.yml up -d --no-deps --no-build --wait vitrine
```

Toujours conserver les deux fichiers Compose : l’override fixe l’image publiée et son accès à l’API privée. Ne pas relancer les bases ou le backend lors d’une mise à jour du seul frontend.

## Vérification après publication
- HTTPS réel : accueil, produit, Company, About, health et logo répondent 200.
- Le HTML public porte la nouvelle marque ; aucun en-tête noindex de staging.
- `/forgeassist?lang=fr` répond 301 vers `/forgeoria?lang=fr`.
- `/api/autopilot/admin/leads` et `/api/contacts` répondent 404.
- Formulaire invalide : 400. Une demande entièrement fictive envoyée depuis le domaine public a reçu 201 et a été retrouvée dans le CRM ; elle a été supprimée après contrôle.
- Vérification visuelle dans le navigateur sur le vrai domaine : nouvelle page, logo et workflow présents.
- Les 16 autres conteneurs présents avant publication ont conservé leurs identifiants, heures de démarrage et réseaux.

## Sauvegarde et retour arrière
Sauvegarde PostgreSQL du MVP avant publication : `/home/debian/agency-autopilot-staging/backups/autopilot-20261020T181736Z.dump`, avec SHA-256, permissions restrictives. Les restaurations ont été testées en staging. La refonte n’a modifié aucun schéma.

Ancienne image conservée sous `forge3d-vitrine:pre-forgeoria-20261020`. Procédure de retour arrière : `/home/debian/forgeoria-deployment-20261020/rollback.sh`. Elle ne recrée que la vitrine avec l’ancienne image et les réseaux précédents ; aucun volume supprimé. Le relevé avant publication est dans le même répertoire protégé.

## Limites restantes
n8n reste désactivé ; aucun e-mail automatique ni action externe. Les démos sont des simulations, pas des appels IA réels. CRM protégé par jeton et accessible uniquement par le chemin privé du MVP. Les sauvegardes hors serveur et leur planification restent à configurer ; les sauvegardes actuelles sont locales. Le staging reste disponible séparément sur loopback. Les secrets restent sur le serveur et ne sont pas versionnés.
