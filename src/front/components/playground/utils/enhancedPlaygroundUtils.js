// Enhanced Playground Utilities
// This file contains ONLY utility functions, no React components

// Enhanced code execution with error handling and console capture
export const enhancedRunCode = (files, iframeRef, options = {}) => {
  const {
    enableConsoleCapture = true,
    enableErrorHandling = true,
    libraries = []
  } = options;

  if (!iframeRef || !iframeRef.contentWindow) {
    return { error: 'Invalid iframe reference' };
  }

  try {
    // Get HTML content
    const htmlFile = files['src/index.html'] || files['index.html'];
    if (!htmlFile) {
      return { error: 'No HTML file found' };
    }

    let htmlContent = htmlFile.content;

    // Inject CSS files
    Object.entries(files).forEach(([path, file]) => {
      if (file.language === 'css' && path.endsWith('.css')) {
        const cssTag = `<style>\n${file.content}\n</style>`;
        htmlContent = htmlContent.replace('</head>', `${cssTag}\n</head>`);
      }
    });

    // Inject JavaScript files
    Object.entries(files).forEach(([path, file]) => {
      if (file.language === 'javascript' && path.endsWith('.js')) {
        const scriptTag = `<script>\n${file.content}\n</script>`;
        htmlContent = htmlContent.replace('</body>', `${scriptTag}\n</body>`);
      }
    });

    // Add library scripts
    const libraryScripts = getLibraryScripts(libraries);
    if (libraryScripts.length > 0) {
      const scriptsHtml = libraryScripts.map(src => `<script src="${src}"></script>`).join('\n');
      htmlContent = htmlContent.replace('</head>', `${scriptsHtml}\n</head>`);
    }

    // Add console capture if enabled
    if (enableConsoleCapture) {
      const consoleScript = `
        <script>
          (function() {
            const originalConsole = window.console;
            ['log', 'warn', 'error', 'info'].forEach(method => {
              window.console[method] = function(...args) {
                originalConsole[method].apply(originalConsole, args);
                window.parent.postMessage({
                  type: 'console',
                  method: method,
                  args: args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg))
                }, '*');
              };
            });
          })();
        </script>
      `;
      htmlContent = htmlContent.replace('</head>', `${consoleScript}\n</head>`);
    }

    // Add error handling if enabled
    if (enableErrorHandling) {
      const errorScript = `
        <script>
          window.addEventListener('error', function(e) {
            window.parent.postMessage({
              type: 'console',
              method: 'error',
              args: [e.message + ' at line ' + e.lineno]
            }, '*');
          });
        </script>
      `;
      htmlContent = htmlContent.replace('</head>', `${errorScript}\n</head>`);
    }

    // Write to iframe
    const doc = iframeRef.contentDocument || iframeRef.contentWindow.document;
    doc.open();
    doc.write(htmlContent);
    doc.close();

    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
};

// Get library CDN URLs
const getLibraryScripts = (libraries) => {
  const libraryMap = {
    'react': 'https://unpkg.com/react@18/umd/react.development.js',
    'vue': 'https://unpkg.com/vue@3/dist/vue.global.js',
    'jquery': 'https://code.jquery.com/jquery-3.7.1.min.js',
    'bootstrap': 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
    'tailwind': 'https://cdn.tailwindcss.com',
    'three': 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js',
    'd3': 'https://d3js.org/d3.v7.min.js',
    'chart': 'https://cdn.jsdelivr.net/npm/chart.js'
  };

  return libraries.map(lib => libraryMap[lib]).filter(Boolean);
};

// Auto-save functionality
export const createAutoSave = (callback, delay = 1000) => {
  let timeoutId;
  
  return (data) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback(data), delay);
  };
};

// Storage utilities
export const storage = {
  save: (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Storage save error:', error);
      return false;
    }
  },
  
  load: (key) => {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Storage load error:', error);
      return null;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  }
};

// Export project as ZIP (placeholder - would need JSZip library)
export const exportProject = (fileTree, projectName = 'project') => {
  // This would require JSZip library to be added
  console.log('Export functionality would be implemented with JSZip library');
  
  // For now, create a downloadable JSON file
  const dataStr = JSON.stringify(fileTree, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `${projectName}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
};

// Import project from file
export const importProject = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const projectData = JSON.parse(event.target.result);
        resolve(projectData);
      } catch (error) {
        reject(new Error('Invalid project file format'));
      }
    };
    
    reader.onerror = () => reject(new Error('Error reading file'));
    reader.readAsText(file);
  });
};

// Get file language from extension
export const getFileLanguage = (filename) => {
  const extension = filename.split('.').pop().toLowerCase();
  
  const languageMap = {
    'js': 'javascript',
    'jsx': 'javascript',
    'ts': 'typescript',
    'tsx': 'typescript',
    'html': 'html',
    'htm': 'html',
    'css': 'css',
    'scss': 'scss',
    'sass': 'sass',
    'less': 'less',
    'json': 'json',
    'xml': 'xml',
    'md': 'markdown',
    'py': 'python',
    'java': 'java',
    'php': 'php',
    'cpp': 'cpp',
    'c': 'c',
    'cs': 'csharp',
    'go': 'go',
    'rs': 'rust',
    'rb': 'ruby',
    'swift': 'swift',
    'kt': 'kotlin',
    'dart': 'dart',
    'vue': 'vue',
    'svelte': 'svelte'
  };
  
  return languageMap[extension] || 'plaintext';
};

// Code snippets for different languages
export const codeSnippets = {
  javascript: {
    'Hello World': 'console.log("Hello, World!");',
    'Function': 'function myFunction() {\n  // Your code here\n}',
    'Arrow Function': 'const myFunction = () => {\n  // Your code here\n};',
    'For Loop': 'for (let i = 0; i < 10; i++) {\n  console.log(i);\n}',
    'If Statement': 'if (condition) {\n  // Your code here\n}',
    'Event Listener': 'element.addEventListener("click", function() {\n  // Your code here\n});'
  },
  html: {
    'HTML5 Template': '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  \n</body>\n</html>',
    'Div Element': '<div class="container">\n  <!-- Content here -->\n</div>',
    'Button': '<button type="button" onclick="myFunction()">Click me</button>',
    'Form': '<form>\n  <input type="text" name="name" placeholder="Enter name">\n  <input type="submit" value="Submit">\n</form>',
    'Link': '<a href="#" target="_blank">Link text</a>'
  },
  css: {
    'Basic Reset': '* {\n  margin: 0;\n  padding: 0;\n  box-sizing: border-box;\n}',
    'Flexbox Container': '.container {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}',
    'Grid Container': '.grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 1rem;\n}',
    'Button Style': '.button {\n  padding: 10px 20px;\n  background-color: #007bff;\n  color: white;\n  border: none;\n  border-radius: 4px;\n  cursor: pointer;\n}',
    'Media Query': '@media (max-width: 768px) {\n  .container {\n    flex-direction: column;\n  }\n}'
  }
};

// File tree utilities
export const flattenFileTree = (tree, prefix = '') => {
  const files = {};
  
  const flatten = (currentTree, currentPrefix) => {
    for (const [name, content] of Object.entries(currentTree)) {
      const path = currentPrefix ? `${currentPrefix}/${name}` : name;
      if (content.content !== undefined) {
        files[path] = content;
      } else if (typeof content === 'object') {
        flatten(content, path);
      }
    }
  };
  
  flatten(tree, prefix);
  return files;
};

export const findFileInTree = (tree, targetPath) => {
  const parts = targetPath.split('/');
  let current = tree;
  
  for (const part of parts) {
    if (current[part]) {
      current = current[part];
    } else {
      return null;
    }
  }
  
  return current.content !== undefined ? current : null;
};