import { ComponentProps, ElementType, FC, forwardRef, memo, ReactNode, useMemo } from 'react';
import { ObjStrKey, StyleObjOrFunc, Theme } from '~/styles/types';
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
  utilityClasses: ObjStrKey,
  props: ObjStrKey
): [string, ObjStrKey, ObjStrKey] => {
  let sx: ObjStrKey = {},
    others: ObjStrKey = {},
    utilities = '';
  for (let key in props) {
    if (key in utilityClasses) {
      if (props[key]) utilities += utilityClasses[key] + ' ';
    } else if (key in marginPaddingFns) sx[key] = props[key];
    else others[key] = props[key];
  }
  return [utilities.trim(), sx, others];
};
const getMQ = (obj: ObjStrKey, out: ObjStrKey = {}) => {
  for (let key in obj) obj[key] && (out[`--${key}`] = obj[key]);
  return out;
};
type UseUtilitiesReturnType = [string, ObjStrKey, ObjStrKey];

export const useUtilityStyles = (props: ObjStrKey = {}): UseUtilitiesReturnType => {
  const theme = useTheme();
  const utilityClasses = useUtilityClasses();
  // prettier-ignore
  let {
    x, sx, style, gap, rowGap, bg, color, sized, aspectRatio,
    ...otherProps
  } = props;

  const deps = [sx, style, gap, rowGap, bg, color, sized, aspectRatio];
  // eslint-disable-next-line no-sparse-arrays
  const ignoreDeps = [1, 1, 1, 1, 1, 1, 1, x]; // react wants the num of deps to stay the same...
  // maybe this is pointless?... nah they wouldnt change and therefore the memo function would not run unnecessarily
  //
  const withUtilities = useShallowEqualMemo(
    () => {
      if (x) {
        let { flex, col } = otherProps;
        let [utilities, toSx, others] = getUtilities(theme, utilityClasses, otherProps);
        // styles
        const styles: ObjStrKey = {};
        if (rowGap || rowGap === 0) styles['--rowGap'] = `${theme.spacing(rowGap)}px`;
        if (gap || gap === 0) styles['--gridGap'] = `${theme.spacing(gap)}px`;
        if (aspectRatio) styles['--aspect-ratio'] = aspectRatio;
        if (col) getMQ(col, styles);
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
    x ? deps : ignoreDeps
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

export const X: FC<BoxProps> = memo(
  forwardRef<Element, BoxProps>(({ children, ...props }, ref) => {
    const { Component, ...rest } = useBoxProps(props);
    return (
      <Component ref={ref} {...rest}>
        {children}
      </Component>
    );
  })
);
