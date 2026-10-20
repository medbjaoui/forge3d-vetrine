// ForgeOria brand constants and discovery-form contract.
// Enum values mirror the private ForgeOria API (lead submission schema) — keep in sync.

export const FORGEORIA_PATH = '/forgeoria';
export const LEGACY_FORGEASSIST_PATH = '/forgeassist';
export const LEADS_ENDPOINT = '/api/autopilot/leads';

export const SIGNATURE = {
  fr: 'L’automatisation qui fait avancer votre entreprise.',
  en: 'Automation that moves your business forward.',
} as const;

// Supplied separately (orange symbol + white wordmark on an opaque anthracite background): dark backgrounds only.
// width/height = real pixel size of the installed asset; keep in sync if it is replaced.
export const FORGEORIA_LOGO = { src: '/brand/forgeoria-logo.png', width: 2172, height: 724 } as const;

export const MAILTO = `mailto:contact@forge3d.tech?subject=${encodeURIComponent('ForgeOria — discovery')}`;

export const LOCALES = ['fr', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const COMPANY_SIZES = ['1-10', '11-50', '51-200', '201-1000', '1000+'] as const;
export const BUDGETS = ['lt5k', '5k-15k', '15k-50k', 'gt50k', 'unknown'] as const;
export const TIMELINES = ['asap', '1-3m', '3-6m', 'exploring'] as const;
export const NEEDS = ['lead_qualification', 'invoice_processing', 'support_triage', 'crm_sync', 'reporting', 'other'] as const;
export const CONSENT_VERSION = '2026-10-v1';

export type CompanySize = (typeof COMPANY_SIZES)[number];
export type Budget = (typeof BUDGETS)[number];
export type Timeline = (typeof TIMELINES)[number];
export type Need = (typeof NEEDS)[number];

export type LeadPayload = {
  name: string;
  email: string;
  company: string;
  companySize: CompanySize;
  budget: Budget;
  timeline: Timeline;
  needs: Need[];
  locale: Locale;
  consent: true;
  consentVersion: typeof CONSENT_VERSION;
  // Honeypot: always '' for humans; whatever a bot typed is forwarded so the API can discard it.
  website: string;
};

export const isLocale = (value: string | null): value is Locale => value === 'fr' || value === 'en';
