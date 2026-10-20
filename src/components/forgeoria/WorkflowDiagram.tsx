import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { Check, ClipboardCheck, Inbox, Pause, Play, RotateCcw, ScanSearch, ShieldCheck, UserCheck } from 'lucide-react';
import { COPY, STAGES, type DemoId } from '../../lib/forgeoria-copy';
import type { Locale } from '../../lib/forgeoria';

const STAGE_ICONS = { request: Inbox, classify: ScanSearch, review: UserCheck, action: ClipboardCheck } as const;
const STEP_MS = 1900;
const HOLD_MS = 3200;
const LAST = STAGES.length - 1;

/**
 * Simulated, local-only workflow preview: request → classify → human review → prepared action.
 * No network call is made; scenarios are static fictional data from forgeoria-copy.ts.
 */
export default function WorkflowDiagram({ locale }: { locale: Locale }) {
  const t = COPY[locale];
  const reduce = useReducedMotion() ?? false;
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { amount: 0.35 });
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [demoId, setDemoId] = useState<DemoId>('lead');
  const [active, setActive] = useState(reduce ? LAST : 0);
  const [paused, setPaused] = useState(reduce);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduce) { setPaused(true); setActive(LAST); }
  }, [reduce]);

  const running = !paused && inView;

  useEffect(() => {
    if (!running) return;
    const timer = window.setTimeout(() => {
      if (active < LAST) setActive(active + 1);
      else { setActive(0); setCycle((c) => c + 1); }
    }, active < LAST ? STEP_MS : HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [running, active, cycle]);

  const demo = t.demos.find((d) => d.id === demoId) ?? t.demos[0];
  const stage = STAGES[active];
  const panelId = 'forgeoria-demo-panel';

  const selectDemo = (id: DemoId) => {
    setDemoId(id);
    setActive(reduce ? LAST : 0);
    setCycle((c) => c + 1);
  };

  const onTabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const offset = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    const target = event.key === 'Home' ? 0 : event.key === 'End' ? t.demos.length - 1 : (index + offset + t.demos.length) % t.demos.length;
    if (!offset && event.key !== 'Home' && event.key !== 'End') return;
    event.preventDefault();
    selectDemo(t.demos[target].id);
    tabRefs.current[target]?.focus();
  };

  const replay = () => { setActive(0); setCycle((c) => c + 1); setPaused(false); };
  const inspect = (index: number) => { setActive(index); setPaused(true); };
  const quick = { duration: reduce ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <motion.div
      ref={rootRef}
      id="demos"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-forge-dark-800/90 p-5 shadow-2xl sm:p-6"
    >
      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-forge-orange/20 blur-3xl" aria-hidden="true" />

      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-display text-xl font-bold">{t.diagram.title}</p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-white/50"><ShieldCheck size={14} className="shrink-0 text-forge-orange" aria-hidden="true" /> {t.diagram.simulated}</p>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => setPaused(!paused)} className="forgeoria-icon-btn" aria-label={paused ? t.diagram.play : t.diagram.pause} title={paused ? t.diagram.play : t.diagram.pause}>
            {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
          </button>
          <button type="button" onClick={replay} className="forgeoria-icon-btn" aria-label={t.diagram.replay} title={t.diagram.replay}>
            <RotateCcw size={16} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div role="tablist" aria-label={t.diagram.tabsLabel} className="relative mt-5 grid grid-cols-3 gap-1 rounded-2xl bg-white/[.04] p-1">
        {t.demos.map((d, index) => {
          const selected = d.id === demoId;
          return (
            <button
              key={d.id}
              ref={(node) => { tabRefs.current[index] = node; }}
              type="button"
              role="tab"
              id={`forgeoria-tab-${d.id}`}
              aria-selected={selected}
              aria-controls={panelId}
              tabIndex={selected ? 0 : -1}
              onClick={() => selectDemo(d.id)}
              onKeyDown={(event) => onTabKey(event, index)}
              className={`relative rounded-xl px-2 py-2.5 text-xs font-semibold transition-colors sm:text-sm ${selected ? 'text-white' : 'text-white/55 hover:text-white'}`}
            >
              {selected && <motion.span layoutId="forgeoria-tab-pill" transition={quick} className="absolute inset-0 rounded-xl bg-forge-orange shadow-forge-glow-sm" aria-hidden="true" />}
              <span className="relative">{d.label}</span>
            </button>
          );
        })}
      </div>

      <div id={panelId} role="tabpanel" aria-labelledby={`forgeoria-tab-${demoId}`} className="relative mt-5">
        <ol className="relative space-y-2">
          {STAGES.map((key, index) => {
            const Icon = STAGE_ICONS[key];
            const state = index < active ? 'done' : index === active ? 'active' : 'todo';
            return (
              <li key={key} className="relative">
                {index < LAST && (
                  <span className="absolute left-[1.45rem] top-12 h-[calc(100%-2.25rem)] w-px bg-white/10" aria-hidden="true">
                    <motion.span className="absolute inset-0 origin-top bg-forge-orange" initial={false} animate={{ scaleY: index < active ? 1 : 0 }} transition={quick} />
                    {!reduce && index === active - 1 && (
                      <motion.span key={`${demoId}-${cycle}-${active}`} className="absolute -left-[3px] h-[7px] w-[7px] rounded-full bg-forge-orange-light shadow-forge-glow" initial={{ top: '0%', opacity: 1 }} animate={{ top: '100%', opacity: 0 }} transition={{ duration: 0.6, ease: 'easeInOut' }} />
                    )}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => inspect(index)}
                  aria-current={state === 'active' ? 'step' : undefined}
                  className={`flex w-full items-center gap-4 rounded-2xl border p-2.5 text-left transition-colors ${state === 'active' ? 'border-forge-orange/40 bg-forge-orange/[.08]' : 'border-transparent hover:bg-white/[.03]'}`}
                >
                  <span className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                    {state === 'active' && !reduce && running && (
                      <motion.span className="absolute inset-0 rounded-xl border border-forge-orange" initial={{ opacity: 0.7, scale: 1 }} animate={{ opacity: 0, scale: 1.45 }} transition={{ duration: 1.4, repeat: Infinity, ease: 'easeOut' }} aria-hidden="true" />
                    )}
                    <motion.span
                      className="relative flex h-10 w-10 items-center justify-center rounded-xl border"
                      initial={false}
                      animate={state === 'todo'
                        ? { backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.45)' }
                        : state === 'active'
                          ? { backgroundColor: 'rgba(249,115,22,1)', borderColor: 'rgba(249,115,22,1)', color: 'rgba(255,255,255,1)' }
                          : { backgroundColor: 'rgba(249,115,22,0.12)', borderColor: 'rgba(249,115,22,0.45)', color: 'rgba(249,115,22,1)' }}
                      transition={quick}
                    >
                      {state === 'done' ? <Check size={18} aria-hidden="true" /> : <Icon size={18} aria-hidden="true" />}
                    </motion.span>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-bold uppercase tracking-[.16em] text-white/40">{String(index + 1).padStart(2, '0')} · {t.diagram.stages[key]}</span>
                    <span className={`block truncate text-sm font-semibold ${state === 'todo' ? 'text-white/45' : 'text-white'}`}>{demo.steps[key].summary}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        <div className="mt-4 min-h-[8.5rem] rounded-2xl border border-white/10 bg-forge-dark/80 p-4" aria-live={running ? 'off' : 'polite'}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={`${demoId}-${stage}`} initial={reduce ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -8 }} transition={{ duration: reduce ? 0 : 0.28 }}>
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-[.16em] text-forge-orange">{t.diagram.stages[stage]}</p>
                <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/45">{t.diagram.sample}</span>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm leading-6 text-white/70">
                {demo.steps[stage].detail.map((line) => <li key={line}>{line}</li>)}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
        {reduce && <p className="mt-3 text-xs text-white/40">{t.diagram.reducedMotion}</p>}
      </div>
    </motion.div>
  );
}
