// src/front/data/modules/oop/ES6Classes.js
export default {
  title: 'ES6 Classes',
  duration: '40 min',
  difficulty: 'Intermediate',
  overview: 'Master ES6 class syntax as modern alternative to constructor functions. Learn class declarations, methods, inheritance, and advanced class features.',
  
  keyPoints: [
    'Classes provide cleaner syntax over constructor functions',
    'class keyword for declaration, constructor method for initialization',
    'Method definitions without function keyword',
    'extends keyword for inheritance, super for parent access',
    'Static methods belong to class, not instances',
    'Private fields and methods with # syntax'
  ],

  example: `// Basic Class Declaration
console.log('=== Basic Class Declaration ===');

class Person {
    // Constructor method - called when creating new instance
    constructor(name, age, email) {
        this.name = name;
        this.age = age;
        this.email = email;
        this.id = Math.random().toString(36).substring(7);
    }
    
    // Instance methods
    introduce() {
        return \`Hi, I'm \${this.name}, \${this.age} years old.\`;
    }
    
    getInfo() {
        return {
            id: this.id,
            name: this.name,
            age: this.age,
            email: this.email
        };
    }
    
    updateAge(newAge) {
        if (newAge >= 0 && newAge <= 150) {
            this.age = newAge;
            console.log(\`\${this.name}'s age updated to \${newAge}\`);
        } else {
            throw new Error('Invalid age');
        }
    }
    
    // Method with default parameters
    sendMessage(message, urgent = false) {
        const prefix = urgent ? '🚨 URGENT: ' : '📧 ';
        console.log(\`\${prefix}Message to \${this.name}: \${message}\`);
    }
}

// Creating instances
const person1 = new Person('Alice', 30, 'alice@example.com');
const person2 = new Person('Bob', 25, 'bob@example.com');

console.log('Person 1:', person1.introduce());
console.log('Person 2:', person2.introduce());

person1.updateAge(31);
person1.sendMessage('Hello there!');
person2.sendMessage('Meeting in 5 minutes', true);

// Class vs Constructor Function Comparison
console.log('\\n=== Class vs Constructor Function ===');

// ES5 Constructor Function approach
function PersonOld(name, age) {
    this.name = name;
    this.age = age;
}

PersonOld.prototype.greet = function() {
    return \`Hello, I'm \${this.name}\`;
};

// ES6 Class approach
class PersonNew {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    
    greet() {
        return \`Hello, I'm \${this.name}\`;
    }
}

const oldPerson = new PersonOld('Old Style', 40);
const newPerson = new PersonNew('New Style', 40);

console.log('Constructor function:', oldPerson.greet());
console.log('ES6 class:', newPerson.greet());
console.log('Both create same structure:', 
    oldPerson.constructor.name, 'vs', newPerson.constructor.name);

// Getters and Setters
console.log('\\n=== Getters and Setters ===');

class Temperature {
    constructor(celsius = 0) {
        this._celsius = celsius; // Convention: _ prefix for "private"
    }
    
    // Getter - accessed like property
    get celsius() {
        return this._celsius;
    }
    
    // Setter - assigned like property
    set celsius(value) {
        if (typeof value !== 'number') {
            throw new Error('Temperature must be a number');
        }
        if (value < -273.15) {
            throw new Error('Temperature cannot be below absolute zero');
        }
        this._celsius = value;
    }
    
    get fahrenheit() {
        return (this._celsius * 9/5) + 32;
    }
    
    set fahrenheit(value) {
        if (typeof value !== 'number') {
            throw new Error('Temperature must be a number');
        }
        this.celsius = (value - 32) * 5/9;
    }
    
    get kelvin() {
        return this._celsius + 273.15;
    }
    
    set kelvin(value) {
        if (typeof value !== 'number') {
            throw new Error('Temperature must be a number');
        }
        this.celsius = value - 273.15;
    }
    
    // Method to display all temperature scales
    toString() {
        return \`\${this.celsius}°C = \${this.fahrenheit.toFixed(1)}°F = \${this.kelvin.toFixed(1)}K\`;
    }
}

const temp = new Temperature(25);
console.log('Initial temperature:', temp.toString());

// Using getters and setters
temp.fahrenheit = 100;
console.log('After setting fahrenheit to 100:', temp.toString());

temp.kelvin = 300;
console.log('After setting kelvin to 300:', temp.toString());

// Static Methods and Properties
console.log('\\n=== Static Methods and Properties ===');

class MathUtils {
    // Static property
    static PI = 3.14159;
    static E = 2.71828;
    
    // Static methods - called on class, not instance
    static add(a, b) {
        return a + b;
    }
    
    static multiply(a, b) {
        return a * b;
    }
    
    static circleArea(radius) {
        return this.PI * radius * radius;
    }
    
    static factorial(n) {
        if (n <= 1) return 1;
        return n * this.factorial(n - 1);
    }
    
    // Static method that returns instance
    static createRandomPoint() {
        return new Point(
            Math.random() * 100,
            Math.random() * 100
        );
    }
}

class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    
    toString() {
        return \`(\${this.x.toFixed(2)}, \${this.y.toFixed(2)})\`;
    }
    
    // Static method for distance calculation
    static distance(point1, point2) {
        const dx = point2.x - point1.x;
        const dy = point2.y - point1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}

// Using static methods
console.log('Static PI:', MathUtils.PI);
console.log('Static add:', MathUtils.add(5, 3));
console.log('Circle area:', MathUtils.circleArea(5));
console.log('Factorial 5:', MathUtils.factorial(5));

const randomPoint = MathUtils.createRandomPoint();
console.log('Random point:', randomPoint.toString());

const point1 = new Point(0, 0);
const point2 = new Point(3, 4);
console.log('Distance between points:', Point.distance(point1, point2));

// Class Inheritance with extends
console.log('\\n=== Class Inheritance ===');

// Base class
class Animal {
    constructor(name, species, age) {
        this.name = name;
        this.species = species;
        this.age = age;
        this.energy = 100;
    }
    
    eat(food) {
        this.energy = Math.min(100, this.energy + 10);
        console.log(\`\${this.name} eats \${food}. Energy: \${this.energy}\`);
    }
    
    sleep(hours) {
        this.energy = Math.min(100, this.energy + hours * 5);
        console.log(\`\${this.name} sleeps for \${hours} hours. Energy: \${this.energy}\`);
    }
    
    move() {
        this.energy = Math.max(0, this.energy - 5);
        console.log(\`\${this.name} moves. Energy: \${this.energy}\`);
    }
    
    makeSound() {
        console.log(\`\${this.name} makes a sound\`);
    }
    
    getInfo() {
        return \`\${this.name} is a \${this.age}-year-old \${this.species}\`;
    }
}

// Derived class
class Dog extends Animal {
    constructor(name, breed, age) {
        // Call parent constructor with super()
        super(name, 'Dog', age);
        this.breed = breed;
        this.tricks = [];
        this.loyalty = 100;
    }
    
    // Override parent method
    makeSound() {
        console.log(\`\${this.name} barks: Woof! Woof!\`);
    }
    
    // New methods specific to Dog
    fetch() {
        this.energy = Math.max(0, this.energy - 15);
        console.log(\`\${this.name} fetches the ball! Energy: \${this.energy}\`);
    }
    
    learnTrick(trick) {
        this.tricks.push(trick);
        console.log(\`\${this.name} learned a new trick: \${trick}\`);
    }
    
    performTrick() {
        if (this.tricks.length === 0) {
            console.log(\`\${this.name} doesn't know any tricks yet.\`);
            return;
        }
        
        const randomTrick = this.tricks[Math.floor(Math.random() * this.tricks.length)];
        this.energy = Math.max(0, this.energy - 10);
        console.log(\`\${this.name} performs: \${randomTrick}! Energy: \${this.energy}\`);
    }
    
    // Override getInfo to include dog-specific information
    getInfo() {
        const baseInfo = super.getInfo(); // Call parent method
        return \`\${baseInfo}, breed: \${this.breed}, knows \${this.tricks.length} tricks\`;
    }
}

// Another derived class
class Cat extends Animal {
    constructor(name, breed, age, indoor = true) {
        super(name, 'Cat', age);
        this.breed = breed;
        this.indoor = indoor;
        this.lives = 9;
    }
    
    makeSound() {
        console.log(\`\${this.name} meows: Meow!\`);
    }
    
    climb() {
        if (this.indoor) {
            console.log(\`\${this.name} climbs the cat tree\`);
        } else {
            this.energy = Math.max(0, this.energy - 20);
            console.log(\`\${this.name} climbs a real tree! Energy: \${this.energy}\`);
        }
    }
    
    purr() {
        console.log(\`\${this.name} purrs contentedly\`);
    }
    
    useLife() {
        if (this.lives > 0) {
            this.lives--;
            console.log(\`\${this.name} used a life. \${this.lives} lives remaining.\`);
        }
    }
    
    getInfo() {
        const baseInfo = super.getInfo();
        return \`\${baseInfo}, breed: \${this.breed}, lives: \${this.lives}\`;
    }
}

// Using inheritance
const dog = new Dog('Buddy', 'Golden Retriever', 3);
const cat = new Cat('Whiskers', 'Persian', 2, true);

console.log('Dog info:', dog.getInfo());
console.log('Cat info:', cat.getInfo());

// Polymorphism - same method, different behavior
const animals = [dog, cat];
console.log('\\nAnimal sounds:');
animals.forEach(animal => {
    animal.makeSound(); // Different implementation for each type
});

// Using inherited and specific methods
console.log('\\nDog activities:');
dog.eat('kibble');
dog.learnTrick('sit');
dog.learnTrick('roll over');
dog.performTrick();
dog.fetch();

console.log('\\nCat activities:');
cat.eat('fish');
cat.climb();
cat.purr();

// Private Fields and Methods (ES2022)
console.log('\\n=== Private Fields and Methods ===');

class BankAccount {
    // Private fields (only available in modern browsers)
    #balance = 0;
    #accountNumber;
    #transactions = [];
    
    constructor(initialBalance = 0, accountHolder) {
        this.accountHolder = accountHolder;
        this.#balance = initialBalance;
        this.#accountNumber = this.#generateAccountNumber();
        this.createdAt = new Date();
        
        if (initialBalance > 0) {
            this.#addTransaction('deposit', initialBalance, 'Initial deposit');
        }
    }
    
    // Private method
    #generateAccountNumber() {
        return 'ACC' + Math.random().toString(36).substring(2, 15).toUpperCase();
    }
    
    #addTransaction(type, amount, description) {
        this.#transactions.push({
            type,
            amount,
            description,
            date: new Date(),
            balance: this.#balance
        });
    }
    
    #validateAmount(amount) {
        if (typeof amount !== 'number' || amount <= 0) {
            throw new Error('Amount must be a positive number');
        }
    }
    
    // Public methods
    deposit(amount, description = 'Deposit') {
        this.#validateAmount(amount);
        
        this.#balance += amount;
        this.#addTransaction('deposit', amount, description);
        console.log(\`Deposited $\${amount}. New balance: $\${this.#balance}\`);
        return this.#balance;
    }
    
    withdraw(amount, description = 'Withdrawal') {
        this.#validateAmount(amount);
        
        if (amount > this.#balance) {
            throw new Error('Insufficient funds');
        }
        
        this.#balance -= amount;
        this.#addTransaction('withdrawal', amount, description);
        console.log(\`Withdrew $\${amount}. New balance: $\${this.#balance}\`);
        return this.#balance;
    }
    
    getBalance() {
        return this.#balance;
    }
    
    getAccountNumber() {
        return this.#accountNumber;
    }
    
    getTransactionHistory() {
        return [...this.#transactions]; // Return copy to prevent external modification
    }
    
    getAccountInfo() {
        return {
            accountNumber: this.#accountNumber,
            accountHolder: this.accountHolder,
            balance: this.#balance,
            transactionCount: this.#transactions.length,
            createdAt: this.createdAt
        };
    }
}

// Using private fields
const account = new BankAccount(1000, 'John Doe');

console.log('Account info:', account.getAccountInfo());
account.deposit(500, 'Salary');
account.withdraw(200, 'Groceries');

// Private fields are not accessible from outside
console.log('\\nTrying to access private fields:');
console.log('account.#balance:', 'undefined - private field not accessible');
console.log('account.getBalance():', account.getBalance(), '- public method works');

// Class Expressions
console.log('\\n=== Class Expressions ===');

// Named class expression
const MyClass = class NamedClass {
    constructor(value) {
        this.value = value;
    }
    
    getValue() {
        return this.value;
    }
};

// Anonymous class expression
const AnotherClass = class {
    constructor(data) {
        this.data = data;
    }
    
    process() {
        return this.data.toUpperCase();
    }
};

// Function that returns a class
function createCounterClass(initialValue = 0) {
    return class Counter {
        constructor() {
            this.count = initialValue;
        }
        
        increment() {
            this.count++;
            return this.count;
        }
        
        decrement() {
            this.count--;
            return this.count;
        }
        
        getValue() {
            return this.count;
        }
    };
}

const instance1 = new MyClass('test');
const instance2 = new AnotherClass('hello');

console.log('Named class expression:', instance1.getValue());
console.log('Anonymous class expression:', instance2.process());

// Dynamic class creation
const CounterFrom10 = createCounterClass(10);
const CounterFrom0 = createCounterClass(0);

const counter1 = new CounterFrom10();
const counter2 = new CounterFrom0();

console.log('Counter 1 increment:', counter1.increment());
console.log('Counter 2 increment:', counter2.increment());

// Advanced Class Patterns
console.log('\\n=== Advanced Class Patterns ===');

// 1. Mixin pattern with classes
const Flyable = {
    fly() {
        console.log(\`\${this.name || 'Unknown'} is flying!\`);
    },
    
    land() {
        console.log(\`\${this.name || 'Unknown'} has landed.\`);
    }
};

const Swimmable = {
    swim() {
        console.log(\`\${this.name || 'Unknown'} is swimming!\`);
    },
    
    dive() {
        console.log(\`\${this.name || 'Unknown'} dives underwater!\`);
    }
};

class Bird extends Animal {
    constructor(name, species, wingspan) {
        super(name, species, 1); // Age default to 1
        this.wingspan = wingspan;
    }
    
    makeSound() {
        console.log(\`\${this.name} chirps!\`);
    }
}

class Duck extends Bird {
    constructor(name, wingspan) {
        super(name, 'Duck', wingspan);
    }
    
    makeSound() {
        console.log(\`\${this.name} quacks!\`);
    }
}

// Apply mixins
Object.assign(Bird.prototype, Flyable);
Object.assign(Duck.prototype, Swimmable);

const duck = new Duck('Donald', '2 feet');
duck.makeSound();
duck.fly();
duck.swim();
duck.dive();

// 2. Abstract base class pattern
class Shape {
    constructor(name) {
        if (this.constructor === Shape) {
            throw new Error('Shape is abstract and cannot be instantiated');
        }
        this.name = name;
    }
    
    // Abstract methods (must be implemented by subclasses)
    area() {
        throw new Error('area() method must be implemented by subclass');
    }
    
    perimeter() {
        throw new Error('perimeter() method must be implemented by subclass');
    }
    
    // Concrete method
    describe() {
        return \`This is a \${this.name} with area \${this.area()} and perimeter \${this.perimeter()}\`;
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super('Rectangle');
        this.width = width;
        this.height = height;
    }
    
    area() {
        return this.width * this.height;
    }
    
    perimeter() {
        return 2 * (this.width + this.height);
    }
}

class Circle extends Shape {
    constructor(radius) {
        super('Circle');
        this.radius = radius;
    }
    
    area() {
        return Math.PI * this.radius * this.radius;
    }
    
    perimeter() {
        return 2 * Math.PI * this.radius;
    }
}

const rectangle = new Rectangle(5, 10);
const circle = new Circle(3);

console.log('\\nAbstract base class pattern:');
console.log(rectangle.describe());
console.log(circle.describe());

// Try to instantiate abstract class
try {
    const shape = new Shape('Generic');
} catch (error) {
    console.log('Abstract class error:', error.message);
}

// 3. Builder pattern with classes
class QueryBuilder {
    constructor() {
        this.query = {
            select: [],
            from: '',
            where: [],
            orderBy: [],
            limit: null
        };
    }
    
    select(...fields) {
        this.query.select.push(...fields);
        return this; // Return this for method chaining
    }
    
    from(table) {
        this.query.from = table;
        return this;
    }
    
    where(condition) {
        this.query.where.push(condition);
        return this;
    }
    
    orderBy(field, direction = 'ASC') {
        this.query.orderBy.push(\`\${field} \${direction}\`);
        return this;
    }
    
    limit(count) {
        this.query.limit = count;
        return this;
    }
    
    build() {
        let sql = \`SELECT \${this.query.select.join(', ')} FROM \${this.query.from}\`;
        
        if (this.query.where.length > 0) {
            sql += \` WHERE \${this.query.where.join(' AND ')}\`;
        }
        
        if (this.query.orderBy.length > 0) {
            sql += \` ORDER BY \${this.query.orderBy.join(', ')}\`;
        }
        
        if (this.query.limit) {
            sql += \` LIMIT \${this.query.limit}\`;
        }
        
        return sql;
    }
}

// Using builder pattern
const query = new QueryBuilder()
    .select('name', 'email', 'age')
    .from('users')
    .where('age > 18')
    .where('active = true')
    .orderBy('name', 'ASC')
    .limit(10)
    .build();

console.log('\\nGenerated SQL:', query);

// Performance Comparison
console.log('\\n=== Performance Comparison ===');

// Class vs Object creation performance
function performanceTest() {
    const iterations = 100000;
    
    // Class-based approach
    class TestClass {
        constructor(value) {
            this.value = value;
        }
        
        getValue() {
            return this.value;
        }
    }
    
    // Object literal approach
    function createObject(value) {
        return {
            value: value,
            getValue() {
                return this.value;
            }
        };
    }
    
    // Test class creation
    console.time('Class instantiation');
    for (let i = 0; i < iterations; i++) {
        new TestClass(i);
    }
    console.timeEnd('Class instantiation');
    
    // Test object creation
    console.time('Object creation');
    for (let i = 0; i < iterations; i++) {
        createObject(i);
    }
    console.timeEnd('Object creation');
}

performanceTest();

// Best Practices Summary
console.log('\\n=== ES6 Classes Best Practices ===');
console.log('✅ Use classes for object templates with shared behavior');
console.log('✅ Use constructor for initialization logic');
console.log('✅ Use getters/setters for computed or validated properties');
console.log('✅ Use static methods for utility functions related to the class');
console.log('✅ Use extends for inheritance and super for parent access');
console.log('✅ Use private fields (#) for truly private data');
console.log('✅ Follow naming conventions: PascalCase for classes');
console.log('⚠️  Don\\'t use classes just for namespacing - use modules');
console.log('⚠️  Avoid deep inheritance hierarchies');
console.log('⚠️  Be careful with "this" binding in methods');

console.log('ES6 Classes examples completed');`,

  exercises: [
    {
      question: "Create a complete e-commerce product system using ES6 classes with inheritance and private fields:",
      solution: `class Product {
  // Private fields
  #id;
  #price;
  #inventory;
  
  constructor(name, price, category, inventory = 0) {
    this.name = name;
    this.#price = price;
    this.category = category;
    this.#inventory = inventory;
    this.#id = this.#generateId();
    this.createdAt = new Date();
  }
  
  #generateId() {
    return 'PRD' + Math.random().toString(36).substring(2, 9).toUpperCase();
  }
  
  // Getters and setters
  get price() {
    return this.#price;
  }
  
  set price(newPrice) {
    if (newPrice < 0) throw new Error('Price cannot be negative');
    this.#price = newPrice;
  }
  
  get inventory() {
    return this.#inventory;
  }
  
  get id() {
    return this.#id;
  }
  
  // Public methods
  updateInventory(quantity) {
    if (this.#inventory + quantity < 0) {
      throw new Error('Insufficient inventory');
    }
    this.#inventory += quantity;
  }
  
  isInStock() {
    return this.#inventory > 0;
  }
  
  getInfo() {
    return {
      id: this.#id,
      name: this.name,
      price: this.#price,
      category: this.category,
      inventory: this.#inventory,
      inStock: this.isInStock()
    };
  }
}

class DigitalProduct extends Product {
  constructor(name, price, downloadUrl, fileSize) {
    super(name, price, 'Digital', Infinity); // Infinite inventory for digital
    this.downloadUrl = downloadUrl;
    this.fileSize = fileSize;
    this.downloads = 0;
  }
  
  download() {
    this.downloads++;
    console.log(\`Downloaded \${this.name}. Total downloads: \${this.downloads}\`);
    return this.downloadUrl;
  }
  
  getInfo() {
    return {
      ...super.getInfo(),
      downloadUrl: this.downloadUrl,
      fileSize: this.fileSize,
      downloads: this.downloads
    };
  }
}

class PhysicalProduct extends Product {
  constructor(name, price, category, inventory, weight, dimensions) {
    super(name, price, category, inventory);
    this.weight = weight;
    this.dimensions = dimensions;
    this.shippingCost = this.calculateShippingCost();
  }
  
  calculateShippingCost() {
    const baseRate = 5;
    const weightRate = this.weight * 0.5;
    return baseRate + weightRate;
  }
  
  ship(quantity = 1) {
    if (quantity > this.inventory) {
      throw new Error('Cannot ship more than available inventory');
    }
    
    this.updateInventory(-quantity);
    console.log(\`Shipped \${quantity} units of \${this.name}\`);
    return {
      quantity,
      shippingCost: this.shippingCost * quantity,
      trackingNumber: 'TRK' + Date.now()
    };
  }
  
  getInfo() {
    return {
      ...super.getInfo(),
      weight: this.weight,
      dimensions: this.dimensions,
      shippingCost: this.shippingCost
    };
  }
}

// Usage
const ebook = new DigitalProduct('JavaScript Guide', 29.99, 'https://download.com/js-guide.pdf', '5MB');
const laptop = new PhysicalProduct('Gaming Laptop', 1299.99, 'Electronics', 10, 2.5, '35x25x2 cm');

console.log('Digital Product:', ebook.getInfo());
console.log('Physical Product:', laptop.getInfo());

// Test functionality
ebook.download();
const shipment = laptop.ship(2);
console.log('Shipment:', shipment);`,
      explanation: "This e-commerce system demonstrates inheritance, private fields, getters/setters, method overriding, and polymorphism with a clean class hierarchy for different product types."
    }
  ],

  quiz: [
    {
      question: "What is the main difference between ES6 classes and constructor functions?",
      options: [
        "Classes are faster and use less memory",
        "Classes provide cleaner syntax but work the same under the hood",
        "Classes support inheritance while constructor functions don't",
        "Classes create different types of objects"
      ],
      correct: 1,
      explanation: "ES6 classes are primarily syntactic sugar over constructor functions and prototypes. They provide cleaner, more readable syntax but create the same prototype-based objects under the hood."
    }
  ],

  resources: [
    {
      title: "MDN - Classes",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes"
    },
    {
      title: "MDN - Private Class Features",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields"
    }
  ],

  nextModules: ['inheritance', 'private-fields'],
  prerequisites: ['constructor-functions', 'prototypes', 'this-keyword']
};