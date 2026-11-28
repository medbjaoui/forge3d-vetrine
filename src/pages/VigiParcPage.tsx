import { ArrowRight, CheckCircle2, Database, ExternalLink, FileCheck2, Landmark, LockKeyhole, MonitorCog, Server, ShieldCheck, Wrench } from 'lucide-react';
import Seo from '../components/Seo';
import VigiParcNav from '../components/VigiParcNav';
import { libelleDisponibilite, modulesVigiParc } from '../data/vigiparc-catalogue';

const guarantees = [
  { icon: Server, title: 'Installé chez vous', text: 'VigiParc fonctionne sur un serveur Debian dans votre infrastructure. Vos données restent sous votre contrôle.' },
  { icon: ShieldCheck, title: 'Sécurité par défaut', text: 'SSO, double authentification, rôles, journal d’audit chaîné et flux central sortant uniquement.' },
  { icon: FileCheck2, title: 'ISO 27001 outillée', text: 'Les 93 mesures sont structurées et les collecteurs publiés dépendent de la version validée. VigiParc ne délivre pas de certification.' },
];

export default function VigiParcPage() {
  return (
    <>
      <Seo title="VigiParc — Gestion de parc, sécurité et conformité | FORGE3D" description="VigiParc centralise la gestion de parc, la sécurité et le suivi ISO 27001 pour les PME, avec des données conservées chez le client." path="/vigiparc" />

      <section className="hero-shell bg-dark-grid pt-28 text-white lg:pt-36">
        <div className="forge-orb -right-32 top-12 h-96 w-96 opacity-50" aria-hidden="true" />
        <div className="container-forge relative z-10 grid items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-24">
          <div>
            <p className="section-tag">Un produit FORGE3D · Tunisie</p>
            <div className="mb-6 flex items-center gap-4"><img src="/logo-vigiparc.svg" width="64" height="64" alt="" className="rounded-2xl shadow-lg" /><span className="text-2xl font-bold">VigiParc</span></div>
            <h1 className="max-w-4xl text-5xl font-bold leading-[.98] sm:text-6xl">Gérez votre parc IT <span className="text-gradient">sur votre infrastructure.</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65">Pour les PME de 5 à 500 équipements : postes Windows, Linux, identités, sécurité, support et preuves de conformité réunis sans imposer Windows Server, Active Directory ou Intune.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="/vigiparc/contact" className="btn-primary justify-center">Demander une démonstration <ArrowRight size={17} /></a>
              <a href="#fonctionnalites" className="btn-ghost justify-center border border-white/15">Voir les fonctionnalités</a>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[.04] p-6 shadow-2xl backdrop-blur-sm">
            <div className="mb-5 flex items-center justify-between"><span className="text-sm font-bold uppercase tracking-[.18em] text-white/70">Aperçu schématique</span><span className="rounded-full bg-amber-300/15 px-3 py-1 text-xs font-bold text-amber-200">Illustration, pas une capture produit</span></div>
            {[['Parc', 'Inventaire consolidé'], ['Sécurité', 'Écarts priorisés'], ['Services', 'État supervisé'], ['Conformité', 'Preuves structurées']].map(([label, value]) => <div key={label} className="flex items-center justify-between gap-5 border-t border-white/10 py-4"><span className="text-sm text-white/60">{label}</span><strong className="text-right text-sm">{value}</strong></div>)}
          </div>
        </div>
      </section>
      <VigiParcNav />

      <section className="section-padding bg-forge-gray" aria-labelledby="problemes-vigiparc">
        <div className="container-forge grid gap-10 lg:grid-cols-[.85fr_1.15fr]">
          <div><p className="section-tag">Le constat</p><h2 id="problemes-vigiparc" className="section-title text-forge-text">L’IT d’une PME ne devrait pas dépendre d’un empilement opaque.</h2></div>
          <div className="grid gap-4 sm:grid-cols-2">
            {['Coûts d’infrastructure difficiles à lire', 'Outils séparés et informations dispersées', 'Opérations manuelles peu traçables', 'Visibilité limitée sur la sécurité'].map((item) => <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-6 text-forge-text-muted"><Wrench className="shrink-0 text-forge-orange" size={19} />{item}</div>)}
          </div>
        </div>
      </section>

      <section className="section-padding bg-white" aria-labelledby="cadre-tunisien-vigiparc">
        <div className="container-forge">
          <div className="grid gap-8 rounded-3xl border border-indigo-100 bg-indigo-50/60 p-7 sm:p-10 lg:grid-cols-[.32fr_.68fr] lg:items-center">
            <div>
              <span className="icon-box mb-5"><Landmark /></span>
              <p className="section-tag">Cadre tunisien</p>
              <p className="mt-3 text-sm font-semibold text-indigo-900">Décret-loi n° 2023-17</p>
            </div>
            <div>
              <h2 id="cadre-tunisien-vigiparc" className="text-3xl font-bold text-forge-text sm:text-4xl">L’audit cyber est obligatoire pour les organismes concernés.</h2>
              <p className="mt-5 leading-8 text-forge-text-muted">Le texte prévoit un audit de sécurité des systèmes d’information au moins tous les douze mois, réalisé par un expert habilité. La certification ISO/IEC 27001 n’est pas une obligation générale : elle peut structurer la gouvernance, les risques, les contrôles et les preuves.</p>
              <p className="mt-4 text-sm leading-6 text-forge-text-muted">VigiParc accompagne la préparation et le suivi ; il ne remplace ni l’expert habilité, ni l’audit réglementaire, ni la certification.</p>
              <div className="mt-7 flex flex-wrap gap-4"><a className="btn-primary" href="/vigiparc/iso-27001">Comprendre le cadre et préparer l’audit</a><a className="btn-secondary" href="https://www.ancs.tn/fr/audit-reglementaire" target="_blank" rel="noreferrer">Source officielle ANCS <ExternalLink size={15} /></a></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white" aria-labelledby="benefices-vigiparc">
        <div className="container-forge">
          <div className="max-w-3xl reveal"><p className="section-tag">Une base claire</p><h2 id="benefices-vigiparc" className="section-title text-forge-text">Moins d’outils séparés.<br /><span className="text-gradient">Plus de visibilité.</span></h2><p className="section-subtitle mt-5">VigiParc réunit les opérations courantes sans déplacer les données du client vers un service tiers.</p></div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {guarantees.map(({ icon: Icon, title, text }, index) => <article key={title} className={`reveal reveal-delay-${index + 1} premium-card`}><span className="icon-box mb-7"><Icon /></span><h3 className="text-2xl font-bold text-forge-text">{title}</h3><p className="mt-4 text-sm leading-7 text-forge-text-muted">{text}</p></article>)}
          </div>
        </div>
      </section>

      <section id="fonctionnalites" className="section-padding bg-forge-gray" aria-labelledby="modules-vigiparc">
        <div className="container-forge">
          <div className="max-w-3xl reveal"><p className="section-tag">Fonctionnalités</p><h2 id="modules-vigiparc" className="section-title text-forge-text">Un portail pour les équipes IT, la direction et les employés.</h2></div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {modulesVigiParc.slice(0, 6).map((module) => <article key={module.id} className="reveal rounded-2xl border border-slate-200 bg-white p-6"><div className="mb-4 flex items-center gap-3 text-forge-orange"><CheckCircle2 size={20} /><h3 className="font-bold text-forge-text">{module.nom}</h3></div><p className="text-sm leading-7 text-forge-text-muted">{module.resume}</p><p className="mt-4 text-xs font-bold uppercase tracking-wide text-slate-500">{libelleDisponibilite[module.disponibilite]} · {module.offre}</p></article>)}
          </div>
          <a className="btn-secondary mt-8" href="/vigiparc/fonctionnalites">Explorer les domaines fonctionnels</a>
      </div>
      </section>

      <section className="section-padding bg-forge-dark text-white">
        <div className="container-forge grid gap-10 lg:grid-cols-2">
          <div className="reveal"><p className="section-tag">Architecture maîtrisée</p><h2 className="section-title">Les données restent chez le client.</h2><p className="mt-6 text-lg leading-8 text-white/60">Le serveur VigiParc est autonome. La plateforme centrale reçoit uniquement des états techniques et ne peut jamais ouvrir une connexion vers le réseau du client.</p></div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[{ icon: Database, text: 'PostgreSQL et sauvegardes chiffrées' }, { icon: LockKeyhole, text: 'SSO et double authentification' }, { icon: MonitorCog, text: 'Windows, Linux et réseau' }, { icon: Server, text: 'Composants libres auto-hébergés' }].map(({ icon: Icon, text }) => <div key={text} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[.03] p-5"><Icon className="text-forge-orange" /><span className="text-sm text-white/75">{text}</span></div>)}
          </div>
        </div>
      </section>

      <section className="section-padding bg-forge-gray" aria-labelledby="mise-en-service">
        <div className="container-forge"><div className="max-w-3xl"><p className="section-tag">Mise en service</p><h2 id="mise-en-service" className="section-title text-forge-text">Un déploiement cadré, par étapes.</h2><p className="section-subtitle mt-5">Le périmètre réel est validé avec l’équipe IT avant toute généralisation.</p></div><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">{[['01', 'Cadrage', 'Parc, sites, usages, dépendances et objectifs.'], ['02', 'Pilote', 'Installation Docker sur Debian et validation sur un périmètre limité.'], ['03', 'Déploiement', 'Enrôlement progressif des équipements et transfert de compétences.'], ['04', 'Exploitation', 'Support, maintenance, sauvegardes et évolutions selon l’offre.']].map(([numero, titre, texte]) => <article key={numero} className="rounded-2xl border border-slate-200 bg-white p-6"><span className="text-sm font-bold text-orange-700">{numero}</span><h3 className="mt-5 text-xl font-bold text-forge-text">{titre}</h3><p className="mt-3 text-sm leading-7 text-forge-text-muted">{texte}</p></article>)}</div><div className="mt-9 flex flex-wrap gap-4"><a className="btn-primary" href="/vigiparc/contact">Préparer un pilote</a><a className="btn-secondary" href="/vigiparc/calculateur">Estimer les coûts</a></div></div>
      </section>

      <section id="demonstration" className="section-padding bg-white">
        <div className="container-forge grid items-center gap-8 rounded-3xl border border-slate-200 bg-forge-gray p-8 sm:p-12 lg:grid-cols-[1fr_auto]">
          <div><p className="section-tag">Démonstration adaptée</p><h2 className="text-3xl font-bold text-forge-text sm:text-4xl">Voyez VigiParc avec le contexte de votre parc.</h2><p className="mt-3 max-w-2xl text-forge-text-muted">Le formulaire initial prend moins d’une minute. Nous vous recontactons pour cadrer la démonstration, sans engagement.</p></div>
          <a className="btn-primary justify-center" href="/vigiparc/contact">Demander une démonstration <ArrowRight size={17} /></a>
        </div>
      </section>
    </>
  );
}
