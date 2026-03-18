<script setup lang="ts">
/**
 * Page de callback pour l'authentification (PKCE flow)
 *
 * Pattern recommandé par @nuxtjs/supabase :
 * Watch useSupabaseUser() et rediriger quand l'utilisateur est disponible.
 * Le Supabase client échange automatiquement le ?code= PKCE contre une session.
 *
 * Gère :
 * - Password recovery (détecté via localStorage flag)
 * - Confirmation d'email (signup)
 * - Autres callbacks auth
 */

definePageMeta({
  layout: 'default'
})

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()
const toast = useToast()

const isProcessing = ref(true)
const errorMessage = ref<string | null>(null)

// Écouter l'événement PASSWORD_RECOVERY (si on arrive à le capter)
let isRecovery = false

supabase.auth.onAuthStateChange((event) => {
  if (event === 'PASSWORD_RECOVERY') {
    isRecovery = true
  }
})

// Watch le user : dès qu'il est disponible, la session est établie
watch(user, (newUser) => {
  if (!newUser) return

  // Vérifier si c'est un password recovery via le flag localStorage
  const pendingRecovery = localStorage.getItem('nuxy_pending_recovery')

  if (isRecovery || pendingRecovery) {
    localStorage.removeItem('nuxy_pending_recovery')
    toast.add({
      title: 'Lien validé',
      description: 'Tu peux maintenant changer ton mot de passe.',
      color: 'success',
      timeout: 3000
    })
    router.replace('/auth/reset-password')
  } else {
    // Signup confirmation ou autre callback
    toast.add({
      title: 'Connexion réussie !',
      description: 'Ton compte est actif.',
      color: 'success',
      timeout: 3000
    })
    router.replace('/')
  }
}, { immediate: true })

// Timeout de sécurité : si rien ne se passe après 10s, afficher une erreur
onMounted(() => {
  setTimeout(() => {
    if (isProcessing.value && !user.value) {
      isProcessing.value = false
      errorMessage.value = 'Le traitement a pris trop de temps. Le lien est peut-être expiré.'
    }
  }, 10000)
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-950 px-4">
    <div class="text-center">
      <!-- Spinner de chargement -->
      <div v-if="isProcessing" class="space-y-4">
        <div class="w-16 h-16 mx-auto">
          <UIcon name="i-lucide-loader-2" class="w-full h-full text-nuxy-green animate-spin" />
        </div>
        <h1 class="text-2xl font-bold text-white">
          Un instant...
        </h1>
        <p class="text-gray-400">
          On vérifie ton lien
        </p>
      </div>

      <!-- Message d'erreur -->
      <div v-else-if="errorMessage" class="space-y-4">
        <div class="w-16 h-16 mx-auto bg-red-900/30 rounded-full flex items-center justify-center">
          <UIcon name="i-lucide-triangle-alert" class="w-8 h-8 text-red-400" />
        </div>
        <h1 class="text-2xl font-bold text-white">
          Oups !
        </h1>
        <p class="text-gray-400">
          {{ errorMessage }}
        </p>
        <div class="flex gap-3 justify-center mt-4">
          <UButton to="/auth/forgot-password" class="btn-cta">
            Demander un nouveau lien
          </UButton>
          <UButton to="/" color="neutral" variant="outline" class="rounded-xl">
            Retour à l'accueil
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
