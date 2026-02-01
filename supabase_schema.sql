-- 1. Create the 'blogs' table
create table public.blogs (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  excerpt text,
  content text,
  category text,
  image_url text,
  read_time text,
  author text
);

-- 2. Enable Row Level Security (RLS) is recommended, but for simplicity with your current 'admin_session' setup:
alter table public.blogs enable row level security;

-- 3. Create a policy that allows anyone (including your Admin Panel) to Read, Create, Update, and Delete posts.
-- Since you are not using Supabase Auth yet, this is required for your Admin Panel to work.
create policy "Allow public access"
  on public.blogs
  for all
  using (true)
  with check (true);
