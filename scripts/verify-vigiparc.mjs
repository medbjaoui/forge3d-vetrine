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
const nginx = lire('nginx.conf');
const index = lire('index.html');
const sitemap = lire('public/sitemap.xml');
const coquille = lire('dist/vigiparc/index.html');
const sousPages = ['fonctionnalites', 'iso-27001', 'bornes', 'securite-confidentialite', 'offres', 'technologie', 'a-propos', 'contact', 'mentions-legales', 'confidentialite'];

for (const champ of ['nom', 'fonction', 'organisation', 'email', 'telephone', 'postes', 'message', 'consentement']) {
  exiger(page.includes(`name="${champ}"`), `Champ du formulaire absent : ${champ}`);
}
exiger(page.includes("fetch('/api/v1/prospects'"), 'Le formulaire ne cible pas VigiParc Central.');
exiger(page.includes('33 collecteurs de preuves automatiques'), 'Le nombre de collecteurs ISO doit être 33.');
exiger(page.includes('Données fictives'), 'Les indicateurs de démonstration ne sont pas signalés comme fictifs.');
exiger(!page.includes('mailto:'), 'Le parcours VigiParc ne doit pas contourner le formulaire qualifié.');
exiger(!index.includes('fonts.googleapis.com') && !index.includes('fonts.gstatic.com'), 'Une police Google est encore chargée.');
exiger(existsSync(join(racine, 'public/fonts/Inter-latin-var.woff2')), 'La police Inter locale est absente.');
exiger(existsSync(join(racine, 'public/fonts/LICENCE-Inter.txt')), 'La licence de la police Inter est absente.');
exiger(nginx.includes('Strict-Transport-Security'), 'HSTS est absent.');
exiger(nginx.includes('location = /api/v1/prospects'), 'Le proxy vers Central est absent.');
exiger(sitemap.includes('https://forge3d.tech/vigiparc'), 'VigiParc est absent du sitemap.');
exiger(coquille.includes('https://forge3d.tech/vigiparc'), 'La coquille SEO VigiParc est absente.');
exiger(coquille.includes('SoftwareApplication') && coquille.includes('VigiParc'), 'Les données structurées sont absentes.');
for (const page of sousPages) {
  exiger(existsSync(join(racine, `dist/vigiparc/${page}/index.html`)), `Coquille manquante : ${page}`);
  exiger(sitemap.includes(`https://forge3d.tech/vigiparc/${page}`), `Page absente du sitemap : ${page}`);
}
exiger(nginx.includes('try_files $uri $uri/ =404'), 'Les routes inconnues ne retournent pas une vraie 404.');
exiger(nginx.includes('location ~ ^/vigiparc/(fonctionnalites|iso-27001|bornes|'), 'Les sous-pages VigiParc ne sont pas servies directement.');

const domainesInterdits = ['fonts.googleapis.com', 'fonts.gstatic.com', 'api.emailjs.com', 'formspree.io', 'googletagmanager.com'];
const production = fichiers(join(racine, 'dist')).filter((chemin) => /\.(html|css|js)$/.test(chemin));
for (const chemin of production) {
  const contenu = readFileSync(chemin, 'utf8');
  for (const domaine of domainesInterdits) exiger(!contenu.includes(domaine), `Appel tiers ${domaine} dans ${chemin}`);
}

console.log('VigiParc : formulaire, confidentialité réseau, police locale, SEO et en-têtes vérifiés.');
