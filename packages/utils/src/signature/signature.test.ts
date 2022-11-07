import { describe, it, expect } from 'vitest';
import { signature } from '~/signature';

describe('signature', () => {
  it('should stringify simple obj', () => {
    const obj = { c: 6, b: [4, 5], a: 3, z: null };
    expect(signature(obj)).toBe('{"a":3,"b":[4,5],"c":6,"z":null}');
  });
  it('object with undefined', () => {
    const obj = { a: 3, z: undefined };
    expect(signature(obj)).toBe('{"a":3}');
  });
  it('object with NaN and Infinity', () => {
    const obj = { a: 3, b: NaN, c: Infinity };
    expect(signature(obj)).toBe('{"a":3,"b":null,"c":null}');
  });
  it('should stringify nested', () => {
    const obj = { c: 8, b: [{ z: 6, y: 5, x: 4 }, 7], a: 3 };
    expect(signature(obj)).toBe('{"a":3,"b":[{"x":4,"y":5,"z":6},7],"c":8}');
  });
  it('object with empty string', () => {
    const obj = { a: 3, z: '' };
    expect(signature(obj)).toBe('{"a":3,"z":""}');
  });

  it('array with empty string', () => {
    const obj = [4, '', 6];
    expect(signature(obj)).toBe('[4,"",6]');
  });
  it('should stringify non-cyclic', () => {
    const one = { x: 1 };
    const two = { a: one, b: one };
    expect(signature(two)).toBe('{"a":{"x":1},"b":{"x":1}}');
  });
  it('a-cyclic with reused object property pointers', () => {
    let x = { a: 1 };
    let y = { b: x, c: x };
    expect(signature(y)).toBe('{"b":{"a":1},"c":{"a":1}}');
  });
  it('should convert data into a stringified thumbprint ', () => {
    const jss = {
      width: {
        xs: '100%',
        sm: '50%'
      },
      color: ['blue', 'red', 'purple']
    };
    expect(signature.fast(jss)).toBe('widthxs100%sm50%color0blue1red2purple');
    expect(signature.fast([jss])).toBe('0widthxs100%sm50%color0blue1red2purple');
    expect(signature.fast(null)).toBe('null');
  });
});
