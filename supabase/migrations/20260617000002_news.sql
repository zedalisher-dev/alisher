create table if not exists public.news_posts (
  id           uuid primary key default gen_random_uuid(),
  author_id    uuid not null references auth.users(id) on delete cascade,
  title        text not null,
  body         text not null,
  cover_url    text,
  published_at timestamptz not null default now(),
  created_at   timestamptz not null default now()
);

create index if not exists news_posts_published_idx on public.news_posts (published_at desc);

alter table public.news_posts enable row level security;

create policy "news_select" on public.news_posts for select using (true);
create policy "news_insert" on public.news_posts for insert with check (auth.uid() = author_id);
create policy "news_update" on public.news_posts for update using (auth.uid() = author_id);
create policy "news_delete" on public.news_posts for delete using (auth.uid() = author_id);
