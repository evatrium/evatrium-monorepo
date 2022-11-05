import { cn, isEmpty, Obj } from '@evatrium/utils';
import { FC, useMemo, forwardRef, ElementType } from 'react';
import { styles } from '~/styles';
import { StyleObjOrFunc } from '~/styles/types';

export interface BoxProps {
  component?: ElementType;
  className?: 'string';
  classes?: string | Obj | Obj[] | string[] | any[] | undefined;
  sx?: any; // TODO: FIX TYPE
  sxDeps?: any[];
  children?: ElementType;
}

//
// const useBoxProps = ({
//   component = 'div',
//   className,
//   classes,
//   sx,
//   sxDeps = EMPTY_SX_DEPS,
//   ...rest
// }) => {};
const EMPTY_SX_DEPS: any[] = [];
export const Box: FC<BoxProps> = forwardRef<Element, BoxProps>(
  ({ component = 'div', className, classes, sx, sxDeps = EMPTY_SX_DEPS, ...rest }, ref) => {
    const Component = component;
    const classNames = useMemo(
      () => cn(className, classes, !isEmpty(sx) && styles(sx, true)),
      [className, classes, ...sxDeps]
    );

    return <Component ref={ref} className={classNames} {...rest} />;
  }
);
