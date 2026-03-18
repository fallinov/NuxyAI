/**
 * Hints pédagogiques pour chaque exercice
 *
 * Structure progressive des indices :
 * - Indice 1 : Concept général
 * - Indice 2 : Direction technique
 * - Indice 3 : Exemple concret
 */

export interface Hint {
  title: string
  content: string
  example?: string
}

export const exerciseHints: Record<string, Hint[]> = {
  'hello-javascript': [
    {
      title: 'Comprendre console.log()',
      content: 'La fonction console.log() permet d\'afficher du texte ou des valeurs dans la console du navigateur. C\'est l\'outil de base pour voir ce que fait votre code.',
      example: 'console.log("Mon premier message")'
    },
    {
      title: 'Les guillemets sont importants',
      content: 'Pour afficher du texte (une chaîne de caractères), vous devez l\'entourer de guillemets simples \' \' ou doubles " ". Sans guillemets, JavaScript pensera que c\'est le nom d\'une variable.',
      example: 'console.log("Bonjour") // Correct\nconsole.log(Bonjour)  // Erreur'
    },
    {
      title: 'La solution complète',
      content: 'Tapez exactement cette ligne de code dans l\'éditeur, puis cliquez sur "Exécuter le code" :',
      example: 'console.log("Bonjour Nuxy !")'
    }
  ],

  'variables-declarations': [
    {
      title: 'const vs let : quelle différence ?',
      content: 'Utilisez "const" pour les valeurs qui ne changent pas (comme votre nom). Utilisez "let" pour les valeurs qui peuvent changer (comme un message qu\'on va modifier).',
      example: 'const nom = "Alice"  // Ne changera pas\nlet message = "Salut"  // Peut changer'
    },
    {
      title: 'Combiner du texte avec +',
      content: 'L\'opérateur + permet de coller plusieurs morceaux de texte ensemble. C\'est ce qu\'on appelle la "concaténation".',
      example: 'const prenom = "Alice"\nconst phrase = prenom + " apprend JavaScript"\nconsole.log(phrase) // Affiche: Alice apprend JavaScript'
    },
    {
      title: 'Structure complète de l\'exercice',
      content: 'Vous devez créer une constante "nom" avec votre prénom, une variable "message" qui combine le nom avec " apprend JavaScript", puis afficher le message.',
      example: 'const nom = "VotrePrenom"\nlet message = nom + " apprend JavaScript"\nconsole.log(message)'
    }
  ],

  'types-donnees': [
    {
      title: 'L\'opérateur typeof',
      content: 'L\'opérateur typeof vous dit de quel type est une valeur : "string" pour du texte, "number" pour un nombre, "boolean" pour vrai/faux.',
      example: 'console.log(typeof "Bonjour")  // Affiche: string\nconsole.log(typeof 42)         // Affiche: number\nconsole.log(typeof true)       // Affiche: boolean'
    },
    {
      title: 'Les trois types principaux',
      content: 'En JavaScript, vous devez créer une variable de chaque type : une chaîne de caractères (texte entre guillemets), un nombre (sans guillemets), et un booléen (true ou false).',
      example: 'const texte = "Bonjour"  // string\nconst age = 25           // number\nconst estVrai = true     // boolean'
    },
    {
      title: 'Combiner tout dans une phrase',
      content: 'Pour l\'exercice, vous devez créer une phrase qui utilise vos trois variables. Utilisez + pour les combiner.',
      example: 'const nom = "Alice"\nconst age = 25\nconst aime = true\n\nconst phrase = nom + " a " + age + " ans"\nconsole.log(phrase)'
    }
  ],

  'operations-mathematiques': [
    {
      title: 'Les opérateurs mathématiques',
      content: 'JavaScript peut faire des calculs : + (addition), - (soustraction), * (multiplication), / (division). Attention à l\'ordre des opérations !',
      example: 'const resultat = 10 + 5    // Addition: 15\nconst produit = 4 * 3     // Multiplication: 12\nconst difference = 20 - 8  // Soustraction: 12'
    },
    {
      title: 'L\'ordre des opérations compte',
      content: 'Comme en mathématiques, la multiplication et la division sont calculées avant l\'addition et la soustraction. Utilisez des parenthèses pour forcer un ordre.',
      example: '5 + 3 * 2      // = 11 (multiplication d\'abord)\n(5 + 3) * 2    // = 16 (parenthèses d\'abord)'
    },
    {
      title: 'Solution du panier',
      content: 'Pour calculer le total du panier : multipliez d\'abord le prix par la quantité (avec des parenthèses), puis soustrayez la réduction.',
      example: 'const prixUnitaire = 15.5\nconst quantite = 3\nconst reduction = 5\n\nconst total = (prixUnitaire * quantite) - reduction\nconsole.log("Total:", total) // 41.5'
    }
  ],

  'manipuler-texte': [
    {
      title: 'Propriété .length',
      content: 'La propriété .length donne le nombre de caractères d\'une chaîne. C\'est une propriété, donc pas de parenthèses !',
      example: 'const prenom = "Alice"\nconsole.log(prenom.length)  // Affiche: 5'
    },
    {
      title: 'Méthodes toUpperCase() et toLowerCase()',
      content: 'Ces méthodes transforment le texte. toUpperCase() met en MAJUSCULES, toLowerCase() met en minuscules. Ce sont des méthodes, donc avec parenthèses !',
      example: 'const prenom = "Alice"\nconsole.log(prenom.toUpperCase())  // ALICE\nconsole.log(prenom.toLowerCase())  // alice'
    },
    {
      title: 'Solution complète',
      content: 'Combinez toutes les méthodes pour créer le message final qui affiche le prénom en majuscules et son nombre de caractères.',
      example: 'const prenom = "Alice"\nconsole.log(prenom.length)           // 5\nconsole.log(prenom.toUpperCase())     // ALICE\nconsole.log(prenom.toLowerCase())     // alice\nconsole.log("Mon prénom " + prenom.toUpperCase() + " contient " + prenom.length + " caractères")'
    }
  ]
}

/**
 * Récupère les hints pour un exercice donné
 */
export function getExerciseHints(slug: string): Hint[] {
  return exerciseHints[slug] || []
}
