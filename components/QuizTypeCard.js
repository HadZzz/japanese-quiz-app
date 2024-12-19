import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Text, View } from './Themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function QuizTypeCard({ type, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed
      ]}
      onPress={onPress}
    >
      <View style={styles.cardContent}>
        <MaterialCommunityIcons 
          name={type.icon || 'book-open-variant'} 
          size={24} 
          color="#666"
        />
        <Text style={styles.title}>{type.title}</Text>
        <Text style={styles.description}>{type.description}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  pressed: {
    opacity: 0.7,
  },
  cardContent: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
});
