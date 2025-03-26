# Devine - Application de Commande de Coffrets de Vin

Cette application permet de commander des coffrets de vin en fonction d'offres limitées dans le temps et basées sur un nombre minimum de commandes.

## Installation

1. Cloner le dépôt
2. Installer les dépendances : `npm install`
3. Copier le fichier `.env.local.example` vers `.env.local` et remplir avec vos identifiants Supabase
4. Lancer l'application en développement : `npm run dev`

## Technologies utilisées

- Next.js
- React
- Supabase (Auth et Base de données)
- TailwindCSS
- React Hook Form

## Structure du projet

- `/src/app` - Pages de l'application (Next.js App Router)
- `/src/components` - Composants réutilisables
- `/src/lib` - Utilitaires et connexion à Supabase
- `/src/styles` - Styles globaux

## Fonctionnalités

- Authentification utilisateur
- Affichage des offres de coffrets de vin
- Commande de coffrets
- Seuils de réduction automatiques
- Notifications aux clients 