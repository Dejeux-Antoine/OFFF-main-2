/*
  # OFFF Festival 2026 Database Schema

  ## Overview
  Complete database schema for the OFFF Festival digital companion app, supporting:
  - Event management and scheduling
  - Artist and booth profiles
  - User digital badges and journey tracking
  - Interactive map locations
  - Social content and community features
  - Ticketing and marketplace
  - Audio tours and podcast content
  - Gamification and AR experiences

  ## New Tables

  ### `artists`
  Core artist/speaker profiles with multimedia content
  - `id` (uuid, primary key)
  - `name` (text) - Artist/speaker name
  - `bio` (text) - Biography
  - `bio_translations` (jsonb) - Multilingual bio {es: "", fr: "", zh: ""}
  - `image_url` (text) - Profile image
  - `video_url` (text) - Preview/showreel video
  - `website` (text) - Personal website
  - `social_links` (jsonb) - Social media links
  - `tags` (text[]) - Categories/specializations
  - `created_at` (timestamptz)

  ### `event_sessions`
  Individual sessions, talks, workshops
  - `id` (uuid, primary key)
  - `title` (text)
  - `title_translations` (jsonb)
  - `description` (text)
  - `description_translations` (jsonb)
  - `session_type` (text) - talk, workshop, performance, panel
  - `start_time` (timestamptz)
  - `end_time` (timestamptz)
  - `location_id` (uuid) - FK to locations
  - `capacity` (integer)
  - `is_live_streamed` (boolean)
  - `stream_url` (text)
  - `replay_url` (text)
  - `tags` (text[])
  - `created_at` (timestamptz)

  ### `session_artists`
  Many-to-many relationship between sessions and artists
  - `id` (uuid, primary key)
  - `session_id` (uuid) - FK to event_sessions
  - `artist_id` (uuid) - FK to artists
  - `role` (text) - speaker, performer, moderator, etc.
  - `created_at` (timestamptz)

  ### `locations`
  Physical and virtual festival locations
  - `id` (uuid, primary key)
  - `name` (text)
  - `name_translations` (jsonb)
  - `type` (text) - stage, workshop_space, art_installation, booth, food_court
  - `description` (text)
  - `description_translations` (jsonb)
  - `coordinates` (jsonb) - {lat: number, lng: number} for map
  - `floor_level` (integer)
  - `capacity` (integer)
  - `amenities` (text[])
  - `image_url` (text)
  - `qr_code` (text)
  - `created_at` (timestamptz)

  ### `booths`
  Exhibitor booths and brand spaces
  - `id` (uuid, primary key)
  - `name` (text)
  - `name_translations` (jsonb)
  - `description` (text)
  - `description_translations` (jsonb)
  - `logo_url` (text)
  - `location_id` (uuid) - FK to locations
  - `website` (text)
  - `contact_email` (text)
  - `offerings` (text[]) - Products/services showcased
  - `media_gallery` (jsonb[]) - Array of {type: "image"|"video", url: ""}
  - `created_at` (timestamptz)

  ### `audio_content`
  Audio tours, podcasts, and guided content
  - `id` (uuid, primary key)
  - `title` (text)
  - `title_translations` (jsonb)
  - `description` (text)
  - `description_translations` (jsonb)
  - `audio_url` (text)
  - `audio_urls_multilang` (jsonb) - {en: "", es: "", fr: "", zh: ""}
  - `duration_seconds` (integer)
  - `content_type` (text) - tour, podcast, interview, behind_scenes
  - `related_location_id` (uuid) - Optional FK to locations
  - `related_artist_id` (uuid) - Optional FK to artists
  - `qr_trigger` (text) - QR code that unlocks this content
  - `thumbnail_url` (text)
  - `created_at` (timestamptz)

  ### `user_badges`
  Digital passport tracking user journey
  - `id` (uuid, primary key)
  - `user_id` (uuid) - FK to auth.users
  - `display_name` (text)
  - `avatar_url` (text)
  - `collected_sessions` (uuid[]) - Array of session IDs attended
  - `collected_locations` (uuid[]) - Array of location IDs visited
  - `collected_artworks` (uuid[]) - Array of artwork IDs scanned
  - `achievements` (jsonb[]) - Array of {id, name, icon, unlocked_at}
  - `points` (integer) - Gamification points
  - `level` (integer) - User level based on engagement
  - `qr_scans` (integer)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### `user_schedule`
  Personal event schedule with reminders
  - `id` (uuid, primary key)
  - `user_id` (uuid) - FK to auth.users
  - `session_id` (uuid) - FK to event_sessions
  - `reminder_enabled` (boolean)
  - `reminder_minutes_before` (integer)
  - `notes` (text)
  - `created_at` (timestamptz)

  ### `social_content`
  User-generated content and community posts
  - `id` (uuid, primary key)
  - `user_id` (uuid) - FK to auth.users
  - `content_type` (text) - photo, video, artwork, story
  - `media_url` (text)
  - `caption` (text)
  - `hashtags` (text[])
  - `related_session_id` (uuid) - Optional FK
  - `related_location_id` (uuid) - Optional FK
  - `likes_count` (integer)
  - `is_featured` (boolean)
  - `is_approved` (boolean)
  - `created_at` (timestamptz)

  ### `marketplace_items`
  Digital storefront for merchandise and content
  - `id` (uuid, primary key)
  - `title` (text)
  - `title_translations` (jsonb)
  - `description` (text)
  - `description_translations` (jsonb)
  - `item_type` (text) - merchandise, masterclass, workshop, artwork, digital_content
  - `price_eur` (numeric)
  - `currency` (text)
  - `image_urls` (text[])
  - `stock_quantity` (integer)
  - `is_available` (boolean)
  - `artist_id` (uuid) - Optional FK to artists
  - `created_at` (timestamptz)

  ### `tickets`
  Event ticketing system
  - `id` (uuid, primary key)
  - `ticket_type` (text) - day_pass, full_festival, vip, student, workshop
  - `title` (text)
  - `title_translations` (jsonb)
  - `description` (text)
  - `description_translations` (jsonb)
  - `price_eur` (numeric)
  - `currency` (text)
  - `benefits` (text[])
  - `total_quantity` (integer)
  - `sold_quantity` (integer)
  - `is_available` (boolean)
  - `valid_from` (timestamptz)
  - `valid_until` (timestamptz)
  - `created_at` (timestamptz)

  ### `user_tickets`
  User ticket purchases
  - `id` (uuid, primary key)
  - `user_id` (uuid) - FK to auth.users
  - `ticket_id` (uuid) - FK to tickets
  - `purchase_date` (timestamptz)
  - `qr_code` (text) - Unique QR for entry
  - `is_used` (boolean)
  - `used_at` (timestamptz)
  - `order_id` (text)
  - `amount_paid` (numeric)

  ### `ar_treasures`
  AR gamification elements
  - `id` (uuid, primary key)
  - `name` (text)
  - `name_translations` (jsonb)
  - `description` (text)
  - `description_translations` (jsonb)
  - `location_id` (uuid) - FK to locations
  - `ar_marker_id` (text)
  - `reward_points` (integer)
  - `reward_badge` (jsonb) - Achievement unlocked
  - `media_url` (text)
  - `is_active` (boolean)
  - `created_at` (timestamptz)

  ### `user_ar_finds`
  Track user AR treasure discoveries
  - `id` (uuid, primary key)
  - `user_id` (uuid) - FK to auth.users
  - `treasure_id` (uuid) - FK to ar_treasures
  - `found_at` (timestamptz)
  - `location_coords` (jsonb)

  ## Security
  All tables have RLS enabled with appropriate policies for:
  - Public read access for festival content
  - Authenticated user access for personal data
  - User-owned data restrictions
*/

-- Artists table
CREATE TABLE IF NOT EXISTS artists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  bio text,
  bio_translations jsonb DEFAULT '{}'::jsonb,
  image_url text,
  video_url text,
  website text,
  social_links jsonb DEFAULT '{}'::jsonb,
  tags text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now()
);

ALTER TABLE artists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view artists"
  ON artists FOR SELECT
  TO public
  USING (true);

-- Event sessions table
CREATE TABLE IF NOT EXISTS event_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  title_translations jsonb DEFAULT '{}'::jsonb,
  description text,
  description_translations jsonb DEFAULT '{}'::jsonb,
  session_type text NOT NULL DEFAULT 'talk',
  start_time timestamptz NOT NULL,
  end_time timestamptz NOT NULL,
  location_id uuid,
  capacity integer DEFAULT 0,
  is_live_streamed boolean DEFAULT false,
  stream_url text,
  replay_url text,
  tags text[] DEFAULT ARRAY[]::text[],
  created_at timestamptz DEFAULT now()
);

ALTER TABLE event_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view event sessions"
  ON event_sessions FOR SELECT
  TO public
  USING (true);

-- Locations table
CREATE TABLE IF NOT EXISTS locations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_translations jsonb DEFAULT '{}'::jsonb,
  type text NOT NULL DEFAULT 'stage',
  description text,
  description_translations jsonb DEFAULT '{}'::jsonb,
  coordinates jsonb DEFAULT '{}'::jsonb,
  floor_level integer DEFAULT 0,
  capacity integer DEFAULT 0,
  amenities text[] DEFAULT ARRAY[]::text[],
  image_url text,
  qr_code text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE locations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view locations"
  ON locations FOR SELECT
  TO public
  USING (true);

-- Add foreign key for event_sessions -> locations
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'event_sessions_location_id_fkey'
  ) THEN
    ALTER TABLE event_sessions
    ADD CONSTRAINT event_sessions_location_id_fkey
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Session artists junction table
CREATE TABLE IF NOT EXISTS session_artists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id uuid NOT NULL REFERENCES event_sessions(id) ON DELETE CASCADE,
  artist_id uuid NOT NULL REFERENCES artists(id) ON DELETE CASCADE,
  role text DEFAULT 'speaker',
  created_at timestamptz DEFAULT now(),
  UNIQUE(session_id, artist_id)
);

ALTER TABLE session_artists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view session artists"
  ON session_artists FOR SELECT
  TO public
  USING (true);

-- Booths table
CREATE TABLE IF NOT EXISTS booths (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_translations jsonb DEFAULT '{}'::jsonb,
  description text,
  description_translations jsonb DEFAULT '{}'::jsonb,
  logo_url text,
  location_id uuid REFERENCES locations(id) ON DELETE SET NULL,
  website text,
  contact_email text,
  offerings text[] DEFAULT ARRAY[]::text[],
  media_gallery jsonb[] DEFAULT ARRAY[]::jsonb[],
  created_at timestamptz DEFAULT now()
);

ALTER TABLE booths ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view booths"
  ON booths FOR SELECT
  TO public
  USING (true);

-- Audio content table
CREATE TABLE IF NOT EXISTS audio_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  title_translations jsonb DEFAULT '{}'::jsonb,
  description text,
  description_translations jsonb DEFAULT '{}'::jsonb,
  audio_url text NOT NULL,
  audio_urls_multilang jsonb DEFAULT '{}'::jsonb,
  duration_seconds integer DEFAULT 0,
  content_type text NOT NULL DEFAULT 'tour',
  related_location_id uuid REFERENCES locations(id) ON DELETE SET NULL,
  related_artist_id uuid REFERENCES artists(id) ON DELETE SET NULL,
  qr_trigger text,
  thumbnail_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE audio_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view audio content"
  ON audio_content FOR SELECT
  TO public
  USING (true);

-- User badges table
CREATE TABLE IF NOT EXISTS user_badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  avatar_url text,
  collected_sessions uuid[] DEFAULT ARRAY[]::uuid[],
  collected_locations uuid[] DEFAULT ARRAY[]::uuid[],
  collected_artworks uuid[] DEFAULT ARRAY[]::uuid[],
  achievements jsonb[] DEFAULT ARRAY[]::jsonb[],
  points integer DEFAULT 0,
  level integer DEFAULT 1,
  qr_scans integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own badge"
  ON user_badges FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own badge"
  ON user_badges FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own badge"
  ON user_badges FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- User schedule table
CREATE TABLE IF NOT EXISTS user_schedule (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  session_id uuid NOT NULL REFERENCES event_sessions(id) ON DELETE CASCADE,
  reminder_enabled boolean DEFAULT true,
  reminder_minutes_before integer DEFAULT 15,
  notes text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, session_id)
);

ALTER TABLE user_schedule ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own schedule"
  ON user_schedule FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own schedule"
  ON user_schedule FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own schedule"
  ON user_schedule FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own schedule"
  ON user_schedule FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Social content table
CREATE TABLE IF NOT EXISTS social_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type text NOT NULL DEFAULT 'photo',
  media_url text NOT NULL,
  caption text,
  hashtags text[] DEFAULT ARRAY[]::text[],
  related_session_id uuid REFERENCES event_sessions(id) ON DELETE SET NULL,
  related_location_id uuid REFERENCES locations(id) ON DELETE SET NULL,
  likes_count integer DEFAULT 0,
  is_featured boolean DEFAULT false,
  is_approved boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE social_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view approved social content"
  ON social_content FOR SELECT
  TO public
  USING (is_approved = true);

CREATE POLICY "Users can view own social content"
  ON social_content FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own social content"
  ON social_content FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own social content"
  ON social_content FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Marketplace items table
CREATE TABLE IF NOT EXISTS marketplace_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  title_translations jsonb DEFAULT '{}'::jsonb,
  description text,
  description_translations jsonb DEFAULT '{}'::jsonb,
  item_type text NOT NULL DEFAULT 'merchandise',
  price_eur numeric NOT NULL DEFAULT 0,
  currency text DEFAULT 'EUR',
  image_urls text[] DEFAULT ARRAY[]::text[],
  stock_quantity integer DEFAULT 0,
  is_available boolean DEFAULT true,
  artist_id uuid REFERENCES artists(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE marketplace_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available marketplace items"
  ON marketplace_items FOR SELECT
  TO public
  USING (is_available = true);

-- Tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_type text NOT NULL,
  title text NOT NULL,
  title_translations jsonb DEFAULT '{}'::jsonb,
  description text,
  description_translations jsonb DEFAULT '{}'::jsonb,
  price_eur numeric NOT NULL DEFAULT 0,
  currency text DEFAULT 'EUR',
  benefits text[] DEFAULT ARRAY[]::text[],
  total_quantity integer DEFAULT 0,
  sold_quantity integer DEFAULT 0,
  is_available boolean DEFAULT true,
  valid_from timestamptz,
  valid_until timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view available tickets"
  ON tickets FOR SELECT
  TO public
  USING (is_available = true);

-- User tickets table
CREATE TABLE IF NOT EXISTS user_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  ticket_id uuid NOT NULL REFERENCES tickets(id) ON DELETE CASCADE,
  purchase_date timestamptz DEFAULT now(),
  qr_code text NOT NULL,
  is_used boolean DEFAULT false,
  used_at timestamptz,
  order_id text,
  amount_paid numeric NOT NULL DEFAULT 0
);

ALTER TABLE user_tickets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tickets"
  ON user_tickets FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- AR treasures table
CREATE TABLE IF NOT EXISTS ar_treasures (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_translations jsonb DEFAULT '{}'::jsonb,
  description text,
  description_translations jsonb DEFAULT '{}'::jsonb,
  location_id uuid REFERENCES locations(id) ON DELETE SET NULL,
  ar_marker_id text NOT NULL,
  reward_points integer DEFAULT 10,
  reward_badge jsonb,
  media_url text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE ar_treasures ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active AR treasures"
  ON ar_treasures FOR SELECT
  TO public
  USING (is_active = true);

-- User AR finds table
CREATE TABLE IF NOT EXISTS user_ar_finds (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  treasure_id uuid NOT NULL REFERENCES ar_treasures(id) ON DELETE CASCADE,
  found_at timestamptz DEFAULT now(),
  location_coords jsonb,
  UNIQUE(user_id, treasure_id)
);

ALTER TABLE user_ar_finds ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own AR finds"
  ON user_ar_finds FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own AR finds"
  ON user_ar_finds FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_event_sessions_start_time ON event_sessions(start_time);
CREATE INDEX IF NOT EXISTS idx_event_sessions_location ON event_sessions(location_id);
CREATE INDEX IF NOT EXISTS idx_session_artists_session ON session_artists(session_id);
CREATE INDEX IF NOT EXISTS idx_session_artists_artist ON session_artists(artist_id);
CREATE INDEX IF NOT EXISTS idx_user_schedule_user ON user_schedule(user_id);
CREATE INDEX IF NOT EXISTS idx_user_schedule_session ON user_schedule(session_id);
CREATE INDEX IF NOT EXISTS idx_social_content_approved ON social_content(is_approved, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_badges_user ON user_badges(user_id);