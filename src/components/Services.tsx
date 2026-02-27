import { Layers, Zap, PenTool, Package, Wrench, GraduationCap, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    icon: Zap,
    title: 'Prototypage Rapide',
    description: 'De l\'idée au prototype physique en 24 à 48h. Réduisez vos cycles de développement et validez vos concepts avant production.',
    color: 'from-orange-500/20 to-orange-600/5',
    features: ['Délai express 24-48h', 'FDM, SLA, SLS', 'Révisions illimitées'],
  },
  {
    icon: Layers,
    title: 'Impression 3D Professionnelle',
    description: 'Technologies de pointe FDM, SLA, SLS et MJF pour tous types de matériaux. Haute précision, excellents rendus de surface.',
    color: 'from-blue-500/20 to-blue-600/5',
    features: ['Précision ±0.1mm', '15+ matériaux', 'Grande capacité'],
  },
  {
    icon: PenTool,
    title: 'Modélisation & Design 3D',
    description: 'Conception CAO sur mesure par nos ingénieurs. Nous transformons vos plans, croquis ou idées en fichiers 3D prêts à imprimer.',
    color: 'from-purple-500/20 to-purple-600/5',
    features: ['CAO sur mesure', 'SolidWorks / Fusion 360', 'Optimisation DFM'],
  },
  {
    icon: Package,
    title: 'Production en Série',
    description: 'Fabrication en petite et moyenne série pour vos besoins industriels. Consistance qualité garantie de la première à la dernière pièce.',
    color: 'from-green-500/20 to-green-600/5',
    features: ['Petite & moyenne série', 'Contrôle qualité rigoureux', 'Délais compétitifs'],
  },
  {
    icon: Wrench,
    title: 'Pièces Techniques',
    description: 'Fabrication de pièces mécaniques de précision, pièces de remplacement et composants fonctionnels pour l\'industrie.',
    color: 'from-red-500/20 to-red-600/5',
    features: ['Pièces fonctionnelles', 'Matériaux techniques', 'Tolérances serrées'],
  },
  {
    icon: GraduationCap,
    title: 'Conseil & Accompagnement',
    description: 'Expertise technique pour optimiser vos projets d\'impression 3D. Formation de vos équipes et accompagnement stratégique.',
    color: 'from-yellow-500/20 to-yellow-600/5',
    features: ['Audit technique', 'Formation équipes', 'Suivi de projet'],
  },
];

export default function Services() {
  return (
    <section id="services" className="section-padding bg-forge-gray" aria-labelledby="services-title">
      <div className="container-forge">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="section-tag">
            <span className="w-6 h-px bg-forge-orange inline-block" />
            Nos Services
            <span className="w-6 h-px bg-forge-orange inline-block" />
          </p>
          <h2 id="services-title" className="section-title text-forge-text mb-4">
            Des solutions complètes pour
            <span className="text-gradient block">tous vos besoins 3D</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            De la conception à la production, nous accompagnons vos projets à chaque étape
            avec expertise et réactivité.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {SERVICES.map(({ icon: Icon, title, description, color, features }, i) => (
            <article
              key={title}
              className={`reveal reveal-delay-${(i % 3) + 1} bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-forge-card-hover hover:-translate-y-1.5 transition-all duration-300 group cursor-default`}
            >
              {/* Icon */}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <Icon size={22} className="text-forge-orange" aria-hidden="true" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-display font-bold text-forge-text mb-3">{title}</h3>

              {/* Description */}
              <p className="text-forge-text-muted text-sm leading-relaxed mb-5">{description}</p>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {features.map((feat) => (
                  <li key={feat} className="flex items-center gap-2 text-sm text-forge-text-muted">
                    <span className="w-1.5 h-1.5 bg-forge-orange rounded-full flex-shrink-0" aria-hidden="true" />
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-1.5 text-forge-orange text-sm font-semibold hover:gap-2.5 transition-all duration-200 group/link"
                aria-label={`En savoir plus sur ${title}`}
              >
                En savoir plus
                <ArrowRight size={15} className="group-hover/link:translate-x-1 transition-transform duration-200" aria-hidden="true" />
              </a>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-14 reveal">
          <p className="text-forge-text-muted mb-6">
            Vous avez un projet spécifique ? Parlons-en ensemble.
          </p>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-primary inline-flex"
          >
            Demander une consultation gratuite
            <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
