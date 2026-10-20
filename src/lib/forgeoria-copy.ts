import type { Budget, CompanySize, Locale, Need, Timeline } from './forgeoria';
import { CONSENT_VERSION, SIGNATURE } from './forgeoria';

export type DemoId = 'lead' | 'invoice' | 'support';
export type StageKey = 'request' | 'classify' | 'review' | 'action';
export const STAGES: StageKey[] = ['request', 'classify', 'review', 'action'];

type Demo = { id: DemoId; label: string; steps: Record<StageKey, { summary: string; detail: string[] }> };

type Copy = {
  langName: string;
  switchTo: string;
  badge: string;
  signature: string;
  lead: string;
  ctaDiscovery: string;
  ctaDemos: string;
  diagram: {
    title: string;
    simulated: string;
    tabsLabel: string;
    stages: Record<StageKey, string>;
    pause: string;
    play: string;
    replay: string;
    reducedMotion: string;
    sample: string;
  };
  demos: Demo[];
  principles: { tag: string; title: string; items: { title: string; text: string }[] };
  useCases: { tag: string; title: string; text: string; items: { title: string; text: string }[] };
  status: { tag: string; title: string; heading: string; text: string };
  form: {
    tag: string;
    title: string;
    intro: string;
    name: string;
    email: string;
    company: string;
    companySize: string;
    budget: string;
    timeline: string;
    needs: string;
    select: string;
    companySizes: Record<CompanySize, string>;
    budgets: Record<Budget, string>;
    timelines: Record<Timeline, string>;
    needOptions: Record<Need, string>;
    consent: string;
    privacyLink: string;
    submit: string;
    pending: string;
    success: string;
    errors: {
      invalid: string;
      needs: string;
      consent: string;
      badRequest: string;
      rateLimited: (seconds: number | null) => string;
      unavailable: string;
      network: string;
      unexpected: string;
    };
    honeypot: string;
  };
  privacy: { tag: string; title: string; paragraphs: string[]; versionLabel: string };
  contact: { title: string; text: string };
};

const en: Copy = {
  langName: 'English',
  switchTo: 'Afficher la page en français',
  badge: 'In development · demos simulated locally',
  signature: SIGNATURE.en,
  lead: 'ForgeOria is the automation offer from FORGE3D. We design workflows that sort incoming requests, documents and messages, keep a person in control of every decision, and prepare the next action for your team.',
  ctaDiscovery: 'Request a discovery call',
  ctaDemos: 'See the workflow',
  diagram: {
    title: 'Workflow preview',
    simulated: 'Simulated in your browser · fictional data · no AI call, nothing sent',
    tabsLabel: 'Choose a demo scenario',
    stages: { request: 'Request', classify: 'Classify', review: 'Human review', action: 'Prepared action' },
    pause: 'Pause animation',
    play: 'Play animation',
    replay: 'Replay scenario',
    reducedMotion: 'Animation reduced to match your system settings.',
    sample: 'Fictional sample',
  },
  demos: [
    {
      id: 'lead',
      label: 'Lead qualification',
      steps: {
        request: { summary: 'Website enquiry received', detail: ['“We would like a quote to automate our order intake. We are a team of about twenty.”'] },
        classify: { summary: 'Enquiry sorted', detail: ['Intent: quote request', 'Company size: 11–50', 'Topic: order intake'] },
        review: { summary: 'Team member confirms', detail: ['Qualification checked and adjusted by a person before anything moves.'] },
        action: { summary: 'Follow-up prepared', detail: ['Draft reply and CRM entry ready for approval — not sent.'] },
      },
    },
    {
      id: 'invoice',
      label: 'Invoice extraction',
      steps: {
        request: { summary: 'Supplier PDF received', detail: ['Sample invoice from a fictional supplier.'] },
        classify: { summary: 'Fields identified', detail: ['Document: supplier invoice', 'Fields: supplier, date, total, VAT', 'Flag: total to double-check'] },
        review: { summary: 'Accountant verifies', detail: ['Extracted fields compared with the original document.'] },
        action: { summary: 'Entry draft prepared', detail: ['Accounting entry ready for export — not posted.'] },
      },
    },
    {
      id: 'support',
      label: 'Support triage',
      steps: {
        request: { summary: 'Customer message received', detail: ['“My order arrived damaged. Can I get a replacement?”'] },
        classify: { summary: 'Ticket categorised', detail: ['Topic: damaged delivery', 'Priority: high', 'Language: English'] },
        review: { summary: 'Agent approves', detail: ['Suggested category and reply validated by a support agent.'] },
        action: { summary: 'Reply prepared', detail: ['Reply draft and replacement ticket ready — not sent.'] },
      },
    },
  ],
  principles: {
    tag: 'How we build',
    title: 'Automation that keeps people in control.',
    items: [
      { title: 'Human review by design', text: 'Sensitive or uncertain steps go to a person. Nothing irreversible happens without approval.' },
      { title: 'Prepared, not pushed', text: 'ForgeOria prepares drafts, entries and tickets. Your team decides what is sent.' },
      { title: 'Scoped integrations', text: 'Connections to your tools are defined per project, after a discovery phase — not assumed upfront.' },
      { title: 'Honest status', text: 'We describe what exists today separately from what is on the roadmap.' },
    ],
  },
  useCases: {
    tag: 'Use cases',
    title: 'Where we start.',
    text: 'Three recurring workflows we explore with businesses. Each project begins with a discovery call to confirm fit.',
    items: [
      { title: 'Lead qualification', text: 'Sort incoming enquiries, structure the key information and prepare a follow-up for your sales team.' },
      { title: 'Invoice processing', text: 'Identify the useful fields on supplier documents and prepare entries for your accounting review.' },
      { title: 'Support triage', text: 'Categorise customer messages, set a priority and prepare a reply for an agent to approve.' },
    ],
  },
  status: {
    tag: 'Current status',
    title: 'In development.',
    heading: 'Demos are local simulations',
    text: 'The scenarios on this page run entirely in your browser with fictional data. They do not call an AI model or any external service, and they do not represent customer results. ForgeOria is not yet offered as a self-serve product; projects are scoped individually with FORGE3D.',
  },
  form: {
    tag: 'Discovery',
    title: 'Tell us about your workflow.',
    intro: 'Share a few details and FORGE3D will get back to you to discuss whether ForgeOria fits your needs. You will receive an acknowledgement by email.',
    name: 'Full name',
    email: 'Work email',
    company: 'Company',
    companySize: 'Company size',
    budget: 'Estimated budget',
    timeline: 'Timeline',
    needs: 'What would you like to automate?',
    select: 'Select…',
    companySizes: { '1-10': '1–10 people', '11-50': '11–50 people', '51-200': '51–200 people', '201-1000': '201–1,000 people', '1000+': 'More than 1,000 people' },
    budgets: { lt5k: 'Less than €5k', '5k-15k': '€5k – €15k', '15k-50k': '€15k – €50k', gt50k: 'More than €50k', unknown: 'Not sure yet' },
    timelines: { asap: 'As soon as possible', '1-3m': 'Within 1–3 months', '3-6m': 'Within 3–6 months', exploring: 'Just exploring' },
    needOptions: { lead_qualification: 'Lead qualification', invoice_processing: 'Invoice processing', support_triage: 'Support triage', crm_sync: 'CRM synchronisation', reporting: 'Reporting', other: 'Something else' },
    consent: 'I agree that FORGE3D stores the information above to contact me about my ForgeOria discovery request.',
    privacyLink: 'How we use your data',
    submit: 'Send my request',
    pending: 'Sending…',
    success: 'Thank you — your request has been received. FORGE3D will contact you by email.',
    errors: {
      invalid: 'Please check the highlighted fields.',
      needs: 'Select at least one option.',
      consent: 'Your consent is required to send this request.',
      badRequest: 'Some information was not accepted. Please check the fields and try again.',
      rateLimited: (s) => (s ? `Too many attempts. Please try again in about ${Math.ceil(s / 60)} minute(s).` : 'Too many attempts. Please try again later.'),
      unavailable: 'The request service is temporarily unavailable. Please try again later or email contact@forge3d.tech.',
      network: 'Network error — your request was not sent. Check your connection and try again.',
      unexpected: 'Your request could not be confirmed. Please try again or email contact@forge3d.tech.',
    },
    honeypot: 'Leave this field empty',
  },
  privacy: {
    tag: 'Privacy',
    title: 'How your request is handled.',
    paragraphs: [
      'The discovery form collects your name, work email, company, company size, budget range, timeline and the workflows you are interested in. FORGE3D uses this information only to answer your ForgeOria discovery request; the service derives an internal follow-up priority from your answers (size, budget, timeline, needs).',
      'Your request is stored by FORGE3D’s ForgeOria service. It is not sold or shared for advertising, and an acknowledgement is sent through our OVHcloud email service; no marketing subscription or n8n automation is triggered. For anti-abuse rate limiting, the service keeps a salted hash of your IP address rather than the address itself.',
      'This page does not store your answers in your browser. To access, correct or delete your request, write to contact@forge3d.tech.',
    ],
    versionLabel: 'Consent text version',
  },
  contact: { title: 'Prefer email?', text: 'Write to FORGE3D directly about ForgeOria.' },
};

const fr: Copy = {
  langName: 'Français',
  switchTo: 'Show this page in English',
  badge: 'En développement · démos simulées localement',
  signature: SIGNATURE.fr,
  lead: 'ForgeOria est l’offre d’automatisation de FORGE3D. Nous concevons des workflows qui trient les demandes, documents et messages entrants, laissent une personne valider chaque décision et préparent l’action suivante pour votre équipe.',
  ctaDiscovery: 'Demander un appel découverte',
  ctaDemos: 'Voir le workflow',
  diagram: {
    title: 'Aperçu du workflow',
    simulated: 'Simulé dans votre navigateur · données fictives · aucun appel IA, rien n’est envoyé',
    tabsLabel: 'Choisir un scénario de démonstration',
    stages: { request: 'Demande', classify: 'Classification', review: 'Validation humaine', action: 'Action préparée' },
    pause: 'Mettre l’animation en pause',
    play: 'Lancer l’animation',
    replay: 'Rejouer le scénario',
    reducedMotion: 'Animation réduite selon vos préférences système.',
    sample: 'Exemple fictif',
  },
  demos: [
    {
      id: 'lead',
      label: 'Qualification de leads',
      steps: {
        request: { summary: 'Demande reçue via le site', detail: ['« Nous aimerions un devis pour automatiser la prise de commandes. Nous sommes une vingtaine. »'] },
        classify: { summary: 'Demande triée', detail: ['Intention : demande de devis', 'Taille : 11–50', 'Sujet : prise de commandes'] },
        review: { summary: 'Validation par l’équipe', detail: ['La qualification est vérifiée et ajustée par une personne avant toute suite.'] },
        action: { summary: 'Relance préparée', detail: ['Brouillon de réponse et fiche CRM prêts à valider — non envoyés.'] },
      },
    },
    {
      id: 'invoice',
      label: 'Extraction de factures',
      steps: {
        request: { summary: 'PDF fournisseur reçu', detail: ['Facture d’exemple d’un fournisseur fictif.'] },
        classify: { summary: 'Champs identifiés', detail: ['Document : facture fournisseur', 'Champs : fournisseur, date, total, TVA', 'Alerte : total à revérifier'] },
        review: { summary: 'Contrôle comptable', detail: ['Les champs extraits sont comparés au document original.'] },
        action: { summary: 'Écriture préparée', detail: ['Écriture comptable prête à l’export — non comptabilisée.'] },
      },
    },
    {
      id: 'support',
      label: 'Tri du support',
      steps: {
        request: { summary: 'Message client reçu', detail: ['« Ma commande est arrivée abîmée. Puis-je avoir un remplacement ? »'] },
        classify: { summary: 'Ticket catégorisé', detail: ['Sujet : livraison endommagée', 'Priorité : haute', 'Langue : français'] },
        review: { summary: 'Validation par un agent', detail: ['Catégorie et réponse suggérées validées par un agent support.'] },
        action: { summary: 'Réponse préparée', detail: ['Brouillon de réponse et ticket de remplacement prêts — non envoyés.'] },
      },
    },
  ],
  principles: {
    tag: 'Notre approche',
    title: 'Une automatisation qui laisse la main aux équipes.',
    items: [
      { title: 'Validation humaine intégrée', text: 'Les étapes sensibles ou incertaines passent par une personne. Rien d’irréversible sans accord.' },
      { title: 'Préparer, pas imposer', text: 'ForgeOria prépare brouillons, écritures et tickets. Votre équipe décide de ce qui part.' },
      { title: 'Intégrations cadrées', text: 'Les connexions à vos outils sont définies projet par projet, après une phase de découverte.' },
      { title: 'Statut transparent', text: 'Nous distinguons clairement ce qui existe aujourd’hui de ce qui relève de la feuille de route.' },
    ],
  },
  useCases: {
    tag: 'Cas d’usage',
    title: 'Par où commencer.',
    text: 'Trois workflows récurrents que nous explorons avec les entreprises. Chaque projet débute par un appel découverte.',
    items: [
      { title: 'Qualification de leads', text: 'Trier les demandes entrantes, structurer les informations clés et préparer une relance pour l’équipe commerciale.' },
      { title: 'Traitement des factures', text: 'Repérer les champs utiles des documents fournisseurs et préparer les écritures pour contrôle comptable.' },
      { title: 'Tri du support', text: 'Catégoriser les messages clients, fixer une priorité et préparer une réponse à valider par un agent.' },
    ],
  },
  status: {
    tag: 'Statut actuel',
    title: 'En développement.',
    heading: 'Les démos sont des simulations locales',
    text: 'Les scénarios de cette page s’exécutent entièrement dans votre navigateur avec des données fictives. Ils n’appellent aucun modèle d’IA ni service externe et ne représentent pas des résultats clients. ForgeOria n’est pas encore proposé en libre-service ; chaque projet est cadré individuellement avec FORGE3D.',
  },
  form: {
    tag: 'Découverte',
    title: 'Parlez-nous de votre workflow.',
    intro: 'Partagez quelques informations et FORGE3D reviendra vers vous pour voir si ForgeOria correspond à vos besoins. Vous recevrez un accusé de réception par e-mail.',
    name: 'Nom complet',
    email: 'E-mail professionnel',
    company: 'Entreprise',
    companySize: 'Taille de l’entreprise',
    budget: 'Budget estimé',
    timeline: 'Délai',
    needs: 'Que souhaitez-vous automatiser ?',
    select: 'Sélectionner…',
    companySizes: { '1-10': '1 à 10 personnes', '11-50': '11 à 50 personnes', '51-200': '51 à 200 personnes', '201-1000': '201 à 1 000 personnes', '1000+': 'Plus de 1 000 personnes' },
    budgets: { lt5k: 'Moins de 5 k€', '5k-15k': '5 k€ – 15 k€', '15k-50k': '15 k€ – 50 k€', gt50k: 'Plus de 50 k€', unknown: 'Je ne sais pas encore' },
    timelines: { asap: 'Dès que possible', '1-3m': 'Sous 1 à 3 mois', '3-6m': 'Sous 3 à 6 mois', exploring: 'Simple exploration' },
    needOptions: { lead_qualification: 'Qualification de leads', invoice_processing: 'Traitement des factures', support_triage: 'Tri du support', crm_sync: 'Synchronisation CRM', reporting: 'Reporting', other: 'Autre besoin' },
    consent: 'J’accepte que FORGE3D conserve les informations ci-dessus pour me recontacter au sujet de ma demande de découverte ForgeOria.',
    privacyLink: 'Utilisation de vos données',
    submit: 'Envoyer ma demande',
    pending: 'Envoi en cours…',
    success: 'Merci — votre demande a bien été reçue. FORGE3D vous recontactera par e-mail.',
    errors: {
      invalid: 'Veuillez vérifier les champs signalés.',
      needs: 'Sélectionnez au moins une option.',
      consent: 'Votre consentement est nécessaire pour envoyer la demande.',
      badRequest: 'Certaines informations n’ont pas été acceptées. Vérifiez les champs puis réessayez.',
      rateLimited: (s) => (s ? `Trop de tentatives. Réessayez dans environ ${Math.ceil(s / 60)} minute(s).` : 'Trop de tentatives. Réessayez plus tard.'),
      unavailable: 'Le service de demandes est momentanément indisponible. Réessayez plus tard ou écrivez à contact@forge3d.tech.',
      network: 'Erreur réseau — votre demande n’a pas été envoyée. Vérifiez votre connexion puis réessayez.',
      unexpected: 'Votre demande n’a pas pu être confirmée. Réessayez ou écrivez à contact@forge3d.tech.',
    },
    honeypot: 'Laissez ce champ vide',
  },
  privacy: {
    tag: 'Confidentialité',
    title: 'Comment votre demande est traitée.',
    paragraphs: [
      'Le formulaire de découverte recueille votre nom, votre e-mail professionnel, votre entreprise, sa taille, une fourchette de budget, un délai et les workflows qui vous intéressent. FORGE3D utilise ces informations uniquement pour répondre à votre demande de découverte ForgeOria ; le service en déduit une priorité de suivi interne (taille, budget, délai, besoins).',
      'Votre demande est conservée par le service ForgeOria de FORGE3D. Elle n’est ni vendue ni partagée à des fins publicitaires, et un accusé de réception est envoyé via notre messagerie OVHcloud ; aucune inscription commerciale ni automatisation n8n n’est déclenchée. Pour limiter les abus, le service conserve une empreinte salée de votre adresse IP plutôt que l’adresse elle-même.',
      'Cette page n’enregistre pas vos réponses dans votre navigateur. Pour consulter, corriger ou supprimer votre demande, écrivez à contact@forge3d.tech.',
    ],
    versionLabel: 'Version du texte de consentement',
  },
  contact: { title: 'Vous préférez l’e-mail ?', text: 'Écrivez directement à FORGE3D au sujet de ForgeOria.' },
};

export const COPY: Record<Locale, Copy> = { en, fr };
export { CONSENT_VERSION };
