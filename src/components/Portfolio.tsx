import { TrendingUp, Clock, DollarSign, ExternalLink, Shield, Server } from 'lucide-react';

const PROJECTS = [
  {
    id: 1,
    title: 'Migration Infrastructure Cloud',
    sector: 'PME Internationale',
    description:
      'Migration complète d\'une infrastructure on-premise vers Office 365 et Azure. Déploiement AD Connect, migration de 150 utilisateurs, formation et support.',
    image: null,
    gradient: 'from-blue-600 via-blue-800 to-slate-900',
    results: [
      { icon: Clock, label: 'Migration', value: 'Zero downtime' },
      { icon: DollarSign, label: 'Économie/an', value: '-35% coûts IT' },
      { icon: TrendingUp, label: 'Productivité', value: '+40% mobilité' },
    ],
    tags: ['Office 365', 'Azure', 'Migration', 'AD Connect'],
    badge: 'Cloud',
  },
  {
    id: 2,
    title: 'Sécurisation Infrastructure Réseau',
    sector: 'Groupe Industriel',
    description:
      'Déploiement architecture Zero Trust, firewall Fortigate, segmentation réseau, VPN site-to-site et monitoring SIEM Wazuh pour 3 sites distants.',
    image: null,
    gradient: 'from-red-700 via-red-900 to-slate-900',
    results: [
      { icon: Shield, label: 'Sécurité', value: 'Zero Trust' },
      { icon: TrendingUp, label: 'Incidents', value: '-95% attaques' },
      { icon: Clock, label: 'Monitoring', value: '24/7 SIEM' },
    ],
    tags: ['Fortigate', 'Wazuh', 'Zero Trust', 'VPN'],
    badge: 'Cybersécurité',
  },
  {
    id: 3,
    title: 'Virtualisation VMware ESXi',
    sector: 'Startup Tech',
    description:
      'Mise en place infrastructure virtualisée VMware ESXi avec haute disponibilité, sauvegarde Veeam automatisée et monitoring centralisé.',
    image: null,
    gradient: 'from-purple-700 via-purple-900 to-slate-900',
    results: [
      { icon: Server, label: 'Serveurs VM', value: '25 machines' },
      { icon: DollarSign, label: 'ROI', value: 'Rentable en 8 mois' },
      { icon: TrendingUp, label: 'Disponibilité', value: '99.9% uptime' },
    ],
    tags: ['VMware ESXi', 'Veeam', 'HA', 'Monitoring'],
    badge: 'Infrastructure',
  },
  {
    id: 4,
    title: 'Prototypes Techniques Impression 3D',
    sector: 'Industrie Manufacturière',
    description:
      'Production de prototypes fonctionnels et pièces de remplacement industrielles en Nylon renforcé carbone. Livraison express 48h.',
    image: null,
    gradient: 'from-orange-700 via-orange-900 to-slate-900',
    results: [
      { icon: Clock, label: 'Délai', value: '48h express' },
      { icon: DollarSign, label: 'Économie', value: '-60% vs OEM' },
      { icon: TrendingUp, label: 'Précision', value: '±0.1mm' },
    ],
    tags: ['FDM', 'SLA', 'Prototypage', 'PA12-CF'],
    badge: 'Fabrication 3D',
  },
];

function Package2({ size, className }: { size: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="section-padding bg-white" aria-labelledby="portfolio-title">
      <div className="container-forge">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="section-tag">
            <span className="w-6 h-px bg-forge-orange inline-block" />
            Portfolio
            <span className="w-6 h-px bg-forge-orange inline-block" />
          </p>
          <h2 id="portfolio-title" className="section-title text-forge-text mb-4">
            Projets réalisés &{' '}
            <span className="text-gradient">résultats mesurables</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Découvrez comment nous avons aidé nos clients à transformer leurs idées
            en produits réels avec des résultats concrets.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PROJECTS.map(({ id, title, sector, description, gradient, results, tags, badge }, i) => (
            <article
              key={id}
              className={`reveal reveal-delay-${(i % 2) + 1} rounded-2xl overflow-hidden border border-slate-100 hover:shadow-forge-card-hover transition-all duration-300 group`}
            >
              {/* Project visual */}
              <div className={`relative h-52 bg-gradient-to-br ${gradient} flex items-center justify-center overflow-hidden`}>
                {/* Decorative geometry */}
                <div className="absolute inset-0 opacity-10">
                  <svg viewBox="0 0 400 200" className="w-full h-full">
                    <g stroke="white" strokeWidth="0.5" fill="none">
                      <rect x="100" y="40" width="120" height="120" />
                      <rect x="120" y="20" width="120" height="120" />
                      <line x1="100" y1="40" x2="120" y2="20" />
                      <line x1="220" y1="40" x2="240" y2="20" />
                      <line x1="100" y1="160" x2="120" y2="140" />
                      <line x1="220" y1="160" x2="240" y2="140" />
                      <circle cx="160" cy="100" r="50" strokeDasharray="4 6" />
                    </g>
                  </svg>
                </div>

                {/* Badge */}
                <span className="absolute top-4 left-4 bg-forge-orange text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  {badge}
                </span>

                {/* Title overlay */}
                <div className="absolute inset-0 flex items-end p-6 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <div>
                    <p className="text-forge-orange text-xs font-semibold uppercase tracking-widest mb-1">{sector}</p>
                    <h3 className="text-xl font-display font-bold text-white">{title}</h3>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 bg-white">
                <p className="text-forge-text-muted text-sm leading-relaxed mb-6">{description}</p>

                {/* Results */}
                <div className="grid grid-cols-3 gap-3 mb-6">
                  {results.map(({ icon: Icon, label, value }) => (
                    <div key={label} className="bg-forge-gray rounded-xl p-3 text-center">
                      <Icon size={16} className="text-forge-orange mx-auto mb-1" aria-hidden="true" />
                      <div className="text-sm font-bold text-forge-text">{value}</div>
                      <div className="text-xs text-forge-text-muted">{label}</div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-forge-orange/10 text-forge-orange font-medium px-2.5 py-1 rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center reveal">
          <p className="text-forge-text-muted mb-6">
            Vous avez un projet similaire ? Contactez-nous pour un devis personnalisé.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary inline-flex"
            >
              Discuter de votre projet
            </a>
            <a
              href="https://shop.forge3d.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary inline-flex"
            >
              Commander en ligne
              <ExternalLink size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
