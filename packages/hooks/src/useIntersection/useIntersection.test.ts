import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useIntersection } from '~/useIntersection';
import { expect } from 'vitest';

describe('useIntersection', () => {
  let IntersectionObserverSpy: any; // Mock<IntersectionObserver>
  const initialRO = global.ResizeObserver;

  beforeAll(() => {
    IntersectionObserverSpy = vi.fn(() => ({
      observe: vi.fn(),
      unobserve: vi.fn(),
      disconnect: vi.fn(),
      takeRecords: () => [],
      root: document,
      rootMargin: '0px',
      thresholds: [0]
    }));

    global.IntersectionObserver = IntersectionObserverSpy;
    vi.useFakeTimers();
  });

  beforeEach(() => {
    IntersectionObserverSpy.mockClear();
  });

  afterAll(() => {
    global.ResizeObserver = initialRO;
    vi.useRealTimers();
  });

  it('should be defined', () => {
    expect(useIntersection).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useIntersection(null));
    expect(result.error).toBeUndefined();
  });

  it('should return undefined on first render', () => {
    const div1 = document.createElement('div');
    const { result } = renderHook(() => useIntersection(div1));
    expect(result.current).toBeUndefined();
  });

  it('should create IntersectionObserver instance only for unique set of options', () => {
    expect(IntersectionObserverSpy).toHaveBeenCalledTimes(0);
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');

    renderHook(() => useIntersection(div1));
    renderHook(() => useIntersection(div2));

    expect(IntersectionObserverSpy).toHaveBeenCalledTimes(1);
  });

  it('should return intersection entry', () => {
    const div1 = document.createElement('div');
    const div1Ref = { current: div1 };
    const div2 = document.createElement('div');

    const { result: res1 } = renderHook(() => useIntersection(div1Ref));
    const { result: res2, unmount } = renderHook(() =>
      useIntersection(div2, { threshold: [0, 1] })
    );

    expect(res1.current).toBeUndefined();
    expect(res2.current).toBeUndefined();

    const entry1 = { target: div1 };
    const entry2 = { target: div2 };

    act(() => {
      IntersectionObserverSpy.mock.calls[0][0]([entry1]);
      IntersectionObserverSpy.mock.calls[1][0]([entry2]);
      vi.advanceTimersByTime(1);
    });

    expect(res1.current).toBe(entry1);
    expect(res2.current).toBe(entry2);

    unmount();

    const entry3 = { target: div1 };
    act(() => {
      IntersectionObserverSpy.mock.calls[0][0]([entry3]);
      vi.advanceTimersByTime(1);
    });

    expect(res1.current).toBe(entry3);
  });

  it('two hooks observing same target should use single observer', () => {
    const div1 = document.createElement('div');
    const div2 = document.createElement('div');

    const { result: res1 } = renderHook(() => useIntersection(div1, { root: { current: div2 } }));
    const { result: res2 } = renderHook(() => useIntersection(div1, { root: { current: div2 } }));

    expect(res1.current).toBeUndefined();
    expect(res2.current).toBeUndefined();

    const entry1 = { target: div1 };

    act(() => {
      IntersectionObserverSpy.mock.calls[0][0]([entry1]);
      vi.advanceTimersByTime(1);
    });

    expect(res1.current).toBe(entry1);
    expect(res2.current).toBe(entry1);
  });

  it('should disconnect observer if last hook unmounted', () => {
    const div1 = document.createElement('div');

    const { result, unmount } = renderHook(() => useIntersection(div1));
    const entry1 = { target: div1 };

    act(() => {
      IntersectionObserverSpy.mock.calls[0][0]([entry1]);
      vi.advanceTimersByTime(1);
    });

    expect(result.current).toBe(entry1);

    unmount();
    expect(IntersectionObserverSpy.mock.results[0].value.disconnect).toHaveBeenCalled();
  });

  it('should run once and disconnect when "once" option is true ', () => {
    const div1 = document.createElement('div');

    renderHook(() => useIntersection(div1, { once: true }));
    const entry1 = { target: div1, isIntersecting: true };

    act(() => {
      IntersectionObserverSpy.mock.calls[0][0]([entry1]);
      vi.advanceTimersByTime(1);
    });

    expect(IntersectionObserverSpy.mock.results[0].value.disconnect).toHaveBeenCalled();
  });

  it('should disconnect when eagerTimeout times out', () => {
    const div1 = document.createElement('div');

    const { result } = renderHook(() => useIntersection(div1, { eagerTimeout: 100 }));

    vi.advanceTimersByTime(101);

    expect(result.current).toMatchObject({ isIntersecting: true });

    expect(IntersectionObserverSpy.mock.results[0].value.disconnect).toHaveBeenCalled();
  });

  it('should be disabled when disabled option is passed', () => {
    const div1 = document.createElement('div');

    renderHook(() => useIntersection(div1, { disabled: true }));

    expect(IntersectionObserverSpy).not.toHaveBeenCalled();
  });
});
