// src/front/components/docs/AsyncSection.jsx
import React from 'react';
import { CodeBlock } from '../CodeBlock';

export const AsyncSection = ({ runCode, runOutput }) => {
  const content = [
    {
      title: 'Promise Deep Dive',
      description: 'Advanced Promise patterns and combinators',
      code: `// Promise creation and error handling
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        // Simulate API call with random delay
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
        }, Math.random() * 1000);
    });
}

// Promise combinators demonstration
async function demonstratePromiseCombinators() {
    const userIds = [1, 2, 3];
    
    console.log('=== Promise.all ===');
    // Promise.all - Waits for all, fails if any fails
    try {
        const allUsers = await Promise.all(
            userIds.map(id => fetchUserData(id))
        );
        console.log('All users loaded:', allUsers.length);
    } catch (error) {
        console.error('Promise.all failed:', error.message);
    }
    
    console.log('\\n=== Promise.allSettled ===');
    // Promise.allSettled - Waits for all, never fails
    const settledResults = await Promise.allSettled(
        [1, -1, 2].map(id => fetchUserData(id))
    );
    
    settledResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log(\`User \${index + 1}: \${result.value.name}\`);
        } else {
            console.log(\`User \${index + 1} failed: \${result.reason.message}\`);
        }
    });
    
    console.log('\\n=== Promise.race ===');
    // Promise.race - First to complete (resolve or reject)
    try {
        const fastestUser = await Promise.race(
            userIds.map(id => fetchUserData(id))
        );
        console.log('Fastest response:', fastestUser.name);
    } catch (error) {
        console.error('Fastest response was an error:', error.message);
    }
    
    console.log('\\n=== Promise.any ===');
    // Promise.any - First to resolve (ignores rejections)
    try {
        const firstSuccess = await Promise.any(
            [-1, -2, 3].map(id => fetchUserData(id))
        );
        console.log('First successful response:', firstSuccess.name);
    } catch (error) {
        console.error('All promises rejected');
    }
}

// Run the demonstration
demonstratePromiseCombinators().then(() => {
    console.log('\\nPromise combinators demo completed!');
});

// Promise chaining vs async/await
console.log('\\n=== Promise Chaining vs Async/Await ===');

// Traditional promise chaining
fetchUserData(1)
    .then(user => {
        console.log('Promise chain - User:', user.name);
        return \`Processed: \${user.name}\`;
    })
    .then(processed => {
        console.log('Promise chain - Processed:', processed);
    })
    .catch(error => {
        console.error('Promise chain error:', error.message);
    });`
    },
    {
      title: 'Async/Await Patterns and Best Practices',
      description: 'Modern async programming techniques and error handling',
      code: `// Sequential vs Parallel execution comparison
async function sequentialVsParallel() {
    console.log('=== Sequential vs Parallel Execution ===');
    
    // Sequential (slow) - each waits for previous
    console.time('Sequential');
    try {
        const user1 = await fetchUserData(1);
        const user2 = await fetchUserData(2);
        const user3 = await fetchUserData(3);
        console.timeEnd('Sequential');
        console.log('Sequential results:', [user1.name, user2.name, user3.name]);
    } catch (error) {
        console.timeEnd('Sequential');
        console.error('Sequential error:', error.message);
    }
    
    // Parallel (fast) - all start simultaneously
    console.time('Parallel');
    try {
        const [pUser1, pUser2, pUser3] = await Promise.all([
            fetchUserData(1),
            fetchUserData(2),
            fetchUserData(3)
        ]);
        console.timeEnd('Parallel');
        console.log('Parallel results:', [pUser1.name, pUser2.name, pUser3.name]);
    } catch (error) {
        console.timeEnd('Parallel');
        console.error('Parallel error:', error.message);
    }
}

// Advanced error handling patterns
async function robustErrorHandling() {
    console.log('\\n=== Advanced Error Handling ===');
    
    // Multiple error types
    class ValidationError extends Error {
        constructor(message) {
            super(message);
            this.name = 'ValidationError';
        }
    }
    
    class NetworkError extends Error {
        constructor(message) {
            super(message);
            this.name = 'NetworkError';
        }
    }
    
    async function processUserData(userId) {
        try {
            if (userId < 0) {
                throw new ValidationError('User ID must be positive');
            }
            
            const userData = await fetchUserData(userId);
            
            if (!userData.email) {
                throw new ValidationError('User email is required');
            }
            
            return \`Processed user: \${userData.name}\`;
        } catch (error) {
            if (error instanceof ValidationError) {
                console.error('Validation error:', error.message);
                return 'Default user data';
            } else if (error instanceof NetworkError) {
                console.error('Network error:', error.message);
                throw new Error('Please check your connection');
            } else {
                console.error('Unexpected error:', error);
                throw error; // Re-throw unknown errors
            }
        }
    }
    
    // Test error handling
    try {
        const result1 = await processUserData(-1);
        console.log('Result 1:', result1);
        
        const result2 = await processUserData(1);
        console.log('Result 2:', result2);
    } catch (error) {
        console.error('Final error:', error.message);
    }
}

// Async iteration patterns
async function* fetchUserPages() {
    console.log('\\n=== Async Iteration ===');
    let page = 1;
    const maxPages = 3;
    
    while (page <= maxPages) {
        try {
            console.log(\`Fetching page \${page}...\`);
            // Simulate fetching a page of users
            const users = await Promise.all([
                fetchUserData(page * 2 - 1),
                fetchUserData(page * 2)
            ]);
            
            yield { page, users, hasMore: page < maxPages };
            page++;
        } catch (error) {
            console.error(\`Failed to fetch page \${page}:`, error.message);
            break;
        }
    }
}

async function processAllUsers() {
    for await (const userBatch of fetchUserPages()) {
        console.log(\`Page \${userBatch.page}: \${userBatch.users.length} users\`);
        userBatch.users.forEach(user => {
            console.log(\`  - \${user.name}\`);
        });
    }
}

// AbortController for cancellation
async function cancellableOperations() {
    console.log('\\n=== Cancellable Operations ===');
    
    const controller = new AbortController();
    
    // Cancel after 2 seconds
    setTimeout(() => {
        console.log('Cancelling operation...');
        controller.abort();
    }, 2000);
    
    try {
        // Simulate a long-running operation
        const result = await new Promise((resolve, reject) => {
            const timer = setTimeout(() => {
                resolve('Operation completed successfully!');
            }, 3000);
            
            // Listen for abort signal
            controller.signal.addEventListener('abort', () => {
                clearTimeout(timer);
                reject(new Error('Operation was cancelled'));
            });
        });
        
        console.log(result);
    } catch (error) {
        if (error.message.includes('cancelled')) {
            console.log('Operation was successfully cancelled');
        } else {
            console.error('Operation failed:', error.message);
        }
    }
}

// Run all examples
sequentialVsParallel();
robustErrorHandling();
processAllUsers();
cancellableOperations();`
    },
    {
      title: 'Real-World Async Patterns',
      description: 'Practical patterns for real applications',
      code: `// Retry mechanism with exponential backoff
async function withRetry(asyncFn, maxRetries = 3, baseDelay = 1000) {
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            return await asyncFn();
        } catch (error) {
            if (attempt === maxRetries) {
                throw error;
            }
            
            const delay = baseDelay * Math.pow(2, attempt - 1);
            console.log(\`Attempt \${attempt} failed, retrying in \${delay}ms...\`);
            await new Promise(resolve => setTimeout(resolve, delay));
        }
    }
}

// Circuit breaker pattern
class CircuitBreaker {
    constructor(threshold = 5, timeout = 60000) {
        this.threshold = threshold;
        this.timeout = timeout;
        this.failureCount = 0;
        this.lastFailureTime = null;
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    }
    
    async execute(asyncFn) {
        if (this.state === 'OPEN') {
            if (Date.now() - this.lastFailureTime > this.timeout) {
                this.state = 'HALF_OPEN';
            } else {
                throw new Error('Circuit breaker is OPEN');
            }
        }
        
        try {
            const result = await asyncFn();
            this.reset();
            return result;
        } catch (error) {
            this.recordFailure();
            throw error;
        }
    }
    
    recordFailure() {
        this.failureCount++;
        this.lastFailureTime = Date.now();
        
        if (this.failureCount >= this.threshold) {
            this.state = 'OPEN';
            console.log('Circuit breaker opened due to failures');
        }
    }
    
    reset() {
        this.failureCount = 0;
        this.state = 'CLOSED';
    }
}

// Rate limiter
class RateLimiter {
    constructor(maxRequests = 10, timeWindow = 1000) {
        this.maxRequests = maxRequests;
        this.timeWindow = timeWindow;
        this.requests = [];
    }
    
    async execute(asyncFn) {
        const now = Date.now();
        
        // Remove old requests outside the time window
        this.requests = this.requests.filter(
            timestamp => now - timestamp < this.timeWindow
        );
        
        if (this.requests.length >= this.maxRequests) {
            const oldestRequest = this.requests[0];
            const waitTime = this.timeWindow - (now - oldestRequest);
            console.log(\`Rate limit reached, waiting \${waitTime}ms...\`);
            await new Promise(resolve => setTimeout(resolve, waitTime));
            return this.execute(asyncFn);
        }
        
        this.requests.push(now);
        return await asyncFn();
    }
}

// Practical examples
async function demonstratePatterns() {
    console.log('=== Retry Pattern ===');
    
    // Simulate an unreliable API
    let attempts = 0;
    const unreliableAPI = async () => {
        attempts++;
        if (attempts < 3) {
            throw new Error(\`API call failed (attempt \${attempts})\`);
        }
        return 'API call succeeded!';
    };
    
    try {
        const result = await withRetry(unreliableAPI, 5, 500);
        console.log('Retry result:', result);
    } catch (error) {
        console.error('All retries failed:', error.message);
    }
    
    console.log('\\n=== Circuit Breaker Pattern ===');
    const circuitBreaker = new CircuitBreaker(2, 3000);
    
    // Simulate multiple failures
    for (let i = 0; i < 5; i++) {
        try {
            await circuitBreaker.execute(async () => {
                if (i < 3) throw new Error('Service unavailable');
                return 'Service working';
            });
        } catch (error) {
            console.log(\`Request \${i + 1}: \${error.message}\`);
        }
    }
    
    console.log('\\n=== Rate Limiter Pattern ===');
    const rateLimiter = new RateLimiter(3, 2000);
    
    // Make rapid requests
    for (let i = 0; i < 5; i++) {
        try {
            await rateLimiter.execute(async () => {
                console.log(\`Request \${i + 1} processed at \${new Date().toLocaleTimeString()}\`);
                return \`Response \${i + 1}\`;
            });
        } catch (error) {
            console.error('Request failed:', error.message);
        }
    }
}

demonstratePatterns();`
    }
  ];

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Master asynchronous JavaScript programming with advanced patterns and best practices. 
          Learn to handle complex async scenarios with confidence and build robust applications.
        </p>
      </div>

      {content.map((item, index) => (
        <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-b-0">
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
            {item.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {item.description}
          </p>
          
          <CodeBlock 
            code={item.code}
            language="javascript"
            onRun={() => runCode(item.code)}
            output={runOutput}
          />
        </div>
      ))}

      {/* Async Programming Best Practices */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mt-8">
        <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-4">
          ⚡ Async Programming Best Practices
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-green-700 dark:text-green-300">
          <div>
            <h5 className="font-medium mb-2">Performance Tips:</h5>
            <ul className="text-sm space-y-1">
              <li>• Use <code>Promise.all()</code> for parallel operations</li>
              <li>• Avoid awaiting in loops for independent operations</li>
              <li>• Implement proper error boundaries</li>
              <li>• Use AbortController for cancellation</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2">Error Handling:</h5>
            <ul className="text-sm space-y-1">
              <li>• Create custom error classes</li>
              <li>• Implement retry mechanisms</li>
              <li>• Use circuit breakers for resilience</li>
              <li>• Always handle promise rejections</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};