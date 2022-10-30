import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react-hooks/dom';
import { useInterval } from '~/useInterval';

describe('useInterval', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  beforeEach(() => {
    vi.clearAllTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('should be defined', () => {
    expect(useInterval).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useInterval(() => {}, { time: 123 }));
    expect(result.error).toBeUndefined();
  });

  it('should set interval and cancel it on unmount', () => {
    const spy = vi.fn();
    const { unmount } = renderHook(() => useInterval(spy, { time: 100, startOnMount: true }));

    vi.advanceTimersByTime(99);
    expect(spy).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(spy).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(300);
    expect(spy).toHaveBeenCalledTimes(4);

    unmount();
    expect(spy).toHaveBeenCalledTimes(4);
  });

  it('start and stop methods should work', () => {
    const spy = vi.fn();
    const { unmount, result } = renderHook(() => useInterval(spy, { time: 100 }));

    vi.advanceTimersByTime(100);
    expect(spy).not.toHaveBeenCalled();

    result.current.start();

    vi.advanceTimersByTime(100);
    expect(spy).toHaveBeenCalledTimes(1);
    //
    vi.advanceTimersByTime(300);
    expect(spy).toHaveBeenCalledTimes(4);

    result.current.stop();
    vi.advanceTimersByTime(300);
    expect(spy).toHaveBeenCalledTimes(4);

    unmount();
    expect(spy).toHaveBeenCalledTimes(4);
  });

  it('should reset interval if time is changed', () => {
    const spy = vi.fn();
    const { rerender } = renderHook(
      ({ time, startOnMount }) => useInterval(spy, { time, startOnMount }),
      {
        initialProps: { time: 100, startOnMount: true }
      }
    );

    vi.advanceTimersByTime(99);
    expect(spy).not.toHaveBeenCalled();

    rerender({ time: 50, startOnMount: true });
    vi.advanceTimersByTime(49);
    expect(spy).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should cancel interval if time is undefined', () => {
    const spy = vi.fn();
    const { rerender } = renderHook(
      ({ time, startOnMount }) => useInterval(spy, { time, startOnMount }),
      {
        initialProps: { time: 100, startOnMount: true } as {
          time: number | undefined;
          startOnMount: boolean | undefined;
        }
      }
    );

    vi.advanceTimersByTime(99);
    expect(spy).not.toHaveBeenCalled();

    rerender({ time: undefined, startOnMount: true });
    vi.advanceTimersByTime(2000);
    expect(spy).not.toHaveBeenCalled();
  });
});
