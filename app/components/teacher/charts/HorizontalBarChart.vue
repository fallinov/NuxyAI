<script setup lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend)

const props = defineProps<{
  labels: string[]
  data: number[]
  colors: string[]
  xLabel?: string
}>()

const colorMode = useColorMode()

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [{
    data: props.data,
    backgroundColor: props.colors,
    borderRadius: 4,
    maxBarThickness: 24
  }]
}))

const chartOptions = computed(() => {
  const isDark = colorMode.value === 'dark'
  const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
  const textColor = isDark ? '#d1d5db' : '#374151'

  return {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        title: props.xLabel ? { display: true, text: props.xLabel, color: textColor } : undefined,
        ticks: { color: textColor },
        grid: { color: gridColor },
        beginAtZero: true
      },
      y: {
        ticks: { color: textColor },
        grid: { display: false }
      }
    }
  }
})
</script>

<template>
  <div :style="{ height: `${Math.max(200, labels.length * 32 + 60)}px` }">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
