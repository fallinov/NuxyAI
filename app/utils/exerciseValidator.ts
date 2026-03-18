/**
 * Moteur de validation déclaratif pour les exercices
 *
 * Interprète les règles de validation définies dans le frontmatter YAML
 * des fichiers Markdown d'exercices.
 *
 * Types de validation supportés :
 * - code_contains : Le code contient une chaîne
 * - code_matches : Le code correspond à une regex
 * - output_contains : La sortie console contient une chaîne
 * - output_matches : La sortie console correspond à une regex
 * - variable_exists : Une variable existe dans le contexte
 * - no_error : Pas d'erreur d'exécution
 */

export interface ValidationRule {
  description: string
  type: 'code_contains' | 'code_matches' | 'output_contains' | 'output_matches' | 'variable_exists' | 'no_error'
  expected?: string
  variable?: string
  errorMessage?: string
  successMessage?: string
}

export interface ExecutionResult {
  logs?: Array<{ type: string; content: string }>
  errors?: Array<{ message: string }>
  context?: Record<string, unknown>
}

export interface ValidationResult {
  isValid: boolean
  passedRules: number
  totalRules: number
  rulesStatus: boolean[]
  messages: string[]
  hints: string[]
}

/**
 * Valide le code de l'utilisateur contre les règles déclaratives
 */
export function validateExerciseCode(
  code: string,
  executionResult: ExecutionResult,
  rules: ValidationRule[]
): ValidationResult {
  const rulesStatus: boolean[] = []
  const messages: string[] = []
  const hints: string[] = []
  let allPassed = 0
  let visiblePassed = 0
  let visibleTotal = 0

  // Concatène tous les logs en une seule chaîne pour les vérifications
  const outputText = executionResult.logs
    ?.map(log => log.content)
    .join('\n') || ''

  for (const rule of rules) {
    let passed = false
    const isVisible = rule.type !== 'no_error'

    switch (rule.type) {
      case 'code_contains':
        // Vérifie si le code contient la chaîne attendue
        passed = rule.expected ? code.includes(rule.expected) : false
        break

      case 'code_matches':
        // Vérifie si le code correspond à la regex
        if (rule.expected) {
          try {
            const regex = new RegExp(rule.expected)
            passed = regex.test(code)
          } catch {
            console.warn(`Invalid regex in validation rule: ${rule.expected}`)
            passed = false
          }
        }
        break

      case 'output_contains':
        // Vérifie si la sortie contient la chaîne attendue
        passed = rule.expected ? outputText.includes(rule.expected) : false
        break

      case 'output_matches':
        // Vérifie si la sortie correspond à la regex
        if (rule.expected) {
          try {
            const regex = new RegExp(rule.expected)
            passed = regex.test(outputText)
          } catch {
            console.warn(`Invalid regex in validation rule: ${rule.expected}`)
            passed = false
          }
        }
        break

      case 'variable_exists':
        // Vérifie si une variable existe dans le contexte d'exécution
        if (rule.variable && executionResult.context) {
          passed = rule.variable in executionResult.context
        } else {
          // Fallback: vérifier dans le code si la variable est déclarée
          if (rule.variable) {
            const varRegex = new RegExp(`(let|const|var)\\s+${rule.variable}\\s*=`)
            passed = varRegex.test(code)
          }
        }
        break

      case 'no_error':
        // Vérifie qu'il n'y a pas d'erreur d'exécution
        passed = !executionResult.errors || executionResult.errors.length === 0
        break

      default:
        console.warn(`Unknown validation rule type: ${rule.type}`)
        passed = false
    }

    rulesStatus.push(passed)

    if (passed) {
      allPassed++
      if (rule.successMessage) {
        messages.push(rule.successMessage)
      }
    } else {
      if (rule.errorMessage) {
        messages.push(rule.errorMessage)
        hints.push(rule.errorMessage)
      }
    }

    // Compteurs visibles (exclut no_error qui est un check interne)
    if (isVisible) {
      visibleTotal++
      if (passed) visiblePassed++
    }
  }

  return {
    isValid: allPassed === rules.length,
    passedRules: visiblePassed,
    totalRules: visibleTotal,
    rulesStatus,
    messages,
    hints
  }
}

/**
 * Génère les objectifs à partir des règles de validation
 * pour affichage dans l'interface
 */
export function generateObjectives(rules: ValidationRule[], rulesStatus?: boolean[]): Array<{
  label: string
  completed: boolean
  message?: string
}> {
  // On garde l'index original avec les règles pour accéder correctement à rulesStatus
  return rules
    .map((rule, originalIndex) => ({ rule, originalIndex }))
    .filter(({ rule }) => rule.type !== 'no_error') // On n'affiche pas "pas d'erreur" comme objectif
    .map(({ rule, originalIndex }) => {
      const completed = rulesStatus ? rulesStatus[originalIndex] || false : false
      // Le message dépend du statut : successMessage si passé, errorMessage si échoué
      // On ne montre le message que si une exécution a eu lieu (rulesStatus défini)
      const message = rulesStatus
        ? (completed ? rule.successMessage : rule.errorMessage)
        : undefined
      return { label: rule.description, completed, message }
    })
}
