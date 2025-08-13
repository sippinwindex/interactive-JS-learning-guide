// src/front/data/modules/oop/ConstructorFunctions.js
export default {
  title: 'Constructor Functions',
  duration: '35 min',
  difficulty: 'Intermediate',
  overview: 'Learn how to create objects using constructor functions, the foundation of object-oriented programming in JavaScript before ES6 classes.',
  
  keyPoints: [
    'Constructor functions create object instances',
    'Use "new" keyword to invoke constructors',
    '"this" refers to the new instance being created',
    'Properties defined with this.property = value',
    'Methods added to prototype for efficiency',
    'Constructor functions are regular functions called with "new"'
  ],

  example: `// Basic Constructor Function
console.log('=== Basic Constructor Function ===');

// Constructor function convention: PascalCase naming
function Person(name, age, email) {
    // 'this' refers to the new instance being created
    this.name = name;
    this.age = age;
    this.email = email;
    
    // Instance method (not recommended - creates copy for each instance)
    this.greet = function() {
        return \`Hello, I'm \${this.name} and I'm \${this.age} years old.\`;
    };
}

// Creating instances using 'new' keyword
const person1 = new Person('Alice', 30, 'alice@example.com');
const person2 = new Person('Bob', 25, 'bob@example.com');

console.log('Person 1:', person1);
console.log('Person 2:', person2);
console.log('Person 1 greeting:', person1.greet());
console.log('Person 2 greeting:', person2.greet());

// Check instance type
console.log('person1 instanceof Person:', person1 instanceof Person);
console.log('person1.constructor === Person:', person1.constructor === Person);

// What happens without 'new'?
console.log('\\n=== Calling Constructor Without "new" ===');

function Vehicle(type, brand) {
    console.log('this context:', this === globalThis || this === window);
    
    // Without 'new', 'this' refers to global object (undefined in strict mode)
    this.type = type;
    this.brand = brand;
}

// ❌ Wrong way - without 'new'
// Vehicle('car', 'Toyota'); // Would add properties to global object

// ✅ Correct way - with 'new'
const car = new Vehicle('car', 'Toyota');
console.log('Car created:', car);

// Better Constructor with Validation
console.log('\\n=== Constructor with Validation ===');

function User(username, email, age) {
    // Input validation
    if (!username || typeof username !== 'string') {
        throw new Error('Username must be a non-empty string');
    }
    
    if (!email || !email.includes('@')) {
        throw new Error('Valid email is required');
    }
    
    if (age < 0 || age > 150) {
        throw new Error('Age must be between 0 and 150');
    }
    
    // Set properties
    this.username = username;
    this.email = email;
    this.age = age;
    this.createdAt = new Date();
    this.isActive = true;
    
    // Generate unique ID
    this.id = Math.random().toString(36).substring(2, 15);
}

try {
    const user1 = new User('john_doe', 'john@example.com', 28);
    console.log('Valid user created:', user1);
    
    // This will throw an error
    const invalidUser = new User('', 'invalid-email', -5);
} catch (error) {
    console.log('Validation error:', error.message);
}

// Adding Methods to Prototype
console.log('\\n=== Prototype Methods ===');

// ✅ Better approach: Add methods to prototype
Person.prototype.introduce = function() {
    return \`Hi, I'm \${this.name}, \${this.age} years old.\`;
};

Person.prototype.haveBirthday = function() {
    this.age++;
    console.log(\`🎉 \${this.name} is now \${this.age} years old!\`);
};

Person.prototype.updateEmail = function(newEmail) {
    if (newEmail && newEmail.includes('@')) {
        this.email = newEmail;
        console.log(\`📧 \${this.name}'s email updated to \${newEmail}\`);
    } else {
        throw new Error('Invalid email address');
    }
};

// All instances can use prototype methods
console.log('Introduction:', person1.introduce());
console.log('Introduction:', person2.introduce());

person1.haveBirthday();
person2.updateEmail('bob.smith@example.com');

// Adding Properties to Prototype
Person.prototype.species = 'Homo sapiens';
Person.prototype.planet = 'Earth';

console.log('Species from prototype:', person1.species);
console.log('Planet from prototype:', person2.planet);

// Complex Constructor Example
console.log('\\n=== Complex Constructor Example ===');

function BankAccount(accountHolder, initialBalance = 0, accountType = 'checking') {
    // Private-like properties (convention: prefix with _)
    this._accountNumber = 'ACC' + Math.random().toString(36).substring(2, 10).toUpperCase();
    this._balance = initialBalance;
    this._transactions = [];
    
    // Public properties
    this.accountHolder = accountHolder;
    this.accountType = accountType;
    this.createdDate = new Date();
    this.isActive = true;
    
    // Validate initial balance
    if (initialBalance < 0) {
        throw new Error('Initial balance cannot be negative');
    }
    
    // Record initial deposit if any
    if (initialBalance > 0) {
        this._transactions.push({
            type: 'deposit',
            amount: initialBalance,
            date: new Date(),
            description: 'Initial deposit'
        });
    }
}

// Add methods to prototype
BankAccount.prototype.deposit = function(amount, description = 'Deposit') {
    if (amount <= 0) {
        throw new Error('Deposit amount must be positive');
    }
    
    if (!this.isActive) {
        throw new Error('Account is not active');
    }
    
    this._balance += amount;
    this._transactions.push({
        type: 'deposit',
        amount: amount,
        date: new Date(),
        description: description,
        balance: this._balance
    });
    
    console.log(\`💰 Deposited $\${amount}. New balance: $\${this._balance}\`);
    return this._balance;
};

BankAccount.prototype.withdraw = function(amount, description = 'Withdrawal') {
    if (amount <= 0) {
        throw new Error('Withdrawal amount must be positive');
    }
    
    if (!this.isActive) {
        throw new Error('Account is not active');
    }
    
    if (amount > this._balance) {
        throw new Error('Insufficient funds');
    }
    
    this._balance -= amount;
    this._transactions.push({
        type: 'withdrawal',
        amount: amount,
        date: new Date(),
        description: description,
        balance: this._balance
    });
    
    console.log(\`💸 Withdrew $\${amount}. New balance: $\${this._balance}\`);
    return this._balance;
};

BankAccount.prototype.getBalance = function() {
    return this._balance;
};

BankAccount.prototype.getAccountNumber = function() {
    return this._accountNumber;
};

BankAccount.prototype.getTransactionHistory = function() {
    return [...this._transactions]; // Return copy to prevent external modification
};

BankAccount.prototype.getAccountInfo = function() {
    return {
        accountNumber: this._accountNumber,
        accountHolder: this.accountHolder,
        accountType: this.accountType,
        balance: this._balance,
        isActive: this.isActive,
        createdDate: this.createdDate
    };
};

// Using the BankAccount constructor
const account1 = new BankAccount('Alice Johnson', 1000, 'savings');
const account2 = new BankAccount('Bob Smith', 500, 'checking');

console.log('Account 1 info:', account1.getAccountInfo());
console.log('Account 2 info:', account2.getAccountInfo());

// Perform transactions
account1.deposit(250, 'Salary deposit');
account1.withdraw(100, 'ATM withdrawal');
account2.deposit(1000, 'Investment return');

console.log('Account 1 final balance:', account1.getBalance());
console.log('Account 2 transactions:', account2.getTransactionHistory());

// Static Methods (Using Constructor Function)
console.log('\\n=== Static Methods ===');

// Static methods belong to the constructor function itself
BankAccount.validateAccountNumber = function(accountNumber) {
    return typeof accountNumber === 'string' && 
           accountNumber.startsWith('ACC') && 
           accountNumber.length === 11;
};

BankAccount.generateAccountNumber = function() {
    return 'ACC' + Math.random().toString(36).substring(2, 10).toUpperCase();
};

BankAccount.createJointAccount = function(holder1, holder2, initialBalance = 0) {
    const jointAccountHolder = \`\${holder1} & \${holder2}\`;
    return new BankAccount(jointAccountHolder, initialBalance, 'joint');
};

// Using static methods
console.log('Valid account number:', BankAccount.validateAccountNumber('ACC12345678'));
console.log('Generated account number:', BankAccount.generateAccountNumber());

const jointAccount = BankAccount.createJointAccount('John Doe', 'Jane Doe', 2000);
console.log('Joint account:', jointAccount.getAccountInfo());

// Constructor Function Inheritance Pattern
console.log('\\n=== Constructor Inheritance ===');

// Parent constructor
function Animal(name, species) {
    this.name = name;
    this.species = species;
    this.energy = 100;
}

Animal.prototype.eat = function(food) {
    this.energy += 10;
    console.log(\`\${this.name} eats \${food}. Energy: \${this.energy}\`);
};

Animal.prototype.sleep = function() {
    this.energy += 20;
    console.log(\`\${this.name} sleeps. Energy: \${this.energy}\`);
};

Animal.prototype.move = function() {
    this.energy -= 5;
    console.log(\`\${this.name} moves. Energy: \${this.energy}\`);
};

// Child constructor
function Dog(name, breed) {
    // Call parent constructor
    Animal.call(this, name, 'Dog');
    this.breed = breed;
    this.tricks = [];
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Add Dog-specific methods
Dog.prototype.bark = function() {
    this.energy -= 2;
    console.log(\`\${this.name} barks: Woof! Energy: \${this.energy}\`);
};

Dog.prototype.learnTrick = function(trick) {
    this.tricks.push(trick);
    console.log(\`\${this.name} learned: \${trick}\`);
};

Dog.prototype.performTrick = function() {
    if (this.tricks.length === 0) {
        console.log(\`\${this.name} doesn't know any tricks yet.\`);
        return;
    }
    
    const trick = this.tricks[Math.floor(Math.random() * this.tricks.length)];
    this.energy -= 10;
    console.log(\`\${this.name} performs: \${trick}! Energy: \${this.energy}\`);
};

// Override parent method
Dog.prototype.move = function() {
    this.energy -= 3; // Dogs are more efficient at moving
    console.log(\`\${this.name} runs around. Energy: \${this.energy}\`);
};

// Create and use Dog instance
const dog = new Dog('Buddy', 'Golden Retriever');
console.log('Dog created:', dog);

dog.eat('kibble');
dog.bark();
dog.learnTrick('sit');
dog.learnTrick('fetch');
dog.performTrick();
dog.move();
dog.sleep();

// Verify inheritance
console.log('dog instanceof Dog:', dog instanceof Dog);
console.log('dog instanceof Animal:', dog instanceof Animal);

// Factory Function vs Constructor Function
console.log('\\n=== Factory vs Constructor ===');

// Factory function (returns object)
function createPerson(name, age) {
    return {
        name: name,
        age: age,
        greet: function() {
            return \`Hello, I'm \${this.name}\`;
        }
    };
}

// Constructor function (uses 'new')
function PersonConstructor(name, age) {
    this.name = name;
    this.age = age;
}

PersonConstructor.prototype.greet = function() {
    return \`Hello, I'm \${this.name}\`;
};

// Create instances
const factoryPerson = createPerson('Factory Person', 25);
const constructorPerson = new PersonConstructor('Constructor Person', 30);

console.log('Factory person:', factoryPerson);
console.log('Constructor person:', constructorPerson);

// Memory efficiency difference
console.log('Same greet method (factory):', 
    createPerson('A', 20).greet === createPerson('B', 25).greet); // false - different instances

console.log('Same greet method (constructor):', 
    new PersonConstructor('A', 20).greet === new PersonConstructor('B', 25).greet); // true - shared prototype

// Advanced Constructor Patterns
console.log('\\n=== Advanced Patterns ===');

// 1. Mixin pattern
function Flyable(obj) {
    obj.fly = function() {
        console.log(\`\${this.name} is flying!\`);
    };
    obj.land = function() {
        console.log(\`\${this.name} has landed.\`);
    };
    return obj;
}

function Bird(name, wingspan) {
    this.name = name;
    this.wingspan = wingspan;
    this.isFlying = false;
    
    // Apply mixin
    Flyable(this);
}

const eagle = new Bird('Eagle', '7 feet');
eagle.fly();
eagle.land();

// 2. Configuration object pattern
function Database(config) {
    // Default configuration
    const defaults = {
        host: 'localhost',
        port: 5432,
        database: 'myapp',
        username: 'user',
        password: '',
        ssl: false,
        poolSize: 10
    };
    
    // Merge with provided config
    const finalConfig = Object.assign({}, defaults, config);
    
    // Set properties
    Object.keys(finalConfig).forEach(key => {
        this[key] = finalConfig[key];
    });
    
    this.connectionString = \`postgres://\${this.username}:\${this.password}@\${this.host}:\${this.port}/\${this.database}\`;
    this.isConnected = false;
}

Database.prototype.connect = function() {
    console.log(\`Connecting to database at \${this.host}:\${this.port}\`);
    this.isConnected = true;
    return Promise.resolve('Connected');
};

Database.prototype.disconnect = function() {
    console.log('Disconnecting from database');
    this.isConnected = false;
};

// Usage with configuration
const db1 = new Database({ host: 'remote-server', database: 'production' });
const db2 = new Database({ port: 3306, ssl: true });

console.log('DB1 config:', { host: db1.host, database: db1.database, port: db1.port });
console.log('DB2 config:', { host: db2.host, ssl: db2.ssl, port: db2.port });

// 3. Builder pattern with constructor
function QueryBuilder(table) {
    this.query = {
        action: '',
        table: table,
        fields: [],
        conditions: [],
        orderBy: [],
        limit: null
    };
}

QueryBuilder.prototype.select = function(fields) {
    this.query.action = 'SELECT';
    this.query.fields = Array.isArray(fields) ? fields : [fields];
    return this; // Return this for chaining
};

QueryBuilder.prototype.where = function(condition) {
    this.query.conditions.push(condition);
    return this;
};

QueryBuilder.prototype.orderBy = function(field, direction = 'ASC') {
    this.query.orderBy.push({ field, direction });
    return this;
};

QueryBuilder.prototype.limit = function(count) {
    this.query.limit = count;
    return this;
};

QueryBuilder.prototype.build = function() {
    let sql = \`\${this.query.action} \${this.query.fields.join(', ')} FROM \${this.query.table}\`;
    
    if (this.query.conditions.length > 0) {
        sql += \` WHERE \${this.query.conditions.join(' AND ')}\`;
    }
    
    if (this.query.orderBy.length > 0) {
        const orderClauses = this.query.orderBy.map(o => \`\${o.field} \${o.direction}\`);
        sql += \` ORDER BY \${orderClauses.join(', ')}\`;
    }
    
    if (this.query.limit) {
        sql += \` LIMIT \${this.query.limit}\`;
    }
    
    return sql;
};

// Using builder pattern
const query = new QueryBuilder('users')
    .select(['name', 'email', 'age'])
    .where('age > 18')
    .where('active = true')
    .orderBy('name', 'ASC')
    .limit(10)
    .build();

console.log('Generated SQL:', query);

// Common Pitfalls and Solutions
console.log('\\n=== Common Pitfalls ===');

// Pitfall 1: Forgetting 'new' keyword
function SafeConstructor(name) {
    // Check if called with 'new'
    if (!(this instanceof SafeConstructor)) {
        return new SafeConstructor(name);
    }
    
    this.name = name;
}

const obj1 = new SafeConstructor('With new');
const obj2 = SafeConstructor('Without new'); // Still works

console.log('Both objects created correctly:', obj1.name, obj2.name);

// Pitfall 2: Modifying prototype affects all instances
function TestConstructor(value) {
    this.value = value;
}

TestConstructor.prototype.sharedArray = []; // ❌ Dangerous!

const test1 = new TestConstructor('first');
const test2 = new TestConstructor('second');

test1.sharedArray.push('item1');
console.log('test2.sharedArray also modified:', test2.sharedArray); // ['item1']

// ✅ Better approach: Initialize arrays in constructor
function BetterConstructor(value) {
    this.value = value;
    this.instanceArray = []; // Each instance gets its own array
}

const better1 = new BetterConstructor('first');
const better2 = new BetterConstructor('second');

better1.instanceArray.push('item1');
console.log('better2.instanceArray unaffected:', better2.instanceArray); // []

console.log('\\n=== Constructor Functions Summary ===');
console.log('✅ Use PascalCase for constructor names');
console.log('✅ Always use "new" keyword to create instances');
console.log('✅ Add methods to prototype for memory efficiency');
console.log('✅ Validate input parameters in constructor');
console.log('✅ Use "this" to set instance properties');
console.log('✅ Return objects from factory functions, use "new" with constructors');
console.log('✅ Be careful with shared prototype properties');

console.log('Constructor Functions examples completed');`,

  exercises: [
    {
      question: "Create a constructor function for a library system that manages books with borrowing functionality:",
      solution: `function Library(name, maxBooks = 1000) {
  this.name = name;
  this.maxBooks = maxBooks;
  this.books = [];
  this.borrowedBooks = new Map(); // bookId -> borrower info
}

Library.prototype.addBook = function(title, author, isbn) {
  if (this.books.length >= this.maxBooks) {
    throw new Error('Library is at maximum capacity');
  }
  
  const book = {
    id: Date.now().toString(),
    title,
    author,
    isbn,
    available: true,
    addedDate: new Date()
  };
  
  this.books.push(book);
  return book.id;
};

Library.prototype.borrowBook = function(bookId, borrowerName) {
  const book = this.books.find(b => b.id === bookId);
  if (!book) throw new Error('Book not found');
  if (!book.available) throw new Error('Book already borrowed');
  
  book.available = false;
  this.borrowedBooks.set(bookId, {
    borrower: borrowerName,
    borrowDate: new Date()
  });
  
  return true;
};`,
      explanation: "Constructor functions are perfect for creating complex objects with methods and internal state management like library systems."
    }
  ],

  quiz: [
    {
      question: "What happens if you call a constructor function without the 'new' keyword?",
      options: [
        "It throws an error",
        "It returns undefined and may modify global object",
        "It automatically adds 'new'",
        "It creates the object normally"
      ],
      correct: 1,
      explanation: "Without 'new', 'this' refers to the global object (or undefined in strict mode), potentially causing unintended global variable creation."
    }
  ],

  resources: [
    {
      title: "MDN - Constructor Functions",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects#using_a_constructor_function"
    }
  ],

  nextModules: ['prototypes', 'es6-classes'],
  prerequisites: ['functions', 'objects', 'this-keyword']
};