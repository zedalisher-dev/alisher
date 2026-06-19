import { useState } from 'react';
import type { Issue, Page } from '../lib/comics';
import { NarrationPlayer } from './NarrationPlayer';

interface Props {
  issue: Issue;
  seriesTitle: string;
  accent: string;
  onBack: () => void;
}

export function Reader({ issue, seriesTitle, accent, onBack }: Props) {
  const [pageIndex, setPageIndex] = useState(0);
  const [showNarration, setShowNarration] = useState(false);

  const page: Page = issue.pages[pageIndex];
  const total = issue.pages.length;

  return (
    <div className="reader">
      <div className="reader-header">
        <button className="back-btn ghost" onClick={onBack}>← Назад</button>
        <div className="reader-title">
          <span className="reader-series">{seriesTitle}</span>
          <span className="reader-issue">#{issue.number} — {issue.title}</span>
        </div>
        <button
          className="narration-btn"
          style={{ background: accent, color: '#000' }}
          onClick={() => setShowNarration((v) => !v)}
        >
          🎙 Озвучка
        </button>
      </div>

      {showNarration && (
        <NarrationPlayer issue={issue} seriesTitle={seriesTitle} accent={accent} />
      )}

      <div className="comic-page">
        {page.panels.map((panel) => (
          <div
            key={panel.id}
            className="comic-panel"
            style={{ background: panel.bg }}
          >
            {panel.narration && (
              <div className="panel-narration">{panel.narration}</div>
            )}
            {panel.dialogue?.map((d, i) => (
              <div key={i} className="panel-bubble">
                <span className="bubble-speaker">{d.speaker}</span>
                <p className="bubble-text">{d.text}</p>
              </div>
            ))}
            {panel.action && (
              <div className="panel-action">{panel.action}</div>
            )}
          </div>
        ))}
      </div>

      <div className="reader-nav">
        <button
          className="nav-btn"
          disabled={pageIndex === 0}
          onClick={() => setPageIndex((i) => i - 1)}
        >
          ← Пред.
        </button>
        <span className="page-counter">{pageIndex + 1} / {total}</span>
        <button
          className="nav-btn"
          disabled={pageIndex === total - 1}
          onClick={() => setPageIndex((i) => i + 1)}
        >
          След. →
        </button>
      </div>
    </div>
  );
}
