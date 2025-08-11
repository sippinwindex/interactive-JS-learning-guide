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
  const [showTemplates, setShowTemplates] = useState(false);

  const handleDownload = () => {
    // Combine all files into a single HTML
    const htmlFile = files['index.html'] || Object.values(files).find(f => f.language === 'html');
    const cssFiles = Object.entries(files).filter(([name]) => name.endsWith('.css'));
    const jsFiles = Object.entries(files).filter(([name]) => name.endsWith('.js'));

    let combinedHTML = htmlFile?.content || '<h1>No HTML file found</h1>';
    
    // Inject CSS
    if (cssFiles.length > 0) {
      const css = cssFiles.map(([, file]) => file.content).join('\n');
      combinedHTML = combinedHTML.replace('</head>', `<style>${css}</style>\n</head>`);
    }
    
    // Inject JS
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
    <div className="bg-gray-800 border-b border-gray-700 px-4 py-2">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">JS</span>
            </div>
            <span className="text-white font-semibold">Playground</span>
          </div>

          {/* File Explorer Toggle */}
          <button
            onClick={() => setShowFileExplorer(!showFileExplorer)}
            className={`p-1.5 rounded ${showFileExplorer ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white'}`}
            title="Toggle File Explorer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
            </svg>
          </button>

          {/* Run Button */}
          <button
            onClick={onRun}
            disabled={isRunning}
            className={`px-4 py-1.5 rounded flex items-center gap-2 text-white font-medium transition-all ${
              isRunning 
                ? 'bg-orange-600 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {isRunning ? (
              <>
                <span className="animate-spin">⟳</span> Running...
              </>
            ) : (
              <>
                ▶ Run
              </>
            )}
          </button>

          {/* Examples Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowExamples(!showExamples)}
              className="px-3 py-1.5 bg-purple-600 text-white rounded hover:bg-purple-700 flex items-center gap-2"
            >
              📚 Examples
            </button>
            
            {showExamples && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-gray-700 rounded-lg shadow-xl z-50">
                <div className="p-2">
                  {Object.entries(examples).map(([key, example]) => (
                    <button
                      key={key}
                      onClick={() => handleLoadExample(example.files)}
                      className="w-full text-left px-3 py-2 text-sm text-gray-200 hover:bg-gray-600 rounded"
                    >
                      <div className="font-medium">{example.name}</div>
                      <div className="text-xs text-gray-400">{example.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Templates */}
          <button
            onClick={() => {
              if (window.confirm('Load HTML template?')) {
                dispatch({ type: 'LOAD_TEMPLATE', payload: { files: templateProjects.html || {} } });
              }
            }}
            className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            📄 Template
          </button>

          {/* Clear All */}
          <button
            onClick={handleClearAll}
            className="px-3 py-1.5 bg-red-600 text-white rounded hover:bg-red-700"
          >
            🗑️ Clear
          </button>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Font Size */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setFontSize(Math.max(10, fontSize - 2))}
              className="text-gray-400 hover:text-white px-2 py-1"
            >
              A-
            </button>
            <span className="text-gray-400 text-sm">{fontSize}px</span>
            <button
              onClick={() => setFontSize(Math.min(24, fontSize + 2))}
              className="text-gray-400 hover:text-white px-2 py-1"
            >
              A+
            </button>
          </div>

          {/* Layout Toggle */}
          <div className="flex items-center bg-gray-700 rounded">
            <button
              onClick={() => setLayoutMode('horizontal')}
              className={`px-3 py-1 text-sm ${layoutMode === 'horizontal' ? 'bg-gray-600 text-white' : 'text-gray-400'} rounded-l transition-colors`}
              title="Horizontal Layout"
            >
              ⬌
            </button>
            <button
              onClick={() => setLayoutMode('vertical')}
              className={`px-3 py-1 text-sm ${layoutMode === 'vertical' ? 'bg-gray-600 text-white' : 'text-gray-400'} rounded-r transition-colors`}
              title="Vertical Layout"
            >
              ⬍
            </button>
          </div>

          {/* Console Toggle */}
          <button
            onClick={() => setShowConsole(!showConsole)}
            className={`px-3 py-1 text-sm rounded ${showConsole ? 'bg-gray-600 text-white' : 'bg-gray-700 text-gray-400'}`}
          >
            Console
          </button>

          {/* Theme Selector */}
          <select
            value={editorTheme}
            onChange={(e) => setEditorTheme(e.target.value)}
            className="bg-gray-700 text-white text-sm px-2 py-1 rounded border border-gray-600 focus:outline-none"
          >
            <optgroup label="Popular">
              <option value="dracula">🧛 Dracula</option>
              <option value="monokai">🎨 Monokai</option>
              <option value="tokyo-night">🌃 Tokyo Night</option>
              <option value="github-dark">🐙 GitHub Dark</option>
              <option value="one-dark">🔵 One Dark</option>
            </optgroup>
            <optgroup label="Light">
              <option value="vs">☀️ Light</option>
              <option value="github-light">🐱 GitHub Light</option>
            </optgroup>
            <optgroup label="Dark">
              <option value="vs-dark">🌑 VS Dark</option>
              <option value="nord">❄️ Nord</option>
            </optgroup>
          </select>

          {/* Download Button */}
          <button
            onClick={handleDownload}
            className="text-gray-400 hover:text-white transition-colors p-1.5"
            title="Download HTML"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>

          {/* Fullscreen Button */}
          <button
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
              } else {
                document.exitFullscreen();
              }
            }}
            className="text-gray-400 hover:text-white transition-colors p-1.5"
            title="Toggle Fullscreen"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBar;