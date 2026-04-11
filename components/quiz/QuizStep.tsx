'use client';

import { QuizQuestion } from '@/lib/quiz';

interface QuizStepProps {
  question: QuizQuestion;
  currentStep: number;
  totalSteps: number;
  onAnswer: (value: string) => void;
}

export function QuizStep({ question, currentStep, totalSteps, onAnswer }: QuizStepProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <span className="text-sm text-bordello-muted">
          {currentStep} of {totalSteps}
        </span>
        <div className="mt-2 h-1 bg-bordello-border rounded-full overflow-hidden">
          <div
            className="h-full bg-white rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="text-2xl font-bold text-white mb-8">{question.question}</h2>

      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => onAnswer(option.value)}
            className="w-full text-left p-4 rounded-lg border border-bordello-border bg-bordello-surface hover:bg-bordello-bg/50 hover:border-bordello-muted/50 transition-all text-bordello-text hover:text-white"
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
