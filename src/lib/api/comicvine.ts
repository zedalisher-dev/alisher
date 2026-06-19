import { supabase } from '../supabase';

export interface CVVolume {
  id: number;
  type: 'volume';
  name: string;
  imageUrl: string | null;
  publisher: string | null;
  year: string | null;
  description: string;
  deck: string | null;
  issueCount: number;
}

export interface CVIssue {
  id: number;
  type: 'issue';
  name: string | null;
  imageUrl: string | null;
  issueNumber: string;
  volumeName: string;
  volumeId: number | null;
  description: string;
  deck: string | null;
  coverDate: string | null;
}

export type CVItem = CVVolume | CVIssue;

async function invoke<T>(body: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke('comic-vine', { body });
  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
  return data as T;
}

export async function searchCV(
  q: string,
  type: 'volumes' | 'issues' = 'volumes',
  limit = 20,
): Promise<{ results: CVItem[]; total: number; attribution: string }> {
  return invoke({ action: 'search', q, type, limit });
}

export async function getCVDetail(
  id: number,
  type: 'volume' | 'issue',
): Promise<{ item: CVItem; attribution: string }> {
  return invoke({ action: 'detail', id, type });
}
