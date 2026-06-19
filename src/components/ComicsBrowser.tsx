import { useEffect, useRef, useState } from 'react';
import type { Comic } from '../lib/marvel';
import { fetchComics, getThumbnailUrl } from '../lib/marvel';
import { ComicCard } from './ComicCard';

const PUBLISHERS = ['Все', 'Marvel', 'DC', 'Image', 'Manga'];

export function ComicsBrowser() {
  const [comics, setComics] = useState<Comic[]>([]);
  const [query, setQuery] = useState('');
  const [publisher, setPublisher] = useState('Все');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState<Comic | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function load(q: string) {
    setLoading(true);
    setError('');
    fetchComics(q)
      .then(setComics)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load('');
  }, []);

  function handleSearch(value: string) {
    setQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => load(value), 400);
  }

  const filtered =
    publisher === 'Все'
      ? comics
      : comics.filter((c) => c.publisher === publisher);

  return (
    <div className="browser">
      <h2 className="section-title">Все комиксы</h2>

      <div className="browser-controls">
        <div className="search-bar">
          <svg className="search-icon" viewBox="0 0 20 20" fill="none">
            <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="2" />
            <path d="m14 14 3 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            placeholder="Поиск по названию, серии или издателю…"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        <div className="publisher-tabs">
          {PUBLISHERS.map((p) => (
            <button
              key={p}
              className={'pub-tab' + (publisher === p ? ' active' : '')}
              onClick={() => setPublisher(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {error && <p className="message">{error}</p>}

      {loading ? (
        <p className="empty">Загрузка…</p>
      ) : filtered.length === 0 ? (
        <p className="empty">Ничего не найдено</p>
      ) : (
        <>
          <p className="results-count">{filtered.length} комиксов</p>
          <div className="comics-grid">
            {filtered.map((comic) => (
              <ComicCard key={comic.id} comic={comic} onClick={setSelected} />
            ))}
          </div>
        </>
      )}

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close ghost" onClick={() => setSelected(null)}>
              ✕
            </button>
            <div className="modal-body">
              <div className="modal-cover">
                <img src={getThumbnailUrl(selected)} alt={selected.title} />
              </div>
              <div className="modal-details">
                {selected.publisher && (
                  <p className="modal-publisher">{selected.publisher}</p>
                )}
                <p className="modal-series">{selected.series.name}</p>
                <h2>{selected.title}</h2>
                {selected.pageCount > 0 && (
                  <p className="modal-pages">{selected.pageCount} стр.</p>
                )}
                <p className="modal-desc">
                  {selected.description || 'Описание недоступно.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
