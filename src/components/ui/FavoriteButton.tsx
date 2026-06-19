import { useFavorite } from '../../hooks/useFavorite';
import type { FavoriteItem } from '../../lib/db/favorites';

interface Props extends FavoriteItem {
  className?: string;
}

export function FavoriteButton({ className = '', ...item }: Props) {
  const { fav, toggle, busy } = useFavorite(item);
  return (
    <button
      className={`fav-btn ${fav ? 'fav-btn--active' : ''} ${className}`}
      onClick={toggle}
      disabled={busy}
      title={fav ? 'Убрать из избранного' : 'Добавить в избранное'}
    >
      {fav ? '♥' : '♡'}
    </button>
  );
}
