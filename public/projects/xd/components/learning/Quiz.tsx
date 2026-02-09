import React, { useState } from 'react';
import { QuizQuestion } from '../../types';
import { Button } from '../ui/Button';

interface QuizProps {
  questions: QuizQuestion[];
  onComplete: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ questions, onComplete }) => {
  const [answers, setAnswers] = useState<{[key: number]: number}>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (questionId: number, optionIndex: number) => {
    if (submitted) return;
    setAnswers(prev => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
    if (correctCount === questions.length) {
       onComplete();
    }
  };

  return (
    <div className="space-y-8 animate-fade-up visible">
       {questions.map((q, idx) => {
          const isCorrect = submitted && answers[q.id] === q.correctAnswer;
          const isWrong = submitted && answers[q.id] !== q.correctAnswer;
          
          return (
             <div key={q.id} className={`p-6 rounded-2xl border ${submitted ? (isCorrect ? 'border-green-500/30 bg-green-100 dark:bg-green-900/10' : 'border-red-500/30 bg-red-100 dark:bg-red-900/10') : 'border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/50'}`}>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">
                   <span className="text-zinc-400 dark:text-zinc-500 mr-2">{idx + 1}.</span>
                   {q.question}
                </h3>
                
                <div className="space-y-3">
                   {q.options.map((opt, optIdx) => (
                      <div 
                        key={optIdx}
                        onClick={() => handleSelect(q.id, optIdx)}
                        className={`
                           p-4 rounded-xl cursor-pointer border transition-all duration-200 flex items-center justify-between
                           ${answers[q.id] === optIdx 
                              ? 'bg-blue-100 dark:bg-blue-600/20 border-blue-500 text-blue-900 dark:text-white' 
                              : 'bg-zinc-50 dark:bg-black border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-700 dark:text-zinc-400'}
                           ${submitted && optIdx === q.correctAnswer ? '!bg-green-100 dark:!bg-green-600/20 !border-green-500 !text-green-800 dark:!text-green-200' : ''}
                           ${submitted && answers[q.id] === optIdx && optIdx !== q.correctAnswer ? '!bg-red-100 dark:!bg-red-600/20 !border-red-500 !text-red-800 dark:!text-red-200' : ''}
                        `}
                      >
                         <span>{opt}</span>
                         {submitted && optIdx === q.correctAnswer && (
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                         )}
                         {submitted && answers[q.id] === optIdx && optIdx !== q.correctAnswer && (
                            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                         )}
                      </div>
                   ))}
                </div>

                {submitted && (
                   <div className={`mt-4 text-sm p-3 rounded-lg ${isCorrect ? 'text-green-800 dark:text-green-400 bg-green-200 dark:bg-green-900/20' : 'text-red-800 dark:text-red-400 bg-red-200 dark:bg-red-900/20'}`}>
                      <strong>{isCorrect ? 'Верно!' : 'Ошибка.'}</strong> {q.explanation}
                   </div>
                )}
             </div>
          );
       })}

       {!submitted ? (
          <div className="flex justify-end">
             <Button onClick={handleSubmit} disabled={Object.keys(answers).length !== questions.length} size="lg">
                Отправить на проверку
             </Button>
          </div>
       ) : (
          <div className="text-center p-8 bg-zinc-100 dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-white/10">
             <div className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">
                Ваш результат: <span className={score === questions.length ? 'text-green-500' : 'text-yellow-500'}>{score} / {questions.length}</span>
             </div>
             {score === questions.length ? (
                <p className="text-zinc-600 dark:text-zinc-400 mb-6">Отличная работа! Модуль пройден.</p>
             ) : (
                <p className="text-zinc-600 dark:text-zinc-400 mb-6">Попробуйте еще раз, чтобы закрепить материал.</p>
             )}
             
             {score !== questions.length && (
                 <Button onClick={() => { setSubmitted(false); setAnswers({}); setScore(0); }} variant="outline">Попробовать снова</Button>
             )}
             
             {score === questions.length && (
                <Button onClick={onComplete} className="ml-4">Завершить урок</Button>
             )}
          </div>
       )}
    </div>
  );
};