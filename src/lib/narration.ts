import { supabase } from './supabase';
import type { Issue } from './comics';
import type { VoiceSegment } from './voice';
import { parseAiResponse } from './voice';

export async function generateNarration(issue: Issue, seriesTitle: string): Promise<VoiceSegment[]> {
  const dialogueLines = issue.pages
    .flatMap((p) => p.panels)
    .flatMap((panel) => {
      const parts: string[] = [];
      if (panel.narration) parts.push(`Обстановка: ${panel.narration}`);
      if (panel.action) parts.push(`Звуковой эффект: ${panel.action}`);
      if (panel.dialogue) {
        panel.dialogue.forEach((d) => parts.push(`${d.speaker}: "${d.text}"`));
      }
      return parts;
    })
    .join('\n');

  const prompt = `Ты — рассказчик комикса. Перескажи выпуск "${issue.title}" из серии "${seriesTitle}" в виде аудиодрамы.

Вот исходный материал:
${dialogueLines}

Правила формата ответа:
- Описания/атмосфера: *текст*
- Реплики персонажей: [Имя персонажа]: текст реплики
- Звуковые эффекты: *ЗВУК*
- Каждый элемент на новой строке
- Сделай текст живым и атмосферным, добавь детали

Начни рассказ:`;

  const { data, error } = await supabase.functions.invoke('ai', {
    body: { prompt },
  });

  if (error || !data?.text) {
    return fallbackSegments(issue);
  }

  const parsed = parseAiResponse(data.text);
  return parsed.length > 0 ? parsed : fallbackSegments(issue);
}

function fallbackSegments(issue: Issue): VoiceSegment[] {
  const segments: VoiceSegment[] = [];

  for (const page of issue.pages) {
    for (const panel of page.panels) {
      if (panel.narration) {
        segments.push({ speaker: 'Narrator', text: panel.narration, type: 'narration' });
      }
      if (panel.action) {
        segments.push({ speaker: 'Action', text: panel.action, type: 'action' });
      }
      if (panel.dialogue) {
        for (const d of panel.dialogue) {
          segments.push({ speaker: d.speaker, text: d.text, type: 'dialogue' });
        }
      }
    }
  }

  return segments;
}
