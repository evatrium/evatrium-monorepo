import { describe, it, expect } from 'vitest';
import { jsonParse, JsonParseResults } from '~/jsonParse';

describe('jsonParse', () => {
	it('should parse json and return JsonParseResults', () => {
		const data = { foo: 'bar' };
		const results: JsonParseResults = { data, error: undefined };
		const stringified = JSON.stringify(data);
		expect(jsonParse(stringified)).toMatchObject(results);
	});

	it('should catch the error and return JsonParseResults', () => {
		const result: JsonParseResults = {
			data: undefined,
			error: new SyntaxError('Unexpected token ! in JSON at position 1')
		};
		expect(jsonParse('{!@#$!@#%!@#^%:###****}')).toMatchObject(result);
	});
});
