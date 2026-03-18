/**
 * Tests automatisés pour le système de console pédagogique
 *
 * Ce script teste la logique des messages pédagogiques et du formatage
 * Pour exécuter : node test-console-pedagogique.js
 */

import { analyzePedagogicalError, detectCodeWarnings, formatValue } from './app/utils/pedagogicalMessages.ts'

console.log('🧪 === Tests de la Console Pédagogique Nuxy ===\n')

let testsPassed = 0
let testsFailed = 0

/**
 * Helper pour afficher les résultats de test
 */
function test(name, callback) {
  try {
    callback()
    console.log(`✅ ${name}`)
    testsPassed++
  } catch (error) {
    console.log(`❌ ${name}`)
    console.log(`   Erreur: ${error.message}`)
    testsFailed++
  }
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed')
  }
}

// ==========================================
// Test 1 : Variable non déclarée (ReferenceError)
// ==========================================
console.log('\n📋 Test 1 : Variable non déclarée (ReferenceError)\n')

test('Détecte ReferenceError pour variable non déclarée', () => {
  const error = new ReferenceError('a is not defined')
  const code = 'a = 10\nconsole.log(a)'

  const result = analyzePedagogicalError(error, code)

  assert(result.type === 'error', 'Type devrait être error')
  assert(result.title === "Variable 'a' non déclarée", 'Titre devrait mentionner la variable')
  assert(result.message.includes('a'), 'Message devrait mentionner la variable a')
  assert(result.hint.includes('let') || result.hint.includes('const'), 'Hint devrait mentionner let ou const')
  assert(result.example, 'Devrait avoir un exemple')
  assert(result.learnMore.includes('developer.mozilla.org'), 'LearnMore devrait pointer vers MDN')
})

test('Extrait le bon nom de variable du ReferenceError', () => {
  const error = new ReferenceError('compteur is not defined')
  const code = 'compteur++'

  const result = analyzePedagogicalError(error, code)

  assert(result.title.includes('compteur'), 'Titre devrait mentionner compteur')
  assert(result.example.includes('compteur'), 'Exemple devrait mentionner compteur')
})

// ==========================================
// Test 2 : Erreurs de syntaxe
// ==========================================
console.log('\n📋 Test 2 : Erreurs de syntaxe\n')

test('Détecte parenthèse manquante', () => {
  const error = new SyntaxError('Unexpected end of input')
  const code = 'if (true) {\n  console.log("test"'

  const result = analyzePedagogicalError(error, code)

  assert(result.type === 'error', 'Type devrait être error')
  assert(result.title.includes('Parenthèse') || result.title.includes('accolade'), 'Titre devrait mentionner parenthèse/accolade')
  assert(result.hint, 'Devrait avoir un conseil')
  assert(result.example, 'Devrait avoir un exemple')
})

test('Détecte token inattendu', () => {
  const error = new SyntaxError("Unexpected token '}'")
  const code = 'const a = 10;; const b = 20'

  const result = analyzePedagogicalError(error, code)

  assert(result.type === 'error', 'Type devrait être error')
  assert(result.title === 'Erreur de syntaxe', 'Titre devrait être Erreur de syntaxe')
  assert(result.message.includes('}'), 'Message devrait mentionner le token')
})

// ==========================================
// Test 3 : Warnings pédagogiques
// ==========================================
console.log('\n📋 Test 3 : Warnings pédagogiques\n')

test('Détecte utilisation de var', () => {
  const code = 'var x = 10\nvar y = 20'

  const warnings = detectCodeWarnings(code)

  assert(warnings.length > 0, 'Devrait détecter au moins un warning')
  const varWarning = warnings.find(w => w.title.includes('var'))
  assert(varWarning, 'Devrait détecter warning pour var')
  assert(varWarning.type === 'warning', 'Type devrait être warning')
  assert(varWarning.hint.includes('let') || varWarning.hint.includes('const'), 'Devrait suggérer let/const')
})

test('Détecte utilisation de ==', () => {
  const code = 'if (x == 5) { console.log("test") }'

  const warnings = detectCodeWarnings(code)

  const eqWarning = warnings.find(w => w.title.includes('=='))
  assert(eqWarning, 'Devrait détecter warning pour ==')
  assert(eqWarning.message.includes('==='), 'Devrait mentionner ===')
})

test('Détecte beaucoup de console.log', () => {
  const code = 'console.log(1)\nconsole.log(2)\nconsole.log(3)\nconsole.log(4)\nconsole.log(5)\nconsole.log(6)'

  const warnings = detectCodeWarnings(code)

  const logWarning = warnings.find(w => w.title.includes('console.log'))
  assert(logWarning, 'Devrait détecter warning pour trop de console.log')
  assert(logWarning.type === 'info', 'Type devrait être info')
})

test('Ne détecte pas de warning pour bon code', () => {
  const code = 'const x = 10\nlet y = 20\nif (x === 5) { console.log(y) }'

  const warnings = detectCodeWarnings(code)

  // Pas de warning pour var, ni pour ==
  const varWarning = warnings.find(w => w.title.includes('var'))
  const eqWarning = warnings.find(w => w.title.includes('=='))
  assert(!varWarning, 'Ne devrait pas détecter warning pour var')
  assert(!eqWarning, 'Ne devrait pas détecter warning pour ==')
})

// ==========================================
// Test 4 : Formatage des valeurs
// ==========================================
console.log('\n📋 Test 4 : Formatage des valeurs\n')

test('Formate les chaînes de caractères', () => {
  const result = formatValue('Hello World')
  assert(result === 'Hello World', 'Devrait retourner la chaîne telle quelle')
})

test('Formate les nombres', () => {
  assert(formatValue(42) === '42', 'Devrait formater nombre')
  assert(formatValue(3.14) === '3.14', 'Devrait formater décimal')
})

test('Formate les booléens', () => {
  assert(formatValue(true) === 'true', 'Devrait formater true')
  assert(formatValue(false) === 'false', 'Devrait formater false')
})

test('Formate null et undefined', () => {
  assert(formatValue(null) === 'null', 'Devrait formater null')
  assert(formatValue(undefined) === 'undefined', 'Devrait formater undefined')
})

test('Formate les objets simples', () => {
  const obj = { nom: 'Alice', age: 25 }
  const result = formatValue(obj)

  assert(result.includes('nom'), 'Devrait inclure la clé nom')
  assert(result.includes('Alice'), 'Devrait inclure la valeur Alice')
  assert(result.includes('age'), 'Devrait inclure la clé age')
  assert(result.includes('25'), 'Devrait inclure la valeur 25')
})

test('Formate les tableaux courts', () => {
  const arr = [1, 2, 3, 4, 5]
  const result = formatValue(arr)

  assert(result.includes('1'), 'Devrait inclure 1')
  assert(result.includes('5'), 'Devrait inclure 5')
})

test('Tronque les tableaux longs', () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const result = formatValue(arr)

  assert(result.includes('...'), 'Devrait tronquer avec ...')
  assert(result.includes('items'), 'Devrait mentionner items')
})

test('Formate les tableaux vides', () => {
  const result = formatValue([])
  assert(result === '[]', 'Devrait retourner []')
})

test('Formate les objets vides', () => {
  const result = formatValue({})
  assert(result === '{}', 'Devrait retourner {}')
})

test('Formate les fonctions', () => {
  function maFonction() { return 42 }
  const result = formatValue(maFonction)

  assert(result.includes('Function'), 'Devrait mentionner Function')
  assert(result.includes('maFonction'), 'Devrait mentionner le nom de la fonction')
})

test('Formate les fonctions anonymes', () => {
  const result = formatValue(() => 42)

  assert(result.includes('Function'), 'Devrait mentionner Function')
  assert(result.includes('anonymous'), 'Devrait mentionner anonymous')
})

test('Tronque les objets complexes', () => {
  const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }
  const result = formatValue(obj)

  assert(result.includes('...'), 'Devrait tronquer avec ...')
  assert(result.includes('keys'), 'Devrait mentionner keys')
})

// ==========================================
// Test 5 : TypeError
// ==========================================
console.log('\n📋 Test 5 : TypeError\n')

test('Détecte appel sur non-fonction', () => {
  const error = new TypeError('x is not a function')
  const code = 'const x = 42\nx()'

  const result = analyzePedagogicalError(error, code)

  assert(result.type === 'error', 'Type devrait être error')
  assert(result.title.includes('fonction'), 'Titre devrait mentionner fonction')
  assert(result.message.includes('fonction'), 'Message devrait expliquer le problème')
  assert(result.example, 'Devrait avoir un exemple')
})

test('Détecte lecture de propriété sur undefined', () => {
  const error = new TypeError("Cannot read properties of undefined (reading 'name')")
  const code = 'const obj = undefined\nconsole.log(obj.name)'

  const result = analyzePedagogicalError(error, code)

  assert(result.type === 'error', 'Type devrait être error')
  assert(result.title.includes('propriété'), 'Titre devrait mentionner propriété')
  assert(result.hint, 'Devrait avoir un conseil')
})

// ==========================================
// Test 6 : RangeError
// ==========================================
console.log('\n📋 Test 6 : RangeError (Récursion infinie)\n')

test('Détecte récursion infinie', () => {
  const error = new RangeError('Maximum call stack size exceeded')
  const code = 'function loop() { loop() }\nloop()'

  const result = analyzePedagogicalError(error, code)

  assert(result.type === 'error', 'Type devrait être error')
  assert(result.title.includes('Récursion') || result.title.includes('récursion'), 'Titre devrait mentionner récursion')
  assert(result.message.includes('récursive') || result.message.includes('elle-même'), 'Message devrait expliquer la récursion')
  assert(result.hint.includes('condition'), 'Hint devrait mentionner condition d\'arrêt')
  assert(result.example, 'Devrait avoir un exemple')
})

// ==========================================
// Résumé des tests
// ==========================================
console.log('\n' + '='.repeat(50))
console.log('📊 Résumé des tests')
console.log('='.repeat(50))
console.log(`✅ Tests réussis : ${testsPassed}`)
console.log(`❌ Tests échoués : ${testsFailed}`)
console.log(`📈 Total : ${testsPassed + testsFailed}`)
console.log(`🎯 Taux de réussite : ${((testsPassed / (testsPassed + testsFailed)) * 100).toFixed(1)}%`)

if (testsFailed === 0) {
  console.log('\n🎉 Tous les tests sont passés avec succès !')
  console.log('✅ La logique de la console pédagogique fonctionne correctement')
} else {
  console.log('\n⚠️ Certains tests ont échoué')
  console.log('🔍 Veuillez vérifier les erreurs ci-dessus')
  process.exit(1)
}

console.log('\n' + '='.repeat(50))
console.log('📝 Prochaines étapes :')
console.log('   1. Tests visuels dans le navigateur (TESTS_CONSOLE.md)')
console.log('   2. Tests responsive et multi-navigateurs')
console.log('   3. Tests d\'accessibilité')
console.log('='.repeat(50) + '\n')
