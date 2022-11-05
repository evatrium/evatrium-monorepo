import '~/styles/globalStyles';
import {createOverridableStyles, styles} from '~/styles';
import {useToggle} from '@evatrium/hooks';


const asdf = {
  color: {xs: 'white', sm: 'blue', md: 'red'},
  '&:hover': {
    color: 'green'
  }
};


const useStyles = createOverridableStyles(asdf);

// const className = styles(asdf, true);
// console.log(className);
// const Button = () => {
//   return <Box component={'button'} sx={useMemo(() => ({}), [])} />;
// };
export const App = () => {
  const [bool, toggle] = useToggle(false);

  const className = useStyles(
    bool && {
      '&:hover': {
        color: 'purple'
      }
    },
    [bool]
  );
  return (
    <>
      {bool ? 'true' : 'false'}

      <h1 className={className}>Hello!</h1>
      <h2>{className}</h2>

    </>
  );
};
