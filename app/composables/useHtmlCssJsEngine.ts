/**
 * useHtmlCssJsEngine - Moteur d'exécution et validation pour exercices HTML/CSS/JS
 *
 * Gère :
 * - L'exécution du code dans une iframe sandboxée (via PreviewPanel)
 * - Les validations DOM (dom_contains, dom_style, etc.)
 * - La collecte des résultats console
 */

import { ref, computed } from 'vue'
import type {
  HtmlCssJsCode,
  HtmlCssJsExecutionResult,
  ConsoleEntry,
  ErrorEntry,
  DomValidationRule,
  DomValidationResult
} from '~/types/htmlCssJs'

// Note: Types renommés pour éviter les conflits avec exerciseValidator.ts
// (Nuxt auto-importe tous les exports, ce qui cause des collisions de noms)
export interface HtmlCssJsValidationRule {
  description: string
  type: string
  expected?: string | number | boolean | string[]
  selector?: string
  property?: string
  attribute?: string
  expectedCount?: number
  triggerEvent?: string
  errorMessage?: string
  successMessage?: string
  hidden?: boolean
}

export interface HtmlCssJsValidationResult {
  passed: boolean
  message: string
  rule: HtmlCssJsValidationRule
}

export function useHtmlCssJsEngine() {
  // État
  const consoleEntries = ref<Array<ConsoleEntry | ErrorEntry>>([])
  const isExecuting = ref(false)
  const executionTime = ref(0)
  const lastError = ref<ErrorEntry | null>(null)
  const documentReady = ref(false)

  // Référence à l'iframe pour les validations DOM
  let iframeWindow: Window | null = null

  /**
   * Enregistre la fenêtre de l'iframe pour les validations DOM
   */
  function setIframeWindow(win: Window | null) {
    iframeWindow = win
  }

  /**
   * Ajoute une entrée console
   */
  function addConsoleEntry(entry: ConsoleEntry) {
    consoleEntries.value.push(entry)
  }

  /**
   * Ajoute une erreur
   */
  function addError(entry: ErrorEntry) {
    consoleEntries.value.push(entry)
    lastError.value = entry
  }

  /**
   * Signale que le document est prêt
   */
  function setDocumentReady(ready: boolean) {
    documentReady.value = ready
  }

  /**
   * Efface les résultats
   */
  function clearResults() {
    consoleEntries.value = []
    lastError.value = null
    documentReady.value = false
    executionTime.value = 0
  }

  /**
   * Vérifie si le code contient un pattern
   */
  function codeContains(code: HtmlCssJsCode, pattern: string): boolean {
    const allCode = `${code.html || ''}\n${code.css || ''}\n${code.js || ''}`
    return allCode.includes(pattern)
  }

  /**
   * Vérifie si le code match une regex
   */
  function codeMatches(code: HtmlCssJsCode, pattern: string): boolean {
    const allCode = `${code.html || ''}\n${code.css || ''}\n${code.js || ''}`
    try {
      const regex = new RegExp(pattern)
      return regex.test(allCode)
    } catch {
      return false
    }
  }

  /**
   * Vérifie si la sortie console contient un pattern
   */
  function outputContains(pattern: string): boolean {
    const output = consoleEntries.value
      .filter(e => e.type !== 'error')
      .map(e => e.content)
      .join('\n')
    return output.includes(pattern)
  }

  /**
   * Vérifie si la sortie console match une regex
   */
  function outputMatches(pattern: string): boolean {
    const output = consoleEntries.value
      .filter(e => e.type !== 'error')
      .map(e => e.content)
      .join('\n')
    try {
      const regex = new RegExp(pattern)
      return regex.test(output)
    } catch {
      return false
    }
  }

  /**
   * Vérifie s'il n'y a pas d'erreur
   */
  function hasNoError(): boolean {
    return consoleEntries.value.filter(e => e.type === 'error').length === 0
  }

  /**
   * Exécute une validation DOM dans l'iframe
   * Note: Cette fonction est appelée via postMessage vers l'iframe
   */
  function validateDomRule(rule: DomValidationRule): DomValidationResult {
    // Si pas d'iframe disponible, retourner échec
    if (!iframeWindow) {
      return {
        passed: false,
        message: rule.errorMessage || 'Iframe non disponible pour la validation DOM',
        rule
      }
    }

    try {
      const doc = iframeWindow.document

      switch (rule.type) {
        case 'dom_contains': {
          const element = doc.querySelector(rule.selector)
          const passed = element !== null
          return {
            passed,
            message: passed
              ? (rule.successMessage || `Élément "${rule.selector}" trouvé`)
              : (rule.errorMessage || `Élément "${rule.selector}" non trouvé`),
            rule
          }
        }

        case 'dom_text_contains': {
          const element = doc.querySelector(rule.selector)
          if (!element) {
            return {
              passed: false,
              message: rule.errorMessage || `Élément "${rule.selector}" non trouvé`,
              rule
            }
          }
          const textContent = element.textContent || ''
          const passed = textContent.includes(String(rule.expected))
          return {
            passed,
            message: passed
              ? (rule.successMessage || `Texte "${rule.expected}" trouvé dans "${rule.selector}"`)
              : (rule.errorMessage || `Texte "${rule.expected}" non trouvé dans "${rule.selector}"`),
            rule
          }
        }

        case 'dom_style': {
          const element = doc.querySelector(rule.selector) as HTMLElement | null
          if (!element) {
            return {
              passed: false,
              message: rule.errorMessage || `Élément "${rule.selector}" non trouvé`,
              rule
            }
          }
          const computedStyle = iframeWindow.getComputedStyle(element)
          const actualValue = computedStyle.getPropertyValue(rule.property || '')
          const passed = actualValue === rule.expected ||
                        actualValue.includes(String(rule.expected))
          return {
            passed,
            message: passed
              ? (rule.successMessage || `Style "${rule.property}" correct`)
              : (rule.errorMessage || `Style "${rule.property}" incorrect (attendu: ${rule.expected}, actuel: ${actualValue})`),
            rule
          }
        }

        case 'dom_attribute': {
          const element = doc.querySelector(rule.selector)
          if (!element) {
            return {
              passed: false,
              message: rule.errorMessage || `Élément "${rule.selector}" non trouvé`,
              rule
            }
          }
          const attrValue = element.getAttribute(rule.attribute || '')
          const passed = attrValue === rule.expected
          return {
            passed,
            message: passed
              ? (rule.successMessage || `Attribut "${rule.attribute}" correct`)
              : (rule.errorMessage || `Attribut "${rule.attribute}" incorrect`),
            rule
          }
        }

        case 'dom_class_contains': {
          const element = doc.querySelector(rule.selector)
          if (!element) {
            return {
              passed: false,
              message: rule.errorMessage || `Élément "${rule.selector}" non trouvé`,
              rule
            }
          }
          const passed = element.classList.contains(String(rule.expected))
          return {
            passed,
            message: passed
              ? (rule.successMessage || `Classe "${rule.expected}" présente`)
              : (rule.errorMessage || `Classe "${rule.expected}" absente`),
            rule
          }
        }

        case 'dom_count': {
          const elements = doc.querySelectorAll(rule.selector)
          const actualCount = elements.length
          const expectedCount = rule.expectedCount ?? 0
          const passed = actualCount === expectedCount
          return {
            passed,
            message: passed
              ? (rule.successMessage || `${actualCount} élément(s) trouvé(s)`)
              : (rule.errorMessage || `Nombre d'éléments incorrect (attendu: ${expectedCount}, actuel: ${actualCount})`),
            rule
          }
        }

        default:
          return {
            passed: false,
            message: `Type de validation DOM inconnu: ${rule.type}`,
            rule
          }
      }
    } catch (error) {
      return {
        passed: false,
        message: `Erreur lors de la validation: ${error instanceof Error ? error.message : 'Erreur inconnue'}`,
        rule
      }
    }
  }

  /**
   * Valide le code selon les règles
   */
  function validateCode(code: HtmlCssJsCode, rules: HtmlCssJsValidationRule[]): HtmlCssJsValidationResult[] {
    return rules.map(rule => {
      let passed = false
      let message = rule.errorMessage || 'Validation échouée'

      switch (rule.type) {
        case 'code_contains':
          passed = codeContains(code, String(rule.expected))
          break

        case 'code_matches':
          passed = codeMatches(code, String(rule.expected))
          break

        case 'output_contains':
          passed = outputContains(String(rule.expected))
          break

        case 'output_matches':
          passed = outputMatches(String(rule.expected))
          break

        case 'no_error':
          passed = hasNoError()
          break

        // Validations DOM - déléguer à validateDomRule
        case 'dom_contains':
        case 'dom_text_contains':
        case 'dom_style':
        case 'dom_attribute':
        case 'dom_class_contains':
        case 'dom_count': {
          const domResult = validateDomRule({
            description: rule.description,
            type: rule.type as any,
            selector: rule.selector || '',
            expected: rule.expected,
            property: rule.property,
            attribute: rule.attribute,
            expectedCount: rule.expectedCount,
            triggerEvent: rule.triggerEvent,
            errorMessage: rule.errorMessage,
            successMessage: rule.successMessage
          })
          passed = domResult.passed
          message = domResult.message
          break
        }

        default:
          message = `Type de validation inconnu: ${rule.type}`
      }

      if (passed && rule.successMessage) {
        message = rule.successMessage
      } else if (!passed && rule.errorMessage) {
        message = rule.errorMessage
      }

      return { passed, message, rule }
    })
  }

  /**
   * Résumé des résultats d'exécution
   */
  const executionResults = computed<HtmlCssJsExecutionResult>(() => ({
    logs: consoleEntries.value.filter((e): e is ConsoleEntry => e.type !== 'error'),
    errors: consoleEntries.value.filter((e): e is ErrorEntry => e.type === 'error'),
    success: hasNoError(),
    documentReady: documentReady.value
  }))

  return {
    // État
    consoleEntries,
    isExecuting,
    executionTime,
    lastError,
    documentReady,
    executionResults,

    // Actions
    setIframeWindow,
    addConsoleEntry,
    addError,
    setDocumentReady,
    clearResults,

    // Validations
    validateCode,
    validateDomRule,
    codeContains,
    codeMatches,
    outputContains,
    outputMatches,
    hasNoError
  }
}
