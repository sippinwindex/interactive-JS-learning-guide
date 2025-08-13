export default {
  title: 'Operators and Expressions',
  duration: '40 min',
  difficulty: 'Beginner',
  overview: 'Master JavaScript operators and expressions. Learn arithmetic, comparison, logical, assignment, and special operators with practical examples.',
  
  keyPoints: [
    'Arithmetic operators for mathematical operations',
    'Comparison operators return boolean values',
    'Logical operators for combining conditions',
    'Assignment operators modify variables',
    'Ternary operator for conditional expressions',
    'Operator precedence affects evaluation order'
  ],

  example: `// Arithmetic Operators
console.log('=== Arithmetic Operators ===');

const a = 10;
const b = 3;

console.log('Addition (a + b):', a + b);          // 13
console.log('Subtraction (a - b):', a - b);       // 7
console.log('Multiplication (a * b):', a * b);    // 30
console.log('Division (a / b):', a / b);          // 3.333...
console.log('Modulus (a % b):', a % b);           // 1 (remainder)
console.log('Exponentiation (a ** b):', a ** b);  // 1000

// Special cases with arithmetic
console.log('\\nSpecial arithmetic cases:');
console.log('Division by zero:', 5 / 0);          // Infinity
console.log('Negative division by zero:', -5 / 0); // -Infinity
console.log('Invalid operation:', 0 / 0);          // NaN
console.log('String + Number:', '5' + 3);          // '53' (string concatenation)
console.log('String - Number:', '5' - 3);          // 2 (numeric subtraction)
console.log('String * Number:', '5' * 3);          // 15 (numeric multiplication)

// Increment and Decrement
console.log('\\n=== Increment and Decrement ===');

let counter = 5;
console.log('Initial counter:', counter);          // 5

// Pre-increment: increment first, then return
console.log('Pre-increment (++counter):', ++counter);  // 6
console.log('Counter after pre-increment:', counter);  // 6

// Post-increment: return first, then increment
console.log('Post-increment (counter++):', counter++); // 6
console.log('Counter after post-increment:', counter); // 7

// Pre-decrement: decrement first, then return
console.log('Pre-decrement (--counter):', --counter);  // 6
console.log('Counter after pre-decrement:', counter);  // 6

// Post-decrement: return first, then decrement
console.log('Post-decrement (counter--):', counter--); // 6
console.log('Counter after post-decrement:', counter); // 5

// Practical example: loop counters
const numbers = [1, 2, 3, 4, 5];
console.log('\\nLoop counter examples:');
for (let i = 0; i < numbers.length; i++) {
    console.log(\`Index \${i}: \${numbers[i]}\`);
}

// Comparison Operators
console.log('\\n=== Comparison Operators ===');

const x = 10;
const y = '10';
const z = 20;

console.log('Equality (==):');
console.log('x == y (10 == "10"):', x == y);       // true (type coercion)
console.log('x == z (10 == 20):', x == z);         // false

console.log('\\nStrict Equality (===):');
console.log('x === y (10 === "10"):', x === y);    // false (different types)
console.log('x === 10:', x === 10);                // true (same type and value)

console.log('\\nInequality (!=):');
console.log('x != y (10 != "10"):', x != y);       // false (type coercion)
console.log('x != z (10 != 20):', x != z);         // true

console.log('\\nStrict Inequality (!==):');
console.log('x !== y (10 !== "10"):', x !== y);    // true (different types)
console.log('x !== 10:', x !== 10);                // false (same type and value)

console.log('\\nRelational operators:');
console.log('x < z (10 < 20):', x < z);            // true
console.log('x > z (10 > 20):', x > z);            // false
console.log('x <= 10:', x <= 10);                  // true
console.log('x >= 10:', x >= 10);                  // true

// String comparisons
console.log('\\nString comparisons:');
console.log('"apple" < "banana":', 'apple' < 'banana');     // true (lexicographic)
console.log('"Apple" < "apple":', 'Apple' < 'apple');       // true (uppercase letters come first)
console.log('"10" < "9":', '10' < '9');                     // true (string comparison, not numeric)

// Logical Operators
console.log('\\n=== Logical Operators ===');

const isLoggedIn = true;
const hasPermission = false;
const isAdmin = true;

console.log('Logical AND (&&):');
console.log('isLoggedIn && hasPermission:', isLoggedIn && hasPermission);   // false
console.log('isLoggedIn && isAdmin:', isLoggedIn && isAdmin);               // true

console.log('\\nLogical OR (||):');
console.log('hasPermission || isAdmin:', hasPermission || isAdmin);         // true
console.log('false || false:', false || false);                            // false

console.log('\\nLogical NOT (!):');
console.log('!isLoggedIn:', !isLoggedIn);                                   // false
console.log('!hasPermission:', !hasPermission);                             // true
console.log('!!isLoggedIn:', !!isLoggedIn);                                 // true (double negation)

// Short-circuit evaluation
console.log('\\nShort-circuit evaluation:');
console.log('true || console.log("This won\\'t run")');                     // true (second part not evaluated)
console.log('false && console.log("This won\\'t run either")');             // false (second part not evaluated)

// Practical examples
const user = { name: 'Alice', role: 'admin' };
const canEdit = user && user.role === 'admin';
console.log('Can edit:', canEdit);

const defaultName = user.name || 'Guest';
console.log('Default name:', defaultName);

// Nullish Coalescing (??) - ES2020
console.log('\\nNullish coalescing (??):');
const nullValue = null;
const undefinedValue = undefined;
const zeroValue = 0;
const emptyString = '';

console.log('null ?? "default":', nullValue ?? 'default');           // 'default'
console.log('undefined ?? "default":', undefinedValue ?? 'default'); // 'default'
console.log('0 ?? "default":', zeroValue ?? 'default');              // 0 (not null/undefined)
console.log('"" ?? "default":', emptyString ?? 'default');           // '' (not null/undefined)

// Compare with ||
console.log('\\nCompare ?? with ||:');
console.log('0 || "default":', zeroValue || 'default');              // 'default' (0 is falsy)
console.log('0 ?? "default":', zeroValue ?? 'default');              // 0 (0 is not null/undefined)

// Assignment Operators
console.log('\\n=== Assignment Operators ===');

let num = 10;
console.log('Initial value:', num);

num += 5;    // num = num + 5
console.log('After += 5:', num);      // 15

num -= 3;    // num = num - 3
console.log('After -= 3:', num);      // 12

num *= 2;    // num = num * 2
console.log('After *= 2:', num);      // 24

num /= 4;    // num = num / 4
console.log('After /= 4:', num);      // 6

num %= 4;    // num = num % 4
console.log('After %= 4:', num);      // 2

num **= 3;   // num = num ** 3
console.log('After **= 3:', num);     // 8

// Logical assignment operators (ES2021)
console.log('\\nLogical assignment operators:');
let config = { theme: 'dark' };

config.debug ||= true;     // config.debug = config.debug || true
console.log('After ||= true:', config);

config.theme &&= 'light';  // config.theme = config.theme && 'light'
console.log('After &&= "light":', config);

config.newProp ??= 'default';  // config.newProp = config.newProp ?? 'default'
console.log('After ??= "default":', config);

// Ternary Operator (Conditional Operator)
console.log('\\n=== Ternary Operator ===');

const age = 20;
const status = age >= 18 ? 'adult' : 'minor';
console.log(\`Age \${age} is \${status}\`);

// Nested ternary (use sparingly)
const grade = 85;
const letterGrade = grade >= 90 ? 'A' : 
                   grade >= 80 ? 'B' : 
                   grade >= 70 ? 'C' : 
                   grade >= 60 ? 'D' : 'F';
console.log(\`Grade \${grade} is \${letterGrade}\`);

// Ternary in function calls
function greetUser(name, isVIP) {
    console.log(\`Hello \${name}\${isVIP ? ', welcome to VIP section!' : '!'}\`);
}

greetUser('Alice', true);
greetUser('Bob', false);

// Type Operators
console.log('\\n=== Type Operators ===');

const str = 'Hello';
const arr = [1, 2, 3];
const obj = { name: 'test' };
const date = new Date();

console.log('typeof operations:');
console.log('typeof str:', typeof str);           // 'string'
console.log('typeof 42:', typeof 42);             // 'number'
console.log('typeof true:', typeof true);         // 'boolean'
console.log('typeof undefined:', typeof undefined); // 'undefined'
console.log('typeof null:', typeof null);         // 'object' (JavaScript quirk)
console.log('typeof arr:', typeof arr);           // 'object'
console.log('typeof obj:', typeof obj);           // 'object'

console.log('\\ninstanceof operations:');
console.log('arr instanceof Array:', arr instanceof Array);     // true
console.log('date instanceof Date:', date instanceof Date);     // true
console.log('obj instanceof Object:', obj instanceof Object);   // true
console.log('str instanceof String:', str instanceof String);   // false (primitive)

// in operator
console.log('\\nin operator:');
console.log('"name" in obj:', 'name' in obj);                   // true
console.log('"age" in obj:', 'age' in obj);                     // false
console.log('0 in arr:', 0 in arr);                             // true (index exists)
console.log('5 in arr:', 5 in arr);                             // false (index doesn't exist)

// Bitwise Operators
console.log('\\n=== Bitwise Operators ===');

const bit1 = 5;  // 101 in binary
const bit2 = 3;  // 011 in binary

console.log('Bitwise AND (bit1 & bit2):', bit1 & bit2);         // 1 (001)
console.log('Bitwise OR (bit1 | bit2):', bit1 | bit2);          // 7 (111)
console.log('Bitwise XOR (bit1 ^ bit2):', bit1 ^ bit2);         // 6 (110)
console.log('Bitwise NOT (~bit1):', ~bit1);                     // -6 (two's complement)
console.log('Left shift (bit1 << 1):', bit1 << 1);              // 10 (1010)
console.log('Right shift (bit1 >> 1):', bit1 >> 1);             // 2 (10)
console.log('Unsigned right shift (bit1 >>> 1):', bit1 >>> 1);  // 2 (10)

// Practical bitwise usage
console.log('\\nPractical bitwise examples:');
// Check if number is even/odd
console.log('5 is odd:', (5 & 1) === 1);        // true
console.log('4 is even:', (4 & 1) === 0);       // true

// Multiply/divide by powers of 2
console.log('5 * 4 using shift:', 5 << 2);      // 20 (multiply by 2^2)
console.log('20 / 4 using shift:', 20 >> 2);    // 5 (divide by 2^2)

// Optional Chaining (?.) - ES2020
console.log('\\n=== Optional Chaining ===');

const userProfile = {
    name: 'Alice',
    address: {
        street: '123 Main St',
        city: 'New York'
    },
    getEmail: function() {
        return 'alice@example.com';
    }
};

console.log('Normal property access:', userProfile.name);
console.log('Nested property access:', userProfile.address?.street);
console.log('Non-existent property:', userProfile.address?.zipcode);  // undefined
console.log('Deep nesting (safe):', userProfile.social?.twitter?.handle); // undefined

// Optional chaining with arrays
const users = [
    { name: 'Alice', contacts: ['email', 'phone'] },
    { name: 'Bob' }
];

console.log('Array optional chaining:');
console.log('First user contacts:', users[0]?.contacts?.[0]);  // 'email'
console.log('Second user contacts:', users[1]?.contacts?.[0]); // undefined

// Optional chaining with function calls
console.log('Function optional chaining:');
console.log('Call existing method:', userProfile.getEmail?.());     // 'alice@example.com'
console.log('Call non-existent method:', userProfile.getPhone?.()); // undefined

// Operator Precedence
console.log('\\n=== Operator Precedence ===');

// Precedence affects evaluation order
console.log('2 + 3 * 4:', 2 + 3 * 4);           // 14 (not 20)
console.log('(2 + 3) * 4:', (2 + 3) * 4);       // 20

console.log('10 - 5 - 2:', 10 - 5 - 2);         // 3 (left to right)
console.log('2 ** 3 ** 2:', 2 ** 3 ** 2);       // 512 (right to left)

console.log('true || false && false:', true || false && false);   // true
console.log('(true || false) && false:', (true || false) && false); // false

// Complex expression
const result = 2 + 3 * 4 > 10 && true || false;
console.log('Complex expression result:', result);  // true

// Breaking down the evaluation:
// 1. 3 * 4 = 12
// 2. 2 + 12 = 14
// 3. 14 > 10 = true
// 4. true && true = true
// 5. true || false = true

// Expression vs Statement
console.log('\\n=== Expressions vs Statements ===');

// Expressions evaluate to a value
const expressionResult = 5 + 3;  // 5 + 3 is an expression
console.log('Expression result:', expressionResult);

// Statements perform actions
if (true) {  // if statement
    console.log('This is a statement');
}

// Function expressions vs function statements
const funcExpression = function() { return 'expression'; };  // Expression
function funcStatement() { return 'statement'; }            // Statement

console.log('Function expression result:', funcExpression());
console.log('Function statement result:', funcStatement());

// Comma Operator
console.log('\\n=== Comma Operator ===');

let commaResult = (console.log('First expression'), console.log('Second expression'), 42);
console.log('Comma operator result:', commaResult);  // 42 (last expression)

// Practical use in for loops
console.log('\\nComma operator in for loop:');
for (let i = 0, j = 10; i < 5; i++, j--) {
    console.log(\`i: \${i}, j: \${j}\`);
}

// Real-world Examples
console.log('\\n=== Real-world Examples ===');

// 1. Form validation
function validateForm(email, password) {
    const isEmailValid = email && email.includes('@');
    const isPasswordValid = password && password.length >= 8;
    
    return isEmailValid && isPasswordValid;
}

console.log('Form validation (valid):', validateForm('user@example.com', 'password123'));
console.log('Form validation (invalid):', validateForm('invalid-email', '123'));

// 2. Default values and configuration
function createUser(name, options = {}) {
    const user = {
        name: name || 'Anonymous',
        age: options.age ?? 0,
        isActive: options.isActive !== false,  // Default to true unless explicitly false
        role: options.role || 'user',
        preferences: {
            theme: options.theme || 'light',
            notifications: options.notifications ?? true
        }
    };
    
    return user;
}

console.log('User with defaults:', createUser('Alice'));
console.log('User with options:', createUser('Bob', {
    age: 25,
    isActive: false,
    theme: 'dark',
    notifications: false
}));

// 3. Conditional rendering logic
function renderUserStatus(user) {
    const statusIcon = user.isOnline ? '🟢' : '🔴';
    const statusText = user.isOnline ? 'Online' : 'Offline';
    const lastSeen = user.isOnline ? '' : \` (last seen \${user.lastSeen})\`;
    
    return \`\${statusIcon} \${user.name} - \${statusText}\${lastSeen}\`;
}

console.log('User status:', renderUserStatus({
    name: 'Alice',
    isOnline: false,
    lastSeen: '2 hours ago'
}));

// 4. Shopping cart calculations
function calculateCartTotal(items, discountPercent = 0, taxPercent = 8) {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = subtotal * (discountPercent / 100);
    const discountedTotal = subtotal - discountAmount;
    const taxAmount = discountedTotal * (taxPercent / 100);
    const finalTotal = discountedTotal + taxAmount;
    
    return {
        subtotal: Math.round(subtotal * 100) / 100,
        discount: Math.round(discountAmount * 100) / 100,
        tax: Math.round(taxAmount * 100) / 100,
        total: Math.round(finalTotal * 100) / 100
    };
}

const cartItems = [
    { name: 'Laptop', price: 999.99, quantity: 1 },
    { name: 'Mouse', price: 24.99, quantity: 2 }
];

console.log('Cart total:', calculateCartTotal(cartItems, 10, 8.5));

// 5. Permission checking system
function checkPermissions(user, action, resource) {
    const isOwner = user.id === resource?.ownerId;
    const isAdmin = user.role === 'admin';
    const hasSuperUser = user.permissions?.includes('super_user');
    const hasSpecificPermission = user.permissions?.includes(\`\${action}_\${resource?.type}\`);
    
    // Complex permission logic using logical operators
    return isAdmin || hasSuperUser || (isOwner && action !== 'delete') || hasSpecificPermission;
}

const testUser = {
    id: 1,
    role: 'user',
    permissions: ['read_post', 'write_post']
};

const testResource = {
    type: 'post',
    ownerId: 1,
    title: 'Test Post'
};

console.log('Can read:', checkPermissions(testUser, 'read', testResource));
console.log('Can delete:', checkPermissions(testUser, 'delete', testResource));

// 6. API response handling
function handleApiResponse(response) {
    const isSuccess = response?.status >= 200 && response?.status < 300;
    const hasData = response?.data != null;
    const errorMessage = response?.error?.message || 'Unknown error';
    
    if (isSuccess && hasData) {
        return { success: true, data: response.data };
    } else if (isSuccess && !hasData) {
        return { success: true, data: null, message: 'No data returned' };
    } else {
        return { success: false, error: errorMessage };
    }
}

console.log('API Success:', handleApiResponse({
    status: 200,
    data: { users: ['Alice', 'Bob'] }
}));

console.log('API Error:', handleApiResponse({
    status: 500,
    error: { message: 'Server error' }
}));

// 7. Date and time calculations
function formatTimeAgo(timestamp) {
    const now = Date.now();
    const diffMs = now - timestamp;
    const diffSeconds = Math.floor(diffMs / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    
    return diffDays > 0 ? \`\${diffDays} day\${diffDays === 1 ? '' : 's'} ago\` :
           diffHours > 0 ? \`\${diffHours} hour\${diffHours === 1 ? '' : 's'} ago\` :
           diffMinutes > 0 ? \`\${diffMinutes} minute\${diffMinutes === 1 ? '' : 's'} ago\` :
           'Just now';
}

const oneHourAgo = Date.now() - (60 * 60 * 1000);
const twoDaysAgo = Date.now() - (2 * 24 * 60 * 60 * 1000);

console.log('Time ago (1 hour):', formatTimeAgo(oneHourAgo));
console.log('Time ago (2 days):', formatTimeAgo(twoDaysAgo));

// Common Pitfalls and Best Practices
console.log('\\n=== Common Pitfalls ===');

// 1. Type coercion surprises
console.log('Type coercion examples:');
console.log('[] == false:', [] == false);           // true (empty array converts to 0)
console.log('[] === false:', [] === false);         // false (strict comparison)
console.log('"0" == false:', '0' == false);         // true (string "0" converts to 0)
console.log('"0" === false:', '0' === false);       // false (strict comparison)
console.log('null == undefined:', null == undefined); // true (special case)
console.log('null === undefined:', null === undefined); // false (different types)

// 2. Floating point precision
console.log('\\nFloating point precision:');
console.log('0.1 + 0.2 === 0.3:', 0.1 + 0.2 === 0.3);     // false!
console.log('0.1 + 0.2:', 0.1 + 0.2);                      // 0.30000000000000004

// Solution: Use appropriate precision
function isEqual(a, b, precision = 0.0001) {
    return Math.abs(a - b) < precision;
}

console.log('Using precision check:', isEqual(0.1 + 0.2, 0.3));  // true

// 3. Assignment vs comparison
let assignment = 5;
if (assignment = 10) {  // Assignment, not comparison!
    console.log('This will always run, assignment is:', assignment);  // 10
}

// Correct comparison
if (assignment === 10) {
    console.log('Correct comparison');
}

// 4. Truthy and falsy values
console.log('\\nTruthy and falsy values:');
const falsyValues = [false, 0, -0, 0n, '', null, undefined, NaN];
const truthyValues = [true, 1, -1, 'hello', [], {}, function() {}];

console.log('Falsy values:');
falsyValues.forEach(value => {
    console.log(\`  \${value} (\${typeof value}) is falsy: \${!value}\`);
});

console.log('\\nTruthy values:');
truthyValues.forEach(value => {
    console.log(\`  \${value} (\${typeof value}) is truthy: \${!!value}\`);
});

// Performance Considerations
console.log('\\n=== Performance Considerations ===');

// Benchmark different comparison methods
function benchmarkComparisons() {
    const iterations = 1000000;
    const testValue = 'test';
    
    // Loose equality
    console.time('Loose equality (==)');
    for (let i = 0; i < iterations; i++) {
        testValue == 'test';
    }
    console.timeEnd('Loose equality (==)');
    
    // Strict equality
    console.time('Strict equality (===)');
    for (let i = 0; i < iterations; i++) {
        testValue === 'test';
    }
    console.timeEnd('Strict equality (===)');
    
    // typeof check
    console.time('typeof check');
    for (let i = 0; i < iterations; i++) {
        typeof testValue === 'string';
    }
    console.timeEnd('typeof check');
}

benchmarkComparisons();

// Operator shortcuts for better performance
console.log('\\nPerformance shortcuts:');

// Bitwise operations for integer math
console.log('Math.floor vs bitwise:');
console.time('Math.floor');
for (let i = 0; i < 100000; i++) {
    Math.floor(Math.random() * 100);
}
console.timeEnd('Math.floor');

console.time('Bitwise floor');
for (let i = 0; i < 100000; i++) {
    ~~(Math.random() * 100);  // Bitwise NOT NOT for floor
}
console.timeEnd('Bitwise floor');

// Practical Operator Combinations
console.log('\\n=== Practical Operator Combinations ===');

// 1. Safe property access with fallbacks
function getUserDisplayName(user) {
    return user?.profile?.displayName ?? 
           user?.profile?.firstName + ' ' + user?.profile?.lastName ??
           user?.username ?? 
           user?.email?.split('@')[0] ?? 
           'Anonymous User';
}

console.log('Display name test:', getUserDisplayName({
    email: 'john.doe@example.com'
}));

// 2. Configuration merging
function mergeConfig(defaultConfig, userConfig) {
    return {
        theme: userConfig.theme ?? defaultConfig.theme,
        language: userConfig.language ?? defaultConfig.language,
        debug: userConfig.debug !== undefined ? userConfig.debug : defaultConfig.debug,
        features: {
            ...defaultConfig.features,
            ...userConfig.features
        }
    };
}

const defaultConfig = {
    theme: 'light',
    language: 'en',
    debug: false,
    features: { analytics: true, chat: false }
};

const userConfig = {
    theme: 'dark',
    features: { chat: true }
};

console.log('Merged config:', mergeConfig(defaultConfig, userConfig));

// 3. Conditional execution patterns
function processData(data, options = {}) {
    // Guard clauses using logical operators
    !data && console.log('No data provided');
    options.validate && validateData(data);
    options.transform && (data = transformData(data));
    options.cache && cacheData(data);
    
    return data;
    
    function validateData(d) { console.log('Validating data...'); }
    function transformData(d) { console.log('Transforming data...'); return d; }
    function cacheData(d) { console.log('Caching data...'); }
}

processData('test data', { validate: true, cache: true });

// Best Practices Summary
console.log('\\n=== Operator Best Practices ===');
console.log('✅ Use === and !== for comparisons (avoid type coercion)');
console.log('✅ Use ?? for null/undefined checks, || for falsy checks');
console.log('✅ Use optional chaining (?.) for safe property access');
console.log('✅ Understand operator precedence, use parentheses for clarity');
console.log('✅ Use ternary operator for simple conditional assignments');
console.log('✅ Be aware of floating-point precision issues');
console.log('✅ Use logical assignment operators (||=, &&=, ??=) for cleaner code');
console.log('⚠️  Avoid assignment in conditions (use === not =)');
console.log('⚠️  Be careful with type coercion in == comparisons');
console.log("⚠️  Don't overuse nested ternary operators");`,

  exercises: [
    {
      question: "Create a function that validates user input using various operators and returns detailed feedback:",
      solution: `function validateUserInput(input) {
  const result = {
    isValid: true,
    errors: [],
    warnings: []
  };
  
  // Check if input exists and is not empty
  if (!input?.trim()) {
    result.errors.push('Input is required');
    result.isValid = false;
    return result;
  }
  
  const value = input.trim();
  
  // Length validation using comparison operators
  if (value.length < 3) {
    result.errors.push('Input must be at least 3 characters');
    result.isValid = false;
  } else if (value.length > 50) {
    result.errors.push('Input must be no more than 50 characters');
    result.isValid = false;
  }
  
  // Content validation using logical operators
  const hasNumbers = /\\d/.test(value);
  const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  const isAllCaps = value === value.toUpperCase() && value !== value.toLowerCase();
  
  // Warnings using ternary and logical operators
  hasNumbers && result.warnings.push('Consider avoiding numbers for better readability');
  hasSpecialChars && result.warnings.push('Special characters detected');
  isAllCaps && result.warnings.push('All caps text may appear aggressive');
  
  // Final validation using compound conditions
  const hasValidLength = value.length >= 3 && value.length <= 50;
  const hasValidContent = !hasSpecialChars || result.warnings.length <= 2;
  
  result.isValid = result.isValid && hasValidLength && hasValidContent;
  result.score = result.isValid ? (result.warnings.length === 0 ? 100 : 85) : 0;
  
  return result;
}`,
      explanation: "This function demonstrates practical use of comparison, logical, ternary, and nullish coalescing operators for comprehensive input validation."
    }
  ],

  quiz: [
    {
      question: "What is the result of: 0 || null ?? 'default'?",
      options: [
        "'default'",
        "null",
        "0", 
        "undefined"
      ],
      correct: 2,
      explanation: "The || operator evaluates first: 0 || null returns null (since 0 is falsy). Then null ?? 'default' returns 'default'. However, due to operator precedence, this is actually parsed as (0 || null) ?? 'default', but since || has higher precedence, the result is 0."
    }
  ],

  resources: [
    {
      title: "MDN - Expressions and Operators",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators"
    },
    {
      title: "MDN - Operator Precedence",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence"
    }
  ],

  nextModules: ['control-flow', 'functions'],
  prerequisites: ['variables', 'data-types']
};