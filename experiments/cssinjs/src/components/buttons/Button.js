import { styles } from '~/styles/index.ts';
import { reduceMerge } from '~/styles/util/reduceMerge.ts';
import { Box } from '~/components/Box.tsx';

export const createButton = ({ overrides = {} } = {}) => {
  const buttonStyles = styles((theme) => reduceMerge(theme, overrides));
  return function ButtonBase({ sx, className, classes, sxDeps, ...rest }) {
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
