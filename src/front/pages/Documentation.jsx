// src/front/pages/Documentation.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CodeEditor from '../components/CodeEditor';

export const Documentation = () => {
    const [activeSection, setActiveSection] = useState('basics');
    const [runOutput, setRunOutput] = useState('');

    const sections = {
        basics: {
            title: 'JavaScript Basics',
            icon: 'bi-star',
            content: [
                {
                    title: 'Variables and Constants',
                    description: 'Learn how to declare and use variables in JavaScript',
                    code: `// Variables can be declared using let, const, or var
let name = "John";        // Can be reassigned
const age = 30;          // Cannot be reassigned  
var city = "New York";   // Old way, avoid using

// Data types
let number = 42;
let text = "Hello";
let isActive = true;
let nothing = null;
let notDefined = undefined;

console.log(typeof number);  // "number"
console.log(typeof text);    // "string"
console.log(typeof isActive); // "boolean"`,
                    example: true
                },
                {
                    title: 'Operators',
                    description: 'Mathematical and logical operators',
                    code: `// Arithmetic operators
let sum = 10 + 5;       // 15
let difference = 10 - 5; // 5
let product = 10 * 5;    // 50
let quotient = 10 / 5;   // 2
let remainder = 10 % 3;  // 1

// Comparison operators
console.log(5 == "5");   // true (loose equality)
console.log(5 === "5");  // false (strict equality)
console.log(5 != "5");   // false
console.log(5 !== "5");  // true

// Logical operators
let x = true;
let y = false;
console.log(x && y);     // false (AND)
console.log(x || y);     // true (OR)
console.log(!x);         // false (NOT)`,
                    example: true
                }
            ]
        },
        arrays: {
            title: 'Arrays & Array Methods',
            icon: 'bi-list-ol',
            content: [
                {
                    title: 'Creating and Accessing Arrays',
                    description: 'Working with arrays in JavaScript',
                    code: `// Creating arrays
const fruits = ['apple', 'banana', 'orange'];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, 'hello', true, null];

// Accessing elements
console.log(fruits[0]);           // 'apple'
console.log(fruits[fruits.length - 1]); // 'orange'

// Modifying arrays
fruits[1] = 'grape';
fruits.push('mango');              // Add to end
fruits.unshift('strawberry');      // Add to beginning
fruits.pop();                      // Remove from end
fruits.shift();                    // Remove from beginning`,
                    example: true
                },
                {
                    title: 'Array Methods',
                    description: 'Powerful array transformation methods',
                    code: `const numbers = [1, 2, 3, 4, 5];

// Map - transform each element
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]

// Filter - keep elements that pass test
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4]

// Reduce - combine all elements
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 15

// Find - get first match
const found = numbers.find(n => n > 3);
console.log(found); // 4

// Some/Every - test conditions
console.log(numbers.some(n => n > 3));  // true
console.log(numbers.every(n => n > 0)); // true`,
                    example: true
                }
            ]
        },
        functions: {
            title: 'Functions',
            icon: 'bi-braces',
            content: [
                {
                    title: 'Function Declaration & Expression',
                    description: 'Different ways to create functions',
                    code: `// Function declaration
function greet(name) {
    return 'Hello, ' + name + '!';
}

// Function expression
const add = function(a, b) {
    return a + b;
};

// Arrow function
const multiply = (a, b) => a * b;

// Arrow function with body
const divide = (a, b) => {
    if (b === 0) throw new Error('Cannot divide by zero');
    return a / b;
};

// Default parameters
function power(base, exponent = 2) {
    return Math.pow(base, exponent);
}

console.log(greet('Alice'));     // "Hello, Alice!"
console.log(add(5, 3));          // 8
console.log(multiply(4, 7));     // 28
console.log(power(3));           // 9`,
                    example: true
                }
            ]
        },
        objects: {
            title: 'Objects',
            icon: 'bi-box',
            content: [
                {
                    title: 'Object Basics',
                    description: 'Creating and manipulating objects',
                    code: `// Object literal
const person = {
    name: 'John Doe',
    age: 30,
    email: 'john@example.com',
    greet: function() {
        return \`Hello, I'm \${this.name}\`;
    }
};

// Accessing properties
console.log(person.name);        // Dot notation
console.log(person['age']);      // Bracket notation

// Adding/modifying properties
person.phone = '123-456-7890';
person.age = 31;

// Object destructuring
const { name, email } = person;
console.log(name, email);

// Spread operator
const updatedPerson = { ...person, city: 'New York' };

console.log(person.greet());`,
                    example: true
                }
            ]
        },
        dom: {
            title: 'DOM Manipulation',
            icon: 'bi-window',
            content: [
                {
                    title: 'Selecting & Modifying Elements',
                    description: 'Interacting with HTML elements',
                    code: `// Selecting elements
const element = document.getElementById('myId');
const elements = document.getElementsByClassName('myClass');
const firstDiv = document.querySelector('div');
const allDivs = document.querySelectorAll('div');

// Modifying content
element.textContent = 'New text';
element.innerHTML = '<strong>Bold text</strong>';

// Modifying styles
element.style.color = 'red';
element.style.backgroundColor = '#f0f0f0';
element.classList.add('active');
element.classList.remove('inactive');
element.classList.toggle('visible');

// Creating elements
const newDiv = document.createElement('div');
newDiv.textContent = 'New element';
document.body.appendChild(newDiv);

// Event listeners
element.addEventListener('click', function(e) {
    console.log('Clicked!', e.target);
});`,
                    example: false
                }
            ]
        },
        async: {
            title: 'Async Programming',
            icon: 'bi-arrow-repeat',
            content: [
                {
                    title: 'Promises & Async/Await',
                    description: 'Handling asynchronous operations',
                    code: `// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('Success!');
    }, 1000);
});

// Using Promises
myPromise
    .then(result => console.log(result))
    .catch(error => console.error(error));

// Async/Await
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// Using async function
async function main() {
    const data = await fetchData();
    console.log(data);
}

main();`,
                    example: true
                }
            ]
        }
    };

    const runCode = (code) => {
        try {
            // Create a safe environment for code execution
            const logs = [];
            const originalLog = console.log;
            
            // Override console.log to capture output
            console.log = (...args) => {
                logs.push(args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                ).join(' '));
            };

            // Execute the code
            eval(code);

            // Restore original console.log
            console.log = originalLog;

            // Set output
            setRunOutput(logs.join('\n') || 'Code executed successfully (no output)');
        } catch (error) {
            setRunOutput(`Error: ${error.message}`);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-matcha-50 to-wood-50 dark:from-gray-900 dark:to-gray-800 pt-20">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="glass rounded-xl p-4 sticky top-24">
                            <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
                                Topics
                            </h5>
                            <nav className="space-y-2">
                                {Object.entries(sections).map(([key, section]) => (
                                    <button
                                        key={key}
                                        className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                                            activeSection === key 
                                                ? 'bg-gradient-to-r from-matcha-400 to-matcha-500 text-white' 
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-matcha-100 dark:hover:bg-matcha-900/20'
                                        }`}
                                        onClick={() => setActiveSection(key)}
                                    >
                                        <i className={`${section.icon} mr-2`}></i>
                                        {section.title}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        {/* Quick Actions */}
                        <div className="mt-6 glass rounded-xl p-4">
                            <h6 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">
                                Quick Actions
                            </h6>
                            <div className="space-y-2">
                                <Link 
                                    to="/playground" 
                                    className="block w-full text-center py-2 px-4 bg-matcha-500 text-white rounded-lg hover:bg-matcha-600 transition-colors"
                                >
                                    Open Playground
                                </Link>
                                <Link 
                                    to="/challenges" 
                                    className="block w-full text-center py-2 px-4 bg-wood-500 text-white rounded-lg hover:bg-wood-600 transition-colors"
                                >
                                    Try Challenges
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-3">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                            <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                                {sections[activeSection].title}
                            </h2>

                            {sections[activeSection].content.map((item, index) => (
                                <div key={index} className="mb-8">
                                    <h4 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                                        {item.title}
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                                        {item.description}
                                    </p>
                                    
                                    <div className="bg-gray-900 rounded-lg overflow-hidden">
                                        <div className="flex justify-between items-center px-4 py-2 bg-gray-800">
                                            <span className="text-gray-400 text-sm">JavaScript</span>
                                            <div className="space-x-2">
                                                {item.example && (
                                                    <button 
                                                        className="px-3 py-1 bg-matcha-500 text-white text-sm rounded hover:bg-matcha-600 transition-colors"
                                                        onClick={() => runCode(item.code)}
                                                    >
                                                        Run
                                                    </button>
                                                )}
                                                <button 
                                                    className="px-3 py-1 bg-gray-700 text-white text-sm rounded hover:bg-gray-600 transition-colors"
                                                    onClick={() => navigator.clipboard.writeText(item.code)}
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <pre className="p-4 text-gray-300 overflow-x-auto">
                                            <code>{item.code}</code>
                                        </pre>

                                        {runOutput && item.example && (
                                            <div className="border-t border-gray-700 p-4">
                                                <h6 className="text-sm text-gray-400 mb-2">Output:</h6>
                                                <pre className="text-green-400">{runOutput}</pre>
                                            </div>
                                        )}
                                    </div>

                                    {index === 0 && (
                                        <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
                                            <p className="text-sm text-blue-800 dark:text-blue-300">
                                                <strong>Pro Tip:</strong> Click the "Run" button to execute the code and see the output!
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}

                            {/* Next Steps */}
                            <div className="mt-8 p-6 bg-gradient-to-r from-matcha-100 to-wood-100 dark:from-matcha-900/20 dark:to-wood-900/20 rounded-xl">
                                <h5 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                                    Ready to Practice?
                                </h5>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Now that you've learned the basics, try these:
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <Link 
                                        to="/playground" 
                                        className="px-4 py-2 bg-matcha-500 text-white rounded-lg hover:bg-matcha-600 transition-colors"
                                    >
                                        Try in Playground
                                    </Link>
                                    <Link 
                                        to="/challenges" 
                                        className="px-4 py-2 bg-wood-500 text-white rounded-lg hover:bg-wood-600 transition-colors"
                                    >
                                        Solve Challenges
                                    </Link>
                                    <Link 
                                        to="/guide" 
                                        className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                    >
                                        Complete Guide
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};