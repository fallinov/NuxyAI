/**
 * Types pour le mode exercice HTML/CSS/JS
 */

// Type d'exercice
export type ExerciseType = 'javascript' | 'html-css-js' | 'intro'

// Code HTML/CSS/JS
export interface HtmlCssJsCode {
  html?: string
  css?: string
  js?: string
}

// Solution HTML/CSS/JS
export interface HtmlCssJsSolution extends HtmlCssJsCode {
  explanation?: string
}

// Résultat d'exécution HTML/CSS/JS
export interface HtmlCssJsExecutionResult {
  logs: ConsoleEntry[]
  errors: ErrorEntry[]
  success: boolean
  documentReady: boolean
}

// Entrée de console
export interface ConsoleEntry {
  type: 'log' | 'warn' | 'error' | 'info'
  content: string
  data?: any
}

// Entrée d'erreur
export interface ErrorEntry {
  type: 'error'
  content: string
  line?: number
  pedagogical?: PedagogicalError
}

// Erreur pédagogique
export interface PedagogicalError {
  type: 'error' | 'warning' | 'info'
  title: string
  message: string
  hint?: string
  example?: string
  learnMore?: string
}

// Types de validation DOM
export type DomValidationType =
  | 'dom_contains'        // Vérifie si un élément existe
  | 'dom_text_contains'   // Vérifie le textContent d'un élément
  | 'dom_style'           // Vérifie une propriété CSS
  | 'dom_attribute'       // Vérifie un attribut HTML
  | 'dom_class_contains'  // Vérifie si un élément a une classe
  | 'dom_count'           // Compte les éléments correspondants

// Règle de validation DOM
export interface DomValidationRule {
  description: string
  type: DomValidationType
  selector: string
  expected?: string | number | boolean
  property?: string      // Pour dom_style
  attribute?: string     // Pour dom_attribute
  expectedCount?: number // Pour dom_count
  triggerEvent?: string  // Événement à déclencher avant validation
  errorMessage?: string
  successMessage?: string
}

// Résultat de validation DOM
export interface DomValidationResult {
  passed: boolean
  message: string
  rule: DomValidationRule
}

// Message postMessage de l'iframe
export interface IframeMessage {
  type: 'console' | 'error' | 'dom-ready'
  method?: 'log' | 'warn' | 'error' | 'info'
  args?: string[]
  message?: string
  line?: number
}

// État de l'éditeur multi-panneaux
export interface MultiEditorState {
  activeTab: 'html' | 'css' | 'js'
  code: HtmlCssJsCode
  isDirty: boolean
}

// Props du composant PreviewPanel
export interface PreviewPanelProps {
  html: string
  css: string
  js: string
  autoRefresh?: boolean
  debounceMs?: number
}
