import { signature } from '~/signature';

export type MemoizedCache = { [key: string]: any }; // Record<string, any>;
export type MemoizedFn<TFunc extends (this: any, ...args: any[]) => any> = {
	clear: () => void;
	cache: MemoizedCache;
	(this: ThisParameterType<TFunc>, ...args: Parameters<TFunc>): ReturnType<TFunc>;
};

/**
 * memoizes a function.
 * results are cashed, keying off of the stringified arguments.
 * will only execute if the args change.
 * call "yourMemoizedFunction.clear()" to reset the cache
 * @example
 *
 * 		const memoizedFunc = memoize((derp,asdf)=>{
 * 		  const results = computeSomething(derp, asdf);
 * 		  return results;
 * 		});
 *
 * 		//....
 *
 * 		<button onClick={()=> memoizedFunc(id, 'foobar')}	...
 */
export function memoize<TFunc extends (this: any, ...newArgs: any[]) => any>(
	fn: TFunc
): MemoizedFn<TFunc> {
	const cache: MemoizedCache = Object.create(null);

	function memoized(
		this: ThisParameterType<TFunc>,
		...newArgs: Parameters<TFunc>
	): ReturnType<TFunc> | any {
		const keyLookup = signature(newArgs);
		let val = memoized.cache[keyLookup];
		if (val === undefined) {
			val = memoized.cache[keyLookup] = fn.apply(this, newArgs);
		}
		return val;
	}

	memoized.cache = cache;

	memoized.clear = () => {
		memoized.cache = Object.create(null);
	};

	return memoized;
}

/*

	WeakMaps don't detect mutations, they just track references to objects

	const args:any[] = [
		{ foo: "bar" },
		{
			baz: [
				"bing",
				"bang",
				"boom"
			]
		}
	];

	const func = (...args: any[]) => {
		return [...args, "buz"];
	};

	const cache = new WeakMap();

	const ret = func(...args);

	cache.set(args, ret);

	args.push('foo')
	const gotIt = cache.get(args);
	console.log(gotIt);
	console.log(args);
	console.log(gotIt === ret);


 */
