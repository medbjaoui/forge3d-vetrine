import { useEffect, useState } from 'react';
import { Menu, X, ExternalLink, ShoppingBag } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'À propos', href: '#apropos' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sections = ['accueil', 'services', 'portfolio', 'apropos', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-forge-dark/95 backdrop-blur-md shadow-lg border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="container-forge px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <a
            href="#accueil"
            onClick={(e) => { e.preventDefault(); handleNavClick('#accueil'); }}
            className="flex items-center gap-3 group"
            aria-label="Forge3D – Accueil"
          >
            <img
              src="/logo-forge3d.png"
              alt="Forge3D Logo"
              className="h-9 lg:h-11 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
              onError={(e) => {
                // Fallback text logo if image not found
                (e.target as HTMLImageElement).style.display = 'none';
                const fallback = document.createElement('span');
                fallback.className = 'font-display font-bold text-2xl text-white';
                fallback.innerHTML = '<span class="text-orange-500">FORGE</span>3D';
                (e.target as HTMLImageElement).parentNode?.appendChild(fallback);
              }}
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Navigation principale">
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                    isActive
                      ? 'text-forge-orange bg-forge-orange/10'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {label}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="https://shop.forge3d.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/70 hover:text-forge-orange text-sm font-medium transition-colors duration-200"
              title="Accéder à la boutique"
            >
              <ShoppingBag size={16} />
              Boutique
            </a>
            <a
              href="https://www.linkedin.com/company/forge3d-tech"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#0A66C2] hover:bg-[#0959a9] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors duration-200"
              aria-label="Suivre Forge3D sur LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
              <ExternalLink size={12} />
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="btn-primary text-sm"
            >
              Consultation gratuite
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white hover:text-forge-orange transition-colors duration-200 p-2 rounded-lg hover:bg-white/5"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-forge-dark/98 backdrop-blur-md border-t border-white/5 px-4 py-4 space-y-1">
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.replace('#', '');
            const isActive = activeSection === id;
            return (
              <a
                key={href}
                href={href}
                onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                className={`block px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                  isActive
                    ? 'text-forge-orange bg-forge-orange/10'
                    : 'text-white/80 hover:text-white hover:bg-white/5'
                }`}
              >
                {label}
              </a>
            );
          })}
          <div className="pt-3 space-y-2">
            <a
              href="https://shop.forge3d.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/70 hover:text-forge-orange px-4 py-3 rounded-lg transition-colors"
            >
              <ShoppingBag size={16} />
              Accéder à la boutique
            </a>
            <a
              href="https://www.linkedin.com/company/forge3d-tech"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/80 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors"
            >
              <svg className="w-5 h-5 text-[#0A66C2]" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              Suivre sur LinkedIn
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); handleNavClick('#contact'); }}
              className="btn-primary w-full justify-center"
            >
              Demander une consultation
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
