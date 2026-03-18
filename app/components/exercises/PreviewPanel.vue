<script setup lang="ts">
/**
 * PreviewPanel - Aperçu live dans une iframe sandboxée
 *
 * Affiche le rendu HTML/CSS/JS dans une iframe sécurisée.
 * Capture les logs console et les erreurs via postMessage.
 *
 * Comportement auto-refresh :
 * - HTML/CSS : rafraîchissement automatique (preview instantanée)
 * - JS : exécuté uniquement sur appel explicite de refresh() (bouton Exécuter)
 */

import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue'
import type { ConsoleEntry, ErrorEntry, IframeMessage } from '~/types/htmlCssJs'
import { analyzePedagogicalError } from '~/utils/pedagogicalMessages'

/**
 * Traduit un message d'erreur simple en message pédagogique
 *
 * window.onerror transmet le message sous forme de string, ex:
 * "Uncaught ReferenceError: x is not defined"
 * On extrait le type d'erreur pour reconstruire un objet Error fidèle
 */
function translateErrorMessage(message: string): ReturnType<typeof analyzePedagogicalError> | null {
  try {
    const errorTypeMatch = message.match(/^(?:Uncaught\s+)?(\w+Error):\s*(.+)$/)
    let error: Error
    if (errorTypeMatch) {
      const [, errorName, errorMsg] = errorTypeMatch
      error = new Error(errorMsg)
      error.name = errorName
    } else {
      error = new Error(message)
    }
    return analyzePedagogicalError(error, '')
  } catch {
    return null
  }
}

// Props
interface Props {
  html?: string
  css?: string
  js?: string
  autoRefresh?: boolean
  debounceMs?: number
}

const props = withDefaults(defineProps<Props>(), {
  html: '',
  css: '',
  js: '',
  autoRefresh: true,
  debounceMs: 500
})

// Événements émis
const emit = defineEmits<{
  'console-log': [entry: ConsoleEntry]
  'console-error': [entry: ErrorEntry]
  'dom-ready': []
}>()

// Référence à l'iframe
const iframeRef = ref<HTMLIFrameElement | null>(null)

// État du panneau
const isLoading = ref(false)
const lastRefresh = ref<number>(Date.now())

// JS "stable" : le code JS qui sera exécuté
// Initialisé vide pour ne pas exécuter le JS au chargement de la page
// Mis à jour uniquement sur refresh() explicite (bouton Exécuter)
const stableJs = ref('')

// Debounce timer
let debounceTimer: ReturnType<typeof setTimeout> | null = null

/**
 * Génère le document HTML complet à injecter dans l'iframe
 */
const srcdoc = computed(() => {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    /* Reset basique */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, sans-serif; padding: 16px; }

    /* CSS utilisateur */
    ${props.css || ''}
  </style>
</head>
<body>
${props.html || ''}
<script>
// Infrastructure : interception console, erreurs et DOM ready
// Séparé du code utilisateur pour capturer les SyntaxError de parsing
(function() {
  const originalConsole = {
    log: console.log.bind(console),
    warn: console.warn.bind(console),
    error: console.error.bind(console),
    info: console.info.bind(console)
  };

  function sendToParent(method, args) {
    try {
      const serialized = Array.from(args).map(arg => {
        if (arg === undefined) return 'undefined';
        if (arg === null) return 'null';
        if (typeof arg === 'function') return '[Function]';
        if (typeof arg === 'object') {
          try {
            return JSON.stringify(arg, null, 2);
          } catch (e) {
            return '[Object circular]';
          }
        }
        return String(arg);
      });

      window.parent.postMessage({
        type: 'console',
        method: method,
        args: serialized
      }, '*');
    } catch (e) {
      // Ignorer les erreurs de sérialisation
    }
  }

  console.log = function(...args) {
    originalConsole.log.apply(console, args);
    sendToParent('log', args);
  };

  console.warn = function(...args) {
    originalConsole.warn.apply(console, args);
    sendToParent('warn', args);
  };

  console.error = function(...args) {
    originalConsole.error.apply(console, args);
    sendToParent('error', args);
  };

  console.info = function(...args) {
    originalConsole.info.apply(console, args);
    sendToParent('info', args);
  };

  // Intercepter les erreurs JavaScript (y compris SyntaxError du script suivant)
  window.onerror = function(message, source, lineno, colno, error) {
    window.parent.postMessage({
      type: 'error',
      message: String(message),
      line: lineno
    }, '*');
    return false;
  };

  // Intercepter les rejets de promesses non gérés (async/await, fetch)
  window.addEventListener('unhandledrejection', function(event) {
    var message = 'Promesse rejetée';
    if (event.reason) {
      message = event.reason.message || String(event.reason);
    }
    window.parent.postMessage({
      type: 'error',
      message: message,
      line: 0
    }, '*');
  });

  // Signaler quand le DOM est prêt
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      window.parent.postMessage({ type: 'dom-ready' }, '*');
    });
  } else {
    window.parent.postMessage({ type: 'dom-ready' }, '*');
  }

  // Écouter les mises à jour HTML/CSS dynamiques (sans recharger l'iframe)
  // Note: innerHTML est sécurisé ici car l'iframe est sandboxée et le contenu vient de l'éditeur
  window.addEventListener('message', function(event) {
    if (event.data && event.data.type === 'update-html-css') {
      // Mettre à jour le HTML (sécurisé dans iframe sandbox)
      if (event.data.html !== undefined) {
        document.body.innerHTML = event.data.html; // NOSONAR - sandboxed iframe
      }
      // Mettre à jour le CSS
      if (event.data.css !== undefined) {
        var styleEl = document.getElementById('user-css');
        if (!styleEl) {
          styleEl = document.createElement('style');
          styleEl.id = 'user-css';
          document.head.appendChild(styleEl);
        }
        styleEl.textContent = event.data.css;
      }
    }
  });
})();
<\/script>
<script>
// Code JavaScript utilisateur (bloc séparé pour que les SyntaxError soient captées par window.onerror)
try {
${stableJs.value}
} catch (error) {
  window.parent.postMessage({
    type: 'error',
    message: error.message,
    line: error.lineNumber || 0
  }, '*');
}
<\/script>
</body>
</html>`
})

/**
 * Rafraîchit l'iframe avec le nouveau contenu ET exécute le JS
 * Appelé par le bouton "Exécuter" (Ctrl+Enter)
 */
function refresh() {
  // Mettre à jour le JS stable avec le code actuel
  stableJs.value = props.js || ''

  isLoading.value = true
  lastRefresh.value = Date.now()

  // Forcer le rechargement de l'iframe en modifiant le srcdoc
  if (iframeRef.value) {
    iframeRef.value.srcdoc = srcdoc.value
  }
}

/**
 * Met à jour HTML/CSS dynamiquement via postMessage (sans recharger l'iframe)
 * Le JS n'est PAS réexécuté - seul l'affichage est mis à jour
 */
function refreshHtmlCssOnly() {
  if (!iframeRef.value?.contentWindow) return

  // Envoyer le nouveau HTML/CSS à l'iframe via postMessage
  iframeRef.value.contentWindow.postMessage({
    type: 'update-html-css',
    html: props.html || '',
    css: props.css || ''
  }, '*')
}

/**
 * Rafraîchissement HTML/CSS avec debounce (sans réexécuter le JS)
 */
function debouncedRefreshHtmlCss() {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
  debounceTimer = setTimeout(() => {
    refreshHtmlCssOnly()
  }, props.debounceMs)
}

/**
 * Gestionnaire de messages postMessage depuis l'iframe
 */
function handleMessage(event: MessageEvent) {
  // Vérifier que le message vient de notre iframe
  if (!iframeRef.value || event.source !== iframeRef.value.contentWindow) {
    return
  }

  const data = event.data as IframeMessage

  switch (data.type) {
    case 'console':
      emit('console-log', {
        type: data.method || 'log',
        content: data.args?.join(' ') || '',
        data: data.args
      })
      break

    case 'error':
      // Traduire l'erreur en message pédagogique
      const pedagogical = translateErrorMessage(data.message || 'Erreur inconnue')

      emit('console-error', {
        type: 'error',
        content: data.message || 'Erreur inconnue',
        line: data.line,
        pedagogical: pedagogical || undefined
      })
      break

    case 'dom-ready':
      isLoading.value = false
      emit('dom-ready')
      break
  }
}

// Observer les changements HTML/CSS uniquement (pas le JS)
// Le JS n'est exécuté que sur appel explicite de refresh()
watch(
  () => [props.html, props.css],
  () => {
    if (props.autoRefresh) {
      debouncedRefreshHtmlCss()
    }
  }
)

// Écouter les messages de l'iframe
onMounted(() => {
  window.addEventListener('message', handleMessage)
  // Afficher l'aperçu HTML/CSS sans exécuter le JS
  // Le JS ne s'exécute que sur clic "Exécuter" (appel explicite de refresh())
  if (iframeRef.value) {
    iframeRef.value.srcdoc = srcdoc.value
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage)
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
})

/**
 * Retourne la fenêtre de l'iframe (pour les validations DOM)
 */
function getIframeWindow(): Window | null {
  return iframeRef.value?.contentWindow || null
}

// Exposer les méthodes
defineExpose({
  refresh,
  getIframeWindow
})
</script>

<template>
  <div class="h-full min-h-[200px] flex flex-col bg-white">
    <!-- Barre d'outils -->
    <div class="toolbar flex items-center gap-2 px-3 py-2 bg-gray-100 border-b border-gray-200">
      <span class="text-sm font-medium text-gray-600">Aperçu</span>

      <UButton
        variant="ghost"
        color="neutral"
        :icon="isLoading ? 'i-lucide-refresh-cw' : 'i-lucide-refresh-cw'"
        size="xs"
        class="ml-auto"
        :class="{ 'animate-spin': isLoading }"
        aria-label="Rafraîchir l'aperçu"
        @click="refresh"
      />
    </div>

    <!-- Iframe sandboxée -->
    <div class="flex-1 relative overflow-hidden bg-white">
      <iframe
        ref="iframeRef"
        class="w-full h-full border-0 bg-white"
        sandbox="allow-scripts allow-same-origin"
        :srcdoc="srcdoc"
        title="Aperçu du code"
      />

      <!-- Indicateur de chargement -->
      <div
        v-if="isLoading"
        class="loading-overlay absolute inset-0 bg-white/80 flex items-center justify-center"
      >
        <UIcon name="i-lucide-refresh-cw" class="w-8 h-8 text-gray-400 animate-spin" />
      </div>
    </div>
  </div>
</template>
