import { defineContentConfig, defineCollection, z } from '@nuxt/content'

// Schéma pour une règle de validation d'exercice
const validationSchema = z.object({
    description: z.string(),
    type: z.enum([
        // Validations existantes (JS)
        'output_contains',
        'output_equals',
        'output_matches',
        'variable_exists',
        'variable_equals',
        'variable_type',
        'code_contains',
        'code_matches',
        'no_error',
        // Nouvelles validations DOM
        'dom_contains',        // Vérifie si un élément existe
        'dom_text_contains',   // Vérifie le textContent d'un élément
        'dom_style',           // Vérifie une propriété CSS
        'dom_attribute',       // Vérifie un attribut HTML
        'dom_class_contains',  // Vérifie si un élément a une classe
        'dom_count'            // Compte les éléments correspondants
    ]),
    expected: z.union([z.string(), z.number(), z.boolean(), z.array(z.string())]).optional(),
    variable: z.string().optional(),
    // Nouveaux champs pour validations DOM
    selector: z.string().optional(),           // Sélecteur CSS pour les validations DOM
    property: z.string().optional(),           // Propriété CSS (pour dom_style)
    attribute: z.string().optional(),          // Attribut HTML (pour dom_attribute)
    expectedCount: z.number().optional(),      // Nombre attendu (pour dom_count)
    triggerEvent: z.string().optional(),       // Événement à déclencher avant validation
    errorMessage: z.string().optional(),
    successMessage: z.string().optional(),
    hidden: z.boolean().optional()
})

// Schéma pour un indice
const hintSchema = z.object({
    title: z.string(),
    content: z.string(),
    example: z.string().optional(),
    learnMore: z.string().optional()
})

// Schéma pour la solution (JS uniquement)
const solutionSchema = z.object({
    code: z.string(),
    explanation: z.string().optional()
})

// Schéma pour la solution HTML/CSS/JS
const solutionHtmlCssJsSchema = z.object({
    html: z.string().optional(),
    css: z.string().optional(),
    js: z.string().optional(),
    explanation: z.string().optional()
})

// Schéma pour le code de départ HTML/CSS/JS
const starterCodeHtmlCssJsSchema = z.object({
    html: z.string().optional(),
    css: z.string().optional(),
    js: z.string().optional()
})

export default defineContentConfig({
    collections: {
        exercises: defineCollection({
            type: 'page',
            source: 'exercises/*.md',
            schema: z.object({
                title: z.string(),
                description: z.string(),
                difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
                order: z.number(),
                duration: z.number(),
                module: z.number().optional(),
                exerciseNumber: z.string().optional(),
                tags: z.array(z.string()).optional(),
                concepts: z.array(z.string()).optional(),
                // Type d'exercice : javascript (défaut) ou html-css-js
                exerciseType: z.enum(['javascript', 'html-css-js', 'intro']).default('javascript'),
                // Code de départ : string (JS) ou objet (HTML/CSS/JS)
                starterCode: z.union([
                    z.string(),
                    starterCodeHtmlCssJsSchema
                ]).optional(),
                // Solution : format simple (JS) ou objet (HTML/CSS/JS)
                solution: z.union([
                    solutionSchema,
                    solutionHtmlCssJsSchema
                ]).optional(),
                validations: z.array(validationSchema).optional(),
                hints: z.array(hintSchema).optional()
            })
        })
    }
})
