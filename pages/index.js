import { Box, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, Pagination } from '@material-ui/lab';
import Router from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';

import {
  Footer,
  Header,
  LinkedSample,
  Results,
  SearchBar,
  TagChipBar,
  TagFilter
} from '../src/components';
import { useRequest } from '../src/hooks';

const useStyles = makeStyles((theme) => ({
  hero: {
    [theme.breakpoints.down('xs')]: {
      backgroundSize: '48%'
    },
    [theme.breakpoints.up('sm')]: {
      backgroundSize: '28%'
    },
    textAlign: 'center',
    background: `url(${'hero.svg'}) no-repeat local`,
    backgroundPosition: '104% -70px',
    '& h3': {
      margin: theme.spacing(4, 0),
      fontWeight: 800,
      [theme.breakpoints.down('sm')]: {
        fontSize: '2.6rem'
      }
    }
  },
  executeTime: {
    fontWeight: 500
  }
}));

const LIMIT = 9;

export default function Index({ query }) {
  const classes = useStyles();

  // Do we have an initial app to open up in the url query?
  const [linkedSampleId, setLinkedSampleId] = useState(query?.id);
  // linkedSample can come from query param or by the search bar
  const [linkedSample, setLinkedSample] = useState();
  const [linkedSampleIsOpened, setLinkedSampleIsOpened] = useState(false);

  const shouldFetch = useCallback(() => linkedSampleId, [linkedSampleId]);
  const { data: linkedSampleData } = useRequest({ url: `/project/${linkedSampleId}`, shouldFetch });

  useEffect(() => {
    if (linkedSampleData) {
      setLinkedSample(linkedSampleData);
      setLinkedSampleIsOpened(true);
    }
  }, [linkedSampleData]);

  const openLinkedSample = useCallback((sample) => {
    setLinkedSample(sample);
    setLinkedSampleIsOpened(true);
    Router.push(
      {
        pathname: '/',
        query: { id: sample.id }
      },
      null,
      { scroll: false }
    );
  }, []);

  const closeLinkedSample = useCallback(() => {
    setLinkedSampleId();
    setLinkedSampleIsOpened(false);
    Router.push({ pathname: '/' }, null, { scroll: false });
  }, []);

  // Query params for the /projects
  const [textFilter, setTextFilter] = useState();
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
  const { data, loading, error } = useRequest({ url: '/projects', params: projectsParams });

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

  return (
    <Box mt={9}>
      <Header />
      <Box className={classes.hero} px={{ xs: 1, md: 6 }} pt={{ xs: 1, md: 6 }} pb={0}>
        <Typography variant="h3">Redis Labs Marketplace</Typography>
        <Typography variant="body1">
          See what you can build with Redis. Get started with code samples.
        </Typography>
        <SearchBar updateTextFilter={updateTextFilter} openLinkedSample={openLinkedSample} />
        <Typography variant="body1" className={classes.executeTime}>
          Execution time: {data?.executeTime || 0}s
        </Typography>
      </Box>
      <Container maxWidth="lg">
        {linkedSample && (
          <LinkedSample
            sample={linkedSample}
            closeLinkedSample={closeLinkedSample}
            updateTags={updateTags}
            isOpened={linkedSampleIsOpened}
          />
        )}
        <Grid container spacing={1}>
          <Box clone order={1}>
            <Grid item md={2} />
          </Box>
          <Box clone order={{ xs: 3, sm: 3, md: 2 }}>
            <Grid item md={10}>
              <TagChipBar
                tags={tags}
                textFilter={textFilter}
                updateTextFilter={updateTextFilter}
                updateTag={updateTag}
                clearFilters={clearFilters}
              />
            </Grid>
          </Box>
          <Box clone order={{ xs: 2, sm: 2, md: 3 }}>
            <Grid item md={2}>
              <TagFilter updateTag={updateTag} tags={tags} />
            </Grid>
          </Box>
          <Box clone order={4}>
            <Grid item md={10} style={{ position: 'relative' }}>
              <div id="top-of-results" style={{ position: 'absolute', top: '-100px', left: '0' }} />
              {error ? (
                <Alert severity="error">Server Error. Please try again later!</Alert>
              ) : (
                <Results
                  samples={data?.rows}
                  updateTags={updateTags}
                  loading={loading}
                  limit={LIMIT}
                />
              )}
              {!error && (
                <Grid container justify="center">
                  <Pagination
                    count={maxPage}
                    page={page}
                    onChange={changePage}
                    disabled={loading}
                  />
                </Grid>
              )}
            </Grid>
          </Box>
        </Grid>
      </Container>
      <Footer />
    </Box>
  );
}

Index.getInitialProps = ({ query }) => {
  return { query };
};
