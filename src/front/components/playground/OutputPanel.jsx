// src/front/components/playground/OutputPanel.jsx
import React, { useState } from 'react';

const OutputPanel = ({ 
  layoutMode, 
  showConsole, 
  consoleOutput, 
  onClearConsole, 
  iframeRef 
}) => {
  const [outputTab, setOutputTab] = useState('preview'); // preview or console
  const [iframeError, setIframeError] = useState(null);

  // Refresh iframe
  const handleRefresh = () => {
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.srcdoc;
      iframeRef.current.srcdoc = '';
      setTimeout(() => {
        iframeRef.current.srcdoc = currentSrc;
      }, 10);
    }
  };

  // Open in new tab
  const handleOpenInNewTab = () => {
    if (iframeRef.current && iframeRef.current.srcdoc) {
      const blob = new Blob([iframeRef.current.srcdoc], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      setTimeout(() => URL.revokeObjectURL(url), 100);
    }
  };

  // Format console output
  const formatConsoleArg = (arg) => {
    if (typeof arg === 'object') {
      try {
        return JSON.stringify(JSON.parse(arg), null, 2);
      } catch {
        return arg;
      }
    }
    return arg;
  };

  // Get console icon based on method
  const getConsoleIcon = (method) => {
    const icons = {
      log: '📝',
      error: '❌',
      warn: '⚠️',
      info: 'ℹ️',
      debug: '🐛',
      table: '📊'
    };
    return icons[method] || '📝';
  };

  return (
    <div className={`${layoutMode === 'vertical' ? 'h-1/2' : 'w-1/2'} flex flex-col bg-white`}>
      {/* Output Header */}
      <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">Output</span>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-gray-600">Live Preview</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
            title="Refresh Preview"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          
          {/* Open in New Tab */}
          <button
            onClick={handleOpenInNewTab}
            className="p-1 text-gray-600 hover:text-gray-800 transition-colors"
            title="Open in New Tab"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile-style tabs for small screens */}
      <div className="bg-gray-100 px-2 py-1 border-b border-gray-300 flex gap-2 sm:hidden">
        <button
          onClick={() => setOutputTab('preview')}
          className={`px-3 py-1 text-sm rounded ${
            outputTab === 'preview' 
              ? 'bg-white text-blue-600 shadow' 
              : 'text-gray-600'
          }`}
        >
          Preview
        </button>
        <button
          onClick={() => setOutputTab('console')}
          className={`px-3 py-1 text-sm rounded ${
            outputTab === 'console' 
              ? 'bg-white text-blue-600 shadow' 
              : 'text-gray-600'
          }`}
        >
          Console ({consoleOutput.length})
        </button>
      </div>

      {/* Preview iframe */}
      <div className={`${showConsole ? 'flex-1' : 'h-full'} ${outputTab === 'console' ? 'hidden sm:block' : ''} relative`}>
        {iframeError && (
          <div className="absolute top-0 left-0 right-0 bg-red-50 border-b border-red-200 p-2">
            <p className="text-red-600 text-sm">{iframeError}</p>
          </div>
        )}
        <iframe
          ref={iframeRef}
          className="w-full h-full bg-white"
          title="Preview"
          sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin"
          onError={(e) => setIframeError('Failed to load preview')}
          onLoad={() => setIframeError(null)}
        />
      </div>

      {/* Console */}
      {showConsole && (
        <div className={`${outputTab === 'preview' ? 'hidden sm:flex' : 'flex'} flex-col border-t border-gray-300 ${
          showConsole ? 'h-1/3' : 'h-0'
        }`}>
          <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-300">
                Console
              </span>
              <span className="text-xs text-gray-500">
                {consoleOutput.length} message{consoleOutput.length !== 1 ? 's' : ''}
              </span>
            </div>
            <button
              onClick={onClearConsole}
              className="text-xs text-gray-400 hover:text-white transition-colors px-2 py-1 rounded hover:bg-gray-700"
            >
              Clear
            </button>
          </div>
          
          <div className="flex-1 bg-gray-900 overflow-y-auto font-mono text-xs">
            {consoleOutput.length === 0 ? (
              <div className="p-3 text-gray-500">
                Console output will appear here...
              </div>
            ) : (
              <div className="p-2">
                {consoleOutput.map((log, i) => (
                  <div 
                    key={i} 
                    className={`mb-2 p-2 rounded ${
                      log.method === 'error' ? 'bg-red-900/20 border-l-2 border-red-500' :
                      log.method === 'warn' ? 'bg-yellow-900/20 border-l-2 border-yellow-500' :
                      log.method === 'info' ? 'bg-blue-900/20 border-l-2 border-blue-500' :
                      'hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-base mt-0.5">{getConsoleIcon(log.method)}</span>
                      <div className="flex-1">
                        <div className={`${
                          log.method === 'error' ? 'text-red-400' :
                          log.method === 'warn' ? 'text-yellow-400' :
                          log.method === 'info' ? 'text-blue-400' :
                          'text-gray-300'
                        }`}>
                          {log.args.map((arg, j) => (
                            <span key={j} className="mr-2">
                              {formatConsoleArg(arg)}
                            </span>
                          ))}
                        </div>
                        <div className="text-gray-600 text-xs mt-1">
                          {log.timestamp}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OutputPanel;