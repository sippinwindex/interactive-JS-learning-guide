export default {
  title: 'ES6 Modules',
  duration: '35 min',
  difficulty: 'Intermediate',
  overview: 'Master ES6 module system for organizing and sharing code. Learn import/export syntax, module patterns, and best practices for modern JavaScript applications.',
  
  keyPoints: [
    'Modules provide code organization and encapsulation',
    'export/import statements for sharing functionality',
    'Default exports vs named exports',
    'Dynamic imports for code splitting',
    'Module scope is separate from global scope',
    'Static module structure enables tree shaking'
  ],

  example: `// ES6 Module Basics
console.log('=== ES6 Module Basics ===');

// Note: In a real application, these would be separate files
// Here we'll demonstrate the concepts with examples

// --- math-utils.js (Example Module) ---
// This would be a separate file in a real application

/*
// Named Exports
export const PI = 3.14159;
export const E = 2.71828;

export function add(a, b) {
    return a + b;
}

export function multiply(a, b) {
    return a * b;
}

export class Calculator {
    constructor() {
        this.result = 0;
    }
    
    add(value) {
        this.result += value;
        return this;
    }
    
    multiply(value) {
        this.result *= value;
        return this;
    }
    
    getResult() {
        return this.result;
    }
}
*/

// --- user-service.js (Example Module) ---
/*
// Default Export with Named Exports
export default class UserService {
    constructor() {
        this.users = [];
    }
    
    addUser(user) {
        this.users.push(user);
    }
    
    getUsers() {
        return this.users;
    }
}

// Named exports alongside default
export const USER_ROLES = {
    ADMIN: 'admin',
    USER: 'user',
    GUEST: 'guest'
};

export function validateUser(user) {
    return user && user.name && user.email;
}
*/

// --- app.js (Main Application) ---
/*
// Importing named exports
import { PI, add, multiply, Calculator } from './math-utils.js';

// Importing default export
import UserService from './user-service.js';

// Importing both default and named exports
import UserService, { USER_ROLES, validateUser } from './user-service.js';

// Importing with aliases
import { add as sum, multiply as product } from './math-utils.js';

// Importing everything as namespace
import * as MathUtils from './math-utils.js';

// Using imports
console.log('PI value:', PI);
console.log('2 + 3 =', add(2, 3));

const calc = new Calculator();
const result = calc.add(5).multiply(3).getResult();
console.log('Calculator result:', result);

const userService = new UserService();
userService.addUser({ name: 'Alice', role: USER_ROLES.ADMIN });
*/

// Since we can't actually use separate files in this demo,
// let's simulate the module concepts:

// Simulating Module Exports and Imports
console.log('=== Module Export/Import Simulation ===');

// Simulating a math utilities module
const MathUtilsModule = {
    // Named exports simulation
    PI: 3.14159,
    E: 2.71828,
    
    add(a, b) {
        return a + b;
    },
    
    multiply(a, b) {
        return a * b;
    },
    
    // Default export simulation
    default: class Calculator {
        constructor() {
            this.result = 0;
        }
        
        add(value) {
            this.result += value;
            return this;
        }
        
        multiply(value) {
            this.result *= value;
            return this;
        }
        
        getResult() {
            return this.result;
        }
    }
};

// Simulating imports
const { PI, add, multiply } = MathUtilsModule;
const Calculator = MathUtilsModule.default;

console.log('Using simulated imports:');
console.log('PI:', PI);
console.log('add(5, 3):', add(5, 3));
console.log('multiply(4, 7):', multiply(4, 7));

const calc = new Calculator();
console.log('Calculator result:', calc.add(10).multiply(2).getResult());

// Module Patterns
console.log('\\n=== Module Patterns ===');

// 1. Utility Module Pattern
const StringUtils = {
    capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },
    
    camelCase(str) {
        return str.replace(/[-_\\s]+(.)?/g, (_, char) => 
            char ? char.toUpperCase() : ''
        );
    },
    
    kebabCase(str) {
        return str.replace(/[A-Z]/g, letter => \`-\${letter.toLowerCase()}\`)
                  .replace(/^-/, '');
    },
    
    truncate(str, length = 50) {
        return str.length > length ? str.slice(0, length) + '...' : str;
    }
};

console.log('String utilities:');
console.log('capitalize("hello"):', StringUtils.capitalize('hello'));
console.log('camelCase("hello-world"):', StringUtils.camelCase('hello-world'));
console.log('kebabCase("helloWorld"):', StringUtils.kebabCase('helloWorld'));

// 2. Factory Module Pattern
function createAPIClient(baseURL, options = {}) {
    const defaultOptions = {
        timeout: 5000,
        retries: 3,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    
    const config = { ...defaultOptions, ...options };
    
    return {
        async get(endpoint) {
            console.log(\`GET \${baseURL}\${endpoint}\`);
            // Simulate API call
            return { data: 'mock data', status: 200 };
        },
        
        async post(endpoint, data) {
            console.log(\`POST \${baseURL}\${endpoint}\`, data);
            return { data: 'created', status: 201 };
        },
        
        getConfig() {
            return { ...config };
        }
    };
}

const apiClient = createAPIClient('https://api.example.com', {
    timeout: 10000
});

console.log('\\nAPI Client:');
console.log('Config:', apiClient.getConfig());

// 3. Singleton Module Pattern
const ConfigManager = (() => {
    let instance;
    let config = {};
    
    function createInstance() {
        return {
            set(key, value) {
                config[key] = value;
            },
            
            get(key) {
                return config[key];
            },
            
            getAll() {
                return { ...config };
            },
            
            clear() {
                config = {};
            }
        };
    }
    
    return {
        getInstance() {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };
})();

const config1 = ConfigManager.getInstance();
const config2 = ConfigManager.getInstance();

config1.set('theme', 'dark');
console.log('\\nSingleton pattern:');
console.log('config2.get("theme"):', config2.get('theme')); // 'dark'
console.log('Same instance:', config1 === config2); // true

// 4. Observer Module Pattern
function createEventBus() {
    const events = new Map();
    
    return {
        on(event, callback) {
            if (!events.has(event)) {
                events.set(event, []);
            }
            events.get(event).push(callback);
            
            // Return unsubscribe function
            return () => this.off(event, callback);
        },
        
        off(event, callback) {
            if (!events.has(event)) return;
            
            const callbacks = events.get(event);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        },
        
        emit(event, data) {
            if (!events.has(event)) return;
            
            events.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error('Event callback error:', error);
                }
            });
        }
    };
}

const eventBus = createEventBus();

const unsubscribe = eventBus.on('user:action', (data) => {
    console.log('User action:', data);
});

eventBus.emit('user:action', { type: 'click', element: 'button' });

// Dynamic Imports Simulation
console.log('\\n=== Dynamic Imports ===');

// In real applications, you would use dynamic imports like this:
/*
// Lazy loading a module
async function loadMathUtils() {
    const mathModule = await import('./math-utils.js');
    return mathModule;
}

// Conditional module loading
async function loadFeature(featureName) {
    if (featureName === 'charts') {
        const chartModule = await import('./chart-utils.js');
        return chartModule.default;
    } else if (featureName === 'data') {
        const dataModule = await import('./data-utils.js');
        return dataModule;
    }
}

// Code splitting with dynamic imports
document.getElementById('loadButton').addEventListener('click', async () => {
    const { heavyFunction } = await import('./heavy-module.js');
    heavyFunction();
});
*/

// Simulating dynamic imports with promises
function simulateDynamicImport(moduleName) {
    const modules = {
        'heavy-module': {
            heavyFunction() {
                console.log('Heavy computation running...');
                // Simulate heavy work
                let result = 0;
                for (let i = 0; i < 1000000; i++) {
                    result += i;
                }
                return result;
            }
        },
        
        'chart-utils': {
            default: class Chart {
                constructor(data) {
                    this.data = data;
                }
                
                render() {
                    console.log('Rendering chart with data:', this.data);
                }
            }
        }
    };
    
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(modules[moduleName] || {});
        }, 100); // Simulate network delay
    });
}

// Using simulated dynamic imports
async function loadHeavyModule() {
    console.log('Loading heavy module...');
    const module = await simulateDynamicImport('heavy-module');
    const result = module.heavyFunction();
    console.log('Heavy module result:', result);
}

async function loadChartModule() {
    console.log('Loading chart module...');
    const module = await simulateDynamicImport('chart-utils');
    const Chart = module.default;
    const chart = new Chart([1, 2, 3, 4, 5]);
    chart.render();
}

// Execute dynamic imports
loadHeavyModule();
loadChartModule();

// Module Communication Patterns
console.log('\\n=== Module Communication ===');

// 1. Shared State Module
const StateStore = (() => {
    let state = {
        user: null,
        theme: 'light',
        notifications: []
    };
    
    const subscribers = [];
    
    function notify(changes) {
        subscribers.forEach(callback => callback(state, changes));
    }
    
    return {
        getState() {
            return { ...state };
        },
        
        setState(updates) {
            const oldState = { ...state };
            state = { ...state, ...updates };
            notify({ from: oldState, to: state, updates });
        },
        
        subscribe(callback) {
            subscribers.push(callback);
            
            // Return unsubscribe function
            return () => {
                const index = subscribers.indexOf(callback);
                if (index > -1) {
                    subscribers.splice(index, 1);
                }
            };
        }
    };
})();

// Module A using shared state
const UserModule = {
    login(user) {
        StateStore.setState({ user });
        console.log('User logged in:', user.name);
    },
    
    logout() {
        StateStore.setState({ user: null });
        console.log('User logged out');
    }
};

// Module B using shared state
const ThemeModule = {
    setTheme(theme) {
        StateStore.setState({ theme });
        console.log('Theme changed to:', theme);
    },
    
    init() {
        StateStore.subscribe((state, changes) => {
            if (changes.updates.theme) {
                console.log('Theme module detected theme change:', state.theme);
            }
        });
    }
};

ThemeModule.init();
UserModule.login({ name: 'Alice', id: 1 });
ThemeModule.setTheme('dark');

// 2. Message Passing Between Modules
const MessageBus = (() => {
    const channels = new Map();
    
    return {
        createChannel(name) {
            if (!channels.has(name)) {
                channels.set(name, {
                    subscribers: [],
                    messages: []
                });
            }
            return name;
        },
        
        subscribe(channelName, callback) {
            const channel = channels.get(channelName);
            if (channel) {
                channel.subscribers.push(callback);
                
                // Send any buffered messages
                channel.messages.forEach(message => callback(message));
                
                return () => {
                    const index = channel.subscribers.indexOf(callback);
                    if (index > -1) {
                        channel.subscribers.splice(index, 1);
                    }
                };
            }
        },
        
        publish(channelName, message) {
            const channel = channels.get(channelName);
            if (channel) {
                channel.messages.push(message);
                channel.subscribers.forEach(callback => callback(message));
                
                // Keep only last 10 messages
                if (channel.messages.length > 10) {
                    channel.messages = channel.messages.slice(-10);
                }
            }
        }
    };
})();

// Module communication example
const AuthModule = {
    init() {
        MessageBus.createChannel('auth');
        MessageBus.createChannel('notifications');
    },
    
    authenticate(credentials) {
        console.log('Authenticating user...');
        
        // Simulate auth
        setTimeout(() => {
            const user = { id: 1, name: credentials.username, role: 'user' };
            MessageBus.publish('auth', {
                type: 'LOGIN_SUCCESS',
                user: user,
                timestamp: Date.now()
            });
        }, 500);
    }
};

const NotificationModule = {
    init() {
        MessageBus.subscribe('auth', (message) => {
            if (message.type === 'LOGIN_SUCCESS') {
                this.showNotification(\`Welcome back, \${message.user.name}!\`);
            }
        });
    },
    
    showNotification(text) {
        console.log(\`🔔 Notification: \${text}\`);
        MessageBus.publish('notifications', {
            type: 'NOTIFICATION_SHOWN',
            text,
            timestamp: Date.now()
        });
    }
};

// Initialize modules
AuthModule.init();
NotificationModule.init();

// Simulate authentication
setTimeout(() => {
    AuthModule.authenticate({ username: 'alice', password: 'secret' });
}, 1000);

// Module Loading Strategies
console.log('\\n=== Module Loading Strategies ===');

// 1. Eager Loading Simulation
const EagerLoader = {
    modules: new Map(),
    
    register(name, moduleFactory) {
        this.modules.set(name, moduleFactory);
    },
    
    loadAll() {
        const loadedModules = {};
        
        for (const [name, factory] of this.modules) {
            console.log(\`Loading module: \${name}\`);
            loadedModules[name] = factory();
        }
        
        return loadedModules;
    }
};

// Register modules
EagerLoader.register('utils', () => ({
    format: (str) => str.toUpperCase()
}));

EagerLoader.register('api', () => ({
    get: (url) => console.log(\`GET \${url}\`)
}));

// Load all modules immediately
const eagerModules = EagerLoader.loadAll();

// 2. Lazy Loading Simulation
const LazyLoader = {
    modules: new Map(),
    loaded: new Map(),
    
    register(name, moduleFactory) {
        this.modules.set(name, moduleFactory);
    },
    
    async load(name) {
        if (this.loaded.has(name)) {
            return this.loaded.get(name);
        }
        
        const factory = this.modules.get(name);
        if (!factory) {
            throw new Error(\`Module "\${name}" not found\`);
        }
        
        console.log(\`Lazy loading module: \${name}\`);
        
        // Simulate async loading
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const module = factory();
        this.loaded.set(name, module);
        
        return module;
    }
};

// Register lazy modules
LazyLoader.register('analytics', () => ({
    track: (event) => console.log(\`Tracking: \${event}\`)
}));

LazyLoader.register('charts', () => ({
    render: (data) => console.log('Rendering chart with:', data)
}));

// Load modules on demand
async function demonstrateLazyLoading() {
    try {
        const analytics = await LazyLoader.load('analytics');
        analytics.track('page_view');
        
        const charts = await LazyLoader.load('charts');
        charts.render([1, 2, 3, 4, 5]);
        
        // Second load should use cached version
        const analyticsAgain = await LazyLoader.load('analytics');
        console.log('Same instance:', analytics === analyticsAgain);
        
    } catch (error) {
        console.error('Module loading error:', error);
    }
}

setTimeout(demonstrateLazyLoading, 2000);

// Module Dependency Management
console.log('\\n=== Dependency Management ===');

const DependencyManager = {
    modules: new Map(),
    dependencies: new Map(),
    loaded: new Set(),
    
    register(name, dependencies, factory) {
        this.modules.set(name, factory);
        this.dependencies.set(name, dependencies || []);
    },
    
    async load(name) {
        if (this.loaded.has(name)) {
            return this.modules.get(name)();
        }
        
        // Load dependencies first
        const deps = this.dependencies.get(name) || [];
        const loadedDeps = {};
        
        for (const depName of deps) {
            if (!this.loaded.has(depName)) {
                await this.load(depName);
            }
            loadedDeps[depName] = this.modules.get(depName)();
        }
        
        // Load the module
        console.log(\`Loading module "\${name}" with dependencies:\`, deps);
        this.loaded.add(name);
        
        const factory = this.modules.get(name);
        return factory(loadedDeps);
    }
};

// Register modules with dependencies
DependencyManager.register('logger', [], () => ({
    log: (msg) => console.log(\`[LOG] \${msg}\`)
}));

DependencyManager.register('database', ['logger'], (deps) => ({
    connect: () => {
        deps.logger.log('Database connected');
        return { connected: true };
    }
}));

DependencyManager.register('api', ['database', 'logger'], (deps) => ({
    start: () => {
        deps.logger.log('Starting API server');
        const db = deps.database.connect();
        return { server: 'running', database: db };
    }
}));

// Load module with automatic dependency resolution
async function demonstrateDependencyManagement() {
    try {
        const api = await DependencyManager.load('api');
        const result = api.start();
        console.log('API started:', result);
    } catch (error) {
        console.error('Dependency loading error:', error);
    }
}

setTimeout(demonstrateDependencyManagement, 3000);

// Best Practices Summary
setTimeout(() => {
    console.log('\\n=== ES6 Modules Best Practices ===');
    console.log('✅ Use named exports for utilities and functions');
    console.log('✅ Use default exports for main classes or single functionality');
    console.log('✅ Keep modules focused on single responsibility');
    console.log('✅ Use dynamic imports for code splitting and lazy loading');
    console.log('✅ Organize modules in logical directory structure');
    console.log('✅ Use barrel exports (index.js) for public APIs');
    console.log('✅ Avoid circular dependencies between modules');
    console.log('✅ Use TypeScript or JSDoc for module interfaces');
    console.log('⚠️  Avoid deep nesting of module directories');
    console.log("⚠️  Don't export mutable state directly");
    console.log('⚠️  Be careful with side effects in module initialization');
    
    console.log('ES6 Modules examples completed');
}, 4000);`,

  exercises: [
    {
      question: "Create a modular plugin system that supports dynamic loading and dependency injection:",
      solution: `class PluginManager {
  constructor() {
    this.plugins = new Map();
    this.dependencies = new Map();
    this.loaded = new Map();
    this.hooks = new Map();
  }
  
  // Register a plugin with its dependencies
  register(name, config) {
    this.plugins.set(name, {
      factory: config.factory,
      dependencies: config.dependencies || [],
      hooks: config.hooks || []
    });
    
    // Register hooks
    config.hooks?.forEach(hook => {
      if (!this.hooks.has(hook)) {
        this.hooks.set(hook, []);
      }
      this.hooks.get(hook).push(name);
    });
  }
  
  // Load plugin with dependency resolution
  async load(name) {
    if (this.loaded.has(name)) {
      return this.loaded.get(name);
    }
    
    const config = this.plugins.get(name);
    if (!config) {
      throw new Error(\`Plugin "\${name}" not found\`);
    }
    
    // Load dependencies first
    const deps = {};
    for (const depName of config.dependencies) {
      deps[depName] = await this.load(depName);
    }
    
    // Create plugin instance
    console.log(\`Loading plugin: \${name}\`);
    const plugin = await config.factory(deps, this);
    this.loaded.set(name, plugin);
    
    // Initialize plugin if it has init method
    if (plugin.init) {
      await plugin.init();
    }
    
    return plugin;
  }
  
  // Execute hook with all registered plugins
  async executeHook(hookName, ...args) {
    const pluginNames = this.hooks.get(hookName) || [];
    const results = [];
    
    for (const name of pluginNames) {
      const plugin = await this.load(name);
      if (plugin[hookName]) {
        const result = await plugin[hookName](...args);
        results.push({ plugin: name, result });
      }
    }
    
    return results;
  }
  
  // Load all plugins
  async loadAll() {
    const promises = Array.from(this.plugins.keys()).map(name => this.load(name));
    return Promise.all(promises);
  }
}

// Example plugins
const pluginManager = new PluginManager();

// Core plugin (no dependencies)
pluginManager.register('logger', {
  factory: () => ({
    log: (level, message) => console.log(\`[\${level.toUpperCase()}] \${message}\`),
    info: (msg) => console.log(\`[INFO] \${msg}\`),
    error: (msg) => console.log(\`[ERROR] \${msg}\`)
  })
});

// Analytics plugin (depends on logger)
pluginManager.register('analytics', {
  dependencies: ['logger'],
  hooks: ['track'],
  factory: (deps) => ({
    track(event, data) {
      deps.logger.info(\`Tracking event: \${event}\`);
      return { event, data, timestamp: Date.now() };
    }
  })
});

// Usage
async function demonstratePluginSystem() {
  await pluginManager.loadAll();
  await pluginManager.executeHook('track', 'user_action', { button: 'click' });
}

demonstratePluginSystem();`,
      explanation: "This plugin system demonstrates modular architecture with dependency injection, dynamic loading, and hook-based communication between modules."
    }
  ],

  quiz: [
    {
      question: "What is the main advantage of ES6 modules over other module systems?",
      options: [
        "They are faster to execute",
        "They support static analysis and tree shaking",
        "They work in older browsers without transpilation",
        "They automatically handle circular dependencies"
      ],
      correct: 1,
      explanation: "ES6 modules have static structure determined at compile time, enabling bundlers to perform tree shaking (dead code elimination) and other optimizations that weren't possible with dynamic module systems like CommonJS."
    }
  ],

  resources: [
    {
      title: "MDN - JavaScript Modules",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules"
    },
    {
      title: "ES6 Modules in Depth",
      url: "https://exploringjs.com/es6/ch_modules.html"
    }
  ],

  nextModules: ['bundling', 'tree-shaking'],
  prerequisites: ['functions', 'classes', 'import-export']
};