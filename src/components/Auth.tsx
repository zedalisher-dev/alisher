import { useState } from 'react';
import { supabase } from '../lib/supabase';

export function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage('');
    setIsSuccess(false);
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) setMessage(error.message);
        else {
          setMessage('Аккаунт создан! Проверь почту для подтверждения.');
          setIsSuccess(true);
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setMessage(error.message);
      }
    } catch {
      setMessage('Что-то пошло не так. Попробуй ещё раз.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="landing">
      <div className="landing-hero">
        <div className="landing-brand">📚</div>
        <h1 className="landing-title">ComicsReader</h1>
        <p className="landing-tagline">Все комиксы мира в одном месте</p>
        <ul className="landing-features">
          <li>
            <span className="feature-dot" />
            Marvel, DC, Image и другие издатели
          </li>
          <li>
            <span className="feature-dot" />
            Поиск по тысячам выпусков
          </li>
          <li>
            <span className="feature-dot" />
            Читай прямо в браузере
          </li>
          <li>
            <span className="feature-dot" />
            Манга, веб-комиксы и классика
          </li>
        </ul>
      </div>

      <div className="landing-form-wrap">
        <div className="landing-form-card">
          <p className="form-title">
            {mode === 'signin' ? 'С возвращением 👋' : 'Добро пожаловать!'}
          </p>

          <div className="auth-tabs">
            <button
              className={'auth-tab' + (mode === 'signin' ? ' active' : '')}
              onClick={() => { setMode('signin'); setMessage(''); }}
            >
              Войти
            </button>
            <button
              className={'auth-tab' + (mode === 'signup' ? ' active' : '')}
              onClick={() => { setMode('signup'); setMessage(''); }}
            >
              Регистрация
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <label className="auth-label">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label className="auth-label">Пароль</label>
            <input
              type="password"
              placeholder="минимум 6 символов"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={6}
              required
            />
            <button className="auth-submit" type="submit" disabled={busy}>
              {busy ? '…' : mode === 'signin' ? 'Войти →' : 'Создать аккаунт →'}
            </button>
          </form>

          {message && (
            <p className={'auth-message' + (isSuccess ? ' auth-message--success' : '')}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
