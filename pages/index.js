import { Box, Container, Grid, Grow, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, Pagination } from '@material-ui/lab';
import Router from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import { FaPlusSquare } from 'react-icons/fa';
import scrollIntoView from 'scroll-into-view-if-needed';

import api from '../src/api';
import {
  Footer,
  Header,
  Link,
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
    fontWeight: 400
  },
  executeTimeBox: {
    backgroundColor: theme.palette.executionTimeBackground,
    display: 'inline-block',
    padding: theme.spacing(0.5, 1),
    borderRadius: theme.spacing(0.5),
    marginBottom: theme.spacing(3),
    boxShadow: '0 1px 5px 0 rgba(0,0,0,.07)'
  },
  addYourAppBox: {
    margin: theme.spacing(0, 'auto')
  },
  addYourAppLink: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(1),
    fontWeight: 500,
    textDecoration: 'underline'
  },
  icon: {
    height: '20px',
    width: '20px',
    marginRight: theme.spacing(1),
    color: theme.palette.icon
  }
}));

const LIMIT = 16;

function Index({ initialProjectsData, linkedSampleData, filtersData }) {
  const classes = useStyles();

  // linkedSample can come from query param (serverside) or by the search bar on clicking a suggestion
  const [linkedSample, setLinkedSample] = useState(linkedSampleData);
  const [linkedSampleIsOpened, setLinkedSampleIsOpened] = useState(!!linkedSampleData);

  const openLinkedSample = useCallback((sample) => {
    setLinkedSample(sample);
    setLinkedSampleIsOpened(true);
    Router.push(
      {
        pathname: '/',
        query: { id: sample.id }
      },
      null,
      { scroll: false, shallow: true }
    );
  }, []);

  const closeLinkedSample = useCallback(() => {
    setLinkedSampleIsOpened(false);
    Router.push({ pathname: '/' }, null, { scroll: false, shallow: true });
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
        : {}),
      sortBy: 'rank'
    }),
    [offset, tags, textFilter]
  );

  // Get Sample Projects
  const { data, loading, error } = useRequest({
    url: '/projects',
    params: projectsParams,
    skipFirstFetch: true, // first data (without filters) is loaded server side form initialProjectsData
    initialData: initialProjectsData
  });

  // Pagination
  const page = useMemo(() => Math.floor(offset / LIMIT) + 1, [offset]);
  const maxPage = useMemo(() => Math.floor((data?.totalResults || 0) / LIMIT) + 1, [
    data?.totalResults
  ]);

  const changePage = useCallback((e, newPage) => {
    setOffset((newPage - 1) * LIMIT);
    scrollIntoView(document.getElementById('top-of-results'), {
      scrollMode: 'if-needed',
      block: 'start',
      behavior: 'smooth'
    });
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

  const showExecutionTime = useMemo(
    () =>
      textFilter ||
      Object.keys(tags).some((filter) =>
        Object.keys(tags[filter]).some((tag) => tags[filter][tag])
      ),
    [tags, textFilter]
  );

  return (
    <Box mt={9}>
      <Header />
      <Box className={classes.hero} px={{ xs: 1, md: 6 }} pt={{ xs: 1, md: 6 }} pb={0}>
        <Typography variant="h3">Redis Marketplace</Typography>
        <Typography variant="body1">
          See what you can build with Redis. Get started with code samples.
        </Typography>
        <SearchBar updateTextFilter={updateTextFilter} openLinkedSample={openLinkedSample} />
        <Grow in={showExecutionTime} appear={false}>
          <Box className={classes.executeTimeBox}>
            <Typography variant="body2" className={classes.executeTime}>
              Search time: {data?.executeTime || 0} secs
            </Typography>
          </Box>
        </Grow>
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
            <Grid item md={2} className={classes.addYourAppBox}>
              <Link
                href="https://github.com/redis-developer/adding-apps-to-redis-marketplace"
                target="_blank"
                className={classes.addYourAppLink}>
                <FaPlusSquare className={classes.icon} /> Add your App
              </Link>
            </Grid>
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
              <TagFilter updateTag={updateTag} tags={tags} filtersData={filtersData} />
            </Grid>
          </Box>
          <Box clone order={4}>
            <Grid item md={10} style={{ position: 'relative' }}>
              <div id="top-of-results" style={{ position: 'absolute', top: '-100px', left: '0' }} />
              {error ? (
                <Alert severity="error">Server Error. Please try again later!</Alert>
              ) : (
                <Results samples={data?.rows} updateTags={updateTags} limit={LIMIT} />
              )}
              {data && !error && (
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

export async function getServerSideProps({ query }) {
  // Get first page of the browser without filters
  const { data: initialProjectsData } = await api.get('/projects', {
    params: { limit: LIMIT }
  });

  // Get dynamic filter
  const { data: filtersData } = await api.get('/projects/filters');

  // Get linked project from query
  let linkedSampleData = null;
  if (query.id) {
    const linkedProjectResponse = await api.get(`/project/${query.id}`);
    linkedSampleData = linkedProjectResponse.data;
  }

  return { props: { initialProjectsData, linkedSampleData, filtersData } };
}

export default Index;
