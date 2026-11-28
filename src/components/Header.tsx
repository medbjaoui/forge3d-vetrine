import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Menu, ShoppingBag, X } from 'lucide-react';

const links = [
  { label: 'Accueil', href: '/' },
  { label: 'À propos', href: '/about' },
  { label: 'Entreprise', href: '/company' },
  { label: 'ForgeOria', href: '/forgeoria' },
  { label: 'VigiParc', href: '/vigiparc' },
];

type HeaderProps = { currentPath?: string };

export default function Header({ currentPath = '/' }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const firstMobileLink = useRef<HTMLAnchorElement>(null);
  const path = currentPath.replace(/\/$/, '') || '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      requestAnimationFrame(() => menuButton.current?.focus());
    };
    window.addEventListener('keydown', onKeyDown);
    requestAnimationFrame(() => firstMobileLink.current?.focus());
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all ${scrolled || open ? 'border-white/10 bg-forge-dark/95 backdrop-blur-xl' : 'border-transparent bg-forge-dark/70 backdrop-blur-md'}`}>
      <div className="container-forge flex h-[72px] items-center justify-between px-4 sm:px-6 lg:h-20 lg:px-8">
        <a href="/" className="flex items-center" aria-label="Accueil FORGE3D">
          <img src="/logo-forge3d-compact.webp" width="55" height="56" alt="FORGE3D" className="h-14 w-auto object-contain" />
        </a>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigation principale">
          {links.map((link) => (
            <a key={link.href} href={link.href} aria-current={path === link.href ? 'page' : undefined}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${path === link.href ? 'bg-forge-orange/15 text-forge-orange' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <a href="https://shop.forge3d.tech" target="_blank" rel="noopener noreferrer" className="btn-primary text-sm">
            <ShoppingBag size={16} /> Boutique 3D <ExternalLink size={13} />
          </a>
        </div>
        <button ref={menuButton} className="rounded-lg p-2 text-white md:hidden" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" className="border-t border-white/10 bg-forge-dark px-4 py-5 md:hidden" aria-label="Navigation mobile">
          <div className="container-forge space-y-2">
            {links.map((link, index) => <a ref={index === 0 ? firstMobileLink : undefined} key={link.href} href={link.href} aria-current={path === link.href ? 'page' : undefined} className={`block rounded-xl px-4 py-3 font-semibold ${path === link.href ? 'bg-forge-orange/15 text-forge-orange' : 'text-white/80 hover:bg-white/5'}`}>{link.label}</a>)}
            <a href="https://shop.forge3d.tech" target="_blank" rel="noopener noreferrer" className="btn-primary mt-3 w-full justify-center"><ShoppingBag size={16} /> Visiter la boutique 3D</a>
          </div>
        </nav>
      )}
    </header>
  );
}
