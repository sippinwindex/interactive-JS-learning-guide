export default {
  title: 'Private Fields',
  duration: '35 min',
  difficulty: 'Advanced',
  overview: 'Master JavaScript private fields and methods for true encapsulation. Learn the # syntax, private methods, and how to create secure, encapsulated classes.',
  
  keyPoints: [
    'Private fields use the # syntax and are truly private',
    'Private fields cannot be accessed from outside the class',
    'Private methods provide internal functionality without exposure',
    'Private fields enable true encapsulation in JavaScript',
    'WeakMap pattern provides alternative privacy approach',
    'Private fields are different from convention-based privacy'
  ],

  example: `// Basic Private Fields
console.log('=== Basic Private Fields ===');

class BankAccount {
    // Private fields - truly inaccessible from outside
    #accountNumber;
    #balance;
    #pin;
    #isLocked = false;
    #transactionHistory = [];
    
    constructor(accountNumber, initialBalance, pin) {
        this.#accountNumber = accountNumber;
        this.#balance = initialBalance;
        this.#pin = pin;
        
        // Log account creation
        this.#addTransaction('account_created', initialBalance, 'Account opened');
    }
    
    // Private method
    #addTransaction(type, amount, description) {
        this.#transactionHistory.push({
            type,
            amount,
            description,
            timestamp: new Date(),
            balance: this.#balance
        });
    }
    
    // Private validation method
    #validatePin(inputPin) {
        return this.#pin === inputPin;
    }
    
    // Private method to check if account is accessible
    #ensureAccountAccess(pin) {
        if (this.#isLocked) {
            throw new Error('Account is locked');
        }
        
        if (!this.#validatePin(pin)) {
            throw new Error('Invalid PIN');
        }
    }
    
    // Public methods that use private fields
    deposit(amount, pin) {
        this.#ensureAccountAccess(pin);
        
        if (amount <= 0) {
            throw new Error('Deposit amount must be positive');
        }
        
        this.#balance += amount;
        this.#addTransaction('deposit', amount, 'Cash deposit');
        
        console.log('Deposited $' + amount + '. New balance: $' + this.#balance);
        return this;
    }
    
    withdraw(amount, pin) {
        this.#ensureAccountAccess(pin);
        
        if (amount <= 0) {
            throw new Error('Withdrawal amount must be positive');
        }
        
        if (amount > this.#balance) {
            throw new Error('Insufficient funds');
        }
        
        this.#balance -= amount;
        this.#addTransaction('withdrawal', -amount, 'Cash withdrawal');
        
        console.log('Withdrew $' + amount + '. New balance: $' + this.#balance);
        return this;
    }
    
    checkBalance(pin) {
        this.#ensureAccountAccess(pin);
        return this.#balance;
    }
    
    getTransactionHistory(pin) {
        this.#ensureAccountAccess(pin);
        return [...this.#transactionHistory]; // Return copy
    }
    
    // Public read-only access to account number
    get accountNumber() {
        return this.#accountNumber;
    }
    
    // Method to change PIN
    changePin(oldPin, newPin) {
        this.#ensureAccountAccess(oldPin);
        
        if (typeof newPin !== 'string' || newPin.length !== 4) {
            throw new Error('PIN must be a 4-digit string');
        }
        
        this.#pin = newPin;
        this.#addTransaction('pin_change', 0, 'PIN changed');
        console.log('PIN changed successfully');
    }
    
    lockAccount() {
        this.#isLocked = true;
        this.#addTransaction('account_locked', 0, 'Account locked');
        console.log('Account locked');
    }
}

// Test private fields
const account = new BankAccount('ACC-001', 1000, '1234');

console.log('Account number:', account.accountNumber);
console.log('Balance:', account.checkBalance('1234'));

account.deposit(500, '1234').withdraw(200, '1234');

// Try to access private fields (will fail)
try {
    console.log('Trying to access private field:', account.#balance);
} catch (error) {
    console.error('Cannot access private field:', error.message);
}

// Try wrong PIN
try {
    account.withdraw(100, '0000');
} catch (error) {
    console.error('PIN error:', error.message);
}

// Advanced Private Fields with Validation
console.log('\\n=== Advanced Private Fields with Validation ===');

class User {
    // Private fields
    #id;
    #username;
    #email;
    #passwordHash;
    #profile;
    #permissions = new Set();
    #loginAttempts = 0;
    #isLocked = false;
    #lastLoginTime = null;
    #createdAt;
    
    constructor(id, username, email, password) {
        this.#id = id;
        this.#createdAt = new Date();
        
        // Use private methods for validation during construction
        this.#setUsername(username);
        this.#setEmail(email);
        this.#setPassword(password);
        this.#initializeProfile();
    }
    
    // Private validation methods
    #validateUsername(username) {
        if (typeof username !== 'string' || username.length < 3) {
            throw new Error('Username must be at least 3 characters long');
        }
        
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            throw new Error('Username can only contain letters, numbers, and underscores');
        }
        
        return true;
    }
    
    #validateEmail(email) {
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email format');
        }
        return true;
    }
    
    #validatePassword(password) {
        if (typeof password !== 'string' || password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }
        
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/.test(password)) {
            throw new Error('Password must contain uppercase, lowercase, and digit');
        }
        
        return true;
    }
    
    // Private setter methods
    #setUsername(username) {
        this.#validateUsername(username);
        this.#username = username;
    }
    
    #setEmail(email) {
        this.#validateEmail(email);
        this.#email = email.toLowerCase();
    }
    
    #setPassword(password) {
        this.#validatePassword(password);
        // In real application, use proper hashing like bcrypt
        this.#passwordHash = this.#simpleHash(password);
    }
    
    #initializeProfile() {
        this.#profile = {
            displayName: this.#username,
            bio: '',
            avatar: null,
            preferences: {
                theme: 'light',
                notifications: true,
                privacy: 'friends'
            }
        };
    }
    
    // Private utility methods
    #simpleHash(password) {
        // Simplified hash - use proper hashing in production
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const char = password.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString();
    }
    
    #checkAccountLock() {
        if (this.#isLocked) {
            throw new Error('Account is locked due to too many failed login attempts');
        }
    }
    
    #resetLoginAttempts() {
        this.#loginAttempts = 0;
    }
    
    #incrementLoginAttempts() {
        this.#loginAttempts++;
        if (this.#loginAttempts >= 5) {
            this.#isLocked = true;
            console.log('Account locked due to too many failed attempts');
        }
    }
    
    // Public methods
    authenticate(password) {
        this.#checkAccountLock();
        
        const inputHash = this.#simpleHash(password);
        if (inputHash === this.#passwordHash) {
            this.#resetLoginAttempts();
            this.#lastLoginTime = new Date();
            console.log('Login successful for user:', this.#username);
            return true;
        } else {
            this.#incrementLoginAttempts();
            console.log('Login failed. Attempts remaining:', 5 - this.#loginAttempts);
            return false;
        }
    }
    
    changePassword(currentPassword, newPassword) {
        if (!this.authenticate(currentPassword)) {
            throw new Error('Current password is incorrect');
        }
        
        this.#setPassword(newPassword);
        console.log('Password changed successfully');
    }
    
    updateProfile(updates) {
        this.#checkAccountLock();
        
        const allowedUpdates = ['displayName', 'bio', 'avatar'];
        const profileUpdates = {};
        
        for (const [key, value] of Object.entries(updates)) {
            if (allowedUpdates.includes(key)) {
                profileUpdates[key] = value;
            }
        }
        
        this.#profile = { ...this.#profile, ...profileUpdates };
        console.log('Profile updated');
    }
    
    addPermission(permission) {
        this.#permissions.add(permission);
        console.log('Permission added:', permission);
    }
    
    hasPermission(permission) {
        return this.#permissions.has(permission);
    }
    
    // Public getters for safe access to private data
    get id() {
        return this.#id;
    }
    
    get username() {
        return this.#username;
    }
    
    get email() {
        return this.#email;
    }
    
    get profile() {
        // Return deep copy to prevent external modification
        return JSON.parse(JSON.stringify(this.#profile));
    }
    
    get isLocked() {
        return this.#isLocked;
    }
    
    get lastLoginTime() {
        return this.#lastLoginTime ? new Date(this.#lastLoginTime) : null;
    }
    
    get createdAt() {
        return new Date(this.#createdAt);
    }
}

// Test advanced private fields
const user = new User(1, 'alice_doe', 'alice@example.com', 'MyPassword123');

console.log('User ID:', user.id);
console.log('Username:', user.username);
console.log('Email:', user.email);

user.authenticate('MyPassword123');
user.addPermission('read');
user.addPermission('write');

console.log('Has read permission:', user.hasPermission('read'));
console.log('Profile:', user.profile);

user.updateProfile({
    displayName: 'Alice Doe',
    bio: 'Software Developer'
});

// Test failed authentication
user.authenticate('wrongpassword');

// Static Private Fields and Methods
console.log('\\n=== Static Private Fields and Methods ===');

class Database {
    // Static private fields
    static #connection = null;
    static #config = {
        host: 'localhost',
        port: 5432,
        maxConnections: 10
    };
    static #activeConnections = 0;
    static #queryCount = 0;
    
    // Private instance fields
    #isConnected = false;
    #sessionId;
    
    constructor() {
        if (Database.#activeConnections >= Database.#config.maxConnections) {
            throw new Error('Maximum connections exceeded');
        }
        
        this.#sessionId = Database.#generateSessionId();
        Database.#activeConnections++;
        this.#isConnected = true;
        
        console.log('Database connection created. Session:', this.#sessionId);
    }
    
    // Static private methods
    static #generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    static #validateQuery(query) {
        if (typeof query !== 'string' || query.trim().length === 0) {
            throw new Error('Query must be a non-empty string');
        }
        
        // Basic SQL injection prevention
        const dangerousPatterns = /drop|delete|truncate|alter/gi;
        if (dangerousPatterns.test(query)) {
            throw new Error('Potentially dangerous query detected');
        }
        
        return true;
    }
    
    static #logQuery(query, sessionId) {
        Database.#queryCount++;
        console.log('Query #' + Database.#queryCount + ' [' + sessionId + ']: ' + query);
    }
    
    // Private instance methods
    #ensureConnected() {
        if (!this.#isConnected) {
            throw new Error('Database connection is closed');
        }
    }
    
    #executeQuery(query) {
        this.#ensureConnected();
        Database.#validateQuery(query);
        Database.#logQuery(query, this.#sessionId);
        
        // Simulate query execution
        return {
            success: true,
            rows: [],
            affectedRows: 0,
            query: query
        };
    }
    
    // Public methods
    select(table, conditions = {}) {
        let query = 'SELECT * FROM ' + table;
        
        if (Object.keys(conditions).length > 0) {
            const whereClause = Object.entries(conditions)
                .map(([key, value]) => key + ' = ' + JSON.stringify(value))
                .join(' AND ');
            query += ' WHERE ' + whereClause;
        }
        
        return this.#executeQuery(query);
    }
    
    insert(table, data) {
        const columns = Object.keys(data).join(', ');
        const values = Object.values(data).map(v => JSON.stringify(v)).join(', ');
        const query = 'INSERT INTO ' + table + ' (' + columns + ') VALUES (' + values + ')';
        
        return this.#executeQuery(query);
    }
    
    close() {
        if (this.#isConnected) {
            this.#isConnected = false;
            Database.#activeConnections--;
            console.log('Database connection closed. Session:', this.#sessionId);
        }
    }
    
    get sessionId() {
        return this.#sessionId;
    }
    
    get isConnected() {
        return this.#isConnected;
    }
    
    // Static public methods
    static getConnectionCount() {
        return Database.#activeConnections;
    }
    
    static getQueryCount() {
        return Database.#queryCount;
    }
    
    static getConfig() {
        return { ...Database.#config }; // Return copy
    }
    
    static updateConfig(newConfig) {
        Database.#config = { ...Database.#config, ...newConfig };
        console.log('Database configuration updated');
    }
}

// Test static private fields
console.log('Initial connection count:', Database.getConnectionCount());

const db1 = new Database();
const db2 = new Database();

console.log('Active connections:', Database.getConnectionCount());

db1.select('users', { active: true });
db2.insert('users', { name: 'Alice', email: 'alice@example.com' });

console.log('Total queries executed:', Database.getQueryCount());

db1.close();
console.log('Connections after closing db1:', Database.getConnectionCount());

// WeakMap Alternative for Privacy (Pre-private fields)
console.log('\\n=== WeakMap Privacy Pattern ===');

const CarPrivate = new WeakMap();

class Car {
    constructor(make, model, year) {
        // Store private data in WeakMap
        CarPrivate.set(this, {
            make,
            model,
            year,
            mileage: 0,
            engineRunning: false,
            fuelLevel: 100,
            maintenanceRecords: []
        });
    }
    
    // Helper method to get private data
    #getPrivate() {
        return CarPrivate.get(this);
    }
    
    start() {
        const data = this.#getPrivate();
        if (data.engineRunning) {
            console.log('Engine is already running');
            return this;
        }
        
        if (data.fuelLevel <= 0) {
            console.log('Cannot start - no fuel');
            return this;
        }
        
        data.engineRunning = true;
        console.log(data.make + ' ' + data.model + ' started');
        return this;
    }
    
    stop() {
        const data = this.#getPrivate();
        data.engineRunning = false;
        console.log(data.make + ' ' + data.model + ' stopped');
        return this;
    }
    
    drive(miles) {
        const data = this.#getPrivate();
        if (!data.engineRunning) {
            console.log('Start the engine first');
            return this;
        }
        
        const fuelNeeded = miles * 0.1;
        if (data.fuelLevel < fuelNeeded) {
            console.log('Not enough fuel to drive ' + miles + ' miles');
            return this;
        }
        
        data.mileage += miles;
        data.fuelLevel -= fuelNeeded;
        console.log('Drove ' + miles + ' miles. Total mileage: ' + data.mileage);
        return this;
    }
    
    refuel() {
        const data = this.#getPrivate();
        data.fuelLevel = 100;
        console.log('Tank refueled');
        return this;
    }
    
    // Public getters
    get make() {
        return this.#getPrivate().make;
    }
    
    get model() {
        return this.#getPrivate().model;
    }
    
    get year() {
        return this.#getPrivate().year;
    }
    
    get mileage() {
        return this.#getPrivate().mileage;
    }
    
    get fuelLevel() {
        return this.#getPrivate().fuelLevel;
    }
    
    get isRunning() {
        return this.#getPrivate().engineRunning;
    }
}

// Test WeakMap privacy
const car = new Car('Toyota', 'Camry', 2022);

console.log('Car:', car.make, car.model, car.year);
car.start().drive(50).refuel().drive(100).stop();
console.log('Final mileage:', car.mileage);
console.log('Fuel level:', car.fuelLevel);

// Try to access WeakMap directly (won't work)
console.log('Trying to access CarPrivate:', CarPrivate.get(car)); // Requires access to WeakMap

console.log('\\nPrivate fields examples completed');`,

  exercises: [
    {
      question: "Create a CreditCard class with private fields for card number, CVV, and PIN, ensuring sensitive data cannot be accessed externally:",
      solution: `class CreditCard {
  // Private fields for sensitive data
  #cardNumber;
  #cvv;
  #pin;
  #expiryDate;
  #cardholderName;
  #balance;
  #creditLimit;
  #isBlocked = false;
  #transactionHistory = [];
  #failedAttempts = 0;
  
  constructor(cardNumber, cvv, pin, expiryDate, cardholderName, creditLimit) {
    this.#cardNumber = this.#validateCardNumber(cardNumber);
    this.#cvv = this.#validateCVV(cvv);
    this.#pin = this.#validatePIN(pin);
    this.#expiryDate = new Date(expiryDate);
    this.#cardholderName = cardholderName;
    this.#creditLimit = creditLimit;
    this.#balance = 0;
  }
  
  // Private validation methods
  #validateCardNumber(cardNumber) {
    const cleaned = cardNumber.replace(/\\s/g, '');
    if (!/^\\d{16}$/.test(cleaned)) {
      throw new Error('Card number must be 16 digits');
    }
    return cleaned;
  }
  
  #validateCVV(cvv) {
    if (!/^\\d{3,4}$/.test(cvv)) {
      throw new Error('CVV must be 3 or 4 digits');
    }
    return cvv;
  }
  
  #validatePIN(pin) {
    if (!/^\\d{4}$/.test(pin)) {
      throw new Error('PIN must be 4 digits');
    }
    return pin;
  }
  
  #verifyPIN(inputPin) {
    if (this.#isBlocked) {
      throw new Error('Card is blocked');
    }
    
    if (inputPin !== this.#pin) {
      this.#failedAttempts++;
      if (this.#failedAttempts >= 3) {
        this.#isBlocked = true;
        throw new Error('Card blocked due to too many failed attempts');
      }
      throw new Error('Invalid PIN');
    }
    
    this.#failedAttempts = 0;
    return true;
  }
  
  #addTransaction(type, amount, description) {
    this.#transactionHistory.push({
      type,
      amount,
      description,
      timestamp: new Date(),
      balance: this.#balance
    });
  }
  
  // Public methods
  makePayment(amount, pin, description = 'Payment') {
    this.#verifyPIN(pin);
    
    if (amount <= 0) {
      throw new Error('Payment amount must be positive');
    }
    
    if (this.#balance + amount > this.#creditLimit) {
      throw new Error('Transaction exceeds credit limit');
    }
    
    this.#balance += amount;
    this.#addTransaction('payment', amount, description);
    
    console.log(\`Payment of $\${amount} processed\`);
    return this;
  }
  
  makeRepayment(amount, pin) {
    this.#verifyPIN(pin);
    
    if (amount <= 0) {
      throw new Error('Repayment amount must be positive');
    }
    
    if (amount > this.#balance) {
      amount = this.#balance; // Can't repay more than owed
    }
    
    this.#balance -= amount;
    this.#addTransaction('repayment', -amount, 'Repayment');
    
    console.log(\`Repayment of $\${amount} processed\`);
    return this;
  }
  
  changePIN(oldPin, newPin) {
    this.#verifyPIN(oldPin);
    this.#pin = this.#validatePIN(newPin);
    console.log('PIN changed successfully');
    return this;
  }
  
  // Safe public getters (no sensitive data)
  get cardholderName() {
    return this.#cardholderName;
  }
  
  get maskedCardNumber() {
    return '**** **** **** ' + this.#cardNumber.slice(-4);
  }
  
  get balance() {
    return this.#balance;
  }
  
  get creditLimit() {
    return this.#creditLimit;
  }
  
  get availableCredit() {
    return this.#creditLimit - this.#balance;
  }
  
  get isBlocked() {
    return this.#isBlocked;
  }
  
  getStatement(pin) {
    this.#verifyPIN(pin);
    return [...this.#transactionHistory]; // Return copy
  }
}

// Usage:
const card = new CreditCard('1234567890123456', '123', '1234', '2025-12-31', 'John Doe', 5000);

console.log('Cardholder:', card.cardholderName);
console.log('Card Number:', card.maskedCardNumber); // Only shows last 4 digits
console.log('Available Credit:', card.availableCredit);

card.makePayment(100, '1234', 'Online purchase');
card.makeRepayment(50, '1234');

// Try to access private fields (will fail)
try {
  console.log(card.#cardNumber); // Syntax error - cannot access private field
} catch (error) {
  console.log('Cannot access private field');
}`,
      explanation: "This CreditCard class demonstrates how private fields protect sensitive financial data while providing controlled access through public methods with proper authentication."
    }
  ],

  quiz: [
    {
      question: "What makes private fields in JavaScript truly private?",
      options: [
        "They start with an underscore convention",
        "They use the # syntax and are enforced by the JavaScript engine",
        "They are marked with the 'private' keyword",
        "They are stored in a separate object"
      ],
      correct: 1,
      explanation: "Private fields using the # syntax are truly private because they are enforced by the JavaScript engine itself, unlike naming conventions which are just developer agreements."
    }
  ],

  resources: [
    {
      title: "MDN - Private Class Features",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_class_fields"
    },
    {
      title: "JavaScript Private Fields Guide",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#private_fields"
    }
  ],

  nextModules: ['static-methods', 'object-creation', 'getters-setters'],
  prerequisites: ['es6-classes', 'encapsulation-basics', 'constructor-functions']
};