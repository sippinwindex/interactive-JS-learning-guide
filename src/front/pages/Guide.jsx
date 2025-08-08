// src/front/pages/Guide.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';

export const Guide = () => {
    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const [activeModule, setActiveModule] = useState('beginner');
    const [completedLessons, setCompletedLessons] = useState([]);
    const [currentLesson, setCurrentLesson] = useState(null);
    const [expandedModules, setExpandedModules] = useState(['beginner']);
    const [userNotes, setUserNotes] = useState({});
    const [showCertificate, setShowCertificate] = useState(false);

    // Learning Path Structure
    const learningPath = {
        beginner: {
            title: 'Beginner Path',
            icon: 'bi-star',
            color: 'success',
            description: 'Start your JavaScript journey from scratch',
            estimatedTime: '2-3 weeks',
            modules: [
                {
                    id: 'intro',
                    title: 'Introduction to Programming',
                    lessons: [
                        {
                            id: 'what-is-js',
                            title: 'What is JavaScript?',
                            duration: '15 min',
                            type: 'reading',
                            content: {
                                overview: 'JavaScript is a programming language that powers the web. It runs in your browser and makes websites interactive.',
                                keyPoints: [
                                    'Created in 1995 by Brendan Eich',
                                    'Originally called LiveScript',
                                    'Not related to Java despite the name',
                                    'Most popular programming language in the world'
                                ],
                                example: `// Your first JavaScript code
console.log("Hello, World!");
alert("Welcome to JavaScript!");

// JavaScript can manipulate web pages
document.body.style.backgroundColor = "lightblue";`,
                                quiz: [
                                    {
                                        question: 'When was JavaScript created?',
                                        options: ['1990', '1995', '2000', '2005'],
                                        correct: 1
                                    },
                                    {
                                        question: 'JavaScript runs primarily in...',
                                        options: ['Database', 'Browser', 'Server only', 'Mobile only'],
                                        correct: 1
                                    }
                                ],
                                resources: [
                                    { title: 'MDN JavaScript Guide', url: '#' },
                                    { title: 'JavaScript History', url: '#' }
                                ]
                            }
                        },
                        {
                            id: 'setup',
                            title: 'Setting Up Your Environment',
                            duration: '20 min',
                            type: 'tutorial',
                            content: {
                                overview: 'Learn how to set up your development environment for JavaScript programming.',
                                keyPoints: [
                                    'Choose a text editor (VS Code recommended)',
                                    'Use browser developer tools',
                                    'Set up a local development server',
                                    'Organize your project files'
                                ],
                                example: `// Create an index.html file
<!DOCTYPE html>
<html>
<head>
    <title>My First JS App</title>
</head>
<body>
    <h1>Hello JavaScript!</h1>
    <script src="script.js"></script>
</body>
</html>

// Create a script.js file
console.log("JavaScript is running!");`,
                                tasks: [
                                    'Install VS Code',
                                    'Create your first HTML file',
                                    'Link a JavaScript file',
                                    'Open browser console'
                                ]
                            }
                        },
                        {
                            id: 'first-program',
                            title: 'Your First Program',
                            duration: '30 min',
                            type: 'hands-on',
                            content: {
                                overview: 'Write your first interactive JavaScript program.',
                                project: 'Build a simple greeting program',
                                starter: `// Get user's name
const userName = prompt("What's your name?");

// Create a greeting
const greeting = "Hello, " + userName + "!";

// Display the greeting
alert(greeting);
console.log(greeting);

// CHALLENGE: Add the current time to the greeting`,
                                challengeLink: '/playground'
                            }
                        }
                    ]
                },
                {
                    id: 'basics',
                    title: 'JavaScript Basics',
                    lessons: [
                        {
                            id: 'variables',
                            title: 'Variables and Data Types',
                            duration: '25 min',
                            type: 'reading',
                            content: {
                                overview: 'Learn how to store and manipulate data in JavaScript.',
                                keyPoints: [
                                    'let, const, and var keywords',
                                    'Primitive data types',
                                    'Type conversion',
                                    'Variable naming rules'
                                ],
                                example: `// Declaring variables
let age = 25;              // Number
const name = "Alice";      // String
let isStudent = true;      // Boolean
let empty = null;          // Null
let notDefined;            // Undefined

// Type conversion
let strNumber = "42";
let number = Number(strNumber);  // Convert to number
let str = String(123);           // Convert to string

// Template literals
const message = \`Hello, \${name}! You are \${age} years old.\`;`,
                                practice: {
                                    title: 'Variable Practice',
                                    task: 'Create variables for a user profile',
                                    link: '/challenges'
                                }
                            }
                        },
                        {
                            id: 'operators',
                            title: 'Operators and Expressions',
                            duration: '20 min',
                            type: 'reading',
                            content: {
                                overview: 'Master JavaScript operators for calculations and comparisons.',
                                keyPoints: [
                                    'Arithmetic operators (+, -, *, /, %)',
                                    'Comparison operators (==, ===, !=, !==)',
                                    'Logical operators (&&, ||, !)',
                                    'Assignment operators (=, +=, -=)'
                                ],
                                example: `// Arithmetic
let sum = 10 + 5;         // 15
let product = 4 * 3;      // 12
let remainder = 10 % 3;   // 1

// Comparison
console.log(5 == "5");    // true (loose equality)
console.log(5 === "5");   // false (strict equality)

// Logical
let canVote = age >= 18 && isCitizen;
let hasAccess = isAdmin || isOwner;

// Ternary operator
let status = age >= 18 ? "Adult" : "Minor";`
                            }
                        },
                        {
                            id: 'control-flow',
                            title: 'Control Flow',
                            duration: '35 min',
                            type: 'tutorial',
                            content: {
                                overview: 'Control the flow of your program with conditions and loops.',
                                keyPoints: [
                                    'if/else statements',
                                    'switch statements',
                                    'for loops',
                                    'while loops'
                                ],
                                example: `// If/else statement
if (score >= 90) {
    grade = 'A';
} else if (score >= 80) {
    grade = 'B';
} else {
    grade = 'C';
}

// Switch statement
switch (day) {
    case 'Monday':
        console.log('Start of the week');
        break;
    case 'Friday':
        console.log('TGIF!');
        break;
    default:
        console.log('Regular day');
}

// For loop
for (let i = 0; i < 5; i++) {
    console.log(\`Count: \${i}\`);
}

// While loop
let count = 0;
while (count < 3) {
    console.log(\`While: \${count}\`);
    count++;
}`
                            }
                        }
                    ]
                }
            ]
        },
        intermediate: {
            title: 'Intermediate Path',
            icon: 'bi-graph-up',
            color: 'primary',
            description: 'Level up your JavaScript skills',
            estimatedTime: '3-4 weeks',
            modules: [
                {
                    id: 'functions-deep',
                    title: 'Functions in Depth',
                    lessons: [
                        {
                            id: 'function-basics',
                            title: 'Function Fundamentals',
                            duration: '30 min',
                            type: 'reading',
                            content: {
                                overview: 'Master different ways to create and use functions.',
                                keyPoints: [
                                    'Function declarations vs expressions',
                                    'Arrow functions',
                                    'Parameters and arguments',
                                    'Return values'
                                ],
                                example: `// Function declaration
function greet(name) {
    return \`Hello, \${name}!\`;
}

// Function expression
const add = function(a, b) {
    return a + b;
};

// Arrow function
const multiply = (a, b) => a * b;

// Arrow with body
const divide = (a, b) => {
    if (b === 0) throw new Error("Cannot divide by zero");
    return a / b;
};

// Default parameters
function power(base, exponent = 2) {
    return Math.pow(base, exponent);
}

// Rest parameters
function sum(...numbers) {
    return numbers.reduce((total, n) => total + n, 0);
}`
                            }
                        },
                        {
                            id: 'scope-closure',
                            title: 'Scope and Closures',
                            duration: '40 min',
                            type: 'tutorial',
                            content: {
                                overview: 'Understand scope, closures, and the execution context.',
                                keyPoints: [
                                    'Global vs local scope',
                                    'Block scope',
                                    'Lexical scope',
                                    'Closures'
                                ],
                                example: `// Scope example
let globalVar = "I'm global";

function outerFunction() {
    let outerVar = "I'm in outer";
    
    function innerFunction() {
        let innerVar = "I'm in inner";
        console.log(globalVar);  // Accessible
        console.log(outerVar);   // Accessible
        console.log(innerVar);   // Accessible
    }
    
    innerFunction();
    // console.log(innerVar);  // Error: not accessible
}

// Closure example
function createCounter() {
    let count = 0;
    
    return function() {
        count++;
        return count;
    };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2`
                            }
                        }
                    ]
                },
                {
                    id: 'arrays-objects',
                    title: 'Arrays and Objects',
                    lessons: [
                        {
                            id: 'array-methods',
                            title: 'Array Methods Mastery',
                            duration: '45 min',
                            type: 'hands-on',
                            content: {
                                overview: 'Master array manipulation with built-in methods.',
                                keyPoints: [
                                    'map, filter, reduce',
                                    'find, findIndex',
                                    'some, every',
                                    'sort, reverse'
                                ],
                                example: `const users = [
    { id: 1, name: 'Alice', age: 28, active: true },
    { id: 2, name: 'Bob', age: 32, active: false },
    { id: 3, name: 'Charlie', age: 25, active: true }
];

// Map - transform each element
const names = users.map(user => user.name);

// Filter - keep matching elements
const activeUsers = users.filter(user => user.active);

// Reduce - combine into single value
const totalAge = users.reduce((sum, user) => sum + user.age, 0);

// Find - get first match
const user = users.find(u => u.id === 2);

// Some/Every - test conditions
const hasYoungUsers = users.some(u => u.age < 30);
const allActive = users.every(u => u.active);

// Chaining methods
const result = users
    .filter(u => u.active)
    .map(u => u.name)
    .sort();`
                            }
                        },
                        {
                            id: 'object-methods',
                            title: 'Working with Objects',
                            duration: '35 min',
                            type: 'tutorial',
                            content: {
                                overview: 'Advanced object manipulation techniques.',
                                keyPoints: [
                                    'Object methods',
                                    'Destructuring',
                                    'Spread operator',
                                    'Object.keys/values/entries'
                                ],
                                example: `// Object destructuring
const { name, age, city = 'Unknown' } = user;

// Nested destructuring
const { address: { street, zip } } = user;

// Spread operator
const updatedUser = { ...user, age: 30, status: 'active' };

// Object methods
const keys = Object.keys(user);
const values = Object.values(user);
const entries = Object.entries(user);

// Dynamic property names
const prop = 'score';
const obj = {
    [prop]: 100,
    [\`max\${prop.charAt(0).toUpperCase()}\${prop.slice(1)}\`]: 150
};

// Object.assign
const merged = Object.assign({}, obj1, obj2);

// Property shorthand
const x = 10, y = 20;
const point = { x, y };  // Same as { x: x, y: y }`
                            }
                        }
                    ]
                },
                {
                    id: 'dom',
                    title: 'DOM Manipulation',
                    lessons: [
                        {
                            id: 'dom-basics',
                            title: 'DOM Fundamentals',
                            duration: '40 min',
                            type: 'tutorial',
                            content: {
                                overview: 'Learn to manipulate web pages with JavaScript.',
                                keyPoints: [
                                    'Selecting elements',
                                    'Modifying content and styles',
                                    'Creating elements',
                                    'Event handling'
                                ],
                                example: `// Selecting elements
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
element.classList.remove('inactive');
element.classList.toggle('visible');

// Creating elements
const newDiv = document.createElement('div');
newDiv.textContent = 'Dynamic content';
newDiv.className = 'card';
document.body.appendChild(newDiv);

// Event listeners
element.addEventListener('click', function(e) {
    console.log('Clicked!', e.target);
});

// Event delegation
document.body.addEventListener('click', function(e) {
    if (e.target.matches('.button')) {
        console.log('Button clicked');
    }
});`
                            }
                        }
                    ]
                }
            ]
        },
        advanced: {
            title: 'Advanced Path',
            icon: 'bi-rocket',
            color: 'danger',
            description: 'Master advanced JavaScript concepts',
            estimatedTime: '4-6 weeks',
            modules: [
                {
                    id: 'async',
                    title: 'Asynchronous JavaScript',
                    lessons: [
                        {
                            id: 'promises',
                            title: 'Promises',
                            duration: '45 min',
                            type: 'tutorial',
                            content: {
                                overview: 'Master asynchronous programming with Promises.',
                                keyPoints: [
                                    'Creating Promises',
                                    'Promise chaining',
                                    'Error handling',
                                    'Promise.all, Promise.race'
                                ],
                                example: `// Creating a Promise
const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        const success = Math.random() > 0.5;
        if (success) {
            resolve('Operation successful!');
        } else {
            reject('Operation failed!');
        }
    }, 1000);
});

// Using Promises
myPromise
    .then(result => {
        console.log(result);
        return 'Next step';
    })
    .then(nextResult => console.log(nextResult))
    .catch(error => console.error(error))
    .finally(() => console.log('Cleanup'));

// Promise.all - wait for all
const promises = [
    fetch('/api/user'),
    fetch('/api/posts'),
    fetch('/api/comments')
];

Promise.all(promises)
    .then(responses => console.log('All loaded'))
    .catch(error => console.error('One failed'));

// Promise.race - first to settle
Promise.race(promises)
    .then(first => console.log('First response'));`
                            }
                        },
                        {
                            id: 'async-await',
                            title: 'Async/Await',
                            duration: '40 min',
                            type: 'tutorial',
                            content: {
                                overview: 'Modern asynchronous programming with async/await.',
                                keyPoints: [
                                    'Async functions',
                                    'Await keyword',
                                    'Error handling with try/catch',
                                    'Parallel execution'
                                ],
                                example: `// Async function
async function fetchUser(id) {
    try {
        const response = await fetch(\`/api/users/\${id}\`);
        if (!response.ok) {
            throw new Error('User not found');
        }
        const user = await response.json();
        return user;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Using async function
async function main() {
    try {
        const user = await fetchUser(123);
        console.log(user);
    } catch (error) {
        console.error('Failed to fetch user');
    }
}

// Parallel execution
async function fetchAll() {
    const [users, posts] = await Promise.all([
        fetch('/api/users').then(r => r.json()),
        fetch('/api/posts').then(r => r.json())
    ]);
    
    return { users, posts };
}

// Sequential vs Parallel
async function sequential() {
    const a = await fetch('/api/a');  // Wait
    const b = await fetch('/api/b');  // Then wait
}

async function parallel() {
    const [a, b] = await Promise.all([
        fetch('/api/a'),
        fetch('/api/b')
    ]);  // Both at once
}`
                            }
                        }
                    ]
                },
                {
                    id: 'es6-features',
                    title: 'Modern JavaScript (ES6+)',
                    lessons: [
                        {
                            id: 'modules',
                            title: 'Modules',
                            duration: '35 min',
                            type: 'reading',
                            content: {
                                overview: 'Organize code with ES6 modules.',
                                keyPoints: [
                                    'Import and export',
                                    'Named vs default exports',
                                    'Module patterns',
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

// main.js - Named imports
import { PI, add, multiply } from './math.js';

// utils.js - Default export
export default class Calculator {
    add(a, b) { return a + b; }
    subtract(a, b) { return a - b; }
}

// main.js - Default import
import Calculator from './utils.js';
const calc = new Calculator();

// Mixed exports
export default function main() { }
export const helper = () => { };

// Mixed imports
import mainFunc, { helper } from './module.js';

// Dynamic import
async function loadModule() {
    const module = await import('./heavy-module.js');
    module.doSomething();
}`
                            }
                        },
                        {
                            id: 'classes',
                            title: 'Classes and OOP',
                            duration: '50 min',
                            type: 'tutorial',
                            content: {
                                overview: 'Object-oriented programming with ES6 classes.',
                                keyPoints: [
                                    'Class syntax',
                                    'Constructor and methods',
                                    'Inheritance',
                                    'Static methods'
                                ],
                                example: `// Class definition
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    // Method
    greet() {
        return \`Hello, I'm \${this.name}\`;
    }
    
    // Getter
    get info() {
        return \`\${this.name} is \${this.age} years old\`;
    }
    
    // Setter
    set info(value) {
        [this.name, this.age] = value.split(',');
    }
    
    // Static method
    static species() {
        return 'Homo sapiens';
    }
}

// Inheritance
class Student extends Person {
    constructor(name, age, grade) {
        super(name, age);  // Call parent constructor
        this.grade = grade;
    }
    
    // Override method
    greet() {
        return \`\${super.greet()}, I'm in grade \${this.grade}\`;
    }
    
    study() {
        return \`\${this.name} is studying\`;
    }
}

// Usage
const student = new Student('Alice', 20, 'A');
console.log(student.greet());
console.log(Student.species());`
                            }
                        }
                    ]
                }
            ]
        },
        projects: {
            title: 'Project-Based Path',
            icon: 'bi-hammer',
            color: 'warning',
            description: 'Learn by building real projects',
            estimatedTime: '6-8 weeks',
            modules: [
                {
                    id: 'mini-projects',
                    title: 'Mini Projects',
                    lessons: [
                        {
                            id: 'todo-app',
                            title: 'Todo List App',
                            duration: '2 hours',
                            type: 'project',
                            content: {
                                overview: 'Build a fully functional todo list application.',
                                features: [
                                    'Add/remove tasks',
                                    'Mark as complete',
                                    'Filter tasks',
                                    'Local storage'
                                ],
                                starter: '/playground',
                                requirements: [
                                    'Use DOM manipulation',
                                    'Handle events',
                                    'Store data in localStorage',
                                    'Responsive design'
                                ]
                            }
                        },
                        {
                            id: 'calculator',
                            title: 'Calculator',
                            duration: '1.5 hours',
                            type: 'project',
                            content: {
                                overview: 'Create a functional calculator.',
                                features: [
                                    'Basic operations',
                                    'Clear/reset',
                                    'Decimal support',
                                    'Keyboard support'
                                ]
                            }
                        },
                        {
                            id: 'weather-app',
                            title: 'Weather App',
                            duration: '3 hours',
                            type: 'project',
                            content: {
                                overview: 'Build a weather application using APIs.',
                                features: [
                                    'Fetch weather data',
                                    'Search by city',
                                    'Display forecast',
                                    'Geolocation'
                                ]
                            }
                        }
                    ]
                }
            ]
        }
    };

    // Load progress from localStorage
    useEffect(() => {
        const savedProgress = localStorage.getItem('guideProgress');
        if (savedProgress) {
            const progress = JSON.parse(savedProgress);
            setCompletedLessons(progress.completedLessons || []);
            setUserNotes(progress.userNotes || {});
        }
    }, []);

    // Save progress to localStorage
    useEffect(() => {
        const progress = {
            completedLessons,
            userNotes,
            lastAccessed: new Date().toISOString()
        };
        localStorage.setItem('guideProgress', JSON.stringify(progress));
    }, [completedLessons, userNotes]);

    // Calculate overall progress
    const calculateProgress = () => {
        const allLessons = Object.values(learningPath).flatMap(path =>
            path.modules.flatMap(module => module.lessons.map(lesson => lesson.id))
        );
        return Math.round((completedLessons.length / allLessons.length) * 100);
    };

    // Mark lesson as complete
    const markLessonComplete = (lessonId) => {
        if (!completedLessons.includes(lessonId)) {
            setCompletedLessons([...completedLessons, lessonId]);
        }
    };

    // Toggle module expansion
    const toggleModule = (moduleId) => {
        setExpandedModules(prev =>
            prev.includes(moduleId)
                ? prev.filter(id => id !== moduleId)
                : [...prev, moduleId]
        );
    };

    // Get next lesson
    const getNextLesson = (currentLessonId) => {
        let found = false;
        for (const path of Object.values(learningPath)) {
            for (const module of path.modules) {
                for (let i = 0; i < module.lessons.length; i++) {
                    if (found) return module.lessons[i];
                    if (module.lessons[i].id === currentLessonId) {
                        found = true;
                        if (i < module.lessons.length - 1) {
                            return module.lessons[i + 1];
                        }
                    }
                }
            }
        }
        return null;
    };

    // Render lesson content
    const renderLessonContent = (lesson) => {
        const { content } = lesson;
        
        return (
            <div className="lesson-content">
                <div className="d-flex justify-content-between align-items-start mb-4">
                    <div>
                        <h3>{lesson.title}</h3>
                        <div className="text-muted mb-3">
                            <i className="bi bi-clock me-2"></i>{lesson.duration}
                            <span className="ms-3">
                                <i className="bi bi-tag me-2"></i>{lesson.type}
                            </span>
                        </div>
                    </div>
                    <button 
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => setCurrentLesson(null)}
                    >
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                <div className="mb-4">
                    <p className="lead">{content.overview}</p>
                </div>

                {content.keyPoints && (
                    <div className="mb-4">
                        <h5 className="mb-3">
                            <i className="bi bi-check-circle text-success me-2"></i>
                            Key Points
                        </h5>
                        <ul className="list-unstyled">
                            {content.keyPoints.map((point, idx) => (
                                <li key={idx} className="mb-2">
                                    <i className="bi bi-arrow-right text-primary me-2"></i>
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {content.example && (
                    <div className="mb-4">
                        <h5 className="mb-3">
                            <i className="bi bi-code-slash text-info me-2"></i>
                            Example Code
                        </h5>
                        <div className="bg-dark text-white p-3 rounded">
                            <pre className="mb-0"><code>{content.example}</code></pre>
                        </div>
                        <div className="mt-2">
                            <Link to="/playground" className="btn btn-sm btn-primary">
                                <i className="bi bi-play-fill me-2"></i>
                                Try in Playground
                            </Link>
                        </div>
                    </div>
                )}

                {content.quiz && (
                    <div className="mb-4">
                        <h5 className="mb-3">
                            <i className="bi bi-question-circle text-warning me-2"></i>
                            Quick Quiz
                        </h5>
                        {content.quiz.map((q, idx) => (
                            <div key={idx} className="card mb-3">
                                <div className="card-body">
                                    <h6>{q.question}</h6>
                                    <div className="mt-3">
                                        {q.options.map((opt, optIdx) => (
                                            <div key={optIdx} className="form-check">
                                                <input 
                                                    className="form-check-input" 
                                                    type="radio" 
                                                    name={`quiz-${idx}`}
                                                    id={`quiz-${idx}-${optIdx}`}
                                                />
                                                <label 
                                                    className="form-check-label" 
                                                    htmlFor={`quiz-${idx}-${optIdx}`}
                                                >
                                                    {opt}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {content.tasks && (
                    <div className="mb-4">
                        <h5 className="mb-3">
                            <i className="bi bi-list-task text-primary me-2"></i>
                            Tasks to Complete
                        </h5>
                        <div className="list-group">
                            {content.tasks.map((task, idx) => (
                                <label key={idx} className="list-group-item">
                                    <input 
                                        className="form-check-input me-2" 
                                        type="checkbox"
                                    />
                                    {task}
                                </label>
                            ))}
                        </div>
                    </div>
                )}

                {/* Notes Section */}
                <div className="mb-4">
                    <h5 className="mb-3">
                        <i className="bi bi-pencil-square text-secondary me-2"></i>
                        Your Notes
                    </h5>
                    <textarea 
                        className="form-control"
                        rows="4"
                        placeholder="Add your notes here..."
                        value={userNotes[lesson.id] || ''}
                        onChange={(e) => setUserNotes({
                            ...userNotes,
                            [lesson.id]: e.target.value
                        })}
                    />
                </div>

                {/* Actions */}
                <div className="d-flex justify-content-between align-items-center">
                    <button 
                        className={`btn ${completedLessons.includes(lesson.id) ? 'btn-success' : 'btn-outline-success'}`}
                        onClick={() => markLessonComplete(lesson.id)}
                    >
                        <i className="bi bi-check-circle me-2"></i>
                        {completedLessons.includes(lesson.id) ? 'Completed' : 'Mark as Complete'}
                    </button>
                    
                    <button 
                        className="btn btn-primary"
                        onClick={() => {
                            const next = getNextLesson(lesson.id);
                            if (next) setCurrentLesson(next);
                        }}
                    >
                        Next Lesson
                        <i className="bi bi-arrow-right ms-2"></i>
                    </button>
                </div>
            </div>
        );
    };

    const overallProgress = calculateProgress();

    return (
        <div className="guide-page" style={{ paddingTop: '80px' }}>
            <div className="container">
                {/* Header */}
                <div className="bg-white rounded shadow-sm p-4 mb-4">
                    <div className="row align-items-center">
                        <div className="col-md-8">
                            <h2 className="mb-3">
                                <i className="bi bi-compass text-primary me-2"></i>
                                JavaScript Learning Path
                            </h2>
                            <p className="text-muted mb-0">
                                Follow our structured curriculum to master JavaScript
                            </p>
                        </div>
                        <div className="col-md-4 text-end">
                            <div className="mb-2">
                                <span className="text-muted">Overall Progress</span>
                            </div>
                            <div className="progress" style={{ height: '25px' }}>
                                <div 
                                    className="progress-bar bg-success"
                                    style={{ width: `${overallProgress}%` }}
                                >
                                    {overallProgress}%
                                </div>
                            </div>
                            {overallProgress === 100 && (
                                <button 
                                    className="btn btn-warning mt-2"
                                    onClick={() => setShowCertificate(true)}
                                >
                                    <i className="bi bi-award me-2"></i>
                                    View Certificate
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Path Selection Tabs */}
                <ul className="nav nav-tabs mb-4">
                    {Object.entries(learningPath).map(([key, path]) => (
                        <li key={key} className="nav-item">
                            <button 
                                className={`nav-link ${activeModule === key ? 'active' : ''}`}
                                onClick={() => setActiveModule(key)}
                            >
                                <i className={`bi ${path.icon} me-2`}></i>
                                {path.title}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Current Path Content */}
                <div className="row">
                    {/* Path Overview */}
                    <div className="col-lg-4 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <h5 className="card-title">
                                    <i className={`bi ${learningPath[activeModule].icon} text-${learningPath[activeModule].color} me-2`}></i>
                                    {learningPath[activeModule].title}
                                </h5>
                                <p className="text-muted">
                                    {learningPath[activeModule].description}
                                </p>
                                <div className="mb-3">
                                    <i className="bi bi-clock me-2"></i>
                                    <strong>Duration:</strong> {learningPath[activeModule].estimatedTime}
                                </div>
                                
                                {/* Module Progress */}
                                <div className="mb-3">
                                    {learningPath[activeModule].modules.map(module => {
                                        const moduleProgress = module.lessons.filter(l => 
                                            completedLessons.includes(l.id)
                                        ).length;
                                        const totalLessons = module.lessons.length;
                                        
                                        return (
                                            <div key={module.id} className="mb-2">
                                                <small className="text-muted">{module.title}</small>
                                                <div className="progress" style={{ height: '10px' }}>
                                                    <div 
                                                        className={`progress-bar bg-${learningPath[activeModule].color}`}
                                                        style={{ width: `${(moduleProgress / totalLessons) * 100}%` }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <Link to="/challenges" className="btn btn-outline-primary w-100">
                                    <i className="bi bi-puzzle me-2"></i>
                                    Practice Challenges
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Lessons List or Content */}
                    <div className="col-lg-8">
                        {currentLesson ? (
                            <div className="card">
                                <div className="card-body">
                                    {renderLessonContent(currentLesson)}
                                </div>
                            </div>
                        ) : (
                            <div className="accordion" id="modulesAccordion">
                                {learningPath[activeModule].modules.map((module, moduleIdx) => (
                                    <div key={module.id} className="accordion-item">
                                        <h2 className="accordion-header">
                                            <button 
                                                className={`accordion-button ${!expandedModules.includes(module.id) ? 'collapsed' : ''}`}
                                                type="button"
                                                onClick={() => toggleModule(module.id)}
                                            >
                                                <span className="me-auto">
                                                    <i className="bi bi-folder me-2"></i>
                                                    {module.title}
                                                </span>
                                                <span className="badge bg-secondary me-2">
                                                    {module.lessons.filter(l => completedLessons.includes(l.id)).length}/{module.lessons.length}
                                                </span>
                                            </button>
                                        </h2>
                                        <div className={`accordion-collapse collapse ${expandedModules.includes(module.id) ? 'show' : ''}`}>
                                            <div className="accordion-body">
                                                <div className="list-group">
                                                    {module.lessons.map((lesson, lessonIdx) => (
                                                        <button
                                                            key={lesson.id}
                                                            className="list-group-item list-group-item-action"
                                                            onClick={() => setCurrentLesson(lesson)}
                                                        >
                                                            <div className="d-flex justify-content-between align-items-center">
                                                                <div>
                                                                    <h6 className="mb-1">
                                                                        {completedLessons.includes(lesson.id) && (
                                                                            <i className="bi bi-check-circle-fill text-success me-2"></i>
                                                                        )}
                                                                        {lesson.title}
                                                                    </h6>
                                                                    <small className="text-muted">
                                                                        <i className="bi bi-clock me-1"></i>
                                                                        {lesson.duration}
                                                                        <span className="ms-3">
                                                                            <i className="bi bi-tag me-1"></i>
                                                                            {lesson.type}
                                                                        </span>
                                                                    </small>
                                                                </div>
                                                                <i className="bi bi-chevron-right"></i>
                                                            </div>
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="mt-5">
                    <h4 className="mb-3">Quick Links</h4>
                    <div className="row g-3">
                        <div className="col-md-3">
                            <Link to="/documentation" className="card text-decoration-none h-100">
                                <div className="card-body text-center">
                                    <i className="bi bi-book text-primary" style={{ fontSize: '2rem' }}></i>
                                    <h6 className="mt-2">Documentation</h6>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-3">
                            <Link to="/playground" className="card text-decoration-none h-100">
                                <div className="card-body text-center">
                                    <i className="bi bi-code-square text-success" style={{ fontSize: '2rem' }}></i>
                                    <h6 className="mt-2">Playground</h6>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-3">
                            <Link to="/challenges" className="card text-decoration-none h-100">
                                <div className="card-body text-center">
                                    <i className="bi bi-trophy text-warning" style={{ fontSize: '2rem' }}></i>
                                    <h6 className="mt-2">Challenges</h6>
                                </div>
                            </Link>
                        </div>
                        <div className="col-md-3">
                            <a href="#" className="card text-decoration-none h-100">
                                <div className="card-body text-center">
                                    <i className="bi bi-discord text-info" style={{ fontSize: '2rem' }}></i>
                                    <h6 className="mt-2">Community</h6>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Certificate Modal */}
            {showCertificate && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">
                                    <i className="bi bi-award text-warning me-2"></i>
                                    Certificate of Completion
                                </h5>
                                <button 
                                    className="btn-close"
                                    onClick={() => setShowCertificate(false)}
                                />
                            </div>
                            <div className="modal-body text-center">
                                <div className="certificate p-5 bg-light rounded">
                                    <i className="bi bi-award text-warning" style={{ fontSize: '4rem' }}></i>
                                    <h2 className="mt-3">Congratulations!</h2>
                                    <p className="lead">You have successfully completed the</p>
                                    <h3 className="text-primary">JavaScript Learning Path</h3>
                                    <p className="text-muted">
                                        Issued on: {new Date().toLocaleDateString()}
                                    </p>
                                    <div className="mt-4">
                                        <button className="btn btn-success me-2">
                                            <i className="bi bi-download me-2"></i>
                                            Download Certificate
                                        </button>
                                        <button className="btn btn-primary">
                                            <i className="bi bi-share me-2"></i>
                                            Share Achievement
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};