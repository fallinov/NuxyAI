# Fonctionnement et Architecture de l'Application

Ce document décrit l'architecture technique, le flux de données et les mécanismes de rendu de votre application Nuxt Content.

## 1. Architecture Globale

L'application est construite sur une stack moderne utilisant **Nuxt 4** comme framework principal.

### Composants Clés

*   **Framework** : [Nuxt 4](https://nuxt.com) (Vue.js)
*   **UI** : [Nuxt UI v4](https://ui.nuxt.com) (basé sur Tailwind CSS v4)
*   **CMS / Contenu** : [Nuxt Content v3](https://content.nuxt.com)
*   **Éditeur** : [Nuxt Studio](https://nuxt.studio) (Git-based CMS)
*   **Base de Données (Prod)** : [Supabase](https://supabase.com) (PostgreSQL)
*   **Hébergement** : [Vercel](https://vercel.com)

```mermaid
graph TD
    User[Utilisateur] -->|HTTPS| Vercel[Vercel (SSR)]
    Vercel -->|Query| Supabase[Supabase (PostgreSQL)]
    Studio[Nuxt Studio] -->|Git Commit| GitHub[GitHub Repo]
    GitHub -->|Webhook| Vercel
    Dev[Développeur] -->|Code| GitHub
```

## 2. Gestion des Données (Nuxt Content v3)

Nuxt Content v3 change de paradigme par rapport à la v2 en utilisant une approche basée sur SQL.

### Environnement de Développement (Local)
*   **Stockage** : SQLite (fichier local `.data/content.sqlite`).
*   **Fonctionnement** : Au démarrage, Nuxt Content scanne vos fichiers Markdown (`content/`), les parse et remplit la base SQLite locale.
*   **Avantage** : Rapide, pas de dépendance externe nécessaire pour développer.

### Environnement de Production (Vercel)
*   **Problème** : Vercel utilise des fonctions Serverless éphémères. Le système de fichiers local est détruit après chaque requête, donc SQLite ne peut pas persister.
*   **Solution** : Utilisation de l'adaptateur **PostgreSQL**.
*   **Stockage** : Les données parsées sont stockées dans votre base Supabase.
*   **Flux** : Lors du build ou du démarrage, Nuxt Content se connecte à Supabase via `POSTGRES_URL` et synchronise le contenu.

### Gestion des Tâches (Supabase Realtime)
Pour la page `/taches`, nous utilisons une approche hybride :
1.  **Chargement Initial (SSR)** : Les tâches sont chargées côté serveur via `useAsyncData` pour le SEO et la performance.
2.  **Synchronisation (Client)** : Une fois hydraté, le client s'abonne aux changements via **Supabase Realtime**.
3.  **Réactivité** :
    *   Une copie locale (`localTasks`) est utilisée pour l'affichage.
    *   Les événements `INSERT`, `UPDATE`, `DELETE` mettent à jour cette liste instantanément.
    *   Les actions utilisateur (cocher une case) mettent à jour l'état local immédiatement (Optimistic UI) puis synchronisent avec la base.

## 3. Rendu (SSR vs CSR)

L'application utilise le **Rendu Universel (Universal Rendering)**.

### Rendu Côté Serveur (SSR) - Premier Chargement
1.  L'utilisateur demande une page (ex: `/blog/first-post`).
2.  Le serveur Vercel (Node.js) reçoit la requête.
3.  `useAsyncData` est exécuté sur le serveur.
4.  Nuxt Content interroge la base de données (Supabase) pour récupérer le contenu.
5.  Le serveur génère le HTML complet avec le contenu et l'envoie au navigateur.
6.  **Avantage** : SEO optimal, affichage rapide du contenu (FCP).

### Rendu Côté Client (CSR) - Navigation (Hydratation)
1.  Une fois le HTML chargé, Vue.js "s'hydrate" et prend le relais.
2.  Lors de la navigation vers une autre page (via `<NuxtLink>` ou `UButton`), il n'y a pas de rechargement complet de la page.
3.  Nuxt fait un appel API interne (fetch) pour récupérer le JSON du nouvel article.
4.  Le composant `<ContentRenderer>` met à jour le DOM dynamiquement.

## 4. Nuxt Studio

Nuxt Studio agit comme une couche d'édition visuelle par-dessus votre dépôt Git.

1.  **Édition** : Vous modifiez le contenu sur l'interface Studio (`/_studio` ou `nuxt.studio`).
2.  **Sauvegarde** : Studio effectue un **commit** Git sur votre branche `main`.
3.  **Déploiement** : Vercel détecte le nouveau commit et lance un nouveau build.
4.  **Mise à jour** : Le nouveau build met à jour la base de données Supabase avec le nouveau contenu.

## 5. Structure des Fichiers

*   `content/` : Vos fichiers Markdown (source de vérité).
*   `content.config.ts` : Définition des collections et des schémas de données.
*   `app/pages/` : Les vues Vue.js.
    *   `index.vue` : Liste les articles (`queryCollection('blog').all()`).
    *   `blog/[...slug].vue` : Affiche un article unique (`queryCollection('blog').path(...)`).
*   `nuxt.config.ts` : Configuration centrale (modules, CSS, base de données).
