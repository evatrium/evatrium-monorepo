import { prefixPx } from './prefixPx';
import { isObj, isWeb } from '@evatrium/utils';
import type { CssInJsStore, NestedStyleObject, StyleObject, SheetsOptions } from '~/styles/types';

const store: CssInJsStore = {
  sheets: {},
  allRules: [],
  removals: [],
  parsed: {}
};
const TESTER = 'aASDasdfFASDFsasdfdf';
let markersInitialized = false;
const GLOBAL = 'global';
const GLOBAL_MEDIA = 'globalmedia';
const UTILITIES = 'utilities';
const UTILITIES_MEDIA = 'utilitiesmedia';
const COMPONENTS = 'components';
const COMPONENTS_MEDIA = 'componentsmedia';
const CUSTOM = 'custom';
const CUSTOM_MEDIA = 'custommedia';
const markers = {
  GLOBAL,
  GLOBAL_MEDIA,
  UTILITIES,
  UTILITIES_MEDIA,
  COMPONENTS,
  COMPONENTS_MEDIA,
  CUSTOM,
  CUSTOM_MEDIA
};
type MarkerElementsMap = {
  [namespace: string]: HTMLStyleElement;
};
const markerElements: MarkerElementsMap = {};
const CSSINJS_ATTR = 'data-evatrium-css';
const classNamePrefix: { [ns: string]: string } = Object.values(markers).reduce(
  (acc, curr, i) => ({
    ...acc,
    [curr]: `a${i}-`
  }),
  {}
);

const initializeMarkers = () => {
  Object.values(markers).forEach((namespace) => {
    const attr = `${CSSINJS_ATTR}-${namespace}-before-me`;
    let el: HTMLStyleElement = document.head.querySelector(`[${attr}]`)!;
    if (!el) {
      el = document.createElement('style');
      el.setAttribute(attr, '');
      document.head.appendChild(el);
    }
    markerElements[namespace] = el;
  });
  markersInitialized = true;
};

const safeName = (name: string) => name.replace(/[^a-z0-9]+/gi, '');

export const sheets = ({ namespace, media = '' }: SheetsOptions) => {
  if (!markersInitialized) initializeMarkers();
  const marker = namespace;
  const name = namespace + media;
  if (store.sheets[name]) return store.sheets[name];
  const attrValue = namespace + (media ? `-${safeName(media)}` : '');
  store.sheets[name] = {
    rules: [],
    namespace,
    attrValue,
    name,
    media,
    insert: () => {},
    remove: () => {}
  };

  const storeInsert = (rule: string) => {
    store.allRules.push(rule);
    store.sheets[name].rules.push(rule);
  };

  store.sheets[name].insert = storeInsert;

  if (!isWeb()) return store.sheets[name];

  let style: HTMLStyleElement = document.head.querySelector(`[${CSSINJS_ATTR}="${attrValue}"]`)!;

  const creatStyle = () => {
    style = document.createElement('style');
    style.setAttribute(CSSINJS_ATTR, attrValue);

    (markerElements[marker].parentNode as HTMLElement).insertBefore(
      style,
      markerElements[marker + (media ? 'media' : '')]
    );

    const s = style.sheet as CSSStyleSheet;

    if (media) {
      s.insertRule(`${media}{}`);
      store.sheets[name].insert = (rule) => {
        storeInsert(rule);
        (s.cssRules[0] as CSSMediaRule).insertRule(
          rule,
          (s.cssRules[0] as CSSMediaRule).cssRules.length
        );
      };
    } else {
      store.sheets[name].insert = (rule) => {
        storeInsert(rule);
        s.insertRule(rule, s.cssRules.length);
      };
    }
  };

  if (style) {
    let prevStyle = style;
    creatStyle();
    prevStyle.remove();
  } else creatStyle();

  store.sheets[name].el = style;
  return store.sheets[name];
};

const noAnd = (s: string) => s.replace(/&/g, '').trim();
const makeRule = (cn: string, child: string, key: string, val: string) =>
  `.${cn + noAnd(child)}{${prefixPx(key, val)}}`;
const makeClassName = (cn: string) => cn + store.allRules.length.toString(36);

// csx inspired yet customized
export const parse = (obj: NestedStyleObject, namespace: string) => {
  // named func for internal recursion
  const parser = (obj: NestedStyleObject, child: any = '', media?: any): string => {
    return Object.keys(obj)
      .map((key) => {
        const val = obj[key];
        if (val === null) return '';
        if (isObj(val)) {
          const isAtMediaKey = /^@/.test(key) ? key : null;
          const nextChild = isAtMediaKey ? child : child + key;
          return parser(val as StyleObject, nextChild, isAtMediaKey || media);
        }
        const ns = classNamePrefix[namespace] || 'x';
        const parseKey = ns + key + val + child + media;
        if (store.parsed[parseKey]) return store.parsed[parseKey];
        let cn = makeClassName(ns);
        let rule = makeRule(cn, child, key, val);
        sheets({ namespace, media }).insert(rule);
        store.parsed[parseKey] = cn;
        return cn;
      })
      .join(' ');
  };
  return parser(obj);
};

// grab the custom sheet's css text for server side rendering
const getSheets = () => {
  let s = [];
  for (let name in store.sheets) {
    const { media, rules, attrValue } = store.sheets[name];
    let cssText = rules.join(' ');
    s.push({
      type: 'style',
      props: {
        [CSSINJS_ATTR]: attrValue,
        children: media ? `${media}{${cssText}}` : cssText
      }
    });
  }
  return s;
};
