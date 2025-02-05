/*
  # Email Campaign System Tables

  1. New Tables
    - `campaigns`
      - `id` (uuid, primary key)
      - `name` (text)
      - `html_content` (text)
      - `subject` (text)
      - `created_at` (timestamp)
      - `sent_at` (timestamp)
      - `status` (text)
    
    - `recipients`
      - `id` (uuid, primary key) 
      - `email` (text)
      - `name` (text)
      - `department` (text)
      - `created_at` (timestamp)

    - `email_events`
      - `id` (uuid, primary key)
      - `campaign_id` (uuid, foreign key)
      - `recipient_id` (uuid, foreign key)
      - `event_type` (text) - 'sent', 'opened', 'clicked'
      - `link_clicked` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Campaigns table
CREATE TABLE IF NOT EXISTS campaigns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  html_content text NOT NULL,
  subject text NOT NULL,
  created_at timestamptz DEFAULT now(),
  sent_at timestamptz,
  status text DEFAULT 'draft'
);

ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow full access to authenticated users"
  ON campaigns
  FOR ALL
  TO authenticated
  USING (true);

-- Recipients table
CREATE TABLE IF NOT EXISTS recipients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  department text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE recipients ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow full access to authenticated users"
  ON recipients
  FOR ALL
  TO authenticated
  USING (true);

-- Email events table
CREATE TABLE IF NOT EXISTS email_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id uuid REFERENCES campaigns(id),
  recipient_id uuid REFERENCES recipients(id),
  event_type text NOT NULL,
  link_clicked text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE email_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow full access to authenticated users"
  ON email_events
  FOR ALL
  TO authenticated
  USING (true);