import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { AdaptiveTextProps } from '../types';

/**
 * Accessible Text component that respects user accessibility font scaling by default
 * while ensuring line height and line boundaries adapt cleanly to avoid text clipping.
 */
export const AdaptiveText: React.FC<AdaptiveTextProps> = ({
  size = 16,
  maxLines,
  numberOfLines,
  ellipsizeMode = 'tail',
  style,
  allowFontScaling = true,
  children,
  ...restProps
}) => {
  const effectiveNumberOfLines = maxLines ?? numberOfLines;

  // Flatten incoming style to inspect any user-provided fontSize or lineHeight
  const flattenedStyle = (StyleSheet.flatten(style) as TextStyle) || {};
  const baseFontSize = flattenedStyle.fontSize ?? size;

  // Ensure line height scales proportionally unless explicitly overridden
  const defaultLineHeight = Math.round(baseFontSize * 1.35);
  const computedStyle: TextStyle = {
    fontSize: baseFontSize,
    lineHeight: flattenedStyle.lineHeight ?? defaultLineHeight,
  };

  return (
    <Text
      allowFontScaling={allowFontScaling}
      numberOfLines={effectiveNumberOfLines}
      ellipsizeMode={ellipsizeMode}
      style={[computedStyle, style]}
      {...restProps}
    >
      {children}
    </Text>
  );
};
