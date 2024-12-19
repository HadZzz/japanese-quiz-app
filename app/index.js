import { View, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { Link } from 'expo-router';
import { Text } from '../components/Themed';
import { Card } from '../components/Card';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.sakuraContainer}>
          <MaterialCommunityIcons name="flower" size={24} color="#FF69B4" />
        </View>
        <Text style={styles.title}>日本語を学ぼう!</Text>
        <Text style={styles.subtitle}>Mari Belajar Bahasa Jepang</Text>
        <View style={styles.sakuraContainer}>
          <MaterialCommunityIcons name="flower" size={24} color="#FF69B4" style={styles.rotatedFlower} />
        </View>
      </View>

      <View style={styles.content}>
        <Link href="/hiragana" asChild>
          <Card
            title="Hiragana"
            description="Pelajari huruf dasar Hiragana"
            icon="alphabetical"
          />
        </Link>

        <Link href="/katakana" asChild>
          <Card
            title="Katakana"
            description="Pelajari huruf Katakana"
            icon="alphabetical-variant"
          />
        </Link>

        <Link href="/kanji" asChild>
          <Card
            title="Kanji"
            description="Pelajari huruf Kanji dasar"
            icon="translate"
          />
        </Link>

        <Link href="/vocabulary" asChild>
          <Card
            title="Kosakata"
            description="Pelajari kosakata Bahasa Jepang"
            icon="book-open-page-variant"
          />
        </Link>

        <Link href="/quiz" asChild>
          <Card
            title="Quiz"
            description="Uji kemampuan Bahasa Jepang Anda"
            icon="head-question"
          />
        </Link>

        <Link href="/culture" asChild>
          <Card
            title="Budaya"
            description="Pelajari budaya dan kebiasaan Jepang"
            icon="gate"
          />
        </Link>
      </View>

      <View style={styles.footer}>
        <MaterialCommunityIcons name="flower" size={20} color="#FF69B4" />
        <Text style={styles.footerText}>がんばって!</Text>
        <MaterialCommunityIcons name="flower" size={20} color="#FF69B4" style={styles.rotatedFlower} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF0F5',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: 'rgba(255, 192, 203, 0.3)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    marginBottom: 16,
  },
  sakuraContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF1493',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  content: {
    padding: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  footerText: {
    fontSize: 16,
    color: '#FF69B4',
    fontWeight: 'bold',
  },
  rotatedFlower: {
    transform: [{ rotate: '45deg' }],
  },
});
