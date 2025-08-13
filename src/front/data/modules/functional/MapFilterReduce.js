// src/front/data/modules/functional/MapFilterReduce.js
export default {
  title: 'Map, Filter, and Reduce',
  duration: '40 min',
  difficulty: 'Intermediate',
  overview: 'Master the essential functional programming array methods. Learn to transform, filter, and aggregate data with map, filter, reduce, and related methods.',
  
  keyPoints: [
    'map() transforms each element and returns new array',
    'filter() selects elements based on conditions',
    'reduce() aggregates array into single value',
    'Methods can be chained for complex operations',
    'forEach() for side effects, not transformation',
    'Other useful methods: find, some, every, flatMap'
  ],

  example: `// Array.map() - Transform elements
console.log('=== Array.map() - Transform Elements ===');

const numbers = [1, 2, 3, 4, 5];

// Basic transformation
const doubled = numbers.map(num => num * 2);
console.log('Doubled:', doubled); // [2, 4, 6, 8, 10]

// Transform objects
const users = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 },
    { id: 3, name: 'Charlie', age: 35 }
];

const userNames = users.map(user => user.name);
console.log('User names:', userNames); // ['Alice', 'Bob', 'Charlie']

// Create new objects with transformations
const usersWithStatus = users.map(user => ({
    ...user,
    status: user.age >= 30 ? 'senior' : 'junior',
    displayName: user.name.toUpperCase()
}));

console.log('Users with status:', usersWithStatus);

// Map with index
const numbersWithIndex = numbers.map((num, index) => ({
    value: num,
    index,
    isEven: num % 2 === 0
}));

console.log('Numbers with metadata:', numbersWithIndex);

// Complex transformations
const products = [
    { name: 'Laptop', price: 999, category: 'Electronics' },
    { name: 'Shirt', price: 29, category: 'Clothing' },
    { name: 'Phone', price: 699, category: 'Electronics' }
];

const productsWithTax = products.map(product => ({
    ...product,
    priceWithTax: product.price * 1.08,
    displayPrice: \`$\${product.price.toFixed(2)}\`,
    slug: product.name.toLowerCase().replace(/\\s+/g, '-')
}));

console.log('Products with tax:', productsWithTax);

// Array.filter() - Select elements
console.log('\\n=== Array.filter() - Select Elements ===');

// Basic filtering
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log('Even numbers:', evenNumbers); // [2, 4]

const adults = users.filter(user => user.age >= 30);
console.log('Adults:', adults);

// Complex filtering
const expensiveElectronics = products.filter(product => 
    product.category === 'Electronics' && product.price > 500
);
console.log('Expensive electronics:', expensiveElectronics);

// Filter with multiple conditions
const premiumUsers = users.filter(user => {
    const hasLongName = user.name.length > 5;
    const isAdult = user.age >= 30;
    return hasLongName && isAdult;
});
console.log('Premium users:', premiumUsers);

// Filter by object property existence
const dataWithOptionalFields = [
    { id: 1, name: 'Item 1', description: 'Has description' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 3', description: 'Also has description' }
];

const itemsWithDescription = dataWithOptionalFields.filter(item => 
    item.description && item.description.length > 0
);
console.log('Items with description:', itemsWithDescription);

// Array.reduce() - Aggregate data
console.log('\\n=== Array.reduce() - Aggregate Data ===');

// Basic sum
const sum = numbers.reduce((acc, num) => acc + num, 0);
console.log('Sum:', sum); // 15

// Product of all numbers
const product = numbers.reduce((acc, num) => acc * num, 1);
console.log('Product:', product); // 120

// Find maximum
const max = numbers.reduce((max, num) => num > max ? num : max, numbers[0]);
console.log('Maximum:', max); // 5

// Count occurrences
const fruits = ['apple', 'banana', 'apple', 'orange', 'banana', 'apple'];
const fruitCount = fruits.reduce((count, fruit) => {
    count[fruit] = (count[fruit] || 0) + 1;
    return count;
}, {});
console.log('Fruit count:', fruitCount);

// Group by property
const usersByAge = users.reduce((groups, user) => {
    const ageGroup = user.age >= 30 ? 'senior' : 'junior';
    if (!groups[ageGroup]) {
        groups[ageGroup] = [];
    }
    groups[ageGroup].push(user);
    return groups;
}, {});
console.log('Users by age group:', usersByAge);

// Calculate total price
const totalPrice = products.reduce((total, product) => total + product.price, 0);
console.log('Total price:', totalPrice);

// Build complex object
const userStats = users.reduce((stats, user) => {
    return {
        totalUsers: stats.totalUsers + 1,
        totalAge: stats.totalAge + user.age,
        averageAge: (stats.totalAge + user.age) / (stats.totalUsers + 1),
        names: [...stats.names, user.name]
    };
}, { totalUsers: 0, totalAge: 0, averageAge: 0, names: [] });

console.log('User statistics:', userStats);

// Method Chaining
console.log('\\n=== Method Chaining ===');

// Chain map, filter, reduce
const result = numbers
    .map(num => num * 2)           // [2, 4, 6, 8, 10]
    .filter(num => num > 5)        // [6, 8, 10]
    .reduce((sum, num) => sum + num, 0); // 24

console.log('Chained result:', result);

// Complex chaining with objects
const processedUsers = users
    .filter(user => user.age >= 25)
    .map(user => ({
        ...user,
        category: user.age >= 30 ? 'senior' : 'junior'
    }))
    .reduce((categories, user) => {
        if (!categories[user.category]) {
            categories[user.category] = [];
        }
        categories[user.category].push(user.name);
        return categories;
    }, {});

console.log('Processed users:', processedUsers);

// Real-world example: Sales data analysis
const salesData = [
    { product: 'Laptop', amount: 1200, month: 'Jan', salesperson: 'Alice' },
    { product: 'Phone', amount: 800, month: 'Jan', salesperson: 'Bob' },
    { product: 'Tablet', amount: 600, month: 'Feb', salesperson: 'Alice' },
    { product: 'Laptop', amount: 1200, month: 'Feb', salesperson: 'Charlie' },
    { product: 'Phone', amount: 800, month: 'Mar', salesperson: 'Alice' }
];

const salesAnalysis = salesData
    .filter(sale => sale.amount >= 800)  // High-value sales only
    .map(sale => ({
        ...sale,
        commission: sale.amount * 0.1,
        quarter: sale.month === 'Jan' ? 'Q1' : sale.month === 'Feb' ? 'Q1' : 'Q1'
    }))
    .reduce((analysis, sale) => {
        // Group by salesperson
        if (!analysis[sale.salesperson]) {
            analysis[sale.salesperson] = {
                totalSales: 0,
                totalCommission: 0,
                salesCount: 0
            };
        }
        
        analysis[sale.salesperson].totalSales += sale.amount;
        analysis[sale.salesperson].totalCommission += sale.commission;
        analysis[sale.salesperson].salesCount += 1;
        
        return analysis;
    }, {});

console.log('Sales analysis:', salesAnalysis);

// Other Useful Array Methods
console.log('\\n=== Other Useful Array Methods ===');

// Array.find() - Find first matching element
const firstAdult = users.find(user => user.age >= 30);
console.log('First adult:', firstAdult);

// Array.findIndex() - Find index of first match
const firstAdultIndex = users.findIndex(user => user.age >= 30);
console.log('First adult index:', firstAdultIndex);

// Array.some() - Check if any element matches
const hasAdults = users.some(user => user.age >= 30);
console.log('Has adults:', hasAdults);

// Array.every() - Check if all elements match
const allAdults = users.every(user => user.age >= 18);
console.log('All adults:', allAdults);

// Array.includes() - Check if value exists
const hasAlice = users.map(u => u.name).includes('Alice');
console.log('Has Alice:', hasAlice);

// Array.flatMap() - Map then flatten
const userHobbies = [
    { name: 'Alice', hobbies: ['reading', 'gaming'] },
    { name: 'Bob', hobbies: ['cooking', 'hiking'] },
    { name: 'Charlie', hobbies: ['photography'] }
];

const allHobbies = userHobbies.flatMap(user => user.hobbies);
console.log('All hobbies:', allHobbies);

// Complex flatMap example
const userTags = userHobbies.flatMap(user => 
    user.hobbies.map(hobby => ({ name: user.name, hobby }))
);
console.log('User tags:', userTags);

// forEach vs map (side effects vs transformation)
console.log('\\n=== forEach vs map ===');

// ❌ Don't use map for side effects
const badExample = numbers.map(num => {
    console.log('Processing:', num); // Side effect in map
    return num * 2;
});

// ✅ Use forEach for side effects
numbers.forEach(num => {
    console.log('Processing:', num); // Correct use of forEach
});

// ✅ Use map for transformation
const goodExample = numbers.map(num => num * 2);

// Advanced Patterns
console.log('\\n=== Advanced Patterns ===');

// 1. Conditional transformations
const conditionalTransform = numbers.map(num => {
    if (num % 2 === 0) {
        return { value: num, type: 'even', doubled: num * 2 };
    } else {
        return { value: num, type: 'odd', squared: num * num };
    }
});
console.log('Conditional transform:', conditionalTransform);

// 2. Multi-step processing pipeline
function createProcessingPipeline(...operations) {
    return function(data) {
        return operations.reduce((result, operation) => operation(result), data);
    };
}

const addTax = products => products.map(p => ({ ...p, priceWithTax: p.price * 1.08 }));
const filterExpensive = products => products.filter(p => p.price > 100);
const sortByPrice = products => [...products].sort((a, b) => b.price - a.price);

const processingPipeline = createProcessingPipeline(
    addTax,
    filterExpensive,
    sortByPrice
);

const processedProducts = processingPipeline(products);
console.log('Pipeline result:', processedProducts);

// 3. Reducer composition
const createReducer = (initialValue, reducerFn) => {
    return (array) => array.reduce(reducerFn, initialValue);
};

const sumReducer = createReducer(0, (sum, num) => sum + num);
const productReducer = createReducer(1, (product, num) => product * num);
const countReducer = createReducer(0, (count) => count + 1);

console.log('Sum using reducer:', sumReducer(numbers));
console.log('Product using reducer:', productReducer(numbers));
console.log('Count using reducer:', countReducer(numbers));

// 4. Grouping utility
function groupBy(array, keyFn) {
    return array.reduce((groups, item) => {
        const key = typeof keyFn === 'function' ? keyFn(item) : item[keyFn];
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(item);
        return groups;
    }, {});
}

const productsByCategory = groupBy(products, 'category');
console.log('Products by category:', productsByCategory);

const usersByAgeGroup = groupBy(users, user => user.age >= 30 ? 'senior' : 'junior');
console.log('Users by age group:', usersByAgeGroup);

// 5. Data transformation utility
function transformData(data, transformations) {
    return data.map(item => {
        const transformed = { ...item };
        
        Object.entries(transformations).forEach(([key, transform]) => {
            if (typeof transform === 'function') {
                transformed[key] = transform(item[key], item);
            } else {
                transformed[key] = transform;
            }
        });
        
        return transformed;
    });
}

const transformedUsers = transformData(users, {
    displayName: (name) => name.toUpperCase(),
    ageGroup: (age) => age >= 30 ? 'Senior' : 'Junior',
    canVote: (age) => age >= 18,
    status: 'active' // Static value
});

console.log('Transformed users:', transformedUsers);

// Performance Considerations
console.log('\\n=== Performance Considerations ===');

// Large dataset simulation
const largeArray = Array.from({ length: 100000 }, (_, i) => ({
    id: i,
    value: Math.random() * 100,
    category: i % 3 === 0 ? 'A' : i % 3 === 1 ? 'B' : 'C'
}));

console.time('Chain operations');
const chainResult = largeArray
    .filter(item => item.value > 50)
    .map(item => ({ ...item, processed: true }))
    .reduce((count, item) => count + (item.category === 'A' ? 1 : 0), 0);
console.timeEnd('Chain operations');

console.log('Chain result:', chainResult);

// Single pass optimization
console.time('Single pass');
const singlePassResult = largeArray.reduce((acc, item) => {
    if (item.value > 50) {
        if (item.category === 'A') {
            acc.count++;
        }
    }
    return acc;
}, { count: 0 });
console.timeEnd('Single pass');

console.log('Single pass result:', singlePassResult.count);

// Memory efficiency - using iterators for large datasets
function* filterMap(iterable, filterFn, mapFn) {
    for (const item of iterable) {
        if (filterFn(item)) {
            yield mapFn(item);
        }
    }
}

// Usage with generator (memory efficient)
const efficientProcessor = filterMap(
    largeArray,
    item => item.value > 50,
    item => ({ id: item.id, processed: true })
);

// Process first 10 items without loading all into memory
const first10 = [];
const iterator = efficientProcessor[Symbol.iterator]();
for (let i = 0; i < 10; i++) {
    const { value, done } = iterator.next();
    if (done) break;
    first10.push(value);
}

console.log('First 10 processed items:', first10);

// Real-world Examples
console.log('\\n=== Real-world Examples ===');

// 1. E-commerce cart calculation
const cartItems = [
    { id: 1, name: 'Laptop', price: 999, quantity: 1, tax: 0.08 },
    { id: 2, name: 'Mouse', price: 25, quantity: 2, tax: 0.08 },
    { id: 3, name: 'Keyboard', price: 75, quantity: 1, tax: 0.08 }
];

const cartSummary = cartItems
    .map(item => ({
        ...item,
        subtotal: item.price * item.quantity,
        taxAmount: item.price * item.quantity * item.tax
    }))
    .reduce((summary, item) => ({
        items: summary.items + item.quantity,
        subtotal: summary.subtotal + item.subtotal,
        tax: summary.tax + item.taxAmount,
        total: summary.subtotal + summary.tax + item.subtotal + item.taxAmount
    }), { items: 0, subtotal: 0, tax: 0, total: 0 });

console.log('Cart summary:', cartSummary);

// 2. Student grade analysis
const students = [
    { name: 'Alice', grades: [85, 92, 78, 96] },
    { name: 'Bob', grades: [76, 88, 82, 79] },
    { name: 'Charlie', grades: [95, 91, 87, 93] },
    { name: 'Diana', grades: [68, 74, 71, 77] }
];

const gradeAnalysis = students
    .map(student => {
        const average = student.grades.reduce((sum, grade) => sum + grade, 0) / student.grades.length;
        return {
            name: student.name,
            average: Math.round(average * 100) / 100,
            letterGrade: average >= 90 ? 'A' : average >= 80 ? 'B' : average >= 70 ? 'C' : 'D',
            highest: Math.max(...student.grades),
            lowest: Math.min(...student.grades)
        };
    })
    .filter(student => student.average >= 75) // Honor roll
    .sort((a, b) => b.average - a.average);

console.log('Grade analysis (Honor roll):', gradeAnalysis);

// 3. API data processing
const apiUsers = [
    { id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com', age: 28, active: true },
    { id: 2, first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com', age: 32, active: false },
    { id: 3, first_name: 'Bob', last_name: 'Johnson', email: 'bob@example.com', age: 45, active: true }
];

const normalizedUsers = apiUsers
    .filter(user => user.active)
    .map(user => ({
        id: user.id,
        fullName: \`\${user.first_name} \${user.last_name}\`,
        email: user.email,
        age: user.age,
        ageGroup: user.age < 30 ? 'young' : user.age < 50 ? 'middle' : 'senior',
        initials: \`\${user.first_name[0]}\${user.last_name[0]}\`
    }))
    .reduce((groups, user) => {
        const group = user.ageGroup;
        if (!groups[group]) groups[group] = [];
        groups[group].push(user);
        return groups;
    }, {});

console.log('Normalized users by age group:', normalizedUsers);

console.log('\\n=== Summary ===');
console.log('✅ map() - Transform each element');
console.log('✅ filter() - Select elements by condition');
console.log('✅ reduce() - Aggregate to single value');
console.log('✅ Chain methods for complex operations');
console.log('✅ Use find(), some(), every() for specific needs');
console.log('✅ Consider performance for large datasets');
console.log('✅ Use forEach() for side effects, map() for transformation');

console.log('Map, Filter, Reduce examples completed');`,

  exercises: [
    {
      question: "Process an array of orders to find the total revenue from orders over $50 in the last 30 days:",
      solution: `const orders = [
  { id: 1, amount: 75, date: '2023-11-01', status: 'completed' },
  { id: 2, amount: 25, date: '2023-11-15', status: 'completed' },
  { id: 3, amount: 120, date: '2023-11-20', status: 'completed' }
];

const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

const totalRevenue = orders
  .filter(order => 
    order.status === 'completed' && 
    order.amount > 50 && 
    new Date(order.date) >= thirtyDaysAgo
  )
  .reduce((total, order) => total + order.amount, 0);`,
      explanation: "Chain filter() to apply multiple conditions, then reduce() to sum the amounts. This pattern is common for business analytics."
    }
  ],

  quiz: [
    {
      question: "What does Array.reduce() return if the array is empty and no initial value is provided?",
      options: [
        "undefined",
        "null",
        "An empty array",
        "A TypeError is thrown"
      ],
      correct: 3,
      explanation: "Array.reduce() throws a TypeError if called on an empty array without an initial value, since there's no value to return."
    }
  ],

  resources: [
    {
      title: "MDN - Array Methods",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"
    },
    {
      title: "Functional Programming in JavaScript",
      url: "https://eloquentjavascript.net/05_higher_order.html"
    }
  ],

  nextModules: ['higher-order-functions', 'pure-functions'],
  prerequisites: ['arrays', 'functions', 'arrow-functions']
};