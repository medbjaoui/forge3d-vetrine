import { CheckCircle2, Scale } from 'lucide-react';
import Seo from '../components/Seo';
import VigiParcNav from '../components/VigiParcNav';

const criteres = [
  ['Hébergement', 'Où résident les données, les journaux et les sauvegardes ?'],
  ['Dépendances', 'Quels serveurs, annuaires, abonnements et agents sont obligatoires ?'],
  ['Systèmes couverts', 'Windows, Linux, bornes, mobiles et équipements réseau sont-ils réellement gérés ?'],
  ['Identités et politiques', 'Quels comptes, rôles, politiques et preuves sont pris en charge ?'],
  ['Exploitation', 'Comment fonctionnent correctifs, assistance, sauvegardes et multisite ?'],
  ['Coût complet', 'Inclut-il licences, infrastructure, intégration, maintenance, support et migration ?'],
];

export default function VigiParcComparePage() {
  return (
    <>
      <Seo title="Comparer les approches de gestion IT | VigiParc — FORGE3D" description="Une grille neutre pour comparer VigiParc, suites cloud, RMM, MDM et assemblages d’outils." path="/vigiparc/comparatif" />
      <section className="hero-shell bg-dark-grid page-hero text-white"><div className="container-forge px-4 sm:px-6 lg:px-8"><p className="section-tag">Comparatif responsable</p><h1 className="page-title">Comparez les périmètres, pas les slogans.</h1><p className="page-lead">Cette grille ne note aucun concurrent et ne suppose pas que des produits aux objectifs différents sont interchangeables.</p></div></section>
      <VigiParcNav />
      <section className="section-padding bg-white"><div className="container-forge"><div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{criteres.map(([titre, texte]) => <article key={titre} className="premium-card"><span className="icon-box mb-6"><Scale /></span><h2 className="text-xl font-bold text-forge-text">{titre}</h2><p className="mt-3 text-sm leading-7 text-forge-text-muted">{texte}</p></article>)}</div></div></section>
      <section className="section-padding bg-forge-gray"><div className="container-forge grid gap-8 lg:grid-cols-2"><div><p className="section-tag">Catégories à examiner</p><h2 className="section-title text-forge-text">Un besoin peut mobiliser plusieurs familles d’outils.</h2></div><ul className="grid gap-3 sm:grid-cols-2">{['Suites de gestion cloud', 'Windows Server et annuaire', 'RMM et assistance', 'MDM', 'Gestion d’actifs', 'Outils de conformité', 'Assemblages open source', 'VigiParc sur site'].map((item) => <li key={item} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm text-forge-text-muted"><CheckCircle2 className="shrink-0 text-forge-orange" size={18} />{item}</li>)}</ul></div><div className="container-forge mt-9 rounded-2xl border border-slate-200 bg-white p-6 text-sm leading-7 text-forge-text-muted"><strong className="text-forge-text">Cadre de publication :</strong> les caractéristiques nominatives, prix et dates des éditeurs ne seront ajoutés qu’après vérification de leurs documentations officielles. Cette version ne publie donc aucune affirmation concurrentielle non sourcée.</div></section>
    </>
  );
}
