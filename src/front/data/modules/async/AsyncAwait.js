export default {
  title: 'Async/Await',
  duration: '35 min',
  difficulty: 'Intermediate',
  overview: 'Master async/await syntax for cleaner asynchronous code. Learn error handling, parallel execution, and best practices for async functions.',
  
  keyPoints: [
    'async/await makes asynchronous code look synchronous',
    'async functions always return a Promise',
    'await can only be used inside async functions',
    'Use try/catch for error handling with async/await',
    'Promise.all() enables parallel execution',
    'Top-level await is available in modern environments'
  ],

  example: `// Basic Async/Await
console.log('=== Basic Async/Await ===');

// Simple async function
async function greetAfterDelay(name, delay) {
    console.log(\`Starting greeting for \${name}...\`);
    
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, delay));
    
    console.log(\`Hello, \${name}!\`);
    return \`Greeted \${name}\`;
}

// Using async function
async function demonstrateBasicAsync() {
    console.log('Before async call');
    const result = await greetAfterDelay('Alice', 1000);
    console.log('Result:', result);
    console.log('After async call');
}

demonstrateBasicAsync();

// Converting Promises to Async/Await
console.log('=== Converting Promises ===');

// Promise-based function
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: \`User \${userId}\`,
                    email: \`user\${userId}@example.com\`
                });
            } else {
                reject(new Error('Invalid user ID'));
            }
        }, 500);
    });
}

// Using with Promises (.then/.catch)
function getUserWithPromises(userId) {
    console.log('Fetching user with promises...');
    
    return fetchUserData(userId)
        .then(user => {
            console.log('User data received:', user.name);
            return user;
        })
        .catch(error => {
            console.error('Error fetching user:', error.message);
            throw error;
        });
}

// Using with async/await
async function getUserWithAsync(userId) {
    console.log('Fetching user with async/await...');
    
    try {
        const user = await fetchUserData(userId);
        console.log('User data received:', user.name);
        return user;
    } catch (error) {
        console.error('Error fetching user:', error.message);
        throw error;
    }
}

// Compare both approaches
async function compareApproaches() {
    try {
        await getUserWithPromises(1);
        await getUserWithAsync(2);
    } catch (error) {
        console.error('Failed:', error.message);
    }
}

compareApproaches();

// Error Handling with Async/Await
console.log('=== Error Handling ===');

async function riskyOperation(shouldFail = false) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    if (shouldFail) {
        throw new Error('Operation failed!');
    }
    
    return 'Operation successful';
}

// Multiple try/catch blocks
async function handleMultipleOperations() {
    let results = [];
    
    // First operation
    try {
        const result1 = await riskyOperation(false);
        results.push(result1);
        console.log('Operation 1:', result1);
    } catch (error) {
        console.error('Operation 1 failed:', error.message);
        results.push('Failed');
    }
    
    // Second operation (will fail)
    try {
        const result2 = await riskyOperation(true);
        results.push(result2);
        console.log('Operation 2:', result2);
    } catch (error) {
        console.error('Operation 2 failed:', error.message);
        results.push('Failed');
    }
    
    console.log('All results:', results);
    return results;
}

handleMultipleOperations();

// Parallel Execution with Async/Await
console.log('=== Parallel Execution ===');

async function fetchData(endpoint, delay) {
    console.log(\`Fetching from \${endpoint}...\`);
    await new Promise(resolve => setTimeout(resolve, delay));
    console.log(\`Data from \${endpoint} received\`);
    return \`Data from \${endpoint}\`;
}

// Sequential execution (slower)
async function sequentialExecution() {
    console.log('Sequential execution started');
    console.time('Sequential');
    
    const data1 = await fetchData('/api/users', 1000);
    const data2 = await fetchData('/api/posts', 800);
    const data3 = await fetchData('/api/comments', 600);
    
    console.timeEnd('Sequential');
    return [data1, data2, data3];
}

// Parallel execution (faster)
async function parallelExecution() {
    console.log('Parallel execution started');
    console.time('Parallel');
    
    const promises = [
        fetchData('/api/users', 1000),
        fetchData('/api/posts', 800),
        fetchData('/api/comments', 600)
    ];
    
    const results = await Promise.all(promises);
    
    console.timeEnd('Parallel');
    return results;
}

// Run both approaches
async function compareExecutionMethods() {
    await sequentialExecution();
    await parallelExecution();
}

compareExecutionMethods();

// Advanced Parallel Patterns
console.log('=== Advanced Parallel Patterns ===');

// Promise.allSettled - handles both success and failure
async function handleMixedResults() {
    const operations = [
        fetchData('/api/users', 500),
        riskyOperation(true), // This will fail
        fetchData('/api/posts', 300),
        riskyOperation(false) // This will succeed
    ];
    
    const results = await Promise.allSettled(operations);
    
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(\`Operation \${index + 1} succeeded:\`, result.value);
        } else {
            console.log(\`Operation \${index + 1} failed:\`, result.reason.message);
        }
    });
    
    return results;
}

handleMixedResults();

// Promise.race - first to complete wins
async function raceExample() {
    console.log('Racing operations...');
    
    const operations = [
        fetchData('/api/fast', 200),
        fetchData('/api/medium', 500),
        fetchData('/api/slow', 1000)
    ];
    
    try {
        const winner = await Promise.race(operations);
        console.log('Race winner:', winner);
    } catch (error) {
        console.error('Race failed:', error.message);
    }
}

raceExample();

// Async Iteration
console.log('=== Async Iteration ===');

// Async generator function
async function* numberGenerator(max) {
    for (let i = 1; i <= max; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));
        yield i;
    }
}

// Processing async iterator
async function processAsyncIterator() {
    console.log('Processing async iterator...');
    
    for await (const number of numberGenerator(5)) {
        console.log('Generated number:', number);
    }
    
    console.log('Async iteration completed');
}

processAsyncIterator();

// Async array processing
async function processArray(items, processor) {
    const results = [];
    
    for (const item of items) {
        const result = await processor(item);
        results.push(result);
    }
    
    return results;
}

async function processArrayParallel(items, processor) {
    const promises = items.map(item => processor(item));
    return await Promise.all(promises);
}

// Example processor
async function processItem(item) {
    await new Promise(resolve => setTimeout(resolve, 100));
    return item.toUpperCase();
}

async function demonstrateArrayProcessing() {
    const items = ['apple', 'banana', 'cherry'];
    
    console.log('Processing array sequentially...');
    console.time('Sequential array processing');
    const sequentialResults = await processArray(items, processItem);
    console.timeEnd('Sequential array processing');
    console.log('Sequential results:', sequentialResults);
    
    console.log('Processing array in parallel...');
    console.time('Parallel array processing');
    const parallelResults = await processArrayParallel(items, processItem);
    console.timeEnd('Parallel array processing');
    console.log('Parallel results:', parallelResults);
}

demonstrateArrayProcessing();

// Async Function Patterns
console.log('=== Async Function Patterns ===');

// Retry pattern with async/await
async function retryAsync(operation, maxRetries = 3, delay = 1000) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(\`Attempt \${attempt}/\${maxRetries}\`);
            const result = await operation();
            console.log('Operation succeeded');
            return result;
        } catch (error) {
            lastError = error;
            console.log(\`Attempt \${attempt} failed:\`, error.message);
            
            if (attempt < maxRetries) {
                console.log(\`Waiting \${delay}ms before retry...\`);
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2; // Exponential backoff
            }
        }
    }
    
    throw new Error(\`Operation failed after \${maxRetries} attempts: \${lastError.message}\`);
}

// Test retry pattern
async function testRetryPattern() {
    let attemptCount = 0;
    
    const flakyOperation = async () => {
        attemptCount++;
        if (attemptCount < 3) {
            throw new Error(\`Attempt \${attemptCount} failed\`);
        }
        return 'Success after retries!';
    };
    
    try {
        const result = await retryAsync(flakyOperation, 5, 500);
        console.log('Retry result:', result);
    } catch (error) {
        console.error('Retry failed:', error.message);
    }
}

testRetryPattern();

// Timeout pattern
async function withTimeout(promise, timeoutMs) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Operation timed out')), timeoutMs);
    });
    
    return Promise.race([promise, timeoutPromise]);
}

async function testTimeoutPattern() {
    const slowOperation = new Promise(resolve => {
        setTimeout(() => resolve('Slow result'), 2000);
    });
    
    try {
        const result = await withTimeout(slowOperation, 1000);
        console.log('Timeout result:', result);
    } catch (error) {
        console.error('Timeout error:', error.message);
    }
}

testTimeoutPattern();

// Concurrency Control
console.log('=== Concurrency Control ===');

class ConcurrencyController {
    constructor(maxConcurrent = 3) {
        this.maxConcurrent = maxConcurrent;
        this.running = 0;
        this.queue = [];
    }
    
    async execute(asyncFn) {
        return new Promise((resolve, reject) => {
            this.queue.push({ asyncFn, resolve, reject });
            this.process();
        });
    }
    
    async process() {
        if (this.running >= this.maxConcurrent || this.queue.length === 0) {
            return;
        }
        
        const { asyncFn, resolve, reject } = this.queue.shift();
        this.running++;
        
        try {
            const result = await asyncFn();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.running--;
            this.process(); // Process next item in queue
        }
    }
}

// Test concurrency control
async function testConcurrencyControl() {
    const controller = new ConcurrencyController(2); // Max 2 concurrent
    
    const tasks = Array.from({ length: 6 }, (_, i) => 
        () => fetchData(\`/api/task-\${i + 1}\`, 500)
    );
    
    console.log('Starting controlled concurrent execution...');
    const promises = tasks.map(task => controller.execute(task));
    const results = await Promise.all(promises);
    
    console.log('Controlled execution results:', results);
}

testConcurrencyControl();

// Async Function Composition
console.log('=== Async Function Composition ===');

// Async pipe function
async function pipe(value, ...fns) {
    let result = value;
    
    for (const fn of fns) {
        result = await fn(result);
    }
    
    return result;
}

// Example async functions for composition
async function addOne(x) {
    await new Promise(resolve => setTimeout(resolve, 100));
    return x + 1;
}

async function multiplyByTwo(x) {
    await new Promise(resolve => setTimeout(resolve, 100));
    return x * 2;
}

async function stringify(x) {
    await new Promise(resolve => setTimeout(resolve, 100));
    return \`Result: \${x}\`;
}

// Use pipe with async functions
async function demonstrateAsyncPipe() {
    const result = await pipe(5, addOne, multiplyByTwo, stringify);
    console.log('Pipe result:', result); // "Result: 12"
}

demonstrateAsyncPipe();

// Real-world Example: API Client
console.log('=== Real-world Example ===');

class APIClient {
    constructor(baseURL) {
        this.baseURL = baseURL;
    }
    
    async request(endpoint, options = {}) {
        const url = this.baseURL + endpoint;
        
        // Simulate HTTP request
        await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));
        
        if (Math.random() > 0.8) {
            throw new Error('Network error');
        }
        
        return {
            data: \`Data from \${endpoint}\`,
            status: 200,
            timestamp: new Date().toISOString()
        };
    }
    
    async get(endpoint) {
        return this.request(endpoint, { method: 'GET' });
    }
    
    async post(endpoint, data) {
        return this.request(endpoint, { method: 'POST', body: data });
    }
    
    async batchGet(endpoints) {
        const promises = endpoints.map(endpoint => 
            this.get(endpoint).catch(error => ({ error: error.message, endpoint }))
        );
        
        return await Promise.allSettled(promises);
    }
}

// Use the API client
async function demonstrateAPIClient() {
    const client = new APIClient('https://api.example.com');
    
    try {
        // Single request
        const user = await client.get('/users/1');
        console.log('User data:', user);
        
        // Batch requests
        const batchResults = await client.batchGet([
            '/users/1',
            '/users/2',
            '/posts',
            '/comments'
        ]);
        
        console.log('Batch results:');
        batchResults.forEach((result, index) => {
            if (result.status === 'fulfilled') {
                console.log(\`Request \${index + 1}: Success\`, result.value);
            } else {
                console.log(\`Request \${index + 1}: Failed\`, result.reason);
            }
        });
        
    } catch (error) {
        console.error('API error:', error.message);
    }
}

demonstrateAPIClient();

console.log('Async/await examples completed');`,

  exercises: [
    {
      question: "Create an async function that fetches data from multiple URLs with a timeout and retry mechanism:",
      solution: `async function fetchWithTimeoutAndRetry(urls, timeout = 5000, maxRetries = 3) {
  const results = [];
  
  for (const url of urls) {
    let attempt = 0;
    let success = false;
    
    while (attempt < maxRetries && !success) {
      try {
        attempt++;
        console.log(\`Fetching \${url} (attempt \${attempt})\`);
        
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), timeout)
        );
        
        const fetchPromise = fetch(url).then(response => {
          if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
          return response.json();
        });
        
        const result = await Promise.race([fetchPromise, timeoutPromise]);
        results.push({ url, data: result, success: true });
        success = true;
        
      } catch (error) {
        if (attempt === maxRetries) {
          results.push({ url, error: error.message, success: false });
        } else {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
    }
  }
  
  return results;
}

// Usage:
const urls = ['https://api1.com/data', 'https://api2.com/data'];
const results = await fetchWithTimeoutAndRetry(urls, 3000, 2);`,
      explanation: "This function combines timeout handling with retry logic, processing URLs sequentially with proper error handling."
    }
  ],

  quiz: [
    {
      question: "What happens when you use 'await' with a non-Promise value?",
      options: [
        "It throws an error",
        "It waits indefinitely", 
        "It immediately returns the value",
        "It converts it to a Promise first"
      ],
      correct: 2,
      explanation: "When 'await' is used with a non-Promise value, it immediately returns that value without any async behavior."
    }
  ],

  resources: [
    {
      title: "MDN - async/await",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function"
    }
  ],

  nextModules: ['async-patterns', 'error-handling-async'],
  prerequisites: ['promises', 'callbacks']
};