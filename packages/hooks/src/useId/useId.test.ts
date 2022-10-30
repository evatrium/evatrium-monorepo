import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react-hooks/dom';
import { useId } from '~/useId';

describe('useId', () => {
  it('should be defined', () => {
    expect(useId).toBeDefined();
  });
  it('should return a unique id', () => {
    const { result } = renderHook(() => useId());
    console.log(result.current);
    expect(result.current).toBeDefined();
  });
});
