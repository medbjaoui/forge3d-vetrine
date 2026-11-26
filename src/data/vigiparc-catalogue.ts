export type Disponibilite = 'disponible' | 'accompagnement' | 'preparation';

export type ModuleVigiParc = {
  id: string;
  nom: string;
  resume: string;
  avantages: string[];
  disponibilite: Disponibilite;
  offre: 'Essentiel' | 'Pro';
  documentation?: string;
};

export const modulesVigiParc: ModuleVigiParc[] = [
  {
    id: 'parc-windows-linux',
    nom: 'Gestion du parc',
    resume: 'Inventaire des postes Windows et Linux, logiciels, conformité et cycle de vie.',
    avantages: ['Vue unifiée du parc', 'Agents de gestion sans Windows Server obligatoire', 'Suivi des écarts et des actions'],
    disponibilite: 'disponible',
    offre: 'Essentiel',
  },
  {
    id: 'identites',
    nom: 'Identités et accès',
    resume: 'Comptes applicatifs, rôles, sessions, MFA et parcours d’arrivée ou de départ.',
    avantages: ['Moins d’actions manuelles', 'Droits mieux délimités', 'Traçabilité des opérations'],
    disponibilite: 'disponible',
    offre: 'Essentiel',
  },
  {
    id: 'securite',
    nom: 'Sécurité et correctifs',
    resume: 'Alertes, durcissement, correctifs, isolement et contrôles de sécurité.',
    avantages: ['Priorisation des écarts', 'Politiques vérifiables', 'Journal d’audit exportable'],
    disponibilite: 'disponible',
    offre: 'Essentiel',
  },
  {
    id: 'support',
    nom: 'Assistance informatique',
    resume: 'Tickets, diagnostic et prise en main à distance depuis un parcours commun.',
    avantages: ['Demandes centralisées', 'Contexte technique disponible', 'Actions journalisées'],
    disponibilite: 'disponible',
    offre: 'Essentiel',
  },
  {
    id: 'iso-27001',
    nom: 'Préparation ISO 27001',
    resume: 'Référentiel, preuves, risques, actions et exports pour préparer les revues.',
    avantages: ['Suivi des 93 mesures', 'Collecteurs publiés selon version validée', 'Export pour l’auditeur'],
    disponibilite: 'accompagnement',
    offre: 'Pro',
    documentation: '/vigiparc/iso-27001',
  },
  {
    id: 'bornes-linux',
    nom: 'Bornes Linux',
    resume: 'Sessions encadrées pour l’accueil, les agences et les ateliers.',
    avantages: ['Déploiement reproductible', 'Remise à zéro selon la politique', 'Administration centralisée'],
    disponibilite: 'accompagnement',
    offre: 'Pro',
    documentation: '/vigiparc/bornes',
  },
  {
    id: 'sauvegardes',
    nom: 'Sauvegardes et exploitation',
    resume: 'Sauvegardes chiffrées, supervision des services, certificats et maintenance.',
    avantages: ['État technique lisible', 'Contrôles de sauvegarde', 'Mises à jour signées'],
    disponibilite: 'disponible',
    offre: 'Essentiel',
  },
  {
    id: 'multisite',
    nom: 'Gestion multisite',
    resume: 'Organisation et supervision de plusieurs sites depuis la même installation.',
    avantages: ['Périmètres séparés', 'Lecture consolidée', 'Déploiement progressif'],
    disponibilite: 'preparation',
    offre: 'Pro',
  },
];

export const offresVigiParc = [
  {
    id: 'essentiel',
    nom: 'Essentiel',
    description: 'Le socle de gestion, sécurité et support pour structurer l’exploitation quotidienne.',
    modules: modulesVigiParc.filter((module) => module.offre === 'Essentiel').map((module) => module.id),
    support: 'Défini avec le périmètre de mise en service',
    equipements: 'De 5 à 500, dimensionné sur devis',
    sites: 'Selon l’architecture validée',
  },
  {
    id: 'pro',
    nom: 'Pro',
    description: 'Le socle Essentiel complété par les modules avancés retenus avec votre équipe.',
    modules: modulesVigiParc.map((module) => module.id),
    support: 'Accompagnement renforcé défini sur devis',
    equipements: 'De 5 à 500, dimensionné sur devis',
    sites: 'Monosite ou multisite selon validation',
  },
] as const;

export const libelleDisponibilite: Record<Disponibilite, string> = {
  disponible: 'Disponible',
  accompagnement: 'Avec accompagnement',
  preparation: 'En préparation',
};
