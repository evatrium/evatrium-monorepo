import { ComponentProps, ElementType, FC, forwardRef, ReactNode, useMemo } from 'react';
import { StrKeyObj, StyleObjOrFunc, Theme } from '~/styles/types';
import {
  cn,
  deepMerge,
  isEmpty,
  isFunc,
  isNullOrUndefined,
  isNum,
  isString
} from '@evatrium/utils';
import { useStyles, useTheme, useUtilityClasses } from '~/styles/cssinjs/reactCssInJs';
import { marginPaddingFns } from '~/styles/cssinjs/withThemeSystem';
import { sized as sizeIt } from '~/styles';
import { useShallowEqualMemo } from '@evatrium/hooks';

const assign = Object.assign;

const getUtilities = (
  theme: Theme,
  utilityClasses: StrKeyObj,
  props: StrKeyObj
): [string, StrKeyObj, StrKeyObj] => {
  let sx: StrKeyObj = {},
    others: StrKeyObj = {},
    utilities = '';
  for (let key in props) {
    if (key in utilityClasses) {
      if (props[key]) utilities += utilityClasses[key] + ' ';
    } else if (key in marginPaddingFns) sx[key] = props[key];
    else others[key] = props[key];
  }
  return [utilities, sx, others];
};
const getMQ = (obj: StrKeyObj, out: StrKeyObj = {}) => {
  for (let key in obj) if (!isNullOrUndefined(obj[key])) out[`--${key}`] = obj[key];
  return out;
};
type UseUtilitiesReturnType = [string, StrKeyObj, StrKeyObj];

export const useUtilityStyles = (props: StrKeyObj = {}): UseUtilitiesReturnType => {
  const theme = useTheme();
  const utilityClasses = useUtilityClasses();
  // prettier-ignore
  let {
    x, sx, style, gap, rowGap, bg, color, sized, aspectRatio, xs, sm, md, lg, xl, xxl,
    ...otherProps
  } = props;
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  if (process.env.NODE_ENV !== 'production') {
    if ([gap, rowGap, bg, color, sized, aspectRatio, xs, sm, md, lg, xl, xxl].some(Boolean) && !x) {
      /*throw new Error*/
      console.error('x prop is required when using utility props on Box');
    }
  }
  const withUtilities = useShallowEqualMemo(
    () => {
      if (x) {
        let { flex, col } = otherProps;
        let [utilities, toSx, others] = getUtilities(theme, utilityClasses, otherProps);
        // styles
        const styles: StrKeyObj = {};
        if (rowGap || rowGap === 0) styles['--rowGap'] = `${theme.spacing(rowGap)}px`;
        if (gap || gap === 0) styles['--gridGap'] = `${theme.spacing(gap)}px`;
        if (aspectRatio) styles['--aspect-ratio'] = aspectRatio;
        if (col) getMQ({ xs, sm, md, lg, xl, xxl }, styles);
        if (style) assign(styles, style);
        // sx
        if (bg) toSx.background = theme.getColor(bg);
        if (color) toSx.color = theme.getColor(color);
        if (isString(flex)) toSx.flex = flex;
        if (sized || sized === 0) assign(toSx, sizeIt(sized));
        sx = isFunc(sx) ? sx(theme) : sx || {};
        sx = assign(sx, toSx);
        if (!isEmpty(styles)) others.style = styles;
        return [utilities, sx, others];
      }
      return ['', sx, otherProps];
    },
    x ? [sx, style, gap, rowGap, bg, color, sized, aspectRatio, xs, sm, md, lg, xl, xxl] : [x]
  );
  if (x) return withUtilities as UseUtilitiesReturnType;
  if (!isEmpty(style)) otherProps.style = style;
  return ['', sx, otherProps];
};

export interface BoxProps extends ComponentProps<any> {
  component?: ElementType;
  className?: 'string';
  classes?: any[] | undefined;
  sx?: StyleObjOrFunc; // TODO: FIX TYPE
  sxDeps?: any[];
  // sxs?: StyleObjOrFunc; // stable sx
  children?: ReactNode;
}

export const useBoxProps = ({
  component = 'div',
  className,
  classes,
  sxDeps,
  ...rest
}: BoxProps) => {
  const [utilities, toSx, other] = useUtilityStyles(rest);
  const sxClassName = useStyles(toSx, {
    declarations: true,
    variants: sxDeps
  });
  const allClasses = useMemo(
    () => cn(sxClassName, utilities, className, classes),
    [sxClassName, utilities, className, classes]
  );
  return assign({ Component: component, className: allClasses }, other);
};

export const Box: FC<BoxProps> = forwardRef<Element, BoxProps>(({ children, ...props }, ref) => {
  const { Component, ...rest } = useBoxProps(props);
  return (
    <Component ref={ref} {...rest}>
      {children}
    </Component>
  );
});
