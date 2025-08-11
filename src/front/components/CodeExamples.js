// CodeExamples.js - Pre-built code examples for the VS Code Playground

export const codeExamples = {
  calculator: {
    name: '🧮 Calculator',
    description: 'Interactive calculator with basic operations',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Calculator</title>
</head>
<body>
    <div class="calculator">
        <h1>🧮 Calculator</h1>
        <input type="text" id="display" class="display" readonly value="0">
        
        <div class="buttons">
            <button onclick="clearDisplay()" class="btn-clear">C</button>
            <button onclick="appendToDisplay('/')" class="btn-operator">÷</button>
            <button onclick="appendToDisplay('*')" class="btn-operator">×</button>
            <button onclick="deleteLast()" class="btn-delete">←</button>
            
            <button onclick="appendToDisplay('7')">7</button>
            <button onclick="appendToDisplay('8')">8</button>
            <button onclick="appendToDisplay('9')">9</button>
            <button onclick="appendToDisplay('-')" class="btn-operator">-</button>
            
            <button onclick="appendToDisplay('4')">4</button>
            <button onclick="appendToDisplay('5')">5</button>
            <button onclick="appendToDisplay('6')">6</button>
            <button onclick="appendToDisplay('+')" class="btn-operator">+</button>
            
            <button onclick="appendToDisplay('1')">1</button>
            <button onclick="appendToDisplay('2')">2</button>
            <button onclick="appendToDisplay('3')">3</button>
            <button onclick="calculate()" class="btn-equals" rowspan="2">=</button>
            
            <button onclick="appendToDisplay('0')" class="btn-zero">0</button>
            <button onclick="appendToDisplay('.')">.</button>
        </div>
        
        <div class="history" id="history">
            <h3>History</h3>
            <div id="historyList"></div>
        </div>
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

.calculator {
    background: white;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    max-width: 400px;
    width: 100%;
}

h1 {
    text-align: center;
    color: #667eea;
    margin-bottom: 20px;
}

.display {
    width: 100%;
    padding: 15px;
    font-size: 24px;
    text-align: right;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    margin-bottom: 20px;
    background: #f8f9fa;
}

.buttons {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
}

button {
    padding: 20px;
    font-size: 18px;
    border: none;
    border-radius: 10px;
    background: #f0f0f0;
    cursor: pointer;
    transition: all 0.3s;
}

button:hover {
    background: #e0e0e0;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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
    grid-column: span 1;
}

.btn-clear:hover {
    background: #ff5252;
}

.btn-delete {
    background: #ffd93d;
    color: #333;
}

.btn-delete:hover {
    background: #ffcd00;
}

.btn-equals {
    background: #4caf50;
    color: white;
    grid-row: span 2;
}

.btn-equals:hover {
    background: #45a049;
}

.btn-zero {
    grid-column: span 2;
}

.history {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 2px solid #e0e0e0;
}

.history h3 {
    color: #667eea;
    margin-bottom: 10px;
    font-size: 16px;
}

#historyList {
    max-height: 100px;
    overflow-y: auto;
    font-size: 14px;
    color: #666;
}

.history-item {
    padding: 5px;
    border-bottom: 1px solid #f0f0f0;
}`,
    javascript: `console.log('🧮 Calculator initialized!');

let display = document.getElementById('display');
let historyList = document.getElementById('historyList');
let currentValue = '0';
let shouldResetDisplay = false;

function updateDisplay() {
    display.value = currentValue;
}

function clearDisplay() {
    currentValue = '0';
    updateDisplay();
    console.log('Display cleared');
}

function appendToDisplay(value) {
    if (shouldResetDisplay) {
        currentValue = '0';
        shouldResetDisplay = false;
    }
    
    if (currentValue === '0' && value !== '.') {
        currentValue = value;
    } else {
        currentValue += value;
    }
    
    updateDisplay();
    console.log('Current expression:', currentValue);
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
    try {
        const result = eval(currentValue);
        const calculation = currentValue + ' = ' + result;
        
        // Add to history
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        historyItem.textContent = calculation;
        historyList.insertBefore(historyItem, historyList.firstChild);
        
        // Limit history to 5 items
        while (historyList.children.length > 5) {
            historyList.removeChild(historyList.lastChild);
        }
        
        console.log('Calculation:', calculation);
        currentValue = result.toString();
        shouldResetDisplay = true;
        updateDisplay();
    } catch (error) {
        console.error('Error in calculation:', error);
        currentValue = 'Error';
        shouldResetDisplay = true;
        updateDisplay();
    }
}`
  },
  
  todo: {
    name: '✅ To-Do List',
    description: 'Simple task manager with add/delete functionality',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>To-Do List</title>
</head>
<body>
    <div class="todo-container">
        <h1>✅ My To-Do List</h1>
        
        <div class="input-section">
            <input type="text" id="taskInput" placeholder="Enter a new task..." />
            <button id="addBtn">Add Task</button>
        </div>
        
        <div class="filters">
            <button class="filter-btn active" data-filter="all">All</button>
            <button class="filter-btn" data-filter="active">Active</button>
            <button class="filter-btn" data-filter="completed">Completed</button>
        </div>
        
        <ul id="taskList" class="task-list"></ul>
        
        <div class="stats">
            <span id="taskCount">0 tasks remaining</span>
            <button id="clearCompleted">Clear Completed</button>
        </div>
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
    background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.todo-container {
    background: white;
    border-radius: 20px;
    padding: 30px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    max-width: 500px;
    width: 100%;
}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 30px;
    font-size: 2rem;
}

.input-section {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
}

#taskInput {
    flex: 1;
    padding: 12px;
    border: 2px solid #e0e0e0;
    border-radius: 10px;
    font-size: 16px;
    transition: border-color 0.3s;
}

#taskInput:focus {
    outline: none;
    border-color: #a8edea;
}

#addBtn {
    padding: 12px 24px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    cursor: pointer;
    transition: transform 0.3s;
}

#addBtn:hover {
    transform: translateY(-2px);
}

.filters {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
}

.filter-btn {
    padding: 8px 16px;
    background: transparent;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s;
}

.filter-btn.active {
    background: #667eea;
    color: white;
    border-color: #667eea;
}

.task-list {
    list-style: none;
    margin-bottom: 20px;
    max-height: 300px;
    overflow-y: auto;
}

.task-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px;
    background: #f8f9fa;
    border-radius: 10px;
    margin-bottom: 10px;
    transition: transform 0.3s;
}

.task-item:hover {
    transform: translateX(5px);
}

.task-item.completed {
    opacity: 0.6;
}

.task-item.completed .task-text {
    text-decoration: line-through;
    color: #999;
}

.task-checkbox {
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.task-text {
    flex: 1;
    font-size: 16px;
}

.delete-btn {
    background: #ff6b6b;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s;
}

.delete-btn:hover {
    background: #ff5252;
}

.stats {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 20px;
    border-top: 2px solid #e0e0e0;
}

#taskCount {
    color: #666;
    font-size: 14px;
}

#clearCompleted {
    background: transparent;
    color: #666;
    border: none;
    padding: 6px 12px;
    cursor: pointer;
    transition: color 0.3s;
}

#clearCompleted:hover {
    color: #333;
}`,
    javascript: `console.log('✅ To-Do List initialized!');

let tasks = [];
let currentFilter = 'all';

const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const clearCompleted = document.getElementById('clearCompleted');
const filterBtns = document.querySelectorAll('.filter-btn');

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        console.log('Loaded tasks:', tasks);
    }
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('Tasks saved:', tasks);
}

// Add new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        console.log('Empty task, not adding');
        return;
    }
    
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };
    
    tasks.push(newTask);
    taskInput.value = '';
    saveTasks();
    renderTasks();
    console.log('Task added:', newTask);
}

// Toggle task completion
function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
        console.log('Task toggled:', task);
    }
}

// Delete task
function deleteTask(id) {
    tasks = tasks.filter(t => t.id !== id);
    saveTasks();
    renderTasks();
    console.log('Task deleted, ID:', id);
}

// Clear completed tasks
function clearCompletedTasks() {
    const completedCount = tasks.filter(t => t.completed).length;
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
    renderTasks();
    console.log('Cleared completed tasks:', completedCount);
}

// Filter tasks
function filterTasks(filter) {
    currentFilter = filter;
    
    // Update active filter button
    filterBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === filter);
    });
    
    renderTasks();
    console.log('Filter changed to:', filter);
}

// Render tasks
function renderTasks() {
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
    
    // Update task count
    const activeTasks = tasks.filter(t => !t.completed).length;
    taskCount.textContent = \`\${activeTasks} task\${activeTasks !== 1 ? 's' : ''} remaining\`;
}

// Event listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
clearCompleted.addEventListener('click', clearCompletedTasks);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => filterTasks(btn.dataset.filter));
});

// Initialize
loadTasks();
renderTasks();
console.log('To-Do List ready!');`
  },
  
  clock: {
    name: '🕐 Digital Clock',
    description: 'Animated digital clock with date display',
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Digital Clock</title>
</head>
<body>
    <div class="clock-container">
        <h1>🕐 Digital Clock</h1>
        
        <div class="clock" id="clock">
            <div class="time" id="time">00:00:00</div>
            <div class="date" id="date">Loading...</div>
        </div>
        
        <div class="timezone">
            <label for="timezoneSelect">Timezone:</label>
            <select id="timezoneSelect">
                <option value="local">Local Time</option>
                <option value="UTC">UTC</option>
                <option value="America/New_York">New York</option>
                <option value="Europe/London">London</option>
                <option value="Asia/Tokyo">Tokyo</option>
                <option value="Australia/Sydney">Sydney</option>
            </select>
        </div>
        
        <div class="format-toggle">
            <button id="format12">12 Hour</button>
            <button id="format24" class="active">24 Hour</button>
        </div>
        
        <div class="stopwatch">
            <h2>⏱️ Stopwatch</h2>
            <div class="stopwatch-display" id="stopwatchDisplay">00:00:00</div>
            <div class="stopwatch-controls">
                <button id="startStop">Start</button>
                <button id="reset">Reset</button>
            </div>
        </div>
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
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
}

.clock-container {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 40px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
    max-width: 500px;
    width: 100%;
    border: 1px solid rgba(255, 255, 255, 0.2);
}

h1 {
    text-align: center;
    color: white;
    margin-bottom: 30px;
    font-size: 2rem;
}

.clock {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    padding: 30px;
    margin-bottom: 30px;
    text-align: center;
}

.time {
    font-size: 3rem;
    color: #00ff88;
    font-weight: bold;
    font-family: 'Courier New', monospace;
    letter-spacing: 3px;
    text-shadow: 0 0 20px rgba(0, 255, 136, 0.5);
    animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
    from { text-shadow: 0 0 20px rgba(0, 255, 136, 0.5); }
    to { text-shadow: 0 0 30px rgba(0, 255, 136, 0.8); }
}

.date {
    font-size: 1.2rem;
    color: #88ccff;
    margin-top: 10px;
}

.timezone {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 20px;
    color: white;
}

#timezoneSelect {
    padding: 8px 15px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    color: white;
    cursor: pointer;
}

#timezoneSelect option {
    background: #2a5298;
}

.format-toggle {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 30px;
}

.format-toggle button {
    padding: 10px 20px;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    color: white;
    cursor: pointer;
    transition: all 0.3s;
}

.format-toggle button.active {
    background: rgba(0, 255, 136, 0.3);
    border-color: #00ff88;
}

.format-toggle button:hover {
    background: rgba(255, 255, 255, 0.2);
}

.stopwatch {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 15px;
    padding: 20px;
    text-align: center;
}

.stopwatch h2 {
    color: white;
    margin-bottom: 15px;
    font-size: 1.2rem;
}

.stopwatch-display {
    font-size: 2rem;
    color: #ffd700;
    font-family: 'Courier New', monospace;
    margin-bottom: 15px;
}

.stopwatch-controls {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.stopwatch-controls button {
    padding: 10px 20px;
    background: rgba(255, 215, 0, 0.2);
    border: 1px solid #ffd700;
    border-radius: 8px;
    color: #ffd700;
    cursor: pointer;
    transition: all 0.3s;
}

.stopwatch-controls button:hover {
    background: rgba(255, 215, 0, 0.3);
}`,
    javascript: `console.log('🕐 Digital Clock initialized!');

let is24Hour = true;
let currentTimezone = 'local';
let stopwatchTime = 0;
let stopwatchInterval = null;
let isStopwatchRunning = false;

// Update clock
function updateClock() {
    const now = new Date();
    let displayTime = now;
    
    // Handle timezone
    if (currentTimezone !== 'local') {
        const options = {
            timeZone: currentTimezone,
            hour12: !is24Hour,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        const timeString = now.toLocaleTimeString('en-US', options);
        document.getElementById('time').textContent = timeString;
    } else {
        let hours = now.getHours();
        let minutes = now.getMinutes();
        let seconds = now.getSeconds();
        let period = '';
        
        if (!is24Hour) {
            period = hours >= 12 ? ' PM' : ' AM';
            hours = hours % 12 || 12;
        }
        
        const timeString = 
            String(hours).padStart(2, '0') + ':' +
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0') + period;
        
        document.getElementById('time').textContent = timeString;
    }
    
    // Update date
    const dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    document.getElementById('date').textContent = now.toLocaleDateString('en-US', dateOptions);
}

// Format toggle
document.getElementById('format12').addEventListener('click', function() {
    is24Hour = false;
    this.classList.add('active');
    document.getElementById('format24').classList.remove('active');
    console.log('Switched to 12-hour format');
});

document.getElementById('format24').addEventListener('click', function() {
    is24Hour = true;
    this.classList.add('active');
    document.getElementById('format12').classList.remove('active');
    console.log('Switched to 24-hour format');
});

// Timezone change
document.getElementById('timezoneSelect').addEventListener('change', function(e) {
    currentTimezone = e.target.value;
    console.log('Timezone changed to:', currentTimezone);
});

// Stopwatch functions
function updateStopwatch() {
    stopwatchTime++;
    const hours = Math.floor(stopwatchTime / 3600);
    const minutes = Math.floor((stopwatchTime % 3600) / 60);
    const seconds = stopwatchTime % 60;
    
    const display = 
        String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');
    
    document.getElementById('stopwatchDisplay').textContent = display;
}

document.getElementById('startStop').addEventListener('click', function() {
    if (isStopwatchRunning) {
        clearInterval(stopwatchInterval);
        this.textContent = 'Start';
        isStopwatchRunning = false;
        console.log('Stopwatch stopped at:', stopwatchTime);
    } else {
        stopwatchInterval = setInterval(updateStopwatch, 1000);
        this.textContent = 'Stop';
        isStopwatchRunning = true;
        console.log('Stopwatch started');
    }
});

document.getElementById('reset').addEventListener('click', function() {
    clearInterval(stopwatchInterval);
    stopwatchTime = 0;
    document.getElementById('stopwatchDisplay').textContent = '00:00:00';
    document.getElementById('startStop').textContent = 'Start';
    isStopwatchRunning = false;
    console.log('Stopwatch reset');
});

// Start clock
setInterval(updateClock, 1000);
updateClock(); // Initial call

console.log('Clock is running!');`
  }
};

export default codeExamples;