import { describe, it, expect } from 'vitest';
import { weakMemoize } from '~/weakMemoize';

describe('weakMemoize', () => {
  it('is defined', () => {
    expect(weakMemoize).toBeDefined();
  });
  it('works', () => {
    const resolveWithCachedValue = weakMemoize((arg) => {
      return {};
    });

    let firstArg = {};

    let firstResult = resolveWithCachedValue(firstArg);

    let secondResult = resolveWithCachedValue(firstArg);

    expect(firstResult).toBe(secondResult);
  });
});
