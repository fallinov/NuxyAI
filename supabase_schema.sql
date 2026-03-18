-- =============================================================================
-- Nuxy - Schéma Supabase pour gestion utilisateurs et classes
-- =============================================================================
-- Projet: fesou (qsayrwlksinxvuugwhtv)
-- Schéma: nuxy (séparé du schéma public utilisé par Fesou)
-- URL: https://supabase.com/dashboard/project/qsayrwlksinxvuugwhtv/sql
-- =============================================================================

-- Créer le schéma nuxy s'il n'existe pas
CREATE SCHEMA IF NOT EXISTS nuxy;

-- -----------------------------------------------------------------------------
-- 1. TABLES PRINCIPALES
-- -----------------------------------------------------------------------------

-- Supprimer les tables existantes si elles existent (attention en production!)
DROP TABLE IF EXISTS nuxy.exercise_progress CASCADE;
DROP TABLE IF EXISTS nuxy.class_members CASCADE;
DROP TABLE IF EXISTS nuxy.classes CASCADE;
DROP TABLE IF EXISTS nuxy.profiles CASCADE;

-- 1.1 Profils utilisateurs (extension de auth.users)
CREATE TABLE nuxy.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'teacher')),
  avatar_url TEXT,
  is_approved BOOLEAN DEFAULT false,  -- Les enseignants doivent être approuvés
  approval_token UUID DEFAULT NULL,    -- Token pour le lien d'approbation par email
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour recherche par email
CREATE INDEX idx_profiles_email ON nuxy.profiles(email);
CREATE INDEX idx_profiles_role ON nuxy.profiles(role);
CREATE INDEX idx_profiles_approval_token ON nuxy.profiles(approval_token) WHERE approval_token IS NOT NULL;

COMMENT ON TABLE nuxy.profiles IS 'Profils utilisateurs Nuxy avec rôle (étudiant/enseignant)';
COMMENT ON COLUMN nuxy.profiles.role IS 'Rôle: student (élève) ou teacher (enseignant)';
COMMENT ON COLUMN nuxy.profiles.is_approved IS 'Les étudiants sont auto-approuvés, les enseignants doivent être validés';
COMMENT ON COLUMN nuxy.profiles.approval_token IS 'Token UUID pour le lien d''approbation envoyé par email';

-- 1.2 Classes/Cours
CREATE TABLE nuxy.classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  teacher_id UUID REFERENCES nuxy.profiles(id) ON DELETE CASCADE NOT NULL,
  invite_code TEXT UNIQUE NOT NULL DEFAULT substr(md5(random()::text), 1, 8),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index pour recherche par code d'invitation
CREATE INDEX idx_classes_invite_code ON nuxy.classes(invite_code);
CREATE INDEX idx_classes_teacher_id ON nuxy.classes(teacher_id);

COMMENT ON TABLE nuxy.classes IS 'Classes Nuxy gérées par les enseignants';
COMMENT ON COLUMN nuxy.classes.invite_code IS 'Code unique de 8 caractères pour rejoindre la classe';

-- 1.3 Membres des classes (relation élève-classe)
CREATE TABLE nuxy.class_members (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  class_id UUID REFERENCES nuxy.classes(id) ON DELETE CASCADE NOT NULL,
  student_id UUID REFERENCES nuxy.profiles(id) ON DELETE CASCADE NOT NULL,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(class_id, student_id)
);

-- Index pour recherches fréquentes
CREATE INDEX idx_class_members_class_id ON nuxy.class_members(class_id);
CREATE INDEX idx_class_members_student_id ON nuxy.class_members(student_id);

COMMENT ON TABLE nuxy.class_members IS 'Relation many-to-many entre élèves et classes Nuxy';

-- 1.4 Progression des exercices
CREATE TABLE nuxy.exercise_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES nuxy.profiles(id) ON DELETE CASCADE NOT NULL,
  exercise_slug TEXT NOT NULL,
  status TEXT DEFAULT 'not-started' CHECK (status IN ('not-started', 'in-progress', 'completed')),
  attempts INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ,
  last_attempt_at TIMESTAMPTZ,
  saved_code TEXT,
  last_code_save_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, exercise_slug)
);

-- Index pour recherches fréquentes
CREATE INDEX idx_exercise_progress_user_id ON nuxy.exercise_progress(user_id);
CREATE INDEX idx_exercise_progress_slug ON nuxy.exercise_progress(exercise_slug);
CREATE INDEX idx_exercise_progress_status ON nuxy.exercise_progress(status);

COMMENT ON TABLE nuxy.exercise_progress IS 'Progression des élèves sur les exercices Nuxy';
COMMENT ON COLUMN nuxy.exercise_progress.saved_code IS 'Code sauvegardé par l''élève pour reprendre plus tard';

-- -----------------------------------------------------------------------------
-- 2. ROW LEVEL SECURITY (RLS)
-- -----------------------------------------------------------------------------

-- 2.1 Profiles: lecture publique, modification de son propre profil
ALTER TABLE nuxy.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_all" ON nuxy.profiles
  FOR SELECT USING (true);

CREATE POLICY "profiles_update_own" ON nuxy.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "profiles_insert_own" ON nuxy.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- 2.2 Classes: enseignants peuvent tout gérer, élèves peuvent lire leurs classes
ALTER TABLE nuxy.classes ENABLE ROW LEVEL SECURITY;

-- Les enseignants peuvent gérer leurs propres classes
CREATE POLICY "classes_all_teacher" ON nuxy.classes
  FOR ALL USING (auth.uid() = teacher_id);

-- Les élèves peuvent voir les classes auxquelles ils appartiennent
CREATE POLICY "classes_select_members" ON nuxy.classes
  FOR SELECT USING (
    id IN (
      SELECT class_id FROM nuxy.class_members
      WHERE student_id = auth.uid()
    )
  );

-- Tout le monde peut voir les classes actives (pour le join via invite_code)
CREATE POLICY "classes_select_by_invite" ON nuxy.classes
  FOR SELECT USING (is_active = true);

-- 2.3 Class members: enseignants gèrent, élèves voient/rejoignent
ALTER TABLE nuxy.class_members ENABLE ROW LEVEL SECURITY;

-- Les enseignants peuvent gérer les membres de leurs classes
CREATE POLICY "class_members_all_teacher" ON nuxy.class_members
  FOR ALL USING (
    class_id IN (
      SELECT id FROM nuxy.classes
      WHERE teacher_id = auth.uid()
    )
  );

-- Les élèves peuvent voir leurs propres adhésions
CREATE POLICY "class_members_select_own" ON nuxy.class_members
  FOR SELECT USING (student_id = auth.uid());

-- Les élèves peuvent rejoindre une classe (INSERT)
CREATE POLICY "class_members_insert_student" ON nuxy.class_members
  FOR INSERT WITH CHECK (student_id = auth.uid());

-- Les élèves peuvent quitter une classe (DELETE)
CREATE POLICY "class_members_delete_own" ON nuxy.class_members
  FOR DELETE USING (student_id = auth.uid());

-- 2.4 Exercise progress: utilisateurs gèrent leur propre progression, enseignants lisent celle de leurs élèves
ALTER TABLE nuxy.exercise_progress ENABLE ROW LEVEL SECURITY;

-- Les utilisateurs peuvent gérer leur propre progression
CREATE POLICY "exercise_progress_all_own" ON nuxy.exercise_progress
  FOR ALL USING (auth.uid() = user_id);

-- Les enseignants peuvent voir la progression des élèves de leurs classes
CREATE POLICY "exercise_progress_select_teacher" ON nuxy.exercise_progress
  FOR SELECT USING (
    user_id IN (
      SELECT cm.student_id
      FROM nuxy.class_members cm
      JOIN nuxy.classes c ON cm.class_id = c.id
      WHERE c.teacher_id = auth.uid()
    )
  );

-- -----------------------------------------------------------------------------
-- 3. FONCTIONS ET TRIGGERS
-- -----------------------------------------------------------------------------

-- 3.1 Auto-create profile on user signup (avec gestion approbation enseignants)
CREATE OR REPLACE FUNCTION nuxy.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_role TEXT;
  user_approved BOOLEAN;
  user_token UUID;
BEGIN
  -- Récupérer le rôle demandé (par défaut: student)
  user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'student');

  -- Les étudiants sont automatiquement approuvés
  -- Les enseignants doivent être validés manuellement
  IF user_role = 'teacher' THEN
    user_approved := false;
    user_token := gen_random_uuid();  -- Token pour le lien d'approbation
  ELSE
    user_approved := true;
    user_token := NULL;
  END IF;

  INSERT INTO nuxy.profiles (id, email, full_name, role, is_approved, approval_token)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    user_role,
    user_approved,
    user_token
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer automatiquement un profil Nuxy à l'inscription
-- Note: Un seul trigger suffit (pas de doublon)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION nuxy.handle_new_user();

-- 3.1b Notification admin quand un enseignant s'inscrit
-- Appelle l'Edge Function notify-teacher-signup via pg_net
CREATE OR REPLACE FUNCTION nuxy.notify_teacher_signup()
RETURNS TRIGGER AS $$
DECLARE
  supabase_url TEXT;
BEGIN
  -- Seulement pour les nouveaux enseignants non approuvés
  IF NEW.role = 'teacher' AND NEW.is_approved = false AND NEW.approval_token IS NOT NULL THEN

    -- URL du projet Supabase
    supabase_url := 'https://qsayrwlksinxvuugwhtv.supabase.co';

    -- Appeler l'Edge Function via pg_net
    PERFORM net.http_post(
      url := supabase_url || '/functions/v1/notify-teacher-signup',
      headers := jsonb_build_object('Content-Type', 'application/json'),
      body := jsonb_build_object(
        'id', NEW.id,
        'email', NEW.email,
        'full_name', NEW.full_name,
        'approval_token', NEW.approval_token
      )
    );

  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour notifier l'admin
DROP TRIGGER IF EXISTS on_teacher_signup ON nuxy.profiles;
CREATE TRIGGER on_teacher_signup
  AFTER INSERT ON nuxy.profiles
  FOR EACH ROW
  EXECUTE FUNCTION nuxy.notify_teacher_signup();

-- 3.2 Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION nuxy.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at sur chaque table
DROP TRIGGER IF EXISTS update_profiles_updated_at ON nuxy.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON nuxy.profiles
  FOR EACH ROW EXECUTE FUNCTION nuxy.update_updated_at();

DROP TRIGGER IF EXISTS update_classes_updated_at ON nuxy.classes;
CREATE TRIGGER update_classes_updated_at
  BEFORE UPDATE ON nuxy.classes
  FOR EACH ROW EXECUTE FUNCTION nuxy.update_updated_at();

DROP TRIGGER IF EXISTS update_exercise_progress_updated_at ON nuxy.exercise_progress;
CREATE TRIGGER update_exercise_progress_updated_at
  BEFORE UPDATE ON nuxy.exercise_progress
  FOR EACH ROW EXECUTE FUNCTION nuxy.update_updated_at();

-- 3.3 Fonction pour régénérer un code d'invitation
CREATE OR REPLACE FUNCTION nuxy.regenerate_invite_code(class_uuid UUID)
RETURNS TEXT AS $$
DECLARE
  new_code TEXT;
BEGIN
  -- Vérifier que l'utilisateur est bien le teacher de cette classe
  IF NOT EXISTS (
    SELECT 1 FROM nuxy.classes
    WHERE id = class_uuid AND teacher_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Permission denied';
  END IF;

  -- Générer un nouveau code unique
  new_code := substr(md5(random()::text || clock_timestamp()::text), 1, 8);

  -- Mettre à jour la classe
  UPDATE nuxy.classes
  SET invite_code = new_code, updated_at = NOW()
  WHERE id = class_uuid;

  RETURN new_code;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3.4 Fonction pour rejoindre une classe via code d'invitation
CREATE OR REPLACE FUNCTION nuxy.join_class_by_code(code TEXT)
RETURNS UUID AS $$
DECLARE
  class_uuid UUID;
BEGIN
  -- Trouver la classe avec ce code
  SELECT id INTO class_uuid
  FROM nuxy.classes
  WHERE invite_code = code AND is_active = true;

  IF class_uuid IS NULL THEN
    RAISE EXCEPTION 'Code d''invitation invalide ou classe inactive';
  END IF;

  -- Vérifier que l'utilisateur n'est pas déjà membre
  IF EXISTS (
    SELECT 1 FROM nuxy.class_members
    WHERE class_id = class_uuid AND student_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Vous êtes déjà membre de cette classe';
  END IF;

  -- Vérifier que l'utilisateur n'est pas le teacher de la classe
  IF EXISTS (
    SELECT 1 FROM nuxy.classes
    WHERE id = class_uuid AND teacher_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Vous ne pouvez pas rejoindre votre propre classe';
  END IF;

  -- Ajouter l'utilisateur à la classe
  INSERT INTO nuxy.class_members (class_id, student_id)
  VALUES (class_uuid, auth.uid());

  RETURN class_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3.5 Fonction pour obtenir les statistiques d'une classe (pour le dashboard enseignant)
CREATE OR REPLACE FUNCTION nuxy.get_class_statistics(class_uuid UUID)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  -- Vérifier les permissions (teacher de la classe)
  IF NOT EXISTS (
    SELECT 1 FROM nuxy.classes
    WHERE id = class_uuid AND teacher_id = auth.uid()
  ) THEN
    RAISE EXCEPTION 'Permission denied';
  END IF;

  SELECT json_build_object(
    'total_students', (
      SELECT COUNT(*) FROM nuxy.class_members WHERE class_id = class_uuid
    ),
    'exercises_completed', (
      SELECT COUNT(*)
      FROM nuxy.exercise_progress ep
      JOIN nuxy.class_members cm ON ep.user_id = cm.student_id
      WHERE cm.class_id = class_uuid AND ep.status = 'completed'
    ),
    'total_attempts', (
      SELECT COALESCE(SUM(ep.attempts), 0)
      FROM nuxy.exercise_progress ep
      JOIN nuxy.class_members cm ON ep.user_id = cm.student_id
      WHERE cm.class_id = class_uuid
    )
  ) INTO result;

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- -----------------------------------------------------------------------------
-- 4. WRAPPERS DANS LE SCHÉMA PUBLIC
-- -----------------------------------------------------------------------------
-- Ces fonctions permettent d'appeler les RPC sans préfixer le schéma.
-- Elles sont utilisées par le code frontend (useClasses.ts) via supabase.rpc()

-- Wrapper pour join_class_by_code
CREATE OR REPLACE FUNCTION public.join_class_by_code(code TEXT)
RETURNS UUID AS $$
BEGIN
  RETURN nuxy.join_class_by_code(code);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Wrapper pour regenerate_invite_code
CREATE OR REPLACE FUNCTION public.regenerate_invite_code(class_uuid UUID)
RETURNS TEXT AS $$
BEGIN
  RETURN nuxy.regenerate_invite_code(class_uuid);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Wrapper pour get_class_statistics
CREATE OR REPLACE FUNCTION public.get_class_statistics(class_uuid UUID)
RETURNS JSON AS $$
BEGIN
  RETURN nuxy.get_class_statistics(class_uuid);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- -----------------------------------------------------------------------------
-- 5. REALTIME (Supabase Realtime pour le dashboard enseignant)
-- -----------------------------------------------------------------------------

-- Activer Realtime sur exercise_progress pour voir les mises à jour en temps réel
ALTER PUBLICATION supabase_realtime ADD TABLE nuxy.exercise_progress;

-- Activer Realtime sur class_members pour voir les nouveaux élèves
ALTER PUBLICATION supabase_realtime ADD TABLE nuxy.class_members;

-- -----------------------------------------------------------------------------
-- 6. EXPOSITION DU SCHÉMA VIA L'API
-- -----------------------------------------------------------------------------
-- IMPORTANT: Pour que le schéma 'nuxy' soit accessible via l'API REST,
-- il faut l'ajouter dans les paramètres du projet Supabase:
-- Dashboard > Settings > API > Exposed schemas > Ajouter "nuxy"
-- -----------------------------------------------------------------------------

-- =============================================================================
-- FIN DU SCRIPT
-- =============================================================================
-- Configuration requise dans Supabase Dashboard:
-- 1. Settings > API > Exposed schemas : Ajouter "nuxy"
-- 2. Authentication > Settings > Site URL : https://votre-domaine.com
-- 3. Authentication > Settings > Redirect URLs : https://votre-domaine.com/auth/callback
-- 4. Authentication > Email Templates : Personnaliser si nécessaire
-- =============================================================================
