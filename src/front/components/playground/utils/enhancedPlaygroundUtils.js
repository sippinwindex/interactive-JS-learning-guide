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

    // Remove any existing script references first to avoid duplicates
    htmlContent = htmlContent.replace(/<script[^>]*src=["'][^"']*["'][^>]*><\/script>/gi, '');

    // Inject CSS files
    Object.entries(files).forEach(([path, file]) => {
      if (file.language === 'css' && path.endsWith('.css')) {
        const cssTag = `<style>\n${file.content}\n</style>`;
        htmlContent = htmlContent.replace('</head>', `${cssTag}\n</head>`);
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
            // Prevent multiple console capture setups
            if (window.__consoleSetup) return;
            window.__consoleSetup = true;
            
            const originalConsole = window.console;
            let messageCount = 0;
            const maxMessages = 100; // Prevent spam
            
            ['log', 'warn', 'error', 'info'].forEach(method => {
              window.console[method] = function(...args) {
                originalConsole[method].apply(originalConsole, args);
                
                // Prevent infinite loops and spam
                if (messageCount >= maxMessages) return;
                messageCount++;
                
                try {
                  // Don't capture our own error messages to prevent loops
                  const message = args[0];
                  if (typeof message === 'string' && 
                      (message.includes('postMessage') || 
                       message.includes('call stack') || 
                       message.includes('Script error in'))) {
                    return;
                  }
                  
                  window.parent.postMessage({
                    type: 'console',
                    method: method,
                    args: args.map(arg => {
                      try {
                        if (typeof arg === 'object' && arg !== null) {
                          return JSON.stringify(arg, null, 2);
                        }
                        return String(arg);
                      } catch (e) {
                        return '[Circular Object]';
                      }
                    })
                  }, '*');
                } catch (e) {
                  // Silently ignore postMessage errors to prevent loops
                }
              };
            });
          })();
        </script>
      `;
      htmlContent = htmlContent.replace('</head>', `${consoleScript}\n</head>`);
    }

    // Add error handling for unhandled errors (simplified)
    if (enableErrorHandling) {
      const errorScript = `
        <script>
          let errorCount = 0;
          const maxErrors = 5;
          
          window.addEventListener('error', function(e) {
            if (errorCount >= maxErrors) return;
            errorCount++;
            
            // Don't report our own console capture errors
            if (e.message && e.message.includes('postMessage')) return;
            
            console.error('Global error:', e.message, 'at line', e.lineno);
          });
        </script>
      `;
      htmlContent = htmlContent.replace('</head>', `${errorScript}\n</head>`);
    }

    // Inject JavaScript files - wrap each in try-catch and ensure DOM is ready
    Object.entries(files).forEach(([path, file]) => {
      if (file.language === 'javascript' && path.endsWith('.js')) {
        const scriptTag = `
        <script>
          (function() {
            // Ensure DOM is ready
            function executeScript() {
              try {
                ${file.content}
              } catch (e) {
                console.error('Script error in ${path}:', e.message);
              }
            }
            
            if (document.readyState === 'loading') {
              document.addEventListener('DOMContentLoaded', executeScript);
            } else {
              executeScript();
            }
          })();
        </script>`;
        htmlContent = htmlContent.replace('</body>', `${scriptTag}\n</body>`);
      }
    });

    // Clear iframe and write new content
    const doc = iframeRef.contentDocument || iframeRef.contentWindow.document;
    doc.open();
    doc.write(htmlContent);
    doc.close();

    return { success: true };
  } catch (error) {
    return { error: error.message };
  }
};