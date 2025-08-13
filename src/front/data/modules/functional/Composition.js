export default {
  title: 'Function Composition',
  duration: '40 min',
  difficulty: 'Advanced',
  overview: 'Master function composition - the art of combining simple functions to build complex operations. Learn composition patterns, pipes, and functional programming techniques.',
  
  keyPoints: [
    'Composition combines simple functions into complex ones',
    'Functions should be small and focused on one task',
    'Compose functions read right-to-left, pipe reads left-to-right',
    'Composition enables code reuse and modularity',
    'Point-free style eliminates intermediate variables',
    'Composition makes code more declarative'
  ],

  example: `// Basic Function Composition
console.log('=== Basic Function Composition ===');

// Simple building block functions
const add = (x) => (y) => x + y;
const multiply = (x) => (y) => x * y;
const subtract = (x) => (y) => y - x;
const divide = (x) => (y) => y / x;

// Basic compose function (right-to-left)
const compose = (...functions) => (value) =>
    functions.reduceRight((acc, fn) => fn(acc), value);

// Basic pipe function (left-to-right)
const pipe = (...functions) => (value) =>
    functions.reduce((acc, fn) => fn(acc), value);

// Example: (x + 5) * 2 - 3
const addFive = add(5);
const multiplyByTwo = multiply(2);
const subtractThree = subtract(3);

// Using compose (reads right-to-left)
const composedOperation = compose(
    subtractThree,    // 3. subtract 3
    multiplyByTwo,    // 2. multiply by 2  
    addFive           // 1. add 5
);

// Using pipe (reads left-to-right)
const pipedOperation = pipe(
    addFive,          // 1. add 5
    multiplyByTwo,    // 2. multiply by 2
    subtractThree     // 3. subtract 3
);

console.log('Input: 10');
console.log('Composed result:', composedOperation(10)); // ((10 + 5) * 2) - 3 = 27
console.log('Piped result:', pipedOperation(10));       // Same result, different syntax

// String processing composition
console.log('\\n=== String Processing Composition ===');

// Building block functions for string processing
const trim = (str) => str.trim();
const toLowerCase = (str) => str.toLowerCase();
const removeSpaces = (str) => str.replace(/\\s+/g, '');
const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const addPrefix = (prefix) => (str) => prefix + str;
const addSuffix = (suffix) => (str) => str + suffix;
const reverseString = (str) => str.split('').reverse().join('');

// Compose string processing pipeline
const processUserInput = pipe(
    trim,
    toLowerCase,
    removeSpaces,
    capitalize
);

const createUsername = pipe(
    trim,
    toLowerCase,
    removeSpaces,
    addPrefix('@'),
    addSuffix('_user')
);

console.log('Processing: "  Hello World  "');
console.log('Processed:', processUserInput('  Hello World  '));
console.log('Username:', createUsername('  John Doe  '));

// Array processing composition
console.log('\\n=== Array Processing Composition ===');

// Array utility functions
const filter = (predicate) => (array) => array.filter(predicate);
const map = (transform) => (array) => array.map(transform);
const reduce = (reducer, initial) => (array) => array.reduce(reducer, initial);
const sort = (compareFn) => (array) => [...array].sort(compareFn);
const take = (n) => (array) => array.slice(0, n);
const unique = (array) => [...new Set(array)];

// Predicate functions
const isEven = (n) => n % 2 === 0;
const isPositive = (n) => n > 0;
const greaterThan = (min) => (n) => n > min;

// Transform functions
const square = (n) => n * n;
const double = (n) => n * 2;
const toString = (n) => n.toString();

// Complex array processing pipeline
const processNumbers = pipe(
    filter(isPositive),           // Keep positive numbers
    filter(greaterThan(5)),       // Keep numbers > 5
    map(square),                  // Square each number
    sort((a, b) => a - b),        // Sort ascending
    take(5)                       // Take first 5
);

const numbers = [-2, 3, 8, -1, 6, 12, 4, 9, 15, 2];
console.log('Original numbers:', numbers);
console.log('Processed numbers:', processNumbers(numbers));

// Object processing composition
console.log('\\n=== Object Processing Composition ===');

// Object utility functions
const pick = (keys) => (obj) => 
    keys.reduce((picked, key) => {
        if (key in obj) picked[key] = obj[key];
        return picked;
    }, {});

const omit = (keys) => (obj) =>
    Object.keys(obj).reduce((result, key) => {
        if (!keys.includes(key)) result[key] = obj[key];
        return result;
    }, {});

const mapValues = (transform) => (obj) =>
    Object.keys(obj).reduce((result, key) => {
        result[key] = transform(obj[key]);
        return result;
    }, {});

const renameKey = (oldKey, newKey) => (obj) => {
    const { [oldKey]: value, ...rest } = obj;
    return { ...rest, [newKey]: value };
};

const addProperty = (key, value) => (obj) => ({ ...obj, [key]: value });

// User data processing pipeline
const processUserData = pipe(
    pick(['name', 'email', 'age']),           // Keep only specific fields
    mapValues(val => typeof val === 'string' ? val.trim() : val), // Trim strings
    renameKey('name', 'fullName'),            // Rename field
    addProperty('isAdult', true),             // Add computed field
    addProperty('createdAt', new Date().toISOString()) // Add timestamp
);

const rawUser = {
    id: 123,
    name: '  John Doe  ',
    email: '  john@example.com  ',
    age: 25,
    password: 'secret123',
    internalData: 'sensitive'
};

console.log('Raw user data:', rawUser);
console.log('Processed user data:', processUserData(rawUser));

// Advanced Composition Patterns
console.log('\\n=== Advanced Composition Patterns ===');

// Conditional composition
const when = (predicate) => (fn) => (value) =>
    predicate(value) ? fn(value) : value;

const unless = (predicate) => (fn) => (value) =>
    !predicate(value) ? fn(value) : value;

// Branching composition
const branch = (predicate, trueFn, falseFn) => (value) =>
    predicate(value) ? trueFn(value) : falseFn(value);

// Example: Process numbers differently based on whether they're even or odd
const processNumber = branch(
    isEven,
    pipe(divide(2), toString, addPrefix('Half: ')),    // Even: divide by 2
    pipe(multiply(3), toString, addPrefix('Triple: ')) // Odd: multiply by 3
);

console.log('Process even number (8):', processNumber(8));
console.log('Process odd number (7):', processNumber(7));

// Composition with error handling
const tryCatch = (fn, errorHandler = (error) => error) => (value) => {
    try {
        return fn(value);
    } catch (error) {
        return errorHandler(error);
    }
};

const safeParseJSON = tryCatch(
    JSON.parse,
    (error) => ({ error: 'Invalid JSON', message: error.message })
);

const processJSONString = pipe(
    trim,
    safeParseJSON,
    when(
        (result) => !result.error,
        pick(['name', 'email'])
    )
);

console.log('\\nJSON processing:');
console.log('Valid JSON:', processJSONString(' {"name": "Alice", "email": "alice@test.com", "age": 30} '));
console.log('Invalid JSON:', processJSONString('invalid json'));

// Async composition
console.log('\\n=== Async Composition ===');

// Async pipe function
const asyncPipe = (...functions) => (value) =>
    functions.reduce(async (acc, fn) => fn(await acc), value);

// Async utility functions
const delay = (ms) => (value) => 
    new Promise(resolve => setTimeout(() => resolve(value), ms));

const asyncMap = (fn) => async (array) => 
    Promise.all(array.map(fn));

const fetchUserData = async (id) => {
    await delay(100)(); // Simulate API delay
    return { id, name: 'User ' + id, email: 'user' + id + '@example.com' };
};

const enrichUserData = (user) => ({
    ...user,
    displayName: user.name.toUpperCase(),
    domain: user.email.split('@')[1]
});

// Async processing pipeline
const processUserAsync = asyncPipe(
    fetchUserData,
    enrichUserData,
    delay(50)
);

// Example async processing
async function demonstrateAsyncComposition() {
    console.log('Starting async processing...');
    const result = await processUserAsync(123);
    console.log('Async result:', result);
}

demonstrateAsyncComposition();

// Lens composition for deep object access
console.log('\\n=== Lens Composition ===');

// Simple lens implementation
const lens = (getter, setter) => ({
    get: getter,
    set: setter,
    over: (fn) => (obj) => setter(fn(getter(obj)))(obj)
});

// Lens creators
const prop = (key) => lens(
    (obj) => obj[key],
    (value) => (obj) => ({ ...obj, [key]: value })
);

const path = (keys) => lens(
    (obj) => keys.reduce((current, key) => current && current[key], obj),
    (value) => (obj) => {
        const result = { ...obj };
        let current = result;
        
        for (let i = 0; i < keys.length - 1; i++) {
            const key = keys[i];
            current[key] = { ...current[key] };
            current = current[key];
        }
        
        current[keys[keys.length - 1]] = value;
        return result;
    }
);

// Lens composition
const composeLenses = (...lenses) => lens(
    (obj) => lenses.reduce((current, l) => l.get(current), obj),
    (value) => (obj) => lenses.reduceRight((setValue, l) => l.set(setValue), value)(obj)
);

// Example usage
const user = {
    profile: {
        personal: {
            name: 'John Doe',
            age: 30
        },
        contact: {
            email: 'john@example.com'
        }
    }
};

const nameLens = path(['profile', 'personal', 'name']);
const ageLens = path(['profile', 'personal', 'age']);

console.log('Original user:', user);
console.log('Get name:', nameLens.get(user));

const updatedUser = nameLens.set('Jane Doe')(user);
console.log('Updated name:', updatedUser);
console.log('Original unchanged:', user);

// Transform with lens
const incrementAge = ageLens.over(age => age + 1);
console.log('Incremented age:', incrementAge(user));

// Practical composition examples
console.log('\\n=== Practical Examples ===');

// Data processing pipeline for analytics
const processAnalyticsData = pipe(
    // 1. Filter valid entries
    filter(entry => entry.timestamp && entry.value !== null),
    
    // 2. Sort by timestamp
    sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)),
    
    // 3. Add computed fields
    map(entry => ({
        ...entry,
        date: new Date(entry.timestamp).toISOString().split('T')[0],
        valueSquared: entry.value * entry.value
    })),
    
    // 4. Group by date
    reduce((groups, entry) => {
        const date = entry.date;
        return {
            ...groups,
            [date]: [...(groups[date] || []), entry]
        };
    }, {})
);

const analyticsData = [
    { timestamp: '2023-01-01T10:00:00Z', value: 10 },
    { timestamp: '2023-01-01T11:00:00Z', value: 15 },
    { timestamp: '2023-01-02T10:00:00Z', value: 8 },
    { timestamp: null, value: 20 }, // Invalid entry
    { timestamp: '2023-01-02T11:00:00Z', value: null }, // Invalid entry
    { timestamp: '2023-01-02T12:00:00Z', value: 12 }
];

console.log('Analytics processing:');
console.log('Processed data:', processAnalyticsData(analyticsData));

// Form validation composition
const validators = {
    required: (value) => value !== null && value !== undefined && value !== '',
    minLength: (min) => (value) => value && value.length >= min,
    email: (value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value || ''),
    numeric: (value) => !isNaN(value) && !isNaN(parseFloat(value))
};

const validate = (validatorFns) => (value) => {
    const errors = validatorFns
        .map(validator => validator(value))
        .filter(result => result !== true);
    
    return errors.length === 0 ? true : errors;
};

// Compose validation for different fields
const validateName = validate([
    validators.required,
    validators.minLength(2)
]);

const validateEmail = validate([
    validators.required,
    validators.email
]);

const validateAge = validate([
    validators.required,
    validators.numeric
]);

console.log('\\nValidation examples:');
console.log('Valid name:', validateName('John'));
console.log('Invalid name:', validateName(''));
console.log('Valid email:', validateEmail('john@example.com'));
console.log('Invalid email:', validateEmail('invalid-email'));

console.log('\\nFunction composition examples completed');`,

  exercises: [
    {
      question: "Create a data processing pipeline that filters, transforms, and aggregates an array of products:",
      solution: `// Building block functions
const filter = (predicate) => (array) => array.filter(predicate);
const map = (transform) => (array) => array.map(transform);
const reduce = (reducer, initial) => (array) => array.reduce(reducer, initial);
const sort = (compareFn) => (array) => [...array].sort(compareFn);

// Predicates and transforms
const inStock = (product) => product.stock > 0;
const inCategory = (category) => (product) => product.category === category;
const addTotalValue = (product) => ({
  ...product,
  totalValue: product.price * product.stock
});

// Aggregation functions
const sumBy = (key) => (acc, item) => acc + item[key];
const groupBy = (key) => reduce((groups, item) => {
  const groupKey = item[key];
  return {
    ...groups,
    [groupKey]: [...(groups[groupKey] || []), item]
  };
}, {});

// Compose the pipeline
const processProducts = pipe(
  filter(inStock),                    // Only products in stock
  map(addTotalValue),                 // Add calculated total value
  sort((a, b) => b.totalValue - a.totalValue), // Sort by value desc
  groupBy('category')                 // Group by category
);

// Usage:
const products = [
  { name: 'Laptop', price: 1000, stock: 5, category: 'Electronics' },
  { name: 'Mouse', price: 25, stock: 0, category: 'Electronics' },
  { name: 'Book', price: 15, stock: 10, category: 'Books' }
];

const result = processProducts(products);
console.log(result);`,
      explanation: "This pipeline demonstrates composition for data processing: filtering, transforming, sorting, and grouping operations combined into a reusable pipeline."
    }
  ],

  quiz: [
    {
      question: "What is the main difference between compose and pipe functions?",
      options: [
        "compose is faster than pipe",
        "compose reads right-to-left, pipe reads left-to-right",
        "pipe can only work with arrays",
        "compose handles errors better"
      ],
      correct: 1,
      explanation: "compose applies functions from right-to-left (like mathematical composition), while pipe applies functions from left-to-right (like Unix pipes), making pipe more intuitive for sequential operations."
    }
  ],

  resources: [
    {
      title: "Function Composition in JavaScript",
      url: "https://medium.com/javascript-scene/master-the-javascript-interview-what-is-function-composition-20dfb109a1a0"
    },
    {
      title: "Ramda.js - Functional Utility Library",
      url: "https://ramdajs.com/"
    }
  ],

  nextModules: ['currying', 'immutability', 'pure-functions'],
  prerequisites: ['pure-functions', 'higher-order-functions', 'map-filter-reduce']
};