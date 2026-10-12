# FORGE3D Website Audit & Production Report

Date: 12 October 2026 (Africa/Tunis)  
Status: implemented and deployed

## 1. Project location

- Source root: `/home/debian/forge3d-vetrine`
- Git remote: `git@github.com:medbjaoui/forge3d-vetrine.git`
- Baseline commit: `f0696b6ef57b6182a0422a5aa6a5fc9474eadcc5`
- Production Compose project: `forge3d-vetrine`
- Compose file: `/home/debian/forge3d-vetrine/docker-compose.yml`

## 2. Framework and architecture

- Frontend: React 18, TypeScript, Vite 5, Tailwind CSS 3, Lucide icons
- Web server: Nginx in a multi-stage Docker image
- Contact backend: Node.js / Express with SMTP and PostgreSQL
- Edge: Cloudflare proxy and Cloudflare Tunnel on the shared `cloudflarenet` Docker network
- Store: separate e-commerce application at `https://shop.forge3d.tech`; its code, checkout, database, payments and deployment were not modified
- Site type: company website on the main domain plus a separate e-commerce subdomain

No CI/CD workflow was found in the repository. Production is built and started through Docker Compose on this server.

## 3. Runtime and environment

The public frontend uses the `forge3d-vetrine-vitrine` container. The contact API uses `forge3d-vetrine-backend`; PostgreSQL uses `forge3d-vetrine-postgres-db`.

Required environment groups are contact information, analytics identifiers, PostgreSQL connection settings and SMTP settings. Values remain in the existing ignored `.env` file and were not changed. `.dockerignore` rules now exclude `.env`, Git data, dependencies and build artifacts from Docker contexts.

The domain resolves through Cloudflare. DNS records, tunnel tokens and Cloudflare configuration were not changed.

## 4. Diagnostic: P0 / P1 / P2

### P0 — corrected

- Removed fabricated or unsupported client statistics, client projects, testimonials, satisfaction scores and certification claims from the rendered website.
- Blocked unauthenticated public access to `/api/contacts`; the public `/api/contact` submission route remains available.
- Removed plaintext database password logging from the backend and masked the Docker build context from `.env`.
- Restricted backend CORS to `https://forge3d.tech` and `https://www.forge3d.tech`.

### P0 — remaining operator action

- Rotate the database and SMTP credentials. Historical backend logs and the previous Compose inspection showed secret values. Rotation was not performed because the brief explicitly forbids changing secrets without approval.

### P1 — corrected

- Added real routes for `/about`, `/company` and `/forgeassist`.
- Added route-specific static titles, descriptions, canonicals, Open Graph and Twitter metadata for crawlers that do not execute JavaScript.
- Added Organization JSON-LD and SoftwareApplication JSON-LD for ForgeAssist.
- Rebuilt sitemap and robots directives with canonical HTTPS URLs.
- Restored CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy and Permissions-Policy inheritance in Nginx.
- Removed an HTTP downgrade in Nginx directory redirects behind Cloudflare by serving canonical marketing routes directly.
- Fixed both frontend and backend healthchecks.

### P2 — remaining

- Publish the verified legal company name, founding date, RNE number, tax number and professional address after checking official records. The site marks these fields as pending; it does not publish December 2025 as fact.
- Plan a controlled major upgrade of Vite and Tailwind. `npm audit` reports nine build-chain vulnerabilities (six high, three moderate). These dependencies are not copied into the final Nginx runtime image, and automatic fixes require breaking major-version migrations.
- Consider replacing externally hosted Google Fonts with self-hosted font files for additional privacy and resilience.

## 5. Pages created or rebuilt

- `/` — company positioning, Technology & Innovation, 3D shop continuity and ForgeAssist introduction
- `/about` — company presentation, activities, vision, contact and explicitly pending legal facts
- `/company` — verification-oriented company overview, business activities, ForgeAssist and roadmap
- `/forgeassist` — problem, solution, planned features, workflow, AI technology, development status and contact

ForgeAssist is consistently labelled “Currently in development.” Claude model integration is described as an evaluation only; no Anthropic partnership or endorsement is claimed.

## 6. UX/UI and accessibility

- Reworked the interface around the existing orange FORGE3D identity and official logo.
- Added responsive desktop and mobile navigation, clear CTA hierarchy, premium cards and restrained motion.
- Added a keyboard skip link, visible focus styling, semantic headings and reduced-motion support.
- Preserved the dedicated shopping path to `shop.forge3d.tech` without changing the purchase flow.

## 7. SEO changes

- Unique static and client-side metadata for all four public pages
- Canonical HTTPS URLs without redirect mismatch
- Open Graph and Twitter cards
- `robots.txt` and four-entry `sitemap.xml`
- Organization structured data on all pages
- SoftwareApplication structured data on ForgeAssist
- Public pages accessible without authentication

## 8. Files modified

- `.dockerignore`
- `docker-compose.yml`
- `index.html`
- `nginx.conf`
- `package.json`, `package-lock.json`
- `public/robots.txt`, `public/sitemap.xml`
- `scripts/generate-route-shells.mjs`
- `smtp-backend/.dockerignore`, `smtp-backend/server.js`
- `src/App.tsx`, `src/index.css`
- `src/components/Header.tsx`, `Footer.tsx`, `Seo.tsx`
- `src/pages/HomePage.tsx`, `AboutPage.tsx`, `CompanyPage.tsx`, `ForgeAssistPage.tsx`

## 9. Tests executed

- `npm run build`: passed, including three generated route-specific HTML shells
- TypeScript compiler and Vite production bundle: passed
- JSON-LD parsing: passed
- Sitemap XML readability: passed
- `git diff --check`: passed
- Chromium desktop and 390×844 mobile checks: passed
- Navigation and mobile menu: passed
- Horizontal overflow check on all four pages: passed
- Browser console: zero errors and zero warnings
- Public HTTP verification: all pages, robots and sitemap return 200
- Security header verification: passed on all public pages
- Public admin endpoint check: `/api/contacts` returns 404
- Allowed-origin CORS preflight: 204 with the expected origin
- Disallowed-origin CORS preflight: rejected without an allow-origin header
- Store availability: `https://shop.forge3d.tech/` returns 200

## 10. Build result

Production bundle built successfully. Representative bundle sizes:

- HTML: about 3.2 kB before route-shell additions
- CSS: 41.38 kB (7.49 kB gzip)
- Application JS: 42.01 kB (9.99 kB gzip)
- Vendor JS: 140.87 kB (45.26 kB gzip)

## 11. Deployment state

Deployment completed with Docker Compose. Current containers are healthy:

- `forge3d-vetrine-vitrine`: healthy
- `forge3d-vetrine-backend`: healthy
- `forge3d-vetrine-postgres-db`: healthy and not recreated

Rollback images retained:

- `forge3d-vetrine-vitrine:rollback-pre-update-20261012`
- `forge3d-vetrine-backend:rollback-pre-update-20261012`

No DNS, payment, checkout, production database or Cloudflare tunnel changes were made.

## 12. Public URLs verified

- https://forge3d.tech/
- https://forge3d.tech/about
- https://forge3d.tech/company
- https://forge3d.tech/forgeassist
- https://forge3d.tech/robots.txt
- https://forge3d.tech/sitemap.xml
- https://shop.forge3d.tech/

## 13. Remaining actions

1. Rotate exposed database and SMTP credentials, then restart only the affected services.
2. Provide official company documents so legal name, founding date, RNE, tax number and address can be verified and published.
3. Schedule the Vite/Tailwind major-version upgrade in a separate tested change.
4. Push the local production commit to the remote repository when desired.
