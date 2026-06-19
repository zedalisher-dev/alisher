import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserFavorites } from '../lib/db/favorites';
import { getUserHistory } from '../lib/db/history';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { SourceBadge } from '../components/ui/SourceBadge';

type Tab = 'favorites' | 'history';

interface LibraryRow {
  id: string;
  source_type: 'comic_vine' | 'archive' | 'xkcd';
  source_id: string;
  title: string;
  image_url: string | null;
  detail_url?: string;
}

function detailUrl(row: LibraryRow): string {
  if (row.detail_url) return row.detail_url;
  if (row.source_type === 'archive') return `/read/${row.source_id}`;
  if (row.source_type === 'xkcd') return `/xkcd/${row.source_id}`;
  return '/explore';
}

export function LibraryPage() {
  const { user, openAuthModal } = useAuth();
  const [tab, setTab] = useState<Tab>('favorites');
  const [favorites, setFavorites] = useState<LibraryRow[]>([]);
  const [history, setHistory] = useState<LibraryRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    setError('');
    Promise.all([getUserFavorites(), getUserHistory()])
      .then(([favs, hist]) => {
        setFavorites(favs as LibraryRow[]);
        setHistory(hist as LibraryRow[]);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <div className="page-container">
        <div className="auth-required">
          <p className="auth-required-icon">🔐</p>
          <h2>Войдите, чтобы открыть библиотеку</h2>
          <p>Здесь хранятся ваши избранные комиксы и история просмотров.</p>
          <button className="btn-primary" onClick={openAuthModal}>Войти</button>
        </div>
      </div>
    );
  }

  const rows = tab === 'favorites' ? favorites : history;

  return (
    <div className="page-container">
      <h1 className="page-title">Моя библиотека</h1>

      <div className="filter-tabs">
        <button className={'filter-tab' + (tab === 'favorites' ? ' active' : '')} onClick={() => setTab('favorites')}>
          ♥ Избранное ({favorites.length})
        </button>
        <button className={'filter-tab' + (tab === 'history' ? ' active' : '')} onClick={() => setTab('history')}>
          🕐 История ({history.length})
        </button>
      </div>

      {error && <ErrorMessage message={error} />}
      {loading && <p className="empty">Загрузка…</p>}

      {!loading && rows.length === 0 && (
        <div className="empty-state">
          <p>{tab === 'favorites' ? 'Избранных комиксов пока нет' : 'История просмотров пуста'}</p>
          <Link to="/explore" className="btn-primary" style={{ display: 'inline-block', marginTop: 12 }}>
            Исследовать комиксы
          </Link>
        </div>
      )}

      {!loading && rows.length > 0 && (
        <div className="library-list">
          {rows.map((row) => (
            <Link key={row.id} to={detailUrl(row)} className="library-item">
              <div className="library-item-thumb">
                {row.image_url
                  ? <img src={row.image_url} alt={row.title} />
                  : <div className="library-item-placeholder">📚</div>
                }
              </div>
              <div className="library-item-body">
                <SourceBadge source={row.source_type} />
                <p className="library-item-title">{row.title}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
