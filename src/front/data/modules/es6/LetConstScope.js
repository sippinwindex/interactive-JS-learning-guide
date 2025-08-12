// src/front/data/modules/es6/LetConstScope.js
export default {
  title: 'Let, Const, and Block Scope',
  duration: '30 min',
  difficulty: 'Beginner',
  overview: 'Understand ES6 block scoping with let and const. Learn the differences from var, temporal dead zone, and best practices for variable declarations.',
  
  keyPoints: [
    'let and const have block scope, var has function scope',
    'const variables cannot be reassigned',
    'Temporal dead zone prevents access before declaration',
    'No hoisting behavior with let and const',
    'Block scope prevents variable leakage',
    'Use const by default, let when reassignment needed'
  ],

  example: `// Var vs Let vs Const
console.log('=== Variable Declarations ===');

// Var - function scoped, can be redeclared
var varVariable = 'I am var';
var varVariable = 'I can be redeclared'; // No error
console.log('Var variable:', varVariable);

// Let - block scoped, cannot be redeclared
let letVariable = 'I am let';
// let letVariable = 'Error if redeclared'; // SyntaxError
letVariable = 'But I can be reassigned';
console.log('Let variable:', letVariable);

// Const - block scoped, cannot be redeclared or reassigned
const constVariable = 'I am const';
// const constVariable = 'Error if redeclared'; // SyntaxError
// constVariable = 'Error if reassigned'; // TypeError
console.log('Const variable:', constVariable);

// Block Scope Demonstration
console.log('\\n=== Block Scope ===');

function scopeDemo() {
    if (true) {
        var varInBlock = 'var inside block';
        let letInBlock = 'let inside block';
        const constInBlock = 'const inside block';
        
        console.log('Inside block:');
        console.log('var:', varInBlock);
        console.log('let:', letInBlock);
        console.log('const:', constInBlock);
    }
    
    console.log('Outside block:');
    console.log('var:', varInBlock); // Accessible (function scoped)
    
    try {
        console.log('let:', letInBlock); // ReferenceError
    } catch (error) {
        console.log('let error:', error.message);
    }
    
    try {
        console.log('const:', constInBlock); // ReferenceError
    } catch (error) {
        console.log('const error:', error.message);
    }
}

scopeDemo();

// Loop Scope Issues
console.log('\\n=== Loop Scope Issues ===');

// Problem with var in loops
console.log('Var in setTimeout loop:');
for (var i = 0; i < 3; i++) {
    setTimeout(() => {
        console.log('var i:', i); // Always prints 3
    }, 100);
}

// Solution with let
console.log('Let in setTimeout loop:');
for (let j = 0; j < 3; j++) {
    setTimeout(() => {
        console.log('let j:', j); // Prints 0, 1, 2
    }, 200);
}

// Event handlers example
const buttons = [
    { id: 1, name: 'Button 1' },
    { id: 2, name: 'Button 2' },
    { id: 3, name: 'Button 3' }
];

// Problem with var
console.log('Event handlers with var:');
for (var k = 0; k < buttons.length; k++) {
    const button = buttons[k];
    // Simulate event handler
    setTimeout(() => {
        console.log(\`Clicked button \${k}: \${button.name}\`); // k is always 3
    }, 300);
}

// Solution with let
console.log('Event handlers with let:');
for (let l = 0; l < buttons.length; l++) {
    const button = buttons[l];
    // Simulate event handler
    setTimeout(() => {
        console.log(\`Clicked button \${l}: \${button.name}\`); // l preserves value
    }, 400);
}

// Hoisting Differences
console.log('\\n=== Hoisting Differences ===');

function hoistingDemo() {
    console.log('Before declarations:');
    
    // Var is hoisted and initialized with undefined
    console.log('var variable:', typeof varHoisted, varHoisted);
    
    // Let and const are hoisted but not initialized (temporal dead zone)
    try {
        console.log('let variable:', letHoisted);
    } catch (error) {
        console.log('let error:', error.message);
    }
    
    try {
        console.log('const variable:', constHoisted);
    } catch (error) {
        console.log('const error:', error.message);
    }
    
    // Actual declarations
    var varHoisted = 'var value';
    let letHoisted = 'let value';
    const constHoisted = 'const value';
    
    console.log('After declarations:');
    console.log('var:', varHoisted);
    console.log('let:', letHoisted);
    console.log('const:', constHoisted);
}

hoistingDemo();

// Temporal Dead Zone
console.log('\\n=== Temporal Dead Zone ===');

function temporalDeadZoneDemo() {
    console.log('Entering function...');
    
    // This is the temporal dead zone for myLet and myConst
    
    try {
        console.log(myLet); // ReferenceError
    } catch (error) {
        console.log('TDZ error for let:', error.message);
    }
    
    // Declaration and initialization
    let myLet = 'Now I exist';
    const myConst = 'I also exist now';
    
    console.log('After declaration:', myLet, myConst);
}

temporalDeadZoneDemo();

// Const with Objects and Arrays
console.log('\\n=== Const with Reference Types ===');

// Const prevents reassignment, not mutation
const constArray = [1, 2, 3];
const constObject = { name: 'Alice', age: 30 };

console.log('Original const array:', constArray);
console.log('Original const object:', constObject);

// These work (mutation)
constArray.push(4);
constArray[0] = 99;
constObject.age = 31;
constObject.city = 'New York';

console.log('Modified const array:', constArray);
console.log('Modified const object:', constObject);

// These would cause errors (reassignment)
try {
    // constArray = [5, 6, 7]; // TypeError
    // constObject = { name: 'Bob' }; // TypeError
    console.log('Cannot reassign const variables');
} catch (error) {
    console.log('Reassignment error:', error.message);
}

// Object.freeze for true immutability
const frozenObject = Object.freeze({ name: 'Bob', age: 25 });

try {
    frozenObject.age = 26; // Silently fails in non-strict mode, throws in strict
    console.log('Frozen object after modification attempt:', frozenObject);
} catch (error) {
    console.log('Frozen object error:', error.message);
}

// Block Scope in Different Contexts
console.log('\\n=== Block Scope Contexts ===');

// If statements
if (true) {
    const blockVar = 'Inside if block';
    console.log('If block:', blockVar);
}

// Try to access outside
try {
    console.log(blockVar); // ReferenceError
} catch (error) {
    console.log('If block variable not accessible outside');
}

// Switch statements
const value = 'case1';
switch (value) {
    case 'case1':
        const switchVar = 'Inside switch case';
        console.log('Switch case:', switchVar);
        break;
    default:
        // switchVar is not accessible here
        break;
}

// For loops
for (let i = 0; i < 2; i++) {
    const loopVar = \`Loop iteration \${i}\`;
    console.log(loopVar);
}

// While loops  
let counter = 0;
while (counter < 2) {
    const whileVar = \`While iteration \${counter}\`;
    console.log(whileVar);
    counter++;
}

// Best Practices
console.log('\\n=== Best Practices ===');

// 1. Use const by default
const defaultChoice = 'Use const by default';
console.log('Best practice 1:', defaultChoice);

// 2. Use let when reassignment is needed
let needsReassignment = 'Initial value';
needsReassignment = 'Updated value';
console.log('Best practice 2:', needsReassignment);

// 3. Avoid var in modern JavaScript
// var shouldAvoid = 'Avoid var'; // Don't do this

// 4. Declare variables close to where they're used
function processUser(userData) {
    // Validate first
    if (!userData) {
        return null;
    }
    
    // Declare variables close to usage
    const name = userData.name || 'Unknown';
    const age = userData.age || 0;
    const isAdult = age >= 18;
    
    return {
        name,
        age,
        isAdult,
        canVote: isAdult // Derived from previous calculation
    };
}

const user1 = processUser({ name: 'Alice', age: 25 });
const user2 = processUser({ name: 'Bob', age: 16 });

console.log('Processed users:', user1, user2);

// 5. Use block scope to limit variable lifetime
function complexCalculation(data) {
    let result = 0;
    
    // Phase 1: Basic calculation
    {
        const multiplier = 2;
        const baseValue = data.reduce((sum, val) => sum + val, 0);
        result = baseValue * multiplier;
        console.log(\`Phase 1 result: \${result}\`);
        // multiplier and baseValue are garbage collected here
    }
    
    // Phase 2: Apply bonus
    {
        const bonusRate = 0.1;
        const bonus = result * bonusRate;
        result += bonus;
        console.log(\`Phase 2 result: \${result}\`);
        // bonusRate and bonus are garbage collected here
    }
    
    return result;
}

const calculationResult = complexCalculation([10, 20, 30]);
console.log('Final calculation result:', calculationResult);

// Common Pitfalls and Solutions
console.log('\\n=== Common Pitfalls ===');

// Pitfall 1: Accessing before declaration
function pitfall1() {
    try {
        console.log(earlyAccess); // ReferenceError
        let earlyAccess = 'Too late';
    } catch (error) {
        console.log('Pitfall 1 - Early access:', error.message);
    }
}

pitfall1();

// Pitfall 2: Redeclaration in same scope
function pitfall2() {
    let sameName = 'First declaration';
    
    if (true) {
        let sameName = 'Different scope, OK'; // This is fine
        console.log('Inner scope:', sameName);
    }
    
    console.log('Outer scope:', sameName);
    
    try {
        let sameName = 'Same scope redeclaration'; // SyntaxError
    } catch (error) {
        console.log('Pitfall 2 - Redeclaration error caught at parse time');
    }
}

pitfall2();

// Pitfall 3: Const reassignment
function pitfall3() {
    const immutableValue = 'Cannot change';
    
    try {
        immutableValue = 'Trying to change'; // TypeError
    } catch (error) {
        console.log('Pitfall 3 - Const reassignment:', error.message);
    }
}

pitfall3();

// Modern JavaScript Patterns
console.log('\\n=== Modern Patterns ===');

// 1. IIFE with let/const
const modulePattern = (() => {
    const privateVar = 'Private';
    let counter = 0;
    
    return {
        increment() {
            counter++;
            return counter;
        },
        getPrivate() {
            return privateVar;
        },
        getCounter() {
            return counter;
        }
    };
})();

console.log('Module pattern:');
console.log('Counter:', modulePattern.increment());
console.log('Counter:', modulePattern.increment());
console.log('Private:', modulePattern.getPrivate());

// 2. Block-scoped helper functions
function processData(items) {
    // Helper functions with block scope
    {
        const validateItem = (item) => item && typeof item === 'object';
        const transformItem = (item) => ({ ...item, processed: true });
        
        const validItems = items.filter(validateItem);
        const transformedItems = validItems.map(transformItem);
        
        console.log('Processed items:', transformedItems);
        return transformedItems;
    }
    
    // Helper functions are not accessible here
}

const sampleData = [
    { id: 1, name: 'Item 1' },
    { id: 2, name: 'Item 2' },
    null, // Invalid item
    { id: 3, name: 'Item 3' }
];

processData(sampleData);

// 3. Configuration with const
const CONFIG = Object.freeze({
    API_URL: 'https://api.example.com',
    TIMEOUT: 5000,
    FEATURES: Object.freeze({
        DARK_MODE: true,
        NOTIFICATIONS: false
    })
});

console.log('Frozen config:', CONFIG);

// Try to modify (will fail silently or throw in strict mode)
try {
    CONFIG.API_URL = 'https://malicious.com';
    CONFIG.FEATURES.DARK_MODE = false;
    console.log('Config after modification attempt:', CONFIG);
} catch (error) {
    console.log('Config modification error:', error.message);
}

console.log('Let, const, and block scope examples completed');`,

  exercises: [
    {
      question: "Fix this code to properly handle the loop variable in setTimeout:",
      solution: `// Problem code:
// for (var i = 0; i < 3; i++) {
//   setTimeout(() => console.log(i), 100);
// }

// Solution 1: Use let instead of var
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}

// Solution 2: Use closure with IIFE
for (var i = 0; i < 3; i++) {
  ((index) => {
    setTimeout(() => console.log(index), 100);
  })(i);
}`,
      explanation: "Using let creates a new binding for each iteration, while var shares the same binding across all iterations."
    }
  ],

  quiz: [
    {
      question: "What happens when you try to access a let variable before its declaration?",
      options: [
        "It returns undefined",
        "It returns null",
        "It throws a ReferenceError",
        "It returns the global variable with the same name"
      ],
      correct: 2,
      explanation: "Accessing a let or const variable before declaration throws a ReferenceError due to the temporal dead zone."
    }
  ],

  resources: [
    {
      title: "MDN - Let",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let"
    },
    {
      title: "MDN - Const",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const"
    }
  ],

  nextModules: ['arrow-functions', 'destructuring'],
  prerequisites: ['variables-types', 'functions-basics']
};