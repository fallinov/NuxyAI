/**
 * useLessonData - Chargement d'une leçon individuelle
 *
 * Composable simplifié pour :
 * - Charger une leçon par son path via queryCollection
 * - Retourner les métadonnées et le contenu markdown
 */

export const useLessonData = (path: string) => {
  const isLoading = ref(true)
  const error = ref<string | null>(null)

  const { data: lesson, error: fetchError } = useAsyncData(
    `lesson-${path}`,
    () => queryCollection('lessons').path(path).first()
  )

  // Gérer le chargement et les erreurs
  watch(lesson, () => {
    isLoading.value = false
    if (!lesson.value) {
      error.value = 'Leçon introuvable'
    }
  }, { immediate: true })

  watch(fetchError, (err) => {
    if (err) {
      isLoading.value = false
      error.value = 'Erreur lors du chargement de la leçon'
      console.error('Load lesson error:', err)
    }
  }, { immediate: true })

  return {
    lesson,
    isLoading: readonly(isLoading),
    error: readonly(error)
  }
}
