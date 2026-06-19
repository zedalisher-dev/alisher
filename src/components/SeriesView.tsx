import type { Series, Issue } from '../lib/comics';

interface Props {
  series: Series;
  onBack: () => void;
  onRead: (issue: Issue) => void;
}

export function SeriesView({ series, onBack, onRead }: Props) {
  return (
    <div className="series-view">
      <button className="back-btn ghost" onClick={onBack}>← Назад</button>

      <div className="series-hero" style={{ '--accent': series.accent } as React.CSSProperties}>
        <img src={series.cover} alt={series.title} className="series-hero-cover" />
        <div className="series-hero-info">
          <span className="series-publisher">{series.publisher}</span>
          <h1>{series.title}</h1>
          <div className="series-genres">
            {series.genres.map((g) => (
              <span key={g} className="genre-tag">{g}</span>
            ))}
          </div>
          <p className="series-hero-desc">{series.description}</p>
          <p className="issues-count">{series.issues.length} выпуск{series.issues.length !== 1 ? 'ов' : ''}</p>
        </div>
      </div>

      <h2 className="section-title">Выпуски</h2>
      <div className="issues-grid">
        {series.issues.map((issue) => (
          <article key={issue.id} className="issue-card" onClick={() => onRead(issue)}>
            <div className="issue-cover">
              <img src={issue.cover} alt={issue.title} loading="lazy" />
              <div className="issue-number">#{issue.number}</div>
            </div>
            <div className="issue-info">
              <h3>{issue.title}</h3>
              <p>{issue.description}</p>
              <button
                className="read-btn"
                style={{ background: series.accent, color: '#000' }}
                onClick={(e) => { e.stopPropagation(); onRead(issue); }}
              >
                Читать
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
