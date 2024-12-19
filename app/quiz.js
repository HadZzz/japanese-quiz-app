import { useState, useEffect, useRef } from 'react';
import { StyleSheet, Pressable, FlatList, Modal, View as RNView, Animated } from 'react-native';
import { Text, View } from '../components/Themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import QuizTypeCard from '../components/QuizTypeCard';
import {
  QUIZ_TYPES,
  generateHiraganaQuiz,
  generateKatakanaQuiz,
  generateKanjiQuiz,
  generateVocabularyQuiz,
  generateCultureQuiz
} from '../data/quiz';
import { saveHighScore, updateStats, getSettings } from '../utils/storage';

function Timer({ duration, onTimeout, isActive }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const timerRef = useRef(null);
  const animatedValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            clearInterval(timerRef.current);
            onTimeout();
            return 0;
          }
          return time - 1;
        });
      }, 1000);

      // Animate progress bar
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: timeLeft * 1000,
        useNativeDriver: false,
      }).start();
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      animatedValue.setValue(1);
    };
  }, [isActive]);

  const width = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.timerContainer}>
      <View style={styles.timerBar}>
        <Animated.View
          style={[
            styles.timerProgress,
            {
              width,
              backgroundColor: timeLeft < 5 ? '#F44336' : '#4CAF50',
            },
          ]}
        />
      </View>
      <Text style={styles.timerText}>{timeLeft}s</Text>
    </View>
  );
}

function QuizModal({ visible, onClose, type }) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [settings, setSettings] = useState(null);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible && type) {
      loadSettings();
      setQuizStartTime(Date.now());
    }
  }, [visible, type]);

  const loadSettings = async () => {
    const loadedSettings = await getSettings();
    setSettings(loadedSettings);
    
    // Generate questions based on quiz type
    const quizQuestions = type.generator ? type.generator() : [];
    setQuestions(quizQuestions);
    resetQuiz();
  };

  const resetQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowHint(false);
    setQuizStartTime(Date.now());
    setIsTimerActive(true);
  };

  const handleTimeout = () => {
    if (!selectedAnswer) {
      handleAnswer(null);
    }
  };

  const handleAnswer = async (answer) => {
    if (selectedAnswer !== null) return;

    setIsTimerActive(false);
    const correct = answer === questions[currentIndex].correctAnswer;
    setSelectedAnswer(answer);
    setIsCorrect(correct);

    if (correct && !settings?.practiceMode) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        // Animate transition
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(slideAnim, {
            toValue: -50,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start(() => {
          setCurrentIndex(currentIndex + 1);
          setSelectedAnswer(null);
          setIsCorrect(null);
          setShowHint(false);
          setIsTimerActive(true);
          slideAnim.setValue(50);
          
          Animated.parallel([
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 200,
              useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
              toValue: 0,
              duration: 200,
              useNativeDriver: true,
            }),
          ]).start();
        });
      } else {
        const quizEndTime = Date.now();
        const timeSpent = Math.round((quizEndTime - quizStartTime) / 1000);

        if (!settings?.practiceMode) {
          // Save high score
          const handleScoreSaving = async () => {
            await saveHighScore(type.id, score, questions.length);

            // Update statistics
            await updateStats(type.id, {
              totalQuestions: questions.length,
              correctAnswers: score,
              timeSpent,
            });
          };
          handleScoreSaving();
        }

        setShowResult(true);
      }
    }, 1500);
  };

  if (!visible || !type || !settings || questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];

  const renderContent = () => {
    if (showResult) {
      return (
        <View style={styles.resultContainer}>
          {!settings.practiceMode && (
            <>
              <Text style={styles.resultTitle}>Quiz Selesai!</Text>
              <Text style={styles.resultScore}>
                Skor Anda: {score}/{questions.length}
              </Text>
              <Text style={styles.resultPercentage}>
                ({Math.round((score / questions.length) * 100)}%)
              </Text>
            </>
          )}
          
          <Pressable
            style={styles.button}
            onPress={resetQuiz}
          >
            <Text style={styles.buttonText}>Ulangi Quiz</Text>
          </Pressable>
          <Pressable
            style={[styles.button, styles.secondaryButton]}
            onPress={onClose}
          >
            <Text style={styles.secondaryButtonText}>Kembali ke Menu</Text>
          </Pressable>
        </View>
      );
    }

    return (
      <Animated.View
        style={[
          styles.quizContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateX: slideAnim }],
          },
        ]}
      >
        {settings.timerEnabled && !settings.practiceMode && (
          <Timer
            duration={settings.timerDuration}
            onTimeout={handleTimeout}
            isActive={isTimerActive}
          />
        )}

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((currentIndex + 1) / questions.length) * 100}%` },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {currentIndex + 1}/{questions.length}
          </Text>
        </View>

        <Text style={styles.question}>{currentQuestion.question}</Text>
        <Text style={styles.character}>{currentQuestion.character}</Text>

        {settings.showHints && currentQuestion.hint && (
          <Pressable
            style={styles.hintButton}
            onPress={() => setShowHint(!showHint)}
          >
            <Text style={styles.hintButtonText}>
              {showHint ? currentQuestion.hint : 'Tampilkan Cara Baca'}
            </Text>
          </Pressable>
        )}

        <View style={styles.choicesContainer}>
          {currentQuestion.choices.map((choice, index) => (
            <Pressable
              key={index}
              style={[
                styles.choiceButton,
                selectedAnswer === choice &&
                  (isCorrect ? styles.correctChoice : styles.wrongChoice),
                selectedAnswer !== null &&
                  choice === currentQuestion.correctAnswer &&
                  styles.correctChoice,
              ]}
              onPress={() => handleAnswer(choice)}
              disabled={selectedAnswer !== null}
            >
              <Text
                style={[
                  styles.choiceText,
                  selectedAnswer === choice &&
                    (isCorrect
                      ? styles.correctChoiceText
                      : styles.wrongChoiceText),
                  selectedAnswer !== null &&
                    choice === currentQuestion.correctAnswer &&
                    styles.correctChoiceText,
                ]}
              >
                {choice}
              </Text>
            </Pressable>
          ))}
        </View>

        {settings.practiceMode && (
          <Pressable
            style={styles.skipButton}
            onPress={() => handleAnswer(null)}
          >
            <Text style={styles.skipButtonText}>Lewati</Text>
          </Pressable>
        )}
      </Animated.View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <RNView style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {renderContent()}
        </View>
      </RNView>
    </Modal>
  );
}

export default function QuizScreen() {
  const [selectedType, setSelectedType] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const renderQuizType = ({ item }) => (
    <QuizTypeCard
      type={item}
      onPress={() => {
        setSelectedType(item);
        setModalVisible(true);
      }}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz Bahasa Jepang</Text>
      <Text style={styles.subtitle}>
        Pilih jenis quiz untuk menguji kemampuan Anda
      </Text>

      <FlatList
        data={QUIZ_TYPES}
        renderItem={renderQuizType}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.quizTypeList}
      />

      <QuizModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedType(null);
        }}
        type={selectedType}
      />
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  quizTypeList: {
    gap: 12,
  },
  quizTypeCard: {
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
  pressed: {
    opacity: 0.7,
  },
  quizTypeName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  quizTypeDescription: {
    fontSize: 14,
    color: '#666',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  quizContainer: {
    alignItems: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    width: '100%',
  },
  progressBar: {
    flex: 1,
    height: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
  },
  question: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
  character: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  hintButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginBottom: 24,
  },
  hintButtonText: {
    color: '#666',
    fontSize: 14,
  },
  choicesContainer: {
    width: '100%',
    gap: 8,
  },
  choiceButton: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#f0f0f0',
  },
  choiceText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  correctChoice: {
    backgroundColor: '#4CAF50',
  },
  wrongChoice: {
    backgroundColor: '#F44336',
  },
  correctChoiceText: {
    color: '#fff',
  },
  wrongChoiceText: {
    color: '#fff',
  },
  resultContainer: {
    alignItems: 'center',
    padding: 16,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  resultScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 8,
  },
  resultPercentage: {
    fontSize: 18,
    color: '#666',
    marginBottom: 24,
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    marginBottom: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
  },
  secondaryButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timerContainer: {
    width: '100%',
    marginBottom: 16,
  },
  timerBar: {
    height: 4,
    backgroundColor: '#f0f0f0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  timerProgress: {
    height: '100%',
    borderRadius: 2,
  },
  timerText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 4,
  },
  skipButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  skipButtonText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
