import { ArrowRight, CheckCircle2, CircleDashed, ExternalLink, Mail } from 'lucide-react';
import Seo from '../components/Seo';
import { ForgeOriaLogo } from '../components/forgeoria/BrandMark';
import { SIGNATURE } from '../lib/forgeoria';

const facts = [
  ['Nom public', 'FORGE3D'], ['Pays', 'Tunisie'], ['Site officiel', 'forge3d.tech'], ['Contact professionnel', 'contact@forge3d.tech'],
  ['Raison sociale', 'Publication après vérification'], ['Date de création', 'Publication après vérification'], ['RNE / identifiants fiscaux', 'Publication après vérification'], ['Adresse professionnelle', 'Publication après vérification'],
];

export default function CompanyPage() {
  return (
    <>
      <Seo title="FORGE3D — Présentation de l’entreprise en Tunisie" description="Présentation vérifiable des activités, projets technologiques, informations publiques et feuille de route de FORGE3D." path="/company" />
      <section className="page-hero bg-dark-grid text-white"><div className="container-forge px-4 sm:px-6 lg:px-8"><p className="section-tag">Présentation de l’entreprise</p><h1 className="page-title">FORGE3D,<br /><span className="text-gradient">documentée clairement.</span></h1><p className="page-lead">Une vue concise des informations publiques, activités et projets de FORGE3D pour les clients et partenaires.</p></div></section>

      <section className="section-padding bg-white"><div className="container-forge"><div className="max-w-3xl"><p className="section-tag">Faits publics vérifiables</p><h2 className="section-title text-forge-text">Informations sur l’entreprise</h2><p className="mt-4 text-forge-text-muted">Les champs sans source vérifiée sont indiqués comme tels au lieu d’être déduits.</p></div><dl className="mt-10 grid overflow-hidden rounded-3xl border border-slate-200 sm:grid-cols-2 lg:grid-cols-4">{facts.map(([label,value])=><div key={label} className="border-b border-r border-slate-200 p-6"><dt className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</dt><dd className={`mt-3 text-sm font-semibold ${value.startsWith('Publication') ? 'text-slate-500' : 'text-forge-text'}`}>{value}</dd></div>)}</dl></div></section>

      <section className="section-padding bg-forge-gray"><div className="container-forge grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="section-tag">Activités</p><h2 className="section-title text-forge-text">Ce que fait FORGE3D</h2></div><div className="grid gap-5 sm:grid-cols-3">{[['Impression 3D','Impression sur mesure, conception produit et fabrication.'],['Logiciels et VigiParc','Applications métier, gestion de parc IT et automatisation.'],['Recherche en IA','Évaluation d’agents et de workflows intelligents pour les opérations.']].map(([title,text])=><article key={title} className="premium-card"><h3 className="text-xl font-bold text-forge-text">{title}</h3><p className="mt-4 text-sm leading-7 text-forge-text-muted">{text}</p></article>)}</div></div></section>

      <section className="section-padding bg-forge-dark text-white"><div className="container-forge grid gap-12 lg:grid-cols-2"><div><p className="section-tag">Marque d’automatisation</p><h2 className="section-title"><ForgeOriaLogo className="h-14 w-auto sm:h-16" fallbackClassName="text-5xl" /></h2><p className="mt-4 font-display text-2xl font-bold text-forge-orange">{SIGNATURE.fr}</p><p className="mt-5 text-lg leading-8 text-white/70">ForgeOria est l’offre d’automatisation métier de FORGE3D : qualification, traitement documentaire et tri du support, avec validation humaine avant toute action. L’offre est en développement et ses démonstrations sont simulées.</p><a href="/forgeoria" className="btn-primary mt-8">Découvrir ForgeOria <ArrowRight size={16}/></a></div><div className="rounded-3xl border border-white/10 bg-white/[.04] p-8"><div className="flex items-center gap-3 text-forge-orange"><CircleDashed/><span className="font-bold uppercase tracking-widest">Feuille de route</span></div><div className="mt-6 space-y-5">{[['Aujourd’hui','Fondations produit et évaluation des workflows'],['Ensuite','Intégrations contrôlées et validation pilote'],['Plus tard','Décision de lancement selon un niveau de maturité vérifié']].map(([phase,text])=><div key={phase} className="flex gap-4 border-t border-white/10 pt-5"><CheckCircle2 className="mt-1 shrink-0 text-forge-orange" size={18}/><div><p className="font-bold">{phase}</p><p className="mt-1 text-sm text-white/65">{text}</p></div></div>)}</div></div></div></section>

      <section className="section-padding bg-white"><div className="container-forge grid items-center gap-7 rounded-3xl bg-forge-gray p-8 sm:grid-cols-[1fr_auto]"><div><h2 className="text-3xl font-bold text-forge-text">Vérifier une information</h2><p className="mt-2 text-forge-text-muted">Demandez directement à FORGE3D les justificatifs professionnels disponibles.</p></div><div className="flex flex-col gap-3 sm:flex-row"><a href="mailto:contact@forge3d.tech" className="btn-primary"><Mail size={17}/> Contact</a><a href="https://forge3d.tech" className="btn-secondary">Site officiel <ExternalLink size={14}/></a></div></div></section>
    </>
  );
}
