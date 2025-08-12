// src/front/components/playground/TopBar.jsx
import React, { useState } from 'react';
import { templateProjects } from './templates/defaultFiles';
import { examples } from './templates/examples';

const TopBar = ({
  isRunning,
  onRun,
  fontSize,
  setFontSize,
  layoutMode,
  setLayoutMode,
  showConsole,
  setShowConsole,
  editorTheme,
  setEditorTheme,
  showFileExplorer,
  setShowFileExplorer,
  files,
  dispatch
}) => {
  const [showExamples, setShowExamples] = useState(false);

  const handleDownload = () => {
    const htmlFile = files['index.html'] || Object.values(files).find(f => f.language === 'html');
    const cssFiles = Object.entries(files).filter(([name]) => name.endsWith('.css'));
    const jsFiles = Object.entries(files).filter(([name]) => name.endsWith('.js'));

    let combinedHTML = htmlFile?.content || '<h1>No HTML file found</h1>';
    
    if (cssFiles.length > 0) {
      const css = cssFiles.map(([, file]) => file.content).join('\n');
      combinedHTML = combinedHTML.replace('</head>', `<style>${css}</style>\n</head>`);
    }
    
    if (jsFiles.length > 0) {
      const js = jsFiles.map(([, file]) => file.content).join('\n');
      combinedHTML = combinedHTML.replace('</body>', `<script>${js}</script>\n</body>`);
    }

    const blob = new Blob([combinedHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'project.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleLoadExample = (example) => {
    if (window.confirm('This will replace all current files. Continue?')) {
      dispatch({ type: 'LOAD_TEMPLATE', payload: { files: example } });
      setShowExamples(false);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all files? This cannot be undone.')) {
      dispatch({ type: 'LOAD_TEMPLATE', payload: { files: {} } });
    }
  };

  return (
    <div className="h-full px-4 flex items-center justify-between bg-gray-800 text-white">
      {/* Left Section */}
      <div className="flex items-center space-x-3">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">JS</span>
          </div>
          <span className="text-white font-semibold hidden sm:inline">Playground</span>
        </div>

        {/* File Explorer Toggle */}
        <button
          onClick={() => setShowFileExplorer(!showFileExplorer)}
          className={`p-2 rounded-md transition-colors ${
            showFileExplorer 
              ? 'bg-gray-700 text-white' 
              : 'text-gray-400 hover:text-white hover:bg-gray-700'
          }`}
          title="Toggle File Explorer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
          </svg>
        </button>

        {/* Run Button */}
        <button
          onClick={onRun}
          disabled={isRunning}
          className={`px-4 py-2 rounded-md flex items-center space-x-2 text-white font-medium transition-all ${
            isRunning 
              ? 'bg-orange-600 cursor-not-allowed opacity-75' 
              : 'bg-green-600 hover:bg-green-700 shadow-sm hover:shadow-md'
          }`}
        >
          {isRunning ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="hidden sm:inline">Running...</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <span className="hidden sm:inline">Run</span>
            </>
          )}
        </button>

        {/* Examples Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowExamples(!showExamples)}
            className="px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center space-x-1"
          >
            <span className="text-sm">📚</span>
            <span className="hidden sm:inline text-sm">Examples</span>
          </button>
          
          {showExamples && (
            <>
              {/* Backdrop */}
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setShowExamples(false)}
              ></div>
              
              {/* Dropdown */}
              <div className="absolute top-full left-0 mt-2 w-64 bg-gray-700 rounded-lg shadow-xl z-50 border border-gray-600">
                <div className="p-2">
                  {Object.entries(examples).map(([key, example]) => (
                    <button
                      key={key}
                      onClick={() => handleLoadExample(example.files)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-600 rounded transition-colors"
                    >
                      <div className="font-medium">{example.name}</div>
                      <div className="text-xs text-gray-400 mt-1">{example.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Template Button */}
        <button
          onClick={() => {
            if (window.confirm('Load HTML template?')) {
              dispatch({ type: 'LOAD_TEMPLATE', payload: { files: templateProjects.html || {} } });
            }
          }}
          className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
        >
          <span className="hidden sm:inline">📄 Template</span>
          <span className="sm:hidden">📄</span>
        </button>

        {/* Clear Button */}
        <button
          onClick={handleClearAll}
          className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
        >
          <span className="hidden sm:inline">🗑️ Clear</span>
          <span className="sm:hidden">🗑️</span>
        </button>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-3">
        {/* Font Size Controls */}
        <div className="flex items-center space-x-1 bg-gray-700 rounded-md px-2 py-1">
          <button
            onClick={() => setFontSize(Math.max(10, fontSize - 2))}
            className="text-gray-400 hover:text-white px-1 py-1 text-sm transition-colors"
            title="Decrease font size"
          >
            A-
          </button>
          <span className="text-gray-400 text-xs px-2">{fontSize}px</span>
          <button
            onClick={() => setFontSize(Math.min(24, fontSize + 2))}
            className="text-gray-400 hover:text-white px-1 py-1 text-sm transition-colors"
            title="Increase font size"
          >
            A+
          </button>
        </div>

        {/* Layout Toggle */}
        <div className="flex items-center bg-gray-700 rounded-md overflow-hidden">
          <button
            onClick={() => setLayoutMode('horizontal')}
            className={`px-3 py-1 text-sm transition-colors ${
              layoutMode === 'horizontal' 
                ? 'bg-gray-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            title="Horizontal Layout"
          >
            ⬌
          </button>
          <button
            onClick={() => setLayoutMode('vertical')}
            className={`px-3 py-1 text-sm transition-colors ${
              layoutMode === 'vertical' 
                ? 'bg-gray-600 text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
            title="Vertical Layout"
          >
            ⬍
          </button>
        </div>

        {/* Console Toggle */}
        <button
          onClick={() => setShowConsole(!showConsole)}
          className={`px-3 py-1 text-sm rounded-md transition-colors ${
            showConsole 
              ? 'bg-gray-600 text-white' 
              : 'bg-gray-700 text-gray-400 hover:text-white'
          }`}
          title="Toggle Console"
        >
          Console
        </button>

        {/* Theme Selector */}
        <select
          value={editorTheme}
          onChange={(e) => setEditorTheme(e.target.value)}
          className="bg-gray-700 text-white text-sm px-2 py-1 rounded-md border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
        >
          <optgroup label="Dark">
            <option value="dracula">Dracula</option>
            <option value="monokai">Monokai</option>
            <option value="vs-dark">VS Dark</option>
          </optgroup>
          <optgroup label="Light">
            <option value="vs">VS Light</option>
          </optgroup>
        </select>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          className="text-gray-400 hover:text-white transition-colors p-2 rounded-md hover:bg-gray-700"
          title="Download HTML"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TopBar;