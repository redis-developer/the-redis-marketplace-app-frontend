import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { SampleCard } from './';

const useStyles = makeStyles(() => ({
  resultsBody: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    '&::after': {
      content: '""',
      flex: '0 0 32%'
    }
  }
}));

export default function Results({ samples, ...rest }) {
  const classes = useStyles();

  return (
    <Box {...rest}>
      <Box className={classes.resultsBody}>
        {samples.map((sample) => (
          <SampleCard {...sample} key={sample.id} />
        ))}
      </Box>
    </Box>
  );
}
