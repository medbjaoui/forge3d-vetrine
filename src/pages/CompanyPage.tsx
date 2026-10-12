import { ArrowRight, CheckCircle2, CircleDashed, ExternalLink, Mail } from 'lucide-react';
import Seo from '../components/Seo';

const facts = [
  ['Public name', 'FORGE3D'], ['Country', 'Tunisia'], ['Official website', 'forge3d.tech'], ['Business contact', 'contact@forge3d.tech'],
  ['Legal company name', 'Pending verified publication'], ['Founding date', 'Pending verified publication'], ['RNE / tax identifiers', 'Pending verified publication'], ['Professional address', 'Pending verified publication'],
];

export default function CompanyPage() {
  return (
    <>
      <Seo title="FORGE3D Company Overview — Tunisia" description="A concise, verifiable overview of FORGE3D activities, technology projects, public contact information and development roadmap." path="/company" />
      <section className="page-hero bg-dark-grid text-white"><div className="container-forge px-4 sm:px-6 lg:px-8"><p className="section-tag">Company overview</p><h1 className="page-title">FORGE3D,<br /><span className="text-gradient">clearly documented.</span></h1><p className="page-lead">A concise view of the company’s public information, active business areas and technology roadmap for partners, accelerators and investors.</p></div></section>

      <section className="section-padding bg-white"><div className="container-forge"><div className="max-w-3xl"><p className="section-tag">Verified public facts</p><h2 className="section-title text-forge-text">Company information</h2><p className="mt-4 text-forge-text-muted">Fields that cannot currently be supported by a verified source are explicitly marked as pending rather than inferred.</p></div><dl className="mt-10 grid overflow-hidden rounded-3xl border border-slate-200 sm:grid-cols-2 lg:grid-cols-4">{facts.map(([label,value])=><div key={label} className="border-b border-r border-slate-200 p-6"><dt className="text-xs font-bold uppercase tracking-widest text-slate-400">{label}</dt><dd className={`mt-3 text-sm font-semibold ${value.startsWith('Pending') ? 'text-slate-500' : 'text-forge-text'}`}>{value}</dd></div>)}</dl></div></section>

      <section className="section-padding bg-forge-gray"><div className="container-forge grid gap-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="section-tag">Business activities</p><h2 className="section-title text-forge-text">What FORGE3D does</h2></div><div className="grid gap-5 sm:grid-cols-3">{[['3D Printing','Custom printing, product design and manufacturing.'],['Software Development','SaaS platforms, business applications and automation.'],['AI Research','Evaluation of agents and intelligent workflows for commerce and operations.']].map(([title,text])=><article key={title} className="premium-card"><h3 className="text-xl font-bold text-forge-text">{title}</h3><p className="mt-4 text-sm leading-7 text-forge-text-muted">{text}</p></article>)}</div></div></section>

      <section className="section-padding bg-forge-dark text-white"><div className="container-forge grid gap-12 lg:grid-cols-2"><div><p className="section-tag">Technology project</p><h2 className="section-title">ForgeAssist</h2><p className="mt-5 text-lg leading-8 text-white/60">AI-powered commerce automation for customer communication and order management. The project is currently in development.</p><a href="/forgeassist" className="btn-primary mt-8">Review ForgeAssist <ArrowRight size={16}/></a></div><div className="rounded-3xl border border-white/10 bg-white/[.04] p-8"><div className="flex items-center gap-3 text-forge-orange"><CircleDashed/><span className="font-bold uppercase tracking-widest">Development roadmap</span></div><div className="mt-6 space-y-5">{[['Current','Product foundation and workflow evaluation'],['Next','Controlled integration and pilot validation'],['Later','Release decisions based on verified readiness']].map(([phase,text])=><div key={phase} className="flex gap-4 border-t border-white/10 pt-5"><CheckCircle2 className="mt-1 shrink-0 text-forge-orange" size={18}/><div><p className="font-bold">{phase}</p><p className="mt-1 text-sm text-white/55">{text}</p></div></div>)}</div></div></div></section>

      <section className="section-padding bg-white"><div className="container-forge grid items-center gap-7 rounded-3xl bg-forge-gray p-8 sm:grid-cols-[1fr_auto]"><div><h2 className="text-3xl font-bold text-forge-text">Verification contact</h2><p className="mt-2 text-forge-text-muted">Request current supporting company information directly from FORGE3D.</p></div><div className="flex flex-col gap-3 sm:flex-row"><a href="mailto:contact@forge3d.tech" className="btn-primary"><Mail size={17}/> Contact</a><a href="https://forge3d.tech" className="btn-secondary">Official site <ExternalLink size={14}/></a></div></div></section>
    </>
  );
}
