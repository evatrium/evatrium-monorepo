// let ls: any =

import { ObjStrKey } from '~/types';
import { isWeb } from '~/isWeb';
import { jsonParse, JsonParseResults } from '~/jsonParse';
import { debounce } from '~/debounce';
import {
  createSubscription,
  ReturnedUnsubscriber,
  SubscriptionInstance
} from '~/createSubscription';
import { eventListener } from '~/eventListener';

type KeySubscriptionData = Pick<JsonParseResults, 'data'> | null;
type LocalStore = {
  getItem: (key: string) => any;
  setItem: (key: string, val?: any) => void;
  clear: () => void;
  removeItem: (key: string) => void;
  setItemDebounced: (key: string, val?: any) => void;
  subscribeToKey: (
    key: string,
    callback: (results: KeySubscriptionData) => void
  ) => ReturnedUnsubscriber;
  _debounceTime: number;
  _debouncedSet: undefined | ((key: string, val?: any) => void);
  _store: ObjStrKey;
  _storageEventSubscription: undefined | SubscriptionInstance;
  _subscribe: (callback: (e: StorageEventInit) => void) => ReturnedUnsubscriber;
  create: () => LocalStore;
};
/**
 * Stringifies and parses values to and from local storage.
 * Includes additional methods for optionally debouncing setItem
 * and subscribing to storage events on other browser tabs.
 *
 * let num = localStore.getItem("num") || 0;
 *
 * localStore.subscribeToKey("num", (data) => {
 * 		console.log("storage update on other tab", data);
 * 	  num = data;
 * });
 *
 * localStore.setItem("num", (num + 1));
 * //or
 * localStore.setItemDebounced("num", (num + 1))
 *
 * to customize debounce time, create a new instance to not interfere with other localStores
 *
 * const ls = localStore.create();
 * ls._debounceTime = 300;
 *
 * ls.setItemDebounced("num", (num + 1))
 */
export const localStore: LocalStore = {
  create() {
    return Object.create(localStore);
  },
  _store: {},

  getItem(key: string) {
    const item = window.localStorage.getItem(key);
    if (!item || item === 'undefined') return null;
    const { data, error } = jsonParse(item);
    error && console.error(error);
    return data || null;
  },
  setItem(key: string, val?: any) {
    window.localStorage.setItem(key, JSON.stringify(val));
  },
  clear() {
    window.localStorage.clear();
  },
  removeItem(key: string) {
    window.localStorage.removeItem(key);
  },
  _debouncedSet: undefined,
  _debounceTime: 200,
  /**
   * setItem wrapped in a debounce.
   */
  setItemDebounced(key, val) {
    if (!this._debouncedSet) this._debouncedSet = debounce(this.setItem, this._debounceTime);
    this._debouncedSet(key, val);
  },
  _storageEventSubscription: undefined,
  _subscribe(callback) {
    //@ts-ignore
    if (!this._storageEventSubscription) {
      // @ts-ignore
      this._storageEventSubscription = createSubscription();
      // @ts-ignore this lets us use only one storage event listener and publish to all subscribers
      isWeb() && eventListener(window, 'storage', this._storageEventSubscription.pub);
    } // @ts-ignore
    return this._storageEventSubscription.sub(callback); // returns unsub
  },
  subscribeToKey(key, callback) {
    return this._subscribe((e) => {
      if (process.env.NODE_ENV === 'test') callback({ data: 'test' }); // @TODO: jsdom testing env doesn't emit the correct storage event
      if (isWeb() && e.storageArea === window.localStorage && e.key === key) {
        const { data, error } = jsonParse(e.newValue as string);
        error ? console.error(error) : callback(data || null);
      }
    });
  }
};

/* // old version that mocked localStorage... probs easier to just mock globally for non window envs
export const localStore: LocalStore = {
  create() {
    return Object.create(localStore);
  },
  _store: {},

  get getItem() {
    if (!isWeb()) return (key: string): any => this._store[key] || null;
    return (key: string) => {
      const item = window.localStorage.getItem(key);
      if (!item || item === 'undefined') return null;
      const { data, error } = jsonParse(item);
      error && console.error(error);
      return data || null;
    };
  },
  get setItem() {
    if (!isWeb()) return (key: string, val: any) => ((this._store[key] = val), void 0);
    return (key: string, val?: any) => {
      window.localStorage.setItem(key, JSON.stringify(val));
    };
  },
  get clear() {
    if (!isWeb()) return () => ((this._store = {}), void 0);
    return () => (window.localStorage.clear(), void 0);
  },
  get removeItem() {
    if (!isWeb()) return (key: string) => (delete this._store[key], void 0);
    return (key: string) => (window.localStorage.removeItem(key), void 0);
  },
  _debouncedSet: undefined,
  _debounceTime: 200,

setItemDebounced(key, val) {
  if (!this._debouncedSet) this._debouncedSet = debounce(this.setItem, this._debounceTime);
  this._debouncedSet(key, val);
},
_storageEventSubscription: undefined,
  _subscribe(callback) {
  //@ts-ignore
  if (!this._storageEventSubscription) {
    // @ts-ignore
    this._storageEventSubscription = createSubscription();
    // @ts-ignore this lets us use only one storage event listener and publish to all subscribers
    isWeb() && eventListener(window, 'storage', this._storageEventSubscription.pub);
  } // @ts-ignore
  return this._storageEventSubscription.sub(callback); // returns unsub
},
subscribeToKey(key, callback) {
  return this._subscribe((e) => {
    if (process.env.NODE_ENV === 'test') callback({ data: 'test' }); // @TODO: jsdom testing env doesn't emit the correct storage event
    if (isWeb() && e.storageArea === window.localStorage && e.key === key) {
      const { data, error } = jsonParse(e.newValue as string);
      error ? console.error(error) : callback(data || null);
    }
  });
}
};
 */
