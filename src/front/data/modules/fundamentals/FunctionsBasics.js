// src/front/data/modules/fundamentals/FunctionsBasics.js
export const FunctionsBasics = {
  title: 'Functions Basics',
  duration: '40 min',
  difficulty: 'Beginner',
  overview: 'Learn to create and use functions in JavaScript. Understand function declarations, expressions, parameters, return values, and scope.',
  
  keyPoints: [
    'Functions are reusable blocks of code',
    'Function declarations vs function expressions',
    'Parameters pass data into functions',
    'Return statements send data back',
    'Local vs global scope affects variable access',
    'Functions are first-class objects in JavaScript'
  ],

  example: `// Function Declaration
function greet(name) {
    return \`Hello, \${name}!\`;
}

console.log(greet("Alice")); // "Hello, Alice!"

// Function Expression
const add = function(a, b) {
    return a + b;
};

console.log(add(5, 3)); // 8

// Arrow Function (ES6)
const multiply = (x, y) => x * y;
console.log(multiply(4, 6)); // 24

// Function with Default Parameters
function introduce(name, age = 25, city = "Unknown") {
    return \`I'm \${name}, \${age} years old, from \${city}\`;
}

console.log(introduce("Bob"));           // Uses defaults
console.log(introduce("Carol", 30));     // Partial defaults
console.log(introduce("Dave", 35, "LA")); // No defaults

// Rest Parameters
function sum(...numbers) {
    let total = 0;
    for (const num of numbers) {
        total += num;
    }
    return total;
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// Function Scope
let globalVar = "I'm global";

function scopeDemo() {
    let localVar = "I'm local";
    console.log(globalVar);  // Accessible
    console.log(localVar);   // Accessible
    
    function innerFunction() {
        let innerVar = "I'm inner";
        console.log(globalVar);  // Accessible
        console.log(localVar);   // Accessible
        console.log(innerVar);   // Accessible
    }
    
    innerFunction();
    // console.log(innerVar); // Error - not accessible
}

scopeDemo();

// Higher-Order Functions
function applyOperation(x, y, operation) {
    return operation(x, y);
}

const result1 = applyOperation(10, 5, add);
const result2 = applyOperation(10, 5, (a, b) => a - b);
console.log(result1); // 15
console.log(result2); // 5

// Function as Return Value
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(4)); // 12

// IIFE (Immediately Invoked Function Expression)
(function() {
    console.log("This runs immediately!");
})();

// Named Function Expression
const factorial = function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
};

console.log(factorial(5)); // 120

// Practical Examples
function isEven(number) {
    return number % 2 === 0;
}

function filterEvenNumbers(numbers) {
    const evens = [];
    for (const num of numbers) {
        if (isEven(num)) {
            evens.push(num);
        }
    }
    return evens;
}

const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
console.log(filterEvenNumbers(numbers)); // [2, 4, 6, 8, 10]`,

  exercises: [
    {
      question: "Create a function that calculates the area of a rectangle with default width of 1.",
      solution: "function rectangleArea(length, width = 1) { return length * width; }",
      explanation: "Default parameters provide fallback values when arguments aren't provided."
    },
    {
      question: "Write a function that returns the larger of two numbers.",
      solution: "function max(a, b) { return a > b ? a : b; }",
      explanation: "Use a ternary operator to return the larger value."
    }
  ],

  quiz: [
    {
      question: "What's the difference between function declarations and function expressions?",
      options: [
        "No difference",
        "Declarations are hoisted, expressions are not",
        "Expressions are faster",
        "Declarations can't have parameters"
      ],
      correct: 1,
      explanation: "Function declarations are hoisted to the top of their scope, while function expressions are not."
    }
  ],

  resources: [
    {
      title: "MDN - Functions",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions"
    }
  ],

  nextModules: ['arrays-objects'],
  prerequisites: ['control-flow']
};
