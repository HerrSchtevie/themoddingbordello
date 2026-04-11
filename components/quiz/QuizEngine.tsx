'use client';

import { useState } from 'react';
import {
  quizQuestions,
  evaluateQuiz,
  getNextQuestionIndex,
  getTotalSteps,
  getVisualStep,
  QuizResult as QuizResultType,
} from '@/lib/quiz';
import { QuizStep } from './QuizStep';
import { QuizResult } from './QuizResult';

export function QuizEngine() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResultType | null>(null);

  function handleAnswer(value: string) {
    const question = quizQuestions[currentIndex];
    const newAnswers = { ...answers, [question.id]: value };
    setAnswers(newAnswers);

    const nextIndex = getNextQuestionIndex(currentIndex, newAnswers);

    if (nextIndex === -1) {
      // Go directly to result
      setResult(evaluateQuiz(newAnswers));
    } else {
      setCurrentIndex(nextIndex);
    }
  }

  function handleReset() {
    setCurrentIndex(0);
    setAnswers({});
    setResult(null);
  }

  if (result) {
    return <QuizResult result={result} onReset={handleReset} />;
  }

  const totalSteps = getTotalSteps(answers);
  const visualStep = getVisualStep(currentIndex, answers);

  return (
    <QuizStep
      question={quizQuestions[currentIndex]}
      currentStep={visualStep}
      totalSteps={totalSteps}
      onAnswer={handleAnswer}
    />
  );
}
