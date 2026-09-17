import { clamp } from '../src/utils/clamp';
import { responsiveSize } from '../src/utils/responsiveSize';

describe('clamp', () => {
  it('returns the value when within bounds', () => {
    expect(clamp(15, 10, 20)).toBe(15);
  });

  it('returns min when value is less than min', () => {
    expect(clamp(5, 10, 20)).toBe(10);
  });

  it('returns max when value is greater than max', () => {
    expect(clamp(25, 10, 20)).toBe(20);
  });

  it('handles negative values correctly', () => {
    expect(clamp(-15, -20, -10)).toBe(-15);
    expect(clamp(-25, -20, -10)).toBe(-20);
    expect(clamp(-5, -20, -10)).toBe(-10);
  });

  it('throws RangeError when min > max', () => {
    expect(() => clamp(10, 20, 10)).toThrow(RangeError);
  });
});

describe('responsiveSize', () => {
  it('returns unchanged size at fontScale 1.0', () => {
    expect(responsiveSize(16, 1.0)).toBe(16);
  });

  it('scales size proportionally at fontScale 1.5', () => {
    expect(responsiveSize(16, 1.5)).toBe(24);
  });

  it('respects custom maxScale cap', () => {
    expect(responsiveSize(16, 2.5, 2.0)).toBe(32);
  });

  it('returns 0 for size <= 0', () => {
    expect(responsiveSize(0, 1.5)).toBe(0);
    expect(responsiveSize(-10, 1.5)).toBe(0);
  });
});
