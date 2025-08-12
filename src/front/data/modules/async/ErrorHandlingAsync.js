// src/front/data/modules/async/ErrorHandlingAsync.js
export default {
  title: 'Async Error Handling',
  duration: '35 min',
  difficulty: 'Intermediate',
  overview: 'Master error handling in asynchronous JavaScript code. Learn try/catch with async/await, Promise error handling, and error recovery patterns.',
  
  keyPoints: [
    'Use try/catch blocks with async/await for synchronous-style error handling',
    'Promise.catch() handles rejected promises',
    'Unhandled promise rejections can crash applications',
    'Error boundaries prevent cascading failures',
    'Retry mechanisms handle transient failures',
    'Proper error logging helps with debugging'
  ],

  example: `// Basic Async Error Handling
console.log('=== Basic Async Error Handling ===');

// Async function that might throw
async function riskyOperation(shouldFail = false) {
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (shouldFail) {
        throw new Error('Operation failed!');
    }
    
    return 'Operation successful';
}

// Try/catch with async/await
async function handleWithTryCatch() {
    try {
        console.log('Attempting risky operation...');
        const result = await riskyOperation(true);
        console.log('Success:', result);
        return result;
    } catch (error) {
        console.error('Caught error:', error.message);
        return 'Error handled';
    }
}

handleWithTryCatch();

// Promise-based error handling
function handleWithPromise() {
    return riskyOperation(true)
        .then(result => {
            console.log('Promise success:', result);
            return result;
        })
        .catch(error => {
            console.error('Promise error:', error.message);
            return 'Promise error handled';
        });
}

handleWithPromise();

// Multiple Error Types
console.log('\\n=== Multiple Error Types ===');

class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
    }
}

class NetworkError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'NetworkError';
        this.statusCode = statusCode;
    }
}

class TimeoutError extends Error {
    constructor(message, timeout) {
        super(message);
        this.name = 'TimeoutError';
        this.timeout = timeout;
    }
}

async function complexOperation(data) {
    // Validation
    if (!data.email) {
        throw new ValidationError('Email is required', 'email');
    }
    
    if (!data.email.includes('@')) {
        throw new ValidationError('Invalid email format', 'email');
    }
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const random = Math.random();
    if (random < 0.3) {
        throw new NetworkError('Server error', 500);
    }
    
    if (random < 0.5) {
        throw new TimeoutError('Request timeout', 5000);
    }
    
    return { success: true, data };
}

async function handleSpecificErrors() {
    const testData = { email: 'user@example.com' };
    
    try {
        const result = await complexOperation(testData);
        console.log('Complex operation result:', result);
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error(\`Validation error in field '\${error.field}': \${error.message}\`);
        } else if (error instanceof NetworkError) {
            console.error(\`Network error (code \${error.statusCode}): \${error.message}\`);
        } else if (error instanceof TimeoutError) {
            console.error(\`Timeout error (after \${error.timeout}ms): \${error.message}\`);
        } else {
            console.error('Unknown error:', error.message);
        }
    }
}

handleSpecificErrors();

// Error Aggregation
console.log('\\n=== Error Aggregation ===');

async function validateUserData(userData) {
    const errors = [];
    
    // Validate multiple fields
    if (!userData.name) {
        errors.push(new ValidationError('Name is required', 'name'));
    }
    
    if (!userData.email) {
        errors.push(new ValidationError('Email is required', 'email'));
    } else if (!userData.email.includes('@')) {
        errors.push(new ValidationError('Invalid email format', 'email'));
    }
    
    if (!userData.age || userData.age < 18) {
        errors.push(new ValidationError('Must be at least 18 years old', 'age'));
    }
    
    if (errors.length > 0) {
        const aggregateError = new Error('Validation failed');
        aggregateError.name = 'AggregateValidationError';
        aggregateError.errors = errors;
        throw aggregateError;
    }
    
    return userData;
}

async function handleAggregateErrors() {
    const invalidUserData = {
        name: '',
        email: 'invalid-email',
        age: 16
    };
    
    try {
        await validateUserData(invalidUserData);
    } catch (error) {
        if (error.name === 'AggregateValidationError') {
            console.error('Multiple validation errors:');
            error.errors.forEach((err, index) => {
                console.error(\`  \${index + 1}. \${err.field}: \${err.message}\`);
            });
        }
    }
}

handleAggregateErrors();

// Promise.allSettled for Handling Multiple Async Operations
console.log('\\n=== Handling Multiple Operations ===');

async function fetchUserData(userId) {
    await new Promise(resolve => setTimeout(resolve, Math.random() * 500));
    
    if (userId === 3) {
        throw new Error(\`User \${userId} not found\`);
    }
    
    return { id: userId, name: \`User \${userId}\` };
}

async function handleMultipleOperations() {
    const userIds = [1, 2, 3, 4, 5];
    
    // Using Promise.allSettled to handle both success and failure
    const results = await Promise.allSettled(
        userIds.map(id => fetchUserData(id))
    );
    
    const successful = [];
    const failed = [];
    
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            successful.push(result.value);
        } else {
            failed.push({
                userId: userIds[index],
                error: result.reason.message
            });
        }
    });
    
    console.log('Successful operations:', successful);
    console.log('Failed operations:', failed);
    
    return { successful, failed };
}

handleMultipleOperations();

// Retry Mechanism with Exponential Backoff
console.log('\\n=== Retry Mechanism ===');

async function retryWithBackoff(operation, maxRetries = 3, baseDelay = 1000) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(\`Attempt \${attempt}/\${maxRetries}\`);
            const result = await operation();
            console.log('Operation succeeded on attempt', attempt);
            return result;
        } catch (error) {
            lastError = error;
            console.log(\`Attempt \${attempt} failed: \${error.message}\`);
            
            if (attempt < maxRetries) {
                const delay = baseDelay * Math.pow(2, attempt - 1);
                console.log(\`Waiting \${delay}ms before retry...\`);
                await new Promise(resolve => setTimeout(resolve, delay));
            }
        }
    }
    
    throw new Error(\`Operation failed after \${maxRetries} attempts. Last error: \${lastError.message}\`);
}

// Flaky operation for testing
async function flakyOperation() {
    if (Math.random() < 0.7) {
        throw new Error('Random failure');
    }
    return 'Success!';
}

async function testRetryMechanism() {
    try {
        const result = await retryWithBackoff(flakyOperation, 5, 500);
        console.log('Retry result:', result);
    } catch (error) {
        console.error('All retries failed:', error.message);
    }
}

testRetryMechanism();

// Timeout Handling
console.log('\\n=== Timeout Handling ===');

async function withTimeout(promise, timeoutMs, timeoutMessage = 'Operation timed out') {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new TimeoutError(timeoutMessage, timeoutMs));
        }, timeoutMs);
    });
    
    return Promise.race([promise, timeoutPromise]);
}

async function slowOperation(delay) {
    console.log(\`Starting slow operation (will take \${delay}ms)...\`);
    await new Promise(resolve => setTimeout(resolve, delay));
    return 'Slow operation completed';
}

async function testTimeoutHandling() {
    try {
        // This should succeed
        const result1 = await withTimeout(slowOperation(500), 1000);
        console.log('Result 1:', result1);
        
        // This should timeout
        const result2 = await withTimeout(slowOperation(2000), 1000);
        console.log('Result 2:', result2);
    } catch (error) {
        if (error instanceof TimeoutError) {
            console.error(\`Timeout after \${error.timeout}ms: \${error.message}\`);
        } else {
            console.error('Other error:', error.message);
        }
    }
}

testTimeoutHandling();

// Circuit Breaker Pattern for Error Handling
console.log('\\n=== Circuit Breaker Pattern ===');

class CircuitBreaker {
    constructor(threshold = 5, resetTimeout = 60000) {
        this.threshold = threshold;
        this.resetTimeout = resetTimeout;
        this.failureCount = 0;
        this.lastFailureTime = null;
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    }
    
    async execute(operation) {
        if (this.state === 'OPEN') {
            if (Date.now() - this.lastFailureTime > this.resetTimeout) {
                this.state = 'HALF_OPEN';
                console.log('Circuit breaker: HALF_OPEN');
            } else {
                throw new Error('Circuit breaker is OPEN - operation blocked');
            }
        }
        
        try {
            const result = await operation();
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }
    
    onSuccess() {
        this.failureCount = 0;
        this.state = 'CLOSED';
        console.log('Circuit breaker: CLOSED');
    }
    
    onFailure() {
        this.failureCount++;
        this.lastFailureTime = Date.now();
        
        if (this.failureCount >= this.threshold) {
            this.state = 'OPEN';
            console.log(\`Circuit breaker: OPEN (failures: \${this.failureCount})\`);
        }
    }
    
    getState() {
        return {
            state: this.state,
            failureCount: this.failureCount,
            threshold: this.threshold
        };
    }
}

// Test circuit breaker
async function testCircuitBreaker() {
    const breaker = new CircuitBreaker(3, 5000);
    
    // Unreliable service that fails most of the time
    const unreliableService = async () => {
        if (Math.random() < 0.8) {
            throw new Error('Service unavailable');
        }
        return 'Service response';
    };
    
    // Test multiple requests
    for (let i = 1; i <= 8; i++) {
        try {
            const result = await breaker.execute(unreliableService);
            console.log(\`Request \${i}: \${result}\`);
        } catch (error) {
            console.log(\`Request \${i}: \${error.message}\`);
        }
        
        console.log('Breaker state:', breaker.getState());
        await new Promise(resolve => setTimeout(resolve, 200));
    }
}

testCircuitBreaker();

// Error Recovery Strategies
console.log('\\n=== Error Recovery Strategies ===');

class ErrorRecoveryService {
    constructor() {
        this.fallbackData = new Map();
        this.cache = new Map();
    }
    
    setFallback(key, data) {
        this.fallbackData.set(key, data);
    }
    
    async fetchWithRecovery(key, primaryFetcher, options = {}) {
        const { enableCache = true, enableFallback = true, maxRetries = 2 } = options;
        
        // Try cache first
        if (enableCache && this.cache.has(key)) {
            console.log('Returning cached data');
            return this.cache.get(key);
        }
        
        // Try primary fetch with retries
        try {
            const data = await retryWithBackoff(primaryFetcher, maxRetries, 500);
            
            if (enableCache) {
                this.cache.set(key, data);
            }
            
            return data;
        } catch (primaryError) {
            console.warn('Primary fetch failed:', primaryError.message);
            
            // Try fallback data
            if (enableFallback && this.fallbackData.has(key)) {
                console.log('Using fallback data');
                return {
                    ...this.fallbackData.get(key),
                    isFallback: true
                };
            }
            
            // Try stale cache data
            if (this.cache.has(key)) {
                console.log('Using stale cache data');
                return {
                    ...this.cache.get(key),
                    isStale: true
                };
            }
            
            // All recovery options exhausted
            throw new Error(\`All recovery strategies failed for '\${key}': \${primaryError.message}\`);
        }
    }
}

// Test error recovery
async function testErrorRecovery() {
    const recoveryService = new ErrorRecoveryService();
    
    // Set fallback data
    recoveryService.setFallback('user-profile', {
        name: 'Default User',
        email: 'default@example.com'
    });
    
    // Simulate unreliable API
    const unreliableAPI = async () => {
        if (Math.random() < 0.8) {
            throw new Error('API unavailable');
        }
        return {
            name: 'John Doe',
            email: 'john@example.com',
            premium: true
        };
    };
    
    try {
        const userProfile = await recoveryService.fetchWithRecovery(
            'user-profile',
            unreliableAPI,
            { enableCache: true, enableFallback: true, maxRetries: 2 }
        );
        
        console.log('User profile:', userProfile);
        
        if (userProfile.isFallback) {
            console.log('⚠️  Using fallback data due to service unavailability');
        } else if (userProfile.isStale) {
            console.log('⚠️  Using stale cached data');
        }
        
    } catch (error) {
        console.error('Complete failure:', error.message);
    }
}

testErrorRecovery();

// Async Error Boundary
console.log('\\n=== Async Error Boundary ===');

class AsyncErrorBoundary {
    constructor() {
        this.errorHandlers = new Map();
        this.globalErrorHandler = null;
    }
    
    addErrorHandler(errorType, handler) {
        this.errorHandlers.set(errorType, handler);
    }
    
    setGlobalErrorHandler(handler) {
        this.globalErrorHandler = handler;
    }
    
    async safeExecute(operation, context = {}) {
        try {
            return await operation();
        } catch (error) {
            return this.handleError(error, context);
        }
    }
    
    handleError(error, context) {
        console.log(\`Handling error: \${error.name} - \${error.message}\`);
        
        // Try specific error handler
        const handler = this.errorHandlers.get(error.constructor.name);
        if (handler) {
            return handler(error, context);
        }
        
        // Try global error handler
        if (this.globalErrorHandler) {
            return this.globalErrorHandler(error, context);
        }
        
        // Default handling
        console.error('Unhandled error:', error);
        return {
            success: false,
            error: error.message,
            context
        };
    }
}

// Test error boundary
async function testErrorBoundary() {
    const boundary = new AsyncErrorBoundary();
    
    // Register error handlers
    boundary.addErrorHandler('ValidationError', (error, context) => {
        console.log(\`Validation failed for field '\${error.field}'\`);
        return {
            success: false,
            validationError: true,
            field: error.field,
            message: error.message
        };
    });
    
    boundary.addErrorHandler('NetworkError', (error, context) => {
        console.log(\`Network error with status \${error.statusCode}\`);
        return {
            success: false,
            networkError: true,
            statusCode: error.statusCode,
            retry: error.statusCode >= 500
        };
    });
    
    boundary.setGlobalErrorHandler((error, context) => {
        console.log('Global error handler triggered');
        return {
            success: false,
            error: 'Something went wrong',
            originalError: error.message
        };
    });
    
    // Test different error types
    const tests = [
        () => { throw new ValidationError('Required field missing', 'email'); },
        () => { throw new NetworkError('Server error', 500); },
        () => { throw new Error('Unknown error'); }
    ];
    
    for (const test of tests) {
        const result = await boundary.safeExecute(test);
        console.log('Error boundary result:', result);
    }
}

testErrorBoundary();

console.log('\\nAsync error handling examples completed');`,

  exercises: [
    {
      question: "Create an async function that handles multiple types of errors with different recovery strategies:",
      solution: `async function robustDataFetcher(url, options = {}) {
  const { retries = 3, timeout = 5000, fallbackData = null } = options;
  
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      // Add timeout to fetch
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      
      const response = await fetch(url, {
        signal: controller.signal,
        ...options
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new NetworkError(\`HTTP \${response.status}\`, response.status);
      }
      
      return await response.json();
      
    } catch (error) {
      console.log(\`Attempt \${attempt} failed: \${error.message}\`);
      
      if (error.name === 'AbortError') {
        // Timeout error
        if (attempt === retries) {
          return fallbackData || { error: 'Request timeout' };
        }
      } else if (error instanceof NetworkError && error.statusCode >= 500) {
        // Server error - retry
        if (attempt < retries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
          continue;
        }
      } else {
        // Client error or other - don't retry
        break;
      }
    }
  }
  
  return fallbackData || { error: 'Request failed after retries' };
}`,
      explanation: "This function demonstrates timeout handling, retry logic with exponential backoff, and graceful degradation with fallback data."
    }
  ],

  quiz: [
    {
      question: "When should you use Promise.allSettled() instead of Promise.all()?",
      options: [
        "When you need faster execution",
        "When you want to handle both successful and failed operations",
        "When working with small datasets only",
        "When promises don't return values"
      ],
      correct: 1,
      explanation: "Promise.allSettled() waits for all promises to complete and returns results for both successful and failed operations, unlike Promise.all() which fails fast."
    }
  ],

  resources: [
    {
      title: "MDN - Promise Error Handling",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises#error_handling"
    }
  ],

  nextModules: ['testing', 'debugging'],
  prerequisites: ['async-await', 'promises', 'error-handling-basics']
};