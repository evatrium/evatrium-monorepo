import { resolveState } from '~/util';

describe('resolveState', () => {
  it('should be defined', () => {
    expect(resolveState).toBeDefined();
  });

  it('should return value itself if it is not function', () => {
    expect(resolveState(123)).toBe(123);

    const obj = { foo: 'bar' };
    expect(resolveState(obj)).toBe(obj);
  });

  it('should return call result in case function received', () => {
    expect(resolveState(() => 123)).toBe(123);

    const obj = { foo: 'bar' };
    expect(resolveState(() => obj)).toBe(obj);
  });

  it('should pass second parameter to received function', () => {
    expect(resolveState((state) => state, 123)).toBe(123);

    const obj = { foo: 'bar' };
    expect(resolveState((state) => state, obj)).toBe(obj);
  });
});
