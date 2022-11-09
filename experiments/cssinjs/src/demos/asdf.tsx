import { Box, BoxProps, Theme, useStyles } from '~/styles';
import { Obj } from '@evatrium/utils';
import { ComponentProps, FC } from 'react';
import { useToggle } from '@evatrium/hooks';

const squareStyles = (theme: Theme, props: Obj) => {
  const { size = 'sm', color = 'blue' } = props;
  const sizes: { [size: string]: number } = { sm: 100, lg: 200 };
  const sized = (size && sizes[size as string]) || 100;
  return {
    root: {
      height: sized,
      width: sized,
      background: color
    }
  };
};

interface BlackBoxProps extends ComponentProps<any>, BoxProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

export const BlackBox: FC<BlackBoxProps> = ({ size, color, ...rest }) => {
  const classnames = useStyles(squareStyles, {
    variants: { size, color }
  });
  return (
    <Box className={classnames.root} {...rest}>
      im a box
    </Box>
  );
};

const stableOverrides = {
  background: 'pink',
  width: 100
};

const App = () => {
  const [bool, toggle] = useToggle(false);
  return (
    <Box x p={2}>
      <Box
        sx={{
          color: {
            xs: 'white',
            sm: 'orange',
            md: 'yellow',
            lg: 'green'
          }
        }}>
        {bool ? 'true' : 'false'}
      </Box>

      <BlackBox size={bool ? 'sm' : 'lg'} onClick={toggle} />

      {bool && <BlackBox size={'lg'} sx={stableOverrides} />}
    </Box>
  );
};
