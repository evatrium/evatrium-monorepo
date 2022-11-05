export const aspectRatio = () => ({
  '[style*="--aspect-ratio"] > :first-child': {
    width: '100%'
  },
  '[style*="--aspect-ratio"] > img': {
    height: 'auto'
  },
  '[style*="--aspect-ratio"]': {
    position: 'relative',
    '--ratio': 'calc(var(--aspect-ratio))'
  },
  '[style*="--aspect-ratio"]::before': {
    content: '""',
    display: 'block',
    paddingBottom: 'calc(100% / (var(--ratio)))'
  },
  '[style*="--aspect-ratio"] > :first-child, [style*="--aspect-ratio"] img': {
    position: 'absolute',
    top: '0',
    left: '0',
    height: '100%'
  }
});
