import { ObjOrArrType } from '@evatrium/utils';
import { markers } from '~/styles/cssinjs/parse';

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
  shape: { [key: string]: any };
  breakpoints: Breakpoints;
  shadows: string[];
  zIndex?: { [key: string]: number };
  components?: any;
  transitions?: any;
  palette: { [key: string]: any };
  typography: { [key: string]: any };
};

export type StyleFunc = (theme: Theme, variants?: Obj) => Obj;
export type StyleObjOrFunc = Obj | StyleFunc;

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

export type StylesProcessingOptions = {
  theme?: Theme;
  variants?: ObjOrArrType;
  declarations?: boolean;
  styles?: StyleObjOrFunc;
  namespace?: typeof markers[keyof typeof markers];
};
