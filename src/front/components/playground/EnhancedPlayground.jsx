// src/front/components/playground/EnhancedPlayground.jsx
import React, { useState, useRef, useEffect, useCallback } from 'react';
import EnhancedMonacoEditor from './EnhancedMonacoEditor';
import FileExplorer from './FileExplorer';
import { defineEditorThemes } from './themes/editorThemes';
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
  // File tree structure - supports folders
  const [fileTree, setFileTree] = useState({
    'src': {
      'index.html': {
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Project</title>
  <link rel="stylesheet" href="styles/main.css">
</head>
<body>
  <div class="container">
    <h1>Welcome to the Playground!</h1>
    <p>Start coding and see your changes live.</p>
    <button id="myButton">Click Me!</button>
    <div id="output"></div>
  </div>
  <script src="js/app.js"></script>
</body>
</html>`,
        language: 'html'
      },
      'styles': {
        'main.css': {
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
}`,
          language: 'css'
        }
      },
      'js': {
        'app.js': {
          content: `// Main application JavaScript
const button = document.getElementById('myButton');
const output = document.getElementById('output');

let clickCount = 0;

button.addEventListener('click', function() {
  clickCount++;
  
  output.style.opacity = '0';
  
  setTimeout(() => {
    output.innerHTML = \`
      <strong>Button clicked \${clickCount} time\${clickCount !== 1 ? 's' : ''}!</strong>
      <br>
      <small>Timestamp: \${new Date().toLocaleTimeString()}</small>
    \`;
    output.style.opacity = '1';
  }, 200);
  
  console.log(\`Button clicked! Count: \${clickCount}\`);
});

console.log('JavaScript loaded and ready!');`,
          language: 'javascript'
        }
      }
    },
    'README.md': {
      content: `# My Project

This is a sample project in the playground.

## Features
- Live preview
- Multiple file support
- Folder structure
- Theme support`,
      language: 'markdown'
    }
  });

  const [activeFile, setActiveFile] = useState('src/index.html');
  const [theme, setTheme] = useState('dracula');
  const [fontSize, setFontSize] = useState(14);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [isConsoleVisible, setIsConsoleVisible] = useState(true);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [selectedLibraries, setSelectedLibraries] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Refs
  const iframeRef = useRef(null);
  const editorRef = useRef(null);
  const containerRef = useRef(null);
  const monacoRef = useRef(null);

  // Available themes
  const themes = [
    { id: 'vs-dark', name: 'VS Dark' },
    { id: 'vs', name: 'VS Light' },
    { id: 'dracula', name: 'Dracula' },
    { id: 'monokai', name: 'Monokai' },
    { id: 'tokyo-night', name: 'Tokyo Night' },
    { id: 'github-dark', name: 'GitHub Dark' },
    { id: 'github-light', name: 'GitHub Light' },
    { id: 'one-dark', name: 'One Dark' },
    { id: 'nord', name: 'Nord' }
  ];

  // Available libraries
  const availableLibraries = [
    { id: 'react', name: 'React' },
    { id: 'vue', name: 'Vue.js' },
    { id: 'jquery', name: 'jQuery' },
    { id: 'bootstrap', name: 'Bootstrap' },
    { id: 'tailwind', name: 'Tailwind CSS' },
    { id: 'three', name: 'Three.js' },
    { id: 'd3', name: 'D3.js' },
    { id: 'chart', name: 'Chart.js' }
  ];

  // Initialize Monaco themes
  useEffect(() => {
    if (window.monaco && !monacoRef.current) {
      defineEditorThemes(window.monaco);
      monacoRef.current = true;
    }
  }, []);

  // Fullscreen handling
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Get file from tree by path
  const getFileByPath = (path) => {
    const parts = path.split('/');
    let current = fileTree;
    
    for (const part of parts) {
      if (current[part]) {
        current = current[part];
      } else {
        return null;
      }
    }
    
    return current.content !== undefined ? current : null;
  };

  // Update file in tree
  const updateFileInTree = (path, content) => {
    const parts = path.split('/');
    const newTree = JSON.parse(JSON.stringify(fileTree));
    let current = newTree;
    
    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]];
    }
    
    if (current[parts[parts.length - 1]]) {
      current[parts[parts.length - 1]].content = content;
      setFileTree(newTree);
    }
  };

  // Create file in tree
  const createFileInTree = (path) => {
    const parts = path.split('/');
    const newTree = JSON.parse(JSON.stringify(fileTree));
    let current = newTree;
    
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }
      current = current[parts[i]];
    }
    
    const fileName = parts[parts.length - 1];
    current[fileName] = {
      content: '',
      language: getFileLanguage(fileName)
    };
    
    setFileTree(newTree);
    setActiveFile(path);
  };

  // Create folder in tree
  const createFolderInTree = (path) => {
    const parts = path.split('/');
    const newTree = JSON.parse(JSON.stringify(fileTree));
    let current = newTree;
    
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {};
      }
      current = current[parts[i]];
    }
    
    current[parts[parts.length - 1]] = {};
    setFileTree(newTree);
  };

  // Delete file/folder from tree
  const deleteFromTree = (path) => {
    const parts = path.split('/');
    const newTree = JSON.parse(JSON.stringify(fileTree));
    let current = newTree;
    
    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]];
    }
    
    delete current[parts[parts.length - 1]];
    setFileTree(newTree);
    
    if (activeFile === path || activeFile.startsWith(path + '/')) {
      // Find first available file
      const findFirstFile = (tree, prefix = '') => {
        for (const [name, content] of Object.entries(tree)) {
          const currentPath = prefix ? `${prefix}/${name}` : name;
          if (content.content !== undefined) {
            return currentPath;
          }
          if (typeof content === 'object') {
            const found = findFirstFile(content, currentPath);
            if (found) return found;
          }
        }
        return null;
      };
      
      const firstFile = findFirstFile(newTree);
      if (firstFile) setActiveFile(firstFile);
    }
  };

  // Rename file/folder
  const renameInTree = (oldPath, newPath) => {
    const oldParts = oldPath.split('/');
    const newParts = newPath.split('/');
    const newTree = JSON.parse(JSON.stringify(fileTree));
    
    // Get the item to rename
    let oldParent = newTree;
    for (let i = 0; i < oldParts.length - 1; i++) {
      oldParent = oldParent[oldParts[i]];
    }
    const item = oldParent[oldParts[oldParts.length - 1]];
    
    // Delete old
    delete oldParent[oldParts[oldParts.length - 1]];
    
    // Add new
    let newParent = newTree;
    for (let i = 0; i < newParts.length - 1; i++) {
      if (!newParent[newParts[i]]) {
        newParent[newParts[i]] = {};
      }
      newParent = newParent[newParts[i]];
    }
    newParent[newParts[newParts.length - 1]] = item;
    
    setFileTree(newTree);
    
    if (activeFile === oldPath) {
      setActiveFile(newPath);
    }
  };

  // Flatten file tree for preview
  const flattenFiles = () => {
    const files = {};
    
    const flatten = (tree, prefix = '') => {
      for (const [name, content] of Object.entries(tree)) {
        const path = prefix ? `${prefix}/${name}` : name;
        if (content.content !== undefined) {
          files[path] = content;
        } else if (typeof content === 'object') {
          flatten(content, path);
        }
      }
    };
    
    flatten(fileTree);
    return files;
  };

  // Update preview
  useEffect(() => {
    if (iframeRef.current) {
      const files = flattenFiles();
      const result = enhancedRunCode(files, iframeRef.current, {
        enableConsoleCapture: true,
        enableErrorHandling: true,
        libraries: selectedLibraries
      });
      
      if (result.error) {
        console.error('Preview error:', result.error);
      }
    }
  }, [fileTree, selectedLibraries]);

  // Listen for console messages
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

  const clearConsole = () => setConsoleOutput([]);

  const refreshPreview = () => {
    if (iframeRef.current) {
      const files = flattenFiles();
      enhancedRunCode(files, iframeRef.current, {
        enableConsoleCapture: true,
        enableErrorHandling: true,
        libraries: selectedLibraries
      });
      clearConsole();
    }
  };

  const currentFile = getFileByPath(activeFile);
  const isDarkTheme = !['vs', 'github-light'].includes(theme);

  return (
    <div 
      ref={containerRef}
      style={{ 
        height: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        backgroundColor: isDarkTheme ? '#1f2937' : '#f9fafb', 
        color: isDarkTheme ? 'white' : '#1f2937',
        overflow: 'hidden'
      }}
    >
      {/* Top Toolbar */}
      <div style={{ 
        backgroundColor: isDarkTheme ? '#374151' : 'white',
        borderBottom: `1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'}`,
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0,
        zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 'bold', margin: 0 }}>
            Code Playground
          </h1>
        </div>

        {/* Toolbar controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Theme selector */}
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            style={{
              backgroundColor: isDarkTheme ? '#4b5563' : '#f3f4f6',
              color: isDarkTheme ? 'white' : '#1f2937',
              padding: '6px 8px',
              borderRadius: '4px',
              fontSize: '14px',
              border: `1px solid ${isDarkTheme ? '#6b7280' : '#d1d5db'}`,
              cursor: 'pointer'
            }}
          >
            {themes.map(t => (
              <option key={t.id} value={t.id}>{t.name}</option>
            ))}
          </select>

          {/* Font size */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px', 
            backgroundColor: isDarkTheme ? '#4b5563' : '#f3f4f6',
            borderRadius: '4px',
            padding: '4px 8px'
          }}>
            <button
              onClick={() => setFontSize(Math.max(10, fontSize - 1))}
              style={{
                color: isDarkTheme ? '#d1d5db' : '#6b7280',
                background: 'none',
                border: 'none',
                fontSize: '14px',
                cursor: 'pointer',
                padding: '0 4px'
              }}
            >
              A-
            </button>
            <span style={{ fontSize: '14px', color: isDarkTheme ? '#9ca3af' : '#6b7280', padding: '0 8px' }}>
              {fontSize}px
            </span>
            <button
              onClick={() => setFontSize(Math.min(24, fontSize + 1))}
              style={{
                color: isDarkTheme ? '#d1d5db' : '#6b7280',
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
                backgroundColor: isSidebarVisible ? '#3b82f6' : (isDarkTheme ? '#6b7280' : '#e5e7eb'),
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
                backgroundColor: isPreviewVisible ? '#3b82f6' : (isDarkTheme ? '#6b7280' : '#e5e7eb'),
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
                backgroundColor: isConsoleVisible ? '#3b82f6' : (isDarkTheme ? '#6b7280' : '#e5e7eb'),
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

            <button
              onClick={toggleFullscreen}
              style={{
                padding: '6px 8px',
                backgroundColor: isDarkTheme ? '#6b7280' : '#e5e7eb',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontSize: '14px',
                cursor: 'pointer'
              }}
              title={isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            >
              {isFullscreen ? '🗗' : '⛶'}
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
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar with File Explorer */}
        {isSidebarVisible && (
          <div style={{ 
            width: '256px',
            backgroundColor: isDarkTheme ? '#374151' : '#f9fafb',
            borderRight: `1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'}`,
            display: 'flex',
            flexDirection: 'column'
          }}>
            <FileExplorer
              fileTree={fileTree}
              activeFile={activeFile}
              onFileSelect={setActiveFile}
              onFileCreate={createFileInTree}
              onFileDelete={deleteFromTree}
              onFileRename={renameInTree}
              onFolderCreate={createFolderInTree}
              onFolderDelete={deleteFromTree}
              theme={isDarkTheme ? 'dark' : 'light'}
            />

            {/* Libraries Section */}
            <div style={{ 
              padding: '16px',
              borderTop: `1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'}`
            }}>
              <h3 style={{ 
                fontSize: '12px',
                fontWeight: '600',
                color: isDarkTheme ? '#9ca3af' : '#6b7280',
                textTransform: 'uppercase',
                marginBottom: '8px'
              }}>
                LIBRARIES
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '150px', overflowY: 'auto' }}>
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
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = isDarkTheme ? '#3f4451' : '#f3f4f6'}
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
                    <span style={{ fontSize: '14px', color: isDarkTheme ? '#e5e7eb' : '#374151' }}>
                      {lib.name}
                    </span>
                  </label>
                ))}
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
            backgroundColor: isDarkTheme ? '#1f2937' : 'white'
          }}>
            {currentFile ? (
              <EnhancedMonacoEditor
                file={currentFile}
                filename={activeFile}
                fontSize={fontSize}
                theme={theme}
                onChange={(value) => updateFileInTree(activeFile, value)}
                editorRef={editorRef}
              />
            ) : (
              <div style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: isDarkTheme ? '#6b7280' : '#9ca3af'
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
                  <div>Select a file to edit</div>
                </div>
              </div>
            )}
          </div>

          {/* Preview and Console */}
          {isPreviewVisible && (
            <div style={{ 
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'white',
              borderLeft: `1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'}`
            }}>
              {/* Preview */}
              <div style={{ 
                flex: isConsoleVisible ? 1 : 'none',
                height: isConsoleVisible ? 'auto' : '100%',
                position: 'relative',
                backgroundColor: 'white'
              }}>
                <iframe
                  ref={iframeRef}
                  style={{ width: '100%', height: '100%', border: 'none', backgroundColor: 'white' }}
                  title="Preview"
                  sandbox="allow-scripts allow-modals allow-forms allow-same-origin"
                />
              </div>

              {/* Console */}
              {isConsoleVisible && (
                <div style={{ 
                  height: '192px',
                  backgroundColor: isDarkTheme ? '#1f2937' : '#f9fafb',
                  borderTop: `1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'}`,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ 
                    padding: '8px 16px',
                    backgroundColor: isDarkTheme ? '#374151' : 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexShrink: 0
                  }}>
                    <span style={{ fontSize: '14px', fontWeight: '600', color: isDarkTheme ? '#e5e7eb' : '#374151' }}>
                      Console
                    </span>
                    <button
                      onClick={clearConsole}
                      style={{
                        padding: '4px 8px',
                        backgroundColor: isDarkTheme ? '#4b5563' : '#e5e7eb',
                        color: isDarkTheme ? '#e5e7eb' : '#374151',
                        border: 'none',
                        borderRadius: '4px',
                        fontSize: '12px',
                        cursor: 'pointer'
                      }}
                    >
                      Clear
                    </button>
                  </div>
                  <div style={{ 
                    flex: 1,
                    overflowY: 'auto',
                    padding: '12px',
                    fontFamily: 'monospace',
                    fontSize: '14px'
                  }}>
                    {consoleOutput.length === 0 ? (
                      <div style={{ color: isDarkTheme ? '#6b7280' : '#9ca3af' }}>
                        Console output will appear here...
                      </div>
                    ) : (
                      consoleOutput.map((msg, index) => (
                        <div key={index} style={{ 
                          marginBottom: '4px',
                          color: msg.method === 'error' ? '#ef4444' : 
                                 msg.method === 'warn' ? '#f59e0b' : 
                                 msg.method === 'info' ? '#3b82f6' : 
                                 (isDarkTheme ? '#d1d5db' : '#374151')
                        }}>
                          <span style={{ color: isDarkTheme ? '#6b7280' : '#9ca3af', fontSize: '12px' }}>
                            [{msg.timestamp}]
                          </span>{' '}
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
        backgroundColor: isDarkTheme ? '#374151' : 'white',
        borderTop: `1px solid ${isDarkTheme ? '#4b5563' : '#e5e7eb'}`,
        padding: '4px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '12px',
        color: isDarkTheme ? '#9ca3af' : '#6b7280',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span>Theme: {themes.find(t => t.id === theme)?.name}</span>
          <span>•</span>
          <span>Font: {fontSize}px</span>
          <span>•</span>
          <span>Libraries: {selectedLibraries.length}</span>
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