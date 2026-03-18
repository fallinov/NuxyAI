/**
 * Types TypeScript pour la base de données Supabase
 * Générés manuellement pour correspondre au schéma SQL
 */

export type UserRole = 'student' | 'teacher'
export type LessonStatus = 'not-started' | 'in-progress' | 'completed'

// -----------------------------------------------------------------------------
// Tables
// -----------------------------------------------------------------------------

export interface Profile {
  id: string // UUID, référence auth.users
  email: string
  full_name: string | null
  role: UserRole
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Class {
  id: string // UUID
  name: string
  description: string | null
  teacher_id: string // UUID, référence profiles
  invite_code: string // Code unique de 8 caractères
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ClassMember {
  id: string // UUID
  class_id: string // UUID, référence classes
  student_id: string // UUID, référence profiles
  joined_at: string
}

export interface LessonProgress {
  id: string // UUID
  user_id: string // UUID, référence profiles
  lesson_slug: string
  status: LessonStatus
  attempts: number
  completed_at: string | null
  last_attempt_at: string | null
  quiz_score: number | null
  checklist_completed: string[] | null
  // Timestamps
  created_at: string
  updated_at: string
}

// -----------------------------------------------------------------------------
// Types pour les jointures et vues
// -----------------------------------------------------------------------------

export interface ClassWithTeacher extends Class {
  teacher: Profile
}

export interface ClassWithMembers extends Class {
  members: ClassMemberWithStudent[]
  student_count: number
}

export interface ClassMemberWithStudent extends ClassMember {
  student: Profile
}

export interface ClassMemberWithClass extends ClassMember {
  class: Class
}

export interface StudentWithProgress extends Profile {
  progress: LessonProgress[]
}

// -----------------------------------------------------------------------------
// Types pour les formulaires et mutations
// -----------------------------------------------------------------------------

export interface CreateProfileInput {
  email: string
  full_name?: string
  role?: UserRole
}

export interface UpdateProfileInput {
  full_name?: string
  avatar_url?: string
}

export interface CreateClassInput {
  name: string
  description?: string
}

export interface UpdateClassInput {
  name?: string
  description?: string
  is_active?: boolean
}

export interface CreateLessonProgressInput {
  lesson_slug: string
  status?: LessonStatus
}

export interface UpdateLessonProgressInput {
  status?: LessonStatus
  attempts?: number
  completed_at?: string | null
  last_attempt_at?: string | null
  quiz_score?: number | null
  checklist_completed?: string[] | null
}

// -----------------------------------------------------------------------------
// Types pour les fonctions RPC Supabase
// -----------------------------------------------------------------------------

export interface ClassStatistics {
  total_students: number
  lessons_completed: number
  total_attempts: number
}

// -----------------------------------------------------------------------------
// Types utilitaires pour Supabase
// -----------------------------------------------------------------------------

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Omit<Profile, 'created_at' | 'updated_at'>
        Update: Partial<Omit<Profile, 'id' | 'created_at'>>
      }
      classes: {
        Row: Class
        Insert: Omit<Class, 'id' | 'invite_code' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<Class, 'id' | 'teacher_id' | 'created_at'>>
      }
      class_members: {
        Row: ClassMember
        Insert: Omit<ClassMember, 'id' | 'joined_at'>
        Update: never // Cette table ne devrait pas être mise à jour
      }
      lesson_progress: {
        Row: LessonProgress
        Insert: Omit<LessonProgress, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Omit<LessonProgress, 'id' | 'user_id' | 'lesson_slug' | 'created_at'>>
      }
    }
    Functions: {
      regenerate_invite_code: {
        Args: { class_uuid: string }
        Returns: string
      }
      join_class_by_code: {
        Args: { code: string }
        Returns: string
      }
      get_class_statistics: {
        Args: { class_uuid: string }
        Returns: ClassStatistics
      }
    }
  }
}
