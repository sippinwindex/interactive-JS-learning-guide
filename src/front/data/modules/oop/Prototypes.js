// src/front/data/modules/oop/Prototypes.js
export default {
  title: 'Prototypes',
  duration: '40 min',
  difficulty: 'Intermediate',
  overview: 'Understand JavaScript\'s prototype-based inheritance system. Learn how objects inherit properties and methods through the prototype chain.',
  
  keyPoints: [
    'Every object has a prototype (except Object.prototype)',
    'Prototype chain enables inheritance in JavaScript',
    'Objects inherit from their constructor\'s prototype',
    'Prototype lookup traverses the chain until found',
    'Can modify prototypes at runtime',
    'Understanding prototypes is key to JavaScript OOP'
  ],

  example: `// Understanding Prototypes
console.log('=== Understanding Prototypes ===');

// Every function has a prototype property
function Person(name) {
    this.name = name;
}

console.log('Person.prototype:', Person.prototype);
console.log('typeof Person.prototype:', typeof Person.prototype);

// Add method to prototype
Person.prototype.greet = function() {
    return \`Hello, I'm \${this.name}\`;
};

// Create instances
const alice = new Person('Alice');
const bob = new Person('Bob');

console.log('Alice greeting:', alice.greet());
console.log('Bob greeting:', bob.greet());

// Both instances share the same method
console.log('Same method reference:', alice.greet === bob.greet); // true

// Instance vs Prototype Properties
console.log('\\n=== Instance vs Prototype Properties ===');

// Prototype property
Person.prototype.species = 'Homo sapiens';

// Instance property
alice.age = 30;
bob.age = 25;

console.log('Alice species (from prototype):', alice.species);
console.log('Bob species (from prototype):', bob.species);
console.log('Alice age (instance property):', alice.age);
console.log('Bob age (instance property):', bob.age);

// Instance property shadows prototype property
alice.species = 'Human'; // This creates an instance property
console.log('Alice species (instance override):', alice.species);
console.log('Bob species (still from prototype):', bob.species);

// Delete instance property to reveal prototype property
delete alice.species;
console.log('Alice species (after delete):', alice.species);

// Prototype Chain
console.log('\\n=== Prototype Chain ===');

// Check prototype relationships
console.log('alice.__proto__ === Person.prototype:', alice.__proto__ === Person.prototype);
console.log('Person.prototype.__proto__ === Object.prototype:', Person.prototype.__proto__ === Object.prototype);
console.log('Object.prototype.__proto__:', Object.prototype.__proto__); // null - end of chain

// Using Object.getPrototypeOf (preferred over __proto__)
console.log('Object.getPrototypeOf(alice) === Person.prototype:', 
    Object.getPrototypeOf(alice) === Person.prototype);

// Checking property ownership
console.log('alice.hasOwnProperty("name"):', alice.hasOwnProperty('name')); // true
console.log('alice.hasOwnProperty("species"):', alice.hasOwnProperty('species')); // false
console.log('alice.hasOwnProperty("greet"):', alice.hasOwnProperty('greet')); // false

// Property lookup in prototype chain
function demonstratePrototypeChain() {
    const obj = {
        level: 'object'
    };
    
    const childObj = Object.create(obj);
    childObj.level = 'child';
    childObj.childProp = 'child property';
    
    const grandChildObj = Object.create(childObj);
    grandChildObj.grandChildProp = 'grandchild property';
    
    console.log('Prototype chain lookup:');
    console.log('grandChildObj.grandChildProp:', grandChildObj.grandChildProp); // own property
    console.log('grandChildObj.childProp:', grandChildObj.childProp); // from parent
    console.log('grandChildObj.level:', grandChildObj.level); // from parent (shadows grandparent)
    console.log('grandChildObj.toString:', typeof grandChildObj.toString); // from Object.prototype
    
    return { obj, childObj, grandChildObj };
}

const chainDemo = demonstratePrototypeChain();

// Object.create() for Manual Inheritance
console.log('\\n=== Object.create() ===');

// Create object with specific prototype
const animal = {
    type: 'Animal',
    speak: function() {
        console.log(\`\${this.name} makes a sound\`);
    },
    eat: function(food) {
        console.log(\`\${this.name} eats \${food}\`);
    }
};

// Create dog object that inherits from animal
const dog = Object.create(animal);
dog.name = 'Buddy';
dog.breed = 'Golden Retriever';
dog.speak = function() {
    console.log(\`\${this.name} barks: Woof!\`);
};

console.log('Dog type (inherited):', dog.type);
dog.speak(); // Uses overridden method
dog.eat('kibble'); // Uses inherited method

// Check inheritance
console.log('dog inherits from animal:', Object.getPrototypeOf(dog) === animal);

// Create object with null prototype (no inheritance)
const pureObject = Object.create(null);
pureObject.prop = 'value';
console.log('pureObject.toString:', pureObject.toString); // undefined - no Object.prototype methods

// Constructor Prototype Modification
console.log('\\n=== Constructor Prototype Modification ===');

function Vehicle(type) {
    this.type = type;
    this.speed = 0;
}

Vehicle.prototype.accelerate = function(amount) {
    this.speed += amount;
    console.log(\`\${this.type} accelerating to \${this.speed} mph\`);
};

Vehicle.prototype.brake = function() {
    this.speed = Math.max(0, this.speed - 10);
    console.log(\`\${this.type} braking to \${this.speed} mph\`);
};

const car = new Vehicle('Car');
const bike = new Vehicle('Bike');

car.accelerate(30);
bike.accelerate(15);

// Add new method to prototype after instances are created
Vehicle.prototype.honk = function() {
    console.log(\`\${this.type} goes beep beep!\`);
};

// Existing instances immediately get the new method
car.honk();
bike.honk();

// Modify existing prototype method
Vehicle.prototype.accelerate = function(amount) {
    this.speed += amount;
    console.log(\`🚗 \${this.type} zooms to \${this.speed} mph!\`);
};

car.accelerate(20); // Uses modified method

// Prototype-based Inheritance Patterns
console.log('\\n=== Inheritance Patterns ===');

// Pattern 1: Classical inheritance with constructors
function Animal(name) {
    this.name = name;
    this.energy = 100;
}

Animal.prototype.eat = function() {
    this.energy += 10;
    console.log(\`\${this.name} eats. Energy: \${this.energy}\`);
};

Animal.prototype.sleep = function() {
    this.energy += 20;
    console.log(\`\${this.name} sleeps. Energy: \${this.energy}\`);
};

// Child constructor
function Dog(name, breed) {
    Animal.call(this, name); // Call parent constructor
    this.breed = breed;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog; // Fix constructor reference

// Add child-specific methods
Dog.prototype.bark = function() {
    this.energy -= 5;
    console.log(\`\${this.name} barks! Energy: \${this.energy}\`);
};

// Override parent method
Dog.prototype.eat = function() {
    this.energy += 15; // Dogs get more energy from eating
    console.log(\`\${this.name} eats dog food. Energy: \${this.energy}\`);
};

const buddy = new Dog('Buddy', 'Labrador');
console.log('Dog created:', buddy);

buddy.eat(); // Uses overridden method
buddy.bark(); // Uses child method
buddy.sleep(); // Uses inherited method

// Verify inheritance chain
console.log('buddy instanceof Dog:', buddy instanceof Dog);
console.log('buddy instanceof Animal:', buddy instanceof Animal);
console.log('buddy.constructor === Dog:', buddy.constructor === Dog);

// Pattern 2: Factory function with prototypes
function createCat(name, color) {
    const cat = Object.create(createCat.prototype);
    cat.name = name;
    cat.color = color;
    cat.lives = 9;
    return cat;
}

createCat.prototype.meow = function() {
    console.log(\`\${this.name} says: Meow!\`);
};

createCat.prototype.useLife = function() {
    if (this.lives > 0) {
        this.lives--;
        console.log(\`\${this.name} used a life. \${this.lives} lives remaining.\`);
    } else {
        console.log(\`\${this.name} has no lives left!\`);
    }
};

const whiskers = createCat('Whiskers', 'orange');
whiskers.meow();
whiskers.useLife();

// Advanced Prototype Techniques
console.log('\\n=== Advanced Prototype Techniques ===');

// 1. Mixin pattern using prototypes
const CanFly = {
    fly: function() {
        console.log(\`\${this.name} is flying!\`);
    },
    land: function() {
        console.log(\`\${this.name} has landed.\`);
    }
};

const CanSwim = {
    swim: function() {
        console.log(\`\${this.name} is swimming!\`);
    },
    dive: function() {
        console.log(\`\${this.name} dives underwater!\`);
    }
};

// Apply mixins to constructor prototype
function Bird(name) {
    this.name = name;
}

Object.assign(Bird.prototype, CanFly);

function Duck(name) {
    Bird.call(this, name);
}

Duck.prototype = Object.create(Bird.prototype);
Duck.prototype.constructor = Duck;
Object.assign(Duck.prototype, CanSwim);

const mallard = new Duck('Mallard');
mallard.fly(); // From CanFly mixin
mallard.swim(); // From CanSwim mixin
mallard.land(); // From CanFly mixin

// 2. Prototype delegation pattern
const Rectangle = {
    init: function(width, height) {
        this.width = width;
        this.height = height;
        return this;
    },
    
    area: function() {
        return this.width * this.height;
    },
    
    perimeter: function() {
        return 2 * (this.width + this.height);
    }
};

const Square = Object.create(Rectangle);
Square.init = function(side) {
    return Rectangle.init.call(this, side, side);
};

Square.isSquare = function() {
    return this.width === this.height;
};

const mySquare = Object.create(Square).init(5);
console.log('Square area:', mySquare.area());
console.log('Is square:', mySquare.isSquare());

// 3. Prototype chain debugging
function debugPrototypeChain(obj, name = 'object') {
    console.log(\`\\nPrototype chain for \${name}:\`);
    let current = obj;
    let level = 0;
    
    while (current !== null) {
        const constructor = current.constructor ? current.constructor.name : 'Unknown';
        const ownProps = Object.getOwnPropertyNames(current).filter(prop => prop !== 'constructor');
        
        console.log(\`  Level \${level}: \${constructor}\`);
        console.log(\`    Own properties: [\${ownProps.join(', ')}]\`);
        
        current = Object.getPrototypeOf(current);
        level++;
        
        if (level > 10) { // Prevent infinite loops
            console.log('  ... (stopping to prevent infinite loop)');
            break;
        }
    }
}

debugPrototypeChain(buddy, 'buddy (Dog instance)');
debugPrototypeChain(mallard, 'mallard (Duck instance)');

// Prototype Pollution (Security Concern)
console.log('\\n=== Prototype Pollution Awareness ===');

// ❌ Dangerous: Modifying Object.prototype affects ALL objects
// Object.prototype.malicious = 'This affects everything!';

// Instead, be careful with user input that might modify prototypes
function safeAssign(target, source) {
    for (const key in source) {
        if (source.hasOwnProperty(key) && key !== '__proto__' && key !== 'constructor') {
            target[key] = source[key];
        }
    }
    return target;
}

// Safer approach to extending prototypes
function extendPrototype(constructor, methods) {
    Object.keys(methods).forEach(method => {
        if (typeof methods[method] === 'function') {
            constructor.prototype[method] = methods[method];
        }
    });
}

// Usage
extendPrototype(Person, {
    getAge: function() {
        return this.age || 'Age not set';
    },
    setAge: function(age) {
        if (age >= 0 && age <= 150) {
            this.age = age;
        } else {
            throw new Error('Invalid age');
        }
    }
});

alice.setAge(30);
console.log('Alice age:', alice.getAge());

// Performance Considerations
console.log('\\n=== Performance Considerations ===');

// Prototype methods are more memory efficient
function TestConstructor(value) {
    this.value = value;
    
    // ❌ Less efficient: each instance gets its own copy
    this.inefficientMethod = function() {
        return this.value * 2;
    };
}

// ✅ More efficient: shared across all instances
TestConstructor.prototype.efficientMethod = function() {
    return this.value * 2;
};

const test1 = new TestConstructor(5);
const test2 = new TestConstructor(10);

console.log('Different inefficient methods:', test1.inefficientMethod !== test2.inefficientMethod);
console.log('Same efficient methods:', test1.efficientMethod === test2.efficientMethod);

// Property access performance
function measurePropertyAccess() {
    const obj = new Dog('Speed Test', 'Fast Breed');
    const iterations = 1000000;
    
    // Test own property access
    console.time('Own property access');
    for (let i = 0; i < iterations; i++) {
        const name = obj.name; // Own property
    }
    console.timeEnd('Own property access');
    
    // Test prototype property access
    console.time('Prototype property access');
    for (let i = 0; i < iterations; i++) {
        const eat = obj.eat; // From Animal.prototype
    }
    console.timeEnd('Prototype property access');
    
    // Test hasOwnProperty
    console.time('hasOwnProperty check');
    for (let i = 0; i < iterations; i++) {
        const hasName = obj.hasOwnProperty('name');
    }
    console.timeEnd('hasOwnProperty check');
}

measurePropertyAccess();

// Modern Prototype Utilities
console.log('\\n=== Modern Prototype Utilities ===');

// Object.setPrototypeOf (ES6) - use with caution
const modernAnimal = {
    speak: function() {
        console.log(\`\${this.name} makes a sound\`);
    }
};

const modernDog = {
    name: 'Modern Dog',
    bark: function() {
        console.log(\`\${this.name} barks!\`);
    }
};

Object.setPrototypeOf(modernDog, modernAnimal);
modernDog.speak(); // Now available

// Object.getOwnPropertyDescriptor for prototype properties
const descriptor = Object.getOwnPropertyDescriptor(Person.prototype, 'greet');
console.log('greet method descriptor:', descriptor);

// Object.defineProperty on prototype
Object.defineProperty(Person.prototype, 'species', {
    value: 'Homo sapiens',
    writable: false,
    enumerable: true,
    configurable: false
});

// Proxy for prototype customization (advanced)
const ProxiedConstructor = function(name) {
    this.name = name;
};

ProxiedConstructor.prototype = new Proxy({}, {
    get: function(target, property) {
        if (property in target) {
            return target[property];
        }
        
        // Dynamic method generation
        if (property.startsWith('get')) {
            const prop = property.slice(3).toLowerCase();
            return function() {
                return this[prop] || \`No \${prop} property\`;
            };
        }
        
        return undefined;
    }
});

const proxiedObj = new ProxiedConstructor('Proxy Test');
proxiedObj.age = 25;
console.log('Dynamic getter:', proxiedObj.getAge()); // Dynamic method
console.log('Dynamic getter (missing):', proxiedObj.getHeight()); // Dynamic method for missing prop

// Best Practices Summary
console.log('\\n=== Prototype Best Practices ===');
console.log('✅ Add methods to prototype for memory efficiency');
console.log('✅ Use Object.create() for clean inheritance');
console.log('✅ Always fix constructor reference after inheritance');
console.log('✅ Use hasOwnProperty() to check for own properties');
console.log('✅ Be cautious about modifying built-in prototypes');
console.log('✅ Consider composition over inheritance for complex hierarchies');
console.log('✅ Use Object.getPrototypeOf() instead of __proto__');
console.log('⚠️  Avoid Object.setPrototypeOf() in performance-critical code');

console.log('Prototypes examples completed');`,

  exercises: [
    {
      question: "Create a prototype-based inheritance system for geometric shapes with area calculation:",
      solution: `// Base Shape
function Shape() {
  this.type = 'Shape';
}

Shape.prototype.area = function() {
  throw new Error('Area method must be implemented by subclass');
};

Shape.prototype.describe = function() {
  return \`This is a \${this.type} with area \${this.area()}\`;
};

// Rectangle inherits from Shape
function Rectangle(width, height) {
  Shape.call(this);
  this.type = 'Rectangle';
  this.width = width;
  this.height = height;
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

Rectangle.prototype.area = function() {
  return this.width * this.height;
};

// Circle inherits from Shape
function Circle(radius) {
  Shape.call(this);
  this.type = 'Circle';
  this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.area = function() {
  return Math.PI * this.radius * this.radius;
};`,
      explanation: "Prototype inheritance allows sharing common methods while enabling specific implementations for each shape type."
    }
  ],

  quiz: [
    {
      question: "What happens when you access a property that doesn't exist on an object?",
      options: [
        "JavaScript throws an error",
        "JavaScript returns null",
        "JavaScript looks up the prototype chain",
        "JavaScript returns false"
      ],
      correct: 2,
      explanation: "JavaScript automatically traverses the prototype chain looking for the property until it reaches Object.prototype (or null)."
    }
  ],

  resources: [
    {
      title: "MDN - Object Prototypes",
      url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_prototypes"
    },
    {
      title: "You Don't Know JS - this & Object Prototypes",
      url: "https://github.com/getify/You-Dont-Know-JS/tree/1st-ed/this%20%26%20object%20prototypes"
    }
  ],

  nextModules: ['es6-classes', 'inheritance'],
  prerequisites: ['constructor-functions', 'objects', 'this-keyword']
};