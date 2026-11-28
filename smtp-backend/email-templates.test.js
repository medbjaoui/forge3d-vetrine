import test from 'node:test';
import assert from 'node:assert/strict';
import { creerEmailsVigiParc } from './email-templates.js';

const payload = {
  nom: 'Nadia <script>',
  fonction: 'Responsable IT',
  organisation: 'PME & Associés',
  email: 'nadia@example.test',
  telephone: '+216 00 000 000',
  postes: '20-50',
  message: 'Besoin principal :\nSécurité & conformité',
};

test('produit des messages professionnels en HTML et texte', () => {
  const emails = creerEmailsVigiParc(payload, false);
  assert.match(emails.admin.html, /Nouvelle demande commerciale/);
  assert.match(emails.admin.html, /Répondre au prospect/);
  assert.match(emails.client.html, /Prochaine étape/);
  assert.match(emails.client.html, /Découvrir VigiParc/);
  assert.match(emails.client.text, /aucune communication commerciale/);
});

test('échappe toutes les données saisies dans le HTML', () => {
  const emails = creerEmailsVigiParc(payload, false);
  assert.doesNotMatch(emails.admin.html, /<script>/);
  assert.match(emails.admin.html, /Nadia &lt;script&gt;/);
  assert.match(emails.admin.html, /PME &amp; Associés/);
  assert.match(emails.admin.html, /Sécurité &amp; conformité/);
});
