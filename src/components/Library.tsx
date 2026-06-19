import type { Series } from '../lib/comics';
import { ALL_SERIES } from '../lib/comics';

interface Props {
  onSelect: (series: Series) => void;
}

export function Library({ onSelect }: Props) {
  return (
    <div className="library">
      <h2 className="section-title">Все серии</h2>
      <div className="series-grid">
        {ALL_SERIES.map((s) => (
          <article
            key={s.id}
            className="series-card"
            style={{ '--accent': s.accent } as React.CSSProperties}
            onClick={() => onSelect(s)}
          >
            <div className="series-cover">
              <img src={s.cover} alt={s.title} loading="lazy" />
              <div className="series-overlay">
                <span className="series-publisher">{s.publisher}</span>
              </div>
            </div>
            <div className="series-info">
              <h3>{s.title}</h3>
              <div className="series-genres">
                {s.genres.map((g) => (
                  <span key={g} className="genre-tag">{g}</span>
                ))}
              </div>
              <p className="series-desc">{s.description}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
