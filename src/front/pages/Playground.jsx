import React, { useState, useEffect, useRef } from 'react';
import CodeEditor from '../components/CodeEditor';

export const Playground = ({ navigateTo }) => {
  const [code, setCode] = useState({
    html: `<div class="container">
  <h1 id="title">Hello JavaScript!</h1>
  <button id="btn">Click me!</button>
  <p id="output"></p>
</div>`,
    css: `.container {
  padding: 20px;
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 20px;
  color: white;
  text-align: center;
}

#title {
  margin-bottom: 20px;
  font-size: 2.5rem;
  animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from { text-shadow: 0 0 10px #fff; }
  to { text-shadow: 0 0 20px #fff, 0 0 30px #667eea; }
}

#btn {
  background: linear-gradient(45deg, #f093fb, #f5576c);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

#btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

#output {
  margin-top: 20px;
  padding: 20px;
  background: rgba(255,255,255,0.1);
  border-radius: 15px;
  backdrop-filter: blur(10px);
  min-height: 60px;
}`,
    js: `// Interactive JavaScript example
const btn = document.getElementById('btn');
const output = document.getElementById('output');
const title = document.getElementById('title');

let clickCount = 0;
const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'];

btn.addEventListener('click', () => {
  clickCount++;
  
  // Change title color randomly
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  title.style.color = randomColor;
  
  // Update output with animation
  output.innerHTML = \`
    <div style="animation: fadeIn 0.5s ease-in;">
      <strong>🎉 Button clicked \${clickCount} times!</strong><br>
      <small>⏰ Time: \${new Date().toLocaleTimeString()}</small><br>
      <small>🎨 Color: \${randomColor}</small>
    </div>
  \`;
  
  // Add click animation
  btn.style.transform = 'scale(0.95)';
  setTimeout(() => {
    btn.style.transform = 'scale(1)';
  }, 150);
});

// Add CSS animation for fade in
const style = document.createElement('style');
style.textContent = \`
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
\`;
document.head.appendChild(style);

// Initial message
output.innerHTML = '<em>✨ Click the button to see some magic!</em>';

console.log('🚀 Playground initialized!');
console.log('Available colors:', colors);`
  });

  const [activeTab, setActiveTab] = useState('html');
  const iframeRef = useRef(null);

  const runCode = () => {
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    const fullHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { margin: 0; padding: 20px; background: #f0f0f0; }
          ${code.css}
        </style>
      </head>
      <body>
        ${code.html}
        <script>
          try {
            ${code.js}
          } catch (error) {
            document.body.innerHTML += '<div style="color: red; padding: 10px; background: #fee; border: 1px solid #fcc; border-radius: 4px; margin: 10px 0;">Error: ' + error.message + '</div>';
            console.error('Error:', error);
          }
        </script>
      </body>
      </html>
    `;

    iframeDoc.open();
    iframeDoc.write(fullHTML);
    iframeDoc.close();
  };

  useEffect(() => {
    const timer = setTimeout(runCode, 1000);
    return () => clearTimeout(timer);
  }, [code]);

  const tabs = [
    { key: 'html', label: 'HTML', icon: '🌐' },
    { key: 'css', label: 'CSS', icon: '🎨' },
    { key: 'js', label: 'JavaScript', icon: '⚡' }
  ];

  const loadTemplate = (templateName) => {
    const templates = {
      basic: {
        html: '<h1>Hello World</h1>\n<p>Welcome to JavaScript!</p>',
        css: 'body { font-family: Arial, sans-serif; padding: 20px; background: #f8f9fa; }',
        js: 'console.log("Hello from JavaScript!");'
      },
      interactive: {
        html: '<button id="btn">Click me!</button>\n<div id="result"></div>',
        css: '#btn { padding: 15px 30px; background: #007bff; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; } #btn:hover { background: #0056b3; }',
        js: 'document.getElementById("btn").onclick = () => {\n  document.getElementById("result").innerHTML = "Button clicked at " + new Date().toLocaleTimeString();\n};'
      },
      todo: {
        html: `<div class="todo-app">
  <h2>Todo List</h2>
  <input type="text" id="todoInput" placeholder="Add a new task...">
  <button id="addBtn">Add</button>
  <ul id="todoList"></ul>
</div>`,
        css: `.todo-app { max-width: 400px; margin: 20px auto; padding: 20px; background: white; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
input { width: 70%; padding: 10px; border: 1px solid #ddd; border-radius: 5px; }
button { padding: 10px 15px; background: #28a745; color: white; border: none; border-radius: 5px; cursor: pointer; }
ul { list-style: none; padding: 0; }
li { padding: 10px; margin: 5px 0; background: #f8f9fa; border-radius: 5px; }`,
        js: `const input = document.getElementById('todoInput');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('todoList');

addBtn.onclick = () => {
  if (input.value.trim()) {
    const li = document.createElement('li');
    li.textContent = input.value;
    li.onclick = () => li.remove();
    list.appendChild(li);
    input.value = '';
  }
};

input.onkeypress = (e) => {
  if (e.key === 'Enter') addBtn.click();
};`
      }
    };
    
    if (templates[templateName]) {
      setCode(templates[templateName]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              🎮 Live Playground
            </h2>
            <div className="flex gap-2">
              <button 
                onClick={() => loadTemplate('basic')}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
              >
                Basic
              </button>
              <button 
                onClick={() => loadTemplate('interactive')}
                className="px-3 py-1 bg-purple-500 text-white text-sm rounded hover:bg-purple-600 transition-colors"
              >
                Interactive
              </button>
              <button 
                onClick={() => loadTemplate('todo')}
                className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
              >
                Todo App
              </button>
              <button 
                onClick={runCode}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                ▶ Run Code
              </button>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-200px)]">
          {/* Code Editor */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 dark:border-gray-700">
              {tabs.map(tab => (
                <button
                  key={tab.key}
                  className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Editor */}
            <div className="h-full">
              <CodeEditor
                language={activeTab}
                value={code[activeTab]}
                onChange={(value) => setCode(prev => ({ ...prev, [activeTab]: value }))}
                theme="dark"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-gray-100 dark:bg-gray-700 px-4 py-3 border-b border-gray-200 dark:border-gray-600">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                👀 Live Preview
              </h3>
            </div>
            <iframe
              ref={iframeRef}
              className="w-full h-full border-0"
              title="Code Preview"
              sandbox="allow-scripts"
            />
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
            💡 Playground Tips:
          </h4>
          <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <p>• Code updates automatically - no need to manually run</p>
            <p>• Use browser dev tools (F12) for advanced debugging</p>
            <p>• Try the templates for quick starts</p>
            <p>• Tab key adds 2 spaces for indentation</p>
          </div>
        </div>
      </div>
    </div>
  );
};