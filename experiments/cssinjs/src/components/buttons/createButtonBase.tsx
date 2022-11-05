import { styles } from '~/styles';
import { Box } from '~/components/Box';
import { buttonBaseStyles } from '~/components/buttons/buttonBaseStyles';
import { reduceMerge } from '~/styles/util/reduceMerge';

export const createButtonBase = ({ override } = {}) => {
  const buttonStyles = styles((theme) => reduceMerge(theme, buttonBaseStyles, override));
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
