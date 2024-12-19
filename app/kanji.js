import { useState } from 'react';
import { StyleSheet, ScrollView, Pressable, FlatList, Modal, View as RNView } from 'react-native';
import { Text, View } from '../components/Themed';
import { KANJI_DATA, KANJI_CATEGORIES, JLPT_LEVELS } from '../data/kanji';

function KanjiDetailModal({ kanji, visible, onClose }) {
  if (!kanji) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <RNView style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.kanjiLarge}>{kanji.kanji}</Text>
          <Text style={styles.meaning}>{kanji.meaning}</Text>
          
          <View style={styles.readingSection}>
            <View style={styles.readingBlock}>
              <Text style={styles.readingLabel}>音読み (On'yomi)</Text>
              <Text style={styles.reading}>{kanji.onyomi}</Text>
            </View>
            <View style={styles.readingBlock}>
              <Text style={styles.readingLabel}>訓読み (Kun'yomi)</Text>
              <Text style={styles.reading}>{kanji.kunyomi}</Text>
            </View>
          </View>

          <View style={styles.examplesSection}>
            <Text style={styles.sectionTitle}>Contoh Penggunaan:</Text>
            {kanji.examples.map((example, index) => (
              <Text key={index} style={styles.example}>{example}</Text>
            ))}
          </View>

          <View style={styles.tagContainer}>
            <View style={[styles.tag, styles.levelTag]}>
              <Text style={styles.tagText}>{kanji.level}</Text>
            </View>
            <View style={styles.tag}>
              <Text style={styles.tagText}>{kanji.category}</Text>
            </View>
          </View>

          <Pressable
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Tutup</Text>
          </Pressable>
        </View>
      </RNView>
    </Modal>
  );
}

export default function KanjiScreen() {
  const [selectedKanji, setSelectedKanji] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [modalVisible, setModalVisible] = useState(false);

  const filteredKanji = KANJI_DATA.filter(kanji => 
    (selectedCategory === 'all' || kanji.category === selectedCategory) &&
    (selectedLevel === 'all' || kanji.level === selectedLevel)
  );

  const renderKanjiItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.kanjiCard,
        pressed && styles.pressed,
      ]}
      onPress={() => {
        setSelectedKanji(item);
        setModalVisible(true);
      }}
    >
      <Text style={styles.kanjiText}>{item.kanji}</Text>
      <Text style={styles.meaningText}>{item.meaning}</Text>
    </Pressable>
  );

  const renderFilterItem = ({ item, isLevel = false }) => (
    <Pressable
      style={[
        styles.filterButton,
        (isLevel ? selectedLevel : selectedCategory) === item.id && styles.selectedFilter,
      ]}
      onPress={() => {
        if (isLevel) {
          setSelectedLevel(item.id);
        } else {
          setSelectedCategory(item.id);
        }
      }}
    >
      <Text
        style={[
          styles.filterButtonText,
          (isLevel ? selectedLevel : selectedCategory) === item.id && styles.selectedFilterText,
        ]}
      >
        {item.name}
      </Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Belajar Kanji</Text>
      <Text style={styles.subtitle}>
        Tap pada kanji untuk melihat detail
      </Text>

      <View style={styles.filterContainer}>
        <FlatList
          data={JLPT_LEVELS}
          renderItem={({ item }) => renderFilterItem({ item, isLevel: true })}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterList}
        />
        <FlatList
          data={KANJI_CATEGORIES}
          renderItem={renderFilterItem}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.filterList}
        />
      </View>

      <FlatList
        data={filteredKanji}
        renderItem={renderKanjiItem}
        keyExtractor={item => item.kanji}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.grid}
      />

      <KanjiDetailModal
        kanji={selectedKanji}
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedKanji(null);
        }}
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
  filterContainer: {
    marginBottom: 16,
    gap: 8,
  },
  filterList: {
    flexGrow: 0,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  selectedFilter: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    color: '#666',
  },
  selectedFilterText: {
    color: '#fff',
  },
  grid: {
    paddingBottom: 16,
  },
  kanjiCard: {
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
  kanjiText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  meaningText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
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
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  kanjiLarge: {
    fontSize: 64,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  meaning: {
    fontSize: 24,
    color: '#333',
    marginBottom: 24,
  },
  readingSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 24,
  },
  readingBlock: {
    alignItems: 'center',
  },
  readingLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  reading: {
    fontSize: 16,
    color: '#333',
  },
  examplesSection: {
    width: '100%',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  example: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 8,
  },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  levelTag: {
    backgroundColor: '#e3f2fd',
  },
  tagText: {
    fontSize: 12,
    color: '#666',
  },
  closeButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#007AFF',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
