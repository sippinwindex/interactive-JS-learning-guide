// src/front/pages/Playground.jsx
import React, { useState, useEffect, useRef } from 'react';
import PlaygroundEditor from '../components/PlaygroundEditor';
import PlaygroundConsole from '../components/PlaygroundConsole';

// Make sure to export the component
export const Playground = ({ navigateTo, isDarkMode }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playgroundRef = useRef(null);
  const [code, setCode] = useState({
    html: `<!DOCTYPE html>
<html>
<head>
  <title>Interactive Demo</title>
</head>
<body>
  <div class="container">
    <h1 id="title">Hello JavaScript!</h1>
    <button id="btn" class="action-btn">Click me!</button>
    <p id="output"></p>
    <div id="counter">Clicks: <span id="count">0</span></div>
  </div>
</body>
</html>`,
    css: `.container {
  padding: 30px;
  font-family: 'Segoe UI', Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  background: linear-gradient(135deg, #4a8a4a 0%, #b89968 100%);
  border-radius: 20px;
  color: white;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

#title {
  margin-bottom: 20px;
  font-size: 2.5rem;
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from { text-shadow: 0 0 10px #d4e8d4; }
  to { text-shadow: 0 0 20px #d4e8d4, 0 0 30px #4a8a4a; }
}

.action-btn {
  background: linear-gradient(45deg, #5fa05f, #a07c48);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

.action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  background: linear-gradient(45deg, #7cb77c, #b89968);
}

.action-btn:active {
  transform: scale(0.95);
}

#output {
  margin-top: 20px;
  padding: 20px;
  background: rgba(255,255,255,0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  min-height: 60px;
  font-size: 1.1rem;
}

#counter {
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: bold;
}

#count {
  color: #ffd700;
  font-size: 1.5rem;
}`,
    js: `// Interactive JavaScript example
let clickCount = 0;
const colors = ['#4a8a4a', '#5fa05f', '#7cb77c', '#a8d0a8', '#b89968', '#d4c0a0'];

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('btn');
  const output = document.getElementById('output');
  const title = document.getElementById('title');
  const countEl = document.getElementById('count');

  if (btn && output && title) {
    btn.addEventListener('click', function() {
      clickCount++;
      
      // Update counter
      if (countEl) {
        countEl.textContent = clickCount;
      }
      
      // Change title color randomly
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      title.style.color = randomColor;
      
      // Update output with animation
      output.innerHTML = '<div style="animation: fadeIn 0.5s ease-in;">' +
        '<strong>🎉 Button clicked!</strong><br>' +
        '<small>⏰ Time: ' + new Date().toLocaleTimeString() + '</small><br>' +
        '<small>🎨 Color: ' + randomColor + '</small>' +
        '</div>';
      
      // Add ripple effect
      btn.style.transform = 'scale(0.95)';
      setTimeout(() => {
        btn.style.transform = 'scale(1)';
      }, 150);
      
      console.log('Button clicked! Count:', clickCount);
      console.log('New color applied:', randomColor);
    });

    // Initial message
    output.innerHTML = '<em>✨ Click the button to see some magic!</em>';
    console.log('🚀 Playground initialized with Matcha theme!');
    console.log('Available colors:', colors);
  }
});

// Add CSS animation
const style = document.createElement('style');
style.textContent = '@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }';
document.head.appendChild(style);`
  });

  const [activeTab, setActiveTab] = useState('html');
  const [editorTheme, setEditorTheme] = useState(isDarkMode ? 'matcha' : 'github');
  const [autoRun, setAutoRun] = useState(true);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const iframeRef = useRef(null);
  const runTimeoutRef = useRef(null);

  // Sync editor theme with app theme
  useEffect(() => {
    if (isDarkMode) {
      if (editorTheme === 'github' || editorTheme === 'wood') {
        setEditorTheme('matcha');
      }
    } else {
      if (editorTheme === 'dark' || editorTheme === 'dracula' || editorTheme === 'matcha' || editorTheme === 'monokai') {
        setEditorTheme('github');
      }
    }
  }, [isDarkMode]);

  const runCode = () => {
    if (!iframeRef.current) return;
    
    setIsRunning(true);
    setConsoleOutput([]);
    
    const iframe = iframeRef.current;

    const fullHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            margin: 0; 
            padding: 20px; 
            background: ${isDarkMode ? 'linear-gradient(135deg, #1e301e 0%, #4a3925 100%)' : 'linear-gradient(135deg, #f0f7f0 0%, #faf8f5 100%)'};
            color: ${isDarkMode ? '#d4e8d4' : '#4a3925'};
            min-height: 100vh;
          }
          ${code.css}
        </style>
      </head>
      <body>
        ${code.html.replace(/<\/?html[^>]*>/gi, '').replace(/<\/?head[^>]*>/gi, '').replace(/<\/?body[^>]*>/gi, '').replace(/<title[^>]*>.*?<\/title>/gi, '')}
        <script>
          const originalLog = console.log;
          const originalError = console.error;
          const originalWarn = console.warn;
          const originalInfo = console.info;
          
          function sendToParent(method, args) {
            window.parent.postMessage({
              type: 'console',
              method: method,
              args: args.map(arg => {
                if (typeof arg === 'object') {
                  try {
                    return JSON.stringify(arg, null, 2);
                  } catch {
                    return String(arg);
                  }
                }
                return String(arg);
              })
            }, '*');
          }
          
          console.log = function(...args) {
            sendToParent('log', args);
            originalLog.apply(console, args);
          };
          
          console.error = function(...args) {
            sendToParent('error', args);
            originalError.apply(console, args);
          };
          
          console.warn = function(...args) {
            sendToParent('warn', args);
            originalWarn.apply(console, args);
          };
          
          console.info = function(...args) {
            sendToParent('info', args);
            originalInfo.apply(console, args);
          };
          
          window.onerror = function(msg, url, lineNo, columnNo, error) {
            console.error('Error: ' + msg);
            return false;
          };
          
          window.addEventListener('unhandledrejection', function(event) {
            console.error('Unhandled Promise Rejection:', event.reason);
          });
          
          try {
            ${code.js}
          } catch (error) {
            console.error('Runtime Error: ' + error.message);
          }
        </script>
      </body>
      </html>
    `;

    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    iframeDoc.open();
    iframeDoc.write(fullHTML);
    iframeDoc.close();
    
    setTimeout(() => setIsRunning(false), 500);
  };

  // Listen for console messages from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'console') {
        const timestamp = new Date().toLocaleTimeString('en-US', { 
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        
        setConsoleOutput(prev => [...prev, {
          method: event.data.method,
          args: event.data.args,
          timestamp
        }]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Auto-run code when it changes
  useEffect(() => {
    if (autoRun) {
      if (runTimeoutRef.current) {
        clearTimeout(runTimeoutRef.current);
      }
      
      runTimeoutRef.current = setTimeout(runCode, 1000);
      
      return () => {
        if (runTimeoutRef.current) {
          clearTimeout(runTimeoutRef.current);
        }
      };
    }
  }, [code, autoRun, isDarkMode]);

  // Initial run
  useEffect(() => {
    setTimeout(runCode, 100);
  }, []);

  const clearConsole = () => setConsoleOutput([]);

  // Fullscreen handling
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (playgroundRef.current) {
        playgroundRef.current.requestFullscreen().then(() => {
          setIsFullscreen(true);
        }).catch(err => {
          console.error('Error attempting to enable fullscreen:', err);
        });
      }
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      });
    }
  };

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  // Handle ESC key and keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
      
      if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
      }
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
      }
      
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        console.log('Code saved to local storage');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen]);

  const tabs = [
    { key: 'html', label: 'HTML', icon: '🌐' },
    { key: 'css', label: 'CSS', icon: '🎨' },
    { key: 'js', label: 'JavaScript', icon: '⚡' }
  ];

  const editorThemes = isDarkMode ? [
    { value: 'matcha', label: '🍵 Matcha' },
    { value: 'dark', label: '🌙 Dark' },
    { value: 'dracula', label: '🧛 Dracula' },
    { value: 'monokai', label: '🎨 Monokai' }
  ] : [
    { value: 'github', label: '☀️ GitHub' },
    { value: 'wood', label: '🪵 Wood' }
  ];

  // Templates - Fixed version without nested template literals
  const templates = {
    basic: {
      name: 'Basic',
      icon: '📝'
    },
    counter: {
      name: 'Counter',
      icon: '🔢'
    },
    todo: {
      name: 'Todo App',
      icon: '✅'
    },
    calculator: {
      name: 'Calculator',
      icon: '🧮'
    }
  };

  const loadTemplate = (templateKey) => {
    // Implementation would go here
    console.log('Loading template:', templateKey);
  };

  return (
    <div 
      ref={playgroundRef}
      className={`${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} bg-gradient-to-br from-matcha-50 via-wood-50 to-matcha-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 ${isFullscreen ? '' : 'pt-16'} transition-all duration-300`}
    >
      <div className={`${isFullscreen ? 'h-screen' : 'max-w-full mx-auto'} p-4`}>
        {/* Header */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg shadow-md p-4 mb-4 border border-matcha-200 dark:border-gray-700">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-matcha-600 to-wood-600 bg-clip-text text-transparent flex items-center gap-2">
              <span>🎮</span>
              <span>Live Code Playground</span>
              {isRunning && (
                <span className="text-sm text-matcha-500 animate-pulse">● Running</span>
              )}
            </h2>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Fullscreen Button */}
              <button
                onClick={toggleFullscreen}
                className="px-3 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-all flex items-center gap-2 text-sm"
                title={isFullscreen ? "Exit Fullscreen (ESC)" : "Enter Fullscreen"}
              >
                <span>{isFullscreen ? '🗙' : '⛶'}</span>
                <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
              </button>

              {/* Editor Theme Selector */}
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600 dark:text-gray-400">Theme:</label>
                <select 
                  value={editorTheme}
                  onChange={(e) => setEditorTheme(e.target.value)}
                  className="px-3 py-2 bg-matcha-50 dark:bg-gray-700 border border-matcha-300 dark:border-gray-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-matcha-500"
                >
                  {editorThemes.map(theme => (
                    <option key={theme.value} value={theme.value}>{theme.label}</option>
                  ))}
                </select>
              </div>

              {/* Templates */}
              <div className="flex gap-2">
                {Object.entries(templates).map(([key, template]) => (
                  <button 
                    key={key}
                    onClick={() => loadTemplate(key)}
                    className="px-3 py-2 bg-gradient-to-r from-matcha-500 to-wood-500 text-white text-sm rounded-lg hover:from-matcha-600 hover:to-wood-600 transition-all flex items-center gap-1 shadow-sm"
                    title={template.name}
                  >
                    <span>{template.icon}</span>
                    <span className="hidden lg:inline">{template.name}</span>
                  </button>
                ))}
              </div>

              {/* Auto-run Toggle */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox"
                  checked={autoRun}
                  onChange={(e) => setAutoRun(e.target.checked)}
                  className="w-4 h-4 text-matcha-600 rounded focus:ring-matcha-500"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">Auto-run</span>
              </label>

              {/* Run Button */}
              <button 
                onClick={runCode}
                className="px-4 py-2 bg-gradient-to-r from-matcha-500 to-matcha-600 text-white rounded-lg hover:from-matcha-600 hover:to-matcha-700 transition-all font-semibold flex items-center gap-2 shadow-md"
              >
                <span>▶</span>
                <span>Run</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4" style={{ height: isFullscreen ? 'calc(100vh - 160px)' : 'calc(100vh - 180px)' }}>
          {/* Code Editor Panel */}
          <div className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg overflow-hidden flex flex-col border border-matcha-200 dark:border-gray-700 ${isFullscreen ? 'h-full' : ''}`}>
            {/* Editor Tabs */}
            <div className="flex border-b border-matcha-200 dark:border-gray-700 bg-matcha-50 dark:bg-gray-900">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  className={`px-4 py-3 text-sm font-medium transition-all ${
                    activeTab === tab.key
                      ? 'bg-white dark:bg-gray-800 border-b-2 border-matcha-500 text-matcha-600 dark:text-matcha-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 hover:bg-matcha-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Code Editor - Using textarea for now */}
            <div className="flex-1 overflow-hidden">
              <textarea
                className="w-full h-full p-4 bg-gray-900 text-green-400 font-mono resize-none focus:outline-none"
                value={code[activeTab]}
                onChange={(e) => setCode(prev => ({ ...prev, [activeTab]: e.target.value }))}
                spellCheck={false}
              />
            </div>
          </div>

          {/* Output Panel */}
          <div className="flex flex-col gap-4">
            {/* Preview */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg overflow-hidden flex-1 border border-wood-200 dark:border-gray-700">
              <div className="bg-gradient-to-r from-wood-500 to-wood-600 text-white px-4 py-3 font-medium flex items-center justify-between">
                <span>
                  <span className="mr-2">👁️</span>
                  Live Preview
                </span>
                <span className="text-xs opacity-75">
                  {isDarkMode ? '🌙 Dark' : '☀️ Light'}
                </span>
              </div>
              <iframe
                ref={iframeRef}
                className="w-full h-full bg-white dark:bg-gray-900"
                title="Code Preview"
                sandbox="allow-scripts allow-same-origin"
                style={{ minHeight: '300px' }}
              />
            </div>

            {/* Console */}
            <div style={{ height: '250px' }} className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
                <span className="text-gray-300 font-medium text-sm">
                  <span className="mr-2">📟</span>
                  Console
                </span>
                <button 
                  onClick={clearConsole}
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  Clear
                </button>
              </div>
              <div className="p-3 overflow-y-auto" style={{ height: 'calc(100% - 40px)' }}>
                {consoleOutput.length === 0 ? (
                  <div className="text-gray-500 text-sm font-mono">Console output will appear here...</div>
                ) : (
                  consoleOutput.map((log, index) => (
                    <div key={index} className={`font-mono text-sm mb-1 ${
                      log.method === 'error' ? 'text-red-400' : 
                      log.method === 'warn' ? 'text-yellow-400' : 
                      'text-green-400'
                    }`}>
                      <span className="text-gray-500 mr-2">[{log.timestamp}]</span>
                      {log.args.join(' ')}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Tips - Hide in fullscreen mode */}
        {!isFullscreen && (
          <div className="mt-4 bg-gradient-to-r from-matcha-50 to-wood-50 dark:from-gray-800 dark:to-gray-700 border border-matcha-200 dark:border-gray-600 rounded-lg p-4">
            <h4 className="font-semibold text-matcha-700 dark:text-matcha-300 mb-2">
              💡 Pro Tips:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-matcha-600 dark:text-matcha-400">
              <div>• Press ⛶ for fullscreen mode</div>
              <div>• ESC to exit fullscreen</div>
              <div>• Tab key adds 2-space indent</div>
              <div>• Auto-closing brackets enabled</div>
              <div>• Themes sync with dark/light mode</div>
              <div>• Preview adapts to your theme</div>
              <div>• Templates use Matcha colors</div>
              <div>• F12 for browser DevTools</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};