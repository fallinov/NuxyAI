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
  datasets: Array<{ label: string; data: number[]; color: string }>
  yLabel?: string
  xLabel?: string
}>()

const colorMode = useColorMode()

const chartData = computed(() => ({
  labels: props.labels,
  datasets: props.datasets.map(ds => ({
    label: ds.label,
    data: ds.data,
    backgroundColor: ds.color,
    borderRadius: 2,
    maxBarThickness: 40
  }))
}))

const chartOptions = computed(() => {
  const isDark = colorMode.value === 'dark'
  const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
  const textColor = isDark ? '#d1d5db' : '#374151'

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: textColor,
          padding: 12,
          usePointStyle: true,
          pointStyleWidth: 10
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        title: props.xLabel ? { display: true, text: props.xLabel, color: textColor } : undefined,
        ticks: { color: textColor, maxRotation: 45, minRotation: 0 },
        grid: { display: false }
      },
      y: {
        stacked: true,
        title: props.yLabel ? { display: true, text: props.yLabel, color: textColor } : undefined,
        ticks: { color: textColor },
        grid: { color: gridColor },
        beginAtZero: true
      }
    }
  }
})
</script>

<template>
  <div class="h-72">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
