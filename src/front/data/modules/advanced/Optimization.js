// src/front/data/modules/advanced/Optimization.js
export default {
  title: 'JavaScript Optimization Techniques',
  duration: '45 min',
  difficulty: 'Advanced',
  overview: 'Learn advanced optimization techniques for JavaScript applications. Master code splitting, lazy loading, bundling strategies, and runtime optimizations.',
  
  keyPoints: [
    'Code splitting reduces initial bundle size',
    'Lazy loading improves perceived performance',
    'Tree shaking eliminates dead code',
    'Memoization caches expensive computations',
    'Virtual scrolling handles large datasets',
    'Web Workers offload heavy computations'
  ],

  example: `// Memoization for Performance
console.log('=== Memoization ===');

function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log('Cache hit for:', args);
            return cache.get(key);
        }
        
        console.log('Computing for:', args);
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Expensive Fibonacci function
function fibonacci(n) {
    if (n < 2) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Memoized version
const memoizedFibonacci = memoize(fibonacci);

console.time('First calculation');
console.log('Fibonacci(30):', memoizedFibonacci(30));
console.timeEnd('First calculation');

console.time('Second calculation (cached)');
console.log('Fibonacci(30):', memoizedFibonacci(30));
console.timeEnd('Second calculation (cached)');

// Lazy Loading Pattern
console.log('=== Lazy Loading ===');

class LazyLoader {
    constructor() {
        this.loadedModules = new Map();
        this.loadingPromises = new Map();
    }
    
    async loadModule(moduleName, loader) {
        // Return if already loaded
        if (this.loadedModules.has(moduleName)) {
            console.log(\`Module '\${moduleName}' already loaded\`);
            return this.loadedModules.get(moduleName);
        }
        
        // Return existing promise if currently loading
        if (this.loadingPromises.has(moduleName)) {
            console.log(\`Module '\${moduleName}' is loading...\`);
            return this.loadingPromises.get(moduleName);
        }
        
        // Start loading
        console.log(\`Loading module '\${moduleName}'...\`);
        const loadingPromise = loader().then(module => {
            this.loadedModules.set(moduleName, module);
            this.loadingPromises.delete(moduleName);
            console.log(\`Module '\${moduleName}' loaded successfully\`);
            return module;
        });
        
        this.loadingPromises.set(moduleName, loadingPromise);
        return loadingPromise;
    }
    
    isLoaded(moduleName) {
        return this.loadedModules.has(moduleName);
    }
    
    getLoadedModules() {
        return Array.from(this.loadedModules.keys());
    }
}

// Simulate module loaders
const moduleLoaders = {
    charts: () => new Promise(resolve => {
        setTimeout(() => resolve({
            createChart: (data) => \`Chart with \${data.length} points\`,
            chartTypes: ['line', 'bar', 'pie']
        }), 500);
    }),
    
    utils: () => new Promise(resolve => {
        setTimeout(() => resolve({
            formatDate: (date) => date.toLocaleDateString(),
            formatNumber: (num) => num.toLocaleString()
        }), 200);
    })
};

const lazyLoader = new LazyLoader();

// Usage
async function useChartsModule() {
    const charts = await lazyLoader.loadModule('charts', moduleLoaders.charts);
    return charts.createChart([1, 2, 3, 4, 5]);
}

useChartsModule().then(result => console.log('Chart result:', result));

// Debouncing and Throttling
console.log('=== Debouncing and Throttling ===');

function debounce(func, wait, immediate = false) {
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
const expensiveOperation = (query) => {
    console.log(\`Searching for: \${query}\`);
    // Simulate expensive search
};

const debouncedSearch = debounce(expensiveOperation, 300);
const throttledScroll = throttle(() => console.log('Scroll event'), 100);

// Virtual Scrolling Implementation
console.log('=== Virtual Scrolling ===');

class VirtualList {
    constructor(items, itemHeight, containerHeight) {
        this.items = items;
        this.itemHeight = itemHeight;
        this.containerHeight = containerHeight;
        this.scrollTop = 0;
        this.visibleItemsCount = Math.ceil(containerHeight / itemHeight);
        this.buffer = 5; // Extra items for smooth scrolling
    }
    
    getVisibleItems() {
        const startIndex = Math.max(0, 
            Math.floor(this.scrollTop / this.itemHeight) - this.buffer
        );
        const endIndex = Math.min(this.items.length - 1,
            startIndex + this.visibleItemsCount + (this.buffer * 2)
        );
        
        const visibleItems = [];
        for (let i = startIndex; i <= endIndex; i++) {
            visibleItems.push({
                index: i,
                item: this.items[i],
                top: i * this.itemHeight
            });
        }
        
        return {
            items: visibleItems,
            totalHeight: this.items.length * this.itemHeight,
            startIndex,
            endIndex
        };
    }
    
    updateScrollPosition(scrollTop) {
        this.scrollTop = scrollTop;
    }
    
    getScrollInfo() {
        const visible = this.getVisibleItems();
        return {
            scrollTop: this.scrollTop,
            visibleItemsCount: visible.items.length,
            totalItems: this.items.length,
            renderedRange: \`\${visible.startIndex}-\${visible.endIndex}\`
        };
    }
}

// Example with large dataset
const largeDataset = Array.from({ length: 10000 }, (_, i) => ({
    id: i,
    name: \`Item \${i}\`,
    value: Math.random() * 100
}));

const virtualList = new VirtualList(largeDataset, 50, 400);
console.log('Virtual list info:', virtualList.getScrollInfo());

// Simulate scrolling
virtualList.updateScrollPosition(2500);
console.log('After scrolling:', virtualList.getScrollInfo());

// Object Pooling
console.log('=== Object Pooling ===');

class ObjectPool {
    constructor(createFn, resetFn, initialSize = 10) {
        this.createFn = createFn;
        this.resetFn = resetFn;
        this.pool = [];
        this.activeObjects = new Set();
        
        // Pre-populate pool
        for (let i = 0; i < initialSize; i++) {
            this.pool.push(this.createFn());
        }
    }
    
    acquire() {
        let obj;
        
        if (this.pool.length > 0) {
            obj = this.pool.pop();
        } else {
            obj = this.createFn();
            console.log('Created new object (pool was empty)');
        }
        
        this.activeObjects.add(obj);
        return obj;
    }
    
    release(obj) {
        if (this.activeObjects.has(obj)) {
            this.activeObjects.delete(obj);
            this.resetFn(obj);
            this.pool.push(obj);
        }
    }
    
    getStats() {
        return {
            poolSize: this.pool.length,
            activeObjects: this.activeObjects.size,
            totalObjects: this.pool.length + this.activeObjects.size
        };
    }
}

// Example: Particle system with object pooling
class Particle {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.vx = 0;
        this.vy = 0;
        this.life = 1.0;
    }
    
    update(deltaTime) {
        this.x += this.vx * deltaTime;
        this.y += this.vy * deltaTime;
        this.life -= deltaTime;
    }
    
    isAlive() {
        return this.life > 0;
    }
}

const particlePool = new ObjectPool(
    () => new Particle(),
    (particle) => {
        particle.x = 0;
        particle.y = 0;
        particle.vx = 0;
        particle.vy = 0;
        particle.life = 1.0;
    },
    100
);

// Simulate particle system
function createParticleExplosion(x, y, count) {
    const particles = [];
    
    for (let i = 0; i < count; i++) {
        const particle = particlePool.acquire();
        particle.x = x;
        particle.y = y;
        particle.vx = (Math.random() - 0.5) * 100;
        particle.vy = (Math.random() - 0.5) * 100;
        particles.push(particle);
    }
    
    console.log(\`Created \${count} particles\`);
    console.log('Pool stats:', particlePool.getStats());
    
    // Simulate cleanup
    setTimeout(() => {
        particles.forEach(particle => particlePool.release(particle));
        console.log('Particles returned to pool');
        console.log('Pool stats after cleanup:', particlePool.getStats());
    }, 1000);
}

createParticleExplosion(100, 100, 50);

// Batch Processing
console.log('=== Batch Processing ===');

class BatchProcessor {
    constructor(processFn, batchSize = 100, delay = 0) {
        this.processFn = processFn;
        this.batchSize = batchSize;
        this.delay = delay;
        this.queue = [];
        this.processing = false;
    }
    
    add(item) {
        this.queue.push(item);
        
        if (!this.processing) {
            this.processBatch();
        }
    }
    
    addBatch(items) {
        this.queue.push(...items);
        
        if (!this.processing) {
            this.processBatch();
        }
    }
    
    async processBatch() {
        if (this.processing || this.queue.length === 0) {
            return;
        }
        
        this.processing = true;
        
        while (this.queue.length > 0) {
            const batch = this.queue.splice(0, this.batchSize);
            
            console.log(\`Processing batch of \${batch.length} items\`);
            await this.processFn(batch);
            
            if (this.delay > 0 && this.queue.length > 0) {
                await new Promise(resolve => setTimeout(resolve, this.delay));
            }
        }
        
        this.processing = false;
        console.log('Batch processing completed');
    }
    
    getQueueSize() {
        return this.queue.length;
    }
}

// Example: Processing large amounts of data
async function processDataBatch(items) {
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const results = items.map(item => ({
        ...item,
        processed: true,
        processedAt: new Date()
    }));
    
    console.log(\`Processed \${results.length} items\`);
    return results;
}

const batchProcessor = new BatchProcessor(processDataBatch, 10, 50);

// Add items to process
const dataToProcess = Array.from({ length: 95 }, (_, i) => ({ id: i, data: \`item-\${i}\` }));
batchProcessor.addBatch(dataToProcess);

// Request Animation Frame Optimization
console.log('=== RAF Optimization ===');

class AnimationScheduler {
    constructor() {
        this.tasks = [];
        this.running = false;
    }
    
    schedule(task, priority = 0) {
        this.tasks.push({ task, priority });
        this.tasks.sort((a, b) => b.priority - a.priority);
        
        if (!this.running) {
            this.start();
        }
    }
    
    start() {
        this.running = true;
        this.tick();
    }
    
    tick() {
        if (this.tasks.length === 0) {
            this.running = false;
            return;
        }
        
        const startTime = performance.now();
        const frameTimeLimit = 16; // ~60fps
        
        while (this.tasks.length > 0 && (performance.now() - startTime) < frameTimeLimit) {
            const { task } = this.tasks.shift();
            task();
        }
        
        if (this.tasks.length > 0) {
            requestAnimationFrame(() => this.tick());
        } else {
            this.running = false;
        }
    }
    
    clear() {
        this.tasks = [];
        this.running = false;
    }
}

const scheduler = new AnimationScheduler();

// Schedule different priority tasks
for (let i = 0; i < 20; i++) {
    scheduler.schedule(() => {
        console.log(\`High priority task \${i}\`);
    }, 10);
}

for (let i = 0; i < 10; i++) {
    scheduler.schedule(() => {
        console.log(\`Low priority task \${i}\`);
    }, 1);
}

// Tree Shaking Simulation
console.log('=== Tree Shaking Concept ===');

// Library with multiple functions
const MathLibrary = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => b !== 0 ? a / b : null,
    power: (a, b) => Math.pow(a, b),
    sqrt: (a) => Math.sqrt(a),
    sin: (a) => Math.sin(a),
    cos: (a) => Math.cos(a),
    // Many more functions...
};

// Tree shaking would eliminate unused functions
function createOptimizedLibrary(usedFunctions) {
    const optimized = {};
    
    usedFunctions.forEach(fnName => {
        if (MathLibrary[fnName]) {
            optimized[fnName] = MathLibrary[fnName];
        }
    });
    
    console.log('Original library size:', Object.keys(MathLibrary).length);
    console.log('Optimized library size:', Object.keys(optimized).length);
    console.log('Reduction:', 
        Math.round((1 - Object.keys(optimized).length / Object.keys(MathLibrary).length) * 100) + '%'
    );
    
    return optimized;
}

// Only include functions we actually use
const optimizedMath = createOptimizedLibrary(['add', 'multiply', 'sqrt']);
console.log('Using optimized library:', optimizedMath.add(5, 3));

// Code Splitting Simulation
console.log('=== Code Splitting ===');

class ModuleBundler {
    constructor() {
        this.chunks = new Map();
        this.loadedChunks = new Set();
    }
    
    createChunk(name, modules) {
        this.chunks.set(name, {
            name,
            modules,
            size: modules.join('').length, // Simplified size calculation
            dependencies: []
        });
    }
    
    async loadChunk(name) {
        if (this.loadedChunks.has(name)) {
            console.log(\`Chunk '\${name}' already loaded\`);
            return;
        }
        
        const chunk = this.chunks.get(name);
        if (!chunk) {
            throw new Error(\`Chunk '\${name}' not found\`);
        }
        
        console.log(\`Loading chunk '\${name}' (\${chunk.size} bytes)...\`);
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 100));
        
        this.loadedChunks.add(name);
        console.log(\`Chunk '\${name}' loaded\`);
        
        return chunk;
    }
    
    getLoadedChunks() {
        return Array.from(this.loadedChunks);
    }
    
    getTotalSize() {
        let total = 0;
        for (const chunk of this.chunks.values()) {
            total += chunk.size;
        }
        return total;
    }
    
    getLoadedSize() {
        let loaded = 0;
        for (const chunkName of this.loadedChunks) {
            const chunk = this.chunks.get(chunkName);
            if (chunk) loaded += chunk.size;
        }
        return loaded;
    }
}

const bundler = new ModuleBundler();

// Create different chunks
bundler.createChunk('vendor', ['react', 'react-dom', 'lodash']);
bundler.createChunk('main', ['app', 'routes', 'components']);
bundler.createChunk('dashboard', ['charts', 'analytics', 'reports']);
bundler.createChunk('admin', ['user-management', 'settings', 'logs']);

console.log('Total bundle size:', bundler.getTotalSize(), 'bytes');

// Load chunks on demand
async function loadDashboard() {
    await bundler.loadChunk('vendor'); // Common dependencies
    await bundler.loadChunk('main');   // Main app
    await bundler.loadChunk('dashboard'); // Dashboard specific
    
    console.log('Dashboard loaded');
    console.log('Loaded size:', bundler.getLoadedSize(), 'bytes');
}

loadDashboard();

console.log('Optimization examples completed');`,

  exercises: [
    {
      question: "Create a memoization function with LRU (Least Recently Used) cache eviction:",
      solution: `function memoizeWithLRU(fn, maxSize = 100) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      // Move to end (most recently used)
      const value = cache.get(key);
      cache.delete(key);
      cache.set(key, value);
      return value;
    }
    
    // Remove oldest if at capacity
    if (cache.size >= maxSize) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
    
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Usage:
const memoizedFn = memoizeWithLRU(expensiveFunction, 50);`,
      explanation: "LRU cache keeps frequently used items while evicting the least recently used when the cache is full."
    }
  ],

  quiz: [
    {
      question: "What is the primary benefit of code splitting?",
      options: [
        "Faster compilation",
        "Reduced initial bundle size",
        "Better error handling",
        "Improved security"
      ],
      correct: 1,
      explanation: "Code splitting reduces the initial bundle size by loading code on-demand, improving initial page load performance."
    }
  ],

  resources: [
    {
      title: "Web Performance Optimization",
      url: "https://developer.mozilla.org/en-US/docs/Web/Performance"
    }
  ],

  nextModules: ['performance', 'best-practices'],
  prerequisites: ['functions-basics', 'promises', 'modules']
};