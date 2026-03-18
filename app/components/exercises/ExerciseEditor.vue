<script setup lang="ts">
/**
 * ExerciseEditor - Éditeur de code interactif avec CodeMirror
 *
 * Composant principal pour afficher un éditeur de code avec :
 * - Éditeur CodeMirror avec coloration syntaxique JavaScript
 * - Zone d'affichage des résultats (logs, erreurs, outputs)
 * - Exécution sécurisée dans un sandbox
 * - Raccourcis clavier (Ctrl+Enter / Cmd+Enter)
 * - Thème sombre adapté à l'apprentissage
 */

import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { EditorView, keymap } from '@codemirror/view'
import { EditorState, Prec, type Extension } from '@codemirror/state'
import { javascript } from '@codemirror/lang-javascript'
import { html } from '@codemirror/lang-html'
import { css } from '@codemirror/lang-css'
import { oneDark } from '@codemirror/theme-one-dark'
import { basicSetup } from 'codemirror'
import { indentWithTab } from '@codemirror/commands'
import { indentUnit } from '@codemirror/language'
import { autocompletion, acceptCompletion, ifNotIn, type CompletionContext, type CompletionResult } from '@codemirror/autocomplete'

// Type pour les langages supportés
export type EditorLanguage = 'javascript' | 'html' | 'css'


/**
 * Extrait les variables, constantes et fonctions déclarées dans le code
 */
function extractUserDeclarations(code: string): Array<{label: string, type: string, info: string}> {
  const declarations: Array<{label: string, type: string, info: string}> = []
  const seen = new Set<string>()

  // Pattern pour const/let/var
  const varRegex = /(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/g
  let match
  while ((match = varRegex.exec(code)) !== null) {
    const name = match[1]
    if (!seen.has(name)) {
      seen.add(name)
      const keyword = code.substring(match.index, match.index + 5).trim()
      const type = keyword === 'const' ? 'constant' : 'variable'
      const info = keyword === 'const' ? 'Ta constante' : 'Ta variable'
      declarations.push({ label: name, type, info })
    }
  }

  // Pattern pour function nomFonction()
  const funcRegex = /function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g
  while ((match = funcRegex.exec(code)) !== null) {
    const name = match[1]
    if (!seen.has(name)) {
      seen.add(name)
      declarations.push({ label: name, type: 'function', info: 'Ta fonction' })
    }
  }

  // Pattern pour const nomFonction = () => ou const nomFonction = function()
  const arrowRegex = /(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(?:\(|function)/g
  while ((match = arrowRegex.exec(code)) !== null) {
    const name = match[1]
    if (!seen.has(name)) {
      seen.add(name)
      declarations.push({ label: name, type: 'function', info: 'Ta fonction' })
    }
  }

  return declarations
}

/**
 * Source de complétion dynamique qui combine :
 * - Les complétions statiques pour débutants
 * - Les déclarations de l'utilisateur (variables, constantes, fonctions)
 * - Gère le contexte après un point pour les méthodes/propriétés
 */
function dynamicCompletionSource(context: CompletionContext): CompletionResult | null {
  // Vérifier si on est après un point (pour les méthodes/propriétés)
  const afterDot = context.matchBefore(/\.\w*/)

  // Récupérer le mot en cours de frappe (pour variables, fonctions, etc.)
  const word = context.matchBefore(/[a-zA-Z_$][a-zA-Z0-9_$]*/)

  // Ne pas déclencher l'autocomplétion pour les mots trop courts (< 2 caractères)
  // Cela évite les interférences avec la virgule dans les tableaux [1, 2, 3]
  if (!afterDot && word && word.text.length < 2 && !context.explicit) return null

  // Si ni après un point, ni en train de taper un mot, pas de complétion
  if (!afterDot && !word && !context.explicit) return null

  // Récupérer le code complet de l'éditeur
  const code = context.state.doc.toString()

  // Extraire les déclarations utilisateur
  const userDeclarations = extractUserDeclarations(code)

  // Si on est après un point, proposer uniquement les méthodes/propriétés
  if (afterDot) {
    const methodCompletions = staticCompletions.filter(c =>
      c.type === 'method' || c.type === 'property'
    )
    return {
      from: afterDot.from + 1,  // Commencer APRÈS le point
      options: methodCompletions,
      validFor: /^\w*$/
    }
  }

  // Sinon, proposer variables utilisateur + mots-clés (sans les méthodes avec point)
  const nonMethodCompletions = staticCompletions.filter(c =>
    c.type !== 'method' && c.type !== 'property'
  )

  const allCompletions = [
    // D'abord les déclarations utilisateur (priorité)
    ...userDeclarations.map(d => ({
      label: d.label,
      type: d.type,
      info: d.info,
      boost: 10  // Priorité plus haute pour les déclarations utilisateur
    })),
    // Ensuite les complétions statiques (sans méthodes)
    ...nonMethodCompletions
  ]

  return {
    from: word?.from ?? context.pos,
    options: allCompletions,
    validFor: /^[a-zA-Z_$][a-zA-Z0-9_$]*$/
  }
}

/**
 * Liste statique des complétions pour débutants JavaScript
 * Limitée aux mots-clés essentiels du cours 122 (pas de templates)
 */
const staticCompletions = [
  // Console
  { label: 'console.log', type: 'function', info: 'Affiche un message dans la console' },
  { label: 'console.warn', type: 'function', info: 'Affiche un avertissement' },
  { label: 'console.error', type: 'function', info: 'Affiche une erreur' },

  // Déclarations
  { label: 'let', type: 'keyword', info: 'Déclare une variable modifiable' },
  { label: 'const', type: 'keyword', info: 'Déclare une constante (non modifiable)' },
  { label: 'function', type: 'keyword', info: 'Déclare une fonction' },
  { label: 'return', type: 'keyword', info: 'Retourne une valeur depuis une fonction' },

  // Conditions et boucles
  { label: 'if', type: 'keyword', info: 'Condition si' },
  { label: 'else', type: 'keyword', info: 'Sinon' },
  { label: 'for', type: 'keyword', info: 'Boucle for' },
  { label: 'while', type: 'keyword', info: 'Boucle while' },

  // Valeurs spéciales
  { label: 'true', type: 'constant', info: 'Valeur booléenne vraie' },
  { label: 'false', type: 'constant', info: 'Valeur booléenne fausse' },
  { label: 'null', type: 'constant', info: 'Valeur nulle' },
  { label: 'undefined', type: 'constant', info: 'Valeur non définie' },

  // Opérateurs
  { label: 'typeof', type: 'keyword', info: 'Retourne le type d\'une valeur' },

  // Méthodes de chaînes (strings)
  { label: 'length', type: 'property', info: 'Longueur de la chaîne' },
  { label: 'toUpperCase', type: 'method', info: 'Convertit en majuscules' },
  { label: 'toLowerCase', type: 'method', info: 'Convertit en minuscules' },
  { label: 'trim', type: 'method', info: 'Supprime les espaces aux extrémités' },
  { label: 'includes', type: 'method', info: 'Vérifie si contient une sous-chaîne' },
  { label: 'indexOf', type: 'method', info: 'Position d\'une sous-chaîne' },
  { label: 'slice', type: 'method', info: 'Extrait une partie de la chaîne' },
  { label: 'split', type: 'method', info: 'Divise en tableau' },
  { label: 'replace', type: 'method', info: 'Remplace du texte' },

  // Méthodes de tableaux (arrays)
  { label: 'push', type: 'method', info: 'Ajoute à la fin du tableau' },
  { label: 'pop', type: 'method', info: 'Retire le dernier élément' },
  { label: 'shift', type: 'method', info: 'Retire le premier élément' },
  { label: 'unshift', type: 'method', info: 'Ajoute au début du tableau' },
  { label: 'map', type: 'method', info: 'Transforme chaque élément' },
  { label: 'filter', type: 'method', info: 'Filtre les éléments' },
  { label: 'find', type: 'method', info: 'Trouve un élément' },
  { label: 'forEach', type: 'method', info: 'Parcourt chaque élément' },
  { label: 'join', type: 'method', info: 'Joint les éléments en chaîne' },
  { label: 'sort', type: 'method', info: 'Trie le tableau' },
  { label: 'reverse', type: 'method', info: 'Inverse l\'ordre' },

  // Math
  { label: 'Math.round', type: 'function', info: 'Arrondit au plus proche' },
  { label: 'Math.floor', type: 'function', info: 'Arrondit vers le bas' },
  { label: 'Math.ceil', type: 'function', info: 'Arrondit vers le haut' },
  { label: 'Math.random', type: 'function', info: 'Nombre aléatoire entre 0 et 1' },
  { label: 'Math.max', type: 'function', info: 'Retourne le plus grand' },
  { label: 'Math.min', type: 'function', info: 'Retourne le plus petit' },
  { label: 'Math.abs', type: 'function', info: 'Valeur absolue' },

  // Conversions
  { label: 'parseInt', type: 'function', info: 'Convertit en entier' },
  { label: 'parseFloat', type: 'function', info: 'Convertit en décimal' },
  { label: 'String', type: 'function', info: 'Convertit en chaîne' },
  { label: 'Number', type: 'function', info: 'Convertit en nombre' },
  { label: 'Boolean', type: 'function', info: 'Convertit en booléen' },

  // Interactions
  { label: 'alert', type: 'function', info: 'Affiche une boîte de dialogue' },
  { label: 'prompt', type: 'function', info: 'Demande une saisie utilisateur' },
]

// Props pour configurer l'éditeur
interface Props {
  exerciseId?: string
  readOnly?: boolean
  placeholder?: string
  initialCode?: string
  language?: EditorLanguage
}

const props = withDefaults(defineProps<Props>(), {
  readOnly: false,
  placeholder: 'Tapez votre code ici...',
  initialCode: '',
  language: 'javascript'
})

/**
 * Retourne l'extension de langage CodeMirror appropriée
 */
function getLanguageExtension(lang: EditorLanguage): Extension {
  switch (lang) {
    case 'html':
      return html()
    case 'css':
      return css()
    case 'javascript':
    default:
      return javascript()
  }
}

// Noeuds Lezer dans lesquels l'autocomplétion ne doit jamais se déclencher
const noCompletionNodes = [
  'String',          // "hello", 'world'
  'TemplateString',  // `template`
  'LineComment',     // // commentaire
  'BlockComment',    // /* commentaire */
  'RegExp',          // /pattern/
]

/**
 * Retourne les extensions d'autocomplétion selon le langage
 * L'autocomplétion dynamique est uniquement pour JavaScript
 */
function getAutocompletionExtension(lang: EditorLanguage): Extension[] {
  if (lang === 'javascript') {
    return [
      autocompletion({
        override: [ifNotIn(noCompletionNodes, dynamicCompletionSource)],
        activateOnTyping: true,
        activateOnTypingDelay: 300,
        selectOnOpen: false,
        filterStrict: true,
        maxRenderedOptions: 10,
        closeOnBlur: true,
      })
    ]
  }
  // Pour HTML/CSS, on utilise l'autocomplétion par défaut de CodeMirror
  return []
}

// Définir les événements émis
const emit = defineEmits<{
  execute: [code: string]
  'code-change': [code: string]
}>()

// Debounce timer pour l'auto-save
let debounceTimer: ReturnType<typeof setTimeout> | null = null

/**
 * Émet l'événement code-change avec debounce (évite trop d'écritures)
 */
const emitCodeChange = (code: string) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  debounceTimer = setTimeout(() => {
    emit('code-change', code)
  }, 500) // 500ms de debounce
}

// Références pour CodeMirror
const editorContainer = ref<HTMLElement | null>(null)
let editorView: EditorView | null = null

/**
 * Exécute le code saisi dans l'éditeur
 * Note: N'exécute pas vraiment le code, juste émet l'événement vers le parent
 * C'est le parent (via [slug].vue) qui gère l'exécution avec useExerciseEngine
 */
const executeCode = async () => {
  if (!editorView) return

  const code = editorView.state.doc.toString()
  if (!code.trim()) return

  // Émettre l'événement execute vers le parent avec le code
  emit('execute', code)
}

/**
 * Efface l'éditeur
 */
const clearAll = () => {
  if (editorView) {
    editorView.dispatch({
      changes: { from: 0, to: editorView.state.doc.length, insert: '' }
    })
  }
}

/**
 * Récupère le code actuel de l'éditeur
 */
const getCode = () => {
  if (!editorView) return ''
  return editorView.state.doc.toString()
}

/**
 * Définit le code de l'éditeur
 */
const setCode = (code: string) => {
  if (!editorView) return
  editorView.dispatch({
    changes: { from: 0, to: editorView.state.doc.length, insert: code }
  })
}

// Exposer les méthodes pour le composant parent
defineExpose({
  getCode,
  setCode,
  executeCode,
  clearAll
})

/**
 * Crée les extensions CodeMirror selon le langage
 */
function createEditorExtensions(): Extension[] {
  return [
    basicSetup,
    getLanguageExtension(props.language),
    // Autocomplétion selon le langage
    ...getAutocompletionExtension(props.language),
    oneDark,
    // Configuration de l'indentation à 2 espaces pour HTML/CSS, 4 pour JS
    indentUnit.of(props.language === 'javascript' ? "    " : "  "),
    // Keymap pour Tab : accepter l'autocomplétion OU indenter
    keymap.of([
      {
        key: 'Tab',
        run: (view) => {
          // Tenter d'accepter l'autocomplétion
          if (acceptCompletion(view)) {
            return true
          }
          // Sinon, laisser indentWithTab gérer
          return false
        }
      },
      indentWithTab
    ]),
    // Keymap avec priorité haute pour surcharger les raccourcis par défaut
    Prec.highest(keymap.of([
      {
        key: 'Mod-Enter',  // Mod = Ctrl sur Windows/Linux, Cmd sur Mac
        run: () => {
          executeCode()
          return true  // Empêche le comportement par défaut
        },
        preventDefault: true
      },
      {
        key: 'Shift-Enter',  // Alternative : Shift+Enter
        run: () => {
          executeCode()
          return true
        },
        preventDefault: true
      }
    ])),
    EditorView.editable.of(!props.readOnly),
    // Listener pour détecter les changements de code (auto-save)
    EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        const code = update.state.doc.toString()
        emitCodeChange(code)
      }
    })
  ]
}

// Helper pour s'assurer que le code initial est une string valide
const ensureString = (value: unknown): string => {
  if (typeof value === 'string') return value
  if (value === null || value === undefined) return ''
  return String(value)
}

// Initialiser CodeMirror au montage du composant
onMounted(() => {
  if (!editorContainer.value) return

  // S'assurer que le code initial est une string (protection contre les objets ou undefined)
  const initialDoc = ensureString(props.initialCode)

  // Créer l'état de l'éditeur
  const startState = EditorState.create({
    doc: initialDoc,
    extensions: createEditorExtensions()
  })

  // Créer la vue de l'éditeur
  editorView = new EditorView({
    state: startState,
    parent: editorContainer.value
  })
})

// Observer les changements de langage pour recréer l'éditeur si nécessaire
watch(() => props.language, (newLang, oldLang) => {
  if (newLang !== oldLang && editorView && editorContainer.value) {
    // Sauvegarder le contenu actuel
    const currentCode = editorView.state.doc.toString()

    // Détruire l'ancienne instance
    editorView.destroy()

    // Recréer avec le nouveau langage
    const startState = EditorState.create({
      doc: currentCode,
      extensions: createEditorExtensions()
    })

    editorView = new EditorView({
      state: startState,
      parent: editorContainer.value
    })
  }
})

// Nettoyer CodeMirror et le timer au démontage
onBeforeUnmount(() => {
  // Nettoyer le timer de debounce
  if (debounceTimer) {
    clearTimeout(debounceTimer)
    debounceTimer = null
  }

  // Nettoyer CodeMirror
  if (editorView) {
    editorView.destroy()
    editorView = null
  }
})
</script>

<template>
  <div class="exercise-editor h-full">
    <!-- Éditeur CodeMirror (prend toute la hauteur) -->
    <div ref="editorContainer" class="codemirror-container h-full"></div>
  </div>
</template>

<style scoped>
/* L'éditeur utilise toute la hauteur disponible */
.codemirror-container {
  height: 100%;
  overflow: auto;
}

/* Styles CodeMirror personnalisés */
.codemirror-container :deep(.cm-editor) {
  height: 100%;
  font-size: 14px;
}

.codemirror-container :deep(.cm-scroller) {
  height: 100%;
  font-family: 'JetBrains Mono', 'Consolas', 'Monaco', monospace;
  font-feature-settings: 'liga' off, 'calt' off;
}

/* ── Popup autocomplétion ── */
.codemirror-container :deep(.cm-tooltip-autocomplete) {
  border: 1px solid #404754;
  border-radius: 6px;
  overflow: hidden;
}

.codemirror-container :deep(.cm-tooltip-autocomplete ul li) {
  padding: 4px 8px;
  border-left: 3px solid transparent;
}

.codemirror-container :deep(.cm-tooltip-autocomplete ul li[aria-selected]) {
  background: rgba(96, 177, 85, 0.2);
  border-left: 3px solid #60B155;
  color: #e0e6ed;
}

/* Info-bulle (description de la complétion) */
.codemirror-container :deep(.cm-tooltip.cm-completionInfo) {
  border: 1px solid #404754;
  border-radius: 6px;
  padding: 6px 10px;
}

/* Barre de scroll personnalisée pour la console */
.console-output-wrapper::-webkit-scrollbar {
  width: 8px;
}

.console-output-wrapper::-webkit-scrollbar-track {
  background: var(--color-editor-scrollbar-track);
}

.console-output-wrapper::-webkit-scrollbar-thumb {
  background: var(--color-editor-scrollbar-thumb);
  border-radius: 4px;
}

.console-output-wrapper::-webkit-scrollbar-thumb:hover {
  background: var(--color-editor-scrollbar-hover);
}
</style>
