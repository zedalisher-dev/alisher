import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { XkcdViewer } from '../components/xkcd/XkcdViewer';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { getXkcd } from '../lib/api/xkcd';
import type { XkcdComic } from '../lib/api/xkcd';

export function XkcdNumPage() {
  const { num } = useParams<{ num: string }>();
  const [comic, setComic] = useState<XkcdComic | null>(null);
  const [latestNum, setLatestNum] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const n = parseInt(num ?? '', 10);
    if (isNaN(n)) { setError('Неверный номер комикса'); setLoading(false); return; }
    setLoading(true);
    setError('');
    getXkcd(n)
      .then((r) => { setComic(r.comic); setLatestNum(r.latestNum); })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [num]);

  if (loading) return <div className="page-container"><p className="empty">Загрузка…</p></div>;
  if (error) return <div className="page-container"><ErrorMessage message={error} /></div>;
  if (!comic) return null;

  return (
    <div className="page-container">
      <XkcdViewer comic={comic} latestNum={latestNum} />
    </div>
  );
}
