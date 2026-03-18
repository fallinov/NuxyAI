---
title: "Installer Claude Code"
description: "Installe Claude Code sur ta machine, étape par étape."
phase: 1
module: 1
lessonNumber: "1.2"
duration: 20
difficulty: beginner
type: exercise
tags:
  - claude-code
  - installation
  - terminal
concepts:
  - Terminal
  - npm
  - Claude Code
  - CLI
objectives:
  - Installer Node.js
  - Installer Claude Code via npm
  - Vérifier l'installation
  - Lancer Claude Code pour la première fois
checklist:
  - id: install-node
    label: "Installer Node.js (v18+)"
  - id: install-claude
    label: "Installer Claude Code avec npm"
  - id: verify-install
    label: "Vérifier avec claude --version"
  - id: first-launch
    label: "Lancer Claude Code"
---

# Installer Claude Code

Avant de pouvoir discuter avec Claude dans ton terminal, il faut l'installer. Pas de panique, c'est rapide — 4 étapes et c'est réglé.

## Étape 1 : Installer Node.js

Claude Code est un outil **npm** (Node Package Manager). Pour l'utiliser, tu as besoin de Node.js version 18 ou plus récente.

### Vérifie si Node.js est déjà installé

Ouvre ton terminal et tape :

::terminal-block
node --version
::

Si tu vois quelque chose comme `v20.11.0` ou plus, c'est bon — passe à l'étape 2.

### Si Node.js n'est pas installé

Rends-toi sur [nodejs.org](https://nodejs.org) et télécharge la version **LTS** (Long Term Support). C'est la version stable recommandée.

- **Windows** : télécharge le `.msi` et suis l'installateur
- **macOS** : télécharge le `.pkg` ou utilise Homebrew :

::terminal-block
brew install node
::

- **Linux** : utilise ton gestionnaire de paquets ou [nvm](https://github.com/nvm-sh/nvm)

Après l'installation, ferme et rouvre ton terminal, puis vérifie :

::terminal-block
node --version
npm --version
::

Tu devrais voir les numéros de version des deux. Si c'est le cas, bravo — Node.js est prêt.

## Étape 2 : Installer Claude Code

Maintenant qu'on a npm, on peut installer Claude Code en une seule commande :

::terminal-block
npm install -g @anthropic-ai/claude-code
::

Le `-g` signifie **global** : Claude Code sera disponible partout sur ta machine, pas seulement dans un projet.

L'installation peut prendre quelques secondes. Tu verras des lignes défiler — c'est normal.

### Si tu as une erreur de permissions (macOS/Linux)

Sur certains systèmes, npm a besoin de droits administrateur pour installer globalement. Deux options :

**Option 1** : Utiliser `sudo` (rapide mais pas idéal) :

::terminal-block
sudo npm install -g @anthropic-ai/claude-code
::

**Option 2** : Configurer npm pour ne plus avoir besoin de sudo (recommandé) :

::terminal-block
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'
::

Puis ajoute `~/.npm-global/bin` à ton PATH (dans `~/.zshrc` ou `~/.bashrc`).

## Étape 3 : Vérifier l'installation

Tape cette commande pour vérifier que tout est en place :

::terminal-block
claude --version
::

Tu devrais voir le numéro de version de Claude Code s'afficher. Si c'est le cas, l'installation est réussie.

### Si la commande n'est pas trouvée

- Ferme et rouvre ton terminal
- Vérifie que le dossier global npm est dans ton PATH
- Réessaie l'installation

## Étape 4 : Lancer Claude Code pour la première fois

C'est le moment de vérité. Place-toi dans un dossier de ton choix et lance :

::terminal-block
claude
::

La première fois, Claude Code va te demander de t'authentifier avec ton compte Anthropic. Suis les instructions à l'écran — c'est guidé.

Une fois connecté, tu verras le prompt de Claude Code apparaître. Tu peux taper ta première question !

Essaie par exemple :

::terminal-block
claude "Explique-moi ce qu'est une variable en JavaScript, en 3 phrases simples."
::

Si tu reçois une réponse, tout fonctionne parfaitement.

## Récap

| Étape | Commande | Résultat attendu |
|-------|----------|-------------------|
| Vérifier Node.js | `node --version` | `v18+` |
| Installer Claude Code | `npm install -g @anthropic-ai/claude-code` | Installation OK |
| Vérifier | `claude --version` | Numéro de version |
| Lancer | `claude` | Prompt interactif |

Tu as maintenant Claude Code installé et prêt à l'emploi. Dans la prochaine leçon, on va apprendre à lui parler efficacement.
