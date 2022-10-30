import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react-hooks/dom';
import { useWillUnmount } from '~/useWillUnmount';

describe('useWillUnmount', () => {
  it('should call effector only when component unmounted', () => {
    const spy = vi.fn();

    const { result, rerender, unmount } = renderHook(() => useWillUnmount(spy));

    expect(result.current).toBe(undefined);
    expect(spy).toHaveBeenCalledTimes(0);

    rerender();
    unmount();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call effect even if it has been updated', () => {
    const spy = vi.fn();

    const { rerender, unmount } = renderHook(({ fn }) => useWillUnmount(fn), {
      initialProps: {
        fn: () => {}
      }
    });

    rerender({ fn: spy });
    unmount();

    expect(spy).toHaveBeenCalled();
  });
});
