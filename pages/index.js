import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
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
  },
  tag: {
    marginRight: theme.spacing(1)
  }
}));

const limit = 9;

// TODO: refactor tag filter handling from arrays to objects with true or false
export default function Index() {
  const classes = useStyles();

  const [offset, setOffset] = useState(0);
  const [tags, setTags] = useState({});

  const setFilter = useCallback(
    ({ filter, tag, value }) => {
      if (value) {
        setTags((tags) => ({
          ...tags,
          [filter]: tags[filter] ? [...tags[filter], tag] : [tag]
        }));
      } else {
        setTags((tags) => ({
          ...tags,
          [filter]: tags[filter].filter((activeTag) => activeTag !== tag)
        }));
      }
    },
    [setTags]
  );

  const params = useMemo(
    () => ({
      offset,
      limit,
      ...tags
    }),
    [offset, tags]
  );
  const { data, loading, error } = useRequest('/projects', params);

  const nextPage = useCallback(() => {
    setOffset((offset) => offset + limit);
  }, []);
  const previousPage = useCallback(() => {
    setOffset((offset) => offset - limit);
  }, []);
  const hasNextPage = useMemo(() => !loading && offset + data.rows?.length < data.totalResults, [
    data.rows?.length,
    data.totalResults,
    loading,
    offset
  ]);

  const tagChips = useMemo(
    () =>
      Object.keys(tags).map((filter) =>
        tags[filter].map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            onDelete={() => setFilter({ filter, tag, value: false })}
            className={classes.tag}
          />
        ))
      ),
    [classes.tag, setFilter, tags]
  );

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
            <TagFilter setFilter={setFilter} tags={tags} />
          </Grid>
          <Grid item xs={10}>
            <Box mb={2}>{tagChips}</Box>
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
          <Button variant="contained" color="primary" disabled={!hasNextPage} onClick={nextPage}>
            Next
          </Button>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}
