import { cors, json, error } from '../_shared/cors.ts';
import { getOrSet } from '../_shared/cache.ts';

const SEARCH_BASE = 'https://archive.org/advancedsearch.php';
const META_BASE = 'https://archive.org/metadata';
const READABLE_FORMATS = new Set([
  'Text PDF', 'Image Container PDF', 'PDF',
  'JPEG', 'JPEG 2000', 'PNG', 'Animated GIF',
  'DjVuTXT', 'Full Text', 'EPUB', 'Kindle',
]);

function thumbUrl(identifier: string) {
  return `https://archive.org/services/img/${identifier}`;
}

function buildFileUrl(identifier: string, filename: string) {
  return `https://archive.org/download/${identifier}/${encodeURIComponent(filename)}`;
}

function fileType(format: string): 'pdf' | 'image' | 'text' | 'epub' | 'other' {
  const f = format.toLowerCase();
  if (f.includes('pdf')) return 'pdf';
  if (f.includes('jpeg') || f.includes('jpg') || f.includes('png') || f.includes('jp2') || f.includes('gif')) return 'image';
  if (f.includes('text') || f.includes('txt') || f.includes('djvutxt') || f.includes('full text')) return 'text';
  if (f.includes('epub') || f.includes('kindle')) return 'epub';
  return 'other';
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  try {
    const body = await req.json().catch(() => ({}));
    const { action, q, page = 1, identifier } = body as Record<string, unknown>;

    if (action === 'search') {
      if (!q || String(q).length < 2) return error('Запрос слишком короткий', 400);
      const cacheKey = `archive:search:${String(q).toLowerCase()}:${page}`;

      const results = await getOrSet(cacheKey, 'archive', 86400, async () => {
        const query = `(title:"${q}" OR description:"${q}" OR subject:"${q}" OR creator:"${q}") AND mediatype:texts`;
        const url = new URL(SEARCH_BASE);
        url.searchParams.set('q', query);
        url.searchParams.set('fl[]', 'identifier,title,description,creator,date,mediatype');
        url.searchParams.set('rows', '20');
        url.searchParams.set('page', String(page));
        url.searchParams.set('output', 'json');
        const res = await fetch(url.toString());
        if (!res.ok) throw new Error(`Archive search: ${res.status}`);
        const data = await res.json();
        return (data.response?.docs ?? []).map((d: Record<string, unknown>) => ({
          identifier: d.identifier,
          title: d.title ?? d.identifier,
          description: Array.isArray(d.description) ? d.description[0] : (d.description ?? null),
          creator: Array.isArray(d.creator) ? d.creator[0] : (d.creator ?? null),
          year: d.date ? String(d.date).slice(0, 4) : null,
          thumbUrl: thumbUrl(d.identifier as string),
          archiveUrl: `https://archive.org/details/${d.identifier}`,
        }));
      });

      return json({ results, total: results.length, page, attribution: 'Source: Internet Archive' });
    }

    if (action === 'item') {
      if (!identifier) return error('identifier обязателен', 400);
      const cacheKey = `archive:item:${identifier}`;

      const item = await getOrSet(cacheKey, 'archive', 604800, async () => {
        const res = await fetch(`${META_BASE}/${identifier}`);
        if (!res.ok) throw new Error(`Archive metadata: ${res.status}`);
        const meta = await res.json();
        const m = meta.metadata ?? {};

        const readableFiles = (meta.files ?? [])
          .filter((f: Record<string, string>) => READABLE_FORMATS.has(f.format))
          .map((f: Record<string, string>) => ({
            name: f.name,
            format: f.format,
            size: f.size ?? null,
            url: buildFileUrl(identifier as string, f.name),
            type: fileType(f.format),
          }));

        return {
          identifier,
          title: Array.isArray(m.title) ? m.title[0] : (m.title ?? identifier),
          description: Array.isArray(m.description) ? m.description[0] : (m.description ?? null),
          creator: Array.isArray(m.creator) ? m.creator[0] : (m.creator ?? null),
          year: m.date ? String(m.date).slice(0, 4) : null,
          subject: Array.isArray(m.subject) ? m.subject : (m.subject ? [m.subject] : []),
          thumbUrl: thumbUrl(identifier as string),
          hasReadableFiles: readableFiles.length > 0,
          files: readableFiles,
        };
      });

      return json({ item, attribution: 'Source: Internet Archive' });
    }

    return error('Неизвестный action', 400);
  } catch (e) {
    return error(String(e));
  }
});
