import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import gfm from 'remark-gfm';

import { useRequest } from '../hooks';

const renderers = {
  code: ({ language, value }) => {
    return (
      <SyntaxHighlighter style={docco} language={language}>
        {value}
      </SyntaxHighlighter>
    );
  }
};

export default function Markdown({ url, ...rest }) {
  const { data } = useRequest({ url });
  return (
    <ReactMarkdown renderers={renderers} plugins={[gfm]} skipHtml {...rest}>
      {data}
    </ReactMarkdown>
  );
}
