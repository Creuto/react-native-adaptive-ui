import React from 'react';
import { View, ViewStyle } from 'react-native';
import { AdaptiveStackProps } from '../types';

/**
 * Responsive vertical container that simplifies vertical layout, spacing, and alignment.
 */
export const AdaptiveStack: React.FC<AdaptiveStackProps> = ({
  spacing = 8,
  alignItems = 'stretch',
  justifyContent = 'flex-start',
  style,
  children,
  ...restProps
}) => {
  const dynamicStyle: ViewStyle = {
    flexDirection: 'column',
    alignItems,
    justifyContent,
    gap: spacing,
  };

  return (
    <View style={[dynamicStyle, style]} {...restProps}>
      {children}
    </View>
  );
};
