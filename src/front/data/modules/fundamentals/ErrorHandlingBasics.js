// src/front/data/modules/fundamentals/ErrorHandlingBasics.js
export const ErrorHandlingBasics = {
  title: 'Basic Error Handling',
  duration: '30 min',
  difficulty: 'Beginner',
  overview: 'Learn to handle errors gracefully in JavaScript. Understand try/catch blocks, error types, throwing custom errors, and debugging techniques.',
  
  keyPoints: [
    'try/catch blocks handle runtime errors',
    'finally blocks always execute',
    'Different types of JavaScript errors',
    'throw statement creates custom errors',
    'Error objects contain useful information',
    'Proper error handling improves user experience'
  ],

  example: `// Basic Try/Catch
try {
    let result = 10 / 0;
    console.log(result);  // Infinity (not an error in JS)
    
    // This will cause an error
    let obj = null;
    console.log(obj.property);  // TypeError
} catch (error) {
    console.log("An error occurred:", error.message);
    console.log("Error type:", error.name);
    console.log("Stack trace:", error.stack);
}

// Try/Catch/Finally
function divide(a, b) {
    console.log("Starting division...");
    
    try {
        if (b === 0) {
            throw new Error("Division by zero is not allowed");
        }
        return a / b;
    } catch (error) {
        console.log("Error in division:", error.message);
        return null;
    } finally {
        console.log("Division operation completed");
    }
}

console.log(divide(10, 2));  // 5
console.log(divide(10, 0));  // null

// Different Error Types
try {
    // ReferenceError
    console.log(nonExistentVariable);
} catch (error) {
    console.log(\`\${error.name}: \${error.message}\`);
}

try {
    // TypeError  
    let num = 123;
    num.toUpperCase();
} catch (error) {
    console.log(\`\${error.name}: \${error.message}\`);
}

try {
    // SyntaxError (would happen at parse time, but here's how to catch it)
    eval("let x = ;");
} catch (error) {
    console.log(\`\${error.name}: \${error.message}\`);
}

// Custom Error Classes
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
    }
}

class NetworkError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.name = "NetworkError";
        this.statusCode = statusCode;
    }
}

// Using Custom Errors
function validateUser(user) {
    if (!user.name) {
        throw new ValidationError("Name is required", "name");
    }
    if (!user.email) {
        throw new ValidationError("Email is required", "email");
    }
    if (!user.email.includes("@")) {
        throw new ValidationError("Invalid email format", "email");
    }
    return true;
}

// Handling Different Error Types
function processUser(userData) {
    try {
        validateUser(userData);
        console.log("User is valid!");
        return true;
    } catch (error) {
        if (error instanceof ValidationError) {
            console.log(\`Validation failed for \${error.field}: \${error.message}\`);
        } else if (error instanceof NetworkError) {
            console.log(\`Network error (\${error.statusCode}): \${error.message}\`);
        } else {
            console.log(\`Unexpected error: \${error.message}\`);
        }
        return false;
    }
}

// Test with different user data
processUser({ name: "John", email: "john@example.com" });  // Valid
processUser({ name: "Jane" });                             // Missing email
processUser({ name: "Bob", email: "invalid-email" });     // Invalid email

// Async Error Handling (Preview)
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new NetworkError("Failed to fetch data", response.status);
        }
        return await response.json();
    } catch (error) {
        if (error instanceof NetworkError) {
            console.log(\`API Error: \${error.message}\`);
        } else {
            console.log(\`Fetch Error: \${error.message}\`);
        }
        return null;
    }
}

// Error Handling Best Practices
function safeParseJSON(jsonString) {
    try {
        return { success: true, data: JSON.parse(jsonString) };
    } catch (error) {
        return { 
            success: false, 
            error: error.message,
            data: null 
        };
    }
}

// Usage
const result1 = safeParseJSON('{"name": "John", "age": 30}');
const result2 = safeParseJSON('invalid json');

console.log("Result 1:", result1);
console.log("Result 2:", result2);

// Graceful Degradation
function getStorageValue(key, defaultValue) {
    try {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : defaultValue;
    } catch (error) {
        console.warn(\`Failed to read from storage: \${error.message}\`);
        return defaultValue;
    }
}

function setStorageValue(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.warn(\`Failed to write to storage: \${error.message}\`);
        return false;
    }
}

// Error Logging Helper
function logError(error, context = {}) {
    const errorInfo = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        timestamp: new Date().toISOString(),
        context: context
    };
    
    console.error("Error logged:", errorInfo);
    // In real applications, send to logging service
}

// Input Validation with Error Handling
function calculateAge(birthYear) {
    try {
        const currentYear = new Date().getFullYear();
        
        if (typeof birthYear !== 'number') {
            throw new ValidationError("Birth year must be a number", "birthYear");
        }
        
        if (birthYear > currentYear) {
            throw new ValidationError("Birth year cannot be in the future", "birthYear");
        }
        
        if (birthYear < 1900) {
            throw new ValidationError("Birth year seems unrealistic", "birthYear");
        }
        
        return currentYear - birthYear;
    } catch (error) {
        logError(error, { function: "calculateAge", input: birthYear });
        throw error; // Re-throw to let caller handle
    }
}

// Safe function execution
function safeExecute(fn, ...args) {
    try {
        return { success: true, result: fn(...args) };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

// Examples of usage
const ageResult = safeExecute(calculateAge, 1990);
console.log("Age calculation:", ageResult);

const invalidResult = safeExecute(calculateAge, "not a number");
console.log("Invalid input result:", invalidResult);`,

  exercises: [
    {
      question: "Create a function that safely converts a string to a number with error handling.",
      solution: `function safeStringToNumber(str) {
  try {
    if (typeof str !== 'string') {
      throw new Error('Input must be a string');
    }
    const num = Number(str);
    if (isNaN(num)) {
      throw new Error('String cannot be converted to number');
    }
    return { success: true, value: num };
  } catch (error) {
    return { success: false, error: error.message };
  }
}`,
      explanation: "Always validate input types and handle conversion errors gracefully."
    },
    {
      question: "Write a try/catch block that handles different types of errors differently.",
      solution: `try {
  // Some risky operation
  riskyOperation();
} catch (error) {
  if (error instanceof TypeError) {
    console.log('Type error:', error.message);
  } else if (error instanceof ReferenceError) {
    console.log('Reference error:', error.message);
  } else {
    console.log('Unknown error:', error.message);
  }
}`,
      explanation: "Use instanceof to check error types and provide appropriate handling for each."
    }
  ],

  quiz: [
    {
      question: "When does the 'finally' block execute?",
      options: [
        "Only when no error occurs",
        "Only when an error occurs", 
        "Always, regardless of errors",
        "Never"
      ],
      correct: 2,
      explanation: "The finally block always executes, whether an error occurs or not."
    },
    {
      question: "What happens if you don't catch a thrown error?",
      options: [
        "Nothing",
        "The program continues normally",
        "The program stops execution",
        "The error is ignored"
      ],
      correct: 2,
      explanation: "Uncaught errors cause the program to stop execution and display an error message."
    }
  ],

  resources: [
    {
      title: "MDN - Error Handling",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling#exception_handling_statements"
    },
    {
      title: "MDN - Error Object",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error"
    }
  ],

  nextModules: ['dom-basics', 'let-const-scope'],
  prerequisites: ['strings-numbers']
};