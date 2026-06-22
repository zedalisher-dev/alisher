import { useState, useRef, useEffect } from 'react';
import { askGemini } from '../../lib/api/gemini';
import { useSpeech } from '../../hooks/useSpeech';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

interface Props {
  context?: string;
}

const SUGGESTIONS = [
  'Кто главный герой?',
  'О чём этот комикс?',
  'Объясни что происходит',
  'Кто злодей?',
];

export function AiChat({ context }: Props) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { speak, stop, speaking } = useSpeech();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send(text: string) {
    if (!text.trim() || loading) return;
    setInput('');
    setMessages((m) => [...m, { role: 'user', text }]);
    setLoading(true);
    try {
      const reply = await askGemini(text, context);
      setMessages((m) => [...m, { role: 'ai', text: reply }]);
    } catch {
      setMessages((m) => [...m, { role: 'ai', text: 'Ошибка. Попробуй ещё раз.' }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(input); }
  }

  return (
    <>
      <button className={'ai-fab' + (open ? ' open' : '')} onClick={() => setOpen((v) => !v)}>
        {open ? '✕' : '🤖'}
        {!open && <span className="ai-fab-label">Спросить ИИ</span>}
      </button>

      {open && (
        <div className="ai-chat-panel">
          <div className="ai-chat-header">
            <span>🤖 ИИ-помощник</span>
            <span className="ai-chat-hint">Задай вопрос про комикс</span>
          </div>

          <div className="ai-chat-messages">
            {messages.length === 0 && (
              <div className="ai-suggestions">
                {SUGGESTIONS.map((s) => (
                  <button key={s} className="ai-suggestion" onClick={() => send(s)}>{s}</button>
                ))}
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`ai-msg ai-msg--${m.role}`}>
                <p>{m.text}</p>
                {m.role === 'ai' && (
                  <button
                    className="ai-speak-btn"
                    onClick={() => speaking ? stop() : speak(m.text)}
                    title={speaking ? 'Стоп' : 'Озвучить'}
                  >
                    {speaking ? '⏹' : '🔊'}
                  </button>
                )}
              </div>
            ))}
            {loading && (
              <div className="ai-msg ai-msg--ai ai-msg--loading">
                <span className="ai-dot" /><span className="ai-dot" /><span className="ai-dot" />
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="ai-chat-input-row">
            <input
              className="ai-chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Спроси что-нибудь…"
              disabled={loading}
            />
            <button className="ai-send-btn" onClick={() => send(input)} disabled={loading || !input.trim()}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
