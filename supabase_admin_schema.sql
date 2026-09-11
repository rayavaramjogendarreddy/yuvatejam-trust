-- ====================================================================
-- YUVATEJAM TRUST ADMIN PANEL — COMPLETE SUPABASE DATABASE SCHEMA
-- ====================================================================
-- Executable SQL Migration script for Supabase SQL Editor.
-- Protects existing public.media and yuvatejam-media storage bucket.
-- Enforces Row Level Security (RLS) with DENY BY DEFAULT principles.
-- ====================================================================

-- 1. ENUMS FOR ROLES AND STATUSES
CREATE TYPE public.admin_role_enum AS ENUM ('SUPER_ADMIN', 'ADMIN', 'EDITOR', 'VIEWER');
CREATE TYPE public.content_status_enum AS ENUM ('published', 'draft', 'archived');
CREATE TYPE public.application_status_enum AS ENUM ('Pending', 'Under Review', 'Approved', 'Rejected');
CREATE TYPE public.enquiry_status_enum AS ENUM ('New', 'Read', 'Replied', 'Archived');

-- 2. PROFILES TABLE (Tied to auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role public.admin_role_enum NOT NULL DEFAULT 'VIEWER',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles read by authenticated users" 
  ON public.profiles FOR SELECT 
  TO authenticated 
  USING (true);

CREATE POLICY "Super admin manage profiles" 
  ON public.profiles FOR ALL 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'SUPER_ADMIN'
    )
  );

-- 3. PAGES TABLE
CREATE TABLE IF NOT EXISTS public.pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT,
  excerpt TEXT,
  status public.content_status_enum NOT NULL DEFAULT 'draft',
  featured_image TEXT,
  seo_title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  views_count BIGINT DEFAULT 0,
  author_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read published pages" 
  ON public.pages FOR SELECT 
  USING (status = 'published');

CREATE POLICY "Admin manage pages" 
  ON public.pages FOR ALL 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'ADMIN', 'EDITOR')
    )
  );

-- 4. PROGRAMS TABLE
CREATE TABLE IF NOT EXISTS public.programs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT NOT NULL,
  beneficiaries TEXT,
  allocated_budget NUMERIC(12,2),
  status TEXT NOT NULL DEFAULT 'Active',
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read programs" ON public.programs FOR SELECT USING (true);
CREATE POLICY "Admin manage programs" ON public.programs FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'ADMIN'))
);

-- 5. TEAM MEMBERS TABLE
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role_title TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT,
  biography TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read team" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "Admin manage team" ON public.team_members FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'ADMIN'))
);

-- 6. VOLUNTEER APPLICATIONS TABLE
CREATE TABLE IF NOT EXISTS public.volunteer_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  location TEXT NOT NULL,
  interest_area TEXT NOT NULL,
  status public.application_status_enum NOT NULL DEFAULT 'Pending',
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.volunteer_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public insert volunteers" ON public.volunteer_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read volunteers" ON public.volunteer_applications FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin update volunteers" ON public.volunteer_applications FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'ADMIN'))
);

-- 7. CONTACT SUBMISSIONS / ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status public.enquiry_status_enum NOT NULL DEFAULT 'New',
  reply_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public insert enquiries" ON public.contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read enquiries" ON public.contact_submissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admin update enquiries" ON public.contact_submissions FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'ADMIN'))
);

-- 8. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.site_settings (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read site_settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Super admin manage site_settings" ON public.site_settings FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'SUPER_ADMIN')
);

-- 9. SEO METADATA TABLE
CREATE TABLE IF NOT EXISTS public.seo_metadata (
  route TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  canonical_url TEXT,
  og_image TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.seo_metadata ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read seo" ON public.seo_metadata FOR SELECT USING (true);
CREATE POLICY "Admin manage seo" ON public.seo_metadata FOR ALL TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'ADMIN'))
);

-- 10. AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin read audit_logs" ON public.audit_logs FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('SUPER_ADMIN', 'ADMIN'))
);
