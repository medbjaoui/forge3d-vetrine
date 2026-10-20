import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, CircleDashed, ClipboardCheck, FileText, Headphones, Lock, Mail, ShieldCheck, UserCheck, Users, Workflow } from 'lucide-react';
import Seo from '../components/Seo';
import { ForgeOriaLogo } from '../components/forgeoria/BrandMark';
import WorkflowDiagram from '../components/forgeoria/WorkflowDiagram';
import DiscoveryForm from '../components/forgeoria/DiscoveryForm';
import { COPY, CONSENT_VERSION } from '../lib/forgeoria-copy';
import { FORGEORIA_PATH, LOCALES, MAILTO, isLocale, type Locale } from '../lib/forgeoria';

const PRINCIPLE_ICONS = [UserCheck, ClipboardCheck, Workflow, ShieldCheck];
const USE_CASE_ICONS = [Users, FileText, Headphones];

const initialLocale = (): Locale => {
  const fromQuery = new URLSearchParams(window.location.search).get('lang');
  if (isLocale(fromQuery)) return fromQuery;
  return navigator.language?.toLowerCase().startsWith('fr') ? 'fr' : 'en';
};

export default function ForgeOriaPage() {
  const [locale, setLocale] = useState<Locale>(initialLocale);
  const reduce = useReducedMotion() ?? false;
  const t = COPY[locale];

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('lang', locale);
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
  }, [locale]);

  const reveal = (delay = 0) => reduce
    ? {}
    : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.2 }, transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const } };

  return (
    <div lang={locale}>
      <Seo
        title="ForgeOria — Automation that moves your business forward | FORGE3D"
        description="ForgeOria by FORGE3D designs business automation workflows with human review: lead qualification, invoice processing and support triage. In development; demos are simulated."
        path={FORGEORIA_PATH}
        type="software"
      />

      <section className="hero-shell bg-dark-grid pt-28 text-white lg:pt-36" aria-labelledby="forgeoria-title">
        <div className="forge-orb -left-40 top-10 h-[28rem] w-[28rem] opacity-40" aria-hidden="true" />
        <div className="container-forge relative z-10 grid items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-20">
          <div>
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-2 text-sm font-bold text-amber-300"><CircleDashed size={16} aria-hidden="true" /> {t.badge}</div>
              <div role="group" aria-label="Language / Langue" className="inline-flex rounded-full border border-white/15 bg-white/[.04] p-1 text-xs font-bold">
                {LOCALES.map((code) => (
                  <button key={code} type="button" lang={code} aria-pressed={locale === code} aria-label={code === 'fr' ? 'Français' : 'English'} onClick={() => setLocale(code)}
                    className={`rounded-full px-3 py-1.5 uppercase tracking-wider transition-colors ${locale === code ? 'bg-forge-orange text-white' : 'text-white/60 hover:text-white'}`}>
                    {code}
                  </button>
                ))}
              </div>
            </div>
            <motion.div {...reveal()}>
              <h1 id="forgeoria-title">
                <ForgeOriaLogo eager className="h-20 w-auto sm:h-24 lg:h-28" fallbackClassName="text-6xl sm:text-7xl lg:text-8xl" />
              </h1>
              <p className="mt-6 max-w-2xl font-display text-4xl font-bold leading-[1.02] sm:text-5xl lg:text-[3.4rem]">
                <span className="text-gradient">{t.signature}</span>
              </p>
              <p className="mt-6 max-w-xl text-lg leading-8 text-white/65">{t.lead}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href="#discovery" className="btn-primary justify-center">{t.ctaDiscovery} <ArrowRight size={17} aria-hidden="true" /></a>
                <a href="#demos" className="btn-ghost justify-center border border-white/15">{t.ctaDemos}</a>
              </div>
            </motion.div>
          </div>
          <WorkflowDiagram locale={locale} />
        </div>
      </section>

      <section className="section-padding bg-white" aria-labelledby="forgeoria-principles">
        <div className="container-forge">
          <motion.div className="max-w-3xl" {...reveal()}><p className="section-tag">{t.principles.tag}</p><h2 id="forgeoria-principles" className="section-title text-forge-text">{t.principles.title}</h2></motion.div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.principles.items.map((item, index) => {
              const Icon = PRINCIPLE_ICONS[index];
              return (
                <motion.article key={item.title} className="premium-card" {...reveal(index * 0.08)}>
                  <span className="icon-box"><Icon aria-hidden="true" /></span>
                  <h3 className="mt-6 text-xl font-bold text-forge-text">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-forge-text-muted">{item.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-forge-gray" aria-labelledby="forgeoria-use-cases">
        <div className="container-forge grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <motion.div {...reveal()}><p className="section-tag">{t.useCases.tag}</p><h2 id="forgeoria-use-cases" className="section-title text-forge-text">{t.useCases.title}</h2><p className="mt-5 text-forge-text-muted">{t.useCases.text}</p></motion.div>
          <div className="grid gap-5 sm:grid-cols-3">
            {t.useCases.items.map((item, index) => {
              const Icon = USE_CASE_ICONS[index];
              return (
                <motion.article key={item.title} className="premium-card" {...reveal(index * 0.08)}>
                  <Icon className="text-forge-orange" aria-hidden="true" />
                  <h3 className="mt-5 text-lg font-bold text-forge-text">{item.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-forge-text-muted">{item.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white" aria-labelledby="forgeoria-status">
        <div className="container-forge grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="section-tag">{t.status.tag}</p><h2 id="forgeoria-status" className="section-title text-forge-text">{t.status.title}</h2></div>
          <div className="rounded-3xl border border-amber-200 bg-amber-50 p-8"><p className="text-lg font-bold text-amber-950">{t.status.heading}</p><p className="mt-4 leading-7 text-amber-900/75">{t.status.text}</p></div>
        </div>
      </section>

      <section id="discovery" className="section-padding bg-forge-gray" aria-labelledby="forgeoria-discovery">
        <div className="container-forge grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="section-tag">{t.form.tag}</p>
            <h2 id="forgeoria-discovery" className="section-title text-forge-text">{t.form.title}</h2>
            <p className="mt-5 leading-7 text-forge-text-muted">{t.form.intro}</p>
            <div className="mt-8 rounded-3xl bg-forge-dark p-6 text-white">
              <p className="font-display text-xl font-bold">{t.contact.title}</p>
              <p className="mt-2 text-sm text-white/60">{t.contact.text}</p>
              <a href={MAILTO} className="btn-primary mt-5"><Mail size={17} aria-hidden="true" /> contact@forge3d.tech</a>
            </div>
          </div>
          <DiscoveryForm locale={locale} />
        </div>
      </section>

      <section id="privacy" className="section-padding bg-white" aria-labelledby="forgeoria-privacy">
        <div className="container-forge grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="section-tag"><Lock size={15} aria-hidden="true" /> {t.privacy.tag}</p><h2 id="forgeoria-privacy" className="section-title text-forge-text">{t.privacy.title}</h2></div>
          <div className="space-y-5 leading-7 text-forge-text-muted">
            {t.privacy.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className="rounded-2xl border border-slate-200 bg-forge-gray p-5 text-sm">
              <p className="font-bold text-forge-text">{t.privacy.versionLabel}{locale === 'fr' ? ' : ' : ': '}{CONSENT_VERSION}</p>
              <p className="mt-2">“{t.form.consent}”</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
