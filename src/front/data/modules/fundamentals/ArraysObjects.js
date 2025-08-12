// src/front/data/modules/fundamentals/ArraysObjects.js
export const ArraysObjects = {
  title: 'Arrays and Objects',
  duration: '45 min',
  difficulty: 'Beginner',
  overview: 'Master JavaScript arrays and objects. Learn creation, manipulation, iteration methods, and common patterns for working with structured data.',
  
  keyPoints: [
    'Arrays store ordered lists of values',
    'Objects store key-value pairs',
    'Both are reference types in JavaScript',
    'Many built-in methods for array manipulation',
    'Object properties can be accessed with dot or bracket notation',
    'Arrays and objects can be nested for complex data structures'
  ],

  example: `// Array Creation and Basic Operations
const fruits = ["apple", "banana", "orange"];
const numbers = [1, 2, 3, 4, 5];
const mixed = ["text", 42, true, null, { key: "value" }];

// Array Properties and Methods
console.log(fruits.length);        // 3
console.log(fruits[0]);           // "apple"
console.log(fruits[fruits.length - 1]); // "orange"

// Adding Elements
fruits.push("grape");             // Add to end
fruits.unshift("strawberry");     // Add to beginning
fruits.splice(2, 0, "kiwi");      // Insert at index 2

console.log(fruits); // ["strawberry", "apple", "kiwi", "banana", "orange", "grape"]

// Removing Elements
let lastFruit = fruits.pop();        // Remove from end
let firstFruit = fruits.shift();     // Remove from beginning
let removed = fruits.splice(1, 2);   // Remove 2 elements from index 1

console.log(\`Removed: \${lastFruit}, \${firstFruit}\`);
console.log("Removed elements:", removed);
console.log(fruits);

// Array Iteration
const scores = [85, 92, 78, 96, 88];

// Traditional for loop
for (let i = 0; i < scores.length; i++) {
    console.log(\`Score \${i + 1}: \${scores[i]}\`);
}

// For...of loop
for (const score of scores) {
    console.log(\`Score: \${score}\`);
}

// forEach method
scores.forEach((score, index) => {
    console.log(\`Student \${index + 1}: \${score}\`);
});

// Array Methods
const doubled = numbers.map(num => num * 2);
const evens = numbers.filter(num => num % 2 === 0);
const sum = numbers.reduce((total, num) => total + num, 0);
const found = numbers.find(num => num > 3);
const hasLargeNumber = numbers.some(num => num > 10);

console.log("Doubled:", doubled);     // [2, 4, 6, 8, 10]
console.log("Evens:", evens);         // [2, 4]
console.log("Sum:", sum);             // 15
console.log("Found:", found);         // 4
console.log("Has large:", hasLargeNumber); // false

// Object Creation and Properties
const person = {
    name: "Alice",
    age: 30,
    city: "New York",
    isActive: true,
    hobbies: ["reading", "hiking", "cooking"]
};

// Accessing Properties
console.log(person.name);           // "Alice"
console.log(person["age"]);         // 30
console.log(person["is" + "Active"]); // true

// Adding/Modifying Properties
person.email = "alice@example.com";
person["phone"] = "123-456-7890";
person.age = 31;

// Deleting Properties
delete person.isActive;

// Object Methods
const calculator = {
    result: 0,
    add(value) {
        this.result += value;
        return this;
    },
    subtract(value) {
        this.result -= value;
        return this;
    },
    multiply(value) {
        this.result *= value;
        return this;
    },
    getValue() {
        return this.result;
    },
    reset() {
        this.result = 0;
        return this;
    }
};

// Method chaining
const result = calculator.reset()
                         .add(10)
                         .multiply(2)
                         .subtract(5)
                         .getValue();
console.log(result); // 15

// Object Iteration
console.log("Person properties:");
for (const key in person) {
    console.log(\`\${key}: \${person[key]}\`);
}

// Object static methods
const keys = Object.keys(person);
const values = Object.values(person);
const entries = Object.entries(person);

console.log("Keys:", keys);
console.log("Values:", values);
console.log("Entries:", entries);

// Nested Structures
const company = {
    name: "TechCorp",
    employees: [
        {
            name: "John",
            department: "Engineering",
            projects: ["Project A", "Project B"]
        },
        {
            name: "Sarah",
            department: "Marketing",
            projects: ["Campaign 1"]
        }
    ],
    departments: {
        engineering: {
            head: "Jane Doe",
            budget: 1000000
        },
        marketing: {
            head: "Bob Smith",
            budget: 500000
        }
    }
};

// Accessing nested data
console.log(company.employees[0].name);
console.log(company.departments.engineering.head);

// Array of objects manipulation
const highBudgetDepts = Object.entries(company.departments)
    .filter(([name, dept]) => dept.budget > 600000)
    .map(([name, dept]) => ({ name, head: dept.head }));

console.log("High budget departments:", highBudgetDepts);`,

  exercises: [
    {
      question: "Create an array of numbers and find the average.",
      solution: `const nums = [1, 2, 3, 4, 5];
const avg = nums.reduce((sum, num) => sum + num, 0) / nums.length;`,
      explanation: "Use reduce to sum all numbers, then divide by the array length."
    },
    {
      question: "Create an object representing a book with methods to get full info.",
      solution: `const book = {
  title: "JavaScript Guide",
  author: "John Doe", 
  year: 2023,
  getInfo() {
    return \`\${this.title} by \${this.author} (\${this.year})\`;
  }
};`,
      explanation: "Objects can contain methods that access their own properties using 'this'."
    }
  ],

  quiz: [
    {
      question: "What's the difference between array.push() and array.unshift()?",
      options: [
        "No difference",
        "push() adds to end, unshift() adds to beginning",
        "push() is faster",
        "unshift() only works with numbers"
      ],
      correct: 1,
      explanation: "push() adds elements to the end of an array, unshift() adds to the beginning."
    }
  ],

  resources: [
    {
      title: "MDN - Arrays",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"
    },
    {
      title: "MDN - Objects",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects"
    }
  ],

  nextModules: ['strings-numbers'],
  prerequisites: ['functions-basics']
};