import { Link } from 'react-router-dom';
import { SourceBadge } from './SourceBadge';

type Source = 'comic_vine' | 'archive' | 'xkcd';

interface Props {
  href: string;
  title: string;
  imageUrl: string | null;
  subtitle?: string;
  source: Source;
}

export function ComicCard({ href, title, imageUrl, subtitle, source }: Props) {
  return (
    <Link to={href} className="comic-card-link">
      <article className="comic-card">
        <div className="comic-card-cover">
          {imageUrl ? (
            <img src={imageUrl} alt={title} loading="lazy" />
          ) : (
            <div className="comic-card-placeholder">📚</div>
          )}
          <div className="comic-card-badge">
            <SourceBadge source={source} />
          </div>
        </div>
        <div className="comic-card-info">
          <h3 className="comic-card-title">{title}</h3>
          {subtitle && <p className="comic-card-sub">{subtitle}</p>}
        </div>
      </article>
    </Link>
  );
}
