import { renderHook } from '@testing-library/react-hooks/dom';
import { useDidMount } from '~/useDidMount';

describe('useDidMount', () => {
  it('should call effector only on first render', () => {
    const spy = vi.fn();

    const { result, rerender, unmount } = renderHook(() => useDidMount(spy));

    expect(result.current).toBe(undefined);
    expect(spy).toHaveBeenCalledTimes(1);

    rerender();
    rerender();
    rerender();
    rerender();

    expect(spy).toHaveBeenCalledTimes(1);

    unmount();

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
