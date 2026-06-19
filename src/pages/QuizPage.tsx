import { useState, useEffect } from 'react';
import { getQuizQuestions, saveAttempt } from '../lib/db/quiz';
import type { QuizQuestion } from '../lib/db/quiz';
import { useAuth } from '../contexts/AuthContext';
import { SpeakButton } from '../components/ui/SpeakButton';

type AnswerState = 'unanswered' | 'correct' | 'wrong';

export function QuizPage() {
  const { user } = useAuth();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getQuizQuestions()
      .then(setQuestions)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  function handleAnswer(index: number) {
    if (answerState !== 'unanswered') return;
    setSelected(index);
    const correct = index === questions[current].correct_index;
    setAnswerState(correct ? 'correct' : 'wrong');
    if (correct) setScore((s) => s + 1);
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setFinished(true);
      if (user) {
        saveAttempt(user.id, score + (answerState === 'correct' ? 1 : 0), questions.length).catch(() => {});
      }
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setAnswerState('unanswered');
    }
  }

  function handleRestart() {
    setCurrent(0);
    setSelected(null);
    setAnswerState('unanswered');
    setScore(0);
    setFinished(false);
  }

  if (loading) return <div className="page-container"><p className="empty">Загрузка…</p></div>;
  if (error) return <div className="page-container"><p className="empty" style={{ color: 'var(--error)' }}>{error}</p></div>;
  if (questions.length === 0) return <div className="page-container"><p className="empty">Вопросов пока нет.</p></div>;

  if (finished) {
    const total = questions.length;
    const pct = Math.round((score / total) * 100);
    const emoji = pct === 100 ? '🏆' : pct >= 70 ? '🎉' : pct >= 40 ? '👍' : '📚';
    return (
      <div className="page-container">
        <div className="quiz-result">
          <p className="quiz-result-emoji">{emoji}</p>
          <h1 className="quiz-result-title">Результат</h1>
          <p className="quiz-result-score">{score} / {total}</p>
          <p className="quiz-result-pct">{pct}% правильных ответов</p>
          <p className="quiz-result-msg">
            {pct === 100 ? 'Идеально! Ты настоящий знаток комиксов!' :
             pct >= 70 ? 'Отлично! Ты хорошо знаешь комиксы.' :
             pct >= 40 ? 'Неплохо, но есть куда расти!' :
             'Попробуй ещё раз — комиксы ждут тебя!'}
          </p>
          <button className="btn-primary" onClick={handleRestart}>Пройти ещё раз</button>
        </div>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="page-container">
      <div className="quiz-header">
        <h1 className="page-title">Викторина</h1>
        <span className="quiz-progress">{current + 1} / {questions.length}</span>
      </div>

      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${((current) / questions.length) * 100}%` }} />
      </div>

      <div className="quiz-card">
        {q.image_url && (
          <div className="quiz-image">
            <img src={q.image_url} alt="вопрос" />
          </div>
        )}

        <div className="quiz-question-row">
          <p className="quiz-category">{q.category}</p>
          <SpeakButton text={q.question + '. ' + q.options.map((o, i) => ['А', 'Б', 'В', 'Г'][i] + ': ' + o).join('. ')} />
        </div>
        <h2 className="quiz-question">{q.question}</h2>

        <div className="quiz-options">
          {q.options.map((opt, i) => {
            let cls = 'quiz-option';
            if (answerState !== 'unanswered') {
              if (i === q.correct_index) cls += ' correct';
              else if (i === selected) cls += ' wrong';
              else cls += ' dimmed';
            }
            return (
              <button key={i} className={cls} onClick={() => handleAnswer(i)} disabled={answerState !== 'unanswered'}>
                <span className="quiz-option-letter">{['A', 'B', 'C', 'D'][i]}</span>
                {opt}
              </button>
            );
          })}
        </div>

        {answerState !== 'unanswered' && (
          <div className={`quiz-feedback ${answerState}`}>
            {answerState === 'correct' ? '✅ Правильно!' : `❌ Неверно. Правильный ответ: ${q.options[q.correct_index]}`}
          </div>
        )}
      </div>

      {answerState !== 'unanswered' && (
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <button className="btn-primary" onClick={handleNext}>
            {current + 1 >= questions.length ? 'Посмотреть результат →' : 'Следующий вопрос →'}
          </button>
        </div>
      )}
    </div>
  );
}
