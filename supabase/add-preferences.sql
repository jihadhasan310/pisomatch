-- ============================================
-- Añadir campos de preferencias extra a users
-- Ejecutar en SQL Editor de Supabase
-- ============================================

ALTER TABLE public.users ADD COLUMN IF NOT EXISTS clean_level TEXT DEFAULT 'normal' CHECK (clean_level IN ('relaxed', 'normal', 'strict'));
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS sleep_schedule TEXT DEFAULT 'normal' CHECK (sleep_schedule IN ('early', 'normal', 'late'));
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS work_from_home BOOLEAN DEFAULT false;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS guests_ok BOOLEAN DEFAULT true;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS couples_ok BOOLEAN DEFAULT true;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS gender_pref TEXT DEFAULT 'any' CHECK (gender_pref IN ('any', 'male', 'female'));
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS age_min INTEGER DEFAULT 18;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS age_max INTEGER DEFAULT 99;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS age INTEGER DEFAULT 25;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS occupation TEXT DEFAULT '';
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS move_in_date TEXT DEFAULT '';
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS min_stay_months INTEGER DEFAULT 6;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS shared_meals BOOLEAN DEFAULT false;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS music_ok BOOLEAN DEFAULT true;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS lgbtq_friendly BOOLEAN DEFAULT true;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS vegan_vegetarian BOOLEAN DEFAULT false;
