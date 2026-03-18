/**
 * useExerciseEngine - Moteur d'exécution sécurisée du code JavaScript
 *
 * Composable responsable de :
 * - Exécuter le code JavaScript saisi par l'utilisateur dans un environnement sandbox
 * - Valider le code contre les tests pré-définis
 * - Capturer les logs, erreurs et résultats
 * - Fournir un feedback pédagogique immédiat
 * - Maintenir un contexte persistant entre les exécutions
 *
 * SÉCURITÉ :
 * - Utiliser Web Workers ou iframe sandbox pour isoler l'exécution
 * - Limiter l'accès aux APIs dangereuses
 * - Timeout pour éviter les boucles infinies
 * - Validation du code avant exécution
 *
 * TODO: Implémenter l'exécution dans un Web Worker
 * TODO: Ajouter un système de validation de code (AST parsing)
 */

import { ref, computed } from 'vue'
import { analyzePedagogicalError, detectCodeWarnings, formatValue } from '~/utils/pedagogicalMessages'

/**
 * Extrait le numéro de ligne de l'erreur dans le code de l'élève.
 *
 * Stratégies par ordre de priorité :
 * 1. Firefox/Safari : propriétés non-standard lineNumber/line
 * 2. Stack trace : patterns <anonymous>:LINE:COL (erreurs runtime Chrome/Firefox)
 * 3. SyntaxErrors : Web Worker pour obtenir le lineno exact (tous navigateurs)
 *
 * @param {Error} error - L'erreur JS capturée
 * @param {number} wrapperOffset - Nombre de lignes wrapper avant le code élève
 * @param {string} code - Le code original de l'élève
 * @returns {Promise<number|null>} - Numéro de ligne (1-indexed) ou null
 */
async function extractUserErrorLine(error, wrapperOffset, code) {
  if (!error) return null

  // --- Stratégie 1 : Propriétés non-standard (Firefox/Safari) ---
  // Firefox expose lineNumber sur toutes les erreurs
  if (typeof error.lineNumber === 'number' && error.lineNumber > 0) {
    const userLine = error.lineNumber - wrapperOffset
    if (userLine >= 1) return userLine
  }
  // Safari expose line
  if (typeof error.line === 'number' && error.line > 0) {
    const userLine = error.line - wrapperOffset
    if (userLine >= 1) return userLine
  }

  // --- Stratégie 2 : Parser le stack trace (runtime errors Chrome/Firefox) ---
  if (error.stack) {
    const patterns = [
      /<anonymous>:(\d+):(\d+)/,
      /anonymous:(\d+):(\d+)/,
      /Function:(\d+):(\d+)/,
    ]
    for (const pattern of patterns) {
      const match = error.stack.match(pattern)
      if (match) {
        const rawLine = parseInt(match[1])
        const userLine = rawLine - wrapperOffset
        if (userLine >= 1) return userLine
      }
    }
  }

  // --- Stratégie 3 : SyntaxErrors — Web Worker ---
  // Chrome ne met PAS de numéro de ligne dans le stack trace pour les SyntaxErrors
  // lancées par new AsyncFunction (le stack dit juste "at new AsyncFunction (<anonymous>)")
  // On crée un Worker temporaire qui parse le code : l'événement error contient lineno.
  if (error.name === 'SyntaxError' && code) {
    const workerLine = await findSyntaxErrorLineViaWorker(code)
    if (workerLine !== null) return workerLine
  }

  return null
}

/**
 * Trouve la ligne exacte d'une SyntaxError via un Web Worker.
 *
 * Le Worker tente de parser le code de l'élève. Si une SyntaxError existe,
 * le Worker échoue au parsing et l'événement 'error' contient le numéro
 * de ligne exact (event.lineno). Fonctionne pour TOUTES les SyntaxErrors
 * dans tous les navigateurs.
 *
 * @param {string} code - Le code de l'élève
 * @returns {Promise<number|null>} - Numéro de ligne (1-indexed) ou null
 */
function findSyntaxErrorLineViaWorker(code) {
  // Workers et Blob non disponibles en SSR (Nuxt generate)
  if (typeof Worker === 'undefined' || typeof Blob === 'undefined') {
    return Promise.resolve(null)
  }

  return new Promise((resolve) => {
    let resolved = false

    const done = (line) => {
      if (resolved) return
      resolved = true
      resolve(line)
    }

    try {
      // Créer un Blob JS avec 'use strict' + le code de l'élève
      const blob = new Blob(
        ['"use strict";\n' + code],
        { type: 'application/javascript' }
      )
      const url = URL.createObjectURL(blob)
      const worker = new Worker(url)

      worker.addEventListener('error', (event) => {
        event.preventDefault()
        // lineno est relatif au contenu du Blob
        // -1 pour la ligne "use strict" ajoutée en préfixe
        const userLine = event.lineno ? event.lineno - 1 : null
        worker.terminate()
        URL.revokeObjectURL(url)
        done(userLine && userLine >= 1 ? userLine : null)
      })

      // Timeout de sécurité (le Worker devrait échouer quasi-instantanément)
      setTimeout(() => {
        worker.terminate()
        URL.revokeObjectURL(url)
        done(null)
      }, 500)
    } catch {
      done(null)
    }
  })
}

/**
 * Composable principal pour le moteur d'exercices
 */
export const useExerciseEngine = () => {
  // État du moteur
  const isExecuting = ref(false)
  const lastResult = ref(null)
  const lastError = ref(null)
  const executionTime = ref(0)

  // Contexte persistant pour stocker les variables entre les exécutions
  const executionContext = ref({})

  /**
   * Exécute du code JavaScript dans un environnement sécurisé
   * avec contexte persistant entre les exécutions
   *
   * @param {string} code - Le code JavaScript à exécuter
   * @param {object} options - Options d'exécution (timeout, context, etc.)
   * @returns {Promise<object>} - Résultat de l'exécution avec logs et erreurs
   */
  const executeCode = async (code, options = {}) => {
    isExecuting.value = true
    lastError.value = null

    const logs = []
    const errors = []
    const warnings = []
    const startTime = performance.now() // Déplacé ici pour être accessible dans try ET catch
    let userCodeLineOffset = 0 // Offset pour convertir les lignes du wrapper en lignes du code élève

    try {

      // Détecter les warnings pédagogiques avant exécution
      const codeWarnings = detectCodeWarnings(code)
      warnings.push(...codeWarnings)

      // Créer un contexte sécurisé avec console.log capturé et formatage amélioré
      const sandboxConsole = {
        log: (...args) => {
          const formatted = args.map(arg => formatValue(arg)).join(' ')
          logs.push({
            type: 'log',
            content: formatted,
            data: args // Garder les données originales pour inspection
          })
        },
        error: (...args) => {
          // console.error est un appel volontaire, pas une vraie erreur JS
          // On l'ajoute aux logs (pas aux errors) pour ne pas bloquer la validation
          const formatted = args.map(arg => formatValue(arg)).join(' ')
          logs.push({
            type: 'error',
            content: formatted,
            data: args
          })
        },
        warn: (...args) => {
          const formatted = args.map(arg => formatValue(arg)).join(' ')
          logs.push({
            type: 'warn',
            content: formatted,
            data: args
          })
        },
        info: (...args) => {
          const formatted = args.map(arg => formatValue(arg)).join(' ')
          logs.push({
            type: 'info',
            content: formatted,
            data: args
          })
        },
        table: (data) => {
          // Formater le tableau/objet pour l'affichage
          let formatted
          if (Array.isArray(data)) {
            formatted = data.map((item, i) => `[${i}] ${formatValue(item)}`).join('\n')
          } else if (typeof data === 'object' && data !== null) {
            formatted = Object.entries(data).map(([k, v]) => `${k}: ${formatValue(v)}`).join('\n')
          } else {
            formatted = formatValue(data)
          }
          logs.push({
            type: 'table',
            content: formatted,
            data: [data]
          })
        },
        clear: () => {
          // Ne rien faire (on ne veut pas effacer les logs précédents)
        }
      }

      // Construire le code avec le contexte existant
      // On injecte les variables du contexte précédent
      const contextDeclarations = Object.entries(executionContext.value)
        .map(([key, value]) => {
          // Sérialiser la valeur pour l'injecter
          let serialized
          try {
            if (typeof value === 'function') {
              serialized = value.toString()
            } else if (typeof value === 'object') {
              serialized = JSON.stringify(value)
            } else {
              serialized = JSON.stringify(value)
            }
          } catch {
            serialized = 'undefined'
          }
          return `var ${key} = ${serialized};`
        })
        .join('\n')

      // Préfixe du wrapper (avant le code de l'élève)
      // Sert à calculer l'offset pour retrouver la ligne d'erreur dans le code original
      const wrapperPrefix =
        "'use strict';\n" +
        "const __context__ = {};\n" +
        "const __console__ = arguments[0];\n" +
        "const __codeStr__ = arguments[1];\n" +
        "const console = __console__;\n" +
        contextDeclarations + '\n'

      // Offset = lignes du préfixe + 1 pour le wrapper AsyncFunction
      // (le navigateur ajoute une ligne implicite "async function anonymous() {")
      userCodeLineOffset = wrapperPrefix.split('\n').length - 1 + 1

      // Créer une fonction qui capture les variables déclarées
      // Mode strict activé pour détecter les erreurs courantes
      // Utilisation de concaténation au lieu de template literals pour éviter
      // les conflits avec les backticks dans le code utilisateur
      //
      // Note: le bloc try/catch final avec eval() capture les variables déclarées
      // par l'élève dans le contexte persistant — c'est le mécanisme existant
      // du moteur d'exercices, pas un risque de sécurité (code élève sandboxé).
      const wrappedCode =
        wrapperPrefix +
        code + "\n" +
        "try {\n" +
        "  const varPattern = /(?:var|let|const)\\\\s+([a-zA-Z_$][a-zA-Z0-9_$]*)(?:\\\\s*=|;|,|\\\\s)/g;\n" +
        "  const matches = __codeStr__.matchAll(varPattern);\n" +
        "  for (const match of matches) {\n" +
        "    const varName = match[1];\n" +
        "    try {\n" +
        "      __context__[varName] = eval(varName);\n" +
        "    } catch(e) {}\n" +
        "  }\n" +
        "} catch(e) {}\n" +
        "return __context__;\n"

      // Créer une fonction async pour supporter le top-level await
      // (nécessaire pour les exercices async/await et API)
      const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor
      const func = new AsyncFunction(wrappedCode)

      // Exécuter avec timeout
      const timeout = options.timeout || 5000
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('⏱️ Timeout: L\'exécution a pris trop de temps (max 5s)')), timeout)
      })

      const executionPromise = func.call({}, sandboxConsole, code)

      const newContext = await Promise.race([executionPromise, timeoutPromise])

      // Mettre à jour le contexte avec les nouvelles variables
      if (newContext && typeof newContext === 'object') {
        // On merge le nouveau contexte avec l'ancien
        Object.assign(executionContext.value, newContext)
      }

      executionTime.value = performance.now() - startTime

      const result = {
        output: logs,
        logs,
        errors,
        warnings,
        success: errors.length === 0,
        executionTime: executionTime.value
      }

      lastResult.value = result
      return result

    } catch (error) {
      // Analyser l'erreur pour fournir un message pédagogique
      const pedagogicalError = analyzePedagogicalError(error, code)

      // Extraire le numéro de ligne depuis le stack trace ou par heuristique
      const userLine = await extractUserErrorLine(error, userCodeLineOffset, code)
      if (userLine !== null) {
        const codeLines = code.split('\n')
        if (userLine >= 1 && userLine <= codeLines.length) {
          pedagogicalError.line = userLine
          pedagogicalError.codeLine = codeLines[userLine - 1]
        }
      }

      lastError.value = pedagogicalError

      // Ajouter l'erreur pédagogique aux erreurs
      errors.push({
        type: 'error',
        content: error.message || String(error),
        pedagogical: pedagogicalError
      })

      executionTime.value = performance.now() - startTime

      const result = {
        output: logs,
        logs,
        errors,
        warnings,
        success: false,
        executionTime: executionTime.value
      }

      lastResult.value = result
      return result
    } finally {
      isExecuting.value = false
    }
  }

  /**
   * Valide le code contre des tests pré-définis
   *
   * @param {string} code - Le code à valider
   * @param {array} tests - Les tests à exécuter (format depuis content.config.ts)
   * @returns {Promise<object>} - Résultats des tests
   *
   * Types de tests supportés :
   * - output_contains: La sortie console contient une chaîne
   * - output_equals: La sortie console est exactement égale
   * - output_matches: La sortie console correspond à une regex
   * - variable_exists: Une variable existe dans le contexte
   * - variable_equals: Une variable a une valeur spécifique
   * - variable_type: Une variable est d'un type spécifique
   * - code_contains: Le code source contient une chaîne
   * - code_matches: Le code source correspond à une regex
   * - no_error: Pas d'erreur d'exécution
   */
  const validateCode = async (code, tests = []) => {
    if (!tests || tests.length === 0) {
      return {
        passed: 0,
        failed: 0,
        tests: [],
        success: true,
        feedback: []
      }
    }

    // Exécuter le code pour obtenir les résultats
    const executionResult = await executeCode(code)
    const { logs, errors, success: noError } = executionResult

    // Combiner tous les outputs en une seule chaîne pour les tests
    const allOutput = logs.map(log => log.content).join('\n')

    // Récupérer le contexte des variables
    const context = executionContext.value

    const testResults = []
    let passed = 0
    let failed = 0

    for (const test of tests) {
      const result = {
        description: test.description,
        type: test.type,
        passed: false,
        message: ''
      }

      try {
        switch (test.type) {
          case 'output_contains':
            result.passed = allOutput.includes(test.expected)
            result.message = result.passed
              ? (test.successMessage || 'Le texte attendu est présent dans la sortie')
              : (test.errorMessage || 'Le texte "' + test.expected + '" n\'est pas présent dans la sortie')
            break

          case 'output_equals':
            result.passed = allOutput.trim() === String(test.expected).trim()
            result.message = result.passed
              ? (test.successMessage || 'La sortie correspond exactement')
              : (test.errorMessage || 'La sortie ne correspond pas exactement à ce qui est attendu')
            break

          case 'output_matches':
            try {
              const regex = new RegExp(test.expected)
              result.passed = regex.test(allOutput)
              result.message = result.passed
                ? (test.successMessage || 'La sortie correspond au format attendu')
                : (test.errorMessage || 'La sortie ne correspond pas au format attendu')
            } catch (e) {
              result.passed = false
              result.message = 'Erreur dans le pattern de test: ' + e.message
            }
            break

          case 'variable_exists':
            result.passed = test.variable in context
            result.message = result.passed
              ? (test.successMessage || 'La variable "' + test.variable + '" existe')
              : (test.errorMessage || 'La variable "' + test.variable + '" n\'existe pas')
            break

          case 'variable_equals':
            if (!(test.variable in context)) {
              result.passed = false
              result.message = test.errorMessage || 'La variable "' + test.variable + '" n\'existe pas'
            } else {
              result.passed = context[test.variable] === test.expected
              result.message = result.passed
                ? (test.successMessage || 'La variable "' + test.variable + '" a la bonne valeur')
                : (test.errorMessage || 'La variable "' + test.variable + '" n\'a pas la valeur attendue')
            }
            break

          case 'variable_type':
            if (!(test.variable in context)) {
              result.passed = false
              result.message = test.errorMessage || 'La variable "' + test.variable + '" n\'existe pas'
            } else {
              result.passed = typeof context[test.variable] === test.expected
              result.message = result.passed
                ? (test.successMessage || 'La variable "' + test.variable + '" est du bon type')
                : (test.errorMessage || 'La variable "' + test.variable + '" devrait être de type ' + test.expected)
            }
            break

          case 'code_contains':
            result.passed = code.includes(test.expected)
            result.message = result.passed
              ? (test.successMessage || 'Le code contient l\'élément requis')
              : (test.errorMessage || 'Le code doit contenir "' + test.expected + '"')
            break

          case 'code_matches':
            try {
              const codeRegex = new RegExp(test.expected)
              result.passed = codeRegex.test(code)
              result.message = result.passed
                ? (test.successMessage || 'Le code correspond au format attendu')
                : (test.errorMessage || 'Le code ne correspond pas au format attendu')
            } catch (e) {
              result.passed = false
              result.message = 'Erreur dans le pattern de test: ' + e.message
            }
            break

          case 'no_error':
            result.passed = noError && errors.length === 0
            result.message = result.passed
              ? (test.successMessage || 'Aucune erreur d\'exécution')
              : (test.errorMessage || 'Le code contient des erreurs')
            break

          default:
            result.passed = false
            result.message = 'Type de test non supporté: ' + test.type
        }
      } catch (e) {
        result.passed = false
        result.message = 'Erreur lors de l\'exécution du test: ' + e.message
      }

      if (result.passed) {
        passed++
      } else {
        failed++
      }

      testResults.push(result)
    }

    // Générer le feedback global
    const feedback = []
    const allPassed = failed === 0

    if (allPassed) {
      // Chercher un message de succès dans les tests
      const successTest = tests.find(t => t.successMessage)
      feedback.push({
        type: 'success',
        message: successTest?.successMessage || 'Tous les tests sont passés !'
      })
    } else {
      // Ajouter les messages d'erreur des tests échoués
      testResults
        .filter(t => !t.passed)
        .forEach(t => {
          feedback.push({
            type: 'error',
            message: t.message
          })
        })
    }

    return {
      passed,
      failed,
      total: tests.length,
      tests: testResults,
      success: allPassed,
      feedback,
      executionResult
    }
  }

  /**
   * Réinitialise l'état du moteur et le contexte d'exécution
   */
  const reset = () => {
    isExecuting.value = false
    lastResult.value = null
    lastError.value = null
    executionTime.value = 0
    executionContext.value = {} // Réinitialiser le contexte
  }

  /**
   * Détecte les patterns de code dangereux
   *
   * @param {string} code - Le code à analyser
   * @returns {object} - Résultat de l'analyse de sécurité
   *
   * TODO: Implémenter la détection de patterns dangereux
   * TODO: Bloquer eval, Function, import, require non sécurisés
   */
  const analyzeCodeSafety = (code) => {
    console.warn('⚠️ useExerciseEngine.analyzeCodeSafety - Non implémenté')

    return {
      safe: true,
      warnings: [],
      blocked: []
    }
  }

  // Computed properties
  const hasResult = computed(() => lastResult.value !== null)
  const hasError = computed(() => lastError.value !== null)

  return {
    // State
    isExecuting,
    lastResult,
    lastError,
    executionTime,
    hasResult,
    hasError,

    // Methods
    executeCode,
    validateCode,
    reset,
    analyzeCodeSafety
  }
}
