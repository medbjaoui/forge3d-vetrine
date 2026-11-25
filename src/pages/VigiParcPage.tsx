import { FormEvent, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2, Database, ExternalLink, FileCheck2, LockKeyhole, MonitorCog, Server, ShieldCheck } from 'lucide-react';
import Seo from '../components/Seo';
import VigiParcNav from '../components/VigiParcNav';

const modules = [
  ['Parc', 'Inventaire Windows et Linux, rapprochement Active Directory, conformité, logiciels et licences.'],
  ['Sécurité', 'Alertes, correctifs, durcissement, isolement de poste et inventaire réseau.'],
  ['Support', 'Tickets et prise en main à distance depuis un portail unique.'],
  ['Conformité', 'ISO 27001:2022 outillée, preuves automatiques et export pour l’auditeur.'],
  ['Employés', 'Demandes, coffre, heures, mobiles et bornes en libre-service.'],
  ['Plateforme', 'Sauvegardes chiffrées, supervision, certificats et mises à jour signées.'],
];

const guarantees = [
  { icon: Server, title: 'Installé chez vous', text: 'VigiParc fonctionne sur un serveur Debian dans votre infrastructure. Vos données restent sous votre contrôle.' },
  { icon: ShieldCheck, title: 'Sécurité par défaut', text: 'SSO, double authentification, rôles, journal d’audit chaîné et flux central sortant uniquement.' },
  { icon: FileCheck2, title: 'ISO 27001 outillée', text: 'Les 93 mesures sont structurées, avec 33 collecteurs de preuves automatiques. VigiParc ne délivre pas de certification.' },
];

export default function VigiParcPage() {
  const debutSaisie = useRef(Date.now());
  const [etatFormulaire, setEtatFormulaire] = useState<'repos' | 'envoi' | 'succes' | 'erreur'>('repos');

  const envoyerDemande = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEtatFormulaire('envoi');
    const formulaire = event.currentTarget;
    const donnees = new FormData(formulaire);
    const contenu = {
      nom: String(donnees.get('nom') || ''),
      fonction: String(donnees.get('fonction') || ''),
      organisation: String(donnees.get('organisation') || ''),
      email: String(donnees.get('email') || ''),
      telephone: String(donnees.get('telephone') || '') || null,
      postes: String(donnees.get('postes') || ''),
      message: String(donnees.get('message') || '') || null,
      consentement: donnees.get('consentement') === 'on',
      piege: String(donnees.get('site_web') || ''),
      duree_saisie_ms: Date.now() - debutSaisie.current,
    };
    try {
      const reponse = await fetch('/api/v1/prospects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contenu),
      });
      if (!reponse.ok) throw new Error('Réponse invalide');
      formulaire.reset();
      debutSaisie.current = Date.now();
      setEtatFormulaire('succes');
    } catch {
      setEtatFormulaire('erreur');
    }
  };

  return (
    <>
      <Seo title="VigiParc — Gestion de parc, sécurité et conformité | FORGE3D" description="VigiParc centralise la gestion de parc, la sécurité et le suivi ISO 27001 pour les PME, avec des données conservées chez le client." path="/vigiparc" />

      <section className="hero-shell bg-dark-grid pt-28 text-white lg:pt-36">
        <div className="forge-orb -right-32 top-12 h-96 w-96 opacity-50" aria-hidden="true" />
        <div className="container-forge relative z-10 grid items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_.9fr] lg:px-8 lg:py-24">
          <div>
            <p className="section-tag">Un produit FORGE3D · Tunisie</p>
            <div className="mb-6 flex items-center gap-4"><img src="/logo-vigiparc.svg" width="64" height="64" alt="" className="rounded-2xl shadow-lg" /><span className="text-2xl font-bold">VigiParc</span></div>
            <h1 className="max-w-4xl text-5xl font-bold leading-[.98] sm:text-6xl">Votre parc, votre sécurité et vos preuves <span className="text-gradient">au même endroit.</span></h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65">Pour les PME et administrations de 20 à 500 postes. Un portail unique, installé sur votre serveur, avec une équipe locale francophone.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#demonstration" className="btn-primary justify-center">Demander une démonstration <ArrowRight size={17} /></a>
              <a href="#fonctionnalites" className="btn-ghost justify-center border border-white/15">Voir les fonctionnalités</a>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[.04] p-6 shadow-2xl backdrop-blur-sm">
            <div className="mb-5 flex items-center justify-between"><span className="text-sm font-bold uppercase tracking-[.18em] text-white/70">Vue synthétique</span><span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-bold text-emerald-300">Données fictives</span></div>
            {[['Postes gérés', '112'], ['Postes conformes', '103'], ['Services disponibles', '23 / 24'], ['Mesures ISO suivies', '93']].map(([label, value]) => <div key={label} className="flex items-center justify-between border-t border-white/10 py-4"><span className="text-sm text-white/60">{label}</span><strong className="text-xl">{value}</strong></div>)}
          </div>
        </div>
      </section>
      <VigiParcNav />

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
            {modules.map(([title, text]) => <article key={title} className="reveal rounded-2xl border border-slate-200 bg-white p-6"><div className="mb-4 flex items-center gap-3 text-forge-orange"><CheckCircle2 size={20} /><h3 className="font-bold text-forge-text">{title}</h3></div><p className="text-sm leading-7 text-forge-text-muted">{text}</p></article>)}
          </div>
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

      <section id="demonstration" className="section-padding bg-white">
        <div className="container-forge grid gap-10 rounded-3xl border border-slate-200 bg-forge-gray p-8 sm:p-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <p className="section-tag">Offres Essentiel et Pro</p>
            <h2 className="text-3xl font-bold text-forge-text sm:text-4xl">Dimensionnons VigiParc pour votre parc.</h2>
            <p className="mt-3 text-forge-text-muted">Tarification sur devis. Mise en service, accompagnement et périmètre définis avec votre équipe.</p>
            <p className="mt-6 text-sm leading-6 text-forge-text-muted">Les informations servent uniquement à traiter votre demande. Aucun outil de suivi ni service anti-spam tiers n’est chargé.</p>
          </div>
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={envoyerDemande}>
            <label className="text-sm font-semibold text-forge-text">Nom<input className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-normal" name="nom" required minLength={2} maxLength={160} autoComplete="name" /></label>
            <label className="text-sm font-semibold text-forge-text">Fonction<input className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-normal" name="fonction" required minLength={2} maxLength={160} autoComplete="organization-title" /></label>
            <label className="text-sm font-semibold text-forge-text">Organisation<input className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-normal" name="organisation" required minLength={2} maxLength={200} autoComplete="organization" /></label>
            <label className="text-sm font-semibold text-forge-text">E-mail professionnel<input className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-normal" type="email" name="email" required maxLength={254} autoComplete="email" /></label>
            <label className="text-sm font-semibold text-forge-text">Téléphone <span className="font-normal text-forge-text-muted">(facultatif)</span><input className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-normal" type="tel" name="telephone" maxLength={40} autoComplete="tel" /></label>
            <label className="text-sm font-semibold text-forge-text">Nombre de postes<select className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-normal" name="postes" required defaultValue=""><option value="" disabled>Choisir</option><option value="<20">Moins de 20</option><option value="20-50">20 à 50</option><option value="50-150">50 à 150</option><option value="150-500">150 à 500</option><option value=">500">Plus de 500</option></select></label>
            <label className="sm:col-span-2 text-sm font-semibold text-forge-text">Message <span className="font-normal text-forge-text-muted">(facultatif)</span><textarea className="mt-2 min-h-28 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-normal" name="message" maxLength={4000} /></label>
            <label className="forgeoria-hp" aria-hidden="true">Site web<input name="site_web" tabIndex={-1} autoComplete="off" /></label>
            <label className="sm:col-span-2 flex items-start gap-3 text-sm leading-6 text-forge-text-muted"><input className="mt-1" type="checkbox" name="consentement" required />J’accepte que Forge 3D utilise ces informations pour répondre à ma demande de démonstration.</label>
            <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
              <button className="btn-primary justify-center" type="submit" disabled={etatFormulaire === 'envoi'}>{etatFormulaire === 'envoi' ? 'Envoi…' : 'Envoyer la demande'} <ExternalLink size={15} /></button>
              <p className="text-sm" aria-live="polite">{etatFormulaire === 'succes' && <span className="text-emerald-700">Merci, votre demande a bien été enregistrée.</span>}{etatFormulaire === 'erreur' && <span className="text-red-700">L’envoi a échoué. Réessayez dans quelques instants.</span>}</p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
