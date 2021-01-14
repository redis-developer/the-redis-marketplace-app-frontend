import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';

import { useRequest } from '../hooks';

export default function Markdown({ link, ...rest }) {
  const { data } = useRequest(link);
  return (
    <ReactMarkdown plugins={[gfm]} skipHtml {...rest}>
      {data}
    </ReactMarkdown>
  );
}
