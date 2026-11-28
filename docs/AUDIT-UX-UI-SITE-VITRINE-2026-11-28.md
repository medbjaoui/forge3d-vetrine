# Audit UX/UI complet — site vitrine FORGE3D

Date : 28 novembre 2026  
Site audité : `https://forge3d.tech`  
Périmètre : site institutionnel, ForgeOria, VigiParc et 21 sous-pages VigiParc  
Supports : bureau 1440 × 1000 et mobile 390 × 844

## Statut après remédiation

Les correctifs ont été déployés et revalidés le 28 novembre 2026. L'audit final couvre 26 routes sur bureau et mobile : toutes répondent en HTTP 200, sans débordement horizontal, contenu `.reveal` masqué, image cassée, attribut `alt` manquant, doublon d'identifiant, saut de niveau de titre ou landmark absent.

- interface institutionnelle, navigation et pied de page harmonisés en français ;
- VigiParc remonté dans la hiérarchie du portefeuille et landing raccourcie ;
- sous-navigation compacte, état actif et menu mobile accessible au clavier ;
- page Contact canonique avec cinq informations initiales et contexte facultatif ;
- formulaire VigiParc validé en production : HTTP 202, prospect stocké dans Central et deux messages acceptés par le serveur SMTP ;
- formulaire ForgeOria validé en production : HTTP 201, lead stocké, événement transactionnel traité et accusé `smtp_accepted` ;
- calculateur revalidé avec des montants TND et un recalcul exact sans perte du premier champ ;
- cache du chargeur VigiParc versionné et réseau Docker ForgeOria rendu persistant après recréation du conteneur.

Les recommandations qui supposent des données commerciales réelles — cas client autorisé, résultats mesurés et tarifs contractuels — restent volontairement non publiées afin de ne rien inventer.

## Verdict exécutif

Le site possède une base visuelle professionnelle : palette sombre/orange cohérente, typographie nette, composants homogènes et rendu responsive sans débordement horizontal. VigiParc communique correctement la maîtrise des données, la sécurité et la préparation ISO 27001 sans prétendre délivrer une certification.

La note initiale était **58/100**. Les constats ci-dessous décrivent l'état avant remédiation et sont conservés pour la traçabilité.

Le défaut le plus grave est fonctionnel : sur la page d’accueil et la page À propos, les contenus portant la classe `reveal` restent à `opacity: 0`, même après défilement. Sur l’accueil, 7 éléments sur 7 sont concernés. Deux sections centrales apparaissent donc comme de grands espaces vides. Ce défaut doit être corrigé avant toute campagne ou publication LinkedIn.

## Score par dimension

| Dimension | Score | Diagnostic |
|---|---:|---|
| Direction artistique | 8/10 | Identité moderne et crédible, bonne cohérence des composants |
| Responsive mobile | 7/10 | Aucun débordement, mais certaines pages sont beaucoup trop longues |
| Architecture de l’information | 5/10 | Offre riche, navigation VigiParc surchargée et portefeuille difficile à lire rapidement |
| Clarté du contenu | 6/10 | Messages VigiParc solides, ensemble du site linguistiquement fragmenté |
| Conversion | 4/10 | Formulaire VigiParc trop exigeant et parcours Contact indirect |
| Accessibilité | 6/10 | Bonne base sémantique, mais langue de page incorrecte et états actifs incomplets |
| Performance perçue | 8/10 | Chargement technique rapide ; animations d’apparition actuellement fragiles |
| Confiance commerciale | 5/10 | Discours prudent, mais manque de preuves sociales et de réassurance près des CTA |

## Méthode et couverture

- 26 routes publiques testées, toutes en HTTP 200.
- Un titre de page unique et un seul `h1` sur chaque route.
- Présence de `main`, `nav` et `footer` sur les 26 routes.
- Aucun débordement horizontal à 1440 px ou 390 px.
- Aucune image cassée et aucun attribut `alt` manquant détecté.
- Aucun doublon d’identifiant et aucun saut de niveau de titre détecté.
- Formulaires, navigation clavier, menu mobile, sous-navigation VigiParc et états d’animation vérifiés dans un navigateur réel.
- Mesures de laboratoire : accueil ~424 Ko, ForgeOria ~682 Ko, VigiParc ~316 Ko ; premier affichage observé entre 84 et 116 ms depuis le serveur d’audit. Ces chiffres ne remplacent pas des données terrain sur réseau mobile tunisien.

## Problèmes critiques

### P0 — Des sections commerciales sont invisibles sur l’accueil et À propos

**Observation**

- `/` : 7 éléments `.reveal` sur 7 restent invisibles.
- `/about` : 2 éléments `.reveal` sur 2 restent invisibles.
- À 390 px comme à 1440 px, les sections deviennent de grands espaces blancs ou sombres.
- Un défilement jusqu’à 900 px suivi d’une attente de 1,5 seconde laisse encore les 7 éléments de l’accueil à `opacity: 0`.
- Le contenu reste présent dans l’arbre d’accessibilité, mais il n’est pas visible pour l’utilisateur.

**Impact**

Le visiteur peut croire que le site est cassé, abandonner avant de découvrir les services et ne jamais voir VigiParc. C’est un blocage direct de conversion et de crédibilité.

**Correction recommandée**

Rendre le contenu visible par défaut et appliquer l’animation uniquement comme amélioration progressive. Le contenu ne doit jamais dépendre du bon déclenchement d’un `IntersectionObserver`. Ajouter un test E2E qui vérifie que chaque `.reveal` visible dans le viewport atteint une opacité supérieure à 0 après défilement, avec et sans JavaScript différé.

## Problèmes de priorité haute

### P1 — Le formulaire VigiParc demande trop d’effort avant le premier contact

La landing VigiParc contient **22 contrôles**, dont **11 obligatoires** : identité, entreprise, fonction, e-mail, pays, nombre de sites, nombre de postes, infrastructure, Active Directory et consentement. Cette qualification technique est utile pour l’équipe commerciale, mais trop lourde pour un premier échange.

**Recommandation**

Créer un parcours en deux étapes :

1. Prénom, nom, e-mail professionnel, société et objectif principal.
2. Qualification technique facultative après envoi ou lors de la prise de rendez-vous.

Afficher dès l’étape 1 une promesse concrète : durée de la démonstration, délai de réponse et absence d’engagement.

### P1 — La page Contact ne contient pas le formulaire annoncé

`/vigiparc/contact` présente « Formulaire qualifié », mais ne contient aucun formulaire. Le CTA renvoie vers `/vigiparc#demonstration`, obligeant l’utilisateur à changer de page et à retrouver un formulaire situé très bas.

**Recommandation**

Choisir un seul parcours canonique : intégrer le formulaire simplifié directement dans `/vigiparc/contact`, puis faire pointer tous les CTA « Démonstration » vers cette page. Éviter le doublon entre la landing et la page Contact.

### P1 — Langue déclarée et langue visible ne correspondent pas

Les 26 pages déclarent `lang="fr"`, alors que l’accueil, À propos et Company sont en anglais. Le menu et le pied de page restent en anglais au milieu du parcours français VigiParc. L’accueil contient aussi un CTA français isolé, « Découvrir VigiParc », dans une page anglaise.

**Impact**

Expérience fragmentée, prononciation incorrecte par les lecteurs d’écran et signal SEO moins clair.

**Recommandation**

Adopter une langue principale cohérente pour le marché ciblé — le français semble le choix naturel — ou mettre en place un vrai sélecteur FR/EN avec URLs distinctes, attribut `lang` correct et navigation traduite. Ne pas mélanger les langues dans une même interface.

### P1 — La sous-navigation VigiParc est trop dense

La barre contient 10 liens : Fonctionnalités, ISO 27001, Bornes, Sécurité, Offres, Calculateur, Comparatif, Ressources, Technologie et Contact. Sur mobile, elle devient une ligne horizontale à faire défiler sans indication claire qu’il existe d’autres éléments. Elle n’indique pas la page active avec `aria-current` ni avec un état visuel persistant.

**Recommandation**

Conserver 4 à 5 entrées principales : Solution, Conformité, Offres, Ressources et Contact. Regrouper le reste sous « Plus » sur bureau et dans un menu compact sur mobile. Ajouter l’état actif et faire apparaître automatiquement l’élément actif dans la zone visible.

### P1 — Le parcours mobile VigiParc est trop long

La landing complète mesure environ **11 700 px** à 390 px de large. Les contenus sont pertinents, mais l’enchaînement constat, cadre tunisien, bénéfices, fonctionnalités, architecture, déploiement et formulaire crée une fatigue importante.

**Recommandation**

- Garder sur la landing la promesse, trois bénéfices, une preuve, les offres et un CTA.
- Transformer la liste détaillée des fonctionnalités en accordéons ou en résumé.
- Déporter les explications techniques vers les sous-pages existantes.
- Ajouter un CTA mobile discret et persistant « Demander une démo » après le premier écran.

## Problèmes de priorité moyenne

### P2 — L’accueil ne hiérarchise pas clairement le portefeuille

Le premier écran met en avant l’impression 3D et ForgeOria. VigiParc n’apparaît qu’au quatrième bloc de services, alors qu’il possède la proposition la plus structurée et la plus directement B2B. Les intitulés Home, About et Company se recouvrent partiellement.

**Recommandation**

Présenter FORGE3D comme marque mère, puis trois offres lisibles : Impression 3D, VigiParc et ForgeOria. Donner à chaque offre une phrase orientée résultat, une cible et un CTA. Fusionner ou différencier clairement About et Company.

### P2 — Les preuves commerciales sont insuffisantes

Le discours reste prudent et crédible, mais les pages ne montrent pas de cas client, résultat mesuré, capture produit contextualisée, témoignage ou méthode de déploiement résumée près des CTA.

**Recommandation**

Ajouter progressivement :

- un cas pilote anonymisé ou autorisé ;
- une capture réelle avec légende ;
- trois résultats observables ;
- un déroulé « cadrage, pilote, déploiement, accompagnement » ;
- les engagements de réponse, d’hébergement et de support.

Ne publier que des preuves vérifiables.

### P2 — Les offres ne donnent pas assez de repères de décision

La page Offres distingue Essentiel et Pro, mais les deux CTA mènent au même devis et aucune fourchette, taille de parc type ou critère de choix rapide n’est donné. Le calculateur laisse l’utilisateur saisir sa propre estimation VigiParc, ce qui limite sa valeur pour quelqu’un qui ne connaît pas encore le produit.

**Recommandation**

Ajouter pour chaque offre : parc recommandé, fonctionnalités incluses, délai de mise en service et modèle tarifaire, même sans afficher un prix ferme. Dans le calculateur, expliquer chaque hypothèse, afficher la devise TND et distinguer clairement coût actuel, hypothèse et économie potentielle.

### P2 — Le menu mobile manque de quelques états d’accessibilité

Le bouton possède un nom, `aria-expanded` et `aria-controls`, ce qui est positif. En revanche, la page active n’est pas signalée dans le menu mobile, le menu ne se ferme pas avec Échap et le focus n’est pas explicitement géré à l’ouverture/fermeture.

**Recommandation**

Ajouter `aria-current="page"`, fermer avec Échap, déplacer le focus vers le premier lien à l’ouverture et le rendre au bouton à la fermeture.

### P2 — L’identité visuelle est cohérente mais parfois trop technique

Le noir, l’orange et la grille donnent une signature forte. Cependant, les très nombreux blocs, pictogrammes, libellés en capitales et titres à effet monospace peuvent rendre VigiParc plus « outil technique » que « solution rassurante pour PME ».

**Recommandation**

Réserver la typographie technique aux chiffres, statuts et preuves. Utiliser une typographie plus humaine pour les bénéfices, les cas d’usage et les CTA. Augmenter légèrement la taille des textes secondaires sur mobile.

## Points forts à conserver

- Palette et composants immédiatement reconnaissables.
- Hiérarchie des titres globalement propre.
- Aucun problème de débordement horizontal détecté.
- Formulaires correctement étiquetés et champs avec autocomplétion sur les informations personnelles.
- Lien d’évitement, landmarks et états de réduction des animations présents.
- Navigation mobile fonctionnelle et bouton correctement nommé.
- Positionnement VigiParc prudent : préparation ISO 27001, pas promesse de certification.
- Mention réglementaire tunisienne nuancée : obligation limitée aux organismes concernés.
- Sous-pages nombreuses et utiles pour le référencement et l’éducation du prospect.
- Chargement technique léger et rapide dans l’environnement de test.

## Plan d’action recommandé

### Lot 1 — Correctifs immédiats, avant communication

1. Corriger les contenus `.reveal` invisibles sur `/` et `/about`.
2. Ajouter un test visuel mobile et bureau empêchant la régression.
3. Corriger l’attribut `lang` et choisir la stratégie FR/EN.
4. Faire de `/vigiparc/contact` le parcours unique de démonstration.

### Lot 2 — Conversion, sous une semaine

1. Réduire le formulaire initial à 5 champs.
2. Clarifier le portefeuille sur l’accueil et remonter VigiParc.
3. Simplifier la sous-navigation VigiParc et ajouter l’état actif.
4. Ajouter une promesse de réponse et le déroulé de démonstration.
5. Réduire la longueur mobile de la landing.

### Lot 3 — Confiance et optimisation

1. Ajouter un cas pilote ou une preuve produit vérifiable.
2. Donner des repères de choix et de prix sur les offres.
3. Améliorer le calculateur et expliciter la devise.
4. Finaliser les interactions clavier du menu mobile.
5. Installer des mesures de conversion respectueuses de la vie privée : clics CTA, début de formulaire, erreur, envoi réussi et prise de contact.

## Critères de réussite

- Aucun élément commercial à `opacity: 0` après chargement ou défilement.
- Accès à la démonstration en un clic depuis toutes les pages VigiParc.
- Formulaire initial complétable en moins d’une minute.
- Langue cohérente dans l’interface, les métadonnées et la navigation.
- Sous-navigation utilisable sans deviner un défilement horizontal.
- Landing mobile raccourcie d’au moins 30 %.
- Suivi du taux de clic vers la démonstration, du taux de début et du taux d’envoi du formulaire.

## Captures de contrôle

- `output/playwright/home-desktop.png` — accueil bureau, sections invisibles.
- `output/playwright/home-mobile.png` — accueil mobile, espaces vides.
- `output/playwright/vigiparc-mobile-viewport-3200.png` — contrôle VigiParc dans le viewport réel.
- `output/playwright/vigiparc-mobile-forced.png` — vue complète de la landing avec rendu forcé pour inspection visuelle uniquement.

La capture complète VigiParc utilise temporairement `content-visibility: visible` afin de rendre toutes les sections dans une seule image. Ce forçage sert uniquement à l’audit ; le comportement `content-visibility: auto` de la page réelle n’a pas été classé comme défaut.
