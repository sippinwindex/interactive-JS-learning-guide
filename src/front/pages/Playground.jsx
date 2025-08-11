import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

// Export as named export for routes.jsx
// Component definition with proper export
const Playground = ({ navigateTo, isDarkMode = false }) => {
  // Professional templates for learning
  const templates = {
    welcome: {
      name: '👋 Welcome Tutorial',
      description: 'Start here to learn the basics',
      html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome to Coding!</title>
</head>
<body>
    <div class="welcome-container">
        <h1>🎉 Welcome to JavaScript!</h1>
        <p>This is a VS Code-like editor. Try these features:</p>
        
        <ul>
            <li>✨ IntelliSense (start typing and see suggestions)</li>
            <li>🎨 Syntax highlighting</li>
            <li>🔍 Error detection</li>
            <li>⚡ Auto-completion</li>
        </ul>
        
        <button id="startBtn" class="start-button">
            Click to Start Learning!
        </button>
        
        <div id="output" class="output-area"></div>
    </div>
</body>
</html>`,
      css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;
}

.welcome-container {
    background: white;
    padding: 40px;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    max-width: 600px;
    width: 100%;
}

h1 {
    color: #667eea;
    margin-bottom: 20px;
    font-size: 2.5rem;
    text-align: center;
}

.start-button {
    width: 100%;
    padding: 15px;
    font-size: 18px;
    font-weight: bold;
    color: white;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border: none;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.3s;
    margin-top: 20px;
}

.start-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}`,
      javascript: `console.log('🚀 VS Code Playground Ready!');

const button = document.getElementById('startBtn');
const output = document.getElementById('output');

button?.addEventListener('click', function() {
    output.style.display = 'block';
    output.innerHTML = '<h3>🎉 Great job! You clicked the button!</h3>';
    console.log('Button clicked!');
});`
    }
  };

  const [code, setCode] = useState({
    html: templates.welcome.html,
    css: templates.welcome.css,
    javascript: templates.welcome.javascript
  });

  const [activeTab, setActiveTab] = useState('html');
  const [autoRun, setAutoRun] = useState(true);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [editorTheme, setEditorTheme] = useState('vs-dark');
  
  const iframeRef = useRef(null);
  const runTimeoutRef = useRef(null);

  const runCode = () => {
    if (!iframeRef.current) return;
    
    setIsRunning(true);
    
    const iframe = iframeRef.current;
    const fullHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${code.css}</style>
</head>
<body>
  ${code.html}
  <script>
    const originalConsole = { ...console };
    
    function sendToParent(method, args) {
      window.parent.postMessage({
        type: 'console',
        method: method,
        args: args.map(arg => {
          if (arg === undefined) return 'undefined';
          if (arg === null) return 'null';
          if (typeof arg === 'object') {
            try {
              return JSON.stringify(arg, null, 2);
            } catch (e) {
              return String(arg);
            }
          }
          return String(arg);
        })
      }, '*');
    }
    
    ['log', 'error', 'warn', 'info'].forEach(method => {
      console[method] = function(...args) {
        sendToParent(method, args);
        originalConsole[method].apply(console, args);
      };
    });
    
    try {
      ${code.javascript}
    } catch (error) {
      console.error('Error:', error.message);
    }
  </script>
</body>
</html>`;

    iframe.srcdoc = fullHTML;
    
    setTimeout(() => {
      setIsRunning(false);
    }, 500);
  };

  // Listen for console messages
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'console') {
        const timestamp = new Date().toLocaleTimeString('en-US', { 
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        });
        
        setConsoleOutput(prev => {
          const newLog = {
            method: event.data.method,
            args: event.data.args,
            timestamp
          };
          return [...prev, newLog].slice(-100);
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Auto-run with debounce
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
  }, [code, autoRun]);

  // Initial run
  useEffect(() => {
    setTimeout(runCode, 100);
  }, []);

  const clearConsole = () => setConsoleOutput([]);

  const tabs = [
    { key: 'html', label: 'HTML', language: 'html' },
    { key: 'css', label: 'CSS', language: 'css' },
    { key: 'javascript', label: 'JavaScript', language: 'javascript' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            🚀 VS Code Playground
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Write HTML, CSS, and JavaScript with live preview
          </p>
        </div>

        {/* Main Editor Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Editor Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.key
                      ? 'bg-gray-100 dark:bg-gray-700 text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            {/* Monaco Editor */}
            <div style={{ height: '500px' }}>
              <Editor
                height="100%"
                language={tabs.find(t => t.key === activeTab)?.language}
                value={code[activeTab]}
                theme={editorTheme}
                onChange={(value) => setCode(prev => ({ ...prev, [activeTab]: value || '' }))}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  wordWrap: 'on',
                  automaticLayout: true
                }}
              />
            </div>
            
            {/* Controls */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <label className="flex items-center gap-2 text-sm">
                <input 
                  type="checkbox"
                  checked={autoRun}
                  onChange={(e) => setAutoRun(e.target.checked)}
                  className="rounded"
                />
                Auto-run
              </label>
              
              <div className="flex items-center gap-3">
                <select 
                  value={editorTheme}
                  onChange={(e) => setEditorTheme(e.target.value)}
                  className="text-sm px-3 py-1 rounded border border-gray-300 dark:border-gray-600 dark:bg-gray-800"
                >
                  <option value="vs-dark">Dark Theme</option>
                  <option value="vs">Light Theme</option>
                  <option value="hc-black">High Contrast</option>
                </select>
                
                <button 
                  onClick={runCode}
                  className="px-4 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                >
                  ▶ Run Code
                </button>
              </div>
            </div>
          </div>

          {/* Output Panel */}
          <div className="space-y-6">
            {/* Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Preview</h3>
              </div>
              <iframe
                ref={iframeRef}
                className="w-full bg-white"
                style={{ height: '400px' }}
                title="Preview"
                sandbox="allow-scripts"
              />
            </div>
            
            {/* Console */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600 flex justify-between">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Console ({consoleOutput.length})
                </h3>
                <button 
                  onClick={clearConsole}
                  className="text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Clear
                </button>
              </div>
              <div className="p-4 bg-gray-900 text-green-400 font-mono text-sm" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                {consoleOutput.length === 0 ? (
                  <div className="text-gray-500">Console output will appear here...</div>
                ) : (
                  consoleOutput.map((log, i) => (
                    <div key={i} className={`mb-1 ${
                      log.method === 'error' ? 'text-red-400' :
                      log.method === 'warn' ? 'text-yellow-400' :
                      'text-green-400'
                    }`}>
                      [{log.timestamp}] {log.args.join(' ')}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export as named export for routes.jsx
export { Playground };