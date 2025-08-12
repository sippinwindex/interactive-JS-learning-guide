// src/front/components/playground/Playground.jsx
import React, { useState, useReducer, useEffect, useRef } from 'react';
import TopBar from './TopBar';
import FileExplorer from './FileExplorer';
import EditorTabs from './EditorTabs';
import MonacoEditorWrapper from './MonacoEditorWrapper';
import OutputPanel from './OutputPanel';
import StatusBar from './StatusBar';
import { playgroundReducer, initialState } from './utils/playgroundReducer';
import { runCode } from './utils/codeRunner';
import { defaultFiles } from './templates/defaultFiles';

export const Playground = ({ navigateTo, isDarkMode = false }) => {
  const [state, dispatch] = useReducer(playgroundReducer, initialState);
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [showFileExplorer, setShowFileExplorer] = useState(true);
  const [showConsole, setShowConsole] = useState(true);
  const [layoutMode, setLayoutMode] = useState('horizontal');
  const [fontSize, setFontSize] = useState(14);
  const [editorTheme, setEditorTheme] = useState('dracula');
  
  const iframeRef = useRef(null);
  const editorRef = useRef(null);

  // Initialize with default files
  useEffect(() => {
    Object.entries(defaultFiles).forEach(([filename, file]) => {
      dispatch({
        type: 'CREATE_FILE',
        payload: { filename, ...file }
      });
    });
    dispatch({ type: 'SET_ACTIVE_FILE', payload: 'index.html' });
  }, []);

  // Handle run code
  const handleRunCode = () => {
    setIsRunning(true);
    const result = runCode(state.files, iframeRef.current);
    if (result.error) {
      setConsoleOutput(prev => [...prev, {
        method: 'error',
        args: [result.error],
        timestamp: new Date().toLocaleTimeString()
      }]);
    }
    setTimeout(() => setIsRunning(false), 500);
  };

  // Listen for console messages from iframe
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

  // Auto-run on file change (optional)
  useEffect(() => {
    if (state.autoRun) {
      const timer = setTimeout(handleRunCode, 1000);
      return () => clearTimeout(timer);
    }
  }, [state.files, state.autoRun]);

  return (
    <div className="h-screen bg-gray-900 flex flex-col overflow-hidden">
      {/* Top Bar - Fixed height with proper padding */}
      <div className="flex-shrink-0 h-16 bg-gray-800 border-b border-gray-700">
        <TopBar
          isRunning={isRunning}
          onRun={handleRunCode}
          fontSize={fontSize}
          setFontSize={setFontSize}
          layoutMode={layoutMode}
          setLayoutMode={setLayoutMode}
          showConsole={showConsole}
          setShowConsole={setShowConsole}
          editorTheme={editorTheme}
          setEditorTheme={setEditorTheme}
          showFileExplorer={showFileExplorer}
          setShowFileExplorer={setShowFileExplorer}
          files={state.files}
          dispatch={dispatch}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden min-h-0">
        {/* File Explorer - Collapsible with proper spacing */}
        {showFileExplorer && (
          <div className="w-64 bg-gray-800 border-r border-gray-700 flex-shrink-0">
            <FileExplorer
              files={state.files}
              activeFile={state.activeFile}
              dispatch={dispatch}
            />
          </div>
        )}

        {/* Editor and Output Area */}
        <div className={`flex-1 flex ${layoutMode === 'vertical' ? 'flex-col' : 'flex-row'} overflow-hidden`}>
          
          {/* Editor Section */}
          <div className={`${layoutMode === 'vertical' ? 'h-1/2' : 'w-1/2'} flex flex-col bg-gray-900 border-r border-gray-700`}>
            {/* Editor Tabs */}
            <div className="flex-shrink-0 bg-gray-800 border-b border-gray-700">
              <EditorTabs
                files={state.files}
                openTabs={state.openTabs}
                activeFile={state.activeFile}
                dispatch={dispatch}
              />
            </div>
            
            {/* Monaco Editor */}
            <div className="flex-1 overflow-hidden">
              {state.activeFile ? (
                <MonacoEditorWrapper
                  file={state.files[state.activeFile]}
                  filename={state.activeFile}
                  fontSize={fontSize}
                  theme={editorTheme}
                  onChange={(value) => dispatch({
                    type: 'UPDATE_FILE',
                    payload: { filename: state.activeFile, content: value }
                  })}
                  editorRef={editorRef}
                />
              ) : (
                <div className="h-full flex items-center justify-center bg-gray-900 text-gray-500">
                  <div className="text-center">
                    <div className="text-4xl mb-4">📁</div>
                    <p>No file selected</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Output Panel */}
          <div className={`${layoutMode === 'vertical' ? 'h-1/2' : 'w-1/2'} flex flex-col bg-white`}>
            <OutputPanel
              layoutMode={layoutMode}
              showConsole={showConsole}
              consoleOutput={consoleOutput}
              onClearConsole={() => setConsoleOutput([])}
              iframeRef={iframeRef}
            />
          </div>
        </div>
      </div>

      {/* Status Bar - Fixed height */}
      <div className="flex-shrink-0 h-8 bg-gray-800 border-t border-gray-700">
        <StatusBar
          activeFile={state.activeFile}
          files={state.files}
          cursorPosition={state.cursorPosition}
        />
      </div>
    </div>
  );
};

export default Playground;