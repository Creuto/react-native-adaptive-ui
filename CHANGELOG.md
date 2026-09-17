# Changelog

All notable changes to `@creuto/react-native-adaptive-ui` will be documented in this file.

## [0.1.0] - 2026-09-17

### Added
- `AdaptiveText`: Accessible Text component with proportional line height calculations and font scaling support.
- `AdaptiveRow`: Responsive row component with wrapping and dynamic vertical stacking at customizable font scale thresholds.
- `AdaptiveStack`: Vertical container component for predictable spacing and layout.
- `useFontScale`: Hook providing reactive system font scale factor and accessibility threshold classifications (`isLarge`, `isExtraLarge`).
- `useAdaptiveLayout`: Hook providing screen metrics (`width`, `height`, `isSmallScreen`, `isTablet`) and text scale status.
- `clamp` & `responsiveSize`: Responsive metric helper utilities.
- Full TypeScript type declarations and ESM/CJS dual-build outputs.
