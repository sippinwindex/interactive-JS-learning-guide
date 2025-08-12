// src/front/data/modules/dom/DomBasics.js
export default {
  title: 'DOM Basics',
  duration: '35 min',
  difficulty: 'Beginner',
  overview: 'Learn the fundamentals of DOM manipulation. Understand how to select, create, modify, and remove HTML elements using JavaScript.',
  
  keyPoints: [
    'DOM represents the HTML document as a tree structure',
    'Use selectors to find elements in the document',
    'Modify element content, attributes, and styles',
    'Create and remove elements dynamically',
    'Understanding the relationship between nodes',
    'Modern methods like querySelector are preferred'
  ],

  example: `// Selecting Elements
const title = document.getElementById('main-title');
const buttons = document.getElementsByClassName('btn');
const paragraphs = document.getElementsByTagName('p');

// Modern selector methods (preferred)
const firstButton = document.querySelector('.btn');
const allButtons = document.querySelectorAll('.btn');
const specificElement = document.querySelector('#sidebar .highlight');

console.log('Title element:', title);
console.log('All buttons:', allButtons);

// Modifying Text Content
const heading = document.querySelector('h1');
if (heading) {
    heading.textContent = 'New Page Title';
    heading.innerHTML = 'New Page Title with <em>emphasis</em>';
}

// Working with Attributes
const link = document.querySelector('a');
if (link) {
    console.log('Original href:', link.getAttribute('href'));
    link.setAttribute('href', 'https://example.com');
    link.setAttribute('target', '_blank');
    
    // Boolean attributes
    link.setAttribute('disabled', '');
    
    // Remove attributes
    link.removeAttribute('disabled');
    
    // Check if attribute exists
    if (link.hasAttribute('target')) {
        console.log('Link opens in new tab');
    }
}

// Modifying CSS Styles
const box = document.querySelector('.box');
if (box) {
    // Direct style modification
    box.style.backgroundColor = 'lightblue';
    box.style.padding = '20px';
    box.style.borderRadius = '10px';
    
    // Multiple styles at once
    Object.assign(box.style, {
        width: '200px',
        height: '100px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    });
}

// Working with CSS Classes
const element = document.querySelector('.my-element');
if (element) {
    // Add classes
    element.classList.add('active');
    element.classList.add('highlighted', 'animated');
    
    // Remove classes
    element.classList.remove('old-class');
    
    // Toggle classes
    element.classList.toggle('visible');
    
    // Check if class exists
    if (element.classList.contains('active')) {
        console.log('Element is active');
    }
    
    // Replace class
    element.classList.replace('old-class', 'new-class');
}

// Creating New Elements
const newDiv = document.createElement('div');
newDiv.textContent = 'This is a new div';
newDiv.className = 'dynamic-content';
newDiv.id = 'new-element';

// Create element with attributes
const newImage = document.createElement('img');
newImage.src = 'image.jpg';
newImage.alt = 'Description';
newImage.style.width = '100px';

// Create text nodes
const textNode = document.createTextNode('Just some text');

// Adding Elements to DOM
const container = document.querySelector('.container');
if (container) {
    // Append to end
    container.appendChild(newDiv);
    
    // Insert at beginning
    container.insertBefore(newImage, container.firstChild);
    
    // Modern insertion methods
    container.append(textNode); // Can append multiple nodes
    container.prepend('Text at start'); // Can prepend text directly
    
    // Insert adjacent to element
    newDiv.insertAdjacentHTML('afterend', '<p>After the div</p>');
    newDiv.insertAdjacentText('beforebegin', 'Before the div');
}

// Cloning Elements
const original = document.querySelector('.original');
if (original) {
    const shallowClone = original.cloneNode(false); // Without children
    const deepClone = original.cloneNode(true);     // With children
    
    container.appendChild(deepClone);
}

// Removing Elements
const elementToRemove = document.querySelector('.remove-me');
if (elementToRemove) {
    // Modern way
    elementToRemove.remove();
    
    // Traditional way (still works)
    // elementToRemove.parentNode.removeChild(elementToRemove);
}

// Navigating the DOM Tree
const currentElement = document.querySelector('.current');
if (currentElement) {
    console.log('Parent:', currentElement.parentNode);
    console.log('Next sibling:', currentElement.nextElementSibling);
    console.log('Previous sibling:', currentElement.previousElementSibling);
    console.log('First child:', currentElement.firstElementChild);
    console.log('Last child:', currentElement.lastElementChild);
    console.log('All children:', currentElement.children);
}

// Working with Forms
const form = document.querySelector('form');
const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[name="email"]');

if (nameInput && emailInput) {
    // Get values
    console.log('Name:', nameInput.value);
    console.log('Email:', emailInput.value);
    
    // Set values
    nameInput.value = 'John Doe';
    emailInput.value = 'john@example.com';
    
    // Focus on input
    nameInput.focus();
    
    // Select text
    nameInput.select();
}

// Working with Data Attributes
const dataElement = document.querySelector('.data-example');
if (dataElement) {
    // HTML: <div class="data-example" data-user-id="123" data-theme="dark">
    
    console.log('User ID:', dataElement.dataset.userId);
    console.log('Theme:', dataElement.dataset.theme);
    
    // Set data attributes
    dataElement.dataset.status = 'active';
    dataElement.dataset.lastUpdate = new Date().toISOString();
}

// Practical Example: Dynamic List
function createTodoList() {
    const todos = ['Learn JavaScript', 'Build a project', 'Get a job'];
    const list = document.createElement('ul');
    list.className = 'todo-list';
    
    todos.forEach((todo, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = \`
            <span class="todo-text">\${todo}</span>
            <button class="delete-btn" data-index="\${index}">Delete</button>
        \`;
        list.appendChild(listItem);
    });
    
    return list;
}

// Add the todo list to page
const todoContainer = document.querySelector('.todo-container');
if (todoContainer) {
    const todoList = createTodoList();
    todoContainer.appendChild(todoList);
}

// Performance Considerations
function efficientDOMUpdates() {
    const list = document.querySelector('ul');
    
    // BAD: Multiple reflows
    // for (let i = 0; i < 100; i++) {
    //     const li = document.createElement('li');
    //     li.textContent = \`Item \${i}\`;
    //     list.appendChild(li);
    // }
    
    // GOOD: Single reflow using DocumentFragment
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 100; i++) {
        const li = document.createElement('li');
        li.textContent = \`Item \${i}\`;
        fragment.appendChild(li);
    }
    list.appendChild(fragment);
}`,

  exercises: [
    {
      question: "Create a function that changes the text content of all paragraphs on the page.",
      solution: `function changeAllParagraphs(newText) {
  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach(p => p.textContent = newText);
}`,
      explanation: "Use querySelectorAll to get all paragraphs, then forEach to modify each one."
    },
    {
      question: "Write code to create a button that shows an alert when clicked.",
      solution: `const button = document.createElement('button');
button.textContent = 'Click Me';
button.addEventListener('click', () => alert('Button clicked!'));
document.body.appendChild(button);`,
      explanation: "Create element, set properties, add event listener, then append to DOM."
    }
  ],

  quiz: [
    {
      question: "What's the difference between textContent and innerHTML?",
      options: [
        "No difference",
        "textContent is faster",
        "innerHTML can contain HTML tags, textContent cannot",
        "textContent only works with div elements"
      ],
      correct: 2,
      explanation: "innerHTML interprets HTML tags, while textContent treats everything as plain text."
    }
  ],

  resources: [
    {
      title: "MDN - DOM Introduction",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction"
    }
  ],

  nextModules: ['event-handling'],
  prerequisites: ['arrays-objects']
};