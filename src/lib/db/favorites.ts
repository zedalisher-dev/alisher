import { supabase } from '../supabase';

export interface FavoriteItem {
  source_type: 'comic_vine' | 'archive' | 'xkcd';
  source_id: string;
  title: string;
  image_url?: string | null;
  detail_url: string;
}

export async function addFavorite(item: FavoriteItem): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not logged in');
  const { error } = await supabase.from('favorites').upsert({
    user_id: user.id,
    ...item,
  }, { onConflict: 'user_id,source_type,source_id' });
  if (error) throw error;
}

export async function removeFavorite(sourceType: string, sourceId: string): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not logged in');
  const { error } = await supabase
    .from('favorites')
    .delete()
    .match({ user_id: user.id, source_type: sourceType, source_id: sourceId });
  if (error) throw error;
}

export async function isFavorited(sourceType: string, sourceId: string): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;
  const { count } = await supabase
    .from('favorites')
    .select('id', { count: 'exact', head: true })
    .match({ user_id: user.id, source_type: sourceType, source_id: sourceId });
  return (count ?? 0) > 0;
}

export async function getUserFavorites() {
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}
