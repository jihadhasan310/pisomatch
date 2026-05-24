-- ============================================
-- PASO 3: CREAR STORAGE BUCKET
-- Ejecutar DESPUÉS de schema.sql
-- ============================================

-- Crear bucket público para imágenes de anuncios
INSERT INTO storage.buckets (id, name, public)
VALUES ('listing-images', 'listing-images', true)
ON CONFLICT (id) DO NOTHING;

-- Borrar políticas existentes si las hay
DROP POLICY IF EXISTS "Users can upload listing images" ON storage.objects;
DROP POLICY IF EXISTS "Public can view listing images" ON storage.objects;
DROP POLICY IF EXISTS "Users can delete own images" ON storage.objects;

-- Permitir upload a usuarios autenticados
CREATE POLICY "Users can upload listing images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'listing-images');

-- Permitir lectura pública
CREATE POLICY "Public can view listing images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'listing-images');

-- Permitir borrado de imágenes propias
CREATE POLICY "Users can delete own images"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'listing-images' AND (storage.foldername(name))[1] = auth.uid()::text);
