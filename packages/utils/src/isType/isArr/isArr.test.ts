import { describe, it, expect } from 'vitest';
import { isArr } from '~/isType';

describe('isArr', () => {
  it('returns expected output', () => {
    const type = 'array';
    const isType = isArr;

    it(`should return true when value is a ${type}`, () => {
      expect(isType([])).toBeTruthy();
      expect(isType(['asdf'])).toBeTruthy();
      expect(isType(Array(1))).toBeTruthy();
    });

    it(`should return false when value is not a ${type}`, () => {
      expect(isType(Object)).toBeFalsy();
      expect(isType(Array)).toBeFalsy();
      expect(isType(null)).toBeFalsy();
      expect(isType(undefined)).toBeFalsy();
      expect(isType(new Promise(() => 0))).toBeFalsy();
      expect(isType(new Date())).toBeFalsy();
      expect(isType(-1)).toBeFalsy();
      expect(isType(0)).toBeFalsy();
      expect(isType(1)).toBeFalsy();
      expect(isType(new String('test'))).toBeFalsy();
      expect(isType(() => null)).toBeFalsy();
      expect(isType(new Blob())).toBeFalsy();
    });
  });
});
