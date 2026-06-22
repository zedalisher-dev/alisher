import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArchiveItem } from '../lib/api/archive';
import type { ArchiveItem } from '../lib/api/archive';
import { ArchiveReader } from '../components/archive/ArchiveReader';
import { FavoriteButton } from '../components/ui/FavoriteButton';
import { LegalNotice } from '../components/ui/LegalNotice';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { recordHistory } from '../lib/db/history';
import { truncate } from '../lib/utils';
import { AiChat } from '../components/ui/AiChat';

export function ReadItemPage() {
  const { identifier } = useParams<{ identifier: string }>();
  const [item, setItem] = useState<ArchiveItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!identifier) return;
    setLoading(true);
    setError('');
    getArchiveItem(identifier)
      .then((r) => {
        setItem(r.item);
        recordHistory({
          source_type: 'archive',
          source_id: identifier,
          title: r.item.title,
          image_url: r.item.thumbUrl,
        });
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [identifier]);

  if (loading) return (
    <div className="page-container">
      <div className="skeleton skeleton-detail-cover" style={{ height: 300 }} />
    </div>
  );

  if (error) return <div className="page-container"><ErrorMessage message={error} /></div>;
  if (!item) return null;

  return (
    <div className="page-container">
      <Link to="/read" className="back-btn ghost">← Назад</Link>

      <div className="detail-layout">
        <div className="detail-cover">
          <img src={item.thumbUrl} alt={item.title}
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
        </div>

        <div className="detail-info">
          <p className="detail-meta">
            {[item.creator, item.year].filter(Boolean).join(' · ')}
          </p>
          <h1 className="detail-title">{item.title}</h1>

          {item.subject.length > 0 && (
            <div className="detail-subjects">
              {item.subject.slice(0, 5).map((s) => (
                <span key={s} className="genre-tag">{s}</span>
              ))}
            </div>
          )}

          {item.description && (
            <p className="detail-desc">{truncate(item.description, 400)}</p>
          )}

          <div className="detail-actions">
            <FavoriteButton
              source_type="archive"
              source_id={item.identifier}
              title={item.title}
              image_url={item.thumbUrl}
              detail_url={`/read/${item.identifier}`}
            />
            <a
              href={`https://archive.org/details/${item.identifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              На Archive.org ↗
            </a>
          </div>

          {!item.hasReadableFiles && (
            <p className="archive-no-files">
              ⚠️ Файлы для чтения не найдены или недоступны.
            </p>
          )}
        </div>
      </div>

      {item.hasReadableFiles && (
        <ArchiveReader files={item.files} title={item.title} />
      )}

      <LegalNotice source="archive" />
      <AiChat context={`Комикс: ${item.title}. ${item.description ? item.description.slice(0, 300) : ''}`} />
    </div>
  );
}
