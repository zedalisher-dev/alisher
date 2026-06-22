import { cors, json, error } from '../_shared/cors.ts';

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_PROMPT = `Ты эксперт по комиксам и графическим романам. Ты помогаешь читателям понять комиксы — объясняешь персонажей, сюжеты, отсылки, историю издания. Отвечай на русском языке, кратко и по делу (2-4 предложения). Если тебе дали контекст комикса — используй его в ответе.`;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors });

  try {
    const { message, context } = await req.json();
    if (!message) return error('message required', 400);
    if (!GEMINI_API_KEY) return error('GEMINI_API_KEY not set', 500);

    const prompt = context
      ? `Контекст комикса: ${context}\n\nВопрос читателя: ${message}`
      : message;

    const res = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: { maxOutputTokens: 400, temperature: 0.7 },
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return error(`Gemini error: ${err}`, 500);
    }

    const data = await res.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? 'Нет ответа';

    return json({ reply });
  } catch (e) {
    return error(String(e), 500);
  }
});
