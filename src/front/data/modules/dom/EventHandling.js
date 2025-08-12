// src/front/data/modules/dom/EventHandling.js
export const EventHandling = {
  title: 'Event Handling',
  duration: '40 min',
  difficulty: 'Intermediate',
  overview: 'Master JavaScript event handling. Learn event listeners, event objects, delegation, and modern event patterns for interactive web applications.',

  keyPoints: [
    'Events are triggered by user actions or browser activities',
    'Use addEventListener() to attach event handlers',
    'Event objects contain detailed information about events',
    'Event delegation handles events on parent elements',
    'Prevent default behavior and stop propagation when needed',
    'Remove event listeners to prevent memory leaks'
  ],

  example: `// Basic Event Handling
const button = document.querySelector('#my-button');
const output = document.querySelector('#output');

// Add click event listener
button.addEventListener('click', function(event) {
    console.log('Button clicked!');
    console.log('Event type:', event.type);
    console.log('Target element:', event.target);
    console.log('Current target:', event.currentTarget);
    
    output.textContent = 'Button was clicked at ' + new Date().toLocaleTimeString();
});

// Arrow function event handler
button.addEventListener('dblclick', (event) => {
    console.log('Button double-clicked!');
    event.target.style.backgroundColor = 'lightgreen';
});

// Multiple Event Types
const input = document.querySelector('#text-input');

const inputEvents = {
    focus: () => {
        console.log('Input focused');
        input.style.backgroundColor = '#e6f3ff';
    },
    blur: () => {
        console.log('Input lost focus');
        input.style.backgroundColor = '';
    },
    input: (event) => {
        console.log('Input value changed:', event.target.value);
        // Real-time validation could go here
    },
    change: (event) => {
        console.log('Input change event:', event.target.value);
    }
};

// Add multiple event listeners
Object.entries(inputEvents).forEach(([eventType, handler]) => {
    input.addEventListener(eventType, handler);
});

// Event Delegation
const todoList = document.querySelector('#todo-list');

todoList.addEventListener('click', function(event) {
    // Handle different clicked elements
    if (event.target.classList.contains('delete-btn')) {
        // Remove the todo item
        const todoItem = event.target.closest('.todo-item');
        todoItem.remove();
        console.log('Todo item deleted');
    }
    
    if (event.target.classList.contains('edit-btn')) {
        // Edit the todo item
        const todoText = event.target.closest('.todo-item').querySelector('.todo-text');
        const currentText = todoText.textContent;
        const newText = prompt('Edit todo:', currentText);
        if (newText !== null) {
            todoText.textContent = newText;
        }
    }
    
    if (event.target.type === 'checkbox') {
        // Toggle completion
        const todoItem = event.target.closest('.todo-item');
        todoItem.classList.toggle('completed');
        console.log('Todo toggled');
    }
});

// Keyboard Events
document.addEventListener('keydown', function(event) {
    console.log(\`Key pressed: \${event.key}\`);
    console.log(\`Key code: \${event.code}\`);
    console.log(\`Ctrl pressed: \${event.ctrlKey}\`);
    console.log(\`Shift pressed: \${event.shiftKey}\`);
    console.log(\`Alt pressed: \${event.altKey}\`);
    
    // Keyboard shortcuts
    if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); // Prevent browser save dialog
        console.log('Save shortcut pressed');
        saveData();
    }
    
    if (event.key === 'Escape') {
        closeModal();
    }
    
    // Arrow key navigation
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
        handleArrowNavigation(event.key);
    }
});

function saveData() {
    console.log('Saving data...');
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function handleArrowNavigation(direction) {
    console.log(\`Navigating: \${direction}\`);
}

// Mouse Events
const draggableBox = document.querySelector('#draggable-box');
let isDragging = false;
let startX, startY, offsetX, offsetY;

draggableBox.addEventListener('mousedown', function(event) {
    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    
    const rect = draggableBox.getBoundingClientRect();
    offsetX = startX - rect.left;
    offsetY = startY - rect.top;
    
    draggableBox.style.cursor = 'grabbing';
    console.log('Drag started');
});

document.addEventListener('mousemove', function(event) {
    if (isDragging) {
        const x = event.clientX - offsetX;
        const y = event.clientY - offsetY;
        
        draggableBox.style.left = x + 'px';
        draggableBox.style.top = y + 'px';
    }
});

document.addEventListener('mouseup', function() {
    if (isDragging) {
        isDragging = false;
        draggableBox.style.cursor = 'grab';
        console.log('Drag ended');
    }
});

// Touch Events for Mobile
const touchArea = document.querySelector('#touch-area');

touchArea.addEventListener('touchstart', function(event) {
    console.log('Touch started');
    console.log('Touches:', event.touches.length);
    event.preventDefault(); // Prevent scrolling
});

touchArea.addEventListener('touchmove', function(event) {
    const touch = event.touches[0];
    console.log(\`Touch move: \${touch.clientX}, \${touch.clientY}\`);
    event.preventDefault();
});

touchArea.addEventListener('touchend', function(event) {
    console.log('Touch ended');
});

// Form Events
const form = document.querySelector('#my-form');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop form submission
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    console.log('Form submitted with data:', data);
    
    // Validation
    if (validateForm(data)) {
        console.log('Form is valid, processing...');
        processForm(data);
    } else {
        console.log('Form validation failed');
        showValidationErrors();
    }
});

function validateForm(data) {
    return data.email && data.email.includes('@') && data.password?.length >= 6;
}

function processForm(data) {
    // Submit form data
    console.log('Processing form data...');
}

function showValidationErrors() {
    // Show error messages
    console.log('Showing validation errors...');
}

// Custom Events
function createCustomEvent() {
    // Create custom event
    const customEvent = new CustomEvent('userLogin', {
        detail: {
            username: 'john_doe',
            timestamp: new Date().toISOString()
        }
    });
    
    // Dispatch the event
    document.dispatchEvent(customEvent);
}

// Listen for custom event
document.addEventListener('userLogin', function(event) {
    console.log('User logged in:', event.detail);
    updateUIForLoggedInUser(event.detail.username);
});

function updateUIForLoggedInUser(username) {
    console.log(\`Updating UI for user: \${username}\`);
}

// Event Listener Management
const clickHandler = function(event) {
    console.log('Click handled');
};

// Add event listener
button.addEventListener('click', clickHandler);

// Remove event listener (important for memory management)
// button.removeEventListener('click', clickHandler);

// Once event (runs only once)
button.addEventListener('click', function(event) {
    console.log('This will only run once');
}, { once: true });

// Event options
button.addEventListener('click', function(event) {
    console.log('Passive listener');
}, { 
    passive: true,  // Never calls preventDefault()
    capture: false, // Listen during bubble phase
    once: false     // Can run multiple times
});

// Debouncing Events
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

// Debounced search
const searchInput = document.querySelector('#search');
const debouncedSearch = debounce(function(event) {
    console.log('Searching for:', event.target.value);
    performSearch(event.target.value);
}, 300);

searchInput.addEventListener('input', debouncedSearch);

function performSearch(query) {
    // Actual search logic
    console.log(\`Performing search for: \${query}\`);
}

// Throttling Events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Throttled scroll handler
const throttledScroll = throttle(function(event) {
    console.log('Scroll position:', window.scrollY);
    updateScrollIndicator();
}, 100);

window.addEventListener('scroll', throttledScroll);

function updateScrollIndicator() {
    // Update scroll indicator
    const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    console.log(\`Scrolled: \${scrollPercent.toFixed(1)}%\`);
}`,

  exercises: [
    {
      question: "Create an event listener that changes button color on hover.",
      solution: `const btn = document.querySelector('button');
btn.addEventListener('mouseenter', () => btn.style.backgroundColor = 'blue');
btn.addEventListener('mouseleave', () => btn.style.backgroundColor = '');`,
      explanation: "Use mouseenter and mouseleave events for hover effects."
    },
    {
      question: "Implement event delegation to handle clicks on dynamically added list items.",
      solution: `const list = document.querySelector('ul');
list.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    console.log('Clicked:', e.target.textContent);
  }
});`,
      explanation: "Event delegation allows handling events on elements that don't exist yet."
    }
  ],

  quiz: [
    {
      question: "What does event.preventDefault() do?",
      options: [
        "Stops all event listeners",
        "Prevents the default browser action",
        "Removes the event listener",
        "Prevents event bubbling"
      ],
      correct: 1,
      explanation: "preventDefault() stops the default browser behavior for that event."
    }
  ],

  resources: [
    {
      title: "MDN - Event Handling",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener"
    }
  ],

  nextModules: ['form-validation', 'event-delegation'],
  prerequisites: ['dom-basics']
};