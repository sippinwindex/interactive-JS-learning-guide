export default {
  title: 'Higher Order Functions',
  duration: '40 min',
  difficulty: 'Intermediate',
  overview: 'Master higher order functions - functions that take other functions as arguments or return functions. Learn to write more reusable and composable code.',
  
  keyPoints: [
    'Higher order functions operate on other functions',
    'Can accept functions as parameters',
    'Can return functions as results',
    'Enable powerful abstraction and code reuse',
    'Foundation of functional programming patterns',
    'Used extensively in array methods and event handling'
  ],

  example: `// Understanding Higher Order Functions
console.log('=== Understanding Higher Order Functions ===');

// A higher order function is a function that:
// 1. Takes one or more functions as arguments, OR
// 2. Returns a function as its result

// Example 1: Function that takes another function as argument
function greetWith(greeting) {
    return function(name) {
        return \`\${greeting}, \${name}!\`;
    };
}

const sayHello = greetWith('Hello');
const sayHi = greetWith('Hi');

console.log(sayHello('Alice')); // Hello, Alice!
console.log(sayHi('Bob'));      // Hi, Bob!

// Example 2: Function that takes a function as parameter
function applyOperation(numbers, operation) {
    return numbers.map(operation);
}

const numbers = [1, 2, 3, 4, 5];
const doubled = applyOperation(numbers, x => x * 2);
const squared = applyOperation(numbers, x => x * x);

console.log('Doubled:', doubled); // [2, 4, 6, 8, 10]
console.log('Squared:', squared); // [1, 4, 9, 16, 25]

// Built-in Higher Order Functions
console.log('\\n=== Built-in Higher Order Functions ===');

// Array methods that accept functions
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// map() - transforms each element
const tripled = data.map(x => x * 3);
console.log('Tripled:', tripled);

// filter() - selects elements based on condition
const evens = data.filter(x => x % 2 === 0);
console.log('Even numbers:', evens);

// reduce() - accumulates values
const sum = data.reduce((acc, x) => acc + x, 0);
console.log('Sum:', sum);

// find() - finds first matching element
const firstBig = data.find(x => x > 5);
console.log('First number > 5:', firstBig);

// some() - tests if any element matches
const hasEven = data.some(x => x % 2 === 0);
console.log('Has even numbers:', hasEven);

// every() - tests if all elements match
const allPositive = data.every(x => x > 0);
console.log('All positive:', allPositive);

// Creating Higher Order Functions
console.log('\\n=== Creating Higher Order Functions ===');

// 1. Function factory
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const quadruple = createMultiplier(4);

console.log('double(5):', double(5));       // 10
console.log('triple(4):', triple(4));       // 12
console.log('quadruple(3):', quadruple(3)); // 12

// 2. Function decorator
function withLogging(fn) {
    return function(...args) {
        console.log(\`Calling \${fn.name} with arguments:\`, args);
        const result = fn.apply(this, args);
        console.log(\`\${fn.name} returned:\`, result);
        return result;
    };
}

function add(a, b) {
    return a + b;
}

const loggedAdd = withLogging(add);
console.log('\\nUsing logged function:');
loggedAdd(3, 4);

// 3. Condition-based execution
function when(condition, fn) {
    return function(...args) {
        if (condition(...args)) {
            return fn(...args);
        }
        return undefined;
    };
}

const isPositive = x => x > 0;
const sqrt = x => Math.sqrt(x);
const safeSquareRoot = when(isPositive, sqrt);

console.log('\\nSafe square root:');
console.log('safeSquareRoot(16):', safeSquareRoot(16)); // 4
console.log('safeSquareRoot(-4):', safeSquareRoot(-4)); // undefined

// Array Processing with Higher Order Functions
console.log('\\n=== Array Processing ===');

const students = [
    { name: 'Alice', grade: 85, subject: 'Math' },
    { name: 'Bob', grade: 92, subject: 'Science' },
    { name: 'Charlie', grade: 78, subject: 'Math' },
    { name: 'Diana', grade: 96, subject: 'Science' },
    { name: 'Eve', grade: 88, subject: 'Math' }
];

// Custom higher order function for array processing
function processStudents(students, ...operations) {
    return operations.reduce((result, operation) => operation(result), students);
}

// Operation functions
const filterBySubject = subject => students => 
    students.filter(student => student.subject === subject);

const sortByGrade = students => 
    students.sort((a, b) => b.grade - a.grade);

const getNames = students => 
    students.map(student => student.name);

const getTopN = n => students => 
    students.slice(0, n);

// Compose operations
const topMathStudents = processStudents(
    students,
    filterBySubject('Math'),
    sortByGrade,
    getTopN(2),
    getNames
);

console.log('Top 2 Math students:', topMathStudents);

// Function Composition
console.log('\\n=== Function Composition ===');

// compose() - applies functions from right to left
function compose(...functions) {
    return function(value) {
        return functions.reduceRight((acc, fn) => fn(acc), value);
    };
}

// pipe() - applies functions from left to right
function pipe(...functions) {
    return function(value) {
        return functions.reduce((acc, fn) => fn(acc), value);
    };
}

// Example functions
const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const square = x => x * x;

// Using compose (right to left)
const composedOperation = compose(square, multiplyByTwo, addOne);
console.log('compose(square, multiplyByTwo, addOne)(3):', composedOperation(3)); // ((3+1)*2)^2 = 64

// Using pipe (left to right)
const pipedOperation = pipe(addOne, multiplyByTwo, square);
console.log('pipe(addOne, multiplyByTwo, square)(3):', pipedOperation(3)); // ((3+1)*2)^2 = 64

// Partial Application
console.log('\\n=== Partial Application ===');

// partial() - creates a function with some arguments pre-filled
function partial(fn, ...args1) {
    return function(...args2) {
        return fn(...args1, ...args2);
    };
}

function greet(greeting, name, punctuation) {
    return \`\${greeting} \${name}\${punctuation}\`;
}

const sayHelloTo = partial(greet, 'Hello');
const sayHelloToFriendly = partial(greet, 'Hello', 'there');

console.log(sayHelloTo('Alice', '!')); // Hello Alice!
console.log(sayHelloToFriendly('!')); // Hello there!

// Real-world example: API request function
function apiRequest(method, baseUrl, endpoint, data) {
    return \`\${method} \${baseUrl}\${endpoint}\` + (data ? \` with \${JSON.stringify(data)}\` : '');
}

const postToAPI = partial(apiRequest, 'POST', 'https://api.example.com');
const getUserAPI = partial(apiRequest, 'GET', 'https://api.example.com', '/users');

console.log(postToAPI('/users', { name: 'Alice' }));
console.log(getUserAPI());

// Currying
console.log('\\n=== Currying ===');

// curry() - transforms a function to be callable with single arguments
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...args2) {
                return curried.apply(this, args.concat(args2));
            };
        }
    };
}

function multiply(a, b, c) {
    return a * b * c;
}

const curriedMultiply = curry(multiply);

console.log('Curried multiply:');
console.log('curriedMultiply(2)(3)(4):', curriedMultiply(2)(3)(4)); // 24
console.log('curriedMultiply(2, 3)(4):', curriedMultiply(2, 3)(4)); // 24
console.log('curriedMultiply(2)(3, 4):', curriedMultiply(2)(3, 4)); // 24

// Practical currying example
const curriedGreet = curry(greet);
const hello = curriedGreet('Hello');
const helloAlice = hello('Alice');

console.log('helloAlice("!"):', helloAlice('!')); // Hello Alice!

// Memoization with Higher Order Functions
console.log('\\n=== Memoization ===');

function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log(\`Cache hit for \${key}\`);
            return cache.get(key);
        }
        
        console.log(\`Computing for \${key}\`);
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Expensive function to memoize
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFibonacci = memoize(fibonacci);

console.log('\\nMemoized Fibonacci:');
console.log('fib(10):', memoizedFibonacci(10));
console.log('fib(10) again:', memoizedFibonacci(10)); // Cache hit

// Advanced memoization with TTL
function memoizeWithTTL(fn, ttl = 60000) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        const cached = cache.get(key);
        
        if (cached && Date.now() - cached.timestamp < ttl) {
            console.log(\`Cache hit for \${key}\`);
            return cached.value;
        }
        
        console.log(\`Computing for \${key}\`);
        const result = fn.apply(this, args);
        cache.set(key, { value: result, timestamp: Date.now() });
        return result;
    };
}

// Throttling and Debouncing
console.log('\\n=== Throttling and Debouncing ===');

// throttle() - limits function execution to once per interval
function throttle(fn, delay) {
    let lastCall = 0;
    
    return function(...args) {
        const now = Date.now();
        
        if (now - lastCall >= delay) {
            lastCall = now;
            return fn.apply(this, args);
        }
    };
}

// debounce() - delays function execution until after delay period of inactivity
function debounce(fn, delay) {
    let timeoutId;
    
    return function(...args) {
        clearTimeout(timeoutId);
        
        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// Example usage
function logMessage(message) {
    console.log(\`Log: \${message} at \${new Date().toLocaleTimeString()}\`);
}

const throttledLog = throttle(logMessage, 1000); // Max once per second
const debouncedLog = debounce(logMessage, 1000);  // Wait 1 second after last call

console.log('\\nThrottled calls:');
throttledLog('First call');
setTimeout(() => throttledLog('Second call (ignored)'), 500);
setTimeout(() => throttledLog('Third call'), 1500);

console.log('\\nDebounced calls:');
debouncedLog('First call');
setTimeout(() => debouncedLog('Second call'), 500);
setTimeout(() => debouncedLog('Third call'), 800);

// Function Pipelines
console.log('\\n=== Function Pipelines ===');

// Creating a data processing pipeline
function createPipeline(...functions) {
    return function(data) {
        return functions.reduce((result, fn) => {
            if (Array.isArray(result)) {
                return result.map(fn);
            }
            return fn(result);
        }, data);
    };
}

// Data transformation functions
const users = [
    { name: 'alice johnson', age: 25, active: true },
    { name: 'bob smith', age: 30, active: false },
    { name: 'charlie brown', age: 35, active: true }
];

const capitalizeWords = str => 
    str.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');

const formatUser = user => ({
    ...user,
    name: capitalizeWords(user.name),
    displayName: \`\${capitalizeWords(user.name)} (\${user.age})\`
});

const filterActive = users => users.filter(user => user.active);
const sortByAge = users => users.sort((a, b) => a.age - b.age);
const extractDisplayNames = users => users.map(user => user.displayName);

// Create and use pipeline
const userPipeline = createPipeline(
    users => users.map(formatUser),
    filterActive,
    sortByAge,
    extractDisplayNames
);

console.log('Processed users:', userPipeline(users));

// Event-Driven Programming with Higher Order Functions
console.log('\\n=== Event-Driven Programming ===');

class EventEmitter {
    constructor() {
        this.events = new Map();
    }
    
    on(eventName, callback) {
        if (!this.events.has(eventName)) {
            this.events.set(eventName, []);
        }
        this.events.get(eventName).push(callback);
        
        // Return unsubscribe function
        return () => this.off(eventName, callback);
    }
    
    off(eventName, callback) {
        if (!this.events.has(eventName)) return;
        
        const callbacks = this.events.get(eventName);
        const index = callbacks.indexOf(callback);
        if (index > -1) {
            callbacks.splice(index, 1);
        }
    }
    
    emit(eventName, data) {
        if (!this.events.has(eventName)) return;
        
        this.events.get(eventName).forEach(callback => {
            try {
                callback(data);
            } catch (error) {
                console.error('Event callback error:', error);
            }
        });
    }
    
    once(eventName, callback) {
        const unsubscribe = this.on(eventName, (data) => {
            callback(data);
            unsubscribe();
        });
        return unsubscribe;
    }
}

// Higher order function for creating event handlers
function createEventHandler(action) {
    return function(data) {
        console.log(\`Handling event with action: \${action}\`, data);
    };
}

const emitter = new EventEmitter();

// Using higher order functions with events
const handleUserLogin = createEventHandler('USER_LOGIN');
const handleUserLogout = createEventHandler('USER_LOGOUT');

emitter.on('user:login', handleUserLogin);
emitter.on('user:logout', handleUserLogout);

// Middleware pattern with higher order functions
function createMiddleware(name) {
    return function(next) {
        return function(data) {
            console.log(\`Middleware \${name}: before\`);
            const result = next(data);
            console.log(\`Middleware \${name}: after\`);
            return result;
        };
    };
}

// Emit events
console.log('\\nEmitting events:');
emitter.emit('user:login', { userId: 1, name: 'Alice' });
emitter.emit('user:logout', { userId: 1 });

// Functional Array Utilities
console.log('\\n=== Functional Array Utilities ===');

// Custom higher order array functions
const arrayUtils = {
    // chunk() - splits array into chunks of specified size
    chunk: size => array => {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    },
    
    // groupBy() - groups array elements by key function
    groupBy: keyFn => array => {
        return array.reduce((groups, item) => {
            const key = keyFn(item);
            if (!groups[key]) groups[key] = [];
            groups[key].push(item);
            return groups;
        }, {});
    },
    
    // partition() - splits array into two based on predicate
    partition: predicate => array => {
        return array.reduce(
            ([pass, fail], item) => 
                predicate(item) ? [[...pass, item], fail] : [pass, [...fail, item]],
            [[], []]
        );
    },
    
    // uniq() - removes duplicates based on key function
    uniq: keyFn => array => {
        const seen = new Set();
        return array.filter(item => {
            const key = keyFn ? keyFn(item) : item;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }
};

// Using functional array utilities
const testData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

console.log('Chunk by 3:', arrayUtils.chunk(3)(testData));

const people = [
    { name: 'Alice', department: 'Engineering', age: 25 },
    { name: 'Bob', department: 'Marketing', age: 30 },
    { name: 'Charlie', department: 'Engineering', age: 35 },
    { name: 'Diana', department: 'Marketing', age: 28 }
];

console.log('Group by department:');
console.log(arrayUtils.groupBy(person => person.department)(people));

const [adults, young] = arrayUtils.partition(person => person.age >= 30)(people);
console.log('Adults:', adults.map(p => p.name));
console.log('Young:', young.map(p => p.name));

const duplicateNames = ['Alice', 'Bob', 'Alice', 'Charlie', 'Bob'];
console.log('Unique names:', arrayUtils.uniq()(duplicateNames));

// Function Validation and Error Handling
console.log('\\n=== Function Validation ===');

// withValidation() - adds input validation to functions
function withValidation(validationRules) {
    return function(fn) {
        return function(...args) {
            // Validate arguments
            for (let i = 0; i < validationRules.length; i++) {
                const rule = validationRules[i];
                const arg = args[i];
                
                if (rule && !rule.validate(arg)) {
                    throw new Error(\`Argument \${i}: \${rule.message}\`);
                }
            }
            
            return fn.apply(this, args);
        };
    };
}

// Validation rules
const validationRules = {
    isNumber: {
        validate: value => typeof value === 'number' && !isNaN(value),
        message: 'must be a valid number'
    },
    isPositive: {
        validate: value => typeof value === 'number' && value > 0,
        message: 'must be a positive number'
    },
    isString: {
        validate: value => typeof value === 'string',
        message: 'must be a string'
    }
};

// Function with validation
const divide = withValidation([
    validationRules.isNumber,
    validationRules.isPositive
])(function(a, b) {
    return a / b;
});

try {
    console.log('divide(10, 2):', divide(10, 2));
    console.log('divide(10, 0):'); 
    divide(10, 0); // Will throw error
} catch (error) {
    console.log('Validation error:', error.message);
}

// Performance Optimization with Higher Order Functions
console.log('\\n=== Performance Optimization ===');

// once() - ensures function is called only once
function once(fn) {
    let called = false;
    let result;
    
    return function(...args) {
        if (!called) {
            called = true;
            result = fn.apply(this, args);
        }
        return result;
    };
}

// Example: expensive initialization
const expensiveInit = once(() => {
    console.log('Performing expensive initialization...');
    return { initialized: true, timestamp: Date.now() };
});

console.log('\\nFirst call to expensiveInit:');
console.log(expensiveInit());

console.log('\\nSecond call to expensiveInit:');
console.log(expensiveInit()); // Won't perform initialization again

// Retry with exponential backoff
function withRetry(maxAttempts = 3, baseDelay = 1000) {
    return function(fn) {
        return async function(...args) {
            let lastError;
            
            for (let attempt = 1; attempt <= maxAttempts; attempt++) {
                try {
                    return await fn.apply(this, args);
                } catch (error) {
                    lastError = error;
                    
                    if (attempt === maxAttempts) break;
                    
                    const delay = baseDelay * Math.pow(2, attempt - 1);
                    console.log(\`Attempt \${attempt} failed, retrying in \${delay}ms...\`);
                    
                    await new Promise(resolve => setTimeout(resolve, delay));
                }
            }
            
            throw lastError;
        };
    };
}

// Function Composition Utilities
console.log('\\n=== Advanced Function Composition ===');

// Async composition
function composeAsync(...functions) {
    return async function(value) {
        let result = value;
        for (const fn of functions.reverse()) {
            result = await fn(result);
        }
        return result;
    };
}

// Example async functions
const asyncDouble = async x => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return x * 2;
};

const asyncSquare = async x => {
    await new Promise(resolve => setTimeout(resolve, 100));
    return x * x;
};

// Use async composition
const asyncComposed = composeAsync(asyncSquare, asyncDouble);

asyncComposed(3).then(result => {
    console.log('Async composed result:', result); // (3 * 2)^2 = 36
});

// Conditional execution
function when(predicate, fn, elseFn) {
    return function(...args) {
        if (predicate(...args)) {
            return fn(...args);
        } else if (elseFn) {
            return elseFn(...args);
        }
        return args[0]; // Return first argument if no else function
    };
}

const processNumber = when(
    x => x > 0,
    x => x * 2,
    x => Math.abs(x)
);

console.log('\\nConditional processing:');
console.log('processNumber(5):', processNumber(5));   // 10 (positive, so double)
console.log('processNumber(-3):', processNumber(-3)); // 3 (negative, so abs)

// Best Practices Summary
setTimeout(() => {
    console.log('\\n=== Higher Order Functions Best Practices ===');
    console.log('✅ Use higher order functions for code reuse and abstraction');
    console.log('✅ Prefer composition over inheritance');
    console.log('✅ Keep functions pure when possible');
    console.log('✅ Use partial application to create specialized functions');
    console.log('✅ Implement memoization for expensive computations');
    console.log('✅ Use throttling/debouncing for performance optimization');
    console.log('✅ Validate inputs with higher order validation functions');
    console.log('✅ Create pipelines for data transformation');
    console.log("⚠️  Don't over-abstract - keep code readable");
    console.log('⚠️  Be mindful of memory usage with closures');
    console.log('⚠️  Consider performance implications of function nesting');
}, 2000);`,
  exercises: [
    {
      question: "Create a higher order function that implements a rate limiter for API calls:",
      solution: `function createRateLimiter(maxCalls, timeWindow) {
  const calls = [];
  
  return function rateLimited(fn) {
    return async function(...args) {
      const now = Date.now();
      
      // Remove calls outside the time window
      while (calls.length > 0 && calls <= now - timeWindow) {
        calls.shift();
      }
      
      // Check if we've exceeded the limit
      if (calls.length >= maxCalls) {
        const oldestCall = calls;
        const timeToWait = timeWindow - (now - oldestCall);
        throw new Error(\`Rate limit exceeded. Try again in \${timeToWait}ms\`);
      }
      
      // Record this call
      calls.push(now);
      
      // Execute the function
      try {
        const result = await fn.apply(this, args);
        return result;
      } catch (error) {
        // Remove the call from tracking if it failed
        calls.pop();
        throw error;
      }
    };
  };
}

// Usage
const rateLimiter = createRateLimiter(5, 60000); // 5 calls per minute

const makeApiCall = rateLimiter(async function(endpoint) {
  console.log(\`Making API call to \${endpoint}\`);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 100));
  return { data: 'API response' };
});

// This will work for first 5 calls, then throw rate limit error
for (let i = 0; i < 7; i++) {
  makeApiCall('/users').catch(err => console.log(err.message));
}`,
      explanation: "This rate limiter uses closures to maintain call history and applies rate limiting to any function passed to it, demonstrating practical higher order function usage."
    }
  ],

  quiz: [
    {
      question: "What is the main characteristic of a higher order function?",
      options: [
        "It runs faster than regular functions",
        "It takes functions as arguments or returns functions",
        "It can only be used with arrays",
        "It automatically memoizes results"
      ],
      correct: 1,
      explanation: "A higher order function is defined as a function that either takes one or more functions as arguments, returns a function, or both. This enables powerful abstraction and functional programming patterns."
    }
  ],

  resources: [
    {
      title: "MDN - Functions",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions"
    },
    {
      title: "Functional Programming in JavaScript",
      url: "https://eloquentjavascript.net/05_higher_order.html"
    }
  ],

  nextModules: ['pure-functions', 'currying', 'composition'],
  prerequisites: ['functions', 'closures-scope', 'map-filter-reduce']
};