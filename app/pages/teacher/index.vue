<script setup lang="ts">
/**
 * Dashboard Enseignant - Liste des classes
 *
 * - Liste de toutes les classes de l'enseignant
 * - Bouton "Créer une classe"
 * - Modal de création
 * - Actions rapides par classe
 */

definePageMeta({
  layout: 'default',
  middleware: 'teacher'
})

useSeoMeta({
  title: 'Mes classes - Nuxy'
})

const toast = useToast()
const { classes, loadClasses, createClass, deleteClass, isLoading } = useClasses()
const { profile } = useAuth()

// Charger les classes au montage
await loadClasses()

// Modal de création
const showCreateModal = ref(false)
const newClass = reactive({
  name: '',
  description: ''
})

// Validation du formulaire
const isFormValid = computed(() => newClass.name.trim().length >= 3)

// Créer une classe
const handleCreateClass = async () => {
  if (!isFormValid.value) return

  const result = await createClass({
    name: newClass.name.trim(),
    description: newClass.description.trim() || undefined
  })

  if (result) {
    toast.add({
      title: 'Classe créée',
      description: `La classe "${result.name}" a été créée avec succès.`,
      color: 'green',
      timeout: 3000
    })
    showCreateModal.value = false
    newClass.name = ''
    newClass.description = ''
  } else {
    toast.add({
      title: 'Erreur',
      description: 'Impossible de créer la classe.',
      color: 'red',
      timeout: 5000
    })
  }
}

// Supprimer une classe
const handleDeleteClass = async (classItem: any) => {
  if (!confirm(`Supprimer la classe "${classItem.name}" ? Cette action est irréversible.`)) {
    return
  }

  const success = await deleteClass(classItem.id)

  if (success) {
    toast.add({
      title: 'Classe supprimée',
      color: 'green',
      timeout: 3000
    })
  } else {
    toast.add({
      title: 'Erreur',
      description: 'Impossible de supprimer la classe.',
      color: 'red',
      timeout: 5000
    })
  }
}

// Copier le lien d'invitation
const copyInviteLink = async (inviteCode: string) => {
  const url = `${window.location.origin}/join/${inviteCode}`
  await navigator.clipboard.writeText(url)
  toast.add({
    title: 'Lien copié',
    description: 'Le lien d\'invitation a été copié dans le presse-papier.',
    color: 'green',
    timeout: 2000
  })
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
    <UContainer>
      <!-- En-tête -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
            Mes classes
          </h1>
          <p class="mt-2 text-gray-600 dark:text-gray-400">
            Bonjour {{ profile?.full_name || 'Enseignant' }}, vous avez {{ classes.length }} classe(s)
          </p>
        </div>
        <UButton
          icon="i-lucide-plus"
          size="lg"
          class="btn-cta"
          @click="showCreateModal = true"
        >
          Nouvelle classe
        </UButton>
      </div>

      <!-- Liste des classes -->
      <div v-if="classes.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard
          v-for="classItem in classes"
          :key="classItem.id"
          class="hover:shadow-lg transition-shadow"
        >
          <template #header>
            <div class="flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white truncate">
                {{ classItem.name }}
              </h3>
              <UBadge
                :color="classItem.is_active ? 'green' : 'gray'"
                variant="subtle"
              >
                {{ classItem.is_active ? 'Active' : 'Inactive' }}
              </UBadge>
            </div>
          </template>

          <p v-if="classItem.description" class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
            {{ classItem.description }}
          </p>
          <p v-else class="text-gray-400 dark:text-gray-500 text-sm italic mb-4">
            Aucune description
          </p>

          <!-- Code d'invitation -->
          <div class="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <UIcon name="i-lucide-link" class="w-4 h-4 text-gray-500" />
            <code class="text-sm font-mono text-nuxy-teal-dark dark:text-nuxy-teal flex-1">
              {{ classItem.invite_code }}
            </code>
            <UButton
              icon="i-lucide-clipboard"
              size="xs"
              variant="ghost"
              aria-label="Copier le lien d'invitation"
              @click="copyInviteLink(classItem.invite_code)"
            />
          </div>

          <template #footer>
            <div class="flex items-center justify-between">
              <UButton
                :to="`/teacher/classes/${classItem.id}`"
                variant="soft"
                size="sm"
              >
                Voir les élèves
              </UButton>
              <UDropdownMenu
                :items="[
                  [
                    {
                      label: 'Modifier',
                      icon: 'i-lucide-pencil',
                      to: `/teacher/classes/${classItem.id}/edit`
                    },
                    {
                      label: 'Copier le lien',
                      icon: 'i-lucide-clipboard',
                      click: () => copyInviteLink(classItem.invite_code)
                    }
                  ],
                  [
                    {
                      label: 'Supprimer',
                      icon: 'i-lucide-trash-2',
                      color: 'red',
                      click: () => handleDeleteClass(classItem)
                    }
                  ]
                ]"
              >
                <UButton
                  icon="i-lucide-more-vertical"
                  variant="ghost"
                  size="sm"
                  aria-label="Plus d'options"
                />
              </UDropdownMenu>
            </div>
          </template>
        </UCard>
      </div>

      <!-- État vide -->
      <UCard v-else class="text-center py-12">
        <UIcon name="i-lucide-users" class="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
        <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          Aucune classe
        </h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6">
          Créez votre première classe pour commencer à suivre la progression de vos élèves.
        </p>
        <UButton
          icon="i-lucide-plus"
          @click="showCreateModal = true"
        >
          Créer une classe
        </UButton>
      </UCard>

      <!-- Modal de création -->
      <UModal v-model:open="showCreateModal">
        <template #content>
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                  Nouvelle classe
                </h3>
                <UButton
                  icon="i-lucide-x"
                  variant="ghost"
                  size="sm"
                  aria-label="Fermer"
                  @click="showCreateModal = false"
                />
              </div>
            </template>

            <form @submit.prevent="handleCreateClass" class="space-y-4">
              <UFormField label="Nom de la classe" name="name" required>
                <UInput
                  v-model="newClass.name"
                  placeholder="Ex: ESIG1 - JavaScript 2026"
                  :disabled="isLoading"
                />
              </UFormField>

              <UFormField label="Description (optionnel)" name="description">
                <UTextarea
                  v-model="newClass.description"
                  placeholder="Une brève description de la classe..."
                  :rows="3"
                  :disabled="isLoading"
                />
              </UFormField>

              <div class="flex justify-end gap-3 pt-4">
                <UButton
                  variant="outline"
                  @click="showCreateModal = false"
                  :disabled="isLoading"
                >
                  Annuler
                </UButton>
                <UButton
                  type="submit"
                  :loading="isLoading"
                  :disabled="!isFormValid || isLoading"
                >
                  Créer la classe
                </UButton>
              </div>
            </form>
          </UCard>
        </template>
      </UModal>
    </UContainer>
  </div>
</template>
