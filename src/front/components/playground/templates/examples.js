// src/front/components/playground/templates/examples.js

export const examples = {
  calculator: {
    name: '🧮 Calculator',
    description: 'Interactive calculator app',
    files: {
      'index.html': {
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Calculator</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="calculator">
        <div class="display" id="display">0</div>
        <div class="buttons">
            <button class="btn-clear" onclick="clearDisplay()">C</button>
            <button class="btn-operator" onclick="appendOperator('/')">÷</button>
            <button class="btn-operator" onclick="appendOperator('*')">×</button>
            <button class="btn-delete" onclick="deleteLast()">←</button>
            
            <button onclick="appendNumber('7')">7</button>
            <button onclick="appendNumber('8')">8</button>
            <button onclick="appendNumber('9')">9</button>
            <button class="btn-operator" onclick="appendOperator('-')">-</button>
            
            <button onclick="appendNumber('4')">4</button>
            <button onclick="appendNumber('5')">5</button>
            <button onclick="appendNumber('6')">6</button>
            <button class="btn-operator" onclick="appendOperator('+')">+</button>
            
            <button onclick="appendNumber('1')">1</button>
            <button onclick="appendNumber('2')">2</button>
            <button onclick="appendNumber('3')">3</button>
            <button class="btn-equals" onclick="calculate()" rowspan="2">=</button>
            
            <button class="btn-zero" onclick="appendNumber('0')">0</button>
            <button onclick="appendNumber('.')">.</button>
        </div>
    </div>
    <script src="calculator.js"></script>
</body>
</html>`,
        language: 'html'
      },
      'styles.css': {
        content: `body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    background: linear-gradient(135deg, #667eea, #764ba2);
}

.calculator {
    background: white;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.display {
    background: #2d2a2e;
    color: #fff;
    font-size: 2rem;
    padding: 15px;
    text-align: right;
    margin-bottom: 15px;
    border-radius: 10px;
    min-height: 50px;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 70px);
    gap: 10px;
}

button {
    padding: 20px;
    font-size: 1.2rem;
    border: none;
    border-radius: 10px;
    background: #f0f0f0;
    cursor: pointer;
    transition: all 0.3s;
}

button:hover {
    background: #e0e0e0;
    transform: translateY(-2px);
}

button:active {
    transform: translateY(0);
}

.btn-operator {
    background: #667eea;
    color: white;
}

.btn-operator:hover {
    background: #5569d8;
}

.btn-clear {
    background: #ff6b6b;
    color: white;
}

.btn-delete {
    background: #ffd93d;
}

.btn-equals {
    background: #4caf50;
    color: white;
    grid-row: span 2;
}

.btn-zero {
    grid-column: span 2;
}`,
        language: 'css'
      },
      'calculator.js': {
        content: `let display = document.getElementById('display');
let currentValue = '0';
let previousValue = null;
let operation = null;
let shouldResetDisplay = false;

function updateDisplay() {
    display.textContent = currentValue;
}

function clearDisplay() {
    currentValue = '0';
    previousValue = null;
    operation = null;
    updateDisplay();
}

function appendNumber(num) {
    if (shouldResetDisplay) {
        currentValue = '0';
        shouldResetDisplay = false;
    }
    
    if (currentValue === '0' && num !== '.') {
        currentValue = num;
    } else if (num === '.' && currentValue.includes('.')) {
        return;
    } else {
        currentValue += num;
    }
    
    updateDisplay();
}

function appendOperator(op) {
    if (previousValue !== null && !shouldResetDisplay) {
        calculate();
    }
    
    previousValue = currentValue;
    operation = op;
    shouldResetDisplay = true;
}

function deleteLast() {
    if (currentValue.length > 1) {
        currentValue = currentValue.slice(0, -1);
    } else {
        currentValue = '0';
    }
    updateDisplay();
}

function calculate() {
    if (previousValue === null || operation === null) return;
    
    let result;
    const prev = parseFloat(previousValue);
    const current = parseFloat(currentValue);
    
    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentValue = result.toString();
    previousValue = null;
    operation = null;
    shouldResetDisplay = true;
    updateDisplay();
}

// Initialize
updateDisplay();`,
        language: 'javascript'
      }
    }
  },

  todoApp: {
    name: '✅ Todo App',
    description: 'Task management application',
    files: {
      'index.html': {
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Todo App</title>
    <link rel="stylesheet" href="app.css">
</head>
<body>
    <div class="container">
        <h1>📝 My Tasks</h1>
        <div class="input-group">
            <input type="text" id="taskInput" placeholder="Add a new task...">
            <button onclick="addTask()">Add Task</button>
        </div>
        <div class="filters">
            <button class="filter active" onclick="filterTasks('all')">All</button>
            <button class="filter" onclick="filterTasks('active')">Active</button>
            <button class="filter" onclick="filterTasks('completed')">Completed</button>
        </div>
        <ul id="taskList"></ul>
        <div class="footer">
            <span id="taskCount">0 tasks left</span>
            <button onclick="clearCompleted()">Clear Completed</button>
        </div>
    </div>
    <script src="app.js"></script>
</body>
</html>`,
        language: 'html'
      },
      'app.css': {
        content: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #a8edea, #fed6e3);
    min-height: 100vh;
    padding: 20px;
}

.container {
    max-width: 500px;
    margin: 0 auto;
    background: white;
    border-radius: 15px;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
}

.input-group {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

#taskInput {
    flex: 1;
    padding: 12px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 16px;
}

#taskInput:focus {
    outline: none;
    border-color: #667eea;
}

button {
    padding: 12px 20px;
    background: #667eea;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s;
}

button:hover {
    background: #5569d8;
}

.filters {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

.filter {
    background: transparent;
    color: #666;
    padding: 8px 16px;
    border: 2px solid #e0e0e0;
}

.filter.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
}

#taskList {
    list-style: none;
    margin-bottom: 20px;
}

.task-item {
    display: flex;
    align-items: center;
    padding: 12px;
    background: #f8f9fa;
    margin-bottom: 8px;
    border-radius: 8px;
    transition: transform 0.2s;
}

.task-item:hover {
    transform: translateX(5px);
}

.task-item.completed {
    opacity: 0.6;
}

.task-item.completed .task-text {
    text-decoration: line-through;
}

.task-checkbox {
    margin-right: 12px;
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.task-text {
    flex: 1;
}

.delete-btn {
    background: #ff6b6b;
    padding: 6px 12px;
    font-size: 14px;
}

.footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    border-top: 2px solid #e0e0e0;
}

#taskCount {
    color: #666;
}`,
        language: 'css'
      },
      'app.js': {
        content: `let tasks = [];
let currentFilter = 'all';

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const saved = localStorage.getItem('tasks');
    if (saved) {
        tasks = JSON.parse(saved);
    }
}

function addTask() {
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    
    if (text === '') return;
    
    tasks.push({
        id: Date.now(),
        text: text,
        completed: false
    });
    
    input.value = '';
    saveTasks();
    renderTasks();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
}

function filterTasks(filter) {
    currentFilter = filter;
    
    document.querySelectorAll('.filter').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    renderTasks();
}

function clearCompleted() {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    let filteredTasks = tasks;
    if (currentFilter === 'active') {
        filteredTasks = tasks.filter(t => !t.completed);
    } else if (currentFilter === 'completed') {
        filteredTasks = tasks.filter(t => t.completed);
    }
    
    filteredTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item' + (task.completed ? ' completed' : '');
        li.innerHTML = \`
            <input type="checkbox" class="task-checkbox" 
                   \${task.completed ? 'checked' : ''} 
                   onchange="toggleTask(\${task.id})">
            <span class="task-text">\${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(\${task.id})">Delete</button>
        \`;
        taskList.appendChild(li);
    });
    
    updateCount();
}

function updateCount() {
    const activeTasks = tasks.filter(t => !t.completed).length;
    document.getElementById('taskCount').textContent = 
        \`\${activeTasks} task\${activeTasks !== 1 ? 's' : ''} left\`;
}

// Allow Enter key to add tasks
document.getElementById('taskInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

// Initialize
loadTasks();
renderTasks();`,
        language: 'javascript'
      }
    }
  },

  reactComponent: {
    name: '⚛️ React Component',
    description: 'React counter component',
    files: {
      'App.jsx': {
        content: `import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function App() {
    const [count, setCount] = useState(0);
    const [message, setMessage] = useState('');
    
    useEffect(() => {
        document.title = \`Count: \${count}\`;
    }, [count]);
    
    const increment = () => {
        setCount(count + 1);
        setMessage('Incremented!');
        setTimeout(() => setMessage(''), 1000);
    };
    
    const decrement = () => {
        setCount(count - 1);
        setMessage('Decremented!');
        setTimeout(() => setMessage(''), 1000);
    };
    
    const reset = () => {
        setCount(0);
        setMessage('Reset!');
        setTimeout(() => setMessage(''), 1000);
    };
    
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>⚛️ React Counter</h1>
            <div style={styles.counter}>{count}</div>
            {message && <div style={styles.message}>{message}</div>}
            <div style={styles.buttons}>
                <button onClick={decrement} style={styles.button}>
                    -
                </button>
                <button onClick={reset} style={styles.resetButton}>
                    Reset
                </button>
                <button onClick={increment} style={styles.button}>
                    +
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea, #764ba2)',
        fontFamily: 'system-ui, sans-serif'
    },
    title: {
        color: 'white',
        marginBottom: '20px'
    },
    counter: {
        fontSize: '72px',
        fontWeight: 'bold',
        color: 'white',
        margin: '20px 0'
    },
    message: {
        color: 'white',
        fontSize: '18px',
        marginBottom: '20px',
        animation: 'fadeIn 0.3s'
    },
    buttons: {
        display: 'flex',
        gap: '10px'
    },
    button: {
        fontSize: '24px',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '8px',
        background: 'white',
        color: '#667eea',
        cursor: 'pointer',
        minWidth: '50px'
    },
    resetButton: {
        fontSize: '18px',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '8px',
        background: '#ff6b6b',
        color: 'white',
        cursor: 'pointer'
    }
};

// Mount the app
ReactDOM.render(<App />, document.getElementById('root'));`,
        language: 'javascript'
      },
      'index.html': {
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>React Counter</title>
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <style>
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    </style>
</head>
<body style="margin: 0; padding: 0;">
    <div id="root"></div>
    <script type="text/babel" src="App.jsx"></script>
</body>
</html>`,
        language: 'html'
      }
    }
  }
};