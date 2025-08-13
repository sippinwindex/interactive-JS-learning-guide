// src/front/data/modules/async/EventLoop.js
export default {
  title: 'Event Loop',
  duration: '35 min',
  difficulty: 'Advanced',
  overview: 'Understand JavaScript\'s event loop, call stack, task queue, and microtask queue. Learn how async operations are executed and prioritized.',
  
  keyPoints: [
    'Call stack executes synchronous code',
    'Event loop manages async operations',
    'Microtasks have higher priority than macrotasks',
    'setTimeout, setInterval are macrotasks',
    'Promise.then, queueMicrotask are microtasks',
    'Understanding execution order prevents bugs'
  ],

  example: `// Understanding the Call Stack
console.log('=== Call Stack Demonstration ===');

function first() {
    console.log('1. First function starts');
    second();
    console.log('4. First function ends');
}

function second() {
    console.log('2. Second function starts');
    third();
    console.log('3. Second function ends');
}

function third() {
    console.log('2.5. Third function executes');
}

// Call stack: first() -> second() -> third()
first();

// Basic Event Loop Demonstration
console.log('\\n=== Basic Event Loop ===');

console.log('1. Synchronous start');

setTimeout(() => {
    console.log('4. Timeout callback (macrotask)');
}, 0);

console.log('2. Synchronous middle');

Promise.resolve().then(() => {
    console.log('3. Promise callback (microtask)');
});

console.log('2.5. Synchronous end');

// Execution order:
// 1. All synchronous code first
// 2. Then microtasks (Promise.then)
// 3. Then macrotasks (setTimeout)

// Microtasks vs Macrotasks
console.log('\\n=== Microtasks vs Macrotasks ===');

console.log('🚀 Script start');

// Macrotask
setTimeout(() => console.log('⏰ setTimeout 1'), 0);

// Microtask
Promise.resolve().then(() => console.log('🎯 Promise 1'));

// Another macrotask
setTimeout(() => console.log('⏰ setTimeout 2'), 0);

// Another microtask
Promise.resolve().then(() => console.log('🎯 Promise 2'));

// Immediate microtask
queueMicrotask(() => console.log('⚡ queueMicrotask'));

console.log('🏁 Script end');

// Expected order:
// 🚀 Script start
// 🏁 Script end
// 🎯 Promise 1
// 🎯 Promise 2
// ⚡ queueMicrotask
// ⏰ setTimeout 1
// ⏰ setTimeout 2

// Complex Event Loop Example
console.log('\\n=== Complex Event Loop ===');

function demonstrateEventLoop() {
    console.log('=== Event Loop Demo Start ===');
    
    // Synchronous
    console.log('A: Synchronous 1');
    
    // Macrotask
    setTimeout(() => {
        console.log('B: setTimeout 0ms');
        
        // Nested microtask
        Promise.resolve().then(() => {
            console.log('C: Promise inside setTimeout');
        });
    }, 0);
    
    // Immediate macrotask (setImmediate in Node.js, similar to setTimeout(0))
    setTimeout(() => {
        console.log('D: setTimeout 0ms (second)');
    }, 0);
    
    // Microtask
    Promise.resolve().then(() => {
        console.log('E: Promise 1');
        
        // Nested microtask
        return Promise.resolve().then(() => {
            console.log('F: Nested Promise');
        });
    }).then(() => {
        console.log('G: Promise chain continuation');
    });
    
    // Another microtask
    Promise.resolve().then(() => {
        console.log('H: Promise 2');
    });
    
    // Synchronous
    console.log('I: Synchronous 2');
}

setTimeout(demonstrateEventLoop, 100);

// Promise Microtask Queuing
console.log('\\n=== Promise Microtask Queuing ===');

function promiseMicrotaskDemo() {
    console.log('Promise demo start');
    
    Promise.resolve()
        .then(() => {
            console.log('Promise 1');
            return 'value from promise 1';
        })
        .then((value) => {
            console.log('Promise 2 received:', value);
            throw new Error('Error from promise 2');
        })
        .then(() => {
            console.log('Promise 3 (will not execute)');
        })
        .catch((error) => {
            console.log('Promise catch:', error.message);
            return 'recovered value';
        })
        .then((value) => {
            console.log('Promise 4 received:', value);
        });
        
    console.log('Promise demo end');
}

setTimeout(promiseMicrotaskDemo, 200);

// async/await and Event Loop
console.log('\\n=== async/await and Event Loop ===');

async function asyncAwaitDemo() {
    console.log('Async function start');
    
    console.log('Before first await');
    await Promise.resolve('First await result');
    console.log('After first await');
    
    console.log('Before second await');
    await new Promise(resolve => {
        setTimeout(() => {
            resolve('Second await result');
        }, 100);
    });
    console.log('After second await');
    
    console.log('Async function end');
}

// This will demonstrate how async/await interacts with event loop
setTimeout(() => {
    asyncAwaitDemo();
}, 300);

// Event Loop Visualization
console.log('\\n=== Event Loop Visualization ===');

function visualizeEventLoop() {
    const steps = [];
    
    function log(message, type = 'sync') {
        steps.push({ message, type, timestamp: Date.now() });
        console.log(\`[\${type.toUpperCase()}] \${message}\`);
    }
    
    log('Execution starts', 'sync');
    
    setTimeout(() => {
        log('setTimeout callback executed', 'macro');
        
        Promise.resolve().then(() => {
            log('Promise in setTimeout executed', 'micro');
        });
        
        log('setTimeout callback ends', 'macro');
    }, 0);
    
    Promise.resolve().then(() => {
        log('First promise resolved', 'micro');
        
        setTimeout(() => {
            log('Nested setTimeout executed', 'macro');
        }, 0);
        
        return Promise.resolve();
    }).then(() => {
        log('Second promise resolved', 'micro');
    });
    
    queueMicrotask(() => {
        log('queueMicrotask executed', 'micro');
    });
    
    log('Execution ends', 'sync');
    
    // Return steps for analysis
    setTimeout(() => {
        console.log('\\nExecution steps:', steps);
    }, 50);
}

setTimeout(visualizeEventLoop, 400);

// Real-world Event Loop Issues
console.log('\\n=== Common Event Loop Issues ===');

// Issue 1: Unexpected execution order
function orderIssueDemo() {
    console.log('\\n--- Order Issue Demo ---');
    
    console.log('User clicked button');
    
    // Simulating immediate DOM update (synchronous)
    console.log('DOM updated immediately');
    
    // API call (macrotask)
    setTimeout(() => {
        console.log('API response received');
        
        // Update UI based on API response
        console.log('UI updated with API data');
    }, 0);
    
    // User input validation (microtask)
    Promise.resolve().then(() => {
        console.log('Input validation completed');
    });
    
    console.log('Event handler finished');
}

setTimeout(orderIssueDemo, 500);

// Issue 2: Blocking the event loop
function blockingDemo() {
    console.log('\\n--- Blocking Demo ---');
    
    console.log('Before blocking operation');
    
    // ❌ BAD: Blocking the event loop
    function blockingOperation() {
        const start = Date.now();
        while (Date.now() - start < 1000) {
            // Blocking for 1 second
        }
        console.log('Blocking operation completed');
    }
    
    // ✅ GOOD: Non-blocking alternative
    function nonBlockingOperation(duration, callback) {
        const start = Date.now();
        const chunk = 10; // Process in 10ms chunks
        
        function processChunk() {
            const chunkStart = Date.now();
            while (Date.now() - chunkStart < chunk && Date.now() - start < duration) {
                // Do work in small chunks
            }
            
            if (Date.now() - start < duration) {
                setTimeout(processChunk, 0); // Yield control
            } else {
                console.log('Non-blocking operation completed');
                callback();
            }
        }
        
        processChunk();
    }
    
    // Demonstrate non-blocking approach
    console.log('Starting non-blocking operation...');
    nonBlockingOperation(200, () => {
        console.log('Non-blocking operation finished');
    });
    
    // This will execute while the operation is running
    setTimeout(() => {
        console.log('This executes during the operation');
    }, 100);
}

setTimeout(blockingDemo, 600);

// Event Loop Utilities
console.log('\\n=== Event Loop Utilities ===');

// Utility to yield control to event loop
function yieldToEventLoop() {
    return new Promise(resolve => setTimeout(resolve, 0));
}

// Utility to process large arrays without blocking
async function processLargeArray(array, processor, chunkSize = 1000) {
    const result = [];
    
    for (let i = 0; i < array.length; i += chunkSize) {
        const chunk = array.slice(i, i + chunkSize);
        
        // Process chunk
        for (const item of chunk) {
            result.push(processor(item));
        }
        
        // Yield control to event loop
        await yieldToEventLoop();
        console.log(\`Processed \${Math.min(i + chunkSize, array.length)} of \${array.length} items\`);
    }
    
    return result;
}

// Demo large array processing
setTimeout(async () => {
    console.log('\\n--- Large Array Processing ---');
    
    const largeArray = Array.from({ length: 10000 }, (_, i) => i);
    
    const processedArray = await processLargeArray(
        largeArray, 
        x => x * 2, 
        2000
    );
    
    console.log(\`Processed array length: \${processedArray.length}\`);
}, 800);

// Microtask vs Macrotask Priority
console.log('\\n=== Priority Demonstration ===');

function priorityDemo() {
    console.log('\\n--- Priority Demo ---');
    
    // Multiple macrotasks
    setTimeout(() => console.log('Timeout 1'), 0);
    setTimeout(() => console.log('Timeout 2'), 0);
    setTimeout(() => console.log('Timeout 3'), 0);
    
    // Multiple microtasks
    Promise.resolve().then(() => console.log('Promise 1'));
    Promise.resolve().then(() => console.log('Promise 2'));
    Promise.resolve().then(() => console.log('Promise 3'));
    
    // More microtasks
    queueMicrotask(() => console.log('queueMicrotask 1'));
    queueMicrotask(() => console.log('queueMicrotask 2'));
    
    console.log('All tasks queued');
    
    // Expected order:
    // 1. "All tasks queued" (synchronous)
    // 2. All promises and queueMicrotask (microtasks)
    // 3. All timeouts (macrotasks)
}

setTimeout(priorityDemo, 1000);

// Event Loop and DOM Updates
console.log('\\n=== Event Loop and DOM ===');

function domUpdateDemo() {
    console.log('\\n--- DOM Update Demo ---');
    
    // Simulating DOM updates
    console.log('Starting DOM updates...');
    
    // Immediate DOM change
    console.log('1. Immediate DOM change');
    
    // Request animation frame (special microtask for rendering)
    if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(() => {
            console.log('3. requestAnimationFrame executed');
        });
    } else {
        // Fallback for Node.js environment
        setTimeout(() => {
            console.log('3. requestAnimationFrame simulation');
        }, 16); // ~60fps
    }
    
    // Microtask (executes before next render)
    Promise.resolve().then(() => {
        console.log('2. Promise before render');
    });
    
    // Macrotask (executes after render)
    setTimeout(() => {
        console.log('4. setTimeout after render');
    }, 0);
    
    console.log('1.5. DOM update setup complete');
}

setTimeout(domUpdateDemo, 1200);

// Performance Implications
console.log('\\n=== Performance Implications ===');

function performanceDemo() {
    console.log('\\n--- Performance Demo ---');
    
    // Measuring event loop lag
    let lastTime = performance.now();
    
    function measureLag() {
        const currentTime = performance.now();
        const lag = currentTime - lastTime - 16; // Expected 16ms for 60fps
        
        if (lag > 0) {
            console.log(\`Event loop lag: \${lag.toFixed(2)}ms\`);
        }
        
        lastTime = currentTime;
    }
    
    // Set up lag monitoring
    const lagInterval = setInterval(measureLag, 16);
    
    // Create some load
    setTimeout(() => {
        console.log('Creating event loop pressure...');
        
        // Queue many microtasks
        for (let i = 0; i < 1000; i++) {
            Promise.resolve().then(() => {
                // Small computation
                Math.random() * Math.random();
            });
        }
    }, 100);
    
    // Stop monitoring after 2 seconds
    setTimeout(() => {
        clearInterval(lagInterval);
        console.log('Performance monitoring stopped');
    }, 2000);
}

setTimeout(performanceDemo, 1400);

// Best Practices
console.log('\\n=== Best Practices ===');

// 1. Use microtasks for high-priority work
function highPriorityWork(data) {
    return Promise.resolve().then(() => {
        // Critical processing that should happen ASAP
        console.log('High priority work completed for:', data);
        return processedData(data);
    });
}

function processedData(data) {
    return \`processed_\${data}\`;
}

// 2. Break up long-running tasks
async function longRunningTask(iterations) {
    console.log(\`Starting long task with \${iterations} iterations\`);
    
    for (let i = 0; i < iterations; i++) {
        // Do some work
        Math.random() * Math.random();
        
        // Yield every 1000 iterations
        if (i % 1000 === 0 && i > 0) {
            await yieldToEventLoop();
            console.log(\`Completed \${i} iterations\`);
        }
    }
    
    console.log('Long task completed');
}

// 3. Use appropriate timing functions
function scheduleWork() {
    // For immediate execution (next microtask)
    queueMicrotask(() => {
        console.log('Immediate microtask work');
    });
    
    // For next tick (macrotask)
    setTimeout(() => {
        console.log('Next tick work');
    }, 0);
    
    // For animation (before next paint)
    if (typeof requestAnimationFrame !== 'undefined') {
        requestAnimationFrame(() => {
            console.log('Animation frame work');
        });
    }
    
    // For idle time (when browser is idle)
    if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(() => {
            console.log('Idle callback work');
        });
    }
}

setTimeout(() => {
    console.log('\\n--- Best Practices Demo ---');
    highPriorityWork('important_data');
    scheduleWork();
    longRunningTask(5000);
}, 1600);

// Summary
setTimeout(() => {
    console.log('\\n=== Event Loop Summary ===');
    console.log('1. Call stack executes synchronous code');
    console.log('2. Event loop manages async operations');
    console.log('3. Microtasks (Promise.then) have higher priority');
    console.log('4. Macrotasks (setTimeout) execute after microtasks');
    console.log('5. Understanding order prevents bugs');
    console.log('6. Break up long tasks to avoid blocking');
    console.log('7. Use appropriate scheduling mechanisms');
    console.log('\\nEvent Loop examples completed');
}, 3000);`,

  exercises: [
    {
      question: "Predict the execution order of this code and explain why:",
      solution: `console.log('1');
setTimeout(() => console.log('2'), 0);
Promise.resolve().then(() => console.log('3'));
console.log('4');

// Order: 1, 4, 3, 2
// Explanation:
// 1. '1' - synchronous, executes immediately
// 4. '4' - synchronous, executes immediately  
// 3. '3' - microtask (Promise), executes after synchronous code
// 2. '2' - macrotask (setTimeout), executes after all microtasks`,
      explanation: "The event loop prioritizes: 1) synchronous code, 2) microtasks (Promise.then), 3) macrotasks (setTimeout). This order is crucial for understanding async behavior."
    }
  ],

  quiz: [
    {
      question: "What happens if you queue many microtasks that never finish?",
      options: [
        "Macrotasks will still execute",
        "The event loop gets blocked indefinitely", 
        "Browser automatically limits microtasks",
        "Only the first microtask executes"
      ],
      correct: 1,
      explanation: "If microtasks keep generating more microtasks infinitely, the event loop will be blocked and macrotasks (including setTimeout) will never execute."
    }
  ],

  resources: [
    {
      title: "Event Loop Visualizer",
      url: "http://latentflip.com/loupe/"
    },
    {
      title: "MDN - Event Loop",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop"
    }
  ],

  nextModules: ['promises', 'async-await'],
  prerequisites: ['functions', 'callbacks', 'sync-vs-async']
};