import { isWeb } from '@evatrium/utils';

const sheets = {};
const removals = [];
export const cleanJss = () => removals.map((f) => f && f());

let globalRules = [];
const allRules = [];

export const sheet = ({ id = 'main', isMedia, global } = {}) => {
  const name = getName(id);
  global = global || id === 'global';
  if (sheets[name]) return sheets[name];

  sheets[name] = { rules: [], id, name, isMedia, remove: () => 0 };

  const altInsert = (rule) => {
    !global && allRules.push(rule);
    sheets[name].rules.push(rule);
  };

  sheets[name].insert = altInsert;

  if (!isWeb()) return sheets[name];

  let style = document.head.querySelector('#' + name);

  const creatStyle = () => {
    style = document.createElement('style');
    style.setAttribute('id', name);
    document.head.appendChild(style);
    sheets[name].insert = getInsert(style);
  };

  const getInsert = (style) => {
    let insertRule;
    if (isMedia) {
      style.sheet.insertRule(`${id}{}`);
      const mediaRule = style.sheet.cssRules[0];
      insertRule = (rule) => mediaRule.insertRule(rule, mediaRule.cssRules.length);
    } else {
      if (global) {
        insertRule = (rule) => {
          style.sheet.insertRule(rule, style.sheet.cssRules.length);
          globalRules.push(rule);
        };
      } else {
        insertRule = (rule) => style.sheet.insertRule(rule, style.sheet.cssRules.length);
      }
    }
    return (rule) => (altInsert(rule), insertRule(rule));
  };

  if (!style) creatStyle();
  else {
    let prevStyle = style;
    creatStyle();
    removals.push(() => {
      prevStyle.remove();
      console.log('cleaned');
    });
  }

  sheets[name].el = style;
  return sheets[name];
};

// grab the custom sheet's css text for server side rendering
export const getSheets = () => {
  let s = [];
  for (let name in sheets) {
    let cssText = sheets[name].rules.join('');
    s.push({
      type: 'style',
      props: {
        id: name,
        children: sheets[name].isMedia ? `${sheets[name].id}{${cssText}}` : cssText
      }
    });
  }
  return s;
};

let nameCache = {};
const getName = (id) => {
  if (nameCache[id]) return nameCache[id];
  nameCache[id] = id.replace(/[^a-z0-9]+/gi, '');
  return nameCache[id];
};
