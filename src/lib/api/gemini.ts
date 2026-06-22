import { supabase } from '../supabase';

export async function askGemini(message: string, context?: string): Promise<string> {
  const { data, error } = await supabase.functions.invoke('gemini', {
    body: { message, context },
  });
  if (error) throw new Error(error.message);
  return data.reply as string;
}
