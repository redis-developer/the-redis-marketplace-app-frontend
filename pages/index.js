import { Box, Grid, Grow, Typography } from '@material-ui/core';
import { Zoom } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, Pagination } from '@material-ui/lab';
import Router from 'next/router';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FaPlusCircle, FaPlusSquare } from 'react-icons/fa';
import scrollIntoView from 'scroll-into-view-if-needed';
import { AddDialog } from '../src/components/';

import api from '../src/api';
import {
  Footer,
  Header,
  Link,
  LinkedSample,
  Results,
  SearchBar,
  TagChipBar,
  TagFilter,
  Top4Results
} from '../src/components';
import { iconTool } from '../src/constants';
import { useRequest } from '../src/hooks';

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'block',
    ['@media (max-width:780px)']: {
      display: 'none'
    }
  },
  mobileView: {
    display: 'none',
    ['@media (max-width:780px)']: {
      marginTop:'5rem',
      display: 'block',
      padding: '20px'
    }
  },
  mobileAlert: {
    fontSize: '2rem',
    fontFamily: 'Mulish, sans-serif',
    fontWeight: 700,
    lineHeight: 1.2,
    color: 'white',
    wordBreak: 'break-all'
  },
  hero: {
    [theme.breakpoints.down('xs')]: {
      backgroundSize: '48%'
    },
    [theme.breakpoints.up('sm')]: {
      backgroundSize: '28%'
    },
    backgroundColor: theme.palette.background.default,
    color: '#fff',
    textAlign: 'left',
    paddingLeft: '90px',
    paddingRight: '90px',
    paddingTop: '0',
    paddingBottom: '20px',
    '& h3': {
      margin: theme.spacing(3, 0),
      fontWeight: 800,
      [theme.breakpoints.down('sm')]: {
        fontSize: '2.6rem'
      }
    }
  },
  iconArea: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingRight: theme.spacing(2)
  },
  title: {
    marginTop: theme.spacing(4)
  },
  marketplace: {
    fontSize: '4.5rem',
    fontFamily: 'Mulish, sans-serif',
    fontWeight: 600,
    lineHeight: 1.2
  },
  subtitle1: {
    color: '#FFF',
    fontSize: '2.5rem',
    fontFamily: 'Mulish sans-serif',
    fontWeight: 400,
    lineHeight: 1.5
  },
  subtitle2: {
    color: '#FFF',
    fontSize: '2.5rem',
    fontFamily: 'Mulish sans-serif',
    fontWeight: 400,
    lineHeight: 1.5
  },
  iconToolOpen: {
    width: '80px',
    height: '80px',
    margin: '5px 5px',
    cursor: 'pointer',
    opacity: 1
  },
  addApp: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: theme.spacing(8),
    paddingRight: '75px',
    paddingTop: theme.spacing(5),
    backgroundColor: theme.palette.cardSectionBackground
  },
  searchFeature: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
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
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(0.5),
    boxShadow: '0 1px 5px 0 rgba(0,0,0,.07)'
  },
  addYourAppBox: {
    margin: theme.spacing(0, 'auto')
  },
  addYourAppLink: {
    display: 'flex',
    alignItems: 'center',
    color: theme.palette.text.secondary,
    paddingTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    fontWeight: 500,
    ['@media (max-width:780px)']: {
      marginTop: '25px'
    }
  },
  icon: {
    height: '40px',
    width: '40px',
    marginRight: theme.spacing(1),
    color: '#d81b2d'
  },
  cardArea: {
    paddingLeft: theme.spacing(10),
    paddingRight: theme.spacing(10),
    backgroundColor: theme.palette.cardSectionBackground
  },
  featuredApps: {
    color: theme.palette.text.secondary,
    fontSize: '24px',
    fontWeight: '700',
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  pagination: {
    marginBottom: theme.spacing(4),
    '& .Mui-selected': {
      backgroundColor: '#d81b2d',
      color: '#fff'
    },
    '& .MuiPaginationItem-page': {
      color: '#fff'
    },
    '& .MuiPaginationItem-ellipsis': {
      color: '#fff'
    }
  }
}));

const LIMIT = 12;

function Index({ initialProjectsData, linkedSampleData, filtersData, featuredProjects }) {
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
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let flag = false;
    let interval;
    setTimeout(() => {
      interval = setInterval(() => {
        if (flag === false) {
          flag = true;
          setIsOpen(flag);
        } else {
          clearInterval(interval);
        }
      }, 50);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const projectsParams = useMemo(
    () => ({
      offset,
      limit: LIMIT,
      ...Object.keys(tags)
        .filter((tag) =>
          Object.keys(tags[tag]).find((t) => {
            return tags[tag][t] === true;
          })
        )
        .reduce(
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

  let filtersApplied = true;
  if (Object.keys(projectsParams).length === 3 && projectsParams.offset === 0) {
    filtersApplied = false;
  }

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

  const [searchFlag, setSearchFlag] = useState(false);

  // Filtering
  const updateTextFilter = useCallback((text) => {
    setOffset(0);
    setTextFilter(text);
    if (text) {
      if(text.length>0){
        setSearchFlag(true);
      }
    } else if (!text || text.length === 0) {
      setSearchFlag(false);
    }
  }, []);

  const tagChips = useMemo(
    () =>
      Object.keys(tags)
        .map((filter) =>
          Object.keys(tags[filter])
            .filter((tag) => tags[filter][tag])
            .map((tag) => console.log(tag))
        )
        .flat(),
    [tags]
  );

  const checkFilter = useMemo(() => {
    console.log(tagChips.length);
    if (tagChips.length > 0) {
      setSearchFlag(true);
    } else {
      setSearchFlag(false);
    }
  }, [tagChips]);

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
    setSearchFlag(false);
  }, []);

  const showExecutionTime = useMemo(
    () =>
      textFilter ||
      Object.keys(tags).some((filter) =>
        Object.keys(tags[filter]).some((tag) => tags[filter][tag])
      ),
    [tags, textFilter]
  );
  const [isOpened, setIsOpened] = useState(false);
  const closePopup = () => {
    setIsOpened(false)
  }
  return (
    <>
      <Box mt={9} className={classes.main}>
        <Header />
        <Box className={classes.hero}>
          <Grid className={classes.iconArea} container>
            <Grid item md={6} className={classes.title}>
              <Typography component={'div'} className={classes.marketplace}>
                Redis Marketplace
              </Typography>
              <Typography component={'div'} className={classes.subtitle1}>
                See what you can build with Redis.
              </Typography>
              <Typography component={'div'} className={classes.subtitle2}>
                Get started with 75+ sample apps.
              </Typography>
            </Grid>
            <Grid item md={6} style={{ maxWidth: '600px' }}>
              <Grid container>
                {iconTool[0].row.map(({ imgSrc }) => {
                  let animationTime = Math.random() * 1;
                  let animationTimeStr = animationTime.toString() + 's';
                  return (
                    <Grid item md={2} key={imgSrc}>
                      <Zoom in={isOpen} style={{ transitionDelay: animationTimeStr }}>
                        <img className={classes.iconToolOpen} src={imgSrc} alt="" />
                      </Zoom>
                    </Grid>
                  );
                })}
              </Grid>
              <Grid container>
                {iconTool[1].row.map(({ imgSrc }) => {
                  let animationTime = Math.random() * 1;
                  let animationTimeStr = animationTime.toString() + 's';
                  return (
                    <Grid item md={2} key={imgSrc}>
                      <Zoom in={isOpen} style={{ transitionDelay: animationTimeStr }}>
                        <img className={classes.iconToolOpen} src={imgSrc} alt="" />
                      </Zoom>
                    </Grid>
                  );
                })}
              </Grid>
              <Grid container>
                {iconTool[2].row.map(({ imgSrc }) => {
                  let animationTime = Math.random() * 1;
                  let animationTimeStr = animationTime.toString() + 's';
                  return (
                    <Grid item md={2} key={imgSrc}>
                      <Zoom in={isOpen} style={{ transitionDelay: animationTimeStr }}>
                        <img className={classes.iconToolOpen} src={imgSrc} alt="" />
                      </Zoom>
                    </Grid>
                  );
                })}
              </Grid>
              <Grid container>
                {iconTool[3].row.map(({ imgSrc }) => {
                  let animationTime = Math.random() * 1;
                  let animationTimeStr = animationTime.toString() + 's';
                  return (
                    <Grid item md={2} key={imgSrc}>
                      <Zoom in={isOpen} style={{ transitionDelay: animationTimeStr }}>
                        <img className={classes.iconToolOpen} src={imgSrc} alt="" />
                      </Zoom>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box className={classes.addApp}>
          <Grid container>
            <Grid item md={2} xs={12} style={{marginTop:'10px', cursor:'pointer'}}>
              <div onClick={() => setIsOpened(true)}
                href="https://github.com/redis-developer/adding-apps-to-redis-marketplace"
                target="_blank"
                className={classes.addYourAppLink}>
                <FaPlusCircle className={classes.icon} mt={4} /> Add your App
              </div>
            </Grid>
            <Grid item md={10} xs={12}>
              <SearchBar updateTextFilter={updateTextFilter} openLinkedSample={openLinkedSample} />
              <Grid container className={classes.searchFeature}>
                <Grid item md={10}>
                  {(Object.keys(tags).length > 0 || textFilter) && (
                    <TagChipBar
                      tags={tags}
                      textFilter={textFilter}
                      updateTextFilter={updateTextFilter}
                      updateTag={updateTag}
                      clearFilters={clearFilters}
                    />
                  )}
                </Grid>
                <Grid item md={2} style={{ textAlign: 'right' }}>
                  {data?.executeTime && searchFlag && (
                    // <Grow in={showExecutionTime} appear={false}>
                    <Box className={classes.executeTimeBox}>
                      <Typography component={'div'} variant="body2" className={classes.executeTime}>
                        Search time: {data?.executeTime || 0} secs
                      </Typography>
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <div className={classes.cardArea}>
          {linkedSample && (
            <LinkedSample
              sample={linkedSample}
              closeLinkedSample={closeLinkedSample}
              updateTags={updateTags}
              isOpened={linkedSampleIsOpened}
            />
          )}
          <Grid container spacing={1}>
            <Box clone order={{ xs: 1, sm: 1, md: 1 }}>
              <Grid item md={2}>
                <TagFilter updateTag={updateTag} tags={tags} filtersData={filtersData} />
              </Grid>
            </Box>
            <Box clone order={2}>
              <Grid item md={10} style={{ position: 'relative', marginTop: '15px' }}>
                {!filtersApplied && featuredProjects?.rows.length > 0 ? (
                  <>
                    <Grid className={classes.featuredApps} container>
                      Featured
                    </Grid>
                    <Grid container>
                      <Top4Results
                        samples={featuredProjects?.rows}
                        updateTags={updateTags}
                        limit={4}
                      />
                    </Grid>
                  </>
                ) : null}
                {!filtersApplied && (
                  <Grid className={classes.featuredApps} container>
                    All
                  </Grid>
                )}
                <div id="top-of-results" style={{ position: 'absolute', top: '-100px', left: '0' }} />
                {error ? (
                  <Alert severity="error">Server Error. Please try again later!</Alert>
                ) : (
                  <Results samples={data?.rows} updateTags={updateTags} limit={LIMIT} />
                )}
                {data && !error && (
                  <Grid className={classes.pagination} container justify="center">
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
        </div>
          {isOpened && (
            <AddDialog tags={tags} closePopup={closePopup} isOpened={isOpened} />
          )}
        <Footer />
      </Box>
      <Box className={classes.mobileView}>
        <Typography component={'div'} className={classes.mobileAlert}>
          We currently are working on the portrait view for mobile devices. Please use a desktop or landscape mode
        </Typography>
      </Box>
    </>
  );
}

export async function getServerSideProps({ query }) {
  // Get first page of the browser without filters
  const { data: initialProjectsData } = await api.get('/projects', {
    params: { limit: LIMIT }
  });

  // Get Featured Projects
  const { data: featuredProjects } = await api.get('/projects', {
    params: {
      offset: 0,
      limit: 10,
      featured: true
    }
  });

  // Get dynamic filter
  const { data: filtersData } = await api.get('/projects/filters');

  // Get linked project from query
  let linkedSampleData = null;
  if (query.id) {
    const linkedProjectResponse = await api.get(`/project/${query.id}`);
    linkedSampleData = linkedProjectResponse.data;
  }

  return { props: { initialProjectsData, linkedSampleData, filtersData, featuredProjects } };
}

export default Index;
