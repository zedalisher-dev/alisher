import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getNewsPosts } from '../lib/db/news';
import type { NewsPost } from '../lib/db/news';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function NewsPage() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getNewsPosts()
      .then(setPosts)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="page-container">
      <h1 className="page-title">Новости</h1>

      {error && <p className="empty" style={{ color: 'var(--error)' }}>{error}</p>}
      {loading && <p className="empty">Загрузка…</p>}

      {!loading && posts.length === 0 && (
        <p className="empty">Новостей пока нет — загляните позже.</p>
      )}

      <div className="news-list">
        {posts.map((post) => (
          <Link key={post.id} to={`/news/${post.id}`} className="news-card">
            {post.cover_url && (
              <div className="news-card-cover">
                <img src={post.cover_url} alt={post.title} />
              </div>
            )}
            <div className="news-card-body">
              <p className="news-card-date">{formatDate(post.published_at)}</p>
              <h2 className="news-card-title">{post.title}</h2>
              <p className="news-card-preview">{post.body.slice(0, 160)}{post.body.length > 160 ? '…' : ''}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
