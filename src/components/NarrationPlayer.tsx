import { useEffect, useRef, useState } from 'react';
import type { Issue } from '../lib/comics';
import type { VoiceSegment } from '../lib/voice';
import { speakSegments, stopSpeech } from '../lib/voice';
import { generateNarration } from '../lib/narration';

interface Props {
  issue: Issue;
  seriesTitle: string;
  accent: string;
}

export function NarrationPlayer({ issue, seriesTitle, accent }: Props) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'playing' | 'paused' | 'done'>('idle');
  const [segments, setSegments] = useState<VoiceSegment[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [error, setError] = useState('');
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      stopSpeech();
      abortRef.current?.abort();
    };
  }, []);

  async function handlePlay() {
    setError('');

    if (status === 'playing') {
      stopSpeech();
      abortRef.current?.abort();
      setStatus('paused');
      return;
    }

    let segs = segments;

    if (segs.length === 0 || status === 'idle') {
      setStatus('loading');
      try {
        segs = await generateNarration(issue, seriesTitle);
        setSegments(segs);
      } catch (e) {
        setError('Не удалось создать озвучку. Попробуй ещё раз.');
        setStatus('idle');
        return;
      }
    }

    const startFrom = status === 'paused' ? Math.max(0, currentIndex) : 0;
    setCurrentIndex(startFrom);
    setStatus('playing');

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    await speakSegments(
      segs.slice(startFrom),
      (i, _seg) => setCurrentIndex(startFrom + i),
      ctrl.signal,
    );

    if (!ctrl.signal.aborted) {
      setStatus('done');
      setCurrentIndex(-1);
    }
  }

  function handleStop() {
    stopSpeech();
    abortRef.current?.abort();
    setStatus('idle');
    setCurrentIndex(-1);
    setSegments([]);
  }

  const current = currentIndex >= 0 ? segments[currentIndex] : null;

  const btnLabel =
    status === 'loading' ? '⌛ Генерация...'
    : status === 'playing' ? '⏸ Пауза'
    : status === 'paused' ? '▶ Продолжить'
    : status === 'done' ? '▶ Сначала'
    : '▶ Запустить озвучку';

  return (
    <div className="narration-player">
      <div className="narration-controls">
        <button
          className="narration-play"
          style={{ background: accent, color: '#000' }}
          onClick={handlePlay}
          disabled={status === 'loading'}
        >
          {btnLabel}
        </button>
        {(status === 'playing' || status === 'paused') && (
          <button className="narration-stop ghost" onClick={handleStop}>
            ⏹ Стоп
          </button>
        )}
      </div>

      {error && <p className="narration-error">{error}</p>}

      {current && (
        <div className="narration-display">
          {current.type === 'dialogue' && (
            <span className="narration-speaker" style={{ color: accent }}>
              {current.speaker}:
            </span>
          )}
          {current.type === 'narration' && (
            <span className="narration-narrator">📖</span>
          )}
          {current.type === 'action' && (
            <span className="narration-narrator">💥</span>
          )}
          <p className="narration-text">{current.text}</p>
        </div>
      )}

      {segments.length > 0 && (
        <p className="narration-progress">
          {currentIndex + 1} / {segments.length}
        </p>
      )}

      <p className="narration-hint">
        ИИ-пересказ озвучивается голосами персонажей через браузер
      </p>
    </div>
  );
}
