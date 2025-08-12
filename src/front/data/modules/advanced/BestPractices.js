// src/front/data/modules/advanced/BestPractices.js
export default {
  title: 'JavaScript Best Practices',
  duration: '45 min',
  difficulty: 'Advanced',
  overview: 'Learn industry best practices for writing clean, maintainable, and efficient JavaScript code. Cover coding standards, performance tips, and common pitfalls to avoid.',
  
  keyPoints: [
    'Use strict mode and modern ES6+ features',
    'Follow consistent naming conventions and code structure',
    'Write self-documenting code with clear variable names',
    'Avoid global variables and prefer modules',
    'Handle errors gracefully and validate inputs',
    'Optimize for performance and maintainability'
  ],

  example: `// Code Organization and Structure
console.log('=== Code Organization ===');

// Use strict mode
'use strict';

// Constants at the top
const API_BASE_URL = 'https://api.example.com';
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_TIMEOUT = 5000;

// Use meaningful names
// Bad
let d = new Date();
let u = users.filter(x => x.a > 18);

// Good
let currentDate = new Date();
let adultUsers = users.filter(user => user.age > 18);

// Function naming conventions
function calculateTotalPrice(items) {
    return items.reduce((total, item) => total + item.price, 0);
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function getUserById(id) {
    return users.find(user => user.id === id);
}

// Class naming conventions
class UserManager {
    constructor(apiClient) {
        this.apiClient = apiClient;
        this.cache = new Map();
    }
    
    async fetchUser(userId) {
        if (this.cache.has(userId)) {
            return this.cache.get(userId);
        }
        
        const user = await this.apiClient.get(\`/users/\${userId}\`);
        this.cache.set(userId, user);
        return user;
    }
}

// Error Handling Best Practices
console.log('=== Error Handling ===');

// Always handle errors
async function safeApiCall(url) {
    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('API call failed:', error.message);
        // Return default or rethrow based on context
        return null;
    }
}

// Input validation
function validateUserInput(user) {
    const errors = [];
    
    if (!user.name || typeof user.name !== 'string') {
        errors.push('Name is required and must be a string');
    }
    
    if (!user.email || !isValidEmail(user.email)) {
        errors.push('Valid email is required');
    }
    
    if (user.age !== undefined && (!Number.isInteger(user.age) || user.age < 0)) {
        errors.push('Age must be a positive integer');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

// Use early returns to reduce nesting
function processUser(user) {
    if (!user) {
        return { error: 'User is required' };
    }
    
    const validation = validateUserInput(user);
    if (!validation.isValid) {
        return { error: validation.errors };
    }
    
    // Process valid user
    return { success: true, data: user };
}

// Performance Best Practices
console.log('=== Performance ===');

// Use efficient data structures
const userLookup = new Map(); // O(1) lookup vs O(n) for arrays
const uniqueIds = new Set();  // O(1) for has() vs O(n) for arrays

// Avoid creating functions in loops
// Bad
const buttons = document.querySelectorAll('button');
for (let i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('click', function() {
        console.log(\`Button \${i} clicked\`);
    });
}

// Good
function handleButtonClick(event) {
    const index = Array.from(buttons).indexOf(event.target);
    console.log(\`Button \${index} clicked\`);
}

for (const button of buttons) {
    button.addEventListener('click', handleButtonClick);
}

// Debounce expensive operations
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

const expensiveSearch = debounce(function(query) {
    // Expensive search operation
    console.log('Searching for:', query);
}, 300);

// Use object destructuring for cleaner code
function displayUser({ name, email, age = 'Unknown' }) {
    console.log(\`Name: \${name}, Email: \${email}, Age: \${age}\`);
}

// Prefer const and let over var
const config = { theme: 'dark', lang: 'en' };
let currentUser = null;

// Modern Array Methods
console.log('=== Modern JavaScript ===');

const users = [
    { id: 1, name: 'Alice', age: 25, active: true },
    { id: 2, name: 'Bob', age: 30, active: false },
    { id: 3, name: 'Charlie', age: 35, active: true }
];

// Chain array methods for readable transformations
const activeUserNames = users
    .filter(user => user.active)
    .map(user => user.name)
    .sort();

console.log('Active users:', activeUserNames);

// Use optional chaining and nullish coalescing
const userProfile = {
    name: 'Alice',
    settings: {
        theme: 'dark'
    }
};

const theme = userProfile.settings?.theme ?? 'light';
const notifications = userProfile.settings?.notifications ?? true;

// Async/Await Best Practices
console.log('=== Async Patterns ===');

// Handle multiple async operations
async function fetchUserData(userId) {
    try {
        const [user, posts, comments] = await Promise.all([
            fetch(\`/users/\${userId}\`).then(r => r.json()),
            fetch(\`/users/\${userId}/posts\`).then(r => r.json()),
            fetch(\`/users/\${userId}/comments\`).then(r => r.json())
        ]);
        
        return { user, posts, comments };
    } catch (error) {
        console.error('Failed to fetch user data:', error);
        throw error;
    }
}

// Use Promise.allSettled for independent operations
async function fetchOptionalData() {
    const results = await Promise.allSettled([
        fetch('/weather').then(r => r.json()),
        fetch('/news').then(r => r.json()),
        fetch('/stocks').then(r => r.json())
    ]);
    
    return results.reduce((data, result, index) => {
        const keys = ['weather', 'news', 'stocks'];
        if (result.status === 'fulfilled') {
            data[keys[index]] = result.value;
        }
        return data;
    }, {});
}

// Code Documentation
console.log('=== Documentation ===');

/**
 * Calculates the compound interest
 * @param {number} principal - Initial amount
 * @param {number} rate - Annual interest rate (as decimal)
 * @param {number} time - Time in years
 * @param {number} compound - Compounding frequency per year
 * @returns {number} Final amount after compound interest
 */
function calculateCompoundInterest(principal, rate, time, compound = 1) {
    if (principal <= 0 || rate < 0 || time < 0 || compound <= 0) {
        throw new Error('Invalid input parameters');
    }
    
    return principal * Math.pow(1 + rate / compound, compound * time);
}

// Security Best Practices
console.log('=== Security ===');

// Sanitize user input
function sanitizeInput(input) {
    if (typeof input !== 'string') {
        return '';
    }
    
    return input
        .replace(/[<>]/g, '') // Remove potential HTML tags
        .trim()
        .substring(0, 1000); // Limit length
}

// Avoid eval and similar dangerous functions
// Bad: eval(userInput)
// Good: Use JSON.parse for JSON data, or specific parsers

// Use Content Security Policy headers
// Set: Content-Security-Policy: default-src 'self'

// Testing Best Practices
console.log('=== Testing Considerations ===');

// Write testable functions (pure when possible)
function formatPrice(price, currency = 'USD') {
    if (typeof price !== 'number' || isNaN(price)) {
        throw new Error('Price must be a valid number');
    }
    
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(price);
}

// Dependency injection for testability
class OrderService {
    constructor(paymentService, emailService) {
        this.paymentService = paymentService;
        this.emailService = emailService;
    }
    
    async processOrder(order) {
        const payment = await this.paymentService.charge(order.total);
        await this.emailService.sendConfirmation(order.email, order);
        return { orderId: order.id, paymentId: payment.id };
    }
}

// Maintainability Best Practices
console.log('=== Maintainability ===');

// Use configuration objects
const apiConfig = {
    baseURL: 'https://api.example.com',
    timeout: 5000,
    retries: 3,
    headers: {
        'Content-Type': 'application/json'
    }
};

// Feature flags for gradual rollouts
const features = {
    newDashboard: process.env.NODE_ENV === 'development',
    betaFeatures: false,
    experimentalUI: false
};

function renderDashboard() {
    if (features.newDashboard) {
        return renderNewDashboard();
    }
    return renderLegacyDashboard();
}

// Avoid magic numbers and strings
const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500
};

const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest'
};

// Memory Management
console.log('=== Memory Management ===');

// Remove event listeners to prevent memory leaks
class Component {
    constructor(element) {
        this.element = element;
        this.handleClick = this.handleClick.bind(this);
        this.element.addEventListener('click', this.handleClick);
    }
    
    handleClick(event) {
        console.log('Component clicked');
    }
    
    destroy() {
        this.element.removeEventListener('click', this.handleClick);
        this.element = null;
    }
}

// Use WeakMap for private data
const privateData = new WeakMap();

class User {
    constructor(name, email) {
        privateData.set(this, { email });
        this.name = name;
    }
    
    getEmail() {
        return privateData.get(this).email;
    }
}

// Common Anti-patterns to Avoid
console.log('=== Anti-patterns to Avoid ===');

// Don't extend built-in prototypes
// Bad: Array.prototype.customMethod = function() { ... }

// Don't use == when you mean ===
// Bad: if (value == null)
// Good: if (value === null || value === undefined)

// Don't ignore Promise rejections
// Bad: fetch('/api/data');
// Good: fetch('/api/data').catch(console.error);

// Don't mutate props/parameters
function processItems(items) {
    // Bad: items.sort()
    // Good: return [...items].sort()
    return [...items].sort();
}

// Modern JavaScript Features
console.log('=== Modern Features ===');

// Use modules
// import { utility } from './utils.js';
// export { processUser, validateUserInput };

// Use async iterators for large datasets
async function* fetchUsers() {
    let page = 1;
    while (true) {
        const response = await fetch(\`/users?page=\${page}\`);
        const data = await response.json();
        
        if (data.users.length === 0) break;
        
        for (const user of data.users) {
            yield user;
        }
        
        page++;
    }
}

// Use private class fields
class BankAccount {
    #balance = 0;
    
    deposit(amount) {
        if (amount > 0) {
            this.#balance += amount;
        }
    }
    
    getBalance() {
        return this.#balance;
    }
}

console.log('Best practices examples completed');`,

  exercises: [
    {
      question: "Refactor this code to follow best practices: function calc(x,y,op){if(op=='add')return x+y;if(op=='sub')return x-y;}",
      solution: `function calculate(firstNumber, secondNumber, operation) {
  const operations = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => b !== 0 ? a / b : null
  };
  
  if (!operations[operation]) {
    throw new Error(\`Unknown operation: \${operation}\`);
  }
  
  return operations[operation](firstNumber, secondNumber);
}`,
      explanation: "Use descriptive names, handle edge cases, use object lookup instead of multiple if statements."
    }
  ],

  quiz: [
    {
      question: "Which is a JavaScript best practice for variable naming?",
      options: [
        "Use single letters like 'x' and 'y'",
        "Use descriptive names like 'currentUser'",
        "Use abbreviations to save space",
        "Use numbers in variable names"
      ],
      correct: 1,
      explanation: "Descriptive variable names make code self-documenting and easier to understand."
    }
  ],

  resources: [
    {
      title: "JavaScript Best Practices Guide",
      url: "https://developer.mozilla.org/en-US/docs/MDN/Guidelines/Code_guidelines/JavaScript"
    }
  ],

  nextModules: ['security', 'performance'],
  prerequisites: ['functions-basics', 'error-handling', 'async-await']
};