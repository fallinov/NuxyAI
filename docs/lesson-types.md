# Types de leçons et création

## Types disponibles

| Type | Description | Validation |
|------|-------------|------------|
| `guide` | Lecture seule | Bouton "J'ai compris" |
| `exercise` | Exercice pratique | Checklist d'items à cocher |
| `quiz` | QCM | Score >= 70% pour valider |
| `project` | Projet | Validation par l'enseignant |

## Création d'une leçon

### Frontmatter

Créer un fichier `content/lessons/[slug].md` :

```yaml
---
title: "Titre de la leçon"
description: "Description courte"
phase: 1                # Phase (1 ou 2)
module: 1               # Module (1-7)
lessonNumber: "1.1"     # Numéro (sert au tri)
duration: 15            # Durée estimée en minutes
difficulty: beginner    # beginner | intermediate | advanced
type: guide             # guide | exercise | quiz | project
tags:
  - ia
  - introduction
concepts:
  - Concept 1
  - Concept 2
objectives:
  - Objectif d'apprentissage 1
  - Objectif d'apprentissage 2

# Pour type: exercise -- items de la checklist (objets {id, label})
checklist:
  - id: step-1
    label: "Étape 1 à réaliser"
  - id: step-2
    label: "Étape 2 à réaliser"

# Pour type: quiz -- questions QCM
quiz:
  - question: "Question ?"
    options:
      - "Réponse A"
      - "Réponse B"
      - "Réponse C"
    correct: 0           # Index de la bonne réponse (0-based)
    explanation: "Explication de la bonne réponse"
---

# Contenu Markdown de la leçon

Texte en Markdown classique avec les composants MDC disponibles.
```

### Commandes terminal

Utiliser des blocs de code standard markdown (pas de composant MDC) :

````markdown
```bash
npm install something
```
````

Nuxt Content ajoute automatiquement la coloration syntaxique Shiki et un bouton "Copier".

### Composant MDC : conversations IA

Pour les exemples d'échanges avec Claude Code, utiliser le composant `::ai-conversation` avec la prop `messages` en YAML :

```markdown
::ai-conversation
---
messages:
  - role: user
    content: "Comment faire X ?"
  - role: assistant
    content: "Tu peux faire Y..."
---
::
```

### Numérotation des leçons

**Format** : `[module].[numéro dans le module]` (ex: `2.3` pour module 2, leçon 3)

- Le champ `lessonNumber` est la **seule source de tri** des leçons
- Les leçons sont triées automatiquement par `lessonNumber`
- Lors de l'ajout d'une leçon, s'assurer que `lessonNumber` est unique et suit la séquence du module
