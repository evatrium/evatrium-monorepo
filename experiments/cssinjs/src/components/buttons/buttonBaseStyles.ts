import { Theme } from '~/styles/types';

export const buttonBaseStyles = (theme: Theme) => {
  return {
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
      textTransform: 'uppercase'
    }
  };
};
