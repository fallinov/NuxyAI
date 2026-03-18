<script setup lang="ts">
/**
 * AiConversation - Affichage d'une conversation IA style chat
 *
 * Composant MDC pour ::ai-conversation
 * Affiche des messages utilisateur et assistant en bulles de chat.
 * User = droite, vert | Assistant = gauche, gris avec icône Claude.
 */

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

defineProps<{
  messages: ChatMessage[]
}>()
</script>

<template>
  <div class="space-y-4 my-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
    <!-- En-tête -->
    <div class="flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
      <UIcon name="i-lucide-message-square" class="w-4 h-4 text-nuxy-teal" />
      <span class="text-sm font-medium text-gray-600 dark:text-gray-400">Conversation avec l'IA</span>
    </div>

    <!-- Messages -->
    <div
      v-for="(msg, index) in messages"
      :key="index"
      class="flex gap-3"
      :class="msg.role === 'user' ? 'justify-end' : 'justify-start'"
    >
      <!-- Avatar assistant (gauche) -->
      <div
        v-if="msg.role === 'assistant'"
        class="flex-shrink-0 w-8 h-8 rounded-full bg-nuxy-teal/10 flex items-center justify-center"
      >
        <UIcon name="i-lucide-bot" class="w-4 h-4 text-nuxy-teal" />
      </div>

      <!-- Bulle de message -->
      <div
        class="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line"
        :class="[
          msg.role === 'user'
            ? 'bg-nuxy-green text-white rounded-br-md'
            : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-md shadow-sm'
        ]"
      >
        {{ msg.content }}
      </div>

      <!-- Avatar utilisateur (droite) -->
      <div
        v-if="msg.role === 'user'"
        class="flex-shrink-0 w-8 h-8 rounded-full bg-nuxy-green/10 flex items-center justify-center"
      >
        <UIcon name="i-lucide-user" class="w-4 h-4 text-nuxy-green" />
      </div>
    </div>
  </div>
</template>
