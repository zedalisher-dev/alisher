import { useState, useEffect } from 'react';
import { XkcdViewer } from '../components/xkcd/XkcdViewer';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { getXkcd, getRandomXkcd } from '../lib/api/xkcd';
import type { XkcdComic } from '../lib/api/xkcd';

export function XkcdPage() {
  const [comic, setComic] = useState<XkcdComic | null>(null);
  const [latestNum, setLatestNum] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [jumpInput, setJumpInput] = useState('');

  function load(num?: number) {
    setLoading(true);
    setError('');
    getXkcd(num)
      .then((r) => { setComic(r.comic); setLatestNum(r.latestNum); })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }

  function loadRandom() {
    setLoading(true);
    setError('');
    getRandomXkcd()
      .then((r) => { setComic(r.comic); setLatestNum(r.latestNum); })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => { load(); }, []);

  function handleJump(e: React.FormEvent) {
    e.preventDefault();
    const n = parseInt(jumpInput, 10);
    if (!isNaN(n) && n > 0) load(n);
  }

  return (
    <div className="page-container">
      <div className="xkcd-controls">
        <h1 className="page-title">xkcd</h1>
        <div className="xkcd-control-row">
          <button className="btn-secondary" onClick={() => load()}>Последний</button>
          <button className="btn-secondary" onClick={loadRandom}>🎲 Случайный</button>
          <form onSubmit={handleJump} className="xkcd-jump">
            <input
              type="number"
              min={1}
              max={latestNum || undefined}
              placeholder="Номер"
              value={jumpInput}
              onChange={(e) => setJumpInput(e.target.value)}
              className="xkcd-jump-input"
            />
            <button type="submit" className="btn-primary">→</button>
          </form>
        </div>
      </div>

      {error && <ErrorMessage message={error} onRetry={() => load()} />}

      {loading && <p className="empty">Загрузка…</p>}

      {!loading && comic && (
        <XkcdViewer comic={comic} latestNum={latestNum} onLoadNum={load} />
      )}
    </div>
  );
}
