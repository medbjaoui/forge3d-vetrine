import { ArrowRight, Bot, Box, Braces, ExternalLink, Mail, ShieldCheck, ShoppingBag, Workflow } from 'lucide-react';
import Seo from '../components/Seo';
import HomeForgeOriaBlock from '../components/forgeoria/HomeForgeOriaBlock';

const activities = [
  { icon: Box, title: '3D Printing', text: 'Custom 3D printing, product design and manufacturing for practical prototypes, parts and objects.', link: 'https://shop.forge3d.tech', label: 'Explore the 3D shop' },
  { icon: Braces, title: 'Software Development', text: 'SaaS platforms, business applications and automation designed around real operational needs.', link: '/company', label: 'View our technology work' },
  { icon: Bot, title: 'Automation & AI', text: 'Business automation workflows with human review, developed under the ForgeOria brand and currently in development.', link: '/forgeoria', label: 'Discover ForgeOria' },
  { icon: ShieldCheck, title: 'IT Management & Compliance', text: 'VigiParc brings asset management, security operations and ISO 27001 evidence together on infrastructure controlled by the client.', link: '/vigiparc', label: 'Découvrir VigiParc' },
];

export default function HomePage() {
  return (
    <>
      <Seo title="FORGE3D — 3D Printing, Software & AI Solutions" description="FORGE3D is a Tunisia-based technology company working across 3D printing, software development and business automation with ForgeOria." path="/" />
      <section className="hero-shell bg-dark-grid pt-28 text-white lg:pt-36">
        <div className="forge-orb -left-32 top-16 h-96 w-96 opacity-50" aria-hidden="true" />
        <div className="container-forge relative z-10 grid items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.15fr_.85fr] lg:px-8 lg:py-24">
          <div>
            <p className="section-tag">Tunisia-based technology company</p>
            <h1 className="max-w-4xl text-5xl font-bold leading-[.98] sm:text-6xl lg:text-7xl">3D Printing,<br /><span className="text-gradient">Software & AI</span> Solutions</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65">We design practical technologies that help businesses improve efficiency and accelerate digital transformation—while continuing to deliver custom 3D printing and manufacturing services.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="https://shop.forge3d.tech" target="_blank" rel="noopener noreferrer" className="btn-primary justify-center"><ShoppingBag size={18} /> Explore 3D printing <ExternalLink size={14} /></a>
              <a href="/forgeoria" className="btn-ghost justify-center border border-white/15">Discover ForgeOria <ArrowRight size={17} /></a>
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
            <p className="section-tag">Technology & Innovation</p>
            <h2 id="technology-title" className="section-title text-forge-text">Three capabilities.<br /><span className="text-gradient">One practical mindset.</span></h2>
            <p className="section-subtitle mt-5">FORGE3D connects digital product development with physical production. Each activity is presented according to its current, verifiable stage.</p>
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
            <p className="section-tag">3D Printing stays at our core</p>
            <h2 className="section-title text-forge-text">From an idea to a tangible object.</h2>
            <p className="mt-6 text-lg leading-8 text-forge-text-muted">Our existing online shop remains the dedicated path for 3D products and orders. This company website adds context around FORGE3D’s broader technology work without changing the shopping experience.</p>
            <a href="https://shop.forge3d.tech" target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">Visit shop.forge3d.tech <ExternalLink size={15} /></a>
          </div>
          <div className="reveal reveal-delay-2 rounded-3xl bg-forge-dark p-8 text-white shadow-2xl">
            <div className="mb-8 flex items-center gap-3 text-forge-orange"><Box size={28} /><span className="text-sm font-bold uppercase tracking-[.2em]">3D workflow</span></div>
            {['Share your project or choose a product', 'Review the design and production requirements', 'Manufacture through the dedicated 3D service'].map((step, index) => (
              <div key={step} className="flex gap-4 border-t border-white/10 py-5"><span className="font-display text-2xl font-bold text-forge-orange">0{index + 1}</span><p className="pt-1 text-sm leading-6 text-white/65">{step}</p></div>
            ))}
          </div>
        </div>
      </section>

      <HomeForgeOriaBlock />

      <section id="contact" className="section-padding bg-white">
        <div className="container-forge rounded-3xl border border-slate-200 bg-forge-gray p-8 sm:p-12">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]"><div><p className="section-tag">Start a conversation</p><h2 className="text-3xl font-bold text-forge-text sm:text-4xl">Tell us what you are building.</h2><p className="mt-3 text-forge-text-muted">3D printing, software, automation or an AI research project.</p></div><a href="mailto:contact@forge3d.tech" className="btn-primary justify-center"><Mail size={18} /> contact@forge3d.tech</a></div>
        </div>
      </section>
    </>
  );
}
