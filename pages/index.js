import { Box, Chip, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, Pagination } from '@material-ui/lab';
import React, { useCallback, useMemo, useState } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';

import { Footer, Header, Results, SearchBar, TagFilter } from '../src/components';
import { useRequest } from '../src/hooks';

// TODO: UX
// mobile view
// docs
// finilize footer (needs input)

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
  tag: {
    marginRight: theme.spacing(1)
  }
}));

const limit = 9;

export default function Index({ query }) {
  const classes = useStyles();

  // Do we have an initial app in the link?
  const [linkedAppName, setLinkedAppName] = useState(query?.app_name);

  // Query params for the projects
  const [textFilter, setTextFilter] = useState(linkedAppName);
  const [offset, setOffset] = useState(0);
  const [tags, setTags] = useState({});
  const projectsParams = useMemo(
    () => ({
      offset,
      limit,
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
  const page = useMemo(() => Math.floor(offset / limit) + 1, [offset]);
  const maxPage = useMemo(() => Math.floor((data?.totalResults || 0) / limit) + 1, [
    data?.totalResults
  ]);

  const changePage = useCallback((e, newPage) => {
    scrollIntoView(document.getElementById('top-of-results'), {
      scrollMode: 'if-needed',
      block: 'start',
      behavior: 'smooth'
    });
    setOffset((newPage - 1) * limit);
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

  // Tag chips for cutting used filters
  const tagChips = useMemo(
    () =>
      Object.keys(tags)
        .map((filter) =>
          Object.keys(tags[filter])
            .filter((tag) => tags[filter][tag])
            .map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                onDelete={() => updateTag({ filter, tag, value: false })}
                className={classes.tag}
              />
            ))
        )
        .flat(),
    [classes.tag, updateTag, tags]
  );

  const showClearFiltersChip = useMemo(
    () => !!(tagChips.length > 1 || (textFilter && tagChips.length)),
    [tagChips.length, textFilter]
  );

  return (
    <Box mt={9}>
      <Header />
      <Box className={classes.hero} p={6}>
        <Typography variant="h3">Redis Labs Marketplace</Typography>
        <Typography variant="body1">
          See what you can build with Redis. Get started with code samples.
        </Typography>
        <SearchBar updateTextFilter={updateTextFilter} />
        <Typography variant="body1">Examples: Voice IVR, Appointment reminders</Typography>
      </Box>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <TagFilter updateTag={updateTag} tags={tags} />
          </Grid>
          <Grid item xs={10} style={{ position: 'relative' }}>
            <div id="top-of-results" style={{ position: 'absolute', top: '-100px', left: '0' }} />
            <Box mb={2}>
              {showClearFiltersChip && (
                <Chip
                  label="Clear all filters"
                  size="small"
                  onClick={clearFilters}
                  className={classes.tag}
                />
              )}
              {textFilter && (
                <Chip
                  label={textFilter}
                  size="small"
                  onDelete={() => updateTextFilter()}
                  className={classes.tag}
                />
              )}
              {tagChips}
            </Box>
            {error ? (
              <Alert severity="error">Server Error. Please try again later!</Alert>
            ) : (
              <Results
                samples={data?.rows}
                updateTags={updateTags}
                loading={loading}
                limit={limit}
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
