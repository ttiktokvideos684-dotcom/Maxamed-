export const SUPABASE_SQL_SCHEMA = `-- ==========================================
-- MAHA 00 SUPABASE / POSTGRESQL SCHEMA
-- Production DDL with Row Level Security (RLS)
-- ==========================================

-- 1. Categories Table
create table if not exists public.categories (
  id text primary key,
  name text not null,
  slug text not null unique,
  description text,
  icon_name text default 'Sparkles',
  image_url text,
  display_order integer default 1,
  published boolean default true,
  item_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Products Table
create table if not exists public.products (
  id text primary key,
  name text not null,
  slug text not null unique,
  description text not null,
  category_id text,
  long_review text,
  pros jsonb default '[]'::jsonb,
  cons jsonb default '[]'::jsonb,
  specs jsonb default '[]'::jsonb,
  image_url text not null,
  category text not null,
  merchant text,
  merchant_name text not null,
  affiliate_network text not null default 'Amazon Associates',
  affiliate_url text not null,
  price numeric(10, 2),
  current_price numeric(10, 2) not null,
  original_price numeric(10, 2),
  discount_percent integer,
  currency text default 'USD',
  is_price_verified boolean default true,
  star_rating numeric(3, 2) default 5.0,
  review_count integer default 0,
  featured boolean default false,
  published boolean default true,
  status text default 'published',
  badge text,
  demo_notice text,
  seo_title text,
  seo_description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Blog Posts Table
create table if not exists public.blog_posts (
  id text primary key,
  slug text not null unique,
  title text not null,
  excerpt text not null,
  content text not null,
  featured_image text not null,
  category text not null,
  tags text[] default '{}',
  author_name text not null,
  author_role text not null,
  published_at text default 'March 2026',
  scheduled_date timestamp with time zone,
  read_time text default '5 min read',
  recommended_product_ids jsonb default '[]'::jsonb,
  published boolean default true,
  seo_title text,
  seo_description text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Newsletter Subscribers Table
create table if not exists public.subscribers (
  id text primary key,
  email text not null unique,
  source text default 'Website Newsletter',
  status text default 'active' check (status in ('active', 'unsubscribed')),
  subscribed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Site & Affiliate Settings Table
create table if not exists public.site_settings (
  id text primary key default 'default_settings',
  brand_name text not null default 'Maha 00',
  tagline text not null default 'Better Products. Smarter Choices.',
  amazon_tag text not null default 'maha00-20',
  digistore_id text not null default 'maha00',
  default_merchant text default 'Amazon',
  link_open_behavior text default '_blank',
  enable_click_tracking boolean default true,
  hero_headline text not null,
  hero_subheadline text not null,
  hero_cta_text text default 'Explore Products',
  hero_cta_target text default 'shop',
  hero_cta_secondary text default 'Read Our Reviews',
  hero_cta_secondary_target text default 'blog',
  hero_image text not null,
  promo_headline text not null,
  promo_subheadline text not null,
  promo_cta_text text default 'Explore Offers',
  promo_cta_url text not null default '/shop',
  promo_image text not null,
  newsletter_headline text default 'Never Miss a Verified Deal or In-Depth Review',
  newsletter_subtext text,
  footer_about text,
  disclosure_notice text not null,
  contact_email text not null default 'editorial@maha00.com',
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Click Analytics Table (Affiliate Outbound Clicks)
create table if not exists public.click_analytics (
  id text primary key,
  event_type text not null check (event_type in ('outbound_click', 'review_view')),
  product_id text not null references public.products(id) on delete cascade,
  product_name text not null,
  merchant text not null,
  affiliate_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Administrator Roles Table
create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role text not null default 'admin' check (role in ('admin', 'editor')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ==========================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==========================================

alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.blog_posts enable row level security;
alter table public.subscribers enable row level security;
alter table public.site_settings enable row level security;
alter table public.click_analytics enable row level security;
alter table public.admin_users enable row level security;

-- 1. Public Visitor Read Permissions (Published items only)
create policy "Public can view published products" on public.products
  for select using (published = true);

create policy "Public can view published blog posts" on public.blog_posts
  for select using (published = true);

create policy "Public can view visible categories" on public.categories
  for select using (published = true);

create policy "Public can view site settings" on public.site_settings
  for select using (true);

-- 2. Public Visitor Subscriptions & Outbound Tracking
create policy "Public can subscribe to newsletter" on public.subscribers
  for insert with check (email is not null and email != '');

create policy "Public can record outbound affiliate clicks" on public.click_analytics
  for insert with check (true);

-- 3. Authenticated Admin Full Permissions
create policy "Admins full access to products" on public.products
  for all to authenticated using (true) with check (true);

create policy "Admins full access to blog posts" on public.blog_posts
  for all to authenticated using (true) with check (true);

create policy "Admins full access to categories" on public.categories
  for all to authenticated using (true) with check (true);

create policy "Admins full access to subscribers" on public.subscribers
  for all to authenticated using (true) with check (true);

create policy "Admins full access to site settings" on public.site_settings
  for all to authenticated using (true) with check (true);

create policy "Admins full access to click analytics" on public.click_analytics
  for select to authenticated using (true);

create policy "Admins full access to admin users" on public.admin_users
  for all to authenticated using (true) with check (true);
`;
