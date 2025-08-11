// Monaco editor mount handler
  const handleEditorMount = (editor, monaco) => {
    // Define all custom themes
    defineCustomThemes(monaco);
    
    // Add VS Code keybindings
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
      console.log('💾 Code saved (Ctrl+S)');
    });
    
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      runCode();
    });
  };import React, { useState, useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { themeList, defineCustomThemes } from './MonacoThemes';

const Playground = () => {
  // Professional templates for learning
  const templates = {
    welcome: {
      name: '👋 Welcome Tutorial',
      description: 'Start here to learn the basics',
      html: `<!-- Welcome to the VS Code-like Playground! -->
<!DOCTYPE html>
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
            <li>📝 Multi-cursor editing (Alt+Click)</li>
        </ul>
        
        <button id="startBtn" class="start-button">
            Click to Start Learning!
        </button>
        
        <div id="output" class="output-area"></div>
    </div>
</body>
</html>`,
      css: `/* VS Code-like Playground Styles */
* {
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
    animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

h1 {
    color: #667eea;
    margin-bottom: 20px;
    font-size: 2.5rem;
    text-align: center;
}

ul {
    list-style: none;
    padding: 20px 0;
}

li {
    padding: 10px;
    margin: 5px 0;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #667eea;
    transition: transform 0.2s;
}

li:hover {
    transform: translateX(10px);
    background: #e9ecef;
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
}

.start-button:active {
    transform: translateY(0);
}

.output-area {
    margin-top: 20px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 10px;
    min-height: 100px;
    display: none;
    animation: fadeIn 0.3s ease-out;
}

.output-area.show {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

.success-message {
    color: #28a745;
    font-size: 1.2rem;
    font-weight: bold;
}`,
      javascript: `// Welcome to the VS Code-like JavaScript editor!
// You get IntelliSense, error checking, and more!

console.log('🚀 VS Code Playground Initialized!');
console.log('💡 Try typing "document." and see the IntelliSense!');

// Get DOM elements
const button = document.getElementById('startBtn');
const output = document.getElementById('output');

// Track learning progress
let clickCount = 0;
const lessons = [
    '🎯 Great! You clicked the button!',
    '📚 Now try modifying the code above',
    '✏️ Change the button text in the HTML',
    '🎨 Try changing colors in the CSS',
    '⚡ Add a new console.log() statement',
    '🏆 Excellent! You are learning fast!'
];

// Add event listener with IntelliSense support
button?.addEventListener('click', function(event) {
    // Show output area
    output.classList.add('show');
    
    // Display progressive messages
    const message = lessons[Math.min(clickCount, lessons.length - 1)];
    
    output.innerHTML = \`
        <div class="success-message">
            \${message}
        </div>
        <p>Click count: \${clickCount + 1}</p>
        <p>Timestamp: \${new Date().toLocaleTimeString()}</p>
    \`;
    
    // Animate button
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'scale(1)';
    }, 200);
    
    clickCount++;
    
    // Log to console (check the console panel!)
    console.log('Button clicked!', {
        count: clickCount,
        message: message,
        timestamp: new Date().toISOString()
    });
});

// Demonstrate IntelliSense with different types
const student = {
    name: 'New Coder',
    level: 1,
    skills: ['HTML', 'CSS', 'JavaScript'],
    
    // Method with JSDoc comment for IntelliSense
    /**
     * Level up the student
     * @param {string} newSkill - The new skill learned
     * @returns {number} The new level
     */
    levelUp(newSkill) {
        this.skills.push(newSkill);
        this.level++;
        console.log(\`🎉 Leveled up to \${this.level}! New skill: \${newSkill}\`);
        return this.level;
    }
};

// Try typing "student." to see IntelliSense suggestions!
console.log('Student profile:', student);

// Demonstrate error detection - uncomment the line below to see an error
// console.log(undefinedVariable);

// Pro tip: Try these shortcuts:
// - Ctrl+Space: Trigger IntelliSense
// - F1: Command palette
// - Ctrl+/: Toggle comment
// - Alt+Shift+F: Format document
// - Ctrl+D: Select next occurrence`
    },
    interactive: {
      name: '🎮 Interactive App',
      description: 'Build an interactive web application',
      html: `<div class="app">
    <header class="app-header">
        <h1>🎮 Interactive Dashboard</h1>
        <div class="stats">
            <div class="stat-card">
                <span class="stat-value" id="score">0</span>
                <span class="stat-label">Score</span>
            </div>
            <div class="stat-card">
                <span class="stat-value" id="level">1</span>
                <span class="stat-label">Level</span>
            </div>
            <div class="stat-card">
                <span class="stat-value" id="time">00:00</span>
                <span class="stat-label">Time</span>
            </div>
        </div>
    </header>

    <main class="app-main">
        <div class="control-panel">
            <input type="text" id="nameInput" placeholder="Enter your name..." class="input-field">
            <button id="actionBtn" class="action-btn">Start Game</button>
        </div>

        <div class="game-area" id="gameArea">
            <canvas id="canvas" width="600" height="400"></canvas>
        </div>

        <div class="progress-bar">
            <div class="progress-fill" id="progressBar"></div>
        </div>
    </main>
</div>`,
      css: `.app {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.app-header {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 30px;
    border-radius: 15px;
    margin-bottom: 30px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
}

.app-header h1 {
    margin: 0 0 20px 0;
    font-size: 2.5rem;
    text-align: center;
}

.stats {
    display: flex;
    justify-content: center;
    gap: 30px;
}

.stat-card {
    background: rgba(255,255,255,0.2);
    padding: 15px 25px;
    border-radius: 10px;
    text-align: center;
    backdrop-filter: blur(10px);
    transition: transform 0.3s;
}

.stat-card:hover {
    transform: translateY(-5px);
    background: rgba(255,255,255,0.3);
}

.stat-value {
    display: block;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 5px;
}

.stat-label {
    font-size: 0.9rem;
    opacity: 0.9;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.app-main {
    background: white;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 5px 20px rgba(0,0,0,0.1);
}

.control-panel {
    display: flex;
    gap: 15px;
    margin-bottom: 30px;
}

.input-field {
    flex: 1;
    padding: 12px 20px;
    font-size: 16px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    transition: border-color 0.3s;
}

.input-field:focus {
    outline: none;
    border-color: #667eea;
}

.action-btn {
    padding: 12px 30px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background: linear-gradient(135deg, #4CAF50, #45a049);
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
}

.action-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(76, 175, 80, 0.3);
}

#canvas {
    background: white;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.progress-bar {
    height: 30px;
    background: #e0e0e0;
    border-radius: 15px;
    overflow: hidden;
    position: relative;
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, #4CAF50, #8BC34A);
    width: 0%;
    transition: width 0.3s ease;
}`,
      javascript: `// Interactive Dashboard Demo
console.log('🎮 Interactive Dashboard Loading...');

// Game state
const gameState = {
    score: 0,
    level: 1,
    isPlaying: false,
    playerName: '',
    startTime: null
};

// DOM Elements
const elements = {
    scoreEl: document.getElementById('score'),
    levelEl: document.getElementById('level'),
    timeEl: document.getElementById('time'),
    nameInput: document.getElementById('nameInput'),
    actionBtn: document.getElementById('actionBtn'),
    progressBar: document.getElementById('progressBar'),
    canvas: document.getElementById('canvas'),
    ctx: document.getElementById('canvas')?.getContext('2d')
};

// Initialize canvas
function initCanvas() {
    const { canvas, ctx } = elements;
    if (!ctx) return;
    
    // Draw welcome message
    ctx.fillStyle = '#667eea';
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('🎮 Ready to Play!', canvas.width / 2, canvas.height / 2);
}

// Handle canvas click
elements.canvas?.addEventListener('click', (e) => {
    if (!gameState.isPlaying) return;
    
    // Update score
    gameState.score += 10;
    elements.scoreEl.textContent = gameState.score;
    
    // Update progress
    const progress = (gameState.score % 100);
    elements.progressBar.style.width = progress + '%';
    
    // Level up every 100 points
    if (gameState.score % 100 === 0) {
        gameState.level++;
        elements.levelEl.textContent = gameState.level;
    }
});

// Start/Stop game
elements.actionBtn?.addEventListener('click', () => {
    if (!gameState.isPlaying) {
        gameState.playerName = elements.nameInput.value || 'Player';
        gameState.isPlaying = true;
        gameState.startTime = Date.now();
        elements.actionBtn.textContent = 'Stop Game';
        console.log(\`🎮 Game started for \${gameState.playerName}!\`);
    } else {
        gameState.isPlaying = false;
        elements.actionBtn.textContent = 'Start Game';
        console.log('Game stopped!');
    }
});

// Initialize
initCanvas();
console.log('✅ Dashboard ready!');`
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
  const [selectedTemplate, setSelectedTemplate] = useState('welcome');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [splitView, setSplitView] = useState('vertical'); // vertical or horizontal
  const [showConsole, setShowConsole] = useState(true);
  const [editorTheme, setEditorTheme] = useState('dracula');
  
  const iframeRef = useRef(null);
  const runTimeoutRef = useRef(null);
  const containerRef = useRef(null);

  // Monaco Editor configuration
  const editorOptions = {
    fontSize: 14,
    fontFamily: "'Fira Code', 'Cascadia Code', 'Consolas', monospace",
    fontLigatures: true,
    quickSuggestions: true,
    parameterHints: { enabled: true },
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: "on",
    tabCompletion: "on",
    wordBasedSuggestions: true,
    minimap: { enabled: true },
    scrollBeyondLastLine: false,
    wordWrap: "on",
    lineNumbers: "on",
    renderLineHighlight: "all",
    formatOnPaste: true,
    formatOnType: true,
    autoIndent: "full",
    autoClosingBrackets: "always",
    autoClosingQuotes: "always",
    bracketPairColorization: { enabled: true },
    scrollbar: {
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10,
      useShadows: false
    },
    mouseWheelZoom: true,
    smoothScrolling: true,
    cursorBlinking: "smooth",
    cursorSmoothCaretAnimation: true,
    automaticLayout: true
  };

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
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      margin: 0; 
      padding: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    ${code.css}
  </style>
</head>
<body>
  ${code.html.replace(/<\/?html[^>]*>/gi, '').replace(/<\/?head[^>]*>/gi, '').replace(/<\/?body[^>]*>/gi, '').replace(/<title[^>]*>.*?<\/title>/gi, '')}
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
      console.error('Runtime Error at line ' + lineNo + ': ' + msg);
      return false;
    };
    
    try {
      ${code.javascript}
    } catch (error) {
      console.error('Execution Error:', error.message);
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
          return [...prev, newLog].slice(-200);
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

  // Fullscreen handling
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const clearConsole = () => setConsoleOutput([]);

  const loadTemplate = (templateKey) => {
    const template = templates[templateKey];
    if (template) {
      setCode({
        html: template.html,
        css: template.css,
        javascript: template.javascript
      });
      setSelectedTemplate(templateKey);
      clearConsole();
    }
  };

  const tabs = [
    { key: 'html', label: 'HTML', icon: '📄', language: 'html' },
    { key: 'css', label: 'CSS', icon: '🎨', language: 'css' },
    { key: 'javascript', label: 'JavaScript', icon: '⚡', language: 'javascript' }
  ];

  return (
    <div 
      ref={containerRef}
      className={`${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} bg-gray-900 text-white flex flex-col`}
    >
      {/* VS Code-like Header */}
      <div className="bg-gray-800 border-b border-gray-700 flex-shrink-0">
        <div className="flex items-center justify-between p-2">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              VS Code Playground
            </h1>
            {isRunning && (
              <span className="text-xs px-2 py-1 bg-green-600 rounded animate-pulse">
                RUNNING
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {/* Template Selector */}
            <select 
              value={selectedTemplate}
              onChange={(e) => loadTemplate(e.target.value)}
              className="bg-gray-700 text-sm px-3 py-1 rounded border border-gray-600 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              {Object.entries(templates).map(([key, template]) => (
                <option key={key} value={key}>
                  {template.name}
                </option>
              ))}
            </select>
            
            {/* Theme Selector */}
            <select 
              value={editorTheme}
              onChange={(e) => setEditorTheme(e.target.value)}
              className="bg-gray-700 text-sm px-3 py-1 rounded border border-gray-600 focus:outline-none focus:border-blue-500 cursor-pointer"
              title="Select Editor Theme"
            >
              <optgroup label="Popular Themes">
                <option value="dracula">🧛 Dracula</option>
                <option value="monokai">🎨 Monokai Pro</option>
                <option value="cobalt2">💎 Cobalt2</option>
                <option value="tokyo-night">🌃 Tokyo Night</option>
                <option value="one-dark">🔵 One Dark Pro</option>
                <option value="material">🎭 Material Theme</option>
                <option value="synthwave">🌆 SynthWave '84</option>
                <option value="night-owl">🦉 Night Owl</option>
              </optgroup>
              <optgroup label="Light Themes">
                <option value="vs">☀️ Light (Visual Studio)</option>
                <option value="github-light">🐱 GitHub Light</option>
                <option value="solarized-light">🌞 Solarized Light</option>
                <option value="ayu-light">🌿 Ayu Light</option>
              </optgroup>
              <optgroup label="Dark Themes">
                <option value="vs-dark">🌑 Dark (Visual Studio)</option>
                <option value="github-dark">🐙 GitHub Dark</option>
                <option value="nord">❄️ Nord</option>
                <option value="palenight">🌙 Palenight</option>
                <option value="solarized-dark">🌒 Solarized Dark</option>
                <option value="ayu-dark">🍃 Ayu Dark</option>
              </optgroup>
              <optgroup label="High Contrast">
                <option value="hc-black">⚫ High Contrast Black</option>
                <option value="hc-light">⚪ High Contrast Light</option>
              </optgroup>
            </select>
            
            {/* Auto-run Toggle */}
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input 
                type="checkbox"
                checked={autoRun}
                onChange={(e) => setAutoRun(e.target.checked)}
                className="rounded cursor-pointer"
              />
              Auto-run
            </label>
            
            {/* View Options */}
            <div className="flex items-center gap-1 bg-gray-700 rounded p-1">
              <button
                onClick={() => setSplitView('vertical')}
                className={`p-1 rounded ${splitView === 'vertical' ? 'bg-gray-600' : ''}`}
                title="Vertical Split"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <rect x="2" y="2" width="7" height="16" />
                  <rect x="11" y="2" width="7" height="16" />
                </svg>
              </button>
              <button
                onClick={() => setSplitView('horizontal')}
                className={`p-1 rounded ${splitView === 'horizontal' ? 'bg-gray-600' : ''}`}
                title="Horizontal Split"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <rect x="2" y="2" width="16" height="7" />
                  <rect x="2" y="11" width="16" height="7" />
                </svg>
              </button>
            </div>
            
            {/* Console Toggle */}
            <button
              onClick={() => setShowConsole(!showConsole)}
              className="p-1 hover:bg-gray-700 rounded"
              title="Toggle Console"
            >
              📋
            </button>
            
            {/* Run Button */}
            <button 
              onClick={runCode}
              className="px-4 py-1 bg-green-600 hover:bg-green-700 rounded text-sm font-medium transition-colors flex items-center gap-2"
            >
              ▶ Run
            </button>
            
            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="p-1 hover:bg-gray-700 rounded"
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              {isFullscreen ? '🗗' : '⛶'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex ${splitView === 'horizontal' ? 'flex-col' : 'flex-row'} overflow-hidden`}>
        {/* Editor Panel */}
        <div className={`${splitView === 'horizontal' ? 'h-1/2' : 'w-1/2'} border-r border-gray-700 flex flex-col`}>
          {/* File Tabs */}
          <div className="bg-gray-800 flex border-b border-gray-700 flex-shrink-0">
            {tabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-4 py-2 text-sm font-medium transition-colors flex items-center gap-2 border-r border-gray-700 ${
                  activeTab === tab.key
                    ? 'bg-gray-900 text-white border-t-2 border-t-blue-500'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Monaco Editor */}
          <div className="flex-1 overflow-hidden">
            <Editor
              height="100%"
              language={tabs.find(t => t.key === activeTab)?.language}
              value={code[activeTab]}
              theme={editorTheme}
              onChange={(value) => setCode(prev => ({ ...prev, [activeTab]: value || '' }))}
              onMount={handleEditorMount}
              options={editorOptions}
              loading={
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <div>Loading VS Code Editor...</div>
                  </div>
                </div>
              }
            />
          </div>
        </div>

        {/* Output Panel */}
        <div className={`${splitView === 'horizontal' ? 'h-1/2' : 'w-1/2'} flex flex-col`}>
          {/* Preview */}
          <div className={`${showConsole ? 'flex-1' : 'h-full'} flex flex-col`}>
            <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 text-sm font-medium flex-shrink-0">
              👁️ Preview
            </div>
            <iframe
              ref={iframeRef}
              className="flex-1 bg-white"
              title="Preview"
              sandbox="allow-scripts"
            />
          </div>
          
          {/* Console */}
          {showConsole && (
            <div className="h-48 flex flex-col border-t border-gray-700">
              <div className="bg-gray-800 px-4 py-2 flex justify-between items-center text-sm flex-shrink-0">
                <span>Console ({consoleOutput.length})</span>
                <button 
                  onClick={clearConsole}
                  className="text-gray-400 hover:text-white"
                >
                  Clear
                </button>
              </div>
              <div className="flex-1 bg-gray-950 p-3 overflow-y-auto font-mono text-sm">
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
    </div>
  );
};

export default Playground;