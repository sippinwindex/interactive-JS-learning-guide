// src/front/data/modules/async/AsyncPatterns.js
export default {
  title: 'Advanced Async Patterns',
  duration: '45 min',
  difficulty: 'Advanced',
  overview: 'Master advanced asynchronous programming patterns. Learn async queues, pools, streams, reactive programming, and complex async workflows.',
  
  keyPoints: [
    'Async queues manage sequential task execution',
    'Resource pools limit concurrent operations',
    'Async iterators enable streaming data processing',
    'Reactive patterns handle event-driven async flows',
    'Backpressure management prevents memory overflow',
    'Cancellation tokens provide operation control'
  ],

  example: `// Async Queue Pattern
console.log('=== Async Queue Pattern ===');

class AsyncQueue {
    constructor(concurrency = 1) {
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
    }
    
    async add(task) {
        return new Promise((resolve, reject) => {
            this.queue.push({
                task,
                resolve,
                reject
            });
            
            this.process();
        });
    }
    
    async process() {
        if (this.running >= this.concurrency || this.queue.length === 0) {
            return;
        }
        
        this.running++;
        const { task, resolve, reject } = this.queue.shift();
        
        try {
            const result = await task();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.running--;
            this.process(); // Process next task
        }
    }
    
    async addAll(tasks) {
        const promises = tasks.map(task => this.add(task));
        return Promise.all(promises);
    }
    
    size() {
        return this.queue.length;
    }
    
    isRunning() {
        return this.running > 0 || this.queue.length > 0;
    }
}

// Example usage
const queue = new AsyncQueue(2); // Max 2 concurrent tasks

async function createTask(id, duration) {
    return async () => {
        console.log(\`Task \${id} started\`);
        await new Promise(resolve => setTimeout(resolve, duration));
        console.log(\`Task \${id} completed\`);
        return \`Result from task \${id}\`;
    };
}

async function demonstrateQueue() {
    const tasks = [
        await createTask(1, 1000),
        await createTask(2, 500),
        await createTask(3, 800),
        await createTask(4, 300),
        await createTask(5, 600)
    ];
    
    console.log('Adding tasks to queue...');
    const results = await queue.addAll(tasks);
    console.log('All tasks completed:', results);
}

demonstrateQueue();

// Resource Pool Pattern
console.log('\\n=== Resource Pool Pattern ===');

class ResourcePool {
    constructor(createResource, destroyResource, maxSize = 10) {
        this.createResource = createResource;
        this.destroyResource = destroyResource;
        this.maxSize = maxSize;
        this.available = [];
        this.inUse = new Set();
        this.waiting = [];
    }
    
    async acquire() {
        // Return available resource if exists
        if (this.available.length > 0) {
            const resource = this.available.pop();
            this.inUse.add(resource);
            return resource;
        }
        
        // Create new resource if under limit
        if (this.inUse.size < this.maxSize) {
            const resource = await this.createResource();
            this.inUse.add(resource);
            return resource;
        }
        
        // Wait for resource to become available
        return new Promise((resolve) => {
            this.waiting.push(resolve);
        });
    }
    
    release(resource) {
        this.inUse.delete(resource);
        
        if (this.waiting.length > 0) {
            // Give to waiting consumer
            const resolve = this.waiting.shift();
            this.inUse.add(resource);
            resolve(resource);
        } else {
            // Return to available pool
            this.available.push(resource);
        }
    }
    
    async destroy() {
        // Destroy all resources
        for (const resource of [...this.available, ...this.inUse]) {
            await this.destroyResource(resource);
        }
        
        this.available = [];
        this.inUse.clear();
        this.waiting = [];
    }
    
    getStats() {
        return {
            available: this.available.length,
            inUse: this.inUse.size,
            waiting: this.waiting.length,
            total: this.available.length + this.inUse.size
        };
    }
}

// Example: Database connection pool
class DatabaseConnection {
    constructor(id) {
        this.id = id;
        this.connected = true;
    }
    
    async query(sql) {
        console.log(\`Connection \${this.id} executing: \${sql}\`);
        await new Promise(resolve => setTimeout(resolve, 100));
        return \`Result from connection \${this.id}\`;
    }
    
    close() {
        this.connected = false;
        console.log(\`Connection \${this.id} closed\`);
    }
}

// Create connection pool
const connectionPool = new ResourcePool(
    async () => {
        const id = Math.random().toString(36).substring(7);
        console.log(\`Creating connection \${id}\`);
        await new Promise(resolve => setTimeout(resolve, 100));
        return new DatabaseConnection(id);
    },
    async (connection) => {
        console.log(\`Destroying connection \${connection.id}\`);
        connection.close();
    },
    3 // Max 3 connections
);

async function demonstratePool() {
    console.log('Demonstrating resource pool...');
    
    // Simulate multiple database operations
    const operations = Array.from({ length: 5 }, async (_, i) => {
        const connection = await connectionPool.acquire();
        console.log('Pool stats after acquire:', connectionPool.getStats());
        
        try {
            const result = await connection.query(\`SELECT * FROM table_\${i}\`);
            console.log('Query result:', result);
        } finally {
            connectionPool.release(connection);
            console.log('Pool stats after release:', connectionPool.getStats());
        }
    });
    
    await Promise.all(operations);
}

demonstratePool();

// Async Iterator Pattern
console.log('\\n=== Async Iterator Pattern ===');

class AsyncDataStream {
    constructor(data, chunkSize = 2, delay = 500) {
        this.data = data;
        this.chunkSize = chunkSize;
        this.delay = delay;
        this.position = 0;
    }
    
    async* [Symbol.asyncIterator]() {
        while (this.position < this.data.length) {
            // Simulate async data fetch
            await new Promise(resolve => setTimeout(resolve, this.delay));
            
            const chunk = this.data.slice(this.position, this.position + this.chunkSize);
            this.position += this.chunkSize;
            
            console.log(\`Streaming chunk: [\${chunk.join(', ')}]\`);
            yield chunk;
        }
    }
    
    async* map(transform) {
        for await (const chunk of this) {
            yield chunk.map(transform);
        }
    }
    
    async* filter(predicate) {
        for await (const chunk of this) {
            const filtered = chunk.filter(predicate);
            if (filtered.length > 0) {
                yield filtered;
            }
        }
    }
    
    async toArray() {
        const result = [];
        for await (const chunk of this) {
            result.push(...chunk);
        }
        return result;
    }
}

async function demonstrateAsyncIterator() {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const stream = new AsyncDataStream(data, 3, 200);
    
    console.log('Processing async stream...');
    
    // Process stream with transformations
    const processedStream = stream
        .map(x => x * 2)
        .filter(x => x > 5);
    
    for await (const chunk of processedStream) {
        console.log('Processed chunk:', chunk);
    }
}

demonstrateAsyncIterator();

// Observable Pattern (Reactive Programming)
console.log('\\n=== Observable Pattern ===');

class Observable {
    constructor(subscribe) {
        this.subscribe = subscribe;
    }
    
    static create(subscribe) {
        return new Observable(subscribe);
    }
    
    static fromArray(array, delay = 100) {
        return new Observable(observer => {
            let index = 0;
            
            const next = () => {
                if (index < array.length) {
                    observer.next(array[index++]);
                    setTimeout(next, delay);
                } else {
                    observer.complete();
                }
            };
            
            setTimeout(next, delay);
            
            return () => console.log('Subscription cancelled');
        });
    }
    
    static interval(delay) {
        return new Observable(observer => {
            let count = 0;
            const intervalId = setInterval(() => {
                observer.next(count++);
            }, delay);
            
            return () => clearInterval(intervalId);
        });
    }
    
    map(transform) {
        return new Observable(observer => {
            return this.subscribe({
                next: value => observer.next(transform(value)),
                error: error => observer.error(error),
                complete: () => observer.complete()
            });
        });
    }
    
    filter(predicate) {
        return new Observable(observer => {
            return this.subscribe({
                next: value => {
                    if (predicate(value)) {
                        observer.next(value);
                    }
                },
                error: error => observer.error(error),
                complete: () => observer.complete()
            });
        });
    }
    
    take(count) {
        return new Observable(observer => {
            let taken = 0;
            const unsubscribe = this.subscribe({
                next: value => {
                    if (taken < count) {
                        observer.next(value);
                        taken++;
                        if (taken === count) {
                            observer.complete();
                            unsubscribe();
                        }
                    }
                },
                error: error => observer.error(error),
                complete: () => observer.complete()
            });
            
            return unsubscribe;
        });
    }
}

// Demonstrate Observable
function demonstrateObservable() {
    console.log('Creating observable from array...');
    
    const numbers$ = Observable.fromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 300);
    
    const subscription = numbers$
        .filter(x => x % 2 === 0)
        .map(x => x * 10)
        .take(3)
        .subscribe({
            next: value => console.log('Observable value:', value),
            error: error => console.error('Observable error:', error),
            complete: () => console.log('Observable completed')
        });
    
    // Clean up after 5 seconds
    setTimeout(() => {
        if (subscription) subscription();
    }, 5000);
}

demonstrateObservable();

// Cancellation Token Pattern
console.log('\\n=== Cancellation Token Pattern ===');

class CancellationToken {
    constructor() {
        this.cancelled = false;
        this.callbacks = [];
    }
    
    cancel() {
        if (this.cancelled) return;
        
        this.cancelled = true;
        this.callbacks.forEach(callback => callback());
        this.callbacks = [];
    }
    
    onCancelled(callback) {
        if (this.cancelled) {
            callback();
        } else {
            this.callbacks.push(callback);
        }
    }
    
    throwIfCancelled() {
        if (this.cancelled) {
            throw new Error('Operation was cancelled');
        }
    }
    
    static create() {
        return new CancellationToken();
    }
    
    static timeout(ms) {
        const token = new CancellationToken();
        setTimeout(() => token.cancel(), ms);
        return token;
    }
}

async function cancellableOperation(name, duration, cancellationToken) {
    console.log(\`Starting \${name}...\`);
    
    const steps = 10;
    const stepDuration = duration / steps;
    
    for (let i = 0; i < steps; i++) {
        cancellationToken.throwIfCancelled();
        
        await new Promise(resolve => setTimeout(resolve, stepDuration));
        console.log(\`\${name} - Step \${i + 1}/\${steps}\`);
    }
    
    console.log(\`\${name} completed!\`);
    return \`Result from \${name}\`;
}

async function demonstrateCancellation() {
    console.log('Demonstrating cancellation...');
    
    const token = CancellationToken.create();
    
    // Cancel after 2 seconds
    setTimeout(() => {
        console.log('Cancelling operation...');
        token.cancel();
    }, 2000);
    
    try {
        const result = await cancellableOperation('Long Task', 5000, token);
        console.log('Operation result:', result);
    } catch (error) {
        console.log('Operation cancelled:', error.message);
    }
}

demonstrateCancellation();

// Backpressure Management
console.log('\\n=== Backpressure Management ===');

class BackpressureStream {
    constructor(bufferSize = 10) {
        this.bufferSize = bufferSize;
        this.buffer = [];
        this.readers = [];
        this.ended = false;
    }
    
    async write(data) {
        if (this.buffer.length >= this.bufferSize) {
            console.log('Buffer full, applying backpressure...');
            
            // Wait for buffer to have space
            await new Promise(resolve => {
                const checkBuffer = () => {
                    if (this.buffer.length < this.bufferSize) {
                        resolve();
                    } else {
                        setTimeout(checkBuffer, 10);
                    }
                };
                checkBuffer();
            });
        }
        
        this.buffer.push(data);
        console.log(\`Wrote data: \${data}, buffer size: \${this.buffer.length}\`);
        
        // Notify waiting readers
        if (this.readers.length > 0) {
            const reader = this.readers.shift();
            reader();
        }
    }
    
    async read() {
        if (this.buffer.length > 0) {
            const data = this.buffer.shift();
            console.log(\`Read data: \${data}, buffer size: \${this.buffer.length}\`);
            return data;
        }
        
        if (this.ended) {
            return null; // End of stream
        }
        
        // Wait for data
        return new Promise(resolve => {
            this.readers.push(() => {
                if (this.buffer.length > 0) {
                    const data = this.buffer.shift();
                    console.log(\`Read data: \${data}, buffer size: \${this.buffer.length}\`);
                    resolve(data);
                } else if (this.ended) {
                    resolve(null);
                }
            });
        });
    }
    
    end() {
        this.ended = true;
        // Notify all waiting readers
        this.readers.forEach(reader => reader());
        this.readers = [];
    }
    
    async* [Symbol.asyncIterator]() {
        while (true) {
            const data = await this.read();
            if (data === null) break;
            yield data;
        }
    }
}

async function demonstrateBackpressure() {
    console.log('Demonstrating backpressure...');
    
    const stream = new BackpressureStream(3);
    
    // Producer (fast)
    const producer = async () => {
        for (let i = 1; i <= 10; i++) {
            await stream.write(\`Item \${i}\`);
            await new Promise(resolve => setTimeout(resolve, 100)); // Fast producer
        }
        stream.end();
        console.log('Producer finished');
    };
    
    // Consumer (slow)
    const consumer = async () => {
        for await (const item of stream) {
            console.log(\`Processing: \${item}\`);
            await new Promise(resolve => setTimeout(resolve, 400)); // Slow consumer
        }
        console.log('Consumer finished');
    };
    
    // Start both
    await Promise.all([producer(), consumer()]);
}

demonstrateBackpressure();

// Circuit Breaker with Async
console.log('\\n=== Async Circuit Breaker ===');

class AsyncCircuitBreaker {
    constructor(threshold = 5, timeout = 60000, monitoringPeriod = 10000) {
        this.threshold = threshold;
        this.timeout = timeout;
        this.monitoringPeriod = monitoringPeriod;
        this.failureCount = 0;
        this.lastFailureTime = null;
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
        this.successCount = 0;
        this.requestCount = 0;
    }
    
    async execute(operation) {
        if (this.state === 'OPEN') {
            if (Date.now() - this.lastFailureTime > this.timeout) {
                this.state = 'HALF_OPEN';
                this.successCount = 0;
                console.log('Circuit breaker: HALF_OPEN');
            } else {
                throw new Error('Circuit breaker is OPEN');
            }
        }
        
        try {
            this.requestCount++;
            const result = await operation();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }
    
    onSuccess() {
        if (this.state === 'HALF_OPEN') {
            this.successCount++;
            if (this.successCount >= 3) { // Success threshold
                this.state = 'CLOSED';
                this.failureCount = 0;
                console.log('Circuit breaker: CLOSED');
            }
        } else {
            this.failureCount = 0;
        }
    }
    
    onFailure() {
        this.failureCount++;
        this.lastFailureTime = Date.now();
        
        if (this.failureCount >= this.threshold) {
            this.state = 'OPEN';
            console.log('Circuit breaker: OPEN');
        }
    }
    
    getStats() {
        return {
            state: this.state,
            failureCount: this.failureCount,
            requestCount: this.requestCount,
            threshold: this.threshold
        };
    }
}

async function demonstrateCircuitBreaker() {
    console.log('Demonstrating circuit breaker...');
    
    const breaker = new AsyncCircuitBreaker(3, 5000);
    
    // Simulate unreliable service
    const unreliableService = async () => {
        const success = Math.random() > 0.7;
        await new Promise(resolve => setTimeout(resolve, 100));
        
        if (success) {
            return 'Service response';
        } else {
            throw new Error('Service failed');
        }
    };
    
    // Test the circuit breaker
    for (let i = 1; i <= 10; i++) {
        try {
            const result = await breaker.execute(unreliableService);
            console.log(\`Request \${i}: \${result}\`);
        } catch (error) {
            console.log(\`Request \${i}: \${error.message}\`);
        }
        
        console.log('Circuit breaker stats:', breaker.getStats());
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

demonstrateCircuitBreaker();

console.log('\\nAdvanced async patterns completed');`,

  exercises: [
    {
      question: "Create an async semaphore that limits the number of concurrent operations:",
      solution: `class AsyncSemaphore {
  constructor(permits) {
    this.permits = permits;
    this.available = permits;
    this.waiting = [];
  }
  
  async acquire() {
    if (this.available > 0) {
      this.available--;
      return;
    }
    
    return new Promise(resolve => {
      this.waiting.push(resolve);
    });
  }
  
  release() {
    if (this.waiting.length > 0) {
      const resolve = this.waiting.shift();
      resolve();
    } else {
      this.available++;
    }
  }
  
  async withPermit(operation) {
    await this.acquire();
    try {
      return await operation();
    } finally {
      this.release();
    }
  }
}

// Usage:
const semaphore = new AsyncSemaphore(3);
const result = await semaphore.withPermit(async () => {
  // Limited concurrent operation
  return await fetch('/api/data');
});`,
      explanation: "A semaphore controls access to a resource by limiting the number of concurrent operations that can proceed."
    }
  ],

  quiz: [
    {
      question: "What is the main purpose of backpressure in async streams?",
      options: [
        "To increase processing speed",
        "To prevent memory overflow when consumers are slower than producers",
        "To handle errors better",
        "To enable parallel processing"
      ],
      correct: 1,
      explanation: "Backpressure prevents memory overflow by slowing down producers when consumers can't keep up with the data flow."
    }
  ],

  resources: [
    {
      title: "Async Iteration Proposal",
      url: "https://github.com/tc39/proposal-async-iteration"
    }
  ],

  nextModules: ['generators', 'event-loop'],
  prerequisites: ['async-await', 'promises']
};