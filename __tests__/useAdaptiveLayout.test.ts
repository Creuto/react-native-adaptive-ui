import { renderHook, act } from '@testing-library/react-native';
import { Dimensions } from 'react-native';
import { useAdaptiveLayout } from '../src/hooks/useAdaptiveLayout';

describe('useAdaptiveLayout', () => {
  let eventListenerCallback: ((event: any) => void) | null = null;
  const mockRemove = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    eventListenerCallback = null;

    jest.spyOn(Dimensions, 'get').mockReturnValue({
      width: 375,
      height: 812,
      scale: 2,
      fontScale: 1.0,
    } as any);

    jest
      .spyOn(Dimensions, 'addEventListener')
      .mockImplementation((event: string, callback: any) => {
        if (event === 'change') {
          eventListenerCallback = callback;
        }
        return { remove: mockRemove } as any;
      });
  });

  it('identifies standard mobile screen layout correctly', () => {
    const { result } = renderHook(() => useAdaptiveLayout());
    expect(result.current.width).toBe(375);
    expect(result.current.height).toBe(812);
    expect(result.current.isSmallScreen).toBe(false);
    expect(result.current.isTablet).toBe(false);
    expect(result.current.isLargeText).toBe(false);
  });

  it('identifies small screen width (< 360)', () => {
    jest.spyOn(Dimensions, 'get').mockReturnValue({
      width: 320,
      height: 568,
      scale: 2,
      fontScale: 1.0,
    } as any);

    const { result } = renderHook(() => useAdaptiveLayout());
    expect(result.current.isSmallScreen).toBe(true);
    expect(result.current.isTablet).toBe(false);
  });

  it('identifies tablet width (>= 768)', () => {
    jest.spyOn(Dimensions, 'get').mockReturnValue({
      width: 834,
      height: 1194,
      scale: 2,
      fontScale: 1.0,
    } as any);

    const { result } = renderHook(() => useAdaptiveLayout());
    expect(result.current.isSmallScreen).toBe(false);
    expect(result.current.isTablet).toBe(true);
  });

  it('updates metrics dynamically on screen orientation/dimension change', () => {
    const { result } = renderHook(() => useAdaptiveLayout());
    expect(result.current.isTablet).toBe(false);

    jest.spyOn(Dimensions, 'get').mockReturnValue({
      width: 1024,
      height: 768,
      scale: 2,
      fontScale: 1.4,
    } as any);

    act(() => {
      if (eventListenerCallback) {
        eventListenerCallback({
          window: { width: 1024, height: 768, scale: 2, fontScale: 1.4 },
        });
      }
    });

    expect(result.current.width).toBe(1024);
    expect(result.current.isTablet).toBe(true);
    expect(result.current.isLargeText).toBe(true);
  });
});
