import Router from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';

import api from '../../src/api';
import { SampleContent, SampleTags } from '../../src/components';

function Project({ sample }) {
  const [tags, setTags] = useState({});

  const updateTags = useCallback((tags) => {
    setTags(tags);
  }, []);

  const tagsComponent = useMemo(
    () => <SampleTags sample={sample} updateTags={updateTags} />,
    [sample, updateTags]
  );

  const goBack = useCallback(() => {
    Router.back();
  }, []);

  return <SampleContent sample={sample} tags={tagsComponent} goBack={goBack} />;
}

export async function getServerSideProps({ params }) {
  const linkedProjectResponse = await api.get(`/project/${params.id}`);
  return { props: { sample: linkedProjectResponse?.data } };
}

export default Project;
