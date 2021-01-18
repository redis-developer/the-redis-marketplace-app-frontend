import React, { useMemo } from 'react';

import { SampleDialog, SampleTags } from './';

export default function LinkedSample({ sample, closeLinkedSample, updateTags, isOpened }) {
  const tags = useMemo(
    () => <SampleTags sample={sample} closePopup={closeLinkedSample} updateTags={updateTags} />,
    [closeLinkedSample, sample, updateTags]
  );

  return (
    <SampleDialog tags={tags} sample={sample} closePopup={closeLinkedSample} isOpened={isOpened} />
  );
}
