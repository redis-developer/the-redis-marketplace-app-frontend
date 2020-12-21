import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import Copyright from '../src/Copyright';
import Link from '../src/Link';

export default function Index() {
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js
        </Typography>
        <Button variant="contained" color="primary" component={Link} naked href="/about">
          Go to the about page
        </Button>
        <Copyright />
      </Box>
    </Container>
  );
}