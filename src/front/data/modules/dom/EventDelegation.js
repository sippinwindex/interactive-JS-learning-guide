// src/front/data/modules/dom/EventDelegation.js
export default {
  title: 'Event Delegation',
  duration: '35 min',
  difficulty: 'Intermediate',
  overview: 'Master event delegation for efficient event handling. Learn to manage dynamic content, reduce memory usage, and implement advanced event patterns.',
  
  keyPoints: [
    'Event delegation uses event bubbling to handle events efficiently',
    'Single listener on parent handles events for all children',
    'Works with dynamic content added after page load',
    'Reduces memory usage and improves performance',
    'Uses event.target to identify the actual clicked element',
    'Essential for large lists and dynamic interfaces'
  ],

  example: `// Understanding Event Bubbling
console.log('=== Understanding Event Bubbling ===');

// Create a demo structure to understand event bubbling
function createBubblingDemo() {
    const container = document.createElement('div');
    container.id = 'bubbling-demo';
    container.style.cssText = 'border: 2px solid blue; padding: 20px; margin: 10px;';
    
    const parent = document.createElement('div');
    parent.id = 'parent';
    parent.style.cssText = 'border: 2px solid green; padding: 15px; margin: 10px;';
    parent.textContent = 'Parent Element';
    
    const child = document.createElement('button');
    child.id = 'child';
    child.style.cssText = 'padding: 10px; margin: 10px;';
    child.textContent = 'Child Button';
    
    parent.appendChild(child);
    container.appendChild(parent);
    document.body.appendChild(container);
    
    // Add event listeners to demonstrate bubbling
    container.addEventListener('click', (e) => {
        console.log('Container clicked. Target:', e.target.id, 'Current:', e.currentTarget.id);
    });
    
    parent.addEventListener('click', (e) => {
        console.log('Parent clicked. Target:', e.target.id, 'Current:', e.currentTarget.id);
    });
    
    child.addEventListener('click', (e) => {
        console.log('Child clicked. Target:', e.target.id, 'Current:', e.currentTarget.id);
        // Uncomment to stop bubbling:
        // e.stopPropagation();
    });
    
    console.log('Click the child button to see event bubbling in action');
    return container;
}

const bubblingDemo = createBubblingDemo();

// Basic Event Delegation
console.log('\\n=== Basic Event Delegation ===');

function createBasicDelegationDemo() {
    const container = document.createElement('div');
    container.innerHTML = \`
        <h3>Task List (Basic Delegation)</h3>
        <ul id="task-list" style="border: 1px solid #ccc; padding: 10px;">
            <li data-task-id="1">
                <span class="task-text">Buy groceries</span>
                <button class="delete-btn" data-action="delete">Delete</button>
                <button class="edit-btn" data-action="edit">Edit</button>
            </li>
            <li data-task-id="2">
                <span class="task-text">Walk the dog</span>
                <button class="delete-btn" data-action="delete">Delete</button>
                <button class="edit-btn" data-action="edit">Edit</button>
            </li>
            <li data-task-id="3">
                <span class="task-text">Read a book</span>
                <button class="delete-btn" data-action="delete">Delete</button>
                <button class="edit-btn" data-action="edit">Edit</button>
            </li>
        </ul>
        <button id="add-task">Add New Task</button>
    \`;
    
    document.body.appendChild(container);
    
    const taskList = container.querySelector('#task-list');
    let taskCounter = 4;
    
    // Single event listener using delegation
    taskList.addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        const taskItem = e.target.closest('li');
        const taskId = taskItem?.dataset.taskId;
        const taskText = taskItem?.querySelector('.task-text')?.textContent;
        
        if (action === 'delete') {
            console.log(\`Deleting task \${taskId}: \${taskText}\`);
            taskItem.remove();
        } else if (action === 'edit') {
            console.log(\`Editing task \${taskId}: \${taskText}\`);
            const newText = prompt('Edit task:', taskText);
            if (newText) {
                taskItem.querySelector('.task-text').textContent = newText;
            }
        }
    });
    
    // Add new task functionality
    container.querySelector('#add-task').addEventListener('click', () => {
        const taskText = prompt('Enter new task:');
        if (taskText) {
            const newTask = document.createElement('li');
            newTask.dataset.taskId = taskCounter++;
            newTask.innerHTML = \`
                <span class="task-text">\${taskText}</span>
                <button class="delete-btn" data-action="delete">Delete</button>
                <button class="edit-btn" data-action="edit">Edit</button>
            \`;
            taskList.appendChild(newTask);
            console.log('Added new task:', taskText);
        }
    });
    
    return container;
}

const basicDemo = createBasicDelegationDemo();

// Advanced Event Delegation with Multiple Event Types
console.log('\\n=== Advanced Event Delegation ===');

function createAdvancedDelegationDemo() {
    const container = document.createElement('div');
    container.innerHTML = \`
        <h3>Interactive Card System</h3>
        <div id="card-container" style="display: flex; flex-wrap: wrap; gap: 10px; padding: 10px; border: 1px solid #ddd;">
            <div class="card" data-card-id="1" style="border: 1px solid #ccc; padding: 15px; width: 200px; background: #f9f9f9;">
                <h4 class="card-title">Card 1</h4>
                <p class="card-content">This is card content</p>
                <div class="card-actions">
                    <button class="btn-primary" data-action="like">❤️ Like</button>
                    <button class="btn-secondary" data-action="share">📤 Share</button>
                    <button class="btn-danger" data-action="remove">🗑️ Remove</button>
                </div>
                <input type="text" class="card-input" placeholder="Add comment..." style="width: 100%; margin-top: 10px;">
            </div>
            <div class="card" data-card-id="2" style="border: 1px solid #ccc; padding: 15px; width: 200px; background: #f9f9f9;">
                <h4 class="card-title">Card 2</h4>
                <p class="card-content">Another card content</p>
                <div class="card-actions">
                    <button class="btn-primary" data-action="like">❤️ Like</button>
                    <button class="btn-secondary" data-action="share">📤 Share</button>
                    <button class="btn-danger" data-action="remove">🗑️ Remove</button>
                </div>
                <input type="text" class="card-input" placeholder="Add comment..." style="width: 100%; margin-top: 10px;">
            </div>
        </div>
        <button id="add-card" style="margin: 10px;">Add New Card</button>
    \`;
    
    document.body.appendChild(container);
    
    const cardContainer = container.querySelector('#card-container');
    let cardCounter = 3;
    
    // Comprehensive event delegation for multiple event types
    cardContainer.addEventListener('click', handleCardClick);
    cardContainer.addEventListener('mouseover', handleCardHover);
    cardContainer.addEventListener('mouseout', handleCardHover);
    cardContainer.addEventListener('keypress', handleCardKeypress);
    cardContainer.addEventListener('input', handleCardInput);
    
    function handleCardClick(e) {
        const action = e.target.dataset.action;
        const card = e.target.closest('.card');
        const cardId = card?.dataset.cardId;
        
        switch (action) {
            case 'like':
                handleLike(card, e.target);
                break;
            case 'share':
                handleShare(card);
                break;
            case 'remove':
                handleRemove(card);
                break;
        }
    }
    
    function handleCardHover(e) {
        if (e.target.classList.contains('card')) {
            if (e.type === 'mouseover') {
                e.target.style.transform = 'scale(1.02)';
                e.target.style.transition = 'transform 0.2s';
                console.log(\`Hovering over card \${e.target.dataset.cardId}\`);
            } else if (e.type === 'mouseout') {
                e.target.style.transform = 'scale(1)';
            }
        }
    }
    
    function handleCardKeypress(e) {
        if (e.target.classList.contains('card-input') && e.key === 'Enter') {
            const card = e.target.closest('.card');
            const comment = e.target.value.trim();
            
            if (comment) {
                addComment(card, comment);
                e.target.value = '';
            }
        }
    }
    
    function handleCardInput(e) {
        if (e.target.classList.contains('card-input')) {
            console.log(\`Typing in card \${e.target.closest('.card').dataset.cardId}: \${e.target.value}\`);
        }
    }
    
    function handleLike(card, button) {
        const currentLikes = parseInt(button.dataset.likes || '0');
        const newLikes = currentLikes + 1;
        button.dataset.likes = newLikes;
        button.textContent = \`❤️ Like (\${newLikes})\`;
        console.log(\`Card \${card.dataset.cardId} liked! Total likes: \${newLikes}\`);
    }
    
    function handleShare(card) {
        const cardTitle = card.querySelector('.card-title').textContent;
        console.log(\`Sharing card: \${cardTitle}\`);
        // Simulate sharing
        navigator.clipboard?.writeText(\`Check out this card: \${cardTitle}\`)
            .then(() => console.log('Card link copied to clipboard!'))
            .catch(() => console.log('Sharing functionality simulated'));
    }
    
    function handleRemove(card) {
        const cardTitle = card.querySelector('.card-title').textContent;
        if (confirm(\`Remove card: \${cardTitle}?\`)) {
            card.style.animation = 'fadeOut 0.3s';
            setTimeout(() => card.remove(), 300);
            console.log(\`Card removed: \${cardTitle}\`);
        }
    }
    
    function addComment(card, comment) {
        const cardId = card.dataset.cardId;
        let commentsContainer = card.querySelector('.comments');
        
        if (!commentsContainer) {
            commentsContainer = document.createElement('div');
            commentsContainer.className = 'comments';
            commentsContainer.style.cssText = 'margin-top: 10px; font-size: 12px; color: #666;';
            card.appendChild(commentsContainer);
        }
        
        const commentElement = document.createElement('div');
        commentElement.textContent = \`💬 \${comment}\`;
        commentElement.style.marginBottom = '5px';
        commentsContainer.appendChild(commentElement);
        
        console.log(\`Comment added to card \${cardId}: \${comment}\`);
    }
    
    // Add new card functionality
    container.querySelector('#add-card').addEventListener('click', () => {
        const cardTitle = prompt('Enter card title:') || \`Card \${cardCounter}\`;
        const cardContent = prompt('Enter card content:') || 'New card content';
        
        const newCard = document.createElement('div');
        newCard.className = 'card';
        newCard.dataset.cardId = cardCounter++;
        newCard.style.cssText = 'border: 1px solid #ccc; padding: 15px; width: 200px; background: #f9f9f9;';
        newCard.innerHTML = \`
            <h4 class="card-title">\${cardTitle}</h4>
            <p class="card-content">\${cardContent}</p>
            <div class="card-actions">
                <button class="btn-primary" data-action="like">❤️ Like</button>
                <button class="btn-secondary" data-action="share">📤 Share</button>
                <button class="btn-danger" data-action="remove">🗑️ Remove</button>
            </div>
            <input type="text" class="card-input" placeholder="Add comment..." style="width: 100%; margin-top: 10px;">
        \`;
        
        cardContainer.appendChild(newCard);
        console.log('Added new card:', cardTitle);
    });
    
    return container;
}

const advancedDemo = createAdvancedDelegationDemo();

// Event Delegation with Form Elements
console.log('\\n=== Form Event Delegation ===');

function createFormDelegationDemo() {
    const container = document.createElement('div');
    container.innerHTML = \`
        <h3>Dynamic Form Builder</h3>
        <form id="dynamic-form" style="border: 1px solid #ddd; padding: 20px; margin: 10px;">
            <div class="form-group">
                <label>Name:</label>
                <input type="text" name="name" data-field="text" required>
                <button type="button" class="remove-field" data-action="remove">Remove</button>
            </div>
            <div class="form-group">
                <label>Email:</label>
                <input type="email" name="email" data-field="email" required>
                <button type="button" class="remove-field" data-action="remove">Remove</button>
            </div>
        </form>
        <div id="form-controls" style="margin: 10px;">
            <button data-action="add-text">Add Text Field</button>
            <button data-action="add-email">Add Email Field</button>
            <button data-action="add-select">Add Select Field</button>
            <button data-action="add-checkbox">Add Checkbox</button>
            <button data-action="submit">Submit Form</button>
        </div>
        <div id="form-output" style="margin: 10px; padding: 10px; background: #f5f5f5;"></div>
    \`;
    
    document.body.appendChild(container);
    
    const form = container.querySelector('#dynamic-form');
    const controls = container.querySelector('#form-controls');
    const output = container.querySelector('#form-output');
    let fieldCounter = 1;
    
    // Form event delegation
    form.addEventListener('input', handleFormInput);
    form.addEventListener('change', handleFormChange);
    form.addEventListener('focus', handleFormFocus, true); // Use capture for focus
    form.addEventListener('blur', handleFormBlur, true);   // Use capture for blur
    form.addEventListener('click', handleFormClick);
    
    // Controls event delegation
    controls.addEventListener('click', handleControlClick);
    
    function handleFormInput(e) {
        if (e.target.matches('input, select, textarea')) {
            console.log(\`Input in \${e.target.name}: \${e.target.value}\`);
            validateField(e.target);
            updateOutput();
        }
    }
    
    function handleFormChange(e) {
        if (e.target.matches('select, input[type="checkbox"], input[type="radio"]')) {
            console.log(\`Changed \${e.target.name}: \${e.target.value || e.target.checked}\`);
            updateOutput();
        }
    }
    
    function handleFormFocus(e) {
        if (e.target.matches('input, select, textarea')) {
            e.target.style.outline = '2px solid #007bff';
            console.log(\`Focused on \${e.target.name}\`);
        }
    }
    
    function handleFormBlur(e) {
        if (e.target.matches('input, select, textarea')) {
            e.target.style.outline = '';
            validateField(e.target);
            console.log(\`Blurred from \${e.target.name}\`);
        }
    }
    
    function handleFormClick(e) {
        if (e.target.matches('.remove-field')) {
            const formGroup = e.target.closest('.form-group');
            const fieldName = formGroup.querySelector('input, select').name;
            
            if (confirm(\`Remove \${fieldName} field?\`)) {
                formGroup.remove();
                updateOutput();
                console.log(\`Removed field: \${fieldName}\`);
            }
        }
    }
    
    function handleControlClick(e) {
        const action = e.target.dataset.action;
        
        switch (action) {
            case 'add-text':
                addField('text', 'Text Field');
                break;
            case 'add-email':
                addField('email', 'Email Field');
                break;
            case 'add-select':
                addField('select', 'Select Field');
                break;
            case 'add-checkbox':
                addField('checkbox', 'Checkbox Field');
                break;
            case 'submit':
                submitForm();
                break;
        }
    }
    
    function addField(type, label) {
        const fieldName = \`field_\${fieldCounter++}\`;
        const formGroup = document.createElement('div');
        formGroup.className = 'form-group';
        
        let fieldHTML = \`<label>\${label}:</label>\`;
        
        switch (type) {
            case 'text':
                fieldHTML += \`<input type="text" name="\${fieldName}" data-field="text">\`;
                break;
            case 'email':
                fieldHTML += \`<input type="email" name="\${fieldName}" data-field="email">\`;
                break;
            case 'select':
                fieldHTML += \`
                    <select name="\${fieldName}" data-field="select">
                        <option value="">Choose...</option>
                        <option value="option1">Option 1</option>
                        <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                    </select>
                \`;
                break;
            case 'checkbox':
                fieldHTML += \`<input type="checkbox" name="\${fieldName}" data-field="checkbox" value="yes">\`;
                break;
        }
        
        fieldHTML += \`<button type="button" class="remove-field" data-action="remove">Remove</button>\`;
        formGroup.innerHTML = fieldHTML;
        
        form.appendChild(formGroup);
        console.log(\`Added \${type} field: \${fieldName}\`);
        updateOutput();
    }
    
    function validateField(field) {
        // Simple validation
        const isValid = field.checkValidity();
        field.style.borderColor = isValid ? '' : 'red';
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add error message if invalid
        if (!isValid && field.value) {
            const errorMessage = document.createElement('span');
            errorMessage.className = 'error-message';
            errorMessage.style.color = 'red';
            errorMessage.style.fontSize = '12px';
            errorMessage.textContent = field.validationMessage;
            field.parentNode.appendChild(errorMessage);
        }
    }
    
    function updateOutput() {
        const formData = new FormData(form);
        const data = {};
        
        for (const [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        output.innerHTML = \`
            <h4>Current Form Data:</h4>
            <pre>\${JSON.stringify(data, null, 2)}</pre>
        \`;
    }
    
    function submitForm() {
        const formData = new FormData(form);
        const data = {};
        let isValid = true;
        
        // Validate all fields
        const fields = form.querySelectorAll('input, select, textarea');
        fields.forEach(field => {
            validateField(field);
            if (!field.checkValidity()) {
                isValid = false;
            }
        });
        
        if (isValid) {
            for (const [key, value] of formData.entries()) {
                data[key] = value;
            }
            
            console.log('Form submitted:', data);
            alert('Form submitted successfully! Check console for data.');
        } else {
            alert('Please fix validation errors before submitting.');
        }
    }
    
    // Initialize output
    updateOutput();
    
    return container;
}

const formDemo = createFormDelegationDemo();

// Performance Comparison: Direct vs Delegated Events
console.log('\\n=== Performance Comparison ===');

function performanceComparisonDemo() {
    const container = document.createElement('div');
    container.innerHTML = \`
        <h3>Performance Comparison</h3>
        <div style="display: flex; gap: 20px;">
            <div>
                <h4>Direct Event Listeners</h4>
                <div id="direct-container" style="height: 200px; overflow-y: auto; border: 1px solid #ccc; padding: 10px;"></div>
                <button id="add-direct-items">Add 100 Direct Items</button>
            </div>
            <div>
                <h4>Event Delegation</h4>
                <div id="delegated-container" style="height: 200px; overflow-y: auto; border: 1px solid #ccc; padding: 10px;"></div>
                <button id="add-delegated-items">Add 100 Delegated Items</button>
            </div>
        </div>
        <div id="performance-results" style="margin-top: 20px; padding: 10px; background: #f5f5f5;"></div>
    \`;
    
    document.body.appendChild(container);
    
    const directContainer = container.querySelector('#direct-container');
    const delegatedContainer = container.querySelector('#delegated-container');
    const results = container.querySelector('#performance-results');
    
    let directCounter = 0;
    let delegatedCounter = 0;
    
    // Direct event listeners approach
    container.querySelector('#add-direct-items').addEventListener('click', () => {
        console.time('Direct event listeners');
        
        for (let i = 0; i < 100; i++) {
            const item = document.createElement('div');
            item.textContent = \`Direct Item \${++directCounter}\`;
            item.style.cssText = 'padding: 5px; margin: 2px; background: #e3f2fd; cursor: pointer;';
            
            // Add individual event listener to each item
            item.addEventListener('click', function() {
                this.style.backgroundColor = this.style.backgroundColor === 'rgb(255, 235, 59)' ? '#e3f2fd' : '#ffeb3b';
                console.log(\`Direct item clicked: \${this.textContent}\`);
            });
            
            directContainer.appendChild(item);
        }
        
        console.timeEnd('Direct event listeners');
        updatePerformanceResults();
    });
    
    // Event delegation approach
    delegatedContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('delegated-item')) {
            e.target.style.backgroundColor = e.target.style.backgroundColor === 'rgb(255, 235, 59)' ? '#e8f5e8' : '#ffeb3b';
            console.log(\`Delegated item clicked: \${e.target.textContent}\`);
        }
    });
    
    container.querySelector('#add-delegated-items').addEventListener('click', () => {
        console.time('Event delegation');
        
        for (let i = 0; i < 100; i++) {
            const item = document.createElement('div');
            item.textContent = \`Delegated Item \${++delegatedCounter}\`;
            item.className = 'delegated-item';
            item.style.cssText = 'padding: 5px; margin: 2px; background: #e8f5e8; cursor: pointer;';
            
            // No individual event listener needed
            delegatedContainer.appendChild(item);
        }
        
        console.timeEnd('Event delegation');
        updatePerformanceResults();
    });
    
    function updatePerformanceResults() {
        const directItems = directContainer.children.length;
        const delegatedItems = delegatedContainer.children.length;
        const directListeners = directItems; // One listener per item
        const delegatedListeners = 1; // One listener for all items
        
        results.innerHTML = \`
            <h4>Performance Metrics:</h4>
            <p><strong>Direct Approach:</strong> \${directItems} items, \${directListeners} event listeners</p>
            <p><strong>Delegated Approach:</strong> \${delegatedItems} items, \${delegatedListeners} event listener</p>
            <p><strong>Memory Savings:</strong> \${delegatedItems > 0 ? ((directListeners - delegatedListeners) / directListeners * 100).toFixed(1) : 0}% fewer listeners with delegation</p>
        \`;
    }
    
    updatePerformanceResults();
    return container;
}

const performanceDemo = performanceComparisonDemo();

// Advanced Patterns
console.log('\\n=== Advanced Event Delegation Patterns ===');

// Custom event delegation utility
class EventDelegator {
    constructor(container) {
        this.container = container;
        this.delegates = new Map();
        this.setupDelegation();
    }
    
    setupDelegation() {
        // Handle multiple event types
        ['click', 'change', 'input', 'submit', 'mouseover', 'mouseout'].forEach(eventType => {
            this.container.addEventListener(eventType, (e) => {
                this.handleEvent(e);
            });
        });
    }
    
    handleEvent(e) {
        const delegates = this.delegates.get(e.type) || [];
        
        for (const delegate of delegates) {
            if (this.matchesSelector(e.target, delegate.selector)) {
                delegate.handler.call(e.target, e);
                
                if (delegate.once) {
                    this.off(e.type, delegate.selector, delegate.handler);
                }
                
                if (delegate.preventDefault) {
                    e.preventDefault();
                }
                
                if (delegate.stopPropagation) {
                    e.stopPropagation();
                }
            }
        }
    }
    
    on(eventType, selector, handler, options = {}) {
        if (!this.delegates.has(eventType)) {
            this.delegates.set(eventType, []);
        }
        
        this.delegates.get(eventType).push({
            selector,
            handler,
            once: options.once || false,
            preventDefault: options.preventDefault || false,
            stopPropagation: options.stopPropagation || false
        });
        
        return this; // For chaining
    }
    
    off(eventType, selector, handler) {
        const delegates = this.delegates.get(eventType);
        if (delegates) {
            const index = delegates.findIndex(d => 
                d.selector === selector && d.handler === handler
            );
            if (index > -1) {
                delegates.splice(index, 1);
            }
        }
        return this;
    }
    
    once(eventType, selector, handler, options = {}) {
        return this.on(eventType, selector, handler, { ...options, once: true });
    }
    
    matchesSelector(element, selector) {
        if (element.matches) {
            return element.matches(selector);
        }
        // Fallback for older browsers
        return false;
    }
}

// Demonstrate advanced event delegation
function createAdvancedPatternDemo() {
    const container = document.createElement('div');
    container.innerHTML = \`
        <h3>Advanced Event Delegation Utility</h3>
        <div id="advanced-demo" style="border: 1px solid #ddd; padding: 20px;">
            <button class="primary-btn" data-type="primary">Primary Button</button>
            <button class="secondary-btn" data-type="secondary">Secondary Button</button>
            <input type="text" class="text-input" placeholder="Type here...">
            <select class="dropdown">
                <option value="">Choose...</option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
            </select>
            <div class="hover-zone" style="background: #f0f0f0; padding: 20px; margin: 10px;">
                Hover over me!
            </div>
        </div>
        <button id="add-elements">Add More Elements</button>
    \`;
    
    document.body.appendChild(container);
    
    const demoArea = container.querySelector('#advanced-demo');
    const delegator = new EventDelegator(demoArea);
    
    // Set up delegated event handlers
    delegator
        .on('click', '.primary-btn', function(e) {
            console.log('Primary button clicked:', this.textContent);
            this.style.backgroundColor = '#28a745';
            setTimeout(() => this.style.backgroundColor = '', 1000);
        })
        .on('click', '.secondary-btn', function(e) {
            console.log('Secondary button clicked:', this.textContent);
            this.style.backgroundColor = '#6c757d';
            setTimeout(() => this.style.backgroundColor = '', 1000);
        })
        .on('input', '.text-input', function(e) {
            console.log('Text input changed:', this.value);
        })
        .on('change', '.dropdown', function(e) {
            console.log('Dropdown changed:', this.value);
        })
        .on('mouseover', '.hover-zone', function(e) {
            this.style.backgroundColor = '#007bff';
            this.style.color = 'white';
        })
        .on('mouseout', '.hover-zone', function(e) {
            this.style.backgroundColor = '#f0f0f0';
            this.style.color = '';
        });
    
    // Demonstrate adding elements dynamically
    container.querySelector('#add-elements').addEventListener('click', () => {
        const newElements = document.createElement('div');
        newElements.innerHTML = \`
            <button class="primary-btn" data-type="primary">New Primary</button>
            <button class="secondary-btn" data-type="secondary">New Secondary</button>
            <input type="text" class="text-input" placeholder="New input...">
        \`;
        
        demoArea.appendChild(newElements);
        console.log('Added new elements - delegation still works!');
    });
    
    return container;
}

const advancedPatternDemo = createAdvancedPatternDemo();

// Cleanup function
setTimeout(() => {
    // Clean up demos
    [bubblingDemo, basicDemo, advancedDemo, formDemo, performanceDemo, advancedPatternDemo].forEach(demo => {
        if (demo && demo.parentNode) {
            demo.remove();
        }
    });
    
    console.log('\\n=== Event Delegation Best Practices ===');
    console.log('✅ Use event delegation for dynamic content');
    console.log('✅ Single listener on parent handles all child events');
    console.log('✅ Use event.target to identify the actual element');
    console.log('✅ Check element matches with closest() or matches()');
    console.log('✅ Delegate events that bubble (most events do)');
    console.log('✅ Use data attributes for action identification');
    console.log('✅ Consider memory and performance benefits');
    console.log('⚠️  Some events don\\'t bubble (focus, blur, load)');
    console.log('⚠️  Use event.stopPropagation() carefully');
    console.log('⚠️  Validate event.target before processing');
    
    console.log('Event Delegation examples completed');
}, 10000);`,

  exercises: [
    {
      question: "Create a draggable todo list with event delegation that handles drag and drop reordering:",
      solution: `class DraggableTodoList {
  constructor(container) {
    this.container = container;
    this.draggedElement = null;
    this.setupHTML();
    this.setupEventDelegation();
  }
  
  setupHTML() {
    this.container.innerHTML = \`
      <h3>Draggable Todo List</h3>
      <input type="text" id="new-todo" placeholder="Enter new todo...">
      <button id="add-todo">Add Todo</button>
      <ul id="todo-list" style="list-style: none; padding: 0;"></ul>
    \`;
  }
  
  setupEventDelegation() {
    // Single event listener for all interactions
    this.container.addEventListener('click', this.handleClick.bind(this));
    this.container.addEventListener('keypress', this.handleKeypress.bind(this));
    this.container.addEventListener('dragstart', this.handleDragStart.bind(this));
    this.container.addEventListener('dragover', this.handleDragOver.bind(this));
    this.container.addEventListener('drop', this.handleDrop.bind(this));
    this.container.addEventListener('dragend', this.handleDragEnd.bind(this));
  }
  
  handleClick(e) {
    if (e.target.id === 'add-todo') {
      this.addTodo();
    } else if (e.target.classList.contains('delete-btn')) {
      this.deleteTodo(e.target.closest('li'));
    } else if (e.target.classList.contains('toggle-btn')) {
      this.toggleTodo(e.target.closest('li'));
    }
  }
  
  handleKeypress(e) {
    if (e.target.id === 'new-todo' && e.key === 'Enter') {
      this.addTodo();
    }
  }
  
  handleDragStart(e) {
    if (e.target.classList.contains('todo-item')) {
      this.draggedElement = e.target;
      e.target.style.opacity = '0.5';
      e.dataTransfer.effectAllowed = 'move';
    }
  }
  
  handleDragOver(e) {
    if (e.target.classList.contains('todo-item')) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      
      const afterElement = this.getDragAfterElement(e.clientY);
      const todoList = this.container.querySelector('#todo-list');
      
      if (afterElement == null) {
        todoList.appendChild(this.draggedElement);
      } else {
        todoList.insertBefore(this.draggedElement, afterElement);
      }
    }
  }
  
  handleDrop(e) {
    e.preventDefault();
  }
  
  handleDragEnd(e) {
    if (e.target.classList.contains('todo-item')) {
      e.target.style.opacity = '';
      this.draggedElement = null;
    }
  }
  
  addTodo() {
    const input = this.container.querySelector('#new-todo');
    const text = input.value.trim();
    
    if (text) {
      const todoList = this.container.querySelector('#todo-list');
      const todoItem = document.createElement('li');
      todoItem.className = 'todo-item';
      todoItem.draggable = true;
      todoItem.style.cssText = 'padding: 10px; margin: 5px 0; background: #f8f9fa; border: 1px solid #dee2e6; cursor: move;';
      
      todoItem.innerHTML = \`
        <span class="todo-text">\${text}</span>
        <button class="toggle-btn" style="margin-left: 10px;">✓</button>
        <button class="delete-btn" style="margin-left: 5px;">✗</button>
      \`;
      
      todoList.appendChild(todoItem);
      input.value = '';
    }
  }
  
  deleteTodo(todoItem) {
    if (confirm('Delete this todo?')) {
      todoItem.remove();
    }
  }
  
  toggleTodo(todoItem) {
    const textElement = todoItem.querySelector('.todo-text');
    const isCompleted = textElement.style.textDecoration === 'line-through';
    
    textElement.style.textDecoration = isCompleted ? '' : 'line-through';
    textElement.style.opacity = isCompleted ? '1' : '0.6';
    todoItem.style.backgroundColor = isCompleted ? '#f8f9fa' : '#d4edda';
  }
  
  getDragAfterElement(y) {
    const todoList = this.container.querySelector('#todo-list');
    const draggableElements = [...todoList.querySelectorAll('.todo-item:not(.dragging)')];
    
    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
}

// Usage
const container = document.createElement('div');
document.body.appendChild(container);
new DraggableTodoList(container);`,
      explanation: "This draggable todo list uses event delegation to handle all interactions with a single set of event listeners, supporting dynamic content and complex interactions like drag-and-drop reordering."
    }
  ],

  quiz: [
    {
      question: "What is the main advantage of event delegation over individual event listeners?",
      options: [
        "Events fire faster with delegation",
        "Better memory efficiency and works with dynamic content",
        "Delegation prevents event bubbling",
        "Individual listeners don't work with modern browsers"
      ],
      correct: 1,
      explanation: "Event delegation uses fewer event listeners (better memory efficiency) and automatically works with dynamically added content since the listener is on the parent element that already exists."
    }
  ],

  resources: [
    {
      title: "MDN - Event Delegation",
      url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#event_delegation"
    },
    {
      title: "JavaScript.info - Event Delegation",
      url: "https://javascript.info/event-delegation"
    }
  ],

  nextModules: ['form-validation', 'dom-traversal'],
  prerequisites: ['dom-basics', 'events', 'dom-traversal']
};