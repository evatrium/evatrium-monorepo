type SubscriptionCallback = (...update: any[]) => void;

type UnSubscribeFunc = (subscription: SubscriptionCallback) => void;

export type ReturnedUnsubscriber = () => UnSubscribeFunc;

type SubscribeFunc = (subscriber: SubscriptionCallback) => ReturnedUnsubscriber;

type PublishFunc = (...update: any[]) => void;

export type SubscriptionInstance = {
  sub: SubscribeFunc;
  pub: PublishFunc;
  unsub: UnSubscribeFunc;
};

type CreateSubscription = () => SubscriptionInstance;

/**
 * creates a subscription (pub/sub) for publishing data to listeners
 * @example
 *  const [sub,pub] = createSubscription();
 *
 *  const unsub = sub((data) => console.log(`hello ${data}`);
 *
 *  pub('foobar');
 *
 *  //logs: hello foobar
 *
 *  unsub();
 *
 *  pub('asdf');
 *
 *  // logs nothing
 */
export const createSubscription: CreateSubscription = () => {
  const subs: SubscriptionCallback[] = [];

  const unsub = (subscription: SubscriptionCallback): any => {
    subs.splice(subs.indexOf(subscription) >>> 0, 1);
  };

  const sub = (subscriber: SubscriptionCallback): ReturnedUnsubscriber => {
    subs.push(subscriber);
    return () => unsub(subscriber);
  };

  const pub = (...update: any[]) => {
    subs.slice().map((f) => f(...update));
  };

  return {
    sub,
    pub,
    unsub
  };
};
