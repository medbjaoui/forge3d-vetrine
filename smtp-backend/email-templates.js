const echapperHtml = (valeur) => String(valeur ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#039;');

const ligne = (libelle, valeur) => {
  if (!valeur) return '';
  return `<tr><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#6b7280;font-size:13px;width:38%;vertical-align:top">${echapperHtml(libelle)}</td><td style="padding:10px 0;border-bottom:1px solid #e5e7eb;color:#111827;font-size:14px;font-weight:600;vertical-align:top">${echapperHtml(valeur)}</td></tr>`;
};

const enveloppe = ({ preheader, surtitre, titre, contenu, pied }) => `<!doctype html>
<html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${echapperHtml(titre)}</title></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#111827">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent">${echapperHtml(preheader)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f3f4f6"><tr><td align="center" style="padding:32px 12px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:640px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 8px 28px rgba(17,24,39,.08)">
<tr><td style="padding:24px 32px;background:#111827;border-bottom:4px solid #f97316"><table role="presentation" width="100%"><tr><td style="font-size:22px;font-weight:800;letter-spacing:.4px;color:#ffffff">Vigi<span style="color:#f97316">Parc</span></td><td align="right" style="font-size:12px;font-weight:700;letter-spacing:1.4px;color:#d1d5db">FORGE3D</td></tr></table></td></tr>
<tr><td style="padding:32px"><div style="margin-bottom:10px;font-size:12px;font-weight:800;letter-spacing:1.4px;text-transform:uppercase;color:#ea580c">${echapperHtml(surtitre)}</div><h1 style="margin:0 0 20px;font-size:26px;line-height:1.25;color:#111827">${echapperHtml(titre)}</h1>${contenu}</td></tr>
<tr><td style="padding:20px 32px;background:#f9fafb;border-top:1px solid #e5e7eb;color:#6b7280;font-size:12px;line-height:1.6">${pied}</td></tr>
</table></td></tr></table></body></html>`;

export const creerEmailsVigiParc = (payload, queued) => {
  const etat = queued
    ? 'Votre demande est enregistrée et sera transmise automatiquement à notre équipe.'
    : 'Votre demande a été transmise à notre équipe.';
  const etatInterne = queued ? 'En attente de transmission automatique' : 'Transmise à l’équipe';
  const messageHtml = payload.message
    ? `<div style="margin-top:24px"><div style="margin-bottom:8px;color:#6b7280;font-size:13px">Contexte communiqué</div><div style="padding:16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;color:#374151;font-size:14px;line-height:1.6">${echapperHtml(payload.message).replace(/\n/g, '<br>')}</div></div>`
    : '';

  const adminText = [
    `Nouvelle demande VigiParc — ${etatInterne}`,
    `Organisation : ${payload.organisation}`,
    `Contact : ${payload.nom}`,
    `Fonction : ${payload.fonction}`,
    `E-mail : ${payload.email}`,
    `Téléphone : ${payload.telephone || 'Non renseigné'}`,
    `Parc : ${payload.postes}`,
    payload.message ? `Contexte :\n${payload.message}` : '',
    'Répondez directement à cet e-mail pour contacter le prospect.',
  ].filter(Boolean).join('\n\n');

  const adminHtml = enveloppe({
    preheader: `Nouvelle demande de ${payload.organisation}`,
    surtitre: 'Nouvelle demande commerciale',
    titre: payload.organisation,
    contenu: `<div style="margin-bottom:24px;padding:14px 16px;background:#fff7ed;border-left:4px solid #f97316;border-radius:8px;color:#9a3412;font-size:14px;font-weight:700">${echapperHtml(etatInterne)}</div><table role="presentation" width="100%" cellpadding="0" cellspacing="0">${ligne('Contact', payload.nom)}${ligne('Fonction', payload.fonction)}${ligne('E-mail', payload.email)}${ligne('Téléphone', payload.telephone)}${ligne('Taille du parc', payload.postes)}</table>${messageHtml}<div style="margin-top:28px"><a href="mailto:${echapperHtml(payload.email)}" style="display:inline-block;padding:13px 20px;background:#f97316;border-radius:8px;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none">Répondre au prospect</a></div>`,
    pied: 'Message transactionnel généré depuis le formulaire VigiParc de forge3d.tech. Les informations sont réservées au traitement de cette demande.',
  });

  const clientText = `Bonjour ${payload.nom},\n\nMerci pour votre intérêt pour VigiParc. ${etat}\n\nProchaine étape : un membre de FORGE3D étudiera votre besoin et vous contactera pour cadrer la démonstration.\n\nVous pouvez répondre directement à cet e-mail si vous souhaitez ajouter une précision.\n\nL’équipe VigiParc — FORGE3D\nhttps://forge3d.tech/vigiparc\n\nCet accusé fait suite à votre demande. Il ne vous inscrit à aucune communication commerciale.`;
  const clientHtml = enveloppe({
    preheader: 'Votre demande VigiParc a bien été reçue.',
    surtitre: 'Demande bien reçue',
    titre: `Merci, ${payload.nom}.`,
    contenu: `<p style="margin:0 0 20px;color:#374151;font-size:16px;line-height:1.7">Merci pour votre intérêt pour VigiParc. ${echapperHtml(etat)}</p><div style="padding:20px;background:#fff7ed;border-radius:10px"><div style="margin-bottom:8px;color:#9a3412;font-size:13px;font-weight:800;text-transform:uppercase;letter-spacing:.8px">Prochaine étape</div><div style="color:#7c2d12;font-size:15px;line-height:1.6">Un membre de FORGE3D étudiera votre besoin et vous contactera pour cadrer la démonstration.</div></div><p style="margin:22px 0;color:#4b5563;font-size:14px;line-height:1.6">Vous pouvez répondre directement à cet e-mail pour ajouter une précision.</p><a href="https://forge3d.tech/vigiparc" style="display:inline-block;padding:13px 20px;background:#f97316;border-radius:8px;color:#ffffff;font-size:14px;font-weight:700;text-decoration:none">Découvrir VigiParc</a>`,
    pied: 'L’équipe VigiParc — FORGE3D<br><a href="mailto:contact@forge3d.tech" style="color:#ea580c;text-decoration:none">contact@forge3d.tech</a><br><br>Cet accusé fait suite à votre demande et ne vous inscrit à aucune communication commerciale.',
  });

  return {
    admin: { subject: `Nouvelle demande VigiParc — ${payload.organisation}`, text: adminText, html: adminHtml },
    client: { subject: 'VigiParc — Votre demande a bien été reçue', text: clientText, html: clientHtml },
  };
};

export { echapperHtml };
