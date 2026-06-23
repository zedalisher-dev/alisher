-- Отзывы о приложении: каждый пользователь видит и редактирует только свой отзыв.

create table if not exists public.app_reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  comment text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

alter table public.app_reviews enable row level security;

create policy "read own app reviews"
  on public.app_reviews for select
  using (auth.uid() = user_id);

create policy "insert own app reviews"
  on public.app_reviews for insert
  with check (auth.uid() = user_id);

create policy "update own app reviews"
  on public.app_reviews for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "delete own app reviews"
  on public.app_reviews for delete
  using (auth.uid() = user_id);
