# Configuration EmailJS pour Forge3D

## 🚀 Guide de configuration rapide

EmailJS permet d'envoyer des emails depuis le frontend sans exposer vos identifiants SMTP.

---

## 📝 Étape 1 : Créer un compte EmailJS

1. Aller sur [emailjs.com](https://www.emailjs.com)
2. Cliquer sur **"Sign Up"** (Gratuit jusqu'à 200 emails/mois)
3. Confirmer votre email

---

## 🔧 Étape 2 : Configurer le service email

### Option A : Utiliser SMTP OVH (Recommandé)

1. Dans EmailJS, aller dans **"Email Services"**
2. Cliquer sur **"Add New Service"**
3. Sélectionner **"Custom SMTP"**
4. Remplir les informations :

```
Service Name: Forge3D OVH
SMTP Server: pro3.mail.ovh.net
Port: 587
Username: contact@forge3d.tech
Password: [votre mot de passe SMTP]
Secure: TLS
```

5. **Important** : Dans "From Email", mettre : `contact@forge3d.tech`
6. Cliquer sur **"Create Service"**
7. **Noter le Service ID** (exemple: `service_abc123`)

---

## 📧 Étape 3 : Créer un template d'email

1. Aller dans **"Email Templates"**
2. Cliquer sur **"Create New Template"**
3. Configurer le template :

### Template Settings
```
Template Name: Forge3D Contact Form
From Name: Forge3D
From Email: contact@forge3d.tech
To Email: contact@forge3d.tech
Subject: Nouveau message de {{from_name}} - {{subject}}
```

### Template Content (Message Body)
```
Nouveau message depuis le site Forge3D

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 INFORMATIONS DU CONTACT

Nom : {{from_name}}
Entreprise : {{from_company}}
Email : {{from_email}}
Téléphone : {{from_phone}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📌 SUJET : {{subject}}

💬 MESSAGE :

{{message}}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Ce message a été envoyé depuis le formulaire de contact de www.forge3d.tech
```

4. Cliquer sur **"Save"**
5. **Noter le Template ID** (exemple: `template_xyz789`)

---

## 🔑 Étape 4 : Obtenir la clé publique

1. Aller dans **"Account"** → **"API Keys"**
2. Copier la **Public Key** (exemple: `aBcD1234EfGh5678`)

---

## ⚙️ Étape 5 : Configurer les variables d'environnement

Éditer le fichier `.env` :

```env
# EmailJS Configuration
VITE_EMAILJS_SERVICE_ID=service_abc123
VITE_EMAILJS_TEMPLATE_ID=template_xyz789
VITE_EMAILJS_PUBLIC_KEY=aBcD1234EfGh5678
```

⚠️ **Remplacer** `service_abc123`, `template_xyz789` et `aBcD1234EfGh5678` par vos vraies valeurs !

---

## 🧪 Étape 6 : Tester l'envoi d'email

1. Rebuild le conteneur Docker :
```bash
sudo docker compose up -d --build
```

2. Ouvrir le site : `http://www.forge3d.tech`
3. Aller à la section **Contact**
4. Remplir le formulaire et envoyer
5. Vérifier la réception de l'email sur `contact@forge3d.tech`

---

## ✅ Variables EmailJS utilisées dans le template

Le formulaire de contact envoie ces variables à EmailJS :

| Variable | Description | Exemple |
|----------|-------------|---------|
| `from_name` | Nom du contact | Jean Dupont |
| `from_company` | Entreprise | Acme Corp |
| `from_email` | Email du contact | jean@acme.com |
| `from_phone` | Téléphone | +216 12 345 678 |
| `subject` | Sujet choisi | Infrastructure IT & Cloud |
| `message` | Message du contact | Nous cherchons... |

---

## 🔍 Dépannage

### Le formulaire ne s'envoie pas
- Vérifier que les 3 variables `VITE_EMAILJS_*` sont bien configurées dans `.env`
- Vérifier que le container Docker a été rebuild après modification du `.env`
- Consulter la console du navigateur (F12) pour voir les erreurs

### Les emails n'arrivent pas
- Vérifier que l'email `contact@forge3d.tech` est bien configuré dans :
  - EmailJS Service (From Email)
  - EmailJS Template (To Email)
- Vérifier les identifiants SMTP OVH dans EmailJS
- Consulter l'onglet **"Activity"** dans EmailJS pour voir l'historique

### Limite de 200 emails/mois dépassée
- Passer au plan payant EmailJS ($15/mois pour 2000 emails)
- Ou utiliser Formspree comme alternative (configurer `VITE_FORMSPREE_ID`)

---

## 📊 Monitoring des emails

Dans le dashboard EmailJS :
- **Activity** : Voir tous les emails envoyés
- **Stats** : Consulter le quota mensuel
- **Logs** : Déboguer les erreurs d'envoi

---

## 🔐 Sécurité

✅ **Avantages EmailJS** :
- Vos identifiants SMTP ne sont jamais exposés dans le code frontend
- Protection anti-spam intégrée
- Rate limiting automatique
- Logs d'activité pour détecter les abus

⚠️ **Recommandations** :
- Ne jamais committer le fichier `.env` dans Git (déjà dans `.gitignore`)
- Surveiller le quota mensuel dans EmailJS
- Activer la vérification CAPTCHA si spam (option EmailJS)

---

## 📞 Support

- Documentation EmailJS : https://www.emailjs.com/docs/
- Support EmailJS : support@emailjs.com
- Support Forge3D : contact@forge3d.tech
