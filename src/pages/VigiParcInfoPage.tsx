import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import Seo from '../components/Seo';
import VigiParcNav from '../components/VigiParcNav';
import ProtectedEmailLink from '../components/ProtectedEmailLink';
import type { ReactNode } from 'react';

type ClePage = 'fonctionnalites' | 'iso-27001' | 'bornes' | 'securite-confidentialite' | 'technologie' | 'a-propos' | 'contact' | 'mentions-legales' | 'confidentialite';
type Section = { titre: string; texte: ReactNode; points?: string[]; lien?: string };
type Page = { titre: string; description: string; sections: Section[] };

const pages: Record<ClePage, Page> = {
  fonctionnalites: {
    titre: 'Toutes les fonctions VigiParc',
    description: 'Un portail unique pour le parc, la sécurité, le support, les identités, la conformité et les employés.',
    sections: [
      { titre: 'Postes Windows et Linux', texte: 'Inventaire, conformité, logiciels et cycle de vie par agents.', points: ['Windows Server non obligatoire', 'État du poste et dernier contact', 'Actions encadrées et journalisées'], lien: '/vigiparc/postes-windows' },
      { titre: 'Gestion sans Active Directory obligatoire', texte: 'Identités applicatives, comptes locaux et politiques selon les dépendances réellement nécessaires.', points: ['Audit des usages existants', 'Transition progressive', 'Aucune promesse de remplacement intégral'], lien: '/vigiparc/sans-active-directory' },
      { titre: 'Identités et accès', texte: 'Comptes, rôles, sessions, MFA et parcours d’arrivée ou de départ.', points: ['Rôles délimités', 'Tâches vérifiables', 'Trace des opérations'], lien: '/vigiparc/identites' },
      { titre: 'Politiques de sécurité', texte: 'Règles de durcissement, correctifs, écarts et remédiations.', points: ['Politiques lisibles', 'Priorisation', 'Validation par l’équipe IT'], lien: '/vigiparc/politiques-securite' },
      { titre: 'Logiciels', texte: 'Versions installées, postes concernés et préparation du cycle de vie.', points: ['Inventaire', 'Écarts de version', 'Recherche et export'], lien: '/vigiparc/logiciels' },
      { titre: 'Cybersécurité', texte: 'Alertes, vulnérabilités et état des protections selon les connecteurs activés.', points: ['Contexte technique', 'Analyses compatibles', 'Export vers un SIEM'], lien: '/vigiparc/cybersecurite' },
      { titre: 'Assistance informatique', texte: 'Tickets, diagnostic et prise en main à distance dans un parcours commun.', points: ['Qualification', 'Intervention encadrée', 'Clôture documentée'], lien: '/vigiparc/assistance' },
      { titre: 'Multisite', texte: 'Périmètres et vues consolidées : cible clairement identifiée comme en préparation.', points: ['Pilote préalable', 'Responsabilités séparées', 'Déploiement progressif'], lien: '/vigiparc/multisite' },
    ],
  },
  'iso-27001': {
    titre: 'Audit cyber en Tunisie et préparation ISO 27001',
    description: 'Comprendre l’obligation réglementaire tunisienne et structurer une démarche ISO/IEC 27001 sans les confondre.',
    sections: [
      { titre: 'Audit obligatoire pour les organismes concernés', texte: <>Le décret-loi tunisien n° 2023-17 soumet les systèmes d’information de certaines catégories d’organismes publics et privés à un audit de cybersécurité obligatoire et périodique. L’article 7 prévoit au moins un audit tous les douze mois, réalisé par un expert habilité. <a className="font-semibold text-orange-700 underline underline-offset-4" href="https://www.ancs.tn/fr/audit-reglementaire" target="_blank" rel="noreferrer">Consulter le cadre réglementaire de l’ANCS</a>.</> },
      { titre: 'Qui est concerné ?', texte: 'Le texte vise notamment les organismes publics, certains opérateurs et fournisseurs numériques, les entreprises dont les réseaux sont interconnectés par télécommunications, les services d’hébergement ou de cloud, certaines activités traitant automatiquement les données personnelles de leurs usagers et les infrastructures numériques vitales. L’assujettissement exact doit être confirmé avec l’ANCS ou un expert habilité.' },
      { titre: 'ISO 27001 n’est pas une obligation générale', texte: 'La loi impose l’audit aux organismes entrant dans son champ ; elle n’impose pas à toutes les PME d’obtenir une certification ISO/IEC 27001. La norme fournit un cadre reconnu pour organiser le système de management de la sécurité de l’information, les risques, les contrôles et l’amélioration continue.' },
      { titre: '93 mesures structurées', texte: 'Les mesures de l’Annexe A sont suivies dans un référentiel commun, avec responsables, états et éléments de preuve.' },
      { titre: 'Collecteurs de preuves configurables', texte: 'Les collecteurs publiés dépendent de la version validée. Les preuves techniques sont horodatées et hachées sans remplacer le travail de gouvernance.' },
      { titre: 'Préparer l’audit sans promettre la conformité', texte: 'Registres de risques, fournisseurs, traitements et revues d’accès, score de suivi, rapport PDF et export ZIP facilitent la préparation. VigiParc ne remplace ni l’expert habilité, ni l’audit réglementaire, ni l’organisme certificateur.' },
    ],
  },
  bornes: {
    titre: 'Des bornes Linux maîtrisées',
    description: 'Des postes en libre-service pour les accueils, agences et ateliers, administrés depuis VigiParc.',
    sections: [
      { titre: 'Session encadrée', texte: 'Chromium et Firefox disposent d’une barre VigiParc, avec connexion employé, notes et coffre.' },
      { titre: 'Remise à zéro', texte: 'La session et les données locales sont automatiquement remises à zéro selon la politique définie.' },
      { titre: 'Déploiement reproductible', texte: 'Installation par clé USB ou image ISO, jonction Active Directory et mode hors ligne prévus pour le terrain.' },
    ],
  },
  'securite-confidentialite': {
    titre: 'Sécurité et confidentialité par conception',
    description: 'Les données du client restent sur son serveur et le lien avec Forge 3D est facultatif.',
    sections: [
      { titre: 'Autonomie locale', texte: 'La licence est vérifiée hors ligne. Une panne ou la suppression de Central n’interrompt aucune installation.' },
      { titre: 'Flux sortants uniquement', texte: 'L’installation contacte Central en HTTPS. Central ne possède ni SSH, ni VPN, ni mot de passe et ne commande aucun poste.' },
      { titre: 'Télémétrie minimale', texte: 'La supervision Forge 3D est désactivée par défaut et ne transmet que versions, compteurs et états techniques, jamais de donnée personnelle.' },
      { titre: 'Chaîne de confiance', texte: 'Les licences et mises à jour sont signées hors ligne. Central les vérifie et les distribue sans détenir la clé privée.' },
    ],
  },
  technologie: {
    titre: 'Une architecture fondée sur des composants libres',
    description: 'Aucun service tiers n’est chargé par le portail VigiParc ; les composants sont déployés avec Docker sur Debian.',
    sections: [
      { titre: 'Portail et identité', texte: 'Caddy, FastAPI, PostgreSQL, Keycloak, oauth2-proxy, HTMX, Python et Go.' },
      { titre: 'Parc et support', texte: 'Fleet, MeshCentral, GLPI, Uptime Kuma, Ansible, Trivy et Nuclei.' },
      { titre: 'Conformité et services', texte: 'CISO Assistant Community, Vaultwarden, Headwind MDM, restic, MySQL, MariaDB et Valkey.' },
      { titre: 'Exploitation', texte: 'Serveur Debian 12 ou 13, 6 vCPU, 12 Go de RAM recommandés, 100 Go de disque plus l’espace de sauvegarde et une IP fixe.' },
    ],
  },
  'a-propos': {
    titre: 'VigiParc, un produit Forge 3D',
    description: 'Une solution développée et accompagnée en Tunisie par une équipe francophone.',
    sections: [
      { titre: 'Approche', texte: 'Réunir des briques libres éprouvées dans une expérience cohérente, maintenable et documentée.' },
      { titre: 'Accompagnement', texte: 'La mise en service associe installation, paramétrage avec l’équipe IT et transfert de compétences.' },
      { titre: 'Engagement', texte: 'Aucune référence client, capture réelle ou chiffre commercial n’est publié sans accord écrit.' },
    ],
  },
  contact: {
    titre: 'Demander une démonstration',
    description: 'Présentez votre parc et vos priorités ; Forge 3D préparera une démonstration adaptée.',
    sections: [
      { titre: 'Formulaire qualifié', texte: 'Le formulaire sécurisé se trouve sur la page principale VigiParc. Il n’utilise ni reCAPTCHA, ni service anti-spam tiers.' },
      { titre: 'Coordonnées', texte: 'Forge 3D — Tunisie. Adresse postale et téléphone public : espaces réservés en attente de validation.' },
    ],
  },
  'mentions-legales': {
    titre: 'Mentions légales',
    description: 'Informations relatives à l’éditeur du site VigiParc.',
    sections: [
      { titre: 'Éditeur', texte: 'Forge 3D, Tunisie. Forme juridique, adresse et matricule fiscal : espaces réservés en attente de validation.' },
      { titre: 'Hébergement', texte: 'Fournisseur et pays d’hébergement : espace réservé en attente de décision.' },
      { titre: 'Propriété intellectuelle', texte: 'VigiParc appartient à Forge 3D. Les composants libres conservent leurs licences respectives.' },
    ],
  },
  confidentialite: {
    titre: 'Confidentialité du site VigiParc',
    description: 'Le site ne dépose aucun cookie de suivi et ne charge aucun outil de mesure d’audience.',
    sections: [
      { titre: 'Données du formulaire', texte: 'Identité, société, fonction, coordonnées, pays, taille du parc, sites, infrastructure, besoins, message et preuve de consentement sont utilisés pour répondre à la demande.' },
      { titre: 'Continuité de transmission', texte: 'Si VigiParc Central est temporairement indisponible, la demande est conservée dans une file PostgreSQL du site puis retransmise automatiquement. Le contenu est effacé de cette file après livraison et reste exclu des journaux HTTP.' },
      { titre: 'Durée et droits', texte: <>Sans contact actif, les prospects sont supprimés après trois ans. Une demande d’accès, de rectification ou de suppression peut être adressée à <ProtectedEmailLink />.</> },
      { titre: 'Cadre applicable', texte: 'Le traitement respecte la loi organique tunisienne n° 2004-63 et, pour les visiteurs européens, les principes du RGPD.' },
    ],
  },
};

export default function VigiParcInfoPage({ page }: { page: ClePage }) {
  const contenu = pages[page];
  const chemin = `/vigiparc/${page}`;
  return (
    <>
      <Seo title={`${contenu.titre} | VigiParc — FORGE3D`} description={contenu.description} path={chemin} />
      <section className="hero-shell bg-dark-grid page-hero text-white">
        <div className="container-forge px-4 sm:px-6 lg:px-8">
          <a className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/65 hover:text-forge-orange" href="/vigiparc"><ArrowLeft size={16} /> VigiParc</a>
          <h1 className="page-title">{contenu.titre}</h1>
          <p className="page-lead">{contenu.description}</p>
        </div>
      </section>
      <VigiParcNav />
      <section className="section-padding bg-forge-gray">
        <div className="container-forge grid gap-6 lg:grid-cols-2">
          {contenu.sections.map((section) => <article key={section.titre} className="premium-card"><h2 className="text-2xl font-bold text-forge-text">{section.titre}</h2><p className="mt-4 leading-7 text-forge-text-muted">{section.texte}</p>{section.points && <ul className="mt-5 space-y-3">{section.points.map((point) => <li key={point} className="flex gap-3 text-sm text-forge-text-muted"><CheckCircle2 className="mt-0.5 shrink-0 text-forge-orange" size={18} />{point}</li>)}</ul>}{section.lien && <a className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-orange-700" href={section.lien}>Découvrir ce domaine <ArrowRight size={16} /></a>}</article>)}
        </div>
        <div className="container-forge mt-10 flex flex-wrap gap-4">
          <a className="btn-primary" href="/vigiparc#demonstration">Demander une démonstration <ArrowRight size={16} /></a>
          <a className="btn-secondary" href="/vigiparc/confidentialite">Lire la politique de confidentialité</a>
        </div>
      </section>
    </>
  );
}
