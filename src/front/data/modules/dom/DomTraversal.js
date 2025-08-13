// src/front/data/modules/dom/DomTraversal.js
export default {
  title: 'DOM Traversal',
  duration: '40 min',
  difficulty: 'Intermediate',
  overview: 'Master DOM traversal and manipulation techniques. Learn to navigate, select, modify, and create DOM elements efficiently using modern JavaScript methods.',
  
  keyPoints: [
    'DOM tree navigation with parent, child, and sibling relationships',
    'Element selection with querySelector and querySelectorAll',
    'Creating, inserting, and removing DOM elements',
    'Modifying element attributes, classes, and styles',
    'Performance considerations for DOM operations',
    'Modern DOM APIs and best practices'
  ],

  example: `// DOM Selection Methods
console.log('=== DOM Selection Methods ===');

// Create a sample DOM structure for demonstration
function createSampleDOM() {
    // Create main container
    const container = document.createElement('div');
    container.id = 'demo-container';
    container.className = 'container demo';
    
    // Create header
    const header = document.createElement('header');
    header.innerHTML = \`
        <h1 class="title">DOM Traversal Demo</h1>
        <nav class="navigation">
            <ul>
                <li><a href="#home" class="nav-link active">Home</a></li>
                <li><a href="#about" class="nav-link">About</a></li>
                <li><a href="#contact" class="nav-link">Contact</a></li>
            </ul>
        </nav>
    \`;
    
    // Create main content
    const main = document.createElement('main');
    main.innerHTML = \`
        <article class="post" data-id="1">
            <h2>First Post</h2>
            <p class="content">This is the first post content.</p>
            <div class="meta">
                <span class="author">John Doe</span>
                <span class="date">2024-01-01</span>
                <div class="tags">
                    <span class="tag">javascript</span>
                    <span class="tag">dom</span>
                </div>
            </div>
        </article>
        <article class="post" data-id="2">
            <h2>Second Post</h2>
            <p class="content">This is the second post content.</p>
            <div class="meta">
                <span class="author">Jane Smith</span>
                <span class="date">2024-01-02</span>
                <div class="tags">
                    <span class="tag">html</span>
                    <span class="tag">css</span>
                </div>
            </div>
        </article>
    \`;
    
    // Create footer
    const footer = document.createElement('footer');
    footer.innerHTML = \`
        <p>&copy; 2024 Demo Site</p>
        <div class="social">
            <a href="#" class="social-link">Twitter</a>
            <a href="#" class="social-link">GitHub</a>
        </div>
    \`;
    
    container.appendChild(header);
    container.appendChild(main);
    container.appendChild(footer);
    
    // Add to document body (temporarily)
    document.body.appendChild(container);
    
    return container;
}

// Create demo DOM
const demoContainer = createSampleDOM();

// Basic Element Selection
console.log('\\n=== Basic Element Selection ===');

// getElementById
const container = document.getElementById('demo-container');
console.log('Container by ID:', container?.tagName);

// getElementsByClassName (returns HTMLCollection)
const posts = document.getElementsByClassName('post');
console.log('Posts by class name:', posts.length);

// getElementsByTagName (returns HTMLCollection)
const articles = document.getElementsByTagName('article');
console.log('Articles by tag name:', articles.length);

// querySelector (returns first match)
const firstPost = document.querySelector('.post');
console.log('First post title:', firstPost?.querySelector('h2')?.textContent);

// querySelectorAll (returns NodeList)
const allNavLinks = document.querySelectorAll('.nav-link');
console.log('All nav links:', allNavLinks.length);

// Advanced CSS Selectors
console.log('\\n=== Advanced CSS Selectors ===');

// Attribute selectors
const firstPostByData = document.querySelector('[data-id="1"]');
console.log('Post with data-id="1":', firstPostByData?.querySelector('h2')?.textContent);

// Pseudo-selectors
const firstChild = document.querySelector('article:first-child');
const lastChild = document.querySelector('article:last-child');
console.log('First article:', firstChild?.querySelector('h2')?.textContent);
console.log('Last article:', lastChild?.querySelector('h2')?.textContent);

// Nth-child selectors
const secondNavLink = document.querySelector('.nav-link:nth-child(2)');
console.log('Second nav link:', secondNavLink?.textContent);

// Multiple selectors
const authorsAndDates = document.querySelectorAll('.author, .date');
console.log('Authors and dates count:', authorsAndDates.length);

// Descendant and child selectors
const postTitles = document.querySelectorAll('article > h2');
const postContent = document.querySelectorAll('article .content');
console.log('Post titles (direct children):', postTitles.length);
console.log('Post content (descendants):', postContent.length);

// DOM Traversal - Parent/Child/Sibling
console.log('\\n=== DOM Traversal ===');

const firstArticle = document.querySelector('article');
if (firstArticle) {
    // Parent traversal
    console.log('Article parent:', firstArticle.parentElement?.tagName);
    console.log('Article parent node:', firstArticle.parentNode?.tagName);
    
    // Child traversal
    console.log('Article children count:', firstArticle.children.length);
    console.log('Article child nodes count:', firstArticle.childNodes.length);
    console.log('First child element:', firstArticle.firstElementChild?.tagName);
    console.log('Last child element:', firstArticle.lastElementChild?.tagName);
    
    // Sibling traversal
    console.log('Next sibling element:', firstArticle.nextElementSibling?.querySelector('h2')?.textContent);
    console.log('Previous sibling element:', firstArticle.previousElementSibling?.tagName);
}

// Closest method - traversing up the tree
const tag = document.querySelector('.tag');
if (tag) {
    const closestArticle = tag.closest('article');
    const closestMeta = tag.closest('.meta');
    console.log('\\nClosest article from tag:', closestArticle?.querySelector('h2')?.textContent);
    console.log('Closest meta div from tag:', closestMeta?.className);
}

// Element Creation and Insertion
console.log('\\n=== Element Creation and Insertion ===');

// Creating elements
const newPost = document.createElement('article');
newPost.className = 'post';
newPost.setAttribute('data-id', '3');

const newTitle = document.createElement('h2');
newTitle.textContent = 'Third Post';

const newContent = document.createElement('p');
newContent.className = 'content';
newContent.textContent = 'This is the third post content.';

const newMeta = document.createElement('div');
newMeta.className = 'meta';
newMeta.innerHTML = \`
    <span class="author">Bob Johnson</span>
    <span class="date">2024-01-03</span>
    <div class="tags">
        <span class="tag">news</span>
    </div>
\`;

// Assembling the element
newPost.appendChild(newTitle);
newPost.appendChild(newContent);
newPost.appendChild(newMeta);

// Different insertion methods
const mainElement = document.querySelector('main');
if (mainElement) {
    // appendChild - adds to end
    mainElement.appendChild(newPost);
    
    // insertBefore - inserts before a reference node
    const newFirstPost = document.createElement('article');
    newFirstPost.className = 'post featured';
    newFirstPost.innerHTML = \`
        <h2>Featured Post</h2>
        <p class="content">This is a featured post at the top.</p>
    \`;
    
    const firstExistingPost = mainElement.querySelector('.post');
    mainElement.insertBefore(newFirstPost, firstExistingPost);
    
    console.log('Added new posts. Total posts now:', mainElement.querySelectorAll('.post').length);
}

// Modern insertion methods
console.log('\\n=== Modern Insertion Methods ===');

// insertAdjacentElement
const sidebar = document.createElement('aside');
sidebar.className = 'sidebar';
sidebar.innerHTML = \`
    <h3>Sidebar</h3>
    <p>Additional content</p>
\`;

if (mainElement) {
    // insertAdjacentElement positions: 'beforebegin', 'afterbegin', 'beforeend', 'afterend'
    mainElement.insertAdjacentElement('afterend', sidebar);
}

// insertAdjacentHTML
const navElement = document.querySelector('.navigation ul');
if (navElement) {
    navElement.insertAdjacentHTML('beforeend', '<li><a href="#services" class="nav-link">Services</a></li>');
}

// insertAdjacentText
const footerElement = document.querySelector('footer p');
if (footerElement) {
    footerElement.insertAdjacentText('beforeend', ' All rights reserved.');
}

// Element Modification
console.log('\\n=== Element Modification ===');

// Modifying attributes
const firstNavLink = document.querySelector('.nav-link');
if (firstNavLink) {
    // Getting attributes
    console.log('Original href:', firstNavLink.getAttribute('href'));
    console.log('Has class attribute:', firstNavLink.hasAttribute('class'));
    
    // Setting attributes
    firstNavLink.setAttribute('title', 'Go to home page');
    firstNavLink.setAttribute('data-section', 'home');
    
    // Removing attributes
    firstNavLink.removeAttribute('class');
    firstNavLink.className = 'nav-link primary'; // Add back with different classes
    
    console.log('Updated attributes:', {
        href: firstNavLink.getAttribute('href'),
        title: firstNavLink.getAttribute('title'),
        'data-section': firstNavLink.getAttribute('data-section')
    });
}

// Modifying classes
const firstPostElement = document.querySelector('.post');
if (firstPostElement) {
    console.log('\\nOriginal classes:', firstPostElement.className);
    
    // classList methods
    firstPostElement.classList.add('highlighted', 'important');
    console.log('After adding classes:', firstPostElement.className);
    
    firstPostElement.classList.remove('post');
    firstPostElement.classList.add('post'); // Add back
    console.log('After removing and adding back:', firstPostElement.className);
    
    firstPostElement.classList.toggle('featured');
    console.log('After toggle (first time):', firstPostElement.className);
    
    firstPostElement.classList.toggle('featured');
    console.log('After toggle (second time):', firstPostElement.className);
    
    console.log('Contains "highlighted":', firstPostElement.classList.contains('highlighted'));
    
    // Replace class
    firstPostElement.classList.replace('important', 'critical');
    console.log('After replace:', firstPostElement.className);
}

// Modifying styles
const titleElement = document.querySelector('.title');
if (titleElement) {
    // Direct style modification
    titleElement.style.color = 'blue';
    titleElement.style.fontSize = '2rem';
    titleElement.style.marginBottom = '1rem';
    
    console.log('\\nApplied styles:', {
        color: titleElement.style.color,
        fontSize: titleElement.style.fontSize,
        marginBottom: titleElement.style.marginBottom
    });
    
    // CSS custom properties
    titleElement.style.setProperty('--title-shadow', '2px 2px 4px rgba(0,0,0,0.3)');
    titleElement.style.setProperty('text-shadow', 'var(--title-shadow)');
    
    // Removing styles
    titleElement.style.removeProperty('margin-bottom');
}

// Content Modification
console.log('\\n=== Content Modification ===');

const contentElement = document.querySelector('.content');
if (contentElement) {
    console.log('Original content:', contentElement.textContent);
    
    // textContent vs innerHTML
    contentElement.textContent = 'Updated text content (safe)';
    console.log('After textContent:', contentElement.textContent);
    
    contentElement.innerHTML = 'Updated <strong>HTML</strong> content';
    console.log('After innerHTML:', contentElement.innerHTML);
    
    // innerText (considers styling)
    contentElement.innerText = 'Updated inner text (visible only)';
    console.log('After innerText:', contentElement.innerText);
}

// Element Removal
console.log('\\n=== Element Removal ===');

// Create a temporary element to demonstrate removal
const tempElement = document.createElement('div');
tempElement.textContent = 'Temporary element';
tempElement.className = 'temp';
document.body.appendChild(tempElement);

console.log('Temp element exists:', !!document.querySelector('.temp'));

// Modern removal method
tempElement.remove();
console.log('After remove():', !!document.querySelector('.temp'));

// Traditional removal method
const anotherTempElement = document.createElement('div');
anotherTempElement.textContent = 'Another temporary element';
anotherTempElement.className = 'temp2';
document.body.appendChild(anotherTempElement);

if (anotherTempElement.parentNode) {
    anotherTempElement.parentNode.removeChild(anotherTempElement);
}
console.log('After removeChild():', !!document.querySelector('.temp2'));

// Advanced DOM Manipulation
console.log('\\n=== Advanced DOM Manipulation ===');

// DocumentFragment for efficient DOM operations
const fragment = document.createDocumentFragment();

// Create multiple elements efficiently
for (let i = 1; i <= 5; i++) {
    const listItem = document.createElement('li');
    listItem.textContent = \`Item \${i}\`;
    listItem.className = 'list-item';
    fragment.appendChild(listItem);
}

// Create container for the list
const listContainer = document.createElement('div');
listContainer.innerHTML = '<h3>Generated List</h3><ul class="generated-list"></ul>';
const list = listContainer.querySelector('.generated-list');
list.appendChild(fragment); // Single DOM operation

// Add to main element
if (mainElement) {
    mainElement.appendChild(listContainer);
}

console.log('Added list with', list.children.length, 'items');

// Cloning elements
const originalPost = document.querySelector('.post[data-id="1"]');
if (originalPost) {
    // Shallow clone (no children)
    const shallowClone = originalPost.cloneNode(false);
    console.log('Shallow clone children:', shallowClone.children.length);
    
    // Deep clone (with children)
    const deepClone = originalPost.cloneNode(true);
    console.log('Deep clone children:', deepClone.children.length);
    
    // Modify clone and add to DOM
    const cloneTitle = deepClone.querySelector('h2');
    if (cloneTitle) {
        cloneTitle.textContent = 'Cloned Post';
    }
    deepClone.setAttribute('data-id', 'clone-1');
    deepClone.classList.add('cloned');
    
    if (mainElement) {
        mainElement.appendChild(deepClone);
    }
}

// DOM Utilities
console.log('\\n=== DOM Utilities ===');

// Utility functions for common DOM operations
const DOMUtils = {
    // Create element with attributes and content
    createElement(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === 'className') {
                element.className = value;
            } else if (key === 'dataset') {
                Object.entries(value).forEach(([dataKey, dataValue]) => {
                    element.dataset[dataKey] = dataValue;
                });
            } else if (key.startsWith('on') && typeof value === 'function') {
                element.addEventListener(key.slice(2), value);
            } else {
                element.setAttribute(key, value);
            }
        });
        
        if (content) {
            if (typeof content === 'string') {
                element.textContent = content;
            } else if (content instanceof Node) {
                element.appendChild(content);
            }
        }
        
        return element;
    },
    
    // Wrap element with another element
    wrap(element, wrapper) {
        if (element.parentNode) {
            element.parentNode.insertBefore(wrapper, element);
        }
        wrapper.appendChild(element);
        return wrapper;
    },
    
    // Unwrap element (remove wrapper, keep content)
    unwrap(element) {
        const parent = element.parentNode;
        if (parent && parent !== document.body) {
            const grandParent = parent.parentNode;
            if (grandParent) {
                grandParent.insertBefore(element, parent);
                grandParent.removeChild(parent);
            }
        }
        return element;
    },
    
    // Empty element efficiently
    empty(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
        return element;
    },
    
    // Get all siblings
    siblings(element) {
        const siblings = [];
        let sibling = element.parentNode?.firstElementChild;
        
        while (sibling) {
            if (sibling !== element) {
                siblings.push(sibling);
            }
            sibling = sibling.nextElementSibling;
        }
        
        return siblings;
    },
    
    // Check if element matches selector
    matches(element, selector) {
        return element.matches ? element.matches(selector) :
               element.webkitMatchesSelector ? element.webkitMatchesSelector(selector) :
               element.msMatchesSelector ? element.msMatchesSelector(selector) : false;
    }
};

// Using DOM utilities
const utilityDemo = DOMUtils.createElement('div', {
    className: 'utility-demo',
    id: 'demo',
    dataset: { test: 'value', number: '42' }
}, 'Created with utility function');

console.log('Utility-created element:', utilityDemo.outerHTML);

// Demonstrate wrap/unwrap
const targetElement = document.querySelector('.tags .tag');
if (targetElement) {
    const wrapper = DOMUtils.createElement('div', { className: 'tag-wrapper' });
    DOMUtils.wrap(targetElement, wrapper);
    console.log('Element wrapped');
    
    setTimeout(() => {
        DOMUtils.unwrap(targetElement);
        console.log('Element unwrapped');
    }, 1000);
}

// Performance Considerations
console.log('\\n=== Performance Considerations ===');

// Batch DOM operations
function batchDOMOperations() {
    const container = document.querySelector('#demo-container');
    if (!container) return;
    
    // Bad: Multiple reflows/repaints
    console.time('Individual operations');
    for (let i = 0; i < 100; i++) {
        const div = document.createElement('div');
        div.textContent = \`Item \${i}\`;
        container.appendChild(div);
    }
    console.timeEnd('Individual operations');
    
    // Better: Use DocumentFragment
    DOMUtils.empty(container.querySelector('main') || container);
    
    console.time('Fragment operations');
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < 100; i++) {
        const div = document.createElement('div');
        div.textContent = \`Item \${i}\`;
        fragment.appendChild(div);
    }
    container.appendChild(fragment);
    console.timeEnd('Fragment operations');
}

// Demonstrate performance difference
setTimeout(batchDOMOperations, 2000);

// Virtual scrolling simulation for large lists
function createVirtualList(items, containerHeight = 300, itemHeight = 30) {
    const container = DOMUtils.createElement('div', {
        className: 'virtual-list',
        style: \`height: \${containerHeight}px; overflow: auto; position: relative;\`
    });
    
    const totalHeight = items.length * itemHeight;
    const visibleCount = Math.ceil(containerHeight / itemHeight) + 2; // Buffer
    
    const scrollContent = DOMUtils.createElement('div', {
        style: \`height: \${totalHeight}px; position: relative;\`
    });
    
    const visibleContainer = DOMUtils.createElement('div', {
        style: 'position: absolute; top: 0; left: 0; right: 0;'
    });
    
    scrollContent.appendChild(visibleContainer);
    container.appendChild(scrollContent);
    
    function updateVisibleItems() {
        const scrollTop = container.scrollTop;
        const startIndex = Math.floor(scrollTop / itemHeight);
        const endIndex = Math.min(startIndex + visibleCount, items.length);
        
        DOMUtils.empty(visibleContainer);
        visibleContainer.style.top = \`\${startIndex * itemHeight}px\`;
        
        for (let i = startIndex; i < endIndex; i++) {
            const item = DOMUtils.createElement('div', {
                style: \`height: \${itemHeight}px; line-height: \${itemHeight}px; padding: 0 10px;\`,
                className: 'virtual-item'
            }, items[i]);
            
            visibleContainer.appendChild(item);
        }
    }
    
    container.addEventListener('scroll', updateVisibleItems);
    updateVisibleItems(); // Initial render
    
    return container;
}

// Create virtual list demo
const virtualItems = Array.from({ length: 1000 }, (_, i) => \`Virtual Item \${i + 1}\`);
const virtualList = createVirtualList(virtualItems);
virtualList.style.margin = '20px 0';

if (mainElement) {
    mainElement.appendChild(virtualList);
}

console.log('Created virtual list with 1000 items');

// Cleanup
setTimeout(() => {
    // Remove demo container
    demoContainer.remove();
    console.log('\\nDemo container cleaned up');
    
    console.log('\\n=== DOM Traversal Best Practices ===');
    console.log('✅ Use querySelector/querySelectorAll for modern element selection');
    console.log('✅ Cache DOM references when accessing elements multiple times');
    console.log('✅ Use DocumentFragment for multiple DOM insertions');
    console.log('✅ Batch DOM operations to minimize reflows/repaints');
    console.log('✅ Use classList methods instead of className manipulation');
    console.log('✅ Prefer textContent over innerHTML for security');
    console.log('✅ Use modern insertion methods (insertAdjacentElement/HTML)');
    console.log('⚠️  Avoid accessing DOM in loops');
    console.log('⚠️  Be careful with innerHTML and potential XSS');
    console.log('⚠️  Consider virtual scrolling for large lists');
    
    console.log('DOM Traversal examples completed');
}, 5000);`,

  exercises: [
    {
      question: "Create a dynamic table generator that can sort columns and filter rows:",
      solution: `class DynamicTable {
  constructor(container, data, columns) {
    this.container = container;
    this.data = [...data];
    this.originalData = [...data];
    this.columns = columns;
    this.sortColumn = null;
    this.sortDirection = 'asc';
    this.filterValue = '';
    
    this.render();
    this.attachEvents();
  }
  
  render() {
    // Clear container
    this.container.innerHTML = '';
    
    // Create table structure
    const table = document.createElement('table');
    table.className = 'dynamic-table';
    
    // Create header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    
    this.columns.forEach((column, index) => {
      const th = document.createElement('th');
      th.textContent = column.title;
      th.dataset.column = column.key;
      th.style.cursor = 'pointer';
      
      // Add sort indicator
      if (this.sortColumn === column.key) {
        const indicator = document.createElement('span');
        indicator.textContent = this.sortDirection === 'asc' ? ' ↑' : ' ↓';
        th.appendChild(indicator);
      }
      
      headerRow.appendChild(th);
    });
    
    thead.appendChild(headerRow);
    table.appendChild(thead);
    
    // Create body
    const tbody = document.createElement('tbody');
    
    this.data.forEach(row => {
      const tr = document.createElement('tr');
      
      this.columns.forEach(column => {
        const td = document.createElement('td');
        td.textContent = row[column.key];
        tr.appendChild(td);
      });
      
      tbody.appendChild(tr);
    });
    
    table.appendChild(tbody);
    
    // Create filter input
    const filterContainer = document.createElement('div');
    filterContainer.className = 'table-controls';
    
    const filterInput = document.createElement('input');
    filterInput.type = 'text';
    filterInput.placeholder = 'Filter table...';
    filterInput.value = this.filterValue;
    filterInput.className = 'table-filter';
    
    filterContainer.appendChild(filterInput);
    
    this.container.appendChild(filterContainer);
    this.container.appendChild(table);
  }
  
  attachEvents() {
    // Sort functionality
    this.container.addEventListener('click', (e) => {
      if (e.target.tagName === 'TH') {
        const column = e.target.dataset.column;
        this.sort(column);
      }
    });
    
    // Filter functionality
    const filterInput = this.container.querySelector('.table-filter');
    filterInput.addEventListener('input', (e) => {
      this.filter(e.target.value);
    });
  }
  
  sort(column) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    
    this.data.sort((a, b) => {
      const aVal = a[column];
      const bVal = b[column];
      
      let comparison = 0;
      if (aVal > bVal) comparison = 1;
      if (aVal < bVal) comparison = -1;
      
      return this.sortDirection === 'asc' ? comparison : -comparison;
    });
    
    this.render();
  }
  
  filter(value) {
    this.filterValue = value.toLowerCase();
    
    if (!this.filterValue) {
      this.data = [...this.originalData];
    } else {
      this.data = this.originalData.filter(row =>
        this.columns.some(column =>
          String(row[column.key]).toLowerCase().includes(this.filterValue)
        )
      );
    }
    
    this.render();
  }
}

// Usage
const tableData = [
  { name: 'Alice', age: 30, city: 'New York' },
  { name: 'Bob', age: 25, city: 'Los Angeles' },
  { name: 'Charlie', age: 35, city: 'Chicago' }
];

const columns = [
  { key: 'name', title: 'Name' },
  { key: 'age', title: 'Age' },
  { key: 'city', title: 'City' }
];

const container = document.createElement('div');
document.body.appendChild(container);
new DynamicTable(container, tableData, columns);`,
      explanation: "This dynamic table demonstrates advanced DOM manipulation including event delegation, efficient re-rendering, and data filtering/sorting while maintaining clean separation of concerns."
    }
  ],

  quiz: [
    {
      question: "What's the difference between textContent and innerHTML when setting element content?",
      options: [
        "No difference, they work the same way",
        "textContent is faster but innerHTML supports HTML",
        "textContent sets plain text safely, innerHTML can execute scripts",
        "innerHTML is deprecated, only use textContent"
      ],
      correct: 2,
      explanation: "textContent sets plain text and automatically escapes HTML characters, making it safe from XSS attacks. innerHTML parses and renders HTML, which can be dangerous if the content contains untrusted scripts."
    }
  ],

  resources: [
    {
      title: "MDN - Document Object Model",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model"
    },
    {
      title: "MDN - Element.querySelector",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/querySelector"
    }
  ],

  nextModules: ['event-delegation', 'form-validation'],
  prerequisites: ['dom-basics', 'events', 'css-selectors']
};