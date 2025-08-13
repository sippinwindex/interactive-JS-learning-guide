export default {
  title: 'Currying',
  duration: '35 min',
  difficulty: 'Advanced',
  overview: 'Master currying - the technique of transforming functions to take one argument at a time. Learn partial application, function specialization, and advanced functional programming patterns.',
  
  keyPoints: [
    'Currying transforms multi-argument functions into single-argument functions',
    'Partial application allows fixing some arguments in advance',
    'Curried functions enable better composition and reusability',
    'Currying supports point-free programming style',
    'Auto-currying makes functions more flexible',
    'Currying enables function specialization and configuration'
  ],

  example: `// Basic Currying Concepts
console.log('=== Basic Currying ===');

// Regular function with multiple parameters
function regularAdd(a, b, c) {
    return a + b + c;
}

// Manually curried version
function curriedAdd(a) {
    return function(b) {
        return function(c) {
            return a + b + c;
        };
    };
}

// Arrow function curried version (more concise)
const curriedAddArrow = (a) => (b) => (c) => a + b + c;

console.log('Regular function:', regularAdd(1, 2, 3));
console.log('Curried function:', curriedAdd(1)(2)(3));
console.log('Arrow curried:', curriedAddArrow(1)(2)(3));

// Partial application with curried functions
const addOne = curriedAdd(1);
const addOneAndTwo = addOne(2);

console.log('Partial application:');
console.log('addOne(2)(3):', addOne(2)(3));
console.log('addOneAndTwo(3):', addOneAndTwo(3));

// Manual Curry Implementation
console.log('\\n=== Manual Curry Implementation ===');

function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        } else {
            return function(...nextArgs) {
                return curried.apply(this, args.concat(nextArgs));
            };
        }
    };
}

// Example functions to curry
function multiply(a, b, c) {
    return a * b * c;
}

function greet(greeting, name, punctuation) {
    return greeting + ' ' + name + punctuation;
}

// Curry the functions
const curriedMultiply = curry(multiply);
const curriedGreet = curry(greet);

console.log('Curried multiply:');
console.log('Full args:', curriedMultiply(2, 3, 4));
console.log('Partial application:', curriedMultiply(2)(3)(4));
console.log('Mixed application:', curriedMultiply(2, 3)(4));

console.log('\\nCurried greet:');
console.log('Full greeting:', curriedGreet('Hello', 'Alice', '!'));
console.log('Partial greeting:', curriedGreet('Hello')('Bob')('?'));

// Specialized functions through currying
const sayHello = curriedGreet('Hello');
const askQuestion = curriedGreet('Hello')('there')('?');

console.log('Specialized functions:');
console.log('sayHello("Charlie")("."):', sayHello('Charlie')('.'));
console.log('askQuestion:', askQuestion);

// Advanced Curry with Placeholders
console.log('\\n=== Advanced Curry with Placeholders ===');

const _ = Symbol('placeholder');

function advancedCurry(fn) {
    return function curried(...args) {
        const hasPlaceholder = args.some(arg => arg === _);
        
        if (args.length >= fn.length && !hasPlaceholder) {
            return fn.apply(this, args);
        }
        
        return function(...nextArgs) {
            const newArgs = args.slice();
            let nextIndex = 0;
            
            // Replace placeholders with new arguments
            for (let i = 0; i < newArgs.length && nextIndex < nextArgs.length; i++) {
                if (newArgs[i] === _) {
                    newArgs[i] = nextArgs[nextIndex++];
                }
            }
            
            // Add remaining arguments
            while (nextIndex < nextArgs.length) {
                newArgs.push(nextArgs[nextIndex++]);
            }
            
            return curried.apply(this, newArgs);
        };
    };
}

// Example with placeholders
function divide(a, b, c) {
    return a / b / c;
}

const advancedDivide = advancedCurry(divide);

console.log('Placeholder examples:');
console.log('Normal currying:', advancedDivide(12)(3)(2)); // 2
console.log('With placeholders:', advancedDivide(_, 3, _)(12)(2)); // 2
console.log('Skip first arg:', advancedDivide(_, 3, 2)(12)); // 2

// Practical Currying Examples
console.log('\\n=== Practical Currying Examples ===');

// HTTP request builder with currying
const createRequest = curry((method, url, headers, body) => ({
    method,
    url,
    headers,
    body
}));

// Specialized request builders
const createGET = createRequest('GET');
const createPOST = createRequest('POST');
const createApiRequest = createGET('https://api.example.com');

const getUserRequest = createApiRequest({ 'Authorization': 'Bearer token' })('');
const getPostsRequest = createApiRequest({ 'Content-Type': 'application/json' })('');

console.log('HTTP request builders:');
console.log('GET user request:', getUserRequest);
console.log('GET posts request:', getPostsRequest);

// Array processing with currying
const map = curry((fn, array) => array.map(fn));
const filter = curry((predicate, array) => array.filter(predicate));
const reduce = curry((reducer, initial, array) => array.reduce(reducer, initial));

// Specialized array functions
const double = (x) => x * 2;
const isEven = (x) => x % 2 === 0;
const sum = (acc, x) => acc + x;

const doubleAll = map(double);
const filterEvens = filter(isEven);
const sumAll = reduce(sum, 0);

const numbers = [1, 2, 3, 4, 5, 6];

console.log('\\nArray processing:');
console.log('Original:', numbers);
console.log('Doubled:', doubleAll(numbers));
console.log('Even numbers:', filterEvens(numbers));
console.log('Sum:', sumAll(numbers));

// Function composition with curried functions
const pipe = (...functions) => (value) =>
    functions.reduce((acc, fn) => fn(acc), value);

const processNumbers = pipe(
    filterEvens,     // Keep even numbers
    doubleAll,       // Double them
    sumAll           // Sum the result
);

console.log('Composed processing:', processNumbers(numbers));

// Event handling with currying
console.log('\\n=== Event Handling with Currying ===');

const addEventListener = curry((event, handler, element) => {
    element.addEventListener(event, handler);
    return element;
});

const onClick = addEventListener('click');
const onHover = addEventListener('mouseenter');

// Specialized event handlers
const logClick = (e) => console.log('Clicked:', e.target);
const logHover = (e) => console.log('Hovered:', e.target);

const addClickLogger = onClick(logClick);
const addHoverLogger = onHover(logHover);

// Usage would be: addClickLogger(buttonElement)
console.log('Event handler functions created');

// Validation with currying
console.log('\\n=== Validation with Currying ===');

const validate = curry((rule, errorMessage, value) => {
    if (rule(value)) {
        return { valid: true, value };
    } else {
        return { valid: false, error: errorMessage };
    }
});

// Validation rules
const isRequired = (value) => value !== null && value !== undefined && value !== '';
const minLength = (min) => (value) => value && value.length >= min;
const maxLength = (max) => (value) => value && value.length <= max;
const isEmail = (value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value || '');

// Specialized validators
const validateRequired = validate(isRequired, 'Field is required');
const validateMinLength = (min) => validate(minLength(min), 'Minimum ' + min + ' characters');
const validateMaxLength = (max) => validate(maxLength(max), 'Maximum ' + max + ' characters');
const validateEmail = validate(isEmail, 'Invalid email format');

// Compose validators
const validateUsername = pipe(
    validateRequired,
    (result) => result.valid ? validateMinLength(3)(result.value) : result,
    (result) => result.valid ? validateMaxLength(20)(result.value) : result
);

const validateEmailField = pipe(
    validateRequired,
    (result) => result.valid ? validateEmail(result.value) : result
);

console.log('Validation examples:');
console.log('Valid username:', validateUsername('john_doe'));
console.log('Invalid username:', validateUsername('ab'));
console.log('Valid email:', validateEmailField('test@example.com'));
console.log('Invalid email:', validateEmailField('invalid-email'));

// Configuration with currying
console.log('\\n=== Configuration with Currying ===');

const createLogger = curry((level, timestamp, message) => {
    const time = timestamp ? new Date().toISOString() + ' ' : '';
    console.log('[' + level.toUpperCase() + '] ' + time + message);
});

// Specialized loggers
const logInfo = createLogger('info', true);
const logError = createLogger('error', true);
const logDebug = createLogger('debug', false);

console.log('Logger examples:');
logInfo('Application started');
logError('Database connection failed');
logDebug('Processing user input');

// Database query builder with currying
console.log('\\n=== Database Query Builder ===');

const createQuery = curry((operation, table, conditions, data) => {
    const query = {
        operation: operation.toUpperCase(),
        table,
        conditions: conditions || {},
        data: data || {}
    };
    
    // Simulate query execution
    console.log('Executing query:', JSON.stringify(query, null, 2));
    return query;
});

// Specialized query builders
const selectFrom = createQuery('select');
const insertInto = createQuery('insert');
const updateTable = createQuery('update');
const deleteFrom = createQuery('delete');

// Further specialization
const selectUsers = selectFrom('users');
const insertUser = insertInto('users');
const updateUser = updateTable('users');

console.log('Database operations:');
selectUsers({ active: true }, {});
insertUser({}, { name: 'John', email: 'john@example.com' });
updateUser({ id: 123 }, { active: false });

// Math operations with currying
console.log('\\n=== Math Operations ===');

const mathOp = curry((operation, a, b) => {
    switch (operation) {
        case 'add': return a + b;
        case 'subtract': return a - b;
        case 'multiply': return a * b;
        case 'divide': return a / b;
        case 'power': return Math.pow(a, b);
        default: return 0;
    }
});

// Specialized math functions
const add = mathOp('add');
const subtract = mathOp('subtract');
const multiply = mathOp('multiply');
const divide = mathOp('divide');
const power = mathOp('power');

// Further specialization
const addTen = add(10);
const multiplyByTwo = multiply(2);
const square = power(_, 2); // Using placeholder

console.log('\\nMath operations:');
console.log('add(5)(3):', add(5)(3));
console.log('addTen(7):', addTen(7));
console.log('multiplyByTwo(6):', multiplyByTwo(6));

// Auto-currying utility
console.log('\\n=== Auto-Currying Utility ===');

class AutoCurry {
    static transform(obj) {
        const curried = {};
        
        for (const [key, value] of Object.entries(obj)) {
            if (typeof value === 'function') {
                curried[key] = curry(value);
            } else {
                curried[key] = value;
            }
        }
        
        return curried;
    }
}

// Example utility object
const stringUtils = {
    concat: (a, b, c) => a + b + c,
    replace: (searchValue, replaceValue, str) => str.replace(searchValue, replaceValue),
    substring: (start, end, str) => str.substring(start, end),
    padStart: (targetLength, padString, str) => str.padStart(targetLength, padString)
};

// Auto-curry all functions
const curriedStringUtils = AutoCurry.transform(stringUtils);

// Use curried string utilities
const addPrefix = curriedStringUtils.concat('PREFIX: ');
const addSuffix = (suffix) => curriedStringUtils.concat(_, suffix);
const removeSpaces = curriedStringUtils.replace(' ', '');

console.log('Auto-curried string utilities:');
console.log('Add prefix:', addPrefix('Hello')(' World'));
console.log('Remove spaces:', removeSpaces('Hello World'));

// Practical application: Form field processor
console.log('\\n=== Practical Application: Form Processing ===');

const processField = curry((validators, transformers, value) => {
    // Apply transformers first
    const transformed = transformers.reduce((val, transformer) => transformer(val), value);
    
    // Then apply validators
    const validationResults = validators.map(validator => validator(transformed));
    const errors = validationResults.filter(result => !result.valid);
    
    return {
        originalValue: value,
        transformedValue: transformed,
        isValid: errors.length === 0,
        errors: errors.map(error => error.error)
    };
});

// Field transformers
const trim = (str) => str.trim();
const toLowerCase = (str) => str.toLowerCase();
const removeSpaces = (str) => str.replace(/\\s+/g, '');

// Create field processors
const processEmail = processField(
    [validateRequired, validateEmail],
    [trim, toLowerCase]
);

const processUsername = processField(
    [validateRequired, validateMinLength(3), validateMaxLength(15)],
    [trim, toLowerCase, removeSpaces]
);

console.log('Form field processing:');
console.log('Email processing:', processEmail('  ALICE@EXAMPLE.COM  '));
console.log('Username processing:', processUsername('  John Doe  '));

console.log('\\nCurrying examples completed');`,

  exercises: [
    {
      question: "Create a curried function for calculating compound interest that allows for partial application:",
      solution: `const calculateCompoundInterest = curry((principal, rate, compoundsPerYear, years) => {
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
});

// Create specialized calculators through partial application
const calculateWith5Percent = calculateCompoundInterest(_, 0.05); // Fix rate at 5%
const calculateMonthlyCompound = calculateWith5Percent(_, 12);     // Fix monthly compounding
const calculate10YearInvestment = calculateMonthlyCompound(_, 10); // Fix 10 years

// Usage:
const investment1000 = calculate10YearInvestment(1000);
const investment5000 = calculate10YearInvestment(5000);

console.log('$1000 investment:', investment1000);
console.log('$5000 investment:', investment5000);

// Or use step by step:
const result = calculateCompoundInterest(1000)(0.05)(12)(10);
console.log('Step by step result:', result);`,
      explanation: "This curried compound interest calculator allows creating specialized functions for different scenarios through partial application, making it reusable and configurable."
    }
  ],

  quiz: [
    {
      question: "What is the main benefit of currying functions?",
      options: [
        "Functions execute faster when curried",
        "Curried functions use less memory",
        "Enables partial application and function specialization",
        "Curried functions are easier to debug"
      ],
      correct: 2,
      explanation: "The main benefit of currying is enabling partial application, which allows you to fix some arguments and create specialized functions, leading to better code reuse and composition."
    }
  ],

  resources: [
    {
      title: "Currying in JavaScript",
      url: "https://javascript.info/currying-partials"
    },
    {
      title: "Functional JavaScript - Currying",
      url: "https://medium.com/javascript-scene/curry-and-function-composition-2c208d774983"
    }
  ],

  nextModules: ['immutability', 'composition', 'pure-functions'],
  prerequisites: ['pure-functions', 'higher-order-functions', 'composition']
};