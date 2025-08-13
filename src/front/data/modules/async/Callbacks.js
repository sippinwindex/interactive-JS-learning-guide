// src/front/data/modules/async/Callbacks.js
export default {
  title: 'Callback Functions',
  duration: '30 min',
  difficulty: 'Beginner',
  overview: 'Master callback functions for asynchronous programming. Learn callback patterns, error handling, and understand callback hell and its solutions.',
  
  keyPoints: [
    'Callbacks enable asynchronous programming',
    'Functions passed as arguments to be called later',
    'Error-first callback convention in Node.js',
    'Callback hell makes code hard to read',
    'Modern alternatives include Promises and async/await',
    'Still important for understanding async concepts'
  ],

  example: `// Basic Callback Examples
console.log('=== Basic Callbacks ===');

// Simple callback
function greet(name, callback) {
    console.log('Hello ' + name);
    callback();
}

function afterGreeting() {
    console.log('Nice to meet you!');
}

greet('Alice', afterGreeting);

// Callback with parameters
function processData(data, callback) {
    const processed = data.map(item => item.toUpperCase());
    callback(processed);
}

processData(['apple', 'banana'], function(result) {
    console.log('Processed:', result);
});

// Asynchronous Callbacks
console.log('=== Asynchronous Callbacks ===');

// setTimeout as callback example
console.log('Before timeout');

setTimeout(function() {
    console.log('This runs after 1 second');
}, 1000);

console.log('After timeout setup');

// Multiple timeouts
function delayedGreeting(name, delay, callback) {
    setTimeout(function() {
        console.log(\`Hello \${name}!\`);
        callback();
    }, delay);
}

delayedGreeting('Bob', 500, function() {
    console.log('Greeting completed');
});

// Error-First Callbacks
console.log('=== Error-First Callbacks ===');

// Node.js style error-first callbacks
function readFile(filename, callback) {
    // Simulate file reading
    setTimeout(function() {
        if (filename === 'nonexistent.txt') {
            callback(new Error('File not found'), null);
        } else {
            callback(null, \`Contents of \${filename}\`);
        }
    }, 500);
}

// Using error-first callback
readFile('data.txt', function(error, data) {
    if (error) {
        console.error('Error reading file:', error.message);
    } else {
        console.log('File contents:', data);
    }
});

readFile('nonexistent.txt', function(error, data) {
    if (error) {
        console.error('Error reading file:', error.message);
    } else {
        console.log('File contents:', data);
    }
});

// HTTP Request with Callbacks
function makeRequest(url, callback) {
    // Simulate HTTP request
    console.log(\`Making request to \${url}\`);
    
    setTimeout(function() {
        const success = Math.random() > 0.3;
        
        if (success) {
            const data = { id: 1, name: 'Sample Data' };
            callback(null, data);
        } else {
            callback(new Error('Network error'), null);
        }
    }, Math.random() * 1000);
}

makeRequest('https://api.example.com/data', function(error, data) {
    if (error) {
        console.error('Request failed:', error.message);
    } else {
        console.log('Request successful:', data);
    }
});

// Callback Hell Example
console.log('=== Callback Hell ===');

// Deeply nested callbacks - hard to read and maintain
function callbackHellExample() {
    setTimeout(function() {
        console.log('Step 1 completed');
        
        setTimeout(function() {
            console.log('Step 2 completed');
            
            setTimeout(function() {
                console.log('Step 3 completed');
                
                setTimeout(function() {
                    console.log('Step 4 completed');
                    
                    setTimeout(function() {
                        console.log('All steps completed!');
                    }, 100);
                }, 100);
            }, 100);
        }, 100);
    }, 100);
}

callbackHellExample();

// Better approach - named functions
function step1(callback) {
    setTimeout(function() {
        console.log('Step 1 completed (better)');
        callback();
    }, 100);
}

function step2(callback) {
    setTimeout(function() {
        console.log('Step 2 completed (better)');
        callback();
    }, 100);
}

function step3(callback) {
    setTimeout(function() {
        console.log('Step 3 completed (better)');
        callback();
    }, 100);
}

function betterCallbackExample() {
    step1(function() {
        step2(function() {
            step3(function() {
                console.log('All steps completed (better approach)!');
            });
        });
    });
}

setTimeout(betterCallbackExample, 1000);

// Event Listeners as Callbacks
console.log('=== Event Callbacks ===');

// Simulating event system
class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
}

const emitter = new EventEmitter();

// Register callbacks
emitter.on('data', function(data) {
    console.log('Received data:', data);
});

emitter.on('data', function(data) {
    console.log('Processing data:', data.toUpperCase());
});

emitter.on('error', function(error) {
    console.error('Error occurred:', error.message);
});

// Emit events
emitter.emit('data', 'hello world');
emitter.emit('error', new Error('Something went wrong'));

// Array Methods with Callbacks
console.log('=== Array Callbacks ===');

const numbers = [1, 2, 3, 4, 5];

// forEach callback
numbers.forEach(function(number, index) {
    console.log(\`Item \${index}: \${number}\`);
});

// map callback
const doubled = numbers.map(function(number) {
    return number * 2;
});
console.log('Doubled:', doubled);

// filter callback
const evens = numbers.filter(function(number) {
    return number % 2 === 0;
});
console.log('Evens:', evens);

// reduce callback
const sum = numbers.reduce(function(accumulator, current) {
    return accumulator + current;
}, 0);
console.log('Sum:', sum);

// Custom callback-based utilities
console.log('=== Custom Utilities ===');

// Utility function that accepts callbacks
function retry(operation, maxAttempts, callback) {
    let attempts = 0;
    
    function attempt() {
        attempts++;
        
        operation(function(error, result) {
            if (error && attempts < maxAttempts) {
                console.log(\`Attempt \${attempts} failed, retrying...\`);
                setTimeout(attempt, 1000);
            } else {
                callback(error, result);
            }
        });
    }
    
    attempt();
}

// Flaky operation for testing retry
function flakyOperation(callback) {
    setTimeout(function() {
        if (Math.random() > 0.7) {
            callback(null, 'Success!');
        } else {
            callback(new Error('Random failure'), null);
        }
    }, 500);
}

retry(flakyOperation, 3, function(error, result) {
    if (error) {
        console.log('Operation failed after all attempts:', error.message);
    } else {
        console.log('Operation succeeded:', result);
    }
});

// Parallel callbacks
function parallel(tasks, callback) {
    const results = [];
    let completed = 0;
    let hasError = false;
    
    tasks.forEach(function(task, index) {
        task(function(error, result) {
            if (hasError) return;
            
            if (error) {
                hasError = true;
                callback(error, null);
                return;
            }
            
            results[index] = result;
            completed++;
            
            if (completed === tasks.length) {
                callback(null, results);
            }
        });
    });
}

// Example parallel tasks
const task1 = function(callback) {
    setTimeout(() => callback(null, 'Task 1 result'), 100);
};

const task2 = function(callback) {
    setTimeout(() => callback(null, 'Task 2 result'), 200);
};

const task3 = function(callback) {
    setTimeout(() => callback(null, 'Task 3 result'), 150);
};

parallel([task1, task2, task3], function(error, results) {
    if (error) {
        console.error('Parallel execution failed:', error.message);
    } else {
        console.log('Parallel results:', results);
    }
});

// Sequential callbacks
function series(tasks, callback) {
    const results = [];
    let currentIndex = 0;
    
    function runNext() {
        if (currentIndex >= tasks.length) {
            callback(null, results);
            return;
        }
        
        const currentTask = tasks[currentIndex];
        currentTask(function(error, result) {
            if (error) {
                callback(error, null);
                return;
            }
            
            results.push(result);
            currentIndex++;
            runNext();
        });
    }
    
    runNext();
}

// Example sequential tasks
const seqTask1 = function(callback) {
    setTimeout(() => {
        console.log('Sequential task 1');
        callback(null, 'Seq Task 1 result');
    }, 100);
};

const seqTask2 = function(callback) {
    setTimeout(() => {
        console.log('Sequential task 2');
        callback(null, 'Seq Task 2 result');
    }, 100);
};

const seqTask3 = function(callback) {
    setTimeout(() => {
        console.log('Sequential task 3');
        callback(null, 'Seq Task 3 result');
    }, 100);
};

series([seqTask1, seqTask2, seqTask3], function(error, results) {
    if (error) {
        console.error('Series execution failed:', error.message);
    } else {
        console.log('Series results:', results);
    }
});

// Callback-based timer utilities
console.log('=== Timer Utilities ===');

function delay(ms, callback) {
    setTimeout(callback, ms);
}

function interval(ms, callback, duration) {
    const intervalId = setInterval(callback, ms);
    
    if (duration) {
        setTimeout(function() {
            clearInterval(intervalId);
        }, duration);
    }
    
    return intervalId;
}

// Usage
delay(500, function() {
    console.log('Delayed execution');
});

let counter = 0;
interval(200, function() {
    counter++;
    console.log(\`Interval tick: \${counter}\`);
}, 1000); // Run for 1 second

// Converting callbacks to different patterns
console.log('=== Callback Patterns ===');

// Promisify a callback-based function
function promisify(callbackFunction) {
    return function(...args) {
        return new Promise(function(resolve, reject) {
            callbackFunction(...args, function(error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    };
}

// Convert our readFile function to Promise-based
const readFilePromise = promisify(readFile);

// Now can use with .then()
readFilePromise('data.txt')
    .then(function(data) {
        console.log('Promise-based file read:', data);
    })
    .catch(function(error) {
        console.error('Promise-based error:', error.message);
    });

// Callback memoization
function memoizeCallback(fn) {
    const cache = new Map();
    
    return function(...args) {
        const callback = args[args.length - 1];
        const key = JSON.stringify(args.slice(0, -1));
        
        if (cache.has(key)) {
            console.log('Cache hit for callback');
            setTimeout(() => callback(null, cache.get(key)), 0);
            return;
        }
        
        const originalCallback = callback;
        args[args.length - 1] = function(error, result) {
            if (!error) {
                cache.set(key, result);
            }
            originalCallback(error, result);
        };
        
        fn.apply(this, args);
    };
}

// Memoized version of our file reader
const memoizedReadFile = memoizeCallback(readFile);

memoizedReadFile('data.txt', function(error, data) {
    console.log('First memoized call:', data);
});

memoizedReadFile('data.txt', function(error, data) {
    console.log('Second memoized call (cached):', data);
});

// Error handling patterns
console.log('=== Error Handling Patterns ===');

// Safe callback execution
function safeCallback(callback, error, result) {
    if (typeof callback === 'function') {
        try {
            callback(error, result);
        } catch (callbackError) {
            console.error('Callback execution failed:', callbackError);
        }
    }
}

// Once wrapper - ensures callback is called only once
function once(callback) {
    let called = false;
    
    return function(error, result) {
        if (!called) {
            called = true;
            callback(error, result);
        }
    };
}

// Function that might call callback multiple times (buggy)
function buggyFunction(callback) {
    setTimeout(() => callback(null, 'First call'), 100);
    setTimeout(() => callback(null, 'Second call'), 200);
}

// Protected version
const protectedCallback = once(function(error, result) {
    console.log('Once callback:', result);
});

buggyFunction(protectedCallback); // Only first call will execute

// Timeout wrapper for callbacks
function withTimeout(fn, timeoutMs) {
    return function(...args) {
        const callback = args[args.length - 1];
        let timeoutId;
        let completed = false;
        
        // Replace callback with timeout-aware version
        args[args.length - 1] = function(error, result) {
            if (!completed) {
                completed = true;
                clearTimeout(timeoutId);
                callback(error, result);
            }
        };
        
        // Set timeout
        timeoutId = setTimeout(function() {
            if (!completed) {
                completed = true;
                callback(new Error('Operation timed out'), null);
            }
        }, timeoutMs);
        
        // Execute original function
        fn.apply(this, args);
    };
}

// Create timeout version of slow operation
const slowOperation = function(callback) {
    setTimeout(() => callback(null, 'Slow result'), 2000);
};

const timeoutOperation = withTimeout(slowOperation, 1000);

timeoutOperation(function(error, result) {
    if (error) {
        console.log('Timeout error:', error.message);
    } else {
        console.log('Timeout result:', result);
    }
});

console.log('Callback examples completed');`,

  exercises: [
    {
      question: "Create a function that executes multiple callbacks in sequence with error handling:",
      solution: `function sequence(tasks, finalCallback) {
  let index = 0;
  const results = [];
  
  function next() {
    if (index >= tasks.length) {
      finalCallback(null, results);
      return;
    }
    
    tasks[index]((error, result) => {
      if (error) {
        finalCallback(error, null);
        return;
      }
      
      results.push(result);
      index++;
      next();
    });
  }
  
  next();
}`,
      explanation: "Use a recursive approach to execute callbacks one after another, stopping on first error."
    }
  ],

  quiz: [
    {
      question: "What is 'callback hell' and why is it problematic?",
      options: [
        "Callbacks that throw errors",
        "Too many nested callbacks making code hard to read",
        "Callbacks that run too slowly",
        "Callbacks that don't return values"
      ],
      correct: 1,
      explanation: "Callback hell refers to deeply nested callbacks that make code difficult to read, understand, and maintain."
    }
  ],

  resources: [
    {
      title: "MDN - Callback Function",
      url: "https://developer.mozilla.org/en-US/docs/Glossary/Callback_function"
    }
  ],

  nextModules: ['promises'],
  prerequisites: ['functions-basics', 'first-class-functions']
};

// src/front/data/modules/async/Promises.js
export const Promises = {
  title: 'JavaScript Promises',
  duration: '40 min',
  difficulty: 'Intermediate',
  overview: 'Master JavaScript Promises for handling asynchronous operations. Learn Promise creation, chaining, error handling, and advanced patterns.',

  keyPoints: [
    'Promises represent eventual completion of asynchronous operations',
    'Three states: pending, fulfilled, rejected',
    'Use .then() for handling success, .catch() for errors',
    'Promise.all() waits for all promises to complete',
    'Promise.race() returns when first promise settles',
    'Always handle promise rejections to avoid uncaught errors'
  ],

  example: `// Creating Promises
console.log('=== Creating Promises ===');

// Basic Promise creation
const simplePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = Math.random() > 0.5;
        if (success) {
            resolve('Operation successful!');
        } else {
            reject(new Error('Operation failed!'));
        }
    }, 1000);
});

// Using the promise
simplePromise
    .then(result => {
        console.log('Promise resolved:', result);
    })
    .catch(error => {
        console.error('Promise rejected:', error.message);
    });

// Promise that always resolves
const resolvedPromise = Promise.resolve('Already resolved');
resolvedPromise.then(value => console.log('Resolved value:', value));

// Promise that always rejects
const rejectedPromise = Promise.reject(new Error('Already rejected'));
rejectedPromise.catch(error => console.log('Rejected error:', error.message));

// Function that returns a Promise
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        console.log(\`Fetching user \${userId}...\`);
        
        setTimeout(() => {
            if (userId > 0) {
                const userData = {
                    id: userId,
                    name: \`User \${userId}\`,
                    email: \`user\${userId}@example.com\`
                };
                resolve(userData);
            } else {
                reject(new Error('Invalid user ID'));
            }
        }, 500);
    });
}

// Promise Chaining
console.log('=== Promise Chaining ===');

fetchUserData(1)
    .then(user => {
        console.log('Got user:', user.name);
        return user.email; // Return value for next .then()
    })
    .then(email => {
        console.log('User email:', email);
        return fetchUserPreferences(email);
    })
    .then(preferences => {
        console.log('User preferences:', preferences);
        return processPreferences(preferences);
    })
    .then(processed => {
        console.log('Processed preferences:', processed);
    })
    .catch(error => {
        console.error('Chain error:', error.message);
    })
    .finally(() => {
        console.log('Promise chain completed');
    });

function fetchUserPreferences(email) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                theme: 'dark',
                language: 'en',
                notifications: true
            });
        }, 300);
    });
}

function processPreferences(prefs) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                ...prefs,
                processed: true,
                timestamp: new Date().toISOString()
            });
        }, 200);
    });
}

// Promise.all() - Wait for all promises
console.log('=== Promise.all() ===');

const userIds = [1, 2, 3];
const userPromises = userIds.map(id => fetchUserData(id));

Promise.all(userPromises)
    .then(users => {
        console.log('All users loaded:');
        users.forEach(user => console.log(\`- \${user.name}\`));
    })
    .catch(error => {
        console.error('Failed to load all users:', error.message);
    });

// Multiple different promises
const mixedPromises = [
    fetchUserData(4),
    Promise.resolve('Static data'),
    new Promise(resolve => setTimeout(() => resolve('Delayed data'), 400))
];

Promise.all(mixedPromises)
    .then(results => {
        console.log('Mixed results:', results);
    })
    .catch(error => {
        console.error('Mixed promises error:', error.message);
    });

// Promise.allSettled() - Get all results regardless of success/failure
console.log('=== Promise.allSettled() ===');

const settledPromises = [
    fetchUserData(5),
    fetchUserData(-1), // This will reject
    fetchUserData(6)
];

Promise.allSettled(settledPromises)
    .then(results => {
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(\`Promise \${index + 1} fulfilled:\`, result.value.name);
            } else {
                console.log(\`Promise \${index + 1} rejected:\`, result.reason.message);
            }
        });
    });

// Promise.race() - First to complete wins
console.log('=== Promise.race() ===');

const timeoutPromise = new Promise((_, reject) => {
    setTimeout(() => reject(new Error('Timeout')), 2000);
});

const dataPromise = new Promise(resolve => {
    setTimeout(() => resolve('Data loaded'), Math.random() * 3000);
});

Promise.race([dataPromise, timeoutPromise])
    .then(result => {
        console.log('Race winner:', result);
    })
    .catch(error => {
        console.error('Race failed:', error.message);
    });

// Practical Examples
console.log('=== Practical Examples ===');

// 1. HTTP Request simulation
function httpRequest(url, options = {}) {
    return new Promise((resolve, reject) => {
        console.log(\`Making request to \${url}\`);
        
        setTimeout(() => {
            const success = Math.random() > 0.2;
            
            if (success) {
                resolve({
                    status: 200,
                    data: { message: 'Request successful', url }
                });
            } else {
                reject({
                    status: 500,
                    error: 'Server error'
                });
            }
        }, Math.random() * 1000);
    });
}

httpRequest('/api/users')
    .then(response => {
        console.log('HTTP success:', response.data);
    })
    .catch(error => {
        console.error('HTTP error:', error.error);
    });

// 2. Retry mechanism with Promises
function retryPromise(promiseFactory, maxRetries = 3, delay = 1000) {
    return new Promise((resolve, reject) => {
        let attempts = 0;
        
        function attempt() {
            attempts++;
            
            promiseFactory()
                .then(resolve)
                .catch(error => {
                    if (attempts < maxRetries) {
                        console.log(\`Attempt \${attempts} failed, retrying in \${delay}ms...\`);
                        setTimeout(attempt, delay);
                    } else {
                        reject(error);
                    }
                });
        }
        
        attempt();
    });
}

// Flaky operation for testing retry
function flakyOperation() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.7) {
                resolve('Success after retry!');
            } else {
                reject(new Error('Random failure'));
            }
        }, 300);
    });
}

retryPromise(flakyOperation, 3, 500)
    .then(result => {
        console.log('Retry success:', result);
    })
    .catch(error => {
        console.error('All retries failed:', error.message);
    });

// 3. Promise-based delay utility
function delay(ms, value) {
    return new Promise(resolve => {
        setTimeout(() => resolve(value), ms);
    });
}

// Usage in chains
delay(500, 'First')
    .then(value => {
        console.log('Delayed value 1:', value);
        return delay(300, 'Second');
    })
    .then(value => {
        console.log('Delayed value 2:', value);
        return delay(200, 'Third');
    })
    .then(value => {
        console.log('Delayed value 3:', value);
    });

// 4. Promise-based queue/sequence
class PromiseQueue {
    constructor() {
        this.queue = [];
        this.running = false;
    }
    
    add(promiseFactory) {
        return new Promise((resolve, reject) => {
            this.queue.push({
                promiseFactory,
                resolve,
                reject
            });
            
            this.process();
        });
    }
    
    async process() {
        if (this.running || this.queue.length === 0) {
            return;
        }
        
        this.running = true;
        
        while (this.queue.length > 0) {
            const { promiseFactory, resolve, reject } = this.queue.shift();
            
            try {
                const result = await promiseFactory();
                resolve(result);
            } catch (error) {
                reject(error);
            }
        }
        
        this.running = false;
    }
}

const queue = new PromiseQueue();

// Add tasks to queue
queue.add(() => delay(200, 'Task 1'))
    .then(result => console.log('Queue result:', result));

queue.add(() => delay(100, 'Task 2'))
    .then(result => console.log('Queue result:', result));

queue.add(() => delay(300, 'Task 3'))
    .then(result => console.log('Queue result:', result));

// 5. Promise memoization
function memoizePromise(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log('Returning cached promise');
            return cache.get(key);
        }
        
        const promise = fn.apply(this, args);
        cache.set(key, promise);
        
        // Remove from cache if promise rejects
        promise.catch(() => cache.delete(key));
        
        return promise;
    };
}

const memoizedFetch = memoizePromise(httpRequest);

memoizedFetch('/api/data')
    .then(result => console.log('First memoized call:', result.data));

memoizedFetch('/api/data')
    .then(result => console.log('Second memoized call (cached):', result.data));

// Error Handling Patterns
console.log('=== Error Handling ===');

// Promise with multiple error types
function complexOperation() {
    return new Promise((resolve, reject) => {
        const errorType = Math.random();
        
        setTimeout(() => {
            if (errorType < 0.3) {
                reject(new TypeError('Type error occurred'));
            } else if (errorType < 0.6) {
                reject(new ReferenceError('Reference error occurred'));
            } else if (errorType < 0.8) {
                reject(new Error('Generic error occurred'));
            } else {
                resolve('Operation completed successfully');
            }
        }, 300);
    });
}

complexOperation()
    .then(result => {
        console.log('Complex operation result:', result);
    })
    .catch(error => {
        if (error instanceof TypeError) {
            console.error('Type error handled:', error.message);
        } else if (error instanceof ReferenceError) {
            console.error('Reference error handled:', error.message);
        } else {
            console.error('Generic error handled:', error.message);
        }
    });

// Promise chain error handling
function stepOne() {
    return Promise.resolve('Step 1 complete');
}

function stepTwo() {
    return Promise.reject(new Error('Step 2 failed'));
}

function stepThree() {
    return Promise.resolve('Step 3 complete');
}

stepOne()
    .then(result => {
        console.log('Step 1:', result);
        return stepTwo();
    })
    .then(result => {
        console.log('Step 2:', result);
        return stepThree();
    })
    .then(result => {
        console.log('Step 3:', result);
    })
    .catch(error => {
        console.error('Chain failed at:', error.message);
        // Can recover and continue
        return stepThree();
    })
    .then(result => {
        if (result) {
            console.log('Recovered with:', result);
        }
    });

// Converting callbacks to Promises
console.log('=== Converting Callbacks ===');

// Promisify utility
function promisify(callbackFn) {
    return function(...args) {
        return new Promise((resolve, reject) => {
            callbackFn(...args, (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    };
}

// Example callback function
function callbackFunction(data, callback) {
    setTimeout(() => {
        if (data) {
            callback(null, \`Processed: \${data}\`);
        } else {
            callback(new Error('No data provided'), null);
        }
    }, 200);
}

// Convert to Promise
const promisifiedFunction = promisify(callbackFunction);

promisifiedFunction('test data')
    .then(result => console.log('Promisified result:', result))
    .catch(error => console.error('Promisified error:', error.message));

// Promise performance considerations
console.log('=== Performance Tips ===');

// Avoid unnecessary Promise creation
const cachedResults = new Map();

function efficientFetch(url) {
    if (cachedResults.has(url)) {
        return Promise.resolve(cachedResults.get(url));
    }
    
    return httpRequest(url)
        .then(result => {
            cachedResults.set(url, result);
            return result;
        });
}

// Parallel vs Sequential execution
async function sequentialExample() {
    console.time('Sequential');
    
    const result1 = await delay(100, 'Result 1');
    const result2 = await delay(100, 'Result 2');
    const result3 = await delay(100, 'Result 3');
    
    console.timeEnd('Sequential');
    return [result1, result2, result3];
}

async function parallelExample() {
    console.time('Parallel');
    
    const results = await Promise.all([
        delay(100, 'Result 1'),
        delay(100, 'Result 2'),
        delay(100, 'Result 3')
    ]);
    
    console.timeEnd('Parallel');
    return results;
}

// Run both examples
sequentialExample().then(results => 
    console.log('Sequential results:', results)
);

parallelExample().then(results => 
    console.log('Parallel results:', results)
);

console.log('Promise examples completed');`,

  exercises: [
    {
      question: "Create a function that resolves after a random delay between min and max milliseconds:",
      solution: `function randomDelay(min, max, value) {
  return new Promise(resolve => {
    const delay = Math.random() * (max - min) + min;
    setTimeout(() => resolve(value), delay);
  });
}

// Usage:
randomDelay(1000, 3000, 'Done!')
  .then(result => console.log(result));`,
      explanation: "Calculate random delay within range and use setTimeout to resolve the promise after that time."
    }
  ],

  quiz: [
    {
      question: "What happens if you don't provide a .catch() handler for a rejected Promise?",
      options: [
        "The promise resolves automatically",
        "Nothing happens",
        "You get an 'Uncaught Promise rejection' error",
        "The promise retries automatically"
      ],
      correct: 2,
      explanation: "Unhandled promise rejections cause 'Uncaught Promise rejection' errors which can crash Node.js applications."
    }
  ],

  resources: [
    {
      title: "MDN - Promise",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
    }
  ],

  nextModules: ['async-await'],
  prerequisites: ['callbacks']
};

// src/front/data/modules/oop/ObjectCreation.js
export const ObjectCreation = {
  title: 'Object Creation Patterns',
  duration: '35 min',
  difficulty: 'Intermediate',
  overview: 'Master different ways to create objects in JavaScript. Learn object literals, constructor functions, factory functions, and Object.create().',
  
  keyPoints: [
    'Multiple ways to create objects in JavaScript',
    'Object literals for simple objects',
    'Constructor functions for object blueprints',
    'Factory functions for flexible object creation',
    'Object.create() for precise prototype control',
    'Each pattern has specific use cases and trade-offs'
  ],

  example: `// Object Literal Pattern
console.log('=== Object Literal Pattern ===');

// Simple object literal
const person1 = {
    name: 'Alice',
    age: 30,
    city: 'New York',
    
    greet: function() {
        return \`Hello, I'm \${this.name}\`;
    },
    
    getInfo: function() {
        return \`\${this.name}, \${this.age} years old, from \${this.city}\`;
    }
};

console.log(person1.greet());
console.log(person1.getInfo());

// Object literal with computed properties
const dynamicKey = 'favoriteColor';
const person2 = {
    name: 'Bob',
    age: 25,
    [dynamicKey]: 'blue',
    [\`is\${person1.name}Friend\`]: true
};

console.log('Person 2:', person2);

// Constructor Function Pattern
console.log('=== Constructor Function Pattern ===');

function Person(name, age, city) {
    this.name = name;
    this.age = age;
    this.city = city;
    
    // Method defined in constructor (not recommended for performance)
    this.greet = function() {
        return \`Hello, I'm \${this.name}\`;
    };
}

// Methods on prototype (recommended)
Person.prototype.getInfo = function() {
    return \`\${this.name}, \${this.age} years old, from \${this.city}\`;
};

Person.prototype.haveBirthday = function() {
    this.age++;
    console.log(\`Happy birthday \${this.name}! Now \${this.age} years old.\`);
};

// Creating instances
const person3 = new Person('Charlie', 28, 'Boston');
const person4 = new Person('Diana', 32, 'Seattle');

console.log(person3.greet());
console.log(person4.getInfo());
person3.haveBirthday();

// Checking instance
console.log('person3 instanceof Person:', person3 instanceof Person);
console.log('person3.constructor:', person3.constructor.name);

// Factory Function Pattern
console.log('=== Factory Function Pattern ===');

function createPerson(name, age, city) {
    return {
        name: name,
        age: age,
        city: city,
        
        greet() {
            return \`Hello, I'm \${this.name}\`;
        },
        
        getInfo() {
            return \`\${this.name}, \${this.age} years old, from \${this.city}\`;
        },
        
        haveBirthday() {
            this.age++;
            console.log(\`Happy birthday \${this.name}! Now \${this.age} years old.\`);
        }
    };
}

const person5 = createPerson('Eve', 27, 'Chicago');
const person6 = createPerson('Frank', 35, 'Miami');

console.log(person5.greet());
console.log(person6.getInfo());

// Factory with private variables
function createBankAccount(initialBalance = 0) {
    let balance = initialBalance;
    let transactionHistory = [];
    
    return {
        deposit(amount) {
            if (amount > 0) {
                balance += amount;
                transactionHistory.push({ type: 'deposit', amount, date: new Date() });
                return balance;
            }
            throw new Error('Deposit amount must be positive');
        },
        
        withdraw(amount) {
            if (amount > 0 && amount <= balance) {
                balance -= amount;
                transactionHistory.push({ type: 'withdraw', amount, date: new Date() });
                return balance;
            }
            throw new Error('Invalid withdrawal amount');
        },
        
        getBalance() {
            return balance;
        },
        
        getHistory() {
            return [...transactionHistory]; // Return copy
        }
    };
}

const account1 = createBankAccount(1000);
account1.deposit(500);
account1.withdraw(200);
console.log('Account balance:', account1.getBalance());
console.log('Account history:', account1.getHistory());

// Object.create() Pattern
console.log('=== Object.create() Pattern ===');

// Create object with specific prototype
const personPrototype = {
    greet() {
        return \`Hello, I'm \${this.name}\`;
    },
    
    getInfo() {
        return \`\${this.name}, \${this.age} years old, from \${this.city}\`;
    }
};

const person7 = Object.create(personPrototype);
person7.name = 'Grace';
person7.age = 29;
person7.city = 'Denver';

console.log(person7.greet());
console.log('person7 prototype:', Object.getPrototypeOf(person7) === personPrototype);

// Object.create() with property descriptors
const person8 = Object.create(personPrototype, {
    name: {
        value: 'Henry',
        writable: true,
        enumerable: true,
        configurable: true
    },
    age: {
        value: 31,
        writable: true,
        enumerable: true,
        configurable: true
    },
    city: {
        value: 'Portland',
        writable: true,
        enumerable: true,
        configurable: true
    }
});

console.log(person8.getInfo());

// Class Pattern (ES6+)
console.log('=== Class Pattern ===');

class ModernPerson {
    constructor(name, age, city) {
        this.name = name;
        this.age = age;
        this.city = city;
    }
    
    greet() {
        return \`Hello, I'm \${this.name}\`;
    }
    
    getInfo() {
        return \`\${this.name}, \${this.age} years old, from \${this.city}\`;
    }
    
    haveBirthday() {
        this.age++;
        console.log(\`Happy birthday \${this.name}! Now \${this.age} years old.\`);
    }
    
    // Static method
    static createFromString(str) {
        const [name, age, city] = str.split(',');
        return new ModernPerson(name.trim(), parseInt(age.trim()), city.trim());
    }
    
    // Getter and setter
    get displayName() {
        return \`\${this.name} from \${this.city}\`;
    }
    
    set displayName(value) {
        const [name, city] = value.split(' from ');
        this.name = name;
        this.city = city;
    }
}

const person9 = new ModernPerson('Ivy', 26, 'Austin');
console.log(person9.greet());
console.log('Display name:', person9.displayName);

const person10 = ModernPerson.createFromString('Jack, 33, Phoenix');
console.log(person10.getInfo());

// Mixin Pattern
console.log('=== Mixin Pattern ===');

const canWalk = {
    walk() {
        return \`\${this.name} is walking\`;
    }
};

const canSwim = {
    swim() {
        return \`\${this.name} is swimming\`;
    }
};

const canFly = {
    fly() {
        return \`\${this.name} is flying\`;
    }
};

// Mixin function
function mixin(target, ...sources) {
    Object.assign(target, ...sources);
    return target;
}

// Create objects with mixins
const duck = mixin({
    name: 'Duck'
}, canWalk, canSwim, canFly);

const fish = mixin({
    name: 'Fish'
}, canSwim);

console.log(duck.walk());
console.log(duck.swim());
console.log(duck.fly());
console.log(fish.swim());

// Advanced Factory Pattern
console.log('=== Advanced Factory Pattern ===');

function createAdvancedPerson(config) {
    // Default configuration
    const defaults = {
        name: 'Unknown',
        age: 0,
        city: 'Unknown',
        skills: [],
        isEmployed: false
    };
    
    // Merge configuration
    const settings = { ...defaults, ...config };
    
    // Private methods
    function validateAge(age) {
        return age >= 0 && age <= 150;
    }
    
    function validateSkill(skill) {
        return typeof skill === 'string' && skill.length > 0;
    }
    
    // Return public interface
    return {
        // Public properties
        get name() { return settings.name; },
        set name(value) { settings.name = value; },
        
        get age() { return settings.age; },
        set age(value) {
            if (validateAge(value)) {
                settings.age = value;
            } else {
                throw new Error('Invalid age');
            }
        },
        
        get city() { return settings.city; },
        set city(value) { settings.city = value; },
        
        // Public methods
        addSkill(skill) {
            if (validateSkill(skill) && !settings.skills.includes(skill)) {
                settings.skills.push(skill);
            }
        },
        
        removeSkill(skill) {
            const index = settings.skills.indexOf(skill);
            if (index > -1) {
                settings.skills.splice(index, 1);
            }
        },
        
        getSkills() {
            return [...settings.skills]; // Return copy
        },
        
        employ() {
            settings.isEmployed = true;
        },
        
        unemploy() {
            settings.isEmployed = false;
        },
        
        getStatus() {
            return {
                name: settings.name,
                age: settings.age,
                city: settings.city,
                skills: [...settings.skills],
                isEmployed: settings.isEmployed
            };
        }
    };
}

const advancedPerson = createAdvancedPerson({
    name: 'Karen',
    age: 30,
    city: 'San Francisco',
    skills: ['JavaScript', 'Python']
});

advancedPerson.addSkill('React');
advancedPerson.employ();

console.log('Advanced person status:', advancedPerson.getStatus());

// Singleton Pattern
console.log('=== Singleton Pattern ===');

const DatabaseConnection = (function() {
    let instance;
    
    function createInstance() {
        return {
            connection: 'Database connection established',
            
            query(sql) {
                return \`Executing: \${sql}\`;
            },
            
            close() {
                console.log('Database connection closed');
            }
        };
    }
    
    return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

const db1 = DatabaseConnection.getInstance();
const db2 = DatabaseConnection.getInstance();

console.log('Same instance:', db1 === db2);
console.log('Query result:', db1.query('SELECT * FROM users'));

// Builder Pattern
console.log('=== Builder Pattern ===');

class PersonBuilder {
    constructor() {
        this.person = {};
    }
    
    setName(name) {
        this.person.name = name;
        return this;
    }
    
    setAge(age) {
        this.person.age = age;
        return this;
    }
    
    setCity(city) {
        this.person.city = city;
        return this;
    }
    
    addSkill(skill) {
        if (!this.person.skills) {
            this.person.skills = [];
        }
        this.person.skills.push(skill);
        return this;
    }
    
    setEmployed(employed = true) {
        this.person.isEmployed = employed;
        return this;
    }
    
    build() {
        return { ...this.person };
    }
}

const builtPerson = new PersonBuilder()
    .setName('Laura')
    .setAge(28)
    .setCity('Los Angeles')
    .addSkill('Design')
    .addSkill('Photography')
    .setEmployed(true)
    .build();

console.log('Built person:', builtPerson);

// Performance Comparison
console.log('=== Performance Comparison ===');

// Measure creation time for different patterns
function measureCreation(createFn, name, iterations = 100000) {
    console.time(name);
    
    for (let i = 0; i < iterations; i++) {
        createFn(\`Name\${i}\`, 25 + (i % 50), 'TestCity');
    }
    
    console.timeEnd(name);
}

// Test different patterns
function createWithLiteral(name, age, city) {
    return {
        name,
        age,
        city,
        greet() { return \`Hello, I'm \${this.name}\`; }
    };
}

function createWithConstructor(name, age, city) {
    return new Person(name, age, city);
}

function createWithFactory(name, age, city) {
    return createPerson(name, age, city);
}

function createWithClass(name, age, city) {
    return new ModernPerson(name, age, city);
}

// Run performance tests
console.log('Performance tests (100,000 iterations):');
measureCreation(createWithLiteral, 'Object Literal');
measureCreation(createWithConstructor, 'Constructor Function');
measureCreation(createWithFactory, 'Factory Function');
measureCreation(createWithClass, 'ES6 Class');

console.log('Object creation patterns completed');`,

  exercises: [
    {
      question: "Create a factory function that returns objects with private variables and public methods:",
      solution: `function createCounter(initialValue = 0) {
  let count = initialValue;
  
  return {
    increment() {
      count++;
      return count;
    },
    
    decrement() {
      count--;
      return count;
    },
    
    getValue() {
      return count;
    },
    
    reset() {
      count = initialValue;
      return count;
    }
  };
}

const counter = createCounter(10);
console.log(counter.increment()); // 11
console.log(counter.getValue());  // 11`,
      explanation: "Factory functions can create closures to encapsulate private variables while exposing public methods."
    }
  ],

  quiz: [
    {
      question: "What's the main advantage of the factory function pattern over constructor functions?",
      options: [
        "Faster execution",
        "Can return different object types and doesn't require 'new'",
        "Uses less memory",
        "Better browser support"
      ],
      correct: 1,
      explanation: "Factory functions can return any type of object and don't require the 'new' keyword, making them more flexible."
    }
  ],

  resources: [
    {
      title: "MDN - Object Creation",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects"
    }
  ],

  nextModules: ['prototypes'],
  prerequisites: ['functions-basics', 'objects-basics']
};