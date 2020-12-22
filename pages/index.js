import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { Copyright, Results, SearchBar, TagFilter } from '../src/components';

const useStyles = makeStyles(() => ({
  head: {
    textAlign: 'center'
  },
  body: {
    display: 'flex'
  },
  tagsFilter: {
    flex: '0 0 20%'
  }
}));

const tags = [
  { category: 'Language', options: ['PHP', 'Java', 'JavaScript'] },
  { category: 'Contributed By', options: ['Red Labs', 'Community', 'Partner'] },
  { category: 'Sample Type', options: ['Building blocks', 'Applications', 'Integrations'] }
];

const samples = [
  { id: 'test-project-1' },
  { id: 'test-project-2' },
  { id: 'test-project-3' },
  { id: 'test-project-4' },
  { id: 'test-project-5' },
  { id: 'test-project-6' }
];

export default function Index() {
  const classes = useStyles();

  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <div className={classes.head}>
          <Typography variant="h4" component="h1" gutterBottom>
            Redis Labs Marketplace
          </Typography>
          <SearchBar />
        </div>
        <div className={classes.body}>
          <TagFilter tags={tags} className={classes.tagsFilter} />
          <Results samples={samples} />
        </div>
        <Copyright />
      </Box>
    </Container>
  );
}
