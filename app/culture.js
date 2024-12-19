import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text } from '../components/Themed';
import { CULTURE_DATA } from '../data/culture';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function CultureScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Budaya Jepang</Text>
        <Text style={styles.subtitle}>Pelajari keunikan budaya Jepang</Text>
      </View>

      {CULTURE_DATA.map((item, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="gate" size={24} color="#666" />
            <Text style={styles.cardTitle}>{item.question}</Text>
          </View>
          <Text style={styles.explanation}>{item.explanation}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
    flex: 1,
  },
  explanation: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});
