// src/front/data/modules/fundamentals/VariablesTypes.js
export default {
  title: 'Variables and Data Types',
  duration: '25 min',
  difficulty: 'Beginner',
  overview: 'Master JavaScript variables and data types. Learn the difference between let, const, and var, understand primitive and reference types, and explore type conversion.',
  
  keyPoints: [
    'Use let for variables that can change, const for constants',
    'JavaScript has 7 primitive types: string, number, boolean, undefined, null, symbol, bigint',
    'Objects and arrays are reference types',
    'JavaScript performs automatic type conversion (coercion)',
    'Use typeof operator to check variable types',
    'Template literals provide powerful string interpolation'
  ],

  example: `// Variable Declarations
let userName = "Alice";     // Mutable variable
const PI = 3.14159;         // Constant
var oldStyle = "avoid";     // Old way (avoid)

// Data Types
let age = 25;               // Number
let message = "Hello!";     // String  
let isActive = true;        // Boolean
let data = null;            // Null
let notSet;                 // Undefined
let id = Symbol('id');      // Symbol
let bigNumber = 123n;       // BigInt

// Type Checking
console.log(typeof age);      // "number"
console.log(typeof message); // "string"
console.log(typeof isActive); // "boolean"
console.log(typeof data);     // "object" (quirk!)
console.log(typeof notSet);   // "undefined"

// Template Literals
const greeting = \`Hello, \${userName}! You are \${age} years old.\`;
console.log(greeting);

// Type Conversion
let str = "42";
let num = Number(str);      // Convert to number
let bool = Boolean(num);    // Convert to boolean

console.log("String:", str, typeof str);
console.log("Number:", num, typeof num);
console.log("Boolean:", bool, typeof bool);

// Arrays and Objects (Reference Types)
const numbers = [1, 2, 3, 4, 5];
const person = {
    name: "Bob",
    age: 30,
    city: "New York"
};

console.log("Array:", numbers);
console.log("Object:", person);`,

  exercises: [
    {
      question: "Create a variable that stores your name and cannot be changed.",
      solution: "const myName = 'Your Name';",
      explanation: "Use const for values that should not be reassigned."
    },
    {
      question: "Check the type of the variable: let x = '123';",
      solution: "console.log(typeof x); // 'string'",
      explanation: "The typeof operator returns the type as a string."
    },
    {
      question: "Convert the string '42' to a number and then to a boolean.",
      solution: "let str = '42'; let num = Number(str); let bool = Boolean(num);",
      explanation: "Use Number() and Boolean() constructors for explicit type conversion."
    }
  ],

  quiz: [
    {
      question: "What is the difference between null and undefined?",
      options: [
        "There is no difference",
        "null is assigned, undefined is not initialized",
        "undefined is assigned, null is not initialized",
        "Both are the same as false"
      ],
      correct: 1,
      explanation: "null is explicitly assigned to indicate 'no value', undefined means the variable hasn't been initialized."
    },
    {
      question: "Which of these is NOT a primitive type in JavaScript?",
      options: ["string", "number", "array", "boolean"],
      correct: 2,
      explanation: "Array is a reference type (object), not a primitive type."
    }
  ],

  resources: [
    {
      title: "MDN - JavaScript Data Types",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures"
    },
    {
      title: "Variables and Scoping",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types"
    }
  ],

  nextModules: ['operators-expressions', 'control-flow'],
  prerequisites: []
};

// src/front/data/modules/fundamentals/OperatorsExpressions.js
export const OperatorsExpressions = {
  title: 'Operators and Expressions',
  duration: '30 min',
  difficulty: 'Beginner',
  overview: 'Learn JavaScript operators for arithmetic, comparison, logical operations, and more. Understand operator precedence and expression evaluation.',
  
  keyPoints: [
    'Arithmetic operators: +, -, *, /, %, **',
    'Comparison operators return boolean values',
    'Logical operators: &&, ||, ! for boolean logic',
    'Assignment operators modify variable values',
    'Ternary operator provides conditional expressions',
    'Operator precedence determines evaluation order'
  ],

  example: `// Arithmetic Operators
let a = 10;
let b = 3;

console.log(a + b);   // 13 (addition)
console.log(a - b);   // 7 (subtraction)
console.log(a * b);   // 30 (multiplication)
console.log(a / b);   // 3.33... (division)
console.log(a % b);   // 1 (modulo/remainder)
console.log(a ** b);  // 1000 (exponentiation)

// Increment/Decrement
let count = 0;
console.log(count++); // 0 (post-increment)
console.log(++count); // 2 (pre-increment)
console.log(count--); // 2 (post-decrement)
console.log(--count); // 0 (pre-decrement)

// Comparison Operators
let x = 5;
let y = "5";

console.log(x == y);   // true (loose equality)
console.log(x === y);  // false (strict equality)
console.log(x != y);   // false (loose inequality)
console.log(x !== y);  // true (strict inequality)
console.log(x > 3);    // true
console.log(x <= 5);   // true

// Logical Operators
let isLoggedIn = true;
let hasPermission = false;

console.log(isLoggedIn && hasPermission); // false (AND)
console.log(isLoggedIn || hasPermission); // true (OR)
console.log(!isLoggedIn);                 // false (NOT)

// Short-circuit evaluation
let user = null;
let defaultName = "Guest";
let name = user && user.name || defaultName;
console.log(name); // "Guest"

// Assignment Operators
let score = 10;
score += 5;  // score = score + 5
score -= 3;  // score = score - 3
score *= 2;  // score = score * 2
score /= 4;  // score = score / 4
console.log(score); // 6

// Ternary Operator
let age = 18;
let status = age >= 18 ? "adult" : "minor";
console.log(status); // "adult"

// Complex expressions
let result = (a > b) ? a * 2 : b * 2;
let canVote = (age >= 18 && isLoggedIn) ? "Yes" : "No";

// Type coercion in operators
console.log("5" + 3);     // "53" (string concatenation)
console.log("5" - 3);     // 2 (numeric subtraction)
console.log("5" * "2");   // 10 (numeric multiplication)
console.log(true + 1);    // 2 (boolean to number)

// Nullish coalescing operator (??)
let username = null;
let display = username ?? "Anonymous";
console.log(display); // "Anonymous"`,

  exercises: [
    {
      question: "What's the difference between == and === operators?",
      solution: "== checks for loose equality (with type coercion), === checks for strict equality (no type coercion)",
      explanation: "=== is generally preferred as it's more predictable and doesn't perform unexpected type conversions."
    },
    {
      question: "Write a ternary expression to check if a number is even or odd.",
      solution: "let result = (num % 2 === 0) ? 'even' : 'odd';",
      explanation: "Use modulo operator to check remainder when divided by 2."
    }
  ],

  quiz: [
    {
      question: "What does the expression 'false || 'hello' || null' evaluate to?",
      options: ["false", "hello", "null", "true"],
      correct: 1,
      explanation: "The || operator returns the first truthy value, which is 'hello'."
    }
  ],

  resources: [
    {
      title: "MDN - Expressions and Operators",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators"
    }
  ],

  nextModules: ['control-flow'],
  prerequisites: ['variables-types']
};