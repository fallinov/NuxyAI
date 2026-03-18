<script setup lang="ts">
/**
 * Page de profil utilisateur
 *
 * - Affiche les infos du profil
 * - Liste des classes rejointes (pour les élèves)
 * - Lien vers le dashboard (pour les enseignants)
 * - Statistiques de progression
 */

definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

useSeoMeta({
  title: 'Mon profil - Nuxy'
})

const toast = useToast()
const { user, profile, isTeacher, loadProfile } = useAuth()
const { myClasses, loadMyClasses, leaveClass, updateProfile, isLoading: profileLoading } = useProfile()
const { stats, syncFromLocalStorage } = useSupabaseProgress()

// Charger les données et synchroniser la progression
await loadProfile()
await syncFromLocalStorage() // Sync localStorage → Supabase si connecté

if (!isTeacher.value) {
  await loadMyClasses()
}

// Mode édition
const isEditing = ref(false)
const editForm = reactive({
  full_name: profile.value?.full_name || ''
})

// Sauvegarder les modifications
const handleSave = async () => {
  const result = await updateProfile({
    full_name: editForm.full_name.trim() || undefined
  })

  if (result) {
    isEditing.value = false
    toast.add({
      title: 'Profil mis à jour',
      color: 'green',
      timeout: 2000
    })
  } else {
    toast.add({
      title: 'Erreur',
      description: 'Impossible de mettre à jour le profil.',
      color: 'red',
      timeout: 5000
    })
  }
}

// Quitter une classe
const handleLeaveClass = async (classId: string, className: string) => {
  if (!confirm(`Quitter la classe "${className}" ?`)) return

  const success = await leaveClass(classId)

  if (success) {
    toast.add({
      title: 'Classe quittée',
      color: 'green',
      timeout: 2000
    })
  } else {
    toast.add({
      title: 'Erreur',
      description: 'Impossible de quitter la classe.',
      color: 'red',
      timeout: 5000
    })
  }
}

// Watcher pour mettre à jour le formulaire quand le profil change
watch(profile, (newProfile) => {
  if (newProfile && !isEditing.value) {
    editForm.full_name = newProfile.full_name || ''
  }
}, { immediate: true })
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <UContainer class="max-w-4xl">
      <!-- En-tête -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            Mon profil
          </h1>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            Gérez vos informations et votre progression
          </p>
        </div>
        <UButton
          v-if="isTeacher"
          to="/teacher"
          icon="i-lucide-users"
        >
          Mes classes
        </UButton>
      </div>

      <div class="grid lg:grid-cols-3 gap-6">
        <!-- Colonne gauche : Infos profil -->
        <div class="lg:col-span-1">
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Informations
                </h2>
                <UButton
                  v-if="!isEditing"
                  icon="i-lucide-pencil"
                  size="xs"
                  variant="ghost"
                  @click="isEditing = true"
                />
              </div>
            </template>

            <!-- Mode affichage -->
            <div v-if="!isEditing" class="space-y-4">
              <!-- Avatar -->
              <div class="flex justify-center">
                <UAvatar
                  :text="profile?.full_name?.charAt(0) || user?.email?.charAt(0)?.toUpperCase() || '?'"
                  size="3xl"
                  class="bg-nuxy-green text-white"
                />
              </div>

              <!-- Nom -->
              <div>
                <label class="text-sm text-gray-500 dark:text-gray-400">Nom</label>
                <p class="font-medium text-gray-900 dark:text-white">
                  {{ profile?.full_name || 'Non renseigné' }}
                </p>
              </div>

              <!-- Email -->
              <div>
                <label class="text-sm text-gray-500 dark:text-gray-400">Email</label>
                <p class="font-medium text-gray-900 dark:text-white">
                  {{ user?.email }}
                </p>
              </div>

              <!-- Rôle -->
              <div>
                <label class="text-sm text-gray-500 dark:text-gray-400">Rôle</label>
                <p class="font-medium">
                  <UBadge :color="isTeacher ? 'primary' : 'green'" variant="subtle">
                    {{ isTeacher ? 'Enseignant' : 'Élève' }}
                  </UBadge>
                </p>
              </div>

              <!-- Date d'inscription -->
              <div>
                <label class="text-sm text-gray-500 dark:text-gray-400">Membre depuis</label>
                <p class="font-medium text-gray-900 dark:text-white">
                  {{ new Date(profile?.created_at || '').toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' }) }}
                </p>
              </div>
            </div>

            <!-- Mode édition -->
            <form v-else @submit.prevent="handleSave" class="space-y-4">
              <UFormField label="Nom complet" name="full_name">
                <UInput
                  v-model="editForm.full_name"
                  placeholder="Votre nom"
                  :disabled="profileLoading"
                />
              </UFormField>

              <div class="flex justify-end gap-2">
                <UButton
                  variant="outline"
                  size="sm"
                  @click="isEditing = false"
                  :disabled="profileLoading"
                >
                  Annuler
                </UButton>
                <UButton
                  type="submit"
                  size="sm"
                  :loading="profileLoading"
                >
                  Enregistrer
                </UButton>
              </div>
            </form>
          </UCard>
        </div>

        <!-- Colonne droite : Stats et Classes -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Statistiques de progression -->
          <UCard>
            <template #header>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                Ma progression
              </h2>
            </template>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="text-center p-4 bg-nuxy-green/10 dark:bg-nuxy-green/20 rounded-xl">
                <div class="text-3xl font-bold text-nuxy-green-dark dark:text-nuxy-green">
                  {{ stats.completed }}
                </div>
                <div class="text-sm text-gray-500">Complétés</div>
              </div>
              <div class="text-center p-4 bg-nuxy-gold/10 dark:bg-nuxy-gold/20 rounded-xl">
                <div class="text-3xl font-bold text-nuxy-gold-dark dark:text-nuxy-gold">
                  {{ stats.inProgress }}
                </div>
                <div class="text-sm text-gray-500">En cours</div>
              </div>
              <div class="text-center p-4 bg-nuxy-teal/10 dark:bg-nuxy-teal/20 rounded-xl">
                <div class="text-3xl font-bold text-nuxy-teal-dark dark:text-nuxy-teal">
                  {{ stats.totalAttempts }}
                </div>
                <div class="text-sm text-gray-500">Tentatives</div>
              </div>
              <div class="text-center p-4 bg-nuxy-pink/10 dark:bg-nuxy-pink/20 rounded-xl">
                <div class="text-3xl font-bold text-nuxy-pink-dark dark:text-nuxy-pink">
                  {{ Math.round(stats.completionRate) }}%
                </div>
                <div class="text-sm text-gray-500">Complétion</div>
              </div>
            </div>

            <template #footer>
              <UButton to="/" variant="soft" block>
                Voir tous les exercices
              </UButton>
            </template>
          </UCard>

          <!-- Mes classes (élèves uniquement) -->
          <UCard v-if="!isTeacher">
            <template #header>
              <h2 class="text-lg font-semibold text-gray-900 dark:text-white">
                Mes classes
              </h2>
            </template>

            <div v-if="myClasses.length > 0" class="space-y-3">
              <div
                v-for="membership in myClasses"
                :key="membership.id"
                class="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
              >
                <div>
                  <h3 class="font-medium text-gray-900 dark:text-white">
                    {{ membership.class.name }}
                  </h3>
                  <p class="text-sm text-gray-500">
                    Rejoint le {{ new Date(membership.joined_at).toLocaleDateString('fr-FR') }}
                  </p>
                </div>
                <UButton
                  icon="i-lucide-log-out"
                  size="xs"
                  variant="ghost"
                  color="red"
                  @click="handleLeaveClass(membership.class_id, membership.class.name)"
                  title="Quitter la classe"
                />
              </div>
            </div>

            <div v-else class="text-center py-8">
              <UIcon name="i-lucide-users" class="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <p class="text-gray-600 dark:text-gray-400 mb-4">
                Vous n'êtes inscrit à aucune classe.
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-500">
                Demandez un code d'invitation à votre enseignant.
              </p>
            </div>
          </UCard>
        </div>
      </div>
    </UContainer>
  </div>
</template>
