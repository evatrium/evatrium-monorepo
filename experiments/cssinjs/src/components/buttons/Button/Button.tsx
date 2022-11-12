import { Theme } from '~/styles/types';
import { ComponentPropsWithRef, FC } from 'react';
import { X, BoxProps, useStyles } from '~/styles';
import { cn, deepMergeSimple } from '@evatrium/utils';

interface ButtonVariants {
  outlined?: boolean;
  primary?: boolean;
  size?: 'sm' | 'md' | 'lg';
  focusVisible?: boolean;
}

type ButtonProps = BoxProps & ComponentPropsWithRef<'button'> & ButtonVariants;

const buttonBaseStyles = (theme: Theme, variants?: ButtonVariants) => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent',
    outline: 0,
    border: 0,
    margin: 0,
    borderRadius: 0,
    padding: 0, // Remove the padding in Firefox
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    MozAppearance: 'none', // Reset
    WebkitAppearance: 'none', // Reset
    textDecoration: 'none',
    // color: 'inherit',
    // eslint-disable-next-line
    // '& ::-moz-focus-inner': {
    //   borderStyle: 'none' // Remove Firefox dotted outline.
    // },
    [`&[disabled]`]: {
      pointerEvents: 'none', // Disable link interactions
      cursor: 'not-allowed'
    },
    '@media print': {
      colorAdjust: 'exact'
    },
    flexShrink: 0,
    overflow: 'hidden',
    transition: theme.transitions.create(['background', 'box-shadow', 'border-color', 'color'], {
      duration: theme.transitions.duration.short
    })
  }
});

// TODO: finish theming/palette ..etc
const buttonStyles = (theme: Theme, variants: ButtonVariants) => {
  const { primary, size, outlined, focusVisible } = variants;
  const { palette, getColor, typography, shape } = theme;
  const {
    actionPrimary,
    actionHoverPrimary,
    actionFocusPrimary,
    actionActivePrimary,
    actionDisabledPrimary
  } = palette;
  const root = {
    ...buttonBaseStyles(theme).root,
    px: 3,
    py: 0.8,
    borderRadius: shape.br1,
    minHeight: typography.pxToRem(40),
    ...typography.button,
    ...(size === 'sm' && {
      px: 1.5,
      py: 0.4,
      ...typography.scale.tsm,
      minHeight: typography.pxToRem(30)
    }),
    color: palette.t1,
    background: palette.action,
    ['&:hover']: {
      background: palette.actionHover
    },
    ['&:active']: {
      background: palette.actionActive
    },
    ...(focusVisible && {
      ['&:focus']: {
        background: palette.actionFocus
      }
    }),
    '@media (hover: none)': {
      background: palette.action
    },
    border: outlined
      ? `2px solid ${getColor(primary ? 'primary' : 'grey.500') || 'transparent'}`
      : 0,
    ...(primary &&
      outlined && {
        color: palette.primary
      }),
    ...(primary &&
      !outlined && {
        background: actionPrimary,
        color: palette.contrast2,
        ['&:hover']: {
          background: actionHoverPrimary
        },

        ['&:active']: {
          background: actionActivePrimary
        },
        ...(focusVisible && {
          ['&:focus']: {
            background: actionFocusPrimary
          }
        }),
        '@media (hover: none)': {
          background: actionPrimary
        }
      }),
    cursor: 'pointer',
    [`&[disabled]`]: {
      pointerEvents: 'none', // Disable link interactions
      cursor: 'not-allowed',
      background: !outlined && primary ? actionDisabledPrimary : palette.actionDisabled,
      opacity: 0.6
    }
  };
  return deepMergeSimple({ root }, theme.components.Button?.styles(theme, variants));
};

export const Button: FC<ButtonProps> = ({
  variant = 'contained',
  size = 'md',
  color,
  children,
  className,
  primary,
  outlined,
  disabled,
  bg,
  wrapDisabledCursor = true,
  disabledContainerProps: dcp,
  ...rest
}) => {
  const btn = useStyles(buttonStyles, {
    variants: { primary, size, outlined, color }
  });
  const rendered = (
    <X
      component={'button'}
      disabled={disabled}
      className={cn('btn', btn.root, className)}
      {...rest}>
      {children}
    </X>
  );
  if (disabled && wrapDisabledCursor) {
    return (
      <div {...dcp} style={{ ...dcp?.style, display: 'contents', cursor: 'not-allowed' }}>
        {rendered}
      </div>
    );
  } else return rendered;
};
