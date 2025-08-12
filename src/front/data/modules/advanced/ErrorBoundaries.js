export default {
  title: 'Error Boundaries and Global Error Handling',
  duration: '35 min',
  difficulty: 'Advanced',
  overview: 'Learn to implement comprehensive error handling strategies. Master global error handling, error boundaries, and graceful failure patterns.',

  keyPoints: [
    'Global error handlers catch unhandled exceptions',
    'Error boundaries prevent entire application crashes',
    'Graceful degradation maintains user experience',
    'Error logging helps with debugging and monitoring',
    'Circuit breaker pattern prevents cascading failures',
    'Retry mechanisms handle transient failures'
  ],
  example: `// Global Error Handling
console.log('=== Global Error Handling ===');
// Handle uncaught errors
window.addEventListener('error', (event) => {
    console.error('Global error caught:', {
        message: event.message,
        filename: event.filename,
        lineNumber: event.lineno,
        columnNumber: event.colno,
        error: event.error
    });

    // Send to logging service
    logError('JavaScript Error', {
        message: event.message,
        source: event.filename,
        line: event.lineno,
        column: event.colno,
        stack: event.error?.stack
    });
});
// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);

    logError('Promise Rejection', {
        reason: event.reason,
        promise: event.promise
    });

    // Prevent default browser behavior
    event.preventDefault();
});
// Error logging utility
function logError(type, details) {
    const errorReport = {
        type,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
        details
    };

    console.log('Error Report:', errorReport);

    // In production, send to monitoring service
    // sendToMonitoringService(errorReport);
}
// Error Boundary Implementation (React-style concept)
console.log('=== Error Boundary Pattern ===');
class ErrorBoundary {
    constructor(fallbackUI) {
        this.fallbackUI = fallbackUI;
        this.hasError = false;
        this.error = null;
    }

    catch(fn) {
        try {
            return fn();
        } catch (error) {
            this.hasError = true;
            this.error = error;
            console.error('Error boundary caught:', error);

            logError('Component Error', {
                message: error.message,
                stack: error.stack
            });

            return this.fallbackUI;
        }
    }

    reset() {
        this.hasError = false;
        this.error = null;
    }
}
// Usage example
const boundary = new ErrorBoundary('❌ Something went wrong');
const result1 = boundary.catch(() => {
    return 'Normal operation';
});
const result2 = boundary.catch(() => {
    throw new Error('Component crashed!');
});
console.log('Result 1:', result1);
console.log('Result 2:', result2);
// Safe Component Wrapper
console.log('=== Safe Component Wrapper ===');
function safeComponent(componentFn, fallback = 'Error occurred') {
    return function(...args) {
        try {
            return componentFn.apply(this, args);
        } catch (error) {
            console.error('Component error:', error);
            logError('Safe Component', {
                component: componentFn.name,
                args,
                error: error.message
            });
            return fallback;
        }
    };
}
// Example component that might fail
function userProfile(user) {
    if (!user) {
        throw new Error('User is required');
    }
    return \`Profile: \${user.name} (\${user.email})\`;
}
// Wrap in safety layer
const safeUserProfile = safeComponent(userProfile, 'Unable to load profile');
console.log('Safe call 1:', safeUserProfile({ name: 'Alice', email: 'alice@example.com' }));
console.log('Safe call 2:', safeUserProfile(null)); // Will use fallback
// Circuit Breaker Pattern
console.log('=== Circuit Breaker Pattern ===');
class CircuitBreaker {
    constructor(threshold = 5, timeout = 60000) {
        this.threshold = threshold;
        this.timeout = timeout;
        this.failureCount = 0;
        this.lastFailureTime = null;
        this.state = 'CLOSED'; // CLOSED, OPEN, HALF_OPEN
    }

    async call(operation) {
        if (this.state === 'OPEN') {
            if (Date.now() - this.lastFailureTime > this.timeout) {
                this.state = 'HALF_OPEN';
                console.log('Circuit breaker: HALF_OPEN - trying operation');
            } else {
                throw new Error('Circuit breaker is OPEN');
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
        console.log('Circuit breaker: CLOSED - operation successful');
    }

    onFailure() {
        this.failureCount++;
        this.lastFailureTime = Date.now();

        if (this.failureCount >= this.threshold) {
            this.state = 'OPEN';
            console.log('Circuit breaker: OPEN - too many failures');
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
// Simulate unreliable service
async function unreliableService() {
    const success = Math.random() > 0.7; // 30% success rate
    await new Promise(resolve => setTimeout(resolve, 100));

    if (success) {
        return 'Service response';
    } else {
        throw new Error('Service failed');
    }
}
// Test circuit breaker
const breaker = new CircuitBreaker(3, 5000);
async function testCircuitBreaker() {
    for (let i = 0; i < 10; i++) {
        try {
            const result = await breaker.call(unreliableService);
            console.log(\`Attempt \${i + 1}: \${result}\`);
        } catch (error) {
            console.log(\`Attempt \${i + 1}: \${error.message}\`);
        }
        console.log('Breaker state:', breaker.getState());

        // Wait between attempts
        await new Promise(resolve => setTimeout(resolve, 200));
    }
}
// Retry Mechanism
console.log('=== Retry Mechanism ===');
async function retryOperation(operation, maxRetries = 3, delay = 1000) {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(\`Attempt \${attempt}/\${maxRetries}\`);
            const result = await operation();
            console.log('Operation succeeded');
            return result;
        } catch (error) {
            lastError = error;
            console.log(\`Attempt \${attempt} failed: \${error.message}\`);

            if (attempt < maxRetries) {
                console.log(\`Retrying in \${delay}ms...\`);
                await new Promise(resolve => setTimeout(resolve, delay));
                delay *= 2; // Exponential backoff
            }
        }
    }

    throw new Error(\`Operation failed after \${maxRetries} attempts: \${lastError.message}\`);
}
// Test retry mechanism
async function flakyOperation() {
    const success = Math.random() > 0.6;
    if (success) {
        return 'Operation completed';
    } else {
        throw new Error('Operation failed');
    }
}
// Graceful Degradation
console.log('=== Graceful Degradation ===');
class FeatureManager {
    constructor() {
        this.features = new Map();
        this.fallbacks = new Map();
    }

    registerFeature(name, implementation, fallback) {
        this.features.set(name, implementation);
        this.fallbacks.set(name, fallback);
    }

    async useFeature(name, ...args) {
        try {
            const feature = this.features.get(name);
            if (!feature) {
                throw new Error(\`Feature \${name} not found\`);
            }

            return await feature(...args);
        } catch (error) {
            console.warn(\`Feature \${name} failed, using fallback:\`, error.message);

            const fallback = this.fallbacks.get(name);
            if (fallback) {
                return fallback(...args);
            }

            return \`Feature \${name} unavailable\`;
        }
    }
}
// Setup feature manager
const featureManager = new FeatureManager();
// Register features with fallbacks
featureManager.registerFeature(
    'geolocation',
    async () => {
        // Simulate geolocation API
        if (Math.random() > 0.5) {
            return { lat: 40.7128, lng: -74.0060 };
        } else {
            throw new Error('Geolocation denied');
        }
    },
    () => ({ lat: 0, lng: 0, fallback: true })
);
featureManager.registerFeature(
    'camera',
    async () => {
        // Simulate camera access
        if (Math.random() > 0.3) {
            return 'Camera stream active';
        } else {
            throw new Error('Camera not available');
        }
    },
    () => 'Camera feature disabled'
);
// Test graceful degradation
async function testFeatures() {
    const location = await featureManager.useFeature('geolocation');
    console.log('Location:', location);

    const camera = await featureManager.useFeature('camera');
    console.log('Camera:', camera);
}
testFeatures();
// Error Recovery Strategies
console.log('=== Error Recovery ===');
class RobustDataLoader {
    constructor() {
        this.cache = new Map();
        this.retryAttempts = 3;
    }

    async loadData(url) {
        // Try cache first
        if (this.cache.has(url)) {
            console.log('Returning cached data');
            return this.cache.get(url);
        }

        try {
            // Try to load fresh data
            const data = await this.fetchWithRetry(url);
            this.cache.set(url, data);
            return data;
        } catch (error) {
            // Try to recover with stale data
            console.warn('Failed to load fresh data, checking for stale cache');

            const staleData = this.getStaleData(url);
            if (staleData) {
                console.log('Returning stale data');
                return { ...staleData, isStale: true };
            }

            // Final fallback
            console.error('No recovery possible');
            return { error: 'Data unavailable', message: error.message };
        }
    }

    async fetchWithRetry(url) {
        return retryOperation(async () => {
            // Simulate API call
            const success = Math.random() > 0.4;
            if (success) {
                return { data: \`Data from \${url}\`, timestamp: Date.now() };
            } else {
                throw new Error('Network error');
            }
        }, this.retryAttempts);
    }

    getStaleData(url) {
        // Simulate checking for stale cache
        return this.cache.has(url) ? this.cache.get(url) : null;
    }
}
// Test robust data loading
const dataLoader = new RobustDataLoader();
async function testDataLoading() {
    try {
        const result = await dataLoader.loadData('/api/users');
        console.log('Data loaded:', result);
    } catch (error) {
        console.error('Data loading failed:', error.message);
    }
}
testDataLoading();
console.log('Error boundary examples completed');`,
  exercises: [
    {
      question: "Create a safe async function wrapper that handles errors and provides fallbacks",
      solution: `async function safeAsync(asyncFn, fallbackValue = null, retries = 0) {
  let attempt = 0;

  while (attempt <= retries) {
    try {
      return await asyncFn();
    } catch (error) {
      console.warn(\`Attempt \${attempt + 1} failed:\`, error.message);

      if (attempt === retries) {
        console.error('All attempts failed, using fallback');
        return fallbackValue;
      }

      attempt++;
      // Wait before retry
      await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
    }
  }
}
// Usage:
const result = await safeAsync(
  () => fetch('/api/data').then(r => r.json()),
  { error: 'Failed to load' },
  2 // retry twice
);`,
      explanation: "Safe wrappers provide fallback values and retry logic for unreliable async operations."
    }
  ],
  quiz: [
    {
      question: "What is the main purpose of the Circuit Breaker pattern?",
      options: [
        "To catch syntax errors",
        "To prevent cascading failures by stopping calls to failing services",
        "To handle promise rejections",
        "To log errors to a service"
      ],
      correct: 1,
      explanation: "Circuit Breaker pattern prevents cascading failures by temporarily stopping calls to services that are failing repeatedly."
    }
  ],
  resources: [
    {
      title: "Error Handling Best Practices",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling"
    }
  ],
  nextModules: ['testing', 'debugging'],
  prerequisites: ['promises', 'async-await', 'error-handling-basics']
};