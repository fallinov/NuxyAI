<script setup lang="ts">
/**
 * Page pour rejoindre une classe via code d'invitation
 *
 * Workflow :
 * 1. Si non connecté → Affiche le choix (login ou register avec redirect)
 * 2. Si connecté → Rejoint automatiquement la classe
 */

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const router = useRouter()
const toast = useToast()
const { from, client: supabase } = useNuxyDb()
const user = useSupabaseUser()

const code = route.params.code as string

// États
const isLoading = ref(true)
const error = ref<string | null>(null)
const classInfo = ref<any>(null)
const hasJoined = ref(false)

// Charger les infos de la classe (schéma nuxy)
const loadClassInfo = async () => {
  try {
    const { data, error: fetchError } = await from('classes')
      .select(`
        id,
        name,
        description,
        is_active,
        teacher:profiles!teacher_id(full_name, email)
      `)
      .eq('invite_code', code)
      .single()

    if (fetchError || !data) {
      error.value = 'Code d\'invitation invalide ou classe introuvable.'
      return
    }

    if (!data.is_active) {
      error.value = 'Cette classe n\'accepte plus de nouveaux membres.'
      return
    }

    classInfo.value = data
  } catch (err) {
    error.value = 'Une erreur est survenue.'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

// Rejoindre la classe automatiquement si connecté
const joinClass = async () => {
  if (!user.value || !classInfo.value) return

  isLoading.value = true

  try {
    // Appel RPC (fonction wrapper dans public)
    const { data, error: joinError } = await supabase
      .rpc('join_class_by_code', { code })

    if (joinError) {
      if (joinError.message.includes('déjà membre')) {
        error.value = 'Vous êtes déjà membre de cette classe.'
        hasJoined.value = true
      } else if (joinError.message.includes('propre classe')) {
        error.value = 'Vous ne pouvez pas rejoindre votre propre classe.'
      } else {
        error.value = joinError.message
      }
      return
    }

    hasJoined.value = true
    toast.add({
      title: 'Bienvenue !',
      description: `Vous avez rejoint la classe "${classInfo.value.name}".`,
      color: 'green',
      timeout: 5000
    })
  } catch (err: any) {
    error.value = 'Une erreur est survenue lors de l\'inscription.'
    console.error(err)
  } finally {
    isLoading.value = false
  }
}

// SEO
useSeoMeta({
  title: 'Rejoindre une classe - Nuxy'
})

// Charger les infos au montage
await loadClassInfo()

// Si l'utilisateur est connecté, essayer de rejoindre automatiquement
watch(user, async (newUser) => {
  if (newUser && classInfo.value && !hasJoined.value && !error.value) {
    await joinClass()
  }
}, { immediate: true })
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
    <div class="max-w-md w-full">
      <!-- Logo -->
      <div class="text-center mb-8">
        <NuxtLink to="/" class="inline-block">
          <img src="/images/nuxy-logo.svg" alt="Nuxy" class="w-16 h-16 mx-auto" />
        </NuxtLink>
      </div>

      <!-- Chargement -->
      <UCard v-if="isLoading" class="shadow-xl text-center py-12">
        <UIcon name="i-lucide-refresh-cw" class="w-12 h-12 mx-auto text-primary-500 animate-spin mb-4" />
        <p class="text-gray-600 dark:text-gray-400">Chargement...</p>
      </UCard>

      <!-- Erreur -->
      <UCard v-else-if="error && !hasJoined" class="shadow-xl text-center py-12">
        <UIcon name="i-lucide-alert-circle" class="w-16 h-16 mx-auto text-red-500 mb-4" />
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Oops !
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          {{ error }}
        </p>
        <UButton to="/" variant="outline">
          Retour à l'accueil
        </UButton>
      </UCard>

      <!-- Succès - Classe rejointe -->
      <UCard v-else-if="hasJoined" class="shadow-xl text-center py-12">
        <div class="w-20 h-20 mx-auto mb-4">
          <img src="/images/nuxy-logo.svg" alt="Nuxy" class="w-full h-full" />
        </div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Vous avez rejoint la classe !
        </h2>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          <strong>{{ classInfo?.name }}</strong>
          <br />
          <span class="text-sm">avec {{ classInfo?.teacher?.full_name || 'l\'enseignant' }}</span>
        </p>
        <div class="flex flex-col sm:flex-row gap-3 justify-center">
          <UButton to="/exercises/hello-javascript" class="btn-cta">
            Commencer les exercices
          </UButton>
          <UButton to="/profile" variant="outline">
            Voir mes classes
          </UButton>
        </div>
      </UCard>

      <!-- Infos classe - Non connecté -->
      <UCard v-else-if="classInfo && !user" class="shadow-xl">
        <div class="text-center">
          <div class="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center">
            <UIcon name="i-lucide-users" class="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>

          <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Rejoindre la classe
          </h1>

          <div class="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 mb-6">
            <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
              {{ classInfo.name }}
            </h2>
            <p v-if="classInfo.description" class="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {{ classInfo.description }}
            </p>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Par {{ classInfo.teacher?.full_name || classInfo.teacher?.email || 'Enseignant' }}
            </p>
          </div>

          <p class="text-gray-600 dark:text-gray-400 mb-6">
            Connectez-vous ou créez un compte pour rejoindre cette classe.
          </p>

          <div class="flex flex-col gap-3">
            <UButton
              :to="`/auth/register?redirect=/join/${code}`"
              size="lg"
              block
              class="btn-cta"
            >
              Créer un compte
            </UButton>
            <UButton
              :to="`/auth/login?redirect=/join/${code}`"
              size="lg"
              variant="outline"
              block
            >
              J'ai déjà un compte
            </UButton>
          </div>
        </div>
      </UCard>

      <!-- Utilisateur connecté mais pas encore joint (en cours) -->
      <UCard v-else class="shadow-xl text-center py-12">
        <UIcon name="i-lucide-refresh-cw" class="w-12 h-12 mx-auto text-primary-500 animate-spin mb-4" />
        <p class="text-gray-600 dark:text-gray-400">Inscription en cours...</p>
      </UCard>
    </div>
  </div>
</template>
