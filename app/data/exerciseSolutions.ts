/**
 * Solutions officielles pour chaque exercice
 *
 * Ces solutions sont affichées quand l'utilisateur clique sur "View Solution"
 */

export interface ExerciseSolution {
  code: string
  explanation?: string
}

export const exerciseSolutions: Record<string, ExerciseSolution> = {
  'hello-javascript': {
    code: `console.log("Bonjour Nuxy !")`,
    explanation: 'Cette ligne affiche le message "Bonjour Nuxy !" dans la console.'
  },

  'variables-declarations': {
    code: `const nom = "Alice"
let message = nom + " apprend JavaScript"
console.log(message)`,
    explanation: 'On crée une constante "nom", on construit un message en combinant le nom avec du texte, puis on affiche le résultat.'
  },

  'types-donnees': {
    code: `const age = 25
const ville = "Paris"
const estEtudiant = true

console.log("Age:", age)
console.log("Ville:", ville)
console.log("Est étudiant:", estEtudiant)`,
    explanation: 'On déclare trois variables de types différents (nombre, texte, booléen) et on les affiche dans la console.'
  },

  'operations-mathematiques': {
    code: `const nombreA = 10
const nombreB = 5

const somme = nombreA + nombreB
const produit = nombreA * nombreB
const division = nombreA / nombreB

console.log("Somme:", somme)
console.log("Produit:", produit)
console.log("Division:", division)`,
    explanation: 'On effectue trois opérations mathématiques de base (addition, multiplication, division) et on affiche les résultats.'
  },

  'manipuler-texte': {
    code: `const prenom = "Alice"

// Afficher la longueur
console.log(prenom.length)

// Afficher en majuscules
console.log(prenom.toUpperCase())

// Afficher en minuscules
console.log(prenom.toLowerCase())

// Message combiné
console.log("Mon prénom " + prenom.toUpperCase() + " contient " + prenom.length + " caractères")`,
    explanation: 'On utilise .length pour la longueur, .toUpperCase() pour les majuscules, et .toLowerCase() pour les minuscules. On combine le tout dans un message final.'
  }
}

/**
 * Récupère la solution pour un exercice donné
 */
export const getExerciseSolution = (exerciseId: string): ExerciseSolution | null => {
  return exerciseSolutions[exerciseId] || null
}
