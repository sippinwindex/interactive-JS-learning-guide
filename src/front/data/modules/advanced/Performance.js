// src/front/data/modules/advanced/Performance.js
export const Performance = {
  title: 'Performance Optimization',
  duration: '40 min',
  difficulty: 'Advanced',
  overview: 'Learn to optimize JavaScript performance. Master profiling, benchmarking, and techniques for writing fast, efficient code.',
  keyPoints: [
    'Measure performance before optimizing',
    'Understanding JavaScript engine optimization',
    'DOM manipulation optimization techniques',
    'Debouncing and throttling for better UX',
    'Lazy loading and code splitting',
    'Memory-efficient programming patterns'
  ],
  example: `// Performance Measurement
console.log('=== Performance Measurement ===');

// Basic timing with performance.now()
function measurePerformance(fn, label) {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(\`\${label}: \${(end - start).toFixed(2)}ms\`);
  return result;
}

// Example functions to measure
function slowLoop() {
  let sum = 0;
  for (let i = 0; i < 1000000; i++) {
    sum += i;
  }
  return sum;
}

function fastLoop() {
  const n = 1000000;
  return (n * (n - 1)) / 2; // Mathematical formula
}

measurePerformance(slowLoop, 'Slow loop');
measurePerformance(fastLoop, 'Fast formula');

// Performance API for detailed measurements
if (window.performance && window.performance.mark) {
  performance.mark('start-complex-operation');
  // Complex operation here
  let result = 0;
  for (let i = 0; i < 100000; i++) {
    result += Math.sqrt(i);
  }
  performance.mark('end-complex-operation');
  performance.measure('complex-operation', 'start-complex-operation', 'end-complex-operation');
  const measures = performance.getEntriesByType('measure');
  console.log('Performance measures:', measures);
}

// Benchmarking utility
class Benchmark {
  constructor(name) {
    this.name = name;
    this.results = [];
  }

  run(fn, iterations = 1000) {
    const times = [];
    // Warm-up runs
    for (let i = 0; i < 10; i++) {
      fn();
    }
    // Actual measurements
    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      fn();
      const end = performance.now();
      times.push(end - start);
    }
    const avg = times.reduce((sum, time) => sum + time, 0) / times.length;
    const min = Math.min(...times);
    const max = Math.max(...times);
    const result = {
      name: this.name,
      iterations,
      average: avg.toFixed(4),
      min: min.toFixed(4),
      max: max.toFixed(4)
    };
    this.results.push(result);
    console.log(\`Benchmark \${this.name}:\`, result);
    return result;
  }

  compare(fn1, fn2, label1 = 'Function 1', label2 = 'Function 2') {
    console.log(\`Comparing \${label1} vs \${label2}:\`);
    const bench1 = new Benchmark(label1);
    const bench2 = new Benchmark(label2);
    const result1 = bench1.run(fn1);
    const result2 = bench2.run(fn2);
    const ratio = (parseFloat(result2.average) / parseFloat(result1.average)).toFixed(2);
    if (ratio > 1) {
      console.log(\`\${label1} is \${ratio}x faster than \${label2}\`);
    } else {
      console.log(\`\${label2} is \${(1/ratio).toFixed(2)}x faster than \${label1}\`);
    }
  }
}

// Array Performance Optimizations
console.log('=== Array Performance ===');

function createArrayForLoop() {
  const arr = [];
  for (let i = 0; i < 10000; i++) {
    arr.push(i);
  }
  return arr;
}

function createArrayConstructor() {
  return new Array(10000).fill(0).map((_, i) => i);
}

function createArrayFrom() {
  return Array.from({ length: 10000 }, (_, i) => i);
}

const arrayBench = new Benchmark('Array Creation');
arrayBench.compare(createArrayForLoop, createArrayConstructor, 'For Loop', 'Array Constructor');
arrayBench.compare(createArrayForLoop, createArrayFrom, 'For Loop', 'Array.from');

// Array iteration performance
const testArray = Array.from({ length: 100000 }, (_, i) => i);

function forLoop() {
  let sum = 0;
  for (let i = 0; i < testArray.length; i++) {
    sum += testArray[i];
  }
  return sum;
}

function forOfLoop() {
  let sum = 0;
  for (const item of testArray) {
    sum += item;
  }
  return sum;
}

function forEachMethod() {
  let sum = 0;
  testArray.forEach(item => sum += item);
  return sum;
}

function reduceMethod() {
  return testArray.reduce((sum, item) => sum + item, 0);
}

const iterationBench = new Benchmark('Array Iteration');
iterationBench.compare(forLoop, forOfLoop, 'for loop', 'for...of');
iterationBench.compare(forLoop, forEachMethod, 'for loop', 'forEach');
iterationBench.compare(forLoop, reduceMethod, 'for loop', 'reduce');

// Object Performance
console.log('=== Object Performance ===');

const testObj = {};
for (let i = 0; i < 1000; i++) {
  testObj[\`prop\${i}\`] = i;
}

function dotNotation() {
  let sum = 0;
  sum += testObj.prop1 || 0;
  sum += testObj.prop2 || 0;
  sum += testObj.prop3 || 0;
  return sum;
}

function bracketNotation() {
  let sum = 0;
  sum += testObj['prop1'] || 0;
  sum += testObj['prop2'] || 0;
  sum += testObj['prop3'] || 0;
  return sum;
}

function cachedAccess() {
  const { prop1 = 0, prop2 = 0, prop3 = 0 } = testObj;
  return prop1 + prop2 + prop3;
}

const objectBench = new Benchmark('Object Access');
objectBench.compare(dotNotation, bracketNotation, 'Dot notation', 'Bracket notation');
objectBench.compare(dotNotation, cachedAccess, 'Dot notation', 'Destructuring');

// String Performance
console.log('=== String Performance ===');

const strings = Array.from({ length: 1000 }, (_, i) => \`string \${i}\`);

function stringConcatenation() {
  let result = '';
  for (const str of strings) {
    result += str;
  }
  return result;
}

function stringJoin() {
  return strings.join('');
}

function templateLiterals() {
  let result = '';
  for (const str of strings) {
    result = \`\${result}\${str}\`;
  }
  return result;
}

const stringBench = new Benchmark('String Operations');
stringBench.compare(stringConcatenation, stringJoin, 'Concatenation', 'Array.join');
stringBench.compare(stringConcatenation, templateLiterals, 'Concatenation', 'Template literals');

// DOM Performance Optimization
console.log('=== DOM Performance ===');

function inefficientDOMUpdate() {
  const container = document.createElement('div');
  // Bad: Multiple DOM manipulations
  for (let i = 0; i < 100; i++) {
    const element = document.createElement('div');
    element.textContent = \`Item \${i}\`;
    element.className = 'item';
    container.appendChild(element);
  }
  return container;
}

function efficientDOMUpdate() {
  const container = document.createElement('div');
  const fragment = document.createDocumentFragment();
  // Good: Use DocumentFragment
  for (let i = 0; i < 100; i++) {
    const element = document.createElement('div');
    element.textContent = \`Item \${i}\`;
    element.className = 'item';
    fragment.appendChild(element);
  }
  container.appendChild(fragment);
  return container;
}

function stringBasedDOMUpdate() {
  const container = document.createElement('div');
  // Alternative: Build HTML string
  let html = '';
  for (let i = 0; i < 100; i++) {
    html += \`<div class="item">Item \${i}</div>\`;
  }
  container.innerHTML = html;
  return container;
}

const domBench = new Benchmark('DOM Updates');
domBench.compare(inefficientDOMUpdate, efficientDOMUpdate, 'Individual appends', 'DocumentFragment');
domBench.compare(efficientDOMUpdate, stringBasedDOMUpdate, 'DocumentFragment', 'innerHTML');

// Event Handling Optimization
console.log('=== Event Optimization ===');

// Debounce implementation
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) func(...args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func(...args);
  };
}

// Throttle implementation
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Example usage
const expensiveOperation = () => {
  console.log('Expensive operation executed');
  // Simulate expensive computation
  let sum = 0;
  for (let i = 0; i < 100000; i++) {
    sum += Math.random();
  }
  return sum;
};

const debouncedOperation = debounce(expensiveOperation, 300);
const throttledOperation = throttle(expensiveOperation, 300);

// Function call optimization
console.log('=== Function Optimization ===');

function withFunctionCall() {
  function add(a, b) {
    return a + b;
  }
  let sum = 0;
  for (let i = 0; i < 100000; i++) {
    sum = add(sum, i);
  }
  return sum;
}

function withInlinedOperation() {
  let sum = 0;
  for (let i = 0; i < 100000; i++) {
    sum = sum + i; // Inlined operation
  }
  return sum;
}

const functionBench = new Benchmark('Function Calls');
functionBench.compare(withFunctionCall, withInlinedOperation, 'Function calls', 'Inlined operations');

// Memory-efficient patterns
console.log('=== Memory Efficiency ===');

class ObjectPool {
  constructor(createFn, resetFn, initialSize = 10) {
    this.createFn = createFn;
    this.resetFn = resetFn;
    this.pool = [];
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

// Example: Point object pool
class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  set(x, y) {
    this.x = x;
    this.y = y;
    return this;
  }
}

const pointPool = new ObjectPool(
  () => new Point(),
  (point) => point.set(0, 0),
  100
);

function withObjectPool() {
  const points = [];
  // Acquire points from pool
  for (let i = 0; i < 1000; i++) {
    const point = pointPool.acquire();
    point.set(Math.random() * 100, Math.random() * 100);
    points.push(point);
  }
  // Use points
  let sum = 0;
  for (const point of points) {
    sum += point.x + point.y;
  }
  // Return to pool
  for (const point of points) {
    pointPool.release(point);
  }
  return sum;
}

function withoutObjectPool() {
  const points = [];
  // Create new points each time
  for (let i = 0; i < 1000; i++) {
    const point = new Point(Math.random() * 100, Math.random() * 100);
    points.push(point);
  }
  // Use points
  let sum = 0;
  for (const point of points) {
    sum += point.x + point.y;
  }
  return sum;
}

const poolBench = new Benchmark('Object Creation');
poolBench.compare(withObjectPool, withoutObjectPool, 'Object Pool', 'New Objects');

// Lazy loading pattern
console.log('=== Lazy Loading ===');

class LazyValue {
  constructor(factory) {
    this.factory = factory;
    this.computed = false;
    this.value = null;
  }

  get() {
    if (!this.computed) {
      console.log('Computing lazy value...');
      this.value = this.factory();
      this.computed = true;
    }
    return this.value;
  }
}

// Expensive computation
const lazyExpensiveValue = new LazyValue(() => {
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += Math.sqrt(i);
  }
  return result;
});

console.log('Lazy value created (not computed yet)');
console.log('First access:', lazyExpensiveValue.get());
console.log('Second access (cached):', lazyExpensiveValue.get());

// Memoization for performance
function memoize(fn) {
  const cache = new Map();
  return function memoized(...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Fibonacci example
function fibonacci(n) {
  if (n < 2) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFibonacci = memoize(fibonacci);

console.time('Regular fibonacci(35)');
fibonacci(35);
console.timeEnd('Regular fibonacci(35)');

console.time('Memoized fibonacci(35)');
memoizedFibonacci(35);
console.timeEnd('Memoized fibonacci(35)');

console.time('Memoized fibonacci(35) - second call');
memoizedFibonacci(35);
console.timeEnd('Memoized fibonacci(35) - second call');

// Code splitting simulation
console.log('=== Code Splitting ===');

class ModuleLoader {
  constructor() {
    this.modules = new Map();
  }

  async loadModule(name, factory) {
    if (this.modules.has(name)) {
      return this.modules.get(name);
    }
    console.log(\`Loading module: \${name}\`);
    const module = await factory();
    this.modules.set(name, module);
    return module;
  }
}

const loader = new ModuleLoader();

// Simulate dynamic import
async function loadChartModule() {
  return {
    createChart: (data) => \`Chart with \${data.length} data points\`,
    chartTypes: ['line', 'bar', 'pie']
  };
}

async function loadUtilsModule() {
  return {
    formatNumber: (n) => n.toLocaleString(),
    debounce: debounce,
    throttle: throttle
  };
}

// Usage
async function useModules() {
  const chartModule = await loader.loadModule('chart', loadChartModule);
  const utilsModule = await loader.loadModule('utils', loadUtilsModule);
  console.log('Chart module loaded:', chartModule.chartTypes);
  console.log('Utils module loaded:', utilsModule.formatNumber(1234567));
}

useModules();

// Performance monitoring
class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observers = [];
  }

  startTiming(label) {
    this.metrics.set(label, { start: performance.now() });
  }

  endTiming(label) {
    const metric = this.metrics.get(label);
    if (metric) {
      metric.end = performance.now();
      metric.duration = metric.end - metric.start;
      this.notifyObservers(label, metric);
    }
  }

  addObserver(callback) {
    this.observers.push(callback);
  }

  notifyObservers(label, metric) {
    this.observers.forEach(observer => observer(label, metric));
  }

  getMetrics() {
    return new Map(this.metrics);
  }
}

const monitor = new PerformanceMonitor();
monitor.addObserver((label, metric) => {
  if (metric.duration > 100) {
    console.warn(\`Performance warning: \${label} took \${metric.duration.toFixed(2)}ms\`);
  }
});

// Example usage
monitor.startTiming('data-processing');
// Simulate some work
for (let i = 0; i < 1000000; i++) {
  Math.sqrt(i);
}
monitor.endTiming('data-processing');

console.log('Performance optimization examples completed');
`,
  exercises: [
    {
      question: "Create a memoization function that has a maximum cache size and removes oldest entries:",
      solution: `function memoizeWithLimit(fn, maxSize = 100) {
  const cache = new Map();
  
  return function memoized(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      // Move to end (most recently used)
      const value = cache.get(key);
      cache.delete(key);
      cache.set(key, value);
      return value;
    }
    
    // Remove oldest if at limit
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}`,
      explanation: "Use a Map to track insertion order and implement LRU (Least Recently Used) cache eviction."
    }
  ],
  quiz: [
    {
      question: "Which array iteration method is generally fastest for simple operations?",
      options: [
        "forEach()",
        "map()",
        "for loop",
        "for...of loop"
      ],
      correct: 2,
      explanation: "Traditional for loops are usually fastest because they have less function call overhead."
    }
  ],
  resources: [
    {
      title: "Web Performance - MDN",
      url: "https://developer.mozilla.org/en-US/docs/Web/Performance"
    }
  ],
  nextModules: ['debugging', 'testing'],
  prerequisites: ['functions-basics', 'arrays-objects']
};