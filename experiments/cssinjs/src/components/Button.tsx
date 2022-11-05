import { deepMergeSimple } from '@evatrium/utils';
import { Box } from '~/components/Box';
import { styles } from '~/styles';
import { NestedStyleObject, Theme } from '~/styles/types';

const buttonBaseStyles = (theme: Theme, overrides?: NestedStyleObject) => {
  const classes = {
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
      fontWeight: 'bold',
      overflow: 'hidden',
      textTransform: 'uppercase',
      transition: theme.transitions.create(['background', 'box-shadow', 'border-color', 'color'], {
        duration: theme.transitions.duration.short
      })
    }
  };
  return overrides ? deepMergeSimple(classes, overrides) : classes;
};

export const createButton = ({ overrides } = {}) => {
  const buttonStyles = styles((theme) => buttonBaseStyles(theme, overrides));
  return function Button({ sx, className, classes, sxDeps, ...rest }) {
    return (
      <Box
        component={'button'}
        classes={[buttonStyles.root, classes, className]}
        sx={sx}
        sxDeps={sxDeps}
        {...rest}
      />
    );
  };
};
