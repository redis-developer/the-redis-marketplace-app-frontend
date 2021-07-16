import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import gfm from 'remark-gfm';

import { useRequest } from '../hooks';

const renderers = {
  code: ({ language, value }) => {
    return (
      <SyntaxHighlighter style={dracula} language={language}>
        {value}
      </SyntaxHighlighter>
    );
  },
  image: ({ alt, src, title }) => (
    <img alt={alt} src={src} title={title} style={{ maxWidth: '100%' }} />
  )
};

export default function Markdown({ url, ...rest }) {
  const { data } = useRequest({ url });
  return (
    <ReactMarkdown renderers={renderers} plugins={[gfm]} skipHtml {...rest}>
      {data}
    </ReactMarkdown>
  );
}
