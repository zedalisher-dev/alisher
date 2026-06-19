-- api_cache: edge-function-only, no RLS, accessed via service role key
create table if not exists public.api_cache (
  id            uuid primary key default gen_random_uuid(),
  key           text not null unique,
  source        text not null,
  response_json jsonb not null,
  created_at    timestamptz not null default now(),
  expires_at    timestamptz not null
);
create index if not exists api_cache_key_idx on public.api_cache (key);
create index if not exists api_cache_expires_idx on public.api_cache (expires_at);

-- favorites: per-user, RLS
create table if not exists public.favorites (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  source_type text not null check (source_type in ('comic_vine','archive','xkcd')),
  source_id   text not null,
  title       text not null,
  image_url   text,
  detail_url  text not null,
  created_at  timestamptz not null default now(),
  unique (user_id, source_type, source_id)
);
alter table public.favorites enable row level security;
create policy "users manage own favorites" on public.favorites
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- reading_history: per-user, RLS
create table if not exists public.reading_history (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users(id) on delete cascade,
  source_type     text not null check (source_type in ('comic_vine','archive','xkcd')),
  source_id       text not null,
  title           text not null,
  image_url       text,
  last_opened_at  timestamptz not null default now(),
  unique (user_id, source_type, source_id)
);
alter table public.reading_history enable row level security;
create policy "users manage own history" on public.reading_history
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- audio_clips: schema only, RLS added when audio feature is built
create table if not exists public.audio_clips (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  source_type text not null,
  source_id   text not null,
  clip_url    text not null,
  duration_s  integer,
  created_at  timestamptz not null default now()
);
