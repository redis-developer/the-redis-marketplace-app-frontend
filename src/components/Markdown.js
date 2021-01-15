import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import { useRequest } from '../hooks';

export default function Markdown({ url, ...rest }) {
  const { data } = useRequest({ url });
  return (
    <ReactMarkdown plugins={[gfm]} skipHtml {...rest}>
      {data}
    </ReactMarkdown>
  );
}
