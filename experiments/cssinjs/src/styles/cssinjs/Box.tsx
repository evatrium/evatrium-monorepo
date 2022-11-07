import { ComponentProps, ElementType, FC, forwardRef, ReactNode, useMemo } from 'react';
import { StyleObjOrFunc } from '~/styles/types';
import { cn } from '@evatrium/utils';
import { useStyles } from '~/styles/cssinjs/reactCssInJs';

const EMPTY_SX_DEPS: any[] = [];

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
  sx,
  sxDeps,
  ...rest
}: BoxProps) => {
  const sxClassName = useStyles(sx, {
    declarations: true,
    variants: sxDeps
  });

  const classNames = useMemo(
    () => cn(className, classes, sxClassName),
    [className, classes, sxClassName]
  );
  return {
    Component: component,
    className: classNames,
    ...rest
  };
};

export const Box: FC<BoxProps> = forwardRef<Element, BoxProps>((props, ref) => {
  const { Component, ...rest } = useBoxProps(props);
  return <Component ref={ref} {...rest} />;
});
