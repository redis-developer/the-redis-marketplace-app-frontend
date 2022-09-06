import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { Top4SampleCard } from './';

const useStyles = makeStyles((theme) => ({
  resultsBody: {
    marginBottom: theme.spacing(2.5),
    '&::after': {
      content: '""',
      flex: '0 0 33%'
    }
  }
}));

export default function Top4Results({ samples, updateTags }) {
  const classes = useStyles();

  return (
    <Grid className={classes.resultsBody} container wrap="wrap" spacing={2}>
      {samples?.map((sample, i) =>
        i < 4 ? (
          <Grid item sm={6} md={3} key={sample.id}>
            <Top4SampleCard sample={sample} updateTags={updateTags} />
          </Grid>
        ) : null
      )}
    </Grid>
  );
}
