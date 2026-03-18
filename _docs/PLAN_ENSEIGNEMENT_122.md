# Plan d'enseignement - Cours 122 JavaScript

## Informations

| Élément | Détail |
|---------|--------|
| Période | 21 janvier 2026 → 27 mai 2026 |
| Jour | Mercredi 12:55 - 14:25 |
| Salle | A2-07 |
| Séances | 15 × 2 périodes = 30 périodes |
| Examen blanc | 1 séance (2 périodes) |
| Enseignement | 14 séances = 28 périodes |

### Approche pédagogique

- **En classe** : Théorie, démonstrations, accompagnement, corrections
- **En devoirs** : Exercices Nuxy (autonomie, à leur rythme)
- **Avantage** : Plus de temps pour l'accompagnement individuel en classe

---

## Vue d'ensemble des 15 séances

| Séance | Date | Module | Contenu | Exercices |
|--------|------|--------|---------|-----------|
| 1 | 21.01 | M1 | Variables, types, console | 1.1 - 1.3 |
| 2 | 28.01 | M1-M2 | Strings, conditions début | 1.4 - 1.5, 2.1 - 2.2 |
| 3 | 04.02 | M2-M3 | Conditions fin, tableaux début | 2.3 - 2.4, 3.1 - 3.2 |
| 4 | 11.02 | M3 | Tableaux (filter, map, sort) | 3.3 - 3.5 |
| 5 | 25.02 | M4 | Objets + fetch GET | 4.1 - 4.5 |
| 6 | 04.03 | M5 | Fonctions | 5.1 - 5.4 |
| 7 | 11.03 | M6 | DOM - Sélection | 6.1 - 6.5 |
| 8 | 25.03 | M7 | DOM - Événements | 7.1 - 7.4 |
| 9 | 01.04 | M8 | Formulaires | 8.1 - 8.4 |
| 10 | 22.04 | M9 | Projet : Structure + API | 9.1 - 9.2 |
| 11 | 29.04 | M9 | Projet : Filtrage + Tri | 9.3 - 9.4 |
| 12 | 06.05 | M9 | Projet : Formulaire + Validation | 9.5 |
| 13 | 13.05 | M9 | Projet : Suppression + localStorage | 9.6 - 9.7 |
| 14 | 20.05 | M9 | Projet : Finalisation | 9.8 |
| 15 | 27.05 | - | **EXAMEN BLANC** | - |

### Semaines sans cours
- 18 février (vacances)
- 18 mars (pas de cours)
- 8 et 15 avril (vacances de Pâques)

---

## Séance 1 - Mercredi 21 janvier 2026

### Thème : Introduction à JavaScript

**Durée** : 2 périodes (90 min)

**Support** : Présentation [Introduction à JS](https://slides.com/tirtho/intro-js/)

| Phase | Durée | Activité | Slides |
|-------|-------|----------|--------|
| Accueil | 5 min | Présentation du cours, objectifs, Nuxy | - |
| **Présentation** | 10 min | C'est quoi JavaScript ? Historique, généralités | 1-4 |
| **Présentation** | 10 min | JS côté client : pourquoi ? capacités/limites | 5-7 |
| **Présentation** | 5 min | Écosystème JS, TypeScript | 8-11 |
| **Présentation** | 10 min | Où écrire du JS : console, HTML, fichiers | 12-15 |
| **Démo live** | 10 min | Ouvrir DevTools, premier `console.log("Bonjour!")` | - |
| **Ex 1.1** | 10 min | Exercice console.log sur Nuxy | - |
| *Pause* | 5 min | - | - |
| **Présentation** | 5 min | `"use strict"` et conventions de nommage | 16-19 |
| **Démo live** | 10 min | Variables `let` et `const`, pourquoi pas `var` | - |
| **Ex 1.2** | 10 min | Exercice variables sur Nuxy | - |

**Démos live à préparer** :
```javascript
// Démo 1 : Console
console.log("Bonjour la classe!")
console.log(2 + 3)
console.log("J'ai", 25, "ans")

// Démo 2 : Variables
let age = 25
const nom = "Alice"
console.log(nom, "a", age, "ans")

age = 26  // OK avec let
// nom = "Bob"  // ERREUR avec const !

// Montrer l'erreur avec var (pas de use strict)
// puis avec use strict
```

**Objectifs atteints** :
- [ ] Comprendre ce qu'est JavaScript et son rôle
- [ ] Savoir utiliser la console du navigateur (DevTools)
- [ ] Déclarer des variables avec `let` et `const`

**Ressources** :
- Présentation : https://slides.com/tirtho/intro-js/
- devjs.ch → docs/js/index.md
- devjs.ch → docs/js/variables.md

**Devoir Nuxy** : Exercices 1.1, 1.2, 1.3 (types et typeof)

---

## Séance 2 - Mercredi 28 janvier 2026

### Thème : Strings et début des conditions

**Durée** : 2 périodes (90 min)

| Phase | Durée | Activité |
|-------|-------|----------|
| Retour | 10 min | Questions sur séance 1, correction devoirs |
| Théorie | 10 min | Opérateurs arithmétiques et de concaténation |
| **Ex 1.4** | 15 min | Exercice opérateurs |
| Théorie | 10 min | Méthodes String : length, toUpperCase, includes |
| **Ex 1.5** | 15 min | Exercice Strings |
| Théorie | 15 min | Conditions : if/else, opérateurs de comparaison |
| **Ex 2.1** | 10 min | Exercice condition simple |
| Démo | 5 min | Différence `==` vs `===` (très important !) |

**Objectifs atteints** :
- [ ] Utiliser les opérateurs de base
- [ ] Manipuler les chaînes de caractères
- [ ] Écrire une condition simple

**Ressources** :
- devjs.ch → docs/js/operateurs.md
- devjs.ch → docs/js/conditions.md

**Devoir** : Exercice 2.2 (else if)

---

## Séance 3 - Mercredi 4 février 2026

### Thème : Conditions avancées et tableaux

**Durée** : 2 périodes (90 min)

| Phase | Durée | Activité |
|-------|-------|----------|
| Retour | 10 min | Correction exercice 2.2 |
| Théorie | 10 min | Opérateurs logiques : && et \|\| |
| **Ex 2.3** | 15 min | Exercice opérateurs logiques |
| Théorie | 10 min | L'opérateur ternaire |
| **Ex 2.4** | 10 min | Exercice ternaire |
| Théorie | 15 min | Introduction aux tableaux |
| **Ex 3.1** | 10 min | Exercice création de tableau |
| Démo | 10 min | Parcourir un tableau avec forEach |

**Objectifs atteints** :
- [ ] Combiner des conditions avec && et ||
- [ ] Utiliser l'opérateur ternaire
- [ ] Créer et accéder aux éléments d'un tableau

**Ressources** :
- devjs.ch → docs/js/tableaux.md

**Devoir** : Exercice 3.2 (forEach)

---

## Séance 4 - Mercredi 11 février 2026

### Thème : Méthodes de tableaux

**Durée** : 2 périodes (90 min)

| Phase | Durée | Activité |
|-------|-------|----------|
| Retour | 10 min | Correction exercice 3.2 |
| **Ex 3.2** | 10 min | Finaliser forEach si nécessaire |
| Théorie | 15 min | filter() - Filtrer un tableau |
| **Ex 3.3** | 15 min | Exercice filter |
| Théorie | 15 min | map() et sort() |
| **Ex 3.4** | 15 min | Exercice map |
| **Ex 3.5** | 10 min | Exercice sort |

**Objectifs atteints** :
- [ ] Parcourir avec forEach
- [ ] Filtrer avec filter()
- [ ] Transformer avec map()
- [ ] Trier avec sort()

**Ressources** :
- devjs.ch → docs/js/tableaux.md
- MDN : Array methods

**Point clé** : Ces méthodes seront réutilisées dans le projet final !

---

## Séance 5 - Mercredi 25 février 2026

### Thème : Objets et fetch GET

**Durée** : 2 périodes (90 min)

| Phase | Durée | Activité |
|-------|-------|----------|
| Retour | 5 min | Questions sur les tableaux |
| Théorie | 15 min | Les objets : création, accès aux propriétés |
| **Ex 4.1** | 10 min | Exercice objet simple |
| Théorie | 10 min | Tableaux d'objets |
| **Ex 4.2** | 10 min | Exercice tableau d'objets |
| **Ex 4.3** | 10 min | Exercice filter sur objets |
| Théorie | 15 min | fetch() - Récupérer des données d'une API |
| Démo | 10 min | JSONPlaceholder - API de test |
| **Ex 4.5** | 5 min | Début exercice fetch GET |

**Objectifs atteints** :
- [ ] Créer et manipuler des objets
- [ ] Combiner tableaux et objets
- [ ] Effectuer une requête GET avec fetch()

**Ressources** :
- devjs.ch → docs/js/objets.md
- JSONPlaceholder : https://jsonplaceholder.typicode.com

**Devoir** : Terminer exercice 4.4 et 4.5

---

## Séance 6 - Mercredi 4 mars 2026

### Thème : Fonctions

**Durée** : 2 périodes (90 min)

| Phase | Durée | Activité |
|-------|-------|----------|
| Retour | 10 min | Correction exercices fetch |
| Théorie | 15 min | Fonctions : déclaration, appel |
| **Ex 5.1** | 10 min | Exercice fonction simple |
| Théorie | 10 min | Paramètres et arguments |
| **Ex 5.2** | 10 min | Exercice paramètres |
| Théorie | 10 min | return - Retourner une valeur |
| **Ex 5.3** | 10 min | Exercice return |
| Théorie | 10 min | Arrow functions (=>) |
| **Ex 5.4** | 5 min | Exercice arrow functions |

**Objectifs atteints** :
- [ ] Déclarer et appeler des fonctions
- [ ] Passer des paramètres
- [ ] Retourner des valeurs
- [ ] Utiliser la syntaxe arrow function

**Ressources** :
- devjs.ch → docs/js/fonctions.md

---

## Séance 7 - Mercredi 11 mars 2026

### Thème : DOM - Sélection et modification

**Durée** : 2 périodes (90 min)

| Phase | Durée | Activité |
|-------|-------|----------|
| Retour | 5 min | Rappel : à quoi sert JavaScript dans le navigateur ? |
| Théorie | 15 min | Le DOM : qu'est-ce que c'est ? |
| Théorie | 10 min | querySelector, getElementById |
| **Ex 6.1** | 10 min | Exercice sélection |
| Théorie | 10 min | textContent - Modifier le texte |
| **Ex 6.2** | 10 min | Exercice modifier contenu |
| Théorie | 10 min | style et classList |
| **Ex 6.3** | 10 min | Exercice modifier styles |
| Théorie | 5 min | querySelectorAll |
| **Ex 6.4** | 5 min | Début exercice sélection multiple |

**Objectifs atteints** :
- [ ] Comprendre le DOM
- [ ] Sélectionner des éléments
- [ ] Modifier le contenu texte
- [ ] Modifier les styles et classes

**Ressources** :
- devjs.ch → docs/dom/

**Devoir** : Exercices 6.4 et 6.5 (attributs)

---

## Séance 8 - Mercredi 25 mars 2026

### Thème : DOM - Événements

**Durée** : 2 périodes (90 min)

| Phase | Durée | Activité |
|-------|-------|----------|
| Retour | 10 min | Correction exercices 6.4-6.5 |
| Théorie | 15 min | addEventListener - Écouter les événements |
| **Ex 7.1** | 15 min | Exercice premier clic |
| Théorie | 10 min | L'objet event |
| **Ex 7.2** | 10 min | Exercice event |
| Théorie | 10 min | Événements clavier (keydown, keyup) |
| **Ex 7.3** | 10 min | Exercice clavier |
| Théorie | 5 min | Autres événements (mouseover, etc.) |
| **Ex 7.4** | 5 min | Début exercice événements multiples |

**Objectifs atteints** :
- [ ] Ajouter des écouteurs d'événements
- [ ] Utiliser l'objet event
- [ ] Gérer différents types d'événements

**Ressources** :
- devjs.ch → docs/dom/evenements.md

**Devoir** : Terminer exercice 7.4

---

## Séance 9 - Mercredi 1er avril 2026

### Thème : Formulaires HTML

**Durée** : 2 périodes (90 min)

| Phase | Durée | Activité |
|-------|-------|----------|
| Retour | 5 min | Questions sur les événements |
| Théorie | 15 min | Structure d'un formulaire HTML |
| Démo | 10 min | Les différents types d'input |
| **Ex 8.1** | 10 min | Exercice champs texte |
| Théorie | 10 min | Récupérer les valeurs (.value) |
| **Ex 8.2** | 10 min | Exercice récupération |
| Théorie | 15 min | Validation : required, pattern, contraintes |
| **Ex 8.3** | 10 min | Exercice validation HTML |
| **Ex 8.4** | 5 min | Début validation JavaScript |

**Objectifs atteints** :
- [ ] Créer un formulaire HTML complet
- [ ] Récupérer les valeurs des champs
- [ ] Valider avec HTML5 et JavaScript

**Ressources** :
- devjs.ch → docs/formulaires/

**Devoir** : Terminer exercice 8.4

---

## Séance 10 - Mercredi 22 avril 2026

### Thème : Projet - Structure et chargement API

**Durée** : 2 périodes (90 min)

| Phase | Durée | Activité |
|-------|-------|----------|
| Présentation | 15 min | Présentation du projet final "Gestionnaire de ressources" |
| Mise en place | 10 min | Création de la structure HTML/CSS/JS |
| **Ex 9.1** | 25 min | Charger les données depuis l'API |
| Pause | 5 min | - |
| **Ex 9.2** | 30 min | Afficher la liste dynamiquement |
| Synthèse | 5 min | Récapitulatif, prochaines étapes |

**Objectifs atteints** :
- [ ] Structurer un projet JS
- [ ] Charger des données depuis une API
- [ ] Afficher des données dynamiquement (createElement)

**API utilisée** : JSONPlaceholder (posts)

---

## Séance 11 - Mercredi 29 avril 2026

### Thème : Projet - Filtrage et tri

**Durée** : 2 périodes (90 min)

| Phase | Durée | Activité |
|-------|-------|----------|
| Retour | 10 min | Où en sommes-nous ? Questions ? |
| **Ex 9.3** | 35 min | Implémenter la recherche/filtrage |
| Pause | 5 min | - |
| **Ex 9.4** | 35 min | Implémenter le tri (titre, note) |
| Synthèse | 5 min | Test complet filtrage + tri |

**Objectifs atteints** :
- [ ] Filtrer une liste en temps réel
- [ ] Trier par différents critères

---

## Séance 12 - Mercredi 6 mai 2026

### Thème : Projet - Formulaire d'ajout

**Durée** : 2 périodes (90 min)

| Phase | Durée | Activité |
|-------|-------|----------|
| Retour | 5 min | Questions sur filtrage/tri |
| Théorie | 10 min | Rappel validation de formulaire |
| **Ex 9.5** | 70 min | Implémenter le formulaire d'ajout avec validation complète |
| Synthèse | 5 min | Test ajout + affichage |

**Objectifs atteints** :
- [ ] Créer un formulaire d'ajout
- [ ] Valider les données
- [ ] Ajouter une ressource à la liste

---

## Séance 13 - Mercredi 13 mai 2026

### Thème : Projet - Suppression et localStorage

**Durée** : 2 périodes (90 min)

| Phase | Durée | Activité |
|-------|-------|----------|
| Retour | 5 min | État du projet |
| **Ex 9.6** | 30 min | Implémenter la suppression |
| Théorie | 10 min | localStorage : setItem, getItem, JSON |
| **Ex 9.7** | 40 min | Implémenter la persistance |
| Synthèse | 5 min | Test complet avec rechargement |

**Objectifs atteints** :
- [ ] Supprimer des éléments
- [ ] Persister les données localement
- [ ] Fusionner données API + locales

---

## Séance 14 - Mercredi 20 mai 2026

### Thème : Projet - Finalisation

**Durée** : 2 périodes (90 min)

| Phase | Durée | Activité |
|-------|-------|----------|
| **Ex 9.8** | 45 min | Finalisation : styles, gestion erreurs, UX |
| Améliorations | 30 min | Fonctionnalités bonus (selon avancement) |
| Présentation | 15 min | Tour de table : montrer son projet |

**Objectifs atteints** :
- [ ] Application complète et fonctionnelle
- [ ] Tous les objectifs du cours couverts

**Bonus possibles** :
- Confirmation avant suppression
- Édition d'une ressource
- Statistiques (nombre, moyenne)

---

## Séance 15 - Mercredi 27 mai 2026

### EXAMEN BLANC

**Durée** : 2 périodes (90 min)

| Phase | Durée | Activité |
|-------|-------|----------|
| Instructions | 5 min | Consignes, format de l'examen |
| Examen | 75 min | Questions type épreuve de module |
| Fin | 10 min | Ramassage, annonce correction |

**Format** :
- Questions théoriques (QCM, vrai/faux)
- Lecture et analyse de code
- Écriture de code (exercices pratiques)
- Couvre tous les modules 1-9

---

> **Note** : L'épreuve de module officielle sera planifiée ultérieurement par l'école.

---

## Récapitulatif des objectifs par module

| Objectif officiel | Module(s) |
|-------------------|-----------|
| Enjeux de la programmation navigateur | M1, M6 |
| Syntaxe de base du langage | M1-M5 |
| Manipuler dynamiquement les éléments (DOM) | M6-M7 |
| Créer et manipuler les formulaires | M8, M9 |
| Contrôle de la qualité des données | M8, M9 |
| Gérer les interactions utilisateur | M7, M9 |
| Gérer les erreurs | M8, M9 |
| Consommer une API (CRUD) | M4, M9 |

---

## Ressources pour les élèves

| Ressource | Usage |
|-----------|-------|
| **Nuxy** | Exercices interactifs |
| **devjs.ch** | Théorie et exemples |
| **MDN Web Docs** | Référence officielle |
| **JSONPlaceholder** | API de test |

---

## Notes pour l'enseignant

### Organisation classe / devoirs

| En classe | En devoirs (Nuxy) |
|-----------|-------------------|
| Théorie et démonstrations | Exercices de pratique |
| Correction collective | Consolidation des acquis |
| Accompagnement individuel | Préparation séance suivante |
| Exercices complexes guidés | Exercices simples en autonomie |

**Cycle typique d'une séance :**
1. Retour sur les devoirs (10 min) - questions, difficultés rencontrées
2. Nouvelle théorie + démo (20-30 min)
3. Exercice guidé ensemble (15-20 min)
4. Travail autonome avec accompagnement (20-30 min)
5. Annonce des devoirs Nuxy (5 min)

### Flexibilité
- Les durées sont indicatives
- Adapter selon le rythme de la classe
- Si les élèves avancent bien sur Nuxy, plus de temps pour approfondir en classe

### Points de vigilance
1. **Séance 5** (fetch) : Concept clé, prendre le temps
2. **Séance 7** (DOM) : Transition importante, bien expliquer
3. **Séances 10-14** (projet) : Accompagnement individuel nécessaire

### Plan B si retard
- Les élèves rattrapent sur Nuxy à la maison
- Simplifier l'exercice 9.7 (localStorage seul, sans fusion API)
- Utiliser une séance supplémentaire si disponible

### Plan B si avance
- Exercices bonus du Module 9
- Introduction à async/await
- Exercice POST sur l'API
