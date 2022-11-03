import { Obj } from '~/types';

type NonPrimitive = Obj | any[];
type ComputeValue = (arg: NonPrimitive) => any;

/**
 *  memoizes the result of a function
 *  arg passed to memoized func should be an object type
 *  since internal weakMap is using the reference to that object as a cache key
 * @param compute
 * @returns - the function wrapped with memoization
 * @example
 *
 *  const memoized = weakMemoize((arg)=>{
 *    return arg.data  //computeSomething(arg.data);
 *  });
 *
 *  const arg = {data:1}
 *  const result1 = memoized(arg);
 *  arg.data = 2;
 *  const result2 = memoized(arg);
 *
 *  result1 === result2 // true // 1
 *
 */
export const weakMemoize = (compute: ComputeValue) => {
  const cache = new WeakMap();

  return (arg: NonPrimitive) => {
    if (cache.has(arg)) {
      return cache.get(arg);
    }
    const value = compute(arg);
    cache.set(arg, value);
    return value;
  };
};
