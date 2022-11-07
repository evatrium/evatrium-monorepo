import { describe, it, expect, vi } from 'vitest';
import { useEffect } from 'react';
import { renderHook } from '@testing-library/react-hooks/dom';
import { useDeepEqualEffect } from '~/useDeepEqualEffect';

describe('useDeepEqualEffect', () => {
  let options = { max: 10 };
  const mockEffectNormal = vi.fn();
  const mockEffectDeep = vi.fn();
  const mockEffectCleanup = vi.fn();
  const mockEffectCallback = vi.fn().mockReturnValue(mockEffectCleanup);

  it('should run provided object once', () => {
    const { rerender: rerenderNormal } = renderHook(() => useEffect(mockEffectNormal, [options]));
    const { rerender: rerenderDeep } = renderHook(() =>
      useDeepEqualEffect(mockEffectDeep, [options])
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

  it('should run clean-up provided on unmount', () => {
    const { unmount } = renderHook(() => useDeepEqualEffect(mockEffectCallback, [options]));
    expect(mockEffectCleanup).not.toHaveBeenCalled();

    unmount();
    expect(mockEffectCleanup).toHaveBeenCalledTimes(1);
  });
});
