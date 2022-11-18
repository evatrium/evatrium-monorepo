import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react-hooks/dom';
import { useForkRef } from '~/useForkRef';

// TODO
describe('useForkRef', () => {
  it('should be defined', () => {
    expect(useForkRef).toBeDefined();
  });
});
