import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';

// Component definition with proper export
const Playground = ({ navigateTo, isDarkMode = false }) => {
  const [code, setCode] = useState({
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Playground</title>
</head>
<body>
    <div id="app">
        <h1>Welcome to JavaScript Playground!</h1>
        <p>Start coding and see the results instantly.</p>
        <button id="myButton">Click Me!</button>
        <div id="output"></div>
    </div>
</body>
</html>`,
    css: `body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
}

#app {
    max-width: 600px;
    margin: 0 auto;
    background: white;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

h1 {
    color: #333;
    margin-bottom: 20px;
}

button {
    background: #667eea;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
}

button:hover {
    background: #5569d8;
}

#output {
    margin-top: 20px;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 5px;
    min-height: 50px;
}`,
    javascript: `console.log('Welcome to JavaScript Playground!');

const button = document.getElementById('myButton');
const output = document.getElementById('output');

button.addEventListener('click', () => {
    const message = 'Button clicked at ' + new Date().toLocaleTimeString();
    output.innerHTML = '<p>' + message + '</p>';
    console.log(message);
});`
  });

  const [activeTab, setActiveTab] = useState('javascript');
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [editorTheme, setEditorTheme] = useState('dracula');
  const [showConsole, setShowConsole] = useState(true);
  const [layoutMode, setLayoutMode] = useState('horizontal'); // horizontal or vertical
  const [fontSize, setFontSize] = useState(14);
  
  const iframeRef = useRef(null);
  const containerRef = useRef(null);
  const editorRef = useRef(null);

  // Define custom themes for Monaco
  const defineCustomThemes = (monaco) => {
    // Dracula Theme
    monaco.editor.defineTheme('dracula', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6272a4', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'ff79c6' },
        { token: 'string', foreground: 'f1fa8c' },
        { token: 'number', foreground: 'bd93f9' },
        { token: 'function', foreground: '50fa7b' },
        { token: 'variable', foreground: 'f8f8f2' },
        { token: 'tag', foreground: 'ff79c6' },
        { token: 'attribute.name', foreground: '50fa7b' },
        { token: 'attribute.value', foreground: 'f1fa8c' }
      ],
      colors: {
        'editor.background': '#282a36',
        'editor.foreground': '#f8f8f2',
        'editor.lineHighlightBackground': '#44475a',
        'editor.selectionBackground': '#44475a',
        'editorCursor.foreground': '#f8f8f2',
        'editorLineNumber.foreground': '#6272a4'
      }
    });

    // Monokai Theme
    monaco.editor.defineTheme('monokai', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '75715e', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'f92672' },
        { token: 'string', foreground: 'e6db74' },
        { token: 'number', foreground: 'ae81ff' },
        { token: 'function', foreground: 'a6e22e' },
        { token: 'variable', foreground: 'f8f8f2' },
        { token: 'type', foreground: '66d9ef' }
      ],
      colors: {
        'editor.background': '#2d2a2e',
        'editor.foreground': '#fcfcfa',
        'editor.lineHighlightBackground': '#3e3d42',
        'editor.selectionBackground': '#535155',
        'editorCursor.foreground': '#fcfcfa',
        'editorLineNumber.foreground': '#90908a'
      }
    });

    // Tokyo Night Theme
    monaco.editor.defineTheme('tokyo-night', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '565f89', fontStyle: 'italic' },
        { token: 'keyword', foreground: '9d7cd8' },
        { token: 'string', foreground: '9ece6a' },
        { token: 'number', foreground: 'ff9e64' },
        { token: 'function', foreground: '7aa2f7' },
        { token: 'variable', foreground: 'c0caf5' },
        { token: 'type', foreground: '2ac3de' },
        { token: 'tag', foreground: 'f7768e' }
      ],
      colors: {
        'editor.background': '#1a1b26',
        'editor.foreground': '#a9b1d6',
        'editor.lineHighlightBackground': '#24283b',
        'editor.selectionBackground': '#364a82',
        'editorCursor.foreground': '#c0caf5',
        'editorLineNumber.foreground': '#3b4261'
      }
    });

    // Cobalt2 Theme
    monaco.editor.defineTheme('cobalt2', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '0088ff', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'ff9d00' },
        { token: 'string', foreground: '3ad900' },
        { token: 'number', foreground: 'ff628c' },
        { token: 'function', foreground: 'ffee80' },
        { token: 'variable', foreground: 'ffffff' }
      ],
      colors: {
        'editor.background': '#193549',
        'editor.foreground': '#ffffff',
        'editor.lineHighlightBackground': '#1f4662',
        'editor.selectionBackground': '#0050a4',
        'editorCursor.foreground': '#ffc600',
        'editorLineNumber.foreground': '#0088ff'
      }
    });

    // GitHub Dark Theme
    monaco.editor.defineTheme('github-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '8b949e', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'ff7b72' },
        { token: 'string', foreground: 'a5d6ff' },
        { token: 'number', foreground: '79c0ff' },
        { token: 'function', foreground: 'd2a8ff' },
        { token: 'variable', foreground: 'ffa657' }
      ],
      colors: {
        'editor.background': '#0d1117',
        'editor.foreground': '#c9d1d9',
        'editor.lineHighlightBackground': '#161b22',
        'editor.selectionBackground': '#3392ff44',
        'editorCursor.foreground': '#58a6ff',
        'editorLineNumber.foreground': '#8b949e'
      }
    });

    // GitHub Light Theme
    monaco.editor.defineTheme('github-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6e7781', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'cf222e' },
        { token: 'string', foreground: '0a3069' },
        { token: 'number', foreground: '0550ae' },
        { token: 'function', foreground: '8250df' },
        { token: 'variable', foreground: '953800' }
      ],
      colors: {
        'editor.background': '#ffffff',
        'editor.foreground': '#24292f',
        'editor.lineHighlightBackground': '#f6f8fa',
        'editor.selectionBackground': '#0969da1a',
        'editorCursor.foreground': '#0969da',
        'editorLineNumber.foreground': '#8c959f'
      }
    });

    // One Dark Theme
    monaco.editor.defineTheme('one-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '5c6370', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'c678dd' },
        { token: 'string', foreground: '98c379' },
        { token: 'number', foreground: 'd19a66' },
        { token: 'function', foreground: '61afef' },
        { token: 'variable', foreground: 'e06c75' }
      ],
      colors: {
        'editor.background': '#282c34',
        'editor.foreground': '#abb2bf',
        'editor.lineHighlightBackground': '#2c313c',
        'editor.selectionBackground': '#3e4451',
        'editorCursor.foreground': '#528bff',
        'editorLineNumber.foreground': '#5c6370'
      }
    });

    // Material Theme
    monaco.editor.defineTheme('material', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '546e7a', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'c792ea' },
        { token: 'string', foreground: 'c3e88d' },
        { token: 'number', foreground: 'f78c6c' },
        { token: 'function', foreground: '82aaff' },
        { token: 'variable', foreground: 'f07178' }
      ],
      colors: {
        'editor.background': '#263238',
        'editor.foreground': '#eeffff',
        'editor.lineHighlightBackground': '#00000050',
        'editor.selectionBackground': '#00000050',
        'editorCursor.foreground': '#ffcc00',
        'editorLineNumber.foreground': '#37474f'
      }
    });

    // Nord Theme
    monaco.editor.defineTheme('nord', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '616e88', fontStyle: 'italic' },
        { token: 'keyword', foreground: '81a1c1' },
        { token: 'string', foreground: 'a3be8c' },
        { token: 'number', foreground: 'b48ead' },
        { token: 'function', foreground: '88c0d0' },
        { token: 'variable', foreground: 'd8dee9' }
      ],
      colors: {
        'editor.background': '#2e3440',
        'editor.foreground': '#d8dee9',
        'editor.lineHighlightBackground': '#3b4252',
        'editor.selectionBackground': '#434c5e',
        'editorCursor.foreground': '#d8dee9',
        'editorLineNumber.foreground': '#4c566a'
      }
    });

    // Solarized Dark Theme
    monaco.editor.defineTheme('solarized-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '586e75', fontStyle: 'italic' },
        { token: 'keyword', foreground: '859900' },
        { token: 'string', foreground: '2aa198' },
        { token: 'number', foreground: 'd33682' },
        { token: 'function', foreground: '268bd2' },
        { token: 'variable', foreground: '839496' }
      ],
      colors: {
        'editor.background': '#002b36',
        'editor.foreground': '#839496',
        'editor.lineHighlightBackground': '#073642',
        'editor.selectionBackground': '#073642',
        'editorCursor.foreground': '#839496',
        'editorLineNumber.foreground': '#586e75'
      }
    });

    // Solarized Light Theme
    monaco.editor.defineTheme('solarized-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '93a1a1', fontStyle: 'italic' },
        { token: 'keyword', foreground: '859900' },
        { token: 'string', foreground: '2aa198' },
        { token: 'number', foreground: 'd33682' },
        { token: 'function', foreground: '268bd2' },
        { token: 'variable', foreground: '657b83' }
      ],
      colors: {
        'editor.background': '#fdf6e3',
        'editor.foreground': '#657b83',
        'editor.lineHighlightBackground': '#eee8d5',
        'editor.selectionBackground': '#eee8d5',
        'editorCursor.foreground': '#657b83',
        'editorLineNumber.foreground': '#93a1a1'
      }
    });

    // SynthWave '84 Theme
    monaco.editor.defineTheme('synthwave', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '848bbd', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'fede5d' },
        { token: 'string', foreground: 'ff8b39' },
        { token: 'number', foreground: 'f97e72' },
        { token: 'function', foreground: '36f9f6' },
        { token: 'variable', foreground: 'ff7edb' }
      ],
      colors: {
        'editor.background': '#2a2139',
        'editor.foreground': '#f0eff1',
        'editor.lineHighlightBackground': '#34294f',
        'editor.selectionBackground': '#463465',
        'editorCursor.foreground': '#fede5d',
        'editorLineNumber.foreground': '#848bbd'
      }
    });

    // Night Owl Theme
    monaco.editor.defineTheme('night-owl', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '637777', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'c792ea' },
        { token: 'string', foreground: 'ecc48d' },
        { token: 'number', foreground: 'f78c6c' },
        { token: 'function', foreground: '82aaff' },
        { token: 'variable', foreground: 'd6deeb' }
      ],
      colors: {
        'editor.background': '#011627',
        'editor.foreground': '#d6deeb',
        'editor.lineHighlightBackground': '#01121f',
        'editor.selectionBackground': '#1d3b53',
        'editorCursor.foreground': '#80a4c2',
        'editorLineNumber.foreground': '#4b6479'
      }
    });

    // Palenight Theme
    monaco.editor.defineTheme('palenight', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '676e95', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'c792ea' },
        { token: 'string', foreground: 'c3e88d' },
        { token: 'number', foreground: 'f78c6c' },
        { token: 'function', foreground: '82aaff' },
        { token: 'variable', foreground: 'f07178' }
      ],
      colors: {
        'editor.background': '#292d3e',
        'editor.foreground': '#a6accd',
        'editor.lineHighlightBackground': '#00000030',
        'editor.selectionBackground': '#717cb440',
        'editorCursor.foreground': '#ffcc00',
        'editorLineNumber.foreground': '#3a3f58'
      }
    });

    // Ayu Dark Theme
    monaco.editor.defineTheme('ayu-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '5c6773', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'ffa759' },
        { token: 'string', foreground: 'bae67e' },
        { token: 'number', foreground: 'ffcc66' },
        { token: 'function', foreground: 'ffd580' },
        { token: 'variable', foreground: 'cbccc6' }
      ],
      colors: {
        'editor.background': '#0a0e14',
        'editor.foreground': '#b3b1ad',
        'editor.lineHighlightBackground': '#00010a',
        'editor.selectionBackground': '#273747',
        'editorCursor.foreground': '#ff6a00',
        'editorLineNumber.foreground': '#3d424d'
      }
    });

    // Ayu Light Theme
    monaco.editor.defineTheme('ayu-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: 'comment', foreground: 'abb0b6', fontStyle: 'italic' },
        { token: 'keyword', foreground: 'fa8d3e' },
        { token: 'string', foreground: '86b300' },
        { token: 'number', foreground: 'ff9940' },
        { token: 'function', foreground: 'f2ae49' },
        { token: 'variable', foreground: '5c6773' }
      ],
      colors: {
        'editor.background': '#fafafa',
        'editor.foreground': '#5c6773',
        'editor.lineHighlightBackground': '#f2f2f2',
        'editor.selectionBackground': '#d1e4f4',
        'editorCursor.foreground': '#ff6a00',
        'editorLineNumber.foreground': '#abb0b6'
      }
    });
  };

  // Handle editor mount
  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor;
    defineCustomThemes(monaco);
    
    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      runCode();
    });
    
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      runCode();
    });
  };

  const runCode = () => {
    if (!iframeRef.current) return;
    
    setIsRunning(true);
    setConsoleOutput([]); // Clear previous console output
    
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
  ${code.html.replace(/<\/?html[^>]*>/gi, '').replace(/<\/?head[^>]*>/gi, '').replace(/<\/?body[^>]*>/gi, '').replace(/<style[^>]*>.*?<\/style>/gi, '')}
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
    
    ['log', 'error', 'warn', 'info', 'debug'].forEach(method => {
      console[method] = function(...args) {
        sendToParent(method, args);
        originalConsole[method].apply(console, args);
      };
    });
    
    window.onerror = function(msg, url, lineNo, columnNo, error) {
      console.error('Error at line ' + lineNo + ': ' + msg);
      return false;
    };
    
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
        setConsoleOutput(prev => {
          const newLog = {
            method: event.data.method,
            args: event.data.args,
            timestamp: new Date().toLocaleTimeString('en-US', { 
              hour12: false,
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })
          };
          return [...prev, newLog].slice(-100);
        });
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Auto-run on mount
  useEffect(() => {
    setTimeout(runCode, 100);
  }, []);

  const clearConsole = () => setConsoleOutput([]);
  
  const downloadCode = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Project</title>
  <style>
${code.css}
  </style>
</head>
<body>
${code.html}
  <script>
${code.javascript}
  </script>
</body>
</html>`;
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const tabs = [
    { key: 'javascript', label: 'JavaScript', icon: '{ }', color: 'text-yellow-500' },
    { key: 'html', label: 'HTML', icon: '</>', color: 'text-orange-500' },
    { key: 'css', label: 'CSS', icon: '#', color: 'text-blue-500' }
  ];

  return (
    <div ref={containerRef} className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      {/* Top Bar - PlayCode.io Style */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">JS</span>
            </div>
            <span className="text-white font-semibold">Playground</span>
          </div>
          
          {/* Run Button */}
          <button
            onClick={runCode}
            className={`px-4 py-1.5 rounded flex items-center gap-2 text-white font-medium transition-all ${
              isRunning 
                ? 'bg-orange-600 hover:bg-orange-700' 
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
        </div>

        {/* Right side controls */}
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
            >
              ⬌
            </button>
            <button
              onClick={() => setLayoutMode('vertical')}
              className={`px-3 py-1 text-sm ${layoutMode === 'vertical' ? 'bg-gray-600 text-white' : 'text-gray-400'} rounded-r transition-colors`}
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
            <optgroup label="Popular Themes">
              <option value="dracula">🧛 Dracula</option>
              <option value="monokai">🎨 Monokai</option>
              <option value="tokyo-night">🌃 Tokyo Night</option>
              <option value="cobalt2">💎 Cobalt2</option>
              <option value="one-dark">🔵 One Dark</option>
              <option value="synthwave">🌆 SynthWave</option>
              <option value="night-owl">🦉 Night Owl</option>
              <option value="github-dark">🐙 GitHub Dark</option>
              <option value="material">🎭 Material</option>
              <option value="nord">❄️ Nord</option>
              <option value="palenight">🌙 Palenight</option>
            </optgroup>
            <optgroup label="Light Themes">
              <option value="vs">☀️ Light</option>
              <option value="github-light">🐱 GitHub Light</option>
              <option value="solarized-light">🌞 Solarized Light</option>
              <option value="ayu-light">🌿 Ayu Light</option>
            </optgroup>
            <optgroup label="Dark Themes">
              <option value="vs-dark">🌑 VS Dark</option>
              <option value="solarized-dark">🌒 Solarized Dark</option>
              <option value="ayu-dark">🍃 Ayu Dark</option>
            </optgroup>
            <optgroup label="High Contrast">
              <option value="hc-black">⚫ High Contrast Dark</option>
              <option value="hc-light">⚪ High Contrast Light</option>
            </optgroup>
          </select>

          {/* Download Button */}
          <button
            onClick={downloadCode}
            className="text-gray-400 hover:text-white transition-colors"
            title="Download HTML file"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className={`flex-1 flex ${layoutMode === 'vertical' ? 'flex-col' : 'flex-row'} overflow-hidden`}>
        {/* Editor Section */}
        <div className={`${layoutMode === 'vertical' ? 'h-1/2' : 'w-1/2'} flex flex-col bg-gray-900`}>
          {/* Editor Tabs */}
          <div className="bg-gray-800 flex items-center px-2 border-b border-gray-700">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-sm font-medium transition-all flex items-center gap-2 ${
                  activeTab === tab.key
                    ? 'bg-gray-900 text-white border-b-2 border-blue-500'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <span className={tab.color}>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Monaco Editor */}
          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              language={activeTab}
              value={code[activeTab]}
              theme={editorTheme}
              onChange={(value) => setCode(prev => ({ ...prev, [activeTab]: value || '' }))}
              onMount={handleEditorMount}
              options={{
                minimap: { enabled: false },
                fontSize: fontSize,
                lineNumbers: 'on',
                roundedSelection: false,
                scrollBeyondLastLine: false,
                automaticLayout: true,
                tabSize: 2,
                wordWrap: 'on',
                padding: { top: 10, bottom: 10 },
                fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
                fontLigatures: true,
                renderLineHighlight: 'all',
                cursorBlinking: 'smooth',
                smoothScrolling: true
              }}
            />
          </div>
        </div>

        {/* Output Section */}
        <div className={`${layoutMode === 'vertical' ? 'h-1/2' : 'w-1/2'} flex flex-col bg-white`}>
          {/* Output Header */}
          <div className="bg-gray-100 px-4 py-2 border-b border-gray-300 flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Output</span>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-gray-600">Live Preview</span>
            </div>
          </div>

          {/* Preview iframe */}
          <div className={`flex-1 ${showConsole ? 'h-2/3' : 'h-full'}`}>
            <iframe
              ref={iframeRef}
              className="w-full h-full bg-white"
              title="Preview"
              sandbox="allow-scripts allow-modals allow-forms"
            />
          </div>

          {/* Console */}
          {showConsole && (
            <div className="h-1/3 flex flex-col border-t border-gray-300">
              <div className="bg-gray-800 px-4 py-2 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-300">Console</span>
                <button
                  onClick={clearConsole}
                  className="text-xs text-gray-400 hover:text-white transition-colors"
                >
                  Clear
                </button>
              </div>
              <div className="flex-1 bg-gray-900 p-3 overflow-y-auto font-mono text-xs">
                {consoleOutput.length === 0 ? (
                  <div className="text-gray-500">Console output will appear here...</div>
                ) : (
                  consoleOutput.map((log, i) => (
                    <div key={i} className={`mb-1 ${
                      log.method === 'error' ? 'text-red-400' :
                      log.method === 'warn' ? 'text-yellow-400' :
                      log.method === 'info' ? 'text-blue-400' :
                      'text-gray-300'
                    }`}>
                      <span className="text-gray-500">[{log.timestamp}]</span> {log.args.join(' ')}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800 border-t border-gray-700 px-4 py-1 flex items-center justify-between text-xs">
        <div className="flex items-center gap-4">
          <span className="text-gray-400">Ready</span>
          <span className="text-gray-400">UTF-8</span>
          <span className="text-gray-400">JavaScript</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-400">Ln 1, Col 1</span>
          <span className="text-gray-400">Spaces: 2</span>
        </div>
      </div>
    </div>
  );
};

// Export as named export for routes.jsx
export { Playground };