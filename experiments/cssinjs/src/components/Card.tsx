import { Box, BoxProps, Theme, useStyles } from '~/styles';
import { ComponentPropsWithRef, FC, forwardRef } from 'react';

type CardVariants = {};

const cardStyles = (theme: Theme, variants) => {
  return {
    root: {
      borderRadius: theme.shape.br1,
      background: theme.palette.bg1,
      boxShadow: theme.shadows[1]
    }
  };
};

type CardProps = BoxProps & ComponentPropsWithRef<any> & CardVariants;

export const Card: FC<CardProps> = forwardRef(({ children, ...rest }, ref) => {
  const card = useStyles(cardStyles);

  return (
    <Box className={card.root} ref={ref} {...rest}>
      {children}
    </Box>
  );
});
