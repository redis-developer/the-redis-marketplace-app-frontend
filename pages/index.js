import { Box, Chip, Container, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, Pagination } from '@material-ui/lab';
import clsx from 'clsx';
import React, { useCallback, useMemo, useState } from 'react';
import scrollIntoView from 'scroll-into-view-if-needed';
import { useDebounce } from 'use-debounce';

import { Footer, Header, Results, SearchBar, TagFilter } from '../src/components';
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
  },
  tag: {
    margin: theme.spacing(0, 1, 2, 0)
  },
  chip_type: {
    color: theme.palette.filterCategoryColors.type.contrastText
  },
  chip_language: {
    color: theme.palette.filterCategoryColors.language.contrastText
  },
  chip_contributed_by: {
    color: theme.palette.filterCategoryColors.contributed_by.contrastText
  },
  chip_redis_modules: {
    color: theme.palette.filterCategoryColors.redis_modules.contrastText
  },
  chip_verticals: {
    color: theme.palette.filterCategoryColors.verticals.contrastText
  },
  chip_redis_features: {
    color: theme.palette.filterCategoryColors.redis_features.contrastText
  },
  chip_redis_commands: {
    color: theme.palette.filterCategoryColors.redis_commands.contrastText
  },
  chip_special_tags: {
    color: theme.palette.filterCategoryColors.special_tags.contrastText
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
  const [debouncedTags] = useDebounce(tags, 300);
  const projectsParams = useMemo(
    () => ({
      offset,
      limit,
      ...Object.keys(debouncedTags).reduce(
        (selectedTags, filter) => ({
          ...selectedTags,
          [filter]: Object.keys(debouncedTags[filter]).filter((tag) => debouncedTags[filter][tag])
        }),
        {}
      ),
      ...(textFilter
        ? {
            text_filter: textFilter
          }
        : {})
    }),
    [offset, debouncedTags, textFilter]
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
      Object.keys(debouncedTags)
        .map((filter) =>
          Object.keys(debouncedTags[filter])
            .filter((tag) => debouncedTags[filter][tag])
            .map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                onDelete={() => updateTag({ filter, tag, value: false })}
                className={clsx(classes.tag, classes[`chip_${filter}`])}
              />
            ))
        )
        .flat(),
    [debouncedTags, classes, updateTag]
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
            <Box>
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
