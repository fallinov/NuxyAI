-- Migration: Ajout des statistiques détaillées pour les exercices
-- Date: 2026-01-28
-- Description: Tracking complet pour analytics pédagogiques

-- ============================================
-- 1. Nouvelles colonnes dans exercise_progress
-- ============================================

-- Temps
ALTER TABLE nuxy.exercise_progress
ADD COLUMN IF NOT EXISTS first_opened_at TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS time_spent_seconds INTEGER DEFAULT 0;

-- Indices & Solution
ALTER TABLE nuxy.exercise_progress
ADD COLUMN IF NOT EXISTS hints_revealed INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS solution_viewed BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS solution_viewed_at TIMESTAMPTZ;

-- Exécutions
ALTER TABLE nuxy.exercise_progress
ADD COLUMN IF NOT EXISTS executions_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS successful_runs INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS errors_count INTEGER DEFAULT 0;

-- Debug context (JSON)
ALTER TABLE nuxy.exercise_progress
ADD COLUMN IF NOT EXISTS debug_context JSONB;

-- ============================================
-- 2. Table exercise_errors (log détaillé)
-- ============================================

CREATE TABLE IF NOT EXISTS nuxy.exercise_errors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  exercise_slug TEXT NOT NULL,

  -- Détails de l'erreur
  error_type TEXT NOT NULL,           -- SyntaxError, ReferenceError, TypeError, etc.
  error_message TEXT,                  -- Message brut de l'erreur
  error_line INTEGER,                  -- Ligne dans le code élève
  code_snapshot TEXT,                  -- Code qui a causé l'erreur

  -- Debug context
  debug_context JSONB,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour les requêtes fréquentes
CREATE INDEX IF NOT EXISTS idx_exercise_errors_user_id ON nuxy.exercise_errors(user_id);
CREATE INDEX IF NOT EXISTS idx_exercise_errors_exercise_slug ON nuxy.exercise_errors(exercise_slug);
CREATE INDEX IF NOT EXISTS idx_exercise_errors_error_type ON nuxy.exercise_errors(error_type);
CREATE INDEX IF NOT EXISTS idx_exercise_errors_created_at ON nuxy.exercise_errors(created_at);

-- ============================================
-- 3. RLS Policies pour exercise_errors
-- ============================================

ALTER TABLE nuxy.exercise_errors ENABLE ROW LEVEL SECURITY;

-- Les utilisateurs peuvent voir leurs propres erreurs
CREATE POLICY "Users can view own errors"
  ON nuxy.exercise_errors FOR SELECT
  USING (auth.uid() = user_id);

-- Les utilisateurs peuvent insérer leurs propres erreurs
CREATE POLICY "Users can insert own errors"
  ON nuxy.exercise_errors FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Les enseignants peuvent voir les erreurs de leurs élèves
CREATE POLICY "Teachers can view student errors"
  ON nuxy.exercise_errors FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM nuxy.profiles p
      WHERE p.id = auth.uid() AND p.role = 'teacher'
    )
    AND EXISTS (
      SELECT 1 FROM nuxy.class_members cm
      JOIN nuxy.classes c ON cm.class_id = c.id
      WHERE cm.student_id = nuxy.exercise_errors.user_id
      AND c.teacher_id = auth.uid()
    )
  );

-- ============================================
-- 4. Commentaires
-- ============================================

COMMENT ON COLUMN nuxy.exercise_progress.first_opened_at IS 'Première fois que l''élève a ouvert l''exercice';
COMMENT ON COLUMN nuxy.exercise_progress.time_spent_seconds IS 'Temps total passé sur l''exercice (cumulé)';
COMMENT ON COLUMN nuxy.exercise_progress.hints_revealed IS 'Nombre d''indices révélés';
COMMENT ON COLUMN nuxy.exercise_progress.solution_viewed IS 'A cliqué sur "Voir solution"';
COMMENT ON COLUMN nuxy.exercise_progress.executions_count IS 'Nombre de clics sur "Exécuter"';
COMMENT ON COLUMN nuxy.exercise_progress.successful_runs IS 'Exécutions sans erreur';
COMMENT ON COLUMN nuxy.exercise_progress.errors_count IS 'Nombre total d''erreurs rencontrées';
COMMENT ON COLUMN nuxy.exercise_progress.debug_context IS 'Contexte de debug JSON (browser, OS, version app, etc.)';

COMMENT ON TABLE nuxy.exercise_errors IS 'Log détaillé de toutes les erreurs pour améliorer la pédagogie';
