import { CheckCircle2 } from 'lucide-react';
import Seo from '../components/Seo';
import VigiParcNav from '../components/VigiParcNav';
import { libelleDisponibilite, modulesVigiParc, offresVigiParc } from '../data/vigiparc-catalogue';

export default function VigiParcOffersPage() {
  return (
    <>
      <Seo title="Offres | VigiParc — FORGE3D" description="Comparez les périmètres Essentiel et Pro de VigiParc, proposés sur devis." path="/vigiparc/offres" />
      <section className="hero-shell bg-dark-grid page-hero text-white"><div className="container-forge px-4 sm:px-6 lg:px-8"><p className="section-tag">Catalogue commercial</p><h1 className="page-title">Deux périmètres, configurés pour votre parc.</h1><p className="page-lead">Aucun prix public n’est inventé : équipements, sites, installation, maintenance et support sont cadrés sur devis.</p></div></section>
      <VigiParcNav />
      <section className="section-padding bg-forge-gray">
        <div className="container-forge grid gap-7 lg:grid-cols-2">
          {offresVigiParc.map((offre) => <article key={offre.id} className="premium-card flex flex-col"><p className="section-tag">Offre personnalisée</p><h2 className="text-3xl font-bold text-forge-text">{offre.nom}</h2><p className="mt-4 leading-7 text-forge-text-muted">{offre.description}</p><dl className="mt-7 grid gap-3 text-sm"><div><dt className="font-bold text-forge-text">Équipements</dt><dd className="text-forge-text-muted">{offre.equipements}</dd></div><div><dt className="font-bold text-forge-text">Sites</dt><dd className="text-forge-text-muted">{offre.sites}</dd></div><div><dt className="font-bold text-forge-text">Support</dt><dd className="text-forge-text-muted">{offre.support}</dd></div></dl><ul className="mt-7 space-y-3">{offre.modules.map((id) => { const module = modulesVigiParc.find((item) => item.id === id); return module ? <li key={id} className="flex gap-3 text-sm text-forge-text-muted"><CheckCircle2 className="mt-0.5 shrink-0 text-forge-orange" size={18} /><span><strong className="text-forge-text">{module.nom}</strong> · {libelleDisponibilite[module.disponibilite]}</span></li> : null; })}</ul><a className="btn-primary mt-8 justify-center" href="/vigiparc#demonstration">Demander un devis</a></article>)}
        </div>
        <div className="container-forge mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-6 text-amber-950"><strong>Lecture du catalogue :</strong> « En préparation » indique qu’un module n’est pas proposé comme fonction disponible. Les conditions commerciales sont validées avant chaque publication.</div>
      </section>
    </>
  );
}
