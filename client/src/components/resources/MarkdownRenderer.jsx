import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownRenderer = ({ content }) => {
  const components = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneDark}
          language={match[1]}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
    h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mt-6 mb-4 text-gray-900 dark:text-white" {...props} />,
    h2: ({ node, ...props }) => <h2 className="text-2xl font-bold mt-5 mb-3 text-gray-900 dark:text-white" {...props} />,
    h3: ({ node, ...props }) => <h3 className="text-xl font-bold mt-4 mb-2 text-gray-900 dark:text-white" {...props} />,
    h4: ({ node, ...props }) => <h4 className="text-lg font-bold mt-3 mb-2 text-gray-900 dark:text-white" {...props} />,
    h5: ({ node, ...props }) => <h5 className="text-base font-bold mt-2 mb-1 text-gray-900 dark:text-white" {...props} />,
    h6: ({ node, ...props }) => <h6 className="text-sm font-bold mt-2 mb-1 text-gray-900 dark:text-white" {...props} />,
    p: ({ node, ...props }) => <p className="mb-4 text-gray-700 dark:text-gray-200 leading-relaxed" {...props} />,
    ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-200" {...props} />,
    ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4 text-gray-700 dark:text-gray-200" {...props} />,
    li: ({ node, ...props }) => <li className="mb-1" {...props} />,
    blockquote: ({ node, ...props }) => (
      <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-gray-600 dark:text-gray-300 my-4" {...props} />
    ),
    a: ({ node, ...props }) => (
      <a className="text-emerald-600 dark:text-emerald-400 hover:underline" {...props} />
    ),
    img: ({ node, ...props }) => (
      <img className="max-w-full h-auto rounded-lg my-4" {...props} />
    ),
    hr: ({ node, ...props }) => (
      <hr className="my-6 border-gray-200 dark:border-gray-700" {...props} />
    ),
    table: ({ node, ...props }) => (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700" {...props} />
      </div>
    ),
    th: ({ node, ...props }) => (
      <th className="px-4 py-2 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider" {...props} />
    ),
    td: ({ node, ...props }) => (
      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300" {...props} />
    ),
    tr: ({ node, ...props }) => (
      <tr className="hover:bg-gray-50 dark:hover:bg-gray-800" {...props} />
    )
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;