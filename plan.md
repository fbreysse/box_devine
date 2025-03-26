# **Plan détaillé d'implémentation pour le site de commande de coffrets de vin**

## **1. Initialisation du projet** ✅
### **1.1 Création du dépôt et configuration du projet** ✅
- Initialiser un dépôt Git ✅
- Configurer un projet Next.js avec l'App Router ✅
  ```bash
  npx create-next-app@latest
  ```
- Installer les dépendances de base ✅
  ```bash
  npm install @supabase/ssr @supabase/supabase-js tailwindcss @headlessui/react
  ```
- Configurer TailwindCSS ✅
  ```bash
  npx tailwindcss init
  ```
- Configurer `.env.local` pour les variables Supabase ✅

**Choix techniques :**
- Next.js 15.2.4 avec App Router pour bénéficier des dernières fonctionnalités de routing et de Server Components
- Tailwind CSS pour le styling, permettant un développement rapide et cohérent
- @supabase/ssr pour l'authentification côté serveur avec Next.js
- @headlessui/react pour des composants UI accessibles et personnalisables

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

## **2. Mise en place de l'authentification** ✅
### **2.1 Configuration de l'auth avec Supabase** ✅
- Créer un projet Supabase ✅
- Activer Supabase Auth (e-mail/password) ✅
- Table `users` créée automatiquement via Supabase Auth ✅

**Test :** Essayer de s'inscrire et de se connecter avec Supabase.

### **2.2 Page de connexion et inscription** ✅
- Créer une page `/login` avec formulaire (email/mot de passe) ✅
- Créer une page `/register` avec formulaire d'inscription ✅
- Ajouter la gestion des sessions avec Supabase ✅
- Implémenter la redirection après connexion ✅

**Choix techniques :**
- Utilisation de `createBrowserClient` de @supabase/ssr pour l'authentification côté client
- Utilisation de `createServerClient` pour la gestion des sessions côté serveur
- Route `/auth/callback` pour gérer le flux d'authentification OAuth
- Gestion des cookies pour maintenir la session utilisateur
- Messages d'erreur en français pour une meilleure expérience utilisateur
- Design responsive avec Tailwind CSS
- Validation des formulaires côté client et serveur

**Test :** Vérifier que l'utilisateur peut s'inscrire et se connecter.

---

## **3. Gestion des offres de coffrets**
### **3.1 Création de la table `offers` dans Supabase** ✅
- Colonnes : `id`, `name`, `description`, `price`, `min_orders`, `discounts`, `end_date`, `image_url` ✅

**Structure de la table implémentée :**
```sql
create table offers (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  description text,
  price decimal(10,2) not null,
  min_orders integer not null,
  discounts jsonb,
  end_date timestamp with time zone,
  image_url text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

**Test :** ✅ Table créée et accessible via l'API Supabase

### **3.2 Interface d'affichage des offres** ✅
- Créer une page `/offers` qui affiche toutes les offres ✅
- Afficher le nom, la description, le prix et l'état de chaque offre ✅

**Choix techniques :**
- Utilisation de Server Components pour le chargement des offres
- Design responsive avec grille adaptative (1, 2 ou 3 colonnes selon la taille d'écran)
- Gestion des images avec fallback
- Formatage des dates et prix en français

### **3.3 Ajout d'une offre (admin)**
- Créer une page `/admin/offers/new` avec formulaire d'ajout
- Vérifier que les données sont bien envoyées à Supabase

### **3.4 Modification et suppression d'une offre**
- Ajouter la modification et suppression d'offre pour l'admin

**Choix techniques prévus :**
- Utilisation de Server Components pour le chargement initial des offres
- Client Components pour les interactions utilisateur (ajout, modification, suppression)
- Optimistic UI pour une meilleure expérience utilisateur
- Middleware pour la protection des routes admin
- Upload d'images vers le storage Supabase
- Cache des données avec Next.js

---

**Notes sur l'implémentation actuelle :**
1. L'authentification est entièrement fonctionnelle avec gestion des sessions
2. Les formulaires sont sécurisés et validés
3. L'interface utilisateur est responsive et accessible
4. La gestion des erreurs est en français pour une meilleure expérience utilisateur
5. Le système de redirection post-authentification est en place

**Prochaines étapes :**
1. Implémenter la table `offers` dans Supabase
2. Créer l'interface d'affichage des offres
3. Mettre en place la gestion administrative des offres

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
