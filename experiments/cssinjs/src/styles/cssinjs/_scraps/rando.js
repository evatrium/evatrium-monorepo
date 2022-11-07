// import { prefix } from './prefixer';
// import { isObj, stringify } from '@iosio/util';
// import { getName } from '~/getName.js';
//
// const createClasses = (jssClasses = {}, declarations) => {
//   if (declarations) return parse(jssClasses);
//   let cssClasses = {};
//   for (let classKey in jssClasses) cssClasses[classKey] = parse(jssClasses[classKey]);
//   return cssClasses;
// };
//
// export const CreateThemedJssToSimpleGlobalCssStyles = (theme) => (styles) => {
//   let css = typeof styles === 'function' ? styles(theme) : styles;
//   // console.log(css);
//   jsToRules(css).forEach((rule) => sheets({ id: 'global', global: true }).insert(rule));
// };

//
//
// setTimeout(() => {
//     console.log(sheets);
//     getSheets().forEach(s => {
//         console.log(s.props.children)
//     });
// }, 1000)

//hydrate cache
// if (global) {
//     // populate the cache
//     simpleJssToCssRules(cssStringToJss(style.innerText)).forEach(rule => {
//         globalRules.push(rule);
//         tempInsert(rule);
//     })
// } else {
//     // run existing styles through tempInsert on hydrate
//     sheets[name].insert = tempInsert;
//     // populate the cache to make sure the .length values are are current
//     // for generating the incrementing classnames
//     createClasses(convertToPlainPropertyNames(cssStringToJss(style.innerText)));
// }
// sheets[name].insert = getInsert(style);

/*

export const headStyleTag = (mount) => {
    let style = document.createElement('style');
    style.appendChild(document.createTextNode(""));
    (mount || document.head).appendChild(style);
    return (css) => (style.appendChild(document.createTextNode(css)), style);
};

export const toCssVarsFromJsThemeObj = (themeObj) =>
    Object.keys(themeObj).reduce((acc, curr) =>
        ((acc[curr] = `var(--${curr},${themeObj[curr]})`), acc), {});

export const convertThemeToCssVars = (vars, selector) =>
    `${selector || ':root'}{${Object.keys(vars).map((key) => `--${key}:${vars[key]};`).join('')}}`;


export const CSSTextToObj = cssText => {
    var style = {},
        cssToJs = s => s.startsWith('-') ? s : s.replace(/\W+\w/g, match => match.slice(-1).toUpperCase()),
        properties = cssText.split(";").map(o => o.split(":").map(x => x && x.trim()));
    for (var [property, value] of properties) {
        let prop = cssToJs(property);
        if (prop) style[prop] = value;
    }
    return style
};
 */
