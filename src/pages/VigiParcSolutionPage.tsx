import { CheckCircle2, ShieldCheck } from 'lucide-react';
import Seo from '../components/Seo';
import VigiParcNav from '../components/VigiParcNav';

export type SolutionVigiParc = 'postes-windows' | 'sans-active-directory' | 'identites' | 'politiques-securite' | 'logiciels' | 'cybersecurite' | 'assistance' | 'multisite';

const solutions: Record<SolutionVigiParc, { titre: string; description: string; disponibilite: string; sections: { titre: string; texte: string; points: string[] }[] }> = {
  'postes-windows': {
    titre: 'Gérer les postes Windows par agents',
    description: 'Inventorier, suivre et sécuriser le parc sans rendre Windows Server obligatoire.',
    disponibilite: 'Disponible dans le socle Essentiel, selon cadrage technique',
    sections: [
      { titre: 'Visibilité du parc', texte: 'Les agents remontent l’état utile à la gestion locale du parc.', points: ['Inventaire matériel et logiciel', 'État de conformité', 'Dernier contact et cycle de vie'] },
      { titre: 'Actions encadrées', texte: 'Les opérations sont autorisées, tracées et limitées par le rôle de l’utilisateur.', points: ['Correctifs et politiques', 'Diagnostic et assistance', 'Journalisation des actions'] },
    ],
  },
  'sans-active-directory': {
    titre: 'Gérer sans Active Directory obligatoire',
    description: 'Une approche par agents, identités applicatives et politiques locales, sans promettre de remplacer tous les usages AD.',
    disponibilite: 'Disponible selon les dépendances de l’environnement',
    sections: [
      { titre: 'Agents et comptes locaux', texte: 'VigiParc peut administrer les postes et certains comptes sans imposer un contrôleur de domaine.', points: ['Inventaire par agent', 'Comptes locaux encadrés', 'Politiques vérifiables'] },
      { titre: 'Compatibilité avant migration', texte: 'Les applications, partages, imprimantes et règles historiques sont étudiés avant toute réduction de dépendance.', points: ['Audit des usages existants', 'Plan de transition progressif', 'Maintien des dépendances nécessaires'] },
    ],
  },
  identites: {
    titre: 'Centraliser les identités applicatives',
    description: 'Rôles, MFA, sessions et parcours d’arrivée ou de départ depuis une base commune.',
    disponibilite: 'Disponible dans le socle Essentiel',
    sections: [
      { titre: 'Accès maîtrisés', texte: 'Chaque rôle reçoit uniquement les fonctions nécessaires.', points: ['MFA TOTP', 'Sessions contrôlées', 'Rôles IT, support, conformité et lecture'] },
      { titre: 'Cycle de vie', texte: 'Les arrivées, changements et départs deviennent des parcours vérifiables.', points: ['Tâches attribuées', 'Contrôles de fin de parcours', 'Trace des opérations'] },
    ],
  },
  'politiques-securite': {
    titre: 'Appliquer des politiques de sécurité',
    description: 'Définir des règles, constater les écarts et suivre les remédiations.',
    disponibilite: 'Disponible selon les systèmes et politiques retenus',
    sections: [
      { titre: 'Politiques lisibles', texte: 'Les exigences sont reliées aux postes concernés et à leur état.', points: ['Durcissement', 'Correctifs', 'Conformité des postes'] },
      { titre: 'Remédiation contrôlée', texte: 'L’équipe choisit les actions adaptées à son environnement.', points: ['Priorisation des écarts', 'Actions journalisées', 'Validation par l’équipe IT'] },
    ],
  },
  logiciels: {
    titre: 'Suivre les logiciels et leurs licences',
    description: 'Rapprocher l’inventaire, les besoins et le cycle de vie logiciel.',
    disponibilite: 'Inventaire disponible ; fonctions avancées selon offre',
    sections: [
      { titre: 'Inventaire logiciel', texte: 'Les logiciels détectés rejoignent la fiche du poste et les vues de parc.', points: ['Versions installées', 'Postes concernés', 'Recherche et export'] },
      { titre: 'Pilotage', texte: 'Les données servent à préparer les renouvellements et les corrections.', points: ['Écarts de version', 'Suivi des licences', 'Préparation des mises à jour'] },
    ],
  },
  cybersecurite: {
    titre: 'Regrouper les signaux de cybersécurité',
    description: 'Réunir alertes, vulnérabilités et état des protections sans promettre une couverture universelle.',
    disponibilite: 'Disponible selon les connecteurs activés',
    sections: [
      { titre: 'Signaux exploitables', texte: 'Les connecteurs compatibles alimentent une vue de travail commune.', points: ['Alertes de sécurité', 'Analyses Trivy et Nuclei', 'Inventaire réseau SNMP'] },
      { titre: 'Décision humaine', texte: 'VigiParc assiste la priorisation ; l’équipe reste responsable de l’analyse et de la réponse.', points: ['Contexte technique', 'Historique des actions', 'Export vers un SIEM'] },
    ],
  },
  assistance: {
    titre: 'Organiser l’assistance informatique',
    description: 'Faire circuler la demande, le contexte et l’action dans un parcours traçable.',
    disponibilite: 'Disponible dans le socle Essentiel',
    sections: [
      { titre: 'Un point d’entrée', texte: 'Les employés déclarent leurs demandes dans un parcours commun.', points: ['Tickets GLPI', 'Qualification de la demande', 'Suivi du statut'] },
      { titre: 'Intervention encadrée', texte: 'Le support intervient avec les droits et les outils prévus.', points: ['Prise en main MeshCentral', 'Actions journalisées', 'Clôture documentée'] },
    ],
  },
  multisite: {
    titre: 'Préparer la gestion multisite',
    description: 'Structurer plusieurs implantations sans mélanger leurs responsabilités ni leurs contraintes.',
    disponibilite: 'Fonctionnalité en préparation — non commercialisée comme disponible',
    sections: [
      { titre: 'Périmètres séparés', texte: 'La cible prévoit des sites identifiés, des vues consolidées et des responsabilités adaptées.', points: ['Inventaire par site', 'Alertes consolidées', 'Rôles par périmètre'] },
      { titre: 'Déploiement progressif', texte: 'Chaque site doit être validé selon sa connectivité et ses contraintes.', points: ['Pilote initial', 'Critères de passage', 'Retour arrière documenté'] },
    ],
  },
};

export default function VigiParcSolutionPage({ solution }: { solution: SolutionVigiParc }) {
  const contenu = solutions[solution];
  const path = `/vigiparc/${solution}`;
  return (
    <>
      <Seo title={`${contenu.titre} | VigiParc — FORGE3D`} description={contenu.description} path={path} />
      <section className="hero-shell bg-dark-grid page-hero text-white"><div className="container-forge px-4 sm:px-6 lg:px-8"><p className="section-tag">Solution VigiParc</p><h1 className="page-title">{contenu.titre}</h1><p className="page-lead">{contenu.description}</p><p className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[.05] px-4 py-2 text-sm text-white/75"><ShieldCheck size={17} className="text-forge-orange" />{contenu.disponibilite}</p></div></section>
      <VigiParcNav />
      <section className="section-padding bg-forge-gray"><div className="container-forge grid gap-6 lg:grid-cols-2">{contenu.sections.map((section) => <article key={section.titre} className="premium-card"><h2 className="text-2xl font-bold text-forge-text">{section.titre}</h2><p className="mt-4 leading-7 text-forge-text-muted">{section.texte}</p><ul className="mt-6 space-y-3">{section.points.map((point) => <li key={point} className="flex gap-3 text-sm text-forge-text-muted"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-forge-orange" />{point}</li>)}</ul></article>)}</div><div className="container-forge mt-9 flex flex-wrap gap-4"><a href="/vigiparc/contact" className="btn-primary">Valider votre périmètre</a><a href="/vigiparc/fonctionnalites" className="btn-secondary">Voir toutes les fonctions</a></div></section>
    </>
  );
}
