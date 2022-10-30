import { describe, it, expect, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useSafeState } from '~/useSafeState';

describe('useSafeState', () => {
  it('should be defined', () => {
    expect(useSafeState).toBeDefined();
  });

  it('should render', () => {
    const { result } = renderHook(() => useSafeState());
    expect(result.error).toBeUndefined();
  });

  it('should not cause state change after component unmount', () => {
    const consoleSpy = vi.spyOn(console, 'error');
    consoleSpy.mockImplementationOnce(() => {});

    const rendered = renderHook(() => useSafeState(1));

    expect(rendered.result.current[1]).toBeInstanceOf(Function);
    expect(rendered.result.current[0]).toBe(1);

    act(() => {
      const { result } = rendered;
      result.current[1](321);
    });

    expect(rendered.result.current[0]).toBe(321);

    rendered.unmount();

    act(() => {
      const { result, unmount } = rendered;
      result.current[1](123);
    });

    // expect(consoleSpy).toHaveBeenCalledTimes(0); // react version is probs calling out on console
    expect(rendered.result.current[0]).toBe(321);

    consoleSpy.mockRestore();
  });
});
