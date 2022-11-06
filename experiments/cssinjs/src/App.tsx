import '~/styles/globalStyles';
import { createOverridableStyles, styles } from '~/styles';
import { useToggle } from '@evatrium/hooks';

import { BlackBox } from '~/styles/v2';
import { useMemo } from 'react';
// const className = styles(asdf, true);
// console.log(className);
// const Button = () => {
//   return <Box component={'button'} sx={useMemo(() => ({}), [])} />;
// };
export const App = () => {
  const [bool, toggle] = useToggle(false);
  const sx2 = useMemo(
    () => ({
      background: 'pink',
      width: 100
    }),
    []
  );
  return (
    <>
      {bool ? 'true' : 'false'}
      <BlackBox
        size={bool ? 'sm' : 'lg'}
        onClick={() => {
          toggle();
        }}
      />

      {bool && <BlackBox size={'lg'} sx={sx2} />}
    </>
  );
};
