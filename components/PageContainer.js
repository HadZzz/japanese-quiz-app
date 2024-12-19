import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Text } from './Themed';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export function PageContainer({ children, title, subtitle, showSakura = true }) {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {showSakura && (
          <View style={styles.sakuraContainer}>
            <MaterialCommunityIcons name="flower" size={24} color="#FF69B4" />
          </View>
        )}
        <Text style={styles.title}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        {showSakura && (
          <View style={styles.sakuraContainer}>
            <MaterialCommunityIcons 
              name="flower" 
              size={24} 
              color="#FF69B4" 
              style={styles.rotatedFlower} 
            />
          </View>
        )}
      </View>

      <View style={styles.content}>
        {children}
      </View>

      <View style={styles.footer}>
        <MaterialCommunityIcons name="flower" size={20} color="#FF69B4" />
        <Text style={styles.footerText}>がんばって!</Text>
        <MaterialCommunityIcons 
          name="flower" 
          size={20} 
          color="#FF69B4" 
          style={styles.rotatedFlower} 
        />
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
    textAlign: 'center',
  },
  content: {
    flex: 1,
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
