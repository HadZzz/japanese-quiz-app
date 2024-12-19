import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

const logErrorToStorage = async (error: Error, errorInfo: React.ErrorInfo) => {
  try {
    const errorLog = {
      timestamp: new Date().toISOString(),
      error: error.toString(),
      componentStack: errorInfo.componentStack,
    };
    
    // Get existing logs
    const existingLogs = await AsyncStorage.getItem('error_logs');
    const logs = existingLogs ? JSON.parse(existingLogs) : [];
    
    // Add new log and keep only last 10 errors
    logs.unshift(errorLog);
    if (logs.length > 10) logs.length = 10;
    
    await AsyncStorage.setItem('error_logs', JSON.stringify(logs));
  } catch (e) {
    console.error('Failed to log error:', e);
  }
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    logErrorToStorage(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>申し訳ありません!</Text>
          <Text style={styles.subtitle}>Maaf, terjadi kesalahan</Text>
          <Text style={styles.errorText}>{this.state.error?.message}</Text>
          <Pressable style={styles.button} onPress={this.handleRetry}>
            <Text style={styles.buttonText}>Coba Lagi</Text>
          </Pressable>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFF0F5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF1493',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    color: '#FF0000',
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF1493',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 