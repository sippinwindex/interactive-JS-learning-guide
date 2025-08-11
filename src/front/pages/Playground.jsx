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
  const [editorTheme, setEditorTheme] = useState('dracula');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  const iframeRef = useRef(null);
  const runTimeoutRef = useRef(null);
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
        { token: 'variable', foreground: 'c0caf5' }
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
  };

  // Handle editor mount - define themes
  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor;
    defineCustomThemes(monaco);
    
    // Add keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      runCode();
    });
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

  // Load example code
  const loadExample = (exampleKey) => {
    console.log('Loading example:', exampleKey);
    
    // Define examples directly in the component for now
    const examples = {
      calculator: {
        name: '🧮 Calculator',
        html: `<div class="calculator">
  <h1>Calculator</h1>
  <input type="text" id="display" readonly value="0">
  <div class="buttons">
    <button onclick="clearDisplay()">C</button>
    <button onclick="appendToDisplay('/')">÷</button>
    <button onclick="appendToDisplay('*')">×</button>
    <button onclick="deleteLast()">←</button>
    <button onclick="appendToDisplay('7')">7</button>
    <button onclick="appendToDisplay('8')">8</button>
    <button onclick="appendToDisplay('9')">9</button>
    <button onclick="appendToDisplay('-')">-</button>
    <button onclick="appendToDisplay('4')">4</button>
    <button onclick="appendToDisplay('5')">5</button>
    <button onclick="appendToDisplay('6')">6</button>
    <button onclick="appendToDisplay('+')">+</button>
    <button onclick="appendToDisplay('1')">1</button>
    <button onclick="appendToDisplay('2')">2</button>
    <button onclick="appendToDisplay('3')">3</button>
    <button onclick="calculate()">=</button>
    <button onclick="appendToDisplay('0')">0</button>
    <button onclick="appendToDisplay('.')">.</button>
  </div>
</div>`,
        css: `body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: linear-gradient(135deg, #667eea, #764ba2);
}

.calculator {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

h1 {
  text-align: center;
  color: #667eea;
}

#display {
  width: 100%;
  padding: 10px;
  font-size: 24px;
  text-align: right;
  margin-bottom: 10px;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

button {
  padding: 20px;
  font-size: 18px;
  border: none;
  border-radius: 5px;
  background: #f0f0f0;
  cursor: pointer;
}

button:hover {
  background: #e0e0e0;
}

button:active {
  transform: scale(0.95);
}`,
        javascript: `let display = document.getElementById('display');
let currentValue = '0';
let shouldResetDisplay = false;

function updateDisplay() {
  display.value = currentValue;
}

function clearDisplay() {
  currentValue = '0';
  updateDisplay();
}

function appendToDisplay(value) {
  if (shouldResetDisplay) {
    currentValue = '0';
    shouldResetDisplay = false;
  }
  
  if (currentValue === '0' && value !== '.') {
    currentValue = value;
  } else {
    currentValue += value;
  }
  
  updateDisplay();
}

function deleteLast() {
  if (currentValue.length > 1) {
    currentValue = currentValue.slice(0, -1);
  } else {
    currentValue = '0';
  }
  updateDisplay();
}

function calculate() {
  try {
    currentValue = eval(currentValue).toString();
    shouldResetDisplay = true;
    updateDisplay();
  } catch (error) {
    currentValue = 'Error';
    shouldResetDisplay = true;
    updateDisplay();
  }
}`
      },
      todo: {
        name: '✅ To-Do List',
        html: `<div class="todo-app">
  <h1>✅ To-Do List</h1>
  <div class="input-section">
    <input type="text" id="taskInput" placeholder="Add a new task...">
    <button onclick="addTask()">Add</button>
  </div>
  <ul id="taskList"></ul>
  <div class="footer">
    <span id="taskCount">0 tasks</span>
    <button onclick="clearCompleted()">Clear Completed</button>
  </div>
</div>`,
        css: `body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: linear-gradient(135deg, #a8edea, #fed6e3);
}

.todo-app {
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  width: 400px;
}

h1 {
  text-align: center;
  color: #333;
}

.input-section {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

#taskInput {
  flex: 1;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background: #5569d8;
}

#taskList {
  list-style: none;
  padding: 0;
  margin: 20px 0;
}

.task-item {
  display: flex;
  align-items: center;
  padding: 10px;
  background: #f8f9fa;
  margin-bottom: 10px;
  border-radius: 5px;
}

.task-item.completed {
  opacity: 0.6;
  text-decoration: line-through;
}

.task-item input[type="checkbox"] {
  margin-right: 10px;
}

.task-item button {
  margin-left: auto;
  padding: 5px 10px;
  background: #ff6b6b;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 2px solid #eee;
}`,
        javascript: `let tasks = [];

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task-item' + (task.completed ? ' completed' : '');
    li.innerHTML = \`
      <input type="checkbox" \${task.completed ? 'checked' : ''} 
             onchange="toggleTask(\${index})">
      <span>\${task.text}</span>
      <button onclick="deleteTask(\${index})">Delete</button>
    \`;
    taskList.appendChild(li);
  });
  
  updateCount();
}

function addTask() {
  const input = document.getElementById('taskInput');
  if (input.value.trim() === '') return;
  
  tasks.push({
    text: input.value,
    completed: false
  });
  
  input.value = '';
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter(task => !task.completed);
  renderTasks();
}

function updateCount() {
  const count = tasks.filter(t => !t.completed).length;
  document.getElementById('taskCount').textContent = count + ' task' + (count !== 1 ? 's' : '');
}

// Allow Enter key to add tasks
document.getElementById('taskInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

renderTasks();`
      },
      clock: {
        name: '🕐 Digital Clock',
        html: `<div class="clock-container">
  <h1>🕐 Digital Clock</h1>
  <div class="clock">
    <div id="time">00:00:00</div>
    <div id="date">Loading...</div>
  </div>
  <div class="controls">
    <button onclick="toggleFormat()">Toggle 12/24 Hour</button>
  </div>
</div>`,
        css: `body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
}

.clock-container {
  text-align: center;
}

h1 {
  color: white;
  margin-bottom: 30px;
}

.clock {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 30px 50px;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

#time {
  font-size: 4rem;
  color: #00ff88;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
}

#date {
  font-size: 1.2rem;
  color: #88ccff;
  margin-top: 10px;
}

.controls {
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid white;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background: rgba(255, 255, 255, 0.3);
}`,
        javascript: `let is24Hour = true;

function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let period = '';
  
  if (!is24Hour) {
    period = hours >= 12 ? ' PM' : ' AM';
    hours = hours % 12 || 12;
  }
  
  const timeString = 
    String(hours).padStart(2, '0') + ':' +
    String(minutes).padStart(2, '0') + ':' +
    String(seconds).padStart(2, '0') + period;
  
  document.getElementById('time').textContent = timeString;
  
  const dateOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  document.getElementById('date').textContent = now.toLocaleDateString('en-US', dateOptions);
}

function toggleFormat() {
  is24Hour = !is24Hour;
  updateClock();
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock(); // Initial call`
      }
    };
    
    const example = examples[exampleKey];
    if (example) {
      setCode({
        html: example.html || '',
        css: example.css || '',
        javascript: example.javascript || ''
      });
      setShowExamples(false);
      setTimeout(runCode, 100);
    }
  };

  const clearConsole = () => setConsoleOutput([]);

  const tabs = [
    { key: 'html', label: 'HTML', language: 'html' },
    { key: 'css', label: 'CSS', language: 'css' },
    { key: 'javascript', label: 'JavaScript', language: 'javascript' }
  ];

  return (
    <div ref={containerRef} className={`${isFullscreen ? 'fixed inset-0 z-50 bg-gray-900 overflow-hidden' : 'min-h-screen bg-gray-50 dark:bg-gray-900 pt-16'}`}>
      <div className={`${isFullscreen ? 'h-full p-4' : 'max-w-7xl mx-auto px-4 py-8'}`}>
        {/* Header */}
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm ${isFullscreen ? 'p-4 mb-4' : 'p-6 mb-6'}`}>
          <div className="flex justify-between items-center">
            <div>
              <h1 className={`${isFullscreen ? 'text-2xl' : 'text-3xl'} font-bold text-gray-800 dark:text-white`}>
                🚀 VS Code Playground
              </h1>
              {!isFullscreen && (
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  Write HTML, CSS, and JavaScript with live preview
                </p>
              )}
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExamples(!showExamples)}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                📚 Examples
              </button>
              <button
                onClick={toggleFullscreen}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              >
                {isFullscreen ? '🗗 Exit' : '⛶ Fullscreen'}
              </button>
            </div>
          </div>
          
          {/* Examples Dropdown */}
          {showExamples && (
            <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Choose an Example:</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <button
                  onClick={() => loadExample('calculator')}
                  className="p-3 bg-white dark:bg-gray-600 rounded-lg hover:shadow-md transition-all text-left"
                >
                  <div className="font-medium text-gray-800 dark:text-white">🧮 Calculator</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Interactive calculator with operations</div>
                </button>
                
                <button
                  onClick={() => loadExample('todo')}
                  className="p-3 bg-white dark:bg-gray-600 rounded-lg hover:shadow-md transition-all text-left"
                >
                  <div className="font-medium text-gray-800 dark:text-white">✅ To-Do List</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Task manager with add/delete</div>
                </button>
                
                <button
                  onClick={() => loadExample('clock')}
                  className="p-3 bg-white dark:bg-gray-600 rounded-lg hover:shadow-md transition-all text-left"
                >
                  <div className="font-medium text-gray-800 dark:text-white">🕐 Digital Clock</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Animated clock with date display</div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Main Editor Area - Adjusts height in fullscreen */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-6 ${isFullscreen ? 'h-[calc(100vh-120px)]' : ''}`}>
          {/* Editor Panel */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden flex flex-col">
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
            
            {/* Monaco Editor - Dynamic height */}
            <div className="flex-1" style={{ height: isFullscreen ? 'calc(100% - 120px)' : '500px' }}>
              <Editor
                height="100%"
                language={tabs.find(t => t.key === activeTab)?.language}
                value={code[activeTab]}
                theme={editorTheme}
                onChange={(value) => setCode(prev => ({ ...prev, [activeTab]: value || '' }))}
                onMount={handleEditorMount}
                options={{
                  minimap: { enabled: isFullscreen },
                  fontSize: isFullscreen ? 16 : 14,
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
                  <optgroup label="Popular Themes">
                    <option value="dracula">🧛 Dracula</option>
                    <option value="monokai">🎨 Monokai Pro</option>
                    <option value="tokyo-night">🌃 Tokyo Night</option>
                    <option value="cobalt2">💎 Cobalt2</option>
                    <option value="one-dark">🔵 One Dark Pro</option>
                    <option value="synthwave">🌆 SynthWave '84</option>
                    <option value="night-owl">🦉 Night Owl</option>
                    <option value="github-dark">🐙 GitHub Dark</option>
                  </optgroup>
                  <optgroup label="Classic Themes">
                    <option value="vs-dark">🌑 Dark (Visual Studio)</option>
                    <option value="vs">☀️ Light (Visual Studio)</option>
                    <option value="hc-black">⚫ High Contrast Dark</option>
                    <option value="hc-light">⚪ High Contrast Light</option>
                  </optgroup>
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

          {/* Output Panel - Adjusts in fullscreen */}
          <div className={`${isFullscreen ? 'flex flex-col h-full' : 'space-y-6'}`}>
            {/* Preview - Expands in fullscreen */}
            <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden ${isFullscreen ? 'flex-1 flex flex-col' : ''}`}>
              <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Preview</h3>
              </div>
              <iframe
                ref={iframeRef}
                className={`w-full bg-white ${isFullscreen ? 'flex-1' : ''}`}
                style={{ height: isFullscreen ? '100%' : '400px' }}
                title="Preview"
                sandbox="allow-scripts"
              />
            </div>
            
            {/* Console - Expands in fullscreen */}
            <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden ${isFullscreen ? 'h-1/3' : ''}`}>
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
              <div 
                className="p-4 bg-gray-900 text-green-400 font-mono text-sm overflow-y-auto" 
                style={{ height: isFullscreen ? 'calc(100% - 45px)' : '200px' }}
              >
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