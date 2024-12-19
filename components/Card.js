import React, { forwardRef } from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import { Text } from './Themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export const Card = forwardRef(({ title, description, icon, style, ...props }, ref) => {
  return (
    <Pressable
      ref={ref}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
        style,
      ]}
      {...props}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={icon} size={32} color="#FF69B4" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.japanesePattern} />
    </Pressable>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#FFB6C1',
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FFF0F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF1493',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
  japanesePattern: {
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
