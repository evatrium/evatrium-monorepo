import { describe, it, expect } from 'vitest';
import { tryCatch } from '~/tryCatch';

describe('tryCatch', () => {
	it('should wrap an async func with try catch and return the correct results object', async () => {
		const resolveWithData = async (arg1: string, arg2: string) => Promise.resolve({ arg1, arg2 });

		const prom = tryCatch(resolveWithData)('foo', 'bar');

		expect(prom).toBeInstanceOf(Promise);

		const { data: _data, error: _error } = await prom;

		expect(_data).toMatchObject({ arg1: 'foo', arg2: 'bar' });

		expect(_error).toBeUndefined();

		const rejectWithError = async () => Promise.reject(new Error('foo'));

		const { data, error } = await tryCatch(rejectWithError)();

		expect(data).toBeUndefined();
		expect(error.message).toBe('foo');
		expect(error).toBeInstanceOf(Error);
	});
});
