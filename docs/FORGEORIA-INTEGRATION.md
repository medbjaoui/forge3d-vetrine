# ForgeOria integration — Forge3D vitrine

ForgeOria replaces the ForgeAssist brand on forge3d.tech. Signature:

- FR: « L’automatisation qui fait avancer votre entreprise. »
- EN: “Automation that moves your business forward.”

Colours are the existing Forge3D palette (orange `#F97316`, anthracite `#0d0f16` family). Forge3D's existing services (3D shop links, company pages, the `/api/` contact backend) are unchanged.

## What changed

### Routes
| Route | Behaviour |
|---|---|
| `/forgeoria` | New canonical product page (`src/pages/ForgeOriaPage.tsx`), pre-rendered shell with its own title/description/canonical and `SoftwareApplication` JSON-LD. |
| `/forgeassist` (and `/forgeassist/…`) | **nginx `301` → `/forgeoria`**, query string preserved (`nginx.conf`, `nginx.forgeoria-staging.conf`). In dev/preview (no nginx), `App.tsx` calls `location.replace('/forgeoria…')`. No `dist/forgeassist` shell is generated anymore. |
| `/forgeoria#discovery`, `/forgeoria#privacy` | Discovery form and privacy/consent section. `App.tsx` now scrolls to the hash target on load instead of always resetting to the top. |

`src/pages/ForgeAssistPage.tsx` is deleted.

### Files
- `src/lib/forgeoria.ts` — brand constants, paths, logo config, lead enums and payload type. Enums mirror the private API's `lead.schema.ts` / `domain.ts`.
- `src/lib/forgeoria-copy.ts` — all FR/EN copy for the product page, demo scenarios and the privacy text.
- `src/components/forgeoria/BrandMark.tsx` — `ForgeOriaLogo` (raster, dark backgrounds only, `alt="ForgeOria"`, explicit `width`/`height`, falls back to the text wordmark `onError` so a missing asset never shows a broken image) and `ForgeOriaWordmark` (text brand for any background).
- `src/components/forgeoria/WorkflowDiagram.tsx` — animated hero diagram (Request → Classify → Human review → Prepared action) with 3 clickable demos.
- `src/components/forgeoria/DiscoveryForm.tsx` — discovery form → `POST /api/autopilot/leads`.
- `src/components/forgeoria/HomeForgeOriaBlock.tsx` — dedicated homepage brand block (replaces "Meet ForgeAssist").
- `src/pages/HomePage.tsx`, `CompanyPage.tsx`, `components/Header.tsx`, `components/Footer.tsx` — ForgeAssist nav/cards/sections/footer replaced by ForgeOria (footer also links `#discovery` and `#privacy`).
- `index.html` — root description/OG/Twitter text and an Organization `brand` entry for ForgeOria.
- `scripts/generate-route-shells.mjs` — `forgeoria` shell + JSON-LD (replaces `forgeassist`).
- `public/sitemap.xml` — `/forgeassist` → `/forgeoria`.
- `src/index.css` — small ForgeOria helpers (icon button, off-screen honeypot).
- `nginx.conf` — production changes (below).
- `nginx.forgeoria-staging.conf`, `Dockerfile.forgeoria-staging` — new staging-only files.
- `scripts/verify-forgeoria.mjs` (`npm run verify:forgeoria`) — static source/config/dist checks.

### Product page (`/forgeoria`)
- Hero: large logo (on dark), signature, explanation, CTAs, and the workflow diagram.
- FR/EN toggle: a `role="group"` with two `aria-pressed` buttons. The page wrapper gets `lang="fr|en"`. Initial language comes from `?lang=` and then `navigator.language`; changing it updates `?lang=` with `history.replaceState` (no reload). The rest of the site stays in English.
- Sections: principles, use cases, current status (says plainly that it is in development and the demos are simulated), discovery form, privacy (`#privacy`).
- The demos are **simulated and local**: static fictional data, no `fetch`, no AI call, and this is labelled in the UI. The page has no metrics, customers, or claims about live integrations.

### Motion
- Library: the existing **`framer-motion` dependency (11.18.x), from [motiondivision/motion](https://github.com/motiondivision/motion), MIT licence**. No other animation library was added.
- `useReducedMotion`: with reduced motion the diagram starts paused with every step shown complete, and transitions, the moving dot and the pulse ring are turned off. Section reveals render without animation.
- Reveals use `whileInView` with `viewport={{ once: true }}`.
- The only continuous animation is the diagram's step loop. It has a **Pause/Play** button and a **Replay** button, and it only runs while the diagram is on screen (`useInView`). Clicking a step pauses the loop and shows that step.
- No scroll hijacking: no wheel/touch handlers and no scroll-linked animation.
- Accessibility: demo tabs follow the WAI-ARIA tabs pattern (arrow keys, Home and End). Steps use `aria-current="step"`. The detail panel uses `aria-live="polite"` only while paused, so the loop doesn't keep announcing.

### Discovery form
- Payload sent exactly: `{name,email,company,companySize,budget,timeline,needs,locale,consent:true,consentVersion:'2026-10-v1',website}`. `website` is the honeypot field: it is hidden off-screen and humans send `''`. Whatever a bot types is forwarded so the API can discard it.
- Enums: companySize `1-10|11-50|51-200|201-1000|1000+`; budget `lt5k|5k-15k|15k-50k|gt50k|unknown`; timeline `asap|1-3m|3-6m|exploring`; needs ⊆ `lead_qualification|invoice_processing|support_triage|crm_sync|reporting|other` (at least 1).
- Client checks mirror the API limits (name 2–120, email ≤254, company 1–160). Consent is required. Each field has a label, `aria-invalid`, and an error message linked by `aria-describedby`.
- States: pending (fields and button disabled, spinner), error, and success. **Success is shown only when the response status is exactly 201.** The form handles 400/422 (invalid data), 429 (uses `Retry-After` or `retryAfterSec`), 503/502/504 (service unavailable), network errors and timeouts (15 s abort), and any other status (generic message).
- No `console.*` calls and no local/session storage. The data lives only in React state and is cleared after a 201. The browser sends nothing externally and no email is sent.
- The consent label is the consent text itself. It links to `#privacy`, and both places show version `2026-10-v1`.

### nginx — production (`nginx.conf`)
- `absolute_redirect off` gives relative `Location` headers, so the 301 keeps `https` behind the Cloudflare tunnel.
- `location ~ ^/forgeassist(/.*)?$ { return 301 /forgeoria$is_args$args; }`.
- `location ^~ /api/autopilot/` is an allowlist. Only `= /api/autopilot/leads` (POST only, 16 KB body limit, access log off) is proxied. Anything else under `/api/autopilot/` (for example the API's admin routes) returns 404.
  - `resolver 127.0.0.11` + `set $forgeoria_api http://forgeoria-api:4000` + `rewrite … /api/$1 break` + `proxy_pass $forgeoria_api`. Because the name is resolved at request time, nginx **starts even if the `forgeoria-api` alias does not exist yet**. In that case the endpoint returns a JSON `503 {"error":"service_unavailable"}` (502/504 → `@forgeoria_unavailable`).
  - Client IP: `X-Forwarded-For`/`X-Real-IP` are set from `CF-Connecting-IP` when present, otherwise from `$remote_addr` (`map … $forgeoria_client_ip`). The inbound `CF-Connecting-IP` header is not forwarded.
- The existing `/api/contacts` → 404 block and the `/api/` → `backend:3001` proxy are **unchanged**. Server-level security headers still apply because none of the new locations use `add_header`.
- The canonical shell regex is now `(about|company|forgeoria)`.

### nginx — staging (`nginx.forgeoria-staging.conf`)
- Serves the static files. `/api/autopilot/leads` → `http://api:4000/api/leads`, with the same allowlist, Docker resolver and 503 fallback as production.
- **The original contact API is disabled**: `location /api/` returns `503 {"error":"contact_api_disabled_in_staging"}`, so staging cannot reach the SMTP/email backend.
- `Cache-Control: no-store` and `X-Robots-Tag: noindex, nofollow, noarchive` on every response, plus `robots.txt` → `Disallow: /`. The CSP is tighter (`connect-src 'self'`).
- Same `/forgeassist` 301.

### `Dockerfile.forgeoria-staging`
Multi-stage: `node:20-alpine` runs `npm ci && npm run build`, then `nginx:1.27-alpine` with the staging config. It uses no secrets or build args, and `.dockerignore` already excludes `.env*`. There is no compose file and no port binding: networks, the `api` alias and binding are up to the operator.

## Testing

```bash
npm ci
npm run build              # tsc + vite build + route shells (3 shells: about, company, forgeoria)
npm run verify:forgeoria   # static source / nginx / dist assertions
```

Run after deployment by the operator (not done here, because no container was started):

```bash
nginx -t                                                    # inside the image
curl -sI https://<host>/forgeassist?x=1                     # 301, Location: /forgeoria?x=1
curl -sI https://<host>/forgeoria                           # 200
curl -s -o /dev/null -w '%{http_code}\n' https://<host>/api/autopilot/admin/leads   # 404
curl -s -X GET -o /dev/null -w '%{http_code}\n' https://<host>/api/autopilot/leads  # 403
# without forgeoria-api reachable:
curl -s -X POST -H 'Content-Type: application/json' -d '{}' https://<host>/api/autopilot/leads   # 503 JSON
# staging only:
curl -sI https://<staging>/ | grep -i -E 'cache-control|x-robots-tag'
curl -s https://<staging>/api/contact                       # 503 contact_api_disabled_in_staging
```

Manual UI checks (performed where recorded in `STAGING-VALIDATION.md`): switching FR/EN; demo tabs (mouse and keyboard); Pause/Play/Replay; OS "reduce motion" on (static diagram, no reveals); form validation, 400/429/503 messages, success only after a real 201; logo missing → text wordmark, with no broken image.

## Deployment prerequisites
1. **Logo**: installed at `public/brand/forgeoria-logo.png` (2172×724 px). The final asset uses an opaque anthracite background with an orange symbol and white wordmark, deliberately displayed on dark sections. Dimensions match the code. See `STAGING-VALIDATION.md` for the reviewed visual result.
2. **Production API**: attach the vitrine container to the private network that has the ForgeOria API under the alias **`forgeoria-api`** (port 4000, global prefix `/api`). Until that is done, `/api/autopilot/leads` returns 503 and the rest of the site is unaffected.
3. **Staging API**: the staging vitrine must reach the API as **`api:4000`**.
4. **API config**: `TRUST_PROXY_HOPS` must match a single nginx hop. Keep **`N8N_ENABLED=false`**: the privacy text says that submitting triggers no automatic email or third-party integration. If n8n or email delivery is ever enabled, update `privacy.paragraphs` in `forgeoria-copy.ts` and bump `CONSENT_VERSION` on both the API and the site.
5. The API's `CONSENT_VERSIONS` must include `2026-10-v1`.
6. Run `nginx -t` in the built image before switching traffic.

## Rollback
- Code: revert this branch's changes (`git revert` of the integration commit, or redeploy the previous image tag). Nothing in the database or the API is changed by the site.
- Quick nginx-only rollback: remove the `location ^~ /api/autopilot/` and `@forgeoria_unavailable` blocks. The form then returns errors but nothing else breaks. Keep the `/forgeassist` 301 if `/forgeoria` stays published. If you go back to the old site, also restore `forgeassist` in the shell regex and the sitemap.
- Staging: stop/remove the staging container built from `Dockerfile.forgeoria-staging`. It shares nothing with production.

## Known limits
- No automated browser/E2E tests: the repo has no test runner, and adding one was out of scope. The checks are static (`verify-forgeoria.mjs`) plus the TypeScript build.
- Both staging and production candidate Nginx configurations passed syntax validation in disposable containers; see `STAGING-VALIDATION.md`.
- Header, footer and homepage stay English-only, like the rest of the site. Only `/forgeoria` is bilingual. The pre-rendered `/forgeoria` shell metadata is in English.
- `AUDIT-REPORT-2026-10-12.md` still mentions ForgeAssist on purpose, as a historical record.
