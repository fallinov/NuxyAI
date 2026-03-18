/**
 * useNuxyDb - Helper pour accéder au schéma Supabase 'nuxyai'
 *
 * Ce composable encapsule l'accès au schéma 'nuxyai' sur Supabase.
 * Il fournit des méthodes pour interroger les tables et appeler les fonctions RPC.
 *
 * Usage:
 *   const { from, rpc } = useNuxyDb()
 *   const { data } = await from('profiles').select('*')
 *   const { data } = await rpc('join_class_by_code', { code: 'abc123' })
 */

// Nom du schéma NuxyAI sur Supabase
const NUXY_SCHEMA = 'nuxyai'

export const useNuxyDb = () => {
  const supabase = useSupabaseClient()

  /**
   * Accède à une table dans le schéma 'nuxy'
   * Équivalent à supabase.schema('nuxy').from(table)
   */
  const from = <T extends string>(table: T) => {
    return supabase.schema(NUXY_SCHEMA).from(table)
  }

  /**
   * Appelle une fonction RPC dans le schéma 'nuxy'
   * Note: Les fonctions sont qualifiées avec le schéma dans Postgres
   */
  const rpc = <T = any>(
    fn: string,
    args?: Record<string, any>,
    options?: { head?: boolean; count?: 'exact' | 'planned' | 'estimated' }
  ) => {
    // Pour les RPC, on doit appeler la fonction avec son nom qualifié
    // ou configurer le search_path. Ici on utilise le nom qualifié.
    return supabase.rpc(`${NUXY_SCHEMA}.${fn}` as any, args, options) as Promise<{ data: T; error: any }>
  }

  /**
   * Crée un channel Realtime pour le schéma nuxy
   */
  const channel = (name: string) => {
    return supabase.channel(name)
  }

  /**
   * Supprime un channel Realtime
   */
  const removeChannel = (channel: any) => {
    return supabase.removeChannel(channel)
  }

  return {
    from,
    rpc,
    channel,
    removeChannel,
    schema: NUXY_SCHEMA,
    // Accès au client Supabase brut si besoin (auth, storage, etc.)
    client: supabase
  }
}
