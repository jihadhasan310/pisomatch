-- ============================================
-- PASO 1: RESET COMPLETO
-- Ejecutar PRIMERO en SQL Editor de Supabase
-- ============================================

-- Borrar políticas RLS
DROP POLICY IF EXISTS "Users can view all profiles" ON public.users;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
DROP POLICY IF EXISTS "Anyone can view listings" ON public.listings;
DROP POLICY IF EXISTS "Users can insert their own listings" ON public.listings;
DROP POLICY IF EXISTS "Users can update their own listings" ON public.listings;
DROP POLICY IF EXISTS "Users can delete their own listings" ON public.listings;
DROP POLICY IF EXISTS "Public can view listings for SEO" ON public.listings;
DROP POLICY IF EXISTS "Users can view their own matches" ON public.matches;
DROP POLICY IF EXISTS "Users can insert their own matches" ON public.matches;
DROP POLICY IF EXISTS "Users can view their own contacts" ON public.contacts;
DROP POLICY IF EXISTS "Users can insert their own contacts" ON public.contacts;

-- Borrar tablas
DROP TABLE IF EXISTS public.contacts CASCADE;
DROP TABLE IF EXISTS public.matches CASCADE;
DROP TABLE IF EXISTS public.listings CASCADE;
DROP TABLE IF EXISTS public.users CASCADE;

-- Borrar usuarios de auth
DELETE FROM auth.users;
