import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getCVDetail } from '../lib/api/comicvine';
import type { CVItem, CVVolume, CVIssue } from '../lib/api/comicvine';
import { FavoriteButton } from '../components/ui/FavoriteButton';
import { LegalNotice } from '../components/ui/LegalNotice';
import { ErrorMessage } from '../components/ui/ErrorMessage';
import { formatDate, truncate } from '../lib/utils';
import { AiChat } from '../components/ui/AiChat';

export function ExploreDetailPage() {
  const { type, id } = useParams<{ type: string; id: string }>();
  const [item, setItem] = useState<CVItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id || !type) return;
    setLoading(true);
    setError('');
    getCVDetail(Number(id), type as 'volume' | 'issue')
      .then((r) => setItem(r.item))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, type]);

  if (loading) return (
    <div className="page-container">
      <div className="detail-layout skeleton-detail">
        <div className="skeleton skeleton-detail-cover" />
        <div className="skeleton-lines">
          <div className="skeleton skeleton-line" />
          <div className="skeleton skeleton-line skeleton-line--short" />
        </div>
      </div>
    </div>
  );

  if (error) return <div className="page-container"><ErrorMessage message={error} /></div>;
  if (!item) return null;

  const isVolume = item.type === 'volume';
  const vol = item as CVVolume;
  const iss = item as CVIssue;
  const cvUrl = isVolume
    ? `https://comicvine.gamespot.com/search/?q=${encodeURIComponent(item.type === 'volume' ? vol.name : '')}`
    : `https://comicvine.gamespot.com/search/?q=${encodeURIComponent(iss.volumeName)}`;

  return (
    <div className="page-container">
      <Link to="/explore" className="back-btn ghost">← Назад</Link>

      <div className="detail-layout">
        <div className="detail-cover">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={isVolume ? vol.name : iss.name ?? ''} />
          ) : (
            <div className="detail-cover-placeholder">📚</div>
          )}
        </div>

        <div className="detail-info">
          <p className="detail-meta">
            {isVolume ? `Серия · ${vol.publisher ?? ''} ${vol.year ? `· ${vol.year}` : ''}` : `Выпуск #${iss.issueNumber} · ${iss.volumeName}`}
          </p>
          <h1 className="detail-title">
            {isVolume ? vol.name : (iss.name ?? `Выпуск #${iss.issueNumber}`)}
          </h1>

          {isVolume && vol.issueCount > 0 && (
            <p className="detail-stat">{vol.issueCount} выпусков</p>
          )}
          {!isVolume && iss.coverDate && (
            <p className="detail-stat">{formatDate(iss.coverDate)}</p>
          )}

          {(item.deck || item.description) && (
            <p className="detail-desc">{truncate(item.deck || item.description, 600)}</p>
          )}

          <div className="detail-actions">
            <FavoriteButton
              source_type="comic_vine"
              source_id={String(item.id)}
              title={isVolume ? vol.name : (iss.name ?? `#${iss.issueNumber}`)}
              image_url={item.imageUrl}
              detail_url={`/explore/${type}/${id}`}
            />
            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              Открыть на Comic Vine ↗
            </a>
          </div>
        </div>
      </div>

      <LegalNotice source="comic_vine" />
      <AiChat context={`Комикс: ${isVolume ? vol.name : iss.name ?? ''}. Издатель: ${isVolume ? vol.publisher ?? '' : iss.volumeName}. ${truncate(item.deck || item.description, 300)}`} />
    </div>
  );
}
