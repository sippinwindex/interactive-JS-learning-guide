// src/front/components/docs/AdvancedSection.jsx
import React from 'react';
import { CodeBlock } from '../CodeBlock';

export const AdvancedSection = ({ runCode, runOutput }) => {
  const content = [
    {
      title: 'Closures and Lexical Scope',
      description: 'Understanding how closures work and their practical applications',
      code: `// Basic closure example
function outerFunction(x) {
    // This variable is "closed over" by the inner function
    const outerVariable = x;
    
    function innerFunction(y) {
        return outerVariable + y; // Accesses outer scope
    }
    
    return innerFunction;
}

const addFive = outerFunction(5);
console.log(addFive(3)); // 8

// Practical closure: Counter with private state
function createCounter(initialValue = 0) {
    let count = initialValue;
    
    return {
        increment: () => ++count,
        decrement: () => --count,
        get current() { return count; },
        reset: () => { count = initialValue; }
    };
}

const counter = createCounter(10);
console.log('Initial:', counter.current);   // 10
console.log('Increment:', counter.increment()); // 11
console.log('Increment:', counter.increment()); // 12
console.log('Decrement:', counter.decrement()); // 11
counter.reset();
console.log('After reset:', counter.current); // 10

// Module pattern with closure
const userModule = (function() {
    let users = [];
    let currentId = 1;
    
    // Private helper function
    function validateUser(user) {
        return user.name && user.email;
    }
    
    return {
        addUser(name, email) {
            if (!validateUser({ name, email })) {
                throw new Error('Invalid user data');
            }
            const user = { id: currentId++, name, email };
            users.push(user);
            return user;
        },
        
        getUser(id) {
            return users.find(user => user.id === id);
        },
        
        get userCount() {
            return users.length;
        }
    };
})();

userModule.addUser('John', 'john@example.com');
userModule.addUser('Jane', 'jane@example.com');
console.log('Total users:', userModule.userCount);`
    },
    {
      title: 'Prototypes and Inheritance',
      description: 'JavaScript\'s prototype-based inheritance system',
      code: `// Constructor function approach
function Person(name, age) {
    this.name = name;
    this.age = age;
}

// Adding methods to prototype
Person.prototype.greet = function() {
    return 'Hello, I am ' + this.name + ' and I am ' + this.age + ' years old.';
};

Person.prototype.haveBirthday = function() {
    this.age++;
    return 'Happy birthday! Now I am ' + this.age + '.';
};

// ES6 Class syntax (syntactic sugar over prototypes)
class Developer extends Person {
    constructor(name, age, language) {
        super(name, age); // Call parent constructor
        this.language = language;
        this.projects = [];
    }
    
    code() {
        return 'Writing ' + this.language + ' code!';
    }
    
    addProject(project) {
        this.projects.push(project);
        return this; // Method chaining
    }
    
    // Getter
    get projectCount() {
        return this.projects.length;
    }
    
    // Static method
    static compareExperience(dev1, dev2) {
        return dev1.projectCount - dev2.projectCount;
    }
    
    // Override parent method
    greet() {
        return super.greet() + ' I develop in ' + this.language + '.';
    }
}

// Usage
const person = new Person('Alice', 25);
console.log(person.greet());

const dev = new Developer('Bob', 30, 'JavaScript');
console.log(dev.greet());  // Inherited and overridden method
console.log(dev.code());   // Own method

dev.addProject('Portfolio').addProject('E-commerce');
console.log('Projects: ' + dev.projectCount);

// Prototype chain verification
console.log('dev instanceof Developer:', dev instanceof Developer); // true
console.log('dev instanceof Person:', dev instanceof Person);       // true
console.log('Prototype chain works:', Object.getPrototypeOf(dev) === Developer.prototype);`
    },
    {
      title: 'The Event Loop',
      description: 'Understanding JavaScript\'s asynchronous execution model',
      code: `// Event Loop demonstration
console.log('1 - Synchronous start');

// Macrotask (setTimeout)
setTimeout(() => {
    console.log('5 - setTimeout (macrotask)');
}, 0);

// Microtask (Promise)
Promise.resolve().then(() => {
    console.log('3 - Promise.then (microtask)');
});

// Another microtask
Promise.resolve().then(() => {
    console.log('4 - Another Promise.then');
});

console.log('2 - Synchronous end');

// Output order: 1, 2, 3, 4, 5
// Explanation: Synchronous code runs first, then microtasks, then macrotasks

// Practical example: Request batching using microtasks
class RequestBatcher {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
    }
    
    addRequest(request) {
        this.queue.push(request);
        
        if (!this.isProcessing) {
            this.isProcessing = true;
            // Use microtask to batch requests in same event loop tick
            Promise.resolve().then(() => {
                this.processBatch();
            });
        }
    }
    
    processBatch() {
        const batch = [...this.queue];
        this.queue.length = 0;
        this.isProcessing = false;
        
        console.log('Processing batch of ' + batch.length + ' requests:', batch);
        return batch;
    }
}

// Demonstrate batching
const batcher = new RequestBatcher();
console.log('Adding requests...');
batcher.addRequest({ id: 1, data: 'first' });
batcher.addRequest({ id: 2, data: 'second' });
batcher.addRequest({ id: 3, data: 'third' });
// All three will be batched together in the next microtask!

// Understanding stack, heap, and queue
function demonstrateEventLoop() {
    console.log('Call stack: demonstrateEventLoop()');
    
    function recursiveFunction(n) {
        if (n <= 0) return;
        console.log('Recursive call: ' + n);
        recursiveFunction(n - 1);
    }
    
    recursiveFunction(3);
    console.log('Function completed');
}

demonstrateEventLoop();`
    },
    {
      title: 'Memory Management and Garbage Collection',
      description: 'Understanding memory lifecycle and preventing memory leaks',
      code: `// Memory management examples

// 1. Reference counting and circular references
function createCircularReference() {
    const obj1 = {};
    const obj2 = {};
    
    obj1.ref = obj2;
    obj2.ref = obj1;
    
    // This creates a circular reference
    // Modern garbage collectors can handle this, but be aware
    return { obj1, obj2 };
}

// 2. WeakMap for memory-efficient private data
const privateData = new WeakMap();

class User {
    constructor(name, email) {
        // Store private data in WeakMap
        privateData.set(this, {
            name,
            email,
            secrets: ['password123', 'secret-key']
        });
    }
    
    getName() {
        return privateData.get(this).name;
    }
    
    // When User instance is garbage collected,
    // WeakMap entry is automatically removed
}

const user = new User('John', 'john@example.com');
console.log('User name:', user.getName());

// 3. Memory leak prevention
class ComponentWithCleanup {
    constructor() {
        this.eventListeners = [];
        this.timers = [];
    }
    
    addEventListener(element, event, handler) {
        element.addEventListener(event, handler);
        // Store for cleanup
        this.eventListeners.push({ element, event, handler });
    }
    
    setTimeout(callback, delay) {
        const id = setTimeout(callback, delay);
        this.timers.push(id);
        return id;
    }
    
    destroy() {
        // Clean up event listeners to prevent memory leaks
        this.eventListeners.forEach(({ element, event, handler }) => {
            element.removeEventListener(event, handler);
        });
        
        // Clear timers
        this.timers.forEach(id => clearTimeout(id));
        
        console.log('Component cleaned up - no memory leaks!');
    }
}

// 4. Object pooling for performance
class ObjectPool {
    constructor(createFn, resetFn, initialSize = 10) {
        this.createFn = createFn;
        this.resetFn = resetFn;
        this.pool = [];
        
        // Pre-populate pool
        for (let i = 0; i < initialSize; i++) {
            this.pool.push(this.createFn());
        }
    }
    
    acquire() {
        return this.pool.length > 0 ? this.pool.pop() : this.createFn();
    }
    
    release(obj) {
        this.resetFn(obj);
        this.pool.push(obj);
    }
}

// Example usage
const vectorPool = new ObjectPool(
    () => ({ x: 0, y: 0 }),  // Create function
    (vec) => { vec.x = 0; vec.y = 0; }  // Reset function
);

const vector = vectorPool.acquire();
vector.x = 10;
vector.y = 20;
console.log('Vector:', vector);
vectorPool.release(vector); // Return to pool for reuse

console.log('Memory management examples completed');`
    }
  ];

  return (
    <div className="space-y-8">
      <div className="mb-6">
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          Dive deep into JavaScript's advanced concepts. Understanding these patterns will make you 
          a more effective developer and help you write more efficient, maintainable code.
        </p>
      </div>

      {content.map((item, index) => (
        <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-b-0">
          <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200">
            {item.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {item.description}
          </p>
          
          <CodeBlock 
            code={item.code}
            language="javascript"
            onRun={() => runCode(item.code)}
            output={runOutput}
          />
        </div>
      ))}

      {/* Advanced Concepts Summary */}
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 mt-8">
        <h4 className="text-lg font-semibold text-purple-800 dark:text-purple-200 mb-4">
          🧠 Advanced JavaScript Mastery
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-purple-700 dark:text-purple-300">
          <div>
            <h5 className="font-medium mb-2">Closures Enable:</h5>
            <ul className="text-sm space-y-1">
              <li>• Data privacy and encapsulation</li>
              <li>• Module patterns</li>
              <li>• Callback functions with state</li>
              <li>• Factory functions</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium mb-2">Memory Best Practices:</h5>
            <ul className="text-sm space-y-1">
              <li>• Use WeakMap for private data</li>
              <li>• Clean up event listeners</li>
              <li>• Avoid circular references</li>
              <li>• Consider object pooling</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};