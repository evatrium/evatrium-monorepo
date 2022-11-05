import { isFunc, isObj, deepMerge, isNum, isNullOrUndefined } from '@evatrium/utils';

export const marginPaddingFns = {
  m: (value) => ({ margin: value }),
  mt: (value) => ({ marginTop: value }),
  mr: (value) => ({ marginRight: value }),
  mb: (value) => ({ marginBottom: value }),
  ml: (value) => ({ marginLeft: value }),
  mx: (value) => ({ marginRight: value, marginLeft: value }),
  my: (value) => ({ marginTop: value, marginBottom: value }),
  p: (value) => ({ padding: value }),
  pt: (value) => ({ paddingTop: value }),
  pr: (value) => ({ paddingRight: value }),
  pb: (value) => ({ paddingBottom: value }),
  pl: (value) => ({ paddingLeft: value }),
  px: (value) => ({ paddingRight: value, paddingLeft: value }),
  py: (value) => ({ paddingTop: value, paddingBottom: value })
};

export const handleCustomDeclarationKeyMerge = (decKey, value, out, theme) => {
  if (value === undefined) return out;
  if (decKey in marginPaddingFns && !isNullOrUndefined(value)) {
    Object.assign(out, marginPaddingFns[decKey](isNum(value) ? value * theme.spacing(1) : value));
  } else out[decKey] = value;
  return out;
};

export const withThemeSystem = (declarations, theme) => {
  if (isFunc(declarations)) return withThemeSystem(declarations(theme), theme);
  if (isObj(declarations)) {
    let out = {};
    for (let decKey in declarations) {
      let value = declarations[decKey];
      if (isFunc(value)) {
        out = handleCustomDeclarationKeyMerge(
          decKey,
          withThemeSystem(value(theme), theme),
          out,
          theme
        );
      } else if (isObj(value)) {
        for (let k in value) {
          const { upDownKeys, downKeys, down, up } = theme.breakpoints;
          if (upDownKeys.includes(k)) {
            const isDown = downKeys.includes(k);
            const media = isDown ? down(k) : up(k);
            out[media] = handleCustomDeclarationKeyMerge(
              decKey,
              withThemeSystem(value[k], theme),
              out[media] || {},
              theme
            );
          } else {
            (out[decKey] || (out[decKey] = {}))[k] = withThemeSystem(value[k], theme);
          }
        }
      } else {
        out = handleCustomDeclarationKeyMerge(decKey, value, out, theme);
      }
    }
    return out;
  } else if (Array.isArray(declarations)) {
    declarations = declarations.filter(Boolean);
    return declarations.reduce((acc, curr) => deepMerge(acc, withThemeSystem(curr, theme)), {});
  } else return declarations;
};
