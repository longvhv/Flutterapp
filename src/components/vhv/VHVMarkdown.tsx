import React from 'react';

interface VHVMarkdownProps {
  content: string;
  className?: string;
}

export const VHVMarkdown: React.FC<VHVMarkdownProps> = ({
  content,
  className = '',
}) => {
  // Simple markdown parser for common elements
  const parseMarkdown = (text: string): string => {
    let html = text;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-6 mb-3 text-gray-900 dark:text-white">$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mt-8 mb-4 text-gray-900 dark:text-white">$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4 text-gray-900 dark:text-white">$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>');

    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>');

    // Code inline
    html = html.replace(/`([^`]+)`/gim, '<code class="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono text-blue-600 dark:text-blue-400">$1</code>');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" class="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>');

    // Lists
    html = html.replace(/^\* (.*$)/gim, '<li class="ml-4 mb-2 text-gray-700 dark:text-gray-300">$1</li>');
    html = html.replace(/^- (.*$)/gim, '<li class="ml-4 mb-2 text-gray-700 dark:text-gray-300">$1</li>');

    // Wrap lists
    html = html.replace(/(<li.*<\/li>)/s, '<ul class="list-disc my-4">$1</ul>');

    // Blockquotes
    html = html.replace(/^&gt; (.*$)/gim, '<blockquote class="border-l-4 border-blue-600 pl-4 py-2 my-4 text-gray-700 dark:text-gray-300 italic">$1</blockquote>');

    // Horizontal rule
    html = html.replace(/^---$/gim, '<hr class="my-8 border-gray-300 dark:border-gray-600" />');

    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p class="mb-4 text-gray-700 dark:text-gray-300">');
    html = '<p class="mb-4 text-gray-700 dark:text-gray-300">' + html + '</p>';

    // Line breaks
    html = html.replace(/\n/g, '<br />');

    return html;
  };

  return (
    <div
      className={`prose prose-slate dark:prose-invert max-w-none ${className}`}
      dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
    />
  );
};
