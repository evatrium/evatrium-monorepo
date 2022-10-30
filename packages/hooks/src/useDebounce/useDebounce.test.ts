import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react-hooks/dom';
import { useDebounce } from '~/useDebounce';

describe('useDebounce', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should be defined', () => {
    expect(useDebounce).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => {
      useDebounce(() => {}, 200);
    });
    expect(result.error).toBeUndefined();
  });

  it('should run given callback only after specified delay since last call', () => {
    const cb = vi.fn();
    const { result } = renderHook(() => useDebounce(cb, 200));

    result.current();
    expect(cb).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);
    result.current();

    vi.advanceTimersByTime(199);
    expect(cb).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('should pass parameters to callback', () => {
    const cb = vi.fn((_a: number, _c: string) => {});
    const { result } = renderHook(() => useDebounce(cb, 200));

    result.current(1, 'abc');
    vi.advanceTimersByTime(200);
    expect(cb).toHaveBeenCalledWith(1, 'abc');
  });

  it('should cancel debounce when unmounted', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const cb = vi.fn();
    const { result, unmount } = renderHook(() => useDebounce(cb, 200));

    result.current();
    vi.advanceTimersByTime(100);
    result.current();
    vi.advanceTimersByTime(100);
    unmount();
    vi.advanceTimersByTime(100);
    expect(cb).not.toHaveBeenCalled();
  });
});
