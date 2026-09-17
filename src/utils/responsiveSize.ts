import { clamp } from './clamp';

/**
 * Calculates a responsive dimension or font size with optional scaling constraints.
 * Useful for scaling layout metrics (like padding or icons) proportional to font scale
 * while preventing layout overflow at extreme scale levels.
 *
 * @param size - Base size in dp.
 * @param fontScale - Current system font scale factor (default 1.0).
 * @param maxScale - Optional maximum scale cap (e.g., 3.0). Defaults to 3.0.
 * @returns The scaled size.
 */
export function responsiveSize(
  size: number,
  fontScale: number = 1.0,
  maxScale: number = 3.0,
): number {
  if (size <= 0) return 0;
  const effectiveScale = clamp(fontScale, 0.5, maxScale);
  return Math.round(size * effectiveScale * 100) / 100;
}
