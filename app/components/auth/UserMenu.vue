<script setup lang="ts">
/**
 * UserMenu - Menu utilisateur dans le header
 *
 * Affiche :
 * - Bouton "Se connecter" si non authentifié
 * - Dropdown avec nom/email et actions si authentifié
 */

const router = useRouter()
const toast = useToast()
const { user, profile, isAuthenticated, isTeacher, logout, isLoading } = useAuth()

// Initiales pour l'avatar
const initials = computed(() => {
  if (profile.value?.full_name) {
    return profile.value.full_name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }
  if (user.value?.email) {
    return user.value.email.charAt(0).toUpperCase()
  }
  return '?'
})

// Déconnexion
const handleLogout = async () => {
  console.log('handleLogout appelé') // Debug
  const result = await logout()
  console.log('Résultat logout:', result) // Debug

  if (result.success) {
    toast.add({
      title: 'Déconnecté',
      description: 'À bientôt !',
      color: 'green',
      timeout: 2000
    })
    await router.push('/')
  }
}

// Items du menu dropdown
const menuItems = computed(() => {
  const items: any[][] = [
    [
      {
        label: profile.value?.full_name || user.value?.email || 'Mon compte',
        slot: 'account',
        disabled: true
      }
    ],
    [
      {
        label: 'Mon profil',
        icon: 'i-lucide-user',
        to: '/profile'
      }
    ]
  ]

  // Ajouter le lien enseignant si applicable
  if (isTeacher.value) {
    items.push([
      {
        label: 'Mes classes',
        icon: 'i-lucide-users',
        to: '/teacher'
      }
    ])
  }

  // Déconnexion
  items.push([
    {
      label: 'Se déconnecter',
      icon: 'i-lucide-log-out',
      onSelect() {
        handleLogout()
      }
    }
  ])

  return items
})
</script>

<template>
  <!-- Non connecté : bouton Se connecter -->
  <NuxtLink
    v-if="!isAuthenticated"
    to="/auth/login"
    class="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
  >
    <UIcon name="i-lucide-circle-user" class="w-5 h-5" />
    <span class="hidden sm:inline">Se connecter</span>
  </NuxtLink>

  <!-- Connecté : dropdown menu -->
  <UDropdownMenu
    v-else
    :items="menuItems"
    :content="{ align: 'end' }"
  >
    <UButton
      variant="ghost"
      color="neutral"
      class="gap-2"
    >
      <!-- Avatar avec initiales -->
      <UAvatar
        :text="initials"
        size="sm"
        class="bg-nuxy-green text-white"
      />

      <!-- Nom sur desktop -->
      <span class="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300 max-w-[120px] truncate">
        {{ profile?.full_name || user?.email?.split('@')[0] }}
      </span>

      <!-- Badge enseignant -->
      <UBadge v-if="isTeacher" color="primary" variant="subtle" size="xs" class="hidden md:flex">
        Enseignant
      </UBadge>
    </UButton>

    <!-- Slot pour l'en-tête du compte -->
    <template #account="{ item }">
      <div class="text-left px-1 py-0.5">
        <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
          {{ profile?.full_name || 'Utilisateur' }}
        </p>
        <p class="text-xs text-gray-500 dark:text-gray-400 truncate">
          {{ user?.email }}
        </p>
      </div>
    </template>
  </UDropdownMenu>
</template>
