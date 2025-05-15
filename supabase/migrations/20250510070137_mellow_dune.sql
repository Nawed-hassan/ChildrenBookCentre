/*
  # Initial Schema Setup

  1. New Tables
    - `books`
      - `id` (uuid, primary key)
      - `title` (text)
      - `author` (text)
      - `price` (numeric)
      - `cover` (text)
      - `description` (text)
      - `category` (text)
      - `featured` (boolean)
      - `published` (date)
      - `isbn` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `slug` (text, unique)
      - `author` (text)
      - `content` (text)
      - `excerpt` (text)
      - `cover_image` (text)
      - `category` (text)
      - `published_at` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `gallery_images`
      - `id` (uuid, primary key)
      - `title` (text)
      - `image_url` (text)
      - `description` (text)
      - `category` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `subject` (text)
      - `message` (text)
      - `read` (boolean)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create books table
CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  author text NOT NULL,
  price numeric NOT NULL,
  cover text,
  description text,
  category text,
  featured boolean DEFAULT false,
  published date,
  isbn text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  author text NOT NULL,
  content text,
  excerpt text,
  cover_image text,
  category text,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  image_url text NOT NULL,
  description text,
  category text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create contact_messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Create policies for books
CREATE POLICY "Allow public read access" ON books
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to create/update/delete" ON books
  FOR ALL USING (auth.role() = 'authenticated');

-- Create policies for blog_posts
CREATE POLICY "Allow public read access" ON blog_posts
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to create/update/delete" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated');

-- Create policies for gallery_images
CREATE POLICY "Allow public read access" ON gallery_images
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated users to create/update/delete" ON gallery_images
  FOR ALL USING (auth.role() = 'authenticated');

-- Create policies for contact_messages
CREATE POLICY "Allow public to create messages" ON contact_messages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read/update" ON contact_messages
  FOR ALL USING (auth.role() = 'authenticated');