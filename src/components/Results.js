import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React, { useMemo } from 'react';

import { sampleForSkeleton } from '../constants';
import { SampleCard } from './';

const useStyles = makeStyles(() => ({
  resultsBody: {
    '&::after': {
      content: '""',
      flex: '0 0 32%'
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
    <Grid className={classes.resultsBody} container wrap="wrap" justify="space-between">
      {loading
        ? skeletonArray.map((i) => <SampleCard sample={sampleForSkeleton} skeleton key={i} />)
        : samples?.map((sample) => (
            <SampleCard
              sample={sample}
              key={sample.id}
              updateTags={updateTags}
              linkedAppName={linkedAppName}
              closeLinkedApp={closeLinkedApp}
            />
          ))}
    </Grid>
  );
}
