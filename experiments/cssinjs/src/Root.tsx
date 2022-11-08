import { useToggle } from '@evatrium/hooks';
import { FC, ComponentProps } from 'react';
import { Theme } from '~/styles/types';
import { isString, Obj } from '@evatrium/utils';
import { Box, BoxProps, RootStylesProvider, useStyles, useTheme, toggleThemeMode } from '~/styles';
import { theme } from '~/styles/theme';
import { stylesGlobal } from '~/styles/stylesGlobal';
import { Button } from '~/components/Button';
import { Card } from '~/components/Card';

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

const useToggleMode = () => {};

const Colors = () => {
  const { palette } = useTheme();

  return (
    <div style={{ display: 'flex' }}>
      {Object.keys(palette).map((color, i) => {
        if (!isString(palette[color])) return null;
        return <div key={i} style={{ width: 50, height: 50, background: palette[color] }}></div>;
      })}
    </div>
  );
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
        cn={'t1 flex centerize'}
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
    // import { utilityStyles } from '~/styles';
    //utilityStyles={utilityStyles} // TODO: fix utility styles
    <RootStylesProvider theme={theme} globalStyles={stylesGlobal}>
      {/*<App />*/}
      <Box sx={{ p: 2, width: '100%' }}>
        <Card sx={{ p: 2 }}>
          <Colors />
          <Button onClick={toggleThemeMode}>Toggle theme mode</Button>
        </Card>
      </Box>
    </RootStylesProvider>
  );
};
