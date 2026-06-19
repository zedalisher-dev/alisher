import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { addFavorite, removeFavorite, isFavorited } from '../lib/db/favorites';
import type { FavoriteItem } from '../lib/db/favorites';

export function useFavorite(item: FavoriteItem) {
  const { user, openAuthModal } = useAuth();
  const [fav, setFav] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) { setFav(false); return; }
    isFavorited(item.source_type, item.source_id).then(setFav);
  }, [user, item.source_type, item.source_id]);

  async function toggle() {
    if (!user) { openAuthModal(); return; }
    setBusy(true);
    try {
      if (fav) {
        setFav(false);
        await removeFavorite(item.source_type, item.source_id);
      } else {
        setFav(true);
        await addFavorite(item);
      }
    } catch {
      setFav((prev) => !prev);
    } finally {
      setBusy(false);
    }
  }

  return { fav, toggle, busy };
}
