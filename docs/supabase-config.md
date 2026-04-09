# Configuration Supabase

## Schéma

- **Schéma** : `nuxyai` (séparé du schéma `public`)
- **Credentials** : Fichier `.env` à la racine du projet

## Tables

| Table | Description |
|-------|-------------|
| `profiles` | Profils utilisateurs (id, email, full_name, role, avatar_url) |
| `classes` | Classes (id, name, description, teacher_id, invite_code, is_active) |
| `class_members` | Relation élève-classe (class_id, student_id, joined_at) |
| `lesson_progress` | Progression (user_id, lesson_slug, status, completed_at) |

## Composable `useNuxyDb()`

Helper centralisé pour accéder au schéma `nuxyai` :

```typescript
const { from, rpc, channel, client } = useNuxyDb()

// Requête sur une table du schéma nuxyai
const { data } = await from('profiles').select('*').eq('id', userId)

// Appel RPC
const { data } = await rpc('join_class_by_code', { code: 'ABC123' })

// Realtime
const chan = channel('changes').on('postgres_changes', { schema: 'nuxyai', ... })
```

## Points critiques

### Schéma personnalisé : utiliser `useNuxyDb()`

```typescript
// Correct - accède au schéma 'nuxyai'
const { from, rpc } = useNuxyDb()
const { data } = await from('profiles').select('*')

// Incorrect - accède au schéma 'public' par défaut
const supabase = useSupabaseClient()
const { data } = await supabase.from('profiles').select('*')
```

### ID utilisateur : utiliser `useUserId()`

```typescript
// Correct
const userId = useUserId()

// Incorrect - peut retourner undefined
const userId = user.value?.id
```
