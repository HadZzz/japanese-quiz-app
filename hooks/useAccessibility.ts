import { useCallback, useEffect, useState } from 'react';
import { AccessibilityInfo, TextStyle } from 'react-native';
import { Cache } from '../utils/cache';

interface AccessibilitySettings {
  isScreenReaderEnabled: boolean;
  fontScale: number;
  reduceMotion: boolean;
  highContrast: boolean;
}

const ACCESSIBILITY_SETTINGS_KEY = 'accessibility_settings';
const DEFAULT_SETTINGS: AccessibilitySettings = {
  isScreenReaderEnabled: false,
  fontScale: 1,
  reduceMotion: false,
  highContrast: false,
};

export function useAccessibility() {
  const [settings, setSettings] = useState<AccessibilitySettings>(DEFAULT_SETTINGS);

  const initialize = useCallback(async () => {
    try {
      // Load saved settings
      const savedSettings = await Cache.get<AccessibilitySettings>(ACCESSIBILITY_SETTINGS_KEY);
      if (savedSettings) {
        setSettings(savedSettings);
      }

      // Check screen reader status
      const screenReaderEnabled = await AccessibilityInfo.isScreenReaderEnabled();
      updateSettings({ isScreenReaderEnabled: screenReaderEnabled });

    } catch (error) {
      console.error('Error initializing accessibility:', error);
    }
  }, []);

  useEffect(() => {
    initialize();

    // Listen for screen reader changes
    const screenReaderListener = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      (isEnabled) => {
        updateSettings({ isScreenReaderEnabled: isEnabled });
      }
    );

    return () => {
      screenReaderListener.remove();
    };
  }, []);

  const updateSettings = useCallback(async (newSettings: Partial<AccessibilitySettings>) => {
    try {
      const updatedSettings = {
        ...settings,
        ...newSettings,
      };
      setSettings(updatedSettings);
      await Cache.set(ACCESSIBILITY_SETTINGS_KEY, updatedSettings);
    } catch (error) {
      console.error('Error updating accessibility settings:', error);
    }
  }, [settings]);

  const getAccessibleStyles = useCallback((baseStyles: TextStyle): TextStyle => {
    const { fontScale, highContrast } = settings;
    
    return {
      ...baseStyles,
      fontSize: (baseStyles.fontSize || 14) * fontScale,
      ...(highContrast && {
        color: '#FFFFFF',
        backgroundColor: '#000000',
      }),
    };
  }, [settings]);

  const speak = useCallback(async (text: string, options?: { queue?: boolean }) => {
    if (settings.isScreenReaderEnabled) {
      await AccessibilityInfo.announceForAccessibility(text);
    }
  }, [settings.isScreenReaderEnabled]);

  const getAccessibleProps = useCallback((
    label: string,
    role?: AccessibilityRole,
    additionalProps?: object
  ) => {
    return {
      accessible: true,
      accessibilityLabel: label,
      ...(role && { accessibilityRole: role }),
      ...additionalProps,
    };
  }, []);

  return {
    settings,
    updateSettings,
    getAccessibleStyles,
    speak,
    getAccessibleProps,
    initialize,
  };
}

type AccessibilityRole = 
  | 'none'
  | 'button'
  | 'link'
  | 'search'
  | 'image'
  | 'keyboardkey'
  | 'text'
  | 'adjustable'
  | 'header'
  | 'summary'
  | 'imagebutton'; 