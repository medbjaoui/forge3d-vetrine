import { mkdir, readFile, writeFile } from 'node:fs/promises';
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
  forgeassist: {
    title: 'ForgeAssist — AI-Powered Commerce Automation',
    description: 'ForgeAssist is an AI-powered commerce automation project for customer communication and order management. Currently in development by FORGE3D.',
    type: 'product',
  },
};

const template = await readFile('dist/index.html', 'utf8');

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

  if (route === 'forgeassist') {
    const softwareJsonLd = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'ForgeAssist',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      url,
      description: meta.description,
      creator: { '@type': 'Organization', name: 'FORGE3D', url: 'https://forge3d.tech' },
      softwareHelp: 'Currently in development',
    });
    html = html.replace('</head>', `    <script type="application/ld+json">${softwareJsonLd}</script>\n  </head>`);
  }

  const directory = join('dist', route);
  await mkdir(directory, { recursive: true });
  await writeFile(join(directory, 'index.html'), html);
}

console.log(`Generated ${Object.keys(routes).length} route-specific HTML shells.`);
