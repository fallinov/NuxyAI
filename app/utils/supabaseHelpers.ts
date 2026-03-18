/**
 * supabaseHelpers - Utilitaires pour les opérations Supabase
 *
 * Centralise les patterns répétitifs comme la gestion d'erreurs async.
 */

import type { PostgrestError } from '@supabase/supabase-js'

/**
 * Type pour les réponses Supabase
 */
export interface SupabaseResponse<T> {
  data: T | null
  error: PostgrestError | null
}

/**
 * Exécute une opération Supabase avec gestion d'erreur centralisée
 *
 * @param operation - Fonction async retournant { data, error }
 * @param errorMessage - Message d'erreur pour le log (optionnel)
 * @returns Les données ou null en cas d'erreur
 * @throws L'erreur Supabase si présente
 *
 * @example
 * const data = await withSupabaseError(
 *   () => from('profiles').select('*').eq('id', userId),
 *   'Erreur lors du chargement du profil'
 * )
 */
export async function withSupabaseError<T>(
  operation: () => Promise<SupabaseResponse<T>>,
  errorMessage?: string
): Promise<T | null> {
  try {
    const { data, error } = await operation()

    if (error) {
      if (errorMessage) {
        console.error(errorMessage, error)
      }
      throw error
    }

    return data
  } catch (err) {
    if (errorMessage && !(err instanceof Object && 'code' in err)) {
      console.error(errorMessage, err)
    }
    throw err
  }
}

/**
 * Exécute une opération Supabase et retourne null au lieu de throw
 *
 * @param operation - Fonction async retournant { data, error }
 * @param errorMessage - Message d'erreur pour le log
 * @returns Les données ou null en cas d'erreur (sans throw)
 *
 * @example
 * const data = await withSupabaseSilent(
 *   () => from('profiles').select('*').eq('id', userId),
 *   'Erreur lors du chargement du profil'
 * )
 * if (!data) {
 *   // Gérer le cas d'erreur
 * }
 */
export async function withSupabaseSilent<T>(
  operation: () => Promise<SupabaseResponse<T>>,
  errorMessage?: string
): Promise<T | null> {
  try {
    const { data, error } = await operation()

    if (error) {
      if (errorMessage) {
        console.error(errorMessage, error)
      }
      return null
    }

    return data
  } catch (err) {
    if (errorMessage) {
      console.error(errorMessage, err)
    }
    return null
  }
}

/**
 * Formate un message d'erreur Supabase pour l'affichage utilisateur
 */
export function formatSupabaseError(error: PostgrestError | Error | unknown): string {
  if (!error) return 'Une erreur inconnue est survenue'

  if (error instanceof Error) {
    return error.message
  }

  if (typeof error === 'object' && 'message' in error) {
    return (error as { message: string }).message
  }

  return 'Une erreur est survenue'
}
