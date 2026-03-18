<script setup lang="ts">
/**
 * Page d'attente pour les enseignants non approuvés
 *
 * Affichée quand un enseignant est connecté mais pas encore validé par l'admin.
 */

definePageMeta({
  layout: 'default'
})

useSeoMeta({
  title: 'En attente d\'approbation - Nuxy'
})

const { logout, profile } = useAuth()
const router = useRouter()
const toast = useToast()

const handleLogout = async () => {
  await logout()
  toast.add({
    title: 'Déconnexion',
    description: 'Vous avez été déconnecté.',
    color: 'neutral',
    timeout: 3000
  })
  await router.push('/')
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-950 px-4 py-12">
    <div class="w-full max-w-md">
      <!-- Logo et titre -->
      <div class="text-center mb-6">
        <NuxtLink to="/" class="inline-block mb-4">
          <NuxyLogo size="xl" />
        </NuxtLink>
        <h1 class="text-3xl sm:text-4xl font-bold text-white">
          Patience...
        </h1>
        <p class="mt-2 text-gray-400">
          Ta demande de compte enseignant est en cours de validation
        </p>
      </div>

      <!-- Card info -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-lg">
        <div class="text-center space-y-6">
          <!-- Icône animée -->
          <div class="flex justify-center">
            <div class="w-20 h-20 bg-nuxy-gold/20 dark:bg-nuxy-gold/30 rounded-full flex items-center justify-center">
              <UIcon name="i-lucide-mail-open" class="w-10 h-10 text-nuxy-gold-dark dark:text-nuxy-gold" />
            </div>
          </div>

          <!-- Message -->
          <div class="space-y-3">
            <p class="text-gray-700 dark:text-gray-300">
              Merci pour ton inscription, <strong>{{ profile?.full_name || profile?.email }}</strong> !
            </p>
            <p class="text-gray-600 dark:text-gray-400 text-sm">
              Un admin a été notifié de ta demande et va la valider sous 24h.
              Tu recevras un email dès que ton compte sera activé.
            </p>
          </div>

          <!-- Info box -->
          <div class="bg-nuxy-teal/10 dark:bg-nuxy-teal/20 border border-nuxy-teal/30 rounded-xl p-4 text-left">
            <div class="flex gap-3">
              <UIcon name="i-lucide-info" class="w-5 h-5 text-nuxy-teal-dark dark:text-nuxy-teal flex-shrink-0 mt-0.5" />
              <div class="text-sm text-nuxy-teal-dark dark:text-nuxy-teal-light">
                <p class="font-medium">En attendant, tu peux :</p>
                <ul class="mt-2 space-y-1 list-disc list-inside">
                  <li>Accéder aux exercices comme un élève</li>
                  <li>Explorer la plateforme</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col gap-3 pt-4">
            <NuxtLink
              to="/"
              class="btn-cta py-3 text-center"
            >
              Explorer les exercices
            </NuxtLink>
            <button
              type="button"
              class="py-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              @click="handleLogout"
            >
              Se déconnecter
            </button>
          </div>
        </div>
      </div>

      <!-- Info contact -->
      <p class="mt-6 text-center text-sm text-gray-400">
        Une question ? Contacte ton admin.
      </p>
    </div>
  </div>
</template>
