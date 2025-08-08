// src/front/pages/PlaygroundMonaco.jsx
import React, { useState, useEffect, useRef } from "react";
import MonacoEditor from "../components/MonacoEditor";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Playground = () => {
    const { store, dispatch } = useGlobalReducer();
    const iframeRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [activeTab, setActiveTab] = useState('html');
    const [syntaxTheme, setSyntaxTheme] = useState('matcha');
    const [autoRun, setAutoRun] = useState(true);
    const [consoleOutput, setConsoleOutput] = useState([]);
    
    const [code, setCode] = useState({
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JavaScript Playground</title>
</head>
<body>
    <div class="container">
        <h1 id="title">Welcome to Monaco Editor!</h1>
        <p id="message">Experience VS Code-like editing in your browser</p>
        
        <div class="card">
            <h3>Interactive Demo</h3>
            <button id="colorBtn">Change Colors</button>
            <button id="addBtn">Add Element</button>
            <button id="animateBtn">Animate</button>
        </div>
        
        <div id="output"></div>
        <div id="dynamic-content"></div>
    </div>
</body>
</html>`,
        css: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.container {
    background: white;
    padding: 3rem;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    max-width: 600px;
    width: 100%;
}

h1 {
    color: #333;
    margin-bottom: 1rem;
    font-size: 2.5rem;
    transition: color 0.3s ease;
}

p {
    color: #666;
    margin-bottom: 2rem;
    font-size: 1.1rem;
}

.card {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    padding: 2rem;
    border-radius: 15px;
    margin: 2rem 0;
}

.card h3 {
    color: white;
    margin-bottom: 1rem;
}

button {
    background: white;
    color: #667eea;
    border: none;
    padding: 12px 24px;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    margin: 5px;
    transition: all 0.3s ease;
}

button:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

button:active {
    transform: translateY(0);
}

#output {
    margin-top: 2rem;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 10px;
    min-height: 60px;
    font-family: 'Courier New', monospace;
}

#dynamic-content {
    margin-top: 1rem;
}

.animated-element {
    padding: 1rem;
    background: linear-gradient(45deg, #f093fb 0%, #f5576c 100%);
    color: white;
    border-radius: 10px;
    margin: 10px 0;
    animation: slideIn 0.5s ease;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(-30px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.pulse {
    animation: pulse 2s infinite;
}`,
        js: `// Welcome to the Monaco Editor Playground!
console.log('🚀 Monaco Editor initialized!');

// Color schemes
const colorSchemes = [
    { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', title: '#667eea' },
    { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', title: '#f093fb' },
    { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', title: '#4facfe' },
    { bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', title: '#43e97b' },
    { bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', title: '#fa709a' }
];

let currentScheme = 0;
let elementCount = 0;

// Get elements
const colorBtn = document.getElementById('colorBtn');
const addBtn = document.getElementById('addBtn');
const animateBtn = document.getElementById('animateBtn');
const output = document.getElementById('output');
const dynamicContent = document.getElementById('dynamic-content');
const title = document.getElementById('title');
const body = document.body;

// Change colors
colorBtn.addEventListener('click', () => {
    currentScheme = (currentScheme + 1) % colorSchemes.length;
    const scheme = colorSchemes[currentScheme];
    
    body.style.background = scheme.bg;
    title.style.color = scheme.title;
    
    output.innerHTML = \`<strong>Color Changed!</strong><br>
        Background: \${scheme.bg}<br>
        Title Color: \${scheme.title}\`;
    
    // Add animation
    title.classList.add('pulse');
    setTimeout(() => title.classList.remove('pulse'), 2000);
});

// Add dynamic elements
addBtn.addEventListener('click', () => {
    elementCount++;
    const newElement = document.createElement('div');
    newElement.className = 'animated-element';
    newElement.innerHTML = \`
        <strong>Dynamic Element #\${elementCount}</strong><br>
        Created at: \${new Date().toLocaleTimeString()}
    \`;
    
    dynamicContent.appendChild(newElement);
    
    output.innerHTML = \`<strong>Element Added!</strong><br>
        Total elements: \${elementCount}\`;
    
    // Remove element after 5 seconds
    setTimeout(() => {
        newElement.style.animation = 'slideIn 0.5s ease reverse';
        setTimeout(() => newElement.remove(), 500);
    }, 5000);
});

// Animate elements
animateBtn.addEventListener('click', () => {
    const container = document.querySelector('.container');
    container.style.animation = 'pulse 0.5s ease';
    
    setTimeout(() => {
        container.style.animation = '';
    }, 500);
    
    output.innerHTML = \`<strong>Animation Triggered!</strong><br>
        Timestamp: \${new Date().toLocaleTimeString()}\`;
});

// Initial message
output.innerHTML = \`<strong>Ready!</strong> Try clicking the buttons above.
<br>💡 Tip: Edit the code and see changes in real-time!\`;

// Log some info
console.log('Elements found:', {
    colorBtn: !!colorBtn,
    addBtn: !!addBtn,
    animateBtn: !!animateBtn
});`
    });

    const templates = {
        basic: {
            name: "Basic HTML",
            icon: "bi-file-code",
            description: "Simple HTML template"
        },
        bootstrap: {
            name: "Bootstrap 5",
            icon: "bi-bootstrap",
            description: "Bootstrap starter"
        },
        react: {
            name: "React Component",
            icon: "bi-filetype-jsx",
            description: "React with hooks"
        },
        canvas: {
            name: "Canvas Animation",
            icon: "bi-brush",
            description: "Interactive canvas"
        },
        threejs: {
            name: "Three.js 3D",
            icon: "bi-badge-3d",
            description: "3D graphics"
        },
        api: {
            name: "API Fetch",
            icon: "bi-cloud-download",
            description: "Fetch API example"
        }
    };

    useEffect(() => {
        if (autoRun) {
            const timer = setTimeout(() => {
                runCode();
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [code, autoRun]);

    const runCode = () => {
        if (!iframeRef.current) return;

        const iframe = iframeRef.current;
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        // Inject console interceptor
        const consoleScript = `
            <script>
                // Intercept console methods
                const originalConsole = {
                    log: console.log,
                    error: console.error,
                    warn: console.warn,
                    info: console.info
                };

                const sendToParent = (type, args) => {
                    window.parent.postMessage({
                        type: 'console',
                        method: type,
                        args: args.map(arg => {
                            try {
                                return typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
                            } catch {
                                return String(arg);
                            }
                        })
                    }, '*');
                };

                console.log = (...args) => {
                    originalConsole.log(...args);
                    sendToParent('log', args);
                };
                console.error = (...args) => {
                    originalConsole.error(...args);
                    sendToParent('error', args);
                };
                console.warn = (...args) => {
                    originalConsole.warn(...args);
                    sendToParent('warn', args);
                };
                console.info = (...args) => {
                    originalConsole.info(...args);
                    sendToParent('info', args);
                };

                // Catch errors
                window.addEventListener('error', (e) => {
                    sendToParent('error', [e.message]);
                });
            </script>
        `;

        const fullHTML = `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="UTF-8">
                <style>${code.css}</style>
            </head>
            <body>
                ${code.html}
                ${consoleScript}
                <script>${code.js}</script>
            </body>
            </html>
        `;

        iframeDoc.open();
        iframeDoc.write(fullHTML);
        iframeDoc.close();
    };

    // Listen for console messages from iframe
    useEffect(() => {
        const handleMessage = (event) => {
            if (event.data && event.data.type === 'console') {
                setConsoleOutput(prev => [...prev, {
                    method: event.data.method,
                    args: event.data.args,
                    timestamp: new Date().toLocaleTimeString()
                }]);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    const clearConsole = () => {
        setConsoleOutput([]);
    };

    const handleCodeChange = (lang, value) => {
        setCode(prev => ({
            ...prev,
            [lang]: value
        }));
    };

    const loadTemplate = (templateKey) => {
        // Load template from a templates object (you can expand this)
        alert(`Loading ${templates[templateKey].name} template...`);
        // Implementation here
    };

    const downloadCode = () => {
        const htmlContent = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Monaco Playground Export</title>
    <style>
${code.css}
    </style>
</head>
<body>
${code.html}
    <script>
${code.js}
    </script>
</body>
</html>`;

        const blob = new Blob([htmlContent], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'playground.html';
        a.click();
        URL.revokeObjectURL(url);
    };

    const toggleFullscreen = () => {
        setIsFullscreen(!isFullscreen);
        if (!isFullscreen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    return (
        <div className={`playground-container ${isFullscreen ? 'fullscreen' : ''}`} 
             style={{ paddingTop: isFullscreen ? '0' : '80px' }}>
            <div className="container-fluid h-100">
                {/* Header */}
                <div className="bg-white shadow-sm p-3 mb-3 rounded">
                    <div className="row align-items-center">
                        <div className="col-md-4">
                            <h4 className="mb-0">
                                <i className="bi bi-code-square text-success me-2"></i>
                                Monaco Playground
                            </h4>
                        </div>
                        <div className="col-md-8 text-end">
                            {/* Template Buttons */}
                            <div className="btn-group me-2">
                                {Object.entries(templates).slice(0, 4).map(([key, template]) => (
                                    <button
                                        key={key}
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => loadTemplate(key)}
                                        title={template.description}
                                    >
                                        <i className={`bi ${template.icon}`}></i>
                                        <span className="d-none d-md-inline ms-1">{template.name}</span>
                                    </button>
                                ))}
                            </div>
                            
                            {/* Controls */}
                            <div className="btn-group">
                                <button 
                                    className={`btn btn-sm ${autoRun ? 'btn-success' : 'btn-outline-success'}`}
                                    onClick={() => setAutoRun(!autoRun)}
                                    title="Auto Run"
                                >
                                    <i className="bi bi-arrow-repeat"></i> Auto
                                </button>
                                <button 
                                    className="btn btn-sm btn-primary"
                                    onClick={runCode}
                                >
                                    <i className="bi bi-play-fill"></i> Run
                                </button>
                                <button 
                                    className="btn btn-sm btn-secondary"
                                    onClick={downloadCode}
                                >
                                    <i className="bi bi-download"></i>
                                </button>
                                <button 
                                    className="btn btn-sm btn-warning"
                                    onClick={toggleFullscreen}
                                >
                                    <i className={`bi bi-${isFullscreen ? 'fullscreen-exit' : 'arrows-fullscreen'}`}></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Editor Layout */}
                <div className="row g-3" style={{ height: 'calc(100vh - 200px)' }}>
                    {/* Code Editors Column */}
                    <div className="col-lg-6">
                        <div className="h-100 d-flex flex-column">
                            {/* Editor Tabs */}
                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <button 
                                        className={`nav-link ${activeTab === 'html' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('html')}
                                    >
                                        <i className="bi bi-filetype-html me-1"></i> HTML
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        className={`nav-link ${activeTab === 'css' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('css')}
                                    >
                                        <i className="bi bi-filetype-css me-1"></i> CSS
                                    </button>
                                </li>
                                <li className="nav-item">
                                    <button 
                                        className={`nav-link ${activeTab === 'js' ? 'active' : ''}`}
                                        onClick={() => setActiveTab('js')}
                                    >
                                        <i className="bi bi-filetype-js me-1"></i> JavaScript
                                    </button>
                                </li>
                                <li className="nav-item ms-auto me-2">
                                    <select 
                                        className="form-select form-select-sm mt-1"
                                        value={syntaxTheme}
                                        onChange={(e) => setSyntaxTheme(e.target.value)}
                                        style={{ minWidth: '120px' }}
                                    >
                                        <option value="matcha">Matcha</option>
                                        <option value="wood">Wood</option>
                                        <option value="vs-dark">VS Dark</option>
                                        <option value="light">Light</option>
                                    </select>
                                </li>
                            </ul>

                            {/* Monaco Editor */}
                            <div className="flex-grow-1 border rounded-bottom bg-white">
                                {activeTab === 'html' && (
                                    <MonacoEditor
                                        language="html"
                                        value={code.html}
                                        onChange={(value) => handleCodeChange('html', value)}
                                        theme={syntaxTheme}
                                        height="100%"
                                    />
                                )}
                                {activeTab === 'css' && (
                                    <MonacoEditor
                                        language="css"
                                        value={code.css}
                                        onChange={(value) => handleCodeChange('css', value)}
                                        theme={syntaxTheme}
                                        height="100%"
                                    />
                                )}
                                {activeTab === 'js' && (
                                    <MonacoEditor
                                        language="javascript"
                                        value={code.js}
                                        onChange={(value) => handleCodeChange('js', value)}
                                        theme={syntaxTheme}
                                        height="100%"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Preview & Console Column */}
                    <div className="col-lg-6">
                        <div className="h-100 d-flex flex-column">
                            {/* Preview */}
                            <div className="flex-grow-1 mb-3">
                                <div className="bg-light p-2 border rounded-top d-flex justify-content-between align-items-center">
                                    <h6 className="mb-0">
                                        <i className="bi bi-eye me-2"></i>Preview
                                    </h6>
                                    <small className="text-muted">
                                        {autoRun && <i className="bi bi-circle-fill text-success me-1" style={{ fontSize: '8px' }}></i>}
                                        {autoRun ? 'Auto-running' : 'Manual mode'}
                                    </small>
                                </div>
                                <iframe
                                    ref={iframeRef}
                                    className="border rounded-bottom bg-white w-100"
                                    title="Preview"
                                    sandbox="allow-scripts"
                                    style={{ height: '60%', minHeight: '300px' }}
                                />
                            </div>

                            {/* Console */}
                            <div className="flex-shrink-0">
                                <div className="bg-dark text-white p-2 rounded-top d-flex justify-content-between align-items-center">
                                    <h6 className="mb-0">
                                        <i className="bi bi-terminal me-2"></i>Console
                                    </h6>
                                    <button 
                                        className="btn btn-sm btn-outline-light"
                                        onClick={clearConsole}
                                    >
                                        Clear
                                    </button>
                                </div>
                                <div className="bg-dark text-light p-3 rounded-bottom" 
                                     style={{ height: '200px', overflowY: 'auto', fontFamily: 'monospace', fontSize: '13px' }}>
                                    {consoleOutput.length === 0 ? (
                                        <div className="text-muted">Console output will appear here...</div>
                                    ) : (
                                        consoleOutput.map((log, index) => (
                                            <div key={index} className={`console-line console-${log.method}`}>
                                                <span className="text-muted me-2">{log.timestamp}</span>
                                                <span className={
                                                    log.method === 'error' ? 'text-danger' :
                                                    log.method === 'warn' ? 'text-warning' :
                                                    log.method === 'info' ? 'text-info' : 'text-light'
                                                }>
                                                    {log.args.join(' ')}
                                                </span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Fullscreen styles */}
            <style>{`
                .playground-container.fullscreen {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    z-index: 9999;
                    background: white;
                    padding-top: 0 !important;
                }
                
                .console-line {
                    padding: 2px 0;
                    border-bottom: 1px solid rgba(255,255,255,0.1);
                }
                
                .console-error { background: rgba(220, 53, 69, 0.1); }
                .console-warn { background: rgba(255, 193, 7, 0.1); }
                .console-info { background: rgba(23, 162, 184, 0.1); }
            `}</style>
        </div>
    );
};