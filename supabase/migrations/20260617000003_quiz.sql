create table if not exists public.quiz_questions (
  id            uuid primary key default gen_random_uuid(),
  question      text not null,
  image_url     text,
  options       jsonb not null,
  correct_index int not null check (correct_index between 0 and 3),
  category      text not null default 'general',
  created_at    timestamptz not null default now()
);

alter table public.quiz_questions enable row level security;
create policy "quiz_select" on public.quiz_questions for select using (true);
create policy "quiz_insert" on public.quiz_questions for insert with check (true);
create policy "quiz_delete" on public.quiz_questions for delete using (true);

create table if not exists public.quiz_attempts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references auth.users(id) on delete cascade,
  score       int not null,
  total       int not null,
  created_at  timestamptz not null default now()
);

alter table public.quiz_attempts enable row level security;
create policy "attempts_select" on public.quiz_attempts for select using (auth.uid() = user_id);
create policy "attempts_insert" on public.quiz_attempts for insert with check (auth.uid() = user_id);

-- Seed 7 questions
insert into public.quiz_questions (question, image_url, options, correct_index, category) values
(
  'В каком году появился первый комикс о Бэтмене?',
  'https://upload.wikimedia.org/wikipedia/en/1/1b/Batman_Detective_27.jpg',
  '["1936", "1939", "1941", "1945"]',
  1,
  'history'
),
(
  'Как зовут Бэтмена по настоящему имени?',
  null,
  '["Кларк Кент", "Питер Паркер", "Брюс Уэйн", "Тони Старк"]',
  2,
  'characters'
),
(
  'Какая компания создала Человека-паука?',
  null,
  '["DC Comics", "Dark Horse", "Image Comics", "Marvel Comics"]',
  3,
  'publisher'
),
(
  'Из какого города Человек-паук?',
  null,
  '["Готэм", "Метрополис", "Нью-Йорк", "Чикаго"]',
  2,
  'geography'
),
(
  'Что является слабостью Супермена?',
  null,
  '["Вода", "Криптонит", "Огонь", "Серебро"]',
  1,
  'lore'
),
(
  'Какова настоящая личность Железного человека?',
  null,
  '["Стив Роджерс", "Брюс Беннер", "Клинт Бартон", "Тони Старк"]',
  3,
  'characters'
),
(
  'В каком городе живёт Бэтмен?',
  null,
  '["Метрополис", "Центральный Сити", "Готэм", "Старлинг Сити"]',
  2,
  'geography'
);
