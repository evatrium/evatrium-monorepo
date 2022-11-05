export const keyframes = () => ({
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
  '@keyframes fadeOut': {
    from: { opacity: 1 },
    to: { opacity: 0 }
  },
  '@keyframes shimmer': {
    '0%': {
      backgroundPosition: '-1000px 0'
    },
    '100%': {
      backgroundPosition: '1000px 0'
    }
  },
  '@keyframes loadingSpinner': {
    '0%': {
      transform: 'rotate(0)'
    },
    to: {
      transform: 'rotate(1turn)'
    }
  },
  '@keyframes auto-fill': {
    from: {
      display: 'block'
    }
  },
  '@keyframes auto-fill-cancel': {
    from: {
      display: 'block'
    }
  }
});
