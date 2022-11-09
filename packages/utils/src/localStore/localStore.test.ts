import { describe, it, expect, vi } from 'vitest';
import { localStore } from '~/localStore';
import { wait } from '~/wait';

describe('localStore', () => {
  it('should stringify and parse values from local storage', async () => {
    const ls = localStore;

    const item = { foo: 'bar' };

    ls.setItem('test', item);

    expect(ls.getItem('nope')).toBe(null);

    expect(ls.getItem('test')).toMatchObject(item);

    ls.removeItem('test');

    expect(ls.getItem('test')).toBe(null);

    ls.setItemDebounced('foo', item);
    ls.setItemDebounced('foo', item);

    await wait(200);

    expect(ls.getItem('foo')).toMatchObject(item);

    ls.clear();

    expect(ls.getItem('foo')).toBe(null);
  });

  it('should subscribe to storage events', async () => {
    const spyOnMe = {
      func: () => void 0
    };
    const funcSpy = vi.spyOn(spyOnMe, 'func');

    const ls = localStore;

    ls.subscribeToKey('test', spyOnMe.func);

    // @TODO: jsdom testing env doesn't emit the correct storage event
    // window.addEventListener('storage', (...args)=>{
    // 	console.log(...args);
    // })

    window.dispatchEvent(new Event('storage'));

    await wait(10);

    expect(funcSpy).toBeCalledTimes(1);
  });

  it('create method should create new instance', () => {
    const ls1 = localStore.create();
    // const ls2 = localStore;

    expect(ls1).not.equal(localStore);
    expect(ls1 === localStore).toBeFalsy();

    ls1._debounceTime = 300;

    expect(localStore._debounceTime).toBe(200);
  });
});
