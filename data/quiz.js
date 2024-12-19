import { HIRAGANA_DATA } from './hiragana';
import { KATAKANA_DATA } from './katakana';
import { KANJI_DATA } from './kanji';
import { VOCABULARY_DATA } from './vocabulary';
import { CULTURE_DATA } from './culture';

// Helper function untuk mengacak array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Helper function untuk mengambil pilihan jawaban yang salah
function getWrongChoices(correctAnswer, dataArray, key = 'romaji') {
  const wrongChoices = dataArray
    .filter(item => item[key] !== correctAnswer)
    .map(item => item[key]);
  return shuffleArray(wrongChoices).slice(0, 3);
}

export function generateHiraganaQuiz(count = 10) {
  const questions = shuffleArray(HIRAGANA_DATA).slice(0, count).map(item => {
    const wrongChoices = getWrongChoices(item.romaji, HIRAGANA_DATA);
    const choices = shuffleArray([item.romaji, ...wrongChoices]);
    
    return {
      type: 'hiragana',
      question: `Bagaimana cara membaca huruf ini?`,
      character: item.kana,
      choices,
      correctAnswer: item.romaji
    };
  });
  
  return questions;
}

export function generateKatakanaQuiz(count = 10) {
  const questions = shuffleArray(KATAKANA_DATA).slice(0, count).map(item => {
    const wrongChoices = getWrongChoices(item.romaji, KATAKANA_DATA);
    const choices = shuffleArray([item.romaji, ...wrongChoices]);
    
    return {
      type: 'katakana',
      question: `Bagaimana cara membaca huruf ini?`,
      character: item.kana,
      choices,
      correctAnswer: item.romaji
    };
  });
  
  return questions;
}

export function generateKanjiQuiz(count = 10) {
  const questions = shuffleArray(KANJI_DATA).slice(0, count).map(item => {
    const wrongChoices = getWrongChoices(item.meaning, KANJI_DATA, 'meaning');
    const choices = shuffleArray([item.meaning, ...wrongChoices]);
    
    return {
      type: 'kanji',
      question: `Apa arti dari kanji ini?`,
      character: item.kanji,
      choices,
      correctAnswer: item.meaning,
      hint: item.onyomi // Memberikan cara baca sebagai hint
    };
  });
  
  return questions;
}

export function generateVocabularyQuiz(count = 10) {
  const questions = shuffleArray(VOCABULARY_DATA).slice(0, count).map(item => {
    const wrongChoices = getWrongChoices(item.meaning, VOCABULARY_DATA, 'meaning');
    const choices = shuffleArray([item.meaning, ...wrongChoices]);
    
    return {
      type: 'vocabulary',
      question: `Apa arti dari kata ini?`,
      character: item.word,
      choices,
      correctAnswer: item.meaning,
      hint: item.reading // Memberikan cara baca sebagai hint
    };
  });
  
  return questions;
}

export function generateCultureQuiz(count = 10) {
  const questions = shuffleArray(CULTURE_DATA).slice(0, count).map(item => {
    return {
      type: 'culture',
      question: item.question,
      content: '',
      choices: item.choices,
      correctAnswer: item.correctAnswer,
      explanation: item.explanation
    };
  });
  
  return questions;
}

export const QUIZ_TYPES = [
  {
    id: 'hiragana',
    title: 'Hiragana Quiz',
    description: 'Latih kemampuan membaca huruf Hiragana',
    icon: 'syllabary-hiragana',
    generator: generateHiraganaQuiz
  },
  {
    id: 'katakana',
    title: 'Katakana Quiz',
    description: 'Latih kemampuan membaca huruf Katakana',
    icon: 'syllabary-katakana',
    generator: generateKatakanaQuiz
  },
  {
    id: 'kanji',
    title: 'Kanji Quiz',
    description: 'Latih kemampuan membaca Kanji dasar',
    icon: 'translate',
    generator: generateKanjiQuiz
  },
  {
    id: 'vocabulary',
    title: 'Kosakata Quiz',
    description: 'Latih penguasaan kosakata Bahasa Jepang',
    icon: 'book-open-page-variant',
    generator: generateVocabularyQuiz
  },
  {
    id: 'culture',
    title: 'Budaya Quiz',
    description: 'Pelajari budaya dan kebiasaan masyarakat Jepang',
    icon: 'gate',
    generator: generateCultureQuiz
  }
];
