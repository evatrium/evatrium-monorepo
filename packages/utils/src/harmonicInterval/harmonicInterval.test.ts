import { describe, it, expect, vi, SpyInstance } from 'vitest';
import { setHarmonicInterval, clearHarmonicInterval } from '~/harmonicInterval';

describe('harmonicInterval', () => {
  // const setIntervalSpy = setInterval as any as SpyInstance;
  // const clearIntervalSpy = clearInterval as any as SpyInstance;
  vi.useFakeTimers();
  const setIntervalSpy = vi.spyOn(window, 'setInterval');
  const clearIntervalSpy = vi.spyOn(window, 'clearInterval');

  beforeEach(() => {
    setIntervalSpy.mockReset();
    clearIntervalSpy.mockReset();
    vi.runAllTimers();
  });

  // beforeAll(() => {
  //   vi.useFakeTimers();
  // });
  //
  // beforeEach(() => {
  //   vi.clearAllTimers();
  // });
  //
  afterAll(() => {
    vi.useRealTimers();
  });

  it('exports methods', () => {
    expect(typeof setHarmonicInterval).toBe('function');
    expect(typeof clearHarmonicInterval).toBe('function');
  });

  it('can schedule harmonic interval', () => {
    setHarmonicInterval(() => {}, 1000);
  });

  it('returns timer reference', () => {
    const ref = setHarmonicInterval(() => {}, 1000);
    expect(typeof ref).toBe('object');
  });

  it('calls setInterval()', () => {
    setHarmonicInterval(() => {}, 123);
    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    expect(setIntervalSpy.mock.calls[0][1]).toBe(123);
  });

  it('combines multiple calls with the same ms delay', () => {
    expect(setIntervalSpy).toHaveBeenCalledTimes(0);
    setHarmonicInterval(() => {}, 222);
    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    setHarmonicInterval(() => {}, 222);
    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    setHarmonicInterval(() => {}, 222);
    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
    setHarmonicInterval(() => {}, 9999);
    expect(setIntervalSpy).toHaveBeenCalledTimes(2);
    setHarmonicInterval(() => {}, 222);
    expect(setIntervalSpy).toHaveBeenCalledTimes(2);
    setHarmonicInterval(() => {}, 9999);
    expect(setIntervalSpy).toHaveBeenCalledTimes(2);
  });

  it('clears interval when last listener removed', () => {
    const ref1 = setHarmonicInterval(() => {}, 333);
    const ref2 = setHarmonicInterval(() => {}, 333);
    const ref3 = setHarmonicInterval(() => {}, 444);

    expect(clearIntervalSpy).toHaveBeenCalledTimes(0);

    clearHarmonicInterval(ref1);
    expect(clearIntervalSpy).toHaveBeenCalledTimes(0);

    clearHarmonicInterval(ref3);
    expect(clearIntervalSpy).toHaveBeenCalledTimes(1);

    clearHarmonicInterval(ref2);
    expect(clearIntervalSpy).toHaveBeenCalledTimes(2);
  });
});
