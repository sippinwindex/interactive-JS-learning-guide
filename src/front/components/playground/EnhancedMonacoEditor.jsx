// src/front/components/playground/EnhancedMonacoEditor.jsx
import React, { useEffect, useRef, useState } from 'react';
import Editor, { loader } from '@monaco-editor/react';

// Configure Monaco loader
loader.config({
  paths: {
    vs: 'https://cdn.jsdelivr.net/npm/monaco-editor@0.45.0/min/vs'
  }
});

const EnhancedMonacoEditor = ({ 
  file, 
  filename, 
  fontSize = 14, 
  theme = 'vs-dark', 
  onChange, 
  editorRef,
  onSave,
  onFormat,
  autoSave = true,
  minimap = true,
  wordWrap = 'on'
}) => {
  const monacoRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const autoSaveTimerRef = useRef(null);

  // Configure Monaco before mount
  const handleBeforeMount = (monaco) => {
    // Define custom themes
    defineCustomThemes(monaco);
    
    // Configure languages
    configureLanguages(monaco);
    
    // Add custom commands
    addCustomCommands(monaco);
    
    // Configure IntelliSense
    configureIntelliSense(monaco);
  };

  // Handle editor mount
  const handleEditorDidMount = (editor, monaco) => {
    monacoRef.current = monaco;
    if (editorRef) {
      editorRef.current = editor;
    }
    setIsLoading(false);

    // Focus editor
    editor.focus();

    // Add custom keybindings
    addKeybindings(editor, monaco);

    // Setup auto-completions
    setupAutoCompletions(editor, monaco, file?.language);

    // Add format on save
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      editor.getAction('editor.action.formatDocument').run();
      if (onSave) onSave();
    });

    // Track cursor position
    editor.onDidChangeCursorPosition((e) => {
      setCursorPosition({
        line: e.position.lineNumber,
        column: e.position.column
      });
    });

    // Add bracket matching
    editor.updateOptions({
      matchBrackets: 'always',
      bracketPairColorization: { enabled: true }
    });

    // Setup error markers
    setupErrorMarkers(editor, monaco);
  };

  // Handle content changes with auto-save
  const handleChange = (value) => {
    if (onChange) {
      onChange(value);
    }

    // Auto-save logic
    if (autoSave) {
      clearTimeout(autoSaveTimerRef.current);
      autoSaveTimerRef.current = setTimeout(() => {
        if (onSave) onSave();
      }, 2000); // Save after 2 seconds of inactivity
    }
  };

  // Enhanced editor options
  const editorOptions = {
    // Basic options
    fontSize: fontSize,
    fontFamily: "'Fira Code', 'Cascadia Code', 'Monaco', 'Menlo', monospace",
    fontLigatures: true,
    lineNumbers: 'on',
    lineNumbersMinChars: 3,
    lineDecorationsWidth: 5,
    lineHeight: 1.6,
    letterSpacing: 0.5,
    
    // Minimap
    minimap: {
      enabled: minimap,
      renderCharacters: false,
      maxColumn: 80,
      side: 'right'
    },
    
    // Scrollbar
    scrollbar: {
      vertical: 'auto',
      horizontal: 'auto',
      verticalScrollbarSize: 10,
      horizontalScrollbarSize: 10,
      useShadows: false,
      verticalSliderSize: 10,
      horizontalSliderSize: 10,
      scrollByPage: true,
      alwaysConsumeMouseWheel: false
    },
    
    // Editor features
    automaticLayout: true,
    wordWrap: wordWrap,
    wrappingIndent: 'indent',
    wrappingStrategy: 'advanced',
    scrollBeyondLastLine: false,
    smoothScrolling: true,
    cursorBlinking: 'smooth',
    cursorSmoothCaretAnimation: true,
    cursorStyle: 'line',
    cursorWidth: 2,
    renderWhitespace: 'selection',
    renderControlCharacters: false,
    renderIndentGuides: true,
    renderLineHighlight: 'all',
    renderFinalNewline: true,
    
    // IntelliSense
    quickSuggestions: {
      other: true,
      comments: true,
      strings: true
    },
    quickSuggestionsDelay: 50,
    parameterHints: { enabled: true },
    suggestOnTriggerCharacters: true,
    acceptSuggestionOnEnter: 'on',
    acceptSuggestionOnCommitCharacter: true,
    wordBasedSuggestions: true,
    suggestSelection: 'first',
    suggestFontSize: fontSize,
    suggest: {
      insertMode: 'replace',
      filterGraceful: true,
      localityBonus: true,
      shareSuggestSelections: true,
      showWords: true,
      showIcons: true,
      maxVisibleSuggestions: 12,
      showMethods: true,
      showFunctions: true,
      showConstructors: true,
      showFields: true,
      showVariables: true,
      showClasses: true,
      showStructs: true,
      showInterfaces: true,
      showModules: true,
      showProperties: true,
      showEvents: true,
      showOperators: true,
      showUnits: true,
      showValues: true,
      showConstants: true,
      showEnums: true,
      showEnumMembers: true,
      showKeywords: true,
      showColors: true,
      showFiles: true,
      showReferences: true,
      showFolders: true,
      showTypeParameters: true,
      showSnippets: true
    },
    
    // Code editing
    tabSize: 2,
    insertSpaces: true,
    detectIndentation: true,
    autoIndent: 'full',
    formatOnPaste: true,
    formatOnType: true,
    autoClosingBrackets: 'always',
    autoClosingQuotes: 'always',
    autoClosingOvertype: 'always',
    autoSurround: 'languageDefined',
    
    // Folding
    folding: true,
    foldingStrategy: 'indentation',
    foldingHighlight: true,
    showFoldingControls: 'mouseover',
    unfoldOnClickAfterEndOfLine: true,
    
    // Find widget
    find: {
      seedSearchStringFromSelection: true,
      autoFindInSelection: 'multiline',
      addExtraSpaceOnTop: true
    },
    
    // Selection
    selectionHighlight: true,
    occurrencesHighlight: true,
    selectionClipboard: true,
    multiCursorModifier: 'alt',
    multiCursorMergeOverlapping: true,
    accessibilitySupport: 'auto',
    
    // Hover
    hover: {
      enabled: true,
      delay: 300,
      sticky: true
    },
    
    // Links
    links: true,
    
    // Comments
    comments: {
      insertSpace: true,
      ignoreEmptyLines: true
    },
    
    // Brackets
    bracketPairColorization: {
      enabled: true,
      independentColorPoolPerBracketType: true
    },
    guides: {
      bracketPairs: true,
      bracketPairsHorizontal: 'active',
      highlightActiveBracketPair: true,
      indentation: true,
      highlightActiveIndentation: true
    },
    
    // Sticky scroll
    stickyScroll: {
      enabled: true,
      maxLineCount: 5
    },
    
    // Padding
    padding: {
      top: 15,
      bottom: 15
    },
    
    // Glyph margin
    glyphMargin: true,
    useTabStops: true,
    trimAutoWhitespace: true,
    largeFileOptimizations: true,
    
    // Diff editor
    diffCodeLens: true,
    
    // Accessibility
    accessibilityPageSize: 10,
    ariaLabel: 'Code Editor',
    screenReaderAnnounceInlineSuggestion: true
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      clearTimeout(autoSaveTimerRef.current);
    };
  }, []);

  // Loading component
  const LoadingEditor = () => (
    <div className="flex items-center justify-center h-full bg-gray-900">
      <div className="text-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">{'</>'}</span>
          </div>
        </div>
        <div className="text-gray-400 mt-4">Loading Monaco Editor...</div>
        <div className="text-xs text-gray-500 mt-2">Setting up IntelliSense</div>
      </div>
    </div>
  );

  if (!file) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-900 text-gray-500">
        <div className="text-center">
          <svg className="w-20 h-20 mx-auto mb-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} 
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <p className="text-lg font-medium">No file selected</p>
          <p className="text-sm mt-2 text-gray-600">Create or select a file to start coding</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-900">
      {/* Editor Status Bar (Top) */}
      <div className="bg-gray-800 px-4 py-1 flex items-center justify-between text-xs text-gray-400 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <span>{filename}</span>
          <span>•</span>
          <span>{file.language}</span>
          <span>•</span>
          <span>Ln {cursorPosition.line}, Col {cursorPosition.column}</span>
        </div>
        <div className="flex items-center space-x-2">
          {autoSave && (
            <span className="text-green-400">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1 animate-pulse"></span>
              Auto-save enabled
            </span>
          )}
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 min-h-0">
        <Editor
          height="100%"
          language={file.language || 'plaintext'}
          value={file.content || ''}
          theme={theme}
          onChange={handleChange}
          onMount={handleEditorDidMount}
          beforeMount={handleBeforeMount}
          options={editorOptions}
          loading={<LoadingEditor />}
        />
      </div>
    </div>
  );
};

// Define custom themes
function defineCustomThemes(monaco) {
  // VS Code Dark+ Theme
  monaco.editor.defineTheme('vscode-dark-plus', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '6A9955', fontStyle: 'italic' },
      { token: 'keyword', foreground: '569CD6' },
      { token: 'string', foreground: 'CE9178' },
      { token: 'number', foreground: 'B5CEA8' },
      { token: 'function', foreground: 'DCDCAA' },
      { token: 'variable', foreground: '9CDCFE' },
      { token: 'type', foreground: '4EC9B0' },
      { token: 'class', foreground: '4EC9B0' },
      { token: 'constant', foreground: '4FC1FF' },
      { token: 'parameter', foreground: '9CDCFE' },
      { token: 'property', foreground: '9CDCFE' },
      { token: 'operator', foreground: 'D4D4D4' },
      { token: 'tag', foreground: '569CD6' },
      { token: 'attribute.name', foreground: '9CDCFE' },
      { token: 'attribute.value', foreground: 'CE9178' }
    ],
    colors: {
      'editor.background': '#1E1E1E',
      'editor.foreground': '#D4D4D4',
      'editor.lineHighlightBackground': '#2A2D2E',
      'editor.selectionBackground': '#264F78',
      'editor.inactiveSelectionBackground': '#3A3D41',
      'editorLineNumber.foreground': '#858585',
      'editorLineNumber.activeForeground': '#C6C6C6',
      'editorCursor.foreground': '#AEAFAD',
      'editor.wordHighlightBackground': '#575757',
      'editor.wordHighlightStrongBackground': '#004972',
      'editor.findMatchBackground': '#515C6A',
      'editor.findMatchHighlightBackground': '#EA5C0055',
      'editorBracketMatch.background': '#0064001a',
      'editorBracketMatch.border': '#888888',
      'editorGutter.background': '#1E1E1E',
      'editorGutter.modifiedBackground': '#0C7D9D',
      'editorGutter.addedBackground': '#587C0C',
      'editorGutter.deletedBackground': '#94151B',
      'scrollbar.shadow': '#000000',
      'scrollbarSlider.background': '#797979b3',
      'scrollbarSlider.hoverBackground': '#646464b3',
      'scrollbarSlider.activeBackground': '#bfbfbf66'
    }
  });

  // Atom One Dark Theme
  monaco.editor.defineTheme('atom-one-dark', {
    base: 'vs-dark',
    inherit: true,
    rules: [
      { token: 'comment', foreground: '5C6370', fontStyle: 'italic' },
      { token: 'keyword', foreground: 'C678DD' },
      { token: 'string', foreground: '98C379' },
      { token: 'number', foreground: 'D19A66' },
      { token: 'function', foreground: '61AFEF' },
      { token: 'variable', foreground: 'E06C75' },
      { token: 'type', foreground: 'E5C07B' },
      { token: 'class', foreground: 'E5C07B' },
      { token: 'constant', foreground: 'D19A66' },
      { token: 'parameter', foreground: 'ABB2BF' },
      { token: 'property', foreground: 'E06C75' },
      { token: 'operator', foreground: '56B6C2' },
      { token: 'tag', foreground: 'E06C75' },
      { token: 'attribute.name', foreground: 'D19A66' },
      { token: 'attribute.value', foreground: '98C379' }
    ],
    colors: {
      'editor.background': '#282C34',
      'editor.foreground': '#ABB2BF',
      'editor.lineHighlightBackground': '#2C313C',
      'editor.selectionBackground': '#3E4451',
      'editorLineNumber.foreground': '#5C6370',
      'editorLineNumber.activeForeground': '#ABB2BF',
      'editorCursor.foreground': '#528BFF',
      'editor.wordHighlightBackground': '#484E5B',
      'editor.wordHighlightStrongBackground': '#5C6370',
      'editor.findMatchBackground': '#314365',
      'editor.findMatchHighlightBackground': '#314365',
      'editorBracketMatch.background': '#515A6B',
      'editorBracketMatch.border': '#515A6B',
      'editorGutter.background': '#282C34',
      'scrollbar.shadow': '#23252C',
      'scrollbarSlider.background': '#4E566680',
      'scrollbarSlider.hoverBackground': '#5A637580',
      'scrollbarSlider.activeBackground': '#747D9180'
    }
  });
}

// Configure languages
function configureLanguages(monaco) {
  // Register additional file associations
  monaco.languages.register({ id: 'javascript' });
  monaco.languages.register({ id: 'typescript' });
  monaco.languages.register({ id: 'html' });
  monaco.languages.register({ id: 'css' });
  monaco.languages.register({ id: 'json' });
  monaco.languages.register({ id: 'markdown' });
  monaco.languages.register({ id: 'python' });
  monaco.languages.register({ id: 'java' });
  monaco.languages.register({ id: 'cpp' });
  monaco.languages.register({ id: 'csharp' });
  monaco.languages.register({ id: 'php' });
  monaco.languages.register({ id: 'ruby' });
  monaco.languages.register({ id: 'go' });
  monaco.languages.register({ id: 'rust' });
  monaco.languages.register({ id: 'swift' });
  monaco.languages.register({ id: 'kotlin' });
  monaco.languages.register({ id: 'sql' });
  monaco.languages.register({ id: 'yaml' });
  monaco.languages.register({ id: 'xml' });

  // Configure JavaScript/TypeScript compiler options
  monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
    target: monaco.languages.typescript.ScriptTarget.Latest,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.ESNext,
    noEmit: true,
    esModuleInterop: true,
    jsx: monaco.languages.typescript.JsxEmit.React,
    allowJs: true,
    typeRoots: ['node_modules/@types']
  });

  // Set diagnostics options
  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: false,
    noSyntaxValidation: false,
    noSuggestionDiagnostics: false,
    diagnosticCodesToIgnore: [1375, 1378]
  });

  // Add extra libraries for better IntelliSense
  const libSource = `
    declare class Console {
      log(...args: any[]): void;
      error(...args: any[]): void;
      warn(...args: any[]): void;
      info(...args: any[]): void;
      table(data: any): void;
      time(label: string): void;
      timeEnd(label: string): void;
      clear(): void;
    }
    declare const console: Console;
    
    declare function setTimeout(callback: Function, delay: number): number;
    declare function setInterval(callback: Function, delay: number): number;
    declare function clearTimeout(id: number): void;
    declare function clearInterval(id: number): void;
    
    declare const window: Window & typeof globalThis;
    declare const document: Document;
    declare const localStorage: Storage;
    declare const sessionStorage: Storage;
  `;

  monaco.languages.typescript.javascriptDefaults.addExtraLib(libSource, 'globals.d.ts');
}

// Add custom commands
function addCustomCommands(monaco) {
  // Register custom actions
  monaco.editor.addEditorAction({
    id: 'custom.jumpToLine',
    label: 'Jump to Line',
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyG],
    run: (editor) => {
      editor.getAction('editor.action.gotoLine').run();
    }
  });

  monaco.editor.addEditorAction({
    id: 'custom.duplicateLine',
    label: 'Duplicate Line',
    keybindings: [monaco.KeyMod.Alt | monaco.KeyMod.Shift | monaco.KeyCode.DownArrow],
    run: (editor) => {
      editor.getAction('editor.action.copyLinesDownAction').run();
    }
  });

  monaco.editor.addEditorAction({
    id: 'custom.deleteLine',
    label: 'Delete Line',
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyK],
    run: (editor) => {
      editor.getAction('editor.action.deleteLines').run();
    }
  });

  monaco.editor.addEditorAction({
    id: 'custom.toggleComment',
    label: 'Toggle Comment',
    keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.Slash],
    run: (editor) => {
      editor.getAction('editor.action.commentLine').run();
    }
  });
}

// Configure IntelliSense
function configureIntelliSense(monaco) {
  // Register completion item provider for JavaScript
  monaco.languages.registerCompletionItemProvider('javascript', {
    provideCompletionItems: (model, position) => {
      const suggestions = [
        // Console methods
        {
          label: 'log',
          kind: monaco.languages.CompletionItemKind.Method,
          insertText: 'log(${1:message})',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Log a message to the console'
        },
        {
          label: 'console.log',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'console.log(${1:message});',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Log a message to the console'
        },
        // Common snippets
        {
          label: 'function',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'function ${1:name}(${2:params}) {\n\t${3:// body}\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Function declaration'
        },
        {
          label: 'if',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'if (${1:condition}) {\n\t${2:// body}\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'If statement'
        },
        {
          label: 'for',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'for (let ${1:i} = 0; ${1:i} < ${2:array}.length; ${1:i}++) {\n\t${3:// body}\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'For loop'
        },
        {
          label: 'forEach',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: '${1:array}.forEach((${2:item}) => {\n\t${3:// body}\n});',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Array forEach method'
        },
        {
          label: 'arrow',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'const ${1:name} = (${2:params}) => {\n\t${3:// body}\n};',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Arrow function'
        },
        {
          label: 'async',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'async function ${1:name}(${2:params}) {\n\t${3:// body}\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Async function'
        },
        {
          label: 'try',
          kind: monaco.languages.CompletionItemKind.Snippet,
          insertText: 'try {\n\t${1:// try block}\n} catch (${2:error}) {\n\t${3:// catch block}\n}',
          insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
          documentation: 'Try-catch block'
        }
      ];
      
      return { suggestions: suggestions };
    }
  });

  // Register similar providers for other languages
  ['typescript', 'jsx', 'tsx'].forEach(lang => {
    monaco.languages.registerCompletionItemProvider(lang, {
      provideCompletionItems: (model, position) => {
        // Return appropriate suggestions based on language
        return { suggestions: [] };
      }
    });
  });
}

// Add keybindings
function addKeybindings(editor, monaco) {
  // Save
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
    editor.getAction('editor.action.formatDocument').run();
    console.log('Save triggered');
  });

  // Format document
  editor.addCommand(monaco.KeyMod.Alt | monaco.KeyMod.Shift | monaco.KeyCode.KeyF, () => {
    editor.getAction('editor.action.formatDocument').run();
  });

  // Find
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyF, () => {
    editor.getAction('actions.find').run();
  });

  // Replace
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyH, () => {
    editor.getAction('editor.action.startFindReplaceAction').run();
  });

  // Go to line
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyG, () => {
    editor.getAction('editor.action.gotoLine').run();
  });

  // Select all
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyA, () => {
    editor.getAction('editor.action.selectAll').run();
  });

  // Multi-cursor
  editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.UpArrow, () => {
    editor.getAction('editor.action.insertCursorAbove').run();
  });

  editor.addCommand(monaco.KeyMod.Alt | monaco.KeyCode.DownArrow, () => {
    editor.getAction('editor.action.insertCursorBelow').run();
  });

  // Quick fix
  editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Period, () => {
    editor.getAction('editor.action.quickFix').run();
  });

  // Rename symbol
  editor.addCommand(monaco.KeyCode.F2, () => {
    editor.getAction('editor.action.rename').run();
  });
}

// Setup auto-completions based on language
function setupAutoCompletions(editor, monaco, language) {
  // Language-specific configurations
  const languageConfig = {
    javascript: {
      snippets: true,
      emmet: false,
      brackets: true
    },
    html: {
      snippets: true,
      emmet: true,
      brackets: true
    },
    css: {
      snippets: true,
      emmet: true,
      brackets: true
    },
    python: {
      snippets: true,
      emmet: false,
      brackets: true
    }
  };

  const config = languageConfig[language] || { snippets: true, emmet: false, brackets: true };

  // Configure based on language
  if (config.emmet && (language === 'html' || language === 'css')) {
    // Emmet configuration would go here
    console.log('Emmet support configured for', language);
  }
}

// Setup error markers for real-time error detection
function setupErrorMarkers(editor, monaco) {
  let decorations = [];

  // Function to validate JavaScript code
  const validateJavaScript = (code) => {
    const errors = [];
    
    try {
      // Basic syntax check using Function constructor
      new Function(code);
    } catch (error) {
      const match = error.message.match(/at position (\d+)/);
      const position = match ? parseInt(match[1]) : 0;
      const model = editor.getModel();
      const positionInfo = model.getPositionAt(position);
      
      errors.push({
        startLineNumber: positionInfo.lineNumber,
        startColumn: positionInfo.column,
        endLineNumber: positionInfo.lineNumber,
        endColumn: positionInfo.column + 1,
        message: error.message,
        severity: monaco.MarkerSeverity.Error
      });
    }
    
    return errors;
  };

  // Update markers on content change
  editor.onDidChangeModelContent(() => {
    const model = editor.getModel();
    const language = model.getLanguageId();
    
    if (language === 'javascript') {
      const code = model.getValue();
      const errors = validateJavaScript(code);
      monaco.editor.setModelMarkers(model, 'javascript', errors);
    }
  });
}

export default EnhancedMonacoEditor;