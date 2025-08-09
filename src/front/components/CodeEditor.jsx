import React, { useEffect, useRef } from 'react';

const CodeEditor = ({ language = 'javascript', value = '', onChange, theme = 'dark', readOnly = false }) => {
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

    if (e.key === 'Tab') {
      e.preventDefault();
      const newValue = 
        value.substring(0, selectionStart) + 
        '  ' + 
        value.substring(selectionEnd);
      
      onChange(newValue);
      
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = selectionStart + 2;
      }, 0);
    }

    const pairs = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'", '`': '`' };

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

  const themeColors = {
    dark: {
      bg: '#1e1e1e',
      text: '#d4d4d4',
      lineNumbers: '#858585',
      selection: '#264f78'
    },
    light: {
      bg: '#ffffff',
      text: '#000000',
      lineNumbers: '#237893',
      selection: '#c8e4fd'
    },
    matcha: {
      bg: '#1e301e',
      text: '#d4e8d4',
      lineNumbers: '#5fa05f',
      selection: '#325c32'
    }
  };

  const colors = themeColors[theme] || themeColors.dark;

  return (
    <div className="flex h-full bg-gray-900 rounded-lg overflow-hidden" style={{ backgroundColor: colors.bg }}>
      <textarea
        ref={lineNumbersRef}
        className="text-right text-sm p-3 w-12 border-r resize-none outline-none"
        style={{
          backgroundColor: colors.bg,
          color: colors.lineNumbers,
          borderColor: colors.lineNumbers + '40'
        }}
        readOnly
        value="1"
      />
      
      <textarea
        ref={textareaRef}
        className="flex-1 p-3 text-sm font-mono resize-none outline-none"
        style={{
          backgroundColor: colors.bg,
          color: colors.text,
          fontFamily: "'Fira Code', 'Monaco', 'Menlo', monospace"
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onScroll={handleScroll}
        readOnly={readOnly}
        spellCheck={false}
        placeholder={`// Write your ${language} code here...`}
      />
    </div>
  );
};

export default CodeEditor;