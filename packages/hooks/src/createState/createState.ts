import { useEffect, useState } from 'react';
import { shallowMerger } from '~/util';
import { useSafeState } from '~/useSafeState';
import {
  isFunc,
  isObj,
  isString,
  getIn,
  setIn,
  JsonLikeType,
  isEqual,
  deepCopy,
  createLocalStore,
  ReturnedUnsubscriber,
  createSubscription
} from '@evatrium/utils';
import { useSyncedRef } from '~/useSyncedRef';

type Obj = Record<string | number, any>;
type TSelector = ((s: any) => any) | Obj | any[] | string;

const select = (selector: TSelector, state: any): any => {
  if (!selector) return state;
  if (isFunc(selector)) return selector(state);
  if (isObj(selector)) {
    const out: { [key: string]: string | number } = {};
    for (const key in selector as Obj) out[key] = select(selector[key], state);
    return out;
  }
  if (Array.isArray(selector)) {
    const out = [];
    for (let s = 0; s < selector.length; s++) out.push(select(selector[s], state));
    return out;
  }
  if (isString(selector)) {
    const possibleMany = selector
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    if (possibleMany.length > 1) return select(possibleMany, state);
    return getIn(state, possibleMany[0], undefined);
  }
};

const isNotEqual = (a, b) => !isEqual(a, b);

let localStore: any;

export const createState = (
  initialState = {},
  {
    merger = shallowMerger,
    selectorShouldUpdate = isNotEqual,
    interceptChange = (next, prev) => next,
    persist: {
      storageKey,
      selectPersistedState = (s) => s,
      hydrate = (currentState, storedState) => storedState,
      initialSubscribe = true,
      debounceTime
    } = {}
  } = {}
) => {
  const originalState = deepCopy(initialState);

  //-------------- persistence ---------------
  let unsubscribePersistence = () => 0;
  let subscribePersistence = () => 0;

  if (storageKey) {
    if (!localStore) localStore = createLocalStore({ debounceTime });
    const storedState = localStore.getItem(storageKey);

    if (storedState) initialState = hydrate(originalState, storedState);

    subscribePersistence = () => {
      unsubscribePersistence();

      const unsubscribeSelection = subscribeToSelection(selectPersistedState, (selectedState) =>
        localStore.setItemDebounced(storageKey, selectedState)
      );

      const unsubscribeStorage = localStore.subscribeToKey(storageKey, (storedState) =>
        setState(hydrate(state, storedState))
      );

      unsubscribePersistence = () => {
        unsubscribeSelection();
        unsubscribeStorage();
      };

      return unsubscribePersistence;
    };
  } //-----------------------------

  let state = deepCopy(initialState);

  let prevState = deepCopy(state);

  const getState = () => state;

  const reset = (initialState = originalState, ignoreNotify = false) =>
    setState(initialState, ignoreNotify);

  const { sub, pub, unsub } = createSubscription();

  const _commit = (next, ignoreNotify = false) => {
    prevState = state;
    state = interceptChange(next, prevState);
    if (!ignoreNotify) pub(state, prevState);
  };

  const setState = (updater, ignoreNotify) => _commit(getStateUpdate(updater, state), ignoreNotify);

  const mergeState = (updater, ignoreNotify, _mergerOptions = mergerOptions) => {
    const copyToMutate = deepCopy(state);
    const update = getStateUpdate(updater, copyToMutate);
    const nextState = merger(copyToMutate, update, _mergerOptions);
    _commit(nextState, ignoreNotify);
  };

  const _setInState = (nextState, path, updater) => {
    let branchUpdate = updater;
    if (isFunc(updater)) branchUpdate = updater(getIn(state, path, state));
    return setIn(nextState, path, branchUpdate);
  };

  const _setInPath = (nextState, path, updater) => {
    if (isFunc(path)) path = path(nextState);
    if (isString(path)) nextState = _setInState(nextState, path, updater);
    if (isObj(path)) for (const key in path) nextState = _setInState(nextState, key, path[key]);
    return nextState;
  };

  const setInPath = (path, updater, ignoreNotify) =>
    _commit(_setInPath(deepCopy(state), path, updater), ignoreNotify);

  const subscribeToSelection = (
    selector,
    callback,
    { shouldUpdate = selectorShouldUpdate } = {}
  ) => {
    const listener = (nextState, prevState) => {
      const prevSelected = select(selector, prevState),
        nextSelected = select(selector, nextState);
      if (shouldUpdate(prevSelected, nextSelected)) callback(nextSelected, prevSelected);
    };
    return sub(listener);
  };

  Object.assign(mergeState, { setInPath, setState, mergeState });

  // alias: useSelector
  const use = (selector, { shouldUpdate = selectorShouldUpdate } = {}) => {
    const selectorRef = useSyncedRef(selector);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useSafeState(() => select(selector));
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      const unsub = subscribeToSelection(selectorRef.current, setValue, { shouldUpdate });
      return () => unsub();
    }, [selector, selectorRef, setValue, shouldUpdate]);
    return [value, mergeState]; // = [value, {mergeState, setInPath, setState}]
  };

  initialSubscribe && subscribePersistence();

  return {
    select,
    subscribeToSelection,
    subscribe: sub,
    unsubscribe: unsub,
    notify: pub,
    getState,
    setState,
    mergeState,
    setInPath,
    use,
    useSelector: use,
    reset,
    unsubscribePersistence,
    subscribePersistence
  };
};
