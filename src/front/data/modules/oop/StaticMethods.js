export default {
  title: 'Static Methods',
  duration: '30 min',
  difficulty: 'Intermediate',
  overview: 'Master JavaScript static methods and properties. Learn when to use static vs instance methods, utility patterns, and how static methods enhance class design.',
  
  keyPoints: [
    'Static methods belong to the class, not instances',
    'Static methods cannot access instance properties',
    'Static methods are called on the class itself',
    'Static methods are perfect for utility functions',
    'Static properties store class-level data',
    'Static methods enable factory patterns and validation'
  ],

  example: `// Basic Static Methods
console.log('=== Basic Static Methods ===');

class MathUtils {
    // Static methods - called on the class, not instances
    static add(a, b) {
        return a + b;
    }
    
    static multiply(a, b) {
        return a * b;
    }
    
    static factorial(n) {
        if (n <= 1) return 1;
        return n * MathUtils.factorial(n - 1);
    }
    
    static isPrime(num) {
        if (num < 2) return false;
        for (let i = 2; i <= Math.sqrt(num); i++) {
            if (num % i === 0) return false;
        }
        return true;
    }
    
    static gcd(a, b) {
        while (b !== 0) {
            const temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
    
    static randomBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

// Static methods are called on the class
console.log('5 + 3 =', MathUtils.add(5, 3));
console.log('4! =', MathUtils.factorial(4));
console.log('17 is prime:', MathUtils.isPrime(17));
console.log('GCD of 48 and 18:', MathUtils.gcd(48, 18));
console.log('Random between 1-10:', MathUtils.randomBetween(1, 10));

// Cannot call static methods on instances
const mathInstance = new MathUtils();
try {
    console.log(mathInstance.add(1, 2)); // This will fail
} catch (error) {
    console.error('Cannot call static method on instance:', error.message);
}

// Static Properties and Methods
console.log('\\n=== Static Properties and Methods ===');

class Configuration {
    // Static properties
    static defaultSettings = {
        theme: 'light',
        language: 'en',
        timeout: 5000
    };
    
    static version = '1.0.0';
    static #apiKey = 'secret-key-123'; // Private static field
    
    // Static method to get configuration
    static getDefaultSettings() {
        return { ...Configuration.defaultSettings }; // Return copy
    }
    
    static updateDefaultSetting(key, value) {
        if (key in Configuration.defaultSettings) {
            Configuration.defaultSettings[key] = value;
            console.log('Updated setting ' + key + ' to:', value);
        } else {
            throw new Error('Unknown setting: ' + key);
        }
    }
    
    static getVersion() {
        return Configuration.version;
    }
    
    static validateApiKey(key) {
        return key === Configuration.#apiKey;
    }
    
    // Static method for environment detection
    static getEnvironment() {
        if (typeof window !== 'undefined') {
            return 'browser';
        } else if (typeof global !== 'undefined') {
            return 'node';
        } else {
            return 'unknown';
        }
    }
}

console.log('Default settings:', Configuration.getDefaultSettings());
console.log('Version:', Configuration.getVersion());
console.log('Environment:', Configuration.getEnvironment());

Configuration.updateDefaultSetting('theme', 'dark');
console.log('Updated settings:', Configuration.getDefaultSettings());

// Factory Pattern with Static Methods
console.log('\\n=== Factory Pattern with Static Methods ===');

class Animal {
    constructor(name, species, sound) {
        this.name = name;
        this.species = species;
        this.sound = sound;
    }
    
    makeSound() {
        console.log(this.name + ' says ' + this.sound + '!');
    }
    
    // Static factory methods
    static createDog(name) {
        return new Animal(name, 'Dog', 'Woof');
    }
    
    static createCat(name) {
        return new Animal(name, 'Cat', 'Meow');
    }
    
    static createCow(name) {
        return new Animal(name, 'Cow', 'Moo');
    }
    
    static createBird(name) {
        return new Animal(name, 'Bird', 'Tweet');
    }
    
    // Generic factory method
    static create(type, name) {
        const animalTypes = {
            dog: () => Animal.createDog(name),
            cat: () => Animal.createCat(name),
            cow: () => Animal.createCow(name),
            bird: () => Animal.createBird(name)
        };
        
        const creator = animalTypes[type.toLowerCase()];
        if (!creator) {
            throw new Error('Unknown animal type: ' + type);
        }
        
        return creator();
    }
    
    // Static method to create multiple animals
    static createFarm(animals) {
        return animals.map(({ type, name }) => Animal.create(type, name));
    }
    
    // Static validation method
    static isValidAnimalData(data) {
        return data && 
               typeof data.name === 'string' && 
               typeof data.species === 'string' && 
               typeof data.sound === 'string';
    }
}

// Test factory methods
const dog = Animal.createDog('Buddy');
const cat = Animal.createCat('Whiskers');
const farmAnimals = Animal.createFarm([
    { type: 'dog', name: 'Rex' },
    { type: 'cow', name: 'Bessie' },
    { type: 'bird', name: 'Tweety' }
]);

dog.makeSound();
cat.makeSound();
farmAnimals.forEach(animal => animal.makeSound());

// Validation and Utility Static Methods
console.log('\\n=== Validation and Utility Static Methods ===');

class StringUtils {
    // Static validation methods
    static isEmail(str) {
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        return emailRegex.test(str);
    }
    
    static isUrl(str) {
        try {
            new URL(str);
            return true;
        } catch {
            return false;
        }
    }
    
    static isPhoneNumber(str) {
        const phoneRegex = /^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return phoneRegex.test(str);
    }
    
    // Static transformation methods
    static capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    
    static toCamelCase(str) {
        return str.replace(/[-_\\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : '');
    }
    
    static toKebabCase(str) {
        return str
            .replace(/([a-z])([A-Z])/g, '$1-$2')
            .replace(/[\\s_]+/g, '-')
            .toLowerCase();
    }
    
    static truncate(str, maxLength, suffix = '...') {
        if (str.length <= maxLength) return str;
        return str.slice(0, maxLength - suffix.length) + suffix;
    }
    
    // Static utility methods
    static wordCount(str) {
        return str.trim().split(/\\s+/).filter(word => word.length > 0).length;
    }
    
    static removeHtmlTags(str) {
        return str.replace(/<[^>]*>/g, '');
    }
    
    static generateSlug(str) {
        return str
            .toLowerCase()
            .replace(/[^\\w\\s-]/g, '')
            .replace(/[\\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
    
    // Static method to validate and process multiple strings
    static processStrings(strings, operations) {
        return strings.map(str => {
            let processed = str;
            
            operations.forEach(operation => {
                if (typeof StringUtils[operation] === 'function') {
                    processed = StringUtils[operation](processed);
                }
            });
            
            return processed;
        });
    }
}

// Test string utilities
console.log('Email validation:', StringUtils.isEmail('test@example.com'));
console.log('URL validation:', StringUtils.isUrl('https://example.com'));
console.log('Phone validation:', StringUtils.isPhoneNumber('(555) 123-4567'));

console.log('Capitalize:', StringUtils.capitalize('hello world'));
console.log('To camelCase:', StringUtils.toCamelCase('hello-world_test'));
console.log('To kebab-case:', StringUtils.toKebabCase('HelloWorldTest'));
console.log('Truncate:', StringUtils.truncate('This is a long sentence', 10));

const strings = ['  Hello World  ', 'JavaScript-Programming', 'UPPERCASE TEXT'];
const processed = StringUtils.processStrings(strings, ['toCamelCase', 'capitalize']);
console.log('Processed strings:', processed);

// Static Methods for Data Management
console.log('\\n=== Static Methods for Data Management ===');

class UserManager {
    // Static private field to store users
    static #users = new Map();
    static #nextId = 1;
    
    // Static method to create user
    static createUser(userData) {
        const errors = UserManager.validateUserData(userData);
        if (errors.length > 0) {
            throw new Error('Validation failed: ' + errors.join(', '));
        }
        
        const user = {
            id: UserManager.#nextId++,
            ...userData,
            createdAt: new Date(),
            lastLogin: null
        };
        
        UserManager.#users.set(user.id, user);
        console.log('User created:', user.username);
        return user.id;
    }
    
    // Static validation method
    static validateUserData(userData) {
        const errors = [];
        
        if (!userData.username || userData.username.length < 3) {
            errors.push('Username must be at least 3 characters');
        }
        
        if (!StringUtils.isEmail(userData.email)) {
            errors.push('Invalid email format');
        }
        
        if (!userData.password || userData.password.length < 8) {
            errors.push('Password must be at least 8 characters');
        }
        
        return errors;
    }
    
    // Static method to find user
    static findUserById(id) {
        return UserManager.#users.get(id);
    }
    
    static findUserByUsername(username) {
        for (const user of UserManager.#users.values()) {
            if (user.username === username) {
                return user;
            }
        }
        return null;
    }
    
    // Static method to update user
    static updateUser(id, updates) {
        const user = UserManager.#users.get(id);
        if (!user) {
            throw new Error('User not found');
        }
        
        const updatedUser = { ...user, ...updates, updatedAt: new Date() };
        UserManager.#users.set(id, updatedUser);
        console.log('User updated:', user.username);
        return updatedUser;
    }
    
    // Static method to delete user
    static deleteUser(id) {
        const deleted = UserManager.#users.delete(id);
        if (deleted) {
            console.log('User deleted');
        } else {
            throw new Error('User not found');
        }
        return deleted;
    }
    
    // Static method to get user count
    static getUserCount() {
        return UserManager.#users.size;
    }
    
    // Static method to get all users (safe copy)
    static getAllUsers() {
        return Array.from(UserManager.#users.values()).map(user => ({ ...user }));
    }
    
    // Static method to search users
    static searchUsers(query) {
        const searchTerm = query.toLowerCase();
        return Array.from(UserManager.#users.values()).filter(user =>
            user.username.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm)
        );
    }
    
    // Static method for user statistics
    static getUserStats() {
        const users = Array.from(UserManager.#users.values());
        const now = new Date();
        
        return {
            total: users.length,
            activeToday: users.filter(user => {
                if (!user.lastLogin) return false;
                const daysDiff = (now - user.lastLogin) / (1000 * 60 * 60 * 24);
                return daysDiff < 1;
            }).length,
            createdThisWeek: users.filter(user => {
                const daysDiff = (now - user.createdAt) / (1000 * 60 * 60 * 24);
                return daysDiff < 7;
            }).length
        };
    }
}

// Test user management
const userId1 = UserManager.createUser({
    username: 'alice',
    email: 'alice@example.com',
    password: 'password123'
});

const userId2 = UserManager.createUser({
    username: 'bob',
    email: 'bob@example.com',
    password: 'securepass'
});

console.log('User count:', UserManager.getUserCount());
console.log('Find user:', UserManager.findUserById(userId1));

UserManager.updateUser(userId1, { lastLogin: new Date() });
console.log('User stats:', UserManager.getUserStats());

// Static Method Inheritance
console.log('\\n=== Static Method Inheritance ===');

class Shape {
    constructor(type) {
        this.type = type;
    }
    
    // Static method in parent class
    static getShapeTypes() {
        return ['circle', 'rectangle', 'triangle'];
    }
    
    static createShape(type, ...args) {
        switch (type) {
            case 'circle':
                return new Circle(...args);
            case 'rectangle':
                return new Rectangle(...args);
            default:
                throw new Error('Unknown shape type: ' + type);
        }
    }
    
    // Virtual method (to be overridden)
    getArea() {
        throw new Error('getArea must be implemented by subclass');
    }
}

class Circle extends Shape {
    constructor(radius) {
        super('circle');
        this.radius = radius;
    }
    
    getArea() {
        return Math.PI * this.radius * this.radius;
    }
    
    // Static method specific to Circle
    static fromDiameter(diameter) {
        return new Circle(diameter / 2);
    }
    
    static fromArea(area) {
        const radius = Math.sqrt(area / Math.PI);
        return new Circle(radius);
    }
}

class Rectangle extends Shape {
    constructor(width, height) {
        super('rectangle');
        this.width = width;
        this.height = height;
    }
    
    getArea() {
        return this.width * this.height;
    }
    
    // Static method specific to Rectangle
    static square(side) {
        return new Rectangle(side, side);
    }
    
    static fromArea(area, ratio = 1) {
        const width = Math.sqrt(area * ratio);
        const height = area / width;
        return new Rectangle(width, height);
    }
}

// Test static method inheritance
console.log('Shape types:', Shape.getShapeTypes());

const circle = Shape.createShape('circle', 5);
const rectangle = Shape.createShape('rectangle', 4, 6);

console.log('Circle area:', circle.getArea().toFixed(2));
console.log('Rectangle area:', rectangle.getArea());

// Test subclass static methods
const circleFromDiameter = Circle.fromDiameter(10);
const square = Rectangle.square(4);

console.log('Circle from diameter area:', circleFromDiameter.getArea().toFixed(2));
console.log('Square area:', square.getArea());

// Static methods are inherited
console.log('Rectangle can access parent static method:', Rectangle.getShapeTypes());

console.log('\\nStatic methods examples completed');`,

  exercises: [
    {
      question: "Create a Logger class with static methods for different log levels and log management:",
      solution: `class Logger {
  // Static private fields
  static #logs = [];
  static #logLevel = 'INFO';
  static #maxLogs = 1000;
  
  // Static constants for log levels
  static LEVELS = {
    ERROR: 0,
    WARN: 1,
    INFO: 2,
    DEBUG: 3
  };
  
  // Static method to set log level
  static setLogLevel(level) {
    if (typeof level === 'string') {
      level = Logger.LEVELS[level.toUpperCase()];
    }
    
    if (level === undefined || level < 0 || level > 3) {
      throw new Error('Invalid log level');
    }
    
    Logger.#logLevel = Object.keys(Logger.LEVELS)[level];
    console.log('Log level set to:', Logger.#logLevel);
  }
  
  // Static method to check if level should be logged
  static #shouldLog(level) {
    const currentLevel = Logger.LEVELS[Logger.#logLevel];
    const messageLevel = Logger.LEVELS[level];
    return messageLevel <= currentLevel;
  }
  
  // Static method to add log entry
  static #addLog(level, message, data = null) {
    if (!Logger.#shouldLog(level)) {
      return;
    }
    
    const logEntry = {
      timestamp: new Date(),
      level,
      message,
      data,
      stack: new Error().stack
    };
    
    Logger.#logs.push(logEntry);
    
    // Trim logs if exceeding max
    if (Logger.#logs.length > Logger.#maxLogs) {
      Logger.#logs.shift();
    }
    
    // Output to console
    const formattedMessage = \`[\${logEntry.timestamp.toISOString()}] \${level}: \${message}\`;
    
    switch (level) {
      case 'ERROR':
        console.error(formattedMessage, data || '');
        break;
      case 'WARN':
        console.warn(formattedMessage, data || '');
        break;
      case 'INFO':
        console.info(formattedMessage, data || '');
        break;
      case 'DEBUG':
        console.log(formattedMessage, data || '');
        break;
    }
  }
  
  // Static logging methods
  static error(message, data) {
    Logger.#addLog('ERROR', message, data);
  }
  
  static warn(message, data) {
    Logger.#addLog('WARN', message, data);
  }
  
  static info(message, data) {
    Logger.#addLog('INFO', message, data);
  }
  
  static debug(message, data) {
    Logger.#addLog('DEBUG', message, data);
  }
  
  // Static utility methods
  static getLogs(level = null, count = null) {
    let filteredLogs = Logger.#logs;
    
    if (level) {
      filteredLogs = filteredLogs.filter(log => log.level === level.toUpperCase());
    }
    
    if (count) {
      filteredLogs = filteredLogs.slice(-count);
    }
    
    return [...filteredLogs]; // Return copy
  }
  
  static clearLogs() {
    const count = Logger.#logs.length;
    Logger.#logs = [];
    console.log(\`Cleared \${count} log entries\`);
  }
  
  static getLogCount() {
    return Logger.#logs.length;
  }
  
  static exportLogs() {
    return JSON.stringify(Logger.#logs, null, 2);
  }
  
  static importLogs(jsonData) {
    try {
      const logs = JSON.parse(jsonData);
      Logger.#logs = [...Logger.#logs, ...logs];
      console.log(\`Imported \${logs.length} log entries\`);
    } catch (error) {
      Logger.error('Failed to import logs', error.message);
    }
  }
}

// Usage:
Logger.setLogLevel('DEBUG');

Logger.info('Application started');
Logger.debug('Debug information', { userId: 123, action: 'login' });
Logger.warn('This is a warning');
Logger.error('Something went wrong', { error: 'Database connection failed' });

console.log('Total logs:', Logger.getLogCount());
console.log('Error logs:', Logger.getLogs('ERROR'));`,
      explanation: "This Logger class demonstrates static methods for application-wide logging functionality, with private static fields for state management and various utility methods for log manipulation."
    }
  ],

  quiz: [
    {
      question: "When should you use static methods instead of instance methods?",
      options: [
        "When the method needs to access instance properties",
        "When the method provides utility functionality that doesn't depend on instance state",
        "When you want to save memory",
        "When the method needs to modify the object"
      ],
      correct: 1,
      explanation: "Static methods should be used for utility functionality that doesn't depend on instance state, such as validation, factory methods, or mathematical operations that work independently of any particular object instance."
    }
  ],

  resources: [
    {
      title: "MDN - Static Methods",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static"
    },
    {
      title: "MDN - Static Properties",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Class_fields#static_fields"
    }
  ],

  nextModules: ['object-creation', 'private-fields', 'inheritance'],
  prerequisites: ['es6-classes', 'functions-basics', 'prototypes']
};