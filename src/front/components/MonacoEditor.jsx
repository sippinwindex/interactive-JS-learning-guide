// src/front/components/playground/MonacoEditorWrapper.jsx
import React, { useEffect, useRef } from 'react';
import { defineEditorThemes } from './themes/editorThemes';

const MonacoEditorWrapper = ({ 
  file, 
  filename, 
  fontSize, 
  theme, 
  onChange, 
  editorRef 
}) => {
  const containerRef = useRef(null);
  const editorInstanceRef = useRef(null);

  // Handle editor mount
  useEffect(() => {
    if (!containerRef.current) return;

    // Check if Monaco is available
    if (typeof window.monaco === 'undefined') {
      console.warn('Monaco Editor not loaded, falling back to textarea');
      return;
    }

    const monaco = window.monaco;
    
    // Define custom themes
    try {
      defineEditorThemes(monaco);
    } catch (error) {
      console.warn('Failed to define custom themes:', error);
    }

    // Create editor
    try {
      const editor = monaco.editor.create(containerRef.current, {
        value: file?.content || '',
        language: file?.language || 'plaintext',
        theme: theme || 'vs-dark',
        fontSize: fontSize || 14,
        fontFamily: "'Fira Code', 'Cascadia Code', Consolas, 'Courier New', monospace",
        fontLigatures: true,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        insertSpaces: true,
        wordWrap: 'on',
        minimap: { enabled: false },
        padding: { top: 10, bottom: 10 },
        renderLineHighlight: 'all',
        cursorBlinking: 'smooth',
        cursorSmoothCaretAnimation: true,
        smoothScrolling: true,
        mouseWheelZoom: true,
        quickSuggestions: {
          other: true,
          comments: false,
          strings: true
        },
        parameterHints: { enabled: true },
        suggestOnTriggerCharacters: true,
        acceptSuggestionOnEnter: 'on',
        tabCompletion: 'on',
        wordBasedSuggestions: true,
        formatOnPaste: true,
        formatOnType: false,
        autoIndent: 'full',
        autoClosingBrackets: 'always',
        autoClosingQuotes: 'always',
        bracketPairColorization: { enabled: true },
        scrollbar: {
          verticalScrollbarSize: 10,
          horizontalScrollbarSize: 10,
          useShadows: false,
          vertical: 'auto',
          horizontal: 'auto'
        },
        folding: true,
        foldingStrategy: 'indentation',
        showFoldingControls: 'mouseover',
        renderWhitespace: 'selection',
        renderControlCharacters: false,
        multiCursorModifier: 'alt',
        snippetSuggestions: 'inline',
        emptySelectionClipboard: false,
        copyWithSyntaxHighlighting: true,
        autoSurround: 'languageDefined',
        autoDetectHighContrast: true,
        accessibilitySupport: 'auto'
      });

      editorInstanceRef.current = editor;
      
      if (editorRef) {
        editorRef.current = editor;
      }

      // Add change listener
      editor.onDidChangeModelContent(() => {
        if (onChange) {
          onChange(editor.getValue());
        }
      });

      // Add custom keybindings
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
        console.log('Save triggered');
      });

      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
        console.log('Run triggered');
      });

      // Format document on save
      editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyF, () => {
        editor.getAction('editor.action.formatDocument').run();
      });

    } catch (error) {
      console.error('Failed to create Monaco editor:', error);
    }

    // Cleanup function
    return () => {
      if (editorInstanceRef.current) {
        editorInstanceRef.current.dispose();
      }
    };
  }, []);

  // Update editor content when file changes
  useEffect(() => {
    if (editorInstanceRef.current && file?.content !== undefined) {
      const currentValue = editorInstanceRef.current.getValue();
      if (currentValue !== file.content) {
        editorInstanceRef.current.setValue(file.content);
      }
    }
  }, [file?.content]);

  // Update editor theme
  useEffect(() => {
    if (editorInstanceRef.current && window.monaco) {
      try {
        window.monaco.editor.setTheme(theme || 'vs-dark');
      } catch (error) {
        console.warn('Failed to set theme:', error);
      }
    }
  }, [theme]);

  // Update editor font size
  useEffect(() => {
    if (editorInstanceRef.current) {
      editorInstanceRef.current.updateOptions({
        fontSize: fontSize || 14
      });
    }
  }, [fontSize]);

  // Fallback textarea if Monaco isn't available
  if (typeof window !== 'undefined' && typeof window.monaco === 'undefined') {
    return (
      <div className="flex-1 overflow-hidden bg-gray-900">
        <div className="h-full p-4 bg-gray-800 text-gray-300">
          <div className="mb-4 text-yellow-400">
            ⚠️ Monaco Editor not loaded, using fallback textarea
          </div>
          <textarea
            className="w-full h-full bg-gray-900 text-gray-300 font-mono text-sm p-4 border border-gray-600 rounded resize-none focus:outline-none focus:border-blue-500"
            value={file?.content || ''}
            onChange={(e) => onChange && onChange(e.target.value)}
            placeholder="// Start coding..."
            style={{
              fontFamily: "'Fira Code', 'Cascadia Code', Consolas, 'Courier New', monospace",
              fontSize: `${fontSize || 14}px`,
              lineHeight: '1.5'
            }}
          />
        </div>
      </div>
    );
  }

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
      <div 
        ref={containerRef} 
        className="w-full h-full"
        style={{ minHeight: '300px' }}
      />
    </div>
  );
};

export default MonacoEditorWrapper;