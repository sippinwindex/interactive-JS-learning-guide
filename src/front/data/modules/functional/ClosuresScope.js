export default {
  title: 'Closures and Scope',
  duration: '45 min',
  difficulty: 'Intermediate',
  overview: 'Master JavaScript closures and scope concepts. Learn how functions capture and maintain access to variables from their lexical environment.',
  
  keyPoints: [
    'Closures allow functions to access outer scope variables',
    'Variables remain accessible even after outer function returns',
    'Each closure maintains its own copy of variables',
    'Closures enable data privacy and encapsulation',
    'Understanding scope chain is crucial for closures',
    'Common use cases: callbacks, modules, partial application'
  ],

  example: `// Understanding Scope
console.log('=== Understanding Scope ===');

// Global scope
var globalVar = 'I am global';
let globalLet = 'I am also global';

function demonstrateScope() {
    // Function scope
    var functionVar = 'I am in function scope';
    let functionLet = 'I am also in function scope';
    
    console.log('Inside function:');
    console.log('  globalVar:', globalVar); // Accessible
    console.log('  functionVar:', functionVar); // Accessible
    
    if (true) {
        // Block scope
        var blockVar = 'I am var in block'; // Function scoped due to var
        let blockLet = 'I am let in block'; // Block scoped
        const blockConst = 'I am const in block'; // Block scoped
        
        console.log('Inside block:');
        console.log('  blockVar:', blockVar);
        console.log('  blockLet:', blockLet);
        console.log('  blockConst:', blockConst);
    }
    
    console.log('After block:');
    console.log('  blockVar:', blockVar); // Still accessible (var is function scoped)
    // console.log('  blockLet:', blockLet); // ReferenceError: not accessible
}

demonstrateScope();

// Basic Closure Example
console.log('\\n=== Basic Closure ===');

function outerFunction(x) {
    // This variable is in the outer function's scope
    const outerVariable = x;
    
    // Inner function has access to outer function's variables
    function innerFunction(y) {
        console.log(\`Outer variable: \${outerVariable}\`);
        console.log(\`Inner parameter: \${y}\`);
        return outerVariable + y;
    }
    
    // Return the inner function (creating a closure)
    return innerFunction;
}

// The outer function has finished executing, but the closure remembers outerVariable
const myClosure = outerFunction(10);
console.log('Closure result:', myClosure(5)); // 15

// Each closure maintains its own copy of variables
const closure1 = outerFunction(100);
const closure2 = outerFunction(200);

console.log('Closure 1:', closure1(1)); // 101
console.log('Closure 2:', closure2(1)); // 201

// Practical Closure Example: Counter
console.log('\\n=== Closure Counter ===');

function createCounter(initialValue = 0) {
    let count = initialValue;
    
    return {
        increment: function(step = 1) {
            count += step;
            return count;
        },
        
        decrement: function(step = 1) {
            count -= step;
            return count;
        },
        
        getValue: function() {
            return count;
        },
        
        reset: function() {
            count = initialValue;
            return count;
        }
    };
}

const counter1 = createCounter(0);
const counter2 = createCounter(100);

console.log('Counter 1 increment:', counter1.increment()); // 1
console.log('Counter 1 increment by 5:', counter1.increment(5)); // 6
console.log('Counter 2 increment:', counter2.increment()); // 101

console.log('Counter 1 value:', counter1.getValue()); // 6
console.log('Counter 2 value:', counter2.getValue()); // 101

counter1.reset();
console.log('Counter 1 after reset:', counter1.getValue()); // 0

// Data Privacy with Closures
console.log('\\n=== Data Privacy ===');

function createBankAccount(initialBalance, accountHolder) {
    // Private variables
    let balance = initialBalance;
    let transactionHistory = [];
    const accountNumber = 'ACC' + Math.random().toString(36).substring(7);
    
    // Private method
    function addTransaction(type, amount, description) {
        transactionHistory.push({
            type,
            amount,
            description,
            date: new Date(),
            balance: balance
        });
    }
    
    // Public interface (closure over private variables)
    return {
        // Public methods
        deposit: function(amount, description = 'Deposit') {
            if (amount <= 0) {
                throw new Error('Deposit amount must be positive');
            }
            
            balance += amount;
            addTransaction('deposit', amount, description);
            console.log(\`Deposited $\${amount}. New balance: $\${balance}\`);
            return balance;
        },
        
        withdraw: function(amount, description = 'Withdrawal') {
            if (amount <= 0) {
                throw new Error('Withdrawal amount must be positive');
            }
            
            if (amount > balance) {
                throw new Error('Insufficient funds');
            }
            
            balance -= amount;
            addTransaction('withdrawal', amount, description);
            console.log(\`Withdrew $\${amount}. New balance: $\${balance}\`);
            return balance;
        },
        
        getBalance: function() {
            return balance;
        },
        
        getAccountInfo: function() {
            return {
                accountNumber: accountNumber,
                accountHolder: accountHolder,
                balance: balance,
                transactionCount: transactionHistory.length
            };
        },
        
        getTransactionHistory: function() {
            // Return copy to prevent external modification
            return transactionHistory.map(transaction => ({ ...transaction }));
        }
    };
}

const account = createBankAccount(1000, 'John Doe');

console.log('Account info:', account.getAccountInfo());
account.deposit(500, 'Salary');
account.withdraw(200, 'Groceries');

// Private variables are not accessible from outside
console.log('Balance (public method):', account.getBalance());
// console.log('balance:', account.balance); // undefined - private variable

// Closures in Loops (Common Gotcha)
console.log('\\n=== Closures in Loops ===');

// ❌ Common mistake with var
console.log('Problem with var in loops:');
for (var i = 0; i < 3; i++) {
    setTimeout(function() {
        console.log('var i:', i); // All print 3 because var is function scoped
    }, 100);
}

// ✅ Solution 1: Use let (block scoped)
console.log('\\nSolution with let:');
for (let j = 0; j < 3; j++) {
    setTimeout(function() {
        console.log('let j:', j); // Prints 0, 1, 2 correctly
    }, 200);
}

// ✅ Solution 2: Create closure with IIFE
console.log('\\nSolution with IIFE:');
for (var k = 0; k < 3; k++) {
    (function(index) {
        setTimeout(function() {
            console.log('IIFE index:', index); // Prints 0, 1, 2 correctly
        }, 300);
    })(k);
}

// ✅ Solution 3: Use bind
console.log('\\nSolution with bind:');
for (var l = 0; l < 3; l++) {
    setTimeout(function(index) {
        console.log('bind index:', index); // Prints 0, 1, 2 correctly
    }.bind(null, l), 400);
}

// Function Factories with Closures
console.log('\\n=== Function Factories ===');

function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
const tenTimes = createMultiplier(10);

console.log('Double 5:', double(5)); // 10
console.log('Triple 4:', triple(4)); // 12
console.log('Ten times 3:', tenTimes(3)); // 30

// More complex factory
function createValidator(rules) {
    return function(value) {
        const errors = [];
        
        if (rules.required && (!value || value.trim() === '')) {
            errors.push('Field is required');
        }
        
        if (rules.minLength && value.length < rules.minLength) {
            errors.push(\`Minimum length is \${rules.minLength}\`);
        }
        
        if (rules.maxLength && value.length > rules.maxLength) {
            errors.push(\`Maximum length is \${rules.maxLength}\`);
        }
        
        if (rules.pattern && !rules.pattern.test(value)) {
            errors.push('Invalid format');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    };
}

const emailValidator = createValidator({
    required: true,
    minLength: 5,
    pattern: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
});

const passwordValidator = createValidator({
    required: true,
    minLength: 8,
    maxLength: 128,
    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/
});

console.log('Email validation (valid):', emailValidator('user@example.com'));
console.log('Email validation (invalid):', emailValidator('invalid'));
console.log('Password validation:', passwordValidator('Weak123'));

// Module Pattern with Closures
console.log('\\n=== Module Pattern ===');

const MathUtils = (function() {
    // Private variables
    const PI = 3.14159;
    let calculationCount = 0;
    
    // Private methods
    function logCalculation(operation, result) {
        calculationCount++;
        console.log(\`Calculation #\${calculationCount}: \${operation} = \${result}\`);
    }
    
    // Public API
    return {
        add: function(a, b) {
            const result = a + b;
            logCalculation(\`\${a} + \${b}\`, result);
            return result;
        },
        
        multiply: function(a, b) {
            const result = a * b;
            logCalculation(\`\${a} * \${b}\`, result);
            return result;
        },
        
        circleArea: function(radius) {
            const result = PI * radius * radius;
            logCalculation(\`π * \${radius}²\`, result);
            return result;
        },
        
        getCalculationCount: function() {
            return calculationCount;
        },
        
        // Namespace for geometry functions
        geometry: {
            rectangleArea: function(width, height) {
                const result = width * height;
                logCalculation(\`\${width} * \${height}\`, result);
                return result;
            }
        }
    };
})();

console.log('Math operations:');
MathUtils.add(5, 3);
MathUtils.multiply(4, 7);
MathUtils.circleArea(5);
MathUtils.geometry.rectangleArea(10, 8);

console.log('Total calculations:', MathUtils.getCalculationCount());
// console.log('PI:', MathUtils.PI); // undefined - private variable

// Closures for Event Handling
console.log('\\n=== Closures in Event Handling ===');

function createButtonHandler(buttonName, clickCount = 0) {
    return function(event) {
        clickCount++;
        console.log(\`\${buttonName} clicked \${clickCount} times\`);
        
        // Access to closure variables
        if (clickCount >= 5) {
            console.log(\`\${buttonName} has been clicked many times!\`);
        }
        
        return clickCount;
    };
}

// Simulate button handlers
const saveHandler = createButtonHandler('Save Button');
const deleteHandler = createButtonHandler('Delete Button');

// Simulate clicks
console.log('Button click simulations:');
saveHandler({});
saveHandler({});
deleteHandler({});
saveHandler({});
deleteHandler({});
saveHandler({});
saveHandler({});

// Partial Application with Closures
console.log('\\n=== Partial Application ===');

function multiply(a, b, c) {
    return a * b * c;
}

// Create partially applied functions using closures
function partial(fn, ...args1) {
    return function(...args2) {
        return fn(...args1, ...args2);
    };
}

const multiplyBy2 = partial(multiply, 2);
const multiplyBy2And3 = partial(multiply, 2, 3);

console.log('Partial application:');
console.log('multiplyBy2(3, 4):', multiplyBy2(3, 4)); // 2 * 3 * 4 = 24
console.log('multiplyBy2And3(5):', multiplyBy2And3(5)); // 2 * 3 * 5 = 30

// Currying with Closures
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

const curriedMultiply = curry(multiply);

console.log('Currying:');
console.log('curriedMultiply(2)(3)(4):', curriedMultiply(2)(3)(4)); // 24
console.log('curriedMultiply(2, 3)(4):', curriedMultiply(2, 3)(4)); // 24

// Memoization with Closures
console.log('\\n=== Memoization ===');

function memoize(fn) {
    const cache = {};
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (key in cache) {
            console.log(\`Cache hit for \${key}\`);
            return cache[key];
        }
        
        console.log(\`Computing for \${key}\`);
        const result = fn.apply(this, args);
        cache[key] = result;
        return result;
    };
}

// Expensive function to memoize
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFibonacci = memoize(fibonacci);

console.log('Memoized fibonacci:');
console.log('fib(10):', memoizedFibonacci(10));
console.log('fib(10) again:', memoizedFibonacci(10)); // Cache hit

// Advanced Closure Patterns
console.log('\\n=== Advanced Patterns ===');

// 1. Closure with getter/setter
function createProperty(initialValue) {
    let value = initialValue;
    
    return {
        get: function() {
            return value;
        },
        
        set: function(newValue, validator) {
            if (validator && !validator(newValue)) {
                throw new Error('Invalid value');
            }
            
            const oldValue = value;
            value = newValue;
            
            return {
                oldValue: oldValue,
                newValue: value
            };
        }
    };
}

const ageProperty = createProperty(25);
console.log('Age getter:', ageProperty.get());

const change = ageProperty.set(30, (val) => val >= 0 && val <= 150);
console.log('Age change:', change);

// 2. Closure for state machine
function createStateMachine(initialState, transitions) {
    let currentState = initialState;
    const listeners = [];
    
    return {
        getState: function() {
            return currentState;
        },
        
        transition: function(action) {
            const stateTransitions = transitions[currentState];
            
            if (!stateTransitions || !stateTransitions[action]) {
                throw new Error(\`Invalid transition: \${action} from \${currentState}\`);
            }
            
            const oldState = currentState;
            currentState = stateTransitions[action];
            
            // Notify listeners
            listeners.forEach(listener => {
                listener(oldState, currentState, action);
            });
            
            return currentState;
        },
        
        onStateChange: function(listener) {
            listeners.push(listener);
        }
    };
}

const doorStateMachine = createStateMachine('closed', {
    closed: { open: 'open' },
    open: { close: 'closed', lock: 'locked' },
    locked: { unlock: 'closed' }
});

doorStateMachine.onStateChange((from, to, action) => {
    console.log(\`Door: \${from} -> \${to} (action: \${action})\`);
});

console.log('State machine demo:');
console.log('Initial state:', doorStateMachine.getState());
doorStateMachine.transition('open');
doorStateMachine.transition('close');

// Memory Considerations
console.log('\\n=== Memory Considerations ===');

function demonstrateMemoryLeak() {
    const largeData = new Array(1000000).fill('data');
    
    return function() {
        // This closure keeps a reference to largeData
        // Even if we only use a small part of it
        return largeData.length;
    };
}

// ✅ Better approach: only capture what you need
function demonstrateMemoryOptimized() {
    const largeData = new Array(1000000).fill('data');
    const dataLength = largeData.length; // Extract only needed data
    
    return function() {
        // This closure only keeps reference to dataLength
        return dataLength;
    };
}

// Performance comparison
console.time('Memory leak closure creation');
const leakyClosures = Array.from({ length: 100 }, () => demonstrateMemoryLeak());
console.timeEnd('Memory leak closure creation');

console.time('Optimized closure creation');
const optimizedClosures = Array.from({ length: 100 }, () => demonstrateMemoryOptimized());
console.timeEnd('Optimized closure creation');

// Common Pitfalls and Solutions
console.log('\\n=== Common Pitfalls ===');

// Pitfall 1: Unintended variable sharing
function createFunctions() {
    const functions = [];
    
    // ❌ Problem: all functions share the same 'i'
    for (var i = 0; i < 3; i++) {
        functions.push(function() {
            return i; // Will always return 3
        });
    }
    
    return functions;
}

const problemFunctions = createFunctions();
console.log('Problem functions:', problemFunctions.map(fn => fn())); // [3, 3, 3]

// ✅ Solution: Create separate closure for each iteration
function createFunctionsSolution() {
    const functions = [];
    
    for (let i = 0; i < 3; i++) { // Use let instead of var
        functions.push(function() {
            return i; // Each closure captures its own 'i'
        });
    }
    
    return functions;
}

const solutionFunctions = createFunctionsSolution();
console.log('Solution functions:', solutionFunctions.map(fn => fn())); // [0, 1, 2]

// Alternative solution with IIFE
function createFunctionsIIFE() {
    const functions = [];
    
    for (var i = 0; i < 3; i++) {
        functions.push((function(index) {
            return function() {
                return index;
            };
        })(i));
    }
    
    return functions;
}

const iifeFunctions = createFunctionsIIFE();
console.log('IIFE functions:', iifeFunctions.map(fn => fn())); // [0, 1, 2]

// Pitfall 2: Accidental global variables
function problematicClosure() {
    // ❌ Forgot to declare variable
    accidentalGlobal = 'This becomes global!';
    
    return function() {
        return accidentalGlobal;
    };
}

// ✅ Always declare variables properly
function safeClosure() {
    const properVariable = 'This stays in closure';
    
    return function() {
        return properVariable;
    };
}

// Real-world Applications
console.log('\\n=== Real-world Applications ===');

// 1. Configuration management
function createConfig(environment) {
    const configs = {
        development: {
            apiUrl: 'http://localhost:3000',
            debug: true,
            logLevel: 'debug'
        },
        production: {
            apiUrl: 'https://api.production.com',
            debug: false,
            logLevel: 'error'
        },
        testing: {
            apiUrl: 'http://test.example.com',
            debug: true,
            logLevel: 'warn'
        }
    };
    
    const config = configs[environment] || configs.development;
    
    return {
        get: function(key) {
            return config[key];
        },
        
        getAll: function() {
            return { ...config }; // Return copy
        },
        
        isProduction: function() {
            return environment === 'production';
        }
    };
}

const devConfig = createConfig('development');
const prodConfig = createConfig('production');

console.log('Dev API URL:', devConfig.get('apiUrl'));
console.log('Prod debug mode:', prodConfig.get('debug'));

// 2. Event system with closures
function createEventEmitter() {
    const events = {};
    
    return {
        on: function(eventName, callback) {
            if (!events[eventName]) {
                events[eventName] = [];
            }
            events[eventName].push(callback);
            
            // Return unsubscribe function (closure over callback)
            return function unsubscribe() {
                const index = events[eventName].indexOf(callback);
                if (index > -1) {
                    events[eventName].splice(index, 1);
                }
            };
        },
        
        emit: function(eventName, data) {
            if (events[eventName]) {
                events[eventName].forEach(callback => {
                    try {
                        callback(data);
                    } catch (error) {
                        console.error('Event callback error:', error);
                    }
                });
            }
        },
        
        once: function(eventName, callback) {
            const unsubscribe = this.on(eventName, function(data) {
                callback(data);
                unsubscribe(); // Remove after first call
            });
            
            return unsubscribe;
        }
    };
}

const emitter = createEventEmitter();

// Subscribe to events
const unsubscribe1 = emitter.on('user:login', (user) => {
    console.log('User logged in:', user.name);
});

const unsubscribe2 = emitter.once('app:ready', () => {
    console.log('App is ready!');
});

// Emit events
emitter.emit('user:login', { name: 'Alice' });
emitter.emit('user:login', { name: 'Bob' });
emitter.emit('app:ready');
emitter.emit('app:ready'); // Won't trigger 'once' callback again

// 3. Rate limiting with closures
function createRateLimiter(maxCalls, timeWindow) {
    const calls = [];
    
    return function(fn) {
        const now = Date.now();
        
        // Remove old calls outside time window
        while (calls.length > 0 && calls[0] <= now - timeWindow) {
            calls.shift();
        }
        
        // Check if we've exceeded the limit
        if (calls.length >= maxCalls) {
            const oldestCall = calls[0];
            const timeToWait = timeWindow - (now - oldestCall);
            throw new Error(\`Rate limit exceeded. Try again in \${timeToWait}ms\`);
        }
        
        // Record this call
        calls.push(now);
        
        // Execute the function
        return fn();
    };
}

const rateLimitedLog = createRateLimiter(3, 5000); // 3 calls per 5 seconds

console.log('Rate limiter demo:');
try {
    rateLimitedLog(() => console.log('Call 1'));
    rateLimitedLog(() => console.log('Call 2'));
    rateLimitedLog(() => console.log('Call 3'));
    rateLimitedLog(() => console.log('Call 4')); // Should throw error
} catch (error) {
    console.log('Rate limit error:', error.message);
}

// 4. Debouncing with closures
function createDebounce(delay) {
    let timeoutId = null;
    
    return function(fn) {
        // Clear previous timeout
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        
        // Set new timeout
        timeoutId = setTimeout(() => {
            fn();
            timeoutId = null;
        }, delay);
        
        // Return cancel function
        return function cancel() {
            if (timeoutId) {
                clearTimeout(timeoutId);
                timeoutId = null;
            }
        };
    };
}

const debounce = createDebounce(1000);

console.log('Debounce demo:');
debounce(() => console.log('Debounced call 1'));
debounce(() => console.log('Debounced call 2'));
const cancel = debounce(() => console.log('Debounced call 3'));
debounce(() => console.log('Debounced call 4')); // Only this should execute

// 5. Cache with TTL using closures
function createTTLCache(defaultTTL = 60000) {
    const cache = new Map();
    
    function isExpired(item) {
        return Date.now() > item.expiry;
    }
    
    function cleanup() {
        for (const [key, item] of cache.entries()) {
            if (isExpired(item)) {
                cache.delete(key);
            }
        }
    }
    
    // Periodic cleanup
    const cleanupInterval = setInterval(cleanup, 30000);
    
    return {
        set: function(key, value, ttl = defaultTTL) {
            cache.set(key, {
                value: value,
                expiry: Date.now() + ttl
            });
        },
        
        get: function(key) {
            const item = cache.get(key);
            
            if (!item) {
                return undefined;
            }
            
            if (isExpired(item)) {
                cache.delete(key);
                return undefined;
            }
            
            return item.value;
        },
        
        has: function(key) {
            return this.get(key) !== undefined;
        },
        
        delete: function(key) {
            return cache.delete(key);
        },
        
        clear: function() {
            cache.clear();
        },
        
        size: function() {
            cleanup(); // Clean expired items first
            return cache.size;
        },
        
        destroy: function() {
            clearInterval(cleanupInterval);
            cache.clear();
        }
    };
}

const ttlCache = createTTLCache(2000); // 2 second default TTL

ttlCache.set('key1', 'value1');
ttlCache.set('key2', 'value2', 5000); // Custom TTL

console.log('TTL Cache demo:');
console.log('Immediate get:', ttlCache.get('key1'));

setTimeout(() => {
    console.log('After 3 seconds:', ttlCache.get('key1')); // Should be undefined
    console.log('Key2 still valid:', ttlCache.get('key2')); // Should still exist
}, 3000);

// Performance Testing
console.log('\\n=== Performance Considerations ===');

// Test closure vs non-closure performance
function testClosurePerformance() {
    const iterations = 1000000;
    
    // Non-closure function
    function regularFunction(x) {
        return x * 2;
    }
    
    // Closure function
    function createClosureFunction(multiplier) {
        return function(x) {
            return x * multiplier;
        };
    }
    
    const closureFunction = createClosureFunction(2);
    
    console.time('Regular function calls');
    for (let i = 0; i < iterations; i++) {
        regularFunction(i);
    }
    console.timeEnd('Regular function calls');
    
    console.time('Closure function calls');
    for (let i = 0; i < iterations; i++) {
        closureFunction(i);
    }
    console.timeEnd('Closure function calls');
}

testClosurePerformance();

// Best Practices Summary
console.log('\\n=== Closure Best Practices ===');
console.log('✅ Use closures for data privacy and encapsulation');
console.log('✅ Be mindful of memory usage - avoid capturing unnecessary variables');
console.log('✅ Use let/const instead of var to avoid scope issues');
console.log('✅ Consider performance implications for frequently called closures');
console.log('✅ Use closures for module patterns and factory functions');
console.log('✅ Remember that each closure maintains its own variable copies');
console.log('✅ Use closures for partial application and currying');
console.log('⚠️  Avoid creating closures in loops unless necessary');
console.log('⚠️  Be careful about circular references and memory leaks');`,

  exercises: [
    {
      question: "Create a function that generates password validators with different requirements using closures:",
      solution: `function createPasswordValidator(requirements) {
  return function(password) {
    const errors = [];
    
    if (requirements.minLength && password.length < requirements.minLength) {
      errors.push(\`Password must be at least \${requirements.minLength} characters\`);
    }
    
    if (requirements.requireUppercase && !/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (requirements.requireLowercase && !/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (requirements.requireNumbers && !/\\d/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    if (requirements.requireSpecial && !/[!@#$%^&*]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    
    return {
      isValid: errors.length === 0,
      errors: errors
    };
  };
}

const basicValidator = createPasswordValidator({
  minLength: 8,
  requireUppercase: true,
  requireLowercase: true
});

const strongValidator = createPasswordValidator({
  minLength: 12,
  requireUppercase: true,
  requireLowercase: true,
  requireNumbers: true,
  requireSpecial: true
});`,
      explanation: "Closures allow each validator to remember its specific requirements while providing a consistent interface for password validation."
    }
  ],

  quiz: [
    {
      question: "What happens to variables in a closure when the outer function finishes executing?",
      options: [
        "They are garbage collected immediately",
        "They remain accessible to the inner function",
        "They become global variables",
        "They throw a reference error"
      ],
      correct: 1,
      explanation: "Variables captured by a closure remain accessible to the inner function even after the outer function has finished executing. This is the key feature of closures."
    }
  ],

  resources: [
    {
      title: "MDN - Closures",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures"
    },
    {
      title: "You Don't Know JS - Scope & Closures",
      url: "https://github.com/getify/You-Dont-Know-JS/tree/1st-ed/scope%20%26%20closures"
    }
  ],

  nextModules: ['higher-order-functions', 'currying'],
  prerequisites: ['functions', 'scope', 'arrow-functions']
};