---
title: "Naviguer dans un projet avec Claude Code"
description: "Apprends à explorer un projet existant avec Claude Code : comprendre l'architecture, trouver du code, tracer un flux."
phase: 1
module: 1
lessonNumber: "1.4"
duration: 25
difficulty: beginner
type: exercise
tags:
  - claude-code
  - exploration
  - codebase
concepts:
  - Exploration de code
  - Architecture
  - Recherche de fichiers
  - Traçage de flux
objectives:
  - Explorer un projet inconnu avec Claude Code
  - Poser les bonnes questions pour comprendre l'architecture
  - Trouver du code spécifique
  - Tracer un flux d'exécution
checklist:
  - id: clone-project
    label: "Cloner un projet open source"
  - id: overview
    label: "Demander un aperçu du projet"
  - id: find-code
    label: "Trouver un fichier ou une fonction spécifique"
  - id: trace-flow
    label: "Tracer un flux d'exécution de bout en bout"
---

# Naviguer dans un projet avec Claude Code

Tu arrives sur un projet que tu n'as jamais vu. Des dizaines de fichiers, des dossiers partout, du code dans tous les sens. Par où commencer ?

Bonne nouvelle : Claude Code est excellent pour explorer du code. Il peut lire les fichiers, comprendre la structure et te résumer le tout. C'est comme avoir un collègue qui connaît déjà le projet et qui t'explique tout.

## Étape 1 : Cloner un projet

On va s'entraîner sur un vrai projet open source. On prend un projet simple — une app de tâches (todo app) en Node.js.

```bash
git clone https://github.com/tastejs/todomvc.git
cd todomvc
```

Tu te retrouves avec plein de fichiers. Pas de panique, c'est normal. On ne va pas tout lire — on va demander à Claude.

Lance Claude Code dans le dossier du projet :

```bash
claude
```

## Étape 2 : Demander un aperçu

La première chose à faire quand tu arrives sur un projet inconnu : demander la vue d'ensemble. Pas les détails, juste la big picture.

::ai-conversation
---
messages:
  - role: user
    content: "Donne-moi un aperçu de ce projet. C'est quoi, comment c'est organisé, quelles technologies sont utilisées ?"
  - role: assistant
    content: "Ce projet est **TodoMVC** — une collection d'implémentations d'une application de tâches (todo app) dans différents frameworks JavaScript.\n\n**Structure :**\n- Chaque dossier correspond à un framework (React, Vue, Angular, Vanilla JS...)\n- Le dossier `site-assets/` contient les assets partagés (CSS, images)\n- Le fichier `package.json` gère les dépendances globales\n\n**Technologies :** HTML, CSS, JavaScript, et une vingtaine de frameworks différents."
---
::

En une question, tu sais déjà de quoi il s'agit. Pas besoin de lire 50 fichiers.

## Étape 3 : Poser des questions d'architecture

Maintenant, on creuse. L'idée c'est de comprendre **comment** le projet est construit. Voici des questions qui marchent bien :

::ai-conversation
---
messages:
  - role: user
    content: "Quels sont les fichiers principaux de l'implémentation en vanilla JavaScript ? Explique-moi l'architecture."
  - role: assistant
    content: "L'implémentation vanilla JS se trouve dans `examples/vanilla-es6/`. Voici les fichiers clés :\n\n- **`src/app.js`** — Point d'entrée, initialise l'application\n- **`src/store.js`** — Gestion des données (CRUD des tâches)\n- **`src/template.js`** — Génération du HTML\n- **`src/view.js`** — Gestion de l'affichage et des événements DOM\n- **`src/controller.js`** — Logique métier, fait le lien entre le store et la vue\n\nC'est une architecture **MVC** (Model-View-Controller) classique."
---
::

D'autres bonnes questions à poser :
- « Quels sont les modèles de données principaux ? »
- « Comment les données sont-elles stockées ? »
- « Y a-t-il des tests ? Comment les lancer ? »

## Étape 4 : Trouver du code spécifique

Tu cherches quelque chose de précis ? Demande directement. Claude va fouiller les fichiers pour toi.

::ai-conversation
---
messages:
  - role: user
    content: "Trouve-moi le code qui gère l'ajout d'une nouvelle tâche dans l'implémentation vanilla JS."
  - role: assistant
    content: "L'ajout d'une tâche passe par plusieurs fichiers :\n\n**1. `src/controller.js`** — méthode `addItem(title)` :\n```javascript\naddItem(title) {\n  this.store.insert({ title, completed: false }, () => {\n    this.view.render('clearNewTodo');\n    this._filter(true);\n  });\n}\n```\n\n**2. `src/store.js`** — méthode `insert(item, callback)` :\nElle ajoute l'item dans le localStorage avec un ID unique.\n\n**3. `src/view.js`** — écoute l'événement `keypress` sur l'input et appelle le controller."
---
::

Claude ne te montre pas juste un fichier — il te montre **la chaîne complète**. C'est ça la puissance de l'exploration assistée.

## Étape 5 : Tracer un flux d'exécution

C'est la technique la plus utile. Tu prends une action utilisateur (cliquer sur un bouton, soumettre un formulaire) et tu demandes à Claude de tracer tout le chemin du code.

::ai-conversation
---
messages:
  - role: user
    content: "Trace le flux complet quand un utilisateur coche une tâche comme terminée. Du clic au stockage."
  - role: assistant
    content: "Voici le flux complet :\n\n**1. Clic utilisateur** → `src/view.js`\nL'événement `click` sur la checkbox déclenche le handler `toggleComplete`.\n\n**2. Controller** → `src/controller.js`\nLa méthode `toggleComplete(id)` est appelée. Elle récupère la tâche et inverse son statut.\n\n**3. Store** → `src/store.js`\nLa méthode `update(id, data, callback)` met à jour la tâche dans le localStorage.\n\n**4. Rendu** → `src/view.js`\nLe controller demande à la vue de re-render la liste avec la tâche barrée.\n\n**Résumé** : Vue (clic) → Controller (logique) → Store (données) → Vue (affichage)"
---
::

Ce genre de traçage te permet de comprendre un projet en quelques minutes au lieu de quelques heures.

## Les bonnes pratiques d'exploration

Voici les règles d'or pour explorer un projet efficacement :

1. **Commence large, puis zoome.** D'abord l'aperçu global, puis l'architecture, puis le code spécifique.
2. **Utilise le vocabulaire du projet.** Si le code parle de « store », utilise « store » dans tes questions — pas « base de données ».
3. **Suis les connexions.** Quand Claude mentionne un fichier, demande-lui d'aller voir dedans.
4. **Pose des questions « pourquoi ».** « Pourquoi ils utilisent le localStorage et pas une API ? » — ça t'aide à comprendre les choix techniques.
5. **N'aie pas peur de demander des explications simples.** « Explique-moi cette fonction comme si j'avais 10 ans » — c'est un prompt tout à fait valable.

## Ce qu'on retient

- Claude Code peut explorer et résumer n'importe quel projet en quelques secondes
- Commence toujours par un aperçu global avant de plonger dans les détails
- Le traçage de flux (du clic au stockage) est la technique la plus puissante pour comprendre du code
- Utilise le vocabulaire du projet dans tes questions pour des réponses plus pertinentes

Dans la prochaine leçon, on fait le quiz du module 1 pour vérifier que tout est bien compris.
