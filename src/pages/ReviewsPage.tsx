import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { getMyReview, saveMyReview, type AppReview } from '../lib/db/reviews';

const RATINGS = [1, 2, 3, 4, 5];

function isMissingReviewsTable(error: unknown) {
  if (typeof error !== 'object' || error === null) return false;
  const maybeError = error as { code?: unknown; message?: unknown };
  const code = typeof maybeError.code === 'string' ? maybeError.code : '';
  const message = typeof maybeError.message === 'string' ? maybeError.message : '';
  return code === '42P01' || message.includes('app_reviews');
}

function formatDate(iso: string, language: string) {
  return new Date(iso).toLocaleDateString(language, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function ReviewsPage() {
  const { user, openAuthModal } = useAuth();
  const { language, t } = useLanguage();
  const [review, setReview] = useState<AppReview | null>(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    getMyReview()
      .then((savedReview) => {
        setReview(savedReview);
        if (savedReview) {
          setRating(savedReview.rating);
          setComment(savedReview.comment);
        }
      })
      .catch((loadError: unknown) => {
        setError(isMissingReviewsTable(loadError) ? t('reviews.dbSetupError') : t('reviews.loadError'));
      })
      .finally(() => setLoading(false));
  }, [t, user]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!user) {
      openAuthModal();
      return;
    }

    setSaving(true);
    setMessage('');
    setError('');

    try {
      const savedReview = await saveMyReview({ rating, comment });
      setReview(savedReview);
      setMessage(t('reviews.saveSuccess'));
    } catch (saveError) {
      setError(isMissingReviewsTable(saveError) ? t('reviews.dbSetupError') : t('reviews.saveError'));
    } finally {
      setSaving(false);
    }
  }

  if (!user) {
    return (
      <div className="page-container">
        <div className="auth-required">
          <p className="auth-required-icon">⭐</p>
          <h2>{t('reviews.authTitle')}</h2>
          <p>{t('reviews.authText')}</p>
          <button className="btn-primary" onClick={openAuthModal}>{t('auth.signIn')}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container reviews-page">
      <section className="reviews-header">
        <p className="reviews-kicker">{t('reviews.kicker')}</p>
        <h1 className="page-title">{t('reviews.title')}</h1>
        <p className="reviews-subtitle">{t('reviews.subtitle')}</p>
      </section>

      <form className="review-form" onSubmit={handleSubmit}>
        <div className="review-field">
          <span className="review-label">{t('reviews.ratingLabel')}</span>
          <div className="rating-control" role="radiogroup" aria-label={t('reviews.ratingAria')}>
            {RATINGS.map((value) => (
              <button
                key={value}
                type="button"
                className={`star-button${value <= rating ? ' active' : ''}`}
                onClick={() => setRating(value)}
                aria-label={`${value} ${t('reviews.outOf')}`}
                aria-pressed={value === rating}
              >
                ★
              </button>
            ))}
          </div>
        </div>

        <label className="review-field">
          <span className="review-label">{t('reviews.commentLabel')}</span>
          <textarea
            className="review-textarea"
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            maxLength={500}
            placeholder={t('reviews.placeholder')}
          />
          <span className="review-hint">{comment.length}/500</span>
        </label>

        <div className="review-actions">
          <button className="btn-primary" type="submit" disabled={saving || loading}>
            {saving ? t('reviews.saving') : review ? t('reviews.update') : t('reviews.submit')}
          </button>
          {message && <span className="review-success">{message}</span>}
          {error && <span className="review-error">{error}</span>}
        </div>
      </form>

      {review && (
        <section className="my-review">
          <div className="profile-section-header">
            <h2 className="section-title" style={{ marginBottom: 0 }}>{t('reviews.myReview')}</h2>
            <span className="review-date">
              {t('reviews.updated')} {formatDate(review.updated_at, language)}
            </span>
          </div>
          <div className="my-review-card">
            <div className="my-review-stars">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</div>
            <p>{review.comment || t('reviews.noComment')}</p>
          </div>
        </section>
      )}
    </div>
  );
}
