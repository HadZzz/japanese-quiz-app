import { useEffect, useState } from 'react';
import * as Font from 'expo-font';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';

interface AssetConfig {
  images?: number[];
  fonts?: { [key: string]: number };
}

export function useAssetPreload(assets: AssetConfig) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep splash screen visible while loading assets
        await SplashScreen.preventAutoHideAsync();

        // Pre-load fonts
        if (assets.fonts) {
          await Font.loadAsync(assets.fonts);
        }

        // Pre-load images
        if (assets.images) {
          const imageAssets = assets.images.map((image) => {
            if (typeof image === 'string') {
              return Asset.fromURI(image).downloadAsync();
            }
            return Asset.fromModule(image).downloadAsync();
          });
          await Promise.all(imageAssets);
        }
      } catch (e) {
        console.error('Error preloading assets:', e);
      } finally {
        setIsReady(true);
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  return isReady;
} 