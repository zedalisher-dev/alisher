import { supabase } from '../supabase';

export interface QuizQuestion {
  id: string;
  question: string;
  image_url: string | null;
  options: string[];
  correct_index: number;
  category: string;
  created_at: string;
}

export async function getQuizQuestions(): Promise<QuizQuestion[]> {
  const { data, error } = await supabase
    .from('quiz_questions')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function createQuizQuestion(
  question: string,
  options: string[],
  correctIndex: number,
  imageUrl: string,
  category: string
): Promise<void> {
  const { error } = await supabase.from('quiz_questions').insert({
    question,
    options,
    correct_index: correctIndex,
    image_url: imageUrl || null,
    category: category || 'general',
  });
  if (error) throw new Error(error.message);
}

export async function deleteQuizQuestion(id: string): Promise<void> {
  const { error } = await supabase.from('quiz_questions').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export async function saveAttempt(userId: string, score: number, total: number): Promise<void> {
  const { error } = await supabase
    .from('quiz_attempts')
    .insert({ user_id: userId, score, total });
  if (error) throw new Error(error.message);
}

export interface QuizAttempt {
  id: string;
  score: number;
  total: number;
  created_at: string;
}

export async function getUserAttempts(): Promise<QuizAttempt[]> {
  const { data, error } = await supabase
    .from('quiz_attempts')
    .select('id, score, total, created_at')
    .order('created_at', { ascending: false })
    .limit(10);
  if (error) throw new Error(error.message);
  return data ?? [];
}
