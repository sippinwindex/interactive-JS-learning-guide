// src/front/data/modules/es6/ArrowFunctions.js
export default {
  title: 'Arrow Functions',
  duration: '25 min',
  difficulty: 'Beginner',
  overview: 'Learn ES6 arrow functions for cleaner, more concise code. Understand syntax variations, lexical this binding, and when to use arrow functions.',
  
  keyPoints: [
    'Arrow functions provide shorter syntax for functions',
    'Lexical this binding - inherits this from enclosing scope',
    'Cannot be used as constructors',
    'No arguments object, use rest parameters instead',
    'Implicit return for single expressions',
    'Useful for callbacks and functional programming'
  ],

  example: `// Basic Arrow Function Syntax
console.log('=== Basic Arrow Function Syntax ===');

// Traditional function
function traditionalAdd(a, b) {
    return a + b;
}

// Arrow function
const arrowAdd = (a, b) => {
    return a + b;
};

// Shorter arrow function (implicit return)
const shortAdd = (a, b) => a + b;

console.log('Traditional:', traditionalAdd(5, 3));
console.log('Arrow:', arrowAdd(5, 3));
console.log('Short arrow:', shortAdd(5, 3));

// Different Arrow Function Forms
console.log('\\n=== Different Forms ===');

// No parameters
const greet = () => 'Hello World!';
console.log(greet());

// One parameter (parentheses optional)
const square = x => x * x;
const squareWithParens = (x) => x * x;

console.log('Square of 4:', square(4));
console.log('Square with parens:', squareWithParens(4));

// Multiple parameters (parentheses required)
const multiply = (x, y) => x * y;
console.log('Multiply 3 and 4:', multiply(3, 4));

// Function body with multiple statements
const processNumber = (num) => {
    console.log(\`Processing: \${num}\`);
    const doubled = num * 2;
    const result = doubled + 1;
    return result;
};

console.log('Processed result:', processNumber(5));

// Returning Objects (parentheses required)
const createUser = (name, age) => ({ name, age });
const createCoords = (x, y) => ({ x: x, y: y });

console.log('User object:', createUser('Alice', 30));
console.log('Coordinates:', createCoords(10, 20));

// Lexical 'this' Binding
console.log('\\n=== Lexical this Binding ===');

// Traditional function example
const traditionalObject = {
    name: 'Traditional',
    numbers: [1, 2, 3, 4, 5],
    
    processWithTraditional: function() {
        console.log('Processing with traditional function...');
        console.log('this.name:', this.name);
        
        // Problem: 'this' changes in callback
        this.numbers.forEach(function(num) {
            // 'this' is undefined or refers to global object
            console.log(\`Processing \${num} for \${this?.name || 'undefined'}\`);
        });
    },
    
    processWithArrow: function() {
        console.log('Processing with arrow function...');
        console.log('this.name:', this.name);
        
        // Arrow function inherits 'this' from enclosing scope
        this.numbers.forEach((num) => {
            console.log(\`Processing \${num} for \${this.name}\`);
        });
    }
};

traditionalObject.processWithTraditional();
traditionalObject.processWithArrow();

// Arrow Functions in Classes
console.log('\\n=== Arrow Functions in Classes ===');

class Counter {
    constructor() {
        this.count = 0;
        
        // Arrow function method (bound to instance)
        this.increment = () => {
            this.count++;
            console.log(\`Count: \${this.count}\`);
        };
    }
    
    // Traditional method
    decrement() {
        this.count--;
        console.log(\`Count: \${this.count}\`);
    }
    
    // Arrow function for callbacks
    setupTimer() {
        console.log('Setting up timer...');
        
        // Arrow function preserves 'this'
        setTimeout(() => {
            this.increment();
            console.log('Timer callback executed');
        }, 500);
    }
}

const counter = new Counter();
counter.increment();
counter.decrement();
counter.setupTimer();

// Array Methods with Arrow Functions
console.log('\\n=== Array Methods ===');

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Map with arrow function
const squared = numbers.map(n => n * n);
console.log('Squared:', squared);

// Filter with arrow function
const evens = numbers.filter(n => n % 2 === 0);
console.log('Even numbers:', evens);

// Reduce with arrow function
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log('Sum:', sum);

// Find with arrow function
const firstLarge = numbers.find(n => n > 5);
console.log('First number > 5:', firstLarge);

// Sort with arrow function
const words = ['banana', 'apple', 'cherry', 'date'];
const sorted = words.sort((a, b) => a.localeCompare(b));
console.log('Sorted words:', sorted);

// Complex transformations
const people = [
    { name: 'Alice', age: 30, city: 'New York' },
    { name: 'Bob', age: 25, city: 'Boston' },
    { name: 'Charlie', age: 35, city: 'Chicago' }
];

// Chain array methods with arrow functions
const result = people
    .filter(person => person.age >= 30)
    .map(person => ({ ...person, adult: true }))
    .sort((a, b) => a.age - b.age);

console.log('Adults 30+:', result);

// Rest Parameters with Arrow Functions
console.log('\\n=== Rest Parameters ===');

// Arrow function with rest parameters
const sumAll = (...numbers) => numbers.reduce((sum, n) => sum + n, 0);
console.log('Sum all:', sumAll(1, 2, 3, 4, 5));

// Destructuring with arrow functions
const getFullName = ({ firstName, lastName }) => \`\${firstName} \${lastName}\`;
const person = { firstName: 'John', lastName: 'Doe', age: 30 };
console.log('Full name:', getFullName(person));

// Default parameters with arrow functions
const greetWithDefault = (name = 'World') => \`Hello, \${name}!\`;
console.log(greetWithDefault());
console.log(greetWithDefault('Alice'));

// Higher-Order Functions
console.log('\\n=== Higher-Order Functions ===');

// Function that returns arrow function
const createMultiplier = (factor) => (number) => number * factor;

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log('Double 5:', double(5));
console.log('Triple 4:', triple(4));

// Currying with arrow functions
const add = (a) => (b) => a + b;
const add5 = add(5);

console.log('Add 5 to 3:', add5(3));
console.log('Direct usage:', add(10)(20));

// Function composition
const pipe = (...functions) => (value) =>
    functions.reduce((acc, fn) => fn(acc), value);

const addOne = x => x + 1;
const multiplyByTwo = x => x * 2;
const subtractThree = x => x - 3;

const composed = pipe(addOne, multiplyByTwo, subtractThree);
console.log('Composed function result:', composed(5)); // ((5 + 1) * 2) - 3 = 9

// Async Arrow Functions
console.log('\\n=== Async Arrow Functions ===');

// Async arrow function
const fetchData = async (url) => {
    console.log(\`Fetching from \${url}...\`);
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 100));
    return \`Data from \${url}\`;
};

// Using async arrow function
fetchData('https://api.example.com/data')
    .then(data => console.log('Fetched:', data))
    .catch(error => console.error('Error:', error));

// Array of async operations
const urls = [
    'https://api1.example.com',
    'https://api2.example.com',
    'https://api3.example.com'
];

// Process URLs with async arrow functions
const processUrls = async () => {
    const results = await Promise.all(
        urls.map(async (url) => {
            const data = await fetchData(url);
            return { url, data };
        })
    );
    
    console.log('All results:', results);
};

processUrls();

// Event Handling with Arrow Functions
console.log('\\n=== Event Handling ===');

class EventHandler {
    constructor() {
        this.clickCount = 0;
        
        // Simulate event handling
        this.handleClick = (event) => {
            this.clickCount++;
            console.log(\`Click \${this.clickCount}: Button clicked\`);
        };
        
        // Traditional method for comparison
        this.handleTraditionalClick = function(event) {
            // 'this' would be the element, not the class instance
            console.log('Traditional click handler');
        };
    }
    
    attachEvents() {
        // Simulate attaching events
        console.log('Attaching events...');
        
        // Arrow function maintains 'this' binding
        setTimeout(this.handleClick, 100);
        setTimeout(this.handleClick, 200);
    }
}

const eventHandler = new EventHandler();
eventHandler.attachEvents();

// When NOT to Use Arrow Functions
console.log('\\n=== When NOT to Use Arrow Functions ===');

// 1. Object methods (when you need dynamic 'this')
const calculator = {
    value: 0,
    
    // Don't use arrow function for methods
    add: function(n) {
        this.value += n;
        return this;
    },
    
    // Arrow function won't work as expected
    badMultiply: (n) => {
        // 'this' doesn't refer to the object
        // this.value *= n; // Would cause error
        console.log('Arrow function in object method - no access to this.value');
        return calculator; // Have to reference object directly
    },
    
    getValue: function() {
        return this.value;
    }
};

calculator.add(5).add(3);
console.log('Calculator value:', calculator.getValue());

// 2. Constructor functions
// Arrow functions cannot be constructors
const ArrowConstructor = () => {
    this.value = 42; // Error: Arrow functions cannot be constructors
};

// 3. When you need the arguments object
function traditionalFunction() {
    console.log('Arguments length:', arguments.length);
    console.log('Arguments:', Array.from(arguments));
}

// Arrow functions don't have arguments object
const arrowFunction = (...args) => {
    console.log('Args length:', args.length);
    console.log('Args:', args);
};

traditionalFunction(1, 2, 3);
arrowFunction(1, 2, 3);

// Practical Examples
console.log('\\n=== Practical Examples ===');

// 1. Filtering and transforming data
const products = [
    { name: 'Laptop', price: 999, category: 'Electronics' },
    { name: 'Book', price: 15, category: 'Education' },
    { name: 'Phone', price: 699, category: 'Electronics' },
    { name: 'Pen', price: 2, category: 'Office' }
];

const expensiveElectronics = products
    .filter(product => product.category === 'Electronics')
    .filter(product => product.price > 500)
    .map(product => ({ 
        ...product, 
        discountedPrice: product.price * 0.9 
    }));

console.log('Expensive electronics with discount:', expensiveElectronics);

// 2. Creating utility functions
const utils = {
    isEven: n => n % 2 === 0,
    isOdd: n => n % 2 !== 0,
    capitalize: str => str.charAt(0).toUpperCase() + str.slice(1),
    formatMoney: amount => \`$\${amount.toFixed(2)}\`,
    randomBetween: (min, max) => Math.floor(Math.random() * (max - min + 1)) + min
};

console.log('Is 4 even?', utils.isEven(4));
console.log('Capitalize "hello":', utils.capitalize('hello'));
console.log('Format money:', utils.formatMoney(123.456));
console.log('Random between 1-10:', utils.randomBetween(1, 10));

// 3. Debouncing with arrow functions
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

const logMessage = (message) => console.log('Debounced:', message);
const debouncedLog = debounce(logMessage, 300);

// These calls will be debounced
debouncedLog('First call');
debouncedLog('Second call');
debouncedLog('Third call'); // Only this will execute after 300ms

console.log('Arrow functions examples completed');`,

  exercises: [
    {
      question: "Convert this traditional function to an arrow function: function double(x) { return x * 2; }",
      solution: "const double = x => x * 2;",
      explanation: "Single parameter arrow functions don't need parentheses, and single expressions have implicit return."
    },
    {
      question: "Create an arrow function that takes an array and returns the sum of all even numbers:",
      solution: `const sumEvens = arr => arr
  .filter(n => n % 2 === 0)
  .reduce((sum, n) => sum + n, 0);`,
      explanation: "Chain filter and reduce with arrow functions for a functional programming approach."
    }
  ],

  quiz: [
    {
      question: "What is the main difference between arrow functions and regular functions regarding 'this'?",
      options: [
        "Arrow functions create their own 'this' context",
        "Arrow functions inherit 'this' from the enclosing scope",
        "Arrow functions don't have 'this'",
        "There is no difference"
      ],
      correct: 1,
      explanation: "Arrow functions have lexical 'this' binding - they inherit 'this' from the enclosing scope rather than creating their own."
    }
  ],

  resources: [
    {
      title: "MDN - Arrow Functions",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions"
    }
  ],

  nextModules: ['destructuring', 'template-strings'],
  prerequisites: ['functions-basics']
};