-- ============================================
-- PASO 2: CREAR SCHEMA COMPLETO
-- Ejecutar DESPUÉS de reset.sql
-- ============================================

-- ==================
-- TABLA: users
-- ==================
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT NOT NULL DEFAULT '',
  age INTEGER DEFAULT 25,
  city TEXT NOT NULL DEFAULT 'Madrid',
  occupation TEXT DEFAULT '',
  description TEXT DEFAULT '',

  -- Presupuesto
  budget_min INTEGER NOT NULL DEFAULT 300,
  budget_max INTEGER NOT NULL DEFAULT 600,
  move_in_date TEXT DEFAULT '',
  min_stay_months INTEGER DEFAULT 6,

  -- Estilo de vida
  lifestyle TEXT NOT NULL DEFAULT 'social' CHECK (lifestyle IN ('quiet', 'social', 'party')),
  clean_level TEXT DEFAULT 'normal' CHECK (clean_level IN ('relaxed', 'normal', 'strict')),
  sleep_schedule TEXT DEFAULT 'normal' CHECK (sleep_schedule IN ('early', 'normal', 'late')),

  -- Preferencias de convivencia
  smoking BOOLEAN NOT NULL DEFAULT false,
  pets BOOLEAN NOT NULL DEFAULT false,
  work_from_home BOOLEAN DEFAULT false,
  guests_ok BOOLEAN DEFAULT true,
  couples_ok BOOLEAN DEFAULT true,
  shared_meals BOOLEAN DEFAULT false,
  music_ok BOOLEAN DEFAULT true,
  lgbtq_friendly BOOLEAN DEFAULT true,
  vegan_vegetarian BOOLEAN DEFAULT false,

  -- Compañero ideal
  gender_pref TEXT DEFAULT 'any' CHECK (gender_pref IN ('any', 'male', 'female')),
  age_min INTEGER DEFAULT 18,
  age_max INTEGER DEFAULT 99,

  -- Sistema
  premium BOOLEAN NOT NULL DEFAULT false,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================
-- TABLA: listings
-- ==================
CREATE TABLE public.listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('ofrezco', 'busco')),
  city TEXT NOT NULL,
  price INTEGER NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  images TEXT[] DEFAULT '{}',
  preferences TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================
-- TABLA: matches
-- ==================
CREATE TABLE public.matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  target_user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  score INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, target_user_id)
);

-- ==================
-- TABLA: contacts
-- ==================
CREATE TABLE public.contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  target_user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  method TEXT NOT NULL DEFAULT 'view',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==================
-- ÍNDICES
-- ==================
CREATE INDEX idx_listings_user_id ON public.listings(user_id);
CREATE INDEX idx_listings_city ON public.listings(city);
CREATE INDEX idx_listings_type ON public.listings(type);
CREATE INDEX idx_matches_user_id ON public.matches(user_id);
CREATE INDEX idx_contacts_user_id ON public.contacts(user_id);
CREATE INDEX idx_users_city ON public.users(city);
CREATE INDEX idx_users_premium ON public.users(premium);
CREATE INDEX idx_users_lifestyle ON public.users(lifestyle);

-- ==================
-- ROW LEVEL SECURITY
-- ==================
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Users
CREATE POLICY "Users can view all profiles"
  ON public.users FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.users FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.users FOR UPDATE TO authenticated
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Listings
CREATE POLICY "Anyone can view listings"
  ON public.listings FOR SELECT TO authenticated USING (true);

CREATE POLICY "Public can view listings for SEO"
  ON public.listings FOR SELECT TO anon USING (true);

CREATE POLICY "Users can insert their own listings"
  ON public.listings FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own listings"
  ON public.listings FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own listings"
  ON public.listings FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Matches
CREATE POLICY "Users can view their own matches"
  ON public.matches FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own matches"
  ON public.matches FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- Contacts
CREATE POLICY "Users can view their own contacts"
  ON public.contacts FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own contacts"
  ON public.contacts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
