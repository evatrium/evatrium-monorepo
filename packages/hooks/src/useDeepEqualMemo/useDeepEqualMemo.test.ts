import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react-hooks/dom';
import { useDeepEqualMemo } from '~/useDeepEqualMemo';
import { useMemo } from 'react';

describe('useDeepEqualMemo', () => {
  let options = { max: 10 };
  const mockEffectNormal = vi.fn();
  const mockEffectDeep = vi.fn();
  const mockEffectCleanup = vi.fn();

  it('should run provided object once', () => {
    const { rerender: rerenderNormal } = renderHook(() => useMemo(mockEffectNormal, [options]));
    const { rerender: rerenderDeep } = renderHook(() =>
      useDeepEqualMemo(mockEffectDeep, [options])
    );

    expect(mockEffectNormal).toHaveBeenCalledTimes(1);
    expect(mockEffectDeep).toHaveBeenCalledTimes(1);

    options = { max: 10 };
    rerenderDeep();
    rerenderNormal();

    expect(mockEffectNormal).toHaveBeenCalledTimes(2);
    expect(mockEffectDeep).toHaveBeenCalledTimes(1);

    options = { max: 10 };
    rerenderNormal();
    rerenderDeep();

    expect(mockEffectNormal).toHaveBeenCalledTimes(3);
    expect(mockEffectDeep).toHaveBeenCalledTimes(1);
  });
});
