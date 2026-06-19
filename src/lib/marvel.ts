export interface Comic {
  id: number;
  title: string;
  description: string;
  thumbnail: { path: string; extension: string };
  pageCount: number;
  series: { name: string };
  publisher?: string;
}

const MOCK: Comic[] = [
  // ── Marvel ──────────────────────────────────────────────────────────────
  {
    id: 1,
    title: 'The Amazing Spider-Man #1',
    description: 'Питер Паркер — обычный старшеклассник, который после укуса радиоактивного паука стал Человеком-пауком. Первый выпуск легендарной серии.',
    thumbnail: { path: 'https://picsum.photos/seed/spiderman1/200/300', extension: '' },
    pageCount: 32,
    series: { name: 'The Amazing Spider-Man' },
    publisher: 'Marvel',
  },
  {
    id: 2,
    title: 'Iron Man #128: Demon in a Bottle',
    description: 'Тони Старк противостоит своей главной битве — с зависимостью. Один из лучших выпусков об Железном Человеке.',
    thumbnail: { path: 'https://picsum.photos/seed/ironman128/200/300', extension: '' },
    pageCount: 36,
    series: { name: 'Iron Man' },
    publisher: 'Marvel',
  },
  {
    id: 3,
    title: 'Black Panther #1',
    description: "Т'Чалла возвращается в Ваканду, чтобы стать королём и отстоять родину от нашествия.",
    thumbnail: { path: 'https://picsum.photos/seed/blackpanther1/200/300', extension: '' },
    pageCount: 30,
    series: { name: 'Black Panther' },
    publisher: 'Marvel',
  },
  {
    id: 4,
    title: 'Captain America #1',
    description: 'Стив Роджерс — символ справедливости. Первый выпуск серии о Капитане Америке, начало легенды.',
    thumbnail: { path: 'https://picsum.photos/seed/capamerica1/200/300', extension: '' },
    pageCount: 28,
    series: { name: 'Captain America' },
    publisher: 'Marvel',
  },
  {
    id: 5,
    title: 'Thor #337: The Mighty Thor',
    description: 'Тор, бог грома, встречает нового героя — Бета Рэй Билла — и испытывает свою силу и достоинство.',
    thumbnail: { path: 'https://picsum.photos/seed/thor337/200/300', extension: '' },
    pageCount: 34,
    series: { name: 'Thor' },
    publisher: 'Marvel',
  },
  {
    id: 6,
    title: 'Incredible Hulk #181',
    description: 'Первое полноценное появление Росомахи! Халк вступает в эпическую схватку с неизвестным мутантом.',
    thumbnail: { path: 'https://picsum.photos/seed/hulk181/200/300', extension: '' },
    pageCount: 32,
    series: { name: 'Incredible Hulk' },
    publisher: 'Marvel',
  },
  {
    id: 7,
    title: 'X-Men #1',
    description: 'Профессор Икс собирает команду мутантов — Циклоп, Зверь, Ангел, Ледяной и Джин Грей. Начало легендарной команды.',
    thumbnail: { path: 'https://picsum.photos/seed/xmen1/200/300', extension: '' },
    pageCount: 36,
    series: { name: 'X-Men' },
    publisher: 'Marvel',
  },
  {
    id: 8,
    title: 'Avengers #4: Captain America Revived',
    description: 'Мстители находят тело Капитана Америки в арктических водах. Герой Второй мировой возвращается к жизни.',
    thumbnail: { path: 'https://picsum.photos/seed/avengers4/200/300', extension: '' },
    pageCount: 30,
    series: { name: 'The Avengers' },
    publisher: 'Marvel',
  },
  {
    id: 9,
    title: 'Daredevil #1',
    description: 'Мэтт Мёрдок — слепой адвокат, который ночью становится бесстрашным Сорвиголовой.',
    thumbnail: { path: 'https://picsum.photos/seed/daredevil1/200/300', extension: '' },
    pageCount: 32,
    series: { name: 'Daredevil' },
    publisher: 'Marvel',
  },
  {
    id: 10,
    title: 'Doctor Strange #1',
    description: 'Стивен Стрэндж — бывший хирург, ставший верховным магом земли. История его падения и возрождения.',
    thumbnail: { path: 'https://picsum.photos/seed/drstrange1/200/300', extension: '' },
    pageCount: 34,
    series: { name: 'Doctor Strange' },
    publisher: 'Marvel',
  },
  {
    id: 11,
    title: 'Guardians of the Galaxy #1',
    description: 'Питер Квилл и его странная команда стражей — Грут, Ракета, Гамора, Дракс — защищают галактику.',
    thumbnail: { path: 'https://picsum.photos/seed/gotg1/200/300', extension: '' },
    pageCount: 36,
    series: { name: 'Guardians of the Galaxy' },
    publisher: 'Marvel',
  },
  {
    id: 12,
    title: 'Black Widow #1',
    description: 'Наташа Романова — самый опасный шпион в мире. История её прошлого и поиска искупления.',
    thumbnail: { path: 'https://picsum.photos/seed/blackwidow1/200/300', extension: '' },
    pageCount: 28,
    series: { name: 'Black Widow' },
    publisher: 'Marvel',
  },
  {
    id: 13,
    title: 'Wolverine #1',
    description: 'Логан — бессмертный мутант с когтями из адамантия. Сольная история самого злобного героя Marvel.',
    thumbnail: { path: 'https://picsum.photos/seed/wolverine1/200/300', extension: '' },
    pageCount: 38,
    series: { name: 'Wolverine' },
    publisher: 'Marvel',
  },
  {
    id: 14,
    title: 'Fantastic Four #1',
    description: 'Четыре космонавта облучились радиацией и получили невероятные способности. Рождение первой семьи Marvel.',
    thumbnail: { path: 'https://picsum.photos/seed/ff1/200/300', extension: '' },
    pageCount: 32,
    series: { name: 'Fantastic Four' },
    publisher: 'Marvel',
  },
  {
    id: 15,
    title: 'Ms. Marvel #1',
    description: 'Камала Хан из Нью-Джерси получает способности и становится новой Мисс Марвел. Свежий взгляд на супергероику.',
    thumbnail: { path: 'https://picsum.photos/seed/msmarvel1/200/300', extension: '' },
    pageCount: 28,
    series: { name: 'Ms. Marvel' },
    publisher: 'Marvel',
  },

  // ── DC Comics ────────────────────────────────────────────────────────────
  {
    id: 20,
    title: 'Batman #1',
    description: 'Брюс Уэйн — миллиардер, ставший Тёмным Рыцарем Готэма. Первый выпуск культовой серии о Бэтмене.',
    thumbnail: { path: 'https://picsum.photos/seed/batman1/200/300', extension: '' },
    pageCount: 34,
    series: { name: 'Batman' },
    publisher: 'DC',
  },
  {
    id: 21,
    title: 'Superman #1',
    description: 'Последний сын Криптона — символ надежды и справедливости. Начало одной из самых известных историй в комиксах.',
    thumbnail: { path: 'https://picsum.photos/seed/superman1/200/300', extension: '' },
    pageCount: 36,
    series: { name: 'Superman' },
    publisher: 'DC',
  },
  {
    id: 22,
    title: 'Wonder Woman #1',
    description: 'Диана из Фемискиры — воин-амазонка, посол мира. Первый выпуск серии о Чудо-женщине.',
    thumbnail: { path: 'https://picsum.photos/seed/wonderwoman1/200/300', extension: '' },
    pageCount: 32,
    series: { name: 'Wonder Woman' },
    publisher: 'DC',
  },
  {
    id: 23,
    title: 'The Flash #1',
    description: 'Барри Аллен — быстрейший человек на земле. История Флэша, защитника Сентрал-Сити.',
    thumbnail: { path: 'https://picsum.photos/seed/theflash1/200/300', extension: '' },
    pageCount: 30,
    series: { name: 'The Flash' },
    publisher: 'DC',
  },
  {
    id: 24,
    title: 'Green Lantern #1',
    description: 'Хэл Джордан получает перстень зелёного фонаря и становится космическим стражем. Сила воли против страха.',
    thumbnail: { path: 'https://picsum.photos/seed/gl1/200/300', extension: '' },
    pageCount: 32,
    series: { name: 'Green Lantern' },
    publisher: 'DC',
  },
  {
    id: 25,
    title: 'Batman: The Dark Knight Returns #1',
    description: 'Состарившийся Брюс Уэйн возвращается как Бэтмен в мрачном антиутопическом Готэме. Шедевр Фрэнка Миллера.',
    thumbnail: { path: 'https://picsum.photos/seed/dkr1/200/300', extension: '' },
    pageCount: 48,
    series: { name: 'The Dark Knight Returns' },
    publisher: 'DC',
  },
  {
    id: 26,
    title: 'Watchmen #1',
    description: 'Кто следит за сторожами? Алан Мур деконструирует жанр супергероики в этом мрачном шедевре.',
    thumbnail: { path: 'https://picsum.photos/seed/watchmen1/200/300', extension: '' },
    pageCount: 40,
    series: { name: 'Watchmen' },
    publisher: 'DC',
  },
  {
    id: 27,
    title: 'Justice League #1',
    description: 'Величайшие герои DC объединяются: Бэтмен, Супермен, Чудо-женщина, Флэш, Зелёный Фонарь и другие.',
    thumbnail: { path: 'https://picsum.photos/seed/jl1/200/300', extension: '' },
    pageCount: 36,
    series: { name: 'Justice League' },
    publisher: 'DC',
  },
  {
    id: 28,
    title: 'Joker: One Operation Joker #1',
    description: 'Безумный Джокер в роли... отца? Неожиданный взгляд на злодея Готэма.',
    thumbnail: { path: 'https://picsum.photos/seed/joker1/200/300', extension: '' },
    pageCount: 30,
    series: { name: 'Joker' },
    publisher: 'DC',
  },
  {
    id: 29,
    title: 'Aquaman #1',
    description: 'Артур Карри — король Атлантиды, повелитель морей. История о принятии своей двойственной природы.',
    thumbnail: { path: 'https://picsum.photos/seed/aquaman1/200/300', extension: '' },
    pageCount: 30,
    series: { name: 'Aquaman' },
    publisher: 'DC',
  },

  // ── Image Comics ─────────────────────────────────────────────────────────
  {
    id: 40,
    title: 'Saga #1',
    description: 'Межгалактическая война — и двое её врагов бегут вместе с новорождённой дочерью. Брайан К. Вон создал шедевр.',
    thumbnail: { path: 'https://picsum.photos/seed/saga1/200/300', extension: '' },
    pageCount: 44,
    series: { name: 'Saga' },
    publisher: 'Image',
  },
  {
    id: 41,
    title: 'Invincible #1',
    description: 'Марк Грейсон — сын самого мощного супергероя на земле. Однажды он тоже получит силы.',
    thumbnail: { path: 'https://picsum.photos/seed/invincible1/200/300', extension: '' },
    pageCount: 32,
    series: { name: 'Invincible' },
    publisher: 'Image',
  },
  {
    id: 42,
    title: 'The Walking Dead #1',
    description: 'Рик Граймс выходит из комы в мире, захваченном зомби. Не о мертвецах — о живых людях в апокалипсисе.',
    thumbnail: { path: 'https://picsum.photos/seed/twd1/200/300', extension: '' },
    pageCount: 30,
    series: { name: 'The Walking Dead' },
    publisher: 'Image',
  },
  {
    id: 43,
    title: 'Spawn #1',
    description: 'Ал Симмонс возвращается из ада как Спаун — мрачный антигерой с адскими силами.',
    thumbnail: { path: 'https://picsum.photos/seed/spawn1/200/300', extension: '' },
    pageCount: 28,
    series: { name: 'Spawn' },
    publisher: 'Image',
  },
  {
    id: 44,
    title: 'Sin City Vol. 1: The Hard Goodbye',
    description: 'Марв мстит за убийство единственной близкой ему женщины в криминальном Бассейне Грехов.',
    thumbnail: { path: 'https://picsum.photos/seed/sincity1/200/300', extension: '' },
    pageCount: 208,
    series: { name: 'Sin City' },
    publisher: 'Image',
  },
  {
    id: 45,
    title: 'Bone #1',
    description: 'Три кузена Боун попадают в фантастическую долину, полную тайн и приключений.',
    thumbnail: { path: 'https://picsum.photos/seed/bone1/200/300', extension: '' },
    pageCount: 56,
    series: { name: 'Bone' },
    publisher: 'Image',
  },

  // ── Manga ────────────────────────────────────────────────────────────────
  {
    id: 60,
    title: 'Naruto Vol. 1: Uzumaki Naruto',
    description: 'Наруто Узумаки — отверженный подросток с лисьим демоном внутри. Он мечтает стать Хокаге и изменить мир.',
    thumbnail: { path: 'https://picsum.photos/seed/naruto1/200/300', extension: '' },
    pageCount: 192,
    series: { name: 'Naruto' },
    publisher: 'Manga',
  },
  {
    id: 61,
    title: 'One Piece Vol. 1: Romance Dawn',
    description: 'Луффи с детства мечтает стать королём пиратов. С резиновым телом и командой друзей он отправляется в море.',
    thumbnail: { path: 'https://picsum.photos/seed/onepiece1/200/300', extension: '' },
    pageCount: 200,
    series: { name: 'One Piece' },
    publisher: 'Manga',
  },
  {
    id: 62,
    title: 'Attack on Titan Vol. 1',
    description: 'Человечество спрятано за стенами от гигантских людоедов. Эрен Йегер поклялся уничтожить всех титанов.',
    thumbnail: { path: 'https://picsum.photos/seed/aot1/200/300', extension: '' },
    pageCount: 192,
    series: { name: 'Attack on Titan' },
    publisher: 'Manga',
  },
  {
    id: 63,
    title: 'Death Note Vol. 1: Boredom',
    description: 'Тетрадь смерти попадает в руки Лайту Ягами. Тот, чьё имя написано в ней — умрёт.',
    thumbnail: { path: 'https://picsum.photos/seed/deathnote1/200/300', extension: '' },
    pageCount: 200,
    series: { name: 'Death Note' },
    publisher: 'Manga',
  },
  {
    id: 64,
    title: 'Dragon Ball Vol. 1',
    description: 'Гоку и Булма ищут семь шаров дракона, исполняющего любое желание. Начало великой легенды.',
    thumbnail: { path: 'https://picsum.photos/seed/dragonball1/200/300', extension: '' },
    pageCount: 192,
    series: { name: 'Dragon Ball' },
    publisher: 'Manga',
  },
  {
    id: 65,
    title: 'My Hero Academia Vol. 1',
    description: 'В мире, где 80% людей имеют суперсилы, Мидория родился без них. Но встреча с величайшим героем всё изменит.',
    thumbnail: { path: 'https://picsum.photos/seed/mha1/200/300', extension: '' },
    pageCount: 192,
    series: { name: 'My Hero Academia' },
    publisher: 'Manga',
  },
  {
    id: 66,
    title: 'Demon Slayer Vol. 1',
    description: 'Танджиро Камадо становится охотником на демонов, чтобы спасти свою сестру, превращённую в демона.',
    thumbnail: { path: 'https://picsum.photos/seed/demonslayer1/200/300', extension: '' },
    pageCount: 192,
    series: { name: 'Demon Slayer' },
    publisher: 'Manga',
  },
  {
    id: 67,
    title: 'Fullmetal Alchemist Vol. 1',
    description: 'Братья-алхимики Эдвард и Алфонс Элрик ищут философский камень после провальной попытки воскресить мать.',
    thumbnail: { path: 'https://picsum.photos/seed/fma1/200/300', extension: '' },
    pageCount: 200,
    series: { name: 'Fullmetal Alchemist' },
    publisher: 'Manga',
  },
  {
    id: 68,
    title: 'Bleach Vol. 1',
    description: 'Ичиго Куросаки видит духов. Однажды он получает силу Синигами и начинает защищать живых от злых духов.',
    thumbnail: { path: 'https://picsum.photos/seed/bleach1/200/300', extension: '' },
    pageCount: 192,
    series: { name: 'Bleach' },
    publisher: 'Manga',
  },
  {
    id: 69,
    title: 'Jujutsu Kaisen Vol. 1',
    description: 'Юджи Итадори поедает проклятый палец и становится сосудом для могущественного злодея Рёмена Сукуны.',
    thumbnail: { path: 'https://picsum.photos/seed/jjk1/200/300', extension: '' },
    pageCount: 192,
    series: { name: 'Jujutsu Kaisen' },
    publisher: 'Manga',
  },
];

export function getThumbnailUrl(comic: Comic): string {
  if (!comic.thumbnail.extension) return comic.thumbnail.path;
  return `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
}

export async function fetchComics(query = ''): Promise<Comic[]> {
  const key = import.meta.env.VITE_MARVEL_PUBLIC_KEY;

  if (!key) {
    if (!query) return MOCK;
    const q = query.toLowerCase();
    return MOCK.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.series.name.toLowerCase().includes(q) ||
        (c.publisher ?? '').toLowerCase().includes(q),
    );
  }

  const url = new URL('https://gateway.marvel.com/v1/public/comics');
  url.searchParams.set('apikey', key);
  url.searchParams.set('limit', '20');
  url.searchParams.set('orderBy', '-onsaleDate');
  url.searchParams.set('hasDigitalIssue', 'true');
  if (query) url.searchParams.set('titleStartsWith', query);

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`Marvel API error: ${res.status}`);
  const json = await res.json();
  return json.data.results as Comic[];
}
