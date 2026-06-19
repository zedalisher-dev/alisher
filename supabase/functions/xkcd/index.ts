import { cors, json, error } from '../_shared/cors.ts';
import { getOrSet } from '../_shared/cache.ts';

async function fetchXkcd(num?: number) {
  const url = num ? `https://xkcd.com/${num}/info.0.json` : 'https://xkcd.com/info.0.json';
  const res = await fetch(url);
  if (!res.ok) throw new Error(`xkcd: ${res.status}`);
  return res.json();
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  try {
    const body = await req.json().catch(() => ({}));
    const { num, random } = body as { num?: number; random?: boolean };

    if (random) {
      const latest = await getOrSet('xkcd:latest', 'xkcd', 3600, () => fetchXkcd());
      const maxNum: number = latest.num;
      const rNum = Math.floor(Math.random() * maxNum) + 1;
      const comic = await getOrSet(`xkcd:${rNum}`, 'xkcd', 3600, () => fetchXkcd(rNum));
      return json({ comic, latestNum: maxNum });
    }

    const cacheKey = num ? `xkcd:${num}` : 'xkcd:latest';
    const comic = await getOrSet(cacheKey, 'xkcd', 3600, () => fetchXkcd(num));

    let latestNum: number = comic.num;
    if (num) {
      const latest = await getOrSet('xkcd:latest', 'xkcd', 3600, () => fetchXkcd());
      latestNum = latest.num;
    }

    return json({ comic, latestNum });
  } catch (e) {
    return error(String(e));
  }
});
