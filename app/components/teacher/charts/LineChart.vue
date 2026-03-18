<script setup lang="ts">
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler)

const props = defineProps<{
  labels: string[]
  data: number[]
  color?: string
  yLabel?: string
  xLabel?: string
  fill?: boolean
}>()

const colorMode = useColorMode()

const chartData = computed(() => {
  const baseColor = props.color || '#60B155'
  return {
    labels: props.labels,
    datasets: [{
      data: props.data,
      borderColor: baseColor,
      backgroundColor: props.fill ? `${baseColor}20` : 'transparent',
      fill: props.fill ?? true,
      tension: 0.3,
      pointRadius: 4,
      pointBackgroundColor: baseColor,
      pointBorderColor: colorMode.value === 'dark' ? '#1f2937' : '#ffffff',
      pointBorderWidth: 2
    }]
  }
})

const chartOptions = computed(() => {
  const isDark = colorMode.value === 'dark'
  const gridColor = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'
  const textColor = isDark ? '#d1d5db' : '#374151'

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: {
        title: props.xLabel ? { display: true, text: props.xLabel, color: textColor } : undefined,
        ticks: { color: textColor, maxRotation: 45, minRotation: 0 },
        grid: { display: false }
      },
      y: {
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
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>
