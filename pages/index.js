import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { Footer, Results, SearchBar, TagFilter } from '../src/components';
import { samples, tags } from '../src/testData';

const useStyles = makeStyles((theme) => ({
  hero: {
    textAlign: 'center',
    background: `url(${'hero.png'}) no-repeat 50% local`,
    color: 'white',
    '& p, & h3': {
      margin: theme.spacing(4, 0)
    },
    '& h3': {
      fontWeight: 300
    }
  },
  browser: {
    display: 'flex',
    flexFlow: 'wrap'
  },
  tagsFilter: {
    flex: '0 0 16%'
  },
  introduction: {
    flex: '0 0 100%',
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
  results: {
    flex: '0 0 84%'
  },
  paginator: {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: '0 0 100%'
  },
  previousButton: {
    marginRight: theme.spacing(1)
  }
}));

const hasNext = true;
const hasPrevious = false;

export default function Index() {
  const classes = useStyles();

  return (
    <Box mt={4}>
      <Box className={classes.hero} mb={6} p={6}>
        <Typography variant="h3">Redis Labs Marketplace</Typography>
        <Typography variant="body1">
          See what you can build with Redis. Get started with code samples.
        </Typography>
        <SearchBar />
        <Typography variant="body1">Examples: Voice IVR, Appointment reminders</Typography>
      </Box>
      <Container maxWidth="lg" className={classes.browser}>
        <Box className={classes.introduction} mb={4}>
          <Typography variant="h4">Code Samples</Typography>
          <Typography variant="body1">
            Get started with code samples for common Redis use cases.
          </Typography>
        </Box>
        <TagFilter tags={tags} className={classes.tagsFilter} />
        <Results samples={samples} className={classes.results} />
        <Box className={classes.paginator}>
          <Button
            variant="contained"
            color="primary"
            disabled={!hasPrevious}
            className={classes.previousButton}>
            Previous
          </Button>
          <Button variant="contained" color="primary" disabled={!hasNext}>
            Next
          </Button>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
