import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useMemo } from 'react';

import { sampleForSkeleton } from '../constants';
import { SampleCard } from './';

const useStyles = makeStyles((theme) => ({
  resultsBody: {
    marginBottom: theme.spacing(2.5),
    '&::after': {
      content: '""',
      flex: '0 0 33%'
    }
  }
}));

export default function Results({
  samples,
  updateTags,
  loading,
  limit,
  linkedAppName,
  closeLinkedApp
}) {
  const classes = useStyles();

  const skeletonArray = useMemo(() => Array.from({ length: limit }, (_, i) => i), [limit]);

  return (
    <Grid className={classes.resultsBody} container wrap="wrap" justify="space-between" spacing={2}>
      {loading
        ? skeletonArray.map((i) => (
            <Grid item sm={6} md={4} key={i}>
              <SampleCard sample={sampleForSkeleton} skeleton />
            </Grid>
          ))
        : samples?.map((sample, i) => (
            <Grid item sm={6} md={4} key={sample.id}>
              <SampleCard
                sample={sample}
                updateTags={updateTags}
                linkedAppName={linkedAppName}
                closeLinkedApp={closeLinkedApp}
                timeout={(i + 1) * 200}
              />
            </Grid>
          ))}
    </Grid>
  );
}
