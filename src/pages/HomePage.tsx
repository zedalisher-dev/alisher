import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

const SOURCES = [
  {
    to: '/explore',
    icon: '🗃️',
    title: 'Comic Vine',
    subtitleKey: 'home.comicVine.subtitle',
    descKey: 'home.comicVine.desc',
    badge: 'source-badge--comic-vine',
    badgeKey: 'home.comicVine.badge',
  },
  {
    to: '/read',
    icon: '📖',
    titleKey: 'home.reader.title',
    subtitleKey: 'home.reader.subtitle',
    descKey: 'home.reader.desc',
    badge: 'source-badge--archive',
    badgeKey: 'home.reader.badge',
  },
  {
    to: '/xkcd',
    icon: '😄',
    title: 'xkcd',
    subtitleKey: 'home.xkcd.subtitle',
    descKey: 'home.xkcd.desc',
    badge: 'source-badge--xkcd',
    badgeKey: 'home.xkcd.badge',
  },
] as const;

export function HomePage() {
  const { t } = useLanguage();

  return (
    <div className="page-container">
      <section className="hero">
        <h1 className="hero-title">Comics Geek</h1>
        <p className="hero-subtitle">{t('home.subtitle')}</p>
      </section>

      <div className="hero-cards">
        {SOURCES.map((s) => (
          <Link key={s.to} to={s.to} className="hero-card">
            <div className="hero-card-icon">{s.icon}</div>
            <div className="hero-card-body">
              <div className="hero-card-header">
                <h2 className="hero-card-title">{'titleKey' in s ? t(s.titleKey) : s.title}</h2>
                <span className={`source-badge ${s.badge}`}>{t(s.badgeKey)}</span>
              </div>
              <p className="hero-card-sub">{t(s.subtitleKey)}</p>
              <p className="hero-card-desc">{t(s.descKey)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
