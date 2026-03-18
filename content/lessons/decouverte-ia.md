---
title: "Découverte de l'IA générative pour le code"
description: "Comprends ce qu'est l'IA générative et comment elle peut t'aider à coder plus vite."
phase: 1
module: 1
lessonNumber: "1.1"
duration: 15
difficulty: beginner
type: guide
tags:
  - ia
  - introduction
concepts:
  - IA générative
  - LLM
  - Claude
  - prompt
objectives:
  - Comprendre ce qu'est l'IA générative
  - Connaître les principaux outils IA pour le code
  - Savoir quand utiliser l'IA dans son workflow
---

# Découverte de l'IA générative pour le code

Tu as sûrement entendu parler de ChatGPT, de Claude ou de Copilot. Mais c'est quoi exactement, l'IA générative ? Et surtout, comment ça peut t'aider à apprendre à coder ?

C'est ce qu'on va voir ensemble dans cette leçon.

## C'est quoi l'IA générative ?

L'IA générative, c'est un type d'intelligence artificielle capable de **créer du contenu** : du texte, du code, des images, de la musique... Elle ne se contente pas de chercher des réponses dans une base de données. Elle **génère** quelque chose de nouveau à chaque fois.

Au coeur de tout ça, il y a les **LLM** (Large Language Models, ou grands modèles de langage). Ce sont des programmes entraînés sur des milliards de textes pour comprendre et produire du langage naturel — y compris du code.

Concrètement, tu lui poses une question en français (ou en anglais), et elle te répond avec du texte, du code, ou les deux.

## Les principaux outils IA pour le code

Voici les outils que tu vas croiser le plus souvent :

### Claude (Anthropic)

C'est l'IA qu'on va utiliser dans cette formation. Claude est particulièrement bon pour :
- Expliquer des concepts clairement
- Écrire du code propre et bien structuré
- Analyser et corriger du code existant

Il existe en version web (claude.ai) et en **CLI** (Claude Code), qu'on va installer dans la prochaine leçon.

### GitHub Copilot

Copilot s'intègre directement dans ton éditeur de code (VS Code, JetBrains...). Il te suggère du code en temps réel pendant que tu tapes. C'est un peu comme l'autocomplétion, mais en beaucoup plus puissant.

### Cursor

Cursor est un éditeur de code basé sur VS Code, mais avec l'IA intégrée partout. Tu peux discuter avec l'IA, lui demander de modifier du code, et voir les changements en direct.

### ChatGPT (OpenAI)

Le plus connu du grand public. Très polyvalent, il peut t'aider à coder, mais aussi à comprendre des concepts, rédiger de la documentation, etc.

## Ce que l'IA sait faire (et ce qu'elle ne sait pas)

### L'IA est forte pour...

- **Écrire du code standard** : créer une fonction, un composant, une requête SQL
- **Expliquer du code** : tu colles un bout de code et elle t'explique ligne par ligne
- **Corriger des erreurs** : tu lui montres l'erreur, elle te propose une solution
- **Transformer du code** : refactoring, traduction d'un langage à un autre
- **Générer des tests** : elle peut écrire des tests unitaires pour ton code

### L'IA galère avec...

- **Le contexte métier** : elle ne connaît pas les règles spécifiques de ton projet
- **Les décisions d'architecture** : elle peut proposer, mais c'est toi qui décides
- **Le code parfait du premier coup** : il faut souvent itérer et corriger
- **Les dernières nouveautés** : elle a une date limite de connaissance
- **La sécurité** : ne lui fais jamais confiance aveuglément pour du code sensible

## Quand utiliser l'IA dans ton workflow ?

L'IA n'est pas là pour remplacer ton cerveau. C'est un **outil** — comme un tournevis électrique. Tu dois quand même savoir ce que tu veux construire.

Voici quelques bons moments pour l'utiliser :

1. **Tu démarres un nouveau fichier** → demande-lui un squelette de base
2. **Tu bloques sur une erreur** → montre-lui l'erreur et le code
3. **Tu veux comprendre un concept** → demande-lui de t'expliquer simplement
4. **Tu fais du code répétitif** → laisse-la générer les parties ennuyeuses
5. **Tu veux une revue de code** → demande-lui ce qu'elle améliorerait

Et voici quand **ne pas** l'utiliser :

1. **Tu apprends un concept pour la première fois** → essaie d'abord toi-même
2. **Tu ne comprends pas ce qu'elle a généré** → ne copie jamais du code que tu ne comprends pas
3. **Tu veux impressionner** → le but c'est d'apprendre, pas de tricher

## Ce qu'on retient

- L'IA générative crée du contenu nouveau à partir de ce qu'elle a appris
- Claude, Copilot, Cursor et ChatGPT sont les outils principaux pour coder avec l'IA
- L'IA est un assistant puissant, mais elle fait des erreurs — c'est toi le pilote
- Utilise-la pour accélérer ton workflow, pas pour éviter de réfléchir

Dans la prochaine leçon, on passe à la pratique : tu vas installer Claude Code sur ta machine.
