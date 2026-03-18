<script setup lang="ts">
/**
 * Page de connexion
 *
 * Design System unifié :
 * - Cards: rounded-2xl, p-6
 * - Buttons: btn-cta, rounded-xl
 * - Inputs: w-full, rounded-xl
 * - Colors: nuxy-green, nuxy-teal
 */

definePageMeta({
  layout: 'default',
  middleware: 'guest'
})

useSeoMeta({
  title: 'Connecte-toi - Nuxy'
})

const route = useRoute()
const router = useRouter()
const toast = useToast()

const { login, isLoading, error } = useAuth()

// Formulaire
const form = reactive({
  email: '',
  password: ''
})

// Validation
const isFormValid = computed(() => {
  return form.email.includes('@') && form.password.length >= 6
})

// Soumission
const handleSubmit = async () => {
  if (!isFormValid.value) return

  const result = await login(form.email, form.password)

  if (result.success) {
    toast.add({
      title: 'Hey, te revoilà !',
      description: 'Prêt à coder ?',
      color: 'success',
      timeout: 3000
    })

    // Rediriger vers la page demandée ou l'accueil
    const redirect = route.query.redirect as string
    await router.push(redirect || '/')
  } else {
    toast.add({
      title: 'Oups, ça n\'a pas marché',
      description: result.error?.message || 'Vérifie tes identifiants et réessaie',
      color: 'error',
      timeout: 5000
    })
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Titre -->
      <div class="text-center mb-6">
        <h1 class="text-3xl sm:text-4xl font-bold text-white">
          Content de te revoir !
        </h1>
        <p class="mt-2 text-gray-400">
          Connecte-toi pour retrouver ta progression
        </p>
      </div>

      <!-- Card formulaire -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
        <form @submit.prevent="handleSubmit" class="space-y-5">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UIcon name="i-lucide-mail" class="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="email"
                v-model="form.email"
                type="email"
                placeholder="votre@email.com"
                :disabled="isLoading"
                autocomplete="email"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nuxy-green focus:border-transparent transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <!-- Mot de passe -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mot de passe
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UIcon name="i-lucide-lock" class="w-5 h-5 text-gray-400" />
              </div>
              <input
                id="password"
                v-model="form.password"
                type="password"
                placeholder="••••••••"
                :disabled="isLoading"
                autocomplete="current-password"
                class="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-nuxy-green focus:border-transparent transition-all disabled:opacity-50"
              />
            </div>
          </div>

          <!-- Lien mot de passe oublié -->
          <div class="flex justify-end">
            <NuxtLink
              to="/auth/forgot-password"
              class="text-sm text-nuxy-green hover:text-nuxy-green-dark dark:hover:text-nuxy-green-light transition-colors"
            >
              Oups, j'ai oublié mon mot de passe
            </NuxtLink>
          </div>

          <!-- Bouton connexion -->
          <button
            type="submit"
            :disabled="!isFormValid || isLoading"
            class="w-full btn-cta py-3 text-center disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            <span v-if="isLoading" class="flex items-center justify-center gap-2">
              <UIcon name="i-lucide-loader-2" class="w-5 h-5 animate-spin" />
              On y est presque...
            </span>
            <span v-else>C'est parti !</span>
          </button>
        </form>

        <!-- Séparateur -->
        <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
          <p class="text-center text-gray-600 dark:text-gray-400">
            Première fois ici ?
            <NuxtLink
              :to="{ path: '/auth/register', query: route.query }"
              class="text-nuxy-green font-semibold hover:text-nuxy-green-dark transition-colors"
            >
              Crée ton compte
            </NuxtLink>
          </p>
        </div>
      </div>

      <!-- Retour à l'accueil -->
      <p class="mt-6 text-center">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <UIcon name="i-lucide-arrow-left" class="w-4 h-4" />
          Retour à l'accueil
        </NuxtLink>
      </p>
    </div>
  </div>
</template>
