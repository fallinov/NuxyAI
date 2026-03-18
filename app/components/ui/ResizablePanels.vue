<script setup lang="ts">
/**
 * ResizablePanels - Composant pour créer des panels redimensionnables
 *
 * Permet de créer un layout avec panels redimensionnables horizontalement ou verticalement
 */

interface Props {
  direction?: 'horizontal' | 'vertical'
  defaultSize?: number // Pourcentage pour le premier panel
  minSize?: number // Taille minimale en pixels
}

const props = withDefaults(defineProps<Props>(), {
  direction: 'horizontal',
  defaultSize: 33.33, // 1/3 par défaut
  minSize: 200
})

// État du redimensionnement
const firstPanelSize = ref(props.defaultSize)
const isDragging = ref(false)
const container = ref<HTMLElement | null>(null)

// Démarrer le redimensionnement
const startResize = (e: MouseEvent | TouchEvent) => {
  isDragging.value = true
  e.preventDefault()

  // Ajouter les listeners sur document pour capturer le mouvement partout
  document.addEventListener('mousemove', handleResize)
  document.addEventListener('mouseup', stopResize)
  document.addEventListener('touchmove', handleResize)
  document.addEventListener('touchend', stopResize)
}

// Redimensionner pendant le drag
const handleResize = (e: MouseEvent | TouchEvent) => {
  if (!isDragging.value || !container.value) return

  const containerRect = container.value.getBoundingClientRect()
  let position: number

  if (e instanceof MouseEvent) {
    position = props.direction === 'horizontal' ? e.clientX : e.clientY
  } else {
    position = props.direction === 'horizontal'
      ? e.touches[0].clientX
      : e.touches[0].clientY
  }

  const containerStart = props.direction === 'horizontal'
    ? containerRect.left
    : containerRect.top
  const containerSize = props.direction === 'horizontal'
    ? containerRect.width
    : containerRect.height

  const offset = position - containerStart
  let percentage = (offset / containerSize) * 100

  // Appliquer les contraintes min/max
  const minPercentage = (props.minSize / containerSize) * 100
  const maxPercentage = 100 - minPercentage

  percentage = Math.max(minPercentage, Math.min(maxPercentage, percentage))

  firstPanelSize.value = percentage
}

// Arrêter le redimensionnement
const stopResize = () => {
  isDragging.value = false
  document.removeEventListener('mousemove', handleResize)
  document.removeEventListener('mouseup', stopResize)
  document.removeEventListener('touchmove', handleResize)
  document.removeEventListener('touchend', stopResize)
}

// Nettoyer les listeners au démontage
onBeforeUnmount(() => {
  stopResize()
})
</script>

<template>
  <div
    ref="container"
    class="resizable-panels"
    :class="[
      direction === 'horizontal' ? 'flex flex-row' : 'flex flex-col',
      'h-full w-full',
      isDragging ? 'is-dragging' : ''
    ]"
  >
    <!-- Premier panel -->
    <div
      class="panel-first overflow-auto h-full"
      :style="{
        [direction === 'horizontal' ? 'width' : 'height']: `${firstPanelSize}%`,
        minWidth: direction === 'horizontal' ? `${minSize}px` : undefined,
        minHeight: direction === 'vertical' ? `${minSize}px` : undefined
      }"
    >
      <slot name="first" />
    </div>

    <!-- Séparateur redimensionnable (handle) -->
    <div
      class="resize-handle"
      :class="[
        direction === 'horizontal'
          ? 'resize-handle-vertical cursor-col-resize w-1 hover:w-2'
          : 'resize-handle-horizontal cursor-row-resize h-1 hover:h-2',
        isDragging ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-700 hover:bg-blue-400'
      ]"
      @mousedown="startResize"
      @touchstart="startResize"
    >
      <!-- Indicateur visuel au centre -->
      <div
        v-if="!isDragging"
        class="handle-indicator"
        :class="[
          direction === 'horizontal'
            ? 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-12'
            : 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-1',
          'bg-gray-400 dark:bg-gray-600 rounded-full'
        ]"
      />
    </div>

    <!-- Deuxième panel -->
    <div
      class="panel-second overflow-auto flex-1 h-full"
    >
      <slot name="second" />
    </div>

    <!-- Overlay pendant le drag pour capturer les événements au-dessus des iframes -->
    <div
      v-if="isDragging"
      class="drag-overlay fixed inset-0 z-50"
      :class="direction === 'horizontal' ? 'cursor-col-resize' : 'cursor-row-resize'"
    />
  </div>
</template>

<style scoped>
.resize-handle {
  position: relative;
  flex-shrink: 0;
  transition: background-color 0.2s, width 0.1s, height 0.1s;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}

.resize-handle:active {
  background-color: rgb(37 99 235);
}

/* Empêcher la sélection de texte uniquement pendant le drag */
.resizable-panels.is-dragging {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
}

/* Curseurs */
.cursor-col-resize {
  cursor: col-resize;
}

.cursor-row-resize {
  cursor: row-resize;
}
</style>
