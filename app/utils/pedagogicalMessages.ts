/**
 * Système de messages pédagogiques pour erreurs JavaScript courantes
 *
 * Analyse les erreurs et fournit des explications adaptées aux débutants
 * avec des conseils et exemples concrets
 */

export interface PedagogicalError {
  type: 'error' | 'warning' | 'info'
  title: string
  message: string
  hint?: string
  example?: string
  learnMore?: string
  learnMoreTitle?: string
  line?: number        // Numéro de ligne dans le code de l'élève
  codeLine?: string    // Contenu de la ligne fautive
}

/**
 * Analyse une erreur JavaScript et retourne un message pédagogique
 */
export function analyzePedagogicalError(error: Error, code: string): PedagogicalError {
  const errorMessage = error.message
  const errorName = error.name

  // ReferenceError: variable non déclarée
  if (errorName === 'ReferenceError') {
    // Variable utilisée avant sa déclaration (Temporal Dead Zone)
    const tdzMatch = errorMessage.match(/Cannot access '(\w+)' before initialization/)
    if (tdzMatch) {
      const varName = tdzMatch[1]
      return {
        type: 'error',
        title: `Variable '${varName}' utilisée trop tôt`,
        message: `Tu utilises '${varName}' avant de l'avoir déclarée. En JavaScript, une variable n'existe qu'après sa ligne de déclaration.`,
        hint: 'Déplace ton code après la ligne qui déclare la variable',
        example: `// Incorrect\nconsole.log(${varName}) // Erreur !\nlet ${varName} = 42\n\n// Correct\nlet ${varName} = 42\nconsole.log(${varName})`,
        learnMore: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/let#zone_morte_temporaire',
        learnMoreTitle: 'Zone morte temporaire (TDZ)'
      }
    }

    const match = errorMessage.match(/(\w+) is not defined/)
    if (match) {
      const varName = match[1]
      return {
        type: 'error',
        title: `Variable '${varName}' non déclarée`,
        message: `Tu essaies d'utiliser la variable '${varName}' mais elle n'existe pas encore.`,
        hint: `Déclare d'abord ta variable avec 'let' ou 'const'`,
        example: `let ${varName} = /* ta valeur */\nconsole.log(${varName})`,
        learnMore: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Grammar_and_types#d%C3%A9clarations',
        learnMoreTitle: 'Déclarations de variables'
      }
    }
  }

  // SyntaxError: erreur de syntaxe
  if (errorName === 'SyntaxError') {
    // Redéclaration de variable (let/const)
    const redeclareMatch = errorMessage.match(/Identifier '(\w+)' has already been declared/)
    if (redeclareMatch) {
      const varName = redeclareMatch[1]
      return {
        type: 'error',
        title: `Variable '${varName}' déjà déclarée`,
        message: `Tu as déjà créé la variable '${varName}' plus haut. On ne peut pas la redéclarer avec let ou const.`,
        hint: 'Pour changer sa valeur, écris juste le nom sans let/const',
        example: `// Correct\nlet ${varName} = "Alice"\n${varName} = "Bob"  // Pas de let !\n\n// Incorrect\nlet ${varName} = "Alice"\nlet ${varName} = "Bob"  // Erreur !`,
        learnMore: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/let',
        learnMoreTitle: 'let — déclaration de variable'
      }
    }

    // await hors d'une fonction async
    if (errorMessage.includes('await is only valid in async')) {
      return {
        type: 'error',
        title: 'await sans async',
        message: 'Tu utilises await mais ta fonction n\'est pas marquée async.',
        hint: 'Ajoute le mot-clé async devant ta fonction',
        example: '// Correct\nasync function charger() {\n  const data = await fetch("/api")\n}\n\n// Incorrect\nfunction charger() {\n  const data = await fetch("/api") // Erreur !\n}',
        learnMore: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function',
        learnMoreTitle: 'async function'
      }
    }

    // JSON.parse sur une valeur invalide
    if (errorMessage.includes('is not valid JSON')) {
      return {
        type: 'error',
        title: 'JSON invalide',
        message: 'Tu essaies de lire du JSON mais le texte n\'est pas au bon format.',
        hint: 'Vérifie que tu utilises JSON.parse() sur du texte JSON valide, pas sur un objet',
        example: '// Correct\nconst data = JSON.parse(\'{"nom": "Alice"}\')\n\n// Incorrect\nconst obj = {nom: "Alice"}\nJSON.parse(obj) // C\'est déjà un objet !',
        learnMore: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse',
        learnMoreTitle: 'JSON.parse()'
      }
    }

    // Parenthèse manquante
    if (errorMessage.includes('Unexpected end of input')) {
      return {
        type: 'error',
        title: 'Parenthèse, accolade ou crochet manquant',
        message: 'Ton code est incomplet. Il manque probablement une parenthèse ), une accolade } ou un crochet ].',
        hint: 'Vérifie que chaque ( a son ), chaque { a son }, et chaque [ a son ]',
        example: '// Correct\nif (condition) {\n  console.log("ok")\n}\n\n// Incorrect (manque })\nif (condition) {\n  console.log("ok")',
        learnMore: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Grammar_and_types',
        learnMoreTitle: 'Syntaxe de base'
      }
    }

    // Token inattendu (inclut Unexpected token)
    if (errorMessage.includes('Unexpected token')) {
      const match = errorMessage.match(/Unexpected token '(.+?)'/)
      const token = match ? match[1] : 'inconnu'
      return {
        type: 'error',
        title: 'Erreur de syntaxe',
        message: `Le symbole '${token}' est inattendu à cet endroit.`,
        hint: 'Vérifie la syntaxe de ton code (virgules, point-virgules, parenthèses)',
        example: '// Correct\nconst a = 10\nconst b = 20\n\n// Incorrect\nconst a = 10,, b = 20',
        learnMore: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Grammar_and_types',
        learnMoreTitle: 'Syntaxe de base'
      }
    }

    // Invalid or unexpected token (backtick, guillemet mal fermé)
    if (errorMessage.includes('Invalid or unexpected token')) {
      return {
        type: 'error',
        title: 'Caractère invalide',
        message: 'Ton code contient un caractère que JavaScript ne reconnaît pas.',
        hint: 'Vérifie tes guillemets et backticks — chaque ouverture doit avoir sa fermeture',
        example: '// Correct\nconst msg = `Bonjour ${nom}`\nconst txt = "Hello"\n\n// Incorrect\nconst msg = `Bonjour ${nom}"\nconst txt = "Hello\'',
        learnMore: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Grammar_and_types',
        learnMoreTitle: 'Syntaxe de base'
      }
    }

    // Erreur de syntaxe générique
    return {
      type: 'error',
      title: 'Erreur de syntaxe',
      message: errorMessage,
      hint: 'Vérifie que ton code respecte la syntaxe JavaScript',
      learnMore: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Grammar_and_types',
      learnMoreTitle: 'Syntaxe de base'
    }
  }

  // TypeError: type incorrect
  if (errorName === 'TypeError') {
    // Réaffectation d'une constante
    if (errorMessage.includes('Assignment to constant variable')) {
      return {
        type: 'error',
        title: 'Modification d\'une constante',
        message: 'Tu essaies de modifier une variable déclarée avec const. Une constante ne peut pas changer de valeur.',
        hint: 'Utilise let au lieu de const si la valeur doit changer',
        example: '// Correct\nlet compteur = 0\ncompteur = 1\n\n// Incorrect\nconst compteur = 0\ncompteur = 1 // Erreur !',
        learnMore: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/const',
        learnMoreTitle: 'const — déclaration de constante'
      }
    }

    // Appel de fonction sur non-fonction (avec détection méthodes tableau/string)
    if (errorMessage.includes('is not a function')) {
      const match = errorMessage.match(/(.+?) is not a function/)
      const varName = match ? match[1] : 'Cette variable'

      // Détecter les erreurs de casse sur les méthodes courantes
      const caseMatch = varName.match(/\.(\w+)$/)
      if (caseMatch) {
        const methodName = caseMatch[1]
        const knownMethods: Record<string, string> = {
          'Push': 'push', 'Pop': 'pop', 'Shift': 'shift', 'Unshift': 'unshift',
          'Foreach': 'forEach', 'ForEach': 'forEach', 'foreach': 'forEach',
          'Map': 'map', 'Filter': 'filter', 'Reduce': 'reduce', 'Find': 'find',
          'IndexOf': 'indexOf', 'Indexof': 'indexOf', 'indexof': 'indexOf',
          'Includes': 'includes', 'Sort': 'sort', 'Reverse': 'reverse',
          'Splice': 'splice', 'Slice': 'slice', 'Join': 'join',
          'Replace': 'replace', 'Split': 'split', 'Trim': 'trim',
          'ToUpperCase': 'toUpperCase', 'Touppercase': 'toUpperCase',
          'ToLowerCase': 'toLowerCase', 'Tolowercase': 'toLowerCase',
          'Tostring': 'toString', 'ToString': 'toString',
          'AddEventListener': 'addEventListener', 'Addeventlistener': 'addEventListener',
          'QuerySelector': 'querySelector', 'Queryselector': 'querySelector',
          'GetElementById': 'getElementById', 'Getelementbyid': 'getElementById',
        }
        const correctName = knownMethods[methodName]
        if (correctName) {
          return {
            type: 'error',
            title: `Erreur de majuscule : '${methodName}'`,
            message: `JavaScript est sensible aux majuscules/minuscules. La méthode s'écrit '${correctName}', pas '${methodName}'.`,
            hint: `Remplace .${methodName}() par .${correctName}()`,
            example: `// Correct\ntableau.${correctName}(...)\n\n// Incorrect\ntableau.${methodName}(...) // Erreur !`,
          }
        }
      }

      return {
        type: 'error',
        title: 'Tentative d\'appel sur une non-fonction',
        message: `${varName} n'est pas une fonction et ne peut pas être appelé avec ().`,
        hint: 'Vérifie que tu appelles bien une fonction et non une variable simple',
        example: '// Correct\nfunction maFonction() { return 42 }\nmaFonction()\n\n// Incorrect\nconst nombre = 42\nnombre() // nombre n\'est pas une fonction',
        learnMore: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Functions',
        learnMoreTitle: 'Les fonctions'
      }
    }

    // is not iterable (for...of sur non-tableau)
    if (errorMessage.includes('is not iterable')) {
      return {
        type: 'error',
        title: 'Valeur non parcourable',
        message: 'Tu essaies de parcourir (for...of, forEach) une valeur qui n\'est pas un tableau ou une liste.',
        hint: 'Vérifie que ta variable contient bien un tableau []',
        example: '// Correct\nconst fruits = ["pomme", "banane"]\nfor (const fruit of fruits) { }\n\n// Incorrect\nconst fruits = undefined\nfor (const fruit of fruits) { } // Erreur !',
        learnMore: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/for...of',
        learnMoreTitle: 'for...of'
      }
    }

    // Lecture de propriété sur null (querySelector a échoué — contexte DOM)
    const readNullMatch = errorMessage.match(/Cannot read properties of null \(reading '(\w+)'\)/)
    if (readNullMatch) {
      const prop = readNullMatch[1]
      const domProps = ['textContent', 'innerHTML', 'innerText', 'value', 'style', 'classList', 'className', 'addEventListener', 'setAttribute', 'getAttribute', 'appendChild', 'children', 'parentElement', 'id', 'href', 'src', 'checked', 'disabled']
      if (domProps.includes(prop)) {
        return {
          type: 'error',
          title: 'Élément HTML introuvable',
          message: `Tu essaies d'accéder à '.${prop}' mais l'élément n'existe pas (querySelector a retourné null).`,
          hint: 'Vérifie ton sélecteur CSS : # pour un id, . pour une classe',
          example: '// Correct\nconst el = document.querySelector("#monId")\n\n// Erreurs fréquentes\ndocument.querySelector("monId")   // Manque #\ndocument.querySelector("maClasse") // Manque .',
          learnMore: 'https://developer.mozilla.org/fr/docs/Web/API/Document/querySelector',
          learnMoreTitle: 'querySelector()'
        }
      }
      // Cas générique null
      return {
        type: 'error',
        title: 'Accès à une propriété sur null',
        message: `Tu essaies d'accéder à '.${prop}' sur une valeur qui est null.`,
        hint: 'Vérifie que ta variable contient bien une valeur avant d\'accéder à ses propriétés',
        example: '// Correct\nconst obj = { nom: "Alice" }\nconsole.log(obj.nom)\n\n// Incorrect\nconst obj = null\nconsole.log(obj.nom) // Erreur !',
        learnMore: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Working_with_objects',
        learnMoreTitle: 'Objets et propriétés'
      }
    }

    // Écriture de propriété sur null (querySelector a échoué — contexte DOM)
    const setNullMatch = errorMessage.match(/Cannot set properties of null \(setting '(\w+)'\)/)
    if (setNullMatch) {
      const prop = setNullMatch[1]
      return {
        type: 'error',
        title: 'Élément HTML introuvable',
        message: `Tu essaies de modifier '.${prop}' mais l'élément n'existe pas (querySelector a retourné null).`,
        hint: 'Vérifie ton sélecteur CSS : # pour un id, . pour une classe',
        example: '// Correct\nconst el = document.querySelector("#monId")\nel.textContent = "Nouveau texte"\n\n// Incorrect\nconst el = document.querySelector("monId") // Manque #\nel.textContent = "..." // Erreur : el est null !',
        learnMore: 'https://developer.mozilla.org/fr/docs/Web/API/Document/querySelector',
        learnMoreTitle: 'querySelector()'
      }
    }

    // Lecture de propriété sur undefined (cas générique)
    if (errorMessage.includes('Cannot read propert')) {
      return {
        type: 'error',
        title: 'Accès à une propriété inexistante',
        message: 'Tu essaies d\'accéder à une propriété d\'un objet qui n\'existe pas (undefined ou null).',
        hint: 'Vérifie que ton objet existe avant d\'accéder à ses propriétés',
        example: '// Correct\nconst obj = { nom: "Alice" }\nconsole.log(obj.nom)\n\n// Incorrect\nconst obj = undefined\nconsole.log(obj.nom) // Erreur!',
        learnMore: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Working_with_objects',
        learnMoreTitle: 'Objets et propriétés'
      }
    }

    // Écriture de propriété sur undefined
    if (errorMessage.includes('Cannot set propert')) {
      return {
        type: 'error',
        title: 'Modification d\'une propriété inexistante',
        message: 'Tu essaies de modifier une propriété sur une valeur qui est undefined ou null.',
        hint: 'Vérifie que ton objet existe avant de modifier ses propriétés',
        example: '// Correct\nconst obj = {}\nobj.nom = "Alice"\n\n// Incorrect\nlet obj = undefined\nobj.nom = "Alice" // Erreur !',
        learnMore: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Working_with_objects',
        learnMoreTitle: 'Objets et propriétés'
      }
    }
  }

  // RangeError: valeur hors limites
  if (errorName === 'RangeError') {
    if (errorMessage.includes('Maximum call stack size exceeded')) {
      return {
        type: 'error',
        title: 'Récursion infinie détectée',
        message: 'Ta fonction s\'appelle elle-même sans fin (récursion infinie).',
        hint: 'Ajoute une condition d\'arrêt à ta fonction récursive',
        example: '// Correct (avec condition d\'arrêt)\nfunction compte(n) {\n  if (n <= 0) return // Condition d\'arrêt\n  console.log(n)\n  compte(n - 1)\n}\n\n// Incorrect (boucle infinie)\nfunction boucle() {\n  boucle() // Pas de condition d\'arrêt!\n}',
        learnMore: 'https://developer.mozilla.org/en/docs/Glossary/Recursion',
        learnMoreTitle: 'Récursion'
      }
    }
  }

  // Erreur générique
  return {
    type: 'error',
    title: errorName || 'Erreur',
    message: errorMessage,
    hint: 'Lis attentivement le message d\'erreur et vérifie ton code',
  }
}

/**
 * Détecte des warnings pédagogiques dans le code (bonnes pratiques)
 */
export function detectCodeWarnings(code: string): PedagogicalError[] {
  const warnings: PedagogicalError[] = []

  // Détection de l'usage de var au lieu de let/const
  if (code.includes('var ')) {
    warnings.push({
      type: 'warning',
      title: 'Utilisation de "var" détectée',
      message: 'Il est recommandé d\'utiliser "let" ou "const" au lieu de "var" en JavaScript moderne.',
      hint: 'Utilisez "const" pour les valeurs qui ne changent pas, et "let" pour les variables',
      example: '// ✓ Recommandé\nconst PI = 3.14\nlet compteur = 0\n\n// Ancien style\nvar x = 10',
      learnMore: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/const',
      learnMoreTitle: 'const et let'
    })
  }

  // Note: La détection des constantes en minuscules est désactivée
  // car c'est un concept avancé (convention MAJUSCULES pour const valeurs)
  // À réactiver pour les exercices de niveau intermédiaire

  // Détection de == au lieu de ===
  if (code.includes('==') && !code.includes('===')) {
    warnings.push({
      type: 'warning',
      title: 'Comparaison avec == détectée',
      message: 'Il est recommandé d\'utiliser === (égalité stricte) au lieu de == (égalité faible).',
      hint: '=== compare la valeur ET le type, == compare seulement la valeur',
      example: '// ✓ Recommandé\nif (x === 5) { }\n\n// Peut causer des bugs\nif (x == 5) { }',
      learnMore: 'https://developer.mozilla.org/fr/docs/Web/JavaScript/Guide/Expressions_and_operators#op%C3%A9rateurs_de_comparaison',
      learnMoreTitle: 'Opérateurs de comparaison'
    })
  }

  // Détection de console.log dans le code (pour production)
  const consoleLogCount = (code.match(/console\.log/g) || []).length
  if (consoleLogCount > 5) {
    warnings.push({
      type: 'info',
      title: 'Beaucoup de console.log détectés',
      message: `Tu as ${consoleLogCount} appels à console.log. C'est bien pour déboguer, mais pense à les retirer en production.`,
      hint: 'Utilise console.log pour comprendre ton code, mais retire-les une fois le code fonctionnel',
    })
  }

  return warnings
}

/**
 * Formate un objet/tableau pour l'affichage dans la console
 */
export function formatValue(value: any): string {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'

  const type = typeof value

  if (type === 'string') return value
  if (type === 'number' || type === 'boolean') return String(value)
  if (type === 'function') return `[Function: ${value.name || 'anonymous'}]`

  if (type === 'object') {
    try {
      // Vérifier si c'est un tableau
      if (Array.isArray(value)) {
        if (value.length === 0) return '[]'
        if (value.length <= 5) {
          return `[${value.map(v => formatValue(v)).join(', ')}]`
        }
        return `[${value.slice(0, 3).map(v => formatValue(v)).join(', ')}, ... +${value.length - 3} items]`
      }

      // Object
      const keys = Object.keys(value)
      if (keys.length === 0) return '{}'
      if (keys.length <= 3) {
        const pairs = keys.map(k => `${k}: ${formatValue(value[k])}`)
        return `{ ${pairs.join(', ')} }`
      }
      return `{ ${keys.slice(0, 2).map(k => `${k}: ${formatValue(value[k])}`).join(', ')}, ... +${keys.length - 2} keys }`
    } catch (error) {
      return '[Object]'
    }
  }

  return String(value)
}

/**
 * Analyse le code pour détecter les variables utilisées mais non déclarées
 */
export function detectUndeclaredVariables(code: string): string[] {
  // Variables déclarées
  const declaredVars = new Set<string>()
  const varPattern = /(?:var|let|const)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g
  let match
  while ((match = varPattern.exec(code)) !== null) {
    declaredVars.add(match[1])
  }

  // Fonctions déclarées
  const funcPattern = /function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g
  while ((match = funcPattern.exec(code)) !== null) {
    declaredVars.add(match[1])
  }

  // Variables utilisées (approximation simple)
  const usedVars = new Set<string>()
  const usePattern = /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?:[=\+\-\*\/\(\[]|$)/g
  while ((match = usePattern.exec(code)) !== null) {
    const varName = match[1]
    // Ignorer les mots-clés JavaScript
    if (!['if', 'else', 'for', 'while', 'function', 'return', 'const', 'let', 'var', 'console', 'true', 'false', 'null', 'undefined'].includes(varName)) {
      usedVars.add(varName)
    }
  }

  // Variables potentiellement non déclarées
  const undeclared: string[] = []
  usedVars.forEach(varName => {
    if (!declaredVars.has(varName)) {
      undeclared.push(varName)
    }
  })

  return undeclared
}
