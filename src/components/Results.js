import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { Link } from './';

const useStyles = makeStyles(() => ({
  sampleCard: {
    flex: '0 0 32%',
    marginBottom: '20px'
  },
  resultsTitle: {
    fontSize: '18px',
    marginBottom: '20px'
  },
  resultsBody: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  }
}));

export default function Results({ samples, ...rest }) {
  const classes = useStyles();

  return (
    <div {...rest}>
      <div className={classes.resultsTitle}>Results:</div>
      <div className={classes.resultsBody}>
        {samples.map(({ id }) => (
          <Button
            key={id}
            className={classes.sampleCard}
            variant="contained"
            color="primary"
            component={Link}
            naked
            href={`/samples/${id}`}>
            Go to details page for {id}
          </Button>
        ))}
      </div>
    </div>
  );
}
