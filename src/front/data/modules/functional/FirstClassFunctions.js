// src/front/data/modules/functional/FirstClassFunctions.js
export const FirstClassFunctions = {
  title: 'First-Class Functions',
  duration: '30 min',
  difficulty: 'Intermediate',
  overview: 'Understand functions as first-class citizens in JavaScript. Learn to assign functions to variables, pass them as arguments, and return them from other functions.',
  
  keyPoints: [
    'Functions can be assigned to variables',
    'Functions can be passed as arguments',
    'Functions can be returned from other functions',
    'Functions can be stored in data structures',
    'This enables powerful functional programming patterns',
    'Functions have properties and methods like objects'
  ],

  example: `// Functions as Variables
console.log('=== Functions as Variables ===');

// Function declaration
function greet(name) {
    return \`Hello, \${name}!\`;
}

// Assign function to variable
const greetFunction = greet;
console.log(greetFunction('Alice')); // "Hello, Alice!"

// Function expression
const add = function(a, b) {
    return a + b;
};

// Arrow function
const multiply = (a, b) => a * b;

console.log('Add:', add(3, 4));         // 7
console.log('Multiply:', multiply(3, 4)); // 12

// Functions as Arguments (Higher-Order Functions)
console.log('=== Functions as Arguments ===');

function applyOperation(x, y, operation) {
    return operation(x, y);
}

function subtract(a, b) {
    return a - b;
}

function divide(a, b) {
    return b !== 0 ? a / b : null;
}

console.log('Apply add:', applyOperation(10, 5, add));         // 15
console.log('Apply subtract:', applyOperation(10, 5, subtract)); // 5
console.log('Apply multiply:', applyOperation(10, 5, multiply)); // 50

// Using anonymous functions as arguments
console.log('Apply anonymous:', applyOperation(10, 5, (a, b) => a ** b)); // 10^5

// Array methods demonstrate first-class functions
const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map(function(x) { return x * 2; });
const evens = numbers.filter(x => x % 2 === 0);
const sum = numbers.reduce((acc, x) => acc + x, 0);

console.log('Doubled:', doubled); // [2, 4, 6, 8, 10]
console.log('Evens:', evens);     // [2, 4]
console.log('Sum:', sum);         // 15

// Functions Returning Functions
console.log('=== Functions Returning Functions ===');

// Function factory
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const quadruple = createMultiplier(4);

console.log('Double 5:', double(5));     // 10
console.log('Triple 5:', triple(5));     // 15
console.log('Quadruple 5:', quadruple(5)); // 20

// Closure example
function createCounter() {
    let count = 0;
    
    return function() {
        count++;
        return count;
    };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log('Counter1:', counter1()); // 1
console.log('Counter1:', counter1()); // 2
console.log('Counter2:', counter2()); // 1 (independent counter)

// Configuration functions
function createLogger(level) {
    return function(message) {
        console.log(\`[\${level}] \${new Date().toISOString()}: \${message}\`);
    };
}

const debugLog = createLogger('DEBUG');
const errorLog = createLogger('ERROR');

debugLog('Application started');
errorLog('Something went wrong');

// Functions in Data Structures
console.log('=== Functions in Data Structures ===');

// Array of functions
const operations = [
    (x) => x + 1,
    (x) => x * 2,
    (x) => x ** 2,
    (x) => Math.sqrt(x)
];

function applyOperations(value, ops) {
    return ops.map(op => op(value));
}

console.log('Operations on 4:', applyOperations(4, operations)); // [5, 8, 16, 2]

// Object with function properties
const calculator = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => b !== 0 ? a / b : null,
    
    // Method that uses other functions
    calculate: function(operation, a, b) {
        if (this[operation]) {
            return this[operation](a, b);
        }
        throw new Error(\`Unknown operation: \${operation}\`);
    }
};

console.log('Calculator add:', calculator.calculate('add', 10, 5));      // 15
console.log('Calculator divide:', calculator.calculate('divide', 10, 5)); // 2

// Map with functions as values
const strategies = new Map([
    ['aggressive', (value) => value * 1.5],
    ['conservative', (value) => value * 0.8],
    ['balanced', (value) => value * 1.1]
]);

function applyStrategy(strategyName, value) {
    const strategy = strategies.get(strategyName);
    return strategy ? strategy(value) : value;
}

console.log('Aggressive strategy:', applyStrategy('aggressive', 100)); // 150
console.log('Conservative strategy:', applyStrategy('conservative', 100)); // 80

// Function Properties and Methods
console.log('=== Function Properties ===');

function namedFunction(a, b) {
    return a + b;
}

console.log('Function name:', namedFunction.name);   // "namedFunction"
console.log('Function length:', namedFunction.length); // 2 (number of parameters)

// Custom properties on functions
namedFunction.description = 'Adds two numbers';
namedFunction.version = '1.0';

console.log('Function description:', namedFunction.description);

// Using call and apply
function introduce(greeting, punctuation) {
    return \`\${greeting}, I'm \${this.name}\${punctuation}\`;
}

const person = { name: 'Alice' };

console.log('Using call:', introduce.call(person, 'Hello', '!'));
console.log('Using apply:', introduce.apply(person, ['Hi', '.']));

// Bind creates new function with bound context
const boundIntroduce = introduce.bind(person, 'Hey');
console.log('Using bind:', boundIntroduce('!!!'));

// Practical Examples
console.log('=== Practical Examples ===');

// 1. Event handling registry
class EventEmitter {
    constructor() {
        this.events = new Map();
    }
    
    on(event, handler) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(handler);
    }
    
    emit(event, ...args) {
        const handlers = this.events.get(event);
        if (handlers) {
            handlers.forEach(handler => handler(...args));
        }
    }
    
    off(event, handler) {
        const handlers = this.events.get(event);
        if (handlers) {
            const index = handlers.indexOf(handler);
            if (index > -1) {
                handlers.splice(index, 1);
            }
        }
    }
}

const emitter = new EventEmitter();

// Register event handlers
emitter.on('user-login', (user) => console.log(\`User logged in: \${user.name}\`));
emitter.on('user-login', (user) => console.log(\`Welcome back, \${user.name}!\`));

// Emit event
emitter.emit('user-login', { name: 'Bob' });

// 2. Middleware pattern
class Pipeline {
    constructor() {
        this.middlewares = [];
    }
    
    use(middleware) {
        this.middlewares.push(middleware);
    }
    
    async execute(context) {
        let index = 0;
        
        const next = async () => {
            if (index < this.middlewares.length) {
                const middleware = this.middlewares[index++];
                await middleware(context, next);
            }
        };
        
        await next();
        return context;
    }
}

// Create pipeline
const requestPipeline = new Pipeline();

// Add middleware functions
requestPipeline.use(async (ctx, next) => {
    console.log('Auth middleware');
    ctx.user = { id: 1, name: 'Alice' };
    await next();
});

requestPipeline.use(async (ctx, next) => {
    console.log('Logging middleware');
    ctx.startTime = Date.now();
    await next();
    console.log(\`Request took \${Date.now() - ctx.startTime}ms\`);
});

requestPipeline.use(async (ctx, next) => {
    console.log('Business logic');
    ctx.result = \`Hello, \${ctx.user.name}!\`;
    await next();
});

// Execute pipeline
requestPipeline.execute({}).then(result => {
    console.log('Pipeline result:', result);
});

// 3. Function composition
function compose(...functions) {
    return function(value) {
        return functions.reduceRight((acc, fn) => fn(acc), value);
    };
}

function pipe(...functions) {
    return function(value) {
        return functions.reduce((acc, fn) => fn(acc), value);
    };
}

// Helper functions
const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const square = x => x * x;

// Compose (right to left)
const composedFunction = compose(square, multiplyByTwo, addOne);
console.log('Composed (3):', composedFunction(3)); // square(multiplyByTwo(addOne(3))) = 64

// Pipe (left to right)
const pipedFunction = pipe(addOne, multiplyByTwo, square);
console.log('Piped (3):', pipedFunction(3)); // square(multiplyByTwo(addOne(3))) = 64

// 4. Memoization
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log('Cache hit for:', args);
            return cache.get(key);
        }
        
        console.log('Computing for:', args);
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Expensive function
function fibonacci(n) {
    if (n < 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Memoized version
const memoizedFibonacci = memoize(fibonacci);

console.log('Fibonacci 10:', memoizedFibonacci(10)); // Computed
console.log('Fibonacci 10 again:', memoizedFibonacci(10)); // Cache hit

// 5. Decorator pattern
function timing(fn) {
    return function(...args) {
        const start = performance.now();
        const result = fn.apply(this, args);
        const end = performance.now();
        console.log(\`\${fn.name} took \${end - start} milliseconds\`);
        return result;
    };
}

function retry(maxAttempts) {
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
                    console.log(\`Attempt \${attempts} failed:`, error.message);
                }
            }
            
            throw lastError;
        };
    };
}

// Apply decorators
function riskyOperation(input) {
    if (Math.random() > 0.7) {
        throw new Error('Random failure');
    }
    return \`Success with \${input}\`;
}

const decoratedOperation = timing(retry(3)(riskyOperation));

try {
    console.log(decoratedOperation('test input'));
} catch (error) {
    console.log('All attempts failed:', error.message);
}

// Function introspection
console.log('=== Function Introspection ===');

function inspectFunction(fn) {
    return {
        name: fn.name || 'anonymous',
        length: fn.length,
        isAsync: fn.constructor.name === 'AsyncFunction',
        isArrow: fn.toString().includes('=>'),
        source: fn.toString()
    };
}

console.log('Add function info:', inspectFunction(add));
console.log('Arrow function info:', inspectFunction(x => x * 2));

console.log('First-class functions examples completed');`,

  exercises: [
    {
      question: "Create a function that takes an array of functions and returns a function that applies all of them to a value:",
      solution: `function combineOperations(operations) {
  return function(value) {
    return operations.reduce((result, operation) => operation(result), value);
  };
}

// Usage:
const operations = [x => x + 1, x => x * 2, x => x ** 2];
const combined = combineOperations(operations);
console.log(combined(3)); // ((3 + 1) * 2)^2 = 64`,
      explanation: "Use reduce to apply each function in sequence, passing the result to the next function."
    }
  ],

  quiz: [
    {
      question: "What does it mean for functions to be 'first-class citizens'?",
      options: [
        "They execute faster than other code",
        "They can be assigned to variables, passed as arguments, and returned from functions",
        "They are defined before other code",
        "They have special syntax"
      ],
      correct: 1,
      explanation: "First-class means functions can be treated like any other value - stored in variables, passed around, and returned from other functions."
    }
  ],

  resources: [
    {
      title: "MDN - First-Class Functions",
      url: "https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function"
    }
  ],

  nextModules: ['higher-order-functions'],
  prerequisites: ['functions-basics', 'arrow-functions']
};