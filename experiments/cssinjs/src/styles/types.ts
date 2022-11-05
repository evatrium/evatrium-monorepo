export type Obj = {
  [key: string]: any;
};
export type BreakpointValues = {
  [key: string]: number;
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
  xxl: number;
};
export type BreakpointsValuesKey = keyof BreakpointValues;
export type Breakpoints = {
  downKeys: string[];
  upDownKeys: string[];
  keys: string[];
  values: BreakpointValues;
  up: (key: BreakpointsValuesKey) => string;
  down: (key: BreakpointsValuesKey | number) => string;
  between: (start: BreakpointsValuesKey, end: BreakpointsValuesKey) => string;
  only: (key: BreakpointsValuesKey) => string;
};
export type Theme = {
  spacing: (units: number) => number;
  shape?: { [key: string]: any };
  breakpoints: Breakpoints;
  shadows?: string[];
  zIndex?: { [key: string]: number };
  components?: any;
  transitions?: any;
};

export type StyleObjOrFunc = Obj | ((theme: Theme) => Obj);

export type JoinedClassNamesString = string;

export type ClassesObj = { [classKey: string]: JoinedClassNamesString };

export type Sheet = {
  rules: string[];
  attrValue: string;
  name: string;
  namespace: string;
  media?: string;
  insert: (rule: string) => void;
  remove: () => void;
  el?: HTMLStyleElement;
};
export type CssInJsStore = {
  sheets: { [name: string]: Sheet };
  allRules: string[];
  removals: HTMLStyleElement[];
  parsed: { [key: string]: string };
};

export type StyleObject = Record<any, any>;
export type NestedStyleObject = Record<any, StyleObject>;
export type SheetsOptions = { namespace: string; media?: undefined | string };
export {};
