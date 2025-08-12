// src/front/components/docs/ErrorHandlingSection.jsx
import React from 'react';
import { CodeBlock } from '../CodeBlock';

export const ErrorHandlingSection = ({ runCode, runOutput }) => {
  const content = [
    {
      title: 'Try-Catch-Finally',
      description: 'Handle errors gracefully with proper exception handling',
      code: `// Basic error handling
function divide(a, b) {
    try {
        if (b === 0) {
            throw new Error('Division by zero is not allowed');
        }
        return a / b;
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    } finally {
        console.log('Division operation completed');
    }
}

console.log('Result:', divide(10, 2)); // 5
console.log('Result:', divide(10, 0)); // null

// Custom error types
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

class NetworkError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = 'NetworkError';
        this.statusCode = statusCode;
    }
}

function validateUser(user) {
    try {
        if (!user.name) {
            throw new ValidationError('Name is required');
        }
        if (!user.email || !user.email.includes('@')) {
            throw new ValidationError('Valid email is required');
        }
        
        console.log('User validation passed');
        return true;
    } catch (error) {
        if (error instanceof ValidationError) {
            console.error('Validation failed:', error.message);
        } else {
            console.error('Unexpected error:', error.message);
        }
        return false;
    }
}

// Test validation
validateUser({ name: 'John', email: 'john@example.com' }); // Pass
validateUser({ name: '', email: 'invalid' }); // Fail`
    },
    {
      title: 'Error Boundaries and Global Handlers',
      description: 'Handle uncaught errors and prevent application crashes',
      code: `// Error logging utility
class ErrorLogger {
    static log(error, context = {}) {
        const errorInfo = {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
            context
        };
        
        console.error('Error logged:', errorInfo);
        
        // In real app, send to logging service
        // this.sendToLoggingService(errorInfo);
    }
    
    static sendToLoggingService(errorInfo) {
        // Mock implementation
        console.log('Sending to logging service:', errorInfo);
    }
}

// Wrapper function for safe execution
function safeExecute(fn, fallback = null, context = {}) {
    try {
        return fn();
    } catch (error) {
        ErrorLogger.log(error, context);
        return fallback;
    }
}

// Example usage
const result = safeExecute(
    () => {
        // Potentially risky operation
        return JSON.parse('{"valid": "json"}');
    },
    { error: true },
    { operation: 'JSON parsing' }
);

console.log('Safe execution result:', result);

// Test with invalid JSON
const result2 = safeExecute(
    () => JSON.parse('invalid json'),
    { error: true },
    { operation: 'Invalid JSON parsing' }
);

console.log('Safe execution with error:', result2);

// Global error handlers (conceptual - would work in browser)
console.log('Global error handlers would be set up like this:');
console.log('window.addEventListener("error", handler)');
console.log('window.addEventListener("unhandledrejection", handler)');`
    },
    {
      title: 'Async Error Handling',
      description: 'Handle errors in asynchronous operations properly',
      code: `// Promise error handling
function fetchData(url) {
    return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
            if (url.includes('error')) {
                reject(new Error('Network error: Failed to fetch data'));
            } else {
                resolve({ data: 'Success data', url });
            }
        }, 1000);
    });
}

// Promise chain error handling
fetchData('https://api.example.com/data')
    .then(data => {
        console.log('Data received:', data);
        return data;
    })
    .catch(error => {
        console.error('Promise chain error:', error.message);
        return { error: true, message: error.message };
    });

// Async/await error handling
async function fetchDataWithAsyncAwait() {
    try {
        console.log('Fetching data...');
        const data = await fetchData('https://api.example.com/data');
        console.log('Async/await success:', data);
        return data;
    } catch (error) {
        console.error('Async/await error:', error.message);
        throw error; // Re-throw if needed
    }
}

// Multiple async operations error handling
async function fetchMultipleResources() {
    const urls = [
        'https://api.example.com/users',
        'https://api.example.com/error', // This will fail
        'https://api.example.com/posts'
    ];
    
    try {
        // This will fail if any promise rejects
        const results = await Promise.all(
            urls.map(url => fetchData(url))
        );
        console.log('All requests succeeded:', results);
    } catch (error) {
        console.error('One or more requests failed:', error.message);
    }
    
    // Alternative: Handle each request individually
    const results = await Promise.allSettled(
        urls.map(url => fetchData(url))
    );
    
    results.forEach((result, index) => {
        if (result.status === 'fulfilled') {
            console.log('Request ' + (index + 1) + ' succeeded:', result.value);
        } else {
            console.error('Request ' + (index + 1) + ' failed:', result.reason.message);
        }
    });
}

// Run examples
fetchDataWithAsyncAwait().catch(error => {
    console.error('Top-level async error:', error.message);
});

fetchMultipleResources();`
    }
  ];

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Learn to handle errors gracefully in JavaScript applications. Proper error handling 
          prevents crashes and provides better user experiences.
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

      {/* Error Handling Best Practices */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mt-8">
        <h4 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-4">
          🛡️ Error Handling Best Practices
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-red-700 dark:text-red-300">
          <div>
            <h5 className="font-medium mb-2">Do:</h5>
            <ul className="text-sm space-y-1">
              <li>• Use specific error types</li>
              <li>• Log errors with context</li>
              <li>• Provide user-friendly messages</li>
              <li>• Handle async errors properly</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2">Don't:</h5>
            <ul className="text-sm space-y-1">
              <li>• Ignore errors silently</li>
              <li>• Expose sensitive error details</li>
              <li>• Use try-catch for control flow</li>
              <li>• Forget to clean up resources</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};