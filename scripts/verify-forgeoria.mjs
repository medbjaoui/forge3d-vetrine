// Static assertions for the ForgeOria integration. Run after `npm run build`:
//   node scripts/verify-forgeoria.mjs
import { existsSync } from 'node:fs';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

let failures = 0;
const check = (ok, label) => { console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`); if (!ok) failures += 1; };
const read = (path) => readFile(path, 'utf8');

const walk = async (dir) => (await Promise.all((await readdir(dir, { withFileTypes: true })).map((entry) => {
  const path = join(dir, entry.name);
  return entry.isDirectory() ? walk(path) : [path];
}))).flat();

// ── Source ──────────────────────────────────────────────────────────────────
const srcFiles = await walk('src');
const allSrc = (await Promise.all(srcFiles.map(read))).join('\n');
const visibleSrc = (await Promise.all(srcFiles.filter((f) => !f.endsWith('lib/forgeoria.ts') && !f.endsWith('App.tsx')).map(read))).join('\n');
check(!/ForgeAssist/i.test(visibleSrc), 'no visible ForgeAssist branding in components/pages');
check(!existsSync('src/pages/ForgeAssistPage.tsx'), 'ForgeAssistPage.tsx removed');
check(existsSync('src/pages/ForgeOriaPage.tsx'), 'ForgeOriaPage.tsx present');

const app = await read('src/App.tsx');
check(/\[FORGEORIA_PATH\]: ForgeOriaPage/.test(app), 'App routes /forgeoria to ForgeOriaPage');
check(/\[LEGACY_FORGEASSIST_PATH\]: FORGEORIA_PATH/.test(app) && /location\.replace/.test(app), 'App dev redirect /forgeassist -> /forgeoria');

const lib = await read('src/lib/forgeoria.ts');
check(lib.includes("FORGEORIA_PATH = '/forgeoria'") && lib.includes("LEGACY_FORGEASSIST_PATH = '/forgeassist'"), 'route constants');
check(lib.includes("LEADS_ENDPOINT = '/api/autopilot/leads'"), 'lead endpoint constant');
check(lib.includes("CONSENT_VERSION = '2026-10-v1'"), 'consent version 2026-10-v1');
check(lib.includes("['1-10', '11-50', '51-200', '201-1000', '1000+']"), 'companySize enum');
check(lib.includes("['lt5k', '5k-15k', '15k-50k', 'gt50k', 'unknown']"), 'budget enum');
check(lib.includes("['asap', '1-3m', '3-6m', 'exploring']"), 'timeline enum');
check(lib.includes("['lead_qualification', 'invoice_processing', 'support_triage', 'crm_sync', 'reporting', 'other']"), 'needs enum');
check(lib.includes('L’automatisation qui fait avancer votre entreprise.') && lib.includes('Automation that moves your business forward.'), 'FR/EN signatures');

const form = await read('src/components/forgeoria/DiscoveryForm.tsx');
check(/response\.status === 201\)\s*\{\s*setFields\(EMPTY\);\s*setStatus\(\{ kind: 'success' \}\)/.test(form), 'success only on HTTP 201');
for (const code of ['400', '429', '503']) check(form.includes(`response.status === ${code}`), `form handles ${code}`);
check(!/console\.|localStorage|sessionStorage|indexedDB/.test(form), 'form: no console logging or browser storage');
check(/consent: true,\s*consentVersion: CONSENT_VERSION,\s*website: fields\.website/.test(form), 'payload: consent/consentVersion/website');
for (const key of ['name', 'email', 'company', 'companySize', 'budget', 'timeline', 'needs', 'locale']) check(new RegExp(`\\b${key}[,:]`).test(form.slice(form.indexOf('const payload'))), `payload field ${key}`);
check(form.includes('href="#privacy"'), 'form links to privacy section');

const diagram = await read('src/components/forgeoria/WorkflowDiagram.tsx');
check(diagram.includes('useReducedMotion') && /viewport=\{\{ once: true/.test(diagram), 'diagram: reduced motion + reveal once');
check(diagram.includes('setPaused(!paused)') && diagram.includes('useInView'), 'diagram: pause control + in-view gating');
check(!/fetch\(|XMLHttpRequest|WebSocket/.test(diagram), 'diagram: no network calls (simulated)');
check(!/addEventListener\(\s*['"](wheel|touchmove|mousewheel)['"]|onWheel|useScroll\(/.test(allSrc), 'no scroll hijacking (no wheel/touchmove handlers or scroll-linked motion)');

const pkg = JSON.parse(await read('package.json'));
const deps = Object.keys({ ...pkg.dependencies, ...pkg.devDependencies });
check(deps.includes('framer-motion') && !deps.some((d) => /^(gsap|animejs|react-spring|@react-spring\/.*|lottie.*|motion)$/.test(d)), 'only framer-motion for animation');

// ── SEO / static ────────────────────────────────────────────────────────────
const sitemap = await read('public/sitemap.xml');
check(sitemap.includes('https://forge3d.tech/forgeoria') && !sitemap.includes('forgeassist'), 'sitemap lists /forgeoria only');
const shells = await read('scripts/generate-route-shells.mjs');
check(/forgeoria: \{/.test(shells) && /name: 'ForgeOria'/.test(shells) && !/ForgeAssist/.test(shells), 'route shells + JSON-LD for ForgeOria');
const indexHtml = await read('index.html');
check(indexHtml.includes('"name": "ForgeOria"'), 'root Organization JSON-LD references ForgeOria brand');

// ── nginx ───────────────────────────────────────────────────────────────────
const prod = await read('nginx.conf');
check(/location ~ \^\/forgeassist\(\/\.\*\)\?\$ \{\s*return 301 \/forgeoria\$is_args\$args;/.test(prod), 'prod: /forgeassist 301 -> /forgeoria');
check(prod.includes('resolver 127.0.0.11') && prod.includes('set $forgeoria_api http://forgeoria-api:4000;') && prod.includes('proxy_pass $forgeoria_api;'), 'prod: forgeoria-api via Docker resolver + variable');
check(prod.includes('rewrite ^/api/autopilot/(.*)$ /api/$1 break;'), 'prod: /api/autopilot/ -> /api/');
check(prod.includes('proxy_pass http://backend:3001/api/;') && prod.includes('location ^~ /api/contacts'), 'prod: existing contact API + /api/contacts block preserved');
check(/location ~ \^\/\(about\|company\|forgeoria\)\$/.test(prod), 'prod: canonical shells include forgeoria');
const staging = await read('nginx.forgeoria-staging.conf');
check(staging.includes('set $forgeoria_api http://api:4000;') && staging.includes('resolver 127.0.0.11'), 'staging: api:4000 via Docker resolver');
check(/location \/api\/ \{\s*default_type application\/json;\s*return 503/.test(staging) && !staging.includes('backend:3001'), 'staging: contact API disabled with 503');
check(staging.includes('Cache-Control "no-store"') && staging.includes('X-Robots-Tag "noindex'), 'staging: no-store + noindex');
check(/return 301 \/forgeoria\$is_args\$args;/.test(staging), 'staging: /forgeassist 301');
const stagingDocker = await read('Dockerfile.forgeoria-staging');
check(stagingDocker.includes('COPY nginx.forgeoria-staging.conf') && !/\.env|ARG .*SECRET|ENV .*KEY/i.test(stagingDocker.replace(/^#.*$/gm, '')), 'staging Dockerfile: stage config, no secrets');

// ── Build output ────────────────────────────────────────────────────────────
if (existsSync('dist')) {
  check(existsSync('dist/forgeoria/index.html'), 'dist: /forgeoria shell');
  check(!existsSync('dist/forgeassist'), 'dist: no /forgeassist shell (nginx 301 owns it)');
  const shell = await read('dist/forgeoria/index.html');
  check(shell.includes('<link rel="canonical" href="https://forge3d.tech/forgeoria" />') && shell.includes('"@type":"SoftwareApplication"') && shell.includes('"name":"ForgeOria"'), 'dist: canonical + JSON-LD in /forgeoria shell');
  const bundle = (await Promise.all((await walk('dist/assets')).filter((f) => f.endsWith('.js')).map(read))).join('\n');
  check(bundle.includes('/api/autopilot/leads') && bundle.includes('2026-10-v1'), 'dist: bundle posts to /api/autopilot/leads with consent version');
  check(!/ForgeAssist/.test(bundle), 'dist: no ForgeAssist string in bundle');
} else {
  console.log('SKIP  dist checks (run npm run build first)');
}

console.log(failures ? `\n${failures} check(s) failed.` : '\nAll ForgeOria checks passed.');
process.exit(failures ? 1 : 0);
