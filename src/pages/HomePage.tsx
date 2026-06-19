import { Link } from 'react-router-dom';

const SOURCES = [
  {
    to: '/explore',
    icon: '🗃️',
    title: 'Comic Vine',
    subtitle: 'Поиск метаданных',
    desc: 'Персонажи, выпуски, серии и издатели из крупнейшей базы данных комиксов.',
    badge: 'source-badge--comic-vine',
    badgeLabel: 'Только метаданные',
  },
  {
    to: '/read',
    icon: '📖',
    title: 'Читалка',
    subtitle: 'Публичный архив',
    desc: 'Читай комиксы в открытом доступе из Internet Archive — PDF, изображения, текст.',
    badge: 'source-badge--archive',
    badgeLabel: 'Публичный доступ',
  },
  {
    to: '/xkcd',
    icon: '😄',
    title: 'xkcd',
    subtitle: 'Демо-режим',
    desc: 'Веб-комикс xkcd — научный юмор, математика и жизнь программиста.',
    badge: 'source-badge--xkcd',
    badgeLabel: 'Веб-комикс',
  },
];

export function HomePage() {
  return (
    <div className="page-container">
      <section className="hero">
        <h1 className="hero-title">Comics Geek</h1>
        <p className="hero-subtitle">
          Ищи комиксы. Читай публичный архив. Смотри xkcd.
        </p>
      </section>

      <div className="hero-cards">
        {SOURCES.map((s) => (
          <Link key={s.to} to={s.to} className="hero-card">
            <div className="hero-card-icon">{s.icon}</div>
            <div className="hero-card-body">
              <div className="hero-card-header">
                <h2 className="hero-card-title">{s.title}</h2>
                <span className={`source-badge ${s.badge}`}>{s.badgeLabel}</span>
              </div>
              <p className="hero-card-sub">{s.subtitle}</p>
              <p className="hero-card-desc">{s.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
