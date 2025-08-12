// src/front/components/playground/EnhancedPlayground.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import EnhancedMonacoEditor from './EnhancedMonacoEditor';
import { 
  enhancedRunCode, 
  createAutoSave, 
  storage, 
  exportProject, 
  importProject,
  getFileLanguage,
  codeSnippets 
} from './utils/enhancedPlaygroundUtils';

const EnhancedPlayground = () => {
  // State management
  const [files, setFiles] = useState(() => {
    // Load from localStorage or use default files
    const saved = storage.load('playground-files');
    return saved || {
      'index.html': {
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Project</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>Welcome to the Playground!</h1>
    <p>Start coding and see your changes live.</p>
    <button id="myButton">Click Me!</button>
    <div id="output"></div>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
        language: 'html'
      },
      'style.css': {
        content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  text-align: center;
  max-width: 500px;
  width: 90%;
}

h1 {
  color: #333;
  margin-bottom: 1rem;
}

p {
  color: #666;
  margin-bottom: 2rem;
}

#myButton {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 16px;
  border-radius: 25px;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

#myButton:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(102, 126, 234, 0.4);
}

#myButton:active {
  transform: translateY(0);
}

#output {
  margin-top: 2rem;
  padding: 1rem;
  background: #f7f7f7;
  border-radius: 5px;
  min-height: 50px;
  color: #333;
}`,
        language: 'css'
      },
      'script.js': {
        content: `// Get references to DOM elements
const button = document.getElementById('myButton');
const output = document.getElementById('output');

// Counter to track clicks
let clickCount = 0;

// Add click event listener
button.addEventListener('click', function() {
  clickCount++;
  
  // Update output with animation
  output.style.opacity = '0';
  
  setTimeout(() => {
    output.innerHTML = \`
      <strong>Button clicked \${clickCount} time\${clickCount !== 1 ? 's' : ''}!</strong>
      <br>
      <small>Timestamp: \${new Date().toLocaleTimeString()}</small>
    \`;
    output.style.opacity = '1';
  }, 200);
  
  // Log to console
  console.log(\`Button clicked! Count: \${clickCount}\`);
});

// Initialize
console.log('JavaScript loaded and ready!');`,
        language: 'javascript'
      }
    };
  });

  const [activeFile, setActiveFile] = useState('index.html');
  const [theme, setTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [isConsoleVisible, setIsConsoleVisible] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [selectedLibraries, setSelectedLibraries] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [splitView, setSplitView] = useState('horizontal'); // horizontal or vertical
  const [previewSize, setPreviewSize] = useState(50); // percentage
  
  // Refs
  const iframeRef = useRef(null);
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const resizeRef = useRef(null);
  const autoSaveRef = useRef(null);

  // Available libraries
  const availableLibraries = [
    { id: 'react', name: 'React', icon: '⚛️' },
    { id: 'vue', name: 'Vue.js', icon: '🔥' },
    { id: 'jquery', name: 'jQuery', icon: '$' },
    { id: 'bootstrap', name: 'Bootstrap', icon: '🅱️' },
    { id: 'tailwind', name: 'Tailwind CSS', icon: '💨' },
    { id: 'three', name: 'Three.js', icon: '🎲' },
    { id: 'd3', name: 'D3.js', icon: '📊' },
    { id: 'chart', name: 'Chart.js', icon: '📈' },
    { id: 'gsap', name: 'GSAP', icon: '🎬' },
    { id: 'anime', name: 'Anime.js', icon: '✨' }
  ];

  // Initialize auto-save
  useEffect(() => {
    autoSaveRef.current = createAutoSave(() => {
      storage.save('playground-files', files);
      console.log('Auto-saved at', new Date().toLocaleTimeString());
    }, 2000);

    return () => {
      if (autoSaveRef.current) {
        autoSaveRef.current.cancel();
      }
    };
  }, [files]);

  // Update preview when files change
  useEffect(() => {
    if (iframeRef.current) {
      const result = enhancedRunCode(files, iframeRef.current, {
        enableConsoleCapture: true,
        enableErrorHandling: true,
        libraries: selectedLibraries
      });
      
      if (result.error) {
        addConsoleMessage('error', `Error: ${result.error}`);
      }
    }
  }, [files, selectedLibraries]);

  // Listen for console messages from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'console') {
        addConsoleMessage(event.data.method, ...event.data.args);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // File operations
  const updateFile = useCallback((filename, content) => {
    setFiles(prev => ({
      ...prev,
      [filename]: {
        ...prev[filename],
        content
      }
    }));
    
    if (autoSaveRef.current) {
      autoSaveRef.current.trigger();
    }
  }, []);

  const createFile = useCallback(() => {
    const filename = prompt('Enter filename (e.g., app.js, styles.css):');
    if (filename && !files[filename]) {
      const language = getFileLanguage(filename);
      setFiles(prev => ({
        ...prev,
        [filename]: {
          content: '',
          language
        }
      }));
      setActiveFile(filename);
    }
  }, [files]);

  const deleteFile = useCallback((filename) => {
    if (Object.keys(files).length > 1 && confirm(`Delete ${filename}?`)) {
      setFiles(prev => {
        const newFiles = { ...prev };
        delete newFiles[filename];
        return newFiles;
      });
      
      if (activeFile === filename) {
        setActiveFile(Object.keys(files)[0]);
      }
    }
  }, [files, activeFile]);

  const renameFile = useCallback((oldName) => {
    const newName = prompt('Enter new filename:', oldName);
    if (newName && newName !== oldName && !files[newName]) {
      setFiles(prev => {
        const newFiles = { ...prev };
        newFiles[newName] = newFiles[oldName];
        delete newFiles[oldName];
        return newFiles;
      });
      
      if (activeFile === oldName) {
        setActiveFile(newName);
      }
    }
  }, [files, activeFile]);

  // Console operations
  const addConsoleMessage = useCallback((method, ...args) => {
    setConsoleOutput(prev => [...prev, {
      method,
      args,
      timestamp: new Date().toLocaleTimeString()
    }]);
  }, []);

  const clearConsole = useCallback(() => {
    setConsoleOutput([]);
  }, []);

  // Export/Import operations
  const handleExport = useCallback(() => {
    const projectName = prompt('Enter project name:', 'my-project');
    if (projectName) {
      exportProject(files, projectName);
    }
  }, [files]);

  const handleImport = useCallback(async () => {
    try {
      const projectData = await importProject();
      setFiles(projectData.files);
      setActiveFile(Object.keys(projectData.files)[0]);
      addConsoleMessage('info', `Imported project: ${projectData.name}`);
    } catch (error) {
      addConsoleMessage('error', error.message);
    }
  }, []);

  // Insert snippet
  const insertSnippet = useCallback((snippetKey) => {
    if (editorRef.current && files[activeFile]) {
      const language = files[activeFile].language;
      const snippet = codeSnippets[language]?.[snippetKey];
      
      if (snippet) {
        const editor = editorRef.current;
        const position = editor.getPosition();
        const range = new monaco.Range(
          position.lineNumber,
          position.column,
          position.lineNumber,
          position.column
        );
        
        editor.executeEdits('', [{
          range: range,
          text: snippet,
          forceMoveMarkers: true
        }]);
        
        editor.focus();
      }
    }
  }, [files, activeFile]);

  // Toggle fullscreen
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  }, []);

  // Render file icon
  const getFileIcon = (filename) => {
    const ext = filename.split('.').pop().toLowerCase();
    const icons = {
      html: '📄',
      css: '🎨',
      js: '📜',
      jsx: '⚛️',
      ts: '📘',
      tsx: '⚛️',
      json: '📋',
      md: '📝',
      txt: '📃',
      svg: '🖼️',
      vue: '💚',
      py: '🐍'
    };
    return icons[ext] || '📄';
  };

  // Get console message color
  const getConsoleColor = (method) => {
    const colors = {
      log: 'text-gray-300',
      info: 'text-blue-400',
      warn: 'text-yellow-400',
      error: 'text-red-400',
      debug: 'text-purple-400'
    };
    return colors[method] || 'text-gray-300';
  };

  return (
    <div ref={containerRef} className="h-screen flex flex-col bg-gray-900 text-white">
      {/* Top Toolbar */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            Code Playground
          </h1>
          
          {/* File operations */}
          <div className="flex items-center space-x-2">
            <button
              onClick={createFile}
              className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
              title="New File"
            >
              <span>+ New</span>
            </button>
            
            <button
              onClick={handleImport}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
              title="Import Project"
            >
              📥 Import
            </button>
            
            <button
              onClick={handleExport}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
              title="Export Project"
            >
              📤 Export
            </button>
          </div>
        </div>

        {/* Toolbar controls */}
        <div className="flex items-center space-x-4">
          {/* Theme selector */}
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="bg-gray-700 px-2 py-1 rounded text-sm"
          >
            <option value="vs-dark">Dark</option>
            <option value="vs">Light</option>
            <option value="vscode-dark-plus">VS Code Dark+</option>
            <option value="atom-one-dark">Atom One Dark</option>
          </select>

          {/* Font size */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setFontSize(Math.max(10, fontSize - 1))}
              className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
            >
              A-
            </button>
            <span className="text-sm">{fontSize}px</span>
            <button
              onClick={() => setFontSize(Math.min(24, fontSize + 1))}
              className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
            >
              A+
            </button>
          </div>

          {/* View toggles */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsSidebarVisible(!isSidebarVisible)}
              className={`px-2 py-1 rounded text-sm ${isSidebarVisible ? 'bg-blue-600' : 'bg-gray-700'}`}
              title="Toggle Sidebar"
            >
              📁
            </button>
            
            <button
              onClick={() => setIsPreviewVisible(!isPreviewVisible)}
              className={`px-2 py-1 rounded text-sm ${isPreviewVisible ? 'bg-blue-600' : 'bg-gray-700'}`}
              title="Toggle Preview"
            >
              👁️
            </button>
            
            <button
              onClick={() => setIsConsoleVisible(!isConsoleVisible)}
              className={`px-2 py-1 rounded text-sm ${isConsoleVisible ? 'bg-blue-600' : 'bg-gray-700'}`}
              title="Toggle Console"
            >
              🖥️
            </button>

            <button
              onClick={() => setSplitView(splitView === 'horizontal' ? 'vertical' : 'horizontal')}
              className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
              title="Toggle Split Direction"
            >
              {splitView === 'horizontal' ? '⬌' : '⬍'}
            </button>

            <button
              onClick={toggleFullscreen}
              className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
              title="Fullscreen"
            >
              {isFullscreen ? '🗗' : '🗖'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        {isSidebarVisible && (
          <div className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col">
            {/* Files Section */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4">
                <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">Files</h3>
                <div className="space-y-1">
                  {Object.keys(files).map(filename => (
                    <div
                      key={filename}
                      className={`group flex items-center justify-between px-2 py-1 rounded cursor-pointer hover:bg-gray-700 ${
                        activeFile === filename ? 'bg-gray-700' : ''
                      }`}
                      onClick={() => setActiveFile(filename)}
                    >
                      <div className="flex items-center space-x-2">
                        <span>{getFileIcon(filename)}</span>
                        <span className="text-sm">{filename}</span>
                      </div>
                      <div className="hidden group-hover:flex items-center space-x-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            renameFile(filename);
                          }}
                          className="p-1 hover:bg-gray-600 rounded text-xs"
                          title="Rename"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteFile(filename);
                          }}
                          className="p-1 hover:bg-gray-600 rounded text-xs"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Libraries Section */}
              <div className="p-4 border-t border-gray-700">
                <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">Libraries</h3>
                <div className="space-y-1">
                  {availableLibraries.map(lib => (
                    <label
                      key={lib.id}
                      className="flex items-center space-x-2 cursor-pointer hover:bg-gray-700 px-2 py-1 rounded"
                    >
                      <input
                        type="checkbox"
                        checked={selectedLibraries.includes(lib.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedLibraries([...selectedLibraries, lib.id]);
                          } else {
                            setSelectedLibraries(selectedLibraries.filter(id => id !== lib.id));
                          }
                        }}
                        className="rounded"
                      />
                      <span>{lib.icon}</span>
                      <span className="text-sm">{lib.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Snippets Section */}
              <div className="p-4 border-t border-gray-700">
                <h3 className="text-sm font-semibold text-gray-400 uppercase mb-2">Snippets</h3>
                <div className="space-y-1">
                  {files[activeFile] && codeSnippets[files[activeFile].language] && 
                    Object.keys(codeSnippets[files[activeFile].language]).slice(0, 5).map(key => (
                      <button
                        key={key}
                        onClick={() => insertSnippet(key)}
                        className="w-full text-left px-2 py-1 text-sm hover:bg-gray-700 rounded"
                      >
                        {key}
                      </button>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Editor and Preview Container */}
        <div className={`flex-1 flex ${splitView === 'horizontal' ? 'flex-row' : 'flex-col'}`}>
          {/* Editor */}
          <div className={`${isPreviewVisible ? (splitView === 'horizontal' ? 'w-1/2' : 'h-1/2') : 'flex-1'} flex flex-col`}>
            <EnhancedMonacoEditor
              file={files[activeFile]}
              filename={activeFile}
              fontSize={fontSize}
              theme={theme}
              onChange={(value) => updateFile(activeFile, value)}
              editorRef={editorRef}
              onSave={() => storage.save('playground-files', files)}
            />
          </div>

          {/* Preview and Console */}
          {isPreviewVisible && (
            <div className={`${splitView === 'horizontal' ? 'w-1/2' : 'h-1/2'} flex flex-col bg-white`}>
              {/* Preview */}
              <div className={`${isConsoleVisible ? 'flex-1' : 'h-full'} relative`}>
                <div className="absolute top-2 right-2 z-10 flex items-center space-x-2">
                  <button
                    onClick={() => {
                      if (iframeRef.current) {
                        iframeRef.current.contentWindow.location.reload();
                      }
                    }}
                    className="px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
                  >
                    🔄 Refresh
                  </button>
                </div>
                <iframe
                  ref={iframeRef}
                  className="w-full h-full border-0"
                  title="Preview"
                  sandbox="allow-scripts allow-modals allow-forms allow-same-origin"
                />
              </div>

              {/* Console */}
              {isConsoleVisible && (
                <div className="h-48 bg-gray-900 border-t border-gray-700 flex flex-col">
                  <div className="px-4 py-2 bg-gray-800 flex items-center justify-between">
                    <span className="text-sm font-semibold">Console</span>
                    <button
                      onClick={clearConsole}
                      className="px-2 py-1 bg-gray-700 hover:bg-gray-600 rounded text-xs"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
                    {consoleOutput.length === 0 ? (
                      <div className="text-gray-500">Console output will appear here...</div>
                    ) : (
                      consoleOutput.map((msg, index) => (
                        <div key={index} className={`mb-1 ${getConsoleColor(msg.method)}`}>
                          <span className="text-gray-500 text-xs">[{msg.timestamp}]</span>{' '}
                          <span className="font-semibold">{msg.method}:</span>{' '}
                          {msg.args.join(' ')}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Status Bar */}
      <div className="bg-gray-800 border-t border-gray-700 px-4 py-1 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center space-x-4">
          <span>Files: {Object.keys(files).length}</span>
          <span>•</span>
          <span>Libraries: {selectedLibraries.length}</span>
          <span>•</span>
          <span>Theme: {theme}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-green-400">
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1"></span>
            Ready
          </span>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPlayground;