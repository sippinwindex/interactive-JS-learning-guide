export default {
  title: 'Timers and Intervals',
  duration: '30 min',
  difficulty: 'Intermediate',
  overview: 'Master JavaScript timing functions including setTimeout, setInterval, and requestAnimationFrame. Learn to create animations, handle delays, and manage timing in web applications.',
  
  keyPoints: [
    'setTimeout executes code after a delay',
    'setInterval repeats code at regular intervals',
    'clearTimeout and clearInterval stop timers',
    'requestAnimationFrame optimizes animations',
    'Timers are non-blocking and asynchronous',
    'Memory management is crucial with timers'
  ],

  example: `// Basic Timers
console.log('=== Basic Timers ===');

// setTimeout - Execute once after delay
console.log('Setting timeout for 2 seconds...');
const timeout1 = setTimeout(() => {
    console.log('Timeout executed after 2 seconds');
}, 2000);

// setTimeout with parameters
const greetUser = (name, age) => {
    console.log('Hello ' + name + ', you are ' + age + ' years old');
};

const timeout2 = setTimeout(greetUser, 1500, 'Alice', 25);

// setInterval - Execute repeatedly
console.log('Starting interval every 1 second...');
let counter = 0;
const interval1 = setInterval(() => {
    counter++;
    console.log('Interval tick: ' + counter);
    
    // Stop after 5 iterations
    if (counter >= 5) {
        clearInterval(interval1);
        console.log('Interval stopped');
    }
}, 1000);

// Timer Management Class
class TimerManager {
    constructor() {
        this.timers = new Map();
        this.nextId = 1;
    }
    
    setTimeout(callback, delay, ...args) {
        const id = this.nextId++;
        const timerId = setTimeout(() => {
            callback(...args);
            this.timers.delete(id);
        }, delay);
        
        this.timers.set(id, {
            type: 'timeout',
            timerId,
            callback,
            delay,
            args,
            created: Date.now()
        });
        
        console.log('Timer ' + id + ' created (timeout: ' + delay + 'ms)');
        return id;
    }
    
    setInterval(callback, interval, ...args) {
        const id = this.nextId++;
        const timerId = setInterval(() => {
            callback(...args);
        }, interval);
        
        this.timers.set(id, {
            type: 'interval',
            timerId,
            callback,
            interval,
            args,
            created: Date.now()
        });
        
        console.log('Timer ' + id + ' created (interval: ' + interval + 'ms)');
        return id;
    }
    
    clearTimer(id) {
        const timer = this.timers.get(id);
        if (!timer) {
            console.log('Timer ' + id + ' not found');
            return false;
        }
        
        if (timer.type === 'timeout') {
            clearTimeout(timer.timerId);
        } else if (timer.type === 'interval') {
            clearInterval(timer.timerId);
        }
        
        this.timers.delete(id);
        console.log('Timer ' + id + ' cleared');
        return true;
    }
    
    clearAllTimers() {
        for (const [id, timer] of this.timers) {
            if (timer.type === 'timeout') {
                clearTimeout(timer.timerId);
            } else if (timer.type === 'interval') {
                clearInterval(timer.timerId);
            }
        }
        
        const count = this.timers.size;
        this.timers.clear();
        console.log('Cleared ' + count + ' timers');
    }
    
    getActiveTimers() {
        return Array.from(this.timers.entries()).map(([id, timer]) => ({
            id,
            type: timer.type,
            delay: timer.delay || timer.interval,
            age: Date.now() - timer.created
        }));
    }
    
    getTimerCount() {
        return this.timers.size;
    }
}

// Example usage
const timerManager = new TimerManager();

const timer1 = timerManager.setTimeout(() => {
    console.log('Managed timeout executed');
}, 3000);

const timer2 = timerManager.setInterval(() => {
    console.log('Managed interval tick');
}, 2000);

// Check active timers
setTimeout(() => {
    console.log('Active timers:', timerManager.getActiveTimers());
    timerManager.clearTimer(timer2);
}, 5000);

// Debouncing with Timers
console.log('\\n=== Debouncing ===');

class Debouncer {
    constructor(delay = 300) {
        this.delay = delay;
        this.timeouts = new Map();
    }
    
    debounce(key, callback, customDelay = null) {
        const delay = customDelay || this.delay;
        
        // Clear existing timeout for this key
        if (this.timeouts.has(key)) {
            clearTimeout(this.timeouts.get(key));
        }
        
        // Set new timeout
        const timeoutId = setTimeout(() => {
            callback();
            this.timeouts.delete(key);
        }, delay);
        
        this.timeouts.set(key, timeoutId);
    }
    
    cancel(key) {
        if (this.timeouts.has(key)) {
            clearTimeout(this.timeouts.get(key));
            this.timeouts.delete(key);
            return true;
        }
        return false;
    }
    
    cancelAll() {
        for (const timeoutId of this.timeouts.values()) {
            clearTimeout(timeoutId);
        }
        this.timeouts.clear();
    }
}

// Simulate search input debouncing
const debouncer = new Debouncer(500);

function simulateSearch(query) {
    console.log('Searching for: ' + query);
}

function simulateUserTyping() {
    const queries = ['j', 'ja', 'jav', 'java', 'javas', 'javascript'];
    
    queries.forEach((query, index) => {
        setTimeout(() => {
            console.log('User typed: ' + query);
            debouncer.debounce('search', () => simulateSearch(query));
        }, index * 200);
    });
}

simulateUserTyping();

// Throttling with Timers
console.log('\\n=== Throttling ===');

class Throttler {
    constructor(limit = 100) {
        this.limit = limit;
        this.inThrottle = false;
    }
    
    throttle(callback) {
        if (!this.inThrottle) {
            callback();
            this.inThrottle = true;
            
            setTimeout(() => {
                this.inThrottle = false;
            }, this.limit);
        }
    }
}

// Simulate scroll throttling
const scrollThrottler = new Throttler(100);

function handleScroll() {
    console.log('Scroll event handled at', Date.now());
}

// Simulate rapid scroll events
for (let i = 0; i < 10; i++) {
    setTimeout(() => {
        scrollThrottler.throttle(handleScroll);
    }, i * 20);
}

// Animation with requestAnimationFrame
console.log('\\n=== Animation with requestAnimationFrame ===');

class Animator {
    constructor() {
        this.animations = new Map();
        this.nextId = 1;
    }
    
    animate(callback, duration = null) {
        const id = this.nextId++;
        const startTime = performance.now();
        
        const animation = {
            id,
            callback,
            duration,
            startTime,
            frameId: null
        };
        
        const frame = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = duration ? Math.min(elapsed / duration, 1) : elapsed;
            
            const shouldContinue = callback(progress, elapsed);
            
            if (shouldContinue !== false && (duration === null || progress < 1)) {
                animation.frameId = requestAnimationFrame(frame);
            } else {
                this.animations.delete(id);
                console.log('Animation ' + id + ' completed');
            }
        };
        
        animation.frameId = requestAnimationFrame(frame);
        this.animations.set(id, animation);
        
        console.log('Animation ' + id + ' started');
        return id;
    }
    
    stopAnimation(id) {
        const animation = this.animations.get(id);
        if (animation) {
            cancelAnimationFrame(animation.frameId);
            this.animations.delete(id);
            console.log('Animation ' + id + ' stopped');
            return true;
        }
        return false;
    }
    
    stopAllAnimations() {
        for (const [id, animation] of this.animations) {
            cancelAnimationFrame(animation.frameId);
        }
        const count = this.animations.size;
        this.animations.clear();
        console.log('Stopped ' + count + ' animations');
    }
    
    getActiveAnimations() {
        return Array.from(this.animations.keys());
    }
}

const animator = new Animator();

// Simple progress animation
const progressAnimation = animator.animate((progress, elapsed) => {
    console.log('Progress: ' + (progress * 100).toFixed(1) + '%');
    return progress < 1;
}, 2000);

// Bounce animation
const bounceAnimation = animator.animate((progress, elapsed) => {
    const bounceHeight = Math.abs(Math.sin(elapsed * 0.01)) * 100;
    console.log('Bounce height: ' + bounceHeight.toFixed(1));
    
    // Stop after 3 seconds
    return elapsed < 3000;
});

// Countdown Timer
console.log('\\n=== Countdown Timer ===');

class CountdownTimer {
    constructor(duration, onTick, onComplete) {
        this.duration = duration;
        this.remaining = duration;
        this.onTick = onTick;
        this.onComplete = onComplete;
        this.intervalId = null;
        this.isRunning = false;
        this.isPaused = false;
    }
    
    start() {
        if (this.isRunning) return;
        
        this.isRunning = true;
        this.isPaused = false;
        
        this.intervalId = setInterval(() => {
            if (!this.isPaused) {
                this.remaining -= 1000;
                
                if (this.onTick) {
                    this.onTick(this.remaining);
                }
                
                if (this.remaining <= 0) {
                    this.stop();
                    if (this.onComplete) {
                        this.onComplete();
                    }
                }
            }
        }, 1000);
        
        console.log('Countdown started');
    }
    
    pause() {
        this.isPaused = true;
        console.log('Countdown paused');
    }
    
    resume() {
        this.isPaused = false;
        console.log('Countdown resumed');
    }
    
    stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.isRunning = false;
        this.isPaused = false;
        console.log('Countdown stopped');
    }
    
    reset() {
        this.stop();
        this.remaining = this.duration;
        console.log('Countdown reset');
    }
    
    getTimeLeft() {
        return this.remaining;
    }
    
    getFormattedTime() {
        const minutes = Math.floor(this.remaining / 60000);
        const seconds = Math.floor((this.remaining % 60000) / 1000);
        return minutes + ':' + seconds.toString().padStart(2, '0');
    }
}

// Example countdown
const countdown = new CountdownTimer(
    10000, // 10 seconds
    (remaining) => {
        console.log('Time left: ' + Math.ceil(remaining / 1000) + 's');
    },
    () => {
        console.log('Countdown finished!');
    }
);

countdown.start();

// Delay with Promises
console.log('\\n=== Promise-based Delays ===');

class DelayUtils {
    static delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    static async sequence(delays, callback) {
        for (let i = 0; i < delays.length; i++) {
            await this.delay(delays[i]);
            if (callback) {
                callback(i + 1, delays[i]);
            }
        }
    }
    
    static async retry(asyncFunction, maxAttempts = 3, delayMs = 1000) {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) {
            try {
                return await asyncFunction();
            } catch (error) {
                console.log('Attempt ' + attempt + ' failed:', error.message);
                
                if (attempt === maxAttempts) {
                    throw error;
                }
                
                await this.delay(delayMs * attempt); // Exponential backoff
            }
        }
    }
    
    static timeout(promise, timeoutMs) {
        return Promise.race([
            promise,
            new Promise((_, reject) => 
                setTimeout(() => reject(new Error('Operation timed out')), timeoutMs)
            )
        ]);
    }
}

// Example usage
async function demonstrateDelays() {
    console.log('Starting delay sequence...');
    
    await DelayUtils.sequence([1000, 500, 2000], (step, delay) => {
        console.log('Step ' + step + ' completed after ' + delay + 'ms');
    });
    
    console.log('Sequence completed');
    
    // Retry example
    let attempts = 0;
    const unreliableFunction = async () => {
        attempts++;
        if (attempts < 3) {
            throw new Error('Simulated failure');
        }
        return 'Success on attempt ' + attempts;
    };
    
    try {
        const result = await DelayUtils.retry(unreliableFunction);
        console.log('Retry result:', result);
    } catch (error) {
        console.log('All retry attempts failed');
    }
}

demonstrateDelays();

// Performance Timing
console.log('\\n=== Performance Timing ===');

class PerformanceTimer {
    constructor() {
        this.marks = new Map();
        this.measures = new Map();
    }
    
    mark(name) {
        this.marks.set(name, performance.now());
        console.log('Mark set: ' + name);
    }
    
    measure(name, startMark, endMark = null) {
        const startTime = this.marks.get(startMark);
        const endTime = endMark ? this.marks.get(endMark) : performance.now();
        
        if (startTime === undefined) {
            throw new Error('Start mark not found: ' + startMark);
        }
        
        if (endMark && endTime === undefined) {
            throw new Error('End mark not found: ' + endMark);
        }
        
        const duration = endTime - startTime;
        this.measures.set(name, duration);
        
        console.log('Measure ' + name + ': ' + duration.toFixed(2) + 'ms');
        return duration;
    }
    
    getMeasure(name) {
        return this.measures.get(name);
    }
    
    getAllMeasures() {
        return Object.fromEntries(this.measures);
    }
    
    clear() {
        this.marks.clear();
        this.measures.clear();
    }
}

// Performance timing example
const perfTimer = new PerformanceTimer();

perfTimer.mark('start');

setTimeout(() => {
    perfTimer.mark('middle');
}, 100);

setTimeout(() => {
    perfTimer.mark('end');
    perfTimer.measure('first-half', 'start', 'middle');
    perfTimer.measure('second-half', 'middle', 'end');
    perfTimer.measure('total', 'start', 'end');
    
    console.log('All measures:', perfTimer.getAllMeasures());
}, 300);

// Cleanup demonstration
console.log('\\n=== Cleanup Demonstration ===');

// Memory leak prevention
class TimerLeakDemo {
    constructor() {
        this.timers = [];
    }
    
    startLeakyTimers() {
        // This would cause memory leaks if not cleaned up
        for (let i = 0; i < 5; i++) {
            const timerId = setInterval(() => {
                console.log('Leaky timer ' + i + ' tick');
            }, 1000);
            
            this.timers.push(timerId);
        }
        
        console.log('Started 5 timers that could leak memory');
    }
    
    cleanup() {
        this.timers.forEach(timerId => clearInterval(timerId));
        this.timers = [];
        console.log('All timers cleaned up - no memory leaks!');
    }
}

const leakDemo = new TimerLeakDemo();
leakDemo.startLeakyTimers();

// Clean up after 3 seconds
setTimeout(() => {
    leakDemo.cleanup();
}, 3000);

// Real-world example: Auto-save functionality
console.log('\\n=== Auto-save Example ===');

class AutoSaver {
    constructor(saveFunction, delay = 2000) {
        this.saveFunction = saveFunction;
        this.delay = delay;
        this.timeoutId = null;
        this.isDirty = false;
        this.isSaving = false;
    }
    
    markDirty() {
        this.isDirty = true;
        this.scheduleAutoSave();
    }
    
    scheduleAutoSave() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
        
        this.timeoutId = setTimeout(() => {
            this.performSave();
        }, this.delay);
    }
    
    async performSave() {
        if (!this.isDirty || this.isSaving) return;
        
        this.isSaving = true;
        console.log('Auto-saving...');
        
        try {
            await this.saveFunction();
            this.isDirty = false;
            console.log('Auto-save completed');
        } catch (error) {
            console.error('Auto-save failed:', error);
        } finally {
            this.isSaving = false;
        }
    }
    
    forceSave() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        return this.performSave();
    }
    
    destroy() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    }
}

// Mock save function
const mockSave = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log('Data saved to server');
            resolve();
        }, 500);
    });
};

const autoSaver = new AutoSaver(mockSave, 1500);

// Simulate user typing
console.log('Simulating user input...');
autoSaver.markDirty();

setTimeout(() => {
    autoSaver.markDirty();
}, 500);

setTimeout(() => {
    autoSaver.markDirty();
}, 800);

console.log('Timers and intervals examples completed');`,

  exercises: [
    {
      question: "Create a typing speed test that measures words per minute:",
      solution: `class TypingSpeedTest {
  constructor(textElement, inputElement, resultsElement) {
    this.textElement = textElement;
    this.inputElement = inputElement;
    this.resultsElement = resultsElement;
    this.startTime = null;
    this.endTime = null;
    this.timerInterval = null;
    this.testText = "The quick brown fox jumps over the lazy dog";
    
    this.init();
  }
  
  init() {
    this.textElement.textContent = this.testText;
    this.inputElement.addEventListener('input', (e) => this.handleInput(e));
    this.inputElement.addEventListener('keydown', (e) => this.handleKeydown(e));
  }
  
  handleKeydown(e) {
    if (!this.startTime && e.key !== 'Tab' && e.key !== 'Shift') {
      this.startTest();
    }
  }
  
  startTest() {
    this.startTime = Date.now();
    this.startTimer();
  }
  
  startTimer() {
    this.timerInterval = setInterval(() => {
      this.updateResults();
    }, 100);
  }
  
  handleInput(e) {
    const inputText = e.target.value;
    
    if (inputText === this.testText) {
      this.endTest();
    } else {
      this.updateResults();
    }
  }
  
  endTest() {
    this.endTime = Date.now();
    clearInterval(this.timerInterval);
    this.calculateFinalResults();
  }
  
  updateResults() {
    if (!this.startTime) return;
    
    const currentTime = this.endTime || Date.now();
    const elapsedMinutes = (currentTime - this.startTime) / 60000;
    const typedText = this.inputElement.value;
    const wordsTyped = typedText.trim().split(/\\s+/).length;
    const wpm = Math.round(wordsTyped / elapsedMinutes) || 0;
    
    this.resultsElement.textContent = \`WPM: \${wpm}\`;
  }
  
  calculateFinalResults() {
    const elapsedMinutes = (this.endTime - this.startTime) / 60000;
    const totalWords = this.testText.split(' ').length;
    const wpm = Math.round(totalWords / elapsedMinutes);
    
    this.resultsElement.textContent = \`Test Complete! Final WPM: \${wpm}\`;
  }
  
  reset() {
    this.startTime = null;
    this.endTime = null;
    this.inputElement.value = '';
    this.resultsElement.textContent = 'Start typing to begin...';
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }
}`,
      explanation: "A typing speed test using timers to track elapsed time and calculate words per minute in real-time."
    }
  ],

  quiz: [
    {
      question: "What is the difference between setTimeout and setInterval?",
      options: [
        "setTimeout runs faster than setInterval",
        "setTimeout executes once, setInterval repeats",
        "setInterval is more accurate than setTimeout",
        "There is no difference"
      ],
      correct: 1,
      explanation: "setTimeout executes a function once after a specified delay, while setInterval repeatedly executes a function at regular intervals."
    }
  ],

  resources: [
    {
      title: "MDN - Timers",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/setTimeout"
    },
    {
      title: "MDN - requestAnimationFrame",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame"
    }
  ],

  nextModules: ['web-apis', 'events'],
  prerequisites: ['functions-basics', 'dom-basics', 'promises']
};