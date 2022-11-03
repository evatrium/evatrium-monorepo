import { describe, it, expect } from 'vitest';
import { cn } from '~/cn';

/**
 * Ported from `clsx` for compatibility checks.
 */
describe('cn', () => {
  it('keeps object keys with truthy values', () => {
    const out = cn({ a: true, b: false, c: 0, d: null, e: undefined, f: 1 });
    expect(out).toBe('a f');
  });

  it('joins arrays of class names and ignore falsy values', () => {
    const out = cn('a', 0, null, undefined, true, 1, 'b');
    expect(out).toBe('a 1 b');
  });

  it('supports heterogenous arguments', () => {
    expect(cn({ a: true }, 'b', 0)).toBe('a b');
  });

  it('should be trimmed', () => {
    expect(cn('', 'b', {}, '')).toBe('b');
  });

  it('returns an empty string for an empty configuration', () => {
    expect(cn({})).toBe('');
  });

  it('supports an array of class names', () => {
    expect(cn(['a', 'b'])).toBe('a b');
  });

  it('joins array arguments with string arguments', () => {
    expect(cn(['a', 'b'], 'c')).toBe('a b c');
    expect(cn('c', ['a', 'b'])).toBe('c a b');
  });

  it('handles multiple array arguments', () => {
    expect(cn(['a', 'b'], ['c', 'd'])).toBe('a b c d');
  });

  it('handles arrays that include falsy and true values', () => {
    expect(cn(['a', 0, null, undefined, false, true, 'b'])).toBe('a b');
  });

  it('handles arrays that include arrays', () => {
    expect(cn(['a', ['b', 'c']])).toBe('a b c');
  });

  it('handles arrays that include objects', () => {
    expect(cn(['a', { b: true, c: false }])).toBe('a b');
  });

  it('handles deep array recursion', () => {
    expect(cn(['a', ['b', ['c', { d: true }]]])).toBe('a b c d');
  });

  it('handles arrays that are empty', () => {
    expect(cn('a', [])).toBe('a');
  });

  it('handles nested arrays that have empty nested arrays', () => {
    expect(cn('a', [[]])).toBe('a');
  });

  it('handles all types of truthy and falsy property values as expected', () => {
    const out = cn({
      // falsy:
      null: null,
      emptyString: '',
      noNumber: NaN,
      zero: 0,
      negativeZero: -0,
      false: false,
      undefined: undefined,

      // truthy (literally anything else):
      nonEmptyString: 'foobar',
      whitespace: ' ',
      function: Object.prototype.toString,
      emptyObject: {},
      nonEmptyObject: { a: 1, b: 2 },
      emptyList: [],
      nonEmptyList: [1, 2, 3],
      greaterZero: 1
    });

    expect(out).toBe(
      'nonEmptyString whitespace function emptyObject nonEmptyObject emptyList nonEmptyList greaterZero'
    );
  });
});
