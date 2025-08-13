// src/front/data/modules/async/SyncVsAsync.js
export default {
  title: 'Synchronous vs Asynchronous',
  duration: '35 min',
  difficulty: 'Intermediate',
  overview: 'Understand the fundamental differences between synchronous and asynchronous programming. Learn when and how to use each approach effectively.',
  
  keyPoints: [
    'Synchronous code executes line by line, blocking subsequent operations',
    'Asynchronous code allows non-blocking execution',
    'JavaScript is single-threaded but can handle async operations',
    'Event loop manages async operations and callbacks',
    'Choose sync for simple operations, async for I/O and time-consuming tasks',
    'Understanding blocking vs non-blocking behavior'
  ],

  example: `// Understanding Synchronous Execution
console.log('=== Synchronous Execution ===');

function synchronousDemo() {
    console.log('1. First operation');
    
    // Simulate time-consuming synchronous operation
    const start = Date.now();
    while (Date.now() - start < 1000) {
        // Blocking operation - nothing else can run
    }
    
    console.log('2. After 1 second delay');
    console.log('3. Third operation');
}

console.log('Starting synchronous demo...');
synchronousDemo();
console.log('Synchronous demo completed');

// Understanding Asynchronous Execution
console.log('\\n=== Asynchronous Execution ===');

function asynchronousDemo() {
    console.log('1. First operation');
    
    // Non-blocking asynchronous operation
    setTimeout(() => {
        console.log('2. After 1 second delay (async)');
    }, 1000);
    
    console.log('3. Third operation (executes immediately)');
}

console.log('Starting asynchronous demo...');
asynchronousDemo();
console.log('Asynchronous demo setup completed');

// Comparing Execution Models
console.log('\\n=== Execution Model Comparison ===');

// Synchronous approach - blocks execution
function syncProcessing() {
    console.log('\\nSync processing started');
    
    function processItem(item, delay) {
        console.log(\`Processing \${item}...\`);
        const start = Date.now();
        while (Date.now() - start < delay) {
            // Simulate processing time
        }
        console.log(\`\${item} processed\`);
    }
    
    processItem('Item 1', 500);
    processItem('Item 2', 500);
    processItem('Item 3', 500);
    
    console.log('All sync processing completed');
}

// Asynchronous approach - non-blocking
function asyncProcessing() {
    console.log('\\nAsync processing started');
    
    function processItemAsync(item, delay) {
        console.log(\`Processing \${item}...\`);
        
        return new Promise(resolve => {
            setTimeout(() => {
                console.log(\`\${item} processed\`);
                resolve(item);
            }, delay);
        });
    }
    
    // Process items concurrently
    Promise.all([
        processItemAsync('Item A', 500),
        processItemAsync('Item B', 500),
        processItemAsync('Item C', 500)
    ]).then(() => {
        console.log('All async processing completed');
    });
    
    console.log('Async processing setup completed');
}

// Execute both approaches
syncProcessing();
asyncProcessing();

// Real-world Example: File Processing
console.log('\\n=== File Processing Example ===');

// Synchronous file processing simulation
class SyncFileProcessor {
    processFile(filename, size) {
        console.log(\`Sync: Starting to process \${filename} (size: \${size}KB)\`);
        
        // Simulate processing time based on file size
        const start = Date.now();
        while (Date.now() - start < size * 10) {
            // Processing...
        }
        
        console.log(\`Sync: Finished processing \${filename}\`);
        return \`Processed \${filename}\`;
    }
    
    processMultipleFiles(files) {
        console.log('Sync: Processing multiple files sequentially...');
        const results = [];
        
        for (const file of files) {
            const result = this.processFile(file.name, file.size);
            results.push(result);
        }
        
        console.log('Sync: All files processed');
        return results;
    }
}

// Asynchronous file processing simulation
class AsyncFileProcessor {
    processFile(filename, size) {
        console.log(\`Async: Starting to process \${filename} (size: \${size}KB)\`);
        
        return new Promise(resolve => {
            // Simulate processing time with setTimeout
            setTimeout(() => {
                console.log(\`Async: Finished processing \${filename}\`);
                resolve(\`Processed \${filename}\`);
            }, size * 10);
        });
    }
    
    async processMultipleFiles(files) {
        console.log('Async: Processing multiple files concurrently...');
        
        const promises = files.map(file => 
            this.processFile(file.name, file.size)
        );
        
        const results = await Promise.all(promises);
        console.log('Async: All files processed');
        return results;
    }
}

// Test file processing
const testFiles = [
    { name: 'document1.pdf', size: 50 },
    { name: 'image1.jpg', size: 30 },
    { name: 'video1.mp4', size: 100 }
];

// Synchronous processing
const syncProcessor = new SyncFileProcessor();
console.time('Sync file processing');
syncProcessor.processMultipleFiles(testFiles);
console.timeEnd('Sync file processing');

// Asynchronous processing
const asyncProcessor = new AsyncFileProcessor();
console.time('Async file processing');
asyncProcessor.processMultipleFiles(testFiles).then(() => {
    console.timeEnd('Async file processing');
});

// Blocking vs Non-blocking Examples
console.log('\\n=== Blocking vs Non-blocking ===');

// Blocking example
function blockingExample() {
    console.log('\\nBlocking example:');
    console.log('Before blocking operation');
    
    // This blocks the entire thread
    const start = Date.now();
    while (Date.now() - start < 2000) {
        // Blocking for 2 seconds
    }
    
    console.log('After blocking operation');
    console.log('This runs only after the blocking operation completes');
}

// Non-blocking example
function nonBlockingExample() {
    console.log('\\nNon-blocking example:');
    console.log('Before non-blocking operation');
    
    // This doesn't block
    setTimeout(() => {
        console.log('Non-blocking operation completed');
    }, 2000);
    
    console.log('This runs immediately after setup');
    console.log('The thread is free to do other work');
}

// Execute blocking example
blockingExample();

// Execute non-blocking example
nonBlockingExample();

// CPU-intensive vs I/O Operations
console.log('\\n=== CPU vs I/O Operations ===');

// CPU-intensive operation (should be sync or use Web Workers)
function cpuIntensiveSync() {
    console.log('CPU-intensive synchronous operation:');
    console.time('CPU operation');
    
    let result = 0;
    for (let i = 0; i < 10000000; i++) {
        result += Math.sqrt(i);
    }
    
    console.timeEnd('CPU operation');
    console.log('CPU operation result:', result.toFixed(2));
}

// I/O operation simulation (should be async)
function ioOperationAsync() {
    console.log('\\nI/O asynchronous operation:');
    
    // Simulate network request
    function simulateNetworkRequest(url, delay = 1000) {
        console.log(\`Fetching data from \${url}...\`);
        
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(\`Data from \${url}\`);
            }, delay);
        });
    }
    
    // Multiple concurrent I/O operations
    const requests = [
        simulateNetworkRequest('api/users', 800),
        simulateNetworkRequest('api/posts', 600),
        simulateNetworkRequest('api/comments', 1200)
    ];
    
    Promise.all(requests).then(results => {
        console.log('All I/O operations completed:');
        results.forEach((result, index) => {
            console.log(\`  \${index + 1}. \${result}\`);
        });
    });
}

// Execute CPU and I/O examples
cpuIntensiveSync();
ioOperationAsync();

// Error Handling: Sync vs Async
console.log('\\n=== Error Handling Comparison ===');

// Synchronous error handling
function syncErrorHandling() {
    console.log('\\nSynchronous error handling:');
    
    function riskyOperation(shouldFail = false) {
        if (shouldFail) {
            throw new Error('Synchronous operation failed');
        }
        return 'Success';
    }
    
    try {
        const result1 = riskyOperation(false);
        console.log('Sync result 1:', result1);
        
        const result2 = riskyOperation(true);
        console.log('Sync result 2:', result2); // Won't execute
    } catch (error) {
        console.log('Sync error caught:', error.message);
    }
}

// Asynchronous error handling
async function asyncErrorHandling() {
    console.log('\\nAsynchronous error handling:');
    
    function riskyAsyncOperation(shouldFail = false) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (shouldFail) {
                    reject(new Error('Asynchronous operation failed'));
                } else {
                    resolve('Success');
                }
            }, 100);
        });
    }
    
    try {
        const result1 = await riskyAsyncOperation(false);
        console.log('Async result 1:', result1);
        
        const result2 = await riskyAsyncOperation(true);
        console.log('Async result 2:', result2); // Won't execute
    } catch (error) {
        console.log('Async error caught:', error.message);
    }
}

// Execute error handling examples
syncErrorHandling();
asyncErrorHandling();

// Performance Implications
console.log('\\n=== Performance Implications ===');

// Synchronous API calls (bad practice)
function syncAPIDemo() {
    console.log('\\nSimulating synchronous API calls (BAD):');
    
    function syncAPICall(endpoint, delay = 500) {
        console.log(\`Sync: Calling \${endpoint}\`);
        const start = Date.now();
        while (Date.now() - start < delay) {
            // Simulating network delay (blocking)
        }
        return \`Data from \${endpoint}\`;
    }
    
    console.time('Sync API calls');
    
    const user = syncAPICall('/api/user');
    const posts = syncAPICall('/api/posts');
    const comments = syncAPICall('/api/comments');
    
    console.timeEnd('Sync API calls');
    console.log('Sync API results:', { user, posts, comments });
}

// Asynchronous API calls (good practice)
async function asyncAPIDemo() {
    console.log('\\nAsynchronous API calls (GOOD):');
    
    function asyncAPICall(endpoint, delay = 500) {
        console.log(\`Async: Calling \${endpoint}\`);
        
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(\`Data from \${endpoint}\`);
            }, delay);
        });
    }
    
    console.time('Async API calls');
    
    // Parallel execution
    const [user, posts, comments] = await Promise.all([
        asyncAPICall('/api/user'),
        asyncAPICall('/api/posts'),
        asyncAPICall('/api/comments')
    ]);
    
    console.timeEnd('Async API calls');
    console.log('Async API results:', { user, posts, comments });
}

// Execute API demos
syncAPIDemo();
asyncAPIDemo();

// Decision Guide: When to Use Each
console.log('\\n=== Decision Guide ===');

class OperationTypeDemo {
    // Use synchronous for simple, fast operations
    static simpleMath(a, b) {
        console.log('Simple math (sync): ', a + b);
        return a + b;
    }
    
    // Use synchronous for data transformations
    static transformData(data) {
        console.log('Data transformation (sync)');
        return data.map(item => item.toUpperCase());
    }
    
    // Use asynchronous for I/O operations
    static async fetchData(url) {
        console.log(\`Fetching data (async): \${url}\`);
        
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 300));
        return \`Data from \${url}\`;
    }
    
    // Use asynchronous for time-delayed operations
    static async scheduleTask(task, delay) {
        console.log(\`Scheduling task (async): \${task}\`);
        
        await new Promise(resolve => setTimeout(resolve, delay));
        console.log(\`Task completed: \${task}\`);
        return \`\${task} done\`;
    }
    
    // Use asynchronous for multiple independent operations
    static async processMultipleItems(items) {
        console.log('Processing multiple items (async)');
        
        const promises = items.map(async (item, index) => {
            await new Promise(resolve => setTimeout(resolve, 100 * (index + 1)));
            return \`Processed \${item}\`;
        });
        
        return Promise.all(promises);
    }
}

// Demonstrate decision guide
console.log('\\nDemonstrating when to use sync vs async:');

// Sync examples
OperationTypeDemo.simpleMath(5, 3);
const transformed = OperationTypeDemo.transformData(['hello', 'world']);
console.log('Transformed:', transformed);

// Async examples
OperationTypeDemo.fetchData('https://api.example.com/data');
OperationTypeDemo.scheduleTask('Send email', 500);
OperationTypeDemo.processMultipleItems(['item1', 'item2', 'item3'])
    .then(results => console.log('Processed items:', results));

// Common Patterns and Anti-patterns
console.log('\\n=== Patterns and Anti-patterns ===');

// ❌ Anti-pattern: Making sync operations async unnecessarily
function unnecessaryAsync() {
    console.log('\\n❌ Anti-pattern: Unnecessary async');
    
    // BAD: Making simple operations async
    async function addNumbers(a, b) {
        return a + b; // No need for async here
    }
    
    addNumbers(2, 3).then(result => {
        console.log('Unnecessary async result:', result);
    });
}

// ✅ Good pattern: Proper async usage
async function properAsync() {
    console.log('\\n✅ Good pattern: Proper async usage');
    
    // GOOD: Async for actual async operations
    async function fetchAndProcess(url) {
        try {
            const data = await simulateNetworkCall(url);
            const processed = processData(data);
            return processed;
        } catch (error) {
            console.error('Error in async operation:', error);
            throw error;
        }
    }
    
    function simulateNetworkCall(url) {
        return new Promise(resolve => {
            setTimeout(() => resolve(\`data from \${url}\`), 200);
        });
    }
    
    function processData(data) {
        return data.toUpperCase();
    }
    
    const result = await fetchAndProcess('api/data');
    console.log('Proper async result:', result);
}

// ❌ Anti-pattern: Blocking the event loop
function blockingAntiPattern() {
    console.log('\\n❌ Anti-pattern: Blocking event loop');
    
    // BAD: Blocking operation in main thread
    function heavyComputation() {
        const start = Date.now();
        while (Date.now() - start < 1000) {
            // Blocking the event loop
        }
        return 'Heavy computation done';
    }
    
    console.log('Before heavy computation');
    const result = heavyComputation();
    console.log('After heavy computation:', result);
}

// ✅ Good pattern: Non-blocking heavy operations
async function nonBlockingPattern() {
    console.log('\\n✅ Good pattern: Non-blocking heavy operations');
    
    // GOOD: Breaking up heavy work
    async function heavyComputationAsync() {
        let progress = 0;
        const total = 1000000;
        const chunkSize = 10000;
        
        while (progress < total) {
            // Do chunk of work
            for (let i = 0; i < chunkSize && progress < total; i++) {
                progress++;
                // Some computation
            }
            
            // Yield control back to event loop
            await new Promise(resolve => setTimeout(resolve, 0));
            
            if (progress % 100000 === 0) {
                console.log(\`Progress: \${(progress / total * 100).toFixed(1)}%\`);
            }
        }
        
        return 'Heavy computation done (non-blocking)';
    }
    
    console.log('Before heavy computation (non-blocking)');
    const result = await heavyComputationAsync();
    console.log('After heavy computation:', result);
}

// Execute pattern examples
unnecessaryAsync();
properAsync();
blockingAntiPattern();
nonBlockingPattern();

// Memory and Resource Considerations
console.log('\\n=== Memory and Resource Considerations ===');

class ResourceManagement {
    // Synchronous resource usage
    static syncResourceUsage() {
        console.log('\\nSynchronous resource usage:');
        
        const resources = [];
        
        // All resources created at once
        for (let i = 0; i < 5; i++) {
            const resource = {
                id: i,
                data: new Array(1000).fill(\`data-\${i}\`),
                created: Date.now()
            };
            resources.push(resource);
        }
        
        console.log(\`Created \${resources.length} resources synchronously\`);
        return resources;
    }
    
    // Asynchronous resource management
    static async asyncResourceUsage() {
        console.log('\\nAsynchronous resource usage:');
        
        const resources = [];
        
        // Resources created with delays, allowing other operations
        for (let i = 0; i < 5; i++) {
            await new Promise(resolve => setTimeout(resolve, 50));
            
            const resource = {
                id: i,
                data: new Array(1000).fill(\`data-\${i}\`),
                created: Date.now()
            };
            resources.push(resource);
            
            console.log(\`Created resource \${i + 1}/5\`);
        }
        
        console.log(\`Created \${resources.length} resources asynchronously\`);
        return resources;
    }
}

// Test resource management
ResourceManagement.syncResourceUsage();
ResourceManagement.asyncResourceUsage();

// Summary and Best Practices
setTimeout(() => {
    console.log('\\n=== Summary and Best Practices ===');
    console.log('\\n🔄 Use SYNCHRONOUS for:');
    console.log('  ✅ Simple calculations and data transformations');
    console.log('  ✅ Quick operations that complete immediately');
    console.log('  ✅ Pure functions without side effects');
    console.log('  ✅ Error-prone operations that need immediate handling');
    
    console.log('\\n⚡ Use ASYNCHRONOUS for:');
    console.log('  ✅ Network requests and API calls');
    console.log('  ✅ File I/O operations');
    console.log('  ✅ Database queries');
    console.log('  ✅ Time-delayed operations');
    console.log('  ✅ Multiple independent operations');
    console.log('  ✅ Long-running computations (with yielding)');
    
    console.log('\\n⚠️  Avoid:');
    console.log('  ❌ Blocking the main thread with heavy computations');
    console.log('  ❌ Making simple operations unnecessarily async');
    console.log('  ❌ Ignoring error handling in async operations');
    console.log('  ❌ Creating callback hell (use async/await)');
    console.log('  ❌ Not understanding when operations truly need to be async');
    
    console.log('\\nSynchronous vs Asynchronous examples completed');
}, 8000);`,

  exercises: [
    {
      question: "Create a task manager that can handle both sync and async tasks efficiently:",
      solution: `class TaskManager {
  constructor() {
    this.syncQueue = [];
    this.asyncQueue = [];
    this.results = [];
    this.isProcessing = false;
  }
  
  // Add synchronous task
  addSyncTask(name, taskFn) {
    this.syncQueue.push({ name, taskFn, type: 'sync' });
  }
  
  // Add asynchronous task
  addAsyncTask(name, taskFn) {
    this.asyncQueue.push({ name, taskFn, type: 'async' });
  }
  
  // Process all tasks efficiently
  async processAllTasks() {
    if (this.isProcessing) {
      throw new Error('Tasks are already being processed');
    }
    
    this.isProcessing = true;
    this.results = [];
    
    console.log('Starting task processing...');
    
    // Process sync tasks first (they're quick)
    for (const task of this.syncQueue) {
      console.log(\`Processing sync task: \${task.name}\`);
      try {
        const result = task.taskFn();
        this.results.push({ name: task.name, result, type: 'sync', success: true });
      } catch (error) {
        this.results.push({ name: task.name, error: error.message, type: 'sync', success: false });
      }
    }
    
    // Process async tasks concurrently
    if (this.asyncQueue.length > 0) {
      console.log('Processing async tasks concurrently...');
      
      const asyncPromises = this.asyncQueue.map(async (task) => {
        try {
          const result = await task.taskFn();
          return { name: task.name, result, type: 'async', success: true };
        } catch (error) {
          return { name: task.name, error: error.message, type: 'async', success: false };
        }
      });
      
      const asyncResults = await Promise.all(asyncPromises);
      this.results.push(...asyncResults);
    }
    
    this.isProcessing = false;
    console.log('All tasks completed!');
    return this.results;
  }
  
  // Get processing statistics
  getStats() {
    return {
      totalTasks: this.syncQueue.length + this.asyncQueue.length,
      syncTasks: this.syncQueue.length,
      asyncTasks: this.asyncQueue.length,
      completed: this.results.length,
      successful: this.results.filter(r => r.success).length,
      failed: this.results.filter(r => !r.success).length
    };
  }
}

// Usage example
const taskManager = new TaskManager();

// Add sync tasks (fast operations)
taskManager.addSyncTask('calculate', () => 2 + 2);
taskManager.addSyncTask('format', () => 'Hello World'.toUpperCase());

// Add async tasks (I/O operations)
taskManager.addAsyncTask('fetch-data', async () => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return 'API data fetched';
});

taskManager.addAsyncTask('process-file', async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return 'File processed';
});

// Process all tasks
taskManager.processAllTasks().then(results => {
  console.log('Task Results:', results);
  console.log('Statistics:', taskManager.getStats());
});`,
      explanation: "This task manager demonstrates efficient handling of both sync and async operations by processing sync tasks immediately and async tasks concurrently, maximizing throughput while maintaining responsiveness."
    }
  ],

  quiz: [
    {
      question: "What is the main advantage of asynchronous programming in JavaScript?",
      options: [
        "It makes code run faster",
        "It prevents the main thread from being blocked",
        "It uses less memory",
        "It automatically handles errors"
      ],
      correct: 1,
      explanation: "The main advantage of asynchronous programming is that it prevents blocking the main thread, allowing the application to remain responsive while waiting for long-running operations like network requests or file I/O to complete."
    }
  ],

  resources: [
    {
      title: "MDN - Asynchronous JavaScript",
      url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous"
    },
    {
      title: "JavaScript.info - Event Loop",
      url: "https://javascript.info/event-loop"
    }
  ],

  nextModules: ['promises', 'async-await', 'event-loop'],
  prerequisites: ['functions', 'callbacks', 'event-loop']
};