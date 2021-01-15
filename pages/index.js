import { Box, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, Pagination } from '@material-ui/lab';
import React, { useCallback, useMemo, useState } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';

import { Footer, Header, Results, SearchBar, TagChipBar, TagFilter } from '../src/components';
import { useRequest } from '../src/hooks';

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
  }
}));

const LIMIT = 9;

export default function Index({ query }) {
  const classes = useStyles();

  // Do we have an initial app to open up in the url query?
  const [linkedAppName, setLinkedAppName] = useState(query?.app_name);

  // Query params for the /projects
  const [textFilter, setTextFilter] = useState(linkedAppName);
  const [offset, setOffset] = useState(0);
  const [tags, setTags] = useState({});
  const projectsParams = useMemo(
    () => ({
      offset,
      limit: LIMIT,
      ...Object.keys(tags).reduce(
        (selectedTags, filter) => ({
          ...selectedTags,
          [filter]: Object.keys(tags[filter]).filter((tag) => tags[filter][tag])
        }),
        {}
      ),
      ...(textFilter
        ? {
            text_filter: textFilter
          }
        : {})
    }),
    [offset, tags, textFilter]
  );

  // Get Sample Projects
  const { data, loading, error } = useRequest('/projects', projectsParams);

  // Pagination
  const page = useMemo(() => Math.floor(offset / LIMIT) + 1, [offset]);
  const maxPage = useMemo(() => Math.floor((data?.totalResults || 0) / LIMIT) + 1, [
    data?.totalResults
  ]);

  const changePage = useCallback((e, newPage) => {
    scrollIntoView(document.getElementById('top-of-results'), {
      scrollMode: 'if-needed',
      block: 'start',
      behavior: 'smooth'
    });
    setOffset((newPage - 1) * LIMIT);
  }, []);

  // Filtering
  const updateTextFilter = useCallback((text) => {
    scrollIntoView(document.getElementById('top-of-results'), {
      scrollMode: 'always',
      block: 'start',
      behavior: 'smooth'
    });
    setOffset(0);
    setTextFilter(text);
  }, []);

  const updateTags = useCallback((tags) => {
    setOffset(0);
    setTags(tags);
  }, []);

  const updateTag = useCallback(
    ({ filter, tag, value }) => {
      updateTags((tags) => ({
        ...tags,
        [filter]: {
          ...tags[filter],
          [tag]: value
        }
      }));
    },
    [updateTags]
  );

  const clearFilters = useCallback(() => {
    setOffset(0);
    setTags({});
    setTextFilter();
  }, []);

  const closeLinkedApp = useCallback(() => {
    setLinkedAppName();
    clearFilters();
  }, [clearFilters]);

  return (
    <Box mt={9}>
      <Header />
      <Box className={classes.hero} p={6}>
        <Typography variant="h3">Redis Labs Marketplace</Typography>
        <Typography variant="body1">
          See what you can build with Redis. Get started with code samples.
        </Typography>
        <SearchBar updateTextFilter={updateTextFilter} setLinkedAppName={setLinkedAppName} />
        <Typography variant="body1">Examples: Voice IVR, Appointment reminders</Typography>
      </Box>
      <Container maxWidth="lg">
        <TagChipBar
          tags={tags}
          textFilter={textFilter}
          updateTextFilter={updateTextFilter}
          updateTag={updateTag}
          clearFilters={clearFilters}
        />
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TagFilter updateTag={updateTag} tags={tags} />
          </Grid>
          <Grid item xs={10} style={{ position: 'relative' }}>
            <div id="top-of-results" style={{ position: 'absolute', top: '-100px', left: '0' }} />
            {error ? (
              <Alert severity="error">Server Error. Please try again later!</Alert>
            ) : (
              <Results
                samples={data?.rows}
                updateTags={updateTags}
                loading={loading}
                limit={LIMIT}
                linkedAppName={linkedAppName}
                closeLinkedApp={closeLinkedApp}
              />
            )}
            <Grid container justify="center">
              <Pagination count={maxPage} page={page} onChange={changePage} disabled={loading} />
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}

Index.getInitialProps = ({ query }) => {
  return { query };
};
