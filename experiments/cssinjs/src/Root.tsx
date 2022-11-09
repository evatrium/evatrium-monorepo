import { isString, Obj } from '@evatrium/utils';
import { Box, RootStylesProvider, useTheme, utilityStyles, StrKeyObj } from '~/styles';
import { theme } from '~/styles/theme';
import { stylesGlobal } from '~/styles/stylesGlobal';
import { Button } from '~/components/Button';

const Colors = () => {
  const { palette } = useTheme();

  return (
    <Box x flex wrap>
      {Object.keys(palette).map((color, i) => {
        if (!isString(palette[color])) return null;
        return <Box key={i} x sized={50} bg={color}></Box>;
      })}
    </Box>
  );
};

const ToggleModeDemo = (props) => {
  return (
    <Box x p={2} w1 {...props}>
      <Box x p={2} bg={'bg1'} br2 sh1>
        <Colors />
        {/*<Button x mt={1} onClick={toggleThemeMode}>*/}
        {/*  Toggle theme mode*/}
        {/*</Button>*/}
        <Button x mt={1} ml={1}>
          Another Button
        </Button>
      </Box>
    </Box>
  );
};

export const Root = () => {
  return (
    <RootStylesProvider
      theme={theme}
      globalStyles={stylesGlobal}
      utilityClassesStyles={utilityStyles}>
      <ToggleModeDemo mt={2} />
    </RootStylesProvider>
  );
};
