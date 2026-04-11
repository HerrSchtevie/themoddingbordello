import { ModlistSlug } from '@/types/modlist';

export interface QuizQuestion {
  id: string;
  question: string;
  options: { label: string; value: string }[];
}

export interface QuizResult {
  list: ModlistSlug;
  profile: 'lords-vision' | 'performance' | null;
  reasons: string[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'experience',
    question: 'What kind of experience do you want?',
    options: [
      { label: 'Power fantasy — strong, expansive, lots of systems', value: 'power' },
      { label: 'Challenging survival — difficult, punishing, progression-focused', value: 'survival' },
      { label: 'Visual overhaul — graphics only, minimal gameplay changes', value: 'visual' },
    ],
  },
  {
    id: 'adult',
    question: 'How much adult content do you want?',
    options: [
      { label: 'None — fully SFW', value: 'none' },
      { label: 'Optional — I want the choice', value: 'optional' },
      { label: 'Full — fully integrated', value: 'full' },
    ],
  },
  {
    id: 'hardware',
    question: 'Which best fits your setup?',
    options: [
      { label: 'High-end — I want maximum visuals and my PC can handle it', value: 'high' },
      { label: 'Performance — I want smooth gameplay or I\'m on older hardware', value: 'performance' },
    ],
  },
];

/**
 * Determines the next question index based on current answers.
 * Returns -1 when the quiz should go directly to results.
 */
export function getNextQuestionIndex(currentIndex: number, answers: Record<string, string>): number {
  const currentId = quizQuestions[currentIndex].id;

  // After Q1 (experience)
  if (currentId === 'experience') {
    if (answers.experience === 'visual') {
      // Visual overhaul → skip Q2, go to Q3 (hardware)
      return 2;
    }
    // Otherwise go to Q2 (adult)
    return 1;
  }

  // After Q2 (adult)
  if (currentId === 'adult') {
    if (answers.adult === 'none' && answers.experience === 'survival') {
      // SFW + Survival → ARR, skip Q3, go to result
      return -1;
    }
    // All other combos continue to Q3 (hardware)
    return 2;
  }

  // After Q3 (hardware) → always go to result
  return -1;
}

/**
 * Calculates total visible steps for the progress bar based on what we know so far.
 */
export function getTotalSteps(answers: Record<string, string>): number {
  if (answers.experience === 'visual') return 2; // Q1 + Q3
  if (answers.adult === 'none' && answers.experience === 'survival') return 2; // Q1 + Q2
  return 3; // default all 3
}

/**
 * Calculates current visual step number (for progress display).
 */
export function getVisualStep(currentIndex: number, answers: Record<string, string>): number {
  if (answers.experience === 'visual' && currentIndex === 2) return 2;
  return currentIndex + 1;
}

export function evaluateQuiz(answers: Record<string, string>): QuizResult {
  const reasons: string[] = [];

  // Profile from hardware (null if skipped)
  const profile: 'lords-vision' | 'performance' | null =
    answers.hardware === 'high' ? 'lords-vision' :
    answers.hardware === 'performance' ? 'performance' :
    null;

  // SFW + Survival → ARR (no profile)
  if (answers.adult === 'none' && answers.experience === 'survival') {
    reasons.push('Authoria \u2013 Requiem Reforged delivers a challenging, fully SFW survival experience');
    reasons.push('ARR is the only SFW option built around Requiem-style difficulty');
    reasons.push('ARR best matches your preferences');
    return { list: 'arr', profile: null, reasons };
  }

  // Visual overhaul → VOV
  if (answers.experience === 'visual') {
    reasons.push('Visions of Vaermina focuses on visual upgrades with minimal gameplay changes');
    reasons.push(
      profile === 'lords-vision'
        ? "Lord's Vision profile for the full visual experience"
        : 'Performance profile for smoother gameplay on your hardware'
    );
    reasons.push('VOV best matches your preferences');
    return { list: 'vov', profile, reasons };
  }

  // SFW + Power → TOT
  if (answers.adult === 'none') {
    reasons.push('Tomes of Talos is the fully SFW Bordello experience');
    reasons.push(
      profile === 'lords-vision'
        ? "Lord's Vision profile for the full visual experience"
        : 'Performance profile for smoother gameplay on your hardware'
    );
    reasons.push('TOT best matches your preferences');
    return { list: 'tot', profile, reasons };
  }

  // Power fantasy
  if (answers.experience === 'power') {
    let list: ModlistSlug;
    if (answers.adult === 'full') {
      list = 'mom';
      reasons.push('Mantras of Mara delivers a power fantasy with fully integrated adult content');
    } else {
      list = 'joj';
      reasons.push('Journals of Jyggalag offers an expansive power fantasy with optional adult content');
    }
    reasons.push(
      profile === 'lords-vision'
        ? "Lord's Vision profile for the full visual experience"
        : 'Performance profile for smoother gameplay on your hardware'
    );
    reasons.push(`${list === 'mom' ? 'Mantras of Mara' : 'Journals of Jyggalag'} best matches your preferences`);
    return { list, profile, reasons };
  }

  // Challenging survival
  let list: ModlistSlug;
  if (answers.adult === 'full') {
    list = 'dod';
    reasons.push('Diaries of Dibella pairs challenging survival with fully integrated adult content');
  } else {
    list = 'hoh';
    reasons.push('Hymns of Hircine delivers a punishing survival experience with optional adult content');
  }
  reasons.push(
    profile === 'lords-vision'
      ? "Lord's Vision profile for the full visual experience"
      : 'Performance profile for smoother gameplay on your hardware'
  );
  reasons.push(`${list === 'dod' ? 'Diaries of Dibella' : 'Hymns of Hircine'} best matches your preferences`);
  return { list, profile, reasons };
}
