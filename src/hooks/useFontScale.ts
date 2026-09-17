import { useState, useEffect } from 'react';
import { PixelRatio, Dimensions } from 'react-native';
import { FontScaleInfo } from '../types';

/** Threshold for considering text scaling as "large" (>= 130% scaling) */
export const LARGE_FONT_SCALE_THRESHOLD = 1.3;

/** Threshold for considering text scaling as "extra large" (>= 170% scaling) */
export const EXTRA_LARGE_FONT_SCALE_THRESHOLD = 1.7;

/**
 * Hook to retrieve the current accessibility font scale factor and classification flags.
 * Automatically updates when system font scale or screen settings change.
 *
 * @returns {FontScaleInfo} `{ fontScale, isLarge, isExtraLarge }`
 */
export function useFontScale(): FontScaleInfo {
  const getScale = (): number => {
    const windowScale = Dimensions.get('window').fontScale;
    return typeof windowScale === 'number' && windowScale > 0
      ? windowScale
      : PixelRatio.getFontScale();
  };

  const [fontScale, setFontScale] = useState<number>(getScale);

  useEffect(() => {
    const handleDimensionChange = () => {
      setFontScale(getScale());
    };

    const subscription = Dimensions.addEventListener('change', handleDimensionChange);

    return () => {
      if (subscription && typeof subscription.remove === 'function') {
        subscription.remove();
      } else if (
        'removeEventListener' in Dimensions &&
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        typeof (Dimensions as any).removeEventListener === 'function'
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (Dimensions as any).removeEventListener('change', handleDimensionChange);
      }
    };
  }, []);

  return {
    fontScale,
    isLarge: fontScale >= LARGE_FONT_SCALE_THRESHOLD,
    isExtraLarge: fontScale >= EXTRA_LARGE_FONT_SCALE_THRESHOLD,
  };
}
