// src/front/data/modules/es6/DefaultParams.js
export default {
  title: 'Default Parameters',
  duration: '25 min',
  difficulty: 'Beginner',
  overview: 'Learn how to use ES6 default parameters to provide fallback values for function arguments. Master parameter defaults, expressions, and advanced patterns.',
  
  keyPoints: [
    'Default parameters provide fallback values for undefined arguments',
    'Defaults are evaluated at call time, not definition time',
    'Default expressions can reference other parameters',
    'Works with destructuring assignment',
    'Replaces older patterns using || operator',
    'Can use function calls as default values'
  ],

  example: `// Basic Default Parameters
console.log('=== Basic Default Parameters ===');

// Traditional way (ES5 and earlier)
function greetOld(name, greeting) {
    name = name || 'Guest';
    greeting = greeting || 'Hello';
    return greeting + ', ' + name + '!';
}

// ES6 way with default parameters
function greet(name = 'Guest', greeting = 'Hello') {
    return \`\${greeting}, \${name}!\`;
}

console.log(greet());                    // Hello, Guest!
console.log(greet('Alice'));             // Hello, Alice!
console.log(greet('Bob', 'Hi'));         // Hi, Bob!
console.log(greet(undefined, 'Hey'));    // Hey, Guest!

// Important: null vs undefined
console.log(greet(null));                // Hello, null! (null is not undefined)
console.log(greet(undefined));           // Hello, Guest! (undefined triggers default)

// Numeric Default Parameters
console.log('\\n=== Numeric Defaults ===');

function calculatePrice(basePrice, tax = 0.08, discount = 0) {
    const total = basePrice * (1 + tax) * (1 - discount);
    return parseFloat(total.toFixed(2));
}

console.log('Price with defaults:', calculatePrice(100));           // 108.00
console.log('Price with custom tax:', calculatePrice(100, 0.1));    // 110.00
console.log('Price with discount:', calculatePrice(100, 0.08, 0.1)); // 97.20

// Boolean Default Parameters
function toggleFeature(featureName, enabled = true, notify = false) {
    const status = enabled ? 'enabled' : 'disabled';
    const message = \`Feature "\${featureName}" is \${status}\`;
    
    if (notify) {
        console.log(\`🔔 \${message}\`);
    }
    
    return { feature: featureName, enabled, notified: notify };
}

console.log(toggleFeature('DarkMode'));                    // enabled, not notified
console.log(toggleFeature('Notifications', false));       // disabled, not notified
console.log(toggleFeature('Analytics', true, true));      // enabled, notified

// Expression-based Defaults
console.log('\\n=== Expression-based Defaults ===');

function createUser(name, email, role = 'user', createdAt = new Date()) {
    return {
        name,
        email,
        role,
        createdAt,
        id: Math.random().toString(36).substring(7)
    };
}

// Each call gets a new timestamp
console.log('User 1:', createUser('Alice', 'alice@example.com'));
console.log('User 2:', createUser('Bob', 'bob@example.com', 'admin'));

// Function Calls as Defaults
function generateId() {
    return 'id_' + Math.random().toString(36).substring(7);
}

function createProduct(name, price, id = generateId()) {
    return { id, name, price };
}

console.log('Product 1:', createProduct('Laptop', 999));
console.log('Product 2:', createProduct('Mouse', 25));

// Parameters Referencing Other Parameters
console.log('\\n=== Parameters Referencing Others ===');

function createRectangle(width, height = width) {
    // height defaults to width (creates a square)
    return {
        width,
        height,
        area: width * height,
        isSquare: width === height
    };
}

console.log('Square:', createRectangle(5));        // 5x5 square
console.log('Rectangle:', createRectangle(5, 10)); // 5x10 rectangle

function formatName(firstName, lastName, fullName = \`\${firstName} \${lastName}\`) {
    return {
        firstName,
        lastName,
        fullName,
        initials: \`\${firstName[0]}.\${lastName[0]}.\`
    };
}

console.log('Name format:', formatName('John', 'Doe'));

// More complex parameter relationships
function calculateInterest(principal, rate = 0.05, time = 1, compound = principal > 10000) {
    // Auto-compound for large amounts
    if (compound) {
        return principal * Math.pow(1 + rate, time) - principal;
    } else {
        return principal * rate * time;
    }
}

console.log('Small loan interest:', calculateInterest(5000));     // Simple interest
console.log('Large loan interest:', calculateInterest(50000));   // Compound interest

// Default Parameters with Rest Parameters
console.log('\\n=== Defaults with Rest Parameters ===');

function createTeam(teamName, leader = 'TBD', ...members) {
    return {
        name: teamName,
        leader,
        members,
        size: members.length + 1, // +1 for leader
        toString() {
            return \`Team \${this.name}: Leader: \${this.leader}, Members: \${this.members.join(', ')}\`;
        }
    };
}

console.log(createTeam('Development').toString());
console.log(createTeam('Design', 'Alice', 'Bob', 'Charlie').toString());

// Default Parameters with Destructuring
console.log('\\n=== Defaults with Destructuring ===');

function configureServer({
    host = 'localhost',
    port = 3000,
    ssl = false,
    database = { host: 'localhost', port: 5432 }
} = {}) {
    return {
        server: { host, port, ssl },
        database,
        url: \`http\${ssl ? 's' : ''}://\${host}:\${port}\`
    };
}

console.log('Default config:', configureServer());
console.log('Custom config:', configureServer({
    host: 'api.example.com',
    port: 8080,
    ssl: true
}));

// Array destructuring with defaults
function processCoordinates([x = 0, y = 0, z = 0] = []) {
    return {
        coordinates: { x, y, z },
        distance: Math.sqrt(x*x + y*y + z*z)
    };
}

console.log('No coords:', processCoordinates());
console.log('2D coords:', processCoordinates([3, 4]));
console.log('3D coords:', processCoordinates([3, 4, 5]));

// Advanced Default Patterns
console.log('\\n=== Advanced Patterns ===');

// 1. Factory function defaults
function createDefaultConfig() {
    return {
        theme: 'light',
        language: 'en',
        notifications: true
    };
}

function initializeApp(config = createDefaultConfig()) {
    return {
        ...config,
        initialized: true,
        timestamp: Date.now()
    };
}

console.log('App with defaults:', initializeApp());
console.log('App with custom config:', initializeApp({ theme: 'dark' }));

// 2. Conditional defaults based on environment
const isProduction = false; // Simulate environment

function setupLogger(
    level = isProduction ? 'error' : 'debug',
    output = isProduction ? 'file' : 'console'
) {
    return {
        level,
        output,
        enabled: true,
        format: level === 'debug' ? 'detailed' : 'compact'
    };
}

console.log('Logger config:', setupLogger());

// 3. Lazy evaluation defaults
let expensiveCalculationCalled = false;

function expensiveCalculation() {
    expensiveCalculationCalled = true;
    console.log('🔄 Expensive calculation executed');
    return 'expensive_result';
}

function processData(data, cache = expensiveCalculation()) {
    return \`Processing \${data} with cache: \${cache}\`;
}

console.log('Before calling processData, expensive calculation called:', expensiveCalculationCalled);
console.log(processData('test_data'));
console.log('After calling processData, expensive calculation called:', expensiveCalculationCalled);

// Reset for next example
expensiveCalculationCalled = false;

// Only calculate if needed
function processDataLazy(data, cache) {
    cache = cache !== undefined ? cache : expensiveCalculation();
    return \`Processing \${data} with cache: \${cache}\`;
}

console.log('Calling with explicit cache:');
console.log(processDataLazy('test_data', 'provided_cache'));
console.log('Expensive calculation called:', expensiveCalculationCalled);

// Common Patterns and Best Practices
console.log('\\n=== Best Practices ===');

// 1. API function with options object
function fetchData(url, {
    method = 'GET',
    headers = { 'Content-Type': 'application/json' },
    timeout = 5000,
    retries = 3
} = {}) {
    return {
        request: { url, method, headers, timeout, retries },
        simulate: \`Would fetch \${url} with \${method}\`
    };
}

console.log('Simple fetch:', fetchData('https://api.example.com/users'));
console.log('Custom fetch:', fetchData('https://api.example.com/users', {
    method: 'POST',
    timeout: 10000
}));

// 2. Constructor-like function with defaults
function createError(message = 'An error occurred', code = 500, details = null) {
    const error = new Error(message);
    error.code = code;
    error.details = details;
    error.timestamp = new Date();
    return error;
}

console.log('Default error:', createError());
console.log('Custom error:', createError('Not found', 404, { resource: 'user' }));

// 3. Utility function with sensible defaults
function formatCurrency(
    amount,
    currency = 'USD',
    locale = 'en-US',
    options = { minimumFractionDigits: 2 }
) {
    try {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency,
            ...options
        }).format(amount);
    } catch (error) {
        return \`\${currency} \${amount.toFixed(2)}\`;
    }
}

console.log('Default formatting:', formatCurrency(1234.56));
console.log('Euro formatting:', formatCurrency(1234.56, 'EUR', 'de-DE'));

// Common Pitfalls and Gotchas
console.log('\\n=== Common Pitfalls ===');

// 1. Mutable default objects (DANGEROUS!)
function addToList(item, list = []) {
    list.push(item);
    return list;
}

// This is problematic - the same array is reused!
const list1 = addToList('item1');
const list2 = addToList('item2');
console.log('Shared array problem:', list1, list2); // Both have both items!

// Better approach: create new array each time
function addToListSafe(item, list = null) {
    list = list || [];
    return [...list, item];
}

const safeList1 = addToListSafe('item1');
const safeList2 = addToListSafe('item2');
console.log('Safe arrays:', safeList1, safeList2);

// 2. Falsy values vs undefined
function processValue(value = 'default') {
    return \`Processing: \${value}\`;
}

console.log(processValue());        // default
console.log(processValue(undefined)); // default
console.log(processValue(null));    // null (not default!)
console.log(processValue(0));       // 0 (not default!)
console.log(processValue(''));      // empty string (not default!)
console.log(processValue(false));   // false (not default!)

// If you want to handle all falsy values:
function processValueFalsy(value) {
    value = value || 'default';
    return \`Processing: \${value}\`;
}

console.log('Falsy handling:');
console.log(processValueFalsy(null));    // default
console.log(processValueFalsy(0));       // default
console.log(processValueFalsy(''));      // default

// Real-world Examples
console.log('\\n=== Real-world Examples ===');

// 1. React-style component function
function createComponent(type = 'div', props = {}, children = []) {
    return {
        type,
        props: {
            ...props,
            key: props.key || Math.random().toString(36).substring(7)
        },
        children: Array.isArray(children) ? children : [children]
    };
}

console.log('Default component:', createComponent());
console.log('Custom component:', createComponent('button', { 
    onClick: 'handleClick',
    className: 'btn'
}, 'Click me'));

// 2. Database connection function
function connectToDatabase({
    host = 'localhost',
    port = 5432,
    database = 'myapp',
    username = 'user',
    password = '',
    ssl = process?.env?.NODE_ENV === 'production',
    poolSize = 10
} = {}) {
    return {
        connectionString: \`postgres://\${username}:\${password}@\${host}:\${port}/\${database}\`,
        options: { ssl, poolSize },
        status: 'configured'
    };
}

console.log('DB config:', connectToDatabase());
console.log('Custom DB config:', connectToDatabase({
    host: 'db.example.com',
    database: 'production_db',
    ssl: true
}));

// 3. Animation function
function animate(
    element = 'body',
    properties = { opacity: 1 },
    duration = 300,
    easing = 'ease-in-out',
    callback = () => {}
) {
    return {
        target: element,
        animation: {
            properties,
            duration,
            easing
        },
        onComplete: callback,
        start() {
            console.log(\`🎬 Animating \${element} for \${duration}ms\`);
            setTimeout(callback, duration);
        }
    };
}

const fadeIn = animate('.modal', { opacity: 1 }, 500, 'ease-in', 
    () => console.log('Animation completed!'));
fadeIn.start();

console.log('Default Parameters examples completed');`,

  exercises: [
    {
      question: "Create a function that calculates shipping cost with intelligent defaults based on order amount:",
      solution: `function calculateShipping(
  orderAmount,
  shippingType = orderAmount > 100 ? 'free' : 'standard',
  expedited = orderAmount > 500,
  insurance = orderAmount > 200
) {
  const costs = {
    free: 0,
    standard: 9.99,
    expedited: 19.99
  };
  
  let cost = expedited ? costs.expedited : costs[shippingType];
  if (insurance) cost += 5.99;
  
  return {
    orderAmount,
    shippingType: expedited ? 'expedited' : shippingType,
    cost,
    insurance,
    total: orderAmount + cost
  };
}`,
      explanation: "Default parameters can reference other parameters and use complex expressions for intelligent defaults."
    }
  ],

  quiz: [
    {
      question: "What happens when you pass 'null' to a parameter with a default value?",
      options: [
        "The default value is used",
        "null is used (default ignored)",
        "An error is thrown",
        "undefined is used instead"
      ],
      correct: 1,
      explanation: "Default parameters only activate for 'undefined'. null, 0, false, and '' are all valid values that bypass defaults."
    }
  ],

  resources: [
    {
      title: "MDN - Default Parameters",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters"
    }
  ],

  nextModules: ['destructuring', 'rest-spread'],
  prerequisites: ['functions', 'arrow-functions']
};