// src/front/components/playground/utils/enhancedPlaygroundUtils.js

// Enhanced file utilities with more language support
export const getFileLanguage = (filename) => {
  const ext = filename.split('.').pop().toLowerCase();
  const languageMap = {
    // Web
    'html': 'html',
    'htm': 'html',
    'css': 'css',
    'scss': 'scss',
    'sass': 'sass',
    'less': 'less',
    
    // JavaScript/TypeScript
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'mjs': 'javascript',
    'cjs': 'javascript',
    
    // Frameworks
    'vue': 'vue',
    'svelte': 'svelte',
    
    // Data
    'json': 'json',
    'xml': 'xml',
    'yaml': 'yaml',
    'yml': 'yaml',
    'toml': 'toml',
    'ini': 'ini',
    
    // Languages
    'py': 'python',
    'java': 'java',
    'c': 'c',
    'cpp': 'cpp',
    'cs': 'csharp',
    'php': 'php',
    'rb': 'ruby',
    'go': 'go',
    'rs': 'rust',
    'swift': 'swift',
    'kt': 'kotlin',
    'scala': 'scala',
    'r': 'r',
    'lua': 'lua',
    'dart': 'dart',
    
    // Shell
    'sh': 'shell',
    'bash': 'shell',
    'zsh': 'shell',
    'fish': 'shell',
    'ps1': 'powershell',
    'bat': 'bat',
    
    // Database
    'sql': 'sql',
    'mysql': 'mysql',
    'pgsql': 'pgsql',
    'sqlite': 'sql',
    
    // Documentation
    'md': 'markdown',
    'mdx': 'markdown',
    'txt': 'plaintext',
    'rst': 'restructuredtext',
    
    // Config
    'dockerfile': 'dockerfile',
    'nginx': 'nginx',
    'conf': 'conf',
    'env': 'dotenv',
    
    // Default
    'default': 'plaintext'
  };
  
  return languageMap[ext] || languageMap.default;
};

// Enhanced code runner with better error handling and console capture
export const enhancedRunCode = (files, iframe, options = {}) => {
  const {
    enableConsoleCapture = true,
    enableErrorHandling = true,
    enablePerformanceMonitoring = false,
    libraries = [],
    preprocessors = {}
  } = options;

  try {
    // Get main files
    const htmlFile = files['index.html'] || 
                     Object.entries(files).find(([name]) => name.endsWith('.html'))?.[1];
    
    if (!htmlFile) {
      return { error: 'No HTML file found' };
    }

    // Process CSS files with preprocessors if needed
    const cssFiles = Object.entries(files).filter(([name]) => 
      name.endsWith('.css') || name.endsWith('.scss') || name.endsWith('.less')
    );
    
    const processedCSS = cssFiles.map(([name, file]) => {
      const ext = name.split('.').pop();
      if (preprocessors[ext]) {
        return preprocessors[ext](file.content);
      }
      return `/* ${name} */\n${file.content}`;
    }).join('\n\n');

    // Process JavaScript files
    const jsFiles = Object.entries(files).filter(([name]) => 
      name.endsWith('.js') || name.endsWith('.jsx') || name.endsWith('.ts') || name.endsWith('.tsx')
    );
    
    const processedJS = jsFiles.map(([name, file]) => {
      const ext = name.split('.').pop();
      if (preprocessors[ext]) {
        return preprocessors[ext](file.content);
      }
      return `// ${name}\n${file.content}`;
    }).join('\n\n');

    // Build enhanced HTML with all features
    const enhancedHTML = buildEnhancedHTML(
      htmlFile.content,
      processedCSS,
      processedJS,
      {
        enableConsoleCapture,
        enableErrorHandling,
        enablePerformanceMonitoring,
        libraries
      }
    );

    // Set iframe content
    iframe.srcdoc = enhancedHTML;
    
    return { success: true };
  } catch (error) {
    return { error: error.message, stack: error.stack };
  }
};

// Build enhanced HTML with all features
const buildEnhancedHTML = (htmlContent, css, javascript, options) => {
  const {
    enableConsoleCapture,
    enableErrorHandling,
    enablePerformanceMonitoring,
    libraries
  } = options;

  // Parse HTML to check if it's complete or fragment
  const isCompleteHTML = htmlContent.includes('<!DOCTYPE') || htmlContent.includes('<html');
  
  // Library CDN URLs
  const libraryUrls = {
    'react': [
      'https://unpkg.com/react@18/umd/react.development.js',
      'https://unpkg.com/react-dom@18/umd/react-dom.development.js'
    ],
    'vue': ['https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.js'],
    'jquery': ['https://code.jquery.com/jquery-3.7.1.min.js'],
    'bootstrap': [
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css',
      'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js'
    ],
    'tailwind': ['https://cdn.tailwindcss.com'],
    'three': ['https://cdn.jsdelivr.net/npm/three@0.159.0/build/three.min.js'],
    'd3': ['https://d3js.org/d3.v7.min.js'],
    'chart': ['https://cdn.jsdelivr.net/npm/chart.js'],
    'axios': ['https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js'],
    'lodash': ['https://cdn.jsdelivr.net/npm/lodash@4/lodash.min.js'],
    'moment': ['https://cdn.jsdelivr.net/npm/moment@2/moment.min.js'],
    'gsap': ['https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.4/gsap.min.js'],
    'anime': ['https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.min.js'],
    'babel': ['https://unpkg.com/@babel/standalone/babel.min.js']
  };

  // Build library includes
  let libraryIncludes = '';
  libraries.forEach(lib => {
    if (libraryUrls[lib]) {
      libraryUrls[lib].forEach(url => {
        if (url.endsWith('.css')) {
          libraryIncludes += `<link rel="stylesheet" href="${url}">\n`;
        } else {
          libraryIncludes += `<script src="${url}"></script>\n`;
        }
      });
    }
  });

  // Console capture script
  const consoleScript = enableConsoleCapture ? `
    <script>
      (function() {
        const originalConsole = {
          log: console.log,
          error: console.error,
          warn: console.warn,
          info: console.info,
          debug: console.debug,
          table: console.table,
          clear: console.clear,
          time: console.time,
          timeEnd: console.timeEnd,
          count: console.count,
          group: console.group,
          groupEnd: console.groupEnd,
          assert: console.assert
        };
        
        function formatValue(value) {
          if (value === undefined) return 'undefined';
          if (value === null) return 'null';
          if (value instanceof Error) {
            return value.stack || value.toString();
          }
          if (typeof value === 'function') {
            return value.toString();
          }
          if (typeof value === 'object') {
            try {
              return JSON.stringify(value, null, 2);
            } catch (e) {
              return Object.prototype.toString.call(value);
            }
          }
          return String(value);
        }
        
        function sendToParent(method, args) {
          try {
            window.parent.postMessage({
              type: 'console',
              method: method,
              args: Array.from(args).map(formatValue),
              timestamp: new Date().toISOString(),
              stack: new Error().stack
            }, '*');
          } catch (e) {
            // Silently fail if parent communication fails
          }
        }
        
        // Override console methods
        Object.keys(originalConsole).forEach(method => {
          console[method] = function(...args) {
            sendToParent(method, args);
            return originalConsole[method].apply(console, args);
          };
        });
        
        // Performance monitoring
        ${enablePerformanceMonitoring ? `
        if (window.performance && window.performance.timing) {
          window.addEventListener('load', function() {
            const timing = performance.timing;
            const loadTime = timing.loadEventEnd - timing.navigationStart;
            const domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;
            
            console.log('Performance Metrics:');
            console.log('Page Load Time: ' + loadTime + 'ms');
            console.log('DOM Ready Time: ' + domReadyTime + 'ms');
            
            if (performance.memory) {
              console.log('Memory Usage:', {
                usedJSHeapSize: (performance.memory.usedJSHeapSize / 1048576).toFixed(2) + ' MB',
                totalJSHeapSize: (performance.memory.totalJSHeapSize / 1048576).toFixed(2) + ' MB'
              });
            }
          });
        }
        ` : ''}
      })();
    </script>
  ` : '';

  // Error handling script
  const errorScript = enableErrorHandling ? `
    <script>
      // Global error handler
      window.addEventListener('error', function(event) {
        console.error('Runtime Error:', {
          message: event.message,
          filename: event.filename,
          line: event.lineno,
          column: event.colno,
          error: event.error
        });
        return false;
      });
      
      // Unhandled promise rejection handler
      window.addEventListener('unhandledrejection', function(event) {
        console.error('Unhandled Promise Rejection:', {
          reason: event.reason,
          promise: event.promise
        });
        event.preventDefault();
      });
      
      // Resource load error handler
      window.addEventListener('error', function(event) {
        if (event.target !== window) {
          console.error('Resource Load Error:', {
            type: event.target.tagName,
            src: event.target.src || event.target.href,
            message: 'Failed to load resource'
          });
        }
      }, true);
    </script>
  ` : '';

  // Build complete HTML
  if (isCompleteHTML) {
    // Inject into existing HTML structure
    let modifiedHTML = htmlContent;
    
    // Inject libraries before closing head
    if (libraryIncludes) {
      const headEnd = modifiedHTML.indexOf('</head>');
      if (headEnd > -1) {
        modifiedHTML = modifiedHTML.slice(0, headEnd) + 
          libraryIncludes + '\n' +
          modifiedHTML.slice(headEnd);
      }
    }
    
    // Inject CSS
    if (css) {
      const headEnd = modifiedHTML.indexOf('</head>');
      if (headEnd > -1) {
        modifiedHTML = modifiedHTML.slice(0, headEnd) + 
          `<style>\n${css}\n</style>\n` + 
          modifiedHTML.slice(headEnd);
      }
    }
    
    // Inject scripts before closing body
    const scriptsToInject = consoleScript + errorScript + 
      (javascript ? `<script>\n${javascript}\n</script>` : '');
    
    const bodyEnd = modifiedHTML.indexOf('</body>');
    if (bodyEnd > -1) {
      modifiedHTML = modifiedHTML.slice(0, bodyEnd) + 
        scriptsToInject + '\n' +
        modifiedHTML.slice(bodyEnd);
    }
    
    return modifiedHTML;
  }
  
  // Build complete HTML from fragment
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Live Preview</title>
  ${libraryIncludes}
  <style>
    /* Reset styles */
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
    }
    
    /* User styles */
    ${css}
  </style>
  ${consoleScript}
  ${errorScript}
</head>
<body>
  ${htmlContent}
  <script>
    try {
      ${javascript}
    } catch (error) {
      console.error('Execution Error:', error.message, '\\n\\nStack:', error.stack);
    }
  </script>
</body>
</html>`;
};

// Auto-save utility
export const createAutoSave = (saveFunction, delay = 2000) => {
  let timeoutId = null;
  
  return {
    trigger: () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        saveFunction();
        timeoutId = null;
      }, delay);
    },
    
    cancel: () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
    },
    
    saveNow: () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
        timeoutId = null;
      }
      saveFunction();
    }
  };
};

// Local storage utilities
export const storage = {
  save: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
      return false;
    }
  },
  
  load: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
      return defaultValue;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
      return false;
    }
  },
  
  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
      return false;
    }
  }
};

// Export/Import utilities
export const exportProject = (files, projectName = 'project') => {
  const projectData = {
    name: projectName,
    version: '1.0.0',
    created: new Date().toISOString(),
    files: files
  };
  
  const blob = new Blob([JSON.stringify(projectData, null, 2)], { 
    type: 'application/json' 
  });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${projectName}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const importProject = () => {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) {
        reject(new Error('No file selected'));
        return;
      }
      
      try {
        const text = await file.text();
        const projectData = JSON.parse(text);
        
        if (!projectData.files) {
          throw new Error('Invalid project file');
        }
        
        resolve(projectData);
      } catch (error) {
        reject(new Error('Failed to import project: ' + error.message));
      }
    };
    
    input.click();
  });
};

// Code formatting utilities
export const formatCode = (code, language) => {
  // This would integrate with Prettier or other formatters
  // For now, basic formatting
  switch (language) {
    case 'javascript':
    case 'typescript':
      return formatJavaScript(code);
    case 'html':
      return formatHTML(code);
    case 'css':
      return formatCSS(code);
    default:
      return code;
  }
};

const formatJavaScript = (code) => {
  // Basic JavaScript formatting
  return code
    .replace(/;[\s]*\n/g, ';\n')
    .replace(/\{[\s]*\n/g, ' {\n')
    .replace(/\}[\s]*\n/g, '}\n')
    .replace(/\n\s*\n\s*\n/g, '\n\n');
};

const formatHTML = (code) => {
  // Basic HTML formatting
  let formatted = '';
  let indent = 0;
  const lines = code.split('\n');
  
  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('</')) {
      indent = Math.max(0, indent - 1);
    }
    
    formatted += '  '.repeat(indent) + trimmed + '\n';
    
    if (trimmed.startsWith('<') && !trimmed.startsWith('</') && 
        !trimmed.includes('/>') && !trimmed.includes('</')) {
      indent++;
    }
  });
  
  return formatted;
};

const formatCSS = (code) => {
  // Basic CSS formatting
  return code
    .replace(/\{/g, ' {\n  ')
    .replace(/;/g, ';\n  ')
    .replace(/\}/g, '\n}\n')
    .replace(/\n\s*\n\s*\n/g, '\n\n');
};

// Code snippets database
export const codeSnippets = {
  javascript: {
    'console.log': 'console.log(${1:message});',
    'function': 'function ${1:name}(${2:params}) {\n  ${3:// body}\n}',
    'arrow': 'const ${1:name} = (${2:params}) => {\n  ${3:// body}\n};',
    'if': 'if (${1:condition}) {\n  ${2:// body}\n}',
    'for': 'for (let ${1:i} = 0; ${1:i} < ${2:length}; ${1:i}++) {\n  ${3:// body}\n}',
    'while': 'while (${1:condition}) {\n  ${2:// body}\n}',
    'switch': 'switch (${1:expression}) {\n  case ${2:value}:\n    ${3:// body}\n    break;\n  default:\n    ${4:// default}\n}',
    'try': 'try {\n  ${1:// try}\n} catch (${2:error}) {\n  ${3:// catch}\n}',
    'class': 'class ${1:Name} {\n  constructor(${2:params}) {\n    ${3:// constructor}\n  }\n  \n  ${4:method}() {\n    ${5:// method}\n  }\n}',
    'async': 'async function ${1:name}(${2:params}) {\n  ${3:// body}\n}',
    'promise': 'new Promise((resolve, reject) => {\n  ${1:// body}\n});'
  },
  html: {
    'html5': '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>${1:Document}</title>\n</head>\n<body>\n  ${2:<!-- content -->}\n</body>\n</html>',
    'div': '<div class="${1:class}">\n  ${2:content}\n</div>',
    'link': '<link rel="stylesheet" href="${1:style.css}">',
    'script': '<script src="${1:script.js}"></script>',
    'img': '<img src="${1:image.jpg}" alt="${2:description}">',
    'a': '<a href="${1:url}">${2:text}</a>',
    'form': '<form action="${1:action}" method="${2:post}">\n  ${3:<!-- fields -->}\n</form>',
    'input': '<input type="${1:text}" name="${2:name}" placeholder="${3:placeholder}">',
    'button': '<button type="${1:button}">${2:text}</button>'
  },
  css: {
    'flex': 'display: flex;\njustify-content: ${1:center};\nalign-items: ${2:center};',
    'grid': 'display: grid;\ngrid-template-columns: ${1:1fr 1fr};\ngap: ${2:1rem};',
    'animation': '@keyframes ${1:name} {\n  from {\n    ${2:property}: ${3:value};\n  }\n  to {\n    ${2:property}: ${4:value};\n  }\n}',
    'media': '@media (${1:min-width}: ${2:768px}) {\n  ${3:/* styles */}\n}',
    'transition': 'transition: ${1:all} ${2:0.3s} ${3:ease};',
    'transform': 'transform: ${1:translateX}(${2:0});',
    'gradient': 'background: linear-gradient(${1:135deg}, ${2:#667eea} 0%, ${3:#764ba2} 100%);'
  }
};

export default {
  getFileLanguage,
  enhancedRunCode,
  createAutoSave,
  storage,
  exportProject,
  importProject,
  formatCode,
  codeSnippets
};