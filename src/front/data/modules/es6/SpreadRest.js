// src/front/data/modules/es6/SpreadRest.js
export const SpreadRest = {
  title: 'Spread and Rest Operators',
  duration: '35 min',
  difficulty: 'Intermediate',
  overview: 'Master the spread (...) and rest operators. Learn to expand iterables, collect parameters, and manipulate arrays and objects efficiently.',
  
  keyPoints: [
    'Spread operator expands iterables into individual elements',
    'Rest operator collects multiple elements into an array',
    'Works with arrays, objects, and function parameters',
    'Useful for copying and merging data structures',
    'Creates shallow copies, not deep copies',
    'Rest parameters must be last in function parameter lists'
  ],

  example: `// Spread Operator with Arrays
console.log('=== Spread with Arrays ===');

const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

// Combining arrays
const combined = [...arr1, ...arr2];
console.log('Combined:', combined); // [1, 2, 3, 4, 5, 6]

// Adding elements
const withExtra = [0, ...arr1, 3.5, ...arr2, 7];
console.log('With extra:', withExtra); // [0, 1, 2, 3, 3.5, 4, 5, 6, 7]

// Copying arrays (shallow copy)
const copy = [...arr1];
copy.push(4);
console.log('Original:', arr1); // [1, 2, 3] - unchanged
console.log('Copy:', copy);     // [1, 2, 3, 4]

// Converting NodeList to Array
// const elements = [...document.querySelectorAll('div')];

// Converting string to array
const charArray = [...'hello'];
console.log('Char array:', charArray); // ['h', 'e', 'l', 'l', 'o']

// Math functions with arrays
const numbers = [5, 1, 9, 3, 7];
console.log('Max:', Math.max(...numbers)); // 9
console.log('Min:', Math.min(...numbers)); // 1

// Spread Operator with Objects
console.log('=== Spread with Objects ===');

const person = { name: 'Alice', age: 30 };
const address = { city: 'New York', country: 'USA' };

// Combining objects
const fullPerson = { ...person, ...address };
console.log('Full person:', fullPerson);

// Adding/overriding properties
const updatedPerson = { ...person, age: 31, email: 'alice@example.com' };
console.log('Updated person:', updatedPerson);

// Copying objects (shallow copy)
const personCopy = { ...person };
personCopy.name = 'Bob';
console.log('Original person:', person);     // { name: 'Alice', age: 30 }
console.log('Person copy:', personCopy);     // { name: 'Bob', age: 30 }

// Nested object considerations
const user = {
    name: 'Charlie',
    preferences: { theme: 'dark', lang: 'en' }
};

const userCopy = { ...user };
userCopy.preferences.theme = 'light'; // This modifies original!
console.log('Original user theme:', user.preferences.theme); // 'light'

// Deep copy alternative
const userDeepCopy = {
    ...user,
    preferences: { ...user.preferences }
};

// Rest Parameters in Functions
console.log('=== Rest Parameters ===');

// Collecting arguments
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log('Sum:', sum(1, 2, 3, 4, 5)); // 15
console.log('Sum of two:', sum(10, 20)); // 30

// Mixed parameters
function introduce(name, age, ...hobbies) {
    console.log(\`Hi, I'm \${name}, \${age} years old\`);
    if (hobbies.length > 0) {
        console.log('My hobbies are:', hobbies.join(', '));
    }
}

introduce('Alice', 30, 'reading', 'swimming', 'coding');

// Rest in destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log('First:', first);   // 1
console.log('Second:', second); // 2
console.log('Rest:', rest);     // [3, 4, 5]

const { name, ...otherProps } = { name: 'Bob', age: 25, city: 'Boston' };
console.log('Name:', name);           // 'Bob'
console.log('Other props:', otherProps); // { age: 25, city: 'Boston' }

// Advanced Patterns
console.log('=== Advanced Patterns ===');

// 1. Function composition with spread
const pipe = (...functions) => (value) =>
    functions.reduce((acc, fn) => fn(acc), value);

const addOne = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

const transform = pipe(addOne, double, square);
console.log('Transformed 3:', transform(3)); // ((3 + 1) * 2)² = 64

// 2. Conditional spreading
const baseConfig = { api: 'https://api.example.com', timeout: 5000 };
const isDevelopment = true;

const config = {
    ...baseConfig,
    ...(isDevelopment && { debug: true, verbose: true })
};
console.log('Config:', config);

// 3. Array operations
const original = [1, 2, 3];

// Insert at beginning
const withNewFirst = [0, ...original];

// Insert at end
const withNewLast = [...original, 4];

// Insert in middle
const withMiddle = [...original.slice(0, 2), 2.5, ...original.slice(2)];
console.log('With middle:', withMiddle); // [1, 2, 2.5, 3]

// Remove elements
const withoutFirst = original.slice(1);
const withoutLast = original.slice(0, -1);
const withoutMiddle = [...original.slice(0, 1), ...original.slice(2)];

// 4. Object merging with precedence
const defaults = { theme: 'light', lang: 'en', debug: false };
const userSettings = { theme: 'dark', lang: 'es' };
const envSettings = { debug: true };

const finalSettings = { ...defaults, ...userSettings, ...envSettings };
console.log('Final settings:', finalSettings);

// 5. Function argument forwarding
function logger(level, ...args) {
    console.log(\`[\${level}]\`, ...args);
}

function debugLog(...args) {
    logger('DEBUG', ...args);
}

function errorLog(...args) {
    logger('ERROR', ...args);
}

debugLog('This is a debug message', { data: 'some data' });
errorLog('An error occurred', new Error('Something went wrong'));

// Practical Examples
console.log('=== Practical Examples ===');

// 1. State management (React-style)
class SimpleState {
    constructor(initialState = {}) {
        this.state = { ...initialState };
    }
    
    setState(updates) {
        this.state = { ...this.state, ...updates };
    }
    
    getState() {
        return { ...this.state };
    }
}

const appState = new SimpleState({ user: null, loading: false });
appState.setState({ loading: true });
appState.setState({ user: { name: 'Alice' }, loading: false });
console.log('App state:', appState.getState());

// 2. API response handling
function normalizeUser({ id, profile, ...metadata }) {
    return {
        id,
        name: profile?.name || 'Unknown',
        email: profile?.email || '',
        ...metadata
    };
}

const rawUser = {
    id: 1,
    profile: { name: 'Bob', email: 'bob@example.com' },
    createdAt: '2023-01-01',
    lastLogin: '2023-12-01'
};

console.log('Normalized user:', normalizeUser(rawUser));

// 3. Form data processing
function processFormData({ name, email, ...additionalFields }) {
    const requiredFields = { name, email };
    const optionalFields = { ...additionalFields };
    
    // Validate required fields
    const missingFields = Object.entries(requiredFields)
        .filter(([key, value]) => !value)
        .map(([key]) => key);
    
    if (missingFields.length > 0) {
        throw new Error(\`Missing required fields: \${missingFields.join(', ')}\`);
    }
    
    return { ...requiredFields, ...optionalFields };
}

// 4. Array utilities
class ArrayUtils {
    static insert(array, index, ...items) {
        return [
            ...array.slice(0, index),
            ...items,
            ...array.slice(index)
        ];
    }
    
    static remove(array, index, count = 1) {
        return [
            ...array.slice(0, index),
            ...array.slice(index + count)
        ];
    }
    
    static replace(array, index, ...newItems) {
        return [
            ...array.slice(0, index),
            ...newItems,
            ...array.slice(index + 1)
        ];
    }
    
    static unique(array) {
        return [...new Set(array)];
    }
    
    static flatten(array) {
        return array.reduce((flat, item) => [
            ...flat,
            ...(Array.isArray(item) ? this.flatten(item) : [item])
        ], []);
    }
}

const testArray = [1, 2, 3, 4, 5];
console.log('Insert at 2:', ArrayUtils.insert(testArray, 2, 'a', 'b'));
console.log('Remove at 1:', ArrayUtils.remove(testArray, 1, 2));
console.log('Replace at 0:', ArrayUtils.replace(testArray, 0, 'first'));
console.log('Unique:', ArrayUtils.unique([1, 2, 2, 3, 3, 4]));
console.log('Flatten:', ArrayUtils.flatten([1, [2, 3], [4, [5, 6]]]));

// Performance Considerations
console.log('=== Performance Tips ===');

// Large arrays - be careful with spread
const largeArray = new Array(100000).fill(0).map((_, i) => i);

// Inefficient for large arrays
// const copied = [...largeArray]; // Creates new array

// More efficient alternatives
const copied = largeArray.slice(); // Faster for copying
const combined = largeArray.concat([1, 2, 3]); // Faster for combining

// Object spread vs Object.assign
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3, d: 4 };

// These are equivalent
const spread = { ...obj1, ...obj2 };
const assigned = Object.assign({}, obj1, obj2);

console.log('Spread result:', spread);
console.log('Assign result:', assigned);

// Common Patterns
console.log('=== Common Patterns ===');

// 1. Optional property spreading
function createUser(name, email, options = {}) {
    return {
        name,
        email,
        id: Math.random(),
        createdAt: new Date(),
        ...options
    };
}

const user1 = createUser('Alice', 'alice@example.com');
const user2 = createUser('Bob', 'bob@example.com', { isAdmin: true, department: 'IT' });

// 2. Conditional array items
const items = [
    'always included',
    ...(condition ? ['conditional item'] : []),
    'also always included'
];

// 3. Function overloading simulation
function flexibleFunction(...args) {
    if (args.length === 1 && typeof args[0] === 'object') {
        // Called with options object
        const { name, age, ...options } = args[0];
        return { name, age, ...options };
    } else {
        // Called with positional arguments
        const [name, age, ...others] = args;
        return { name, age, others };
    }
}

console.log('With object:', flexibleFunction({ name: 'Alice', age: 30, city: 'NYC' }));
console.log('With args:', flexibleFunction('Bob', 25, 'extra', 'data'));

// Error Handling
console.log('=== Error Handling ===');

function safeSpread(obj) {
    try {
        return { ...obj };
    } catch (error) {
        console.error('Spread failed:', error.message);
        return {};
    }
}

// These work fine
console.log('Safe spread object:', safeSpread({ a: 1 }));
console.log('Safe spread null:', safeSpread(null)); // {}

// Rest parameters validation
function validateRestParams(required, ...optional) {
    if (!required) {
        throw new Error('Required parameter is missing');
    }
    
    return {
        required,
        optional: optional.length > 0 ? optional : ['default']
    };
}

try {
    console.log('Valid call:', validateRestParams('test', 'opt1', 'opt2'));
    // console.log('Invalid call:', validateRestParams()); // Would throw error
} catch (error) {
    console.error('Validation error:', error.message);
}`,

  exercises: [
    {
      question: "Create a function that merges multiple objects, with later objects overriding earlier ones:",
      solution: `function mergeObjects(...objects) {
  return objects.reduce((merged, obj) => ({ ...merged, ...obj }), {});
}

// Usage:
const result = mergeObjects(
  { a: 1, b: 2 },
  { b: 3, c: 4 },
  { c: 5, d: 6 }
);
// Result: { a: 1, b: 3, c: 5, d: 6 }`,
      explanation: "Use rest parameters to collect all objects, then reduce with spread to merge them."
    }
  ],

  quiz: [
    {
      question: "What type of copy does the spread operator create?",
      options: [
        "Deep copy",
        "Shallow copy",
        "Reference copy",
        "No copy"
      ],
      correct: 1,
      explanation: "Spread creates a shallow copy - nested objects/arrays are still referenced, not copied."
    }
  ],

  resources: [
    {
      title: "MDN - Spread Syntax",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax"
    }
  ],

  nextModules: ['modules'],
  prerequisites: ['destructuring']
};

// src/front/data/modules/es6/Modules.js
export const Modules = {
  title: 'ES6 Modules',
  duration: '30 min',
  difficulty: 'Intermediate',
  overview: 'Master ES6 module system for organizing code. Learn import/export syntax, default exports, and module patterns for maintainable applications.',
  
  keyPoints: [
    'Modules provide code organization and reusability',
    'Export values, functions, classes from modules',
    'Import only what you need from other modules',
    'Default exports for main module functionality',
    'Named exports for multiple utilities',
    'Modules have their own scope'
  ],

  example: `// ES6 Module Examples
// Note: These examples show module syntax but won't execute in this environment

// ===== EXPORTING =====

// 1. Named Exports (math-utils.js)
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

export class Calculator {
    constructor() {
        this.result = 0;
    }
    
    add(value) {
        this.result += value;
        return this;
    }
    
    multiply(value) {
        this.result *= value;
        return this;
    }
    
    getResult() {
        return this.result;
    }
}

// Alternative named export syntax
const subtract = (a, b) => a - b;
const divide = (a, b) => b !== 0 ? a / b : null;

export { subtract, divide };

// Exporting with aliases
const square = x => x * x;
const cube = x => x * x * x;

export { square as pow2, cube as pow3 };

// 2. Default Exports (user-service.js)
class UserService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }
    
    async getUser(id) {
        const response = await fetch(\`\${this.apiUrl}/users/\${id}\`);
        return response.json();
    }
    
    async createUser(userData) {
        const response = await fetch(\`\${this.apiUrl}/users\`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        return response.json();
    }
}

export default UserService;

// Default export with expression
export default function(message) {
    console.log(\`Logger: \${message}\`);
}

// Default + Named exports (config.js)
const defaultConfig = {
    apiUrl: 'https://api.example.com',
    timeout: 5000
};

export const themes = {
    light: { bg: '#fff', text: '#000' },
    dark: { bg: '#000', text: '#fff' }
};

export const supportedLanguages = ['en', 'es', 'fr', 'de'];

export default defaultConfig;

// ===== IMPORTING =====

// 1. Named Imports
import { add, multiply, Calculator } from './math-utils.js';
import { subtract as minus, divide } from './math-utils.js';

// Using imported functions
console.log('Add:', add(5, 3));
console.log('Multiply:', multiply(4, 7));
console.log('Subtract (as minus):', minus(10, 4));

const calc = new Calculator();
const result = calc.add(10).multiply(2).getResult();
console.log('Calculator result:', result);

// 2. Default Imports
import UserService from './user-service.js';
import logger from './logger.js';

const userService = new UserService('https://api.myapp.com');
logger('Application started');

// 3. Mixed Imports
import config, { themes, supportedLanguages } from './config.js';

console.log('Default config:', config);
console.log('Available themes:', Object.keys(themes));

// 4. Namespace Imports
import * as MathUtils from './math-utils.js';

console.log('PI:', MathUtils.PI);
console.log('Add with namespace:', MathUtils.add(2, 3));

// 5. Import for Side Effects Only
import './polyfills.js'; // Runs code but doesn't import anything

// ===== DYNAMIC IMPORTS =====

// Dynamic imports return promises
async function loadModule() {
    try {
        const { add, multiply } = await import('./math-utils.js');
        console.log('Dynamically loaded add:', add(1, 2));
    } catch (error) {
        console.error('Failed to load module:', error);
    }
}

// Conditional loading
async function loadTheme(themeName) {
    if (themeName === 'advanced') {
        const advancedThemes = await import('./advanced-themes.js');
        return advancedThemes.default;
    }
    
    const basicThemes = await import('./basic-themes.js');
    return basicThemes.default;
}

// Code splitting example
document.getElementById('load-chart')?.addEventListener('click', async () => {
    const chartModule = await import('./chart-library.js');
    const chart = new chartModule.Chart('#chart-container');
    chart.render();
});

// ===== MODULE PATTERNS =====

// 1. Utility Module Pattern (utils.js)
// Collection of utility functions
export const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US').format(date);
};

export const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// 2. Service Module Pattern (api-service.js)
class ApiService {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
        this.headers = {
            'Content-Type': 'application/json'
        };
    }
    
    setAuthToken(token) {
        this.headers.Authorization = \`Bearer \${token}\`;
    }
    
    async request(endpoint, options = {}) {
        const url = \`\${this.baseUrl}\${endpoint}\`;
        const config = {
            headers: this.headers,
            ...options
        };
        
        const response = await fetch(url, config);
        
        if (!response.ok) {
            throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
        }
        
        return response.json();
    }
    
    get(endpoint) {
        return this.request(endpoint);
    }
    
    post(endpoint, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
}

export default ApiService;

// 3. Factory Module Pattern (create-store.js)
export function createStore(initialState = {}) {
    let state = { ...initialState };
    const listeners = [];
    
    return {
        getState() {
            return { ...state };
        },
        
        setState(updates) {
            state = { ...state, ...updates };
            listeners.forEach(listener => listener(state));
        },
        
        subscribe(listener) {
            listeners.push(listener);
            return () => {
                const index = listeners.indexOf(listener);
                if (index > -1) {
                    listeners.splice(index, 1);
                }
            };
        }
    };
}

// 4. Configuration Module Pattern (app-config.js)
const isDevelopment = process.env.NODE_ENV === 'development';

const baseConfig = {
    appName: 'My App',
    version: '1.0.0',
    supportEmail: 'support@myapp.com'
};

const developmentConfig = {
    ...baseConfig,
    apiUrl: 'http://localhost:3000/api',
    debug: true,
    logLevel: 'debug'
};

const productionConfig = {
    ...baseConfig,
    apiUrl: 'https://api.myapp.com',
    debug: false,
    logLevel: 'error'
};

export default isDevelopment ? developmentConfig : productionConfig;

// ===== PRACTICAL EXAMPLES =====

// Example App Structure:
// app/
//   ├── main.js (entry point)
//   ├── config/
//   │   ├── api.js
//   │   └── constants.js
//   ├── services/
//   │   ├── auth-service.js
//   │   ├── user-service.js
//   │   └── data-service.js
//   ├── utils/
//   │   ├── formatters.js
//   │   ├── validators.js
//   │   └── helpers.js
//   └── components/
//       ├── header.js
//       ├── sidebar.js
//       └── main-content.js

// main.js - Application entry point
import config from './config/api.js';
import AuthService from './services/auth-service.js';
import { formatCurrency, formatDate } from './utils/formatters.js';
import { validateEmail } from './utils/validators.js';

class App {
    constructor() {
        this.authService = new AuthService(config.authUrl);
        this.init();
    }
    
    async init() {
        await this.loadUserSession();
        this.setupEventListeners();
        this.render();
    }
    
    async loadUserSession() {
        try {
            const token = localStorage.getItem('authToken');
            if (token) {
                await this.authService.validateToken(token);
            }
        } catch (error) {
            console.log('No valid session found');
        }
    }
    
    setupEventListeners() {
        // Event handling code
    }
    
    render() {
        // Rendering code
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new App();
});

// ===== ADVANCED PATTERNS =====

// 1. Re-exporting from other modules (index.js barrel exports)
export { default as UserService } from './user-service.js';
export { default as AuthService } from './auth-service.js';
export * from './utils/formatters.js';
export * from './utils/validators.js';

// Usage:
// import { UserService, AuthService, formatDate, validateEmail } from './services/index.js';

// 2. Module with initialization
let initialized = false;
let instance = null;

export function initialize(config) {
    if (initialized) {
        throw new Error('Module already initialized');
    }
    
    instance = createInstance(config);
    initialized = true;
}

export function getInstance() {
    if (!initialized) {
        throw new Error('Module not initialized');
    }
    return instance;
}

function createInstance(config) {
    // Implementation details
    return {
        config,
        data: new Map(),
        // ... other properties and methods
    };
}

// 3. Plugin system with modules
const plugins = new Map();

export function registerPlugin(name, plugin) {
    if (plugins.has(name)) {
        throw new Error(\`Plugin \${name} already registered\`);
    }
    plugins.set(name, plugin);
}

export function getPlugin(name) {
    return plugins.get(name);
}

export function loadPlugin(name) {
    return import(\`./plugins/\${name}.js\`).then(module => {
        registerPlugin(name, module.default);
        return module.default;
    });
}

// ===== BEST PRACTICES =====

// 1. Use descriptive export names
export const MAX_RETRY_ATTEMPTS = 3;
export const API_ENDPOINTS = {
    users: '/api/users',
    posts: '/api/posts'
};

// 2. Organize exports at the end of file
function helper1() { /* ... */ }
function helper2() { /* ... */ }
const constant1 = 'value';

export { helper1, helper2, constant1 };

// 3. Use default export for main functionality
class DatabaseConnection {
    // Main class implementation
}

// Named exports for utilities related to the main export
export const connectionStates = {
    CONNECTING: 'connecting',
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected'
};

export function validateConnectionString(str) {
    // Validation logic
}

export default DatabaseConnection;

// 4. Avoid circular dependencies
// Good: Use dependency injection or event systems
// Bad: A imports B, B imports A

console.log('Module system examples completed');`,

  exercises: [
    {
      question: "Create a module that exports both a default class and named utility functions:",
      solution: `// file-manager.js
export class FileManager {
  constructor(basePath) {
    this.basePath = basePath;
  }
  
  async readFile(filename) {
    // Implementation
  }
}

export function validateFilename(filename) {
  return /^[a-zA-Z0-9._-]+$/.test(filename);
}

export function getFileExtension(filename) {
  return filename.split('.').pop().toLowerCase();
}

export default FileManager;

// Usage:
// import FileManager, { validateFilename, getFileExtension } from './file-manager.js';`,
      explanation: "Combine default export for main functionality with named exports for related utilities."
    }
  ],

  quiz: [
    {
      question: "What's the difference between named and default exports?",
      options: [
        "Named exports are faster",
        "Default exports allow only one per module, named exports allow multiple",
        "Named exports are newer",
        "No significant difference"
      ],
      correct: 1,
      explanation: "A module can have only one default export but multiple named exports. Default exports are imported without braces."
    }
  ],

  resources: [
    {
      title: "MDN - ES6 Modules",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules"
    }
  ],

  nextModules: ['classes'],
  prerequisites: ['destructuring', 'spread-rest']
};
