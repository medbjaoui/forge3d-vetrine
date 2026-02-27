import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ChevronDown, CheckCircle2, Zap, Shield, Award } from 'lucide-react';

const ADVANTAGES = [
  { icon: Shield, text: 'Infrastructure sécurisée & surveillée 24/7' },
  { icon: Zap, text: 'Support technique réactif' },
  { icon: Award, text: '+500 projets livrés' },
];

const STATS = [
  { value: 500, suffix: '+', label: 'Projets réalisés' },
  { value: 50, suffix: '+', label: 'Clients satisfaits' },
  { value: 99, suffix: '%', label: 'Taux de satisfaction' },
  { value: 48, suffix: 'h', label: 'Délai moyen' },
];

function useCountUp(target: number, duration = 2000, started: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, started]);
  return count;
}

function StatItem({ value, suffix, label, delay, started }: {
  value: number; suffix: string; label: string; delay: number; started: boolean;
}) {
  const count = useCountUp(value, 1800, started);
  return (
    <div
      className="text-center"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="text-3xl sm:text-4xl font-display font-bold text-white">
        {count}<span className="text-forge-orange">{suffix}</span>
      </div>
      <div className="text-sm text-white/50 mt-1">{label}</div>
    </div>
  );
}

export default function Hero() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [statsStarted, setStatsStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStatsStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-dark-grid"
      aria-label="Section principale"
    >
      {/* Decorative orbs */}
      <div className="forge-orb w-96 h-96 top-1/4 -left-24 opacity-60" aria-hidden="true" />
      <div className="forge-orb w-80 h-80 bottom-1/4 -right-16 opacity-40" aria-hidden="true" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.04) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {/* Animated lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-forge-orange/20 to-transparent w-full"
            style={{ top: `${20 + i * 20}%`, animationDelay: `${i * 0.5}s` }}
          />
        ))}
      </div>

      <div className="container-forge px-4 sm:px-6 lg:px-8 pt-24 pb-16 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 bg-forge-orange/10 border border-forge-orange/25 text-forge-orange text-sm font-semibold px-4 py-2 rounded-full mb-8 animate-fade-in"
          >
            <span className="w-2 h-2 bg-forge-orange rounded-full animate-pulse" />
            Sous-traitance IT & Impression 3D
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold text-white leading-tight mb-6 animate-fade-in-up">
            Votre Partenaire Tech
            <br />
            <span className="text-gradient">IT & Fabrication 3D</span>
          </h1>

          {/* Subheadline */}
          <p
            className="text-lg sm:text-xl text-white/65 max-w-2xl mb-8 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            Forge3D, société tunisienne à double expertise : sous-traitance informatique
            (infrastructure, cybersécurité, cloud) et fabrication 3D à la demande (prototypes,
            figurines, pièces techniques). Un partenaire unique pour vos besoins tech.
          </p>

          {/* Advantages list */}
          <ul
            className="flex flex-wrap gap-4 mb-10 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            {ADVANTAGES.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2 text-white/80 text-sm">
                <CheckCircle2 size={16} className="text-forge-orange flex-shrink-0" />
                {text}
              </li>
            ))}
          </ul>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 mb-16 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary text-base px-8 py-4 group"
            >
              Demander une consultation gratuite
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary text-base px-8 py-4"
            >
              Découvrir nos services
            </a>
            <a
              href="https://shop.forge3d.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost text-base px-8 py-4 border border-white/10"
            >
              Visiter la boutique →
            </a>
          </div>

          {/* Stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-10 border-t border-white/10"
          >
            {STATS.map((stat, i) => (
              <StatItem
                key={stat.label}
                {...stat}
                delay={i * 150}
                started={statsStarted}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 animate-bounce">
        <span className="text-xs tracking-widest uppercase">Défiler</span>
        <ChevronDown size={18} />
      </div>

      {/* 3D wireframe visual – decorative SVG */}
      <div
        className="hidden lg:block absolute right-8 xl:right-16 top-1/2 -translate-y-1/2 w-72 xl:w-96 opacity-20 pointer-events-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 300 300" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full animate-[spin_40s_linear_infinite]">
          <g stroke="#f97316" strokeWidth="0.8">
            {/* Cube wireframe */}
            <rect x="60" y="60" width="180" height="180" />
            <rect x="90" y="30" width="180" height="180" />
            <line x1="60" y1="60" x2="90" y2="30" />
            <line x1="240" y1="60" x2="270" y2="30" />
            <line x1="60" y1="240" x2="90" y2="210" />
            <line x1="240" y1="240" x2="270" y2="210" />
            {/* Inner lines */}
            <line x1="150" y1="60" x2="150" y2="240" />
            <line x1="60" y1="150" x2="240" y2="150" />
            <line x1="150" y1="30" x2="150" y2="210" />
            <line x1="90" y1="120" x2="270" y2="120" />
            {/* Diagonal connections */}
            <line x1="60" y1="60" x2="270" y2="210" opacity="0.5" />
            <line x1="240" y1="60" x2="90" y2="210" opacity="0.5" />
          </g>
          <circle cx="150" cy="150" r="80" stroke="#f97316" strokeWidth="0.5" strokeDasharray="4 8" />
          <circle cx="150" cy="150" r="50" stroke="#f97316" strokeWidth="0.3" strokeDasharray="2 10" />
        </svg>
      </div>
    </section>
  );
}
