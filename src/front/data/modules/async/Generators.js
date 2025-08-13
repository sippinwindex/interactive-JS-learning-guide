export default {
  title: 'Generators',
  duration: '40 min',
  difficulty: 'Advanced',
  overview: 'Master ES6 generators for creating iterators, managing async flow, and implementing advanced patterns like lazy evaluation and cooperative multitasking.',
  
  keyPoints: [
    'Generators are functions that can pause and resume execution',
    'Use function* syntax and yield keyword',
    'Generators return iterator objects',
    'Can yield values and receive values via next()',
    'Useful for async programming and data streaming',
    'Enable lazy evaluation and memory-efficient iteration'
  ],

  example: `// Basic Generator Syntax
console.log('=== Basic Generator Syntax ===');

// Generator function declaration
function* simpleGenerator() {
    console.log('Generator started');
    yield 1;
    console.log('After first yield');
    yield 2;
    console.log('After second yield');
    yield 3;
    console.log('Generator finished');
}

// Creating generator iterator
const gen1 = simpleGenerator();
console.log('Generator created:', typeof gen1);
console.log('Is generator:', gen1.constructor.name);

// Using generator iterator
console.log('\\nIterating through generator:');
console.log('First next():', gen1.next());   // { value: 1, done: false }
console.log('Second next():', gen1.next());  // { value: 2, done: false }
console.log('Third next():', gen1.next());   // { value: 3, done: false }
console.log('Fourth next():', gen1.next());  // { value: undefined, done: true }

// Generator Expression
const generatorExpression = function* () {
    yield 'hello';
    yield 'world';
};

const gen2 = generatorExpression();
console.log('\\nGenerator expression:');
console.log([...gen2]); // ['hello', 'world']

// Generators with for...of
console.log('\\n=== Generators with for...of ===');

function* countUp(max) {
    for (let i = 1; i <= max; i++) {
        console.log('Yielding ' + i);
        yield i;
    }
}

console.log('Using for...of with generator:');
for (const value of countUp(3)) {
    console.log('Received:', value);
}

// Infinite Generators
console.log('\\n=== Infinite Generators ===');

function* infiniteSequence() {
    let i = 0;
    while (true) {
        yield i++;
    }
}

function* fibonacciGenerator() {
    let a = 0, b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

// Take first N values from infinite generator
function take(generator, count) {
    const result = [];
    const iterator = generator[Symbol.iterator] ? generator : generator();
    
    for (let i = 0; i < count; i++) {
        const { value, done } = iterator.next();
        if (done) break;
        result.push(value);
    }
    
    return result;
}

console.log('First 10 numbers:', take(infiniteSequence(), 10));
console.log('First 10 Fibonacci:', take(fibonacciGenerator(), 10));

// Two-way Communication with Generators
console.log('\\n=== Two-way Communication ===');

function* communicatingGenerator() {
    console.log('Generator started');
    
    const value1 = yield 'What is your name?';
    console.log('Received name:', value1);
    
    const value2 = yield 'Hello ' + value1 + '! What is your age?';
    console.log('Received age:', value2);
    
    return 'Nice to meet you ' + value1 + ', age ' + value2 + '!';
}

const comm = communicatingGenerator();
console.log('First yield:', comm.next().value);
console.log('Second yield:', comm.next('Alice').value);
console.log('Final result:', comm.next(25).value);

// Generator with Return Values
console.log('\\n=== Generators with Return ===');

function* generatorWithReturn() {
    yield 1;
    yield 2;
    return 'done'; // This value is available when done: true
}

const genReturn = generatorWithReturn();
console.log('Yield 1:', genReturn.next());
console.log('Yield 2:', genReturn.next());
console.log('Return:', genReturn.next()); // { value: 'done', done: true }

// Error Handling in Generators
console.log('\\n=== Error Handling ===');

function* errorHandlingGenerator() {
    try {
        console.log('Generator started');
        yield 1;
        console.log('After first yield');
        yield 2;
        console.log('After second yield');
        yield 3;
    } catch (error) {
        console.log('Caught error in generator:', error.message);
        yield 'error handled';
    } finally {
        console.log('Generator cleanup');
    }
}

const errorGen = errorHandlingGenerator();
console.log('Normal execution:');
console.log(errorGen.next());
console.log(errorGen.next());

console.log('\\nThrowing error:');
try {
    console.log(errorGen.throw(new Error('Something went wrong')));
    console.log(errorGen.next());
} catch (error) {
    console.log('Error propagated out:', error.message);
}

// Delegating Generators (yield*)
console.log('\\n=== Delegating Generators ===');

function* innerGenerator() {
    yield 'inner1';
    yield 'inner2';
    return 'inner return';
}

function* middleGenerator() {
    yield 'middle start';
    const result = yield* innerGenerator(); // Delegate to inner generator
    console.log('Inner generator returned:', result);
    yield 'middle end';
}

function* outerGenerator() {
    yield 'outer start';
    yield* middleGenerator(); // Delegate to middle generator
    yield 'outer end';
}

console.log('Delegated generators:');
const delegated = outerGenerator();
for (const value of delegated) {
    console.log('  ', value);
}

// Practical Example: Data Processing Pipeline
console.log('\\n=== Data Processing Pipeline ===');

function* dataSource() {
    const data = [
        { id: 1, name: 'Alice', age: 30, active: true },
        { id: 2, name: 'Bob', age: 25, active: false },
        { id: 3, name: 'Charlie', age: 35, active: true },
        { id: 4, name: 'Diana', age: 28, active: true },
        { id: 5, name: 'Eve', age: 32, active: false }
    ];
    
    for (const item of data) {
        console.log('Processing:', item.name);
        yield item;
    }
}

function* filterActive(source) {
    for (const item of source) {
        if (item.active) {
            yield item;
        }
    }
}

function* transformData(source) {
    for (const item of source) {
        yield {
            ...item,
            displayName: item.name.toUpperCase(),
            ageGroup: item.age >= 30 ? 'senior' : 'junior'
        };
    }
}

function* takeN(source, n) {
    let count = 0;
    for (const item of source) {
        if (count >= n) break;
        yield item;
        count++;
    }
}

// Create processing pipeline
const pipeline = takeN(
    transformData(
        filterActive(
            dataSource()
        )
    ),
    2
);

console.log('Pipeline results:');
for (const result of pipeline) {
    console.log('  ', result);
}

// Async Generators (ES2018)
console.log('\\n=== Async Generators ===');

async function* asyncDataGenerator() {
    for (let i = 1; i <= 5; i++) {
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 200));
        console.log('Async yielding ' + i);
        yield 'async-' + i;
    }
}

async function consumeAsyncGenerator() {
    console.log('Consuming async generator:');
    
    for await (const value of asyncDataGenerator()) {
        console.log('  Received:', value);
    }
    
    console.log('Async generator consumption complete');
}

// Execute async generator demo
consumeAsyncGenerator();

// Generator-based State Machine
console.log('\\n=== State Machine with Generators ===');

function* trafficLightStateMachine() {
    while (true) {
        console.log('🔴 RED - Stop');
        const redInput = yield 'red';
        if (redInput === 'next') {
            
            console.log('🟢 GREEN - Go');
            const greenInput = yield 'green';
            if (greenInput === 'next') {
                
                console.log('🟡 YELLOW - Caution');
                const yellowInput = yield 'yellow';
                if (yellowInput === 'next') {
                    continue; // Back to red
                }
            }
        }
    }
}

const trafficLight = trafficLightStateMachine();
console.log('Initial state:', trafficLight.next().value);
console.log('After next:', trafficLight.next('next').value);
console.log('After next:', trafficLight.next('next').value);
console.log('After next:', trafficLight.next('next').value);

// Lazy Evaluation with Generators
console.log('\\n=== Lazy Evaluation ===');

function* lazyRange(start, end, step = 1) {
    console.log('Creating lazy range from ' + start + ' to ' + end);
    
    for (let i = start; i <= end; i += step) {
        console.log('  Yielding ' + i);
        yield i;
    }
}

function* lazyMap(iterable, mapFn) {
    for (const item of iterable) {
        yield mapFn(item);
    }
}

function* lazyFilter(iterable, filterFn) {
    for (const item of iterable) {
        if (filterFn(item)) {
            yield item;
        }
    }
}

// Lazy evaluation - nothing executes until we iterate
console.log('Setting up lazy operations...');
const lazyNumbers = lazyRange(1, 1000000); // Million numbers, but not generated yet
const lazyEvens = lazyFilter(lazyNumbers, n => n % 2 === 0);
const lazySquares = lazyMap(lazyEvens, n => n * n);

console.log('\\nTaking first 5 results:');
let count = 0;
for (const square of lazySquares) {
    if (count >= 5) break;
    console.log('  Result:', square);
    count++;
}

// Memory-efficient File Processing Simulation
console.log('\\n=== Memory-efficient Processing ===');

function* simulateFileLines() {
    const lines = [
        'line 1: user data',
        'line 2: more data',
        'line 3: important info',
        'line 4: another record',
        'line 5: final data'
    ];
    
    for (const line of lines) {
        console.log('Reading line: ' + line);
        yield line;
    }
}

function* processFileLines(lines) {
    for (const line of lines) {
        // Simulate processing each line
        const processed = {
            original: line,
            length: line.length,
            words: line.split(' ').length,
            timestamp: Date.now()
        };
        
        yield processed;
    }
}

console.log('Processing file lines one at a time:');
for (const processed of processFileLines(simulateFileLines())) {
    console.log('  Processed:', processed);
}

// Generator-based Iterator Pattern
console.log('\\n=== Custom Iterator with Generators ===');

class CustomCollection {
    constructor(...items) {
        this.items = items;
    }
    
    // Make the collection iterable
    *[Symbol.iterator]() {
        for (const item of this.items) {
            yield item;
        }
    }
    
    // Custom iteration methods
    *reverse() {
        for (let i = this.items.length - 1; i >= 0; i--) {
            yield this.items[i];
        }
    }
    
    *enumerate() {
        for (let i = 0; i < this.items.length; i++) {
            yield [i, this.items[i]];
        }
    }
    
    *chunk(size) {
        for (let i = 0; i < this.items.length; i += size) {
            yield this.items.slice(i, i + size);
        }
    }
    
    add(item) {
        this.items.push(item);
    }
}

const collection = new CustomCollection('a', 'b', 'c', 'd', 'e');

console.log('Normal iteration:');
for (const item of collection) {
    console.log('  ', item);
}

console.log('\\nReverse iteration:');
for (const item of collection.reverse()) {
    console.log('  ', item);
}

console.log('\\nEnumerated iteration:');
for (const [index, item] of collection.enumerate()) {
    console.log('  ' + index + ': ' + item);
}

console.log('\\nChunked iteration (size 2):');
for (const chunk of collection.chunk(2)) {
    console.log('  ', chunk);
}

// Cooperative Multitasking Simulation
console.log('\\n=== Cooperative Multitasking ===');

function* task1() {
    console.log('Task 1: Starting work');
    yield 'task1-step1';
    
    console.log('Task 1: Continuing work');
    yield 'task1-step2';
    
    console.log('Task 1: Finishing work');
    return 'task1-complete';
}

function* task2() {
    console.log('Task 2: Starting work');
    yield 'task2-step1';
    
    console.log('Task 2: Continuing work');
    yield 'task2-step2';
    
    console.log('Task 2: Finishing work');
    return 'task2-complete';
}

function* scheduler(tasks) {
    const generators = tasks.map(task => task());
    const active = [...generators];
    
    while (active.length > 0) {
        for (let i = active.length - 1; i >= 0; i--) {
            const gen = active[i];
            const { value, done } = gen.next();
            
            if (done) {
                console.log('Task completed with result:', value);
                active.splice(i, 1);
            } else {
                console.log('Task yielded:', value);
            }
        }
        
        // Yield control to allow other operations
        yield active.length + ' tasks remaining';
    }
    
    return 'All tasks completed';
}

console.log('Running cooperative multitasking:');
const taskScheduler = scheduler([task1, task2]);
for (const status of taskScheduler) {
    console.log('Scheduler status:', status);
}

// Generator Utilities
console.log('\\n=== Generator Utilities ===');

const GeneratorUtils = {
    // Combine multiple generators
    *chain(...generators) {
        for (const gen of generators) {
            yield* gen;
        }
    },
    
    // Zip generators together
    *zip(...generators) {
        const iterators = generators.map(gen => 
            gen[Symbol.iterator] ? gen[Symbol.iterator]() : gen
        );
        
        while (true) {
            const results = iterators.map(it => it.next());
            
            if (results.some(result => result.done)) {
                break;
            }
            
            yield results.map(result => result.value);
        }
    },
    
    // Repeat a generator
    *repeat(generator, times) {
        for (let i = 0; i < times; i++) {
            yield* generator();
        }
    },
    
    // Flatten nested generators
    *flatten(generator) {
        for (const item of generator) {
            if (item && typeof item[Symbol.iterator] === 'function') {
                yield* this.flatten(item);
            } else {
                yield item;
            }
        }
    }
};

// Test generator utilities
function* genA() { yield 1; yield 2; }
function* genB() { yield 'a'; yield 'b'; }
function* genC() { yield [3, 4]; yield [5, 6]; }

console.log('Chained generators:', [...GeneratorUtils.chain(genA(), genB())]);
console.log('Zipped generators:', [...GeneratorUtils.zip(genA(), genB())]);
console.log('Repeated generator:', [...GeneratorUtils.repeat(genA, 2)]);
console.log('Flattened generator:', [...GeneratorUtils.flatten(genC())]);

// Performance Comparison
console.log('\\n=== Performance Comparison ===');

// Compare generator vs array for large datasets
function generateArrayData(size) {
    console.time('Array generation');
    const arr = [];
    for (let i = 0; i < size; i++) {
        arr.push(i * i);
    }
    console.timeEnd('Array generation');
    return arr;
}

function* generateLazyData(size) {
    console.time('Generator setup');
    console.timeEnd('Generator setup');
    
    for (let i = 0; i < size; i++) {
        yield i * i;
    }
}

const arraySize = 100000;

// Array approach - all data in memory
const arrayData = generateArrayData(arraySize);
console.log('Array memory usage: ~', (arrayData.length * 8) / 1024, 'KB'); // Rough estimate

// Generator approach - lazy evaluation
const genData = generateLazyData(arraySize);
console.log('Generator memory usage: minimal until iteration');

// Time consumption of first 10 elements
console.time('Array first 10');
const arrayFirst10 = arrayData.slice(0, 10);
console.timeEnd('Array first 10');

console.time('Generator first 10');
const genFirst10 = take(genData, 10);
console.timeEnd('Generator first 10');

console.log('First 10 from array:', arrayFirst10.slice(0, 5), '...');
console.log('First 10 from generator:', genFirst10.slice(0, 5), '...');

// Real-world Example: Pagination Generator
console.log('\\n=== Pagination Generator ===');

function* paginatedData(data, pageSize = 10) {
    for (let i = 0; i < data.length; i += pageSize) {
        const page = data.slice(i, i + pageSize);
        const pageNumber = Math.floor(i / pageSize) + 1;
        const totalPages = Math.ceil(data.length / pageSize);
        
        console.log('Loading page ' + pageNumber + ' of ' + totalPages);
        
        yield {
            page: pageNumber,
            totalPages: totalPages,
            data: page,
            hasNext: i + pageSize < data.length,
            hasPrev: i > 0
        };
    }
}

// Simulate user data
const userData = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: 'User ' + (i + 1),
    email: 'user' + (i + 1) + '@example.com'
}));

console.log('Paginated data demo:');
const paginator = paginatedData(userData, 5);

// Get first three pages
for (let i = 0; i < 3; i++) {
    const { value, done } = paginator.next();
    if (done) break;
    
    console.log('Page ' + value.page + ':', value.data.map(u => u.name));
    console.log('  Has next: ' + value.hasNext + ', Has prev: ' + value.hasPrev);
}

// Generator Composition Pattern
console.log('\\n=== Generator Composition ===');

function* numbers(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

function* filter(predicate) {
    return function* (source) {
        for (const item of source) {
            if (predicate(item)) {
                yield item;
            }
        }
    };
}

function* map(transform) {
    return function* (source) {
        for (const item of source) {
            yield transform(item);
        }
    };
}

function* takeGen(count) {
    return function* (source) {
        let taken = 0;
        for (const item of source) {
            if (taken >= count) break;
            yield item;
            taken++;
        }
    };
}

// Compose operations
const isEven = n => n % 2 === 0;
const square = n => n * n;

function compose(...operations) {
    return function* (source) {
        let current = source;
        for (const operation of operations) {
            current = operation(current);
        }
        yield* current;
    };
}

const pipeline2 = compose(
    filter(isEven),
    map(square),
    takeGen(5)
);

console.log('Composed pipeline results:');
const result = [...pipeline2(numbers(1, 20))];
console.log(result);

// Best Practices Summary
setTimeout(() => {
    console.log('\\n=== Generator Best Practices ===');
    console.log('✅ Use generators for lazy evaluation and memory efficiency');
    console.log('✅ Implement custom iterators with generator functions');
    console.log('✅ Use yield* for delegating to other iterables');
    console.log('✅ Handle errors properly with try-catch in generators');
    console.log('✅ Use generators for data processing pipelines');
    console.log('✅ Consider async generators for async iteration');
    console.log('✅ Use generators for state machines and control flow');
    console.log('⚠️  Be mindful of infinite generators - always have exit conditions');
    console.log("⚠️  Don't overuse generators where simple functions suffice");
    console.log('⚠️  Remember generators maintain state between yields');
}, 2000);`,

  exercises: [
    {
      question: "Create a generator that implements a sliding window over a data stream:",
      solution: `function* slidingWindow(iterable, windowSize) {
  const window = [];
  
  for (const item of iterable) {
    window.push(item);
    
    // Remove oldest item if window exceeds size
    if (window.length > windowSize) {
      window.shift();
    }
    
    // Yield window when it reaches the desired size
    if (window.length === windowSize) {
      yield [...window]; // Yield a copy to prevent mutation
    }
  }
}

// Usage with infinite data stream
function* dataStream() {
  let i = 1;
  while (true) {
    yield 'data-' + i++;
  }
}

// Take first 10 windows of size 3
function* takeWindows(source, count) {
  let taken = 0;
  for (const window of source) {
    if (taken >= count) break;
    yield window;
    taken++;
  }
}

const windows = takeWindows(
  slidingWindow(dataStream(), 3),
  5
);

for (const window of windows) {
  console.log('Window:', window);
}

// Output:
// Window: ['data-1', 'data-2', 'data-3']
// Window: ['data-2', 'data-3', 'data-4']
// Window: ['data-3', 'data-4', 'data-5']
// Window: ['data-4', 'data-5', 'data-6']
// Window: ['data-5', 'data-6', 'data-7']`,
      explanation: "This sliding window generator demonstrates stateful iteration, memory management, and how generators can efficiently process streaming data without loading everything into memory."
    }
  ],

  quiz: [
    {
      question: "What happens when you call a generator function?",
      options: [
        "The function executes immediately and returns a value",
        "The function executes immediately and returns undefined",
        "A generator object is returned, but the function doesn't execute yet",
        "An error is thrown because generators can't be called"
      ],
      correct: 2,
      explanation: "Calling a generator function returns a generator object (iterator) but doesn't execute the function body. The function only starts executing when you call next() on the generator object."
    }
  ],

  resources: [
    {
      title: "MDN - Generators",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator"
    },
    {
      title: "MDN - function*",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*"
    }
  ],

  nextModules: ['async-await', 'iterators'],
  prerequisites: ['functions', 'iterators', 'promises']
};