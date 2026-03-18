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
    '@vite-pwa/nuxt',
    // Nuxt Studio : activé uniquement si NUXT_STUDIO=true
    ...(process.env.NUXT_STUDIO === 'true' ? ['nuxt-studio'] : []),
    // Supabase optionnel (activé uniquement si les variables d'environnement sont définies)
    ...(process.env.SUPABASE_URL && process.env.SUPABASE_KEY ? ['@nuxtjs/supabase'] : [])
  ],

  // Import du CSS principal (Tailwind + Nuxt UI + Design System Nuxy)
  css: [join(currentDir, './app/app.css')],

  // Configuration de l'application
  app: {
    // Développement local : '/'
    // Vercel : '/'
    // GitHub Pages : '/Nuxy/'
    baseURL: process.env.GITHUB_PAGES ? '/Nuxy/' : '/',
    // Note: 'assets' causait des conflits avec Vue Router en dev
    // Utiliser '_nuxt' (défaut) ou un nom qui ne conflicte pas
    buildAssetsDir: '_nuxt',
    head: {
      title: 'Nuxy - Apprendre JavaScript',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Plateforme d\'apprentissage JavaScript interactive avec éditeur de code et messages pédagogiques' },
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
          langs: ['javascript', 'typescript', 'html', 'css', 'json', 'bash', 'shell']
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

  // Configuration Vite pour résoudre les problèmes ESM/CommonJS
  vite: {
    optimizeDeps: {
      include: ['brace-expansion']
    }
  },

  // Configuration PWA
  pwa: {
    registerType: 'autoUpdate',
    manifest: {
      name: 'Nuxy - Apprendre JavaScript',
      short_name: 'Nuxy',
      description: 'Plateforme d\'apprentissage JavaScript interactive avec éditeur de code',
      theme_color: '#0f172a',
      background_color: '#0f172a',
      display: 'standalone',
      start_url: '/',
      categories: ['education'],
      icons: [
        {
          src: '/web-app-manifest-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/web-app-manifest-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable'
        },
        {
          src: '/web-app-manifest-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any'
        },
        {
          src: '/web-app-manifest-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable'
        }
      ]
    },
    workbox: {
      // Précache tous les assets statiques pour le mode offline
      globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2}'],
      // Exclure les images trop lourdes du précache (limite: 2 MiB)
      globIgnores: ['**/nuxy-fusée*']
    }
  },

  // Désactiver @nuxt/fonts pour utiliser les polices locales uniquement
  fonts: {
    enabled: false
  }
})