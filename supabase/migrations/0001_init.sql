-- IISF KNIT schema. Run in the Supabase SQL editor (or `supabase db push`).
-- All access goes through the Next.js backend with the service-role key.
-- RLS is enabled everywhere with public read on content tables only.

create extension if not exists "pgcrypto";

-- ───────── Content ─────────
create table if not exists startups (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text not null,
  sector text not null,
  stage text not null check (stage in ('Idea','Prototype','Seed','Revenue')),
  team_size int not null default 1,
  funding text not null default '',
  founded int not null,
  logo_url text,
  cover_url text,
  problem text not null default '',
  solution text not null default '',
  founders text[] not null default '{}',
  milestones text[] not null default '{}',
  website text,
  instagram text,
  linkedin text,
  featured boolean not null default false,
  sort int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists events (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  kind text not null,
  starts_at timestamptz not null,
  venue text not null,
  summary text not null,
  description text not null default '',
  register_url text,
  status text not null default 'upcoming' check (status in ('upcoming','closed','done')),
  cover_url text,
  gallery text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  year text not null check (year in ('final','third','second','faculty')),
  role text not null,
  branch text not null default '',
  fun_fact text not null default '',
  photo_url text,
  linkedin text,
  instagram text,
  sort int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists programs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  blurb text not null,
  eligibility text not null,
  how_to text not null,
  color text not null default 'sun',
  sort int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists stats (
  id uuid primary key default gen_random_uuid(),
  label text not null,
  value int not null,
  prefix text not null default '',
  suffix text not null default '',
  sort int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists marquee_items (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  sort int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  quote text not null,
  name text not null,
  startup text not null,
  sort int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  published_on date not null,
  file_url text not null,
  created_at timestamptz not null default now()
);

-- ───────── Submissions (private) ─────────
create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  founder_name text not null,
  email text not null,
  phone text not null,
  branch text not null,
  year text not null,
  team text not null default '',
  idea_title text not null,
  problem text not null,
  solution text not null,
  stage text not null,
  help_needed text[] not null default '{}',
  deck_url text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists committee_applications (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  year text not null,
  branch text not null,
  team_pref text not null,
  why text not null,
  created_at timestamptz not null default now()
);

create table if not exists contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz not null default now()
);

-- ───────── Row level security ─────────
do $$
declare t text;
begin
  foreach t in array array['startups','events','team_members','programs','stats','marquee_items','faqs','testimonials','resources'] loop
    execute format('alter table %I enable row level security', t);
    execute format('drop policy if exists "public read" on %I', t);
    execute format('create policy "public read" on %I for select using (true)', t);
  end loop;
  foreach t in array array['applications','committee_applications','contact_messages'] loop
    execute format('alter table %I enable row level security', t);
  end loop;
end $$;

-- ───────── Storage: private bucket for pitch decks ─────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('pitch-decks', 'pitch-decks', false, 10485760, array['application/pdf'])
on conflict (id) do nothing;
