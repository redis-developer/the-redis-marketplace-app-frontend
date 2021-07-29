import React, { useMemo } from 'react';

import { LinkedSampleTags, SampleDialog } from './';

export default function LinkedSample({ sample, closeLinkedSample, updateTags, isOpened }) {
  const tags = useMemo(
    () => (
      <LinkedSampleTags sample={sample} closePopup={closeLinkedSample} updateTags={updateTags} />
    ),
    [closeLinkedSample, sample, updateTags]
  );

  return (
    <SampleDialog tags={tags} sample={sample} closePopup={closeLinkedSample} isOpened={isOpened} />
  );
}
