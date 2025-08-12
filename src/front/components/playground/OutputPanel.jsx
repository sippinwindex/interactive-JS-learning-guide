// src/front/components/playground/OutputPanel.jsx
import React, { useState } from 'react';

const OutputPanel = ({ 
  layoutMode, 
  showConsole, 
  consoleOutput, 
  onClearConsole, 
  iframeRef 
}) => {
  const [outputTab, setOutputTab] = useState('preview');
  const [iframeError, setIframeError] = useState(null);

  const handleRefresh = () => {
    if (iframeRef.current) {
      const currentSrc = iframeRef.current.srcdoc;
      iframeRef.current.srcdoc = '';
      setTimeout(() => {
        iframeRef.current.srcdoc = currentSrc;
      }, 10);
    }
  };

  const handleOpenInNewTab = () => {
    if (iframeRef.current && iframeRef.current.srcdoc) {
      const blob = new Blob([iframeRef.current.srcdoc], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
      setTimeout(() => URL.revokeObjectURL(url), 100);
    }
  };

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
    <div className="h-full flex flex-col bg-white">
      {/* Output Header */}
      <div className="bg-gray-100 px-4 py-3 border-b border-gray-300 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Output</span>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Live Preview</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors"
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
            className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors"
            title="Open in New Tab"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Tabs */}
      <div className="bg-gray-50 px-3 py-2 border-b border-gray-300 flex space-x-2 sm:hidden flex-shrink-0">
        <button
          onClick={() => setOutputTab('preview')}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            outputTab === 'preview' 
              ? 'bg-white text-blue-600 shadow-sm font-medium' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Preview
        </button>
        <button
          onClick={() => setOutputTab('console')}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            outputTab === 'console' 
              ? 'bg-white text-blue-600 shadow-sm font-medium' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          Console ({consoleOutput.length})
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Preview */}
        <div className={`${showConsole ? 'flex-1' : 'h-full'} ${outputTab === 'console' ? 'hidden sm:flex' : 'flex'} flex-col relative`}>
          {iframeError && (
            <div className="bg-red-50 border-b border-red-200 p-3 flex-shrink-0">
              <p className="text-red-600 text-sm">{iframeError}</p>
            </div>
          )}
          <iframe
            ref={iframeRef}
            className="w-full h-full bg-white border-0"
            title="Preview"
            sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin"
            onError={(e) => setIframeError('Failed to load preview')}
            onLoad={() => setIframeError(null)}
          />
        </div>

        {/* Console */}
        {showConsole && (
          <div className={`${outputTab === 'preview' ? 'hidden sm:flex' : 'flex'} flex-col border-t border-gray-300 ${
            showConsole ? 'h-1/3 min-h-[200px]' : 'h-0'
          }`}>
            {/* Console Header */}
            <div className="bg-gray-800 px-4 py-2 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-300">Console</span>
                <span className="text-xs text-gray-500">
                  {consoleOutput.length} message{consoleOutput.length !== 1 ? 's' : ''}
                </span>
              </div>
              <button
                onClick={onClearConsole}
                className="text-xs text-gray-400 hover:text-white transition-colors px-3 py-1 rounded hover:bg-gray-700"
              >
                Clear
              </button>
            </div>
            
            {/* Console Content */}
            <div className="flex-1 bg-gray-900 overflow-y-auto font-mono text-sm">
              {consoleOutput.length === 0 ? (
                <div className="p-4 text-gray-500 text-center">
                  Console output will appear here...
                </div>
              ) : (
                <div className="p-2 space-y-1">
                  {consoleOutput.map((log, i) => (
                    <div 
                      key={i} 
                      className={`p-2 rounded border-l-2 ${
                        log.method === 'error' ? 'bg-red-900/20 border-red-500 text-red-300' :
                        log.method === 'warn' ? 'bg-yellow-900/20 border-yellow-500 text-yellow-300' :
                        log.method === 'info' ? 'bg-blue-900/20 border-blue-500 text-blue-300' :
                        'border-gray-600 text-gray-300 hover:bg-gray-800'
                      }`}
                    >
                      <div className="flex items-start space-x-2">
                        <span className="text-base mt-0.5 flex-shrink-0">{getConsoleIcon(log.method)}</span>
                        <div className="flex-1 min-w-0">
                          <div className="break-words">
                            {log.args.map((arg, j) => (
                              <span key={j} className="mr-2">
                                {formatConsoleArg(arg)}
                              </span>
                            ))}
                          </div>
                          <div className="text-gray-500 text-xs mt-1">
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
    </div>
  );
};

export default OutputPanel;