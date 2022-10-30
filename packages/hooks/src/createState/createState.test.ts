import { renderHook } from '@testing-library/react-hooks/dom';
import { createState } from '~/createState';

describe('createState', () => {
  it('should be defined', () => {
    expect(createState).toBeDefined();
  });
});
