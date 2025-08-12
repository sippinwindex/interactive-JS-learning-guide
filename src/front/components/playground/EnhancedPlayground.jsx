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
  const [files, setFiles] = useState({
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
  });

  const [activeFile, setActiveFile] = useState('index.html');
  const [theme, setTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(14);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [isConsoleVisible, setIsConsoleVisible] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [selectedLibraries, setSelectedLibraries] = useState([]);
  
  // Refs
  const iframeRef = useRef(null);
  const editorRef = useRef(null);
  const autoSaveRef = useRef(null);

  // Available libraries
  const availableLibraries = [
    { id: 'react', name: 'React' },
    { id: 'vue', name: 'Vue.js' },
    { id: 'jquery', name: 'jQuery' },
    { id: 'bootstrap', name: 'Bootstrap' },
    { id: 'tailwind', name: 'Tailwind CSS' },
    { id: 'three', name: 'Three.js' },
    { id: 'd3', name: 'D3.js' },
    { id: 'chart', name: 'Chart.js' },
    { id: 'gsap', name: 'GSAP' },
    { id: 'anime', name: 'Anime.js' }
  ];

  // Update preview when files change
  useEffect(() => {
    if (iframeRef.current) {
      const result = enhancedRunCode(files, iframeRef.current, {
        enableConsoleCapture: true,
        enableErrorHandling: true,
        libraries: selectedLibraries
      });
      
      if (result.error) {
        console.error('Preview error:', result.error);
      }
    }
  }, [files, selectedLibraries]);

  // Listen for console messages from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'console') {
        setConsoleOutput(prev => [...prev, {
          method: event.data.method,
          args: event.data.args,
          timestamp: new Date().toLocaleTimeString()
        }]);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // File operations
  const updateFile = (filename, content) => {
    setFiles(prev => ({
      ...prev,
      [filename]: {
        ...prev[filename],
        content
      }
    }));
  };

  const createFile = () => {
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
  };

  const deleteFile = (filename) => {
    if (Object.keys(files).length > 1 && confirm(`Delete ${filename}?`)) {
      const newFiles = { ...files };
      delete newFiles[filename];
      setFiles(newFiles);
      
      if (activeFile === filename) {
        setActiveFile(Object.keys(newFiles)[0]);
      }
    }
  };

  const handleExport = () => {
    exportProject(files, 'my-project');
  };

  const handleImport = async () => {
    try {
      const projectData = await importProject();
      setFiles(projectData.files);
      setActiveFile(Object.keys(projectData.files)[0]);
    } catch (error) {
      console.error('Import failed:', error);
    }
  };

  const clearConsole = () => {
    setConsoleOutput([]);
  };

  const refreshPreview = () => {
    if (iframeRef.current) {
      const result = enhancedRunCode(files, iframeRef.current, {
        enableConsoleCapture: true,
        enableErrorHandling: true,
        libraries: selectedLibraries
      });
      clearConsole();
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#1f2937', color: 'white', overflow: 'hidden' }}>
      {/* Top Toolbar */}
      <div style={{ 
        backgroundColor: '#374151', 
        borderBottom: '1px solid #4b5563', 
        padding: '12px 16px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexShrink: 0,
        position: 'relative',
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
            Code Playground
          </h1>
          
          {/* File operations */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={createFile}
              style={{
                padding: '6px 12px',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
            >
              + New
            </button>
            
            <button
              onClick={handleImport}
              style={{
                padding: '6px 12px',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#4b5563'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#6b7280'}
            >
              Import
            </button>
            
            <button
              onClick={handleExport}
              style={{
                padding: '6px 12px',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#4b5563'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#6b7280'}
            >
              Export
            </button>
          </div>
        </div>

        {/* Toolbar controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Theme selector */}
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={{
              backgroundColor: '#4b5563',
              color: 'white',
              padding: '6px 8px',
              borderRadius: '4px',
              fontSize: '14px',
              border: '1px solid #6b7280',
              cursor: 'pointer'
            }}
          >
            <option value="vs-dark">Dark</option>
            <option value="vs">Light</option>
            <option value="dracula">Dracula</option>
            <option value="monokai">Monokai</option>
          </select>

          {/* Font size */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', backgroundColor: '#4b5563', borderRadius: '4px', padding: '4px 8px' }}>
            <button
              onClick={() => setFontSize(Math.max(10, fontSize - 1))}
              style={{
                color: '#d1d5db',
                background: 'none',
                border: 'none',
                fontSize: '14px',
                cursor: 'pointer',
                padding: '0 4px'
              }}
            >
              A-
            </button>
            <span style={{ fontSize: '14px', color: '#9ca3af', padding: '0 8px' }}>{fontSize}px</span>
            <button
              onClick={() => setFontSize(Math.min(24, fontSize + 1))}
              style={{
                color: '#d1d5db',
                background: 'none',
                border: 'none',
                fontSize: '14px',
                cursor: 'pointer',
                padding: '0 4px'
              }}
            >
              A+
            </button>
          </div>

          {/* View toggles */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setIsSidebarVisible(!isSidebarVisible)}
              style={{
                padding: '6px 8px',
                backgroundColor: isSidebarVisible ? '#3b82f6' : '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
              title="Toggle Sidebar"
            >
              📁
            </button>
            
            <button
              onClick={() => setIsPreviewVisible(!isPreviewVisible)}
              style={{
                padding: '6px 8px',
                backgroundColor: isPreviewVisible ? '#3b82f6' : '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
              title="Toggle Preview"
            >
              👁️
            </button>
            
            <button
              onClick={() => setIsConsoleVisible(!isConsoleVisible)}
              style={{
                padding: '6px 8px',
                backgroundColor: isConsoleVisible ? '#3b82f6' : '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
              title="Toggle Console"
            >
              🖥️
            </button>
          </div>

          {/* Refresh button */}
          <button
            onClick={refreshPreview}
            style={{
              padding: '6px 12px',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#10b981'}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar */}
        {isSidebarVisible && (
          <div style={{ width: '256px', backgroundColor: '#374151', borderRight: '1px solid #4b5563', display: 'flex', flexDirection: 'column' }}>
            {/* Files Section */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              <div style={{ padding: '16px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '8px' }}>
                  FILES
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {Object.keys(files).map(filename => (
                    <div
                      key={filename}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '6px 8px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        backgroundColor: activeFile === filename ? '#4b5563' : 'transparent'
                      }}
                      onClick={() => setActiveFile(filename)}
                      onMouseEnter={(e) => {
                        if (activeFile !== filename) {
                          e.currentTarget.style.backgroundColor = '#3f4451';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (activeFile !== filename) {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '16px' }}>
                          {filename.endsWith('.html') ? '📄' :
                           filename.endsWith('.css') ? '🎨' :
                           filename.endsWith('.js') ? '📜' : '📃'}
                        </span>
                        <span style={{ fontSize: '14px', color: '#e5e7eb' }}>{filename}</span>
                      </div>
                      {Object.keys(files).length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteFile(filename);
                          }}
                          style={{
                            padding: '2px 4px',
                            background: 'none',
                            border: 'none',
                            color: '#ef4444',
                            cursor: 'pointer',
                            fontSize: '12px'
                          }}
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Libraries Section */}
              <div style={{ padding: '16px', borderTop: '1px solid #4b5563' }}>
                <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '8px' }}>
                  LIBRARIES
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '200px', overflowY: 'auto' }}>
                  {availableLibraries.map(lib => (
                    <label
                      key={lib.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        padding: '4px 8px',
                        borderRadius: '4px'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3f4451'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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
                        style={{ cursor: 'pointer' }}
                      />
                      <span style={{ fontSize: '14px', color: '#e5e7eb' }}>{lib.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Snippets Section */}
              <div style={{ padding: '16px', borderTop: '1px solid #4b5563' }}>
                <h3 style={{ fontSize: '12px', fontWeight: '600', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '8px' }}>
                  SNIPPETS
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {files[activeFile] && codeSnippets[files[activeFile].language] && 
                    Object.keys(codeSnippets[files[activeFile].language]).slice(0, 5).map(key => (
                      <button
                        key={key}
                        style={{
                          textAlign: 'left',
                          padding: '4px 8px',
                          fontSize: '14px',
                          color: '#d1d5db',
                          background: 'none',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#3f4451'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
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
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Editor Section */}
          <div style={{ 
            width: isPreviewVisible ? '50%' : '100%', 
            display: 'flex', 
            flexDirection: 'column',
            backgroundColor: '#1f2937'
          }}>
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
            <div style={{ width: '50%', display: 'flex', flexDirection: 'column', backgroundColor: 'white', borderLeft: '1px solid #4b5563' }}>
              {/* Preview */}
              <div style={{ flex: isConsoleVisible ? 1 : 'none', height: isConsoleVisible ? 'auto' : '100%', position: 'relative', backgroundColor: 'white' }}>
                <iframe
                  ref={iframeRef}
                  style={{ width: '100%', height: '100%', border: 'none', backgroundColor: 'white' }}
                  title="Preview"
                  sandbox="allow-scripts allow-modals allow-forms allow-same-origin"
                />
              </div>

              {/* Console */}
              {isConsoleVisible && (
                <div style={{ height: '192px', backgroundColor: '#1f2937', borderTop: '1px solid #4b5563', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ 
                    padding: '8px 16px', 
                    backgroundColor: '#374151', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'space-between',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#e5e7eb' }}>Console</span>
                    <button
                      onClick={clearConsole}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: '#4b5563',
                        color: '#e5e7eb',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                      onMouseOver={(e) => e.target.style.backgroundColor = '#6b7280'}
                      onMouseOut={(e) => e.target.style.backgroundColor = '#4b5563'}
                    >
                      Clear
                    </button>
                  </div>
                  <div style={{ flex: 1, overflowY: 'auto', padding: '12px', fontFamily: 'monospace', fontSize: '14px' }}>
                    {consoleOutput.length === 0 ? (
                      <div style={{ color: '#6b7280' }}>Console output will appear here...</div>
                    ) : (
                      consoleOutput.map((msg, index) => (
                        <div key={index} style={{ 
                          marginBottom: '4px',
                          color: msg.method === 'error' ? '#ef4444' : 
                                 msg.method === 'warn' ? '#f59e0b' : 
                                 msg.method === 'info' ? '#3b82f6' : '#d1d5db'
                        }}>
                          <span style={{ color: '#6b7280', fontSize: '12px' }}>[{msg.timestamp}]</span>{' '}
                          <span style={{ fontWeight: '600' }}>{msg.method}:</span>{' '}
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
      <div style={{ 
        backgroundColor: '#374151', 
        borderTop: '1px solid #4b5563', 
        padding: '4px 16px', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        fontSize: '12px',
        color: '#9ca3af',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>Files: {Object.keys(files).length}</span>
          <span>•</span>
          <span>Libraries: {selectedLibraries.length}</span>
          <span>•</span>
          <span>Theme: {theme}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#10b981' }}>
            <span style={{ 
              display: 'inline-block', 
              width: '8px', 
              height: '8px', 
              backgroundColor: '#10b981', 
              borderRadius: '50%', 
              marginRight: '4px'
            }}></span>
            Ready
          </span>
        </div>
      </div>
    </div>
  );
};

export default EnhancedPlayground;