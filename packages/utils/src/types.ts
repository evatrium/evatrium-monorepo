// export type ObjOrArrType = Record<string | number, any> | Array<any>;
export type ObjStrKey = { [key: string]: any };
export type Obj = Record<keyof any, unknown>;
export type ObjArr = Obj[];

export type ObjOrArrType =
  | Obj
  | { [key: string | number | symbol]: any }
  | Array<any>
  | ObjOrArrType[]
  | ObjArr
  | { [key: string | number | symbol]: ObjOrArrType };

export type PrimitiveType = null | undefined | string | number | boolean | symbol | bigint;

/** A parsed/serializable JSON value. */
// Exclude<PrimitiveType, symbol | bigint>
export type JsonLikeType =
  | string
  | number
  | boolean
  | null
  | JsonLikeType[]
  | { [key: string | number]: JsonLikeType };

export type EmitsEvents = Window | Document | HTMLElement | EventTarget;

export {};

type Partial2Level<T> = {
  [K in keyof T]?: T[K] extends Record<any, any>
    ? {
        [J in keyof T[K]]?: T[K][J];
      }
    : T[K];
};

type Partial3Level<T> = {
  [K in keyof T]?: {
    [J in keyof T[K]]?: T[K][J] extends Record<any, any>
      ? {
          [P in keyof T[K][J]]?: T[K][J][P];
        }
      : T[K][J];
  };
};
