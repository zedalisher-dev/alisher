import { supabase } from '../supabase';

export interface AppReview {
  id: string;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
}

export interface ReviewInput {
  rating: number;
  comment: string;
}

export async function getMyReview(): Promise<AppReview | null> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('app_reviews')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle();

  if (error) throw error;
  return data;
}

export async function saveMyReview(input: ReviewInput): Promise<AppReview> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('Not logged in');

  const { data, error } = await supabase
    .from('app_reviews')
    .upsert({
      user_id: user.id,
      rating: input.rating,
      comment: input.comment.trim(),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })
    .select('*')
    .single();

  if (error) throw error;
  return data;
}
