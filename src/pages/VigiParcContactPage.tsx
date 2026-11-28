import { ArrowLeft, Clock3, Mail, ShieldCheck } from 'lucide-react';
import Seo from '../components/Seo';
import VigiParcLeadForm from '../components/VigiParcLeadForm';
import VigiParcNav from '../components/VigiParcNav';

export default function VigiParcContactPage() {
  return (
    <>
      <Seo title="Demander une démonstration | VigiParc — FORGE3D" description="Présentez votre parc en moins d’une minute et demandez une démonstration VigiParc adaptée à vos priorités." path="/vigiparc/contact" />
      <section className="hero-shell bg-dark-grid page-hero text-white">
        <div className="container-forge px-4 sm:px-6 lg:px-8">
          <a className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/70 hover:text-forge-orange" href="/vigiparc"><ArrowLeft size={16} /> VigiParc</a>
          <p className="section-tag">Démonstration personnalisée</p>
          <h1 className="page-title">Parlons de votre parc IT.</h1>
          <p className="page-lead">Cinq informations suffisent pour démarrer. Les détails techniques sont facultatifs et seront précisés avec vous.</p>
        </div>
      </section>
      <VigiParcNav />
      <section className="section-padding bg-forge-gray">
        <div className="container-forge grid gap-10 lg:grid-cols-[.65fr_1.35fr]">
          <aside>
            <p className="section-tag">À quoi vous attendre</p>
            <h2 className="text-3xl font-bold text-forge-text">Un premier échange clair, sans engagement.</h2>
            <ul className="mt-8 space-y-5 text-sm leading-6 text-forge-text-muted">
              <li className="flex gap-3"><Clock3 className="mt-0.5 shrink-0 text-forge-orange" size={20} /><span>Une demande initiale complétable en moins d’une minute.</span></li>
              <li className="flex gap-3"><ShieldCheck className="mt-0.5 shrink-0 text-forge-orange" size={20} /><span>Aucun outil publicitaire, reCAPTCHA ou service anti-spam tiers.</span></li>
              <li className="flex gap-3"><Mail className="mt-0.5 shrink-0 text-forge-orange" size={20} /><span>Une réponse par l’équipe FORGE3D pour cadrer la démonstration.</span></li>
            </ul>
            <p className="mt-8 text-sm text-forge-text-muted">Vous préférez l’e-mail ? <a className="font-semibold text-orange-700 underline underline-offset-4" href="mailto:contact@forge3d.tech">contact@forge3d.tech</a></p>
          </aside>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <VigiParcLeadForm />
          </div>
        </div>
      </section>
    </>
  );
}
