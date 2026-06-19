import { supabase } from '../supabase';

export interface ArchiveSearchResult {
  identifier: string;
  title: string;
  description: string | null;
  creator: string | null;
  year: string | null;
  thumbUrl: string;
  archiveUrl: string;
}

export interface ArchiveFile {
  name: string;
  format: string;
  size: string | null;
  url: string;
  type: 'pdf' | 'image' | 'text' | 'epub' | 'other';
}

export interface ArchiveItem {
  identifier: string;
  title: string;
  description: string | null;
  creator: string | null;
  year: string | null;
  subject: string[];
  thumbUrl: string;
  hasReadableFiles: boolean;
  files: ArchiveFile[];
}

async function invoke<T>(body: Record<string, unknown>): Promise<T> {
  const { data, error } = await supabase.functions.invoke('archive', { body });
  if (error) throw new Error(error.message);
  if (data?.error) throw new Error(data.error);
  return data as T;
}

export async function searchArchive(
  q: string,
  page = 1,
): Promise<{ results: ArchiveSearchResult[]; total: number; attribution: string }> {
  return invoke({ action: 'search', q, page });
}

export async function getArchiveItem(
  identifier: string,
): Promise<{ item: ArchiveItem; attribution: string }> {
  return invoke({ action: 'item', identifier });
}
