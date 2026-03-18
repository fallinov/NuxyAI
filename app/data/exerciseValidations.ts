/**
 * Configuration des validations pour chaque exercice
 *
 * Chaque exercice peut avoir plusieurs types de validation :
 * - output : Vérifie la sortie console
 * - code : Vérifie le code source
 * - custom : Fonction de validation personnalisée
 */

export interface ValidationRule {
  type: 'output' | 'code' | 'custom'
  label: string  // Label court pour la checklist d'objectifs
  check: (result: any) => boolean
  successMessage: string
  failMessage: string
  hints?: string[]
}

export interface ExerciseValidation {
  slug: string
  rules: ValidationRule[]
}

/**
 * Validations pour chaque exercice
 */
export const exerciseValidations: Record<string, ExerciseValidation> = {
  'hello-javascript': {
    slug: 'hello-javascript',
    rules: [
      {
        type: 'output',
        label: 'Afficher "Bonjour Nuxy !" dans la console',
        check: (result) => {
          // Vérifier qu'il y a au moins un log
          if (!result.logs || result.logs.length === 0) {
            return false
          }

          // Vérifier que le message contient "Bonjour Nuxy !"
          const output = result.logs.map((log: any) => log.content).join(' ')
          return output.includes('Bonjour Nuxy !')
        },
        successMessage: 'Bravo ! Vous avez réussi votre premier exercice JavaScript !',
        failMessage: 'Le message affiché n\'est pas correct. Vérifiez que vous affichez exactement "Bonjour Nuxy !"',
        hints: [
          'Utilisez console.log() pour afficher du texte',
          'N\'oubliez pas les guillemets autour du texte',
          'Le message doit être exactement : Bonjour Nuxy !'
        ]
      },
      {
        type: 'code',
        label: 'Utiliser la fonction console.log()',
        check: (result) => {
          // Vérifier que le code contient console.log
          const code = result.code?.toLowerCase() || ''
          return code.includes('console.log')
        },
        successMessage: 'Vous utilisez bien console.log()',
        failMessage: 'Astuce : Utilisez la fonction console.log() pour afficher du texte',
        hints: [
          'La fonction console.log() permet d\'afficher du texte dans la console'
        ]
      }
    ]
  },

  'variables-declarations': {
    slug: 'variables-declarations',
    rules: [
      {
        type: 'code',
        label: 'Déclarer une constante avec const',
        check: (result) => {
          const code = result.code || ''
          return code.includes('const') && code.includes('nom')
        },
        successMessage: 'Vous utilisez bien const pour déclarer la constante nom',
        failMessage: 'Utilisez const pour déclarer votre constante nom',
        hints: [
          'Syntaxe : const nom = "VotrePrenom"',
          'const est utilisé pour les valeurs qui ne changent pas'
        ]
      },
      {
        type: 'code',
        label: 'Déclarer une variable avec let',
        check: (result) => {
          const code = result.code || ''
          return code.includes('let') && code.includes('message')
        },
        successMessage: 'Vous utilisez bien let pour déclarer la variable message',
        failMessage: 'Utilisez let pour déclarer votre variable message',
        hints: [
          'Syntaxe : let message = ...',
          'let est utilisé pour les valeurs qui peuvent changer'
        ]
      },
      {
        type: 'output',
        label: 'Combiner le nom avec "apprend JavaScript"',
        check: (result) => {
          if (!result.logs || result.logs.length === 0) return false
          const output = result.logs.map((log: any) => log.content).join(' ')
          return output.includes('apprend JavaScript')
        },
        successMessage: 'Parfait ! Votre message contient bien "apprend JavaScript"',
        failMessage: 'Le message doit contenir "apprend JavaScript"',
        hints: [
          'Utilisez l\'opérateur + pour combiner les textes',
          'Exemple : nom + " apprend JavaScript"'
        ]
      }
    ]
  },

  'types-donnees': {
    slug: 'types-donnees',
    rules: [
      {
        type: 'code',
        label: 'Utiliser l\'opérateur typeof',
        check: (result) => {
          const code = result.code?.toLowerCase() || ''
          return code.includes('typeof')
        },
        successMessage: 'Vous utilisez bien l\'opérateur typeof',
        failMessage: 'Utilisez typeof pour afficher le type des variables',
        hints: [
          'Syntaxe : typeof nomVariable',
          'Exemple : console.log(typeof texte)'
        ]
      },
      {
        type: 'output',
        label: 'Afficher les 3 types : string, number, boolean',
        check: (result) => {
          if (!result.logs || result.logs.length < 3) return false
          const output = result.logs.map((log: any) => log.content).join(' ')
          return output.includes('string') && output.includes('number') && output.includes('boolean')
        },
        successMessage: 'Excellent ! Vous affichez bien les trois types : string, number et boolean',
        failMessage: 'Vous devez afficher les trois types : string, number et boolean',
        hints: [
          'Affichez typeof pour chacune de vos trois variables',
          'Vous devriez voir apparaître : string, number et boolean'
        ]
      },
      {
        type: 'output',
        label: 'Créer une phrase combinant les 3 variables',
        check: (result) => {
          if (!result.logs || result.logs.length < 4) return false
          const output = result.logs.map((log: any) => log.content).join(' ')
          return output.match(/\d+\s+ans/) !== null
        },
        successMessage: 'Votre phrase finale combine bien toutes les variables',
        failMessage: 'N\'oubliez pas de créer une phrase qui utilise vos trois variables',
        hints: [
          'Combinez vos variables avec l\'opérateur +',
          'Exemple : texte + " a " + age + " ans..."'
        ]
      }
    ]
  },

  'operations-mathematiques': {
    slug: 'operations-mathematiques',
    rules: [
      {
        type: 'code',
        label: 'Utiliser la multiplication et la soustraction',
        check: (result) => {
          const code = result.code || ''
          return code.includes('*') && code.includes('-')
        },
        successMessage: 'Vous utilisez bien les opérateurs mathématiques (* et -)',
        failMessage: 'Utilisez la multiplication (*) et la soustraction (-)',
        hints: [
          'Calculez : (prixUnitaire * quantite) - reduction',
          'N\'oubliez pas les parenthèses pour l\'ordre des opérations'
        ]
      },
      {
        type: 'output',
        label: 'Afficher prix, quantité, réduction et total',
        check: (result) => {
          if (!result.logs || result.logs.length === 0) return false
          const output = result.logs.map((log: any) => log.content).join(' ')
          // Vérifier qu'on affiche bien les 4 informations
          return output.includes('Prix unitaire') &&
                 output.includes('Quantité') &&
                 output.includes('Réduction') &&
                 output.includes('Total')
        },
        successMessage: 'Vous affichez bien toutes les informations demandées',
        failMessage: 'Affichez les 4 informations : Prix unitaire, Quantité, Réduction et Total',
        hints: [
          'Utilisez 4 console.log() pour afficher chaque information',
          'Exemple : console.log("Prix unitaire: " + prixUnitaire)'
        ]
      },
      {
        type: 'output',
        label: 'Calculer le bon résultat (41.5)',
        check: (result) => {
          if (!result.logs || result.logs.length === 0) return false
          const output = result.logs.map((log: any) => log.content).join(' ')
          // Vérifier que le calcul est correct (15.5 * 3 - 5 = 41.5)
          return output.includes('41.5') || output.includes('41,5')
        },
        successMessage: 'Parfait ! Votre calcul est correct : 41.5',
        failMessage: 'Le résultat du calcul n\'est pas correct. Vérifiez votre formule',
        hints: [
          'Le calcul doit être : (15.5 * 3) - 5',
          'Résultat attendu : 41.5',
          'Vérifiez l\'ordre des opérations avec les parenthèses'
        ]
      }
    ]
  },

  'manipuler-texte': {
    slug: 'manipuler-texte',
    rules: [
      {
        type: 'code',
        label: 'Utiliser la propriété .length',
        check: (result) => {
          const code = result.code || ''
          return code.includes('.length')
        },
        successMessage: 'Vous utilisez bien la propriété .length',
        failMessage: 'Utilisez .length pour obtenir la longueur du prénom',
        hints: [
          'Syntaxe : prenom.length',
          'Exemple : console.log(prenom.length)'
        ]
      },
      {
        type: 'code',
        label: 'Utiliser la méthode .toUpperCase()',
        check: (result) => {
          const code = result.code?.toLowerCase() || ''
          return code.includes('.touppercase()')
        },
        successMessage: 'Vous utilisez bien la méthode .toUpperCase()',
        failMessage: 'Utilisez .toUpperCase() pour convertir en majuscules',
        hints: [
          'Syntaxe : prenom.toUpperCase()',
          'N\'oubliez pas les parenthèses à la fin'
        ]
      },
      {
        type: 'code',
        label: 'Utiliser la méthode .toLowerCase()',
        check: (result) => {
          const code = result.code?.toLowerCase() || ''
          return code.includes('.tolowercase()')
        },
        successMessage: 'Vous utilisez bien la méthode .toLowerCase()',
        failMessage: 'Utilisez .toLowerCase() pour convertir en minuscules',
        hints: [
          'Syntaxe : prenom.toLowerCase()',
          'N\'oubliez pas les parenthèses à la fin'
        ]
      },
      {
        type: 'output',
        label: 'Afficher un message avec "caractères"',
        check: (result) => {
          if (!result.logs || result.logs.length === 0) return false
          const output = result.logs.map((log: any) => log.content).join(' ')
          // Vérifier que le message contient "caractères" ou "caractere"
          return output.toLowerCase().includes('caract')
        },
        successMessage: 'Votre message final est correct !',
        failMessage: 'Créez un message qui mentionne le nombre de caractères',
        hints: [
          'Exemple : "Mon prénom ALICE contient 5 caractères"',
          'Combinez le prénom en majuscules avec .length'
        ]
      }
    ]
  }
}

/**
 * Récupère la validation pour un exercice donné
 */
export function getExerciseValidation(slug: string): ExerciseValidation | null {
  return exerciseValidations[slug] || null
}

/**
 * Valide le résultat d'un exercice
 */
export function validateExercise(slug: string, code: string, executionResult: any): {
  isValid: boolean
  messages: string[]
  hints: string[]
  passedRules: number
  totalRules: number
  rulesStatus: boolean[]
} {
  const validation = getExerciseValidation(slug)

  if (!validation) {
    return {
      isValid: true,
      messages: ['Aucune validation configurée pour cet exercice'],
      hints: [],
      passedRules: 0,
      totalRules: 0,
      rulesStatus: []
    }
  }

  const messages: string[] = []
  const hints: string[] = []
  const rulesStatus: boolean[] = []
  let passedRules = 0

  // Ajouter le code au résultat pour les validations de type 'code'
  const resultWithCode = {
    ...executionResult,
    code
  }

  // Vérifier chaque règle
  for (const rule of validation.rules) {
    const passed = rule.check(resultWithCode)
    rulesStatus.push(passed)

    if (passed) {
      passedRules++
      messages.push(rule.successMessage)
    } else {
      messages.push(rule.failMessage)
      if (rule.hints) {
        hints.push(...rule.hints)
      }
    }
  }

  const isValid = passedRules === validation.rules.length

  return {
    isValid,
    messages,
    hints,
    passedRules,
    totalRules: validation.rules.length,
    rulesStatus
  }
}
