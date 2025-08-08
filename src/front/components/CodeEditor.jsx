// src/front/components/CodeEditor.jsx
import React, { useEffect, useRef } from 'react';

const CodeEditor = ({ language, value, onChange, theme = 'dracula', readOnly = false }) => {
    const textareaRef = useRef(null);
    const lineNumbersRef = useRef(null);

    useEffect(() => {
        updateLineNumbers();
    }, [value]);

    const updateLineNumbers = () => {
        if (!textareaRef.current || !lineNumbersRef.current) return;
        
        const lines = value.split('\n').length;
        const lineNumbers = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
        lineNumbersRef.current.value = lineNumbers;
        
        // Sync scroll
        textareaRef.current.scrollTop = lineNumbersRef.current.scrollTop;
    };

    const handleScroll = () => {
        if (lineNumbersRef.current && textareaRef.current) {
            lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
        }
    };

    const handleKeyDown = (e) => {
        const textarea = textareaRef.current;
        if (!textarea) return;

        const { selectionStart, selectionEnd } = textarea;

        // Handle Tab
        if (e.key === 'Tab') {
            e.preventDefault();
            const newValue = 
                value.substring(0, selectionStart) + 
                '    ' + 
                value.substring(selectionEnd);
            
            onChange(newValue);
            
            // Reset cursor position
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = selectionStart + 4;
            }, 0);
        }

        // Auto-close brackets
        const pairs = {
            '(': ')',
            '[': ']',
            '{': '}',
            '"': '"',
            "'": "'",
            '`': '`'
        };

        if (pairs[e.key]) {
            e.preventDefault();
            const newValue = 
                value.substring(0, selectionStart) + 
                e.key + pairs[e.key] + 
                value.substring(selectionEnd);
            
            onChange(newValue);
            
            setTimeout(() => {
                textarea.selectionStart = textarea.selectionEnd = selectionStart + 1;
            }, 0);
        }
    };

    const getThemeColors = () => {
        const themes = {
            dracula: {
                bg: '#282a36',
                text: '#f8f8f2',
                lineNumbers: '#6272a4',
                selection: '#44475a'
            },
            monokai: {
                bg: '#272822',
                text: '#f8f8f2',
                lineNumbers: '#75715e',
                selection: '#49483e'
            },
            github: {
                bg: '#ffffff',
                text: '#24292e',
                lineNumbers: '#959da5',
                selection: '#c8e1ff'
            },
            tomorrow: {
                bg: '#1d1f21',
                text: '#c5c8c6',
                lineNumbers: '#969896',
                selection: '#373b41'
            },
            matcha: {
                bg: '#1e301e',
                text: '#d4e8d4',
                lineNumbers: '#5fa05f',
                selection: '#325c32'
            }
        };

        return themes[theme] || themes.dracula;
    };

    const colors = getThemeColors();

    return (
        <div className="code-editor-container" style={{ 
            height: '100%', 
            display: 'flex',
            backgroundColor: colors.bg,
            borderRadius: '0 0 8px 8px',
            overflow: 'hidden'
        }}>
            {/* Line Numbers */}
            <textarea
                ref={lineNumbersRef}
                className="line-numbers"
                readOnly
                value="1"
                style={{
                    width: '50px',
                    padding: '12px 8px',
                    backgroundColor: colors.bg,
                    color: colors.lineNumbers,
                    border: 'none',
                    outline: 'none',
                    resize: 'none',
                    textAlign: 'right',
                    fontFamily: "'Fira Code', 'Courier New', monospace",
                    fontSize: '14px',
                    lineHeight: '1.5',
                    overflow: 'hidden',
                    cursor: 'default'
                }}
            />

            {/* Code Editor */}
            <textarea
                ref={textareaRef}
                className="code-textarea"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={handleKeyDown}
                onScroll={handleScroll}
                readOnly={readOnly}
                spellCheck={false}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                style={{
                    flex: 1,
                    padding: '12px',
                    backgroundColor: colors.bg,
                    color: colors.text,
                    border: 'none',
                    outline: 'none',
                    resize: 'none',
                    fontFamily: "'Fira Code', 'Courier New', monospace",
                    fontSize: '14px',
                    lineHeight: '1.5',
                    tabSize: 4,
                    overflowX: 'auto'
                }}
                placeholder={`// Write your ${language} code here...`}
            />

            {/* Syntax Highlighting Overlay (simplified) */}
            {language === 'javascript' && (
                <style>{`
                    .code-textarea::selection {
                        background-color: ${colors.selection};
                    }
                `}</style>
            )}
        </div>
    );
};

export default CodeEditor;