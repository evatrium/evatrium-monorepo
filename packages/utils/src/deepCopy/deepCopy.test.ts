import { describe, it, expect } from 'vitest';
import { deepCopy, simpleDeepCopy } from '~/deepCopy';
import { createData, createSerializableData, serializableDataNestedResult } from '~/_testUtils';

describe('simpleDeepCopy', () => {
	it('should make a copy of nested data. Original should not be equal to copy', () => {
		const originalData = createSerializableData(true);

		const copy = simpleDeepCopy(originalData);

		expect(originalData.object).not.toBeUndefined();
		expect(originalData.array).not.toBeUndefined();
		// strictEqual inspects key/index values and not containers
		expect(copy).toStrictEqual(serializableDataNestedResult);
		expect(copy.object).not.toBeUndefined();
		expect(copy.array).not.toBeUndefined();
		expect(copy.object).toStrictEqual(serializableDataNestedResult.object);
		expect(copy.array).toStrictEqual(serializableDataNestedResult.array);

		expect(originalData === copy).toBeFalsy();

		expect(originalData.object === copy.object).toBeFalsy();
		expect(originalData.object.nested === copy.object.nested).toBeFalsy();
		expect(originalData.object.nested === copy.object.nested).toBeFalsy();
		expect(originalData.object.nested.object === copy.object.nested.object).toBeFalsy();

		expect(originalData.array === copy.array).toBeFalsy();
		expect(originalData.array[3] === copy.array[3]).toBeFalsy();
		expect(originalData.array[3].array === copy.array[3].array).toBeFalsy();

		expect(originalData.array[3].object === copy.array[3].object).toBeFalsy();
	});

	it('original should not change when copy is mutated', () => {
		const originalData = createSerializableData(true);

		const copy = simpleDeepCopy(originalData);

		copy.object.foo = 'baz';

		expect(originalData.object.foo).toBe('bar');

		copy.array.push('humidifier');

		expect(originalData.array).not.toContain('humidifier');
	});
});

describe('deepCopy', () => {
	it('should make a copy of nested data. Original should not be equal to copy', () => {
		const originalData = createData(true);

		const copy = deepCopy(originalData);

		expect(originalData.object).not.toBeUndefined();
		expect(originalData.array).not.toBeUndefined();
		// strictEqual inspects key/index values and not containers
		expect(copy).toStrictEqual(copy);
		expect(copy).toStrictEqual(originalData);

		expect(copy.object).toStrictEqual(originalData.object);
		expect(copy.array).toStrictEqual(originalData.array);

		expect(originalData === copy).toBeFalsy();

		expect(originalData.object === copy.object).toBeFalsy();
		expect(originalData.nested1.object).not.toBeUndefined();
		expect(originalData.nested1.object === copy.nested1.object).toBeFalsy();

		expect(originalData.nested1.array).not.toBeUndefined();
		expect(originalData.nested1.array === copy.nested1.array).toBeFalsy();

		expect(originalData.nested2.array[3]).not.toBeUndefined();
		expect(originalData.nested2.array[3] === copy.nested2.array[3]).toBeFalsy();
		expect(originalData.nested2.array[3].array === copy.nested2.array[3].array).toBeFalsy();

		expect(originalData.nested2.array[3].object === copy.nested2.array[3].object).toBeFalsy();
	});

	it('should make copies of date objects, Maps, and Sets', () => {
		const originalData = createData(true);

		const copy = deepCopy(originalData);

		expect(originalData.date).toBeInstanceOf(Date);
		expect(copy.date).toBeInstanceOf(Date);
		expect(copy.date === originalData.date).toBeFalsy();

		expect(originalData.nested1.map).toBeInstanceOf(Map);
		expect(copy.nested1.map).toBeInstanceOf(Map);
		expect(originalData.nested1.map === copy.nested1.map).toBeFalsy();

		expect(originalData.nested1.set).toBeInstanceOf(Set);
		expect(copy.nested1.set).toBeInstanceOf(Set);
		expect(originalData.nested1.set === copy.nested1.set).toBeFalsy();
	});
});
