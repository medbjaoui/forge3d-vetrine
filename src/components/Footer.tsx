import { ExternalLink, Mail, MapPin, ShoppingBag } from 'lucide-react';
import { ForgeOriaLogo } from './forgeoria/BrandMark';
import ProtectedEmailLink from './ProtectedEmailLink';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-forge-dark text-white">
      <div className="container-forge grid gap-10 px-4 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
        <div>
          <img src="/logo-forge3d-compact.webp" width="62" height="64" alt="FORGE3D" className="mb-5 h-16 w-auto object-contain" />
          <p className="max-w-sm text-sm leading-6 text-white/65">Impression 3D, logiciels, automatisation métier et recherche en IA depuis la Tunisie.</p>
          <a href="/forgeoria" className="mt-6 inline-flex flex-col gap-2 rounded-2xl border border-white/10 bg-white/[.03] p-4 transition-colors hover:border-forge-orange/40" aria-label="ForgeOria — L’automatisation qui fait avancer votre entreprise">
            <ForgeOriaLogo className="h-9 w-auto" fallbackClassName="text-2xl" />
            <span className="text-xs text-white/65">L’automatisation qui fait avancer votre entreprise.</span>
          </a>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/90">Explorer</h2>
          <div className="grid grid-cols-2 gap-3 text-sm text-white/65">
            <a href="/" className="hover:text-forge-orange">Accueil</a><a href="/about" className="hover:text-forge-orange">À propos</a>
            <a href="/company" className="hover:text-forge-orange">Entreprise</a><a href="/forgeoria" className="hover:text-forge-orange">ForgeOria</a>
            <a href="/vigiparc" className="hover:text-forge-orange">VigiParc</a>
            <a href="/forgeoria#discovery" className="hover:text-forge-orange">Appel découverte</a><a href="/forgeoria#privacy" className="hover:text-forge-orange">Confidentialité ForgeOria</a>
          </div>
        </div>
        <div>
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-white/90">Contact</h2>
          <div className="space-y-3 text-sm text-white/65">
            <ProtectedEmailLink className="flex items-center gap-2 hover:text-forge-orange"><Mail size={15} /><span><span>contact</span><span>@forge3d.tech</span></span></ProtectedEmailLink>
            <p className="flex items-center gap-2"><MapPin size={15} /> Tunisie</p>
            <a href="https://shop.forge3d.tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-forge-orange"><ShoppingBag size={15} /> Boutique d’impression 3D <ExternalLink size={12} /></a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/65">© {new Date().getFullYear()} FORGE3D. Tous droits réservés.</div>
    </footer>
  );
}
