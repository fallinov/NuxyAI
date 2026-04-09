# Ton & Voix (Style Duolingo)

## Principes fondamentaux

Le site utilise un **ton inspiré de Duolingo** : amical, encourageant, et accessible. L'objectif est de rendre l'apprentissage du code moins intimidant.

| Principe | Description |
|----------|-------------|
| **Tutoiement** | Toujours "tu", jamais "vous" |
| **Phrases courtes** | Direct et punchy, pas de blabla |
| **Encourageant** | Positif, célèbre les petites victoires |
| **Humour léger** | Touches d'humour sans en faire trop |
| **Non-intimidant** | Pas de jargon, on explique simplement |

## Exemples de transformation

| Formel | Duolingo |
|--------|----------|
| "Apprenez JavaScript en pratiquant" | "Apprends JavaScript en codant" |
| "Connectez-vous pour sauvegarder votre progression" | "Connecte-toi pour retrouver ta progression" |
| "Commencer gratuitement" | "C'est parti !" |
| "Trois étapes simples pour progresser" | "3 étapes. C'est tout." |
| "Erreur de connexion" | "Oups, ça n'a pas marché" |
| "Votre avancement est enregistré" | "On se souvient où tu en étais" |
| "Bienvenue !" | "Hey, te revoilà !" |
| "Une erreur est survenue" | "Vérifie tes infos et réessaie" |

## Vocabulaire préféré

| Éviter | Préférer |
|--------|----------|
| Utilisateur | Toi, tu |
| Effectuer | Faire |
| Valider | Checker, vérifier |
| Soumettre | Envoyer |
| Inscription | Créer ton compte |
| Se connecter | Te connecter |
| Erreur survenue | Oups, y'a un souci |
| Fonctionnalité | Truc cool |
| Paramètres | Réglages |

## Toasts et messages système

```typescript
// Bon ton
toast.add({
  title: 'Hey, te revoilà !',
  description: 'Prêt à coder ?',
  color: 'success'
})

toast.add({
  title: 'Oups, ça n\'a pas marché',
  description: 'Vérifie tes identifiants et réessaie',
  color: 'error'
})

// Ton à éviter
toast.add({
  title: 'Bienvenue',
  description: 'Vous êtes maintenant connecté.',
  color: 'success'
})
```

## Messages dans les leçons

Les textes des leçons doivent être :
- **Rassurantes** : "Pas de panique, c'est normal de se tromper"
- **Explicatives** : "Voici ce qui s'est passé..."
- **Actionnables** : "Essaie plutôt..."

## Labels et boutons

| Contexte | Texte |
|----------|-------|
| CTA principal | "C'est parti !" |
| Connexion | "Te connecter" |
| Inscription | "Créer ton compte" |
| Retour | "Retour" |
| Continuer | "Continuer" |
| Leçon lue | "J'ai compris" |
| Réessayer | "On réessaie !" |
