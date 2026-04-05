-- Run this in your Supabase SQL editor

create table if not exists public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  is_pro boolean default false,
  usage_count integer default 0,
  stripe_customer_id text,
  created_at timestamptz default now()
);

-- Auto-create a user row on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.users (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Row level security
alter table public.users enable row level security;

create policy "Users can read own data"
  on public.users for select
  using (auth.uid() = id);

create policy "Users can update own data"
  on public.users for update
  using (auth.uid() = id);
