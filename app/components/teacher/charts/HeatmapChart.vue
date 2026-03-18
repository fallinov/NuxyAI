<script setup lang="ts">
/**
 * Heatmap d'activité : 7 lignes (jours) × 24 colonnes (heures).
 * Pur HTML/CSS, pas de Chart.js → SSG-safe.
 */

const props = defineProps<{
  /** Array of { day: 0-6 (lun-dim), hour: 0-23, count: number } */
  data: Array<{ day: number; hour: number; count: number }>
}>()

const colorMode = useColorMode()

const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']

const maxCount = computed(() => {
  if (props.data.length === 0) return 1
  return Math.max(...props.data.map(d => d.count), 1)
})

/** Matrice 7×24 pour un accès rapide */
const matrix = computed(() => {
  const m = Array.from({ length: 7 }, () => Array(24).fill(0))
  for (const { day, hour, count } of props.data) {
    if (day >= 0 && day < 7 && hour >= 0 && hour < 24) {
      m[day][hour] = count
    }
  }
  return m
})

function cellColor(count: number): string {
  if (count === 0) {
    return colorMode.value === 'dark'
      ? 'rgba(255,255,255,0.05)'
      : 'rgba(0,0,0,0.04)'
  }
  const intensity = Math.min(count / maxCount.value, 1)
  // Vert Nuxy avec opacité progressive
  const alpha = 0.15 + intensity * 0.85
  return `rgba(96, 177, 85, ${alpha})`
}
</script>

<template>
  <div class="space-y-2">
    <!-- Heures header -->
    <div class="flex items-end gap-px ml-10">
      <div
        v-for="h in 24"
        :key="h"
        class="flex-1 text-center text-[10px] text-gray-400 dark:text-gray-500"
      >
        <span v-if="h % 3 === 1">{{ h - 1 }}h</span>
      </div>
    </div>

    <!-- Grille -->
    <div class="flex flex-col gap-px">
      <div
        v-for="(day, dayIdx) in DAYS"
        :key="day"
        class="flex items-center gap-px"
      >
        <div class="w-10 text-xs text-gray-500 dark:text-gray-400 text-right pr-2 shrink-0">
          {{ day }}
        </div>
        <div
          v-for="hour in 24"
          :key="hour"
          class="flex-1 aspect-square rounded-sm min-w-[8px]"
          :style="{ backgroundColor: cellColor(matrix[dayIdx][hour - 1]) }"
          :title="`${day} ${hour - 1}h : ${matrix[dayIdx][hour - 1]} tentative(s)`"
        />
      </div>
    </div>

    <!-- Légende -->
    <div class="flex items-center justify-end gap-2 text-xs text-gray-500 dark:text-gray-400">
      <span>Moins</span>
      <div class="flex gap-px">
        <div
          v-for="i in 5"
          :key="i"
          class="w-3 h-3 rounded-sm"
          :style="{ backgroundColor: cellColor(maxCount * (i - 1) / 4) }"
        />
      </div>
      <span>Plus</span>
    </div>
  </div>
</template>
