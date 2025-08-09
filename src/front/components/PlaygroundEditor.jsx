// src/front/components/PlaygroundEditor.jsx
import React, { useRef, useEffect } from 'react';

const PlaygroundEditor = ({ 
  language = 'javascript', 
  value = '', 
  onChange, 
  theme = 'dark',
  height = '100%'
}) => {
  const textareaRef = useRef(null);
  const lineNumbersRef = useRef(null);
  const highlightedRef = useRef(null);

  useEffect(() => {
    updateLineNumbers();
    applySyntaxHighlighting();
  }, [value, theme]);

  const updateLineNumbers = () => {
    if (!textareaRef.current || !lineNumbersRef.current) return;
    
    const lines = value.split('\n').length;
    const lineNumbers = Array.from({ length: lines }, (_, i) => i + 1).join('\n');
    lineNumbersRef.current.value = lineNumbers;
    
    textareaRef.current.scrollTop = lineNumbersRef.current.scrollTop;
  };

  const handleScroll = () => {
    if (lineNumbersRef.current && textareaRef.current && highlightedRef.current) {
      lineNumbersRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightedRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightedRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };

  const handleKeyDown = (e) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd } = textarea;

    // Tab handling
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

    // Auto-closing brackets and quotes
    const pairs = { 
      '(': ')', 
      '[': ']', 
      '{': '}', 
      '"': '"', 
      "'": "'", 
      '`': '`' 
    };

    if (pairs[e.key] && selectionStart === selectionEnd) {
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

    // Auto-indent on Enter
    if (e.key === 'Enter') {
      const currentLine = value.substring(0, selectionStart).split('\n').pop();
      const indentMatch = currentLine.match(/^(\s*)/);
      const indent = indentMatch ? indentMatch[1] : '';
      const charBefore = value[selectionStart - 1];
      const charAfter = value[selectionStart];
      
      if (charBefore === '{' && charAfter === '}') {
        e.preventDefault();
        const newValue = 
          value.substring(0, selectionStart) + 
          '\n' + indent + '  \n' + indent + 
          value.substring(selectionEnd);
        onChange(newValue);
        
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = selectionStart + indent.length + 3;
        }, 0);
      } else if (charBefore === '{' || charBefore === '[' || charBefore === '(') {
        e.preventDefault();
        const newValue = 
          value.substring(0, selectionStart) + 
          '\n' + indent + '  ' + 
          value.substring(selectionEnd);
        onChange(newValue);
        
        setTimeout(() => {
          textarea.selectionStart = textarea.selectionEnd = selectionStart + indent.length + 3;
        }, 0);
      }
    }
  };

  const applySyntaxHighlighting = () => {
    if (!highlightedRef.current) return;
    
    let highlighted = value;
    
    // Simple syntax highlighting patterns
    const patterns = {
      javascript: [
        // Keywords
        { regex: /\b(const|let|var|function|return|if|else|for|while|do|switch|case|break|continue|try|catch|finally|throw|new|this|class|extends|async|await|import|export|default|from)\b/g, class: 'keyword' },
        // Strings
        { regex: /(["'`])(?:(?=(\\?))\2[\s\S])*?\1/g, class: 'string' },
        // Comments
        { regex: /\/\/.*$/gm, class: 'comment' },
        { regex: /\/\*[\s\S]*?\*\//g, class: 'comment' },
        // Numbers
        { regex: /\b\d+(\.\d+)?\b/g, class: 'number' },
        // Functions
        { regex: /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g, class: 'function' },
      ],
      css: [
        // Selectors
        { regex: /[.#]?[a-zA-Z][a-zA-Z0-9-_]*/g, class: 'selector' },
        // Properties
        { regex: /[a-zA-Z-]+(?=\s*:)/g, class: 'property' },
        // Values
        { regex: /:\s*([^;]+)/g, class: 'value' },
        // Comments
        { regex: /\/\*[\s\S]*?\*\//g, class: 'comment' },
      ],
      html: [
        // Tags
        { regex: /<\/?[a-zA-Z][a-zA-Z0-9-]*.*?>/g, class: 'tag' },
        // Attributes
        { regex: /[a-zA-Z-]+(?==)/g, class: 'attribute' },
        // Strings
        { regex: /(["'])(?:(?=(\\?))\2[\s\S])*?\1/g, class: 'string' },
        // Comments
        { regex: /<!--[\s\S]*?-->/g, class: 'comment' },
      ]
    };

    const languagePatterns = patterns[language] || patterns.javascript;
    
    // Escape HTML
    highlighted = highlighted
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    
    // Apply syntax highlighting
    languagePatterns.forEach(({ regex, class: className }) => {
      highlighted = highlighted.replace(regex, `<span class="${className}">$&</span>`);
    });
    
    highlightedRef.current.innerHTML = highlighted + '\n';
  };

  const themeStyles = {
    dark: {
      bg: '#1e1e1e',
      text: '#d4d4d4',
      lineNumbers: '#858585',
      keyword: '#569cd6',
      string: '#ce9178',
      comment: '#6a9955',
      number: '#b5cea8',
      function: '#dcdcaa',
      property: '#9cdcfe',
      selector: '#d7ba7d',
      tag: '#569cd6',
      attribute: '#9cdcfe'
    },
    dracula: {
      bg: '#282a36',
      text: '#f8f8f2',
      lineNumbers: '#6272a4',
      keyword: '#ff79c6',
      string: '#f1fa8c',
      comment: '#6272a4',
      number: '#bd93f9',
      function: '#50fa7b',
      property: '#8be9fd',
      selector: '#50fa7b',
      tag: '#ff79c6',
      attribute: '#50fa7b'
    },
    matcha: {
      bg: '#1e301e',
      text: '#d4e8d4',
      lineNumbers: '#5fa05f',
      keyword: '#a8d0a8',
      string: '#b89968',
      comment: '#7cb77c',
      number: '#d4c0a0',
      function: '#d4e8d4',
      property: '#a8d0a8',
      selector: '#5fa05f',
      tag: '#a8d0a8',
      attribute: '#b89968'
    },
    monokai: {
      bg: '#272822',
      text: '#f8f8f2',
      lineNumbers: '#75715e',
      keyword: '#f92672',
      string: '#e6db74',
      comment: '#75715e',
      number: '#ae81ff',
      function: '#a6e22e',
      property: '#66d9ef',
      selector: '#a6e22e',
      tag: '#f92672',
      attribute: '#a6e22e'
    },
    github: {
      bg: '#ffffff',
      text: '#24292e',
      lineNumbers: '#959da5',
      keyword: '#d73a49',
      string: '#032f62',
      comment: '#6a737d',
      number: '#005cc5',
      function: '#6f42c1',
      property: '#005cc5',
      selector: '#22863a',
      tag: '#22863a',
      attribute: '#6f42c1'
    },
    wood: {
      bg: '#faf8f5',
      text: '#4a3925',
      lineNumbers: '#b89968',
      keyword: '#a07c48',
      string: '#8a6a3e',
      comment: '#d4c0a0',
      number: '#6e5432',
      function: '#5c462b',
      property: '#8a6a3e',
      selector: '#a07c48',
      tag: '#b89968',
      attribute: '#6e5432'
    }
  };

  const colors = themeStyles[theme] || themeStyles.dark;

  const editorStyle = {
    container: {
      display: 'flex',
      height: height,
      backgroundColor: colors.bg,
      borderRadius: '8px',
      overflow: 'hidden',
      fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
      fontSize: '14px',
      position: 'relative'
    },
    lineNumbers: {
      width: '50px',
      padding: '12px 8px',
      backgroundColor: colors.bg,
      color: colors.lineNumbers,
      borderRight: `1px solid ${colors.lineNumbers}40`,
      textAlign: 'right',
      resize: 'none',
      outline: 'none',
      overflow: 'hidden',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      lineHeight: '1.5'
    },
    editorWrapper: {
      flex: 1,
      position: 'relative',
      overflow: 'hidden'
    },
    highlighted: {
      position: 'absolute',
      top: 0,
      left: 0,
      padding: '12px',
      pointerEvents: 'none',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      lineHeight: '1.5',
      overflow: 'auto',
      width: '100%',
      height: '100%'
    },
    textarea: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      padding: '12px',
      backgroundColor: 'transparent',
      color: 'transparent',
      caretColor: colors.text,
      resize: 'none',
      outline: 'none',
      border: 'none',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      lineHeight: '1.5',
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word',
      overflow: 'auto'
    }
  };

  const highlightStyles = `
    .keyword { color: ${colors.keyword}; font-weight: bold; }
    .string { color: ${colors.string}; }
    .comment { color: ${colors.comment}; font-style: italic; }
    .number { color: ${colors.number}; }
    .function { color: ${colors.function}; }
    .property { color: ${colors.property}; }
    .selector { color: ${colors.selector}; }
    .tag { color: ${colors.tag}; }
    .attribute { color: ${colors.attribute}; }
    .value { color: ${colors.string}; }
  `;

  return (
    <div style={editorStyle.container}>
      <style>{highlightStyles}</style>
      
      <textarea
        ref={lineNumbersRef}
        style={editorStyle.lineNumbers}
        readOnly
        value="1"
      />
      
      <div style={editorStyle.editorWrapper}>
        <div
          ref={highlightedRef}
          style={{...editorStyle.highlighted, color: colors.text}}
        />
        
        <textarea
          ref={textareaRef}
          style={editorStyle.textarea}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onScroll={handleScroll}
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          placeholder={`// Write your ${language} code here...`}
        />
      </div>
    </div>
  );
};

export default PlaygroundEditor;