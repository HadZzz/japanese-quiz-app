import { useState } from 'react';
import { StyleSheet, ScrollView, Pressable, FlatList, Modal, View as RNView, TextInput } from 'react-native';
import { Text, View } from '../components/Themed';
import { VOCABULARY_DATA } from '../data/vocabulary';

function VocabularyDetailModal({ word, visible, onClose }) {
  if (!word) return null;

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <RNView style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.wordLarge}>{word.word}</Text>
          <Text style={styles.reading}>{word.reading}</Text>
          <Text style={styles.meaning}>{word.meaning}</Text>

          {word.example && (
            <View style={styles.exampleSection}>
              <Text style={styles.sectionTitle}>Contoh Penggunaan:</Text>
              <Text style={styles.example}>{word.example}</Text>
            </View>
          )}

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

export default function VocabularyScreen() {
  const [selectedWord, setSelectedWord] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVocabulary = VOCABULARY_DATA.filter(word => 
    searchQuery === '' || 
    word.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
    word.reading.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (word.meaning && word.meaning.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const renderWordItem = ({ item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.wordCard,
        pressed && styles.pressed,
      ]}
      onPress={() => {
        setSelectedWord(item);
        setModalVisible(true);
      }}
    >
      <Text style={styles.wordText}>{item.word}</Text>
      <Text style={styles.readingText}>{item.reading}</Text>
      {item.meaning && <Text style={styles.meaningText}>{item.meaning}</Text>}
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kosakata Jepang</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Cari kata..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery !== '' && (
          <Pressable onPress={() => setSearchQuery('')}>
            <Text>✕</Text>
          </Pressable>
        )}
      </View>

      <FlatList
        data={filteredVocabulary}
        renderItem={renderWordItem}
        keyExtractor={(item, index) => `${item.word}-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />

      <VocabularyDetailModal
        word={selectedWord}
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedWord(null);
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
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    fontSize: 16,
  },
  list: {
    paddingBottom: 16,
  },
  wordCard: {
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
  pressed: {
    opacity: 0.7,
  },
  wordText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  readingText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  meaningText: {
    fontSize: 16,
    color: '#333',
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
  wordLarge: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reading: {
    fontSize: 18,
    color: '#666',
    marginBottom: 8,
  },
  meaning: {
    fontSize: 24,
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  exampleSection: {
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
    lineHeight: 20,
  },
  closeButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#007AFF',
  },
  closeButtonText: {
    color: '#fff',
  },
});
