import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  HIGH_SCORES: '@jp_quiz_high_scores',
  STATS: '@jp_quiz_stats',
  SETTINGS: '@jp_quiz_settings',
};

export async function saveHighScore(quizType, score, totalQuestions) {
  try {
    // Get existing high scores
    const existingScores = await getHighScores();
    const percentage = Math.round((score / totalQuestions) * 100);
    
    // Add new score
    const newScore = {
      score,
      totalQuestions,
      percentage,
      date: new Date().toISOString(),
    };

    // Update high scores for quiz type
    existingScores[quizType] = existingScores[quizType] || [];
    existingScores[quizType].push(newScore);
    
    // Sort by percentage and keep only top 10
    existingScores[quizType].sort((a, b) => b.percentage - a.percentage);
    existingScores[quizType] = existingScores[quizType].slice(0, 10);

    // Save updated scores
    await AsyncStorage.setItem(STORAGE_KEYS.HIGH_SCORES, JSON.stringify(existingScores));
    return true;
  } catch (error) {
    console.error('Error saving high score:', error);
    return false;
  }
}

export async function getHighScores() {
  try {
    const scores = await AsyncStorage.getItem(STORAGE_KEYS.HIGH_SCORES);
    return scores ? JSON.parse(scores) : {};
  } catch (error) {
    console.error('Error getting high scores:', error);
    return {};
  }
}

export async function updateStats(quizType, stats) {
  try {
    const existingStats = await getStats();
    
    // Update stats for quiz type
    existingStats[quizType] = existingStats[quizType] || {
      totalQuizzes: 0,
      totalQuestions: 0,
      correctAnswers: 0,
      averageScore: 0,
      timeSpent: 0, // in seconds
      lastPlayed: null,
    };

    const currentStats = existingStats[quizType];
    
    // Update statistics
    currentStats.totalQuizzes += 1;
    currentStats.totalQuestions += stats.totalQuestions;
    currentStats.correctAnswers += stats.correctAnswers;
    currentStats.timeSpent += stats.timeSpent;
    currentStats.lastPlayed = new Date().toISOString();
    
    // Calculate new average score
    currentStats.averageScore = Math.round(
      (currentStats.correctAnswers / currentStats.totalQuestions) * 100
    );

    // Save updated stats
    await AsyncStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(existingStats));
    return true;
  } catch (error) {
    console.error('Error updating stats:', error);
    return false;
  }
}

export async function getStats() {
  try {
    const stats = await AsyncStorage.getItem(STORAGE_KEYS.STATS);
    return stats ? JSON.parse(stats) : {};
  } catch (error) {
    console.error('Error getting stats:', error);
    return {};
  }
}

export async function saveSettings(settings) {
  try {
    await AsyncStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    return false;
  }
}

export async function getSettings() {
  try {
    const settings = await AsyncStorage.getItem(STORAGE_KEYS.SETTINGS);
    return settings ? JSON.parse(settings) : {
      timerEnabled: false,
      timerDuration: 30, // seconds per question
      showHints: true,
      practiceMode: false,
    };
  } catch (error) {
    console.error('Error getting settings:', error);
    return {
      timerEnabled: false,
      timerDuration: 30,
      showHints: true,
      practiceMode: false,
    };
  }
}
