// src/front/components/playground/MonacoEditorWrapper.jsx
import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { defineEditorThemes } from './themes/editorThemes';

const MonacoEditorWrapper = ({ 
  file, 
  filename, 
  fontSize, 
  theme, 
  onChange, 
  editorRef 
}) => {
  const monacoRef = useRef(null);

  // Handle editor mount
  const handleEditorDidMount = (editor, monaco) => {
    monacoRef.current = monaco;
    if (editorRef) {
      editorRef.current = editor;
    }

    // Define custom themes
    defineEditorThemes(monaco);

    // Add custom keybindings
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      console.log('Save triggered');
      // Could trigger save/run here
    });

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      console.log('Run triggered');
      // Could trigger run here
    });

    // Format document on save
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyF, () => {
      editor.getAction('editor.action.formatDocument').run();
    });

    // Update cursor position
    editor.onDidChangeCursorPosition((e) => {
      // Could dispatch cursor position to parent
      // dispatch({ type: 'SET_CURSOR_POSITION', payload: { line: e.position.lineNumber, column: e.position.column } });
    });
  };

  // Editor options
  const editorOptions = {
    minimap: { 
      enabled: false 
    },
    fontSize: fontSize,
    fontFamily: "'Fira Code', 'Cascadia Code', Consolas, 'Courier New', monospace",
    fontLigatures: true,
    lineNumbers: 'on',
    roundedSelection: false,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    insertSpaces: true,
    wordWrap: 'on',
    padding: { 
      top: 10, 
      bottom: 10 
    },
    renderLineHighlight: 'all',
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: true,
    smoothScrolling: true,
    mouseWheelZoom: true,
    
    // IntelliSense
    quickSuggestions: {
      other: true,
      comments: false,
      strings: true
    },
    parameterHints: {
      enabled: true
    },
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: 'on',
    tabCompletion: 'on',
    wordBasedSuggestions: true,
    
    // Formatting
    formatOnPaste: true,
    formatOnType: false,
    autoIndent: 'full',
    
    // Brackets
    autoClosingBrackets: 'always',
    autoClosingQuotes: 'always',
    bracketPairColorization: {
      enabled: true
    },
    
    // Scrollbar
    scrollbar: {
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10,
      useShadows: false,
      vertical: 'auto',
      horizontal: 'auto'
    },
    
    // Folding
    folding: true,
    foldingStrategy: 'indentation',
    showFoldingControls: 'mouseover',
    
    // Other
    renderWhitespace: 'selection',
    renderControlCharacters: false,
    multiCursorModifier: 'alt',
    snippetSuggestions: 'inline',
    emptySelectionClipboard: false,
    copyWithSyntaxHighlighting: true,
    autoSurround: 'languageDefined',
    autoDetectHighContrast: true,
    accessibilitySupport: 'auto'
  };

  // Handle editor validation
  const handleEditorValidation = (markers) => {
    // markers is an array of error/warning markers
    if (markers.length > 0) {
      console.log('Editor validation errors:', markers);
    }
  };

  // Loading component
  const EditorLoading = () => (
    <div className="flex items-center justify-center h-full bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <div className="text-gray-400">Loading Editor...</div>
      </div>
    </div>
  );

  if (!file) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-900 text-gray-500">
        <div className="text-center">
          <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p>No file selected</p>
          <p className="text-sm mt-2">Create or select a file to start coding</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden">
      <Editor
        height="100%"
        language={file.language || 'plaintext'}
        value={file.content || ''}
        theme={theme}
        onChange={onChange}
        onMount={handleEditorDidMount}
        onValidate={handleEditorValidation}
        options={editorOptions}
        loading={<EditorLoading />}
      />
    </div>
  );
};

export default MonacoEditorWrapper;