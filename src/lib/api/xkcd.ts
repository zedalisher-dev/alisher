import { supabase } from '../supabase';

export interface XkcdComic {
  num: number;
  title: string;
  safe_title: string;
  img: string;
  alt: string;
  year: string;
  month: string;
  day: string;
  transcript: string;
  link: string;
}

async function invoke(body: Record<string, unknown>): Promise<{ comic: XkcdComic; latestNum: number }> {
  const { data, error } = await supabase.functions.invoke('xkcd', { body });
  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
  return data as { comic: XkcdComic; latestNum: number };
}

export function getXkcd(num?: number) {
  return invoke(num ? { num } : {});
}

export function getRandomXkcd() {
  return invoke({ random: true });
}
