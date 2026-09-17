import { renderHook, act } from '@testing-library/react-native';
import { Dimensions } from 'react-native';
import { useFontScale } from '../src/hooks/useFontScale';

describe('useFontScale', () => {
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

  it('returns default font scale 1.0 and false flags for normal font scale', () => {
    const { result } = renderHook(() => useFontScale());
    expect(result.current.fontScale).toBe(1.0);
    expect(result.current.isLarge).toBe(false);
    expect(result.current.isExtraLarge).toBe(false);
  });

  it('detects large font scale (>= 1.3)', () => {
    jest.spyOn(Dimensions, 'get').mockReturnValue({
      width: 375,
      height: 812,
      scale: 2,
      fontScale: 1.5,
    } as any);

    const { result } = renderHook(() => useFontScale());
    expect(result.current.fontScale).toBe(1.5);
    expect(result.current.isLarge).toBe(true);
    expect(result.current.isExtraLarge).toBe(false);
  });

  it('detects extra large font scale (>= 1.7)', () => {
    jest.spyOn(Dimensions, 'get').mockReturnValue({
      width: 375,
      height: 812,
      scale: 2,
      fontScale: 2.0,
    } as any);

    const { result } = renderHook(() => useFontScale());
    expect(result.current.fontScale).toBe(2.0);
    expect(result.current.isLarge).toBe(true);
    expect(result.current.isExtraLarge).toBe(true);
  });

  it('updates reactively on dimension change event', () => {
    const { result } = renderHook(() => useFontScale());
    expect(result.current.fontScale).toBe(1.0);

    jest.spyOn(Dimensions, 'get').mockReturnValue({
      width: 375,
      height: 812,
      scale: 2,
      fontScale: 1.8,
    } as any);

    act(() => {
      if (eventListenerCallback) {
        eventListenerCallback({
          window: { width: 375, height: 812, scale: 2, fontScale: 1.8 },
          screen: { width: 375, height: 812, scale: 2, fontScale: 1.8 },
        });
      }
    });

    expect(result.current.fontScale).toBe(1.8);
    expect(result.current.isLarge).toBe(true);
    expect(result.current.isExtraLarge).toBe(true);
  });
});
