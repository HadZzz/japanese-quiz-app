import { useState } from 'react';
import { StyleSheet, ScrollView, Pressable, FlatList } from 'react-native';
import { Text, View } from '../components/Themed';
import { KATAKANA_DATA } from '../data/katakana';

const GROUPS = [
  { id: 'all', name: 'Semua' },
  { id: 'vowel', name: 'Vokal' },
  { id: 'k', name: 'K-Group' },
  { id: 's', name: 'S-Group' },
  { id: 't', name: 'T-Group' },
  { id: 'n', name: 'N-Group' },
  { id: 'h', name: 'H-Group' },
  { id: 'm', name: 'M-Group' },
  { id: 'y', name: 'Y-Group' },
  { id: 'r', name: 'R-Group' },
  { id: 'w', name: 'W-Group' },
  { id: 'k-dakuten', name: 'K + Dakuten' },
  { id: 's-dakuten', name: 'S + Dakuten' },
  { id: 't-dakuten', name: 'T + Dakuten' },
  { id: 'h-dakuten', name: 'H + Dakuten' },
  { id: 'h-handakuten', name: 'H + Handakuten' },
  { id: 'combination', name: 'Kombinasi' },
];

export default function KatakanaScreen() {
  const [selectedKana, setSelectedKana] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState('all');

  const filteredKana = KATAKANA_DATA.filter(
    item => selectedGroup === 'all' || item.type === selectedGroup
  );

  const renderKanaItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.kanaCard,
        pressed && styles.pressed,
        selectedKana?.kana === item.kana && styles.selected,
      ]}
      onPress={() => setSelectedKana(item)}
    >
      <Text style={styles.kana}>{item.kana}</Text>
      {selectedKana?.kana === item.kana && (
        <Text style={styles.romaji}>{item.romaji}</Text>
      )}
    </Pressable>
  );

  const renderGroupItem = ({ item }) => (
    <Pressable
      style={[
        styles.groupButton,
        selectedGroup === item.id && styles.selectedGroup,
      ]}
      onPress={() => setSelectedGroup(item.id)}
    >
      <Text
        style={[
          styles.groupButtonText,
          selectedGroup === item.id && styles.selectedGroupText,
        ]}
      >
        {item.name}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Belajar Katakana</Text>
      <Text style={styles.subtitle}>
        Tap pada karakter untuk melihat cara bacanya
      </Text>

      <View style={styles.groupContainer}>
        <FlatList
          data={GROUPS}
          renderItem={renderGroupItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.groupList}
        />
      </View>

      <FlatList
        data={filteredKana}
        renderItem={renderKanaItem}
        keyExtractor={item => item.kana}
        numColumns={4}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.grid}
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
  groupContainer: {
    marginBottom: 16,
  },
  groupList: {
    flexGrow: 0,
  },
  groupButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  selectedGroup: {
    backgroundColor: '#007AFF',
  },
  groupButtonText: {
    color: '#666',
  },
  selectedGroupText: {
    color: '#fff',
  },
  grid: {
    paddingBottom: 16,
  },
  kanaCard: {
    flex: 1,
    aspectRatio: 1,
    margin: 4,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
  selected: {
    backgroundColor: '#e3f2fd',
  },
  kana: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  romaji: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
