import React from 'react';
import { View, ViewStyle } from 'react-native';
import { AdaptiveRowProps } from '../types';
import { useFontScale } from '../hooks/useFontScale';

/**
 * Lightweight row component that automatically adapts its layout when accessibility
 * font sizes increase by either wrapping content or converting to a vertical stack.
 */
export const AdaptiveRow: React.FC<AdaptiveRowProps> = ({
  wrap = true,
  stackAtFontScale = 1.5,
  spacing = 8,
  alignItems = 'center',
  justifyContent = 'flex-start',
  style,
  children,
  ...restProps
}) => {
  const { fontScale } = useFontScale();

  const shouldStack =
    stackAtFontScale !== null && stackAtFontScale !== undefined && fontScale >= stackAtFontScale;

  const dynamicStyle: ViewStyle = {
    flexDirection: shouldStack ? 'column' : 'row',
    flexWrap: !shouldStack && wrap ? 'wrap' : 'nowrap',
    alignItems: shouldStack ? (alignItems === 'center' ? 'stretch' : alignItems) : alignItems,
    justifyContent,
    gap: spacing,
  };

  return (
    <View style={[dynamicStyle, style]} {...restProps}>
      {children}
    </View>
  );
};
