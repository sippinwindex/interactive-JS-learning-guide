// src/front/data/modules/async/Promises.js
export default {
  title: 'Promises',
  duration: '45 min',
  difficulty: 'Intermediate',
  overview: 'Master JavaScript Promises for handling asynchronous operations. Learn Promise creation, chaining, error handling, and advanced patterns.',
  
  keyPoints: [
    'Promises represent eventual completion of async operations',
    'Three states: pending, fulfilled, rejected',
    'Promise.then() and Promise.catch() for handling results',
    'Promise chaining for sequential operations',
    'Promise.all(), Promise.race(), Promise.allSettled()',
    'Error propagation and proper error handling'
  ],

  example: `// Promise Basics
console.log('=== Promise Basics ===');

// Creating a basic Promise
const basicPromise = new Promise((resolve, reject) => {
    const success = Math.random() > 0.5;
    
    setTimeout(() => {
        if (success) {
            resolve('Operation successful!');
        } else {
            reject(new Error('Operation failed!'));
        }
    }, 1000);
});

// Handling Promise results
basicPromise
    .then(result => {
        console.log('✅ Success:', result);
    })
    .catch(error => {
        console.log('❌ Error:', error.message);
    });

// Promise States Demo
console.log('\\n=== Promise States ===');

function demonstrateStates() {
    const pendingPromise = new Promise((resolve) => {
        setTimeout(() => resolve('Resolved after 2 seconds'), 2000);
    });
    
    console.log('Initial state: pending');
    console.log('Promise:', pendingPromise);
    
    pendingPromise.then(result => {
        console.log('Final state: fulfilled');
        console.log('Result:', result);
    });
}

demonstrateStates();

// Immediate Promise Resolution
console.log('\\n=== Immediate Promises ===');

const resolvedPromise = Promise.resolve('Immediately resolved');
const rejectedPromise = Promise.reject(new Error('Immediately rejected'));

resolvedPromise.then(console.log);
rejectedPromise.catch(error => console.log('Caught:', error.message));

// Promise Chaining
console.log('\\n=== Promise Chaining ===');

function fetchUser(id) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ id, name: \`User \${id}\`, email: \`user\${id}@example.com\` });
        }, 500);
    });
}

function fetchUserPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: 'First Post', userId },
                { id: 2, title: 'Second Post', userId }
            ]);
        }, 300);
    });
}

function fetchPostComments(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, text: 'Great post!', postId },
                { id: 2, text: 'Thanks for sharing', postId }
            ]);
        }, 200);
    });
}

// Chaining example
fetchUser(1)
    .then(user => {
        console.log('👤 User:', user);
        return fetchUserPosts(user.id);
    })
    .then(posts => {
        console.log('📝 Posts:', posts);
        return fetchPostComments(posts[0].id);
    })
    .then(comments => {
        console.log('💬 Comments:', comments);
    })
    .catch(error => {
        console.log('Chain error:', error);
    });

// Returning Values in Promise Chains
console.log('\\n=== Return Values in Chains ===');

Promise.resolve(5)
    .then(num => {
        console.log('Original number:', num);
        return num * 2; // Return a value
    })
    .then(doubled => {
        console.log('Doubled:', doubled);
        return new Promise(resolve => {
            setTimeout(() => resolve(doubled + 10), 500);
        });
    })
    .then(final => {
        console.log('Final result:', final);
    });

// Error Handling and Propagation
console.log('\\n=== Error Handling ===');

function unreliableOperation(shouldFail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error('Operation failed as requested'));
            } else {
                resolve('Operation succeeded');
            }
        }, 300);
    });
}

// Error propagation
unreliableOperation(false)
    .then(result => {
        console.log('Step 1:', result);
        return unreliableOperation(true); // This will fail
    })
    .then(result => {
        console.log('Step 2:', result); // Won't execute
    })
    .catch(error => {
        console.log('Caught error:', error.message);
        return 'Recovered from error'; // Error recovery
    })
    .then(result => {
        console.log('After recovery:', result);
    });

// Multiple catch blocks
unreliableOperation(true)
    .then(result => result.toUpperCase())
    .catch(error => {
        console.log('First catch:', error.message);
        throw new Error('New error from catch');
    })
    .catch(error => {
        console.log('Second catch:', error.message);
    });

// Finally block
unreliableOperation(Math.random() > 0.5)
    .then(result => console.log('Success in finally demo:', result))
    .catch(error => console.log('Error in finally demo:', error.message))
    .finally(() => console.log('Finally block always executes'));

// Promise.all() - Wait for all
console.log('\\n=== Promise.all() ===');

const promise1 = new Promise(resolve => setTimeout(() => resolve('First'), 1000));
const promise2 = new Promise(resolve => setTimeout(() => resolve('Second'), 1500));
const promise3 = new Promise(resolve => setTimeout(() => resolve('Third'), 500));

Promise.all([promise1, promise2, promise3])
    .then(results => {
        console.log('All promises resolved:', results);
    })
    .catch(error => {
        console.log('One promise failed:', error);
    });

// Promise.all() with failure
const promiseSuccess = Promise.resolve('Success');
const promiseFailure = Promise.reject(new Error('Failure'));
const promiseDelayed = new Promise(resolve => setTimeout(() => resolve('Delayed'), 2000));

Promise.all([promiseSuccess, promiseFailure, promiseDelayed])
    .then(results => {
        console.log('All succeeded:', results); // Won't execute
    })
    .catch(error => {
        console.log('Promise.all failed fast:', error.message);
    });

// Promise.allSettled() - Wait for all regardless of outcome
console.log('\\n=== Promise.allSettled() ===');

Promise.allSettled([promiseSuccess, promiseFailure, promiseDelayed])
    .then(results => {
        console.log('All settled results:');
        results.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(\`  \${index}: ✅ \${result.value}\`);
            } else {
                console.log(\`  \${index}: ❌ \${result.reason.message}\`);
            }
        });
    });

// Promise.race() - First to complete wins
console.log('\\n=== Promise.race() ===');

const fastPromise = new Promise(resolve => setTimeout(() => resolve('Fast'), 500));
const slowPromise = new Promise(resolve => setTimeout(() => resolve('Slow'), 2000));

Promise.race([fastPromise, slowPromise])
    .then(result => {
        console.log('Race winner:', result);
    });

// Timeout implementation using Promise.race()
function withTimeout(promise, timeoutMs) {
    const timeout = new Promise((_, reject) => {
        setTimeout(() => reject(new Error(\`Timeout after \${timeoutMs}ms\`)), timeoutMs);
    });
    
    return Promise.race([promise, timeout]);
}

const slowOperation = new Promise(resolve => 
    setTimeout(() => resolve('Finally done'), 3000)
);

withTimeout(slowOperation, 1000)
    .then(result => console.log('Completed:', result))
    .catch(error => console.log('Timeout error:', error.message));

// Promise.any() - First successful resolution (ES2021)
console.log('\\n=== Promise.any() ===');

const failingPromise1 = Promise.reject(new Error('First failure'));
const failingPromise2 = Promise.reject(new Error('Second failure'));
const succeedingPromise = new Promise(resolve => 
    setTimeout(() => resolve('Finally succeeded'), 1000)
);

if (Promise.any) {
    Promise.any([failingPromise1, failingPromise2, succeedingPromise])
        .then(result => {
            console.log('First success:', result);
        })
        .catch(error => {
            console.log('All failed:', error);
        });
} else {
    console.log('Promise.any not supported in this environment');
}

// Practical Examples
console.log('\\n=== Practical Examples ===');

// 1. API Request with retry logic
function apiRequest(url, retries = 3) {
    return new Promise((resolve, reject) => {
        const attempt = () => {
            // Simulate API call
            const success = Math.random() > 0.7; // 30% success rate
            
            setTimeout(() => {
                if (success) {
                    resolve({ data: 'API response', url });
                } else if (retries > 0) {
                    console.log(\`Retrying... (\${retries} attempts left)\`);
                    retries--;
                    attempt();
                } else {
                    reject(new Error('API request failed after all retries'));
                }
            }, 300);
        };
        
        attempt();
    });
}

apiRequest('https://api.example.com/data')
    .then(response => console.log('API Success:', response))
    .catch(error => console.log('API Error:', error.message));

// 2. Loading multiple resources
function loadResource(name, delay) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(\`📦 Loaded \${name}\`);
            resolve({ name, loaded: true });
        }, delay);
    });
}

function loadApplication() {
    console.log('🚀 Starting application load...');
    
    const resources = [
        loadResource('CSS', 200),
        loadResource('JavaScript', 400),
        loadResource('Images', 600),
        loadResource('Data', 300)
    ];
    
    return Promise.all(resources)
        .then(results => {
            console.log('✅ All resources loaded:', results.map(r => r.name));
            return { status: 'ready', resources: results };
        });
}

loadApplication()
    .then(app => console.log('🎉 Application ready:', app.status));

// 3. Caching with Promises
class PromiseCache {
    constructor() {
        this.cache = new Map();
    }
    
    get(key, factory) {
        if (this.cache.has(key)) {
            console.log(\`📋 Cache hit for \${key}\`);
            return this.cache.get(key);
        }
        
        console.log(\`🔄 Cache miss for \${key}, creating...\`);
        const promise = factory(key)
            .catch(error => {
                // Remove failed promises from cache
                this.cache.delete(key);
                throw error;
            });
        
        this.cache.set(key, promise);
        return promise;
    }
    
    clear() {
        this.cache.clear();
    }
}

const cache = new PromiseCache();

function expensiveOperation(id) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(\`Expensive result for \${id}\`);
        }, 1000);
    });
}

// First call - cache miss
cache.get('user:1', expensiveOperation)
    .then(result => console.log('First call:', result));

// Second call - cache hit
setTimeout(() => {
    cache.get('user:1', expensiveOperation)
        .then(result => console.log('Second call:', result));
}, 500);

// 4. Promise-based event emitter
class PromiseEventEmitter {
    constructor() {
        this.events = new Map();
    }
    
    on(event, handler) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(handler);
    }
    
    emit(event, data) {
        if (!this.events.has(event)) return Promise.resolve([]);
        
        const handlers = this.events.get(event);
        const promises = handlers.map(handler => {
            try {
                return Promise.resolve(handler(data));
            } catch (error) {
                return Promise.reject(error);
            }
        });
        
        return Promise.allSettled(promises);
    }
    
    once(event) {
        return new Promise(resolve => {
            const handler = (data) => {
                resolve(data);
                this.off(event, handler);
            };
            this.on(event, handler);
        });
    }
    
    off(event, handler) {
        if (!this.events.has(event)) return;
        const handlers = this.events.get(event);
        const index = handlers.indexOf(handler);
        if (index > -1) {
            handlers.splice(index, 1);
        }
    }
}

const emitter = new PromiseEventEmitter();

emitter.on('user:login', (user) => {
    console.log(\`User logged in: \${user.name}\`);
    return Promise.resolve();
});

emitter.on('user:login', (user) => {
    console.log(\`Sending welcome email to \${user.email}\`);
    return new Promise(resolve => setTimeout(resolve, 200));
});

// Emit event and wait for all handlers
emitter.emit('user:login', { name: 'Alice', email: 'alice@example.com' })
    .then(results => {
        console.log('All login handlers completed');
    });

// Wait for a specific event
emitter.once('app:ready')
    .then(data => console.log('App is ready:', data));

setTimeout(() => {
    emitter.emit('app:ready', { version: '1.0.0' });
}, 1500);

// Common Patterns and Anti-patterns
console.log('\\n=== Common Patterns ===');

// 1. Sequential vs Parallel execution
function sequentialExecution() {
    console.log('Sequential execution:');
    const start = Date.now();
    
    return fetchUser(1)
        .then(user => {
            console.log(\`Got user in \${Date.now() - start}ms\`);
            return fetchUserPosts(user.id);
        })
        .then(posts => {
            console.log(\`Got posts in \${Date.now() - start}ms\`);
            return posts;
        });
}

function parallelExecution() {
    console.log('Parallel execution:');
    const start = Date.now();
    
    return Promise.all([
        fetchUser(1),
        fetchUserPosts(1) // Can run in parallel if ID is known
    ]).then(([user, posts]) => {
        console.log(\`Got both in \${Date.now() - start}ms\`);
        return { user, posts };
    });
}

// 2. Avoiding Promise constructor anti-pattern
// ❌ BAD: Unnecessary Promise constructor
function badAsyncFunction() {
    return new Promise((resolve, reject) => {
        someAsyncFunction()
            .then(result => resolve(result))
            .catch(error => reject(error));
    });
}

// ✅ GOOD: Just return the promise
function goodAsyncFunction() {
    return someAsyncFunction();
}

function someAsyncFunction() {
    return Promise.resolve('Some result');
}

// 3. Proper error handling
function properErrorHandling() {
    return fetchUser(1)
        .then(user => {
            // Validate user data
            if (!user.email) {
                throw new Error('User email is required');
            }
            return user;
        })
        .catch(error => {
            // Log error for debugging
            console.error('Error in properErrorHandling:', error);
            
            // Return default user or re-throw
            if (error.message.includes('network')) {
                return { id: 1, name: 'Default User', email: 'default@example.com' };
            }
            throw error; // Re-throw for caller to handle
        });
}

// 4. Promise.resolve for conditional async
function conditionalAsync(shouldBeAsync) {
    if (shouldBeAsync) {
        return new Promise(resolve => {
            setTimeout(() => resolve('Async result'), 500);
        });
    } else {
        return Promise.resolve('Sync result');
    }
}

conditionalAsync(true).then(console.log);
conditionalAsync(false).then(console.log);

// Promise Utilities
console.log('\\n=== Promise Utilities ===');

// Delay utility
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Retry utility
function retry(operation, attempts = 3, delayMs = 1000) {
    return operation().catch(error => {
        if (attempts <= 1) {
            throw error;
        }
        
        console.log(\`Retrying in \${delayMs}ms... (\${attempts - 1} attempts left)\`);
        return delay(delayMs)
            .then(() => retry(operation, attempts - 1, delayMs));
    });
}

// Map utility for promises
function promiseMap(array, mapper, concurrency = Infinity) {
    if (concurrency >= array.length) {
        return Promise.all(array.map(mapper));
    }
    
    // Limit concurrency
    const results = [];
    let index = 0;
    
    function processNext() {
        if (index >= array.length) {
            return Promise.resolve();
        }
        
        const currentIndex = index++;
        return mapper(array[currentIndex], currentIndex)
            .then(result => {
                results[currentIndex] = result;
                return processNext();
            });
    }
    
    const workers = Array(concurrency).fill().map(() => processNext());
    return Promise.all(workers).then(() => results);
}

// Example usage of utilities
console.log('Using delay utility:');
delay(500).then(() => console.log('Delayed execution completed'));

console.log('Using retry utility:');
let attemptCount = 0;
const unreliableTask = () => {
    attemptCount++;
    if (attemptCount < 3) {
        return Promise.reject(new Error(\`Attempt \${attemptCount} failed\`));
    }
    return Promise.resolve(\`Success on attempt \${attemptCount}\`);
};

retry(unreliableTask, 5, 200)
    .then(result => console.log('Retry result:', result))
    .catch(error => console.log('Retry failed:', error.message));

console.log('Using promiseMap utility:');
const numbers = [1, 2, 3, 4, 5];
promiseMap(numbers, async (num) => {
    await delay(100 * num);
    return num * 2;
}, 2) // Limit to 2 concurrent operations
.then(results => console.log('Mapped results:', results));

console.log('Promises examples completed');`,

  exercises: [
    {
      question: "Create a function that loads user data, their posts, and post comments in the most efficient way:",
      solution: `async function loadUserData(userId) {
  try {
    // Load user and posts in parallel
    const [user, posts] = await Promise.all([
      fetchUser(userId),
      fetchUserPosts(userId)
    ]);
    
    // Load comments for all posts in parallel
    const postsWithComments = await Promise.all(
      posts.map(async (post) => ({
        ...post,
        comments: await fetchPostComments(post.id)
      }))
    );
    
    return {
      user,
      posts: postsWithComments
    };
  } catch (error) {
    console.error('Failed to load user data:', error);
    throw new Error(\`Unable to load data for user \${userId}\`);
  }
}`,
      explanation: "Use Promise.all() to run independent operations in parallel, and proper error handling to provide meaningful error messages."
    }
  ],

  quiz: [
    {
      question: "What happens if one promise in Promise.all() rejects?",
      options: [
        "All promises are cancelled",
        "The entire Promise.all() rejects immediately",
        "Other promises continue and results are partial",
        "The rejected promise is ignored"
      ],
      correct: 1,
      explanation: "Promise.all() fails fast - if any promise rejects, the entire Promise.all() rejects immediately with that error."
    }
  ],

  resources: [
    {
      title: "MDN - Promise",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise"
    },
    {
      title: "JavaScript.info - Promises",
      url: "https://javascript.info/promise-basics"
    }
  ],

  nextModules: ['async-await', 'event-loop'],
  prerequisites: ['callbacks', 'sync-vs-async']
};