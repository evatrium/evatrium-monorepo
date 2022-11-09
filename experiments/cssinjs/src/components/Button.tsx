import { Theme } from '~/styles/types';
import { ComponentPropsWithRef, FC } from 'react';
import { Box, BoxProps, useBoxProps, useStyles, useTheme } from '~/styles';

export const makeVars = (name, def) => {
  return (name, def) => ({});
};

const useVars = makeVars('btn', {
  background: {
    default: 'palette.action',
    text: 'transparent',
    primary: 'palette.primary'
  },
  px: {}
});

type ButtonProps = {
  cn?: string;
} & BoxProps &
  ComponentPropsWithRef<'button'> &
  ButtonVariants;

const buttonBaseStyles = (theme: Theme, variants?: ButtonVariants) => ({
  root: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    boxSizing: 'border-box',
    WebkitTapHighlightColor: 'transparent',
    backgroundColor: 'transparent', // Reset default value
    // We disable the focus ring for mouse, touch and keyboard users.
    outline: 0,
    border: 0,
    margin: 0, // Remove the margin in Safari
    borderRadius: 0,
    padding: 0, // Remove the padding in Firefox
    cursor: 'pointer',
    userSelect: 'none',
    verticalAlign: 'middle',
    MozAppearance: 'none', // Reset
    WebkitAppearance: 'none', // Reset
    textDecoration: 'none',
    // So we take precedent over the style of a native <a /> element.
    color: 'inherit',
    // eslint-disable-next-line
    // '& ::-moz-focus-inner': {
    //   borderStyle: 'none' // Remove Firefox dotted outline.
    // },
    [`&[disabled]`]: {
      pointerEvents: 'none', // Disable link interactions
      cursor: 'default'
    },
    '@media print': {
      colorAdjust: 'exact'
    },
    // padding: '8px 22px',
    flexShrink: 0,
    overflow: 'hidden',
    // fontWeight: 'bold',
    // textTransform: 'uppercase',

    transition: theme.transitions.create(['background', 'box-shadow', 'border-color', 'color'], {
      duration: theme.transitions.duration.short
    })
  }
});

// TODO: finish theming/palette ..etc
const buttonStyles = (theme: Theme, variants: ButtonVariants) => ({
  root: {
    ...buttonBaseStyles(theme).root,
    background: `var(--btn-bg, ${theme.palette.action})`,
    ['&:hover']: {
      background: `var(--btn-bgHover, ${theme.palette.actionHover})`
    },
    ['&:active']: {
      background: `var(--btn-bgActive, ${theme.palette.actionActive})`
    },
    // ['&:focus']: {
    //   background: `var(--btn-bgFdddddocus, ${theme.palette.actionFocus})`
    // },
    px: `var(--btn-px, 22px)`,
    py: `var(--btn-py, 8px)`,
    border: `var(--btn-border, 0)`,
    color: `var(--btn-color, ${theme.palette.t1})`,
    cursor: 'pointer',
    borderRadius: `var(--btn-br, ${theme.shape.br1 + 'px'})`,
    ...theme.typography.button
  }
});

interface ButtonVariants {
  variant?: 'outlined' | 'subtle' | 'text' | 'contained';
  size?: 'default' | 'sm';
  color?: keyof Theme['palette'];
}

export const Button: FC<ButtonProps> = ({
  variant = 'text',
  size = 'default',
  color,
  children,
  classes,
  primary,
  bg,
  style,
  ...rest
}) => {
  const { palette, getColor } = useTheme();
  const btn = useStyles(buttonStyles);
  const { actionPrimary, actionPrimaryHover } = palette;

  // const bg =
  const root = {
    ...(primary && {
      bg: actionPrimary,
      bgHover: actionPrimaryHover
    }),
    ...(size === 'sm' && {
      px: 0.5,
      py: 0.25
    }),
    bg: bg ? getColor(bg) : primary ? palette.actionPrimary : palette.action,
    bghover: primary ? palette.actionPrimaryHover : palette.actionHover,
    ...(size && {}),
    border:
      variant === 'outlined'
        ? color
          ? `1px solid ${getColor(color) || 'transparent'}`
          : primary
          ? palette.primary
          : 0
        : 0,
    color: primary ? palette.contrast1 : palette.t1
  };

  return (
    <Box
      component={'button'}
      style={{
        ...style
      }}
      classes={[btn.root]}
      {...rest}>
      {children}
    </Box>
  );
};
