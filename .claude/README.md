# Configuration Claude Code pour Nuxy

Ce dossier contient les configurations et commandes personnalisées pour Claude Code.

## 📁 Structure

```
.claude/
├── README.md          # Ce fichier
└── commands/          # Commandes slash personnalisées
    ├── test.md        # /test - Exécuter les tests
    ├── build.md       # /build - Générer le build
    ├── dev.md         # /dev - Lancer le serveur dev
    ├── review.md      # /review - Réviser les changements
    └── pedagogical.md # /pedagogical - Analyser les messages pédagogiques
```

## 🎯 Commandes disponibles

### `/test`
Exécute les tests automatisés de la console pédagogique (23 tests).

**Utilisation** : Tape `/test` dans Claude Code

### `/build`
Génère le build statique du projet pour déploiement.

**Utilisation** : Tape `/build` dans Claude Code

### `/dev`
Lance le serveur de développement Nuxt avec hot-reload.

**Utilisation** : Tape `/dev` dans Claude Code

### `/review`
Analyse les derniers changements du code et fournit un résumé.

**Utilisation** : Tape `/review` dans Claude Code

### `/pedagogical`
Analyse et améliore les messages pédagogiques pour débutants.

**Utilisation** : Tape `/pedagogical` dans Claude Code

## 📝 Créer une nouvelle commande

Pour créer une nouvelle commande slash :

1. Créer un fichier `.md` dans le dossier `commands/`
2. Ajouter un front matter avec la description :
   ```markdown
   ---
   description: Description de la commande
   ---
   ```
3. Écrire les instructions pour Claude
4. La commande sera disponible avec `/nom-du-fichier`

### Exemple

Fichier : `.claude/commands/deploy.md`
```markdown
---
description: Déploie l'application sur GitHub Pages
---

Génère le build et déploie sur GitHub Pages.

Exécute les commandes suivantes :
1. npm run generate
2. git add .output/public
3. git commit -m "deploy: Update GitHub Pages"
4. git push
```

Utilisation : `/deploy`

## 🔗 Documentation

- [Claude Code Documentation](https://docs.anthropic.com/claude/docs)
- [Nuxy CLAUDE.md](../CLAUDE.md) - Documentation complète du projet
