---
title: "Quiz — Communiquer avec l'IA"
description: "Vérifie tes connaissances sur les prompts, le contexte et le workflow avec Claude Code."
phase: 1
module: 2
lessonNumber: "2.5"
duration: 10
difficulty: beginner
type: quiz
tags:
  - quiz
  - prompts
  - contexte
  - plan-mode
concepts:
  - Prompts
  - Contexte
  - Mode Plan
  - Itération
objectives:
  - Valider les acquis du module 2
quiz:
  - question: "Quel prompt est le plus efficace ?"
    options:
      - "fix the bug"
      - "Dans auth.js ligne 42, la validation email manque un check pour les domaines vides. Ajoute-le et lance les tests."
      - "fais marcher le code"
      - "c'est cassé, répare"
    correct: 1
  - question: "Comment référencer un fichier dans Claude Code ?"
    options:
      - "file:src/auth.js"
      - "@src/auth.js"
      - "#src/auth.js"
      - "import src/auth.js"
    correct: 1
    explanation: "Le symbole @ suivi du chemin du fichier permet à Claude de le lire directement."
  - question: "Qu'est-ce que le CLAUDE.md ?"
    options:
      - "Un fichier de documentation automatique"
      - "Un fichier que Claude lit au début de chaque session pour connaître tes règles"
      - "Un log des conversations"
      - "Un fichier de configuration npm"
    correct: 1
    explanation: "Le CLAUDE.md contient les commandes, conventions et règles du projet. Claude le lit automatiquement."
  - question: "En mode Plan, Claude peut-il modifier des fichiers ?"
    options:
      - "Oui, mais il demande confirmation"
      - "Non, il analyse uniquement en lecture seule"
      - "Oui, sans restriction"
      - "Seulement les fichiers .md"
    correct: 1
    explanation: "En mode Plan, Claude explore le code en lecture seule. Il ne modifie rien tant que tu ne passes pas en mode Normal."
  - question: "Quelle est la bonne réaction quand Claude se trompe 2 fois de suite ?"
    options:
      - "Insister avec le même prompt"
      - "Taper /clear et reformuler avec un meilleur prompt"
      - "Fermer le terminal"
      - "Supprimer CLAUDE.md"
    correct: 1
    explanation: "Après 2 corrections ratées, le contexte est pollué. Mieux vaut /clear et réécrire un prompt plus précis."
  - question: "À quoi sert la touche Esc dans Claude Code ?"
    options:
      - "Quitter Claude Code"
      - "Interrompre Claude en cours d'action"
      - "Effacer l'historique"
      - "Changer de modèle"
    correct: 1
    explanation: "Esc arrête Claude immédiatement. Le contexte est préservé, tu peux rediriger."
  - question: "Que faut-il mettre dans un CLAUDE.md ?"
    options:
      - "Toute la documentation du projet"
      - "Les commandes build/test et les conventions que Claude ne peut pas deviner"
      - "Le code source des fichiers importants"
      - "L'historique git"
    correct: 1
    explanation: "Le CLAUDE.md doit contenir les infos que Claude ne peut pas deviner en lisant le code : commandes, conventions, architecture."
  - question: "Quel workflow est recommandé pour une feature complexe ?"
    options:
      - "Coder directement"
      - "Explorer → Planifier → Implémenter → Commiter"
      - "Demander à Claude de tout faire d'un coup"
      - "Copier du code existant"
    correct: 1
    explanation: "Le workflow en 4 étapes permet de comprendre le code existant avant de modifier, d'avoir un plan clair et de vérifier le résultat."
---

# Quiz — Communiquer avec l'IA

Tu as terminé le module 2. Avant de passer à la suite, faisons le point sur ce que tu as appris.

Dans ce module, tu as découvert que la qualité de tes résultats avec Claude Code dépend directement de la qualité de ta communication. Un prompt précis avec du contexte donne un résultat précis. Un prompt vague donne un résultat vague. C'est aussi simple que ça.

Tu as aussi appris les outils pour travailler efficacement : le `@` pour référencer des fichiers, le CLAUDE.md pour donner du contexte permanent, le mode Plan pour réfléchir avant d'agir, et les commandes de correction (Esc, /rewind, /clear) pour garder le cap quand ça dérape.

Retiens surtout le workflow des pros : **explorer, planifier, implémenter, commiter**. Et la règle d'or : si tu as corrigé Claude deux fois sans succès, c'est ton prompt qui pose problème — pas Claude.

Vérifions tout ça avec 8 questions.
