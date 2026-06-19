import { supabase } from '../supabase';

export interface HistoryItem {
  source_type: 'comic_vine' | 'archive' | 'xkcd';
  source_id: string;
  title: string;
  image_url?: string | null;
}

export async function recordHistory(item: HistoryItem): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.from('reading_history').upsert(
    { user_id: user.id, ...item, last_opened_at: new Date().toISOString() },
    { onConflict: 'user_id,source_type,source_id' },
  );
}

export async function getUserHistory() {
  const { data, error } = await supabase
    .from('reading_history')
    .select('*')
    .order('last_opened_at', { ascending: false })
    .limit(50);
  if (error) throw error;
  return data ?? [];
}
