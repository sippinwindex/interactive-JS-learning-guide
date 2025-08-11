// src/front/components/playground/utils/codeRunner.js

export const runCode = (files, iframe) => {
  if (!iframe) return { error: 'No iframe reference' };

  try {
    // Get the main files
    const htmlFile = files['index.html'] || files[Object.keys(files).find(f => f.endsWith('.html'))];
    const cssFiles = Object.entries(files).filter(([name]) => name.endsWith('.css'));
    const jsFiles = Object.entries(files).filter(([name]) => name.endsWith('.js'));

    if (!htmlFile) {
      return { error: 'No HTML file found' };
    }

    // Combine all CSS
    const combinedCSS = cssFiles
      .map(([name, file]) => `/* ${name} */\n${file.content}`)
      .join('\n\n');

    // Combine all JS (be careful with execution order)
    const combinedJS = jsFiles
      .map(([name, file]) => `// ${name}\n${file.content}`)
      .join('\n\n');

    // Build the full HTML
    const fullHTML = buildHTML(htmlFile.content, combinedCSS, combinedJS);

    // Set iframe content
    iframe.srcdoc = fullHTML;
    
    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
};

const buildHTML = (htmlContent, css, javascript) => {
  // If HTML already has full structure, inject CSS and JS
  if (htmlContent.includes('<!DOCTYPE') || htmlContent.includes('<html')) {
    // Try to inject CSS into head
    let modifiedHTML = htmlContent;
    
    if (css && !htmlContent.includes('<style>')) {
      const headEnd = modifiedHTML.indexOf('</head>');
      if (headEnd > -1) {
        modifiedHTML = modifiedHTML.slice(0, headEnd) + 
          `<style>\n${css}\n</style>\n` + 
          modifiedHTML.slice(headEnd);
      }
    }
    
    // Try to inject JS before closing body
    if (javascript && !htmlContent.includes('<script>')) {
      const bodyEnd = modifiedHTML.indexOf('</body>');
      if (bodyEnd > -1) {
        modifiedHTML = modifiedHTML.slice(0, bodyEnd) + 
          `<script>\n${wrapJavaScript(javascript)}\n</script>\n` + 
          modifiedHTML.slice(bodyEnd);
      }
    }
    
    return modifiedHTML;
  }
  
  // Build full HTML structure
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    ${css}
  </style>
</head>
<body>
  ${htmlContent}
  <script>
    ${wrapJavaScript(javascript)}
  </script>
</body>
</html>`;
};

const wrapJavaScript = (javascript) => {
  return `
    // Console interceptor
    const originalConsole = { ...console };
    
    function sendToParent(method, args) {
      window.parent.postMessage({
        type: 'console',
        method: method,
        args: args.map(arg => {
          if (arg === undefined) return 'undefined';
          if (arg === null) return 'null';
          if (typeof arg === 'object') {
            try {
              return JSON.stringify(arg, null, 2);
            } catch (e) {
              return String(arg);
            }
          }
          return String(arg);
        })
      }, '*');
    }
    
    ['log', 'error', 'warn', 'info', 'debug', 'table'].forEach(method => {
      console[method] = function(...args) {
        sendToParent(method, args);
        originalConsole[method].apply(console, args);
      };
    });
    
    window.onerror = function(msg, url, lineNo, columnNo, error) {
      console.error('Error at line ' + lineNo + ': ' + msg);
      return false;
    };
    
    window.addEventListener('unhandledrejection', function(event) {
      console.error('Unhandled Promise Rejection:', event.reason);
    });
    
    // User code
    try {
      ${javascript}
    } catch (error) {
      console.error('Execution Error:', error.message, '\\nStack:', error.stack);
    }
  `;
};

// Run Python code (requires Pyodide or server-side execution)
export const runPythonCode = async (code) => {
  // This would require Pyodide integration or server-side execution
  console.warn('Python execution not yet implemented');
  return { error: 'Python execution requires additional setup' };
};

// Run other languages (would require respective interpreters)
export const runOtherLanguage = (language, code) => {
  const supportedLanguages = ['html', 'css', 'javascript'];
  if (!supportedLanguages.includes(language)) {
    return { 
      error: `${language} execution is not supported in the browser. Only HTML, CSS, and JavaScript can run client-side.` 
    };
  }
};