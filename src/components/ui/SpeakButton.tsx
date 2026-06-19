import { useSpeech } from '../../hooks/useSpeech';

interface Props {
  text: string;
  lang?: string;
}

export function SpeakButton({ text, lang }: Props) {
  const { speak, stop, speaking, supported } = useSpeech();

  if (!supported) return null;

  return (
    <button
      className={'speak-btn' + (speaking ? ' speaking' : '')}
      onClick={() => speaking ? stop() : speak(text, lang)}
      title={speaking ? 'Остановить' : 'Озвучить'}
      type="button"
    >
      {speaking ? '⏹ Стоп' : '🔊 Озвучить'}
    </button>
  );
}
