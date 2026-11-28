import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const racine = new URL('..', import.meta.url).pathname;
const lire = (chemin) => readFileSync(join(racine, chemin), 'utf8');
const exiger = (condition, message) => {
  if (!condition) throw new Error(message);
};
const fichiers = (dossier) => readdirSync(dossier).flatMap((nom) => {
  const chemin = join(dossier, nom);
  return statSync(chemin).isDirectory() ? fichiers(chemin) : [chemin];
});

const page = lire('src/pages/VigiParcPage.tsx');
const formulaire = lire('src/components/VigiParcLeadForm.tsx');
const pageIso = lire('src/pages/VigiParcInfoPage.tsx');
const ressources = lire('src/pages/VigiParcResourcesPage.tsx');
const nginx = lire('nginx.conf');
const index = lire('index.html');
const sitemap = lire('public/sitemap.xml');
const coquille = lire('dist/vigiparc/index.html');
const chargeur = lire('dist/vigiparc-bootstrap.js');
const backend = lire('smtp-backend/server.js');
const emails = lire('smtp-backend/email-templates.js');
const dockerBackend = lire('smtp-backend/Dockerfile');
const initialisation = lire('smtp-backend/init.sql');
const sousPages = ['fonctionnalites', 'iso-27001', 'bornes', 'securite-confidentialite', 'offres', 'technologie', 'a-propos', 'contact', 'mentions-legales', 'confidentialite', 'postes-windows', 'sans-active-directory', 'identites', 'politiques-securite', 'logiciels', 'cybersecurite', 'assistance', 'multisite', 'calculateur', 'comparatif', 'ressources'];

for (const champ of ['nom', 'societe', 'fonction', 'email', 'postes', 'telephone', 'pays', 'sites', 'infrastructure', 'active_directory', 'priorite', 'message', 'consentement']) {
  exiger(formulaire.includes(`name="${champ}"`), `Champ du formulaire absent : ${champ}`);
}
exiger(formulaire.includes("fetch('/api/v1/prospects'"), 'Le formulaire ne cible pas VigiParc Central.');
exiger(page.includes('Illustration, pas une capture produit'), 'L’aperçu schématique n’est pas signalé comme illustration.');
exiger(page.includes('Décret-loi n° 2023-17') && page.includes('au moins tous les douze mois'), 'Le cadre tunisien de l’audit cyber est absent de la page principale.');
exiger(pageIso.includes('ISO 27001 n’est pas une obligation générale') && pageIso.includes('expert habilité'), 'La distinction entre audit obligatoire et certification ISO est absente.');
exiger(pageIso.includes('https://www.ancs.tn/fr/audit-reglementaire'), 'La source officielle ANCS est absente.');
exiger(ressources.includes('ISO 27001 est-elle obligatoire en Tunisie ?'), 'La FAQ réglementaire tunisienne est absente.');
exiger(!page.includes('ISO 27001 est obligatoire') && !pageIso.includes('ISO 27001 est obligatoire'), 'Le site présente à tort ISO 27001 comme une obligation générale.');
exiger(!page.includes('33 collecteurs'), 'Un nombre de collecteurs non configurable est encore publié.');
exiger(!page.includes('mailto:'), 'Le parcours VigiParc ne doit pas contourner le formulaire qualifié.');
exiger(!index.includes('fonts.googleapis.com') && !index.includes('fonts.gstatic.com'), 'Une police Google est encore chargée.');
exiger(existsSync(join(racine, 'public/fonts/Inter-latin-var.woff2')), 'La police Inter locale est absente.');
exiger(existsSync(join(racine, 'public/fonts/LICENCE-Inter.txt')), 'La licence de la police Inter est absente.');
exiger(nginx.includes('Strict-Transport-Security'), 'HSTS est absent.');
exiger(nginx.includes('location = /api/v1/prospects'), 'Le proxy vers Central est absent.');
exiger(nginx.includes('limit_req zone=vigiparc_prospects'), 'La limitation de débit du formulaire est absente.');
exiger(backend.includes('vigiparc_prospect_queue') && backend.includes('retraiterFileVigiParc'), 'La file de secours persistante ou sa reprise automatique est absente.');
exiger(emails.includes('Nouvelle demande commerciale') && emails.includes('Prochaine étape') && emails.includes('aucune communication commerciale'), 'Les e-mails VigiParc professionnels sont incomplets.');
exiger(emails.includes('echapperHtml(payload.message)') && backend.includes('disableFileAccess: true') && backend.includes('disableUrlAccess: true'), 'Les e-mails VigiParc ne protègent pas correctement les contenus saisis.');
exiger(dockerBackend.includes('email-templates.js'), 'Le modèle d’e-mail VigiParc n’est pas inclus dans l’image backend.');
exiger(initialisation.includes('CREATE TABLE IF NOT EXISTS vigiparc_prospect_queue'), 'La table de file de secours est absente.');
exiger(!initialisation.includes('PME Export') && !initialisation.includes('Groupe Industriel International'), 'Des faux témoignages sont encore initialisés.');
exiger(sitemap.includes('https://forge3d.tech/vigiparc'), 'VigiParc est absent du sitemap.');
exiger(coquille.includes('https://forge3d.tech/vigiparc'), 'La coquille SEO VigiParc est absente.');
exiger(coquille.includes('SoftwareApplication') && coquille.includes('VigiParc'), 'Les données structurées sont absentes.');
exiger(coquille.includes('Gérez votre parc IT'), 'Le contenu VigiParc doit être prérendu.');
exiger(coquille.includes('width="55" height="56"') && coquille.includes('width="62" height="64"'), 'Les dimensions des logos doivent être réservées.');
exiger(coquille.includes('/vigiparc-bootstrap.js?v=') && !coquille.includes('rel="modulepreload"'), 'Le chargeur VigiParc doit être versionné sans préchargement inutile.');
exiger(existsSync(join(racine, 'dist/vigiparc-bootstrap.js')), 'Le chargeur progressif VigiParc est absent.');
exiger(chargeur.includes('void load();'), 'VigiParc doit être hydraté avant la première saisie.');
exiger(nginx.includes('location = /vigiparc-bootstrap.js') && nginx.includes('no-store, no-cache, must-revalidate'), 'Le chargeur VigiParc ne doit pas rester en cache entre deux déploiements.');
exiger(formulaire.includes('performance.timeOrigin') && formulaire.includes('Math.round(Date.now() - debutSaisie.current)'), 'La durée de saisie doit survivre au prérendu et rester un entier.');
for (const image of ['public/logo-forge3d-compact.webp', 'public/brand/forgeoria-logo.webp', 'public/favicon.png', 'public/apple-touch-icon.png']) {
  exiger(existsSync(join(racine, image)), `Image optimisée absente : ${image}`);
  exiger(statSync(join(racine, image)).size < 20_000, `Image critique trop lourde : ${image}`);
}
for (const page of sousPages) {
  exiger(existsSync(join(racine, `dist/vigiparc/${page}/index.html`)), `Coquille manquante : ${page}`);
  exiger(sitemap.includes(`https://forge3d.tech/vigiparc/${page}`), `Page absente du sitemap : ${page}`);
}
exiger(nginx.includes('try_files $uri $uri/ =404'), 'Les routes inconnues ne retournent pas une vraie 404.');
exiger(nginx.includes('location ~ ^/vigiparc/(fonctionnalites|iso-27001|bornes|'), 'Les sous-pages VigiParc ne sont pas servies directement.');
const calculateur = lire('dist/vigiparc/calculateur/index.html');
exiger(calculateur.includes('Estimation non contractuelle') && calculateur.includes('toutes les licences Windows'), 'Les hypothèses protectrices du calculateur sont absentes.');

const domainesInterdits = ['fonts.googleapis.com', 'fonts.gstatic.com', 'api.emailjs.com', 'formspree.io', 'googletagmanager.com'];
const production = fichiers(join(racine, 'dist')).filter((chemin) => /\.(html|css|js)$/.test(chemin));
for (const chemin of production) {
  const contenu = readFileSync(chemin, 'utf8');
  for (const domaine of domainesInterdits) exiger(!contenu.includes(domaine), `Appel tiers ${domaine} dans ${chemin}`);
}

console.log('VigiParc : formulaire, confidentialité réseau, police locale, SEO et en-têtes vérifiés.');
