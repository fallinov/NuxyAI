import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const checklistItemSchema = z.object({
  id: z.string(),
  label: z.string()
})

const quizQuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()),
  correct: z.number(),
  explanation: z.string().optional()
})

export default defineContentConfig({
  collections: {
    lessons: defineCollection({
      type: 'page',
      source: 'lessons/*.md',
      schema: z.object({
        title: z.string(),
        description: z.string(),
        phase: z.number(),
        module: z.number(),
        lessonNumber: z.string(),
        duration: z.number(),
        difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
        type: z.enum(['guide', 'exercise', 'quiz', 'project']),
        tags: z.array(z.string()).optional(),
        concepts: z.array(z.string()).optional(),
        objectives: z.array(z.string()).optional(),
        checklist: z.array(checklistItemSchema).optional(),
        quiz: z.array(quizQuestionSchema).optional()
      })
    })
  }
})
