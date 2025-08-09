import React, { useState, useEffect } from 'react';

export const Guide = ({ navigateTo }) => {
  const [activeModule, setActiveModule] = useState('beginner');
  const [completedLessons, setCompletedLessons] = useState([]);
  const [currentLesson, setCurrentLesson] = useState(null);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('completedLessons');
    if (saved) {
      setCompletedLessons(JSON.parse(saved));
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
  }, [completedLessons]);

  const learningPath = {
    beginner: {
      title: 'Beginner Path',
      icon: '🌱',
      description: 'Start your JavaScript journey from scratch',
      estimatedTime: '2-3 weeks',
      lessons: [
        {
          id: 'intro',
          title: 'What is JavaScript?',
          duration: '15 min',
          content: {
            overview: 'JavaScript is a programming language that powers the web. It runs in your browser and makes websites interactive.',
            keyPoints: [
              'Created in 1995 by Brendan Eich',
              'Most popular programming language in the world',
              'Runs in browsers and servers (Node.js)',
              'Used for web development, mobile apps, and more'
            ],
            example: `// Your first JavaScript code
console.log("Hello, World!");

// Variables
let message = "JavaScript is awesome!";
console.log(message);

// Functions
function greet(name) {
    return "Hello, " + name + "!";
}

console.log(greet("Developer"));`
          }
        },
        {
          id: 'variables',
          title: 'Variables and Data Types',
          duration: '25 min',
          content: {
            overview: 'Learn how to store and manipulate data in JavaScript.',
            keyPoints: [
              'let, const, and var keywords',
              'Primitive data types (string, number, boolean)',
              'Type conversion and checking',
              'Variable naming conventions'
            ],
            example: `// Variable declarations
let age = 25;              // Number
const name = "Alice";      // String (immutable)
let isStudent = true;      // Boolean

// Type checking
console.log(typeof age);    // "number"
console.log(typeof name);   // "string"

// Type conversion
let strNumber = "42";
let number = Number(strNumber);  // Convert to number
let str = String(123);           // Convert to string

// Template literals (ES6)
const message = \`Hello, \${name}! You are \${age} years old.\`;
console.log(message);`
          }
        },
        {
          id: 'control-flow',
          title: 'Control Flow',
          duration: '30 min',
          content: {
            overview: 'Control the flow of your program with conditions and loops.',
            keyPoints: [
              'if/else statements and conditions',
              'Comparison and logical operators',
              'for and while loops',
              'Break and continue statements'
            ],
            example: `// Conditional statements
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

// Loops
console.log("Counting with for loop:");
for (let i = 1; i <= 5; i++) {
    console.log(\`Count: \${i}\`);
}

// Array iteration
const fruits = ['apple', 'banana', 'orange'];
fruits.forEach(fruit => {
    console.log(\`I like \${fruit}\`);
});`
          }
        }
      ]
    },
    intermediate: {
      title: 'Intermediate Path',
      icon: '📚',
      description: 'Level up your JavaScript skills',
      estimatedTime: '3-4 weeks',
      lessons: [
        {
          id: 'functions',
          title: 'Functions Deep Dive',
          duration: '30 min',
          content: {
            overview: 'Master different ways to create and use functions in JavaScript.',
            keyPoints: [
              'Function declarations vs expressions',
              'Arrow functions and their benefits',
              'Parameters, default values, and rest parameters',
              'Scope, closures, and the this keyword'
            ],
            example: `// Different function types
function declaration(name) {
    return \`Hello, \${name}!\`;
}

const expression = function(a, b) {
    return a + b;
};

const arrow = (x, y) => x * y;

// Default parameters
function greet(name = "World") {
    return \`Hello, \${name}!\`;
}

// Rest parameters
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15

// Higher-order function
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

const double = createMultiplier(2);
console.log(double(5)); // 10`
          }
        },
        {
          id: 'arrays-objects',
          title: 'Arrays and Objects',
          duration: '35 min',
          content: {
            overview: 'Work with complex data structures and their methods.',
            keyPoints: [
              'Array methods: map, filter, reduce, find',
              'Object creation and manipulation',
              'Destructuring assignment',
              'Spread and rest operators'
            ],
            example: `// Array methods
const numbers = [1, 2, 3, 4, 5, 6];

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

// Destructuring
const { name, age, hobbies } = person;
const [hobby1, hobby2] = hobbies;

// Spread operator
const updatedPerson = {
    ...person,
    age: 31,
    city: 'New York'
};

console.log(person.greet());
console.log(updatedPerson);`
          }
        },
        {
          id: 'dom-events',
          title: 'DOM and Events',
          duration: '40 min',
          content: {
            overview: 'Learn to manipulate web pages and handle user interactions.',
            keyPoints: [
              'Selecting and modifying DOM elements',
              'Event listeners and event handling',
              'Creating and removing elements',
              'Form handling and validation'
            ],
            example: `// DOM Selection
const button = document.getElementById('myButton');
const output = document.querySelector('.output');

// Event handling
button.addEventListener('click', function(event) {
    output.textContent = 'Button was clicked!';
    output.style.color = 'green';
    
    // Prevent default behavior if needed
    event.preventDefault();
});

// Creating elements
function addItem(text) {
    const li = document.createElement('li');
    li.textContent = text;
    li.addEventListener('click', function() {
        this.remove();
    });
    
    document.getElementById('list').appendChild(li);
}

// Form handling
const form = document.getElementById('myForm');
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    console.log('Form submitted with:', Object.fromEntries(formData));
});`
          }
        }
      ]
    },
    advanced: {
      title: 'Advanced Path',
      icon: '🚀',
      description: 'Master advanced JavaScript concepts',
      estimatedTime: '4-6 weeks',
      lessons: [
        {
          id: 'async',
          title: 'Asynchronous JavaScript',
          duration: '45 min',
          content: {
            overview: 'Learn to handle asynchronous operations with Promises and async/await.',
            keyPoints: [
              'Understanding asynchronous programming',
              'Promises: creation, chaining, and error handling',
              'Async/await syntax and best practices',
              'Handling multiple async operations'
            ],
            example: `// Promise creation
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        // Simulate API call
        setTimeout(() => {
            if (userId > 0) {
                resolve({
                    id: userId,
                    name: 'John Doe',
                    email: 'john@example.com'
                });
            } else {
                reject(new Error('Invalid user ID'));
            }
        }, 1000);
    });
}

// Using async/await
async function getUserInfo(userId) {
    try {
        console.log('Fetching user data...');
        const user = await fetchUserData(userId);
        console.log('User found:', user);
        return user;
    } catch (error) {
        console.error('Error:', error.message);
        return null;
    }
}

// Using the async function
getUserInfo(1).then(user => {
    if (user) {
        console.log(\`Welcome, \${user.name}!\`);
    }
});

// Promise.all for multiple operations
async function getAllData() {
    try {
        const [user1, user2, user3] = await Promise.all([
            fetchUserData(1),
            fetchUserData(2),
            fetchUserData(3)
        ]);
        
        console.log('All users:', [user1, user2, user3]);
    } catch (error) {
        console.error('One or more requests failed:', error);
    }
}`
          }
        },
        {
          id: 'modules',
          title: 'ES6 Modules',
          duration: '30 min',
          content: {
            overview: 'Organize your code with ES6 modules and imports/exports.',
            keyPoints: [
              'Named and default exports',
              'Import syntax variations',
              'Module patterns and best practices',
              'Dynamic imports'
            ],
            example: `// math.js - Named exports
export const PI = 3.14159;

export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

// calculator.js - Default export
export default class Calculator {
    constructor() {
        this.result = 0;
    }
    
    add(num) {
        this.result += num;
        return this;
    }
    
    multiply(num) {
        this.result *= num;
        return this;
    }
    
    getResult() {
        return this.result;
    }
}

// main.js - Importing
import Calculator from './calculator.js';
import { PI, add, multiply } from './math.js';

// Using the imports
const calc = new Calculator();
const result = calc.add(5).multiply(3).getResult();

console.log('Result:', result);
console.log('PI:', PI);
console.log('Add function:', add(2, 3));`
          }
        }
      ]
    }
  };

  const markLessonComplete = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
    }
  };

  const totalLessons = Object.values(learningPath).reduce(
    (sum, path) => sum + path.lessons.length, 0
  );
  const progressPercentage = (completedLessons.length / totalLessons) * 100;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                🧭 JavaScript Learning Path
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Follow our structured curriculum to master JavaScript
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                Overall Progress: {completedLessons.length} / {totalLessons}
              </div>
              <div className="w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Path Selection */}
        <div className="flex space-x-1 mb-6 bg-white dark:bg-gray-800 rounded-lg p-1">
          {Object.entries(learningPath).map(([key, path]) => (
            <button
              key={key}
              className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                activeModule === key
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
              }`}
              onClick={() => setActiveModule(key)}
            >
              <span className="mr-2">{path.icon}</span>
              {path.title}
            </button>
          ))}
        </div>

        {/* Current Path Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Path Overview */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                {learningPath[activeModule].title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {learningPath[activeModule].description}
              </p>
              <div className="mb-4">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ⏱️ Estimated Time: {learningPath[activeModule].estimatedTime}
                </span>
              </div>
              
              <div className="space-y-3">
                {learningPath[activeModule].lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      currentLesson?.id === lesson.id
                        ? 'border-blue-300 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                    onClick={() => setCurrentLesson(lesson)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-white">
                          {lesson.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {lesson.duration}
                        </p>
                      </div>
                      {completedLessons.includes(lesson.id) && (
                        <span className="text-green-500">✅</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-6 space-y-2">
                <button 
                  onClick={() => navigateTo('playground')}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  🎮 Open Playground
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

          {/* Lesson Content */}
          <div className="lg:col-span-2">
            {currentLesson ? (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                      {currentLesson.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      ⏱️ {currentLesson.duration}
                    </p>
                  </div>
                  <button
                    onClick={() => setCurrentLesson(null)}
                    className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                  >
                    ✕
                  </button>
                </div>

                <div className="mb-6">
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {currentLesson.content.overview}
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                    📝 Key Points
                  </h3>
                  <ul className="space-y-2">
                    {currentLesson.content.keyPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">→</span>
                        <span className="text-gray-700 dark:text-gray-300">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                    💻 Example Code
                  </h3>
                  <div className="bg-gray-900 rounded-lg overflow-hidden">
                    <div className="bg-gray-800 px-4 py-2 flex justify-between items-center">
                      <span className="text-gray-400 text-sm">JavaScript</span>
                      <button 
                        onClick={() => navigator.clipboard.writeText(currentLesson.content.example)}
                        className="text-gray-400 hover:text-white text-sm"
                      >
                        📋 Copy
                      </button>
                    </div>
                    <pre className="p-4 text-gray-300 overflow-x-auto">
                      <code>{currentLesson.content.example}</code>
                    </pre>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    onClick={() => markLessonComplete(currentLesson.id)}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                      completedLessons.includes(currentLesson.id)
                        ? 'bg-green-500 text-white'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    }`}
                  >
                    {completedLessons.includes(currentLesson.id) ? '✅ Completed' : '📚 Mark as Complete'}
                  </button>
                  
                  <button 
                    onClick={() => navigateTo('playground')}
                    className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    🎮 Try in Playground
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">📖</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                  Select a Lesson
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Choose a lesson from the sidebar to start learning
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Progress Summary */}
        <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
            📊 Your Learning Progress
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(learningPath).map(([key, path]) => {
              const pathCompleted = path.lessons.filter(lesson => 
                completedLessons.includes(lesson.id)
              ).length;
              const pathTotal = path.lessons.length;
              const pathProgress = (pathCompleted / pathTotal) * 100;
              
              return (
                <div key={key} className="text-center">
                  <div className="text-3xl mb-2">{path.icon}</div>
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                    {path.title}
                  </h4>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${pathProgress}%` }}
                    />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {pathCompleted} / {pathTotal} lessons
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Completion Certificate */}
        {progressPercentage === 100 && (
          <div className="mt-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-lg p-8 text-center text-white">
            <div className="text-4xl mb-4">🏆</div>
            <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
            <p className="text-lg mb-4">You've completed the JavaScript Learning Path!</p>
            <p className="text-sm opacity-90 mb-6">
              You've mastered {totalLessons} lessons across all difficulty levels
            </p>
            <div className="flex justify-center gap-4">
              <button className="px-6 py-3 bg-white text-orange-500 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                📜 Download Certificate
              </button>
              <button 
                onClick={() => navigateTo('challenges')}
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-semibold"
              >
                🏆 Try Advanced Challenges
              </button>
            </div>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
            🔗 Continue Learning
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button 
              onClick={() => navigateTo('documentation')}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-all text-center"
            >
              <div className="text-2xl mb-2">📚</div>
              <h4 className="font-semibold text-gray-800 dark:text-white">Documentation</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Reference & Examples</p>
            </button>
            
            <button 
              onClick={() => navigateTo('playground')}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-all text-center"
            >
              <div className="text-2xl mb-2">🎮</div>
              <h4 className="font-semibold text-gray-800 dark:text-white">Playground</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Practice Coding</p>
            </button>
            
            <button 
              onClick={() => navigateTo('challenges')}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-all text-center"
            >
              <div className="text-2xl mb-2">🏆</div>
              <h4 className="font-semibold text-gray-800 dark:text-white">Challenges</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Test Your Skills</p>
            </button>
            
            <a 
              href="#" 
              className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-all text-center"
            >
              <div className="text-2xl mb-2">👥</div>
              <h4 className="font-semibold text-gray-800 dark:text-white">Community</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">Join Discussions</p>
            </a>
          </div>
        </div>

        {/* Learning Tips */}
        <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">
            💡 Learning Tips
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700 dark:text-blue-300">
            <div>
              <h4 className="font-medium mb-2">📖 Study Effectively</h4>
              <ul className="space-y-1">
                <li>• Complete lessons in order</li>
                <li>• Practice code examples</li>
                <li>• Take notes on key concepts</li>
                <li>• Review previous lessons regularly</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">🎯 Stay Motivated</h4>
              <ul className="space-y-1">
                <li>• Set daily learning goals</li>
                <li>• Celebrate small wins</li>
                <li>• Build real projects</li>
                <li>• Join the community</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};