import { useToggle } from '@evatrium/hooks';
import { FC, useMemo, ComponentProps } from 'react';
import { Theme } from '~/styles/types';
import { Obj } from '@evatrium/utils';
import { Box, BoxProps, RootStylesProvider, useStyles } from '~/styles';
import { theme } from '~/styles/theme';
import { stylesGlobal } from '~/styles/stylesGlobal';
import { Button } from '~/components/Button';

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
  // const sx2 = useMemo(
  //   () => ({
  //     background: 'pink',
  //     width: 100
  //   }),
  //   []
  // );
  return (
    <>
      {bool ? 'true' : 'false'}
      <BlackBox
        size={bool ? 'sm' : 'lg'}
        onClick={() => {
          toggle();
        }}
      />

      {bool && <BlackBox size={'lg'} sx={stableOverrides} />}

      <Button
        sx={{
          textDecoration: 'underline',
          color: {
            xs: 'white',
            sm: 'orange',
            md: 'yellow',
            lg: 'green'
          }
        }}>
        Heeyoooo
      </Button>
    </>
  );
};
export const Root = () => {
  return (
    <RootStylesProvider theme={theme} globalStyles={stylesGlobal}>
      <App />
    </RootStylesProvider>
  );
};
