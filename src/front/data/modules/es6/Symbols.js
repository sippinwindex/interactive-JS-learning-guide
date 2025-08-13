// src/front/data/modules/es6/Symbols.js
export default {
  title: 'Symbols',
  duration: '30 min',
  difficulty: 'Intermediate',
  overview: 'Understand ES6 Symbols - unique identifiers for object properties. Learn how to create private properties, implement well-known symbols, and avoid property collisions.',
  
  keyPoints: [
    'Symbols are unique primitive values',
    'Used for creating private object properties',
    'Well-known symbols customize object behavior',
    'Symbol.for() creates global symbol registry',
    'Symbols are not enumerable in for...in loops',
    'Useful for metadata and protocol implementation'
  ],

  example: `// Basic Symbol Creation
console.log('=== Basic Symbol Creation ===');

// Creating symbols
const symbol1 = Symbol();
const symbol2 = Symbol();
const symbol3 = Symbol('description');
const symbol4 = Symbol('description');

console.log('symbol1:', symbol1);
console.log('symbol2:', symbol2);
console.log('symbol3:', symbol3);
console.log('symbol4:', symbol4);

// Symbols are always unique
console.log('symbol1 === symbol2:', symbol1 === symbol2); // false
console.log('symbol3 === symbol4:', symbol3 === symbol4); // false (even with same description)

// Symbol description
console.log('symbol3.description:', symbol3.description);
console.log('symbol3.toString():', symbol3.toString());

// Symbols as Object Properties
console.log('\\n=== Symbols as Object Properties ===');

const user = {
    name: 'Alice',
    age: 30
};

// Add symbol properties
const idSymbol = Symbol('id');
const secretSymbol = Symbol('secret');

user[idSymbol] = 'user_123';
user[secretSymbol] = 'top_secret_data';

console.log('User object:', user);
console.log('User ID (symbol):', user[idSymbol]);
console.log('User secret (symbol):', user[secretSymbol]);

// Symbol properties are not enumerable
console.log('\\nObject.keys(user):', Object.keys(user));
console.log('for...in loop:');
for (const key in user) {
    console.log('  ', key, ':', user[key]);
}

// But they are accessible via Object.getOwnPropertySymbols()
console.log('\\nSymbol properties:');
const symbolProps = Object.getOwnPropertySymbols(user);
symbolProps.forEach(sym => {
    console.log('  Symbol:', sym.description, 'Value:', user[sym]);
});

// Private Properties with Symbols
console.log('\\n=== Private Properties ===');

const PRIVATE_BALANCE = Symbol('balance');
const PRIVATE_ACCOUNT_NUMBER = Symbol('accountNumber');

class BankAccount {
    constructor(initialBalance, accountNumber) {
        this.ownerName = '';
        this[PRIVATE_BALANCE] = initialBalance;
        this[PRIVATE_ACCOUNT_NUMBER] = accountNumber;
    }
    
    deposit(amount) {
        if (amount > 0) {
            this[PRIVATE_BALANCE] += amount;
            console.log(\`Deposited \${amount}. New balance: \${this[PRIVATE_BALANCE]}\`);
        }
    }
    
    withdraw(amount) {
        if (amount > 0 && amount <= this[PRIVATE_BALANCE]) {
            this[PRIVATE_BALANCE] -= amount;
            console.log(\`Withdrew \${amount}. New balance: \${this[PRIVATE_BALANCE]}\`);
        } else {
            console.log('Invalid withdrawal amount');
        }
    }
    
    getBalance() {
        return this[PRIVATE_BALANCE];
    }
    
    getAccountNumber() {
        return this[PRIVATE_ACCOUNT_NUMBER];
    }
}

const account = new BankAccount(1000, 'ACC123');
account.ownerName = 'John Doe';

account.deposit(500);
account.withdraw(200);

console.log('Public properties:');
console.log('Owner name:', account.ownerName);
console.log('Balance (via method):', account.getBalance());

console.log('\\nTrying to access private properties directly:');
console.log('account.balance:', account.balance); // undefined
console.log('account.accountNumber:', account.accountNumber); // undefined

// Private properties are hidden from normal enumeration
console.log('\\nEnumerable properties:', Object.keys(account));

// Global Symbol Registry
console.log('\\n=== Global Symbol Registry ===');

// Symbol.for() creates or retrieves from global registry
const globalSymbol1 = Symbol.for('app.version');
const globalSymbol2 = Symbol.for('app.version');

console.log('globalSymbol1 === globalSymbol2:', globalSymbol1 === globalSymbol2); // true

// Symbol.keyFor() returns the key for a global symbol
console.log('Key for globalSymbol1:', Symbol.keyFor(globalSymbol1)); // 'app.version'

// Local symbols don't have keys in global registry
const localSymbol = Symbol('local');
console.log('Key for localSymbol:', Symbol.keyFor(localSymbol)); // undefined

// Using global symbols for cross-module communication
const APP_CONFIG = Symbol.for('app.config');
const APP_LOGGER = Symbol.for('app.logger');

// Module 1 could set
globalThis[APP_CONFIG] = { theme: 'dark', debug: true };
globalThis[APP_LOGGER] = console;

// Module 2 could access
console.log('Shared config:', globalThis[APP_CONFIG]);

// Well-known Symbols
console.log('\\n=== Well-known Symbols ===');

// Symbol.iterator - makes objects iterable
class NumberRange {
    constructor(start, end) {
        this.start = start;
        this.end = end;
    }
    
    [Symbol.iterator]() {
        let current = this.start;
        const end = this.end;
        
        return {
            next() {
                if (current <= end) {
                    return { value: current++, done: false };
                } else {
                    return { done: true };
                }
            }
        };
    }
}

const range = new NumberRange(1, 5);
console.log('Iterating over custom range:');
for (const num of range) {
    console.log('  ', num);
}

// Convert to array using spread operator
console.log('Range as array:', [...range]);

// Symbol.toStringTag - customizes Object.prototype.toString()
class CustomClass {
    constructor(name) {
        this.name = name;
    }
    
    get [Symbol.toStringTag]() {
        return 'CustomClass';
    }
}

const customObj = new CustomClass('test');
console.log('\\nCustom toString tag:');
console.log('Object.prototype.toString.call(customObj):', Object.prototype.toString.call(customObj));

// Symbol.hasInstance - customizes instanceof behavior
class MyArray {
    static [Symbol.hasInstance](instance) {
        return Array.isArray(instance);
    }
}

console.log('\\nCustom instanceof:');
console.log('[1, 2, 3] instanceof MyArray:', [1, 2, 3] instanceof MyArray); // true
console.log('"string" instanceof MyArray:', "string" instanceof MyArray); // false

// Symbol.toPrimitive - customizes type conversion
class Temperature {
    constructor(celsius) {
        this.celsius = celsius;
    }
    
    [Symbol.toPrimitive](hint) {
        console.log(\`Converting to primitive with hint: \${hint}\`);
        
        switch (hint) {
            case 'number':
                return this.celsius;
            case 'string':
                return \`\${this.celsius}°C\`;
            default:
                return this.celsius;
        }
    }
}

const temp = new Temperature(25);
console.log('\\nCustom primitive conversion:');
console.log('Number conversion:', +temp);        // number hint
console.log('String conversion:', \`\${temp}\`);    // string hint
console.log('Default conversion:', temp + 0);    // default hint

// Symbol.species - customizes derived object creation
class MyArrayExtended extends Array {
    static get [Symbol.species]() {
        return Array; // Return base Array instead of MyArrayExtended
    }
    
    customMethod() {
        return 'custom method';
    }
}

const extendedArray = new MyArrayExtended(1, 2, 3, 4);
console.log('\\nSymbol.species example:');
console.log('Original array type:', extendedArray.constructor.name);

const filtered = extendedArray.filter(x => x > 2);
console.log('Filtered array type:', filtered.constructor.name); // Array, not MyArrayExtended
console.log('Has custom method:', 'customMethod' in filtered); // false

// Practical Symbol Use Cases
console.log('\\n=== Practical Use Cases ===');

// 1. Event System with Symbol Events
const EVENT_SYMBOLS = {
    USER_LOGIN: Symbol('user.login'),
    USER_LOGOUT: Symbol('user.logout'),
    DATA_UPDATED: Symbol('data.updated')
};

class EventManager {
    constructor() {
        this.listeners = new Map();
    }
    
    on(eventSymbol, callback) {
        if (!this.listeners.has(eventSymbol)) {
            this.listeners.set(eventSymbol, []);
        }
        this.listeners.get(eventSymbol).push(callback);
    }
    
    emit(eventSymbol, data) {
        const callbacks = this.listeners.get(eventSymbol);
        if (callbacks) {
            callbacks.forEach(callback => callback(data));
        }
    }
    
    off(eventSymbol, callback) {
        const callbacks = this.listeners.get(eventSymbol);
        if (callbacks) {
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }
}

const eventManager = new EventManager();

eventManager.on(EVENT_SYMBOLS.USER_LOGIN, (user) => {
    console.log('User logged in:', user.name);
});

eventManager.on(EVENT_SYMBOLS.USER_LOGOUT, (user) => {
    console.log('User logged out:', user.name);
});

eventManager.emit(EVENT_SYMBOLS.USER_LOGIN, { name: 'Alice' });
eventManager.emit(EVENT_SYMBOLS.USER_LOGOUT, { name: 'Alice' });

// 2. Metadata and Mixins
const MIXIN_SYMBOLS = {
    TIMESTAMP: Symbol('mixin.timestamp'),
    VALIDATOR: Symbol('mixin.validator'),
    SERIALIZER: Symbol('mixin.serializer')
};

function addTimestamp(obj) {
    obj[MIXIN_SYMBOLS.TIMESTAMP] = {
        created: Date.now(),
        updated: Date.now()
    };
    
    const originalUpdate = obj.update || function() {};
    obj.update = function(...args) {
        this[MIXIN_SYMBOLS.TIMESTAMP].updated = Date.now();
        return originalUpdate.apply(this, args);
    };
    
    return obj;
}

function addValidator(obj, validationRules) {
    obj[MIXIN_SYMBOLS.VALIDATOR] = {
        rules: validationRules,
        validate() {
            return this.rules.every(rule => rule(obj));
        }
    };
    
    return obj;
}

// Apply mixins
const product = addTimestamp(addValidator({
    name: 'Laptop',
    price: 999
}, [
    (obj) => obj.price > 0,
    (obj) => obj.name && obj.name.length > 0
]));

console.log('\\nProduct with mixins:');
console.log('Product name:', product.name);
console.log('Is valid:', product[MIXIN_SYMBOLS.VALIDATOR].validate());
console.log('Created at:', new Date(product[MIXIN_SYMBOLS.TIMESTAMP].created));

// 3. Plugin System
const PLUGIN_SYMBOL = Symbol('plugin');

class Application {
    constructor() {
        this[PLUGIN_SYMBOL] = new Map();
    }
    
    registerPlugin(name, plugin) {
        this[PLUGIN_SYMBOL].set(name, plugin);
        
        // Initialize plugin if it has an init method
        if (typeof plugin.init === 'function') {
            plugin.init(this);
        }
        
        console.log(\`Plugin "\${name}" registered\`);
    }
    
    getPlugin(name) {
        return this[PLUGIN_SYMBOL].get(name);
    }
    
    executePluginMethod(pluginName, methodName, ...args) {
        const plugin = this[PLUGIN_SYMBOL].get(pluginName);
        if (plugin && typeof plugin[methodName] === 'function') {
            return plugin[methodName](...args);
        }
    }
    
    listPlugins() {
        return Array.from(this[PLUGIN_SYMBOL].keys());
    }
}

// Example plugins
const loggerPlugin = {
    init(app) {
        console.log('Logger plugin initialized');
    },
    
    log(level, message) {
        console.log(\`[\${level.toUpperCase()}] \${message}\`);
    }
};

const analyticsPlugin = {
    init(app) {
        console.log('Analytics plugin initialized');
    },
    
    track(event, data) {
        console.log(\`Tracking event: \${event}\`, data);
    }
};

const app = new Application();
app.registerPlugin('logger', loggerPlugin);
app.registerPlugin('analytics', analyticsPlugin);

console.log('\\nUsing plugins:');
app.executePluginMethod('logger', 'log', 'info', 'Application started');
app.executePluginMethod('analytics', 'track', 'app.start', { timestamp: Date.now() });

console.log('\\nRegistered plugins:', app.listPlugins());

// 4. State Management with Symbols
const STATE_SYMBOLS = {
    CURRENT_STATE: Symbol('state.current'),
    PREVIOUS_STATE: Symbol('state.previous'),
    LISTENERS: Symbol('state.listeners'),
    MUTATIONS: Symbol('state.mutations')
};

class StateManager {
    constructor(initialState = {}) {
        this[STATE_SYMBOLS.CURRENT_STATE] = initialState;
        this[STATE_SYMBOLS.PREVIOUS_STATE] = null;
        this[STATE_SYMBOLS.LISTENERS] = [];
        this[STATE_SYMBOLS.MUTATIONS] = new Map();
    }
    
    getState() {
        // Return copy to prevent direct mutation
        return { ...this[STATE_SYMBOLS.CURRENT_STATE] };
    }
    
    registerMutation(name, mutationFn) {
        this[STATE_SYMBOLS.MUTATIONS].set(name, mutationFn);
    }
    
    commit(mutationName, payload) {
        const mutation = this[STATE_SYMBOLS.MUTATIONS].get(mutationName);
        if (!mutation) {
            throw new Error(\`Unknown mutation: \${mutationName}\`);
        }
        
        this[STATE_SYMBOLS.PREVIOUS_STATE] = { ...this[STATE_SYMBOLS.CURRENT_STATE] };
        this[STATE_SYMBOLS.CURRENT_STATE] = mutation(this[STATE_SYMBOLS.CURRENT_STATE], payload);
        
        // Notify listeners
        this[STATE_SYMBOLS.LISTENERS].forEach(listener => {
            listener(this[STATE_SYMBOLS.CURRENT_STATE], this[STATE_SYMBOLS.PREVIOUS_STATE]);
        });
    }
    
    subscribe(listener) {
        this[STATE_SYMBOLS.LISTENERS].push(listener);
        
        // Return unsubscribe function
        return () => {
            const index = this[STATE_SYMBOLS.LISTENERS].indexOf(listener);
            if (index > -1) {
                this[STATE_SYMBOLS.LISTENERS].splice(index, 1);
            }
        };
    }
}

const stateManager = new StateManager({ count: 0, user: null });

// Register mutations
stateManager.registerMutation('INCREMENT', (state, payload) => ({
    ...state,
    count: state.count + (payload || 1)
}));

stateManager.registerMutation('SET_USER', (state, user) => ({
    ...state,
    user: user
}));

// Subscribe to state changes
const unsubscribe = stateManager.subscribe((newState, prevState) => {
    console.log('State changed:', { newState, prevState });
});

console.log('\\nState management example:');
stateManager.commit('INCREMENT', 5);
stateManager.commit('SET_USER', { name: 'Alice', id: 1 });

// Symbol Registry Utilities
console.log('\\n=== Symbol Utilities ===');

class SymbolRegistry {
    constructor() {
        this.symbols = new Map();
    }
    
    create(key, description) {
        if (this.symbols.has(key)) {
            return this.symbols.get(key);
        }
        
        const symbol = Symbol(description || key);
        this.symbols.set(key, symbol);
        return symbol;
    }
    
    get(key) {
        return this.symbols.get(key);
    }
    
    has(key) {
        return this.symbols.has(key);
    }
    
    keys() {
        return Array.from(this.symbols.keys());
    }
    
    clear() {
        this.symbols.clear();
    }
}

const registry = new SymbolRegistry();

const userIdSymbol = registry.create('user.id', 'User ID symbol');
const userRoleSymbol = registry.create('user.role', 'User role symbol');

console.log('Registry symbols:', registry.keys());
console.log('Retrieved symbol:', registry.get('user.id') === userIdSymbol);

// Best Practices and Considerations
console.log('\\n=== Best Practices ===');

// 1. Use symbols for truly private properties
const PRIVATE_DATA = Symbol('privateData');

class SecureClass {
    constructor(publicData, privateData) {
        this.publicData = publicData;
        this[PRIVATE_DATA] = privateData;
    }
    
    getPrivateData() {
        return this[PRIVATE_DATA];
    }
}

// 2. Use descriptive symbol descriptions for debugging
const DEBUG_INFO = Symbol('debug.info');
const PERFORMANCE_METRICS = Symbol('performance.metrics');

// 3. Use global symbols sparingly and with clear naming conventions
const SHARED_CONFIG = Symbol.for('app.shared.config');
const SHARED_LOGGER = Symbol.for('app.shared.logger');

// 4. Consider symbols for protocol implementation
const DISPOSABLE = Symbol('disposable');

class Resource {
    constructor(name) {
        this.name = name;
    }
    
    [DISPOSABLE]() {
        console.log(\`Disposing resource: \${this.name}\`);
        // Cleanup logic here
    }
}

function dispose(obj) {
    if (obj && typeof obj[DISPOSABLE] === 'function') {
        obj[DISPOSABLE]();
    }
}

const resource = new Resource('Database Connection');
dispose(resource);

console.log('\\n=== Symbol Best Practices ===');
console.log('✅ Use symbols for private properties and metadata');
console.log('✅ Use descriptive descriptions for debugging');
console.log('✅ Use Symbol.for() sparingly for cross-module communication');
console.log('✅ Implement well-known symbols for custom behavior');
console.log('✅ Use symbols in plugin and mixin systems');
console.log('✅ Consider symbols for protocol definitions');
console.log('⚠️  Remember symbols are not truly private (accessible via getOwnPropertySymbols)');
console.log('⚠️  Symbols are not JSON serializable');
console.log('⚠️  Don\\'t overuse - regular properties are fine for most cases');

console.log('Symbols examples completed');`,

  exercises: [
    {
      question: "Create a mixin system using symbols that adds logging capabilities to any object:",
      solution: `const LOGGING_SYMBOLS = {
  LOGS: Symbol('logs'),
  LOG_LEVEL: Symbol('logLevel'),
  ENABLED: Symbol('enabled')
};

function addLogging(obj, options = {}) {
  // Initialize logging state
  obj[LOGGING_SYMBOLS.LOGS] = [];
  obj[LOGGING_SYMBOLS.LOG_LEVEL] = options.level || 'info';
  obj[LOGGING_SYMBOLS.ENABLED] = options.enabled !== false;
  
  // Add logging methods
  obj.log = function(level, message, data = {}) {
    if (!this[LOGGING_SYMBOLS.ENABLED]) return;
    
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data
    };
    
    this[LOGGING_SYMBOLS.LOGS].push(logEntry);
    
    if (this.shouldLog(level)) {
      console.log(\`[\${level.toUpperCase()}] \${message}\`, data);
    }
  };
  
  obj.info = function(message, data) {
    this.log('info', message, data);
  };
  
  obj.warn = function(message, data) {
    this.log('warn', message, data);
  };
  
  obj.error = function(message, data) {
    this.log('error', message, data);
  };
  
  obj.shouldLog = function(level) {
    const levels = ['debug', 'info', 'warn', 'error'];
    const currentLevelIndex = levels.indexOf(this[LOGGING_SYMBOLS.LOG_LEVEL]);
    const messageLevelIndex = levels.indexOf(level);
    return messageLevelIndex >= currentLevelIndex;
  };
  
  obj.getLogs = function(level) {
    if (level) {
      return this[LOGGING_SYMBOLS.LOGS].filter(log => log.level === level);
    }
    return [...this[LOGGING_SYMBOLS.LOGS]];
  };
  
  obj.clearLogs = function() {
    this[LOGGING_SYMBOLS.LOGS] = [];
  };
  
  obj.setLogLevel = function(level) {
    this[LOGGING_SYMBOLS.LOG_LEVEL] = level;
  };
  
  obj.enableLogging = function() {
    this[LOGGING_SYMBOLS.ENABLED] = true;
  };
  
  obj.disableLogging = function() {
    this[LOGGING_SYMBOLS.ENABLED] = false;
  };
  
  return obj;
}

// Usage
const service = addLogging({
  name: 'UserService',
  processUser(user) {
    this.info('Processing user', { userId: user.id });
    // Process user logic
    this.info('User processed successfully');
  }
}, { level: 'info' });

service.processUser({ id: 123 });
console.log('Total logs:', service.getLogs().length);`,
      explanation: "This mixin uses symbols to store private logging state while exposing a clean public API. The symbols prevent naming conflicts and keep internal state separate from the object's regular properties."
    }
  ],

  quiz: [
    {
      question: "What makes symbols particularly useful for object properties?",
      options: [
        "They are faster to access than string properties",
        "They are unique and won't conflict with other properties",
        "They can store more data than regular properties",
        "They are automatically synchronized across objects"
      ],
      correct: 1,
      explanation: "Symbols are guaranteed to be unique, making them perfect for creating properties that won't accidentally conflict with other properties, especially useful for libraries and frameworks that need to add metadata to objects."
    }
  ],

  resources: [
    {
      title: "MDN - Symbol",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol"
    },
    {
      title: "MDN - Well-known Symbols", 
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#well-known_symbols"
    }
  ],

  nextModules: ['modules', 'iterators-generators'],
  prerequisites: ['objects', 'classes', 'iterators']
};