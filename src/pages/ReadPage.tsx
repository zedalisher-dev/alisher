import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SearchBar } from '../components/ui/SearchBar';
import { LoadingGrid } from '../components/ui/LoadingGrid';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { LegalNotice } from '../components/ui/LegalNotice';
import { SourceBadge } from '../components/ui/SourceBadge';
import { useDebounce } from '../hooks/useDebounce';
import { searchArchive } from '../lib/api/archive';
import type { ArchiveSearchResult } from '../lib/api/archive';
import { truncate } from '../lib/utils';

const DEFAULT_QUERIES = ['golden age comics', 'public domain superhero', 'vintage comics'];

export function ReadPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ArchiveSearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    const q = debouncedQuery.trim() || DEFAULT_QUERIES[0];
    if (debouncedQuery.length > 0 && debouncedQuery.length < 2) return;
    setLoading(true);
    setError('');
    searchArchive(q)
      .then((r) => setResults(r.results))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  return (
    <div className="page-container">
      <h1 className="page-title">Читалка — Открытый архив</h1>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Поиск публичных комиксов…"
      />

      <div className="quick-searches">
        {DEFAULT_QUERIES.map((q) => (
          <button key={q} className="quick-tag" onClick={() => setQuery(q)}>{q}</button>
        ))}
      </div>

      {error && <ErrorMessage message={error} />}
      {loading && <LoadingGrid count={8} />}

      {!loading && results.length > 0 && (
        <div className="archive-list">
          {results.map((item) => (
            <div key={item.identifier} className="archive-card">
              <div className="archive-card-thumb">
                <img src={item.thumbUrl} alt={item.title} loading="lazy"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              </div>
              <div className="archive-card-body">
                <div className="archive-card-header">
                  <SourceBadge source="archive" />
                  {item.year && <span className="archive-card-year">{item.year}</span>}
                </div>
                <h3 className="archive-card-title">{item.title}</h3>
                {item.creator && <p className="archive-card-creator">{item.creator}</p>}
                {item.description && (
                  <p className="archive-card-desc">{truncate(item.description, 200)}</p>
                )}
                <Link to={`/read/${item.identifier}`} className="btn-primary archive-card-btn">
                  Открыть →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && results.length === 0 && !error && debouncedQuery.length >= 2 && (
        <p className="empty">Ничего не найдено</p>
      )}

      <LegalNotice source="archive" />
    </div>
  );
}
