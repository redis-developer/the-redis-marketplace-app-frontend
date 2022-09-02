import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import React, { Suspense, useCallback, useMemo, useState } from 'react';

import api from '../../src/api';
import { useRequest } from '../../src/hooks';

const SampleContent = dynamic(() => import('../../src/components/SampleContent'), {
  suspense: true
});

const SampleTags = dynamic(() => import('../../src/components/SampleTags'), {
  suspense: true
});

const useStyles = makeStyles(
  (theme) => ({
    main: {
      backgroundColor: theme.palette.background.default,
      position: 'absolute',
      width: '100%',
      height: '100%'
    }
  }),
  {
    name: 'MuiProjectIdStyle'
  }
);

function Project({ id }) {
  const classes = useStyles();
  const [tags, setTags] = useState({});
  const { data: sample } = useRequest({
    url: '/project/' + id,
    skipFirstFetch: false
  });

  const updateTags = useCallback((tags) => {
    setTags(tags);
  }, []);

  const tagsComponent = useMemo(
    () => <SampleTags sample={sample} updateTags={updateTags} />,
    [sample, updateTags]
  );

  const goBack = useCallback(() => {
    Router.push('/');
  }, []);

  return (
    <Suspense fallback={`Loading...`}>
      {sample ? (
        <SampleContent sample={sample} tags={tagsComponent} goBack={goBack} />
      ) : (
        <Box className={classes.main}></Box>
      )}
    </Suspense>
  );
}

export async function getServerSideProps({ params }) {
  return { props: { id: params.id } };
}

export default Project;
