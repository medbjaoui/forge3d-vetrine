import { Star, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'Mohamed B.',
    role: 'Directeur Technique',
    company: 'TechIndustr',
    sector: 'Industrie mécanique',
    avatar: 'MB',
    avatarColor: 'from-blue-600 to-blue-800',
    rating: 5,
    quote:
      'Forge3D a transformé notre processus de prototypage. Nous avons réduit nos délais de 80% tout en maintenant une qualité exceptionnelle. Leur équipe est réactive et comprend parfaitement les enjeux industriels.',
  },
  {
    id: 2,
    name: 'Karim L.',
    role: 'Responsable Production',
    company: 'ManufacturePro',
    sector: 'Fabrication industrielle',
    avatar: 'KL',
    avatarColor: 'from-green-600 to-green-800',
    rating: 5,
    quote:
      'Une expertise technique remarquable et une qualité de pièces irréprochable. Forge3D est devenu notre partenaire privilégié pour toutes nos pièces mécaniques sur mesure. Je les recommande sans hésitation.',
  },
  {
    id: 3,
    name: 'Sara M.',
    role: 'CEO & Co-fondatrice',
    company: 'StartupTech',
    sector: 'Technologie IoT',
    avatar: 'SM',
    avatarColor: 'from-purple-600 to-purple-800',
    rating: 5,
    quote:
      'Le partenaire idéal pour notre startup. Forge3D nous a accompagnés de la conception à la production en série avec un professionnalisme exemplaire. Leur flexibilité et leur réactivité font la différence.',
  },
  {
    id: 4,
    name: 'Ahmed R.',
    role: 'Architecte Principal',
    company: 'DesignStudio',
    sector: 'Architecture & Design',
    avatar: 'AR',
    avatarColor: 'from-orange-600 to-orange-800',
    rating: 5,
    quote:
      'Nos maquettes architecturales sont maintenant réalisées avec une précision et une vitesse incomparables. Forge3D nous permet de présenter des projets plus convaincants à nos clients.',
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`Note: ${count} étoiles sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < count ? 'star-filled' : 'text-gray-300'}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="section-padding bg-forge-gray" aria-labelledby="testimonials-title">
      <div className="container-forge">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="section-tag">
            <span className="w-6 h-px bg-forge-orange inline-block" />
            Témoignages
            <span className="w-6 h-px bg-forge-orange inline-block" />
          </p>
          <h2 id="testimonials-title" className="section-title text-forge-text mb-4">
            Ce que disent{' '}
            <span className="text-gradient">nos clients</span>
          </h2>
          <p className="section-subtitle mx-auto text-center">
            Plus de 50 entreprises nous font confiance pour leurs projets d'impression 3D.
            Voici quelques-uns de leurs retours.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {TESTIMONIALS.map(({ id, name, role, company, sector, avatar, avatarColor, rating, quote }, i) => (
            <blockquote
              key={id}
              className={`reveal reveal-delay-${(i % 2) + 1} bg-white rounded-2xl p-7 border border-slate-100 hover:shadow-forge-card-hover transition-all duration-300 hover:-translate-y-1 relative`}
            >
              {/* Quote icon */}
              <Quote
                size={36}
                className="absolute top-6 right-6 text-forge-orange/10"
                aria-hidden="true"
              />

              {/* Rating */}
              <StarRating count={rating} />

              {/* Quote text */}
              <p className="text-forge-text-muted text-sm leading-relaxed mt-4 mb-6 relative z-10">
                "{quote}"
              </p>

              {/* Author */}
              <footer className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-full bg-gradient-to-br ${avatarColor} flex items-center justify-center text-white font-display font-bold text-sm flex-shrink-0`}
                  aria-hidden="true"
                >
                  {avatar}
                </div>
                <div>
                  <cite className="not-italic font-semibold text-forge-text text-sm">{name}</cite>
                  <div className="text-forge-text-muted text-xs">
                    {role} · <span className="text-forge-orange">{company}</span>
                  </div>
                  <div className="text-forge-text-muted text-xs opacity-70">{sector}</div>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-14 reveal">
          <div className="bg-gradient-to-r from-forge-orange/5 via-forge-orange/10 to-forge-orange/5 rounded-2xl p-8 border border-forge-orange/15 text-center">
            <div className="flex items-center justify-center gap-2 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="star-filled" aria-hidden="true" />
              ))}
              <span className="font-display font-bold text-2xl text-forge-text ml-2">5.0</span>
            </div>
            <p className="text-forge-text-muted text-sm">
              Note moyenne basée sur les avis vérifiés de nos clients B2B
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-forge-text-muted">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full" aria-hidden="true" />
                100% avis vérifiés
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-forge-orange rounded-full" aria-hidden="true" />
                99% de satisfaction client
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-blue-500 rounded-full" aria-hidden="true" />
                50+ clients fidèles
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
