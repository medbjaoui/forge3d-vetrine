import { useEffect, useRef, useState } from 'react';
import { Target, Eye, Heart, Users, CheckCircle2, Shield } from 'lucide-react';

const VALUES = [
  {
    icon: Shield,
    title: 'Sécurité',
    description: 'Protection maximale de vos infrastructures avec des solutions de cybersécurité avancées, monitoring 24/7 et architecture Zero Trust.',
  },
  {
    icon: CheckCircle2,
    title: 'Expertise',
    description: 'Double compétence IT et fabrication 3D. Une équipe d\'ingénieurs certifiés qui maîtrise à la fois les systèmes et la production numérique.',
  },
  {
    icon: Heart,
    title: 'Réactivité',
    description: 'Support technique rapide, maintenance proactive et accompagnement personnalisé. Nous intervenons avant que les problèmes n\'impactent votre activité.',
  },
  {
    icon: Users,
    title: 'Partenariat',
    description: 'Plus qu\'un prestataire, nous sommes votre partenaire technologique. Nous nous impliquons dans votre réussite à long terme.',
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
            Technologie tunisienne
            <span className="text-gradient block">à double expertise</span>
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
                  Accompagner les PME, startups et groupes internationaux dans la sécurisation,
                  l'optimisation et la gestion de leurs infrastructures informatiques — tout en
                  offrant une boutique e-commerce d'objets imprimés en 3D sur mesure.
                </p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Target size={20} className="text-forge-orange" aria-hidden="true" />
                  <h3 className="text-xl font-display font-semibold text-white">Notre Vision</h3>
                </div>
                <p className="text-white/65 leading-relaxed">
                  Devenir le partenaire technologique de référence en Tunisie et en Afrique,
                  en combinant excellence en infrastructure IT et innovation en fabrication numérique.
                  Un pont entre la technologie d'entreprise et la fabrication 3D à la demande.
                </p>
              </div>

              <div className="bg-forge-dark-800 rounded-2xl p-6 border border-white/5">
                <p className="text-white/80 text-sm leading-relaxed italic">
                  "Forge3D est une société technologique tunisienne à double expertise : sous-traitance
                  IT et impression 3D à la demande. Nous accompagnons les entreprises dans la gestion
                  de leurs infrastructures (sécurité, cloud, monitoring) tout en offrant des services
                  de fabrication numérique (prototypes, figurines, pièces techniques). Un partenaire
                  unique qui comprend à la fois la technologie d'entreprise et la fabrication 3D."
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
