// src/front/components/CodeBlock.jsx
import React, { useState } from 'react';

export const CodeBlock = ({ 
  code, 
  language = 'javascript', 
  onRun = null, 
  output = null,
  title = null,
  showLineNumbers = true,
  maxHeight = '400px'
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const handleRun = () => {
    if (onRun) {
      onRun();
    }
  };

  // Simple syntax highlighting for JavaScript
  const highlightCode = (code) => {
    if (language !== 'javascript') return code;

    return code
      .replace(/(\/\/.*$)/gm, '<span class="text-green-400">$1</span>') // Comments
      .replace(/\b(const|let|var|function|return|if|else|for|while|do|break|continue|switch|case|default|try|catch|finally|throw|class|extends|import|export|from|async|await|yield|new|this|super|typeof|instanceof)\b/g, 
        '<span class="text-purple-400">$1</span>') // Keywords
      .replace(/\b(true|false|null|undefined)\b/g, '<span class="text-blue-400">$1</span>') // Literals
      .replace(/\b(\d+\.?\d*)\b/g, '<span class="text-yellow-400">$1</span>') // Numbers
      .replace(/(["'`])((?:\\.|(?!\1)[^\\])*?)\1/g, '<span class="text-green-300">$&</span>') // Strings
      .replace(/\b(console|Math|Object|Array|String|Number|Boolean|Date|RegExp|Promise|JSON)\b/g, 
        '<span class="text-cyan-400">$1</span>'); // Built-ins
  };

  const formatOutput = (output) => {
    if (!output) return '';
    
    return output.split('\n').map((line, index) => {
      const isError = line.includes('❌');
      const isWarning = line.includes('⚠️');
      
      return (
        <div key={index} className={`${
          isError ? 'text-red-300' : 
          isWarning ? 'text-yellow-300' : 
          'text-green-300'
        }`}>
          {line}
        </div>
      );
    });
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <span className="text-gray-400 text-sm font-medium">
            {title || `${language.charAt(0).toUpperCase() + language.slice(1)} Code`}
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          {onRun && (
            <button 
              onClick={handleRun}
              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded transition-colors flex items-center space-x-1"
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span>Run</span>
            </button>
          )}
          
          <button 
            onClick={handleCopy}
            className={`px-3 py-1 text-sm rounded transition-all flex items-center space-x-1 ${
              copied 
                ? 'bg-green-600 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            {copied ? (
              <>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                </svg>
                <span>Copied!</span>
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"/>
                </svg>
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Content */}
      <div className="relative">
        <div 
          className="overflow-auto p-4 text-sm font-mono leading-relaxed"
          style={{ maxHeight }}
        >
          {showLineNumbers ? (
            <div className="flex">
              {/* Line Numbers */}
              <div className="flex-shrink-0 w-12 text-right pr-4 text-gray-500 select-none">
                {code.split('\n').map((_, index) => (
                  <div key={index} className="leading-relaxed">
                    {index + 1}
                  </div>
                ))}
              </div>
              
              {/* Code */}
              <div className="flex-1 text-gray-300">
                <pre>
                  <code 
                    dangerouslySetInnerHTML={{ 
                      __html: highlightCode(code) 
                    }} 
                  />
                </pre>
              </div>
            </div>
          ) : (
            <pre className="text-gray-300">
              <code 
                dangerouslySetInnerHTML={{ 
                  __html: highlightCode(code) 
                }} 
              />
            </pre>
          )}
        </div>
      </div>

      {/* Output */}
      {output && (
        <div className="border-t border-gray-700 bg-gray-800">
          <div className="px-4 py-2 bg-gray-750 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span className="text-sm font-medium text-gray-400">Output</span>
            </div>
          </div>
          <div className="p-4 font-mono text-sm bg-gray-900 max-h-32 overflow-y-auto">
            {formatOutput(output)}
          </div>
        </div>
      )}
    </div>
  );
};