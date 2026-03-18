// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import pkg from './package.json'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  // Expose la version au client
  runtimeConfig: {
    public: {
      appVersion: pkg.version
    }
  },

  compatibilityDate: '2024-11-01',

  devtools: {
    enabled: true
  },

  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    // Supabase optionnel (activé uniquement si les variables d'environnement sont définies)
    ...(process.env.SUPABASE_URL && process.env.SUPABASE_KEY ? ['@nuxtjs/supabase'] : [])
  ],

  // Import du CSS principal (Tailwind + Nuxt UI + Design System Nuxy)
  css: [join(currentDir, './app/app.css')],

  // Configuration de l'application
  app: {
    baseURL: '/',
    // Note: 'assets' causait des conflits avec Vue Router en dev
    // Utiliser '_nuxt' (défaut) ou un nom qui ne conflicte pas
    buildAssetsDir: '_nuxt',
    head: {
      title: 'NuxyAI - Développement avec l\'IA',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Formation au développement assisté par IA avec Claude Code' },
        { name: 'theme-color', content: '#0f172a' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }
      ]
    }
  },

  // Génération statique (SSG)
  ssr: true,

  // Configuration Supabase (optionnelle)
  ...(process.env.SUPABASE_URL && process.env.SUPABASE_KEY ? {
    supabase: {
      // Désactiver la redirection automatique (on gère avec nos middlewares)
      redirect: false,
      // URL de redirection pour l'authentification
      redirectOptions: {
        login: '/auth/login',
        callback: '/auth/callback',
        include: undefined,
        exclude: [],
        cookieRedirect: false
      }
    }
  } : {}),

  // Nuxt Content
  content: {
    // Configuration du build Markdown
    build: {
      markdown: {
        // Coloration syntaxique avec Shiki
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark'
          },
          langs: ['javascript', 'typescript', 'html', 'css', 'json', 'bash', 'shell', 'yaml']
        }
      }
    },
    // En développement local : utiliser le système de fichiers
    // En production avec PostgreSQL : utiliser la base de données
    ...(process.env.POSTGRES_URL ? {
      database: {
        type: 'postgres',
        url: process.env.POSTGRES_URL
      }
    } : {
      // Utiliser le système de fichiers par défaut
    })
  },

  // Configuration pour la génération statique
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: ['/'],
      failOnError: false,
      ignore: ['/taches']
    }
  },

  // Configuration pour la génération statique avec routes
  experimental: {
    payloadExtraction: false
  },

  // Désactiver @nuxt/fonts pour utiliser les polices locales uniquement
  fonts: {
    enabled: false
  }
})
