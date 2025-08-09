// Replace the templates object in your Playground.jsx with this fixed version

const templates = {
  basic: {
    name: 'Basic',
    icon: '📝',
    html: `<div class="wrapper">
  <h1>Hello World</h1>
  <p>Welcome to JavaScript!</p>
  <button id="helloBtn">Click Me</button>
</div>`,
    css: `body { 
  font-family: Arial, sans-serif; 
  padding: 40px; 
  background: linear-gradient(135deg, #4a8a4a 0%, #b89968 100%);
  color: white;
}
.wrapper {
  text-align: center;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background: #d4e8d4;
  color: #1e301e;
  cursor: pointer;
  transition: all 0.2s;
}
button:hover {
  transform: scale(1.05);
  background: #a8d0a8;
}`,
    js: `// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.getElementById('helloBtn');
  
  if (btn) {
    btn.addEventListener('click', function() {
      alert('Hello from JavaScript!');
      console.log('Button was clicked at', new Date());
    });
  }
  
  console.log('Basic template loaded!');
});`
  },
  
  interactive: {
    name: 'Counter',
    icon: '🔢',
    html: `<div class="app">
  <h2>Interactive Counter</h2>
  <div class="counter-display" id="display">0</div>
  <div class="buttons">
    <button id="decrementBtn">-</button>
    <button id="resetBtn">Reset</button>
    <button id="incrementBtn">+</button>
  </div>
</div>`,
    css: `.app {
  max-width: 300px;
  margin: 50px auto;
  padding: 30px;
  background: white;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  text-align: center;
}
.counter-display {
  font-size: 48px;
  font-weight: bold;
  color: #4a8a4a;
  margin: 20px 0;
}
.buttons {
  display: flex;
  gap: 10px;
  justify-content: center;
}
button {
  width: 60px;
  height: 40px;
  font-size: 20px;
  border: none;
  border-radius: 8px;
  background: linear-gradient(135deg, #5fa05f, #a07c48);
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}
button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}`,
    js: `let count = 0;

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  const display = document.getElementById('display');
  const incrementBtn = document.getElementById('incrementBtn');
  const decrementBtn = document.getElementById('decrementBtn');
  const resetBtn = document.getElementById('resetBtn');
  
  function updateDisplay() {
    if (display) {
      display.textContent = count;
      display.style.color = count > 0 ? '#5fa05f' : count < 0 ? '#b89968' : '#4a8a4a';
    }
  }
  
  if (incrementBtn) {
    incrementBtn.addEventListener('click', function() {
      count++;
      updateDisplay();
      console.log('Incremented to:', count);
    });
  }
  
  if (decrementBtn) {
    decrementBtn.addEventListener('click', function() {
      count--;
      updateDisplay();
      console.log('Decremented to:', count);
    });
  }
  
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      count = 0;
      updateDisplay();
      console.log('Reset to:', count);
    });
  }
  
  console.log('Counter app initialized!');
});`
  },
  
  todo: {
    name: 'Todo App',
    icon: '✅',
    html: `<div class="todo-app">
  <h2>📝 Todo List</h2>
  <div class="input-group">
    <input type="text" id="todoInput" placeholder="Add a new task...">
    <button id="addBtn">Add</button>
  </div>
  <ul id="todoList"></ul>
  <div class="stats" id="stats">0 tasks</div>
</div>`,
    css: `.todo-app {
  max-width: 400px;
  margin: 30px auto;
  padding: 25px;
  background: linear-gradient(135deg, #f0f7f0, #faf8f5);
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.15);
}
h2 {
  color: #1e301e;
  margin-bottom: 20px;
}
.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
input {
  flex: 1;
  padding: 12px;
  border: 2px solid #a8d0a8;
  border-radius: 8px;
  font-size: 16px;
}
input:focus {
  outline: none;
  border-color: #5fa05f;
}
button {
  padding: 12px 24px;
  background: linear-gradient(135deg, #4a8a4a, #5fa05f);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}
button:hover {
  background: linear-gradient(135deg, #5fa05f, #7cb77c);
}
ul {
  list-style: none;
  padding: 0;
}
li {
  padding: 12px;
  margin: 8px 0;
  background: #d4e8d4;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s;
  color: #1e301e;
}
li:hover {
  background: #a8d0a8;
  transform: translateX(5px);
}
.delete-btn {
  background: #b89968;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}
.delete-btn:hover {
  background: #a07c48;
}
.stats {
  margin-top: 20px;
  text-align: center;
  color: #4a3925;
  font-style: italic;
}`,
    js: `let todos = [];

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
  const addBtn = document.getElementById('addBtn');
  const todoInput = document.getElementById('todoInput');
  
  // Add button click handler
  if (addBtn) {
    addBtn.addEventListener('click', addTodo);
  }
  
  // Enter key handler
  if (todoInput) {
    todoInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        addTodo();
      }
    });
  }
  
  console.log('Todo app initialized with Matcha theme!');
});

function addTodo() {
  const input = document.getElementById('todoInput');
  const text = input.value.trim();
  
  if (text) {
    const todo = {
      id: Date.now(),
      text: text,
      completed: false
    };
    
    todos.push(todo);
    input.value = '';
    renderTodos();
    console.log('Added todo:', text);
  }
}

function deleteTodo(id) {
  todos = todos.filter(todo => todo.id !== id);
  renderTodos();
  console.log('Deleted todo with id:', id);
}

function renderTodos() {
  const list = document.getElementById('todoList');
  const stats = document.getElementById('stats');
  
  if (list) {
    list.innerHTML = '';
    todos.forEach(todo => {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = todo.text;
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = 'Delete';
      deleteBtn.addEventListener('click', function() {
        deleteTodo(todo.id);
      });
      
      li.appendChild(span);
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  }
  
  if (stats) {
    const taskCount = todos.length;
    stats.textContent = taskCount + ' task' + (taskCount !== 1 ? 's' : '');
  }
}`
  },
  
  calculator: {
    name: 'Calculator',
    icon: '🧮',
    html: `<div class="calculator">
  <h2>Calculator</h2>
  <div class="display" id="display">0</div>
  <div class="buttons-grid">
    <button class="btn-clear" id="clear">C</button>
    <button class="btn-operator" data-op="/">÷</button>
    <button class="btn-operator" data-op="*">×</button>
    <button class="btn-delete" id="delete">←</button>
    
    <button class="btn-number" data-num="7">7</button>
    <button class="btn-number" data-num="8">8</button>
    <button class="btn-number" data-num="9">9</button>
    <button class="btn-operator" data-op="-">−</button>
    
    <button class="btn-number" data-num="4">4</button>
    <button class="btn-number" data-num="5">5</button>
    <button class="btn-number" data-num="6">6</button>
    <button class="btn-operator" data-op="+">+</button>
    
    <button class="btn-number" data-num="1">1</button>
    <button class="btn-number" data-num="2">2</button>
    <button class="btn-number" data-num="3">3</button>
    <button class="btn-equals" id="equals" rowspan="2">=</button>
    
    <button class="btn-number btn-zero" data-num="0">0</button>
    <button class="btn-number" data-num=".">.</button>
  </div>
  <div class="history" id="history"></div>
</div>`,
    css: `.calculator {
  max-width: 320px;
  margin: 30px auto;
  padding: 20px;
  background: linear-gradient(135deg, #1e301e, #4a3925);
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0,0,0,0.3);
}

h2 {
  color: #d4e8d4;
  text-align: center;
  margin-bottom: 20px;
}

.display {
  background: #0a0a0a;
  color: #5fa05f;
  font-size: 2.5rem;
  padding: 15px;
  text-align: right;
  margin-bottom: 15px;
  border-radius: 10px;
  min-height: 60px;
  font-family: 'Courier New', monospace;
  overflow: hidden;
  text-overflow: ellipsis;
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.5);
}

.buttons-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

button {
  padding: 20px;
  font-size: 1.2rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: bold;
  box-shadow: 0 3px 10px rgba(0,0,0,0.3);
}

.btn-number {
  background: linear-gradient(135deg, #4a8a4a, #5fa05f);
  color: white;
}

.btn-number:hover {
  background: linear-gradient(135deg, #5fa05f, #7cb77c);
  transform: translateY(-2px);
}

.btn-operator {
  background: linear-gradient(135deg, #b89968, #a07c48);
  color: white;
}

.btn-operator:hover {
  background: linear-gradient(135deg, #a07c48, #8a6a3e);
  transform: translateY(-2px);
}

.btn-clear {
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  grid-column: span 2;
}

.btn-delete {
  background: linear-gradient(135deg, #ffd93d, #ffc107);
  color: #333;
}

.btn-equals {
  background: linear-gradient(135deg, #4ecdc4, #44a08d);
  color: white;
  grid-row: span 2;
  font-size: 1.5rem;
}

.btn-equals:hover {
  background: linear-gradient(135deg, #44a08d, #2e8b7e);
  transform: translateY(-2px);
}

.btn-zero {
  grid-column: span 2;
}

button:active {
  transform: scale(0.95);
}

.history {
  margin-top: 20px;
  padding: 10px;
  background: rgba(0,0,0,0.3);
  border-radius: 10px;
  color: #a8d0a8;
  font-size: 0.9rem;
  max-height: 100px;
  overflow-y: auto;
  font-family: monospace;
}

.history:empty {
  display: none;
}

.history-item {
  padding: 5px;
  border-bottom: 1px solid rgba(168, 208, 168, 0.2);
}`,
    js: `// Calculator State
let currentValue = '0';
let previousValue = null;
let operation = null;
let shouldResetDisplay = false;
let history = [];

// Get DOM elements
document.addEventListener('DOMContentLoaded', function() {
  const display = document.getElementById('display');
  const historyEl = document.getElementById('history');
  const clearBtn = document.getElementById('clear');
  const deleteBtn = document.getElementById('delete');
  const equalsBtn = document.getElementById('equals');
  const numberBtns = document.querySelectorAll('.btn-number');
  const operatorBtns = document.querySelectorAll('.btn-operator');
  
  // Update display
  function updateDisplay() {
    if (display) {
      display.textContent = currentValue;
    }
  }
  
  // Add to history
  function addToHistory(calculation) {
    history.unshift(calculation);
    if (history.length > 5) history.pop();
    
    if (historyEl) {
      historyEl.innerHTML = '';
      history.forEach(item => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.textContent = item;
        historyEl.appendChild(div);
      });
    }
  }
  
  // Handle number input
  function handleNumber(num) {
    if (shouldResetDisplay) {
      currentValue = '0';
      shouldResetDisplay = false;
    }
    
    if (num === '.' && currentValue.includes('.')) return;
    
    if (currentValue === '0' && num !== '.') {
      currentValue = num;
    } else {
      currentValue += num;
    }
    
    updateDisplay();
  }
  
  // Handle operation
  function handleOperation(op) {
    const current = parseFloat(currentValue);
    
    if (previousValue !== null && !shouldResetDisplay) {
      calculate();
    } else {
      previousValue = current;
    }
    
    operation = op;
    shouldResetDisplay = true;
  }
  
  // Calculate result
  function calculate() {
    const current = parseFloat(currentValue);
    const previous = parseFloat(previousValue);
    let result;
    
    switch(operation) {
      case '+':
        result = previous + current;
        break;
      case '-':
        result = previous - current;
        break;
      case '*':
        result = previous * current;
        break;
      case '/':
        result = current !== 0 ? previous / current : 'Error';
        break;
      default:
        return;
    }
    
    const calculation = previous + ' ' + operation + ' ' + current + ' = ' + result;
    addToHistory(calculation);
    console.log(calculation);
    
    currentValue = result.toString();
    previousValue = null;
    operation = null;
    shouldResetDisplay = true;
    updateDisplay();
  }
  
  // Clear calculator
  function clear() {
    currentValue = '0';
    previousValue = null;
    operation = null;
    shouldResetDisplay = false;
    updateDisplay();
    console.log('Calculator cleared');
  }
  
  // Delete last digit
  function deleteLast() {
    if (currentValue.length > 1) {
      currentValue = currentValue.slice(0, -1);
    } else {
      currentValue = '0';
    }
    updateDisplay();
  }
  
  // Attach event listeners
  numberBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      handleNumber(this.dataset.num);
    });
  });
  
  operatorBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      handleOperation(this.dataset.op);
    });
  });
  
  if (clearBtn) {
    clearBtn.addEventListener('click', clear);
  }
  
  if (deleteBtn) {
    deleteBtn.addEventListener('click', deleteLast);
  }
  
  if (equalsBtn) {
    equalsBtn.addEventListener('click', function() {
      if (operation && previousValue !== null) {
        calculate();
      }
    });
  }
  
  // Keyboard support
  document.addEventListener('keydown', function(e) {
    if (e.key >= '0' && e.key <= '9') handleNumber(e.key);
    if (e.key === '.') handleNumber('.');
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
      handleOperation(e.key);
    }
    if (e.key === 'Enter' || e.key === '=') {
      if (operation && previousValue !== null) calculate();
    }
    if (e.key === 'Escape' || e.key === 'c' || e.key === 'C') clear();
    if (e.key === 'Backspace') deleteLast();
  });
  
  console.log('Calculator initialized! Use keyboard or buttons.');
  console.log('Keyboard shortcuts: Numbers, +, -, *, /, Enter, Backspace, Escape');
});`
  }
};