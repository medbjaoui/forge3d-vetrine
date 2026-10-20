import { useRef, useState, type FormEvent } from 'react';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { COPY } from '../../lib/forgeoria-copy';
import {
  BUDGETS, COMPANY_SIZES, CONSENT_VERSION, LEADS_ENDPOINT, NEEDS, TIMELINES,
  type Budget, type CompanySize, type LeadPayload, type Locale, type Need, type Timeline,
} from '../../lib/forgeoria';

type Fields = { name: string; email: string; company: string; companySize: CompanySize | ''; budget: Budget | ''; timeline: Timeline | ''; needs: Need[]; consent: boolean; website: string };
type FieldErrors = Partial<Record<'name' | 'email' | 'company' | 'companySize' | 'budget' | 'timeline' | 'needs' | 'consent', string>>;
type Status = { kind: 'idle' } | { kind: 'pending' } | { kind: 'success' } | { kind: 'error'; message: string };

const EMPTY: Fields = { name: '', email: '', company: '', companySize: '', budget: '', timeline: '', needs: [], consent: false, website: '' };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TIMEOUT_MS = 15000;

const retryAfterSeconds = async (response: Response) => {
  const header = Number(response.headers.get('Retry-After'));
  if (Number.isFinite(header) && header > 0) return header;
  try {
    const body = (await response.json()) as { retryAfterSec?: unknown };
    return typeof body.retryAfterSec === 'number' && body.retryAfterSec > 0 ? body.retryAfterSec : null;
  } catch {
    return null;
  }
};

/**
 * Discovery request → POST /api/autopilot/leads (private ForgeOria API).
 * Data lives only in component state: no logging, no browser storage. Success is shown only on HTTP 201.
 */
export default function DiscoveryForm({ locale }: { locale: Locale }) {
  const t = COPY[locale].form;
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: 'idle' });
  const statusRef = useRef<HTMLDivElement>(null);
  const pending = status.kind === 'pending';

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    setFields((current) => ({ ...current, [key]: value }));
    if (key in errors) setErrors((current) => ({ ...current, [key]: undefined }));
    if (status.kind === 'error' || status.kind === 'success') setStatus({ kind: 'idle' });
  };

  const toggleNeed = (need: Need) => set('needs', fields.needs.includes(need) ? fields.needs.filter((n) => n !== need) : [...fields.needs, need]);

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    const name = fields.name.trim();
    if (name.length < 2 || name.length > 120) next.name = t.errors.invalid;
    if (!EMAIL_RE.test(fields.email.trim()) || fields.email.trim().length > 254) next.email = t.errors.invalid;
    const company = fields.company.trim();
    if (company.length < 1 || company.length > 160) next.company = t.errors.invalid;
    if (!fields.companySize) next.companySize = t.errors.invalid;
    if (!fields.budget) next.budget = t.errors.invalid;
    if (!fields.timeline) next.timeline = t.errors.invalid;
    if (fields.needs.length === 0) next.needs = t.errors.needs;
    if (!fields.consent) next.consent = t.errors.consent;
    return next;
  };

  const focusStatus = () => window.requestAnimationFrame(() => statusRef.current?.focus());

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    const found = validate();
    setErrors(found);
    const firstInvalid = Object.keys(found)[0];
    if (firstInvalid) {
      setStatus({ kind: 'error', message: found.consent && Object.keys(found).length === 1 ? t.errors.consent : t.errors.invalid });
      document.getElementById(`forgeoria-${firstInvalid}`)?.focus();
      return;
    }

    const payload: LeadPayload = {
      name: fields.name.trim(),
      email: fields.email.trim(),
      company: fields.company.trim(),
      companySize: fields.companySize as CompanySize,
      budget: fields.budget as Budget,
      timeline: fields.timeline as Timeline,
      needs: NEEDS.filter((need) => fields.needs.includes(need)),
      locale,
      consent: true,
      consentVersion: CONSENT_VERSION,
      website: fields.website,
    };

    setStatus({ kind: 'pending' });
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const response = await fetch(LEADS_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        credentials: 'same-origin',
        cache: 'no-store',
        signal: controller.signal,
      });
      if (response.status === 201) {
        setFields(EMPTY);
        setStatus({ kind: 'success' });
      } else if (response.status === 400 || response.status === 422) {
        setStatus({ kind: 'error', message: t.errors.badRequest });
      } else if (response.status === 429) {
        setStatus({ kind: 'error', message: t.errors.rateLimited(await retryAfterSeconds(response)) });
      } else if (response.status === 503 || response.status === 502 || response.status === 504) {
        setStatus({ kind: 'error', message: t.errors.unavailable });
      } else {
        setStatus({ kind: 'error', message: t.errors.unexpected });
      }
    } catch {
      setStatus({ kind: 'error', message: t.errors.network });
    } finally {
      window.clearTimeout(timer);
      focusStatus();
    }
  };

  const fieldClass = (key: keyof FieldErrors) =>
    `mt-2 w-full rounded-xl border bg-white px-4 py-3 text-sm text-forge-text shadow-sm transition-colors focus:border-forge-orange focus:outline-none focus:ring-2 focus:ring-forge-orange/25 disabled:opacity-60 ${errors[key] ? 'border-red-400' : 'border-slate-200'}`;
  const describedBy = (key: keyof FieldErrors) => (errors[key] ? `forgeoria-${key}-error` : undefined);
  const errorText = (key: keyof FieldErrors) => errors[key] && <p id={`forgeoria-${key}-error`} className="mt-1.5 text-xs font-medium text-red-600">{errors[key]}</p>;

  const select = <V extends string>(key: 'companySize' | 'budget' | 'timeline', label: string, values: readonly V[], labels: Record<V, string>) => (
    <div>
      <label htmlFor={`forgeoria-${key}`} className="text-sm font-semibold text-forge-text">{label}</label>
      <select id={`forgeoria-${key}`} name={key} required value={fields[key]} disabled={pending} aria-invalid={Boolean(errors[key])} aria-describedby={describedBy(key)} onChange={(e) => set(key, e.target.value as Fields[typeof key])} className={fieldClass(key)}>
        <option value="" disabled>{t.select}</option>
        {values.map((value) => <option key={value} value={value}>{labels[value]}</option>)}
      </select>
      {errorText(key)}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8" aria-busy={pending}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="forgeoria-name" className="text-sm font-semibold text-forge-text">{t.name}</label>
          <input id="forgeoria-name" name="name" type="text" autoComplete="name" required minLength={2} maxLength={120} value={fields.name} disabled={pending} aria-invalid={Boolean(errors.name)} aria-describedby={describedBy('name')} onChange={(e) => set('name', e.target.value)} className={fieldClass('name')} />
          {errorText('name')}
        </div>
        <div>
          <label htmlFor="forgeoria-email" className="text-sm font-semibold text-forge-text">{t.email}</label>
          <input id="forgeoria-email" name="email" type="email" autoComplete="email" required maxLength={254} value={fields.email} disabled={pending} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy('email')} onChange={(e) => set('email', e.target.value)} className={fieldClass('email')} />
          {errorText('email')}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="forgeoria-company" className="text-sm font-semibold text-forge-text">{t.company}</label>
          <input id="forgeoria-company" name="company" type="text" autoComplete="organization" required maxLength={160} value={fields.company} disabled={pending} aria-invalid={Boolean(errors.company)} aria-describedby={describedBy('company')} onChange={(e) => set('company', e.target.value)} className={fieldClass('company')} />
          {errorText('company')}
        </div>
        {select('companySize', t.companySize, COMPANY_SIZES, t.companySizes)}
        {select('budget', t.budget, BUDGETS, t.budgets)}
        <div className="sm:col-span-2 sm:max-w-[calc(50%-.625rem)]">{select('timeline', t.timeline, TIMELINES, t.timelines)}</div>
      </div>

      <fieldset className="mt-6" aria-describedby={describedBy('needs')}>
        <legend className="text-sm font-semibold text-forge-text">{t.needs}</legend>
        <div id="forgeoria-needs" tabIndex={-1} className="mt-3 grid gap-2 focus:outline-none sm:grid-cols-2">
          {NEEDS.map((need) => {
            const checked = fields.needs.includes(need);
            return (
              <label key={need} className={`flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-colors ${checked ? 'border-forge-orange bg-forge-orange-50 text-forge-text' : 'border-slate-200 text-forge-text-muted hover:border-orange-200'}`}>
                <input type="checkbox" name="needs" value={need} checked={checked} disabled={pending} onChange={() => toggleNeed(need)} className="h-4 w-4 accent-[#f97316]" />
                {t.needOptions[need]}
              </label>
            );
          })}
        </div>
        {errorText('needs')}
      </fieldset>

      <div className="forgeoria-hp" aria-hidden="true">
        <label htmlFor="forgeoria-website">{t.honeypot}</label>
        <input id="forgeoria-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={fields.website} onChange={(e) => set('website', e.target.value)} />
      </div>

      <div className="mt-6 rounded-2xl bg-forge-gray p-4">
        <label className="flex cursor-pointer gap-3 text-sm leading-6 text-forge-text">
          <input id="forgeoria-consent" type="checkbox" name="consent" required checked={fields.consent} disabled={pending} aria-invalid={Boolean(errors.consent)} aria-describedby={['forgeoria-consent-version', describedBy('consent')].filter(Boolean).join(' ')} onChange={(e) => set('consent', e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#f97316]" />
          <span>{t.consent}</span>
        </label>
        <p id="forgeoria-consent-version" className="mt-2 pl-7 text-xs text-forge-text-muted">
          <a href="#privacy" className="font-semibold text-forge-orange underline-offset-2 hover:underline">{t.privacyLink}</a> · {COPY[locale].privacy.versionLabel} {CONSENT_VERSION}
        </p>
        <div className="pl-7">{errorText('consent')}</div>
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={pending} className="btn-primary justify-center disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0">
          {pending ? <Loader2 size={17} className="animate-spin" aria-hidden="true" /> : <Send size={17} aria-hidden="true" />}
          {pending ? t.pending : t.submit}
        </button>
        <div ref={statusRef} tabIndex={-1} role="status" aria-live="polite" className="text-sm focus:outline-none">
          {status.kind === 'success' && <p className="flex items-start gap-2 font-semibold text-emerald-700"><CheckCircle2 size={18} className="mt-0.5 shrink-0" aria-hidden="true" /> {t.success}</p>}
          {status.kind === 'error' && <p className="flex items-start gap-2 font-semibold text-red-600"><AlertCircle size={18} className="mt-0.5 shrink-0" aria-hidden="true" /> {status.message}</p>}
        </div>
      </div>
    </form>
  );
}
