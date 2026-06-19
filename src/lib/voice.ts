export interface VoiceSegment {
  speaker: string;
  text: string;
  type: 'narration' | 'dialogue' | 'action';
}

const HERO_VOICES: Record<string, { pitch: number; rate: number; lang: string }> = {
  narrator: { pitch: 1.0, rate: 0.9, lang: 'ru-RU' },
  default: { pitch: 1.0, rate: 1.0, lang: 'ru-RU' },
  // Heroes — confident, clear
  марк: { pitch: 1.1, rate: 1.05, lang: 'ru-RU' },
  питер: { pitch: 1.15, rate: 1.1, lang: 'ru-RU' },
  паук: { pitch: 1.15, rate: 1.1, lang: 'ru-RU' },
  рик: { pitch: 0.9, rate: 0.95, lang: 'ru-RU' },
  тони: { pitch: 1.05, rate: 1.15, lang: 'ru-RU' },
  тор: { pitch: 0.8, rate: 0.85, lang: 'ru-RU' },
  спаун: { pitch: 0.7, rate: 0.8, lang: 'ru-RU' },
  эл: { pitch: 0.75, rate: 0.85, lang: 'ru-RU' },
  // Mentors / wise characters
  'дядя бен': { pitch: 0.85, rate: 0.88, lang: 'ru-RU' },
  'профессор икс': { pitch: 0.85, rate: 0.85, lang: 'ru-RU' },
  один: { pitch: 0.75, rate: 0.8, lang: 'ru-RU' },
  нолан: { pitch: 0.8, rate: 0.9, lang: 'ru-RU' },
  когльостро: { pitch: 0.85, rate: 0.85, lang: 'ru-RU' },
  йинсен: { pitch: 1.0, rate: 0.9, lang: 'ru-RU' },
  // Villains — lower, menacing
  малеболгия: { pitch: 0.5, rate: 0.75, lang: 'ru-RU' },
  магнето: { pitch: 0.7, rate: 0.8, lang: 'ru-RU' },
  // Female characters
  дебби: { pitch: 1.2, rate: 1.0, lang: 'ru-RU' },
  'жан грей': { pitch: 1.2, rate: 1.0, lang: 'ru-RU' },
  'джейн фостер': { pitch: 1.2, rate: 1.0, lang: 'ru-RU' },
  // Other
  морган: { pitch: 0.9, rate: 0.9, lang: 'ru-RU' },
  циклоп: { pitch: 1.0, rate: 1.0, lang: 'ru-RU' },
  зверь: { pitch: 0.85, rate: 1.0, lang: 'ru-RU' },
  флэш: { pitch: 1.05, rate: 1.2, lang: 'ru-RU' },
  шейн: { pitch: 0.9, rate: 1.0, lang: 'ru-RU' },
};

function getVoiceConfig(speaker: string) {
  const key = speaker.toLowerCase();
  return HERO_VOICES[key] ?? HERO_VOICES.default;
}

export function stopSpeech() {
  window.speechSynthesis.cancel();
}

export function isSpeaking(): boolean {
  return window.speechSynthesis.speaking;
}

function speakOne(
  segment: VoiceSegment,
  onWord?: (text: string) => void,
): Promise<void> {
  return new Promise((resolve) => {
    const cfg = segment.type === 'narration'
      ? HERO_VOICES.narrator
      : getVoiceConfig(segment.speaker);

    const utter = new SpeechSynthesisUtterance(segment.text);
    utter.lang = cfg.lang;
    utter.pitch = cfg.pitch;
    utter.rate = cfg.rate;
    utter.volume = 1;

    if (onWord) {
      utter.onboundary = (e) => {
        if (e.name === 'word') {
          const word = segment.text.slice(e.charIndex, e.charIndex + e.charLength);
          onWord(word);
        }
      };
    }

    utter.onend = () => resolve();
    utter.onerror = () => resolve();

    window.speechSynthesis.speak(utter);
  });
}

export async function speakSegments(
  segments: VoiceSegment[],
  onSegment?: (index: number, segment: VoiceSegment) => void,
  signal?: AbortSignal,
) {
  for (let i = 0; i < segments.length; i++) {
    if (signal?.aborted) break;
    const seg = segments[i];
    onSegment?.(i, seg);
    await speakOne(seg);
    if (signal?.aborted) break;
    await new Promise<void>((r) => setTimeout(r, 200));
  }
}

export function parseAiResponse(text: string): VoiceSegment[] {
  const segments: VoiceSegment[] = [];
  const lines = text.split('\n').filter((l) => l.trim());

  for (const line of lines) {
    const dialogueMatch = line.match(/^\[(.+?)\]:\s*(.+)/);
    if (dialogueMatch) {
      segments.push({
        speaker: dialogueMatch[1],
        text: dialogueMatch[2],
        type: 'dialogue',
      });
      continue;
    }

    const narrationMatch = line.match(/^\*(.+)\*$/);
    if (narrationMatch) {
      segments.push({ speaker: 'Narrator', text: narrationMatch[1], type: 'narration' });
      continue;
    }

    if (line.trim()) {
      segments.push({ speaker: 'Narrator', text: line.trim(), type: 'narration' });
    }
  }

  return segments;
}
