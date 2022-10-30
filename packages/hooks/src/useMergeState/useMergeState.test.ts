import { renderHook, act } from '@testing-library/react-hooks/dom';
import { useMergeState } from '~/useMergeState';
import { expect } from 'vitest';
import { deepMerge } from '@evatrium/utils';

describe('useMergeState', () => {
  it('should be defined', () => {
    expect(useMergeState).toBeDefined();
  });

  it('should return state and setter', () => {
    const { result } = renderHook(() => useMergeState({ a: 1, b: 2 }));
    expect(result.current[1]).toBeInstanceOf(Function);
    expect(result.current[0]).toMatchObject({ a: 1, b: 2 });
  });

  it('should merge state', () => {
    const { result } = renderHook(() => useMergeState({ a: 1, b: 2 }));
    act(() => {
      result.current[1]({ a: 2 });
    });

    expect(result.current[0]).toMatchObject({ a: 2, b: 2 });
  });

  it('should accept a custom merge function', () => {
    const { result } = renderHook(() => useMergeState({ a: 1, b: 2 }, deepMerge));
    act(() => {
      result.current[1]({ a: 2 });
    });

    expect(result.current[0]).toMatchObject({ a: 2, b: 2 });
  });
});
