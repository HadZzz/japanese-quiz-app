import React from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { Text } from './Themed';

export function LearningItem({ character, reading, meaning, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <View style={styles.content}>
        <Text style={styles.character}>{character}</Text>
        <View style={styles.info}>
          <Text style={styles.reading}>{reading}</Text>
          <Text style={styles.meaning}>{meaning}</Text>
        </View>
      </View>
      <View style={styles.pattern} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFB6C1',
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  character: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FF1493',
    marginRight: 16,
    width: 50,
    textAlign: 'center',
  },
  info: {
    flex: 1,
  },
  reading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  meaning: {
    fontSize: 14,
    color: '#888',
  },
  pattern: {
    position: 'absolute',
    right: -20,
    top: -20,
    width: 100,
    height: 100,
    backgroundColor: '#FFF0F5',
    opacity: 0.2,
    borderRadius: 50,
    transform: [{ rotate: '45deg' }],
  },
});
