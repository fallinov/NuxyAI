# Plan des exercices - Cours 122 JavaScript

## Informations générales

- **Cours** : 122 - Programmation du client web
- **Durée** : ~30 périodes (15 semaines × 2h)
- **Public** : ESIG1 (débutants)
- **Objectif final** : Page avec liste triable/filtrable (données API) + formulaire d'ajout avec validation

---

## Vue d'ensemble

| Module | Titre | Exercices | Périodes |
|--------|-------|-----------|----------|
| 1 | Bases JavaScript | 5 | 3 |
| 2 | Conditions | 4 | 2-3 |
| 3 | Tableaux | 5 | 3 |
| 4 | Objets + fetch GET | 5 | 3 |
| 5 | Fonctions | 4 | 2-3 |
| 6 | DOM - Sélection | 5 | 3 |
| 7 | DOM - Événements | 4 | 3 |
| 8 | Formulaires | 4 | 3 |
| 9 | Projet intégrateur | 8 | 8-10 |
| **Total** | | **44** | **~30** |

---

## Module 1 : Bases JavaScript (3 périodes)

### Objectifs
- Comprendre console.log()
- Déclarer des variables avec let et const
- Connaître les types primitifs
- Utiliser les opérateurs de base
- Manipuler les chaînes de caractères (String)

### Exercices

#### 1.1 Hello JavaScript ! ✅ (existe déjà)
**Concept** : Premier contact avec console.log()
```javascript
// Afficher "Hello JavaScript!" dans la console
console.log("Hello JavaScript!")
```

#### 1.2 Variables et déclarations ✅ (existe déjà)
**Concept** : let et const
```javascript
// Créer une variable nom avec let
// Créer une constante age avec const
let nom = "Alice"
const age = 25
console.log(nom, age)
```

#### 1.3 Types de données ✅ (existe déjà)
**Concept** : String, Number, Boolean
```javascript
// Créer une variable de chaque type
let texte = "Bonjour"      // string
let nombre = 42            // number
let actif = true           // boolean
console.log(typeof texte, typeof nombre, typeof actif)
```

#### 1.4 Opérations mathématiques ✅ (existe déjà)
**Concept** : Opérateurs +, -, *, /, %
```javascript
let a = 10
let b = 3
console.log(a + b)  // 13
console.log(a % b)  // 1 (modulo)
```

#### 1.5 Manipuler du texte (String)
**Concept** : Méthodes de chaînes de caractères
```javascript
let prenom = "alice"
let nom = "DUPONT"

// Mettre en majuscules / minuscules
console.log(prenom.toUpperCase())  // "ALICE"
console.log(nom.toLowerCase())     // "dupont"

// Longueur d'une chaîne
console.log(prenom.length)  // 5

// Extraire une partie (slice)
let message = "Bonjour tout le monde"
console.log(message.slice(0, 7))  // "Bonjour"

// Rechercher dans une chaîne
console.log(message.includes("tout"))  // true

// Remplacer du texte
console.log(message.replace("monde", "class"))  // "Bonjour tout le class"
```
**Tâche** : Créer un programme qui formate un nom complet (prénom en minuscules avec majuscule initiale, nom en majuscules)

---

## Module 2 : Conditions (2-3 périodes)

### Objectifs
- Utiliser if/else
- Comprendre les opérateurs de comparaison
- Utiliser les opérateurs logiques (&&, ||, !)

### Exercices

#### 2.1 Ma première condition
**Concept** : if/else basique
```javascript
let age = 18
if (age >= 18) {
  console.log("Majeur")
} else {
  console.log("Mineur")
}
```
**Tâche** : Vérifier si un nombre est positif, négatif ou zéro

#### 2.2 Comparaisons
**Concept** : ==, ===, !=, !==, <, >, <=, >=
```javascript
let a = "5"
let b = 5
console.log(a == b)   // true (comparaison lâche)
console.log(a === b)  // false (comparaison stricte)
```
**Tâche** : Comparer deux notes et afficher la meilleure

#### 2.3 Opérateurs logiques
**Concept** : && (ET), || (OU), ! (NON)
```javascript
let age = 25
let permis = true
if (age >= 18 && permis) {
  console.log("Peut conduire")
}
```
**Tâche** : Vérifier si une personne peut voter (18+ ET citoyen)

#### 2.4 Conditions imbriquées
**Concept** : else if, conditions multiples
```javascript
let note = 75
if (note >= 90) {
  console.log("Excellent")
} else if (note >= 70) {
  console.log("Bien")
} else if (note >= 50) {
  console.log("Suffisant")
} else {
  console.log("Insuffisant")
}
```
**Tâche** : Calculer le prix d'un billet selon l'âge (enfant/adulte/senior)

---

## Module 3 : Tableaux (3 périodes)

### Objectifs
- Créer et manipuler des tableaux
- Utiliser les méthodes push, pop, length
- Parcourir un tableau avec for et forEach
- Découvrir filter et sort

### Exercices

#### 3.1 Créer un tableau
**Concept** : Déclaration, accès par index
```javascript
let fruits = ["pomme", "banane", "orange"]
console.log(fruits[0])      // "pomme"
console.log(fruits.length)  // 3
```
**Tâche** : Créer un tableau de 5 prénoms et afficher le 3ème

#### 3.2 Modifier un tableau
**Concept** : push, pop, modification par index
```javascript
let liste = [1, 2, 3]
liste.push(4)        // Ajouter à la fin
liste.pop()          // Retirer le dernier
liste[0] = 10        // Modifier le premier
```
**Tâche** : Gérer une liste de tâches (ajouter, retirer)

#### 3.3 Parcourir un tableau
**Concept** : for classique, forEach
```javascript
let nombres = [1, 2, 3, 4, 5]

// Méthode for
for (let i = 0; i < nombres.length; i++) {
  console.log(nombres[i])
}

// Méthode forEach
nombres.forEach(function(nombre) {
  console.log(nombre)
})
```
**Tâche** : Afficher tous les éléments d'un tableau de courses

#### 3.4 Filtrer un tableau
**Concept** : filter()
```javascript
let nombres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
let pairs = nombres.filter(function(n) {
  return n % 2 === 0
})
console.log(pairs) // [2, 4, 6, 8, 10]
```
**Tâche** : Filtrer une liste de notes pour garder celles >= 4

#### 3.5 Trier un tableau
**Concept** : sort()
```javascript
let noms = ["Zoé", "Alice", "Marc"]
noms.sort() // Tri alphabétique
console.log(noms) // ["Alice", "Marc", "Zoé"]

let ages = [25, 18, 32, 21]
ages.sort((a, b) => a - b) // Tri numérique croissant
```
**Tâche** : Trier une liste de produits par prix

---

## Module 4 : Objets + fetch GET (3 périodes)

### Objectifs
- Créer des objets avec propriétés
- Accéder et modifier les propriétés
- Manipuler des tableaux d'objets
- Récupérer des données depuis une API (fetch GET)
- Comprendre le format JSON

### Exercices

#### 4.1 Mon premier objet
**Concept** : Création, accès aux propriétés
```javascript
let personne = {
  nom: "Alice",
  age: 25,
  ville: "Genève"
}
console.log(personne.nom)     // "Alice"
console.log(personne["age"])  // 25
```
**Tâche** : Créer un objet "livre" avec titre, auteur, pages

#### 4.2 Modifier un objet
**Concept** : Modification, ajout de propriétés
```javascript
let voiture = {
  marque: "Toyota",
  annee: 2020
}
voiture.couleur = "rouge"  // Ajouter
voiture.annee = 2021       // Modifier
```
**Tâche** : Créer un profil utilisateur et le mettre à jour

#### 4.3 Tableau d'objets
**Concept** : Combiner tableaux et objets
```javascript
let produits = [
  { nom: "Laptop", prix: 999 },
  { nom: "Souris", prix: 29 },
  { nom: "Clavier", prix: 79 }
]
console.log(produits[0].nom) // "Laptop"
```
**Tâche** : Créer une liste de 3 films (titre, année, note)

#### 4.4 Filtrer des objets
**Concept** : filter() sur tableaux d'objets
```javascript
let produits = [
  { nom: "A", prix: 50 },
  { nom: "B", prix: 150 },
  { nom: "C", prix: 80 }
]
let chers = produits.filter(p => p.prix > 100)
```
**Tâche** : Filtrer une liste d'étudiants par note minimale

#### 4.5 Récupérer des données (fetch GET)
**Concept** : fetch(), Promises, JSON
```javascript
// Récupérer des données depuis une API
fetch("https://jsonplaceholder.typicode.com/users")
  .then(response => response.json())  // Convertir en objet JS
  .then(utilisateurs => {
    // utilisateurs est un tableau d'objets !
    console.log(utilisateurs)
    console.log(utilisateurs.length)      // 10
    console.log(utilisateurs[0].name)     // "Leanne Graham"
    console.log(utilisateurs[0].email)    // "Sincere@april.biz"
  })

// Afficher uniquement certaines propriétés
fetch("https://jsonplaceholder.typicode.com/posts")
  .then(response => response.json())
  .then(posts => {
    // Afficher les 5 premiers titres
    posts.slice(0, 5).forEach(post => {
      console.log(post.title)
    })
  })
```
**Concepts clés** :
- `fetch(url)` : Envoie une requête HTTP GET
- `.then()` : Exécute du code quand la réponse arrive
- `.json()` : Convertit la réponse en objet/tableau JavaScript
- Les API retournent souvent des **tableaux d'objets**

**APIs utiles pour s'entraîner** :
- `https://jsonplaceholder.typicode.com/users` (10 utilisateurs)
- `https://jsonplaceholder.typicode.com/posts` (100 posts)
- `https://pokeapi.co/api/v2/pokemon?limit=20` (20 Pokémon)

**Tâche** : Récupérer la liste des utilisateurs et afficher leur nom et ville

---

## Module 5 : Fonctions (2-3 périodes)

### Objectifs
- Déclarer et appeler des fonctions
- Utiliser paramètres et return
- Comprendre les fonctions fléchées

### Exercices

#### 5.1 Ma première fonction
**Concept** : Déclaration, appel
```javascript
function direBonjour() {
  console.log("Bonjour!")
}
direBonjour() // Appel
```
**Tâche** : Créer une fonction qui affiche ton prénom

#### 5.2 Paramètres
**Concept** : Passer des valeurs à une fonction
```javascript
function saluer(nom) {
  console.log("Bonjour " + nom + "!")
}
saluer("Alice") // "Bonjour Alice!"
```
**Tâche** : Fonction qui calcule le double d'un nombre

#### 5.3 Retourner une valeur
**Concept** : return
```javascript
function additionner(a, b) {
  return a + b
}
let resultat = additionner(5, 3)
console.log(resultat) // 8
```
**Tâche** : Fonction qui calcule le prix TTC (prix × 1.077)

#### 5.4 Fonctions fléchées
**Concept** : Syntaxe arrow function
```javascript
// Fonction classique
function carre(x) {
  return x * x
}

// Fonction fléchée
const carre = (x) => x * x

// Avec plusieurs lignes
const calculer = (a, b) => {
  let somme = a + b
  return somme * 2
}
```
**Tâche** : Réécrire les fonctions précédentes en arrow functions

---

## Module 6 : DOM - Sélection (3 périodes)

### Objectifs
- Sélectionner des éléments HTML
- Modifier le contenu (textContent)
- Modifier les styles et classes CSS
- Modifier les attributs (src, href, disabled, etc.)

### Exercices

#### 6.1 Sélectionner un élément
**Concept** : querySelector, getElementById
```javascript
// HTML: <h1 id="titre">Bienvenue</h1>
let titre = document.querySelector("#titre")
let titre2 = document.getElementById("titre")
console.log(titre.textContent) // "Bienvenue"
```
**Tâche** : Sélectionner et afficher le contenu d'un paragraphe

#### 6.2 Modifier le contenu
**Concept** : textContent (sécurisé)
```javascript
let element = document.querySelector("#message")
element.textContent = "Nouveau texte"
```
**Note** : Pour afficher du HTML, utiliser des méthodes sécurisées (voir Module 9)
**Tâche** : Changer le titre de la page en "Ma page JS"

#### 6.3 Modifier les styles
**Concept** : style, classList
```javascript
let boite = document.querySelector(".boite")
boite.style.backgroundColor = "blue"
boite.style.padding = "20px"

boite.classList.add("active")
boite.classList.remove("hidden")
boite.classList.toggle("visible")
```
**Tâche** : Changer la couleur d'un élément et ajouter une classe

#### 6.4 Sélectionner plusieurs éléments
**Concept** : querySelectorAll, forEach
```javascript
let items = document.querySelectorAll(".item")
items.forEach(item => {
  item.style.color = "red"
})
```
**Tâche** : Changer le style de tous les liens de la page

#### 6.5 Modifier les attributs
**Concept** : getAttribute, setAttribute, attributs directs
```javascript
// HTML: <img id="photo" src="chat.jpg" alt="Un chat">
let image = document.querySelector("#photo")

// Lire un attribut
console.log(image.src)              // URL complète
console.log(image.getAttribute("alt"))  // "Un chat"

// Modifier un attribut
image.src = "chien.jpg"
image.setAttribute("alt", "Un chien")

// Attributs booléens
let bouton = document.querySelector("#monBouton")
bouton.disabled = true   // Désactiver le bouton

// Supprimer un attribut
image.removeAttribute("alt")
```
**Tâche** : Créer une galerie simple où cliquer sur une miniature change l'image principale (modifier l'attribut `src`)

---

## Module 7 : DOM - Événements (3 périodes)

### Objectifs
- Écouter les événements utilisateur
- Utiliser addEventListener
- Manipuler l'objet event

### Exercices

#### 7.1 Premier événement click
**Concept** : addEventListener("click")
```javascript
let bouton = document.querySelector("#monBouton")
bouton.addEventListener("click", function() {
  console.log("Bouton cliqué!")
})
```
**Tâche** : Au clic sur un bouton, afficher "Cliqué!" dans un paragraphe

#### 7.2 L'objet event
**Concept** : Accéder aux infos de l'événement
```javascript
document.addEventListener("click", function(event) {
  console.log("Position X:", event.clientX)
  console.log("Position Y:", event.clientY)
  console.log("Élément cliqué:", event.target)
})
```
**Tâche** : Afficher la position de chaque clic sur la page

#### 7.3 Événement input
**Concept** : Réagir à la saisie en temps réel
```javascript
let champ = document.querySelector("#recherche")
champ.addEventListener("input", function(event) {
  console.log("Texte saisi:", event.target.value)
})
```
**Tâche** : Afficher en temps réel ce que l'utilisateur tape

#### 7.4 Compteur interactif
**Concept** : Combiner événements et DOM
```javascript
let compteur = 0
let affichage = document.querySelector("#compteur")
let btnPlus = document.querySelector("#plus")
let btnMoins = document.querySelector("#moins")

btnPlus.addEventListener("click", () => {
  compteur++
  affichage.textContent = compteur
})
```
**Tâche** : Créer un compteur avec boutons +1 et -1

---

## Module 8 : Formulaires (3 périodes)

### Objectifs
- Récupérer les valeurs des champs
- Valider les saisies utilisateur
- Empêcher l'envoi avec preventDefault

### Exercices

#### 8.1 Récupérer les valeurs
**Concept** : .value sur les inputs
```javascript
let form = document.querySelector("#monForm")
form.addEventListener("submit", function(event) {
  event.preventDefault() // Empêcher le rechargement

  let nom = document.querySelector("#nom").value
  let email = document.querySelector("#email").value
  console.log(nom, email)
})
```
**Tâche** : Afficher les valeurs d'un formulaire nom/prénom

#### 8.2 Validation simple
**Concept** : Vérifier les champs obligatoires
```javascript
form.addEventListener("submit", function(event) {
  event.preventDefault()

  let nom = document.querySelector("#nom").value

  if (nom === "") {
    alert("Le nom est obligatoire!")
    return
  }

  console.log("Formulaire valide!")
})
```
**Tâche** : Valider que tous les champs sont remplis

#### 8.3 Validation de type
**Concept** : Vérifier le format des données
```javascript
let age = document.querySelector("#age").value

// Vérifier si c'est un nombre
if (isNaN(age) || age === "") {
  console.log("Veuillez entrer un nombre valide")
  return
}

// Vérifier la plage
let ageNum = parseInt(age)
if (ageNum < 0 || ageNum > 120) {
  console.log("Âge invalide")
  return
}
```
**Tâche** : Valider un champ âge (nombre entre 1 et 120)

#### 8.4 Messages d'erreur visuels
**Concept** : Afficher les erreurs dans la page
```javascript
let erreurDiv = document.querySelector("#erreur")

function afficherErreur(message) {
  erreurDiv.textContent = message
  erreurDiv.classList.remove("hidden")
}

function masquerErreur() {
  erreurDiv.classList.add("hidden")
}
```
**Tâche** : Afficher les erreurs sous chaque champ invalide

---

## Module 9 : Projet intégrateur (8-10 périodes)

### Objectif
Créer une application "Gestionnaire de ressources" avec :
- **Chargement des données depuis une API (fetch)**
- Liste de ressources affichée dynamiquement
- Recherche/filtrage par texte
- Tri par différents critères
- Formulaire d'ajout avec validation
- **Suppression d'éléments**
- **Persistance des ajouts locaux (localStorage)**

### Structure du projet

```
projet/
├── index.html
├── style.css
└── app.js
```

### Exercices guidés

#### 9.1 Structure HTML et chargement depuis l'API
**Objectif** : Préparer la structure et charger les données depuis une API
```javascript
// Variable pour stocker les ressources
let ressources = []

// Charger les données depuis l'API au démarrage
function chargerDepuisAPI() {
  fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
    .then(response => response.json())
    .then(donnees => {
      // Transformer les données de l'API dans notre format
      ressources = donnees.map(post => ({
        id: post.id,
        titre: post.title.substring(0, 30) + "...",
        type: "article",
        note: Math.floor(Math.random() * 5) + 1
      }))
      afficherRessources(ressources)
    })
}

// Appeler au chargement de la page
chargerDepuisAPI()
```
**Concepts** : fetch() pour récupérer, .map() pour transformer les données
**Tâche** : Créer le HTML de base et charger les données depuis l'API

#### 9.2 Afficher la liste (méthode sécurisée)
**Objectif** : Générer le HTML à partir des données de manière sécurisée
```javascript
function afficherRessources(liste) {
  let container = document.querySelector("#liste")
  container.replaceChildren() // Vider proprement

  liste.forEach(ressource => {
    // Créer les éléments de manière sécurisée
    let div = document.createElement("div")
    div.className = "ressource"

    let h3 = document.createElement("h3")
    h3.textContent = ressource.titre

    let spanType = document.createElement("span")
    spanType.textContent = ressource.type

    let spanNote = document.createElement("span")
    spanNote.textContent = "Note: " + ressource.note + "/5"

    div.append(h3, spanType, spanNote)
    container.appendChild(div)
  })
}

afficherRessources(ressources)
```
**Tâche** : Implémenter l'affichage de la liste

#### 9.3 Filtrer par recherche
**Objectif** : Filtrer en temps réel selon la saisie
```javascript
let champRecherche = document.querySelector("#recherche")

champRecherche.addEventListener("input", function(event) {
  let terme = event.target.value.toLowerCase()

  let resultats = ressources.filter(r =>
    r.titre.toLowerCase().includes(terme)
  )

  afficherRessources(resultats)
})
```
**Tâche** : Implémenter la recherche textuelle

#### 9.4 Trier la liste
**Objectif** : Permettre le tri par différents critères
```javascript
let selectTri = document.querySelector("#tri")

selectTri.addEventListener("change", function(event) {
  let critere = event.target.value
  let listeTrie = [...ressources] // Copie du tableau

  if (critere === "titre") {
    listeTrie.sort((a, b) => a.titre.localeCompare(b.titre))
  } else if (critere === "note") {
    listeTrie.sort((a, b) => b.note - a.note)
  }

  afficherRessources(listeTrie)
})
```
**Tâche** : Implémenter le tri par titre et par note

#### 9.5 Formulaire d'ajout avec validation
**Objectif** : Ajouter des ressources avec validation
```javascript
let formAjout = document.querySelector("#formAjout")

formAjout.addEventListener("submit", function(event) {
  event.preventDefault()

  let titre = document.querySelector("#titre").value.trim()
  let type = document.querySelector("#type").value
  let note = document.querySelector("#note").value

  // Validation
  let erreurs = []

  if (titre === "") {
    erreurs.push("Le titre est obligatoire")
  }

  if (type === "") {
    erreurs.push("Le type est obligatoire")
  }

  if (isNaN(note) || note < 1 || note > 5) {
    erreurs.push("La note doit être entre 1 et 5")
  }

  if (erreurs.length > 0) {
    afficherErreurs(erreurs)
    return
  }

  // Ajouter la ressource
  let nouvelleRessource = {
    id: Date.now(),
    titre: titre,
    type: type,
    note: parseInt(note)
  }

  ressources.push(nouvelleRessource)
  afficherRessources(ressources)
  formAjout.reset()
})
```
**Tâche** : Implémenter le formulaire complet avec validation

#### 9.6 Supprimer une ressource
**Objectif** : Permettre la suppression d'éléments de la liste
```javascript
// Modifier afficherRessources pour ajouter un bouton supprimer
function afficherRessources(liste) {
  let container = document.querySelector("#liste")
  container.replaceChildren()

  liste.forEach(ressource => {
    let div = document.createElement("div")
    div.className = "ressource"

    let h3 = document.createElement("h3")
    h3.textContent = ressource.titre

    // Bouton supprimer
    let btnSupprimer = document.createElement("button")
    btnSupprimer.textContent = "Supprimer"
    btnSupprimer.addEventListener("click", () => {
      supprimerRessource(ressource.id)
    })

    div.append(h3, btnSupprimer)
    container.appendChild(div)
  })
}

// Fonction de suppression
function supprimerRessource(id) {
  // Filtrer pour garder toutes les ressources SAUF celle avec cet id
  ressources = ressources.filter(r => r.id !== id)
  afficherRessources(ressources)
}
```
**Tâche** : Ajouter un bouton de suppression à chaque ressource

#### 9.7 Sauvegarder avec localStorage
**Objectif** : Persister les ajouts locaux et fusionner avec l'API
```javascript
// Clés pour le localStorage
const CLE_AJOUTS = "mesAjouts"
const CLE_SUPPRESSIONS = "mesSuppressions"

// Sauvegarder les ajouts locaux
function sauvegarderAjouts(ajouts) {
  localStorage.setItem(CLE_AJOUTS, JSON.stringify(ajouts))
}

// Sauvegarder les IDs supprimés
function sauvegarderSuppressions(ids) {
  localStorage.setItem(CLE_SUPPRESSIONS, JSON.stringify(ids))
}

// Charger et fusionner au démarrage
let ajoutsLocaux = []
let suppressionsLocales = []

function initialiser() {
  // Récupérer les ajouts locaux
  let ajouts = localStorage.getItem(CLE_AJOUTS)
  if (ajouts) ajoutsLocaux = JSON.parse(ajouts)

  // Récupérer les IDs supprimés
  let suppr = localStorage.getItem(CLE_SUPPRESSIONS)
  if (suppr) suppressionsLocales = JSON.parse(suppr)

  // Charger depuis l'API puis fusionner
  chargerDepuisAPI()
}

function chargerDepuisAPI() {
  fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
    .then(response => response.json())
    .then(donnees => {
      // Transformer les données API
      let donneesAPI = donnees.map(post => ({
        id: post.id,
        titre: post.title.substring(0, 30) + "...",
        type: "article",
        note: Math.floor(Math.random() * 5) + 1
      }))

      // Filtrer les éléments supprimés localement
      let filtrees = donneesAPI.filter(r => !suppressionsLocales.includes(r.id))

      // Fusionner avec les ajouts locaux
      ressources = [...filtrees, ...ajoutsLocaux]
      afficherRessources(ressources)
    })
}

initialiser()
```
**Concepts clés** :
- `localStorage.setItem(clé, valeur)` : Sauvegarder (valeur = string)
- `localStorage.getItem(clé)` : Récupérer
- `JSON.stringify(objet)` : Convertir objet/tableau → texte
- `JSON.parse(texte)` : Convertir texte → objet/tableau
- **Fusion** : Combiner données API + ajouts locaux - suppressions

**Tâche** : Implémenter la persistance des ajouts et suppressions locales

#### 9.8 Finalisation et améliorations
**Objectif** : Peaufiner l'application
- Ajouter des styles CSS
- Gérer le cas "aucun résultat"
- Combiner recherche et tri
- Confirmation avant suppression (optionnel)

---

## Progression visuelle

```
NIVEAU 1 - Fondamentaux (Modules 1-4)
══════════════════════════════════════
[■■■■] Variables      → Tu sais stocker des données
[■■■■] Conditions     → Tu sais prendre des décisions
[■■■■] Tableaux       → Tu sais gérer des listes
[■■■■] Objets         → Tu sais structurer tes données

NIVEAU 2 - Interaction (Modules 5-7)
══════════════════════════════════════
[■■■■] Fonctions      → Tu sais organiser ton code
[■■■■] DOM Sélection  → Tu sais manipuler la page
[■■■■] Événements     → Tu sais réagir aux actions

NIVEAU 3 - Application (Modules 8-9)
══════════════════════════════════════
[■■■■] Formulaires    → Tu sais récupérer les saisies
[■■■■] Projet         → Tu sais créer une vraie app!
        ├── Chargement depuis API (fetch)
        ├── Affichage dynamique
        ├── Recherche et tri
        ├── Ajout avec validation
        ├── Suppression
        └── Persistance (localStorage + API)
```

---

## Exercices bonus (si temps disponible)

- **Édition** : Permettre de modifier une ressource existante
- **Filtrage multiple** : Combiner recherche texte + filtre par type
- **Statistiques** : Afficher le nombre de ressources, moyenne des notes
- **Confirmation** : Demander confirmation avant suppression
- **Export** : Exporter les données en fichier JSON

---

## Notes pédagogiques

### Approche recommandée
1. **Démonstration** : L'enseignant montre le concept (5-10 min)
2. **Exercice guidé** : Les élèves reproduisent avec aide (10-15 min)
3. **Exercice autonome** : Les élèves pratiquent seuls (15-20 min)
4. **Correction collective** : Discussion des solutions (5-10 min)

### Points d'attention
- Insister sur la différence `==` vs `===`
- Toujours utiliser `const` par défaut, `let` si modification nécessaire
- Éviter `var` (mentionner pourquoi)
- Encourager les noms de variables explicites
- Montrer les erreurs courantes et comment les lire
- **Sécurité DOM** : Privilégier textContent et createElement plutôt que innerHTML
- **localStorage** : Expliquer que les données restent même après fermeture du navigateur
- **JSON** : Bien expliquer stringify (objet→texte) et parse (texte→objet)
- **API fetch** : Introduire tôt (Module 4) pour que les élèves s'habituent aux données externes
- **Asynchrone** : Expliquer que fetch est une opération qui prend du temps (Promises)

### Ressources complémentaires
- devjs.ch (ta plateforme de cours)
- MDN Web Docs (référence officielle)
- JavaScript.info (tutoriels approfondis)
