import { Check, Zap, ArrowRight, Phone } from 'lucide-react';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Pour démarrer',
    price: 'Sur devis',
    priceNote: 'selon volume',
    icon: '🚀',
    color: 'from-slate-600 to-slate-800',
    borderColor: 'border-slate-200',
    featured: false,
    features: [
      'Impression FDM & SLA',
      'Matériaux standards (PLA, ABS, Résine)',
      'Délai 3-5 jours ouvrés',
      "Volume jusqu'à 20×20×20 cm",
      'Livraison nationale',
      'Support email',
      '1 révision incluse',
    ],
    cta: 'Demander un devis',
    ctaHref: '#contact',
  },
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'Le plus populaire',
    price: 'Sur devis',
    priceNote: 'volume & récurrence',
    icon: '⚡',
    color: 'from-orange-500 to-orange-700',
    borderColor: 'border-forge-orange',
    featured: true,
    features: [
      'FDM, SLA, SLS & MJF',
      'Matériaux techniques (PETG, Nylon, PA-CF)',
      'Délai express 24-48h disponible',
      "Grandes dimensions (jusqu'à 50×50 cm)",
      'Post-traitement inclus',
      'Support prioritaire dédié',
      'Révisions illimitées',
      'Modélisation CAO incluse',
    ],
    cta: 'Demander un devis Pro',
    ctaHref: '#contact',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Grands comptes',
    price: 'Sur mesure',
    priceNote: 'contrat cadre',
    icon: '🏭',
    color: 'from-blue-600 to-blue-800',
    borderColor: 'border-blue-200',
    featured: false,
    features: [
      'Toutes technologies disponibles',
      'Matériaux haute performance',
      'Capacité de production dédiée',
      'Pièces certifiées & documentées',
      'Contrôle qualité ISO',
      'Account manager dédié',
      'SLA contractuel garanti',
      'Intégration ERP/supply chain',
      'Formation équipes incluse',
    ],
    cta: 'Nous contacter',
    ctaHref: '#contact',
  },
];

export default function Pricing() {
  const handleCTA = (href: string) => {
    const id = href.replace('#', '');
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="section-padding bg-white" aria-labelledby="pricing-title">
      <div className="container-forge">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="section-tag">
            <span className="w-6 h-px bg-forge-orange inline-block" />
            Nos Offres
            <span className="w-6 h-px bg-forge-orange inline-block" />
          </p>
          <h2 id="pricing-title" className="section-title text-forge-text mb-4">
            Des formules adaptées à
            <span className="text-gradient block">chaque besoin</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Que vous soyez une startup, une PME ou un grand compte industriel,
            nous avons la solution qui correspond à vos ambitions.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {PLANS.map(({ id, name, tagline, price, priceNote, icon, color, borderColor, featured, features, cta, ctaHref }, i) => (
            <div
              key={id}
              className={`reveal reveal-delay-${i + 1} rounded-2xl border-2 ${borderColor} ${
                featured ? 'shadow-forge-glow relative md:-mt-4 md:mb-0' : ''
              } overflow-hidden transition-all duration-300 hover:shadow-forge-card-hover hover:-translate-y-1`}
            >
              {/* Featured badge */}
              {featured && (
                <div className="bg-forge-orange text-white text-xs font-bold text-center py-2 uppercase tracking-widest flex items-center justify-center gap-1.5">
                  <Zap size={12} aria-hidden="true" />
                  Le plus choisi
                </div>
              )}

              {/* Header */}
              <div className={`bg-gradient-to-br ${color} p-6 text-white`}>
                <div className="text-3xl mb-2" role="img" aria-label={name}>{icon}</div>
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display font-bold text-2xl">{name}</h3>
                    <p className="text-white/70 text-sm">{tagline}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-bold text-xl">{price}</div>
                    <div className="text-white/60 text-xs">{priceNote}</div>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="p-6 bg-white">
                <ul className="space-y-3 mb-8">
                  {features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 text-sm text-forge-text-muted">
                      <Check
                        size={16}
                        className="text-forge-orange flex-shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      {feat}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={ctaHref}
                  onClick={(e) => { e.preventDefault(); handleCTA(ctaHref); }}
                  className={`w-full flex items-center justify-center gap-2 font-semibold py-3 px-4 rounded-xl transition-all duration-200 ${
                    featured
                      ? 'bg-forge-orange hover:bg-forge-orange-dark text-white hover:shadow-forge-glow-sm'
                      : 'bg-forge-gray hover:bg-slate-100 text-forge-text hover:text-forge-orange border border-slate-200'
                  }`}
                >
                  {cta}
                  <ArrowRight size={15} aria-hidden="true" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="mt-12 text-center reveal">
          <div className="inline-flex items-center gap-3 bg-forge-gray rounded-xl px-6 py-4 border border-slate-100">
            <Phone size={18} className="text-forge-orange flex-shrink-0" aria-hidden="true" />
            <p className="text-forge-text-muted text-sm">
              Vous avez des besoins spécifiques ?{' '}
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); handleCTA('#contact'); }}
                className="text-forge-orange font-semibold hover:underline"
              >
                Contactez-nous
              </a>{' '}
              pour un devis personnalisé gratuit.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
