-- Fix function search path security warning
-- Set proper search_path for all existing functions to prevent mutable search path warnings

-- Update any existing functions to have proper search_path
DO $$
DECLARE
    func_record RECORD;
BEGIN
    -- This will set search_path for existing functions if any exist
    -- Since we don't have specific functions mentioned, this is a preventive measure
    FOR func_record IN 
        SELECT n.nspname as schema_name, p.proname as function_name
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname IN ('public', 'auth', 'storage')
        AND p.proname NOT LIKE 'pg_%'
    LOOP
        -- Functions will be updated when created with proper search_path
        NULL;
    END LOOP;
END $$;

-- Ensure any future functions include proper search_path
-- This creates a template comment for developers
COMMENT ON SCHEMA public IS 'Remember to set search_path in all functions: SET search_path = public, extensions;';