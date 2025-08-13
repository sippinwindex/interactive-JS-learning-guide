export default {
  title: 'Inheritance',
  duration: '45 min',
  difficulty: 'Advanced',
  overview: 'Master JavaScript inheritance patterns including prototypal inheritance, ES6 classes, mixins, and composition. Learn when to use inheritance vs composition.',
  
  keyPoints: [
    'JavaScript uses prototypal inheritance, not classical inheritance',
    'ES6 classes provide syntax sugar over prototypes',
    'super keyword accesses parent class methods and constructor',
    'Method overriding allows child classes to customize behavior',
    'Composition is often preferred over inheritance',
    'Mixins enable multiple inheritance-like behavior'
  ],

  example: `// Prototypal Inheritance Fundamentals
console.log('=== Prototypal Inheritance ===');

// Constructor function approach
function Animal(name, species) {
    this.name = name;
    this.species = species;
    this.energy = 100;
}

Animal.prototype.eat = function(food) {
    console.log(this.name + ' is eating ' + food);
    this.energy += 10;
    return this;
};

Animal.prototype.sleep = function() {
    console.log(this.name + ' is sleeping');
    this.energy += 20;
    return this;
};

Animal.prototype.move = function() {
    console.log(this.name + ' is moving');
    this.energy -= 5;
    return this;
};

// Child constructor
function Dog(name, breed) {
    Animal.call(this, name, 'Canine'); // Call parent constructor
    this.breed = breed;
    this.loyalty = 100;
}

// Set up inheritance
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Add dog-specific methods
Dog.prototype.bark = function() {
    console.log(this.name + ' says Woof!');
    this.energy -= 2;
    return this;
};

Dog.prototype.wagTail = function() {
    console.log(this.name + ' is wagging tail');
    this.loyalty += 5;
    return this;
};

// Method overriding
Dog.prototype.move = function() {
    console.log(this.name + ' is running');
    this.energy -= 8; // Dogs use more energy when moving
    return this;
};

// Create instances
const animal = new Animal('Generic Animal', 'Unknown');
const dog = new Dog('Buddy', 'Golden Retriever');

console.log('Animal:', animal);
console.log('Dog:', dog);

// Test inheritance
animal.eat('grass').sleep();
dog.eat('dog food').bark().wagTail().move();

console.log('Animal energy:', animal.energy);
console.log('Dog energy:', dog.energy);

// Check inheritance chain
console.log('dog instanceof Dog:', dog instanceof Dog);
console.log('dog instanceof Animal:', dog instanceof Animal);
console.log('Dog.prototype.isPrototypeOf(dog):', Dog.prototype.isPrototypeOf(dog));
console.log('Animal.prototype.isPrototypeOf(dog):', Animal.prototype.isPrototypeOf(dog));

// ES6 Class Inheritance
console.log('\\n=== ES6 Class Inheritance ===');

class Vehicle {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.isRunning = false;
        this.fuelLevel = 100;
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            console.log(this.make + ' ' + this.model + ' started');
        }
        return this;
    }
    
    stop() {
        if (this.isRunning) {
            this.isRunning = false;
            console.log(this.make + ' ' + this.model + ' stopped');
        }
        return this;
    }
    
    drive(distance) {
        if (!this.isRunning) {
            console.log('Vehicle must be started first');
            return this;
        }
        
        const fuelUsed = distance * 0.1;
        if (this.fuelLevel >= fuelUsed) {
            this.fuelLevel -= fuelUsed;
            console.log('Driving ' + distance + ' miles. Fuel remaining: ' + this.fuelLevel.toFixed(1));
        } else {
            console.log('Not enough fuel to drive ' + distance + ' miles');
        }
        return this;
    }
    
    refuel() {
        this.fuelLevel = 100;
        console.log('Vehicle refueled');
        return this;
    }
    
    getInfo() {
        return this.year + ' ' + this.make + ' ' + this.model;
    }
    
    // Static method
    static compare(vehicle1, vehicle2) {
        const age1 = new Date().getFullYear() - vehicle1.year;
        const age2 = new Date().getFullYear() - vehicle2.year;
        
        if (age1 < age2) return vehicle1.getInfo() + ' is newer';
        if (age1 > age2) return vehicle2.getInfo() + ' is newer';
        return 'Both vehicles are the same age';
    }
}

class Car extends Vehicle {
    constructor(make, model, year, doors, transmission) {
        super(make, model, year); // Call parent constructor
        this.doors = doors;
        this.transmission = transmission;
        this.airConditioningOn = false;
    }
    
    // Override parent method
    start() {
        super.start(); // Call parent method
        console.log('Car-specific startup sequence completed');
        return this;
    }
    
    // New methods specific to Car
    toggleAirConditioning() {
        this.airConditioningOn = !this.airConditioningOn;
        console.log('Air conditioning ' + (this.airConditioningOn ? 'on' : 'off'));
        return this;
    }
    
    honk() {
        console.log('Beep beep!');
        return this;
    }
    
    // Override drive method
    drive(distance) {
        if (this.airConditioningOn) {
            console.log('AC is on, using more fuel');
            const fuelUsed = distance * 0.15; // More fuel with AC
            if (this.fuelLevel >= fuelUsed) {
                this.fuelLevel -= fuelUsed;
                console.log('Driving ' + distance + ' miles with AC. Fuel remaining: ' + this.fuelLevel.toFixed(1));
            } else {
                console.log('Not enough fuel');
            }
        } else {
            super.drive(distance); // Call parent method
        }
        return this;
    }
    
    // Override getInfo
    getInfo() {
        return super.getInfo() + ' (' + this.doors + ' doors, ' + this.transmission + ')';
    }
}

class SportsCar extends Car {
    constructor(make, model, year, doors, transmission, horsepower) {
        super(make, model, year, doors, transmission);
        this.horsepower = horsepower;
        this.turboBoosted = false;
    }
    
    activateTurbo() {
        this.turboBoosted = true;
        console.log('Turbo activated! ' + this.horsepower + ' HP engaged');
        return this;
    }
    
    deactivateTurbo() {
        this.turboBoosted = false;
        console.log('Turbo deactivated');
        return this;
    }
    
    // Override drive with turbo consideration
    drive(distance) {
        if (this.turboBoosted) {
            console.log('Driving in turbo mode');
            const fuelUsed = distance * 0.2; // More fuel in turbo
            if (this.fuelLevel >= fuelUsed) {
                this.fuelLevel -= fuelUsed;
                console.log('Turbo driving ' + distance + ' miles. Fuel remaining: ' + this.fuelLevel.toFixed(1));
            } else {
                console.log('Not enough fuel for turbo mode');
            }
        } else {
            super.drive(distance);
        }
        return this;
    }
    
    getInfo() {
        return super.getInfo() + ' [' + this.horsepower + ' HP]';
    }
}

// Test ES6 inheritance
const car = new Car('Toyota', 'Camry', 2022, 4, 'Automatic');
const sportsCar = new SportsCar('Ferrari', '488', 2021, 2, 'Manual', 661);

console.log('Car info:', car.getInfo());
console.log('Sports car info:', sportsCar.getInfo());

// Test method calls and inheritance
car.start().toggleAirConditioning().drive(50).honk().stop();
console.log('');
sportsCar.start().activateTurbo().drive(30).deactivateTurbo().drive(20);

// Test static method
console.log('Comparison:', Vehicle.compare(car, sportsCar));

// Advanced Inheritance Patterns
console.log('\\n=== Advanced Inheritance Patterns ===');

// Mixin pattern
const Flyable = {
    fly() {
        console.log(this.name + ' is flying');
        return this;
    },
    
    land() {
        console.log(this.name + ' is landing');
        return this;
    }
};

const Swimmable = {
    swim() {
        console.log(this.name + ' is swimming');
        return this;
    },
    
    dive() {
        console.log(this.name + ' is diving');
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

// Bird class with flying ability
class Bird extends Animal {
    constructor(name, species, wingspan) {
        super(name, species);
        this.wingspan = wingspan;
    }
    
    chirp() {
        console.log(this.name + ' is chirping');
        return this;
    }
}

// Duck class with both flying and swimming
class Duck extends Bird {
    constructor(name, wingspan) {
        super(name, 'Duck', wingspan);
    }
    
    quack() {
        console.log(this.name + ' says Quack!');
        return this;
    }
}

// Add mixins
mixin(Bird, Flyable);
mixin(Duck, Flyable, Swimmable);

// Test mixins
const eagle = new Bird('Eagle', 'Bird of Prey', 7);
const duck = new Duck('Donald', 3);

console.log('Eagle abilities:');
eagle.eat('fish').fly().land().sleep();

console.log('\\nDuck abilities:');
duck.eat('breadcrumbs').fly().land().swim().dive().quack();

// Composition over Inheritance
console.log('\\n=== Composition over Inheritance ===');

// Instead of inheritance, use composition
class Engine {
    constructor(type, horsepower) {
        this.type = type;
        this.horsepower = horsepower;
        this.isRunning = false;
    }
    
    start() {
        this.isRunning = true;
        console.log(this.type + ' engine started (' + this.horsepower + ' HP)');
    }
    
    stop() {
        this.isRunning = false;
        console.log(this.type + ' engine stopped');
    }
}

class GPS {
    constructor() {
        this.currentLocation = { lat: 0, lng: 0 };
    }
    
    navigate(destination) {
        console.log('Navigating to ' + destination);
        return 'Route calculated';
    }
    
    getCurrentLocation() {
        return this.currentLocation;
    }
}

class Radio {
    constructor() {
        this.isOn = false;
        this.station = 101.1;
    }
    
    turnOn() {
        this.isOn = true;
        console.log('Radio on - Station ' + this.station);
    }
    
    turnOff() {
        this.isOn = false;
        console.log('Radio off');
    }
    
    changeStation(station) {
        this.station = station;
        console.log('Changed to station ' + station);
    }
}

// Vehicle using composition
class ModernCar {
    constructor(make, model, engineType, horsepower) {
        this.make = make;
        this.model = model;
        this.engine = new Engine(engineType, horsepower);
        this.gps = new GPS();
        this.radio = new Radio();
    }
    
    start() {
        this.engine.start();
        this.radio.turnOn();
        console.log(this.make + ' ' + this.model + ' ready to go');
    }
    
    stop() {
        this.engine.stop();
        this.radio.turnOff();
        console.log(this.make + ' ' + this.model + ' stopped');
    }
    
    navigateTo(destination) {
        return this.gps.navigate(destination);
    }
    
    changeRadioStation(station) {
        this.radio.changeStation(station);
    }
}

const modernCar = new ModernCar('Tesla', 'Model S', 'Electric', 400);
modernCar.start();
modernCar.navigateTo('San Francisco');
modernCar.changeRadioStation(95.5);
modernCar.stop();

// Abstract Base Class Pattern
console.log('\\n=== Abstract Base Class Pattern ===');

class Shape {
    constructor(color) {
        if (this.constructor === Shape) {
            throw new Error('Shape is an abstract class and cannot be instantiated');
        }
        this.color = color;
    }
    
    // Abstract method (must be implemented by subclasses)
    getArea() {
        throw new Error('getArea() must be implemented by subclass');
    }
    
    getPerimeter() {
        throw new Error('getPerimeter() must be implemented by subclass');
    }
    
    // Concrete method (can be used by all subclasses)
    describe() {
        return 'A ' + this.color + ' ' + this.constructor.name + 
               ' with area ' + this.getArea() + 
               ' and perimeter ' + this.getPerimeter();
    }
    
    paint(newColor) {
        console.log('Painting ' + this.constructor.name + ' from ' + this.color + ' to ' + newColor);
        this.color = newColor;
    }
}

class Rectangle extends Shape {
    constructor(width, height, color) {
        super(color);
        this.width = width;
        this.height = height;
    }
    
    getArea() {
        return this.width * this.height;
    }
    
    getPerimeter() {
        return 2 * (this.width + this.height);
    }
}

class Circle extends Shape {
    constructor(radius, color) {
        super(color);
        this.radius = radius;
    }
    
    getArea() {
        return Math.PI * this.radius * this.radius;
    }
    
    getPerimeter() {
        return 2 * Math.PI * this.radius;
    }
}

// Test abstract class
try {
    // This should throw an error
    const shape = new Shape('red');
} catch (error) {
    console.log('Abstract class error:', error.message);
}

const rectangle = new Rectangle(5, 3, 'blue');
const circle = new Circle(4, 'green');

console.log('Rectangle:', rectangle.describe());
console.log('Circle:', circle.describe());

rectangle.paint('yellow');
console.log('Rectangle after painting:', rectangle.describe());

// Factory Pattern with Inheritance
console.log('\\n=== Factory Pattern with Inheritance ===');

class AnimalFactory {
    static createAnimal(type, name, ...args) {
        switch (type.toLowerCase()) {
            case 'dog':
                return new Dog(name, args[0] || 'Mixed');
            case 'bird':
                return new Bird(name, args[0] || 'Bird', args[1] || 2);
            case 'duck':
                return new Duck(name, args[0] || 3);
            default:
                return new Animal(name, type);
        }
    }
    
    static createAnimals(animalData) {
        return animalData.map(data => 
            AnimalFactory.createAnimal(data.type, data.name, ...data.args)
        );
    }
}

// Test factory
const animalData = [
    { type: 'dog', name: 'Rex', args: ['German Shepherd'] },
    { type: 'bird', name: 'Tweety', args: ['Canary', 1] },
    { type: 'duck', name: 'Daffy', args: [2.5] },
    { type: 'cat', name: 'Whiskers', args: [] }
];

const animals = AnimalFactory.createAnimals(animalData);
console.log('Created animals:', animals.map(animal => animal.name + ' (' + animal.species + ')'));

// Method Chaining with Inheritance
console.log('\\n=== Method Chaining with Inheritance ===');

class FluentAnimal extends Animal {
    setName(name) {
        this.name = name;
        return this;
    }
    
    setSpecies(species) {
        this.species = species;
        return this;
    }
    
    setEnergy(energy) {
        this.energy = energy;
        return this;
    }
    
    describe() {
        console.log('Name: ' + this.name + ', Species: ' + this.species + ', Energy: ' + this.energy);
        return this;
    }
}

class FluentDog extends FluentAnimal {
    setBreed(breed) {
        this.breed = breed;
        return this;
    }
    
    setLoyalty(loyalty) {
        this.loyalty = loyalty;
        return this;
    }
    
    // Override describe to include dog-specific info
    describe() {
        console.log('Name: ' + this.name + 
                   ', Species: ' + this.species + 
                   ', Breed: ' + (this.breed || 'Unknown') +
                   ', Energy: ' + this.energy + 
                   ', Loyalty: ' + (this.loyalty || 'Unknown'));
        return this;
    }
}

// Test fluent interface
const fluentDog = new FluentDog()
    .setName('Buddy')
    .setSpecies('Canine')
    .setBreed('Golden Retriever')
    .setEnergy(85)
    .setLoyalty(95)
    .describe()
    .eat('treats')
    .bark()
    .describe();

console.log('\\nInheritance examples completed');`,

  exercises: [
    {
      question: "Create an Employee hierarchy with Manager and Developer classes that demonstrates inheritance, method overriding, and composition:",
      solution: `// Base Employee class
class Employee {
  constructor(name, id, salary, department) {
    this.name = name;
    this.id = id;
    this.salary = salary;
    this.department = department;
    this.startDate = new Date();
  }
  
  work() {
    console.log(\`\${this.name} is working\`);
    return this;
  }
  
  takeBreak() {
    console.log(\`\${this.name} is taking a break\`);
    return this;
  }
  
  getInfo() {
    return \`\${this.name} (ID: \${this.id}) - \${this.department}\`;
  }
  
  calculateBonus() {
    return this.salary * 0.05; // 5% base bonus
  }
}

// Manager class extends Employee
class Manager extends Employee {
  constructor(name, id, salary, department, teamSize) {
    super(name, id, salary, department);
    this.teamSize = teamSize;
    this.directReports = [];
  }
  
  // Override work method
  work() {
    console.log(\`\${this.name} is managing the team and planning projects\`);
    return this;
  }
  
  // Manager-specific methods
  holdMeeting() {
    console.log(\`\${this.name} is holding a team meeting\`);
    return this;
  }
  
  addDirectReport(employee) {
    this.directReports.push(employee);
    console.log(\`\${employee.name} now reports to \${this.name}\`);
    return this;
  }
  
  // Override bonus calculation
  calculateBonus() {
    const baseBonus = super.calculateBonus();
    const teamBonus = this.teamSize * 1000; // $1000 per team member
    return baseBonus + teamBonus;
  }
  
  getInfo() {
    return super.getInfo() + \` - Managing \${this.teamSize} people\`;
  }
}

// Developer class extends Employee
class Developer extends Employee {
  constructor(name, id, salary, department, programmingLanguages) {
    super(name, id, salary, department);
    this.programmingLanguages = programmingLanguages || [];
    this.projectsCompleted = 0;
  }
  
  // Override work method
  work() {
    console.log(\`\${this.name} is coding and debugging\`);
    return this;
  }
  
  // Developer-specific methods
  code(project) {
    console.log(\`\${this.name} is coding \${project}\`);
    return this;
  }
  
  completeProject() {
    this.projectsCompleted++;
    console.log(\`\${this.name} completed project #\${this.projectsCompleted}\`);
    return this;
  }
  
  learnLanguage(language) {
    if (!this.programmingLanguages.includes(language)) {
      this.programmingLanguages.push(language);
      console.log(\`\${this.name} learned \${language}\`);
    }
    return this;
  }
  
  // Override bonus calculation
  calculateBonus() {
    const baseBonus = super.calculateBonus();
    const projectBonus = this.projectsCompleted * 500; // $500 per project
    return baseBonus + projectBonus;
  }
  
  getInfo() {
    return super.getInfo() + \` - Languages: \${this.programmingLanguages.join(', ')}\`;
  }
}

// Usage:
const manager = new Manager('Alice Johnson', 'M001', 120000, 'Engineering', 8);
const developer = new Developer('Bob Smith', 'D001', 95000, 'Engineering', ['JavaScript', 'Python']);

manager.work().holdMeeting().addDirectReport(developer);
developer.work().code('User Authentication').completeProject().learnLanguage('TypeScript');

console.log('Manager Info:', manager.getInfo());
console.log('Developer Info:', developer.getInfo());
console.log('Manager Bonus:', manager.calculateBonus());
console.log('Developer Bonus:', developer.calculateBonus());`,
      explanation: "This hierarchy demonstrates inheritance with proper use of super(), method overriding for specialized behavior, and bonus calculation that builds upon the parent class implementation."
    }
  ],

  quiz: [
    {
      question: "What does the 'super' keyword do in JavaScript inheritance?",
      options: [
        "Creates a new instance of the parent class",
        "Calls methods and constructor of the parent class",
        "Overrides parent class methods completely",
        "Makes a class abstract"
      ],
      correct: 1,
      explanation: "The 'super' keyword is used to call the constructor and methods of the parent class, allowing child classes to extend and build upon parent functionality."
    }
  ],

  resources: [
    {
      title: "MDN - Classes and Inheritance",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes"
    },
    {
      title: "MDN - Object.create()",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create"
    },
    {
      title: "Composition vs Inheritance",
      url: "https://medium.com/javascript-scene/10-interview-questions-every-javascript-developer-should-know-6fa6bdf5ad95"
    }
  ],

  nextModules: ['getters-setters', 'private-fields', 'static-methods'],
  prerequisites: ['es6-classes', 'prototypes', 'constructor-functions']
};