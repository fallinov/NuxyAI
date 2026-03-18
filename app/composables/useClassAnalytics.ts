/**
 * useClassAnalytics - Transforme les données brutes en datasets Chart.js
 *
 * Reçoit studentsProgress, exercises et classErrors en refs
 * et retourne des computed properties prêtes pour les graphiques et tableaux.
 */

import type { StudentProgressData } from '~/composables/useClasses'
import type { Exercise } from '~/composables/useExerciseData'
import type { ExerciseError, DebugContextData } from '~/types/database.types'

// Palette Nuxy
const NUXY_COLORS = [
  '#60B155', '#33A6A6', '#FFD966', '#D45E95',
  '#561E46', '#C8B4DC', '#4D9352', '#246B6B'
]

export interface ChartDataset {
  labels: string[]
  data: number[]
  colors: string[]
}

export interface OverviewCards {
  activeStudents: number
  totalStudents: number
  completionRate: number
  avgAttempts: number
  solutionViewRate: number
}

export interface TopStudent {
  name: string
  email: string
  completed: number
  avgAttempts: number
  totalTime: number
  solutionsViewed: number
}

export interface StrugglingStudent {
  name: string
  email: string
  completed: number
  totalErrors: number
  lastActivity: string | null
  inactiveDays: number
}

export interface FrequentError {
  type: string
  message: string
  count: number
}

export interface HeatmapEntry {
  day: number
  hour: number
  count: number
}

export interface StackedBarDataset {
  labels: string[]
  datasets: Array<{ label: string; data: number[]; color: string }>
}

export function useClassAnalytics(
  studentsProgress: Ref<StudentProgressData[]>,
  exercises: Ref<Exercise[]>,
  classErrors: Ref<ExerciseError[]>
) {
  /**
   * Collecte les debug_context uniques par élève (le plus récent)
   */
  const latestContextPerStudent = computed(() => {
    const map = new Map<string, DebugContextData>()

    for (const student of studentsProgress.value) {
      let latest: { ctx: DebugContextData; date: string } | null = null
      for (const p of student.progress) {
        if (p.debug_context) {
          const date = p.last_attempt_at || p.updated_at || ''
          if (!latest || date > latest.date) {
            latest = { ctx: p.debug_context, date }
          }
        }
      }
      if (latest) {
        map.set(student.id, latest.ctx)
      }
    }
    return map
  })

  // ── 1. Navigateurs ──────────────────────────────────────────
  const browserData = computed<ChartDataset>(() => {
    const counts = new Map<string, number>()
    for (const ctx of latestContextPerStudent.value.values()) {
      const name = ctx.browser || 'Inconnu'
      counts.set(name, (counts.get(name) || 0) + 1)
    }
    return mapToDataset(counts)
  })

  // ── 2. Systèmes d'exploitation ──────────────────────────────
  const osData = computed<ChartDataset>(() => {
    const counts = new Map<string, number>()
    for (const ctx of latestContextPerStudent.value.values()) {
      const name = ctx.os || 'Inconnu'
      counts.set(name, (counts.get(name) || 0) + 1)
    }
    return mapToDataset(counts)
  })

  // ── 3. Types d'appareil ─────────────────────────────────────
  const deviceData = computed<ChartDataset>(() => {
    const labelMap: Record<string, string> = {
      desktop: 'Bureau',
      tablet: 'Tablette',
      mobile: 'Mobile'
    }
    const counts = new Map<string, number>()
    for (const ctx of latestContextPerStudent.value.values()) {
      const name = labelMap[ctx.device_type] || ctx.device_type || 'Inconnu'
      counts.set(name, (counts.get(name) || 0) + 1)
    }
    return mapToDataset(counts)
  })

  // ── 4. Complétion par module ────────────────────────────────
  const completionByModuleData = computed<ChartDataset>(() => {
    // Grouper les exercices par module
    const exercisesByModule = new Map<number, string[]>()
    for (const ex of exercises.value) {
      const mod = ex.moduleId
      if (!exercisesByModule.has(mod)) exercisesByModule.set(mod, [])
      exercisesByModule.get(mod)!.push(ex.id)
    }

    const totalStudents = studentsProgress.value.length
    if (totalStudents === 0) return { labels: [], data: [], colors: [] }

    const labels: string[] = []
    const data: number[] = []

    // Trier les modules par ID
    const sortedModules = [...exercisesByModule.entries()].sort((a, b) => a[0] - b[0])

    for (const [moduleId, slugs] of sortedModules) {
      labels.push(`Module ${moduleId}`)
      // Compter les completions totales / total possible
      let completed = 0
      const total = slugs.length * totalStudents

      for (const student of studentsProgress.value) {
        for (const slug of slugs) {
          const p = student.progress.find(pr => pr.exercise_slug === slug)
          if (p?.status === 'completed') completed++
        }
      }

      data.push(total > 0 ? Math.round((completed / total) * 100) : 0)
    }

    return {
      labels,
      data,
      colors: sortedModules.map((_, i) => NUXY_COLORS[i % NUXY_COLORS.length])
    }
  })

  // ── 5. Types d'erreurs ──────────────────────────────────────
  const errorTypesData = computed<ChartDataset>(() => {
    const counts = new Map<string, number>()
    for (const err of classErrors.value) {
      const type = err.error_type || 'Unknown'
      counts.set(type, (counts.get(type) || 0) + 1)
    }
    return mapToDataset(counts)
  })

  // ── 6. Tentatives moyennes par exercice (top 15) ────────────
  const avgAttemptsData = computed<ChartDataset>(() => {
    const exerciseAttempts = new Map<string, { total: number; count: number }>()

    for (const student of studentsProgress.value) {
      for (const p of student.progress) {
        if (p.attempts > 0) {
          const entry = exerciseAttempts.get(p.exercise_slug) || { total: 0, count: 0 }
          entry.total += p.attempts
          entry.count++
          exerciseAttempts.set(p.exercise_slug, entry)
        }
      }
    }

    // Calculer la moyenne et trier (top 15 plus élevés)
    const entries = [...exerciseAttempts.entries()]
      .map(([slug, { total, count }]) => ({
        slug,
        avg: Math.round((total / count) * 10) / 10
      }))
      .sort((a, b) => b.avg - a.avg)
      .slice(0, 15)

    return {
      labels: entries.map(e => exerciseLabel(e.slug)),
      data: entries.map(e => e.avg),
      colors: entries.map((_, i) => NUXY_COLORS[i % NUXY_COLORS.length])
    }
  })

  // ── 7. Temps moyen par exercice en minutes (top 15) ─────────
  const avgTimeData = computed<ChartDataset>(() => {
    const exerciseTime = new Map<string, { total: number; count: number }>()

    for (const student of studentsProgress.value) {
      for (const p of student.progress) {
        if (p.time_spent_seconds > 0) {
          const entry = exerciseTime.get(p.exercise_slug) || { total: 0, count: 0 }
          entry.total += p.time_spent_seconds
          entry.count++
          exerciseTime.set(p.exercise_slug, entry)
        }
      }
    }

    const entries = [...exerciseTime.entries()]
      .map(([slug, { total, count }]) => ({
        slug,
        avgMinutes: Math.round((total / count / 60) * 10) / 10
      }))
      .sort((a, b) => b.avgMinutes - a.avgMinutes)
      .slice(0, 15)

    return {
      labels: entries.map(e => exerciseLabel(e.slug)),
      data: entries.map(e => e.avgMinutes),
      colors: entries.map((_, i) => NUXY_COLORS[i % NUXY_COLORS.length])
    }
  })

  // ── 8. Exercices les plus difficiles (top 10) ───────────────
  const difficultExercisesData = computed<ChartDataset>(() => {
    const exerciseStats = new Map<string, { errors: number; executions: number; completions: number; total: number }>()

    for (const student of studentsProgress.value) {
      for (const p of student.progress) {
        const entry = exerciseStats.get(p.exercise_slug) || { errors: 0, executions: 0, completions: 0, total: 0 }
        entry.errors += p.errors_count || 0
        entry.executions += p.executions_count || 0
        entry.total++
        if (p.status === 'completed') entry.completions++
        exerciseStats.set(p.exercise_slug, entry)
      }
    }

    // Score de difficulté : error rate pondéré par faible complétion
    const entries = [...exerciseStats.entries()]
      .map(([slug, stats]) => {
        const errorRate = stats.executions > 0 ? stats.errors / stats.executions : 0
        const completionRate = stats.total > 0 ? stats.completions / stats.total : 0
        // Plus le score est haut, plus c'est difficile
        const difficulty = (errorRate * 0.6 + (1 - completionRate) * 0.4) * 100
        return { slug, difficulty: Math.round(difficulty * 10) / 10 }
      })
      .filter(e => e.difficulty > 0)
      .sort((a, b) => b.difficulty - a.difficulty)
      .slice(0, 10)

    return {
      labels: entries.map(e => exerciseLabel(e.slug)),
      data: entries.map(e => e.difficulty),
      colors: entries.map((_, i) => NUXY_COLORS[i % NUXY_COLORS.length])
    }
  })

  // ── 9. Vue d'ensemble (cartes résumé) ──────────────────────
  const overviewCards = computed<OverviewCards>(() => {
    const students = studentsProgress.value
    const totalStudents = students.length
    if (totalStudents === 0) {
      return { activeStudents: 0, totalStudents: 0, completionRate: 0, avgAttempts: 0, solutionViewRate: 0 }
    }

    const now = Date.now()
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000

    let activeStudents = 0
    let totalCompleted = 0
    let totalAttempts = 0
    let totalProgressRecords = 0
    let solutionViewedCount = 0
    let totalProgressWithCode = 0

    for (const student of students) {
      let hasRecentActivity = false
      for (const p of student.progress) {
        if (p.last_attempt_at && (now - new Date(p.last_attempt_at).getTime()) < sevenDaysMs) {
          hasRecentActivity = true
        }
        if (p.status === 'completed') totalCompleted++
        totalAttempts += p.attempts || 0
        totalProgressRecords++
        if (p.solution_viewed) solutionViewedCount++
        if (p.attempts > 0) totalProgressWithCode++
      }
      if (hasRecentActivity) activeStudents++
    }

    const totalPossible = exercises.value.length * totalStudents
    const completionRate = totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0
    const avgAttempts = totalProgressRecords > 0 ? Math.round((totalAttempts / totalProgressRecords) * 10) / 10 : 0
    const solutionViewRate = totalProgressWithCode > 0 ? Math.round((solutionViewedCount / totalProgressWithCode) * 100) : 0

    return { activeStudents, totalStudents, completionRate, avgAttempts, solutionViewRate }
  })

  // ── 10. Top 5 meilleurs élèves ────────────────────────────
  const topStudents = computed<TopStudent[]>(() => {
    return studentsProgress.value
      .map(student => {
        let completed = 0
        let totalAttempts = 0
        let attemptCount = 0
        let totalTime = 0
        let solutionsViewed = 0

        for (const p of student.progress) {
          if (p.status === 'completed') completed++
          if (p.attempts > 0) {
            totalAttempts += p.attempts
            attemptCount++
          }
          totalTime += p.time_spent_seconds || 0
          if (p.solution_viewed) solutionsViewed++
        }

        return {
          name: student.full_name || 'Sans nom',
          email: student.email,
          completed,
          avgAttempts: attemptCount > 0 ? Math.round((totalAttempts / attemptCount) * 10) / 10 : 0,
          totalTime: Math.round(totalTime / 60),
          solutionsViewed
        }
      })
      .sort((a, b) => b.completed - a.completed || a.avgAttempts - b.avgAttempts)
      .slice(0, 5)
  })

  // ── 11. 5 élèves en difficulté ───────────────────────────
  const strugglingStudents = computed<StrugglingStudent[]>(() => {
    const now = Date.now()
    const oneDayMs = 24 * 60 * 60 * 1000

    return studentsProgress.value
      .map(student => {
        let completed = 0
        let totalErrors = 0
        let lastActivity: string | null = null

        for (const p of student.progress) {
          if (p.status === 'completed') completed++
          totalErrors += p.errors_count || 0
          if (p.last_attempt_at && (!lastActivity || p.last_attempt_at > lastActivity)) {
            lastActivity = p.last_attempt_at
          }
        }

        const inactiveDays = lastActivity
          ? Math.floor((now - new Date(lastActivity).getTime()) / oneDayMs)
          : 999

        return {
          name: student.full_name || 'Sans nom',
          email: student.email,
          completed,
          totalErrors,
          lastActivity,
          inactiveDays
        }
      })
      .sort((a, b) => a.completed - b.completed || b.totalErrors - a.totalErrors)
      .slice(0, 5)
  })

  // ── 12. Progression temporelle (par semaine) ──────────────
  const weeklyProgressData = computed<ChartDataset>(() => {
    const weekCounts = new Map<string, number>()

    for (const student of studentsProgress.value) {
      for (const p of student.progress) {
        if (p.status === 'completed' && p.completed_at) {
          const date = new Date(p.completed_at)
          const weekStart = getISOWeekLabel(date)
          weekCounts.set(weekStart, (weekCounts.get(weekStart) || 0) + 1)
        }
      }
    }

    // Trier les semaines chronologiquement
    const sorted = [...weekCounts.entries()].sort((a, b) => a[0].localeCompare(b[0]))

    return {
      labels: sorted.map(([week]) => week),
      data: sorted.map(([, count]) => count),
      colors: sorted.map(() => '#60B155')
    }
  })

  // ── 13. Distribution des tentatives ───────────────────────
  const attemptsDistributionData = computed<ChartDataset>(() => {
    const buckets = { '1-2': 0, '3-5': 0, '6-10': 0, '10+': 0 }

    for (const student of studentsProgress.value) {
      // Tentatives totales de l'élève
      let totalAttempts = 0
      for (const p of student.progress) {
        totalAttempts += p.attempts || 0
      }

      if (totalAttempts === 0) continue
      if (totalAttempts <= 2) buckets['1-2']++
      else if (totalAttempts <= 5) buckets['3-5']++
      else if (totalAttempts <= 10) buckets['6-10']++
      else buckets['10+']++
    }

    const labels = Object.keys(buckets)
    const data = Object.values(buckets)

    return {
      labels,
      data,
      colors: labels.map((_, i) => NUXY_COLORS[i % NUXY_COLORS.length])
    }
  })

  // ── 14. Taux de consultation des solutions par exercice ───
  const solutionViewRateData = computed<ChartDataset>(() => {
    const exerciseViews = new Map<string, { viewed: number; total: number }>()

    for (const student of studentsProgress.value) {
      for (const p of student.progress) {
        if (p.attempts > 0) {
          const entry = exerciseViews.get(p.exercise_slug) || { viewed: 0, total: 0 }
          entry.total++
          if (p.solution_viewed) entry.viewed++
          exerciseViews.set(p.exercise_slug, entry)
        }
      }
    }

    const entries = [...exerciseViews.entries()]
      .map(([slug, { viewed, total }]) => ({
        slug,
        rate: total > 0 ? Math.round((viewed / total) * 100) : 0
      }))
      .filter(e => e.rate > 0)
      .sort((a, b) => b.rate - a.rate)
      .slice(0, 15)

    return {
      labels: entries.map(e => exerciseLabel(e.slug)),
      data: entries.map(e => e.rate),
      colors: entries.map((_, i) => NUXY_COLORS[i % NUXY_COLORS.length])
    }
  })

  // ── 15. Top 5 erreurs fréquentes ──────────────────────────
  const topFrequentErrors = computed<FrequentError[]>(() => {
    const errorMap = new Map<string, number>()

    for (const err of classErrors.value) {
      const key = `${err.error_type}|||${err.error_message || 'N/A'}`
      errorMap.set(key, (errorMap.get(key) || 0) + 1)
    }

    return [...errorMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([key, count]) => {
        const [type, message] = key.split('|||')
        return { type, message, count }
      })
  })

  // ── 16. Ratio réussite/échec par exercice (stacked bar) ───
  const successFailureData = computed<StackedBarDataset>(() => {
    const exerciseStats = new Map<string, { success: number; errors: number }>()

    for (const student of studentsProgress.value) {
      for (const p of student.progress) {
        if (p.executions_count > 0) {
          const entry = exerciseStats.get(p.exercise_slug) || { success: 0, errors: 0 }
          entry.success += p.successful_runs || 0
          entry.errors += p.errors_count || 0
          exerciseStats.set(p.exercise_slug, entry)
        }
      }
    }

    // Top 15 exercices par total d'exécutions
    const entries = [...exerciseStats.entries()]
      .sort((a, b) => (b[1].success + b[1].errors) - (a[1].success + a[1].errors))
      .slice(0, 15)

    return {
      labels: entries.map(([slug]) => exerciseLabel(slug)),
      datasets: [
        {
          label: 'Réussites',
          data: entries.map(([, s]) => s.success),
          color: '#60B155'
        },
        {
          label: 'Erreurs',
          data: entries.map(([, s]) => s.errors),
          color: '#ef4444'
        }
      ]
    }
  })

  // ── 17. Heatmap d'activité (jour × heure) ────────────────
  const activityHeatmapData = computed<HeatmapEntry[]>(() => {
    const counts = new Map<string, number>()

    for (const student of studentsProgress.value) {
      for (const p of student.progress) {
        if (p.last_attempt_at) {
          const date = new Date(p.last_attempt_at)
          // 0=lundi, 6=dimanche
          const jsDay = date.getDay() // 0=dimanche
          const day = jsDay === 0 ? 6 : jsDay - 1
          const hour = date.getHours()
          const key = `${day}-${hour}`
          counts.set(key, (counts.get(key) || 0) + 1)
        }
      }
    }

    return [...counts.entries()].map(([key, count]) => {
      const [day, hour] = key.split('-').map(Number)
      return { day, hour, count }
    })
  })

  // ── Helpers ─────────────────────────────────────────────────

  /** Transforme le slug en label lisible (ex.number ou titre court) */
  function exerciseLabel(slug: string): string {
    const ex = exercises.value.find(e => e.id === slug)
    return ex ? ex.exerciseNumber : slug
  }

  /** Transforme une Map<string, number> en ChartDataset trié par valeur desc */
  function mapToDataset(counts: Map<string, number>): ChartDataset {
    const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1])
    return {
      labels: sorted.map(([label]) => label),
      data: sorted.map(([, count]) => count),
      colors: sorted.map((_, i) => NUXY_COLORS[i % NUXY_COLORS.length])
    }
  }

  /** Retourne le label de semaine ISO (ex: "S05 Jan") */
  function getISOWeekLabel(date: Date): string {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7))
    const week1 = new Date(d.getFullYear(), 0, 4)
    const weekNum = 1 + Math.round(((d.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7)
    const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
    return `S${String(weekNum).padStart(2, '0')} ${months[date.getMonth()]}`
  }

  return {
    // Graphiques existants
    browserData,
    osData,
    deviceData,
    completionByModuleData,
    errorTypesData,
    avgAttemptsData,
    avgTimeData,
    difficultExercisesData,
    // Nouveaux : vue d'ensemble
    overviewCards,
    topStudents,
    strugglingStudents,
    // Nouveaux : graphiques
    weeklyProgressData,
    attemptsDistributionData,
    solutionViewRateData,
    topFrequentErrors,
    successFailureData,
    activityHeatmapData
  }
}
