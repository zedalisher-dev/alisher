export interface Dialogue {
  speaker: string;
  text: string;
}

export interface Panel {
  id: string;
  narration?: string;
  dialogue?: Dialogue[];
  action?: string;
  bg: string;
}

export interface Page {
  id: string;
  panels: Panel[];
}

export interface Issue {
  id: string;
  number: number;
  title: string;
  description: string;
  cover: string;
  pages: Page[];
}

export interface Series {
  id: string;
  title: string;
  publisher: string;
  genres: string[];
  description: string;
  cover: string;
  accent: string;
  issues: Issue[];
}

export const ALL_SERIES: Series[] = [
  {
    id: 'invincible',
    title: 'Invincible',
    publisher: 'Image Comics',
    genres: ['Супергерои', 'Экшн'],
    description: 'Марк Грейсон — обычный старшеклассник, чей отец — величайший супергерой Земли Омни-Мэн. Когда у Марка наконец проявляются суперсилы, он думает, что жизнь станет проще. Он ошибается.',
    cover: 'https://picsum.photos/seed/invincible-cover/300/450',
    accent: '#ffcc00',
    issues: [
      {
        id: 'invincible-1',
        number: 1,
        title: 'Family Matters',
        description: 'Марк Грейсон ждёт появления суперсил. Наконец — они приходят.',
        cover: 'https://picsum.photos/seed/invincible-1/300/450',
        pages: [
          {
            id: 'inv-1-p1',
            panels: [
              {
                id: 'inv-1-p1-1',
                narration: 'Сиэтл. Обычный вторник. Марку Грейсону — 17 лет.',
                bg: '#1a2a4a',
              },
              {
                id: 'inv-1-p1-2',
                dialogue: [
                  { speaker: 'Марк', text: 'Опять опаздываю... Папа мог бы просто отвезти меня на работу за две секунды.' },
                ],
                bg: '#1a2a4a',
              },
              {
                id: 'inv-1-p1-3',
                narration: 'Его отец — Нолан Грейсон. Миру он известен как Омни-Мэн. Сильнейший герой на Земле.',
                bg: '#0d1b2a',
              },
            ],
          },
          {
            id: 'inv-1-p2',
            panels: [
              {
                id: 'inv-1-p2-1',
                dialogue: [
                  { speaker: 'Нолан', text: 'Марк. Скоро у тебя проявятся силы. Мой народ — вилтрумиты — они появляются примерно в твоём возрасте.' },
                  { speaker: 'Марк', text: 'Ты говорил это уже сто раз, пап.' },
                ],
                bg: '#2a1a0a',
              },
              {
                id: 'inv-1-p2-2',
                dialogue: [
                  { speaker: 'Нолан', text: 'Я говорю это, потому что это правда. Будь готов.' },
                ],
                bg: '#2a1a0a',
              },
            ],
          },
          {
            id: 'inv-1-p3',
            panels: [
              {
                id: 'inv-1-p3-1',
                narration: "Бургерная «Steak 'n Shake». Марк выбрасывает мусор.",
                bg: '#1a1a1a',
              },
              {
                id: 'inv-1-p3-2',
                action: 'ВЖУХ!',
                narration: 'Мешок с мусором улетает за горизонт.',
                bg: '#1a1a1a',
              },
              {
                id: 'inv-1-p3-3',
                dialogue: [
                  { speaker: 'Марк', text: 'О боже. Они появились. ОНИ ПОЯВИЛИСЬ!' },
                ],
                bg: '#1a3a1a',
              },
            ],
          },
          {
            id: 'inv-1-p4',
            panels: [
              {
                id: 'inv-1-p4-1',
                narration: 'Первый полёт. Марк не умеет управлять собой — он просто несётся вперёд.',
                bg: '#0a1a3a',
              },
              {
                id: 'inv-1-p4-2',
                dialogue: [
                  { speaker: 'Марк', text: 'ААА— нет подождите— ЭТО КРУТО!' },
                ],
                bg: '#0a1a3a',
              },
              {
                id: 'inv-1-p4-3',
                narration: 'Начало.',
                bg: '#0a1a3a',
              },
            ],
          },
        ],
      },
      {
        id: 'invincible-2',
        number: 2,
        title: 'Here Goes Nothing',
        description: 'Марк надевает костюм и выходит на первое патрулирование.',
        cover: 'https://picsum.photos/seed/invincible-2/300/450',
        pages: [
          {
            id: 'inv-2-p1',
            panels: [
              {
                id: 'inv-2-p1-1',
                dialogue: [
                  { speaker: 'Дебби', text: 'Марк, этот костюм... нельзя что-нибудь получше?' },
                  { speaker: 'Марк', text: 'Мам, я только начинаю.' },
                ],
                bg: '#2a1a2a',
              },
              {
                id: 'inv-2-p1-2',
                narration: 'Первое патрулирование. Город выглядит иначе сверху.',
                bg: '#0a1a3a',
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'walking-dead',
    title: 'The Walking Dead',
    publisher: 'Image Comics',
    genres: ['Хоррор', 'Выживание', 'Драма'],
    description: 'Полицейский Рик Граймс просыпается в больнице после ранения и обнаруживает, что мир изменился навсегда. Мертвецы ходят. И они голодны.',
    cover: 'https://picsum.photos/seed/walking-dead-cover/300/450',
    accent: '#cc3333',
    issues: [
      {
        id: 'wd-1',
        number: 1,
        title: 'Days Gone Bye',
        description: 'Рик Граймс просыпается в опустевшей больнице.',
        cover: 'https://picsum.photos/seed/walking-dead-1/300/450',
        pages: [
          {
            id: 'wd-1-p1',
            panels: [
              {
                id: 'wd-1-p1-1',
                narration: 'Округ Кинг, Кентукки. До того, как всё изменилось.',
                bg: '#1a0a0a',
              },
              {
                id: 'wd-1-p1-2',
                dialogue: [
                  { speaker: 'Шейн', text: 'Рик, ложись! Он вооружён!' },
                  { speaker: 'Рик', text: 'Вижу его!' },
                ],
                bg: '#1a0a0a',
              },
              {
                id: 'wd-1-p1-3',
                action: 'БАМ!',
                narration: 'Пуля попала в полицейский жилет. Рик падает.',
                bg: '#0a0a0a',
              },
            ],
          },
          {
            id: 'wd-1-p2',
            panels: [
              {
                id: 'wd-1-p2-1',
                narration: 'Позже. Рик открывает глаза.',
                bg: '#2a2a1a',
              },
              {
                id: 'wd-1-p2-2',
                dialogue: [
                  { speaker: 'Рик', text: 'Шейн? Кто-нибудь? Медсестра?' },
                ],
                bg: '#2a2a1a',
              },
              {
                id: 'wd-1-p2-3',
                narration: 'Тишина. Коридор завален телами. Окна забиты.',
                bg: '#1a1a0a',
              },
              {
                id: 'wd-1-p2-4',
                dialogue: [
                  { speaker: 'Рик', text: 'Что, чёрт возьми, произошло?' },
                ],
                bg: '#1a1a0a',
              },
            ],
          },
          {
            id: 'wd-1-p3',
            panels: [
              {
                id: 'wd-1-p3-1',
                narration: 'Снаружи. Улицы пусты. Сожжённые машины. Трупы.',
                bg: '#0a1a0a',
              },
              {
                id: 'wd-1-p3-2',
                action: '...РРР...',
                narration: 'Звук — позади.',
                bg: '#0a0a0a',
              },
              {
                id: 'wd-1-p3-3',
                dialogue: [
                  { speaker: 'Морган', text: 'Стой. Не двигайся. Я не хочу тебя убивать, но убью, если понадобится.' },
                ],
                bg: '#0a1a0a',
              },
            ],
          },
          {
            id: 'wd-1-p4',
            panels: [
              {
                id: 'wd-1-p4-1',
                dialogue: [
                  { speaker: 'Морган', text: 'Болезнь. Кто-то умирает — встаёт снова. Не человек больше. Мертвец.' },
                  { speaker: 'Рик', text: 'Сколько времени я провёл без сознания?' },
                  { speaker: 'Морган', text: 'Не знаю. Месяц? Может два.' },
                ],
                bg: '#1a0a0a',
              },
              {
                id: 'wd-1-p4-2',
                dialogue: [
                  { speaker: 'Рик', text: 'Моя семья. Жена, сын. Они в Атланте. Я должен найти их.' },
                ],
                bg: '#1a0a0a',
              },
            ],
          },
        ],
      },
      {
        id: 'wd-2',
        number: 2,
        title: 'Miles Behind Us',
        description: 'Рик движется к Атланте. Каждый шаг — опасность.',
        cover: 'https://picsum.photos/seed/walking-dead-2/300/450',
        pages: [
          {
            id: 'wd-2-p1',
            panels: [
              {
                id: 'wd-2-p1-1',
                narration: 'Дорога на Атланту. Ни машин, ни людей — только ходячие.',
                bg: '#1a0a0a',
              },
              {
                id: 'wd-2-p1-2',
                dialogue: [
                  { speaker: 'Рик', text: 'Лори. Карл. Держитесь.' },
                ],
                bg: '#0a0a0a',
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'spider-man',
    title: 'The Amazing Spider-Man',
    publisher: 'Marvel Comics',
    genres: ['Супергерои', 'Приключения'],
    description: 'Питер Паркер — обычный старшеклассник из Нью-Йорка. После укуса радиоактивного паука он получает невероятные способности. Но с великой силой приходит великая ответственность.',
    cover: 'https://picsum.photos/seed/spiderman-cover/300/450',
    accent: '#cc0000',
    issues: [
      {
        id: 'sm-1',
        number: 1,
        title: 'Amazing Fantasy #15',
        description: 'Всё началось с укуса паука.',
        cover: 'https://picsum.photos/seed/spiderman-1/300/450',
        pages: [
          {
            id: 'sm-1-p1',
            panels: [
              {
                id: 'sm-1-p1-1',
                narration: 'Мидтаун Хай, Нью-Йорк. Питер Паркер — самый умный и самый одинокий ученик школы.',
                bg: '#1a1a2a',
              },
              {
                id: 'sm-1-p1-2',
                dialogue: [
                  { speaker: 'Флэш', text: 'Эй, Паркер! Ботаник! Куда собрался? На очередную выставку науки?' },
                  { speaker: 'Питер', text: 'Да, именно туда.' },
                ],
                bg: '#1a1a2a',
              },
              {
                id: 'sm-1-p1-3',
                dialogue: [
                  { speaker: 'Питер', text: 'Однажды они все поймут, что наука — это не слабость.' },
                ],
                bg: '#1a1a2a',
              },
            ],
          },
          {
            id: 'sm-1-p2',
            panels: [
              {
                id: 'sm-1-p2-1',
                narration: 'Выставка Starfield Laboratories. Питер в восторге.',
                bg: '#0a1a2a',
              },
              {
                id: 'sm-1-p2-2',
                action: 'АЙ!',
                narration: 'Паук — радиоактивный, сбежавший из экспозиции — кусает руку Питера.',
                bg: '#0a1a2a',
              },
              {
                id: 'sm-1-p2-3',
                dialogue: [
                  { speaker: 'Питер', text: 'Ничего страшного... наверное.' },
                ],
                bg: '#0a1a2a',
              },
            ],
          },
          {
            id: 'sm-1-p3',
            panels: [
              {
                id: 'sm-1-p3-1',
                narration: 'Дома. Питер просыпается утром. Что-то изменилось.',
                bg: '#1a2a1a',
              },
              {
                id: 'sm-1-p3-2',
                action: 'ТПОК!',
                narration: 'Рука прилипает к стене. Питер тянет — и тащит за собой всю мебель.',
                bg: '#1a2a1a',
              },
              {
                id: 'sm-1-p3-3',
                dialogue: [
                  { speaker: 'Питер', text: 'Что... что со мной происходит?!' },
                ],
                bg: '#1a2a1a',
              },
            ],
          },
          {
            id: 'sm-1-p4',
            panels: [
              {
                id: 'sm-1-p4-1',
                narration: 'Дядя Бен. Самый важный человек в жизни Питера.',
                bg: '#2a1a0a',
              },
              {
                id: 'sm-1-p4-2',
                dialogue: [
                  { speaker: 'Дядя Бен', text: 'Питер. Запомни одну вещь. С великой силой приходит великая ответственность.' },
                  { speaker: 'Питер', text: 'Да, дядя Бен.' },
                ],
                bg: '#2a1a0a',
              },
              {
                id: 'sm-1-p4-3',
                narration: 'Питер не знал, что это последние слова, которые он услышит от дяди.',
                bg: '#0a0a0a',
              },
            ],
          },
        ],
      },
      {
        id: 'sm-2',
        number: 2,
        title: 'The Chameleon Strikes!',
        description: 'Первый злодей Человека-паука — Хамелеон.',
        cover: 'https://picsum.photos/seed/spiderman-2/300/450',
        pages: [
          {
            id: 'sm-2-p1',
            panels: [
              {
                id: 'sm-2-p1-1',
                narration: 'Нью-Йорк. Человек-паук патрулирует город.',
                bg: '#0a1a3a',
              },
              {
                id: 'sm-2-p1-2',
                dialogue: [
                  { speaker: 'Паук', text: 'Чутьё паука... что-то не так.' },
                ],
                bg: '#0a1a3a',
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'spawn',
    title: 'Spawn',
    publisher: 'Image Comics',
    genres: ['Мистика', 'Тёмные супергерои'],
    description: 'Эл Симмонс — бывший секретный агент ЦРУ, убитый и отправленный в ад. Заключив сделку с дьяволом, он возвращается как Спаун — воин ада. Но у него есть своя цель.',
    cover: 'https://picsum.photos/seed/spawn-cover/300/450',
    accent: '#33cc33',
    issues: [
      {
        id: 'spawn-1',
        number: 1,
        title: 'Spawn',
        description: 'Эл Симмонс возвращается из ада.',
        cover: 'https://picsum.photos/seed/spawn-1/300/450',
        pages: [
          {
            id: 'spawn-1-p1',
            panels: [
              {
                id: 'spawn-1-p1-1',
                narration: 'Ад. Эл Симмонс горит.',
                bg: '#2a0a0a',
              },
              {
                id: 'spawn-1-p1-2',
                dialogue: [
                  { speaker: 'Малеболгия', text: 'Тебе нравится гореть, Симмонс? Ты будешь гореть вечно... если только не заключишь со мной сделку.' },
                  { speaker: 'Эл', text: 'Что... что ты хочешь?' },
                ],
                bg: '#3a0a0a',
              },
              {
                id: 'spawn-1-p1-3',
                dialogue: [
                  { speaker: 'Малеболгия', text: 'Твою душу — в мою армию. Взамен — возвращение на Землю. Увидишь свою Венди снова.' },
                ],
                bg: '#2a0a0a',
              },
            ],
          },
          {
            id: 'spawn-1-p2',
            panels: [
              {
                id: 'spawn-1-p2-1',
                narration: 'Нью-Йорк. Тёмный переулок. Нечто появляется из тени.',
                bg: '#0a0a0a',
              },
              {
                id: 'spawn-1-p2-2',
                action: 'ВЖУХ!',
                narration: 'Плащ — живой. Цепи — живые. Это — Спаун.',
                bg: '#0a0a0a',
              },
              {
                id: 'spawn-1-p2-3',
                dialogue: [
                  { speaker: 'Спаун', text: 'Эл... Симмонс. Я помню это имя. Я... кто я теперь?' },
                ],
                bg: '#0a1a0a',
              },
            ],
          },
          {
            id: 'spawn-1-p3',
            panels: [
              {
                id: 'spawn-1-p3-1',
                dialogue: [
                  { speaker: 'Когльостро', text: 'Ты — Спаун. Воин ада. Но ты можешь выбрать свой путь.' },
                  { speaker: 'Спаун', text: 'Кто ты такой?' },
                  { speaker: 'Когльостро', text: 'Тот, кто знает о твоей ситуации больше, чем ты думаешь.' },
                ],
                bg: '#0a1a0a',
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'x-men',
    title: 'X-Men',
    publisher: 'Marvel Comics',
    genres: ['Супергерои', 'Фантастика'],
    description: 'Мутанты — следующая ступень эволюции человека. Профессор Чарльз Ксавье собрал команду молодых мутантов, чтобы показать миру: они не враги.',
    cover: 'https://picsum.photos/seed/xmen-cover/300/450',
    accent: '#ffcc00',
    issues: [
      {
        id: 'xm-1',
        number: 1,
        title: 'X-Men!',
        description: 'Первое появление Людей Икс и Магнето.',
        cover: 'https://picsum.photos/seed/xmen-1/300/450',
        pages: [
          {
            id: 'xm-1-p1',
            panels: [
              {
                id: 'xm-1-p1-1',
                narration: 'Школа Ксавье для одарённых юношей. На самом деле — база Людей Икс.',
                bg: '#1a1a3a',
              },
              {
                id: 'xm-1-p1-2',
                dialogue: [
                  { speaker: 'Профессор Икс', text: 'Сегодня к нам присоединяется новый ученик. Мисс Жан Грей. Прошу любить и жаловать.' },
                  { speaker: 'Циклоп', text: 'Добро пожаловать, Жан.' },
                ],
                bg: '#1a1a3a',
              },
            ],
          },
          {
            id: 'xm-1-p2',
            panels: [
              {
                id: 'xm-1-p2-1',
                narration: 'Тревога! Магнето атакует базу ВВС.',
                bg: '#2a0a0a',
              },
              {
                id: 'xm-1-p2-2',
                dialogue: [
                  { speaker: 'Профессор Икс', text: 'Люди Икс! Магнето объявил войну человечеству. Остановить его — наш долг.' },
                  { speaker: 'Зверь', text: 'Понял, профессор.' },
                ],
                bg: '#2a0a0a',
              },
              {
                id: 'xm-1-p2-3',
                dialogue: [
                  { speaker: 'Магнето', text: 'Мутанты — высшая раса. Люди — прошлое. Я строю будущее!' },
                  { speaker: 'Циклоп', text: 'Ты строишь тюрьму для всех — и для людей, и для мутантов!' },
                ],
                bg: '#2a0a2a',
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'iron-man',
    title: 'Iron Man',
    publisher: 'Marvel Comics',
    genres: ['Супергерои', 'Технологии'],
    description: 'Тони Старк — гений, миллиардер, плейбой, филантроп. После плена в Афганистане он создаёт железный костюм и становится Железным Человеком.',
    cover: 'https://picsum.photos/seed/ironman-cover/300/450',
    accent: '#cc3300',
    issues: [
      {
        id: 'im-1',
        number: 1,
        title: 'Iron Man is Born!',
        description: 'Тони Старк создаёт первый железный костюм.',
        cover: 'https://picsum.photos/seed/ironman-1/300/450',
        pages: [
          {
            id: 'im-1-p1',
            panels: [
              {
                id: 'im-1-p1-1',
                narration: 'Афганистан. Тони Старк захвачен в плен.',
                bg: '#2a1a0a',
              },
              {
                id: 'im-1-p1-2',
                dialogue: [
                  { speaker: 'Йинсен', text: 'Тони. Нас заставят делать оружие для них. Но я знаю другой путь.' },
                  { speaker: 'Тони', text: 'Что ты имеешь в виду?' },
                  { speaker: 'Йинсен', text: 'Костюм. Из того, что здесь есть. Это — наш выход.' },
                ],
                bg: '#2a1a0a',
              },
            ],
          },
          {
            id: 'im-1-p2',
            panels: [
              {
                id: 'im-1-p2-1',
                action: 'БОООМ!',
                narration: 'Железный костюм Mark I пробивает стену лагеря.',
                bg: '#3a1a0a',
              },
              {
                id: 'im-1-p2-2',
                dialogue: [
                  { speaker: 'Тони', text: 'Йинсен, уходим! ЙИНСЕН!' },
                ],
                bg: '#3a1a0a',
              },
              {
                id: 'im-1-p2-3',
                narration: 'Йинсен погибает. Тони улетает один. Он никогда не забудет этого.',
                bg: '#0a0a0a',
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 'thor',
    title: 'Thor',
    publisher: 'Marvel Comics',
    genres: ['Мифология', 'Супергерои'],
    description: 'Тор — бог грома из Асгарда. За высокомерие изгнанный отцом Одином на Землю без своих сил, он учится скромности и становится настоящим героем.',
    cover: 'https://picsum.photos/seed/thor-cover/300/450',
    accent: '#3366cc',
    issues: [
      {
        id: 'thor-1',
        number: 1,
        title: 'The Mighty Thor!',
        description: 'Тор изгнан на Землю.',
        cover: 'https://picsum.photos/seed/thor-1/300/450',
        pages: [
          {
            id: 'thor-1-p1',
            panels: [
              {
                id: 'thor-1-p1-1',
                narration: 'Асгард. Трон Одина.',
                bg: '#1a1a3a',
              },
              {
                id: 'thor-1-p1-2',
                dialogue: [
                  { speaker: 'Один', text: 'Тор. Ты высокомерен и безрассуден. Ты недостоин Мьёльнира. Я лишаю тебя сил и отправляю на Землю — учиться смирению!' },
                  { speaker: 'Тор', text: 'Отец, нет! Я—' },
                ],
                bg: '#1a1a3a',
              },
            ],
          },
          {
            id: 'thor-1-p2',
            panels: [
              {
                id: 'thor-1-p2-1',
                narration: 'Нью-Мексико. Тор падает с неба.',
                bg: '#2a1a0a',
              },
              {
                id: 'thor-1-p2-2',
                dialogue: [
                  { speaker: 'Джейн Фостер', text: 'Эрик, мы его сбили! Скорая помощь!' },
                  { speaker: 'Тор', text: 'Я... я Тор, сын Одина... где я?' },
                ],
                bg: '#2a1a0a',
              },
            ],
          },
        ],
      },
    ],
  },
];

export function getSeries(id: string): Series | undefined {
  return ALL_SERIES.find((s) => s.id === id);
}

export function getIssue(seriesId: string, issueId: string): Issue | undefined {
  return getSeries(seriesId)?.issues.find((i) => i.id === issueId);
}
