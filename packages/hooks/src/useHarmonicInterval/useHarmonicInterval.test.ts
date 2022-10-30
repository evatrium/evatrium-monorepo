import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react-hooks/dom';
import { useHarmonicInterval } from '~/useHarmonicInterval';

describe('useHarmonicInterval', () => {
  it('should be defined', () => {
    expect(useHarmonicInterval).toBeDefined();
  });
});
