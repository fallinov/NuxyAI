---
title: "Gérer le contexte comme un pro"
description: "Comprends comment fonctionne la fenêtre de contexte et apprends à la gérer pour garder Claude efficace."
phase: 1
module: 3
lessonNumber: "3.3"
duration: 20
difficulty: intermediate
type: guide
tags:
  - contexte
  - performance
  - sous-agents
concepts:
  - Fenêtre de contexte
  - /clear
  - /compact
  - Sous-agents
  - Sessions
objectives:
  - Comprendre pourquoi le contexte est important
  - Utiliser /clear et /compact efficacement
  - Déléguer la recherche à des sous-agents
  - Reprendre une session avec --continue et --resume
---

# Gérer le contexte comme un pro

Voici **le** concept que 90% des utilisateurs de Claude Code ignorent. Et c'est pour ça que leurs résultats se dégradent au fil de la conversation.

## La fenêtre de contexte, c'est quoi ?

Imagine que Claude a un bureau. Tout ce que tu lui dis, tout le code qu'il lit, toutes ses réponses — tout ça s'empile sur le bureau. Le problème ? **Le bureau a une taille limitée.** Quand il est plein, les feuilles tombent par terre et Claude les oublie.

C'est la **fenêtre de contexte**. Plus elle se remplit, plus Claude :
- Oublie des instructions du début de conversation
- Fait des erreurs qu'il ne faisait pas avant
- Ignore des règles de ton CLAUDE.md
- Génère du code de moins bonne qualité

C'est LA ressource à gérer. Pas le temps. Pas la puissance. Le **contexte**.

## /clear : la commande la plus importante

Quand tu passes d'une tâche à une autre — par exemple du CSS à un bug d'API — tape `/clear`. C'est comme nettoyer le bureau de Claude pour repartir à zéro.

```bash
> /clear

Contexte vidé. Nouvelle conversation.
```

**La règle** : entre deux tâches non liées, toujours `/clear`. C'est l'habitude la plus importante à prendre avec Claude Code.

## /compact : résumer sans perdre

Parfois tu veux garder le fil de la conversation, mais elle commence à être longue. `/compact` résume tout pour libérer de l'espace :

```bash
> /compact

Conversation résumée. Contexte libéré.
```

Tu peux même guider le résumé :

::ai-conversation
---
messages:
  - role: user
    content: "/compact Concentre-toi sur les changements de l'API et les décisions d'architecture."
  - role: assistant
    content: "Conversation résumée en gardant le focus sur :\n- Refactoring de l'API auth (passage de JWT à session cookies)\n- Décision d'utiliser le schéma `nuxyai` au lieu de `public`\n- Nouveau middleware de validation avec Zod\n\nContexte libéré de 45%."
---
::

La compaction automatique se déclenche aussi quand Claude approche des limites. Mais n'attends pas — utilise `/compact` proactivement quand la conversation s'allonge.

## Sous-agents : des enquêteurs à part

Voici un truc puissant. Quand tu dois explorer du code ou investiguer un problème, Claude peut lancer des **sous-agents**. Chaque sous-agent a sa propre fenêtre de contexte. Il explore, lit des fichiers, analyse — et rapporte un résumé. Tout ça **sans polluer ta conversation principale**.

::ai-conversation
---
messages:
  - role: user
    content: "Utilise des sous-agents pour investiguer comment notre système d'authentification gère le refresh des tokens."
  - role: assistant
    content: "J'ai lancé un sous-agent pour cette investigation.\n\n**Rapport du sous-agent :**\n\nLe refresh token est géré dans `server/api/auth/refresh.ts` :\n1. Le client envoie le refresh token en cookie httpOnly\n2. Le serveur vérifie sa validité via Supabase `auth.refreshSession()`\n3. Un nouveau access token est retourné\n4. Le middleware `auth.ts` intercepte les 401 et déclenche automatiquement le refresh\n\n**Point d'attention** : le token expire après 1h, mais il n'y a pas de rotation du refresh token."
---
::

Le sous-agent a lu plusieurs fichiers, tracé le flux, et analysé le code. Mais ta conversation principale n'a reçu que le résumé. Propre.

Utilise les sous-agents pour :
- Investiguer du code que tu ne connais pas
- Chercher des patterns dans le projet
- Analyser des dépendances complexes

## Gérer tes sessions

Tu fermes le terminal et tu reviens le lendemain ? Pas de panique. Claude garde tes sessions.

```bash
claude --continue
```

Cette commande reprend ta **dernière conversation** dans le dossier courant. Pratique pour continuer là où tu en étais.

Tu veux choisir une session plus ancienne ?

```bash
claude --resume
```

Claude te montre la liste de tes sessions récentes et tu choisis laquelle reprendre.

Et pour nommer une session en cours (pour la retrouver facilement) :

```bash
> /rename refactoring-api-auth
```

## Les erreurs classiques

### La session fourre-tout

Tu commences par du CSS, puis tu fixes un bug d'API, puis tu écris des tests, puis tu configures le déploiement. Tout dans la même conversation. Résultat : Claude est perdu, le contexte est saturé, les réponses sont médiocres.

**Solution** : une tâche = une session. `/clear` entre chaque tâche.

### L'exploration infinie

Tu demandes à Claude d'explorer un sujet sans limites : « Comment fonctionne tout le système d'auth ? ». Claude lit 50 fichiers, le contexte explose, et tu n'as rien retenu.

**Solution** : utilise un **sous-agent** pour l'exploration. Ou sois spécifique : « Comment le middleware auth.ts vérifie-t-il le token ? » — une question précise, une réponse ciblée.

## Ce qu'on retient

- La **fenêtre de contexte** est la ressource numéro 1 à gérer — quand elle est pleine, tout se dégrade
- **/clear** entre chaque tâche non liée — c'est **l'habitude la plus importante**
- **/compact** résume la conversation pour libérer de l'espace sans tout perdre
- Les **sous-agents** explorent dans leur propre contexte — ta conversation reste propre
- `claude --continue` reprend ta dernière session, `claude --resume` te laisse choisir
