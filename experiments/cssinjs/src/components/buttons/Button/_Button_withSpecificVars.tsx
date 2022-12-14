import { Theme } from '~/styles/types';
import { ComponentPropsWithRef, FC } from 'react';
import { X, BoxProps, useStyles, useTheme } from '~/styles';
import { useVars } from '~/styles';
import { ObjStrKey } from '@evatrium/utils';
import { convertVars } from '~/styles/cssinjs/util';

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
const buttonStyles = (theme: Theme, variants: ButtonVariants) => {
  const { primary, size, outlined, color } = variants;
  const { palette, getColor, spacing, typography } = theme;
  const {
    actionPrimary,
    actionHoverPrimary,
    actionFocusPrimary,
    actionActivePrimary,
    actionDisabledPrimary
  } = palette;

  return {
    root: {
      ...buttonBaseStyles(theme).root,
      background: `var(--btn-bg, ${palette.action})`,
      ['&:hover']: {
        background: `var(--btn-bgHover, ${palette.actionHover})`
      },
      ['&:active']: {
        background: `var(--btn-bgActive, ${palette.actionActive})`
      },
      // ['&:focus']: {
      //   background: `var(--btn-bgFocus, ${theme.palette.actionFocus})`
      // },
      minHeight: `var(--btn-minHeight, ${typography.pxToRem(40)})`,
      px: `var(--btn-px, ${spacing(2.8)}px)`,
      py: `var(--btn-py, ${spacing(0.8)}px)`,
      border: `var(--btn-border, 0)`,
      color: `var(--btn-color, ${palette.t1})`,
      cursor: 'pointer',
      borderRadius: `var(--btn-br, ${55 + 'px'}/${55 + 'px'})`,
      ...typography.button,
      fontSize: `var(--btn-fontSize, ${typography.scale.t.fontSize})`,
      [`&[disabled]`]: {
        pointerEvents: 'none', // Disable link interactions
        cursor: 'not-allowed',
        background: `var(--btn-bgDisabled, ${palette.actionDisabled})`,
        opacity: 0.5
      }
    }
  };
};

interface ButtonVariants {
  outlined?: boolean;
  primary?: boolean;
  size?: 'sm';
  color?: keyof Theme['palette'];
}

const btnVariantVars = (theme: Theme, variants: ObjStrKey) => {
  const { primary, size, outlined, color } = variants;
  const { palette, getColor, spacing, typography } = theme;
  const {
    actionPrimary,
    actionHoverPrimary,
    actionFocusPrimary,
    actionActivePrimary,
    actionDisabledPrimary
  } = palette;
  const vars = {
    ...(primary && {
      ...(outlined
        ? {
            color: palette.primary
          }
        : {
            bg: actionPrimary,
            bgHover: actionHoverPrimary,
            bgActive: actionActivePrimary,
            bgFocus: actionFocusPrimary,
            bgDisabled: actionDisabledPrimary,
            color: palette.contrast2
          })
    }),
    ...(size === 'sm' && {
      px: spacing(1.5),
      py: spacing(0.25),
      fontSize: typography.scale.tsm.fontSize,
      minHeight: typography.pxToRem(30)
    }),
    border: outlined
      ? `2px solid ${getColor(color || primary ? 'primary' : 'grey.500') || 'transparent'}`
      : 0
  };

  return {
    root: convertVars('btn', vars)
  };
};

export const Button: FC<ButtonProps> = ({
  variant = 'contained',
  size = 'md',
  color,
  children,
  classes,
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
  const btnVars = useStyles(btnVariantVars, {
    variants: { primary, size, outlined, color }
  });
  const rendered = (
    <X component={'button'} disabled={disabled} classes={['btn', btn.root, classes]} {...rest}>
      {children}
    </X>
  );
  if (disabled && wrapDisabledCursor) {
    return (
      <div {...dcp} style={{ ...dcp?.style, display: 'inline-flex', cursor: 'not-allowed' }}>
        {rendered}
      </div>
    );
  } else return rendered;
};
