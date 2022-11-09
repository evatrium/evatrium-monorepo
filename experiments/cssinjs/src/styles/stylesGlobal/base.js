export const base = (theme) => ({
  // '& *, & *::before, & *::after': {
  //   boxSizing: 'inherit'
  // },
  // '@media print': {
  //   // Save printer ink.
  //   backgroundColor: 'white' // theme.vars.palette.common.white,
  // },
  //
  // '& strong, & b': {
  //   fontWeight: 'bold'
  // }
  '*, *:after, *:before': {
    boxSizing: 'border-box',
    margin: 0,
    padding: 0,
    touchAction: 'manipulation'
  },
  html: {
    '--light': 'var(--ON)',
    '--dark': 'var(--OFF)',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    '-ms-text-size-adjust': '100%',
    'text-size-adjust': '100%',
    '-webkit-text-size-adjust': '100%',
    textRendering: 'optimizeLegibility',
    overflow: 'hidden',
    '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
    background: theme.palette.bg0,
    color: theme.palette.t1,
    ...theme.typography.html
    // ...html,
    // color: theme.palette.t1,
  },
  'html, body, #root': {
    overflow: 'hidden',
    // background: theme.palette.bg0,
    height: '100%',
    width: '100%'
    // minHeight: '100vh' //test
  },
  body: {
    ...theme.typography.body
  },
  button: {
    ...theme.typography.button
  }
});
