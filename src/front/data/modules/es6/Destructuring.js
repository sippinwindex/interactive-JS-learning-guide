// src/front/data/modules/es6/Destructuring.js
export default {
  title: 'Destructuring Assignment',
  duration: '30 min',
  difficulty: 'Intermediate',
  overview: 'Master destructuring assignment for arrays and objects. Learn to extract values, use default values, and apply destructuring in function parameters.',
  
  keyPoints: [
    'Destructuring extracts values from arrays and objects',
    'Use default values for missing properties',
    'Rest operator collects remaining elements',
    'Destructuring works in function parameters',
    'Renaming variables during destructuring',
    'Nested destructuring for complex structures'
  ],

  example: `// Array Destructuring
console.log('=== Array Destructuring ===');

const fruits = ['apple', 'banana', 'orange', 'grape'];

// Basic array destructuring
const [first, second] = fruits;
console.log('First:', first);   // apple
console.log('Second:', second); // banana

// Skip elements
const [firstFruit, , thirdFruit] = fruits;
console.log('First and third:', firstFruit, thirdFruit);

// Rest operator in destructuring
const [head, ...tail] = fruits;
console.log('Head:', head);     // apple
console.log('Tail:', tail);     // ['banana', 'orange', 'grape']

// Default values
const [a, b, c, d, e = 'default'] = fruits;
console.log('Fifth fruit:', e); // grape (not default)

const [x, y, z, w, missing = 'not found'] = fruits;
console.log('Missing fruit:', missing); // not found

// Swapping variables
let var1 = 'first';
let var2 = 'second';
console.log('Before swap:', var1, var2);

[var1, var2] = [var2, var1];
console.log('After swap:', var1, var2);

// Object Destructuring
console.log('\\n=== Object Destructuring ===');

const person = {
    name: 'Alice',
    age: 30,
    city: 'New York',
    email: 'alice@example.com'
};

// Basic object destructuring
const { name, age } = person;
console.log('Name:', name); // Alice
console.log('Age:', age);   // 30

// Renaming variables
const { name: fullName, city: location } = person;
console.log('Full name:', fullName);   // Alice
console.log('Location:', location);    // New York

// Default values
const { name: personName, country = 'USA' } = person;
console.log('Person name:', personName); // Alice
console.log('Country:', country);        // USA (default)

// Rest in object destructuring
const { email, ...otherInfo } = person;
console.log('Email:', email);
console.log('Other info:', otherInfo);

// Nested Destructuring
console.log('\\n=== Nested Destructuring ===');

const user = {
    id: 1,
    profile: {
        personal: {
            firstName: 'John',
            lastName: 'Doe'
        },
        contact: {
            email: 'john@example.com',
            phone: '123-456-7890'
        }
    },
    preferences: {
        theme: 'dark',
        language: 'en'
    }
};

// Nested object destructuring
const {
    profile: {
        personal: { firstName, lastName },
        contact: { email: userEmail }
    },
    preferences: { theme }
} = user;

console.log('First name:', firstName);
console.log('Last name:', lastName);
console.log('User email:', userEmail);
console.log('Theme:', theme);

// Mixed array and object destructuring
const response = {
    data: [
        { id: 1, name: 'Product 1', price: 99.99 },
        { id: 2, name: 'Product 2', price: 149.99 }
    ],
    status: 'success'
};

const {
    data: [firstProduct, secondProduct],
    status
} = response;

console.log('Status:', status);
console.log('First product:', firstProduct);
console.log('Second product:', secondProduct);

// Function Parameter Destructuring
console.log('\\n=== Function Parameter Destructuring ===');

// Object parameter destructuring
function greetUser({ name, age, city = 'Unknown' }) {
    console.log(\`Hello \${name}, age \${age}, from \${city}\`);
}

greetUser({ name: 'Bob', age: 25, city: 'Boston' });
greetUser({ name: 'Charlie', age: 35 }); // city defaults to 'Unknown'

// Array parameter destructuring
function processCoordinates([x, y, z = 0]) {
    console.log(\`Coordinates: x=\${x}, y=\${y}, z=\${z}\`);
}

processCoordinates([10, 20]);      // z defaults to 0
processCoordinates([5, 15, 25]);   // all values provided

// Function returning multiple values
function getNameParts(fullName) {
    const parts = fullName.split(' ');
    return [parts[0], parts.slice(1).join(' ')];
}

const [firstName2, lastName2] = getNameParts('John Michael Doe');
console.log('First:', firstName2);
console.log('Last:', lastName2);

function getUserInfo() {
    return {
        user: 'admin',
        permissions: ['read', 'write'],
        lastLogin: new Date()
    };
}

const { user: username, permissions } = getUserInfo();
console.log('Username:', username);
console.log('Permissions:', permissions);

// Practical Examples
console.log('\\n=== Practical Examples ===');

// 1. API Response handling
const apiResponse = {
    success: true,
    data: {
        users: [
            { id: 1, name: 'Alice', role: 'admin' },
            { id: 2, name: 'Bob', role: 'user' }
        ],
        pagination: {
            currentPage: 1,
            totalPages: 5,
            totalItems: 50
        }
    },
    message: 'Data retrieved successfully'
};

const {
    success,
    data: {
        users,
        pagination: { currentPage, totalPages }
    },
    message
} = apiResponse;

console.log('Success:', success);
console.log('Users:', users);
console.log('Page info:', \`\${currentPage} of \${totalPages}\`);

// 2. Configuration objects
function setupServer({
    port = 3000,
    host = 'localhost',
    ssl: { enabled = false, cert, key } = {},
    database: { url, maxConnections = 10 } = {}
}) {
    console.log(\`Server config:
        Port: \${port}
        Host: \${host}
        SSL: \${enabled ? 'enabled' : 'disabled'}
        DB Max Connections: \${maxConnections}\`);
}

setupServer({
    port: 8080,
    ssl: { enabled: true, cert: 'cert.pem' },
    database: { url: 'mongodb://localhost', maxConnections: 20 }
});

// 3. Event handling
function handleFormSubmit(event) {
    // Destructure event properties
    const {
        target: { elements },
        preventDefault
    } = event;
    
    preventDefault();
    
    // Destructure form elements (simulated)
    const formData = {
        username: 'john_doe',
        email: 'john@example.com',
        password: '••••••••'
    };
    
    const { username, email, password } = formData;
    console.log('Form submitted:', { username, email });
}

// Simulate form event
const mockEvent = {
    target: { elements: {} },
    preventDefault: () => console.log('Default prevented')
};

handleFormSubmit(mockEvent);

// 4. Module imports simulation
const moduleExports = {
    default: function() { return 'default export'; },
    namedExport1: 'named export 1',
    namedExport2: 'named export 2',
    utils: {
        helper1: () => 'helper 1',
        helper2: () => 'helper 2'
    }
};

// Simulate ES6 import destructuring
const {
    default: defaultExport,
    namedExport1,
    utils: { helper1, helper2 }
} = moduleExports;

console.log('Default export:', defaultExport());
console.log('Named export:', namedExport1);
console.log('Helper 1:', helper1());

// Advanced Patterns
console.log('\\n=== Advanced Patterns ===');

// 1. Dynamic property names
const dynamicKey = 'theme';
const settings = {
    theme: 'dark',
    language: 'en',
    notifications: true
};

const { [dynamicKey]: selectedTheme } = settings;
console.log('Selected theme:', selectedTheme);

// 2. Destructuring in loops
const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Mouse', price: 25 },
    { id: 3, name: 'Keyboard', price: 75 }
];

console.log('Product prices:');
for (const { name, price } of products) {
    console.log(\`\${name}: $\${price}\`);
}

// 3. Destructuring with computed properties
function extractProperties(obj, ...keys) {
    const result = {};
    for (const key of keys) {
        if (key in obj) {
            result[key] = obj[key];
        }
    }
    return result;
}

const fullUser = {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
    password: 'secret',
    role: 'admin',
    createdAt: '2023-01-01'
};

const publicInfo = extractProperties(fullUser, 'id', 'name', 'email', 'role');
console.log('Public info:', publicInfo);

// 4. Destructuring with array methods
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Find and destructure
const found = numbers
    .map((num, index) => ({ num, index, isEven: num % 2 === 0 }))
    .find(({ isEven }) => isEven);

if (found) {
    const { num, index } = found;
    console.log(\`First even number: \${num} at index \${index}\`);
}

// 5. Error handling with destructuring
function parseJSON(jsonString) {
    try {
        const parsed = JSON.parse(jsonString);
        return { success: true, data: parsed, error: null };
    } catch (error) {
        return { success: false, data: null, error: error.message };
    }
}

const { success: parseSuccess, data, error } = parseJSON('{"name": "test"}');
console.log('Parse result:', { parseSuccess, data, error });

// Destructuring Gotchas
console.log('\\n=== Common Gotchas ===');

// 1. Declaring variables
// This won't work: { name } = person; // SyntaxError
// Must use: const { name } = person; or ({ name } = person);

let extractedName;
({ name: extractedName } = person); // Parentheses required
console.log('Extracted name:', extractedName);

// 2. Default values only apply to undefined
const testObj = { a: null, b: undefined, c: '' };
const { a = 'default a', b = 'default b', c = 'default c' } = testObj;
console.log('a:', a); // null (not default)
console.log('b:', b); // 'default b' (undefined)
console.log('c:', c); // '' (not default)

// 3. Rest must be last
const testArray = [1, 2, 3, 4, 5];
// const [first, ...middle, last] = testArray; // SyntaxError
const [firstNum, ...restNums] = testArray; // Correct
console.log('First num:', firstNum);
console.log('Rest nums:', restNums);

// Real-world Use Cases
console.log('\\n=== Real-world Use Cases ===');

// 1. React-style props destructuring (simulation)
function ComponentSimulation({ title, children, onClick, disabled = false }) {
    console.log(\`Rendering component:
        Title: \${title}
        Has children: \${!!children}
        Disabled: \${disabled}\`);
    
    if (onClick && !disabled) {
        onClick();
    }
}

ComponentSimulation({
    title: 'My Button',
    children: 'Click me',
    onClick: () => console.log('Button clicked!')
});

// 2. State management
function updateState(currentState, updates) {
    return { ...currentState, ...updates };
}

const currentState = { loading: false, data: null, error: null };
const { loading, data: currentData, error: currentError } = currentState;

console.log('Current state:', { loading, currentData, currentError });

const newState = updateState(currentState, { loading: true });
const { loading: newLoading } = newState;
console.log('New loading state:', newLoading);

// 3. Database query results (simulation)
const queryResult = {
    rows: [
        { id: 1, name: 'John', email: 'john@example.com' },
        { id: 2, name: 'Jane', email: 'jane@example.com' }
    ],
    count: 2,
    metadata: {
        query: 'SELECT * FROM users',
        executionTime: 45
    }
};

const {
    rows: users2,
    count: userCount,
    metadata: { executionTime }
} = queryResult;

console.log(\`Found \${userCount} users in \${executionTime}ms\`);
console.log('Users:', users2);

console.log('Destructuring examples completed');`,

  exercises: [
    {
      question: "Extract the first and last elements from an array, skipping the middle elements:",
      solution: `const arr = [1, 2, 3, 4, 5];
const [first, , , , last] = arr;
console.log(first, last); // 1, 5

// Or using length:
const [firstEl, ...middle] = arr;
const lastEl = middle[middle.length - 1] || firstEl;`,
      explanation: "Use array destructuring with commas to skip elements, or combine with rest operator."
    }
  ],

  quiz: [
    {
      question: "What happens if you try to destructure a property that doesn't exist?",
      options: [
        "It throws an error",
        "It returns null",
        "It returns undefined", 
        "It returns an empty string"
      ],
      correct: 2,
      explanation: "Destructuring non-existent properties returns undefined, unless a default value is provided."
    }
  ],

  resources: [
    {
      title: "MDN - Destructuring Assignment",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment"
    }
  ],

  nextModules: ['spread-rest', 'default-params'],
  prerequisites: ['arrays-objects', 'arrow-functions']
};