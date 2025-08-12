// src/front/data/modules/es6/Classes.js
export default {
  title: 'ES6 Classes',
  duration: '40 min',
  difficulty: 'Intermediate',
  overview: 'Master ES6 class syntax for object-oriented programming. Learn constructors, methods, inheritance, static methods, and modern class features.',
  
  keyPoints: [
    'Classes provide syntactic sugar over prototype-based inheritance',
    'Constructor method initializes new instances',
    'Class methods are added to prototype automatically',
    'Static methods belong to the class, not instances',
    'Extends keyword enables inheritance',
    'Super keyword calls parent class methods'
  ],

  example: `// Basic Class Declaration
console.log('=== Basic Class Declaration ===');

class Person {
    // Constructor method
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.id = Math.random().toString(36).substring(7);
    }
    
    // Instance method
    greet() {
        return \`Hello, I'm \${this.name} and I'm \${this.age} years old.\`;
    }
    
    // Another instance method
    getInfo() {
        return {
            name: this.name,
            age: this.age,
            id: this.id
        };
    }
    
    // Method with parameters
    haveBirthday() {
        this.age++;
        console.log(\`🎉 Happy birthday! \${this.name} is now \${this.age} years old.\`);
    }
}

// Creating instances
const person1 = new Person('Alice', 30);
const person2 = new Person('Bob', 25);

console.log(person1.greet());
console.log(person2.greet());

person1.haveBirthday();
console.log('Person 1 info:', person1.getInfo());

// Static Methods
console.log('\\n=== Static Methods ===');

class MathUtils {
    static add(a, b) {
        return a + b;
    }
    
    static multiply(a, b) {
        return a * b;
    }
    
    static factorial(n) {
        if (n <= 1) return 1;
        return n * this.factorial(n - 1);
    }
    
    // Static property (using getter)
    static get PI() {
        return 3.14159;
    }
    
    // Static method that uses instance
    static fromArray(arr) {
        return new MathUtils(arr);
    }
    
    constructor(values = []) {
        this.values = values;
    }
    
    sum() {
        return this.values.reduce((sum, val) => sum + val, 0);
    }
}

// Using static methods
console.log('Static add:', MathUtils.add(5, 3));
console.log('Static multiply:', MathUtils.multiply(4, 7));
console.log('Static factorial:', MathUtils.factorial(5));
console.log('Static PI:', MathUtils.PI);

// Using static factory method
const mathInstance = MathUtils.fromArray([1, 2, 3, 4, 5]);
console.log('Sum from static factory:', mathInstance.sum());

// Getters and Setters
console.log('\\n=== Getters and Setters ===');

class Temperature {
    constructor(celsius = 0) {
        this._celsius = celsius;
    }
    
    // Getter for celsius
    get celsius() {
        return this._celsius;
    }
    
    // Setter for celsius
    set celsius(value) {
        if (typeof value !== 'number') {
            throw new Error('Temperature must be a number');
        }
        this._celsius = value;
    }
    
    // Getter for fahrenheit
    get fahrenheit() {
        return (this._celsius * 9/5) + 32;
    }
    
    // Setter for fahrenheit
    set fahrenheit(value) {
        if (typeof value !== 'number') {
            throw new Error('Temperature must be a number');
        }
        this._celsius = (value - 32) * 5/9;
    }
    
    // Getter for kelvin
    get kelvin() {
        return this._celsius + 273.15;
    }
    
    // Method to display all temperatures
    display() {
        return {
            celsius: this.celsius,
            fahrenheit: this.fahrenheit,
            kelvin: this.kelvin
        };
    }
}

const temp = new Temperature(25);
console.log('Initial temperature:', temp.display());

temp.fahrenheit = 100;
console.log('After setting fahrenheit to 100:', temp.display());

temp.celsius = 0;
console.log('After setting celsius to 0:', temp.display());

// Inheritance with Extends
console.log('\\n=== Inheritance ===');

class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
        this.energy = 100;
    }
    
    eat(food) {
        this.energy += 10;
        console.log(\`\${this.name} eats \${food} and gains energy. Energy: \${this.energy}\`);
    }
    
    sleep() {
        this.energy += 20;
        console.log(\`\${this.name} sleeps and restores energy. Energy: \${this.energy}\`);
    }
    
    move() {
        this.energy -= 5;
        console.log(\`\${this.name} moves. Energy: \${this.energy}\`);
    }
    
    makeSound() {
        console.log(\`\${this.name} makes a sound\`);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name, 'Dog'); // Call parent constructor
        this.breed = breed;
        this.tricks = [];
    }
    
    // Override parent method
    makeSound() {
        console.log(\`\${this.name} barks: Woof! Woof!\`);
    }
    
    // New method specific to Dog
    fetch() {
        this.energy -= 15;
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
        this.energy -= 10;
        console.log(\`\${this.name} performs: \${randomTrick}! Energy: \${this.energy}\`);
    }
}

class Cat extends Animal {
    constructor(name, indoor = true) {
        super(name, 'Cat');
        this.indoor = indoor;
        this.livesLeft = 9;
    }
    
    // Override parent method
    makeSound() {
        console.log(\`\${this.name} meows: Meow!\`);
    }
    
    // New method specific to Cat
    climb() {
        if (!this.indoor) {
            this.energy -= 20;
            console.log(\`\${this.name} climbs a tree! Energy: \${this.energy}\`);
        } else {
            console.log(\`\${this.name} climbs the cat tower.\`);
        }
    }
    
    purr() {
        console.log(\`\${this.name} purrs contentedly.\`);
    }
}

// Using inheritance
const dog = new Dog('Buddy', 'Golden Retriever');
const cat = new Cat('Whiskers', true);

console.log('\\nDog actions:');
dog.makeSound();
dog.eat('kibble');
dog.fetch();
dog.learnTrick('sit');
dog.learnTrick('roll over');
dog.performTrick();

console.log('\\nCat actions:');
cat.makeSound();
cat.eat('fish');
cat.climb();
cat.purr();

// Method Chaining
console.log('\\n=== Method Chaining ===');

class Calculator {
    constructor(value = 0) {
        this.value = value;
    }
    
    add(num) {
        this.value += num;
        return this; // Return this for chaining
    }
    
    subtract(num) {
        this.value -= num;
        return this;
    }
    
    multiply(num) {
        this.value *= num;
        return this;
    }
    
    divide(num) {
        if (num === 0) {
            throw new Error('Division by zero');
        }
        this.value /= num;
        return this;
    }
    
    power(num) {
        this.value = Math.pow(this.value, num);
        return this;
    }
    
    reset() {
        this.value = 0;
        return this;
    }
    
    getValue() {
        return this.value;
    }
    
    // Static method for chaining from start
    static start(value = 0) {
        return new Calculator(value);
    }
}

// Method chaining examples
const result1 = new Calculator(10)
    .add(5)
    .multiply(2)
    .subtract(5)
    .divide(5)
    .getValue();

console.log('Chaining result 1:', result1);

const result2 = Calculator
    .start(2)
    .power(3)
    .add(10)
    .multiply(2)
    .getValue();

console.log('Chaining result 2:', result2);

// Private Fields (Modern JavaScript)
console.log('\\n=== Private Fields ===');

class BankAccount {
    // Private fields (prefix with #)
    #balance = 0;
    #accountNumber;
    #transactions = [];
    
    constructor(initialBalance = 0, accountNumber) {
        this.#balance = initialBalance;
        this.#accountNumber = accountNumber;
        this.ownerName = '';
    }
    
    // Private method
    #recordTransaction(type, amount) {
        this.#transactions.push({
            type,
            amount,
            date: new Date(),
            balance: this.#balance
        });
    }
    
    deposit(amount) {
        if (amount <= 0) {
            throw new Error('Deposit amount must be positive');
        }
        
        this.#balance += amount;
        this.#recordTransaction('deposit', amount);
        console.log(\`Deposited $\${amount}. New balance: $\${this.#balance}\`);
    }
    
    withdraw(amount) {
        if (amount <= 0) {
            throw new Error('Withdrawal amount must be positive');
        }
        
        if (amount > this.#balance) {
            throw new Error('Insufficient funds');
        }
        
        this.#balance -= amount;
        this.#recordTransaction('withdrawal', amount);
        console.log(\`Withdrew $\${amount}. New balance: $\${this.#balance}\`);
    }
    
    getBalance() {
        return this.#balance;
    }
    
    getAccountNumber() {
        return this.#accountNumber;
    }
    
    getTransactionHistory() {
        return [...this.#transactions]; // Return copy
    }
}

const account = new BankAccount(1000, 'ACC123456');
account.ownerName = 'John Doe';

account.deposit(500);
account.withdraw(200);
account.deposit(100);

console.log('Account balance:', account.getBalance());
console.log('Account number:', account.getAccountNumber());
console.log('Transaction history:', account.getTransactionHistory());

// Try to access private field (will fail)
try {
    console.log(account.#balance); // SyntaxError
} catch (error) {
    console.log('Cannot access private fields directly');
}

// Abstract Base Class Pattern
console.log('\\n=== Abstract Base Class Pattern ===');

class Shape {
    constructor(name) {
        if (this.constructor === Shape) {
            throw new Error('Shape is an abstract class and cannot be instantiated');
        }
        this.name = name;
    }
    
    // Abstract methods (throw error if not overridden)
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
        return Math.PI * this.radius ** 2;
    }
    
    perimeter() {
        return 2 * Math.PI * this.radius;
    }
}

const rectangle = new Rectangle(5, 10);
const circle = new Circle(3);

console.log(rectangle.describe());
console.log(circle.describe());

// Try to instantiate abstract class
try {
    const shape = new Shape('Generic');
} catch (error) {
    console.log('Abstract class error:', error.message);
}

// Class Expression
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

const instance1 = new MyClass('test');
const instance2 = new AnotherClass('hello');

console.log('Named class expression:', instance1.getValue());
console.log('Anonymous class expression:', instance2.process());

// Factory function returning class
function createCounter(initialValue = 0) {
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

const CounterFrom10 = createCounter(10);
const CounterFrom0 = createCounter(0);

const counter1 = new CounterFrom10();
const counter2 = new CounterFrom0();

console.log('Counter 1 increment:', counter1.increment());
console.log('Counter 2 increment:', counter2.increment());

console.log('ES6 Classes examples completed');`,

  exercises: [
    {
      question: "Create a class hierarchy: Vehicle -> Car -> ElectricCar with appropriate properties and methods:",
      solution: `class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
  
  start() {
    console.log(\`\${this.make} \${this.model} is starting...\`);
  }
  
  getInfo() {
    return \`\${this.year} \${this.make} \${this.model}\`;
  }
}

class Car extends Vehicle {
  constructor(make, model, year, fuelType) {
    super(make, model, year);
    this.fuelType = fuelType;
    this.fuel = 100;
  }
  
  drive(distance) {
    const fuelUsed = distance * 0.1;
    this.fuel -= fuelUsed;
    console.log(\`Drove \${distance}km, fuel remaining: \${this.fuel}%\`);
  }
  
  refuel() {
    this.fuel = 100;
    console.log('Tank refueled');
  }
}

class ElectricCar extends Car {
  constructor(make, model, year, batteryCapacity) {
    super(make, model, year, 'Electric');
    this.batteryCapacity = batteryCapacity;
    this.charge = 100;
  }
  
  drive(distance) {
    const chargeUsed = distance * 0.2;
    this.charge -= chargeUsed;
    console.log(\`Drove \${distance}km, charge remaining: \${this.charge}%\`);
  }
  
  recharge() {
    this.charge = 100;
    console.log('Battery recharged');
  }
}`,
      explanation: "Inheritance allows sharing common functionality while adding specific features at each level."
    }
  ],

  quiz: [
    {
      question: "What does the 'super' keyword do in a class?",
      options: [
        "Creates a new instance",
        "Calls the parent class constructor or methods",
        "Makes a method static",
        "Defines a getter method"
      ],
      correct: 1,
      explanation: "The 'super' keyword is used to call the constructor or methods of the parent class."
    }
  ],

  resources: [
    {
      title: "MDN - Classes",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes"
    }
  ],

  nextModules: ['inheritance', 'static-methods'],
  prerequisites: ['constructor-functions', 'prototypes']
};