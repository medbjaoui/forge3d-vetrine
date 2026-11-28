import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, ClipboardCheck, Inbox, ScanSearch, UserCheck } from 'lucide-react';
import { ForgeOriaLogo } from './BrandMark';
import { FORGEORIA_PATH, SIGNATURE } from '../../lib/forgeoria';

const steps = [
  { icon: Inbox, label: 'Demande' },
  { icon: ScanSearch, label: 'Classification' },
  { icon: UserCheck, label: 'Validation humaine' },
  { icon: ClipboardCheck, label: 'Action préparée' },
];

/** Homepage brand block. Entrance animations run once in view; nothing loops. */
export default function HomeForgeOriaBlock() {
  const reduce = useReducedMotion() ?? false;
  const ease = [0.22, 1, 0.36, 1] as const;
  const inView = (delay = 0) => reduce
    ? {}
    : { initial: { opacity: 0, y: 18 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.3 }, transition: { duration: 0.6, delay, ease } };

  return (
    <section className="section-padding relative overflow-hidden bg-forge-dark text-white" aria-labelledby="home-forgeoria-title">
      <div className="forge-orb -right-32 -top-20 h-96 w-96 opacity-40" aria-hidden="true" />
      <div className="container-forge relative grid items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <motion.div {...inView()}>
          <p className="section-tag">Automatisation métier par FORGE3D</p>
          <h2 id="home-forgeoria-title"><ForgeOriaLogo className="h-16 w-auto sm:h-20" fallbackClassName="text-5xl sm:text-6xl" /></h2>
          <p className="mt-6 font-display text-3xl font-bold leading-tight sm:text-4xl"><span className="text-gradient">{SIGNATURE.fr}</span></p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70">ForgeOria trie les demandes, documents et messages entrants, maintient une validation humaine et prépare l’action suivante. L’offre est en développement et les démonstrations présentées sont simulées.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href={FORGEORIA_PATH} className="btn-primary justify-center">Découvrir ForgeOria <ArrowRight size={17} aria-hidden="true" /></a>
            <a href={`${FORGEORIA_PATH}#discovery`} className="btn-ghost justify-center border border-white/15">Demander un appel découverte</a>
          </div>
        </motion.div>
        <ol className="relative grid gap-3" aria-label="Workflow ForgeOria">
          {steps.map(({ icon: Icon, label }, index) => (
            <motion.li key={label} {...inView(0.1 + index * 0.1)} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.04] p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-forge-orange/15 text-forge-orange"><Icon size={20} aria-hidden="true" /></span>
              <span className="font-display text-lg font-bold">{label}</span>
              <span className="ml-auto text-xs font-bold tracking-[.18em] text-white/30">0{index + 1}</span>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
