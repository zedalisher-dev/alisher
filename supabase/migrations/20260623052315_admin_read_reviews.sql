-- Админы могут читать все отзывы.
-- Перед применением миграции добавь email админа в insert ниже.

alter table public.app_reviews
  add column if not exists user_email text;

create table if not exists public.admin_users (
  email text primary key,
  created_at timestamptz not null default now()
);

insert into public.admin_users (email)
values ('zed.alisher@yahoo.com')
on conflict (email) do nothing;

alter table public.admin_users enable row level security;

drop policy if exists "read own admin user" on public.admin_users;
create policy "read own admin user"
  on public.admin_users for select
  using (email = (auth.jwt() ->> 'email'));

drop policy if exists "admins read all app reviews" on public.app_reviews;
create policy "admins read all app reviews"
  on public.app_reviews for select
  using (
    exists (
      select 1
      from public.admin_users
      where admin_users.email = (auth.jwt() ->> 'email')
    )
  );
