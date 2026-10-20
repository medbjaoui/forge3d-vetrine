import { ExternalLink, Mail, MapPin, ShoppingBag } from 'lucide-react';
import { ForgeOriaLogo } from './forgeoria/BrandMark';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-forge-dark text-white">
      <div className="container-forge grid gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <img src="/logo-forge3d-transparent.png" alt="FORGE3D" className="mb-5 h-16 w-auto object-contain" />
          <p className="max-w-sm text-sm leading-6 text-white/55">3D printing, software development, business automation and AI research from Tunisia.</p>
          <a href="/forgeoria" className="mt-6 inline-flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[.03] p-4 transition-colors hover:border-forge-orange/40" aria-label="ForgeOria — Automation that moves your business forward">
            <ForgeOriaLogo className="h-9 w-auto" fallbackClassName="text-2xl" />
            <span className="text-xs text-white/50">Automation that moves your business forward.</span>
          </a>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/90">Explore</h2>
          <div className="grid grid-cols-2 gap-3 text-sm text-white/55">
            <a href="/" className="hover:text-forge-orange">Home</a><a href="/about" className="hover:text-forge-orange">About</a>
            <a href="/company" className="hover:text-forge-orange">Company</a><a href="/forgeoria" className="hover:text-forge-orange">ForgeOria</a>
            <a href="/forgeoria#discovery" className="hover:text-forge-orange">Automation discovery</a><a href="/forgeoria#privacy" className="hover:text-forge-orange">ForgeOria privacy</a>
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/90">Contact</h2>
          <div className="space-y-3 text-sm text-white/55">
            <a href="mailto:contact@forge3d.tech" className="flex items-center gap-2 hover:text-forge-orange"><Mail size={15} /> contact@forge3d.tech</a>
            <p className="flex items-center gap-2"><MapPin size={15} /> Tunisia</p>
            <a href="https://shop.forge3d.tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-forge-orange"><ShoppingBag size={15} /> 3D printing shop <ExternalLink size={12} /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/35">© {new Date().getFullYear()} FORGE3D. All rights reserved.</div>
    </footer>
  );
}
