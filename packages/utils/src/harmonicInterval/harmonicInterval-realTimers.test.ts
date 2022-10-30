import { describe, it, expect, vi, SpyInstance } from 'vitest';
import { setHarmonicInterval, clearHarmonicInterval } from '~/harmonicInterval';
import { wait } from '~/wait';

describe('harmonicInterval real timers', () => {
  it('calls timer', async () => {
    const spy = vi.fn();

    expect(spy).toHaveBeenCalledTimes(0);

    const ref = setHarmonicInterval(spy, 5);

    expect(spy).toHaveBeenCalledTimes(0);

    await wait(5);
    expect(spy).toHaveBeenCalledTimes(1);

    clearHarmonicInterval(ref);

    await wait(6);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('calls all callbacks at the same time, and clears', async () => {
    const spy1 = vi.fn();
    const spy2 = vi.fn();

    const ref1 = setHarmonicInterval(spy1, 30);
    await wait(15);
    const ref2 = setHarmonicInterval(spy2, 30);

    expect(spy1).toHaveBeenCalledTimes(0);
    expect(spy2).toHaveBeenCalledTimes(0);

    await wait(16);

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);

    clearHarmonicInterval(ref1);
    clearHarmonicInterval(ref2);

    await wait(31);

    expect(spy1).toHaveBeenCalledTimes(1);
    expect(spy2).toHaveBeenCalledTimes(1);
  });
});
