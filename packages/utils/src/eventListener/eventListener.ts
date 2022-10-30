import { EmitsEvents } from '~/types';

export const on = <T extends EmitsEvents>(
  emitter: T,
  ...args: Parameters<T['addEventListener']> | [string, ((...args: any[]) => any) | null, ...any]
) => {
  emitter?.addEventListener(...(args as Parameters<HTMLElement['addEventListener']>));
};

export const off = <T extends EmitsEvents>(
  emitter: T,
  ...args: Parameters<T['removeEventListener']> | [string, ((...args: any[]) => any) | null, ...any]
) => {
  emitter?.removeEventListener(...(args as Parameters<HTMLElement['removeEventListener']>));
};

/**
 * wrapper for eventListener. returns a function to unlisten.
 * @param emitter
 * @param args
 */
export const eventListener = <T extends EmitsEvents>(
  emitter: T,
  ...args: Parameters<T['addEventListener']> | [string, ((...args: any[]) => any) | null, ...any]
): (() => void) => {
  on(emitter, ...args);
  return () => off(emitter, ...args);
};
