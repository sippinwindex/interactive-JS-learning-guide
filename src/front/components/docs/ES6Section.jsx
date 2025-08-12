// src/front/components/docs/ES6Section.jsx
import React from 'react';
import { CodeBlock } from '../CodeBlock';

export const ES6Section = ({ runCode, runOutput }) => {
  const content = [
    {
      title: 'Destructuring Assignment',
      description: 'Extract values from arrays and objects efficiently',
      code: `// Array destructuring
const colors = ['red', 'green', 'blue', 'yellow'];
const [primary, secondary, ...rest] = colors;
console.log('Primary:', primary);
console.log('Secondary:', secondary);
console.log('Rest:', rest);

// Object destructuring
const user = {
    name: 'John',
    age: 30,
    email: 'john@example.com',
    address: {
        city: 'New York',
        country: 'USA'
    }
};

const { name, age, email } = user;
const { address: { city } } = user; // Nested destructuring

// Renaming variables
const { name: userName, age: userAge } = user;

// Default values
const { theme = 'dark', language = 'en' } = user;

console.log(\`User: \${userName}, Age: \${userAge}\`);
console.log(\`Theme: \${theme}, Language: \${language}\`);
console.log(\`City: \${city}\`);

// Function parameter destructuring
function displayUser({ name, age, email = 'N/A' }) {
    return \`\${name} (\${age}) - \${email}\`;
}

console.log(displayUser(user));`
    },
    {
      title: 'Spread and Rest Operators',
      description: 'Spread syntax for arrays, objects, and function calls',
      code: `// Spread with arrays
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combined = [...arr1, ...arr2];
console.log('Combined arrays:', combined);

// Spread with objects
const person = { name: 'John', age: 30 };
const employee = { ...person, job: 'Developer', salary: 50000 };
console.log('Employee:', employee);

// Function calls with spread
const numbers = [1, 5, 3, 9, 2];
console.log('Max number:', Math.max(...numbers));

// Rest in function parameters
function sum(first, ...others) {
    console.log('First:', first);
    console.log('Others:', others);
    return first + others.reduce((acc, num) => acc + num, 0);
}

console.log('Sum result:', sum(1, 2, 3, 4, 5));

// Array methods with spread (immutable operations)
const original = [1, 2, 3];
const withNewItem = [...original, 4]; // Don't mutate original
const withoutFirst = original.slice(1);

console.log('Original:', original);
console.log('With new item:', withNewItem);
console.log('Without first:', withoutFirst);`
    },
    {
      title: 'Template Literals and Tagged Templates',
      description: 'Advanced string interpolation and processing',
      code: `// Basic template literals
const name = 'John';
const age = 30;
const message = \`Hello, my name is \${name} and I'm \${age} years old.\`;
console.log(message);

// Multi-line strings
const multiLine = \`
    This is a multi-line string
    that preserves formatting
    and indentation.
\`;
console.log(multiLine);

// Expression evaluation
const a = 5;
const b = 10;
console.log(\`The sum of \${a} and \${b} is \${a + b}\`);

// Tagged template literals
function highlight(strings, ...values) {
    return strings.reduce((result, string, i) => {
        const value = values[i] ? \`<strong>\${values[i]}</strong>\` : '';
        return result + string + value;
    }, '');
}

const userName = 'Alice';
const score = 95;
const highlighted = highlight\`User \${userName} scored \${score} points!\`;
console.log('Highlighted:', highlighted);

// HTML template function
function html(strings, ...values) {
    return strings.reduce((result, string, i) => {
        const value = values[i] || '';
        // Escape HTML to prevent XSS
        const escaped = String(value)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
        return result + string + escaped;
    }, '');
}

const userInput = '<script>alert("xss")</script>';
const safe = html\`<div>User input: \${userInput}</div>\`;
console.log('Safe HTML:', safe);`
    },
    {
      title: 'Enhanced Object Literals',
      description: 'Concise object creation and dynamic properties',
      code: `// Property shorthand
const name = 'John';
const age = 30;

// Old way
const personOld = {
    name: name,
    age: age
};

// ES6 shorthand
const person = { name, age };
console.log('Person:', person);

// Method shorthand
const calculator = {
    // Old way: add: function(a, b) { return a + b; }
    add(a, b) {
        return a + b;
    },
    
    subtract(a, b) {
        return a - b;
    },
    
    // Arrow function (note: loses 'this' binding)
    multiply: (a, b) => a * b
};

console.log('Calculator add:', calculator.add(5, 3));

// Computed property names
const prefix = 'user';
const id = 123;

const dynamicObject = {
    [prefix + 'Id']: id,
    [prefix + 'Name']: 'John',
    [\`\${prefix}Active\`]: true
};

console.log('Dynamic object:', dynamicObject);

// Getters and setters
const circle = {
    _radius: 0,
    
    get radius() {
        return this._radius;
    },
    
    set radius(value) {
        if (value < 0) {
            throw new Error('Radius cannot be negative');
        }
        this._radius = value;
    },
    
    get area() {
        return Math.PI * this._radius ** 2;
    },
    
    get circumference() {
        return 2 * Math.PI * this._radius;
    }
};

circle.radius = 5;
console.log(\`Circle - Radius: \${circle.radius}, Area: \${circle.area.toFixed(2)}\`);`
    }
  ];

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          ES6+ features that make JavaScript more expressive and powerful. These modern syntax additions 
          help you write cleaner, more readable code.
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

      {/* Browser Compatibility Note */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mt-8">
        <h4 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-4">
          📋 ES6+ Features Summary
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-yellow-700 dark:text-yellow-300">
          <div>
            <h5 className="font-medium mb-2">Destructuring Benefits:</h5>
            <ul className="text-sm space-y-1">
              <li>• Cleaner variable assignments</li>
              <li>• Function parameter simplification</li>
              <li>• Easy value swapping</li>
              <li>• Default value handling</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2">Template Literals Uses:</h5>
            <ul className="text-sm space-y-1">
              <li>• String interpolation</li>
              <li>• Multi-line strings</li>
              <li>• Expression evaluation</li>
              <li>• Tagged templates for processing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};