import { ArrowRight, Bot, Box, Braces, ExternalLink, Mail, ShieldCheck, ShoppingBag, Workflow } from 'lucide-react';
import Seo from '../components/Seo';
import HomeForgeOriaBlock from '../components/forgeoria/HomeForgeOriaBlock';

const activities = [
  { icon: ShieldCheck, title: 'VigiParc', text: 'Gestion du parc, sécurité et preuves ISO 27001 sur une infrastructure contrôlée par le client.', link: '/vigiparc', label: 'Découvrir VigiParc' },
  { icon: Box, title: 'Impression 3D', text: 'Impression sur mesure, conception produit et fabrication de prototypes, pièces et objets utiles.', link: 'https://shop.forge3d.tech', label: 'Visiter la boutique 3D' },
  { icon: Bot, title: 'ForgeOria', text: 'Workflows métier avec validation humaine, conçus pour qualifier, trier et préparer les actions suivantes.', link: '/forgeoria', label: 'Découvrir ForgeOria' },
  { icon: Braces, title: 'Logiciels sur mesure', text: 'Applications métier et plateformes adaptées à des besoins opérationnels réels.', link: '/company', label: 'Voir nos activités' },
];

export default function HomePage() {
  return (
    <>
      <Seo title="FORGE3D — Impression 3D, VigiParc et automatisation en Tunisie" description="FORGE3D conçoit en Tunisie des solutions d’impression 3D, de gestion IT avec VigiParc et d’automatisation métier avec ForgeOria." path="/" />
      <section className="hero-shell bg-dark-grid pt-28 text-white lg:pt-36">
        <div className="forge-orb -left-32 top-16 h-96 w-96 opacity-50" aria-hidden="true" />
        <div className="container-forge relative z-10 grid items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_.85fr] lg:px-8 lg:py-24">
          <div>
            <p className="section-tag">Entreprise technologique tunisienne</p>
            <h1 className="max-w-4xl text-5xl font-bold leading-[.98] sm:text-6xl lg:text-7xl">Des solutions utiles,<br /><span className="text-gradient">physiques et numériques.</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">FORGE3D accompagne les PME avec VigiParc pour leur parc IT, l’impression 3D pour leurs projets physiques et ForgeOria pour automatiser leurs workflows.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="/vigiparc" className="btn-primary justify-center"><ShieldCheck size={18} /> Découvrir VigiParc <ArrowRight size={17} /></a>
              <a href="https://shop.forge3d.tech" target="_blank" rel="noopener noreferrer" className="btn-ghost justify-center border border-white/15"><ShoppingBag size={18} /> Boutique 3D <ExternalLink size={14} /></a>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md" aria-hidden="true">
            <div className="absolute inset-8 rotate-6 rounded-[2.5rem] border border-forge-orange/30 bg-forge-orange/5" />
            <div className="absolute inset-16 -rotate-6 rounded-[2rem] border border-white/10 bg-white/[.03] backdrop-blur-sm" />
            <div className="absolute inset-0 flex items-center justify-center"><div className="tech-core"><Workflow size={56} /></div></div>
            <span className="tech-node left-2 top-1/4">3D</span><span className="tech-node right-0 top-1/3">SaaS</span><span className="tech-node bottom-8 left-1/3">AI</span>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white" aria-labelledby="technology-title">
        <div className="container-forge">
          <div className="max-w-3xl reveal">
            <p className="section-tag">Nos activités</p>
            <h2 id="technology-title" className="section-title text-forge-text">Trois offres claires.<br /><span className="text-gradient">Une même exigence pratique.</span></h2>
            <p className="section-subtitle mt-5">Chaque activité répond à un besoin concret et est présentée selon son état réel, sans promesse non vérifiable.</p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {activities.map(({ icon: Icon, title, text, link, label }, index) => (
              <article key={title} className={`reveal reveal-delay-${index + 1} premium-card group`}>
                <div className="mb-8 flex items-center justify-between"><span className="icon-box"><Icon /></span><span className="text-xs font-bold tracking-[.18em] text-slate-300">0{index + 1}</span></div>
                <h3 className="text-2xl font-bold text-forge-text">{title}</h3><p className="mt-4 min-h-[84px] text-sm leading-7 text-forge-text-muted">{text}</p>
                <a href={link} className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-forge-orange">{label} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding overflow-hidden bg-forge-gray">
        <div className="container-forge grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal">
            <p className="section-tag">L’impression 3D reste au cœur de FORGE3D</p>
            <h2 className="section-title text-forge-text">De l’idée à l’objet tangible.</h2>
            <p className="mt-6 text-lg leading-8 text-forge-text-muted">La boutique en ligne reste l’espace dédié aux produits et commandes 3D. Le site institutionnel présente les autres activités technologiques sans modifier ce parcours d’achat.</p>
            <a href="https://shop.forge3d.tech" target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">Visiter shop.forge3d.tech <ExternalLink size={15} /></a>
          </div>
          <div className="reveal reveal-delay-2 rounded-3xl bg-forge-dark p-8 text-white shadow-2xl">
            <div className="mb-8 flex items-center gap-3 text-forge-orange"><Box size={28} /><span className="text-sm font-bold uppercase tracking-[.2em]">Parcours 3D</span></div>
            {['Présenter votre projet ou choisir un produit', 'Valider la conception et les contraintes de production', 'Fabriquer avec le service 3D dédié'].map((step, index) => (
              <div key={step} className="flex gap-4 border-t border-white/10 py-5"><span className="font-display text-2xl font-bold text-forge-orange">0{index + 1}</span><p className="pt-1 text-sm leading-6 text-white/65">{step}</p></div>
            ))}
          </div>
        </div>
      </section>

      <HomeForgeOriaBlock />

      <section id="contact" className="section-padding bg-white">
        <div className="container-forge rounded-3xl border border-slate-200 bg-forge-gray p-8 sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]"><div><p className="section-tag">Parlons de votre projet</p><h2 className="text-3xl font-bold text-forge-text sm:text-4xl">Quel problème voulez-vous résoudre ?</h2><p className="mt-3 text-forge-text-muted">Parc IT, impression 3D, logiciel métier ou automatisation : nous vous orientons vers le bon parcours.</p></div><a href="mailto:contact@forge3d.tech" className="btn-primary justify-center"><Mail size={18} /> contact@forge3d.tech</a></div>
        </div>
      </section>
    </>
  );
}
