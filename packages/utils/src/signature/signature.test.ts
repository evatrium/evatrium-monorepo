import { describe, it, expect } from 'vitest';
import { signature } from '~/signature';

describe('signature', () => {
	it('should convert data into a stringified thumbprint ', () => {
		const jss = {
			width: {
				xs: '100%',
				sm: '50%'
			},
			color: ['blue', 'red', 'purple']
		};
		expect(signature(jss)).toBe('widthxs100%sm50%color0blue1red2purple');
		expect(signature([jss])).toBe('0widthxs100%sm50%color0blue1red2purple');
		expect(signature(null)).toBe('null');
	});
});
