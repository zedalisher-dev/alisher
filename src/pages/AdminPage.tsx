import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getNewsPosts, createNewsPost, updateNewsPost, deleteNewsPost } from '../lib/db/news';
import type { NewsPost } from '../lib/db/news';
import { getQuizQuestions, createQuizQuestion, deleteQuizQuestion } from '../lib/db/quiz';
import type { QuizQuestion } from '../lib/db/quiz';

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL as string;

type AdminTab = 'news' | 'quiz';

function emptyForm() {
  return { title: '', body: '', cover_url: '' };
}

function emptyQuizForm() {
  return { question: '', image_url: '', category: 'general', options: ['', '', '', ''], correct_index: 0 };
}

export function AdminPage() {
  const { user, openAuthModal } = useAuth();
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [form, setForm] = useState(emptyForm());
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const isAdmin = user?.email === ADMIN_EMAIL;
  const [adminTab, setAdminTab] = useState<AdminTab>('news');
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [quizForm, setQuizForm] = useState(emptyQuizForm());
  const [quizSaving, setQuizSaving] = useState(false);

  function loadPosts() {
    setLoading(true);
    getNewsPosts()
      .then(setPosts)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }

  function loadQuiz() {
    getQuizQuestions()
      .then(setQuizQuestions)
      .catch((e: Error) => setError(e.message));
  }

  useEffect(() => {
    if (isAdmin) { loadPosts(); loadQuiz(); }
  }, [isAdmin]);

  if (!user) {
    return (
      <div className="page-container">
        <div className="auth-required">
          <p className="auth-required-icon">🔐</p>
          <h2>Войдите для доступа</h2>
          <button className="btn-primary" onClick={openAuthModal}>Войти</button>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="page-container">
        <div className="auth-required">
          <p className="auth-required-icon">🚫</p>
          <h2>Нет доступа</h2>
          <p>Эта страница только для администратора.</p>
          <Link to="/" className="btn-primary" style={{ display: 'inline-block', marginTop: 12 }}>На главную</Link>
        </div>
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.body.trim()) return;
    setSaving(true);
    setError('');
    try {
      if (editingId) {
        await updateNewsPost(editingId, form.title, form.body, form.cover_url);
      } else {
        await createNewsPost(user!.id, form.title, form.body, form.cover_url);
      }
      setForm(emptyForm());
      setEditingId(null);
      loadPosts();
    } catch (e: unknown) {
      setError((e as Error).message);
    } finally {
      setSaving(false);
    }
  }

  function startEdit(post: NewsPost) {
    setEditingId(post.id);
    setForm({ title: post.title, body: post.body, cover_url: post.cover_url ?? '' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm());
  }

  async function handleDelete(id: string) {
    if (!confirm('Удалить этот пост?')) return;
    try {
      await deleteNewsPost(id);
      loadPosts();
    } catch (e: unknown) {
      setError((e as Error).message);
    }
  }

  async function handleQuizSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!quizForm.question.trim() || quizForm.options.some((o) => !o.trim())) return;
    setQuizSaving(true);
    setError('');
    try {
      await createQuizQuestion(quizForm.question, quizForm.options, quizForm.correct_index, quizForm.image_url, quizForm.category);
      setQuizForm(emptyQuizForm());
      loadQuiz();
    } catch (e: unknown) {
      setError((e as Error).message);
    } finally {
      setQuizSaving(false);
    }
  }

  async function handleQuizDelete(id: string) {
    if (!confirm('Удалить вопрос?')) return;
    try { await deleteQuizQuestion(id); loadQuiz(); }
    catch (e: unknown) { setError((e as Error).message); }
  }

  return (
    <div className="page-container">
      <h1 className="page-title">Админ</h1>

      <div className="filter-tabs" style={{ marginBottom: 28 }}>
        <button className={'filter-tab' + (adminTab === 'news' ? ' active' : '')} onClick={() => setAdminTab('news')}>📰 Новости</button>
        <button className={'filter-tab' + (adminTab === 'quiz' ? ' active' : '')} onClick={() => setAdminTab('quiz')}>🧠 Викторина</button>
      </div>

      {adminTab === 'quiz' && (
        <>
          <form className="admin-form" onSubmit={handleQuizSubmit}>
            <h2 className="admin-form-title">Новый вопрос</h2>
            {error && <p className="admin-error">{error}</p>}

            <label className="admin-label">
              Вопрос *
              <input className="admin-input" value={quizForm.question} onChange={(e) => setQuizForm((f) => ({ ...f, question: e.target.value }))} placeholder="Как зовут Бэтмена?" required />
            </label>

            <label className="admin-label">
              URL картинки
              <input className="admin-input" type="url" value={quizForm.image_url} onChange={(e) => setQuizForm((f) => ({ ...f, image_url: e.target.value }))} placeholder="https://..." />
            </label>

            <label className="admin-label">
              Категория
              <input className="admin-input" value={quizForm.category} onChange={(e) => setQuizForm((f) => ({ ...f, category: e.target.value }))} placeholder="characters / history / lore…" />
            </label>

            {quizForm.options.map((opt, i) => (
              <label key={i} className="admin-label">
                Вариант {['A', 'B', 'C', 'D'][i]} {i === quizForm.correct_index && '✅'}
                <div style={{ display: 'flex', gap: 8 }}>
                  <input
                    className="admin-input"
                    style={{ flex: 1 }}
                    value={opt}
                    onChange={(e) => setQuizForm((f) => { const o = [...f.options]; o[i] = e.target.value; return { ...f, options: o }; })}
                    placeholder={`Вариант ${['A','B','C','D'][i]}`}
                    required
                  />
                  <button type="button" className={`btn-secondary${i === quizForm.correct_index ? ' active' : ''}`} style={{ flexShrink: 0, fontSize: 12 }} onClick={() => setQuizForm((f) => ({ ...f, correct_index: i }))}>
                    Правильный
                  </button>
                </div>
              </label>
            ))}

            <button className="btn-primary" type="submit" disabled={quizSaving}>{quizSaving ? 'Сохраняю…' : 'Добавить вопрос'}</button>
          </form>

          <hr className="admin-divider" />
          <h2 className="admin-section-title">Вопросы ({quizQuestions.length})</h2>
          <div className="admin-posts-list">
            {quizQuestions.map((q) => (
              <div key={q.id} className="admin-post-row">
                <div className="admin-post-info">
                  <p className="admin-post-title">{q.question}</p>
                  <p className="admin-post-date">{q.category} · правильный: {q.options[q.correct_index]}</p>
                </div>
                <button className="ghost danger" onClick={() => handleQuizDelete(q.id)}>🗑</button>
              </div>
            ))}
          </div>
        </>
      )}

      {adminTab === 'news' && <>
      <form className="admin-form" onSubmit={handleSubmit}>
        <h2 className="admin-form-title">{editingId ? 'Редактировать пост' : 'Новый пост'}</h2>

        {error && <p className="admin-error">{error}</p>}

        <label className="admin-label">
          Заголовок *
          <input
            className="admin-input"
            type="text"
            value={form.title}
            onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
            placeholder="Новый выпуск Batman..."
            required
          />
        </label>

        <label className="admin-label">
          URL обложки
          <input
            className="admin-input"
            type="url"
            value={form.cover_url}
            onChange={(e) => setForm((f) => ({ ...f, cover_url: e.target.value }))}
            placeholder="https://..."
          />
        </label>

        <label className="admin-label">
          Текст *
          <textarea
            className="admin-textarea"
            value={form.body}
            onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
            placeholder="Текст новости…"
            required
          />
        </label>

        <div className="admin-form-actions">
          <button className="btn-primary" type="submit" disabled={saving}>
            {saving ? 'Сохраняю…' : editingId ? 'Сохранить' : 'Опубликовать'}
          </button>
          {editingId && (
            <button className="btn-secondary" type="button" onClick={cancelEdit}>
              Отмена
            </button>
          )}
        </div>
      </form>

      <hr className="admin-divider" />

      <h2 className="admin-section-title">Все посты ({posts.length})</h2>

      {loading && <p className="empty">Загрузка…</p>}

      <div className="admin-posts-list">
        {posts.map((post) => (
          <div key={post.id} className="admin-post-row">
            <div className="admin-post-info">
              <p className="admin-post-title">{post.title}</p>
              <p className="admin-post-date">{new Date(post.published_at).toLocaleDateString('ru-RU')}</p>
            </div>
            <div className="admin-post-actions">
              <Link to={`/news/${post.id}`} className="ghost" target="_blank">👁</Link>
              <button className="ghost" onClick={() => startEdit(post)}>✏️</button>
              <button className="ghost danger" onClick={() => handleDelete(post.id)}>🗑</button>
            </div>
          </div>
        ))}
      </div>
      </>}
    </div>
  );
}
