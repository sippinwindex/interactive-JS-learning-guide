import React, { useState } from 'react';

export const Documentation = ({ navigateTo }) => {
  const [activeSection, setActiveSection] = useState('basics');
  const [runOutput, setRunOutput] = useState('');

  const sections = {
    basics: {
      title: 'JavaScript Basics',
      icon: '⭐',
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
        },
        {
          title: 'Functions',
          description: 'Different ways to create and use functions',
          code: `// Function declaration
function greet(name) {
    return 'Hello, ' + name + '!';
}

// Arrow function
const add = (a, b) => a + b;

// Function with default parameters
function power(base, exponent = 2) {
    return Math.pow(base, exponent);
}

console.log(greet('Alice'));     // "Hello, Alice!"
console.log(add(5, 3));          // 8
console.log(power(3));           // 9`,
        }
      ]
    },
    arrays: {
      title: 'Arrays & Methods',
      icon: '📋',
      content: [
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
console.log(sum); // 15`,
        },
        {
          title: 'Array Creation and Access',
          description: 'Creating and accessing array elements',
          code: `// Creating arrays
const fruits = ['apple', 'banana', 'orange'];
const numbers = [1, 2, 3, 4, 5];
const mixed = [1, 'hello', true, null];

// Accessing elements
console.log(fruits[0]);           // 'apple'
console.log(fruits[fruits.length - 1]); // 'orange'

// Modifying arrays
fruits.push('mango');              // Add to end
fruits.unshift('strawberry');      // Add to beginning
fruits.pop();                      // Remove from end
fruits.shift();                    // Remove from beginning

console.log(fruits);`,
        }
      ]
    },
    objects: {
      title: 'Objects',
      icon: '📦',
      content: [
        {
          title: 'Object Basics',
          description: 'Creating and manipulating objects',
          code: `// Object literal
const person = {
    name: 'John Doe',
    age: 30,
    greet() {
        return \`Hello, I'm \${this.name}\`;
    }
};

// Destructuring
const { name, age } = person;

// Spread operator
const updatedPerson = { ...person, city: 'New York' };

console.log(person.greet());
console.log('Name:', name, 'Age:', age);
console.log('Updated:', updatedPerson);`,
        }
      ]
    },
    dom: {
      title: 'DOM Manipulation',
      icon: '🌐',
      content: [
        {
          title: 'DOM Basics',
          description: 'Interacting with HTML elements',
          code: `// Selecting elements
const element = document.getElementById('myId');
const elements = document.getElementsByClassName('myClass');
const first = document.querySelector('.class');
const all = document.querySelectorAll('div');

// Modifying content
element.textContent = 'New text';
element.innerHTML = '<strong>Bold text</strong>';

// Modifying styles
element.style.color = 'blue';
element.style.backgroundColor = '#f0f0f0';
element.classList.add('active');

// Event listeners
element.addEventListener('click', function(e) {
    console.log('Clicked!', e.target);
});

console.log('DOM manipulation examples ready!');`,
        }
      ]
    },
    async: {
      title: 'Async Programming',
      icon: '⚡',
      content: [
        {
          title: 'Promises & Async/Await',
          description: 'Handling asynchronous operations',
          code: `// Promise example
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve("Data fetched successfully!");
        }, 1000);
    });
}

// Using async/await
async function getData() {
    try {
        console.log('Fetching data...');
        const data = await fetchData();
        console.log(data);
    } catch (error) {
        console.error("Error:", error);
    }
}

getData();

// Promise chaining
fetchData()
    .then(data => {
        console.log('Promise result:', data);
        return 'Next step';
    })
    .then(nextData => console.log(nextData))
    .catch(error => console.error(error));`,
        }
      ]
    }
  };

  const runCode = (code) => {
    try {
      const logs = [];
      const originalLog = console.log;
      
      console.log = (...args) => {
        logs.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '));
      };

      eval(code);
      console.log = originalLog;
      setRunOutput(logs.join('\n') || 'Code executed successfully');
    } catch (error) {
      setRunOutput(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 sticky top-24">
              <h5 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider mb-4">
                Topics
              </h5>
              <nav className="space-y-2">
                {Object.entries(sections).map(([key, section]) => (
                  <button
                    key={key}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                      activeSection === key 
                        ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveSection(key)}
                  >
                    <span className="mr-2">{section.icon}</span>
                    {section.title}
                  </button>
                ))}
              </nav>
              
              <div className="mt-6 space-y-2">
                <button 
                  onClick={() => navigateTo('playground')}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  🎮 Try Playground
                </button>
                <button 
                  onClick={() => navigateTo('challenges')}
                  className="w-full px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  🏆 Try Challenges
                </button>
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
                        <button 
                          className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
                          onClick={() => runCode(item.code)}
                        >
                          ▶ Run
                        </button>
                        <button 
                          className="px-3 py-1 bg-gray-700 text-white text-sm rounded hover:bg-gray-600 transition-colors"
                          onClick={() => navigator.clipboard.writeText(item.code)}
                        >
                          📋 Copy
                        </button>
                      </div>
                    </div>
                    
                    <pre className="p-4 text-gray-300 overflow-x-auto text-sm">
                      <code>{item.code}</code>
                    </pre>

                    {runOutput && (
                      <div className="border-t border-gray-700 p-4">
                        <h6 className="text-sm text-gray-400 mb-2">Output:</h6>
                        <pre className="text-green-400 text-sm">{runOutput}</pre>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Next Steps */}
              <div className="mt-8 p-6 bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl">
                <h5 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
                  Ready to Practice?
                </h5>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Now that you've learned the basics, try these:
                </p>
                <div className="flex flex-wrap gap-3">
                  <button 
                    onClick={() => navigateTo('playground')}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Try in Playground
                  </button>
                  <button 
                    onClick={() => navigateTo('challenges')}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Solve Challenges
                  </button>
                  <button 
                    onClick={() => navigateTo('guide')}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    Complete Guide
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};