import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import React, { useCallback, useMemo, useState } from 'react';

import { Footer, Header, Results, SearchBar, TagFilter } from '../src/components';
import { useRequest } from '../src/hooks';

// API INTEGRATION TODO

// TODO: apply filters on chip clicking also

// TODO: use search
// TODO: autocomplete search
// TODO: send back autocomplete selection to API for scoring

const useStyles = makeStyles((theme) => ({
  hero: {
    textAlign: 'center',
    background: `url(${'hero.svg'}) no-repeat local`,
    backgroundSize: '28% !important',
    backgroundPosition: '104% -70px !important',
    '& p, & h3': {
      margin: theme.spacing(4, 0)
    },
    '& h3': {
      fontWeight: 800
    }
  },
  introduction: {
    '& h4': {
      position: 'relative',
      paddingBottom: theme.spacing(5),
      marginBottom: theme.spacing(5),
      fontWeight: 300,
      '&::after': {
        content: '" "',
        display: 'block',
        position: 'absolute',
        left: 0,
        bottom: '-2px',
        height: '4px',
        width: '96px',
        background: theme.palette.tertiary.main
      }
    }
  },
  previousButton: {
    marginRight: theme.spacing(1)
  }
}));

export default function Index() {
  const classes = useStyles();
  const [params, setParams] = useState({
    limit: 9,
    offset: 0
  });

  const nextPage = useCallback(() => {
    setParams((params) => ({ ...params, offset: params.offset + params.limit }));
  }, []);
  const previousPage = useCallback(() => {
    setParams((params) => ({ ...params, offset: params.offset - params.limit }));
  }, []);

  const { data, loading, error } = useRequest('/projects', params);
  const hasNext = useMemo(() => !loading && params.offset + data.rows?.length < data.totalResults, [
    data.rows?.length,
    data.totalResults,
    loading,
    params.offset
  ]);

  return (
    <Box mt={9}>
      <Header />
      <Box className={classes.hero} p={6}>
        <Typography variant="h3">Redis Labs Marketplace</Typography>
        <Typography variant="body1">
          See what you can build with Redis. Get started with code samples.
        </Typography>
        <SearchBar />
        <Typography variant="body1">Examples: Voice IVR, Appointment reminders</Typography>
      </Box>
      <Container maxWidth="lg">
        <Box className={classes.introduction} mb={4}>
          <Typography variant="h4">Code Samples</Typography>
          <Typography variant="body1">
            Get started with code samples for common Redis use cases.
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TagFilter setParams={setParams} />
          </Grid>
          <Grid item xs={10}>
            {loading ? (
              <LinearProgress color="secondary" />
            ) : error ? (
              <Alert severity="error">Server Error. Please try again later!</Alert>
            ) : (
              <Results samples={data.rows} />
            )}
          </Grid>
        </Grid>
        <Grid container justify="flex-end">
          <Button
            variant="contained"
            color="primary"
            disabled={!params.offset}
            className={classes.previousButton}
            onClick={previousPage}>
            Previous
          </Button>
          <Button variant="contained" color="primary" disabled={!hasNext} onClick={nextPage}>
            Next
          </Button>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}
