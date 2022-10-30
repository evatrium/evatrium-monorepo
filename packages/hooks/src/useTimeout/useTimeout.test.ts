import { renderHook } from '@testing-library/react-hooks/dom';
import { useTimeout } from '~/useTimeout';

describe('useTimeout', () => {
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
    expect(useTimeout).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useTimeout(() => {}, { time: 123 }));
    expect(result.error).toBeUndefined();
  });

  it('should set and call function after timeout', () => {
    const spy = vi.fn();
    renderHook(() => useTimeout(spy, { time: 100, startOnMount: true }));

    vi.advanceTimersByTime(99);
    expect(spy).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('start and cancel methods should work', () => {
    const spy = vi.fn();
    const { unmount, result } = renderHook(() => useTimeout(spy, { time: 100 }));

    vi.advanceTimersByTime(100);
    expect(spy).not.toHaveBeenCalled();

    result.current.start();

    vi.advanceTimersByTime(100);
    expect(spy).toHaveBeenCalledTimes(1);
    //
    result.current.start();
    vi.advanceTimersByTime(99);
    result.current.cancel();

    expect(spy).toHaveBeenCalledTimes(1);

    unmount();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should reset timeout if time is changed', () => {
    const spy = vi.fn();
    const { rerender } = renderHook(
      ({ time, startOnMount }) => useTimeout(spy, { time, startOnMount }),
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
      ({ time, startOnMount }) => useTimeout(spy, { time, startOnMount }),
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
