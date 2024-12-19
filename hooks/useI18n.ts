import { useState, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cache } from '../utils/cache';

type Language = 'id' | 'en' | 'ja';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const TRANSLATIONS: Translations = {
  id: {
    welcome: 'Selamat Datang',
    start_quiz: 'Mulai Quiz',
    settings: 'Pengaturan',
    // Add more translations
  },
  en: {
    welcome: 'Welcome',
    start_quiz: 'Start Quiz',
    settings: 'Settings',
    // Add more translations
  },
  ja: {
    welcome: 'ようこそ',
    start_quiz: 'クイズを始める',
    settings: '設定',
    // Add more translations
  },
};

const LANGUAGE_KEY = 'app_language';
const DEFAULT_LANGUAGE: Language = 'id';

export function useI18n() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(DEFAULT_LANGUAGE);

  const initialize = useCallback(async () => {
    try {
      const savedLanguage = await Cache.get<Language>(LANGUAGE_KEY);
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  }, []);

  const setLanguage = useCallback(async (language: Language) => {
    try {
      await Cache.set(LANGUAGE_KEY, language);
      setCurrentLanguage(language);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  }, []);

  const t = useCallback((key: string, params?: { [key: string]: string }) => {
    let translation = TRANSLATIONS[currentLanguage]?.[key] || TRANSLATIONS[DEFAULT_LANGUAGE]?.[key] || key;
    
    if (params) {
      Object.keys(params).forEach(param => {
        translation = translation.replace(`{${param}}`, params[param]);
      });
    }
    
    return translation;
  }, [currentLanguage]);

  return {
    currentLanguage,
    setLanguage,
    t,
    initialize,
    supportedLanguages: Object.keys(TRANSLATIONS) as Language[],
  };
} 