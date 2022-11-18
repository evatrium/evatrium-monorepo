import { describe, it, expect, vi } from 'vitest';
import { createRef } from 'react';
import { setRef } from '~/util';

describe('setRef', () => {
  it('can handle callback refs', () => {
    const spy = vi.fn();
    const instance = 'proxy';

    setRef(spy, instance);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(instance);
  });

  it('can handle ref objects', () => {
    const ref = createRef();
    const instance = 'proxy';

    setRef(ref, instance);

    expect(ref.current).toBe(instance);
  });

  it('ignores falsy refs without errors', () => {
    const instance = 'proxy';

    // all no-ops
    setRef(undefined, instance);
    setRef(null, instance);
  });

  it('throws on legacy string refs', () => {
    // @ts-ignore
    expect(() => setRef('stringRef1', 'proxy')).toThrow();
  });
});
