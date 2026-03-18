<script setup lang="ts">
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

const props = defineProps<{
  labels: string[]
  data: number[]
  colors: string[]
}>()

const colorMode = useColorMode()

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [{
    data: props.data,
    backgroundColor: props.colors,
    borderColor: colorMode.value === 'dark' ? '#1f2937' : '#ffffff',
    borderWidth: 2
  }]
}))

const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        color: colorMode.value === 'dark' ? '#d1d5db' : '#374151',
        padding: 12,
        usePointStyle: true,
        pointStyleWidth: 10
      }
    },
    tooltip: {
      callbacks: {
        label: (ctx: any) => {
          const total = ctx.dataset.data.reduce((a: number, b: number) => a + b, 0)
          const pct = total > 0 ? Math.round((ctx.parsed / total) * 100) : 0
          return ` ${ctx.label}: ${ctx.parsed} (${pct}%)`
        }
      }
    }
  }
}))
</script>

<template>
  <div class="h-64">
    <Doughnut :data="chartData" :options="chartOptions" />
  </div>
</template>
