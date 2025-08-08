// src/front/components/MonacoEditor.jsx
import React, { useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';

const MonacoEditor = ({ 
    language = 'javascript', 
    value = '', 
    onChange = () => {}, 
    theme = 'vs-dark',
    height = '400px',
    readOnly = false,
    minimap = false,
    fontSize = 14,
    wordWrap = 'on',
    placeholder = '// Start coding...',
    options = {}
}) => {
    const editorRef = useRef(null);

    // Define custom themes
    const defineThemes = (monaco) => {
        // Matcha Theme
        monaco.editor.defineTheme('matcha', {
            base: 'vs-dark',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '7cb77c', fontStyle: 'italic' },
                { token: 'keyword', foreground: '5fa05f' },
                { token: 'string', foreground: 'a8d0a8' },
                { token: 'number', foreground: 'b89968' },
                { token: 'regexp', foreground: 'd4e8d4' },
                { token: 'operator', foreground: '4a8a4a' },
                { token: 'namespace', foreground: '66d9ef' },
                { token: 'type', foreground: '66d9ef' },
                { token: 'struct', foreground: '66d9ef' },
                { token: 'class', foreground: '66d9ef' },
                { token: 'interface', foreground: '66d9ef' },
                { token: 'enum', foreground: '66d9ef' },
                { token: 'typeParameter', foreground: '66d9ef' },
                { token: 'function', foreground: 'd4e8d4' },
                { token: 'member', foreground: 'f8f8f2' },
                { token: 'macro', foreground: 'a6e22e' },
                { token: 'variable', foreground: 'f8f8f2' },
                { token: 'parameter', foreground: 'fd971f' },
                { token: 'property', foreground: 'f8f8f2' },
                { token: 'label', foreground: 'e6db74' },
                { token: 'type.identifier', foreground: '66d9ef' },
                { token: 'constant', foreground: 'ae81ff' },
                { token: 'constant.numeric', foreground: 'ae81ff' },
                { token: 'constant.character', foreground: 'ae81ff' },
                { token: 'constant.character.escape', foreground: 'ae81ff' },
            ],
            colors: {
                'editor.background': '#1e301e',
                'editor.foreground': '#d4e8d4',
                'editor.lineHighlightBackground': '#284628',
                'editor.selectionBackground': '#325c32',
                'editor.inactiveSelectionBackground': '#2a4a2a',
                'editorCursor.foreground': '#5fa05f',
                'editorWhitespace.foreground': '#3d733d',
                'editorIndentGuide.background': '#3d733d',
                'editorIndentGuide.activeBackground': '#5fa05f',
                'editor.selectionHighlightBackground': '#3d733d88',
                'editorBracketMatch.background': '#4a8a4a',
                'editorBracketMatch.border': '#5fa05f',
                'editorGutter.background': '#1e301e',
                'editorLineNumber.foreground': '#5fa05f',
                'editorLineNumber.activeForeground': '#a8d0a8',
                'editorOverviewRuler.border': '#1e301e',
                'scrollbar.shadow': '#1e301e',
                'scrollbarSlider.background': '#4a8a4a33',
                'scrollbarSlider.hoverBackground': '#4a8a4a66',
                'scrollbarSlider.activeBackground': '#4a8a4a99',
            }
        });

        // Wood Theme
        monaco.editor.defineTheme('wood', {
            base: 'vs',
            inherit: true,
            rules: [
                { token: 'comment', foreground: '8a6a3e', fontStyle: 'italic' },
                { token: 'keyword', foreground: 'a07c48' },
                { token: 'string', foreground: 'b89968' },
                { token: 'number', foreground: '6e5432' },
                { token: 'regexp', foreground: 'd4c0a0' },
                { token: 'operator', foreground: '5c462b' },
                { token: 'function', foreground: '8a6a3e' },
                { token: 'variable', foreground: '4a3925' },
            ],
            colors: {
                'editor.background': '#faf8f5',
                'editor.foreground': '#4a3925',
                'editor.lineHighlightBackground': '#f3ede4',
                'editor.selectionBackground': '#e7dbc9',
                'editorCursor.foreground': '#a07c48',
                'editorLineNumber.foreground': '#b89968',
            }
        });
    };

    const handleEditorWillMount = (monaco) => {
        // Define custom themes before editor mounts
        defineThemes(monaco);

        // Register custom languages or completions if needed
        monaco.languages.registerCompletionItemProvider('javascript', {
            provideCompletionItems: () => {
                const suggestions = [
                    {
                        label: 'console.log',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'console.log(${1:message});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Log output to console'
                    },
                    {
                        label: 'function',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'function ${1:name}(${2:params}) {\n\t${3:// body}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Function declaration'
                    },
                    {
                        label: 'arrow',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'const ${1:name} = (${2:params}) => {\n\t${3:// body}\n};',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Arrow function'
                    },
                    {
                        label: 'forEach',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '${1:array}.forEach((${2:item}) => {\n\t${3:// body}\n});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Array forEach loop'
                    },
                    {
                        label: 'map',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: '${1:array}.map((${2:item}) => {\n\treturn ${3:item};\n});',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Array map method'
                    },
                    {
                        label: 'async',
                        kind: monaco.languages.CompletionItemKind.Snippet,
                        insertText: 'async function ${1:name}() {\n\ttry {\n\t\tconst result = await ${2:promise};\n\t\t${3:// handle result}\n\t} catch (error) {\n\t\tconsole.error(error);\n\t}\n}',
                        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
                        documentation: 'Async function with try-catch'
                    }
                ];
                return { suggestions };
            }
        });

        // Set up JavaScript/TypeScript compiler options
        monaco.languages.typescript.javascriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.ES2020,
            allowNonTsExtensions: true,
            moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            module: monaco.languages.typescript.ModuleKind.CommonJS,
            noEmit: true,
            esModuleInterop: true,
            allowJs: true,
            typeRoots: ["node_modules/@types"]
        });

        // Enable JavaScript validation
        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSemanticValidation: false,
            noSyntaxValidation: false
        });
    };

    const handleEditorDidMount = (editor, monaco) => {
        editorRef.current = editor;

        // Add custom keybindings
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S, () => {
            // Save functionality
            console.log('Save triggered');
        });

        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_B, () => {
            // Format document
            editor.getAction('editor.action.formatDocument').run();
        });

        // Set up auto-formatting on paste
        editor.onDidPaste(() => {
            editor.getAction('editor.action.formatDocument').run();
        });
    };

    const editorOptions = {
        minimap: { enabled: minimap },
        fontSize,
        wordWrap,
        automaticLayout: true,
        scrollBeyondLastLine: false,
        readOnly,
        lineNumbers: 'on',
        glyphMargin: false,
        folding: true,
        lineDecorationsWidth: 10,
        lineNumbersMinChars: 3,
        renderLineHighlight: 'all',
        scrollbar: {
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10,
            vertical: 'auto',
            horizontal: 'auto'
        },
        suggestOnTriggerCharacters: true,
        quickSuggestions: {
            other: true,
            comments: false,
            strings: false
        },
        autoClosingBrackets: 'always',
        autoClosingQuotes: 'always',
        autoSurround: 'languageDefined',
        autoIndent: 'full',
        formatOnPaste: true,
        formatOnType: true,
        tabSize: 2,
        insertSpaces: true,
        trimAutoWhitespace: true,
        ...options
    };

    const getThemeMap = () => {
        const themeMap = {
            'dracula': 'vs-dark',
            'vs-dark': 'vs-dark',
            'vs-light': 'light',
            'light': 'light',
            'matcha': 'matcha',
            'wood': 'wood',
            'github-dark': 'vs-dark',
            'github-light': 'light'
        };
        return themeMap[theme] || 'vs-dark';
    };

    return (
        <div className="monaco-editor-wrapper" style={{ 
            height, 
            border: '1px solid #e1e4e8',
            borderRadius: '8px',
            overflow: 'hidden'
        }}>
            <Editor
                height={height}
                language={language}
                value={value}
                theme={getThemeMap()}
                onChange={onChange}
                beforeMount={handleEditorWillMount}
                onMount={handleEditorDidMount}
                options={editorOptions}
                loading={
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <div className="spinner-border text-success" role="status">
                            <span className="visually-hidden">Loading editor...</span>
                        </div>
                    </div>
                }
            />
        </div>
    );
};

export default MonacoEditor;