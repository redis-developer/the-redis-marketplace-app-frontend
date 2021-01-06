import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { SampleCard } from './';

const useStyles = makeStyles((theme) => ({
  resultsHeader: {
    marginBottom: theme.spacing(5)
  },
  resultsBody: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
    '&::after': {
      content: '""',
      flex: '0 0 31%'
    }
  }
}));

export default function Results({ samples, ...rest }) {
  const classes = useStyles();

  return (
    <Box {...rest}>
      <Typography variant="h5" className={classes.resultsHeader}>
        Results:
      </Typography>
      <Box className={classes.resultsBody}>
        {samples.map((sample) => (
          <SampleCard {...sample} key={sample.id} />
        ))}
      </Box>
    </Box>
  );
}
