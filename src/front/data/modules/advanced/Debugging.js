export default {
  title: 'Debugging Techniques',
  duration: '50 min',
  difficulty: 'Advanced',
  overview: 'Master JavaScript debugging with console methods, debugger statements, browser dev tools, and advanced debugging strategies for complex applications.',
  
  keyPoints: [
    'Console object methods beyond console.log',
    'Using debugger statement and breakpoints',
    'Browser developer tools navigation',
    'Error objects and stack traces',
    'Debugging async code and promises',
    'Performance profiling and memory debugging'
  ],

  example: `// Console Debugging Methods
console.log('=== Console Debugging Methods ===');

// Basic console methods
console.log('Standard log message');
console.info('ℹ️ Info message');
console.warn('⚠️ Warning message');
console.error('❌ Error message');

// Console.table() for structured data
const users = [
    { id: 1, name: 'Alice', role: 'admin', active: true },
    { id: 2, name: 'Bob', role: 'user', active: false },
    { id: 3, name: 'Charlie', role: 'moderator', active: true }
];

console.table(users);
console.table(users, ['name', 'role']); // Show only specific columns

// Console.group() for organized logging
console.group('User Processing');
console.log('Loading users...');
console.group('Validation');
console.log('Checking user permissions');
console.log('Validating email formats');
console.groupEnd();
console.log('Users loaded successfully');
console.groupEnd();

// Console.time() for performance measurement
console.time('Array Processing');
const largeArray = Array.from({ length: 100000 }, (_, i) => i);
const filtered = largeArray.filter(n => n % 2 === 0);
console.timeEnd('Array Processing');

// Console.count() for tracking occurrences
function trackFunctionCalls(functionName) {
    console.count(\`\${functionName} called\`);
}

trackFunctionCalls('fetchData');
trackFunctionCalls('processUser');
trackFunctionCalls('fetchData');
trackFunctionCalls('fetchData');

// Console.trace() for stack trace
function level1() {
    level2();
}

function level2() {
    level3();
}

function level3() {
    console.trace('Stack trace from level3');
}

level1();

// Console.assert() for conditional logging
const temperature = 45;
console.assert(temperature < 40, 'Temperature is too high!', { temperature });

const userRole = 'guest';
console.assert(userRole === 'admin', 'User is not admin', { userRole });

// Debugger Statement and Breakpoints
console.log('\\n=== Debugger Statement ===');

function calculateTotalPrice(items) {
    let total = 0;
    
    for (let i = 0; i < items.length; i++) {
        const item = items[i];
        
        // Uncomment to trigger debugger
        // debugger; // Execution will pause here when dev tools are open
        
        if (item.price && item.quantity) {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            console.log(\`Item: \${item.name}, Total: \${itemTotal}\`);
        }
    }
    
    return total;
}

const shoppingCart = [
    { name: 'Laptop', price: 999, quantity: 1 },
    { name: 'Mouse', price: 25, quantity: 2 },
    { name: 'Keyboard', price: 75, quantity: 1 }
];

const totalPrice = calculateTotalPrice(shoppingCart);
console.log('Total cart price:', totalPrice);

// Error Objects and Stack Traces
console.log('\\n=== Error Handling and Stack Traces ===');

function createDetailedError(message, code, context) {
    const error = new Error(message);
    error.code = code;
    error.context = context;
    error.timestamp = new Date().toISOString();
    
    // Custom stack trace manipulation
    if (Error.captureStackTrace) {
        Error.captureStackTrace(error, createDetailedError);
    }
    
    return error;
}

function processPayment(amount, cardNumber) {
    try {
        if (!amount || amount <= 0) {
            throw createDetailedError(
                'Invalid payment amount',
                'INVALID_AMOUNT',
                { amount, cardNumber: '****' + cardNumber?.slice(-4) }
            );
        }
        
        if (!cardNumber || cardNumber.length < 16) {
            throw createDetailedError(
                'Invalid card number',
                'INVALID_CARD',
                { cardLength: cardNumber?.length }
            );
        }
        
        // Simulate processing
        return { success: true, transactionId: 'TXN_' + Date.now() };
        
    } catch (error) {
        console.error('Payment processing failed:');
        console.error('Message:', error.message);
        console.error('Code:', error.code);
        console.error('Context:', error.context);
        console.error('Stack:', error.stack);
        
        throw error;
    }
}

// Test error handling
try {
    processPayment(0, '1234');
} catch (error) {
    console.log('Caught payment error:', error.code);
}

// Debugging Async Code
console.log('\\n=== Debugging Async Code ===');

async function debugAsyncOperations() {
    console.group('Async Debugging Demo');
    
    try {
        console.log('🚀 Starting async operations...');
        
        // Promise with detailed logging
        const fetchUser = (id) => {
            console.log(\`📡 Fetching user \${id}...\`);
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (id > 0) {
                        const user = { id, name: \`User \${id}\`, email: \`user\${id}@example.com\` };
                        console.log(\`✅ User \${id} fetched:\`, user);
                        resolve(user);
                    } else {
                        const error = new Error(\`Invalid user ID: \${id}\`);
                        console.error(\`❌ Failed to fetch user \${id}:\`, error);
                        reject(error);
                    }
                }, 500);
            });
        };
        
        // Sequential async operations with logging
        const user1 = await fetchUser(1);
        console.log('User 1 processing complete');
        
        const user2 = await fetchUser(2);
        console.log('User 2 processing complete');
        
        // Parallel operations with Promise.all
        console.log('🔄 Starting parallel operations...');
        const parallelResults = await Promise.all([
            fetchUser(3),
            fetchUser(4),
            fetchUser(5)
        ]);
        
        console.log('✅ All parallel operations complete:', parallelResults.length);
        
        return { user1, user2, parallelResults };
        
    } catch (error) {
        console.error('🚨 Async operation failed:', error);
        throw error;
    } finally {
        console.log('🏁 Async debugging demo complete');
        console.groupEnd();
    }
}

debugAsyncOperations()
    .then(results => console.log('Final results:', Object.keys(results)))
    .catch(error => console.error('Top-level error:', error.message));

// Advanced Debugging Utilities
console.log('\\n=== Advanced Debugging Utilities ===');

// 1. Function call tracker
function createFunctionTracker() {
    const calls = new Map();
    
    return {
        track(functionName, args = []) {
            const timestamp = Date.now();
            const callId = \`\${functionName}_\${timestamp}\`;
            
            calls.set(callId, {
                name: functionName,
                args: [...args],
                startTime: timestamp,
                endTime: null,
                duration: null
            });
            
            console.log(\`🔍 [\${callId}] Starting \${functionName}(\`, ...args, ')')
            return callId;
        },
        
        end(callId, result) {
            if (calls.has(callId)) {
                const call = calls.get(callId);
                call.endTime = Date.now();
                call.duration = call.endTime - call.startTime;
                call.result = result;
                
                console.log(\`✅ [\${callId}] Completed in \${call.duration}ms:\`, result);
            }
        },
        
        getStats() {
            const stats = {};
            calls.forEach(call => {
                if (!stats[call.name]) {
                    stats[call.name] = {
                        count: 0,
                        totalDuration: 0,
                        averageDuration: 0
                    };
                }
                
                stats[call.name].count++;
                if (call.duration) {
                    stats[call.name].totalDuration += call.duration;
                    stats[call.name].averageDuration = 
                        stats[call.name].totalDuration / stats[call.name].count;
                }
            });
            
            return stats;
        }
    };
}

const tracker = createFunctionTracker();

function expensiveCalculation(n) {
    const callId = tracker.track('expensiveCalculation', [n]);
    
    let result = 0;
    for (let i = 0; i < n; i++) {
        result += Math.sqrt(i);
    }
    
    tracker.end(callId, result);
    return result;
}

expensiveCalculation(100000);
expensiveCalculation(50000);
console.table(tracker.getStats());

// 2. Memory usage tracker
function trackMemoryUsage(label) {
    if (performance.memory) {
        const memory = performance.memory;
        console.log(\`🧠 Memory [\${label}]:\`, {
            used: \`\${(memory.usedJSHeapSize / 1048576).toFixed(2)} MB\`,
            total: \`\${(memory.totalJSHeapSize / 1048576).toFixed(2)} MB\`,
            limit: \`\${(memory.jsHeapSizeLimit / 1048576).toFixed(2)} MB\`
        });
    } else {
        console.log('Memory tracking not available');
    }
}

trackMemoryUsage('Before large array creation');
const hugeArray = new Array(1000000).fill(0).map((_, i) => ({ id: i, data: 'x'.repeat(100) }));
trackMemoryUsage('After large array creation');

// 3. Object state inspector
function createStateInspector(obj, label = 'Object') {
    const snapshots = [];
    
    return {
        snapshot(description = 'Snapshot') {
            const snapshot = {
                timestamp: Date.now(),
                description,
                state: JSON.parse(JSON.stringify(obj)) // Deep clone
            };
            
            snapshots.push(snapshot);
            console.log(\`📸 [\${label}] \${description}:\`, snapshot.state);
            return snapshots.length - 1;
        },
        
        compare(index1, index2) {
            if (index1 >= snapshots.length || index2 >= snapshots.length) {
                console.error('Invalid snapshot indices');
                return;
            }
            
            const snap1 = snapshots[index1];
            const snap2 = snapshots[index2];
            
            console.group(\`🔍 [\${label}] Comparing snapshots\`);
            console.log('Snapshot 1:', snap1.description, snap1.state);
            console.log('Snapshot 2:', snap2.description, snap2.state);
            
            // Simple diff (for demonstration)
            const keys1 = Object.keys(snap1.state);
            const keys2 = Object.keys(snap2.state);
            
            const addedKeys = keys2.filter(k => !keys1.includes(k));
            const removedKeys = keys1.filter(k => !keys2.includes(k));
            const changedKeys = keys1.filter(k => 
                keys2.includes(k) && 
                JSON.stringify(snap1.state[k]) !== JSON.stringify(snap2.state[k])
            );
            
            if (addedKeys.length) console.log('➕ Added:', addedKeys);
            if (removedKeys.length) console.log('➖ Removed:', removedKeys);
            if (changedKeys.length) console.log('🔄 Changed:', changedKeys);
            
            console.groupEnd();
        },
        
        getHistory() {
            return snapshots;
        }
    };
}

const gameState = { player: { x: 0, y: 0, health: 100 }, score: 0, level: 1 };
const inspector = createStateInspector(gameState, 'Game State');

inspector.snapshot('Initial state');
gameState.player.x = 10;
gameState.player.y = 5;
inspector.snapshot('After movement');
gameState.score = 100;
gameState.player.health = 90;
inspector.snapshot('After scoring and damage');

inspector.compare(0, 2);

// Browser DevTools Integration
console.log('\\n=== Browser DevTools Integration ===');

// Console styling (Chrome/Firefox)
console.log('%c🎨 Styled Console Output', 
    'color: #ff6b6b; font-size: 20px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');

console.log('%cSuccess: %cOperation completed successfully', 
    'color: green; font-weight: bold;', 
    'color: black; font-weight: normal;');

console.log('%cError: %cSomething went wrong', 
    'color: red; font-weight: bold;', 
    'color: black; font-weight: normal;');

// Console.dir() for object inspection
const complexObject = {
    name: 'Complex Object',
    nested: {
        level1: {
            level2: {
                data: [1, 2, 3, { deep: 'value' }]
            }
        }
    },
    methods: {
        doSomething() { return 'done'; }
    }
};

console.log('Regular log:', complexObject);
console.dir(complexObject);

// Performance marks and measures
performance.mark('operation-start');

// Simulate some work
let sum = 0;
for (let i = 0; i < 1000000; i++) {
    sum += i;
}

performance.mark('operation-end');
performance.measure('operation-duration', 'operation-start', 'operation-end');

// Get performance data
const measures = performance.getEntriesByType('measure');
if (measures.length > 0) {
    console.log('Performance measure:', measures[measures.length - 1]);
}

// Debugging Best Practices Examples
console.log('\\n=== Debugging Best Practices ===');

// 1. Defensive programming with assertions
function divide(a, b) {
    console.assert(typeof a === 'number', 'First parameter must be a number', a);
    console.assert(typeof b === 'number', 'Second parameter must be a number', b);
    console.assert(b !== 0, 'Division by zero is not allowed', { a, b });
    
    return a / b;
}

// 2. Informative error messages
class ValidationError extends Error {
    constructor(field, value, rule) {
        super(\`Validation failed for field "\${field}": \${rule}\`);
        this.name = 'ValidationError';
        this.field = field;
        this.value = value;
        this.rule = rule;
    }
}

function validateUser(user) {
    if (!user.email || !user.email.includes('@')) {
        throw new ValidationError('email', user.email, 'must contain @ symbol');
    }
    
    if (!user.age || user.age < 18) {
        throw new ValidationError('age', user.age, 'must be 18 or older');
    }
    
    return true;
}

try {
    validateUser({ email: 'invalid-email', age: 16 });
} catch (error) {
    if (error instanceof ValidationError) {
        console.error(\`Validation Error in \${error.field}: \${error.message}\`);
    }
}

// 3. Debugging complex data structures
const nestedData = {
    users: [
        { id: 1, profile: { name: 'Alice', settings: { theme: 'dark' } } },
        { id: 2, profile: { name: 'Bob', settings: { theme: 'light' } } }
    ],
    metadata: { version: '1.0', timestamp: Date.now() }
};

// Pretty print with JSON.stringify
console.log('Formatted object:', JSON.stringify(nestedData, null, 2));

// Extract specific paths for debugging
function getNestedValue(obj, path) {
    const keys = path.split('.');
    let current = obj;
    
    for (const key of keys) {
        if (current && typeof current === 'object' && key in current) {
            current = current[key];
        } else {
            console.warn(\`Path "\${path}" not found at key "\${key}"\`);
            return undefined;
        }
    }
    
    return current;
}

console.log('Theme for user 1:', getNestedValue(nestedData, 'users.0.profile.settings.theme'));
console.log('Invalid path:', getNestedValue(nestedData, 'users.0.invalid.path'));

// 4. Conditional debugging
const DEBUG = true; // Set to false in production

function debugLog(...args) {
    if (DEBUG) {
        console.log('🐛 DEBUG:', ...args);
    }
}

function debugGroup(label, fn) {
    if (DEBUG) {
        console.group(\`🐛 DEBUG: \${label}\`);
        fn();
        console.groupEnd();
    } else {
        fn();
    }
}

debugLog('This will only show when DEBUG is true');
debugGroup('User Processing', () => {
    debugLog('Processing user data...');
    debugLog('Validation complete');
});

// Real-world Debugging Scenarios
console.log('\\n=== Real-world Debugging Scenarios ===');

// 1. API debugging wrapper
function createAPIDebugger(baseURL) {
    return {
        async request(endpoint, options = {}) {
            const url = baseURL + endpoint;
            const requestId = 'req_' + Date.now();
            
            console.group(\`🌐 API Request [\${requestId}]\`);
            console.log('URL:', url);
            console.log('Options:', options);
            
            try {
                console.time(\`Request \${requestId}\`);
                
                // Simulate fetch
                const response = await new Promise(resolve => {
                    setTimeout(() => {
                        resolve({
                            ok: Math.random() > 0.3,
                            status: Math.random() > 0.3 ? 200 : 500,
                            data: { id: 1, result: 'success' }
                        });
                    }, Math.random() * 1000);
                });
                
                console.timeEnd(\`Request \${requestId}\`);
                console.log('Response:', response);
                
                if (!response.ok) {
                    throw new Error(\`HTTP \${response.status}\`);
                }
                
                return response.data;
                
            } catch (error) {
                console.error('Request failed:', error);
                throw error;
            } finally {
                console.groupEnd();
            }
        }
    };
}

const api = createAPIDebugger('https://api.example.com');

// 2. React-style component debugging
function createComponentDebugger(componentName) {
    let renderCount = 0;
    
    return {
        logRender(props, state) {
            renderCount++;
            console.group(\`🎭 \${componentName} Render #\${renderCount}\`);
            console.log('Props:', props);
            console.log('State:', state);
            console.groupEnd();
        },
        
        logEffect(effectName, dependencies) {
            console.log(\`⚡ \${componentName} Effect: \${effectName}\`, dependencies);
        },
        
        getRenderCount() {
            return renderCount;
        }
    };
}

const componentDebugger = createComponentDebugger('UserProfile');
componentDebugger.logRender({ userId: 1 }, { loading: false });
componentDebugger.logEffect('fetchUser', [1]);

console.log('Total renders:', componentDebugger.getRenderCount());

// 3. Event debugging
function createEventDebugger() {
    const events = [];
    
    return {
        log(eventType, data, source = 'unknown') {
            const event = {
                type: eventType,
                data,
                source,
                timestamp: Date.now(),
                id: events.length + 1
            };
            
            events.push(event);
            console.log(\`📡 Event [\${event.id}] \${eventType} from \${source}:\`, data);
        },
        
        getEvents(filter) {
            if (!filter) return events;
            
            return events.filter(event => {
                if (filter.type && event.type !== filter.type) return false;
                if (filter.source && event.source !== filter.source) return false;
                if (filter.since && event.timestamp < filter.since) return false;
                return true;
            });
        },
        
        clear() {
            events.length = 0;
            console.log('📡 Event log cleared');
        }
    };
}

const eventDebugger = createEventDebugger();
eventDebugger.log('user:login', { userId: 1 }, 'auth-service');
eventDebugger.log('page:view', { path: '/dashboard' }, 'router');
eventDebugger.log('user:action', { action: 'click', element: 'button' }, 'ui');

console.table(eventDebugger.getEvents({ type: 'user:login' }));

console.log('\\n=== Debugging Tips Summary ===');
console.log('1. Use console.table() for arrays and objects');
console.log('2. Use console.group() to organize related logs');
console.log('3. Use console.time() for performance measurement');
console.log('4. Use debugger statement for breakpoints');
console.log('5. Create custom error classes with context');
console.log('6. Use console.assert() for defensive programming');
console.log('7. Implement conditional debugging for production');
console.log('8. Track function calls and performance');
console.log('9. Use performance marks for timing');
console.log('10. Create debugging wrappers for APIs and components');

console.log('Debugging examples completed');`,

  exercises: [
    {
      question: "Create a debugging utility that tracks all function calls in an object with timing and arguments:",
      solution: `function createObjectDebugger(obj, objectName = 'Object') {
  const calls = [];
  const debuggedObj = {};
  
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'function') {
      debuggedObj[key] = function(...args) {
        const startTime = performance.now();
        const callId = \`\${objectName}.\${key}_\${Date.now()}\`;
        
        console.log(\`🔍 [\${callId}] Called \${objectName}.\${key}(\`, ...args, ')')
        
        try {
          const result = value.apply(this, args);
          const duration = performance.now() - startTime;
          
          calls.push({ method: key, args, result, duration, success: true });
          console.log(\`✅ [\${callId}] Completed in \${duration.toFixed(2)}ms:\`, result);
          
          return result;
        } catch (error) {
          const duration = performance.now() - startTime;
          calls.push({ method: key, args, error: error.message, duration, success: false });
          console.error(\`❌ [\${callId}] Failed in \${duration.toFixed(2)}ms:\`, error);
          throw error;
        }
      };
    } else {
      debuggedObj[key] = value;
    }
  }
  
  debuggedObj._getDebugInfo = () => calls;
  return debuggedObj;
}`
    }
  ],

  quiz: [
    {
      question: "What is the primary purpose of console.assert()?",
      options: [
        "To stop execution like the debugger statement",
        "To log a message only if a condition is false",
        "To measure the time an operation takes",
        "To print a stack trace"
      ],
      correct: 1,
      explanation: "console.assert() logs an error message to the console if its first argument is false, making it useful for checking invariants."
    }
  ],

  resources: [
    {
      title: "MDN Console Documentation",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/console"
    },
    {
      title: "Chrome DevTools Debugging Guide",
      url: "https://developer.chrome.com/docs/devtools/javascript/"
    }
  ],

  nextModules: ['performance', 'best-practices'],
  prerequisites: ['functions-basics', 'error-handling-basics', 'async-await']
};