---
title: "Itérer et corriger le cap"
description: "Apprends à corriger Claude quand il se trompe et à gérer ta session efficacement."
phase: 1
module: 2
lessonNumber: "2.4"
duration: 20
difficulty: beginner
type: exercise
tags:
  - iteration
  - correction
  - session
concepts:
  - Course correction
  - Esc
  - /rewind
  - /clear
  - Feedback loop
objectives:
  - Interrompre Claude avec Esc
  - Revenir en arrière avec /rewind
  - Réinitialiser le contexte avec /clear
  - Adopter le réflexe de corriger tôt
checklist:
  - id: escape
    label: "Interrompre Claude avec Esc"
  - id: undo
    label: "Annuler une action avec 'Undo that'"
  - id: rewind
    label: "Revenir à un point précédent avec /rewind"
  - id: clear
    label: "Réinitialiser le contexte avec /clear"
---

# Itérer et corriger le cap

Claude est fort, mais il n'est pas parfait. Il va se tromper. Il va partir dans la mauvaise direction. Il va parfois faire exactement le contraire de ce que tu voulais. Et c'est **normal**.

Ce qui fait la différence, c'est ta capacité à **corriger le cap rapidement**. Voyons les outils à ta disposition.

## Esc : le frein d'urgence

Tu vois Claude partir dans une direction qui ne te plaît pas ? Il commence à modifier des fichiers que tu ne voulais pas toucher ? Appuie sur **Esc**.

Esc arrête Claude immédiatement. Le contexte de la conversation est préservé — tu peux rediriger tout de suite :

::ai-conversation
user: Refactorise le fichier utils.ts pour séparer les fonctions de validation.
assistant: Je vais refactoriser utils.ts. Je commence par...

[Tu appuies sur Esc parce que Claude commence à modifier le mauvais fichier.]
user: Stop. Je parlais de src/utils.ts, pas de lib/utils.ts. Reprends avec le bon fichier.
assistant: Pardon ! Je reprends avec src/utils.ts.

[Claude modifie le bon fichier cette fois.]
::

Le réflexe Esc, c'est comme le Ctrl+Z du développeur. N'hésite jamais à l'utiliser.

## "Undo that" : annuler la dernière action

Claude vient de modifier un fichier et le résultat ne te convient pas ? Dis-lui simplement :

::ai-conversation
user: Undo that
assistant: J'annule les modifications. Les fichiers ont été restaurés à leur état précédent.
::

C'est simple, direct, efficace. Claude remet les fichiers comme ils étaient avant sa dernière action.

## /rewind : revenir en arrière

Parfois, le problème ne vient pas de la dernière action, mais de plusieurs étapes en arrière. C'est là que **/rewind** entre en jeu.

Tape `/rewind` (ou appuie deux fois sur Esc) pour ouvrir le menu de rembobinage. Tu verras la liste des messages de la conversation et tu pourras revenir à n'importe quel point.

C'est comme un checkpoint dans un jeu vidéo. Tu reviens à un moment où tout allait bien, et tu repars de là.

::ai-conversation
user: /rewind
assistant: [Claude affiche les points de la conversation auxquels tu peux revenir.]
::

Choisis le point où tout allait encore bien, et repars avec un meilleur prompt.

## /clear : le reset complet

Après plusieurs allers-retours, le contexte de la conversation peut devenir **pollué**. Claude accumule des infos contradictoires, des corrections sur des corrections, et finit par se perdre.

La solution : `/clear`.

::terminal-block
/clear
::

Cette commande efface tout l'historique de la conversation. Claude repart de zéro (mais il relit ton CLAUDE.md). C'est un nouveau départ propre.

**Quand utiliser /clear ?**

La règle d'or : **si tu as corrigé Claude deux fois de suite sur le même problème, tape /clear et réécris un meilleur prompt.**

Insister avec le même contexte pollué ne donnera pas un meilleur résultat. Repartir à zéro avec un prompt plus précis, si.

## Les patterns qui mènent à l'échec

### 1. La session fourre-tout

Tu commences par corriger un bug, puis tu ajoutes une feature, puis tu changes le design, puis tu reviens au bug... Au bout de 20 messages, Claude ne sait plus ce qui est fait et ce qui ne l'est pas.

**Solution** : une tâche par session. Quand tu changes de sujet, `/clear`.

### 2. La correction en boucle

"Non, pas comme ça" → "Toujours pas" → "C'est pas ce que je voulais" → "Essaie autrement"...

Si tu en es là, le problème n'est pas Claude. C'est ton prompt initial. `/clear` et reformule mieux.

### 3. L'entêtement

Parfois, Claude n'y arrive pas. Après 3-4 tentatives, accepte-le. `/clear`, reformule complètement, ou fais-le toi-même et demande à Claude de vérifier.

## Le bon réflexe : corriger tôt

Plus tu attends pour corriger, plus c'est compliqué. Si dès la première réponse tu vois que Claude part dans la mauvaise direction :

1. **Esc** si Claude est en train de modifier des fichiers
2. **Corrige immédiatement** avec un prompt plus précis
3. Si ça ne marche pas au 2e essai → **/clear** et recommence

Ne laisse pas Claude s'enfoncer dans une mauvaise direction pendant 10 messages. Corrige au premier signe.

## Résumé des commandes

| Action | Commande | Quand l'utiliser |
|--------|----------|-----------------|
| Arrêter Claude | **Esc** | Il part dans la mauvaise direction |
| Annuler la dernière action | **"Undo that"** | Le résultat ne convient pas |
| Revenir en arrière | **/rewind** ou **Esc+Esc** | Plusieurs étapes à annuler |
| Repartir à zéro | **/clear** | Contexte pollué, 2+ corrections ratées |

## Ce qu'on retient

- **Esc** est ton meilleur réflexe — arrête Claude dès que ça dérape
- **"Undo that"** annule la dernière modification
- **/rewind** te ramène à un point précis de la conversation
- **/clear** repart à zéro — utilise-le après 2 corrections ratées
- Le problème n'est souvent pas Claude, mais le prompt initial
- Une tâche par session, corriger tôt, ne pas insister
