import { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, Switch, Pressable } from 'react-native';
import { Text, View } from '../components/Themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { saveSettings, getSettings } from '../utils/storage';
import Slider from '@react-native-community/slider';

function SettingItem({ icon, title, description, children }) {
  return (
    <View style={styles.settingItem}>
      <View style={styles.settingHeader}>
        <MaterialCommunityIcons name={icon} size={24} color="#007AFF" />
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          <Text style={styles.settingDescription}>{description}</Text>
        </View>
      </View>
      <View style={styles.settingControl}>
        {children}
      </View>
    </View>
  );
}

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    timerEnabled: false,
    timerDuration: 30,
    showHints: true,
    practiceMode: false,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const savedSettings = await getSettings();
    setSettings(savedSettings);
    setIsLoading(false);
  };

  const updateSetting = async (key, value) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pengaturan</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quiz</Text>

          <SettingItem
            icon="timer"
            title="Mode Timer"
            description="Batasi waktu untuk menjawab setiap pertanyaan"
          >
            <Switch
              value={settings.timerEnabled}
              onValueChange={(value) => updateSetting('timerEnabled', value)}
            />
          </SettingItem>

          {settings.timerEnabled && (
            <SettingItem
              icon="timer-outline"
              title="Durasi Timer"
              description={`${settings.timerDuration} detik per pertanyaan`}
            >
              <View style={styles.sliderContainer}>
                <Slider
                  style={styles.slider}
                  minimumValue={10}
                  maximumValue={60}
                  step={5}
                  value={settings.timerDuration}
                  onValueChange={(value) => updateSetting('timerDuration', value)}
                  minimumTrackTintColor="#007AFF"
                  maximumTrackTintColor="#f0f0f0"
                />
              </View>
            </SettingItem>
          )}

          <SettingItem
            icon="lightbulb-outline"
            title="Tampilkan Hint"
            description="Tampilkan bantuan cara baca untuk Kanji dan Kosakata"
          >
            <Switch
              value={settings.showHints}
              onValueChange={(value) => updateSetting('showHints', value)}
            />
          </SettingItem>

          <SettingItem
            icon="book-open-variant"
            title="Mode Latihan"
            description="Tanpa skor dan batas waktu, fokus untuk belajar"
          >
            <Switch
              value={settings.practiceMode}
              onValueChange={(value) => updateSetting('practiceMode', value)}
            />
          </SettingItem>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tentang</Text>

          <SettingItem
            icon="information"
            title="Versi Aplikasi"
            description="1.0.0"
          />

          <SettingItem
            icon="heart"
            title="Dibuat dengan ❤️"
            description="Oleh Tim Pengembang"
          />
        </View>
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
    marginBottom: 24,
  },
  content: {
    paddingBottom: 16,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#666',
  },
  settingItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  settingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  settingText: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: '#666',
  },
  settingControl: {
    marginTop: 8,
    alignItems: 'flex-end',
  },
  sliderContainer: {
    width: '100%',
    paddingTop: 8,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});
