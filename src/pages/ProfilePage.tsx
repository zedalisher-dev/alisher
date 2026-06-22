import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getUserFavorites } from '../lib/db/favorites';
import { getUserHistory } from '../lib/db/history';
import { getUserAttempts } from '../lib/db/quiz';
import type { QuizAttempt } from '../lib/db/quiz';

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
}

function pct(score: number, total: number) {
  if (total === 0) return 0;
  return Math.round((score / total) * 100);
}

export function ProfilePage() {
  const { user, openAuthModal, signOut } = useAuth();
  const [favCount, setFavCount] = useState(0);
  const [histCount, setHistCount] = useState(0);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([getUserFavorites(), getUserHistory(), getUserAttempts()])
      .then(([favs, hist, atts]) => {
        setFavCount(favs.length);
        setHistCount(hist.length);
        setAttempts(atts);
      })
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <div className="page-container">
        <div className="auth-required">
          <p className="auth-required-icon">🔐</p>
          <h2>Войдите, чтобы открыть профиль</h2>
          <p>Здесь хранятся ваши достижения и статистика.</p>
          <button className="btn-primary" onClick={openAuthModal}>Войти</button>
        </div>
      </div>
    );
  }

  const avatarLetter = (user.email ?? '?')[0].toUpperCase();
  const bestAttempt = attempts.reduce<QuizAttempt | null>((best, a) => {
    if (!best) return a;
    return pct(a.score, a.total) > pct(best.score, best.total) ? a : best;
  }, null);

  return (
    <div className="page-container">
      <div className="profile-hero">
        <div className="profile-avatar">{avatarLetter}</div>
        <div className="profile-info">
          <h1 className="profile-email">{user.email}</h1>
          <p className="profile-since">
            На сайте с {formatDate(user.created_at)}
          </p>
          <button className="ghost" style={{ marginTop: 8 }} onClick={signOut}>
            Выйти
          </button>
        </div>
      </div>

      <div className="profile-stats">
        <div className="profile-stat-card">
          <span className="profile-stat-value">{loading ? '—' : favCount}</span>
          <span className="profile-stat-label">Избранное</span>
        </div>
        <div className="profile-stat-card">
          <span className="profile-stat-value">{loading ? '—' : histCount}</span>
          <span className="profile-stat-label">Прочитано</span>
        </div>
        <div className="profile-stat-card">
          <span className="profile-stat-value">{loading ? '—' : attempts.length}</span>
          <span className="profile-stat-label">Квизов пройдено</span>
        </div>
        <div className="profile-stat-card">
          <span className="profile-stat-value">
            {loading ? '—' : bestAttempt ? `${pct(bestAttempt.score, bestAttempt.total)}%` : '—'}
          </span>
          <span className="profile-stat-label">Лучший результат</span>
        </div>
      </div>

      <div className="profile-section">
        <div className="profile-section-header">
          <h2 className="section-title" style={{ marginBottom: 0 }}>История квиза</h2>
          <Link to="/quiz" className="profile-action-link">Пройти квиз →</Link>
        </div>

        {loading && <p className="empty" style={{ padding: '24px 0' }}>Загрузка…</p>}

        {!loading && attempts.length === 0 && (
          <p className="empty" style={{ padding: '24px 0' }}>
            Вы ещё не проходили викторину.
          </p>
        )}

        {!loading && attempts.length > 0 && (
          <div className="quiz-attempts-list">
            {attempts.map((a) => {
              const percent = pct(a.score, a.total);
              const good = percent >= 70;
              return (
                <div key={a.id} className="quiz-attempt-row">
                  <span className="quiz-attempt-date">{formatDate(a.created_at)}</span>
                  <div className="quiz-attempt-bar-wrap">
                    <div
                      className="quiz-attempt-bar"
                      style={{ width: `${percent}%`, background: good ? 'var(--accent)' : 'var(--soft)' }}
                    />
                  </div>
                  <span className="quiz-attempt-score" style={{ color: good ? 'var(--accent)' : 'var(--soft)' }}>
                    {a.score}/{a.total} ({percent}%)
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="profile-section">
        <div className="profile-section-header">
          <h2 className="section-title" style={{ marginBottom: 0 }}>Библиотека</h2>
          <Link to="/library" className="profile-action-link">Открыть →</Link>
        </div>
        <p style={{ color: 'var(--soft)', fontSize: 14 }}>
          Избранные комиксы и история просмотров.
        </p>
      </div>
    </div>
  );
}
