import type { Comic } from '../lib/marvel';
import { getThumbnailUrl } from '../lib/marvel';

interface Props {
  comic: Comic;
  onClick: (comic: Comic) => void;
}

export function ComicCard({ comic, onClick }: Props) {
  const img = getThumbnailUrl(comic);

  return (
    <article className="comic-card" onClick={() => onClick(comic)}>
      <div className="comic-cover">
        <img
          src={img}
          alt={comic.title}
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
      <div className="comic-info">
        <p className="comic-series">{comic.series.name}</p>
        <h3 className="comic-title">{comic.title}</h3>
        {comic.pageCount > 0 && (
          <p className="comic-pages">{comic.pageCount} стр.</p>
        )}
      </div>
    </article>
  );
}
