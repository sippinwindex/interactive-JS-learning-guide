// src/front/data/modules/functional/FirstClassFunctions.js
export default {
  title: 'First-Class Functions',
  duration: '40 min',
  difficulty: 'Intermediate',
  overview: 'Understand how functions are first-class citizens in JavaScript. Learn about function expressions, arrow functions, higher-order functions, and functional programming patterns.',
  
  keyPoints: [
    'Functions are values that can be assigned to variables',
    'Functions can be passed as arguments to other functions',
    'Functions can be returned from other functions',
    'Functions can be stored in data structures',
    'Higher-order functions operate on other functions',
    'Enables powerful functional programming patterns'
  ],

  example: `// First-Class Functions Fundamentals
console.log('=== First-Class Functions ===');

// Functions can be assigned to variables
const greet = function(name) {
    return \`Hello, \${name}!\`;
};

const sayHello = greet; // Function assigned to another variable
console.log('Assigned function:', sayHello('Alice'));

// Arrow function syntax
const multiply = (a, b) => a * b;
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;

console.log('Arrow functions:', multiply(4, 5), add(10, 15), subtract(20, 8));

// Functions in data structures
const mathOperations = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => b !== 0 ? a / b : 'Cannot divide by zero'
};

console.log('Functions in object:', mathOperations.add(5, 3));
console.log('Division check:', mathOperations.divide(10, 2));

// Array of functions
const operations = [
    (x) => x * 2,
    (x) => x + 10,
    (x) => x - 5,
    (x) => Math.sqrt(x)
];

const number = 16;
operations.forEach((op, index) => {
    console.log(\`Operation \${index + 1}: \${number} -> \${op(number)}\`);
});

// Higher-Order Functions
console.log('\\n=== Higher-Order Functions ===');

// Function that takes another function as parameter
function applyOperation(numbers, operation) {
    return numbers.map(operation);
}

const numbers = [1, 2, 3, 4, 5];
const doubled = applyOperation(numbers, x => x * 2);
const squared = applyOperation(numbers, x => x * x);

console.log('Original:', numbers);
console.log('Doubled:', doubled);
console.log('Squared:', squared);

// Function that returns another function
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const quadruple = createMultiplier(4);

console.log('Function factories:');
console.log('double(7):', double(7));
console.log('triple(7):', triple(7));
console.log('quadruple(7):', quadruple(7));

// Closure example
function createCounter(initialValue = 0) {
    let count = initialValue;
    
    return {
        increment: () => ++count,
        decrement: () => --count,
        getValue: () => count,
        reset: () => count = initialValue
    };
}

const counter1 = createCounter(10);
const counter2 = createCounter(100);

console.log('\\nClosures and state:');
console.log('Counter1 initial:', counter1.getValue());
console.log('Counter1 increment:', counter1.increment());
console.log('Counter1 increment:', counter1.increment());

console.log('Counter2 initial:', counter2.getValue());
console.log('Counter2 decrement:', counter2.decrement());
console.log('Counter1 current:', counter1.getValue()); // Independent state

// Function Composition
console.log('\\n=== Function Composition ===');

const addTen = x => x + 10;
const multiplyByTwo = x => x * 2;
const subtractFive = x => x - 5;

// Manual composition
function compose(f, g) {
    return function(x) {
        return f(g(x));
    };
}

// Compose multiple functions
function composeMany(...functions) {
    return function(value) {
        return functions.reduceRight((acc, fn) => fn(acc), value);
    };
}

const composed = compose(multiplyByTwo, addTen);
const multiComposed = composeMany(subtractFive, multiplyByTwo, addTen);

console.log('Composed (add 10, then multiply by 2):');
console.log('Input: 5, Output:', composed(5)); // (5 + 10) * 2 = 30

console.log('Multi-composed (add 10, multiply by 2, subtract 5):');
console.log('Input: 5, Output:', multiComposed(5)); // ((5 + 10) * 2) - 5 = 25

// Pipe function (left-to-right composition)
function pipe(...functions) {
    return function(value) {
        return functions.reduce((acc, fn) => fn(acc), value);
    };
}

const piped = pipe(addTen, multiplyByTwo, subtractFive);
console.log('Piped (same operations, left-to-right):');
console.log('Input: 5, Output:', piped(5));

// Practical Examples
console.log('\\n=== Practical Examples ===');

// Event handling with first-class functions
class EventManager {
    constructor() {
        this.events = {};
    }
    
    on(event, handler) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(handler);
    }
    
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(handler => handler(data));
        }
    }
    
    off(event, handler) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(h => h !== handler);
        }
    }
}

const eventManager = new EventManager();

// Define event handlers as first-class functions
const userLoginHandler = (user) => console.log(\`User \${user.name} logged in\`);
const auditLogHandler = (user) => console.log(\`Audit: Login event for \${user.name}\`);
const notificationHandler = (user) => console.log(\`Welcome notification sent to \${user.email}\`);

// Register multiple handlers for the same event
eventManager.on('userLogin', userLoginHandler);
eventManager.on('userLogin', auditLogHandler);
eventManager.on('userLogin', notificationHandler);

// Trigger event
eventManager.emit('userLogin', { 
    name: 'Alice Johnson', 
    email: 'alice@example.com' 
});

// Middleware pattern
console.log('\\n=== Middleware Pattern ===');

class RequestProcessor {
    constructor() {
        this.middlewares = [];
    }
    
    use(middleware) {
        this.middlewares.push(middleware);
    }
    
    process(request) {
        let index = 0;
        
        const next = () => {
            if (index < this.middlewares.length) {
                const middleware = this.middlewares[index++];
                middleware(request, next);
            }
        };
        
        next();
        return request;
    }
}

const processor = new RequestProcessor();

// Middleware functions
const authMiddleware = (req, next) => {
    console.log('Authentication middleware');
    req.authenticated = true;
    next();
};

const loggingMiddleware = (req, next) => {
    console.log(\`Logging: \${req.method} \${req.url}\`);
    req.logged = true;
    next();
};

const validationMiddleware = (req, next) => {
    console.log('Validation middleware');
    req.validated = true;
    next();
};

// Register middleware
processor.use(authMiddleware);
processor.use(loggingMiddleware);
processor.use(validationMiddleware);

// Process request
const request = { method: 'GET', url: '/api/users' };
const processedRequest = processor.process(request);
console.log('Final request:', processedRequest);

// Function Decorators
console.log('\\n=== Function Decorators ===');

// Timing decorator
function timer(fn) {
    return function(...args) {
        const start = performance.now();
        const result = fn.apply(this, args);
        const end = performance.now();
        console.log(\`\${fn.name} took \${(end - start).toFixed(2)}ms\`);
        return result;
    };
}

// Memoization decorator
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log('Cache hit for:', args);
            return cache.get(key);
        }
        
        const result = fn.apply(this, args);
        cache.set(key, result);
        console.log('Cache miss, computed:', args);
        return result;
    };
}

// Retry decorator
function retry(maxAttempts = 3) {
    return function(fn) {
        return function(...args) {
            let attempts = 0;
            let lastError;
            
            while (attempts < maxAttempts) {
                try {
                    return fn.apply(this, args);
                } catch (error) {
                    lastError = error;
                    attempts++;
                    console.log(\`Attempt \${attempts} failed: \${error.message}\`);
                }
            }
            
            throw lastError;
        };
    };
}

// Example functions to decorate
function expensiveCalculation(n) {
    // Simulate expensive operation
    let result = 0;
    for (let i = 0; i < n * 1000000; i++) {
        result += Math.sqrt(i);
    }
    return result;
}

function flakyFunction(x) {
    if (Math.random() < 0.7) {
        throw new Error('Random failure');
    }
    return x * 2;
}

// Apply decorators
const timedCalculation = timer(expensiveCalculation);
const memoizedCalculation = memoize(timedCalculation);
const resilientFunction = retry(3)(flakyFunction);

console.log('Testing decorated functions:');

// Test memoized function
memoizedCalculation(5);
memoizedCalculation(5); // Should hit cache

// Test retry function
try {
    const result = resilientFunction(10);
    console.log('Resilient function result:', result);
} catch (error) {
    console.log('All retries failed:', error.message);
}

// Functional Array Methods
console.log('\\n=== Functional Array Methods ===');

const products = [
    { id: 1, name: 'Laptop', price: 999, category: 'Electronics', inStock: true },
    { id: 2, name: 'Book', price: 15, category: 'Education', inStock: true },
    { id: 3, name: 'Phone', price: 599, category: 'Electronics', inStock: false },
    { id: 4, name: 'Desk', price: 299, category: 'Furniture', inStock: true },
    { id: 5, name: 'Pen', price: 3, category: 'Office', inStock: true }
];

// Chaining functional methods
const expensiveElectronics = products
    .filter(product => product.category === 'Electronics')
    .filter(product => product.inStock)
    .filter(product => product.price > 500)
    .map(product => ({
        ...product,
        discountedPrice: product.price * 0.9
    }))
    .sort((a, b) => b.price - a.price);

console.log('Expensive electronics in stock:', expensiveElectronics);

// Custom functional methods
Array.prototype.customMap = function(callback) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        result.push(callback(this[i], i, this));
    }
    return result;
};

Array.prototype.customFilter = function(predicate) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i], i, this)) {
            result.push(this[i]);
        }
    }
    return result;
};

Array.prototype.customReduce = function(callback, initialValue) {
    let accumulator = initialValue;
    let startIndex = 0;
    
    if (initialValue === undefined) {
        accumulator = this[0];
        startIndex = 1;
    }
    
    for (let i = startIndex; i < this.length; i++) {
        accumulator = callback(accumulator, this[i], i, this);
    }
    
    return accumulator;
};

console.log('\\nCustom functional methods:');
const testNumbers = [1, 2, 3, 4, 5];

const customMapped = testNumbers.customMap(x => x * x);
const customFiltered = testNumbers.customFilter(x => x % 2 === 0);
const customReduced = testNumbers.customReduce((acc, curr) => acc + curr, 0);

console.log('Custom map (squares):', customMapped);
console.log('Custom filter (evens):', customFiltered);
console.log('Custom reduce (sum):', customReduced);

// Function Factories and Generators
console.log('\\n=== Function Factories ===');

// Factory for creating validators
function createValidator(rules) {
    return function(value) {
        const errors = [];
        
        for (const rule of rules) {
            if (!rule.test(value)) {
                errors.push(rule.message);
            }
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    };
}

// Create specific validators
const passwordValidator = createValidator([
    {
        test: (value) => value.length >= 8,
        message: 'Password must be at least 8 characters long'
    },
    {
        test: (value) => /[A-Z]/.test(value),
        message: 'Password must contain at least one uppercase letter'
    },
    {
        test: (value) => /[0-9]/.test(value),
        message: 'Password must contain at least one number'
    }
]);

const emailValidator = createValidator([
    {
        test: (value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value),
        message: 'Invalid email format'
    }
]);

console.log('Password validation:');
console.log('Weak password:', passwordValidator('weak'));
console.log('Strong password:', passwordValidator('StrongPass123'));

console.log('\\nEmail validation:');
console.log('Invalid email:', emailValidator('invalid-email'));
console.log('Valid email:', emailValidator('user@example.com'));

// Currying and Partial Application
console.log('\\n=== Currying and Partial Application ===');

// Curried function
function curriedAdd(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}

// Arrow function currying
const curriedMultiply = (a) => (b) => (c) => a * b * c;

console.log('Curried functions:');
console.log('curriedAdd(1)(2)(3):', curriedAdd(1)(2)(3));
console.log('curriedMultiply(2)(3)(4):', curriedMultiply(2)(3)(4));

// Partial application utility
function partial(fn, ...args1) {
    return function(...args2) {
        return fn.apply(this, args1.concat(args2));
    };
}

// Example: partially applied function
function greetUser(greeting, name, punctuation) {
    return \`\${greeting} \${name}\${punctuation}\`;
}

const sayHelloTo = partial(greetUser, 'Hello');
const sayHelloExcited = partial(greetUser, 'Hello', 'Everyone', '!');

console.log('\\nPartial application:');
console.log('sayHelloTo("Alice", "!"):', sayHelloTo('Alice', '!'));
console.log('sayHelloExcited():', sayHelloExcited());

// Function Pipeline
console.log('\\n=== Function Pipeline ===');

// Pipeline utility
const pipeline = (...functions) => (input) => 
    functions.reduce((acc, fn) => fn(acc), input);

// Data transformation pipeline
const processUserData = pipeline(
    (user) => ({ ...user, email: user.email.toLowerCase() }),
    (user) => ({ ...user, fullName: \`\${user.firstName} \${user.lastName}\` }),
    (user) => ({ ...user, initials: user.fullName.split(' ').map(n => n[0]).join('') }),
    (user) => ({ ...user, processed: true, timestamp: new Date().toISOString() })
);

const userData = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'JOHN.DOE@EXAMPLE.COM'
};

const processedUser = processUserData(userData);
console.log('Pipeline processing:');
console.log('Original:', userData);
console.log('Processed:', processedUser);

// Async Function Patterns
console.log('\\n=== Async Function Patterns ===');

// Higher-order async function
async function withRetry(asyncFn, maxRetries = 3) {
    let attempts = 0;
    
    while (attempts < maxRetries) {
        try {
            return await asyncFn();
        } catch (error) {
            attempts++;
            if (attempts >= maxRetries) {
                throw error;
            }
            console.log(\`Attempt \${attempts} failed, retrying...\`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
}

// Async function composition
const asyncPipe = (...functions) => (input) =>
    functions.reduce((promise, fn) => promise.then(fn), Promise.resolve(input));

// Example async functions
const fetchUserData = async (userId) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 100));
    return { id: userId, name: \`User \${userId}\` };
};

const enrichUserData = async (user) => {
    await new Promise(resolve => setTimeout(resolve, 50));
    return { ...user, lastLogin: new Date().toISOString() };
};

const validateUser = async (user) => {
    await new Promise(resolve => setTimeout(resolve, 30));
    return { ...user, isValid: user.id > 0 };
};

// Async pipeline
const processUser = asyncPipe(
    fetchUserData,
    enrichUserData,
    validateUser
);

// Test async patterns
(async () => {
    try {
        const result = await processUser(123);
        console.log('Async pipeline result:', result);
    } catch (error) {
        console.error('Async pipeline error:', error);
    }
})();

console.log('\\nFirst-class functions examples completed');`,

  exercises: [
    {
      question: "Create a function factory that generates specialized comparison functions:",
      solution: `function createComparator(key, order = 'asc') {
  return function(a, b) {
    const aVal = typeof key === 'function' ? key(a) : a[key];
    const bVal = typeof key === 'function' ? key(b) : b[key];
    
    if (aVal < bVal) return order === 'asc' ? -1 : 1;
    if (aVal > bVal) return order === 'asc' ? 1 : -1;
    return 0;
  };
}

// Usage:
const users = [
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 },
  { name: 'Charlie', age: 35 }
];

const sortByAge = createComparator('age');
const sortByNameDesc = createComparator('name', 'desc');

console.log(users.sort(sortByAge));`,
      explanation: "Function factories return specialized functions configured with specific parameters, enabling reusable and flexible code patterns."
    }
  ],

  quiz: [
    {
      question: "What does it mean for functions to be 'first-class citizens' in JavaScript?",
      options: [
        "Functions run faster than other data types",
        "Functions can be assigned to variables, passed as arguments, and returned from functions",
        "Functions are defined before other code elements",
        "Functions have special memory allocation"
      ],
      correct: 1,
      explanation: "First-class functions can be treated like any other value - assigned to variables, passed as arguments, returned from functions, and stored in data structures."
    }
  ],

  resources: [
    {
      title: "MDN - First-class Function",
      url: "https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function"
    },
    {
      title: "Functional Programming Guide",
      url: "https://mostly-adequate.gitbooks.io/mostly-adequate-guide/"
    }
  ],

  nextModules: ['higher-order-functions', 'closures', 'currying'],
  prerequisites: ['functions-basics', 'arrow-functions']
};