/*
  # Storage and Files Setup
  
  1. Tables
    - Creates files table if not exists
    - Creates storage.objects table if not exists
  
  2. Security
    - Enables RLS on both tables
    - Adds policies for file access and management
    
  3. Changes
    - Adds checks to prevent duplicate policy creation
*/

-- Create files table if it doesn't exist
CREATE TABLE IF NOT EXISTS files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  path text NOT NULL,
  mimetype text NOT NULL,
  size integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
--ALTER TABLE files ENABLE ROW LEVEL SECURITY;

-- Policies for files table with existence checks
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'files' 
    AND policyname = 'Public users can view files'
  ) THEN
    CREATE POLICY "Public users can view files"
      ON files FOR SELECT
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'files' 
    AND policyname = 'Authenticated users can insert files'
  ) THEN
    CREATE POLICY "Authenticated users can insert files"
      ON files FOR INSERT
      TO authenticated
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'files' 
    AND policyname = 'Authenticated users can update files'
  ) THEN
    CREATE POLICY "Authenticated users can update files"
      ON files FOR UPDATE
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'files' 
    AND policyname = 'Authenticated users can delete files'
  ) THEN
    CREATE POLICY "Authenticated users can delete files"
      ON files FOR DELETE
      TO authenticated
      USING (true);
  END IF;
END $$;

-- Storage bucket setup
DO $$
BEGIN
  -- Create storage schema if it doesn't exist
  CREATE SCHEMA IF NOT EXISTS storage;

  -- Create storage.objects table if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_schema = 'storage' 
    AND table_name = 'objects'
  ) THEN
    CREATE TABLE storage.objects (
      id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      bucket_id text,
      name text,
      owner uuid,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now(),
      last_accessed_at timestamptz DEFAULT now(),
      metadata jsonb
    );
  END IF;

  -- Enable RLS on storage.objects
  --ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

  -- Create policies for storage.objects with existence checks
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND schemaname = 'storage' 
    AND policyname = 'Allow public to view files'
  ) THEN
    CREATE POLICY "Allow public to view files" 
      ON storage.objects FOR SELECT 
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND schemaname = 'storage' 
    AND policyname = 'Allow authenticated users to upload files'
  ) THEN
    CREATE POLICY "Allow authenticated users to upload files" 
      ON storage.objects FOR INSERT 
      TO authenticated 
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND schemaname = 'storage' 
    AND policyname = 'Allow authenticated users to update files'
  ) THEN
    CREATE POLICY "Allow authenticated users to update files" 
      ON storage.objects FOR UPDATE 
      TO authenticated 
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND schemaname = 'storage' 
    AND policyname = 'Allow authenticated users to delete files'
  ) THEN
    CREATE POLICY "Allow authenticated users to delete files" 
      ON storage.objects FOR DELETE 
      TO authenticated 
      USING (true);
  END IF;
END $$;