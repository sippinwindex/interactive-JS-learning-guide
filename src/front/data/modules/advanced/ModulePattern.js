// src/front/data/modules/advanced/ModulePattern.js
export default {
  title: 'Module Pattern',
  duration: '35 min',
  difficulty: 'Advanced',
  overview: 'Master the Module Pattern for creating encapsulated code. Learn IIFE modules, revealing module pattern, and namespace management.',
  
  keyPoints: [
    'Module pattern provides encapsulation and privacy',
    'IIFE (Immediately Invoked Function Expression) creates modules',
    'Revealing module pattern exposes only what\'s needed',
    'Namespacing prevents global pollution',
    'Modules can have dependencies and initialization',
    'Modern ES6 modules evolved from these patterns'
  ],

  example: `// Basic Module Pattern with IIFE
console.log('=== Basic Module Pattern ===');

const CounterModule = (function() {
    // Private variables
    let count = 0;
    let step = 1;
    
    // Private methods
    function validateStep(newStep) {
        return typeof newStep === 'number' && newStep > 0;
    }
    
    function log(message) {
        console.log(\`[Counter] \${message}\`);
    }
    
    // Public API
    return {
        increment: function() {
            count += step;
            log(\`Incremented to \${count}\`);
            return count;
        },
        
        decrement: function() {
            count -= step;
            log(\`Decremented to \${count}\`);
            return count;
        },
        
        getValue: function() {
            return count;
        },
        
        setStep: function(newStep) {
            if (validateStep(newStep)) {
                step = newStep;
                log(\`Step changed to \${step}\`);
            } else {
                log('Invalid step value');
            }
        },
        
        reset: function() {
            count = 0;
            log('Counter reset');
            return count;
        }
    };
})();

// Usage
console.log('Current value:', CounterModule.getValue());
CounterModule.increment();
CounterModule.increment();
CounterModule.setStep(5);
CounterModule.increment();
console.log('Final value:', CounterModule.getValue());

// Revealing Module Pattern
console.log('=== Revealing Module Pattern ===');

const CalculatorModule = (function() {
    let result = 0;
    let history = [];
    
    function add(value) {
        result += value;
        recordOperation('add', value);
        return result;
    }
    
    function subtract(value) {
        result -= value;
        recordOperation('subtract', value);
        return result;
    }
    
    function multiply(value) {
        result *= value;
        recordOperation('multiply', value);
        return result;
    }
    
    function divide(value) {
        if (value !== 0) {
            result /= value;
            recordOperation('divide', value);
        } else {
            console.error('Division by zero!');
        }
        return result;
    }
    
    function clear() {
        result = 0;
        history = [];
        console.log('Calculator cleared');
        return result;
    }
    
    function getResult() {
        return result;
    }
    
    function getHistory() {
        return [...history]; // Return copy
    }
    
    function recordOperation(operation, value) {
        history.push({
            operation,
            value,
            result,
            timestamp: new Date()
        });
    }
    
    // Reveal only what should be public
    return {
        add: add,
        subtract: subtract,
        multiply: multiply,
        divide: divide,
        clear: clear,
        getResult: getResult,
        getHistory: getHistory
    };
})();

// Usage
CalculatorModule.add(10);
CalculatorModule.multiply(2);
CalculatorModule.subtract(5);
console.log('Calculator result:', CalculatorModule.getResult());
console.log('Calculator history:', CalculatorModule.getHistory());

// Module with Dependencies
console.log('=== Module with Dependencies ===');

const LoggerModule = (function() {
    const levels = {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3
    };
    
    let currentLevel = levels.INFO;
    let logs = [];
    
    function log(level, message) {
        if (level >= currentLevel) {
            const logEntry = {
                level: Object.keys(levels)[level],
                message,
                timestamp: new Date().toISOString()
            };
            
            logs.push(logEntry);
            console.log(\`[\${logEntry.level}] \${logEntry.timestamp}: \${message}\`);
        }
    }
    
    return {
        debug: (msg) => log(levels.DEBUG, msg),
        info: (msg) => log(levels.INFO, msg),
        warn: (msg) => log(levels.WARN, msg),
        error: (msg) => log(levels.ERROR, msg),
        setLevel: (level) => {
            if (levels.hasOwnProperty(level)) {
                currentLevel = levels[level];
            }
        },
        getLogs: () => [...logs]
    };
})();

const UserModule = (function(logger) {
    let users = [];
    let currentId = 1;
    
    function validateUser(user) {
        return user && user.name && user.email;
    }
    
    function createUser(userData) {
        if (!validateUser(userData)) {
            logger.error('Invalid user data provided');
            return null;
        }
        
        const user = {
            id: currentId++,
            name: userData.name,
            email: userData.email,
            createdAt: new Date()
        };
        
        users.push(user);
        logger.info(\`User created: \${user.name} (ID: \${user.id})\`);
        return user;
    }
    
    function getUser(id) {
        const user = users.find(u => u.id === id);
        if (user) {
            logger.debug(\`User retrieved: \${user.name}\`);
        } else {
            logger.warn(\`User not found: ID \${id}\`);
        }
        return user;
    }
    
    function getAllUsers() {
        logger.debug(\`Retrieved \${users.length} users\`);
        return [...users];
    }
    
    function deleteUser(id) {
        const index = users.findIndex(u => u.id === id);
        if (index > -1) {
            const deletedUser = users.splice(index, 1)[0];
            logger.info(\`User deleted: \${deletedUser.name}\`);
            return true;
        } else {
            logger.warn(\`Cannot delete user: ID \${id} not found\`);
            return false;
        }
    }
    
    return {
        create: createUser,
        get: getUser,
        getAll: getAllUsers,
        delete: deleteUser
    };
})(LoggerModule); // Inject dependency

// Usage with dependencies
const user1 = UserModule.create({ name: 'Alice', email: 'alice@example.com' });
const user2 = UserModule.create({ name: 'Bob', email: 'bob@example.com' });
console.log('All users:', UserModule.getAll());
UserModule.get(999); // Not found

// Namespace Pattern
console.log('=== Namespace Pattern ===');

const MyApp = MyApp || {};

MyApp.Utils = (function() {
    return {
        formatDate: function(date) {
            return date.toLocaleDateString();
        },
        
        formatCurrency: function(amount) {
            return \`$\${amount.toFixed(2)}\`;
        },
        
        debounce: function(func, wait) {
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
    };
})();

MyApp.Components = MyApp.Components || {};

MyApp.Components.Modal = (function(utils) {
    let isOpen = false;
    let currentModal = null;
    
    function show(content, options = {}) {
        if (isOpen) {
            console.warn('Modal already open');
            return;
        }
        
        currentModal = {
            content,
            options,
            openedAt: new Date()
        };
        
        isOpen = true;
        console.log('Modal opened:', content);
        
        if (options.autoClose) {
            setTimeout(hide, options.autoClose);
        }
    }
    
    function hide() {
        if (!isOpen) {
            console.warn('No modal to close');
            return;
        }
        
        console.log('Modal closed');
        isOpen = false;
        currentModal = null;
    }
    
    function isVisible() {
        return isOpen;
    }
    
    return {
        show: show,
        hide: hide,
        isVisible: isVisible
    };
})(MyApp.Utils);

// Usage with namespacing
console.log('Formatted date:', MyApp.Utils.formatDate(new Date()));
console.log('Formatted currency:', MyApp.Utils.formatCurrency(123.456));
MyApp.Components.Modal.show('Welcome to our app!', { autoClose: 3000 });

// Module Factory Pattern
console.log('=== Module Factory Pattern ===');

function createApiModule(baseURL, apiKey) {
    const cache = new Map();
    const requestHistory = [];
    
    function makeRequest(endpoint, options = {}) {
        const url = baseURL + endpoint;
        const requestId = Date.now();
        
        // Record request
        requestHistory.push({
            id: requestId,
            url,
            options,
            timestamp: new Date()
        });
        
        console.log(\`API Request: \${options.method || 'GET'} \${url}\`);
        
        // Simulate API response
        return new Promise((resolve) => {
            setTimeout(() => {
                const response = {
                    requestId,
                    data: \`Response from \${endpoint}\`,
                    status: 200
                };
                resolve(response);
            }, 100);
        });
    }
    
    function get(endpoint) {
        if (cache.has(endpoint)) {
            console.log('Returning cached response');
            return Promise.resolve(cache.get(endpoint));
        }
        
        return makeRequest(endpoint).then(response => {
            cache.set(endpoint, response);
            return response;
        });
    }
    
    function post(endpoint, data) {
        return makeRequest(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    
    function clearCache() {
        cache.clear();
        console.log('API cache cleared');
    }
    
    function getStats() {
        return {
            totalRequests: requestHistory.length,
            cacheSize: cache.size,
            baseURL
        };
    }
    
    return {
        get,
        post,
        clearCache,
        getStats
    };
}

// Create different API modules
const userAPI = createApiModule('https://api.users.com', 'user-key-123');
const productAPI = createApiModule('https://api.products.com', 'product-key-456');

// Usage
userAPI.get('/profile').then(response => {
    console.log('User API response:', response);
});

productAPI.get('/categories').then(response => {
    console.log('Product API response:', response);
});

// Singleton Module Pattern
console.log('=== Singleton Module Pattern ===');

const ConfigManager = (function() {
    let instance;
    let config = {};
    
    function createInstance() {
        return {
            set: function(key, value) {
                config[key] = value;
                console.log(\`Config set: \${key} = \${value}\`);
            },
            
            get: function(key) {
                return config[key];
            },
            
            getAll: function() {
                return { ...config };
            },
            
            reset: function() {
                config = {};
                console.log('Config reset');
            }
        };
    }
    
    return {
        getInstance: function() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

// Usage - always returns same instance
const config1 = ConfigManager.getInstance();
const config2 = ConfigManager.getInstance();

console.log('Same instance?', config1 === config2);
config1.set('theme', 'dark');
console.log('Config from second instance:', config2.get('theme'));

// Module with Initialization
console.log('=== Module with Initialization ===');

const DatabaseModule = (function() {
    let isInitialized = false;
    let connection = null;
    let queryCount = 0;
    
    function initialize(connectionString) {
        if (isInitialized) {
            console.warn('Database already initialized');
            return false;
        }
        
        connection = {
            string: connectionString,
            connected: true,
            timestamp: new Date()
        };
        
        isInitialized = true;
        console.log('Database initialized with:', connectionString);
        return true;
    }
    
    function query(sql) {
        if (!isInitialized) {
            throw new Error('Database not initialized');
        }
        
        queryCount++;
        console.log(\`Executing query #\${queryCount}: \${sql}\`);
        
        // Simulate query result
        return {
            query: sql,
            result: \`Query result for: \${sql}\`,
            queryId: queryCount
        };
    }
    
    function getStats() {
        return {
            initialized: isInitialized,
            connection: connection ? { ...connection } : null,
            totalQueries: queryCount
        };
    }
    
    function disconnect() {
        if (connection) {
            connection.connected = false;
            console.log('Database disconnected');
        }
    }
    
    return {
        init: initialize,
        query: query,
        getStats: getStats,
        disconnect: disconnect
    };
})();

// Usage with initialization
try {
    DatabaseModule.query('SELECT * FROM users'); // This will throw
} catch (error) {
    console.error('Error:', error.message);
}

DatabaseModule.init('mongodb://localhost:27017/myapp');
DatabaseModule.query('SELECT * FROM users');
DatabaseModule.query('SELECT * FROM products');
console.log('Database stats:', DatabaseModule.getStats());

console.log('Module pattern examples completed');`,

  exercises: [
    {
      question: "Create a module that manages a shopping cart with private state and public methods:",
      solution: `const ShoppingCartModule = (function() {
  let items = [];
  let total = 0;
  
  function calculateTotal() {
    total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  
  function findItem(id) {
    return items.find(item => item.id === id);
  }
  
  return {
    addItem: function(item) {
      const existingItem = findItem(item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        items.push({ ...item });
      }
      calculateTotal();
    },
    
    removeItem: function(id) {
      items = items.filter(item => item.id !== id);
      calculateTotal();
    },
    
    getItems: function() {
      return [...items];
    },
    
    getTotal: function() {
      return total;
    },
    
    clear: function() {
      items = [];
      total = 0;
    }
  };
})();`,
      explanation: "The module pattern encapsulates private data and methods while exposing only the necessary public interface."
    }
  ],

  quiz: [
    {
      question: "What is the main advantage of the Module Pattern?",
      options: [
        "Faster execution",
        "Encapsulation and privacy",
        "Better error handling",
        "Automatic garbage collection"
      ],
      correct: 1,
      explanation: "The Module Pattern provides encapsulation by keeping variables and functions private while exposing only what's needed through a public API."
    }
  ],

  resources: [
    {
      title: "JavaScript Module Patterns",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules"
    }
  ],

  nextModules: ['es6-modules', 'design-patterns'],
  prerequisites: ['functions-basics', 'closures-scope']
};