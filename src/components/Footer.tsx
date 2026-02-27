import { ExternalLink, Mail, ShoppingBag } from 'lucide-react';

const QUICK_LINKS = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'À propos', href: '#apropos' },
  { label: 'Contact', href: '#contact' },
];

const SERVICES_LINKS = [
  'Administration Systèmes & Réseaux',
  'Cybersécurité & Protection',
  'Monitoring & SIEM',
  'Cloud & Migration Office 365',
  'E-commerce Impression 3D',
  'Fabrication 3D Sur Mesure',
];

const LEGAL_LINKS = [
  { label: 'Mentions légales', href: '#' },
  { label: 'Politique de confidentialité', href: '#' },
  { label: 'CGU', href: '#' },
  { label: 'Cookies', href: '#' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const id = href.replace('#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-forge-dark border-t border-white/5" role="contentinfo">
      {/* Main footer */}
      <div className="container-forge px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a
              href="#accueil"
              onClick={(e) => handleNav(e, '#accueil')}
              className="inline-block mb-5"
              aria-label="Forge3D – Retour en haut"
            >
              <img
                src="/logo-forge3d.png"
                alt="Forge3D"
                className="h-10 w-auto object-contain"
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  el.style.display = 'none';
                  const span = document.createElement('span');
                  span.className = 'font-display font-bold text-2xl text-white';
                  span.innerHTML = '<span style="color:#f97316">FORGE</span>3D';
                  el.parentNode?.appendChild(span);
                }}
              />
            </a>
            <p className="text-white/45 text-sm leading-relaxed mb-6">
              Société technologique tunisienne : sous-traitance IT (infrastructure,
              cybersécurité, cloud) et fabrication 3D à la demande. Votre partenaire unique.
            </p>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/forge3d-tech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Forge3D sur LinkedIn"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-[#0A66C2] flex items-center justify-center text-white/60 hover:text-white transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
              </a>
              <a
                href="mailto:contact@forge3d.tech"
                aria-label="Envoyer un email à Forge3D"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-forge-orange flex items-center justify-center text-white/60 hover:text-white transition-all duration-200"
              >
                <Mail size={15} />
              </a>
              <a
                href="https://shop.forge3d.tech"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Accéder à la boutique Forge3D"
                className="w-9 h-9 rounded-lg bg-white/5 hover:bg-forge-orange flex items-center justify-center text-white/60 hover:text-white transition-all duration-200"
              >
                <ShoppingBag size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-display font-semibold text-sm uppercase tracking-widest mb-5">
              Navigation
            </h3>
            <nav aria-label="Navigation pied de page">
              <ul className="space-y-3">
                {QUICK_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      onClick={(e) => handleNav(e, href)}
                      className="text-white/45 hover:text-forge-orange text-sm transition-colors duration-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-display font-semibold text-sm uppercase tracking-widest mb-5">
              Nos Services
            </h3>
            <ul className="space-y-3">
              {SERVICES_LINKS.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    onClick={(e) => handleNav(e, '#services')}
                    className="text-white/45 hover:text-forge-orange text-sm transition-colors duration-200"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Shop */}
          <div>
            <h3 className="text-white font-display font-semibold text-sm uppercase tracking-widest mb-5">
              Contact & Liens
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-white/30 text-xs mb-1 uppercase tracking-wide">Email</div>
                <a
                  href="mailto:contact@forge3d.tech"
                  className="text-white/60 hover:text-forge-orange text-sm transition-colors duration-200"
                >
                  contact@forge3d.tech
                </a>
              </div>
              <div>
                <div className="text-white/30 text-xs mb-1 uppercase tracking-wide">Site institutionnel</div>
                <span className="text-white/60 text-sm">www.forge3d.tech</span>
              </div>
              <div>
                <div className="text-white/30 text-xs mb-1 uppercase tracking-wide">Boutique en ligne</div>
                <a
                  href="https://shop.forge3d.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-forge-orange text-sm transition-colors duration-200 inline-flex items-center gap-1"
                >
                  shop.forge3d.tech
                  <ExternalLink size={11} aria-hidden="true" />
                </a>
              </div>
              <div className="pt-2">
                <a
                  href="#contact"
                  onClick={(e) => handleNav(e, '#contact')}
                  className="btn-primary text-sm px-5 py-2.5"
                >
                  Consultation gratuite
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="container-forge px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs text-center sm:text-left">
              © {currentYear} Forge3D. Tous droits réservés.
              {' '}Conçu et développé avec passion en Tunisie.
            </p>
            <nav aria-label="Mentions légales">
              <ul className="flex flex-wrap items-center gap-4">
                {LEGAL_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-white/30 hover:text-white/60 text-xs transition-colors duration-200"
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
