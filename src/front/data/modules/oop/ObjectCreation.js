export default {
  title: 'Object Creation Patterns',
  duration: '40 min',
  difficulty: 'Advanced',
  overview: 'Master all JavaScript object creation patterns including literals, constructors, factories, prototypes, and modern class syntax. Learn when to use each pattern.',
  
  keyPoints: [
    'Multiple ways to create objects in JavaScript',
    'Object literals for simple, one-off objects',
    'Constructor functions for creating multiple similar objects',
    'Factory functions provide flexible object creation',
    'Object.create() for prototypal inheritance',
    'ES6 classes offer modern, clean syntax',
    'Each pattern has specific use cases and trade-offs'
  ],

  example: `// Object Literal Pattern
console.log('=== Object Literal Pattern ===');

// Simple object literal
const person1 = {
    name: 'Alice',
    age: 25,
    city: 'New York',
    
    greet: function() {
        return 'Hello, I am ' + this.name;
    },
    
    // ES6 method syntax
    introduce() {
        return 'I am ' + this.name + ' from ' + this.city;
    },
    
    // Getter
    get info() {
        return this.name + ', age ' + this.age;
    },
    
    // Setter
    set location(newCity) {
        this.city = newCity;
        console.log(this.name + ' moved to ' + newCity);
    }
};

console.log('Person 1:', person1.greet());
console.log('Info:', person1.info);
person1.location = 'San Francisco';

// Object literal with computed properties
const dynamicKey = 'profession';
const person2 = {
    name: 'Bob',
    [dynamicKey]: 'Developer', // Computed property
    ['is' + 'Active']: true,    // Dynamic key
    
    // Method using arrow function (be careful with 'this')
    normalMethod() {
        return 'Normal method: ' + this.name;
    }
};

console.log('Person 2:', person2);
console.log('Dynamic property:', person2[dynamicKey]);

// Constructor Function Pattern
console.log('\\n=== Constructor Function Pattern ===');

function Person(name, age, city) {
    // Instance properties
    this.name = name;
    this.age = age;
    this.city = city;
    
    // Instance method (not recommended - creates new function for each instance)
    this.getName = function() {
        return this.name;
    };
}

// Methods on prototype (recommended - shared across instances)
Person.prototype.greet = function() {
    return 'Hello, I am ' + this.name;
};

Person.prototype.celebrateBirthday = function() {
    this.age++;
    console.log(this.name + ' is now ' + this.age + ' years old!');
};

Person.prototype.moveTo = function(newCity) {
    console.log(this.name + ' moved from ' + this.city + ' to ' + newCity);
    this.city = newCity;
};

// Static method
Person.compareAge = function(person1, person2) {
    if (person1.age > person2.age) {
        return person1.name + ' is older';
    } else if (person1.age < person2.age) {
        return person2.name + ' is older';
    } else {
        return 'Same age';
    }
};

// Create instances
const alice = new Person('Alice', 25, 'New York');
const bob = new Person('Bob', 30, 'Los Angeles');

console.log('Alice greets:', alice.greet());
alice.celebrateBirthday();
bob.moveTo('Chicago');

console.log('Age comparison:', Person.compareAge(alice, bob));

// Check prototype chain
console.log('alice instanceof Person:', alice instanceof Person);
console.log('alice.constructor === Person:', alice.constructor === Person);

// Factory Function Pattern
console.log('\\n=== Factory Function Pattern ===');

function createPerson(name, age, profession) {
    return {
        // Properties
        name: name,
        age: age,
        profession: profession,
        
        // Methods
        introduce() {
            return 'I am ' + this.name + ', a ' + this.profession;
        },
        
        work() {
            return this.name + ' is working as a ' + this.profession;
        },
        
        // Private-like variables using closures
        getSecretInfo: (function() {
            const secret = 'Secret for ' + name;
            return function() {
                return secret;
            };
        })()
    };
}

// Enhanced factory with validation and defaults
function createEmployee(config) {
    const defaults = {
        name: 'Unknown',
        department: 'General',
        salary: 50000,
        startDate: new Date()
    };
    
    // Merge config with defaults
    const employee = Object.assign({}, defaults, config);
    
    // Validation
    if (!employee.name || employee.name === 'Unknown') {
        throw new Error('Employee name is required');
    }
    
    if (employee.salary < 0) {
        throw new Error('Salary cannot be negative');
    }
    
    // Add methods
    employee.getSalaryInfo = function() {
        return this.name + ' earns $' + this.salary + ' in ' + this.department;
    };
    
    employee.promote = function(newDepartment, salaryIncrease) {
        this.department = newDepartment;
        this.salary += salaryIncrease;
        console.log(this.name + ' promoted to ' + newDepartment);
    };
    
    employee.getYearsOfService = function() {
        const now = new Date();
        const years = (now - this.startDate) / (1000 * 60 * 60 * 24 * 365);
        return Math.floor(years);
    };
    
    return employee;
}

// Test factory functions
const developer = createPerson('Charlie', 28, 'Developer');
console.log('Developer intro:', developer.introduce());
console.log('Secret info:', developer.getSecretInfo());

const employee = createEmployee({
    name: 'Diana',
    department: 'Engineering',
    salary: 75000
});

console.log('Employee info:', employee.getSalaryInfo());
employee.promote('Senior Engineering', 10000);

// Object.create() Pattern
console.log('\\n=== Object.create() Pattern ===');

// Create a prototype object
const animalPrototype = {
    // Properties
    species: 'Unknown',
    
    // Methods
    makeSound() {
        return this.name + ' makes a ' + this.sound;
    },
    
    eat(food) {
        console.log(this.name + ' is eating ' + food);
        return this;
    },
    
    sleep() {
        console.log(this.name + ' is sleeping');
        return this;
    }
};

// Create objects with Object.create()
const dog = Object.create(animalPrototype);
dog.name = 'Buddy';
dog.species = 'Canine';
dog.sound = 'woof';

const cat = Object.create(animalPrototype);
cat.name = 'Whiskers';
cat.species = 'Feline';
cat.sound = 'meow';

console.log('Dog sound:', dog.makeSound());
console.log('Cat sound:', cat.makeSound());

// Object.create() with property descriptors
const vehiclePrototype = {
    start() {
        this.isRunning = true;
        console.log(this.make + ' ' + this.model + ' started');
    },
    
    stop() {
        this.isRunning = false;
        console.log(this.make + ' ' + this.model + ' stopped');
    }
};

const car = Object.create(vehiclePrototype, {
    make: {
        value: 'Toyota',
        writable: true,
        enumerable: true,
        configurable: true
    },
    model: {
        value: 'Camry',
        writable: true,
        enumerable: true,
        configurable: true
    },
    year: {
        value: 2022,
        writable: false, // Read-only
        enumerable: true,
        configurable: false
    },
    isRunning: {
        value: false,
        writable: true,
        enumerable: true,
        configurable: true
    }
});

console.log('Car:', car.make, car.model, car.year);
car.start();

// Try to modify read-only property
try {
    car.year = 2023; // This will fail silently or throw in strict mode
    console.log('Year after modification attempt:', car.year);
} catch (error) {
    console.log('Cannot modify read-only property');
}

// ES6 Class Pattern
console.log('\\n=== ES6 Class Pattern ===');

class Animal {
    // Class fields (modern syntax)
    #id = Math.random().toString(36).substr(2, 9); // Private field
    
    constructor(name, species) {
        this.name = name;
        this.species = species;
        this.energy = 100;
    }
    
    // Instance methods
    makeSound() {
        console.log(this.name + ' makes a sound');
    }
    
    eat(food) {
        console.log(this.name + ' eats ' + food);
        this.energy += 10;
        return this;
    }
    
    sleep() {
        console.log(this.name + ' sleeps');
        this.energy = 100;
        return this;
    }
    
    // Getter
    get id() {
        return this.#id;
    }
    
    get status() {
        if (this.energy > 80) return 'energetic';
        if (this.energy > 50) return 'normal';
        if (this.energy > 20) return 'tired';
        return 'exhausted';
    }
    
    // Setter
    set energyLevel(level) {
        if (level < 0 || level > 100) {
            throw new Error('Energy level must be between 0 and 100');
        }
        this.energy = level;
    }
    
    // Static methods
    static compare(animal1, animal2) {
        if (animal1.energy > animal2.energy) {
            return animal1.name + ' has more energy';
        } else if (animal1.energy < animal2.energy) {
            return animal2.name + ' has more energy';
        } else {
            return 'Both animals have equal energy';
        }
    }
    
    static createRandomAnimal() {
        const names = ['Fluffy', 'Shadow', 'Luna', 'Max', 'Ruby'];
        const species = ['Cat', 'Dog', 'Bird', 'Fish', 'Rabbit'];
        
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomSpecies = species[Math.floor(Math.random() * species.length)];
        
        return new Animal(randomName, randomSpecies);
    }
}

// Inheritance with classes
class Dog extends Animal {
    constructor(name, breed) {
        super(name, 'Canine');
        this.breed = breed;
        this.loyalty = 100;
    }
    
    makeSound() {
        console.log(this.name + ' barks: Woof!');
    }
    
    wagTail() {
        console.log(this.name + ' wags tail happily');
        this.loyalty += 5;
        return this;
    }
    
    // Override parent method
    eat(food) {
        super.eat(food); // Call parent method
        if (food === 'treats') {
            this.loyalty += 10;
            console.log(this.name + ' loves treats!');
        }
        return this;
    }
}

// Test ES6 classes
const genericAnimal = new Animal('Generic', 'Unknown');
const goldenRetriever = new Dog('Buddy', 'Golden Retriever');

console.log('Animal ID:', genericAnimal.id);
console.log('Animal status:', genericAnimal.status);

goldenRetriever.makeSound();
goldenRetriever.eat('treats').wagTail().sleep();

console.log('Energy comparison:', Animal.compare(genericAnimal, goldenRetriever));

const randomAnimal = Animal.createRandomAnimal();
console.log('Random animal:', randomAnimal.name, randomAnimal.species);

// Mixin Pattern for Multiple Inheritance
console.log('\\n=== Mixin Pattern ===');

// Mixin objects
const Flyable = {
    fly() {
        console.log(this.name + ' is flying');
        return this;
    },
    
    land() {
        console.log(this.name + ' has landed');
        return this;
    }
};

const Swimmable = {
    swim() {
        console.log(this.name + ' is swimming');
        return this;
    },
    
    dive() {
        console.log(this.name + ' dives underwater');
        return this;
    }
};

// Mixin function
function mixin(target, ...sources) {
    sources.forEach(source => {
        Object.getOwnPropertyNames(source).forEach(name => {
            if (name !== 'constructor') {
                target.prototype[name] = source[name];
            }
        });
    });
    return target;
}

// Apply mixins to classes
class Bird extends Animal {
    constructor(name, wingspan) {
        super(name, 'Avian');
        this.wingspan = wingspan;
    }
    
    makeSound() {
        console.log(this.name + ' chirps: Tweet tweet!');
    }
}

class Duck extends Bird {
    constructor(name, wingspan) {
        super(name, wingspan);
    }
    
    makeSound() {
        console.log(this.name + ' quacks: Quack quack!');
    }
}

// Add flying and swimming abilities
mixin(Bird, Flyable);
mixin(Duck, Flyable, Swimmable);

// Test mixins
const eagle = new Bird('Eagle', 8);
const duck = new Duck('Donald', 3);

console.log('Eagle abilities:');
eagle.eat('fish').fly().land();

console.log('\\nDuck abilities:');
duck.eat('bread').swim().dive().fly().land();

// Builder Pattern for Complex Object Creation
console.log('\\n=== Builder Pattern ===');

class ComputerBuilder {
    constructor() {
        this.computer = {};
    }
    
    setCPU(cpu) {
        this.computer.cpu = cpu;
        return this;
    }
    
    setRAM(ram) {
        this.computer.ram = ram;
        return this;
    }
    
    setStorage(storage) {
        this.computer.storage = storage;
        return this;
    }
    
    setGPU(gpu) {
        this.computer.gpu = gpu;
        return this;
    }
    
    setMotherboard(motherboard) {
        this.computer.motherboard = motherboard;
        return this;
    }
    
    addPeripheral(peripheral) {
        if (!this.computer.peripherals) {
            this.computer.peripherals = [];
        }
        this.computer.peripherals.push(peripheral);
        return this;
    }
    
    build() {
        // Validation
        const required = ['cpu', 'ram', 'storage', 'motherboard'];
        const missing = required.filter(component => !this.computer[component]);
        
        if (missing.length > 0) {
            throw new Error('Missing required components: ' + missing.join(', '));
        }
        
        // Create final computer object
        const computer = {
            ...this.computer,
            id: 'PC-' + Date.now(),
            createdAt: new Date(),
            
            start() {
                console.log('Computer starting up...');
                console.log('CPU: ' + this.cpu);
                console.log('RAM: ' + this.ram);
                console.log('Storage: ' + this.storage);
                return 'System ready';
            },
            
            getSpecs() {
                return {
                    cpu: this.cpu,
                    ram: this.ram,
                    storage: this.storage,
                    gpu: this.gpu || 'Integrated',
                    peripherals: this.peripherals || []
                };
            }
        };
        
        return computer;
    }
    
    // Static factory methods for common configurations
    static gamingPC() {
        return new ComputerBuilder()
            .setCPU('Intel i9-12900K')
            .setRAM('32GB DDR4')
            .setStorage('1TB NVMe SSD')
            .setGPU('RTX 4080')
            .setMotherboard('ASUS ROG Strix');
    }
    
    static officePC() {
        return new ComputerBuilder()
            .setCPU('Intel i5-12400')
            .setRAM('16GB DDR4')
            .setStorage('512GB SSD')
            .setMotherboard('MSI Pro B660M');
    }
}

// Test builder pattern
const gamingComputer = ComputerBuilder
    .gamingPC()
    .addPeripheral('Gaming Keyboard')
    .addPeripheral('Gaming Mouse')
    .addPeripheral('4K Monitor')
    .build();

console.log('Gaming PC specs:', gamingComputer.getSpecs());
console.log('Starting computer:', gamingComputer.start());

const officeComputer = ComputerBuilder
    .officePC()
    .addPeripheral('Standard Keyboard')
    .addPeripheral('Wireless Mouse')
    .build();

console.log('Office PC specs:', officeComputer.getSpecs());

// Prototype Pattern with Object.setPrototypeOf
console.log('\\n=== Prototype Pattern ===');

const basePrototype = {
    init(name) {
        this.name = name;
        this.created = new Date();
        return this;
    },
    
    getName() {
        return this.name;
    },
    
    getAge() {
        const now = new Date();
        const ageMs = now - this.created;
        return Math.floor(ageMs / 1000) + ' seconds';
    }
};

const userPrototype = Object.create(basePrototype);
userPrototype.setEmail = function(email) {
    this.email = email;
    return this;
};

userPrototype.getProfile = function() {
    return {
        name: this.name,
        email: this.email,
        age: this.getAge()
    };
};

// Clone pattern
function cloneUser(prototype) {
    const clone = Object.create(Object.getPrototypeOf(prototype));
    Object.assign(clone, prototype);
    return clone;
}

// Create and test prototype objects
const user1 = Object.create(userPrototype)
    .init('Alice')
    .setEmail('alice@example.com');

console.log('User1 profile:', user1.getProfile());

// Clone user1
const user2 = cloneUser(user1);
user2.name = 'Bob';
user2.email = 'bob@example.com';

console.log('User2 profile:', user2.getProfile());

// Singleton Pattern
console.log('\\n=== Singleton Pattern ===');

class DatabaseConnection {
    constructor() {
        if (DatabaseConnection.instance) {
            return DatabaseConnection.instance;
        }
        
        this.host = 'localhost';
        this.port = 5432;
        this.connected = false;
        this.connectionCount = 0;
        
        DatabaseConnection.instance = this;
    }
    
    connect() {
        if (!this.connected) {
            this.connected = true;
            this.connectionCount++;
            console.log('Connected to database at ' + this.host + ':' + this.port);
        } else {
            console.log('Already connected to database');
        }
        return this;
    }
    
    disconnect() {
        if (this.connected) {
            this.connected = false;
            console.log('Disconnected from database');
        }
        return this;
    }
    
    query(sql) {
        if (!this.connected) {
            throw new Error('Not connected to database');
        }
        console.log('Executing query: ' + sql);
        return { rows: [], affectedRows: 0 };
    }
    
    getStatus() {
        return {
            connected: this.connected,
            host: this.host,
            port: this.port,
            connectionCount: this.connectionCount
        };
    }
    
    // Static method to get instance
    static getInstance() {
        if (!DatabaseConnection.instance) {
            DatabaseConnection.instance = new DatabaseConnection();
        }
        return DatabaseConnection.instance;
    }
}

// Test singleton pattern
const db1 = new DatabaseConnection();
const db2 = new DatabaseConnection();
const db3 = DatabaseConnection.getInstance();

console.log('db1 === db2:', db1 === db2); // true
console.log('db1 === db3:', db1 === db3); // true

db1.connect();
db2.query('SELECT * FROM users'); // Works because it's the same instance
console.log('Database status:', db3.getStatus());

// Factory Pattern with Registration
console.log('\\n=== Advanced Factory Pattern ===');

class ShapeFactory {
    constructor() {
        this.shapes = new Map();
    }
    
    // Register shape constructors
    registerShape(type, constructor) {
        this.shapes.set(type.toLowerCase(), constructor);
        console.log('Registered shape type:', type);
    }
    
    // Create shape instance
    createShape(type, ...args) {
        const ShapeConstructor = this.shapes.get(type.toLowerCase());
        
        if (!ShapeConstructor) {
            throw new Error('Unknown shape type: ' + type);
        }
        
        return new ShapeConstructor(...args);
    }
    
    // Get available shape types
    getAvailableTypes() {
        return Array.from(this.shapes.keys());
    }
    
    // Batch create shapes
    createShapes(specifications) {
        return specifications.map(spec => 
            this.createShape(spec.type, ...spec.args)
        );
    }
}

// Shape classes
class Circle {
    constructor(radius) {
        this.type = 'circle';
        this.radius = radius;
    }
    
    getArea() {
        return Math.PI * this.radius * this.radius;
    }
    
    toString() {
        return 'Circle with radius ' + this.radius;
    }
}

class Rectangle {
    constructor(width, height) {
        this.type = 'rectangle';
        this.width = width;
        this.height = height;
    }
    
    getArea() {
        return this.width * this.height;
    }
    
    toString() {
        return 'Rectangle ' + this.width + 'x' + this.height;
    }
}

class Triangle {
    constructor(base, height) {
        this.type = 'triangle';
        this.base = base;
        this.height = height;
    }
    
    getArea() {
        return 0.5 * this.base * this.height;
    }
    
    toString() {
        return 'Triangle with base ' + this.base + ' and height ' + this.height;
    }
}

// Test advanced factory
const shapeFactory = new ShapeFactory();

// Register shapes
shapeFactory.registerShape('circle', Circle);
shapeFactory.registerShape('rectangle', Rectangle);
shapeFactory.registerShape('triangle', Triangle);

console.log('Available shapes:', shapeFactory.getAvailableTypes());

// Create individual shapes
const circle = shapeFactory.createShape('circle', 5);
const rectangle = shapeFactory.createShape('rectangle', 4, 6);

console.log('Created shapes:');
console.log(' ', circle.toString(), 'Area:', circle.getArea().toFixed(2));
console.log(' ', rectangle.toString(), 'Area:', rectangle.getArea());

// Batch create shapes
const shapeSpecs = [
    { type: 'circle', args: [3] },
    { type: 'rectangle', args: [2, 8] },
    { type: 'triangle', args: [6, 4] }
];

const shapes = shapeFactory.createShapes(shapeSpecs);
console.log('\\nBatch created shapes:');
shapes.forEach(shape => {
    console.log(' ', shape.toString(), 'Area:', shape.getArea().toFixed(2));
});

// Performance Comparison
console.log('\\n=== Performance Comparison ===');

function performanceTest() {
    const iterations = 100000;
    
    // Test object literal creation
    console.time('Object literals');
    for (let i = 0; i < iterations; i++) {
        const obj = {
            name: 'Test' + i,
            value: i,
            getValue() { return this.value; }
        };
    }
    console.timeEnd('Object literals');
    
    // Test constructor function
    function TestConstructor(name, value) {
        this.name = name;
        this.value = value;
    }
    TestConstructor.prototype.getValue = function() { return this.value; };
    
    console.time('Constructor functions');
    for (let i = 0; i < iterations; i++) {
        const obj = new TestConstructor('Test' + i, i);
    }
    console.timeEnd('Constructor functions');
    
    // Test ES6 class
    class TestClass {
        constructor(name, value) {
            this.name = name;
            this.value = value;
        }
        getValue() { return this.value; }
    }
    
    console.time('ES6 classes');
    for (let i = 0; i < iterations; i++) {
        const obj = new TestClass('Test' + i, i);
    }
    console.timeEnd('ES6 classes');
    
    // Test Object.create
    const proto = {
        getValue() { return this.value; }
    };
    
    console.time('Object.create');
    for (let i = 0; i < iterations; i++) {
        const obj = Object.create(proto);
        obj.name = 'Test' + i;
        obj.value = i;
    }
    console.timeEnd('Object.create');
}

performanceTest();

console.log('\\nObject creation patterns examples completed');`,

  exercises: [
    {
      question: "Create a flexible User management system that supports multiple creation patterns and provides both instance and static functionality:",
      solution: `// Base User class with multiple creation patterns
class User {
  // Private static field for user registry
  static #users = new Map();
  static #nextId = 1;
  
  // Private instance fields
  #id;
  #email;
  #createdAt;
  
  constructor(name, email, role = 'user') {
    this.#id = User.#nextId++;
    this.name = name;
    this.#email = this.#validateEmail(email);
    this.role = role;
    this.#createdAt = new Date();
    this.isActive = true;
    
    // Register user
    User.#users.set(this.#id, this);
  }
  
  // Private validation method
  #validateEmail(email) {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error('Invalid email format');
    }
    return email.toLowerCase();
  }
  
  // Instance methods
  get id() { return this.#id; }
  get email() { return this.#email; }
  get createdAt() { return new Date(this.#createdAt); }
  
  updateEmail(newEmail) {
    this.#email = this.#validateEmail(newEmail);
    return this;
  }
  
  deactivate() {
    this.isActive = false;
    return this;
  }
  
  getProfile() {
    return {
      id: this.#id,
      name: this.name,
      email: this.#email,
      role: this.role,
      isActive: this.isActive,
      createdAt: this.#createdAt
    };
  }
  
  // Static factory methods
  static createAdmin(name, email) {
    return new User(name, email, 'admin');
  }
  
  static createModerator(name, email) {
    return new User(name, email, 'moderator');
  }
  
  static createFromData(userData) {
    return new User(userData.name, userData.email, userData.role);
  }
  
  // Static utility methods
  static findById(id) {
    return User.#users.get(id);
  }
  
  static findByEmail(email) {
    for (const user of User.#users.values()) {
      if (user.#email === email.toLowerCase()) {
        return user;
      }
    }
    return null;
  }
  
  static getAllUsers() {
    return Array.from(User.#users.values()).map(user => user.getProfile());
  }
  
  static getUserCount() {
    return User.#users.size;
  }
  
  static getActiveUsers() {
    return Array.from(User.#users.values())
      .filter(user => user.isActive)
      .map(user => user.getProfile());
  }
}

// Builder pattern for complex user creation
class UserBuilder {
  constructor() {
    this.userData = {};
  }
  
  setName(name) {
    this.userData.name = name;
    return this;
  }
  
  setEmail(email) {
    this.userData.email = email;
    return this;
  }
  
  setRole(role) {
    this.userData.role = role;
    return this;
  }
  
  addPreference(key, value) {
    if (!this.userData.preferences) {
      this.userData.preferences = {};
    }
    this.userData.preferences[key] = value;
    return this;
  }
  
  build() {
    if (!this.userData.name || !this.userData.email) {
      throw new Error('Name and email are required');
    }
    
    const user = User.createFromData(this.userData);
    
    // Add preferences if provided
    if (this.userData.preferences) {
      user.preferences = this.userData.preferences;
    }
    
    return user;
  }
}

// Usage examples:
const admin = User.createAdmin('Alice Admin', 'alice@admin.com');
const user1 = new User('Bob User', 'bob@user.com');

const user2 = new UserBuilder()
  .setName('Charlie')
  .setEmail('charlie@example.com')
  .setRole('moderator')
  .addPreference('theme', 'dark')
  .addPreference('notifications', true)
  .build();

console.log('Total users:', User.getUserCount());
console.log('Active users:', User.getActiveUsers());
console.log('User by email:', User.findByEmail('alice@admin.com'));`,
      explanation: "This comprehensive User system demonstrates multiple object creation patterns: constructors, static factory methods, builder pattern, and combines them with private fields, static methods, and proper encapsulation."
    }
  ],

  quiz: [
    {
      question: "Which object creation pattern is best for creating simple, one-off objects?",
      options: [
        "Constructor functions",
        "ES6 classes",
        "Object literals",
        "Factory functions"
      ],
      correct: 2,
      explanation: "Object literals are perfect for creating simple, one-off objects when you don't need multiple instances or complex inheritance. They're concise and efficient for single-use objects."
    }
  ],

  resources: [
    {
      title: "MDN - Object Creation",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_with_Objects"
    },
    {
      title: "JavaScript Design Patterns",
      url: "https://addyosmani.com/resources/essentialjsdesignpatterns/book/"
    },
    {
      title: "MDN - Object.create()",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create"
    }
  ],

  nextModules: ['inheritance', 'private-fields', 'static-methods'],
  prerequisites: ['objects-basics', 'functions-basics', 'prototypes']
};