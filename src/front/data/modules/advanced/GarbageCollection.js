// src/front/data/modules/advanced/GarbageCollection.js
export default {
  title: 'Garbage Collection in JavaScript',
  duration: '30 min',
  difficulty: 'Advanced',
  overview: 'Understand how JavaScript garbage collection works. Learn about memory allocation, reference counting, mark-and-sweep, and optimization techniques.',
  
  keyPoints: [
    'JavaScript uses automatic garbage collection',
    'Mark-and-sweep is the primary GC algorithm',
    'Circular references are handled automatically',
    'Memory leaks can still occur in modern JavaScript',
    'Understanding GC helps write efficient code',
    'Weak references help prevent memory leaks'
  ],

  example: `// Memory Allocation and Deallocation
console.log('=== Memory Allocation ===');

// Primitive values - stored in stack
let number = 42;
let string = 'Hello World';
let boolean = true;

console.log('Primitives use stack memory');

// Objects - stored in heap
let object = { name: 'Alice', age: 30 };
let array = [1, 2, 3, 4, 5];
let date = new Date();

console.log('Objects use heap memory');

// Reference vs Value
console.log('=== References ===');

let a = { value: 10 };
let b = a; // b references the same object as a

b.value = 20;
console.log('a.value:', a.value); // 20 - both variables reference same object

// When object goes out of scope, it becomes eligible for GC
function createTemporaryObject() {
    let temp = { data: 'This will be garbage collected' };
    return temp.data;
}

let result = createTemporaryObject(); // temp object is now eligible for GC
console.log('Result:', result);

// Demonstrating Garbage Collection
console.log('=== Garbage Collection Demonstration ===');

function demonstrateGC() {
    // These objects will be eligible for GC when function exits
    let largeArray = new Array(100000).fill('data');
    let complexObject = {
        id: 1,
        data: largeArray,
        metadata: {
            created: new Date(),
            size: largeArray.length
        }
    };
    
    console.log('Created large objects');
    
    // Return only what we need
    return complexObject.metadata.size;
}

let size = demonstrateGC();
console.log('Array size was:', size);
// largeArray and complexObject are now eligible for GC

// Circular References (handled by modern GC)
console.log('=== Circular References ===');

function createCircularReference() {
    let objA = { name: 'Object A' };
    let objB = { name: 'Object B' };
    
    // Create circular reference
    objA.reference = objB;
    objB.reference = objA;
    
    console.log('Created circular references');
    
    // Modern JavaScript engines handle this automatically
    return 'Circular references created and will be cleaned up';
}

console.log(createCircularReference());

// Memory Leak Examples (what to avoid)
console.log('=== Potential Memory Leaks ===');

// 1. Global variables (avoid)
// window.globalLeak = []; // This would persist

// 2. Detached DOM elements
function createDetachedElement() {
    let element = document.createElement('div');
    element.innerHTML = 'This element is not attached to DOM';
    
    // If we keep a reference but remove from DOM, it won't be GC'd
    return element;
}

// 3. Event listeners not removed
class ComponentWithPotentialLeak {
    constructor() {
        this.data = new Array(10000).fill('component data');
        this.handleClick = this.handleClick.bind(this);
        
        // Adding event listener
        document.addEventListener('click', this.handleClick);
    }
    
    handleClick() {
        console.log('Component clicked');
    }
    
    // Always provide cleanup method
    destroy() {
        document.removeEventListener('click', this.handleClick);
        this.data = null;
        console.log('Component cleaned up');
    }
}

// 4. Timers not cleared
class TimerComponent {
    constructor() {
        this.data = new Array(10000).fill('timer data');
        
        this.intervalId = setInterval(() => {
            console.log('Timer tick');
        }, 1000);
    }
    
    destroy() {
        clearInterval(this.intervalId);
        this.data = null;
        console.log('Timer cleaned up');
    }
}

// Weak References for Memory Management
console.log('=== Weak References ===');

// WeakMap - keys can be garbage collected
const objectMetadata = new WeakMap();

function addMetadata(obj, metadata) {
    objectMetadata.set(obj, metadata);
}

function getMetadata(obj) {
    return objectMetadata.get(obj);
}

// Example usage
let myObject = { id: 1, name: 'Test' };
addMetadata(myObject, { created: new Date(), accessed: 0 });

console.log('Metadata:', getMetadata(myObject));

// When myObject is set to null, metadata is automatically removed
myObject = null;
console.log('Object nullified - metadata will be GC\'d');

// WeakSet - for weak object references
const processedObjects = new WeakSet();

function processObject(obj) {
    if (processedObjects.has(obj)) {
        console.log('Object already processed');
        return;
    }
    
    processedObjects.add(obj);
    console.log('Processing object...');
}

let testObj = { data: 'test' };
processObject(testObj);
processObject(testObj); // Already processed

// WeakRef for advanced memory management (newer feature)
console.log('=== WeakRef (Advanced) ===');

class CacheWithWeakRef {
    constructor() {
        this.cache = new Map();
    }
    
    set(key, value) {
        this.cache.set(key, new WeakRef(value));
    }
    
    get(key) {
        const ref = this.cache.get(key);
        if (ref) {
            const value = ref.deref();
            if (value === undefined) {
                // Object was garbage collected
                this.cache.delete(key);
                console.log('Cache entry was garbage collected');
                return null;
            }
            return value;
        }
        return null;
    }
}

// Memory Monitoring
console.log('=== Memory Monitoring ===');

function getMemoryUsage() {
    if (performance.memory) {
        const used = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
        const total = Math.round(performance.memory.totalJSHeapSize / 1024 / 1024);
        const limit = Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024);
        
        console.log(\`Memory Usage: \${used}MB used / \${total}MB total (limit: \${limit}MB)\`);
        return { used, total, limit };
    } else {
        console.log('Memory info not available');
        return null;
    }
}

// Monitor memory before and after operations
console.log('Memory before operations:');
getMemoryUsage();

// Create some objects
let testObjects = [];
for (let i = 0; i < 10000; i++) {
    testObjects.push({
        id: i,
        data: new Array(100).fill(\`item-\${i}\`),
        timestamp: new Date()
    });
}

console.log('Memory after creating objects:');
getMemoryUsage();

// Clear references
testObjects = null;

console.log('Memory after clearing references:');
getMemoryUsage();

// Force garbage collection (if available in dev tools)
if (window.gc) {
    console.log('Forcing garbage collection...');
    window.gc();
    console.log('Memory after forced GC:');
    getMemoryUsage();
} else {
    console.log('Manual GC not available (run in Chrome DevTools)');
}

// Best Practices for GC-Friendly Code
console.log('=== GC-Friendly Patterns ===');

// 1. Nullify references when done
function processLargeData() {
    let largeDataSet = new Array(100000).fill('data');
    
    // Process the data
    let result = largeDataSet.length;
    
    // Clear reference to help GC
    largeDataSet = null;
    
    return result;
}

// 2. Use object pooling for frequently created objects
class ObjectPool {
    constructor(createFn, resetFn) {
        this.createFn = createFn;
        this.resetFn = resetFn;
        this.pool = [];
    }
    
    acquire() {
        if (this.pool.length > 0) {
            return this.pool.pop();
        }
        return this.createFn();
    }
    
    release(obj) {
        this.resetFn(obj);
        this.pool.push(obj);
    }
}

// Example: Point object pool
const pointPool = new ObjectPool(
    () => ({ x: 0, y: 0 }),
    (point) => { point.x = 0; point.y = 0; }
);

// 3. Avoid creating closures in loops
function createHandlers(count) {
    const handlers = [];
    
    // Bad: creates new closure for each iteration
    // for (let i = 0; i < count; i++) {
    //     handlers.push(() => console.log(\`Handler \${i}\`));
    // }
    
    // Good: reuse function
    function createHandler(index) {
        return () => console.log(\`Handler \${index}\`);
    }
    
    for (let i = 0; i < count; i++) {
        handlers.push(createHandler(i));
    }
    
    return handlers;
}

// 4. Use appropriate data structures
function efficientLookup() {
    // Use Map for O(1) lookup instead of Array.find
    const userMap = new Map();
    const users = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' }
    ];
    
    // Index users for fast lookup
    users.forEach(user => userMap.set(user.id, user));
    
    // Fast lookup
    return userMap.get(2);
}

console.log('Efficient lookup result:', efficientLookup());

// Memory Leak Detection Helper
function createMemoryLeakDetector() {
    const snapshots = [];
    
    return {
        takeSnapshot(label) {
            if (performance.memory) {
                snapshots.push({
                    label,
                    timestamp: Date.now(),
                    memory: {
                        used: performance.memory.usedJSHeapSize,
                        total: performance.memory.totalJSHeapSize
                    }
                });
                console.log(\`Snapshot '\${label}' taken\`);
            }
        },
        
        compare() {
            if (snapshots.length < 2) {
                console.log('Need at least 2 snapshots to compare');
                return;
            }
            
            console.log('Memory Growth Analysis:');
            for (let i = 1; i < snapshots.length; i++) {
                const prev = snapshots[i - 1];
                const current = snapshots[i];
                const growth = current.memory.used - prev.memory.used;
                const growthMB = (growth / 1024 / 1024).toFixed(2);
                
                console.log(\`\${prev.label} → \${current.label}: \${growthMB}MB\`);
            }
        }
    };
}

const detector = createMemoryLeakDetector();
detector.takeSnapshot('Initial');

// Simulate some work
for (let i = 0; i < 1000; i++) {
    new Array(100).fill(\`test-\${i}\`);
}

detector.takeSnapshot('After work');
detector.compare();

console.log('Garbage collection examples completed');`,

  exercises: [
    {
      question: "Create a function that demonstrates proper cleanup of resources to prevent memory leaks:",
      solution: `class ResourceManager {
  constructor() {
    this.resources = new Map();
    this.timers = new Set();
    this.listeners = new Map();
  }
  
  addResource(id, resource) {
    this.resources.set(id, resource);
  }
  
  addTimer(id, intervalId) {
    this.timers.add(intervalId);
    this.resources.set(id, intervalId);
  }
  
  addEventListener(element, event, handler) {
    const key = \`\${element.constructor.name}-\${event}\`;
    element.addEventListener(event, handler);
    this.listeners.set(key, { element, event, handler });
  }
  
  cleanup() {
    // Clear all resources
    this.resources.clear();
    
    // Clear all timers
    this.timers.forEach(id => clearInterval(id));
    this.timers.clear();
    
    // Remove all event listeners
    this.listeners.forEach(({ element, event, handler }) => {
      element.removeEventListener(event, handler);
    });
    this.listeners.clear();
    
    console.log('All resources cleaned up');
  }
}`,
      explanation: "Proper resource management prevents memory leaks by ensuring all references are cleared and resources are properly disposed."
    }
  ],

  quiz: [
    {
      question: "Which JavaScript garbage collection algorithm is most commonly used?",
      options: [
        "Reference counting",
        "Mark-and-sweep",
        "Copy collection",
        "Manual management"
      ],
      correct: 1,
      explanation: "Mark-and-sweep is the primary garbage collection algorithm used in modern JavaScript engines."
    }
  ],

  resources: [
    {
      title: "MDN - Memory Management",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management"
    }
  ],

  nextModules: ['memory-management', 'performance'],
  prerequisites: ['objects-basics', 'functions-basics']
};