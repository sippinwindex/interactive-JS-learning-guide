// src/front/components/docs/BasicsSection.jsx
import React from 'react';
import { CodeBlock } from '../CodeBlock';

export const BasicsSection = ({ runCode, runOutput }) => {
  const content = [
    {
      title: 'Variables and Data Types',
      description: 'Modern variable declarations and JavaScript\'s type system',
      code: `// Modern variable declarations
let name = "John";        // Mutable
const age = 30;          // Immutable
const isActive = true;   // Boolean
const items = null;      // Null
let notSet;             // Undefined

// Template literals (ES6+)
const message = \`Hello, \${name}! You are \${age} years old.\`;

// Type checking
console.log(typeof name);     // "string"
console.log(typeof age);      // "number"
console.log(typeof isActive); // "boolean"
console.log(typeof items);    // "object" (quirk!)
console.log(typeof notSet);   // "undefined"

// Type coercion examples
console.log("5" + 3);    // "53" (string concatenation)
console.log("5" - 3);    // 2 (numeric subtraction)
console.log(Boolean(0)); // false
console.log(Boolean(1)); // true`
    },
    {
      title: 'Functions - All Forms',
      description: 'Function declarations, expressions, and arrow functions',
      code: `// Function declaration (hoisted)
function greet(name) {
    return \`Hello, \${name}!\`;
}

// Function expression
const add = function(a, b) {
    return a + b;
};

// Arrow function (ES6+)
const multiply = (a, b) => a * b;

// Arrow function with block body
const processUser = (user) => {
    const processed = user.name.toUpperCase();
    return \`Processed: \${processed}\`;
};

// Default parameters
function power(base, exponent = 2) {
    return Math.pow(base, exponent);
}

// Rest parameters
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(greet('Alice'));
console.log(add(5, 3));
console.log(multiply(4, 7));
console.log(power(3));        // Uses default exponent = 2
console.log(sum(1, 2, 3, 4)); // 10`
    },
    {
      title: 'Arrays and Objects',
      description: 'Working with JavaScript\'s core data structures',
      code: `// Arrays
const fruits = ['apple', 'banana', 'orange'];
const numbers = [1, 2, 3, 4, 5];

// Array methods
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sum = numbers.reduce((acc, n) => acc + n, 0);

console.log('Doubled:', doubled);
console.log('Evens:', evens);
console.log('Sum:', sum);

// Objects
const person = {
    name: 'John',
    age: 30,
    hobbies: ['reading', 'gaming'],
    greet() {
        return \`Hi, I'm \${this.name}\`;
    }
};

// Object destructuring
const { name, age, hobbies } = person;
console.log(\`\${name} is \${age} years old\`);

// Object methods
console.log(Object.keys(person));
console.log(Object.values(person));
console.log(person.greet());`
    },
    {
      title: 'Control Flow and Loops',
      description: 'Controlling program execution with conditions and iterations',
      code: `// Conditional statements
let score = 85;
let grade;

if (score >= 90) {
    grade = 'A';
} else if (score >= 80) {
    grade = 'B';
} else if (score >= 70) {
    grade = 'C';
} else {
    grade = 'F';
}

console.log(\`Score: \${score}, Grade: \${grade}\`);

// Ternary operator
const status = age >= 18 ? 'adult' : 'minor';
console.log(\`Status: \${status}\`);

// Loops
console.log('\\nFor loop:');
for (let i = 1; i <= 3; i++) {
    console.log(\`Count: \${i}\`);
}

console.log('\\nArray iteration:');
const colors = ['red', 'green', 'blue'];
colors.forEach((color, index) => {
    console.log(\`\${index}: \${color}\`);
});

// While loop
console.log('\\nWhile loop:');
let count = 0;
while (count < 3) {
    console.log(\`While count: \${count}\`);
    count++;
}`
    }
  ];

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Master the fundamental building blocks of JavaScript. These core concepts form the foundation 
          for everything else in the language.
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

      {/* Key Concepts Summary */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mt-8">
        <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
          🎯 Key Takeaways
        </h4>
        <ul className="space-y-2 text-blue-700 dark:text-blue-300">
          <li><strong>Variables:</strong> Use <code>const</code> by default, <code>let</code> for reassignment, avoid <code>var</code></li>
          <li><strong>Functions:</strong> Arrow functions for short expressions, regular functions for methods</li>
          <li><strong>Arrays:</strong> Use methods like <code>map()</code>, <code>filter()</code>, <code>reduce()</code> for transformations</li>
          <li><strong>Objects:</strong> Use destructuring for cleaner code and method shorthand syntax</li>
          <li><strong>Control Flow:</strong> Prefer <code>for...of</code> and <code>forEach()</code> over traditional for loops</li>
        </ul>
      </div>
    </div>
  );
};