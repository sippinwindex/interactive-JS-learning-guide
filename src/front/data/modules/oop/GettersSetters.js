export default {
  title: 'Getters and Setters',
  duration: '35 min',
  difficulty: 'Intermediate',
  overview: 'Master JavaScript getters and setters for controlled property access. Learn data validation, computed properties, and encapsulation patterns.',
  
  keyPoints: [
    'Getters allow controlled access to object properties',
    'Setters enable validation and transformation of input data',
    'Computed properties can be calculated dynamically',
    'Getters and setters provide encapsulation without direct property access',
    'Virtual properties can be created without storing actual data',
    'Property descriptors offer fine-grained control over property behavior'
  ],

  example: `// Basic Getters and Setters
console.log('=== Basic Getters and Setters ===');

class Person {
    constructor(firstName, lastName, age) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._age = age;
    }
    
    // Getter for firstName
    get firstName() {
        console.log('Getting firstName');
        return this._firstName;
    }
    
    // Setter for firstName with validation
    set firstName(value) {
        console.log('Setting firstName to:', value);
        if (typeof value !== 'string' || value.length === 0) {
            throw new Error('First name must be a non-empty string');
        }
        this._firstName = value.trim();
    }
    
    // Getter for lastName
    get lastName() {
        return this._lastName;
    }
    
    // Setter for lastName with validation
    set lastName(value) {
        if (typeof value !== 'string' || value.length === 0) {
            throw new Error('Last name must be a non-empty string');
        }
        this._lastName = value.trim();
    }
    
    // Getter for age
    get age() {
        return this._age;
    }
    
    // Setter for age with validation
    set age(value) {
        if (!Number.isInteger(value) || value < 0 || value > 150) {
            throw new Error('Age must be a valid integer between 0 and 150');
        }
        this._age = value;
    }
    
    // Computed property - fullName
    get fullName() {
        return this._firstName + ' ' + this._lastName;
    }
    
    // Setter for fullName that splits the input
    set fullName(value) {
        const parts = value.trim().split(' ');
        if (parts.length < 2) {
            throw new Error('Full name must include both first and last name');
        }
        
        this.firstName = parts[0];
        this.lastName = parts.slice(1).join(' ');
    }
    
    // Read-only computed property
    get isAdult() {
        return this._age >= 18;
    }
    
    // Another computed property
    get initials() {
        return this._firstName.charAt(0).toUpperCase() + 
               this._lastName.charAt(0).toUpperCase();
    }
}

// Test basic getters and setters
const person = new Person('John', 'Doe', 25);

console.log('First name:', person.firstName);
console.log('Last name:', person.lastName);
console.log('Age:', person.age);
console.log('Full name:', person.fullName);
console.log('Is adult:', person.isAdult);
console.log('Initials:', person.initials);

// Test setters with validation
try {
    person.firstName = 'Jane';
    person.lastName = 'Smith';
    person.age = 30;
    person.fullName = 'Alice Johnson';
    
    console.log('Updated person:', person.fullName, 'Age:', person.age);
} catch (error) {
    console.error('Validation error:', error.message);
}

// Test validation errors
try {
    person.age = -5; // Should throw error
} catch (error) {
    console.error('Age validation error:', error.message);
}

try {
    person.firstName = ''; // Should throw error
} catch (error) {
    console.error('Name validation error:', error.message);
}

// Advanced Getters and Setters
console.log('\\n=== Advanced Getters and Setters ===');

class BankAccount {
    constructor(accountNumber, initialBalance = 0) {
        this._accountNumber = accountNumber;
        this._balance = initialBalance;
        this._transactions = [];
        this._isActive = true;
    }
    
    // Read-only property
    get accountNumber() {
        return this._accountNumber;
    }
    
    // Balance with formatting
    get balance() {
        return this._balance;
    }
    
    get formattedBalance() {
        return '$' + this._balance.toFixed(2);
    }
    
    // Controlled balance setting (private setter concept)
    _setBalance(amount, transaction) {
        if (!this._isActive) {
            throw new Error('Account is inactive');
        }
        
        const oldBalance = this._balance;
        this._balance = amount;
        
        this._transactions.push({
            type: transaction.type,
            amount: transaction.amount,
            oldBalance: oldBalance,
            newBalance: this._balance,
            timestamp: new Date(),
            description: transaction.description || ''
        });
    }
    
    // Computed properties
    get transactionCount() {
        return this._transactions.length;
    }
    
    get lastTransaction() {
        return this._transactions[this._transactions.length - 1] || null;
    }
    
    get averageTransactionAmount() {
        if (this._transactions.length === 0) return 0;
        
        const total = this._transactions.reduce((sum, transaction) => 
            sum + Math.abs(transaction.amount), 0
        );
        return total / this._transactions.length;
    }
    
    // Account status
    get isActive() {
        return this._isActive;
    }
    
    get status() {
        if (!this._isActive) return 'Inactive';
        if (this._balance < 0) return 'Overdrawn';
        if (this._balance === 0) return 'Zero Balance';
        return 'Active';
    }
    
    // Methods that use the controlled setter
    deposit(amount) {
        if (amount <= 0) {
            throw new Error('Deposit amount must be positive');
        }
        
        this._setBalance(this._balance + amount, {
            type: 'deposit',
            amount: amount,
            description: 'Deposit'
        });
        
        return this;
    }
    
    withdraw(amount) {
        if (amount <= 0) {
            throw new Error('Withdrawal amount must be positive');
        }
        
        if (amount > this._balance) {
            throw new Error('Insufficient funds');
        }
        
        this._setBalance(this._balance - amount, {
            type: 'withdrawal',
            amount: -amount,
            description: 'Withdrawal'
        });
        
        return this;
    }
    
    deactivate() {
        this._isActive = false;
        return this;
    }
}

// Test bank account
const account = new BankAccount('ACC-001', 1000);

console.log('Account number:', account.accountNumber);
console.log('Initial balance:', account.formattedBalance);
console.log('Status:', account.status);

account.deposit(500).withdraw(200).deposit(100);

console.log('Final balance:', account.formattedBalance);
console.log('Transaction count:', account.transactionCount);
console.log('Last transaction:', account.lastTransaction);
console.log('Average transaction:', account.averageTransactionAmount.toFixed(2));

// Object.defineProperty for Dynamic Getters/Setters
console.log('\\n=== Object.defineProperty ===');

function createProduct(name, price, category) {
    const product = {
        _name: name,
        _price: price,
        _category: category,
        _discount: 0,
        _reviews: []
    };
    
    // Define getter and setter for name
    Object.defineProperty(product, 'name', {
        get: function() {
            return this._name;
        },
        set: function(value) {
            if (typeof value !== 'string' || value.length === 0) {
                throw new Error('Product name must be a non-empty string');
            }
            this._name = value;
        },
        enumerable: true,
        configurable: true
    });
    
    // Define getter and setter for price
    Object.defineProperty(product, 'price', {
        get: function() {
            return this._price;
        },
        set: function(value) {
            if (typeof value !== 'number' || value < 0) {
                throw new Error('Price must be a non-negative number');
            }
            this._price = value;
        },
        enumerable: true,
        configurable: true
    });
    
    // Define getter and setter for discount
    Object.defineProperty(product, 'discount', {
        get: function() {
            return this._discount;
        },
        set: function(value) {
            if (typeof value !== 'number' || value < 0 || value > 1) {
                throw new Error('Discount must be a number between 0 and 1');
            }
            this._discount = value;
        },
        enumerable: true,
        configurable: true
    });
    
    // Computed property for discounted price
    Object.defineProperty(product, 'discountedPrice', {
        get: function() {
            return this._price * (1 - this._discount);
        },
        enumerable: true,
        configurable: false
    });
    
    // Computed property for formatted price
    Object.defineProperty(product, 'formattedPrice', {
        get: function() {
            return '$' + this.discountedPrice.toFixed(2);
        },
        enumerable: true,
        configurable: false
    });
    
    // Average rating from reviews
    Object.defineProperty(product, 'averageRating', {
        get: function() {
            if (this._reviews.length === 0) return 0;
            const sum = this._reviews.reduce((total, review) => total + review.rating, 0);
            return sum / this._reviews.length;
        },
        enumerable: true,
        configurable: false
    });
    
    // Add method to add reviews
    product.addReview = function(rating, comment) {
        if (rating < 1 || rating > 5) {
            throw new Error('Rating must be between 1 and 5');
        }
        
        this._reviews.push({
            rating: rating,
            comment: comment || '',
            date: new Date()
        });
        
        return this;
    };
    
    return product;
}

// Test dynamic properties
const laptop = createProduct('MacBook Pro', 2000, 'Electronics');

console.log('Product name:', laptop.name);
console.log('Original price:', laptop.price);

laptop.discount = 0.1; // 10% discount
console.log('Discounted price:', laptop.formattedPrice);

laptop.addReview(5, 'Excellent laptop!');
laptop.addReview(4, 'Great performance');
laptop.addReview(5, 'Love it!');

console.log('Average rating:', laptop.averageRating.toFixed(1));

// Validation with getters and setters
console.log('\\n=== Validation Patterns ===');

class User {
    constructor(username, email, password) {
        this._username = username;
        this._email = email;
        this._password = password;
        this._preferences = {};
        this._loginAttempts = 0;
        this._isLocked = false;
    }
    
    // Username with validation
    get username() {
        return this._username;
    }
    
    set username(value) {
        if (typeof value !== 'string') {
            throw new Error('Username must be a string');
        }
        
        if (value.length < 3 || value.length > 20) {
            throw new Error('Username must be between 3 and 20 characters');
        }
        
        if (!/^[a-zA-Z0-9_]+$/.test(value)) {
            throw new Error('Username can only contain letters, numbers, and underscores');
        }
        
        this._username = value;
    }
    
    // Email with validation
    get email() {
        return this._email;
    }
    
    set email(value) {
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!emailRegex.test(value)) {
            throw new Error('Invalid email format');
        }
        this._email = value.toLowerCase();
    }
    
    // Password with strength validation
    set password(value) {
        if (typeof value !== 'string') {
            throw new Error('Password must be a string');
        }
        
        if (value.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }
        
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)/.test(value)) {
            throw new Error('Password must contain at least one uppercase letter, one lowercase letter, and one number');
        }
        
        // In real application, hash the password
        this._password = value;
    }
    
    // Read-only computed properties
    get isLocked() {
        return this._isLocked;
    }
    
    get passwordStrength() {
        if (!this._password) return 'Not set';
        
        let strength = 0;
        if (this._password.length >= 8) strength++;
        if (/[a-z]/.test(this._password)) strength++;
        if (/[A-Z]/.test(this._password)) strength++;
        if (/\\d/.test(this._password)) strength++;
        if (/[^a-zA-Z\\d]/.test(this._password)) strength++;
        
        const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
        return levels[Math.min(strength, 4)];
    }
    
    // Preferences with nested validation
    get preferences() {
        return { ...this._preferences };
    }
    
    setPreference(key, value) {
        const validPreferences = ['theme', 'language', 'notifications', 'privacy'];
        
        if (!validPreferences.includes(key)) {
            throw new Error('Invalid preference key: ' + key);
        }
        
        // Validate specific preferences
        if (key === 'theme' && !['light', 'dark', 'auto'].includes(value)) {
            throw new Error('Theme must be light, dark, or auto');
        }
        
        if (key === 'language' && typeof value !== 'string') {
            throw new Error('Language must be a string');
        }
        
        if (key === 'notifications' && typeof value !== 'boolean') {
            throw new Error('Notifications must be a boolean');
        }
        
        this._preferences[key] = value;
        return this;
    }
    
    getPreference(key) {
        return this._preferences[key];
    }
}

// Test user validation
const user = new User('john_doe', 'john@example.com', 'MyPassword123');

console.log('Username:', user.username);
console.log('Email:', user.email);
console.log('Password strength:', user.passwordStrength);

user.setPreference('theme', 'dark')
    .setPreference('notifications', true);

console.log('Preferences:', user.preferences);

// Test validation errors
try {
    user.username = 'ab'; // Too short
} catch (error) {
    console.error('Username error:', error.message);
}

try {
    user.email = 'invalid-email'; // Invalid format
} catch (error) {
    console.error('Email error:', error.message);
}

// Proxy-based Getters and Setters
console.log('\\n=== Proxy-based Properties ===');

function createValidatedObject(schema) {
    const data = {};
    
    return new Proxy(data, {
        get(target, property) {
            if (property.startsWith('_')) {
                throw new Error('Cannot access private property: ' + property);
            }
            
            const schemaProperty = schema[property];
            if (schemaProperty && schemaProperty.computed) {
                return schemaProperty.computed(target);
            }
            
            return target[property];
        },
        
        set(target, property, value) {
            if (property.startsWith('_')) {
                throw new Error('Cannot set private property: ' + property);
            }
            
            const schemaProperty = schema[property];
            if (schemaProperty) {
                // Type validation
                if (schemaProperty.type && typeof value !== schemaProperty.type) {
                    throw new Error(property + ' must be of type ' + schemaProperty.type);
                }
                
                // Custom validation
                if (schemaProperty.validate && !schemaProperty.validate(value)) {
                    throw new Error('Validation failed for ' + property);
                }
                
                // Transform value
                if (schemaProperty.transform) {
                    value = schemaProperty.transform(value);
                }
            }
            
            target[property] = value;
            return true;
        }
    });
}

// Create a validated person object
const personSchema = {
    name: {
        type: 'string',
        validate: (value) => value.length > 0,
        transform: (value) => value.trim()
    },
    age: {
        type: 'number',
        validate: (value) => value >= 0 && value <= 150
    },
    email: {
        type: 'string',
        validate: (value) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value),
        transform: (value) => value.toLowerCase()
    },
    fullInfo: {
        computed: (data) => data.name + ' (' + data.age + ') - ' + data.email
    }
};

const validatedPerson = createValidatedObject(personSchema);

// Test proxy-based validation
try {
    validatedPerson.name = '  Alice Smith  ';
    validatedPerson.age = 28;
    validatedPerson.email = 'ALICE@EXAMPLE.COM';
    
    console.log('Name:', validatedPerson.name);
    console.log('Age:', validatedPerson.age);
    console.log('Email:', validatedPerson.email);
    console.log('Full info:', validatedPerson.fullInfo);
} catch (error) {
    console.error('Proxy validation error:', error.message);
}

// Test invalid values
try {
    validatedPerson.age = -5; // Should fail validation
} catch (error) {
    console.error('Age validation error:', error.message);
}

try {
    validatedPerson._secret = 'hidden'; // Should fail private property access
} catch (error) {
    console.error('Private property error:', error.message);
}

console.log('\\nGetters and setters examples completed');`,

  exercises: [
    {
      question: "Create a Temperature class with Celsius and Fahrenheit properties that automatically convert between scales:",
      solution: `class Temperature {
  constructor(celsius = 0) {
    this._celsius = celsius;
  }
  
  // Celsius getter and setter
  get celsius() {
    return this._celsius;
  }
  
  set celsius(value) {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error('Temperature must be a valid number');
    }
    
    if (value < -273.15) {
      throw new Error('Temperature cannot be below absolute zero (-273.15°C)');
    }
    
    this._celsius = value;
  }
  
  // Fahrenheit getter and setter (computed property)
  get fahrenheit() {
    return (this._celsius * 9/5) + 32;
  }
  
  set fahrenheit(value) {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error('Temperature must be a valid number');
    }
    
    const celsiusValue = (value - 32) * 5/9;
    if (celsiusValue < -273.15) {
      throw new Error('Temperature cannot be below absolute zero');
    }
    
    this._celsius = celsiusValue;
  }
  
  // Kelvin getter and setter (computed property)
  get kelvin() {
    return this._celsius + 273.15;
  }
  
  set kelvin(value) {
    if (typeof value !== 'number' || isNaN(value)) {
      throw new Error('Temperature must be a valid number');
    }
    
    if (value < 0) {
      throw new Error('Kelvin temperature cannot be negative');
    }
    
    this._celsius = value - 273.15;
  }
  
  // Formatted display properties
  get display() {
    return {
      celsius: this._celsius.toFixed(1) + '°C',
      fahrenheit: this.fahrenheit.toFixed(1) + '°F',
      kelvin: this.kelvin.toFixed(1) + 'K'
    };
  }
  
  toString() {
    return \`\${this._celsius.toFixed(1)}°C (\${this.fahrenheit.toFixed(1)}°F)\`;
  }
}

// Usage:
const temp = new Temperature(0); // Start at 0°C (freezing point of water)
console.log('Water freezing point:', temp.display);

temp.fahrenheit = 212; // Set to boiling point of water in Fahrenheit
console.log('Water boiling point:', temp.display);

temp.kelvin = 0; // Set to absolute zero
console.log('Absolute zero:', temp.display);`,
      explanation: "This Temperature class demonstrates computed properties where Fahrenheit and Kelvin are automatically calculated from the stored Celsius value, with validation ensuring physically impossible temperatures are rejected."
    }
  ],

  quiz: [
    {
      question: "What is the main advantage of using getters and setters over direct property access?",
      options: [
        "They make properties faster to access",
        "They provide validation, transformation, and computed properties",
        "They use less memory than regular properties",
        "They are required by JavaScript"
      ],
      correct: 1,
      explanation: "Getters and setters provide controlled access to properties, allowing for validation, data transformation, computed properties, and encapsulation while maintaining a simple property-like interface."
    }
  ],

  resources: [
    {
      title: "MDN - get",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get"
    },
    {
      title: "MDN - set",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set"
    },
    {
      title: "MDN - Object.defineProperty()",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty"
    }
  ],

  nextModules: ['private-fields', 'static-methods', 'inheritance'],
  prerequisites: ['es6-classes', 'objects-basics', 'functions-basics']
};