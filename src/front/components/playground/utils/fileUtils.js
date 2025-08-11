// src/front/components/playground/utils/fileUtils.js

export const getFileIcon = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  const icons = {
    // Web files
    html: '📄',
    htm: '📄',
    css: '🎨',
    scss: '🎨',
    sass: '🎨',
    less: '🎨',
    
    // JavaScript
    js: '📜',
    jsx: '⚛️',
    ts: '📘',
    tsx: '⚛️',
    mjs: '📜',
    
    // Data files
    json: '📊',
    xml: '📋',
    yaml: '📝',
    yml: '📝',
    toml: '📝',
    
    // Python
    py: '🐍',
    pyw: '🐍',
    pyc: '🐍',
    
    // Other languages
    java: '☕',
    c: '🔷',
    cpp: '🔷',
    cs: '🔷',
    php: '🐘',
    rb: '💎',
    go: '🐹',
    rs: '🦀',
    swift: '🦉',
    kt: '🟪',
    
    // Configs
    env: '⚙️',
    config: '⚙️',
    ini: '⚙️',
    
    // Docs
    md: '📝',
    txt: '📃',
    pdf: '📕',
    doc: '📘',
    docx: '📘',
    
    // Images
    png: '🖼️',
    jpg: '🖼️',
    jpeg: '🖼️',
    gif: '🖼️',
    svg: '🎭',
    ico: '🖼️',
    
    // Default
    default: '📄'
  };
  
  return icons[ext] || icons.default;
};

export const getLanguageFromExtension = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  const languages = {
    // Web
    html: 'html',
    htm: 'html',
    css: 'css',
    scss: 'scss',
    sass: 'sass',
    less: 'less',
    
    // JavaScript variants
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
    mjs: 'javascript',
    
    // Data
    json: 'json',
    xml: 'xml',
    yaml: 'yaml',
    yml: 'yaml',
    toml: 'toml',
    
    // Python
    py: 'python',
    pyw: 'python',
    
    // Other languages
    java: 'java',
    c: 'c',
    cpp: 'cpp',
    'c++': 'cpp',
    cs: 'csharp',
    php: 'php',
    rb: 'ruby',
    go: 'go',
    rs: 'rust',
    swift: 'swift',
    kt: 'kotlin',
    sh: 'shell',
    bash: 'shell',
    sql: 'sql',
    r: 'r',
    
    // Configs
    env: 'plaintext',
    config: 'plaintext',
    ini: 'ini',
    
    // Docs
    md: 'markdown',
    txt: 'plaintext',
    
    // Default
    default: 'plaintext'
  };
  
  return languages[ext] || languages.default;
};

export const getDefaultContent = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  
  const templates = {
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>`,
    
    css: `/* CSS styles */
body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
}`,
    
    js: `// JavaScript code
console.log('Hello, World!');`,
    
    jsx: `import React from 'react';

const Component = () => {
    return (
        <div>
            <h1>React Component</h1>
        </div>
    );
};

export default Component;`,
    
    py: `# Python script
def main():
    print("Hello, World!")

if __name__ == "__main__":
    main()`,
    
    json: `{
    "name": "project",
    "version": "1.0.0"
}`,
    
    md: `# Title

## Description

Content here...`,
    
    default: ''
  };
  
  return templates[ext] || templates.default;
};