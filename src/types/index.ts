import React from 'react';
import { TextProps, ViewProps, FlexAlignType, ViewStyle } from 'react-native';

/**
 * Options and info returned by `useFontScale` hook.
 */
export interface FontScaleInfo {
  /** The current system font scale factor (1.0 = 100%, 1.5 = 150%, etc.). */
  fontScale: number;
  /** True if font scale is at or above the large threshold (default >= 1.3). */
  isLarge: boolean;
  /** True if font scale is at or above the extra large threshold (default >= 1.7). */
  isExtraLarge: boolean;
}

/**
 * Options and layout metrics returned by `useAdaptiveLayout` hook.
 */
export interface AdaptiveLayoutInfo {
  /** The current system font scale factor. */
  fontScale: number;
  /** True if font scale is considered large (fontScale >= 1.3). */
  isLargeText: boolean;
  /** Current window width in density-independent pixels (dp). */
  width: number;
  /** Current window height in density-independent pixels (dp). */
  height: number;
  /** True if the device screen width is small (< 360dp). */
  isSmallScreen: boolean;
  /** True if the device screen width is tablet sized (>= 768dp). */
  isTablet: boolean;
}

/**
 * Props for `AdaptiveText` component.
 */
export interface AdaptiveTextProps extends TextProps {
  /** Base font size in dp before scaling. Default is 16. */
  size?: number;
  /** Alias for numberOfLines to specify max lines constraint. */
  maxLines?: number;
  /** Children elements or text content. */
  children?: React.ReactNode;
}

/**
 * Props for `AdaptiveRow` component.
 */
export interface AdaptiveRowProps extends ViewProps {
  /** Whether items inside the row should wrap when they exceed row width. Default is true. */
  wrap?: boolean;
  /** Font scale threshold at which the row automatically switches to a vertical stack. Default is 1.5. Set to null to disable auto-stacking. */
  stackAtFontScale?: number | null;
  /** Spacing (gap) between row items in dp. Default is 8. */
  spacing?: number;
  /** Align items setting for flex layout. Default is 'center'. */
  alignItems?: FlexAlignType;
  /** Justify content setting for flex layout. Default is 'flex-start'. */
  justifyContent?: ViewStyle['justifyContent'];
  /** Children to render inside the row. */
  children?: React.ReactNode;
}

/**
 * Props for `AdaptiveStack` component.
 */
export interface AdaptiveStackProps extends ViewProps {
  /** Spacing (gap) between stack items in dp. Default is 8. */
  spacing?: number;
  /** Align items setting for flex layout. Default is 'stretch'. */
  alignItems?: FlexAlignType;
  /** Justify content setting for flex layout. Default is 'flex-start'. */
  justifyContent?: ViewStyle['justifyContent'];
  /** Children to render inside the stack. */
  children?: React.ReactNode;
}
