import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';

import Copyright from '../../src/components/Copyright';
import Link from '../../src/components/Link';
// import useRequest from '../../src/hooks/useRequest';

export default function Sample() {
  const {
    query: { id }
  } = useRouter();
  // const { data, loading } = useRequest(`/sample/${id}`);
  const { data, loading } = useMemo(
    () => ({
      data: {
        title: `${id} data`
      },
      loading: false
    }),
    [id]
  );

  return (
    <Container maxWidth="xl">
      <Box my={4}>
        <Button variant="contained" color="primary" component={Link} naked href="/">
          Go to the main page
        </Button>
        <Typography variant="h4" component="h1" gutterBottom>
          {loading ? 'Loading...' : data.title}
        </Typography>
        <Copyright />
      </Box>
    </Container>
  );
}
