import { describe, it, expect, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react-hooks/dom';
import { useToggle } from '~/useToggle';

describe('useToggle', () => {
  it('should be defined', () => {
    expect(useToggle).toBeDefined();
  });

  it('should default to false', () => {
    const { result } = renderHook(() => useToggle());
    expect(result.current[0]).toBe(false);
  });

  it('should be instantiatable with value', () => {
    const { result } = renderHook(() => useToggle(true));
    expect(result.current[0]).toBe(true);
  });

  it('should toggle the boolean state and set to exact bool if passed', () => {
    const { result } = renderHook(() => useToggle());
    const [bool, toggle] = result.current;

    act(() => {
      toggle();
    });
    expect(result.current[0]).toBe(true);

    act(() => {
      toggle();
    });
    expect(result.current[0]).toBe(false);

    act(() => {
      toggle(false);
    });
    expect(result.current[0]).toBe(false);
  });
});
