import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const routes = {
  about: {
    title: 'About FORGE3D — Technology Company in Tunisia',
    description: 'Learn about FORGE3D, its 3D printing activity, software development work and AI research direction in Tunisia.',
    type: 'website',
  },
  company: {
    title: 'FORGE3D Company Overview — Tunisia',
    description: 'A concise, verifiable overview of FORGE3D activities, technology projects, public contact information and development roadmap.',
    type: 'website',
  },
  forgeoria: {
    title: 'ForgeOria — Automation that moves your business forward | FORGE3D',
    description: 'ForgeOria by FORGE3D designs business automation workflows with human review: lead qualification, invoice processing and support triage. In development; demos are simulated.',
    type: 'product',
  },
  vigiparc: {
    title: 'VigiParc — Gestion de parc, sécurité et conformité | FORGE3D',
    description: 'VigiParc centralise la gestion de parc, la sécurité et le suivi ISO 27001 pour les PME de 5 à 500 équipements, sur leur infrastructure.',
    type: 'product',
  },
  'vigiparc/fonctionnalites': { title: 'Fonctionnalités | VigiParc — FORGE3D', description: 'Parc, sécurité, support, identités, conformité et services employés réunis dans VigiParc.', type: 'product' },
  'vigiparc/iso-27001': { title: 'ISO 27001 | VigiParc — FORGE3D', description: 'VigiParc outille les 93 mesures ISO 27001:2022 et 33 collecteurs de preuves automatiques.', type: 'product' },
  'vigiparc/bornes': { title: 'Bornes Linux | VigiParc — FORGE3D', description: 'Bornes Linux administrées, sessions encadrées et remise à zéro automatique.', type: 'product' },
  'vigiparc/securite-confidentialite': { title: 'Sécurité et confidentialité | VigiParc — FORGE3D', description: 'Données sur site, flux sortants uniquement et télémétrie facultative sans donnée personnelle.', type: 'product' },
  'vigiparc/offres': { title: 'Offres | VigiParc — FORGE3D', description: 'Offres Essentiel et Pro de VigiParc, proposées sur devis.', type: 'product' },
  'vigiparc/technologie': { title: 'Technologie | VigiParc — FORGE3D', description: 'Architecture Docker sur Debian et composants logiciels libres de VigiParc.', type: 'product' },
  'vigiparc/a-propos': { title: 'À propos | VigiParc — FORGE3D', description: 'VigiParc est développé et accompagné en Tunisie par Forge 3D.', type: 'product' },
  'vigiparc/contact': { title: 'Démonstration | VigiParc — FORGE3D', description: 'Demandez une démonstration VigiParc adaptée à votre parc.', type: 'product' },
  'vigiparc/mentions-legales': { title: 'Mentions légales | VigiParc — FORGE3D', description: 'Mentions légales du site VigiParc édité par Forge 3D.', type: 'product' },
  'vigiparc/confidentialite': { title: 'Confidentialité | VigiParc — FORGE3D', description: 'Traitement des demandes de démonstration et droits des visiteurs du site VigiParc.', type: 'product' },
  'vigiparc/postes-windows': { title: 'Gestion des postes Windows | VigiParc — FORGE3D', description: 'Gérer les postes Windows par agents sans rendre Windows Server obligatoire.', type: 'product' },
  'vigiparc/sans-active-directory': { title: 'Gestion sans Active Directory obligatoire | VigiParc', description: 'Agents, identités applicatives et politiques locales selon les dépendances de votre environnement.', type: 'product' },
  'vigiparc/identites': { title: 'Identités et accès | VigiParc — FORGE3D', description: 'Rôles, MFA, sessions et cycle de vie des accès dans VigiParc.', type: 'product' },
  'vigiparc/politiques-securite': { title: 'Politiques de sécurité | VigiParc — FORGE3D', description: 'Définir les règles, constater les écarts et suivre les remédiations.', type: 'product' },
  'vigiparc/logiciels': { title: 'Gestion des logiciels | VigiParc — FORGE3D', description: 'Inventaire, versions et cycle de vie logiciel dans VigiParc.', type: 'product' },
  'vigiparc/cybersecurite': { title: 'Cybersécurité PME | VigiParc — FORGE3D', description: 'Regrouper alertes, vulnérabilités et état des protections selon les connecteurs activés.', type: 'product' },
  'vigiparc/assistance': { title: 'Assistance informatique | VigiParc — FORGE3D', description: 'Tickets, diagnostic et prise en main à distance dans un parcours traçable.', type: 'product' },
  'vigiparc/multisite': { title: 'Gestion multisite en préparation | VigiParc', description: 'Découvrez la cible multisite de VigiParc, clairement identifiée comme en préparation.', type: 'product' },
  'vigiparc/calculateur': { title: 'Calculateur de coûts IT | VigiParc — FORGE3D', description: 'Comparez vos coûts IT actuels avec une hypothèse VigiParc à partir de vos propres données.', type: 'product' },
  'vigiparc/comparatif': { title: 'Comparer les approches de gestion IT | VigiParc', description: 'Une grille neutre pour comparer les périmètres des solutions de gestion IT.', type: 'product' },
  'vigiparc/ressources': { title: 'Ressources et FAQ | VigiParc — FORGE3D', description: 'Guides, réponses et informations produit pour préparer un projet VigiParc.', type: 'product' },
};

// /forgeassist is intentionally absent: nginx answers it with a 301 to /forgeoria.

const template = await readFile('dist/index.html', 'utf8');
const { render } = await import('../.ssr/entry-server.js');
const clientEntry = template.match(/<script type="module"[^>]+src="([^"]+)"[^>]*><\/script>/)?.[1];

if (!clientEntry) throw new Error('Entrée cliente Vite introuvable.');

const bootstrap = `const entry=${JSON.stringify(clientEntry)};
let ready=false;
let loading;
const load=()=>loading??=(import(entry).then(()=>{ready=true;}));
document.querySelectorAll('.reveal').forEach((element)=>element.classList.add('visible'));
void load();
document.addEventListener('focusin',(event)=>{
  if(!ready&&event.target instanceof Element&&event.target.closest('form')) void load();
},true);
document.addEventListener('click',async(event)=>{
  if(ready) return;
  const target=event.target instanceof Element?event.target.closest('header button,button[type="submit"],a.protected-email'):null;
  if(!target) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  await load();
  requestAnimationFrame(()=>target.click());
},true);
document.addEventListener('submit',async(event)=>{
  if(ready) return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const form=event.target;
  await load();
  requestAnimationFrame(()=>form.requestSubmit());
},true);
`;

await writeFile('dist/vigiparc-bootstrap.js', bootstrap);
const bootstrapVersion = clientEntry.match(/index-([A-Za-z0-9_-]+)\.js$/)?.[1] ?? 'current';

for (const [route, meta] of Object.entries(routes)) {
  const url = `https://forge3d.tech/${route}`;
  let html = template
    .replace(/<title>.*?<\/title>/, `<title>${meta.title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${meta.description}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:type" content="[^"]*"\s*\/>/, `<meta property="og:type" content="${meta.type}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${meta.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${meta.description}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${meta.title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${meta.description}" />`);

  if (route.startsWith('vigiparc')) {
    html = html
      .replace('<div id="root"></div>', `<div id="root">${render(`/${route}`)}</div>`)
      .replace(
        /<script type="module"[^>]+src="[^"]+"[^>]*><\/script>/,
        `<script type="module" src="/vigiparc-bootstrap.js?v=${bootstrapVersion}"></script>`,
      )
      .replace(/\s*<link rel="modulepreload"[^>]*>/g, '');
  }

  if (route === 'forgeoria' || route.startsWith('vigiparc')) {
    const softwareJsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: route.startsWith('vigiparc') ? 'VigiParc' : 'ForgeOria',
      slogan: route.startsWith('vigiparc') ? 'Gérez votre parc IT sur votre infrastructure.' : 'Automation that moves your business forward.',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url,
      description: meta.description,
      inLanguage: route.startsWith('vigiparc') ? ['fr'] : ['fr', 'en'],
      brand: { '@type': 'Brand', name: route.startsWith('vigiparc') ? 'VigiParc' : 'ForgeOria' },
      creator: { '@type': 'Organization', name: 'FORGE3D', url: 'https://forge3d.tech' },
      softwareHelp: route === 'vigiparc' ? 'Démonstration sur demande' : 'Currently in development',
    });
    html = html.replace('</head>', `    <script type="application/ld+json">${softwareJsonLd}</script>\n  </head>`);
  }

  const directory = join('dist', route);
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, 'index.html'), html);
}

await rm('.ssr', { recursive: true, force: true });

console.log(`Generated ${Object.keys(routes).length} route-specific HTML shells.`);
