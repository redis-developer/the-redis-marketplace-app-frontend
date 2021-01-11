import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { SampleCard } from './';

const useStyles = makeStyles(() => ({
  resultsBody: {
    '&::after': {
      content: '""',
      flex: '0 0 32%'
    }
  }
}));

export default function Results({ samples, updateTags }) {
  const classes = useStyles();

  return (
    <Grid className={classes.resultsBody} container wrap="wrap" justify="space-between">
      {samples?.map((sample) => (
        <SampleCard sample={sample} key={sample.id} updateTags={updateTags} />
      ))}
    </Grid>
  );
}
