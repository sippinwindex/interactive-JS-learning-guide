// src/front/data/modules/advanced/DesignPatterns.js
export default {
  title: 'JavaScript Design Patterns',
  duration: '50 min',
  difficulty: 'Advanced',
  overview: 'Learn essential design patterns in JavaScript. Master Singleton, Observer, Factory, Module patterns and more for building scalable applications.',
  
  keyPoints: [
    'Design patterns solve common programming problems',
    'Singleton ensures single instance of a class',
    'Observer pattern enables event-driven architecture',
    'Factory pattern abstracts object creation',
    'Module pattern provides encapsulation',
    'Strategy pattern enables algorithm switching'
  ],

  example: `// Singleton Pattern
console.log('=== Singleton Pattern ===');

class DatabaseConnection {
    constructor() {
        if (DatabaseConnection.instance) {
            return DatabaseConnection.instance;
        }
        
        this.connection = 'Connected to database';
        this.queries = 0;
        DatabaseConnection.instance = this;
    }
    
    query(sql) {
        this.queries++;
        return \`Executing: \${sql} (Query #\${this.queries})\`;
    }
    
    getStats() {
        return \`Connection: \${this.connection}, Queries: \${this.queries}\`;
    }
}

// Test singleton
const db1 = new DatabaseConnection();
const db2 = new DatabaseConnection();

console.log('Same instance?', db1 === db2); // true
console.log(db1.query('SELECT * FROM users'));
console.log(db2.getStats()); // Shows query count from db1

// Observer Pattern
console.log('=== Observer Pattern ===');

class EventEmitter {
    constructor() {
        this.events = {};
    }
    
    on(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = [];
        }
        this.events[eventName].push(callback);
    }
    
    off(eventName, callback) {
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName]
                .filter(cb => cb !== callback);
        }
    }
    
    emit(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(callback => {
                callback(data);
            });
        }
    }
}

// Usage
const emitter = new EventEmitter();

const userLoginHandler = (user) => {
    console.log(\`User logged in: \${user.name}\`);
};

const analyticsHandler = (user) => {
    console.log(\`Analytics: User \${user.id} login recorded\`);
};

emitter.on('userLogin', userLoginHandler);
emitter.on('userLogin', analyticsHandler);

emitter.emit('userLogin', { id: 1, name: 'Alice' });

// Factory Pattern
console.log('=== Factory Pattern ===');

class Car {
    constructor(model, year) {
        this.model = model;
        this.year = year;
        this.type = 'car';
    }
    
    start() {
        return \`\${this.model} car is starting...\`;
    }
}

class Motorcycle {
    constructor(model, year) {
        this.model = model;
        this.year = year;
        this.type = 'motorcycle';
    }
    
    start() {
        return \`\${this.model} motorcycle is revving up!\`;
    }
}

class VehicleFactory {
    static createVehicle(type, model, year) {
        switch (type.toLowerCase()) {
            case 'car':
                return new Car(model, year);
            case 'motorcycle':
                return new Motorcycle(model, year);
            default:
                throw new Error(\`Unknown vehicle type: \${type}\`);
        }
    }
}

// Usage
const myCar = VehicleFactory.createVehicle('car', 'Toyota Camry', 2023);
const myBike = VehicleFactory.createVehicle('motorcycle', 'Harley Davidson', 2023);

console.log(myCar.start());
console.log(myBike.start());

// Module Pattern
console.log('=== Module Pattern ===');

const ShoppingCart = (function() {
    // Private variables
    let items = [];
    let total = 0;
    
    // Private methods
    function calculateTotal() {
        total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
    
    function validateItem(item) {
        return item && item.name && item.price > 0 && item.quantity > 0;
    }
    
    // Public API
    return {
        addItem(item) {
            if (!validateItem(item)) {
                throw new Error('Invalid item');
            }
            
            const existingItem = items.find(i => i.name === item.name);
            if (existingItem) {
                existingItem.quantity += item.quantity;
            } else {
                items.push({ ...item });
            }
            
            calculateTotal();
            console.log(\`Added \${item.name} to cart\`);
        },
        
        removeItem(itemName) {
            items = items.filter(item => item.name !== itemName);
            calculateTotal();
            console.log(\`Removed \${itemName} from cart\`);
        },
        
        getItems() {
            return [...items]; // Return copy
        },
        
        getTotal() {
            return total;
        },
        
        clear() {
            items = [];
            total = 0;
            console.log('Cart cleared');
        }
    };
})();

// Usage
ShoppingCart.addItem({ name: 'Laptop', price: 999, quantity: 1 });
ShoppingCart.addItem({ name: 'Mouse', price: 25, quantity: 2 });
console.log('Cart total:', ShoppingCart.getTotal());
console.log('Cart items:', ShoppingCart.getItems());

// Strategy Pattern
console.log('=== Strategy Pattern ===');

class PaymentProcessor {
    constructor(strategy) {
        this.strategy = strategy;
    }
    
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    
    processPayment(amount) {
        return this.strategy.pay(amount);
    }
}

class CreditCardPayment {
    constructor(cardNumber, cvv) {
        this.cardNumber = cardNumber;
        this.cvv = cvv;
    }
    
    pay(amount) {
        return \`Paid $\${amount} using Credit Card ending in \${this.cardNumber.slice(-4)}\`;
    }
}

class PayPalPayment {
    constructor(email) {
        this.email = email;
    }
    
    pay(amount) {
        return \`Paid $\${amount} using PayPal account \${this.email}\`;
    }
}

class BitcoinPayment {
    constructor(address) {
        this.address = address;
    }
    
    pay(amount) {
        return \`Paid $\${amount} using Bitcoin address \${this.address.slice(0, 8)}...\`;
    }
}

// Usage
const processor = new PaymentProcessor(new CreditCardPayment('1234567890123456', '123'));
console.log(processor.processPayment(100));

processor.setStrategy(new PayPalPayment('user@example.com'));
console.log(processor.processPayment(50));

processor.setStrategy(new BitcoinPayment('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'));
console.log(processor.processPayment(75));

// Command Pattern
console.log('=== Command Pattern ===');

class Light {
    constructor(location) {
        this.location = location;
        this.isOn = false;
    }
    
    turnOn() {
        this.isOn = true;
        return \`\${this.location} light is ON\`;
    }
    
    turnOff() {
        this.isOn = false;
        return \`\${this.location} light is OFF\`;
    }
}

class LightOnCommand {
    constructor(light) {
        this.light = light;
    }
    
    execute() {
        return this.light.turnOn();
    }
    
    undo() {
        return this.light.turnOff();
    }
}

class LightOffCommand {
    constructor(light) {
        this.light = light;
    }
    
    execute() {
        return this.light.turnOff();
    }
    
    undo() {
        return this.light.turnOn();
    }
}

class RemoteControl {
    constructor() {
        this.commands = {};
        this.lastCommand = null;
    }
    
    setCommand(slot, command) {
        this.commands[slot] = command;
    }
    
    pressButton(slot) {
        if (this.commands[slot]) {
            this.lastCommand = this.commands[slot];
            return this.commands[slot].execute();
        }
        return 'No command set for this slot';
    }
    
    pressUndo() {
        if (this.lastCommand) {
            return this.lastCommand.undo();
        }
        return 'No command to undo';
    }
}

// Usage
const livingRoomLight = new Light('Living Room');
const kitchenLight = new Light('Kitchen');

const remote = new RemoteControl();
remote.setCommand(1, new LightOnCommand(livingRoomLight));
remote.setCommand(2, new LightOffCommand(livingRoomLight));
remote.setCommand(3, new LightOnCommand(kitchenLight));

console.log(remote.pressButton(1)); // Turn on living room light
console.log(remote.pressButton(3)); // Turn on kitchen light
console.log(remote.pressUndo());    // Undo last command

// Builder Pattern
console.log('=== Builder Pattern ===');

class Computer {
    constructor() {
        this.cpu = '';
        this.ram = '';
        this.storage = '';
        this.gpu = '';
        this.motherboard = '';
    }
    
    getSpecs() {
        return {
            cpu: this.cpu,
            ram: this.ram,
            storage: this.storage,
            gpu: this.gpu,
            motherboard: this.motherboard
        };
    }
}

class ComputerBuilder {
    constructor() {
        this.computer = new Computer();
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
    
    build() {
        return this.computer;
    }
}

// Usage
const gamingPC = new ComputerBuilder()
    .setCPU('Intel i9-13900K')
    .setRAM('32GB DDR5')
    .setStorage('1TB NVMe SSD')
    .setGPU('RTX 4080')
    .setMotherboard('ASUS ROG Strix')
    .build();

console.log('Gaming PC specs:', gamingPC.getSpecs());

// Decorator Pattern
console.log('=== Decorator Pattern ===');

class Coffee {
    cost() {
        return 2;
    }
    
    description() {
        return 'Simple coffee';
    }
}

class MilkDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
    
    cost() {
        return this.coffee.cost() + 0.5;
    }
    
    description() {
        return this.coffee.description() + ', milk';
    }
}

class SugarDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
    
    cost() {
        return this.coffee.cost() + 0.2;
    }
    
    description() {
        return this.coffee.description() + ', sugar';
    }
}

class VanillaDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
    
    cost() {
        return this.coffee.cost() + 0.7;
    }
    
    description() {
        return this.coffee.description() + ', vanilla';
    }
}

// Usage
let myCoffee = new Coffee();
console.log(\`\${myCoffee.description()}: $\${myCoffee.cost()}\`);

myCoffee = new MilkDecorator(myCoffee);
console.log(\`\${myCoffee.description()}: $\${myCoffee.cost()}\`);

myCoffee = new SugarDecorator(myCoffee);
myCoffee = new VanillaDecorator(myCoffee);
console.log(\`\${myCoffee.description()}: $\${myCoffee.cost()}\`);

console.log('Design patterns examples completed');`,

  exercises: [
    {
      question: "Implement a simple Observer pattern for a newsletter subscription system:",
      solution: `class Newsletter {
  constructor() {
    this.subscribers = [];
  }
  
  subscribe(email) {
    this.subscribers.push(email);
    console.log(\`\${email} subscribed\`);
  }
  
  unsubscribe(email) {
    this.subscribers = this.subscribers.filter(sub => sub !== email);
    console.log(\`\${email} unsubscribed\`);
  }
  
  notify(article) {
    this.subscribers.forEach(email => {
      console.log(\`Sending '\${article}' to \${email}\`);
    });
  }
}

const newsletter = new Newsletter();
newsletter.subscribe('user1@example.com');
newsletter.subscribe('user2@example.com');
newsletter.notify('New JavaScript Tutorial');`,
      explanation: "Observer pattern allows objects to notify multiple observers about state changes."
    }
  ],

  quiz: [
    {
      question: "Which pattern ensures only one instance of a class can exist?",
      options: [
        "Factory Pattern",
        "Observer Pattern",
        "Singleton Pattern",
        "Strategy Pattern"
      ],
      correct: 2,
      explanation: "Singleton pattern restricts instantiation of a class to a single instance and provides global access to it."
    }
  ],

  resources: [
    {
      title: "JavaScript Design Patterns",
      url: "https://www.patterns.dev/posts/classic-design-patterns/"
    }
  ],

  nextModules: ['module-pattern', 'best-practices'],
  prerequisites: ['classes', 'closures-scope']
};