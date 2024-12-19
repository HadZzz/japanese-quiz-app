import { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cache } from '../utils/cache';

interface AnalyticsEvent {
  name: string;
  properties?: Record<string, any>;
  timestamp: number;
}

interface StudySession {
  startTime: number;
  endTime?: number;
  category: string;
  correctAnswers?: number;
  totalQuestions?: number;
}

const EVENTS_KEY = 'analytics_events';
const SESSIONS_KEY = 'study_sessions';
const MAX_STORED_EVENTS = 1000;

export function useAnalytics() {
  const trackEvent = useCallback(async (
    eventName: string,
    properties?: Record<string, any>
  ) => {
    try {
      const event: AnalyticsEvent = {
        name: eventName,
        properties,
        timestamp: Date.now(),
      };

      const events = await Cache.get<AnalyticsEvent[]>(EVENTS_KEY) || [];
      events.push(event);

      // Keep only the last MAX_STORED_EVENTS events
      if (events.length > MAX_STORED_EVENTS) {
        events.splice(0, events.length - MAX_STORED_EVENTS);
      }

      await Cache.set(EVENTS_KEY, events);
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  }, []);

  const startStudySession = useCallback(async (category: string) => {
    try {
      const session: StudySession = {
        startTime: Date.now(),
        category,
      };

      const sessions = await Cache.get<StudySession[]>(SESSIONS_KEY) || [];
      sessions.push(session);
      await Cache.set(SESSIONS_KEY, sessions);

      return sessions.length - 1; // Return session index
    } catch (error) {
      console.error('Error starting study session:', error);
      return -1;
    }
  }, []);

  const endStudySession = useCallback(async (
    sessionIndex: number,
    results?: {
      correctAnswers: number;
      totalQuestions: number;
    }
  ) => {
    try {
      const sessions = await Cache.get<StudySession[]>(SESSIONS_KEY) || [];
      if (sessions[sessionIndex]) {
        sessions[sessionIndex] = {
          ...sessions[sessionIndex],
          endTime: Date.now(),
          ...(results && {
            correctAnswers: results.correctAnswers,
            totalQuestions: results.totalQuestions,
          }),
        };
        await Cache.set(SESSIONS_KEY, sessions);
      }
    } catch (error) {
      console.error('Error ending study session:', error);
    }
  }, []);

  const getStudyStats = useCallback(async () => {
    try {
      const sessions = await Cache.get<StudySession[]>(SESSIONS_KEY) || [];
      const stats = {
        totalSessions: sessions.length,
        totalTimeSpent: 0,
        averageScore: 0,
        categoryBreakdown: {} as Record<string, {
          sessions: number;
          averageScore: number;
          totalTime: number;
        }>,
      };

      let totalScoreSessions = 0;
      let totalScore = 0;

      sessions.forEach(session => {
        const duration = (session.endTime || Date.now()) - session.startTime;
        stats.totalTimeSpent += duration;

        if (!stats.categoryBreakdown[session.category]) {
          stats.categoryBreakdown[session.category] = {
            sessions: 0,
            averageScore: 0,
            totalTime: 0,
          };
        }

        stats.categoryBreakdown[session.category].sessions++;
        stats.categoryBreakdown[session.category].totalTime += duration;

        if (session.correctAnswers !== undefined && session.totalQuestions) {
          const score = (session.correctAnswers / session.totalQuestions) * 100;
          totalScore += score;
          totalScoreSessions++;
          
          const categoryStats = stats.categoryBreakdown[session.category];
          categoryStats.averageScore = 
            (categoryStats.averageScore * (categoryStats.sessions - 1) + score) / 
            categoryStats.sessions;
        }
      });

      if (totalScoreSessions > 0) {
        stats.averageScore = totalScore / totalScoreSessions;
      }

      return stats;
    } catch (error) {
      console.error('Error getting study stats:', error);
      return null;
    }
  }, []);

  return {
    trackEvent,
    startStudySession,
    endStudySession,
    getStudyStats,
  };
} 