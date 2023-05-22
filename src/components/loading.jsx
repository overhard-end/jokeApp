import { Grid, Loading } from '@nextui-org/react';
import React from 'react';

export const LoadingElement = () => {
  return (
    <Grid.Container
      css={{ position: 'absolute', left: '0px', marginTop: '40px' }}
      justify="center"
      xs={1}
      sm={1}
      gap={2}>
      <Grid>
        <Loading type="points" />
      </Grid>
    </Grid.Container>
  );
};
