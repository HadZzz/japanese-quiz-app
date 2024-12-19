import AsyncStorage from '@react-native-async-storage/async-storage';

interface CacheConfig {
  expiryMinutes?: number;
  version?: string;
}

interface CacheData<T> {
  data: T;
  timestamp: number;
  version: string;
}

const DEFAULT_EXPIRY = 60; // 60 minutes
const CURRENT_CACHE_VERSION = '1.0.0';

export class Cache {
  static async set<T>(
    key: string,
    data: T,
    config: CacheConfig = {}
  ): Promise<void> {
    try {
      const cacheData: CacheData<T> = {
        data,
        timestamp: Date.now(),
        version: config.version || CURRENT_CACHE_VERSION,
      };
      await AsyncStorage.setItem(key, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Cache set error:', error);
    }
  }

  static async get<T>(
    key: string,
    config: CacheConfig = {}
  ): Promise<T | null> {
    try {
      const cached = await AsyncStorage.getItem(key);
      if (!cached) return null;

      const cacheData: CacheData<T> = JSON.parse(cached);
      const expiryMinutes = config.expiryMinutes || DEFAULT_EXPIRY;
      const expiryMs = expiryMinutes * 60 * 1000;
      const isExpired = Date.now() - cacheData.timestamp > expiryMs;
      const isVersionMismatch = 
        (config.version || CURRENT_CACHE_VERSION) !== cacheData.version;

      if (isExpired || isVersionMismatch) {
        await AsyncStorage.removeItem(key);
        return null;
      }

      return cacheData.data;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  }

  static async remove(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error('Cache remove error:', error);
    }
  }

  static async clear(): Promise<void> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }
} 