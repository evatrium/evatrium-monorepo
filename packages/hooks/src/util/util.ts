import {
  //types,
  DependencyList,
  MutableRefObject
} from 'react';
import { isFunc, isWeb } from '@evatrium/utils';
import { resolveState } from '@evatrium/utils';
import { EventHandlers } from '~/types';

export { resolveState };
//

// ------------------------------

export type EffectCallback = (...args: any[]) => any;

export type EffectHook<
  Callback extends EffectCallback = EffectCallback,
  Deps extends DependencyList | undefined = DependencyList | undefined,
  RestArgs extends any[] = any[]
> = ((...args: [Callback, Deps, ...RestArgs]) => void) | ((...args: [Callback, Deps]) => void);

// ------------------------------

export const shallowMerger = <A extends Record<string, any>, B extends keyof A>(
  prev: Pick<A, B>,
  next: Pick<A, B>
): Pick<A, B> => ({
  ...prev,
  ...next
});

/**
 * WARNING: Be sure to only call this inside a callback that is passed as a ref.
 * Otherwise, make sure to cleanup the previous {ref} if it changes. See
 * https://github.com/mui/material-ui/issues/13539
 *
 * Useful if you want to expose the ref of an inner component to the public API
 * while still using it inside the component.
 * @param ref A ref callback or ref object. If anything falsy, this is a no-op.
 * @param value
 */
export const setRef = <T>(
  ref: MutableRefObject<T | null> | ((instance: T | null) => void) | null | undefined,
  value: T | null
): void => {
  isFunc(ref) ? ref(value) : ref && (ref.current = value);
};

/**
 * Extracts event handlers from a given object.
 * A prop is considered an event handler if it is a function and its name starts with `on`.
 *
 * @param object An object to extract event handlers from.
 * @param excludeKeys An array of keys to exclude from the returned object.
 */
export default function extractEventHandlers(
  object: Record<string, any> | undefined,
  excludeKeys: string[] = []
): EventHandlers {
  if (object === undefined) return {};

  const result: EventHandlers = {};

  Object.keys(object)
    .filter(
      (prop) =>
        prop.match(/^on[A-Z]/) && typeof object[prop] === 'function' && !excludeKeys.includes(prop)
    )
    .forEach((prop) => {
      result[prop] = object[prop];
    });

  return result;
}
