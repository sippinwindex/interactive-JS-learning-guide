// src/front/data/modules/es6/TemplateStrings.js
export default {
  title: 'Template Literals',
  duration: '25 min',
  difficulty: 'Beginner',
  overview: 'Master template literals for dynamic string creation. Learn string interpolation, multiline strings, and tagged template literals.',
  
  keyPoints: [
    'Template literals use backticks (`) instead of quotes',
    'String interpolation with ${expression} syntax',
    'Support for multiline strings without escape characters',
    'Tagged template literals for advanced string processing',
    'Expression evaluation inside template literals',
    'Nested template literals are possible'
  ],

  example: `// Basic Template Literals
console.log('=== Basic Template Literals ===');

const name = 'Alice';
const age = 30;

// Traditional string concatenation
const traditionalGreeting = 'Hello, ' + name + '! You are ' + age + ' years old.';
console.log('Traditional:', traditionalGreeting);

// Template literal with interpolation
const templateGreeting = \`Hello, \${name}! You are \${age} years old.\`;
console.log('Template literal:', templateGreeting);

// Expression evaluation
const price = 19.99;
const quantity = 3;
const total = \`Total: $\${(price * quantity).toFixed(2)}\`;
console.log(total);

// Multiline Strings
console.log('\\n=== Multiline Strings ===');

// Traditional multiline (with escape characters)
const traditionalMultiline = 'Line 1\\n' +
                            'Line 2\\n' +
                            'Line 3';
console.log('Traditional multiline:');
console.log(traditionalMultiline);

// Template literal multiline
const templateMultiline = \`Line 1
Line 2
Line 3\`;
console.log('Template multiline:');
console.log(templateMultiline);

// HTML template example
const user = { name: 'Bob', email: 'bob@example.com', isActive: true };

const htmlTemplate = \`
<div class="user-card">
    <h2>\${user.name}</h2>
    <p>Email: \${user.email}</p>
    <p>Status: \${user.isActive ? 'Active' : 'Inactive'}</p>
</div>
\`;

console.log('HTML template:');
console.log(htmlTemplate);

// Complex Expressions
console.log('\\n=== Complex Expressions ===');

const products = [
    { name: 'Laptop', price: 999 },
    { name: 'Mouse', price: 25 },
    { name: 'Keyboard', price: 75 }
];

// Function calls in template literals
function formatPrice(price) {
    return \`$\${price.toFixed(2)}\`;
}

const productList = \`
Products:
\${products.map(product => 
    \`- \${product.name}: \${formatPrice(product.price)}\`
).join('\\n')}
Total: \${formatPrice(products.reduce((sum, p) => sum + p.price, 0))}
\`;

console.log(productList);

// Conditional expressions
const weather = { temperature: 25, condition: 'sunny' };

const weatherReport = \`
Today's weather: \${weather.condition}
Temperature: \${weather.temperature}°C (\${weather.temperature > 20 ? 'Warm' : 'Cool'})
Recommendation: \${weather.condition === 'sunny' ? 'Great day for outdoor activities!' : 'Stay cozy indoors'}
\`;

console.log(weatherReport);

// Nested Template Literals
console.log('\\n=== Nested Template Literals ===');

const customers = [
    { name: 'John', orders: [{ id: 1, total: 50 }, { id: 2, total: 75 }] },
    { name: 'Jane', orders: [{ id: 3, total: 120 }] }
];

const customerReport = \`
Customer Report:
\${customers.map(customer => \`
Customer: \${customer.name}
Orders: \${customer.orders.map(order => 
    \`Order #\${order.id}: $\${order.total}\`
).join(', ')}
Total Spent: $\${customer.orders.reduce((sum, order) => sum + order.total, 0)}
\`).join('\\n')}
\`;

console.log(customerReport);

// Tagged Template Literals
console.log('\\n=== Tagged Template Literals ===');

// Basic tagged template
function highlight(strings, ...values) {
    console.log('Strings:', strings);
    console.log('Values:', values);
    
    return strings.reduce((result, string, i) => {
        const value = values[i] ? \`<mark>\${values[i]}</mark>\` : '';
        return result + string + value;
    }, '');
}

const highlightedText = highlight\`Hello \${name}, you are \${age} years old!\`;
console.log('Highlighted:', highlightedText);

// SQL query builder (simulation)
function sql(strings, ...values) {
    const query = strings.reduce((result, string, i) => {
        const value = values[i];
        let processedValue = '';
        
        if (value !== undefined) {
            if (typeof value === 'string') {
                processedValue = \`'\${value.replace(/'/g, "''")}'\`; // Escape quotes
            } else if (typeof value === 'number') {
                processedValue = value.toString();
            } else if (Array.isArray(value)) {
                processedValue = \`(\${value.map(v => typeof v === 'string' ? \`'\${v}'\` : v).join(', ')})\`;
            }
        }
        
        return result + string + processedValue;
    }, '');
    
    return query.trim();
}

const userId = 123;
const userNames = ['Alice', 'Bob', 'Charlie'];
const minAge = 18;

const query1 = sql\`SELECT * FROM users WHERE id = \${userId}\`;
const query2 = sql\`SELECT * FROM users WHERE name IN \${userNames}\`;
const query3 = sql\`SELECT * FROM users WHERE age >= \${minAge}\`;

console.log('SQL queries:');
console.log(query1);
console.log(query2);
console.log(query3);

// Internationalization helper
function i18n(strings, ...values) {
    // Simulate translation lookup
    const translations = {
        'Hello': 'Hola',
        'years old': 'años'
    };
    
    return strings.reduce((result, string, i) => {
        const translatedString = translations[string.trim()] || string;
        const value = values[i] || '';
        return result + translatedString + value;
    }, '');
}

// Note: This is a simplified example
const spanishGreeting = \`Hola \${name}, you are \${age} años\`;
console.log('Spanish:', spanishGreeting);

// CSS-in-JS style helper
function css(strings, ...values) {
    const styles = strings.reduce((result, string, i) => {
        const value = values[i] || '';
        return result + string + value;
    }, '');
    
    return styles.replace(/\\s+/g, ' ').trim();
}

const primaryColor = '#3498db';
const padding = 16;

const buttonStyles = css\`
    background-color: \${primaryColor};
    padding: \${padding}px;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
\`;

console.log('CSS styles:', buttonStyles);

// Template Literal Utilities
console.log('\\n=== Template Utilities ===');

// Dedent helper for removing common leading whitespace
function dedent(strings, ...values) {
    const fullString = strings.reduce((result, string, i) => {
        return result + string + (values[i] || '');
    }, '');
    
    const lines = fullString.split('\\n');
    
    // Remove first and last empty lines
    while (lines.length && lines[0].trim() === '') lines.shift();
    while (lines.length && lines[lines.length - 1].trim() === '') lines.pop();
    
    if (lines.length === 0) return '';
    
    // Find minimum indentation
    const minIndent = Math.min(
        ...lines
            .filter(line => line.trim() !== '')
            .map(line => line.match(/^\\s*/)[0].length)
    );
    
    // Remove common indentation
    return lines
        .map(line => line.slice(minIndent))
        .join('\\n');
}

const indentedText = dedent\`
    function example() {
        console.log('This is properly indented');
        if (true) {
            console.log('Nested properly too');
        }
    }
\`;

console.log('Dedented text:');
console.log(indentedText);

// Safe HTML helper (XSS prevention)
function safeHtml(strings, ...values) {
    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }
    
    return strings.reduce((result, string, i) => {
        const value = values[i];
        const safeValue = value !== undefined ? escapeHtml(value) : '';
        return result + string + safeValue;
    }, '');
}

const userInput = '<script>alert("XSS")</script>';
const safeHtmlContent = safeHtml\`
<div class="user-content">
    <p>User said: \${userInput}</p>
</div>
\`;

console.log('Safe HTML:');
console.log(safeHtmlContent);

// Practical Examples
console.log('\\n=== Practical Examples ===');

// 1. Email template generator
function generateEmail({ recipient, subject, sender, body }) {
    return \`
From: \${sender}
To: \${recipient}
Subject: \${subject}

Dear \${recipient.split('@')[0]},

\${body}

Best regards,
\${sender}

---
This email was sent automatically. Please do not reply.
    \`.trim();
}

const emailData = {
    recipient: 'john@example.com',
    subject: 'Welcome to our service!',
    sender: 'support@company.com',
    body: 'Thank you for signing up. We\\'re excited to have you on board!'
};

console.log('Generated email:');
console.log(generateEmail(emailData));

// 2. URL builder
function buildUrl(baseUrl, path, params = {}) {
    const queryString = Object.entries(params)
        .filter(([key, value]) => value !== undefined && value !== null)
        .map(([key, value]) => \`\${encodeURIComponent(key)}=\${encodeURIComponent(value)}\`)
        .join('&');
    
    const fullPath = path.startsWith('/') ? path : \`/\${path}\`;
    const separator = queryString ? '?' : '';
    
    return \`\${baseUrl}\${fullPath}\${separator}\${queryString}\`;
}

const apiUrl = buildUrl('https://api.example.com', 'users', {
    page: 1,
    limit: 10,
    search: 'john doe',
    active: true
});

console.log('API URL:', apiUrl);

// 3. Configuration file generator
function generateConfig({ appName, version, environment, features = {} }) {
    const featureFlags = Object.entries(features)
        .map(([feature, enabled]) => \`    \${feature}: \${enabled}\`)
        .join(',\\n');
    
    return \`
# \${appName} Configuration
# Version: \${version}
# Environment: \${environment}

app.name=\${appName}
app.version=\${version}
app.environment=\${environment}

# Feature Flags
\${featureFlags ? \`features {
\${featureFlags}
}\` : '# No feature flags configured'}

# Database Configuration
database.url=\${environment === 'production' ? 'prod-db-url' : 'dev-db-url'}
database.pool.size=\${environment === 'production' ? 20 : 5}
    \`.trim();
}

const config = generateConfig({
    appName: 'MyApp',
    version: '1.2.3',
    environment: 'development',
    features: {
        darkMode: true,
        analytics: false,
        betaFeatures: true
    }
});

console.log('Generated config:');
console.log(config);

// 4. Test case generator
function generateTestCase({ testName, description, setup, action, expected }) {
    return \`
describe('\${testName}', () => {
    it('\${description}', () => {
        // Setup
        \${setup || '// No setup required'}
        
        // Action
        const result = \${action};
        
        // Assert
        expect(result).toBe(\${JSON.stringify(expected)});
    });
});
    \`.trim();
}

const testCase = generateTestCase({
    testName: 'Calculator',
    description: 'should add two numbers correctly',
    setup: 'const calculator = new Calculator();',
    action: 'calculator.add(2, 3)',
    expected: 5
});

console.log('Generated test:');
console.log(testCase);

// Performance Considerations
console.log('\\n=== Performance Tips ===');

// Avoid creating templates in loops when possible
const items = ['a', 'b', 'c', 'd', 'e'];

// Less efficient: creating template in loop
console.time('Template in loop');
const results1 = [];
for (const item of items) {
    results1.push(\`Item: \${item}\`);
}
console.timeEnd('Template in loop');

// More efficient: using map with template
console.time('Map with template');
const results2 = items.map(item => \`Item: \${item}\`);
console.timeEnd('Map with template');

// Most efficient for simple cases: direct concatenation
console.time('Direct concatenation');
const results3 = items.map(item => 'Item: ' + item);
console.timeEnd('Direct concatenation');

console.log('All results are equivalent:', 
    JSON.stringify(results1) === JSON.stringify(results2) && 
    JSON.stringify(results2) === JSON.stringify(results3)
);

console.log('Template literals examples completed');`,

  exercises: [
    {
      question: "Create a function that generates HTML for a product card using template literals:",
      solution: `function createProductCard({ name, price, image, inStock }) {
  return \`
    <div class="product-card \${inStock ? 'in-stock' : 'out-of-stock'}">
      <img src="\${image}" alt="\${name}" />
      <h3>\${name}</h3>
      <p class="price">$\${price.toFixed(2)}</p>
      <p class="stock">\${inStock ? 'In Stock' : 'Out of Stock'}</p>
      <button \${!inStock ? 'disabled' : ''}>
        \${inStock ? 'Add to Cart' : 'Notify When Available'}
      </button>
    </div>
  \`.trim();
}`,
      explanation: "Template literals make HTML generation cleaner with multiline support and expression evaluation."
    }
  ],

  quiz: [
    {
      question: "What is the main advantage of template literals over string concatenation?",
      options: [
        "Faster execution",
        "Better readability and multiline support",
        "Smaller file size",
        "Better browser support"
      ],
      correct: 1,
      explanation: "Template literals provide better readability with string interpolation syntax and native multiline string support."
    }
  ],

  resources: [
    {
      title: "MDN - Template Literals",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals"
    }
  ],

  nextModules: ['destructuring', 'modules'],
  prerequisites: ['strings-numbers', 'arrow-functions']
};