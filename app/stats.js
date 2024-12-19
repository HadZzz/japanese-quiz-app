import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Pressable, View as RNView } from 'react-native';
import { Text, View } from '../components/Themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getHighScores, getStats } from '../utils/storage';
import { QUIZ_TYPES } from '../data/quiz';

function StatCard({ title, value, icon, color = '#007AFF' }) {
  return (
    <View style={styles.statCard}>
      <MaterialCommunityIcons name={icon} size={24} color={color} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statTitle}>{title}</Text>
    </View>
  );
}

function QuizStats({ type, stats, highScores }) {
  if (!stats || !highScores) return null;

  const quizStats = stats[type.id] || {
    totalQuizzes: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    averageScore: 0,
    timeSpent: 0,
    lastPlayed: null,
  };

  const quizHighScores = highScores[type.id] || [];
  const bestScore = quizHighScores[0]?.percentage || 0;

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Belum pernah';
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <View style={styles.quizStatsContainer}>
      <View style={styles.quizStatsHeader}>
        <MaterialCommunityIcons name={type.icon} size={24} color="#007AFF" />
        <Text style={styles.quizStatsTitle}>{type.name}</Text>
      </View>

      <View style={styles.statsGrid}>
        <StatCard
          title="Quiz Selesai"
          value={quizStats.totalQuizzes}
          icon="checkbox-marked-circle-outline"
          color="#4CAF50"
        />
        <StatCard
          title="Rata-rata Skor"
          value={`${quizStats.averageScore}%`}
          icon="percent"
          color="#FF9800"
        />
        <StatCard
          title="Skor Tertinggi"
          value={`${bestScore}%`}
          icon="trophy"
          color="#FFC107"
        />
        <StatCard
          title="Total Waktu"
          value={formatTime(quizStats.timeSpent)}
          icon="clock-outline"
          color="#9C27B0"
        />
      </View>

      {quizHighScores.length > 0 && (
        <View style={styles.highScoresContainer}>
          <Text style={styles.sectionTitle}>Skor Tertinggi</Text>
          {quizHighScores.slice(0, 5).map((score, index) => (
            <View key={index} style={styles.highScoreRow}>
              <Text style={styles.highScoreRank}>#{index + 1}</Text>
              <Text style={styles.highScoreValue}>{score.percentage}%</Text>
              <Text style={styles.highScoreDate}>
                {formatDate(score.date)}
              </Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.additionalStats}>
        <Text style={styles.sectionTitle}>Informasi Tambahan</Text>
        <Text style={styles.additionalStatText}>
          Total Pertanyaan: {quizStats.totalQuestions}
        </Text>
        <Text style={styles.additionalStatText}>
          Jawaban Benar: {quizStats.correctAnswers}
        </Text>
        <Text style={styles.additionalStatText}>
          Terakhir Dimainkan: {formatDate(quizStats.lastPlayed)}
        </Text>
      </View>
    </View>
  );
}

export default function StatsScreen() {
  const [stats, setStats] = useState(null);
  const [highScores, setHighScores] = useState(null);
  const [selectedType, setSelectedType] = useState(QUIZ_TYPES[0]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const loadedStats = await getStats();
    const loadedScores = await getHighScores();
    setStats(loadedStats);
    setHighScores(loadedScores);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistik</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.typeSelector}
      >
        {QUIZ_TYPES.map((type) => (
          <Pressable
            key={type.id}
            style={[
              styles.typeButton,
              selectedType.id === type.id && styles.selectedType,
            ]}
            onPress={() => setSelectedType(type)}
          >
            <Text
              style={[
                styles.typeButtonText,
                selectedType.id === type.id && styles.selectedTypeText,
              ]}
            >
              {type.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <QuizStats
          type={selectedType}
          stats={stats}
          highScores={highScores}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  typeSelector: {
    marginBottom: 16,
  },
  typeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  selectedType: {
    backgroundColor: '#007AFF',
  },
  typeButtonText: {
    color: '#666',
  },
  selectedTypeText: {
    color: '#fff',
  },
  content: {
    paddingBottom: 16,
  },
  quizStatsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  quizStatsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  quizStatsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  statTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  highScoresContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  highScoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  highScoreRank: {
    width: 40,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  highScoreValue: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  highScoreDate: {
    fontSize: 14,
    color: '#666',
  },
  additionalStats: {
    gap: 4,
  },
  additionalStatText: {
    fontSize: 14,
    color: '#666',
  },
});
