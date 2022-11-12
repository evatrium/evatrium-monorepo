import { isString } from '@evatrium/utils';
import { X, RootStylesProvider, useTheme, utilityStyles } from '~/styles';
import { theme } from '~/styles/theme';
import { stylesGlobal } from '~/styles/stylesGlobal';
import { Button } from '~/components/buttons/Button/Button';
import { Mode, useThemeMode } from '~/styles/theme/mode';
import { ComponentProps, FC } from 'react';
import { loremIpsum } from '~/util';

const Colors: FC<ComponentProps<any>> = () => {
  const { palette } = useTheme();
  return (
    <X x flex wrap>
      {Object.keys(palette).map((color, i) => {
        if (!isString(palette[color])) return null;
        return <X key={i} x sized={50} bg={color}></X>;
      })}
    </X>
  );
};

const Group: FC<ComponentProps<any>> = (props) => (
  <X x w1 flex aic wrap sx={{ gap: 8 }} mt={2} {...props} />
);

const ToggleModeDemo: FC<ComponentProps<any>> = (props) => {
  const [mode, setMode] = useThemeMode();
  console.log(mode);
  return (
    <X x w1 {...props} mb={2}>
      <X x p={2} bg={'bg1'} br2 sh1>
        <Colors />
        <Group>
          <Button onClick={() => setMode('dark' as Mode)}>Dark Mode</Button>
          <Button onClick={() => setMode('light' as Mode)}>Light Mode</Button>
          <Button onClick={() => setMode('system' as Mode)}>System Mode</Button>
          <X x color={'t2'}>
            Setting: {` `}
          </X>
          <X x bold>
            {mode.setting}
          </X>
          <X x color={'t2'}>
            Perceived:
          </X>
          <X x bold>
            {mode.perceived}
          </X>
        </Group>
      </X>
    </X>
  );
};

const Buttons: FC<ComponentProps<any>> = (props) => {
  return (
    <X x w1 {...props} mb={2}>
      <X x p={2} bg={'bg1'} br2 sh1>
        <Group>
          <Button>Btn</Button>
          <Button outlined>Btn Outlined</Button>
          <Button primary>Primary Btn</Button>
          <Button primary outlined>
            Primary Btn Outlined
          </Button>
        </Group>
        <Group>
          <Button disabled>Disabled</Button>
          <Button disabled outlined>
            Outlined Disabled
          </Button>
          <Button disabled primary>
            primary Disabled
          </Button>
          <Button disabled primary outlined>
            Primary Outlined Disabled
          </Button>
        </Group>
        <Group>
          <Button size={'sm'}> Btn sm</Button>
          <Button size={'sm'} outlined>
            Outlined sm
          </Button>
          <Button size={'sm'} primary>
            Primary sm
          </Button>
          <Button size={'sm'} primary outlined>
            Primary Outlined sm
          </Button>
        </Group>
        <Group>
          <Button size={'sm'} disabled>
            Disabled sm
          </Button>
          <Button size={'sm'} outlined disabled>
            Disabled Outlined sm
          </Button>
          <Button size={'sm'} primary disabled>
            Disabled Primary sm
          </Button>
          <Button size={'sm'} primary outlined disabled>
            Disabled Primary outlined sm
          </Button>
        </Group>
      </X>
    </X>
  );
};
const Grid: FC<ComponentProps<any>> = () => {
  return (
    <X x w1 px={2}>
      <X x row>
        {[...Array(12)].map((_, i) => {
          return (
            <X
              gap={0.5}
              rowGap={1}
              key={i}
              x
              col={{ xs: 12, sm: 6, md: 4 }}
              xs={12}
              sm={6}
              md={4}
              style={{ height: 100 }}>
              <X x bg={'bg1'} sh1 all1 br={1} />
            </X>
          );
        })}
      </X>
    </X>
  );
};

const Typography: FC<ComponentProps<any>> = () => {
  return (
    <X x w1 p={2} bg={'bg1'} br2 sh1>
      <X x txl>
        Typo: txl
      </X>
      <X x tlg>
        Typo: tlg
      </X>
      <X x tmd bold>
        Typo: tmd
      </X>
      <X x my={1} t color={'t1'} sx={{ width: { xs: '100%', sm: '50%' } }}>
        (Default) {loremIpsum}
      </X>
      <X x tsm>
        Typo: tsm
      </X>
      <X x txs>
        Typo: txs
      </X>
    </X>
  );
};
export const Root = () => {
  return (
    <RootStylesProvider
      theme={theme}
      globalStyles={stylesGlobal}
      utilityClassesStyles={utilityStyles}>
      <X x all1 ofa>
        <X x all1 sx={(t) => ({ maxWidth: t.breakpoints.values['lg'], mx: 'auto' })}>
          <ToggleModeDemo mt={2} />
          <Buttons />
          <Typography />
        </X>
      </X>
    </RootStylesProvider>
  );
};
