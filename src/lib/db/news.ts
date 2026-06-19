import { supabase } from '../supabase';

export interface NewsPost {
  id: string;
  author_id: string;
  title: string;
  body: string;
  cover_url: string | null;
  published_at: string;
  created_at: string;
}

export async function getNewsPosts(): Promise<NewsPost[]> {
  const { data, error } = await supabase
    .from('news_posts')
    .select('*')
    .order('published_at', { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getNewsPost(id: string): Promise<NewsPost> {
  const { data, error } = await supabase
    .from('news_posts')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function createNewsPost(
  authorId: string,
  title: string,
  body: string,
  coverUrl: string
): Promise<NewsPost> {
  const { data, error } = await supabase
    .from('news_posts')
    .insert({ author_id: authorId, title, body, cover_url: coverUrl || null })
    .select()
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function updateNewsPost(
  id: string,
  title: string,
  body: string,
  coverUrl: string
): Promise<void> {
  const { error } = await supabase
    .from('news_posts')
    .update({ title, body, cover_url: coverUrl || null })
    .eq('id', id);
  if (error) throw new Error(error.message);
}

export async function deleteNewsPost(id: string): Promise<void> {
  const { error } = await supabase.from('news_posts').delete().eq('id', id);
  if (error) throw new Error(error.message);
}
