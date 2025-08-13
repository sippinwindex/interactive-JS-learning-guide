export default {
  title: 'Pure Functions',
  duration: '35 min',
  difficulty: 'Intermediate',
  overview: 'Master pure functions - the foundation of functional programming. Learn about side effects, immutability, predictability, and how pure functions lead to more reliable code.',
  
  keyPoints: [
    'Pure functions have no side effects',
    'Pure functions always return the same output for the same input',
    'Pure functions do not mutate external state',
    'Pure functions are easier to test and debug',
    'Pure functions enable safe parallelization',
    'Pure functions improve code predictability'
  ],

  example: `// Pure vs Impure Functions
console.log('=== Pure vs Impure Functions ===');

// IMPURE FUNCTIONS (avoid these patterns)
let globalCounter = 0;
let userProfile = { name: 'Alice', age: 25 };

// Impure: modifies global state
function impureIncrement() {
    globalCounter++; // Side effect!
    return globalCounter;
}

// Impure: depends on external state
function impureGetCounter() {
    return globalCounter; // Depends on global state
}

// Impure: modifies input parameter
function impureAddAge(user, years) {
    user.age += years; // Mutates input!
    return user;
}

// Impure: uses Date.now() (non-deterministic)
function impureGetTimestamp() {
    return Date.now(); // Different result each call
}

// Impure: uses Math.random() (non-deterministic)
function impureGetRandomId() {
    return Math.floor(Math.random() * 1000);
}

console.log('Impure function examples:');
console.log('Before:', globalCounter);
console.log('impureIncrement():', impureIncrement());
console.log('impureIncrement():', impureIncrement());
console.log('After:', globalCounter);

// PURE FUNCTIONS (best practices)

// Pure: no side effects, same input -> same output
function pureAdd(a, b) {
    return a + b;
}

// Pure: creates new object instead of mutating
function pureAddAge(user, years) {
    return {
        ...user,
        age: user.age + years
    };
}

// Pure: all dependencies passed as parameters
function pureIncrement(counter) {
    return counter + 1;
}

// Pure: uses parameters instead of global state
function pureCalculateArea(length, width) {
    return length * width;
}

// Pure: string manipulation without side effects
function pureCapitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Pure: array operations that return new arrays
function pureFilterEven(numbers) {
    return numbers.filter(num => num % 2 === 0);
}

function pureDoubleArray(numbers) {
    return numbers.map(num => num * 2);
}

console.log('\\nPure function examples:');
console.log('pureAdd(5, 3):', pureAdd(5, 3));
console.log('pureAdd(5, 3):', pureAdd(5, 3)); // Same result!

const originalUser = { name: 'Bob', age: 30 };
console.log('Original user:', originalUser);
const olderUser = pureAddAge(originalUser, 5);
console.log('Older user:', olderUser);
console.log('Original unchanged:', originalUser);

// Pure Function Testing
console.log('\\n=== Testing Pure Functions ===');

class PureFunctionTester {
    static test(fn, inputs, expectedOutput, description) {
        const actualOutput = fn(...inputs);
        const passed = JSON.stringify(actualOutput) === JSON.stringify(expectedOutput);
        
        console.log('Test: ' + description);
        console.log('  Input:', inputs);
        console.log('  Expected:', expectedOutput);
        console.log('  Actual:', actualOutput);
        console.log('  Result: ' + (passed ? '✅ PASS' : '❌ FAIL'));
        console.log('');
        
        return passed;
    }
    
    static testDeterministic(fn, inputs, iterations = 10) {
        const firstResult = fn(...inputs);
        let allSame = true;
        
        for (let i = 1; i < iterations; i++) {
            const result = fn(...inputs);
            if (JSON.stringify(result) !== JSON.stringify(firstResult)) {
                allSame = false;
                break;
            }
        }
        
        console.log('Deterministic test (' + iterations + ' iterations):');
        console.log('  Function: ' + fn.name);
        console.log('  Input:', inputs);
        console.log('  Result: ' + (allSame ? '✅ Deterministic' : '❌ Non-deterministic'));
        console.log('');
        
        return allSame;
    }
    
    static testImmutability(fn, input) {
        const originalInput = JSON.parse(JSON.stringify(input));
        const result = fn(input); // Store the result to avoid unused variable
        const inputUnchanged = JSON.stringify(input) === JSON.stringify(originalInput);
        
        console.log('Immutability test:');
        console.log('  Function: ' + fn.name);
        console.log('  Original input:', originalInput);
        console.log('  Input after function call:', input);
        console.log('  Result: ' + (inputUnchanged ? '✅ Immutable' : '❌ Mutates input'));
        console.log('');
        
        return inputUnchanged;
    }
}

// Test pure functions
PureFunctionTester.test(pureAdd, [5, 3], 8, 'Addition function');
PureFunctionTester.test(pureCapitalize, ['hello'], 'Hello', 'Capitalize function');
PureFunctionTester.test(pureFilterEven, [[1, 2, 3, 4, 5]], [2, 4], 'Filter even numbers');

// Test deterministic behavior
PureFunctionTester.testDeterministic(pureAdd, [10, 20]);
PureFunctionTester.testDeterministic(pureCapitalize, ['world']);

// Test immutability
const testArray = [1, 2, 3, 4, 5];
const testUser = { name: 'Charlie', age: 35 };

PureFunctionTester.testImmutability((arr) => pureFilterEven(arr), testArray);
PureFunctionTester.testImmutability((user) => pureAddAge(user, 1), testUser);

// Advanced Pure Function Patterns
console.log('=== Advanced Pure Function Patterns ===');

// Higher-order pure functions
const createMultiplier = (factor) => (num) => num * factor;
const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log('Higher-order pure functions:');
console.log('double(5):', double(5));
console.log('triple(5):', triple(5));

// Pure function composition
const compose = (...functions) => (value) => 
    functions.reduceRight((acc, fn) => fn(acc), value);

const addOne = (x) => x + 1;
const square = (x) => x * x;
const toString = (x) => x.toString();

const addOneSquareToString = compose(toString, square, addOne);

console.log('\\nFunction composition:');
console.log('addOneSquareToString(4):', addOneSquareToString(4)); // "25"

// Pure recursive functions
function pureFactorial(n) {
    if (n <= 1) return 1;
    return n * pureFactorial(n - 1);
}

function pureFibonacci(n) {
    if (n <= 1) return n;
    return pureFibonacci(n - 1) + pureFibonacci(n - 2);
}

console.log('\\nPure recursive functions:');
console.log('pureFactorial(5):', pureFactorial(5));
console.log('pureFibonacci(7):', pureFibonacci(7));

// Memoization for expensive pure functions
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log('Cache hit for:', args);
            return cache.get(key);
        }
        
        console.log('Computing for:', args);
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

const memoizedFibonacci = memoize(pureFibonacci);

console.log('\\nMemoized functions:');
console.log('memoizedFibonacci(10):', memoizedFibonacci(10));
console.log('memoizedFibonacci(10):', memoizedFibonacci(10)); // Cache hit!

// Pure data transformation functions
console.log('\\n=== Pure Data Transformations ===');

const users = [
    { id: 1, name: 'Alice', age: 25, department: 'Engineering' },
    { id: 2, name: 'Bob', age: 30, department: 'Marketing' },
    { id: 3, name: 'Charlie', age: 35, department: 'Engineering' },
    { id: 4, name: 'Diana', age: 28, department: 'Sales' }
];

// Pure function to filter users by department
const filterByDepartment = (users, department) =>
    users.filter(user => user.department === department);

// Pure function to add years to user ages
const addYearsToUsers = (users, years) =>
    users.map(user => ({
        ...user,
        age: user.age + years
    }));

// Pure function to sort users by age
const sortUsersByAge = (users) =>
    [...users].sort((a, b) => a.age - b.age);

// Pure function to get user names
const getUserNames = (users) =>
    users.map(user => user.name);

// Pure function to group users by department
const groupUsersByDepartment = (users) =>
    users.reduce((groups, user) => {
        const dept = user.department;
        return {
            ...groups,
            [dept]: [...(groups[dept] || []), user]
        };
    }, {});

console.log('Original users:', users);
console.log('Engineering users:', filterByDepartment(users, 'Engineering'));
console.log('Users with +5 years:', addYearsToUsers(users, 5));
console.log('Users sorted by age:', sortUsersByAge(users));
console.log('User names:', getUserNames(users));
console.log('Grouped by department:', groupUsersByDepartment(users));

// Verify original data is unchanged
console.log('Original users unchanged:', users);

// Pure state management functions
console.log('\\n=== Pure State Management ===');

// Pure reducers (like Redux)
const initialState = {
    count: 0,
    todos: [],
    user: null
};

function counterReducer(state, action) {
    switch (action.type) {
        case 'INCREMENT':
            return { ...state, count: state.count + 1 };
        case 'DECREMENT':
            return { ...state, count: state.count - 1 };
        case 'RESET':
            return { ...state, count: 0 };
        default:
            return state;
    }
}

function todoReducer(state, action) {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                ...state,
                todos: [
                    ...state.todos,
                    { id: Date.now(), text: action.payload, completed: false }
                ]
            };
        case 'TOGGLE_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload
                        ? { ...todo, completed: !todo.completed }
                        : todo
                )
            };
        case 'REMOVE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            };
        default:
            return state;
    }
}

// Combine reducers
function rootReducer(state, action) {
    return todoReducer(counterReducer(state, action), action);
}

// Test pure state updates
let currentState = initialState;

console.log('Initial state:', currentState);

currentState = rootReducer(currentState, { type: 'INCREMENT' });
console.log('After increment:', currentState);

currentState = rootReducer(currentState, { 
    type: 'ADD_TODO', 
    payload: 'Learn pure functions' 
});
console.log('After adding todo:', currentState);

currentState = rootReducer(currentState, { 
    type: 'TOGGLE_TODO', 
    payload: currentState.todos[0].id 
});
console.log('After toggling todo:', currentState);

// Pure validation functions
console.log('\\n=== Pure Validation Functions ===');

const validationRules = {
    required: (value) => ({
        isValid: value !== null && value !== undefined && value !== '',
        message: 'Field is required'
    }),
    
    minLength: (min) => (value) => ({
        isValid: value && value.length >= min,
        message: 'Minimum ' + min + ' characters required'
    }),
    
    email: (value) => ({
        isValid: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value || ''),
        message: 'Invalid email format'
    }),
    
    range: (min, max) => (value) => ({
        isValid: value >= min && value <= max,
        message: \`Value must be between \${min} and \${max}\`
    })
};

// Pure validation function
function validateField(value, rules) {
    const results = rules.map(rule => rule(value));
    const isValid = results.every(result => result.isValid);
    const messages = results
        .filter(result => !result.isValid)
        .map(result => result.message);
    
    return { isValid, messages };
}

// Pure form validation
function validateForm(formData, validationSchema) {
    const results = {};
    let isFormValid = true;
    
    for (const [fieldName, rules] of Object.entries(validationSchema)) {
        const fieldValue = formData[fieldName];
        const fieldResult = validateField(fieldValue, rules);
        
        results[fieldName] = fieldResult;
        
        if (!fieldResult.isValid) {
            isFormValid = false;
        }
    }
    
    return { isValid: isFormValid, fields: results };
}

// Test validation
const formData = {
    name: 'Alice',
    email: 'alice@example.com',
    age: 25
};

const validationSchema = {
    name: [validationRules.required, validationRules.minLength(2)],
    email: [validationRules.required, validationRules.email],
    age: [validationRules.required, validationRules.range(18, 100)]
};

const validationResult = validateForm(formData, validationSchema);
console.log('Validation result:', validationResult);

// Pure utility functions
console.log('\\n=== Pure Utility Functions ===');

// Pure array utilities
const arrayUtils = {
    // Remove duplicates
    unique: (arr) => [...new Set(arr)],
    
    // Flatten nested arrays
    flatten: (arr) => arr.reduce((flat, item) => 
        Array.isArray(item) ? [...flat, ...arrayUtils.flatten(item)] : [...flat, item], []
    ),
    
    // Group by property
    groupBy: (arr, key) => arr.reduce((groups, item) => {
        const groupKey = typeof key === 'function' ? key(item) : item[key];
        return {
            ...groups,
            [groupKey]: [...(groups[groupKey] || []), item]
        };
    }, {}),
    
    // Find differences between arrays
    difference: (arr1, arr2) => arr1.filter(item => !arr2.includes(item)),
    
    // Find intersection of arrays
    intersection: (arr1, arr2) => arr1.filter(item => arr2.includes(item)),
    
    // Chunk array into smaller arrays
    chunk: (arr, size) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    }
};

// Pure object utilities
const objectUtils = {
    // Deep clone object
    deepClone: (obj) => JSON.parse(JSON.stringify(obj)),
    
    // Pick specific properties
    pick: (obj, keys) => keys.reduce((picked, key) => {
        if (key in obj) {
            picked[key] = obj[key];
        }
        return picked;
    }, {}),
    
    // Omit specific properties
    omit: (obj, keys) => Object.keys(obj).reduce((result, key) => {
        if (!keys.includes(key)) {
            result[key] = obj[key];
        }
        return result;
    }, {}),
    
    // Merge objects deeply
    deepMerge: (target, source) => {
        const result = { ...target };
        
        for (const key in source) {
            if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
                result[key] = objectUtils.deepMerge(result[key] || {}, source[key]);
            } else {
                result[key] = source[key];
            }
        }
        
        return result;
    }
};

// Pure string utilities
const stringUtils = {
    // Capitalize first letter
    capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase(),
    
    // Convert to camelCase
    toCamelCase: (str) => str
        .replace(/[-_\\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : ''),
    
    // Convert to kebab-case
    toKebabCase: (str) => str
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .replace(/[\\s_]+/g, '-')
        .toLowerCase(),
    
    // Truncate string
    truncate: (str, length, suffix = '...') => 
        str.length <= length ? str : str.slice(0, length) + suffix,
    
    // Remove HTML tags
    stripHtml: (str) => str.replace(/<[^>]*>/g, ''),
    
    // Count words
    wordCount: (str) => str.trim().split(/\\s+/).filter(word => word.length > 0).length
};

// Test utility functions
const testArray = [1, 2, 2, 3, 4, 4, 5];
const nestedArray = [1, [2, 3], [4, [5, 6]]];
const testUsers = [
    { name: 'Alice', age: 25, department: 'Engineering' },
    { name: 'Bob', age: 30, department: 'Marketing' },
    { name: 'Charlie', age: 25, department: 'Engineering' }
];

console.log('Array utilities:');
console.log('unique([1,2,2,3]):', arrayUtils.unique(testArray));
console.log('flatten(nested):', arrayUtils.flatten(nestedArray));
console.log('groupBy age:', arrayUtils.groupBy(testUsers, 'age'));
console.log('chunk([1,2,3,4,5], 2):', arrayUtils.chunk([1,2,3,4,5], 2));

const testObject = { a: 1, b: 2, c: { x: 10, y: 20 } };
const mergeObject = { c: { z: 30 }, d: 4 };

console.log('\\nObject utilities:');
console.log('pick({a:1,b:2,c:3}, ["a","c"]):', objectUtils.pick({a:1,b:2,c:3}, ['a','c']));
console.log('omit({a:1,b:2,c:3}, ["b"]):', objectUtils.omit({a:1,b:2,c:3}, ['b']));
console.log('deepMerge result:', objectUtils.deepMerge(testObject, mergeObject));

console.log('\\nString utilities:');
console.log('capitalize("hello world"):', stringUtils.capitalize('hello world'));
console.log('toCamelCase("hello-world_test"):', stringUtils.toCamelCase('hello-world_test'));
console.log('toKebabCase("HelloWorldTest"):', stringUtils.toKebabCase('HelloWorldTest'));
console.log('truncate("Long text", 5):', stringUtils.truncate('This is a long text', 10));

// Pure error handling
console.log('\\n=== Pure Error Handling ===');

// Result type for error handling without exceptions
class Result {
    constructor(value, error = null) {
        this.value = value;
        this.error = error;
        this.isSuccess = error === null;
    }
    
    static success(value) {
        return new Result(value);
    }
    
    static failure(error) {
        return new Result(null, error);
    }
    
    map(fn) {
        if (this.isSuccess) {
            try {
                return Result.success(fn(this.value));
            } catch (error) {
                return Result.failure(error.message);
            }
        }
        return this;
    }
    
    flatMap(fn) {
        if (this.isSuccess) {
            try {
                return fn(this.value);
            } catch (error) {
                return Result.failure(error.message);
            }
        }
        return this;
    }
    
    getOrElse(defaultValue) {
        return this.isSuccess ? this.value : defaultValue;
    }
}

// Pure functions that return Results instead of throwing
function safeDivide(a, b) {
    if (b === 0) {
        return Result.failure('Division by zero');
    }
    return Result.success(a / b);
}

function safeParseInt(str) {
    const num = parseInt(str, 10);
    if (isNaN(num)) {
        return Result.failure('Invalid number');
    }
    return Result.success(num);
}

function safeSquareRoot(n) {
    if (n < 0) {
        return Result.failure('Cannot take square root of negative number');
    }
    return Result.success(Math.sqrt(n));
}

// Chain operations safely
const calculation = safeParseInt('16')
    .flatMap(n => safeSquareRoot(n))
    .flatMap(sqrt => safeDivide(sqrt, 2));

console.log('Safe calculation result:', calculation);
console.log('Final value:', calculation.getOrElse('Error occurred'));

// Demonstrate pure function benefits
console.log('\\n=== Pure Function Benefits ===');

// Parallelization simulation
function simulateParallelProcessing(data, pureFunction) {
    console.log('Processing data in parallel (simulation):');
    
    // Since the function is pure, we can safely process in parallel
    const chunks = arrayUtils.chunk(data, Math.ceil(data.length / 3));
    
    const results = chunks.map((chunk, index) => {
        console.log(\`Worker \${index + 1} processing:\`, chunk);
        return chunk.map(pureFunction);
    });
    
    return arrayUtils.flatten(results);
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const squareFunction = (x) => x * x;

const parallelResults = simulateParallelProcessing(numbers, squareFunction);
console.log('Parallel processing results:', parallelResults);

// Caching/memoization benefits
const expensiveCalculation = memoize((n) => {
    console.log('Performing expensive calculation for:', n);
    // Simulate expensive operation
    let result = 0;
    for (let i = 0; i < n; i++) {
        result += Math.sqrt(i);
    }
    return result;
});

console.log('\\nMemoization benefits:');
console.log('First call:', expensiveCalculation(1000));
console.log('Second call (cached):', expensiveCalculation(1000));

console.log('\\nPure functions examples completed');`,

  exercises: [
    {
      question: "Create a pure function that calculates compound interest:",
      solution: `function calculateCompoundInterest(principal, rate, compoundsPerYear, years) {
  // Validate inputs
  if (principal <= 0 || rate < 0 || compoundsPerYear <= 0 || years < 0) {
    throw new Error('Invalid input parameters');
  }
  
  // A = P(1 + r/n)^(nt)
  const amount = principal * Math.pow(
    (1 + rate / compoundsPerYear), 
    compoundsPerYear * years
  );
  
  return {
    principal,
    rate,
    compoundsPerYear,
    years,
    finalAmount: Math.round(amount * 100) / 100,
    interestEarned: Math.round((amount - principal) * 100) / 100
  };
}

// Usage:
const investment = calculateCompoundInterest(1000, 0.05, 12, 10);
console.log(investment);
// {
//   principal: 1000,
//   rate: 0.05,
//   compoundsPerYear: 12,
//   years: 10,
//   finalAmount: 1643.62,
//   interestEarned: 643.62
// }`,
      explanation: "This pure function calculates compound interest without side effects, always returning the same result for the same inputs."
    }
  ],

  quiz: [
    {
      question: "Which characteristic is NOT required for a function to be pure?",
      options: [
        "Always returns the same output for the same input",
        "Has no side effects",
        "Executes faster than impure functions",
        "Does not modify external state"
      ],
      correct: 2,
      explanation: "Pure functions are not necessarily faster than impure functions. The key characteristics are deterministic behavior, no side effects, and no mutation of external state."
    }
  ],

  resources: [
    {
      title: "Functional Programming Guide",
      url: "https://mostly-adequate.gitbooks.io/mostly-adequate-guide/"
    },
    {
      title: "MDN - Functional Programming",
      url: "https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function"
    }
  ],

  nextModules: ['composition', 'currying', 'immutability'],
  prerequisites: ['functions-basics', 'higher-order-functions', 'map-filter-reduce']
};