import { ModlistSlug } from '@/types/modlist';

export interface QuizQuestion {
  id: string;
  question: string;
  options: { label: string; value: string }[];
}

export interface QuizResult {
  list: ModlistSlug;
  hardware: 'high' | 'lean' | null;
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
      { label: 'Comfortable — my PC meets the recommended specs', value: 'high' },
      { label: 'Tight — older or lower-end hardware', value: 'lean' },
    ],
  },
];

/**
 * Filters a question's options based on prior answers.
 * Challenging survival has no fully-SFW option — both survival lists (HOH, DOD)
 * carry adult content, so that combination is not offered.
 */
export function getVisibleOptions(
  question: QuizQuestion,
  answers: Record<string, string>
): QuizQuestion['options'] {
  if (question.id === 'adult' && answers.experience === 'survival') {
    return question.options.filter((option) => option.value !== 'none');
  }
  return question.options;
}

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

  // After Q2 (adult) → always continue to Q3 (hardware)
  if (currentId === 'adult') {
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

  // Hardware tier from Q3 (null if skipped)
  const hardware: 'high' | 'lean' | null =
    answers.hardware === 'high' ? 'high' :
    answers.hardware === 'lean' ? 'lean' :
    null;

  // Visual overhaul → VOV
  if (answers.experience === 'visual') {
    reasons.push('Visions of Vaermina focuses on visual upgrades with minimal gameplay changes');
    if (hardware === 'high') {
      reasons.push('Your hardware is comfortable for the list as shipped, and the optional ENB presets and DLSS 5 are within reach');
    } else if (hardware === 'lean') {
      reasons.push('Every list ships one Community Shaders profile; on your hardware, run VRAMr and follow the Performance Tuning guide');
    }
    reasons.push('VOV best matches your preferences');
    return { list: 'vov', hardware, reasons };
  }

  // SFW + Power → TOT
  if (answers.adult === 'none') {
    reasons.push('Tomes of Talos is the fully SFW Bordello experience');
    if (hardware === 'high') {
      reasons.push('Your hardware is comfortable for the list as shipped, and the optional ENB presets and DLSS 5 are within reach');
    } else if (hardware === 'lean') {
      reasons.push('Every list ships one Community Shaders profile; on your hardware, run VRAMr and follow the Performance Tuning guide');
    }
    reasons.push('TOT best matches your preferences');
    return { list: 'tot', hardware, reasons };
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
    if (hardware === 'high') {
      reasons.push('Your hardware is comfortable for the list as shipped, and the optional ENB presets and DLSS 5 are within reach');
    } else if (hardware === 'lean') {
      reasons.push('Every list ships one Community Shaders profile; on your hardware, run VRAMr and follow the Performance Tuning guide');
    }
    reasons.push(`${list === 'mom' ? 'Mantras of Mara' : 'Journals of Jyggalag'} best matches your preferences`);
    return { list, hardware, reasons };
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
  if (hardware === 'high') {
    reasons.push('Your hardware is comfortable for the list as shipped, and the optional ENB presets and DLSS 5 are within reach');
  } else if (hardware === 'lean') {
    reasons.push('Every list ships one Community Shaders profile; on your hardware, run VRAMr and follow the Performance Tuning guide');
  }
  reasons.push(`${list === 'dod' ? 'Diaries of Dibella' : 'Hymns of Hircine'} best matches your preferences`);
  return { list, hardware, reasons };
}
