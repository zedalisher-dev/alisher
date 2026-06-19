import { useState, useEffect } from 'react';
import { SearchBar } from '../components/ui/SearchBar';
import { ComicCard } from '../components/ui/ComicCard';
import { LoadingGrid } from '../components/ui/LoadingGrid';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { LegalNotice } from '../components/ui/LegalNotice';
import { useDebounce } from '../hooks/useDebounce';
import { searchCV } from '../lib/api/comicvine';
import type { CVItem } from '../lib/api/comicvine';
import { truncate } from '../lib/utils';

const TYPES = [
  { value: 'volumes', label: 'Серии' },
  { value: 'issues', label: 'Выпуски' },
] as const;

type CVType = 'volumes' | 'issues';

function subtitle(item: CVItem): string {
  if (item.type === 'volume') return item.publisher ?? item.year ?? '';
  return `${item.volumeName} #${item.issueNumber}`;
}

export function ExplorePage() {
  const [query, setQuery] = useState('');
  const [cvType, setCvType] = useState<CVType>('volumes');
  const [results, setResults] = useState<CVItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedQuery.length < 2) { setResults([]); return; }
    setLoading(true);
    setError('');
    searchCV(debouncedQuery, cvType)
      .then((r) => setResults(r.results))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [debouncedQuery, cvType]);

  return (
    <div className="page-container">
      <h1 className="page-title">Поиск комиксов</h1>

      <div className="search-controls">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Введите название, серию или персонажа…"
          autoFocus
        />
        <div className="filter-tabs">
          {TYPES.map((t) => (
            <button
              key={t.value}
              className={'filter-tab' + (cvType === t.value ? ' active' : '')}
              onClick={() => setCvType(t.value)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {error && <ErrorMessage message={error} onRetry={() => setQuery((q) => q)} />}

      {!error && debouncedQuery.length < 2 && !loading && (
        <p className="empty">Введите минимум 2 символа для поиска</p>
      )}

      {loading && <LoadingGrid />}

      {!loading && results.length > 0 && (
        <>
          <p className="results-count">{results.length} результатов</p>
          <div className="comic-grid">
            {results.map((item) => (
              <ComicCard
                key={item.id}
                href={`/explore/${item.type}/${item.id}`}
                title={item.type === 'volume' ? item.name : (item.name ?? `#${(item as { issueNumber: string }).issueNumber}`)}
                imageUrl={item.imageUrl}
                subtitle={truncate(subtitle(item), 40)}
                source="comic_vine"
              />
            ))}
          </div>
        </>
      )}

      {!loading && debouncedQuery.length >= 2 && results.length === 0 && !error && (
        <p className="empty">Ничего не найдено по запросу «{debouncedQuery}»</p>
      )}

      <LegalNotice source="comic_vine" />
    </div>
  );
}
