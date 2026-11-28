import { BookOpen, FileText, HelpCircle, History } from 'lucide-react';
import Seo from '../components/Seo';
import VigiParcNav from '../components/VigiParcNav';

const ressources = [
  { icon: BookOpen, titre: 'Gérer un parc sans Active Directory obligatoire', texte: 'Les questions à poser avant de choisir agents, comptes locaux, identité applicative et politiques de sécurité.', statut: 'Guide éditorial en préparation' },
  { icon: FileText, titre: 'Préparer une démarche ISO 27001', texte: 'Comprendre la place des preuves techniques, des risques, des responsabilités et de l’auditeur.', statut: 'Plan disponible sur demande' },
  { icon: BookOpen, titre: 'Déployer des bornes Linux', texte: 'Cadrer les usages d’accueil, d’agence ou d’atelier, les sessions et la remise à zéro.', statut: 'Guide terrain en préparation' },
  { icon: History, titre: 'Notes de version', texte: 'Les versions publiques et leurs changements seront publiés après validation du Release Center.', statut: 'Publication à venir' },
];

const questions = [
  ['VigiParc remplace-t-il Active Directory ou Intune ?', 'Non. VigiParc peut gérer des postes par agents et réduire certaines dépendances, mais le périmètre dépend de l’infrastructure et des usages à conserver.'],
  ['Où sont stockées les données ?', 'Sur le serveur VigiParc installé chez le client. Les remontées facultatives vers Central sont limitées à des états techniques agrégés.'],
  ['ISO 27001 est-elle obligatoire en Tunisie ?', 'Non, la certification ISO/IEC 27001 n’est pas une obligation générale. Le décret-loi n° 2023-17 impose en revanche un audit de cybersécurité périodique, au moins annuel, aux organismes entrant dans son champ. L’assujettissement doit être confirmé avec l’ANCS ou un expert habilité.'],
  ['VigiParc certifie-t-il ISO 27001 ?', 'Non. Il structure le suivi et certaines preuves ; la gouvernance, l’audit et la certification restent des démarches distinctes.'],
  ['Peut-on commencer par un petit parc ?', 'Le cadrage commercial vise les PME de 5 à 500 équipements, avec un périmètre progressif défini sur devis.'],
];

export default function VigiParcResourcesPage() {
  return (
    <>
      <Seo title="Ressources et FAQ | VigiParc — FORGE3D" description="Guides, réponses et informations produit pour préparer un projet VigiParc." path="/vigiparc/ressources" />
      <section className="hero-shell bg-dark-grid page-hero text-white"><div className="container-forge px-4 sm:px-6 lg:px-8"><p className="section-tag">Centre de ressources</p><h1 className="page-title">Décider avec des informations claires.</h1><p className="page-lead">Les contenus non finalisés sont signalés comme tels. Aucune note de version ni documentation fictive n’est publiée.</p></div></section>
      <VigiParcNav />
      <section className="section-padding bg-white"><div className="container-forge"><div className="grid gap-6 md:grid-cols-2">{ressources.map(({ icon: Icon, titre, texte, statut }) => <article key={titre} className="premium-card"><span className="icon-box mb-6"><Icon /></span><h2 className="text-2xl font-bold text-forge-text">{titre}</h2><p className="mt-4 leading-7 text-forge-text-muted">{texte}</p><p className="mt-5 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">{statut}</p></article>)}</div></div></section>
      <section className="section-padding bg-forge-gray"><div className="container-forge max-w-4xl"><div className="mb-10 flex items-center gap-3"><span className="icon-box"><HelpCircle /></span><div><p className="section-tag">Questions fréquentes</p><h2 className="text-3xl font-bold text-forge-text">Les réponses essentielles</h2></div></div><div className="space-y-4">{questions.map(([question, reponse]) => <details key={question} className="rounded-2xl border border-slate-200 bg-white p-6"><summary className="cursor-pointer font-bold text-forge-text">{question}</summary><p className="mt-4 leading-7 text-forge-text-muted">{reponse}</p></details>)}</div><a className="btn-primary mt-9" href="/vigiparc/contact">Poser une question à l’équipe</a></div></section>
    </>
  );
}
