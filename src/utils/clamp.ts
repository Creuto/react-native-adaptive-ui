/**
 * Restricts a given numeric value within a minimum and maximum boundary.
 *
 * @param value - The value to clamp.
 * @param min - The lower bound.
 * @param max - The upper bound.
 * @returns The clamped value.
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new RangeError(`min (${min}) cannot be greater than max (${max})`);
  }
  return Math.min(Math.max(value, min), max);
}
