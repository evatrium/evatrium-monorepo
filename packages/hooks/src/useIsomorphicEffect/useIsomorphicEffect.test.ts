import { renderHook } from '@testing-library/react-hooks/dom';
import { useIsomorphicEffect } from '~/useIsomorphicEffect';

describe('useIsomorphicEffect', () => {
	it('should be defined', () => {
		expect(useIsomorphicEffect).toBeDefined();
	});
});
