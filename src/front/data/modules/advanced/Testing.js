// src/front/data/modules/advanced/Testing.js
export default {
  title: 'JavaScript Testing Fundamentals',
  duration: '45 min',
  difficulty: 'Advanced',
  overview: 'Learn testing methodologies for JavaScript applications. Master unit testing, integration testing, mocking, and test-driven development patterns.',
  
  keyPoints: [
    'Unit tests verify individual functions and components',
    'Integration tests check how parts work together',
    'Mocking isolates code under test',
    'Test-driven development improves code quality',
    'Assertions validate expected behavior',
    'Test coverage measures code testing completeness'
  ],

  example: `// Simple Testing Framework
console.log('=== Simple Test Framework ===');

class SimpleTest {
    constructor() {
        this.tests = [];
        this.passed = 0;
        this.failed = 0;
    }
    
    describe(description, testSuite) {
        console.log(\`\\n📋 \${description}\`);
        testSuite();
    }
    
    it(description, testFunction) {
        try {
            testFunction();
            this.passed++;
            console.log(\`  ✅ \${description}\`);
        } catch (error) {
            this.failed++;
            console.log(\`  ❌ \${description}\`);
            console.log(\`     Error: \${error.message}\`);
        }
    }
    
    expect(actual) {
        return {
            toBe: (expected) => {
                if (actual !== expected) {
                    throw new Error(\`Expected \${expected}, but got \${actual}\`);
                }
            },
            
            toEqual: (expected) => {
                if (JSON.stringify(actual) !== JSON.stringify(expected)) {
                    throw new Error(\`Expected \${JSON.stringify(expected)}, but got \${JSON.stringify(actual)}\`);
                }
            },
            
            toBeTruthy: () => {
                if (!actual) {
                    throw new Error(\`Expected truthy value, but got \${actual}\`);
                }
            },
            
            toBeFalsy: () => {
                if (actual) {
                    throw new Error(\`Expected falsy value, but got \${actual}\`);
                }
            },
            
            toThrow: () => {
                if (typeof actual !== 'function') {
                    throw new Error('Expected a function');
                }
                
                let threw = false;
                try {
                    actual();
                } catch (e) {
                    threw = true;
                }
                
                if (!threw) {
                    throw new Error('Expected function to throw an error');
                }
            },
            
            toContain: (expected) => {
                if (Array.isArray(actual)) {
                    if (!actual.includes(expected)) {
                        throw new Error(\`Expected array to contain \${expected}\`);
                    }
                } else if (typeof actual === 'string') {
                    if (!actual.includes(expected)) {
                        throw new Error(\`Expected string to contain \${expected}\`);
                    }
                } else {
                    throw new Error('toBe contain works with arrays and strings');
                }
            }
        };
    }
    
    summary() {
        console.log(\`\\n📊 Test Summary:\`);
        console.log(\`  Passed: \${this.passed}\`);
        console.log(\`  Failed: \${this.failed}\`);
        console.log(\`  Total: \${this.passed + this.failed}\`);
        
        if (this.failed === 0) {
            console.log(\`  🎉 All tests passed!\`);
        }
    }
}

const test = new SimpleTest();

// Example functions to test
function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        throw new Error('Division by zero');
    }
    return a / b;
}

class Calculator {
    constructor() {
        this.result = 0;
    }
    
    add(value) {
        this.result += value;
        return this;
    }
    
    subtract(value) {
        this.result -= value;
        return this;
    }
    
    getValue() {
        return this.result;
    }
    
    clear() {
        this.result = 0;
        return this;
    }
}

// Unit Tests
test.describe('Basic Math Functions', () => {
    test.it('should add two numbers correctly', () => {
        test.expect(add(2, 3)).toBe(5);
        test.expect(add(-1, 1)).toBe(0);
        test.expect(add(0, 0)).toBe(0);
    });
    
    test.it('should multiply two numbers correctly', () => {
        test.expect(multiply(3, 4)).toBe(12);
        test.expect(multiply(-2, 3)).toBe(-6);
        test.expect(multiply(0, 5)).toBe(0);
    });
    
    test.it('should divide two numbers correctly', () => {
        test.expect(divide(10, 2)).toBe(5);
        test.expect(divide(9, 3)).toBe(3);
    });
    
    test.it('should throw error when dividing by zero', () => {
        test.expect(() => divide(5, 0)).toThrow();
    });
});

test.describe('Calculator Class', () => {
    test.it('should initialize with zero', () => {
        const calc = new Calculator();
        test.expect(calc.getValue()).toBe(0);
    });
    
    test.it('should add values correctly', () => {
        const calc = new Calculator();
        calc.add(5).add(3);
        test.expect(calc.getValue()).toBe(8);
    });
    
    test.it('should subtract values correctly', () => {
        const calc = new Calculator();
        calc.add(10).subtract(3);
        test.expect(calc.getValue()).toBe(7);
    });
    
    test.it('should clear the result', () => {
        const calc = new Calculator();
        calc.add(10).clear();
        test.expect(calc.getValue()).toBe(0);
    });
});

// Mock Functions
console.log('\\n=== Mocking ===');

class MockFunction {
    constructor(returnValue = undefined) {
        this.calls = [];
        this.returnValue = returnValue;
    }
    
    mockImplementation(fn) {
        this.implementation = fn;
        return this;
    }
    
    mockReturnValue(value) {
        this.returnValue = value;
        return this;
    }
    
    mockReturnValueOnce(value) {
        this.returnValueOnce = value;
        return this;
    }
    
    call(...args) {
        this.calls.push({
            args: args,
            timestamp: Date.now()
        });
        
        if (this.returnValueOnce !== undefined) {
            const value = this.returnValueOnce;
            this.returnValueOnce = undefined;
            return value;
        }
        
        if (this.implementation) {
            return this.implementation(...args);
        }
        
        return this.returnValue;
    }
    
    toHaveBeenCalled() {
        return this.calls.length > 0;
    }
    
    toHaveBeenCalledTimes(times) {
        return this.calls.length === times;
    }
    
    toHaveBeenCalledWith(...args) {
        return this.calls.some(call => 
            JSON.stringify(call.args) === JSON.stringify(args)
        );
    }
    
    getCallCount() {
        return this.calls.length;
    }
    
    getCalls() {
        return [...this.calls];
    }
    
    reset() {
        this.calls = [];
        this.returnValue = undefined;
        this.implementation = undefined;
        this.returnValueOnce = undefined;
    }
}

// Example using mocks
class UserService {
    constructor(apiClient) {
        this.apiClient = apiClient;
    }
    
    async getUser(id) {
        const userData = await this.apiClient.get(\`/users/\${id}\`);
        return {
            ...userData,
            fullName: \`\${userData.firstName} \${userData.lastName}\`
        };
    }
    
    async updateUser(id, data) {
        const result = await this.apiClient.put(\`/users/\${id}\`, data);
        return result;
    }
}

// Test with mocks
test.describe('UserService with Mocks', () => {
    test.it('should get user and format full name', async () => {
        // Create mock API client
        const mockApiClient = {
            get: new MockFunction(),
            put: new MockFunction()
        };
        
        // Mock the API response
        mockApiClient.get.mockReturnValue(Promise.resolve({
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com'
        }));
        
        const userService = new UserService(mockApiClient);
        const user = await userService.getUser(1);
        
        test.expect(user.fullName).toBe('John Doe');
        test.expect(mockApiClient.get.toHaveBeenCalledWith('/users/1')).toBeTruthy();
        test.expect(mockApiClient.get.getCallCount()).toBe(1);
    });
});

// Spy Functions
console.log('\\n=== Spying ===');

class SpyFunction {
    constructor(originalFunction) {
        this.originalFunction = originalFunction;
        this.calls = [];
        this.isSpying = true;
    }
    
    call(...args) {
        if (this.isSpying) {
            this.calls.push({
                args: args,
                timestamp: Date.now(),
                result: undefined,
                error: null
            });
        }
        
        try {
            const result = this.originalFunction(...args);
            if (this.isSpying) {
                this.calls[this.calls.length - 1].result = result;
            }
            return result;
        } catch (error) {
            if (this.isSpying) {
                this.calls[this.calls.length - 1].error = error;
            }
            throw error;
        }
    }
    
    restore() {
        this.isSpying = false;
    }
    
    getCallHistory() {
        return [...this.calls];
    }
    
    wasCalledWith(...args) {
        return this.calls.some(call => 
            JSON.stringify(call.args) === JSON.stringify(args)
        );
    }
}

// Example of spying
const originalConsoleLog = console.log;
const consoleLogSpy = new SpyFunction(originalConsoleLog);

// Replace console.log temporarily
console.log = (...args) => consoleLogSpy.call(...args);

// Code that uses console.log
function debugFunction(value) {
    console.log('Debug:', value);
    return value * 2;
}

debugFunction(5);
debugFunction(10);

// Check spy results
console.log = originalConsoleLog; // Restore original
console.log('Console.log was called', consoleLogSpy.calls.length, 'times');
console.log('Spy history:', consoleLogSpy.getCallHistory());

// Test Coverage Analysis
console.log('\\n=== Test Coverage ===');

class CodeCoverage {
    constructor() {
        this.executedLines = new Set();
        this.totalLines = 0;
    }
    
    markLineExecuted(lineNumber) {
        this.executedLines.add(lineNumber);
    }
    
    setTotalLines(count) {
        this.totalLines = count;
    }
    
    getCoveragePercentage() {
        if (this.totalLines === 0) return 0;
        return (this.executedLines.size / this.totalLines) * 100;
    }
    
    getUncoveredLines() {
        const uncovered = [];
        for (let i = 1; i <= this.totalLines; i++) {
            if (!this.executedLines.has(i)) {
                uncovered.push(i);
            }
        }
        return uncovered;
    }
    
    report() {
        const coverage = this.getCoveragePercentage();
        const uncovered = this.getUncoveredLines();
        
        console.log(\`Coverage: \${coverage.toFixed(1)}% (\${this.executedLines.size}/\${this.totalLines} lines)\`);
        
        if (uncovered.length > 0) {
            console.log('Uncovered lines:', uncovered.join(', '));
        }
        
        if (coverage >= 90) {
            console.log('✅ Excellent coverage!');
        } else if (coverage >= 80) {
            console.log('⚠️  Good coverage, consider adding more tests');
        } else {
            console.log('❌ Low coverage, more tests needed');
        }
    }
}

// Simulate coverage tracking
const coverage = new CodeCoverage();
coverage.setTotalLines(20);

// Simulate executing lines during tests
[1, 2, 3, 5, 6, 8, 9, 10, 12, 13, 15, 16, 18, 19].forEach(line => {
    coverage.markLineExecuted(line);
});

coverage.report();

// Integration Testing
console.log('\\n=== Integration Testing ===');

class DatabaseMock {
    constructor() {
        this.data = new Map();
        this.nextId = 1;
    }
    
    async save(entity) {
        const id = this.nextId++;
        const record = { id, ...entity, createdAt: new Date() };
        this.data.set(id, record);
        return record;
    }
    
    async findById(id) {
        return this.data.get(id) || null;
    }
    
    async findAll() {
        return Array.from(this.data.values());
    }
    
    async delete(id) {
        return this.data.delete(id);
    }
}

class UserRepository {
    constructor(database) {
        this.db = database;
    }
    
    async createUser(userData) {
        if (!userData.email || !userData.name) {
            throw new Error('Email and name are required');
        }
        
        return await this.db.save({
            ...userData,
            status: 'active'
        });
    }
    
    async getUser(id) {
        const user = await this.db.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    }
}

class UserController {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    
    async handleCreateUser(request) {
        try {
            const user = await this.userRepository.createUser(request.body);
            return {
                status: 201,
                body: { success: true, user }
            };
        } catch (error) {
            return {
                status: 400,
                body: { success: false, error: error.message }
            };
        }
    }
    
    async handleGetUser(request) {
        try {
            const user = await this.userRepository.getUser(request.params.id);
            return {
                status: 200,
                body: { success: true, user }
            };
        } catch (error) {
            return {
                status: 404,
                body: { success: false, error: error.message }
            };
        }
    }
}

// Integration tests
test.describe('User Management Integration', () => {
    test.it('should create and retrieve a user', async () => {
        const db = new DatabaseMock();
        const userRepo = new UserRepository(db);
        const userController = new UserController(userRepo);
        
        // Create user
        const createRequest = {
            body: { name: 'Alice', email: 'alice@example.com' }
        };
        
        const createResponse = await userController.handleCreateUser(createRequest);
        test.expect(createResponse.status).toBe(201);
        test.expect(createResponse.body.success).toBeTruthy();
        
        const userId = createResponse.body.user.id;
        
        // Retrieve user
        const getRequest = { params: { id: userId } };
        const getResponse = await userController.handleGetUser(getRequest);
        
        test.expect(getResponse.status).toBe(200);
        test.expect(getResponse.body.user.name).toBe('Alice');
        test.expect(getResponse.body.user.email).toBe('alice@example.com');
        test.expect(getResponse.body.user.status).toBe('active');
    });
    
    test.it('should handle user creation validation', async () => {
        const db = new DatabaseMock();
        const userRepo = new UserRepository(db);
        const userController = new UserController(userRepo);
        
        const invalidRequest = {
            body: { name: 'Bob' } // Missing email
        };
        
        const response = await userController.handleCreateUser(invalidRequest);
        test.expect(response.status).toBe(400);
        test.expect(response.body.success).toBeFalsy();
        test.expect(response.body.error).toContain('Email and name are required');
    });
});

// Performance Testing
console.log('\\n=== Performance Testing ===');

class PerformanceTest {
    static async measureExecutionTime(fn, iterations = 1000) {
        const startTime = performance.now();
        
        for (let i = 0; i < iterations; i++) {
            await fn();
        }
        
        const endTime = performance.now();
        const totalTime = endTime - startTime;
        const avgTime = totalTime / iterations;
        
        return {
            totalTime: totalTime.toFixed(2),
            averageTime: avgTime.toFixed(4),
            iterations
        };
    }
    
    static async loadTest(fn, concurrent = 10, duration = 1000) {
        const results = [];
        const startTime = Date.now();
        
        const workers = Array.from({ length: concurrent }, async () => {
            let count = 0;
            
            while (Date.now() - startTime < duration) {
                await fn();
                count++;
            }
            
            return count;
        });
        
        const counts = await Promise.all(workers);
        const totalOperations = counts.reduce((sum, count) => sum + count, 0);
        
        return {
            totalOperations,
            operationsPerSecond: (totalOperations / (duration / 1000)).toFixed(2),
            concurrency: concurrent,
            duration
        };
    }
}

// Example performance tests
async function fastFunction() {
    return 42;
}

async function slowFunction() {
    // Simulate slow operation
    await new Promise(resolve => setTimeout(resolve, 1));
    return 'slow result';
}

async function runPerformanceTests() {
    console.log('Running performance tests...');
    
    const fastResults = await PerformanceTest.measureExecutionTime(fastFunction, 10000);
    console.log('Fast function performance:', fastResults);
    
    const slowResults = await PerformanceTest.measureExecutionTime(slowFunction, 100);
    console.log('Slow function performance:', slowResults);
    
    const loadResults = await PerformanceTest.loadTest(fastFunction, 5, 2000);
    console.log('Load test results:', loadResults);
}

runPerformanceTests();

// Test summary
test.summary();

console.log('\\nTesting examples completed');`,

  exercises: [
    {
      question: "Write a test suite for a simple todo list class with add, remove, and complete functionality:",
      solution: `class TodoList {
  constructor() {
    this.todos = [];
    this.nextId = 1;
  }
  
  add(text) {
    const todo = {
      id: this.nextId++,
      text,
      completed: false,
      createdAt: new Date()
    };
    this.todos.push(todo);
    return todo;
  }
  
  remove(id) {
    const index = this.todos.findIndex(todo => todo.id === id);
    if (index > -1) {
      return this.todos.splice(index, 1)[0];
    }
    return null;
  }
  
  complete(id) {
    const todo = this.todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = true;
      return todo;
    }
    return null;
  }
  
  getAll() {
    return [...this.todos];
  }
}

// Test suite
test.describe('TodoList', () => {
  test.it('should add todos correctly', () => {
    const todoList = new TodoList();
    const todo = todoList.add('Buy milk');
    
    test.expect(todo.text).toBe('Buy milk');
    test.expect(todo.completed).toBeFalsy();
    test.expect(todoList.getAll()).toContain(todo);
  });
  
  test.it('should remove todos correctly', () => {
    const todoList = new TodoList();
    const todo = todoList.add('Buy milk');
    const removed = todoList.remove(todo.id);
    
    test.expect(removed).toEqual(todo);
    test.expect(todoList.getAll().length).toBe(0);
  });
  
  test.it('should mark todos as complete', () => {
    const todoList = new TodoList();
    const todo = todoList.add('Buy milk');
    const completed = todoList.complete(todo.id);
    
    test.expect(completed.completed).toBeTruthy();
  });
});`,
      explanation: "Test suites should cover all public methods and edge cases of a class or module."
    }
  ],

  quiz: [
    {
      question: "What is the main purpose of mocking in unit tests?",
      options: [
        "To make tests run faster",
        "To isolate the code under test from dependencies",
        "To test user interfaces",
        "To measure code coverage"
      ],
      correct: 1,
      explanation: "Mocking isolates the code under test by replacing dependencies with controlled, predictable implementations."
    }
  ],

  resources: [
    {
      title: "Jest Testing Framework",
      url: "https://jestjs.io/docs/getting-started"
    }
  ],

  nextModules: ['debugging', 'best-practices'],
  prerequisites: ['functions-basics', 'classes', 'promises']
};