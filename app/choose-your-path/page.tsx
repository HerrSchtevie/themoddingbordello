import { QuizEngine } from '@/components/quiz/QuizEngine';

export default function ChooseYourPathPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-4">Choose Your Path</h1>
        <p className="text-bordello-muted text-lg">
          Answer a few quick questions and we&apos;ll recommend the perfect Bordello modlist for you.
        </p>
      </div>
      <QuizEngine />
    </div>
  );
}
