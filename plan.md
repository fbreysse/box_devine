# **Plan détaillé d'implémentation pour le site de commande de coffrets de vin**

## **1. Initialisation du projet**
### **1.1 Création du dépôt et configuration du projet**
- Initialiser un dépôt Git.
- Configurer un projet Next.js :
  ```bash
  npx create-next-app
  ```
- Installer les dépendances de base :  
  ```bash
  npm install @supabase/supabase-js react-hook-form tailwindcss @headlessui/react
  ```
- Ajouter TailwindCSS :  
  ```bash
  npx tailwindcss init
  ```
- Configurer `.env.local` pour les variables Supabase.

**Notes d'implémentation:**
- Pour Next.js 15+ et Tailwind 4+, utiliser `@tailwindcss/postcss`:
  ```bash
  npm install -D @tailwindcss/postcss
  ```
- Dans `postcss.config.js`, configurer:
  ```javascript
  module.exports = {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  }
  ```
- Si erreur 500 persiste, nettoyer le cache:
  ```bash
  rm -rf .next node_modules/.cache
  ```

**Test :** Vérifier que Next.js fonctionne (`npm run dev`).

---

## **2. Mise en place de l'authentification**
### **2.1 Configuration de l'auth avec Supabase**
- Créer un projet Supabase.
- Activer Supabase Auth (e-mail/password).
- Ajouter une table `users` (automatique via Supabase Auth).

**Test :** Essayer de s'inscrire et de se connecter avec Supabase.

### **2.2 Page de connexion et inscription**
- Créer une page `/login` avec un formulaire (email/mot de passe).
- Ajouter un bouton d'inscription et connexion avec Supabase Auth.
- Gérer la redirection après connexion.

**Test :** Vérifier que l'utilisateur peut s'inscrire et se connecter.

---

## **3. Gestion des offres de coffrets**
### **3.1 Création de la table `offers` dans Supabase**
- Colonnes : `id`, `name`, `description`, `price`, `min_orders`, `discounts`, `end_date`, `image_url`.

**Test :** Vérifier que les offres peuvent être insérées et récupérées via SQL.

### **3.2 Interface d'affichage des offres**
- Créer une page `/offers` qui affiche toutes les offres.
- Afficher le nom, la description, le prix et l'état de chaque offre.

**Test :** Vérifier que les offres s'affichent correctement depuis la base de données.

### **3.3 Ajout d'une offre (admin)**
- Créer une page `/admin/offers/new` avec un formulaire d'ajout.
- Vérifier que les données sont bien envoyées à Supabase.

**Test :** Créer une offre et vérifier son affichage sur `/offers`.

### **3.4 Modification et suppression d'une offre**
- Ajouter la modification et suppression d'offre pour l'admin.

**Test :** Modifier une offre et s'assurer que les changements sont visibles.

---

## **4. Gestion des commandes**
### **4.1 Création de la table `orders` dans Supabase**
- Colonnes : `id`, `user_id`, `offer_id`, `quantity`, `price_paid`, `status`.

**Test :** Vérifier que les commandes peuvent être insérées et récupérées.

### **4.2 Passage d'une commande**
- Créer un bouton « Commander » sur chaque offre.
- Enregistrer la commande en base de données.

**Test :** Vérifier que l'utilisateur peut passer une commande.

### **4.3 Annulation d'une commande**
- Ajouter un bouton d'annulation pour les commandes en `pending`.

**Test :** Vérifier qu'une commande peut être annulée.

---

## **5. Gestion des seuils et validation des commandes**
### **5.1 Validation automatique d'une offre**
- Ajouter une fonction qui vérifie si le seuil minimum est atteint.

**Test :** Simuler plusieurs commandes et vérifier la validation automatique.

### **5.2 Application des réductions**
- Mettre à jour le prix en fonction des seuils atteints.

**Test :** Vérifier que les prix se mettent à jour dynamiquement.

---

## **6. Notifications clients**
### **6.1 Envoi d'e-mails de confirmation et validation**
- Configurer un service d'e-mails (ex: Resend, SendGrid).
- Envoyer un e-mail après chaque commande et validation.

**Test :** Vérifier que les e-mails sont bien envoyés.

### **6.2 Notification des réductions**
- Informer les clients lorsqu'un seuil de réduction est atteint.

**Test :** Vérifier l'envoi des e-mails de mise à jour des prix.

---

## **7. Sécurité et optimisation**
### **7.1 Sécurisation des routes et permissions**
- Vérifier que seuls les admins peuvent gérer les offres.
- Restreindre les accès aux commandes des utilisateurs.

**Test :** Essayer d'accéder aux pages admin en tant que client.

### **7.2 Optimisation des performances**
- Ajouter le cache pour éviter des requêtes répétées.
- Optimiser le chargement des images.

**Test :** Vérifier la rapidité d'affichage et l'optimisation des requêtes.

---

## **8. Déploiement**
### **8.1 Hébergement et configuration**
- Déployer le frontend sur Vercel.
- Déployer la base de données sur Supabase.
- Configurer les variables d'environnement.

**Test :** Vérifier le bon fonctionnement du site en production.

### **8.2 Monitoring et logs**
- Ajouter LogRocket ou Supabase logs pour le suivi des erreurs.

**Test :** Vérifier que les erreurs sont bien loguées.

---

## **9. Évolutions futures**
- Ajout du paiement en ligne (Stripe ou autre).
- Intégration d'un programme de fidélité.
- Ajout d'un partage social des offres.

---

Chaque étape est testable séparément pour garantir un développement progressif et robuste.
