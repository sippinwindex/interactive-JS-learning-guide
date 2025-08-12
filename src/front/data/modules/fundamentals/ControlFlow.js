// src/front/data/modules/fundamentals/ControlFlow.js
export const ControlFlow = {
  title: 'Control Flow',
  duration: '35 min',
  difficulty: 'Beginner',
  overview: 'Master conditional statements and loops in JavaScript. Learn if/else, switch statements, for loops, while loops, and control flow best practices.',
  
  keyPoints: [
    'if/else statements for conditional execution',
    'switch statements for multiple conditions',
    'for loops for counted iterations',
    'while loops for condition-based iterations',
    'break and continue control loop execution',
    'Nested loops and conditions are possible but use carefully'
  ],

  example: `// If/Else Statements
let temperature = 25;

if (temperature > 30) {
    console.log("It's hot!");
} else if (temperature > 20) {
    console.log("It's warm!");
} else if (temperature > 10) {
    console.log("It's cool!");
} else {
    console.log("It's cold!");
}

// Switch Statement
let day = "Monday";

switch (day) {
    case "Monday":
        console.log("Start of work week");
        break;
    case "Tuesday":
    case "Wednesday":
    case "Thursday":
        console.log("Midweek");
        break;
    case "Friday":
        console.log("TGIF!");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Weekend!");
        break;
    default:
        console.log("Invalid day");
}

// For Loops
console.log("Counting up:");
for (let i = 1; i <= 5; i++) {
    console.log(\`Count: \${i}\`);
}

console.log("Counting down:");
for (let i = 5; i >= 1; i--) {
    console.log(\`Countdown: \${i}\`);
}

// For...of Loop (arrays)
const fruits = ["apple", "banana", "orange"];
for (const fruit of fruits) {
    console.log(\`I like \${fruit}\`);
}

// For...in Loop (objects)
const person = { name: "Alice", age: 30, city: "NYC" };
for (const key in person) {
    console.log(\`\${key}: \${person[key]}\`);
}

// While Loop
let count = 0;
while (count < 3) {
    console.log(\`While count: \${count}\`);
    count++;
}

// Do-While Loop
let attempts = 0;
do {
    attempts++;
    console.log(\`Attempt \${attempts}\`);
} while (attempts < 2);

// Break and Continue
console.log("Break example:");
for (let i = 1; i <= 10; i++) {
    if (i === 5) {
        break; // Exit loop
    }
    console.log(i);
}

console.log("Continue example:");
for (let i = 1; i <= 5; i++) {
    if (i === 3) {
        continue; // Skip this iteration
    }
    console.log(i);
}

// Nested Loops
console.log("Multiplication table:");
for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 3; j++) {
        console.log(\`\${i} x \${j} = \${i * j}\`);
    }
}

// Complex Conditions
let age = 25;
let hasLicense = true;
let hasInsurance = true;

if (age >= 18 && hasLicense && hasInsurance) {
    console.log("Can drive legally");
} else {
    console.log("Cannot drive");
    if (age < 18) console.log("Too young");
    if (!hasLicense) console.log("Need license");
    if (!hasInsurance) console.log("Need insurance");
}`,

  exercises: [
    {
      question: "Write a for loop that prints even numbers from 2 to 10.",
      solution: "for (let i = 2; i <= 10; i += 2) { console.log(i); }",
      explanation: "Start at 2 and increment by 2 each iteration to get even numbers."
    },
    {
      question: "Create a switch statement for grading (A, B, C, D, F) based on score ranges.",
      solution: `let grade;
if (score >= 90) grade = 'A';
else if (score >= 80) grade = 'B';
else if (score >= 70) grade = 'C';
else if (score >= 60) grade = 'D';
else grade = 'F';`,
      explanation: "For ranges, if/else is more suitable than switch which works best with discrete values."
    }
  ],

  quiz: [
    {
      question: "What happens if you forget 'break' in a switch case?",
      options: [
        "Nothing, it works normally",
        "The code falls through to the next case",
        "An error is thrown",
        "The switch exits immediately"
      ],
      correct: 1,
      explanation: "Without break, execution continues to the next case (fall-through behavior)."
    }
  ],

  resources: [
    {
      title: "MDN - Control Flow",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Control_flow_and_error_handling"
    }
  ],

  nextModules: ['functions-basics'],
  prerequisites: ['operators-expressions']
};