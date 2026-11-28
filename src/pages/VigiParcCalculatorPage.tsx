import { useMemo, useState } from 'react';
import { Calculator, CheckCircle2, Info } from 'lucide-react';
import Seo from '../components/Seo';
import VigiParcNav from '../components/VigiParcNav';

const dinars = new Intl.NumberFormat('fr-TN', { style: 'currency', currency: 'TND', maximumFractionDigits: 0 });

const nombre = (value: string) => Math.max(0, Number(value) || 0);

export default function VigiParcCalculatorPage() {
  const [postes, setPostes] = useState('50');
  const [bornes, setBornes] = useState('0');
  const [sites, setSites] = useState('1');
  const [outilsMensuels, setOutilsMensuels] = useState('0');
  const [licencesAnnuelles, setLicencesAnnuelles] = useState('0');
  const [serveursAnnuels, setServeursAnnuels] = useState('0');
  const [supportAnnuel, setSupportAnnuel] = useState('0');
  const [coutVigiParc, setCoutVigiParc] = useState('0');
  const [duree, setDuree] = useState('3');

  const resultat = useMemo(() => {
    const totalPostes = nombre(postes);
    const annees = Math.min(5, Math.max(1, nombre(duree)));
    const actuelAnnuel = totalPostes * nombre(outilsMensuels) * 12 + nombre(licencesAnnuelles) + nombre(serveursAnnuels) + nombre(supportAnnuel);
    const vigiparcAnnuel = nombre(coutVigiParc);
    const actuelPeriode = actuelAnnuel * annees;
    const vigiparcPeriode = vigiparcAnnuel * annees;
    const economie = actuelPeriode - vigiparcPeriode;
    return {
      totalPostes,
      annees,
      actuelAnnuel,
      vigiparcAnnuel,
      actuelPeriode,
      vigiparcPeriode,
      economie,
      economiePoste: totalPostes > 0 ? economie / totalPostes : 0,
    };
  }, [postes, outilsMensuels, licencesAnnuelles, serveursAnnuels, supportAnnuel, coutVigiParc, duree]);

  const champ = 'mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-normal focus:border-forge-orange focus:outline-none focus:ring-2 focus:ring-forge-orange/20';

  return (
    <>
      <Seo title="Calculateur de coûts IT | VigiParc — FORGE3D" description="Comparez vos coûts IT actuels avec une hypothèse VigiParc à partir de vos propres données." path="/vigiparc/calculateur" />
      <section className="hero-shell bg-dark-grid page-hero text-white">
        <div className="container-forge px-4 sm:px-6 lg:px-8">
          <p className="section-tag">Estimation transparente</p>
          <h1 className="page-title">Calculez avec vos propres hypothèses.</h1>
          <p className="page-lead">Aucun tarif ni gain n’est présumé. Le résultat dépend uniquement des montants que vous saisissez.</p>
        </div>
      </section>
      <VigiParcNav />
      <section className="section-padding bg-forge-gray">
        <div className="container-forge grid gap-8 xl:grid-cols-[1.15fr_.85fr]">
          <form className="premium-card" onSubmit={(event) => event.preventDefault()}>
            <div className="mb-7 flex items-center gap-3"><span className="icon-box"><Calculator /></span><div><h2 className="text-2xl font-bold text-forge-text">Vos hypothèses</h2><p className="text-sm text-forge-text-muted">Montants annuels hors taxes en dinars tunisiens (TND).</p></div></div>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="text-sm font-semibold text-forge-text">Nombre de postes<input className={champ} type="number" min="5" max="500" step="1" value={postes} onChange={(e) => setPostes(e.target.value)} /></label>
              <label className="text-sm font-semibold text-forge-text">Postes envisageables en bornes Linux<input className={champ} type="number" min="0" max={nombre(postes)} step="1" value={bornes} onChange={(e) => setBornes(e.target.value)} /></label>
              <label className="text-sm font-semibold text-forge-text">Nombre de sites<input className={champ} type="number" min="1" max="100" step="1" value={sites} onChange={(e) => setSites(e.target.value)} /></label>
              <label className="text-sm font-semibold text-forge-text">Durée de comparaison<select className={champ} value={duree} onChange={(e) => setDuree(e.target.value)}><option value="1">1 an</option><option value="3">3 ans</option><option value="5">5 ans</option></select></label>
              <label className="text-sm font-semibold text-forge-text">Outils de gestion / poste / mois (TND)<input className={champ} type="number" min="0" step="0.01" inputMode="decimal" value={outilsMensuels} onChange={(e) => setOutilsMensuels(e.target.value)} /></label>
              <label className="text-sm font-semibold text-forge-text">Licences applicables / an (TND)<input className={champ} type="number" min="0" step="1" inputMode="decimal" value={licencesAnnuelles} onChange={(e) => setLicencesAnnuelles(e.target.value)} /></label>
              <label className="text-sm font-semibold text-forge-text">Infrastructure serveur / an (TND)<input className={champ} type="number" min="0" step="1" inputMode="decimal" value={serveursAnnuels} onChange={(e) => setServeursAnnuels(e.target.value)} /></label>
              <label className="text-sm font-semibold text-forge-text">Support actuel / an (TND)<input className={champ} type="number" min="0" step="1" inputMode="decimal" value={supportAnnuel} onChange={(e) => setSupportAnnuel(e.target.value)} /></label>
              <label className="text-sm font-semibold text-forge-text sm:col-span-2">Hypothèse VigiParc / an (TND)<input className={champ} type="number" min="0" step="1" inputMode="decimal" value={coutVigiParc} onChange={(e) => setCoutVigiParc(e.target.value)} /><span className="mt-2 block font-normal text-forge-text-muted">Saisissez zéro si vous n’avez pas encore de devis, puis demandez une estimation pour compléter la comparaison.</span></label>
            </div>
          </form>

          <aside className="rounded-3xl bg-forge-dark p-7 text-white shadow-2xl sm:p-9" aria-live="polite">
            <p className="section-tag">Résultat indicatif</p>
            <h2 className="mt-2 text-3xl font-bold">Projection sur {resultat.annees} {resultat.annees > 1 ? 'ans' : 'an'}</h2>
            <dl className="mt-8 space-y-4">
              <div className="flex items-center justify-between border-t border-white/10 pt-4"><dt className="text-white/70">Situation actuelle / an</dt><dd className="text-xl font-bold">{dinars.format(resultat.actuelAnnuel)}</dd></div>
              <div className="flex items-center justify-between border-t border-white/10 pt-4"><dt className="text-white/70">Hypothèse VigiParc / an</dt><dd className="text-xl font-bold">{dinars.format(resultat.vigiparcAnnuel)}</dd></div>
              <div className="flex items-center justify-between border-t border-white/10 pt-4"><dt className="text-white/70">Coût actuel sur la période</dt><dd className="font-bold">{dinars.format(resultat.actuelPeriode)}</dd></div>
              <div className="flex items-center justify-between border-t border-white/10 pt-4"><dt className="text-white/70">VigiParc sur la période</dt><dd className="font-bold">{dinars.format(resultat.vigiparcPeriode)}</dd></div>
              <div className="rounded-2xl border border-forge-orange/30 bg-forge-orange/10 p-5"><dt className="text-sm text-white/70">Écart potentiel</dt><dd className={`mt-1 text-3xl font-bold ${resultat.economie < 0 ? 'text-amber-300' : 'text-emerald-300'}`}>{dinars.format(resultat.economie)}</dd><p className="mt-2 text-xs text-white/70">Soit {dinars.format(resultat.economiePoste)} par poste sur la période.</p></div>
            </dl>
            <ul className="mt-7 space-y-3 text-sm leading-6 text-white/65">
              <li className="flex gap-3"><Info className="mt-1 shrink-0 text-forge-orange" size={17} />Estimation non contractuelle, avant coûts de migration, formation ou changement matériel.</li>
              <li className="flex gap-3"><CheckCircle2 className="mt-1 shrink-0 text-forge-orange" size={17} />{bornes || '0'} borne(s) envisagée(s) et {sites || '1'} site(s) sont transmis au cadrage, sans économie automatique supposée.</li>
              <li className="flex gap-3"><CheckCircle2 className="mt-1 shrink-0 text-forge-orange" size={17} />Le calcul ne considère jamais que toutes les licences Windows deviennent inutiles.</li>
            </ul>
            <a className="btn-primary mt-8 w-full justify-center" href="/vigiparc/contact">Demander une estimation personnalisée</a>
          </aside>
        </div>
      </section>
    </>
  );
}
