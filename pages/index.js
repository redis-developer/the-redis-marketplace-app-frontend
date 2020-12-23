import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { Copyright, Results, SearchBar, TagFilter } from '../src/components';
import { samples, tags } from '../src/testData';

const useStyles = makeStyles((theme) => ({
  hero: {
    marginBottom: '50px',
    textAlign: 'center',
    background: `url(${'hero.png'}) no-repeat 50% local`,
    padding: '50px',
    color: 'white',
    '& p, & h3': {
      margin: '30px 0'
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
    marginBottom: '30px',
    '& h4': {
      fontWeight: 300,
      paddingBottom: '35px',
      marginBottom: '35px',
      position: 'relative',
      '&::after': {
        content: '" "',
        display: 'block',
        position: 'absolute',
        left: 0,
        bottom: '-2px',
        height: '4px',
        width: '96px',
        background: theme.palette.secondary.main
      }
    }
  },
  results: {
    flex: '0 0 84%'
  }
}));

export default function Index() {
  const classes = useStyles();

  return (
    <Box my={4}>
      <div className={classes.hero}>
        <Typography variant="h3">Redis Labs Marketplace</Typography>
        <Typography variant="body1">
          See what you can build with Redis. Get started with code samples.
        </Typography>
        <SearchBar />
        <Typography variant="body1">Examples: Voice IVR, Appointment reminders</Typography>
      </div>
      <Container maxWidth="lg" className={classes.browser}>
        <div className={classes.introduction}>
          <Typography variant="h4">Code Samples</Typography>
          <Typography variant="body1">
            Get started with code samples for common Redis use cases.
          </Typography>
        </div>
        <TagFilter tags={tags} className={classes.tagsFilter} />
        <Results samples={samples} className={classes.results} />
      </Container>
      <Copyright />
    </Box>
  );
}
