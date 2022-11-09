import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react-hooks/dom';
import { useShallowEqualMemo } from '~/useShallowEqualMemo';
import { useMemo } from 'react';

describe('useShallowEqualMemo', () => {
  let options = { max: 10 };
  const mockEffectNormal = vi.fn();
  const mockEffectShallow = vi.fn();

  it('should run provided object once', () => {
    const { rerender: rerenderNormal } = renderHook(() => useMemo(mockEffectNormal, [options]));
    const { rerender: rerenderDeep } = renderHook(() =>
      useShallowEqualMemo(mockEffectShallow, [options])
    );

    expect(mockEffectNormal).toHaveBeenCalledTimes(1);
    expect(mockEffectShallow).toHaveBeenCalledTimes(1);

    options = { max: 10 };
    rerenderDeep();
    rerenderNormal();

    expect(mockEffectNormal).toHaveBeenCalledTimes(2);
    expect(mockEffectShallow).toHaveBeenCalledTimes(1);

    options = { max: 10 };
    rerenderNormal();
    rerenderDeep();

    expect(mockEffectNormal).toHaveBeenCalledTimes(3);
    expect(mockEffectShallow).toHaveBeenCalledTimes(1);
  });
});
