// src/front/data/modules/advanced/MemoryManagement.js
export default {
  title: 'Memory Management',
  duration: '35 min',
  difficulty: 'Advanced',
  overview: 'Understand JavaScript memory management, garbage collection, and how to avoid memory leaks. Learn to write memory-efficient code.',
  
  keyPoints: [
    'JavaScript uses automatic garbage collection',
    'Memory leaks can occur with circular references',
    'Event listeners and timers can cause memory leaks',
    'WeakMap and WeakSet help prevent memory leaks',
    'Monitor memory usage in developer tools',
    'Proper cleanup prevents memory problems'
  ],

  example: `// Memory Management Fundamentals
console.log('=== Memory Management Basics ===');

// Primitive values are stored in stack memory
let number = 42;
let string = 'Hello';
let boolean = true;

// Objects are stored in heap memory
let object = { name: 'Alice', age: 30 };
let array = [1, 2, 3, 4, 5];

// Reference vs Value
let a = 10;
let b = a; // Value is copied
b = 20;
console.log('a:', a, 'b:', b); // a: 10, b: 20

let obj1 = { value: 10 };
let obj2 = obj1; // Reference is copied
obj2.value = 20;
console.log('obj1.value:', obj1.value); // 20 (both point to same object)

// Garbage Collection Example
function createObjects() {
    let localObj = { data: 'temporary' };
    let localArray = new Array(1000).fill('data');
    
    // These objects become eligible for GC when function exits
    return localObj.data;
}

let result = createObjects();
// localObj and localArray are now eligible for garbage collection

// Memory Leaks - Common Causes
console.log('=== Memory Leaks ===');

// 1. Global Variables
// Bad: Creates global variable accidentally
function createGlobalLeak() {
    // Missing 'let', 'const', or 'var' creates global
    leakedVariable = 'This becomes global!';
}

createGlobalLeak();
console.log('Global leaked variable:', window.leakedVariable || global.leakedVariable);

// Good: Proper variable declaration
function createLocal() {
    let localVariable = 'This stays local';
    return localVariable;
}

// 2. Circular References (handled by modern GC, but can be problematic)
function createCircularReference() {
    let objA = {};
    let objB = {};
    
    objA.ref = objB;
    objB.ref = objA;
    
    // Modern JavaScript engines handle this, but older ones might not
    return { objA, objB };
}

// 3. Event Listeners Not Removed
class ComponentWithLeak {
    constructor() {
        this.data = new Array(1000000).fill('large data');
        this.handleClick = this.handleClick.bind(this);
        
        // Adding event listener
        document.addEventListener('click', this.handleClick);
    }
    
    handleClick() {
        console.log('Component clicked');
    }
    
    // Missing cleanup method causes memory leak
    // destroy() {
    //     document.removeEventListener('click', this.handleClick);
    // }
}

// Better version with proper cleanup
class ComponentWithoutLeak {
    constructor() {
        this.data = new Array(1000000).fill('large data');
        this.handleClick = this.handleClick.bind(this);
        
        document.addEventListener('click', this.handleClick);
    }
    
    handleClick() {
        console.log('Component clicked (no leak)');
    }
    
    destroy() {
        document.removeEventListener('click', this.handleClick);
        this.data = null; // Explicit cleanup
    }
}

// 4. Timers Not Cleared
class TimerLeak {
    constructor() {
        this.data = new Array(1000000).fill('timer data');
        
        // Timer keeps reference to this object
        this.intervalId = setInterval(() => {
            console.log('Timer running');
        }, 1000);
    }
    
    // Missing cleanup
    // destroy() {
    //     clearInterval(this.intervalId);
    // }
}

class TimerNoLeak {
    constructor() {
        this.data = new Array(1000000).fill('timer data');
        
        this.intervalId = setInterval(() => {
            console.log('Timer running (no leak)');
        }, 1000);
    }
    
    destroy() {
        clearInterval(this.intervalId);
        this.data = null;
    }
}

// 5. Closures Holding References
function createClosureLeak() {
    let largeData = new Array(1000000).fill('closure data');
    
    return function() {
        // This closure keeps largeData in memory
        console.log('Closure called, data length:', largeData.length);
    };
}

function createClosureNoLeak() {
    let largeData = new Array(1000000).fill('closure data');
    let dataLength = largeData.length;
    
    // Clear reference to large data
    largeData = null;
    
    return function() {
        console.log('Closure called, data length:', dataLength);
    };
}

// WeakMap and WeakSet for Memory Management
console.log('=== WeakMap and WeakSet ===');

// WeakMap - keys can be garbage collected
const weakMap = new WeakMap();
let keyObj = { id: 1 };

weakMap.set(keyObj, 'associated data');
console.log('WeakMap value:', weakMap.get(keyObj));

// When keyObj is set to null, the entry in WeakMap can be GC'd
keyObj = null;

// WeakSet - objects can be garbage collected
const weakSet = new WeakSet();
let objInSet = { name: 'test' };

weakSet.add(objInSet);
console.log('In WeakSet:', weakSet.has(objInSet));

objInSet = null; // Object can now be garbage collected

// Practical WeakMap usage - private data
const privateData = new WeakMap();

class User {
    constructor(name, email) {
        // Store private data in WeakMap
        privateData.set(this, {
            email: email,
            created: new Date()
        });
        
        this.name = name;
    }
    
    getEmail() {
        return privateData.get(this).email;
    }
    
    getCreatedDate() {
        return privateData.get(this).created;
    }
}

const user = new User('Alice', 'alice@example.com');
console.log('User email:', user.getEmail());

// Memory Monitoring and Profiling
console.log('=== Memory Monitoring ===');

// Memory usage information (if available)
if (performance.memory) {
    console.log('Memory usage:');
    console.log('Used:', Math.round(performance.memory.usedJSHeapSize / 1024 / 1024), 'MB');
    console.log('Total:', Math.round(performance.memory.totalJSHeapSize / 1024 / 1024), 'MB');
    console.log('Limit:', Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024), 'MB');
}

// Memory usage monitoring function
function monitorMemory() {
    if (performance.memory) {
        const used = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
        const total = Math.round(performance.memory.totalJSHeapSize / 1024 / 1024);
        
        console.log(\`Memory: \${used}MB used / \${total}MB total\`);
    }
}

// Memory stress test
function memoryStressTest() {
    console.log('Starting memory stress test...');
    
    let arrays = [];
    
    for (let i = 0; i < 10; i++) {
        arrays.push(new Array(1000000).fill(\`data-\${i}\`));
        monitorMemory();
    }
    
    console.log('Clearing arrays...');
    arrays = null;
    
    // Force garbage collection if available (Chrome DevTools)
    if (window.gc) {
        window.gc();
    }
    
    setTimeout(() => {
        monitorMemory();
        console.log('Memory stress test completed');
    }, 1000);
}

// Uncomment to run stress test
// memoryStressTest();

// Memory-Efficient Patterns
console.log('=== Memory-Efficient Patterns ===');

// 1. Object Pooling
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
        if (this.pool.length > 0) {
            return this.pool.pop();
        }
        return this.createFn();
    }
    
    release(obj) {
        this.resetFn(obj);
        this.pool.push(obj);
    }
    
    size() {
        return this.pool.length;
    }
}

// Example: Vector2D object pool
class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }
    
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    
    add(other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    }
}

const vectorPool = new ObjectPool(
    () => new Vector2D(),
    (vector) => vector.set(0, 0)
);

// Usage
function useVectors() {
    const v1 = vectorPool.acquire();
    const v2 = vectorPool.acquire();
    
    v1.set(10, 20);
    v2.set(5, 15);
    v1.add(v2);
    
    console.log('Vector result:', v1.x, v1.y);
    
    // Return to pool instead of letting GC handle
    vectorPool.release(v1);
    vectorPool.release(v2);
}

useVectors();
console.log('Pool size after use:', vectorPool.size());

// 2. Lazy Loading
class LazyLoader {
    constructor() {
        this._cache = new Map();
    }
    
    load(key, loaderFn) {
        if (!this._cache.has(key)) {
            console.log(\`Loading \${key}...\`);
            this._cache.set(key, loaderFn());
        } else {
            console.log(\`Using cached \${key}\`);
        }
        return this._cache.get(key);
    }
    
    unload(key) {
        this._cache.delete(key);
    }
    
    clear() {
        this._cache.clear();
    }
}

const loader = new LazyLoader();

function loadLargeDataset() {
    return new Array(1000000).fill('large dataset item');
}

// Only loads when needed
const data = loader.load('dataset', loadLargeDataset);
const sameData = loader.load('dataset', loadLargeDataset); // Uses cache

// 3. Memory-Efficient Event System
class MemoryEfficientEventEmitter {
    constructor() {
        this.events = new Map();
    }
    
    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event).add(listener);
    }
    
    off(event, listener) {
        const listeners = this.events.get(event);
        if (listeners) {
            listeners.delete(listener);
            if (listeners.size === 0) {
                this.events.delete(event);
            }
        }
    }
    
    emit(event, ...args) {
        const listeners = this.events.get(event);
        if (listeners) {
            for (const listener of listeners) {
                listener(...args);
            }
        }
    }
    
    // Cleanup method
    removeAllListeners(event) {
        if (event) {
            this.events.delete(event);
        } else {
            this.events.clear();
        }
    }
}

// Best Practices for Memory Management
console.log('=== Best Practices ===');

// 1. Null out references when done
function cleanupReferences() {
    let largeObject = { data: new Array(1000000).fill('data') };
    
    // Use the object
    console.log('Object size:', largeObject.data.length);
    
    // Cleanup
    largeObject = null; // Allow GC
}

// 2. Use const when possible (prevents accidental reassignment)
const CONSTANTS = {
    MAX_SIZE: 1000,
    DEFAULT_VALUE: 'default'
};

// 3. Avoid creating functions in loops
// Bad
function badLoop() {
    const buttons = document.querySelectorAll('button');
    
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', function() {
            console.log(\`Button \${i} clicked\`); // Creates new function each iteration
        });
    }
}

// Good
function goodLoop() {
    const buttons = document.querySelectorAll('button');
    
    function handleButtonClick(event) {
        console.log('Button clicked:', event.target);
    }
    
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', handleButtonClick);
    }
}

// 4. Debounce and throttle to reduce memory pressure
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Memory leak detection utility
class MemoryLeakDetector {
    constructor() {
        this.snapshots = [];
    }
    
    takeSnapshot(label) {
        if (performance.memory) {
            this.snapshots.push({
                label,
                timestamp: Date.now(),
                used: performance.memory.usedJSHeapSize,
                total: performance.memory.totalJSHeapSize
            });
        }
    }
    
    analyze() {
        if (this.snapshots.length < 2) {
            console.log('Need at least 2 snapshots to analyze');
            return;
        }
        
        console.log('Memory Analysis:');
        for (let i = 1; i < this.snapshots.length; i++) {
            const prev = this.snapshots[i - 1];
            const curr = this.snapshots[i];
            
            const usedDiff = curr.used - prev.used;
            const totalDiff = curr.total - prev.total;
            
            console.log(\`\${prev.label} -> \${curr.label}:\`);
            console.log(\`  Used: \${this.formatBytes(usedDiff)} (\${usedDiff > 0 ? '+' : ''}\${this.formatBytes(usedDiff)})\`);
            console.log(\`  Total: \${this.formatBytes(totalDiff)} (\${totalDiff > 0 ? '+' : ''}\${this.formatBytes(totalDiff)})\`);
        }
    }
    
    formatBytes(bytes) {
        return Math.round(bytes / 1024 / 1024 * 100) / 100 + ' MB';
    }
}

// Usage example
const detector = new MemoryLeakDetector();

detector.takeSnapshot('Initial');

// Create some objects
let testObjects = [];
for (let i = 0; i < 1000; i++) {
    testObjects.push({ id: i, data: new Array(1000).fill(\`item-\${i}\`) });
}

detector.takeSnapshot('After creating objects');

// Clear objects
testObjects = null;

detector.takeSnapshot('After clearing objects');

setTimeout(() => {
    detector.takeSnapshot('After potential GC');
    detector.analyze();
}, 1000);

console.log('Memory management examples completed');`,

  exercises: [
    {
      question: "Create a class that properly manages event listeners to prevent memory leaks:",
      solution: `class SafeComponent {
  constructor(element) {
    this.element = element;
    this.listeners = new Map();
    this.boundHandlers = new Map();
  }
  
  addEventListener(event, handler) {
    const boundHandler = handler.bind(this);
    this.boundHandlers.set(handler, boundHandler);
    
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add({ handler, boundHandler });
    
    this.element.addEventListener(event, boundHandler);
  }
  
  removeEventListener(event, handler) {
    const boundHandler = this.boundHandlers.get(handler);
    if (boundHandler) {
      this.element.removeEventListener(event, boundHandler);
      
      const eventListeners = this.listeners.get(event);
      if (eventListeners) {
        eventListeners.delete({ handler, boundHandler });
      }
      
      this.boundHandlers.delete(handler);
    }
  }
  
  destroy() {
    // Remove all event listeners
    for (const [event, listeners] of this.listeners) {
      for (const { boundHandler } of listeners) {
        this.element.removeEventListener(event, boundHandler);
      }
    }
    
    this.listeners.clear();
    this.boundHandlers.clear();
    this.element = null;
  }
}`,
      explanation: "Track all event listeners and their bound handlers so they can be properly removed during cleanup."
    }
  ],

  quiz: [
    {
      question: "Which of the following is most likely to cause a memory leak?",
      options: [
        "Creating local variables in functions",
        "Not removing event listeners before destroying objects",
        "Using const instead of let",
        "Creating small objects frequently"
      ],
      correct: 1,
      explanation: "Event listeners hold references to objects, preventing garbage collection if not properly removed."
    }
  ],

  resources: [
    {
      title: "MDN - Memory Management",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management"
    }
  ],

  nextModules: ['performance', 'debugging'],
  prerequisites: ['closures-scope', 'event-handling']
};