import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getNewsPost } from '../lib/db/news';
import type { NewsPost } from '../lib/db/news';
import { SpeakButton } from '../components/ui/SpeakButton';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

export function NewsPostPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<NewsPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getNewsPost(id)
      .then(setPost)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="page-container"><p className="empty">Загрузка…</p></div>;
  if (error) return <div className="page-container"><p className="empty" style={{ color: 'var(--error)' }}>{error}</p></div>;
  if (!post) return null;

  return (
    <div className="page-container">
      <Link to="/news" className="back-link">← Все новости</Link>

      {post.cover_url && (
        <div className="news-post-cover">
          <img src={post.cover_url} alt={post.title} />
        </div>
      )}

      <div className="news-post-meta">
        <span className="news-card-date">{formatDate(post.published_at)}</span>
      </div>

      <div className="news-post-title-row">
        <h1 className="news-post-title">{post.title}</h1>
        <SpeakButton text={post.title + '. ' + post.body} />
      </div>

      <div className="news-post-body">
        {post.body.split('\n').map((line, i) =>
          line.trim() === '' ? <br key={i} /> : <p key={i}>{line}</p>
        )}
      </div>
    </div>
  );
}
