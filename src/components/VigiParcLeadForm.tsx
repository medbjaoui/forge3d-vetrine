import { FormEvent, useRef, useState } from 'react';
import { ChevronDown, Send } from 'lucide-react';

type Etat = 'repos' | 'envoi' | 'succes' | 'attente' | 'erreur';

const champ = 'mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 font-normal focus:border-forge-orange focus:outline-none focus:ring-2 focus:ring-forge-orange/20';

export default function VigiParcLeadForm() {
  // Le formulaire VigiParc est prérendu puis hydraté à la première interaction.
  // Utiliser l'origine de navigation évite de considérer cette hydratation tardive
  // comme une saisie instantanée et de jeter une vraie demande comme du spam.
  const debutSaisie = useRef(
    typeof performance !== 'undefined' && Number.isFinite(performance.timeOrigin)
      ? performance.timeOrigin
      : Date.now(),
  );
  const [etat, setEtat] = useState<Etat>('repos');

  const envoyer = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEtat('envoi');
    const formulaire = event.currentTarget;
    const donnees = new FormData(formulaire);
    const details = [
      `Pays : ${String(donnees.get('pays') || 'Non précisé')}`,
      `Nombre de sites : ${String(donnees.get('sites') || 'Non précisé')}`,
      `Infrastructure actuelle : ${String(donnees.get('infrastructure') || 'Non précisée')}`,
      `Active Directory : ${String(donnees.get('active_directory') || 'Non précisé')}`,
      `Priorité : ${String(donnees.get('priorite') || 'Non précisée')}`,
      '',
      String(donnees.get('message') || ''),
    ].join('\n').slice(0, 4000);
    const contenu = {
      nom: String(donnees.get('nom') || '').trim().slice(0, 160),
      fonction: String(donnees.get('fonction') || ''),
      organisation: String(donnees.get('societe') || ''),
      email: String(donnees.get('email') || ''),
      telephone: String(donnees.get('telephone') || '') || null,
      postes: String(donnees.get('postes') || ''),
      message: details,
      consentement: donnees.get('consentement') === 'on',
      piege: String(donnees.get('site_web') || ''),
      duree_saisie_ms: Math.round(Date.now() - debutSaisie.current),
    };

    try {
      const reponse = await fetch('/api/v1/prospects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contenu),
      });
      if (!reponse.ok) throw new Error('Réponse invalide');
      const resultat = await reponse.json() as { queued?: boolean };
      formulaire.reset();
      debutSaisie.current = Date.now();
      setEtat(resultat.queued ? 'attente' : 'succes');
    } catch {
      setEtat('erreur');
    }
  };

  return (
    <form className="grid gap-4 sm:grid-cols-2" onSubmit={envoyer}>
      <label className="text-sm font-semibold text-forge-text sm:col-span-2">Nom complet
        <input className={champ} name="nom" required minLength={2} maxLength={160} autoComplete="name" />
      </label>
      <label className="text-sm font-semibold text-forge-text">E-mail professionnel
        <input className={champ} type="email" name="email" required maxLength={254} autoComplete="email" />
      </label>
      <label className="text-sm font-semibold text-forge-text">Société
        <input className={champ} name="societe" required minLength={2} maxLength={200} autoComplete="organization" />
      </label>
      <label className="text-sm font-semibold text-forge-text">Fonction
        <input className={champ} name="fonction" required minLength={2} maxLength={160} autoComplete="organization-title" />
      </label>
      <label className="text-sm font-semibold text-forge-text">Nombre de postes
        <select className={champ} name="postes" required defaultValue=""><option value="" disabled>Choisir</option><option value="<20">5 à 19</option><option value="20-50">20 à 50</option><option value="50-150">51 à 150</option><option value="150-500">151 à 500</option><option value=">500">Plus de 500</option></select>
      </label>

      <details className="sm:col-span-2 rounded-xl border border-slate-200 bg-white p-4">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-forge-text">Préciser le contexte <span className="font-normal text-forge-text-muted">facultatif</span><ChevronDown size={18} aria-hidden="true" /></summary>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-forge-text">Téléphone<input className={champ} type="tel" name="telephone" maxLength={40} autoComplete="tel" /></label>
          <label className="text-sm font-semibold text-forge-text">Pays<input className={champ} name="pays" maxLength={100} autoComplete="country-name" defaultValue="Tunisie" /></label>
          <label className="text-sm font-semibold text-forge-text">Nombre de sites<input className={champ} type="number" name="sites" min="1" max="100" /></label>
          <label className="text-sm font-semibold text-forge-text">Infrastructure actuelle<select className={champ} name="infrastructure" defaultValue=""><option value="">À préciser</option><option>Serveurs sur site</option><option>Cloud</option><option>Hybride</option><option>Postes sans serveur central</option></select></label>
          <label className="text-sm font-semibold text-forge-text">Active Directory<select className={champ} name="active_directory" defaultValue=""><option value="">À confirmer</option><option>Présent et à conserver</option><option>Présent, dépendance à réduire</option><option>Absent</option></select></label>
          <label className="text-sm font-semibold text-forge-text">Priorité<select className={champ} name="priorite" defaultValue=""><option value="">À préciser</option><option>Gestion du parc</option><option>Sécurité et correctifs</option><option>Préparation ISO 27001</option><option>Assistance informatique</option><option>Gestion multisite</option></select></label>
          <label className="text-sm font-semibold text-forge-text sm:col-span-2">Message<textarea className={`${champ} min-h-28`} name="message" maxLength={4000} /></label>
        </div>
      </details>

      <label className="forgeoria-hp" aria-hidden="true">Site web<input name="site_web" tabIndex={-1} autoComplete="off" /></label>
      <label className="sm:col-span-2 flex items-start gap-3 text-sm leading-6 text-forge-text-muted"><input className="mt-1 h-4 w-4 shrink-0 accent-forge-orange" type="checkbox" name="consentement" required />J’accepte que FORGE3D utilise ces informations uniquement pour répondre à ma demande de démonstration.</label>
      <div className="sm:col-span-2 flex flex-wrap items-center gap-4">
        <button className="btn-primary justify-center" type="submit" disabled={etat === 'envoi'}>{etat === 'envoi' ? 'Envoi…' : 'Envoyer la demande'} <Send size={16} aria-hidden="true" /></button>
        <p className="text-sm" aria-live="polite">{etat === 'succes' && <span className="text-emerald-700">Merci, votre demande a bien été enregistrée.</span>}{etat === 'attente' && <span className="text-amber-800">Votre demande est enregistrée et sera retransmise automatiquement.</span>}{etat === 'erreur' && <span className="text-red-700">La demande n’a pas pu être enregistrée. Vos champs sont conservés : réessayez ou écrivez à contact@forge3d.tech.</span>}</p>
      </div>
    </form>
  );
}
