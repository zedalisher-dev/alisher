import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { XkcdComic } from '../../lib/api/xkcd';
import { FavoriteButton } from '../ui/FavoriteButton';
import { SpeakButton } from '../ui/SpeakButton';

interface Props {
  comic: XkcdComic;
  latestNum: number;
  onLoadNum?: (n: number) => void;
}

export function XkcdViewer({ comic, latestNum, onLoadNum }: Props) {
  const [showExplain, setShowExplain] = useState(false);
  const navigate = useNavigate();

  function go(n: number) {
    if (onLoadNum) onLoadNum(n);
    else navigate(`/xkcd/${n}`);
  }

  return (
    <div className="xkcd-viewer">
      <div className="xkcd-header">
        <h2 className="xkcd-title">#{comic.num}: {comic.title}</h2>
        <p className="xkcd-date">{comic.year}-{comic.month.padStart(2, '0')}-{comic.day.padStart(2, '0')}</p>
      </div>

      <div className="xkcd-img-wrap">
        <img src={comic.img} alt={comic.title} className="xkcd-img" />
      </div>

      {comic.alt && (
        <p className="xkcd-alt" title="Alt text">
          <em>Alt: {comic.alt}</em>
        </p>
      )}

      <div className="xkcd-actions">
        <button className="btn-secondary" onClick={() => setShowExplain((v) => !v)}>
          {showExplain ? 'Скрыть объяснение' : '💡 Объяснить шутку'}
        </button>
        <SpeakButton text={`xkcd номер ${comic.num}: ${comic.title}. ${comic.alt}`} lang="ru-RU" />
        <FavoriteButton
          source_type="xkcd"
          source_id={String(comic.num)}
          title={`xkcd #${comic.num}: ${comic.title}`}
          image_url={comic.img}
          detail_url={`/xkcd/${comic.num}`}
        />
        <a href={`https://xkcd.com/${comic.num}/`} target="_blank" rel="noopener noreferrer"
          className="btn-secondary">
          xkcd.com ↗
        </a>
      </div>

      {showExplain && (
        <div className="xkcd-explain">
          <h3>Расшифровка</h3>
          {comic.transcript ? (
            <pre className="xkcd-transcript">{comic.transcript}</pre>
          ) : (
            <p>
              Полный текст отсутствует. Откройте{' '}
              <a href={`https://explainxkcd.com/${comic.num}/`} target="_blank" rel="noopener noreferrer">
                explainxkcd.com
              </a>{' '}
              для подробного объяснения.
            </p>
          )}
        </div>
      )}

      <div className="reader-nav xkcd-nav">
        <button className="nav-btn" disabled={comic.num <= 1} onClick={() => go(comic.num - 1)}>← Пред</button>
        <span className="page-counter">#{comic.num} / #{latestNum}</span>
        <button className="nav-btn" disabled={comic.num >= latestNum} onClick={() => go(comic.num + 1)}>След →</button>
      </div>
    </div>
  );
}
