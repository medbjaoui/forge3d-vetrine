import { ArrowRight, Bot, Box, Braces, Mail, MapPin } from 'lucide-react';
import Seo from '../components/Seo';

export default function AboutPage() {
  return (
    <>
      <Seo title="About FORGE3D — Technology Company in Tunisia" description="Learn about FORGE3D, its 3D printing activity, software development work and AI research direction in Tunisia." path="/about" />
      <section className="page-hero bg-dark-grid text-white"><div className="container-forge px-4 sm:px-6 lg:px-8"><p className="section-tag">About FORGE3D</p><h1 className="page-title">Building useful technology,<br /><span className="text-gradient">physical and digital.</span></h1><p className="page-lead">FORGE3D is a Tunisia-based technology company specializing in 3D printing, software development, business automation and AI-powered solutions.</p></div></section>

      <section className="section-padding bg-white"><div className="container-forge grid gap-12 lg:grid-cols-2">
        <div className="reveal"><p className="section-tag">Our story</p><h2 className="section-title text-forge-text">An expanding technology practice.</h2><div className="mt-6 space-y-5 text-base leading-8 text-forge-text-muted"><p>FORGE3D’s public activity is rooted in 3D printing and digital manufacturing. The company is expanding its technology work into software products, business automation and applied AI research.</p><p>We focus on practical systems: tools that simplify a workflow, make customer communication clearer or turn a digital design into a physical result.</p><p>Corporate registration details and the founding date are not published here until they can be verified against official documents.</p></div></div>
        <div className="reveal reveal-delay-2 grid gap-4 sm:grid-cols-2">
          {[{icon:Box,title:'3D Printing',text:'Custom printing, product design and manufacturing.'},{icon:Braces,title:'Software',text:'SaaS platforms, business applications and automation.'},{icon:Bot,title:'AI R&D',text:'Research into agents and intelligent business workflows.'},{icon:MapPin,title:'Location',text:'Tunisia'}].map(({icon:Icon,title,text})=><article key={title} className="premium-card"><span className="icon-box"><Icon /></span><h3 className="mt-6 text-xl font-bold text-forge-text">{title}</h3><p className="mt-3 text-sm leading-6 text-forge-text-muted">{text}</p></article>)}
        </div>
      </div></section>

      <section className="section-padding bg-forge-gray"><div className="container-forge grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2"><p className="section-tag">Vision</p><h2 className="section-title text-forge-text">Practical innovation with transparent claims.</h2><p className="mt-6 max-w-3xl text-lg leading-8 text-forge-text-muted">Our direction is to connect manufacturing, software and responsible AI experimentation. We describe projects according to their real development stage and do not present research plans as released products.</p></div>
        <aside className="rounded-3xl bg-forge-dark p-8 text-white"><h2 className="text-xl font-bold">Company information</h2><dl className="mt-6 space-y-5 text-sm"><div><dt className="text-white/40">Country</dt><dd className="mt-1">Tunisia</dd></div><div><dt className="text-white/40">Business contact</dt><dd className="mt-1"><a className="text-forge-orange" href="mailto:contact@forge3d.tech">contact@forge3d.tech</a></dd></div><div><dt className="text-white/40">Legal identifiers</dt><dd className="mt-1 text-white/65">Pending verified publication</dd></div><div><dt className="text-white/40">Professional address</dt><dd className="mt-1 text-white/65">Pending verified publication</dd></div></dl></aside>
      </div></section>

      <section className="section-padding bg-white"><div className="container-forge flex flex-col items-start justify-between gap-6 rounded-3xl border border-orange-100 bg-orange-50 p-8 sm:flex-row sm:items-center"><div><h2 className="text-2xl font-bold text-forge-text">Want to discuss a project?</h2><p className="mt-2 text-forge-text-muted">Contact FORGE3D directly or review the company overview.</p></div><div className="flex flex-col gap-3 sm:flex-row"><a href="mailto:contact@forge3d.tech" className="btn-primary"><Mail size={17}/> Email us</a><a href="/company" className="btn-secondary">Company overview <ArrowRight size={16}/></a></div></div></section>
    </>
  );
}
