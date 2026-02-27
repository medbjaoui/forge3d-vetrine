import { useEffect, useRef, useState } from 'react';
import { Target, Eye, Heart, Users, CheckCircle2 } from 'lucide-react';

const VALUES = [
  {
    icon: Target,
    title: 'Innovation',
    description: 'Nous investissons continuellement dans les dernières technologies pour offrir des solutions à la pointe de la fabrication additive.',
  },
  {
    icon: CheckCircle2,
    title: 'Précision',
    description: 'Chaque pièce est fabriquée avec des tolérances rigoureuses et un contrôle qualité systématique à chaque étape de la production.',
  },
  {
    icon: Heart,
    title: 'Fiabilité',
    description: 'Nos clients nous font confiance pour respecter les délais et les spécifications techniques, même pour les projets les plus exigeants.',
  },
  {
    icon: Users,
    title: 'Partenariat',
    description: 'Nous ne sommes pas un simple fournisseur, mais un partenaire technique qui s\'implique dans la réussite de vos projets.',
  },
];

const KEY_NUMBERS = [
  { value: 5, suffix: ' ans', label: "d'expérience" },
  { value: 500, suffix: '+', label: 'projets livrés' },
  { value: 50, suffix: '+', label: 'clients actifs' },
  { value: 15, suffix: '+', label: 'matériaux disponibles' },
];

function useCountUp(target: number, duration = 1800, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start: number;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      setCount(Math.floor(prog * target));
      if (prog < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [target, duration, started]);
  return count;
}

function KeyNumber({ value, suffix, label, started }: { value: number; suffix: string; label: string; started: boolean }) {
  const count = useCountUp(value, 1600, started);
  return (
    <div className="text-center">
      <div className="text-4xl font-display font-bold text-forge-dark mb-1">
        {count}<span className="text-forge-orange">{suffix}</span>
      </div>
      <div className="text-forge-text-muted text-sm">{label}</div>
    </div>
  );
}

export default function About() {
  const numbersRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } },
      { threshold: 0.4 }
    );
    if (numbersRef.current) obs.observe(numbersRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="apropos" className="section-padding bg-forge-dark" aria-labelledby="apropos-title">
      <div className="container-forge">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="section-tag text-forge-orange">
            <span className="w-6 h-px bg-forge-orange inline-block" />
            À Propos
            <span className="w-6 h-px bg-forge-orange inline-block" />
          </p>
          <h2 id="apropos-title" className="section-title text-white mb-4">
            L'expertise 3D au service
            <span className="text-gradient block">de votre ambition</span>
          </h2>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Left: Story */}
          <div className="reveal">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Eye size={20} className="text-forge-orange" aria-hidden="true" />
                  <h3 className="text-xl font-display font-semibold text-white">Notre Mission</h3>
                </div>
                <p className="text-white/65 leading-relaxed">
                  Rendre l'impression 3D professionnelle accessible à toutes les entreprises,
                  quelle que soit leur taille. Nous croyons que la fabrication additive est
                  un levier de compétitivité que chaque entreprise mérite de pouvoir exploiter.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Target size={20} className="text-forge-orange" aria-hidden="true" />
                  <h3 className="text-xl font-display font-semibold text-white">Notre Vision</h3>
                </div>
                <p className="text-white/65 leading-relaxed">
                  Devenir le partenaire de référence pour la fabrication additive et l'innovation
                  industrielle. Nous visons à accompagner les entreprises dans leur transformation
                  digitale grâce à des solutions de fabrication innovantes et agiles.
                </p>
              </div>

              <div className="bg-forge-dark-800 rounded-2xl p-6 border border-white/5">
                <p className="text-white/80 text-sm leading-relaxed italic">
                  "Forge3D est née de la conviction que l'accès aux technologies d'impression 3D
                  professionnelle ne doit pas être réservé aux grandes entreprises. Notre équipe
                  d'ingénieurs passionnés met son expertise au service de vos projets les plus
                  ambitieux."
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-forge-orange to-forge-orange-dark flex items-center justify-center text-white font-display font-bold text-sm">
                    F3D
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">L'équipe Forge3D</div>
                    <div className="text-white/40 text-xs">Fondateurs</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Values */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal reveal-delay-2">
            {VALUES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="card-dark group"
              >
                <div className="w-10 h-10 rounded-xl bg-forge-orange/15 flex items-center justify-center mb-4 group-hover:bg-forge-orange/25 transition-colors duration-300">
                  <Icon size={18} className="text-forge-orange" aria-hidden="true" />
                </div>
                <h4 className="text-white font-display font-semibold text-lg mb-2">{title}</h4>
                <p className="text-white/50 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Numbers */}
        <div
          ref={numbersRef}
          className="reveal grid grid-cols-2 sm:grid-cols-4 gap-8 border-t border-white/10 pt-14"
        >
          {KEY_NUMBERS.map((item) => (
            <KeyNumber key={item.label} {...item} started={started} />
          ))}
        </div>
      </div>
    </section>
  );
}
