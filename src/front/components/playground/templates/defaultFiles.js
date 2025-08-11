// src/front/components/playground/templates/defaultFiles.js

export const defaultFiles = {
  'index.html': {
    content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Project</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div id="app">
        <h1>Welcome to Multi-File Playground!</h1>
        <p>You can create and edit multiple files.</p>
        <button id="myButton">Click Me!</button>
        <div id="output"></div>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
    language: 'html'
  },
  
  'style.css': {
    content: `/* Main styles */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

#app {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    width: 100%;
}

h1 {
    color: #333;
    margin-bottom: 1rem;
}

button {
    background: #667eea;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;
}

button:hover {
    background: #5569d8;
}

#output {
    margin-top: 20px;
    padding: 10px;
    background: #f5f5f5;
    border-radius: 5px;
    min-height: 50px;
}`,
    language: 'css'
  },
  
  'script.js': {
    content: `// Main JavaScript file
console.log('App initialized!');

// Import utils (simulated)
// import { formatDate } from './utils.js';

const button = document.getElementById('myButton');
const output = document.getElementById('output');

let clickCount = 0;

button.addEventListener('click', () => {
    clickCount++;
    const message = \`Button clicked \${clickCount} time\${clickCount !== 1 ? 's' : ''}!\`;
    
    output.innerHTML = \`
        <p>\${message}</p>
        <p>Timestamp: \${new Date().toLocaleTimeString()}</p>
    \`;
    
    console.log(message);
    
    // Call function from utils.js
    if (typeof greet === 'function') {
        console.log(greet('User'));
    }
});

// Add some interactivity
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded');
});`,
    language: 'javascript'
  },
  
  'utils.js': {
    content: `// Utility functions

function greet(name) {
    return \`Hello, \${name}!\`;
}

function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Make functions available globally (for demo)
window.greet = greet;
window.formatDate = formatDate;
window.debounce = debounce;

console.log('Utils loaded');`,
    language: 'javascript'
  },
  
  'README.md': {
    content: `# Multi-File Playground

## Features
- ✅ Create multiple files
- ✅ Support for HTML, CSS, JavaScript, and more
- ✅ File explorer with icons
- ✅ Tab management
- ✅ Live preview
- ✅ Console output

## Supported File Types
- Web: HTML, CSS, JavaScript, JSX, TypeScript
- Data: JSON, XML, YAML
- Languages: Python, Java, C++, Go, Rust
- Docs: Markdown, Text

## Keyboard Shortcuts
- **Ctrl+S**: Save/Run code
- **Ctrl+Enter**: Run code
- **Ctrl+N**: New file
- **Ctrl+W**: Close tab

## Tips
1. Right-click files to rename or delete
2. Click the + button to create new files
3. Files are automatically linked in HTML`,
    language: 'markdown'
  }
};

// Template projects
export const templateProjects = {
  react: {
    'App.jsx': {
      content: `import React, { useState } from 'react';

function App() {
    const [count, setCount] = useState(0);
    
    return (
        <div className="app">
            <h1>React Counter</h1>
            <p>Count: {count}</p>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
            <button onClick={() => setCount(count - 1)}>
                Decrement
            </button>
        </div>
    );
}

export default App;`,
      language: 'javascript'
    }
  },
  
  python: {
    'main.py': {
      content: `# Python Web Server Example
from http.server import HTTPServer, SimpleHTTPRequestHandler
import json

class APIHandler(SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/api/data':
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            data = {
                'message': 'Hello from Python!',
                'timestamp': '2024-01-01'
            }
            
            self.wfile.write(json.dumps(data).encode())
        else:
            super().do_GET()

def main():
    server = HTTPServer(('localhost', 8000), APIHandler)
    print('Server running on http://localhost:8000')
    server.serve_forever()

if __name__ == '__main__':
    main()`,
      language: 'python'
    }
  }
};