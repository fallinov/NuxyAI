---
title: "Quiz — Workflow efficace"
description: "Vérifie tes connaissances sur CLAUDE.md, la configuration et la gestion du contexte."
phase: 1
module: 3
lessonNumber: "3.4"
duration: 10
difficulty: intermediate
type: quiz
tags:
  - quiz
  - claude-md
  - contexte
  - configuration
concepts:
  - CLAUDE.md
  - Permissions
  - Hooks
  - Contexte
  - Sessions
objectives:
  - Valider les acquis du module 3
quiz:
  - question: "Quelle commande génère un CLAUDE.md de base pour ton projet ?"
    options:
      - "claude init"
      - "/init"
      - "claude --create-md"
      - "/setup"
    correct: 1
    explanation: "La commande /init analyse ton projet et génère un CLAUDE.md adapté."
  - question: "Que se passe-t-il quand la fenêtre de contexte est pleine ?"
    options:
      - "Claude s'arrête automatiquement"
      - "Les performances de Claude se dégradent"
      - "Claude crée un nouveau fichier"
      - "Rien, c'est illimité"
    correct: 1
    explanation: "Quand le contexte est plein, Claude peut oublier des instructions ou faire plus d'erreurs. C'est LA ressource à gérer."
  - question: "Quelle est la meilleure façon d'investiguer du code sans polluer ton contexte ?"
    options:
      - "Lire tous les fichiers manuellement"
      - "Utiliser des sous-agents"
      - "Tout mettre dans CLAUDE.md"
      - "Ouvrir un deuxième terminal"
    correct: 1
    explanation: "Les sous-agents explorent dans leur propre fenêtre de contexte et rapportent un résumé, gardant ta conversation principale propre."
  - question: "Qu'est-ce qu'un hook dans Claude Code ?"
    options:
      - "Un raccourci clavier"
      - "Un script qui s'exécute automatiquement à des moments précis"
      - "Un plugin externe"
      - "Une commande git"
    correct: 1
    explanation: "Les hooks sont des scripts shell qui s'exécutent automatiquement (ex: linter après chaque modification de fichier)."
  - question: "Comment reprendre ta dernière session Claude Code ?"
    options:
      - "claude --last"
      - "claude --continue"
      - "claude --resume-last"
      - "claude --back"
    correct: 1
    explanation: "claude --continue reprend la conversation la plus récente dans le dossier courant."
  - question: "Que NE faut-il PAS mettre dans CLAUDE.md ?"
    options:
      - "Les commandes de build et test"
      - "Les conventions de code spécifiques au projet"
      - "Une description détaillée de chaque fichier du projet"
      - "Les décisions architecturales"
    correct: 2
    explanation: "Claude peut lire le code lui-même. Le CLAUDE.md doit contenir ce que Claude ne peut PAS deviner en lisant le code."
  - question: "À quoi sert /compact ?"
    options:
      - "Compresser les fichiers du projet"
      - "Résumer la conversation pour libérer du contexte"
      - "Supprimer les fichiers inutiles"
      - "Réduire la taille du CLAUDE.md"
    correct: 1
    explanation: "/compact résume la conversation actuelle pour libérer de l'espace dans la fenêtre de contexte, tout en préservant les informations importantes."
  - question: "Quelle est la règle d'or pour un CLAUDE.md efficace ?"
    options:
      - "Le plus long possible pour tout couvrir"
      - "Court et ciblé — chaque ligne doit empêcher Claude de faire une erreur"
      - "Copier la documentation officielle du projet"
      - "Mettre uniquement les commandes npm"
    correct: 1
    explanation: "Un CLAUDE.md trop long est ignoré. Pour chaque ligne, demande-toi : 'Si je retire ça, Claude fera-t-il des erreurs ?' Sinon, supprime."
---

# Quiz — Workflow efficace

Bien joué, tu as terminé le module 3 ! Tu maîtrises maintenant les trois piliers d'un workflow efficace avec Claude Code : la mémoire persistante, la configuration de l'environnement et la gestion du contexte.

Ce module t'a appris que Claude Code n'est pas juste un outil qu'on lance et qui fonctionne tout seul. Pour en tirer le maximum, il faut le **configurer**. Le CLAUDE.md lui donne la mémoire de ton projet. Les permissions, les hooks et les skills automatisent les tâches répétitives. Et la gestion du contexte — avec `/clear`, `/compact` et les sous-agents — garantit que Claude reste performant même sur de longues sessions.

Le point le plus important à retenir : **le contexte est ta ressource la plus précieuse**. Un `/clear` entre deux tâches, c'est l'habitude qui fait la différence entre un développeur qui galère avec l'IA et un développeur qui la maîtrise. 8 questions pour valider tout ça. C'est parti !
