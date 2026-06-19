import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

function getAdminClient() {
  const url = Deno.env.get('SUPABASE_URL')!;
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  return createClient(url, key);
}

export async function getCached<T>(key: string): Promise<T | null> {
  const sb = getAdminClient();
  const { data } = await sb
    .from('api_cache')
    .select('response_json, expires_at')
    .eq('key', key)
    .single();

  if (!data) return null;

  if (new Date(data.expires_at) <= new Date()) {
    await sb.from('api_cache').delete().eq('key', key);
    return null;
  }

  return data.response_json as T;
}

export async function setCached(
  key: string,
  source: string,
  data: unknown,
  ttlSeconds: number,
): Promise<void> {
  const sb = getAdminClient();
  const expires_at = new Date(Date.now() + ttlSeconds * 1000).toISOString();
  await sb.from('api_cache').upsert(
    { key, source, response_json: data, expires_at },
    { onConflict: 'key' },
  );
}

export async function getOrSet<T>(
  key: string,
  source: string,
  ttlSeconds: number,
  fetcher: () => Promise<T>,
): Promise<T> {
  const cached = await getCached<T>(key);
  if (cached !== null) return cached;
  const fresh = await fetcher();
  await setCached(key, source, fresh, ttlSeconds);
  return fresh;
}
