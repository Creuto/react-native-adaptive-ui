import { useState, useEffect } from 'react';
import { Dimensions, PixelRatio } from 'react-native';
import { AdaptiveLayoutInfo } from '../types';
import { LARGE_FONT_SCALE_THRESHOLD } from './useFontScale';

export const SMALL_SCREEN_WIDTH_THRESHOLD = 360;
export const TABLET_SCREEN_WIDTH_THRESHOLD = 768;

/**
 * Hook providing key metrics for responsive layout calculations.
 * Reactively updates on screen rotation, resize, or font scale change.
 *
 * @returns {AdaptiveLayoutInfo} `{ fontScale, isLargeText, width, height, isSmallScreen, isTablet }`
 */
export function useAdaptiveLayout(): AdaptiveLayoutInfo {
  const getMetrics = () => {
    const window = Dimensions.get('window');
    const fontScale =
      typeof window.fontScale === 'number' && window.fontScale > 0
        ? window.fontScale
        : PixelRatio.getFontScale();
    const width = window.width;
    const height = window.height;

    return {
      fontScale,
      isLargeText: fontScale >= LARGE_FONT_SCALE_THRESHOLD,
      width,
      height,
      isSmallScreen: width < SMALL_SCREEN_WIDTH_THRESHOLD,
      isTablet: width >= TABLET_SCREEN_WIDTH_THRESHOLD,
    };
  };

  const [layoutInfo, setLayoutInfo] = useState<AdaptiveLayoutInfo>(getMetrics);

  useEffect(() => {
    const handleChange = () => {
      setLayoutInfo(getMetrics());
    };

    const subscription = Dimensions.addEventListener('change', handleChange);

    return () => {
      if (subscription && typeof subscription.remove === 'function') {
        subscription.remove();
      } else if (
        'removeEventListener' in Dimensions &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        typeof (Dimensions as any).removeEventListener === 'function'
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (Dimensions as any).removeEventListener('change', handleChange);
      }
    };
  }, []);

  return layoutInfo;
}
