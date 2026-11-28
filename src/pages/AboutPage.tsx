import { ArrowRight, Bot, Box, Braces, Mail, MapPin } from 'lucide-react';
import Seo from '../components/Seo';

export default function AboutPage() {
  return (
    <>
      <Seo title="À propos de FORGE3D — Entreprise technologique en Tunisie" description="Découvrez FORGE3D, ses activités d’impression 3D, de développement logiciel, de gestion IT et d’automatisation en Tunisie." path="/about" />
      <section className="page-hero bg-dark-grid text-white"><div className="container-forge px-4 sm:px-6 lg:px-8"><p className="section-tag">À propos de FORGE3D</p><h1 className="page-title">Construire des technologies utiles,<br /><span className="text-gradient">physiques et numériques.</span></h1><p className="page-lead">FORGE3D est une entreprise technologique tunisienne active dans l’impression 3D, les logiciels, la gestion IT et l’automatisation métier.</p></div></section>

      <section className="section-padding bg-white"><div className="container-forge grid gap-12 lg:grid-cols-2">
        <div className="reveal"><p className="section-tag">Notre parcours</p><h2 className="section-title text-forge-text">Une pratique technologique en développement.</h2><div className="mt-6 space-y-5 text-base leading-8 text-forge-text-muted"><p>L’activité publique de FORGE3D s’appuie sur l’impression 3D et la fabrication numérique. Elle s’étend aux logiciels, à la gestion de parc IT et à l’automatisation métier.</p><p>Nous privilégions les systèmes concrets : simplifier un workflow, rendre une information plus lisible ou transformer une conception numérique en résultat physique.</p><p>Les informations juridiques et dates non vérifiées ne sont pas présentées comme des faits établis.</p></div></div>
        <div className="reveal reveal-delay-2 grid gap-4 sm:grid-cols-2">
          {[{icon:Box,title:'Impression 3D',text:'Impression sur mesure, conception et fabrication.'},{icon:Braces,title:'Logiciels',text:'Applications métier, plateformes et automatisation.'},{icon:Bot,title:'Gestion IT et IA',text:'VigiParc et recherche sur les workflows intelligents.'},{icon:MapPin,title:'Implantation',text:'Tunisie'}].map(({icon:Icon,title,text})=><article key={title} className="premium-card"><span className="icon-box"><Icon /></span><h3 className="mt-6 text-xl font-bold text-forge-text">{title}</h3><p className="mt-3 text-sm leading-6 text-forge-text-muted">{text}</p></article>)}
        </div>
      </div></section>

      <section className="section-padding bg-forge-gray"><div className="container-forge grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2"><p className="section-tag">Vision</p><h2 className="section-title text-forge-text">Innover de façon pratique et transparente.</h2><p className="mt-6 max-w-3xl text-lg leading-8 text-forge-text-muted">Notre direction relie fabrication, logiciels, gestion IT et expérimentation responsable. Chaque projet est décrit selon son état réel ; une piste de recherche n’est jamais présentée comme un produit disponible.</p></div>
        <aside className="rounded-3xl bg-forge-dark p-8 text-white"><h2 className="text-xl font-bold">Informations publiques</h2><dl className="mt-6 space-y-5 text-sm"><div><dt className="text-white/60">Pays</dt><dd className="mt-1">Tunisie</dd></div><div><dt className="text-white/60">Contact professionnel</dt><dd className="mt-1"><a className="text-forge-orange" href="mailto:contact@forge3d.tech">contact@forge3d.tech</a></dd></div><div><dt className="text-white/60">Identifiants juridiques</dt><dd className="mt-1 text-white/70">Publication après vérification</dd></div><div><dt className="text-white/60">Adresse professionnelle</dt><dd className="mt-1 text-white/70">Publication après vérification</dd></div></dl></aside>
      </div></section>

      <section className="section-padding bg-white"><div className="container-forge flex flex-col items-start justify-between gap-6 rounded-3xl border border-orange-100 bg-orange-50 p-8 sm:flex-row sm:items-center"><div><h2 className="text-2xl font-bold text-forge-text">Vous souhaitez parler d’un projet ?</h2><p className="mt-2 text-forge-text-muted">Contactez FORGE3D directement ou consultez la présentation de l’entreprise.</p></div><div className="flex flex-col gap-3 sm:flex-row"><a href="mailto:contact@forge3d.tech" className="btn-primary"><Mail size={17}/> Nous écrire</a><a href="/company" className="btn-secondary">Voir l’entreprise <ArrowRight size={16}/></a></div></div></section>
    </>
  );
}
