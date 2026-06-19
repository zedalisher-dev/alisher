import { cors, json, error } from '../_shared/cors.ts';
import { getOrSet } from '../_shared/cache.ts';

const API_KEY = Deno.env.get('COMIC_VINE_API_KEY');
const BASE = 'https://comicvine.gamespot.com/api';
const UA = 'ComicAudioExplorer/1.0';

function stripHtml(html: string | null | undefined): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, ' ').replace(/\s{2,}/g, ' ').trim();
}

function normalizeVolume(v: Record<string, unknown>) {
  const img = v.image as Record<string, string> | null;
  const pub = v.publisher as Record<string, string> | null;
  return {
    id: v.id,
    type: 'volume',
    name: v.name ?? '',
    imageUrl: img?.medium_url ?? img?.original_url ?? null,
    publisher: pub?.name ?? null,
    year: v.start_year ?? null,
    description: stripHtml(v.description as string),
    deck: v.deck ?? null,
    issueCount: v.count_of_issues ?? 0,
  };
}

function normalizeIssue(i: Record<string, unknown>) {
  const img = i.image as Record<string, string> | null;
  const vol = i.volume as Record<string, unknown> | null;
  return {
    id: i.id,
    type: 'issue',
    name: i.name ?? null,
    imageUrl: img?.medium_url ?? img?.original_url ?? null,
    issueNumber: i.issue_number ?? '',
    volumeName: vol?.name ?? '',
    volumeId: vol?.id ?? null,
    description: stripHtml(i.description as string),
    deck: i.deck ?? null,
    coverDate: i.cover_date ?? null,
  };
}

async function cvFetch(path: string, params: Record<string, string>) {
  if (!API_KEY) throw new Error('COMIC_VINE_API_KEY не настроен');
  const url = new URL(`${BASE}${path}`);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('format', 'json');
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  const res = await fetch(url.toString(), { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`Comic Vine API: ${res.status}`);
  const data = await res.json();
  if (data.status_code !== 1) throw new Error(`Comic Vine: ${data.error}`);
  return data;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  try {
    const body = await req.json().catch(() => ({}));
    const { action, q, type = 'volumes', limit = 20, id } = body as Record<string, unknown>;

    if (action === 'search') {
      if (!q || String(q).length < 2) return error('Запрос слишком короткий', 400);
      const resource = type === 'issues' ? 'issue' : 'volume';
      const cacheKey = `cv:search:${resource}:${String(q).toLowerCase()}`;
      const results = await getOrSet(cacheKey, 'comic_vine', 43200, async () => {
        const fields = resource === 'volume'
          ? 'id,name,image,publisher,start_year,description,deck,count_of_issues'
          : 'id,name,image,volume,issue_number,cover_date,description,deck';
        const data = await cvFetch('/search/', {
          query: String(q),
          resources: resource,
          limit: String(limit),
          field_list: fields,
        });
        return (data.results ?? []).map(
          resource === 'volume' ? normalizeVolume : normalizeIssue,
        );
      });
      return json({ results, total: results.length, attribution: 'Metadata from Comic Vine' });
    }

    if (action === 'detail') {
      if (!id) return error('id обязателен', 400);
      const isIssue = type === 'issue';
      const cacheKey = `cv:${isIssue ? 'issue' : 'volume'}:${id}`;
      const item = await getOrSet(cacheKey, 'comic_vine', 604800, async () => {
        const path = isIssue ? `/issue/4000-${id}/` : `/volume/4050-${id}/`;
        const fields = isIssue
          ? 'id,name,image,volume,issue_number,cover_date,description,deck'
          : 'id,name,image,publisher,start_year,description,deck,count_of_issues';
        const data = await cvFetch(path, { field_list: fields });
        return isIssue ? normalizeIssue(data.results) : normalizeVolume(data.results);
      });
      return json({ item, attribution: 'Metadata from Comic Vine' });
    }

    return error('Неизвестный action', 400);
  } catch (e) {
    return error(String(e));
  }
});
