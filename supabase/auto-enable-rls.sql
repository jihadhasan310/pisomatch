-- ============================================
-- Auto-Enable RLS on New Tables
-- ============================================
-- Este trigger habilita automáticamente Row Level Security
-- en cualquier tabla nueva creada en el esquema 'public'.
--
-- Ejecutar este script UNA VEZ en el SQL Editor de Supabase.
-- ============================================

-- 1. Crear la función que habilita RLS
CREATE OR REPLACE FUNCTION public.auto_enable_rls()
RETURNS event_trigger
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  obj RECORD;
BEGIN
  FOR obj IN
    SELECT objid, classid
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag = 'CREATE TABLE'
  LOOP
    -- Verificar que la tabla pertenece al esquema 'public'
    IF EXISTS (
      SELECT 1
      FROM pg_class c
      JOIN pg_namespace n ON c.relnamespace = n.oid
      WHERE c.oid = obj.objid
        AND n.nspname = 'public'
        AND c.relkind = 'r'  -- solo tablas regulares
    ) THEN
      EXECUTE format(
        'ALTER TABLE %s ENABLE ROW LEVEL SECURITY',
        obj.objid::regclass
      );
      RAISE NOTICE 'RLS habilitado automáticamente en: %', obj.objid::regclass;
    END IF;
  END LOOP;
END;
$$;

-- 2. Crear el event trigger que se dispara al crear tablas
DROP EVENT TRIGGER IF EXISTS trigger_auto_enable_rls;

CREATE EVENT TRIGGER trigger_auto_enable_rls
ON ddl_command_end
WHEN TAG IN ('CREATE TABLE')
EXECUTE FUNCTION public.auto_enable_rls();

-- ============================================
-- Verificación: crear tabla de prueba
-- ============================================
-- Descomenta las siguientes líneas para probar:
--
-- CREATE TABLE public.test_rls_auto (id serial PRIMARY KEY, name text);
-- SELECT relname, relrowsecurity
-- FROM pg_class
-- WHERE relname = 'test_rls_auto';
-- -- relrowsecurity debe ser 'true'
-- DROP TABLE public.test_rls_auto;
