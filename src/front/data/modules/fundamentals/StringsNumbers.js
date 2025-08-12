// src/front/data/modules/fundamentals/StringsNumbers.js
export const StringsNumbers = {
  title: 'Strings and Numbers',
  duration: '35 min',
  difficulty: 'Beginner',
  overview: 'Master string and number manipulation in JavaScript. Learn built-in methods, formatting, parsing, and common operations.',
  
  keyPoints: [
    'Strings are immutable in JavaScript',
    'Many built-in methods for string manipulation',
    'Template literals provide powerful string features',
    'Number methods handle conversion and formatting',
    'Math object provides mathematical functions',
    'Be aware of floating-point precision issues'
  ],

  example: `// String Creation and Basic Operations
const str1 = "Hello";
const str2 = 'World';
const str3 = \`Template literal\`;

// String Properties and Methods
console.log(str1.length);              // 5
console.log(str1.toUpperCase());       // "HELLO"
console.log(str1.toLowerCase());       // "hello"
console.log(str1.charAt(1));           // "e"
console.log(str1.indexOf('l'));        // 2 (first occurrence)
console.log(str1.lastIndexOf('l'));    // 3 (last occurrence)

// String Manipulation
const sentence = "  JavaScript is awesome!  ";
console.log(sentence.trim());                    // Remove whitespace
console.log(sentence.substring(2, 12));          // "JavaScript"
console.log(sentence.slice(-9, -2));             // "awesome"
console.log(sentence.replace("awesome", "great")); // Replace first occurrence
console.log(sentence.replaceAll("a", "@"));      // Replace all occurrences

// String Splitting and Joining
const words = "apple,banana,orange";
const wordArray = words.split(",");
console.log(wordArray);               // ["apple", "banana", "orange"]
console.log(wordArray.join(" - "));   // "apple - banana - orange"

// String Searching and Testing
const email = "user@example.com";
console.log(email.includes("@"));        // true
console.log(email.startsWith("user"));   // true
console.log(email.endsWith(".com"));     // true

// Template Literals
const name = "Alice";
const age = 25;
const message = \`Hello, my name is \${name} and I'm \${age} years old.
Next year I'll be \${age + 1}.\`;
console.log(message);

// Multi-line strings
const html = \`
    <div>
        <h1>Title</h1>
        <p>Content goes here</p>
    </div>
\`;

// String Padding
const num = "5";
console.log(num.padStart(3, "0"));    // "005"
console.log(num.padEnd(3, "0"));      // "500"

// Regular Expressions with Strings
const text = "The price is $25.99";
const priceRegex = /\$(\d+\.\d{2})/;
const match = text.match(priceRegex);
console.log(match[1]);                // "25.99"

// Number Operations
const num1 = 42;
const num2 = 3.14159;
const num3 = -17;

// Number Properties
console.log(Number.MAX_SAFE_INTEGER);  // 9007199254740991
console.log(Number.MIN_SAFE_INTEGER);  // -9007199254740991
console.log(Number.POSITIVE_INFINITY); // Infinity
console.log(Number.NaN);               // NaN

// Number Methods
console.log(num2.toFixed(2));          // "3.14"
console.log(num2.toPrecision(4));      // "3.142"
console.log(num1.toString());          // "42"
console.log(num1.toString(2));         // "101010" (binary)
console.log(num1.toString(16));        // "2a" (hexadecimal)

// Number Parsing
const strNum = "123.45";
const floatNum = parseFloat(strNum);
const intNum = parseInt(strNum);
console.log(floatNum);                 // 123.45
console.log(intNum);                   // 123

// Number Validation
console.log(Number.isNaN(NaN));        // true
console.log(Number.isNaN("abc"));      // false (it's a string)
console.log(Number.isFinite(42));      // true
console.log(Number.isFinite(Infinity)); // false
console.log(Number.isInteger(42));     // true
console.log(Number.isInteger(42.1));   // false

// Math Object
console.log(Math.PI);                  // 3.141592653589793
console.log(Math.E);                   // 2.718281828459045

// Math Methods
console.log(Math.abs(-5));             // 5
console.log(Math.round(4.7));          // 5
console.log(Math.floor(4.7));          // 4
console.log(Math.ceil(4.1));           // 5
console.log(Math.max(1, 3, 2));        // 3
console.log(Math.min(1, 3, 2));        // 1
console.log(Math.random());            // Random number 0-1
console.log(Math.pow(2, 3));           // 8
console.log(Math.sqrt(16));            // 4

// Random Number Utilities
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomFloat(min, max) {
    return Math.random() * (max - min) + min;
}

console.log(randomInt(1, 10));         // Random integer 1-10
console.log(randomFloat(0, 1));        // Random float 0-1

// Working with Currency
function formatCurrency(amount) {
    return \`$\${amount.toFixed(2)}\`;
}

function parseCurrency(str) {
    return parseFloat(str.replace(/[$,]/g, ''));
}

console.log(formatCurrency(1234.5));   // "$1234.50"
console.log(parseCurrency("$1,234.50")); // 1234.5

// String/Number Conversion Edge Cases
console.log(+"123");                   // 123 (unary plus)
console.log(+"123abc");                // NaN
console.log(String(123));              // "123"
console.log(123 + "");                 // "123"
console.log("123" - 0);                // 123
console.log(true + 1);                 // 2
console.log("5" * "4");                // 20`,

  exercises: [
    {
      question: "Write a function to reverse a string.",
      solution: "function reverseString(str) { return str.split('').reverse().join(''); }",
      explanation: "Convert to array, reverse it, then join back to a string."
    },
    {
      question: "Create a function to check if a string is a palindrome.",
      solution: `function isPalindrome(str) {
  const cleaned = str.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}`,
      explanation: "Clean the string, then compare it with its reverse."
    }
  ],

  quiz: [
    {
      question: "What does 'hello'.charAt(1) return?",
      options: ["h", "e", "l", "undefined"],
      correct: 1,
      explanation: "charAt(1) returns the character at index 1, which is 'e'."
    }
  ],

  resources: [
    {
      title: "MDN - String",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String"
    },
    {
      title: "MDN - Number",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number"
    }
  ],

  nextModules: ['error-handling-basics'],
  prerequisites: ['arrays-objects']
};
