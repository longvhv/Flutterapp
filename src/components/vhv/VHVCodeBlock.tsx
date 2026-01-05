import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface VHVCodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  showCopyButton?: boolean;
  title?: string;
  className?: string;
}

export const VHVCodeBlock: React.FC<VHVCodeBlockProps> = ({
  code,
  language = 'typescript',
  showLineNumbers = true,
  showCopyButton = true,
  title,
  className = '',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  // Simple syntax highlighting for common keywords
  const highlightSyntax = (line: string): string => {
    let highlighted = line;

    // Keywords
    const keywords = ['const', 'let', 'var', 'function', 'class', 'interface', 'type', 'import', 'export', 'from', 'return', 'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue'];
    keywords.forEach((keyword) => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      highlighted = highlighted.replace(regex, `<span class="text-purple-600 dark:text-purple-400">${keyword}</span>`);
    });

    // Strings
    highlighted = highlighted.replace(/(["'`])(.*?)\1/g, '<span class="text-green-600 dark:text-green-400">$1$2$1</span>');

    // Numbers
    highlighted = highlighted.replace(/\b(\d+)\b/g, '<span class="text-blue-600 dark:text-blue-400">$1</span>');

    // Comments
    highlighted = highlighted.replace(/(\/\/.*$)/g, '<span class="text-gray-500 dark:text-gray-400 italic">$1</span>');
    highlighted = highlighted.replace(/(\/\*[\s\S]*?\*\/)/g, '<span class="text-gray-500 dark:text-gray-400 italic">$1</span>');

    return highlighted;
  };

  return (
    <div className={`bg-gray-900 dark:bg-gray-950 rounded-xl overflow-hidden ${className}`}>
      {/* Header */}
      {(title || showCopyButton) && (
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800 dark:bg-gray-900 border-b border-gray-700">
          {title ? (
            <span className="text-sm font-medium text-gray-300">{title}</span>
          ) : (
            <span className="text-xs text-gray-500 uppercase">{language}</span>
          )}
          
          {showCopyButton && (
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-gray-700 dark:hover:bg-gray-800 rounded-lg transition-colors flex items-center gap-2"
            >
              {copied ? (
                <>
                  <Check size={16} className="text-green-400" />
                  <span className="text-xs text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy size={16} className="text-gray-400" />
                  <span className="text-xs text-gray-400">Copy</span>
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-4">
          <code className="text-sm font-mono">
            {lines.map((line, index) => (
              <div key={index} className="flex">
                {showLineNumbers && (
                  <span className="select-none text-gray-600 dark:text-gray-500 mr-4 text-right w-8">
                    {index + 1}
                  </span>
                )}
                <span
                  className="text-gray-100 dark:text-gray-200 flex-1"
                  dangerouslySetInnerHTML={{ __html: highlightSyntax(line) || '&nbsp;' }}
                />
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};
