import { isString } from '@evatrium/utils';
import { Box, RootStylesProvider, useTheme, utilityStyles } from '~/styles';
import { theme } from '~/styles/theme';
import { stylesGlobal } from '~/styles/stylesGlobal';
import { Button } from '~/components/Button';
import { Mode, useThemeMode } from '~/styles/theme/mode';
import { ComponentProps, FC } from 'react';

const Colors: FC<ComponentProps<any>> = () => {
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

const ToggleModeDemo: FC<ComponentProps<any>> = (props) => {
  const [mode, setMode] = useThemeMode();
  console.log(mode);
  return (
    <Box x p={2} w1 {...props}>
      <Box x p={2} bg={'bg1'} br2 sh1>
        <Colors />
        <Box x flex aic sx={{ gap: 10 }} mt={2}>
          <Button onClick={() => setMode('dark' as Mode)}>Dark Mode</Button>
          <Button onClick={() => setMode('light' as Mode)}>Light Mode</Button>
          <Button onClick={() => setMode('system' as Mode)}>System Mode</Button>
          <Box sx={(t) => ({ ...t.typography.button })}>Mode is: {JSON.stringify(mode)}</Box>
        </Box>
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
      <Box x w1 px={2}>
        <Box x row>
          {[...Array(12)].map((_, i) => {
            return (
              <Box gap={0.5} rowGap={1} key={i} x col xs={12} sm={6} md={4} style={{ height: 100 }}>
                <Box x bg={'bg1'} sh1 all1 br={1} />
              </Box>
            );
          })}
        </Box>
      </Box>
    </RootStylesProvider>
  );
};
