// src/front/data/modules/dom/BrowserStorage.js
export default {
  title: 'Browser Storage',
  duration: '35 min',
  difficulty: 'Intermediate',
  overview: 'Master browser storage mechanisms including localStorage, sessionStorage, cookies, and IndexedDB. Learn when and how to use each storage type effectively.',
  
  keyPoints: [
    'localStorage persists across browser sessions',
    'sessionStorage lasts only for the session',
    'Cookies are sent with HTTP requests',
    'IndexedDB for large amounts of structured data',
    'Storage events for cross-tab communication',
    'Security considerations and storage limits'
  ],

  example: `// LocalStorage Basics
console.log('=== LocalStorage Basics ===');

// Check if localStorage is supported
if (typeof Storage !== 'undefined' && localStorage) {
    console.log('✅ localStorage is supported');
    
    // Basic operations
    localStorage.setItem('username', 'john_doe');
    localStorage.setItem('theme', 'dark');
    localStorage.setItem('lastLogin', new Date().toISOString());
    
    // Retrieve items
    const username = localStorage.getItem('username');
    const theme = localStorage.getItem('theme');
    const lastLogin = localStorage.getItem('lastLogin');
    
    console.log('Retrieved from localStorage:', { username, theme, lastLogin });
    
    // Check if item exists
    if (localStorage.getItem('nonexistent') === null) {
        console.log('Item does not exist in localStorage');
    }
    
    // Get all localStorage keys
    console.log('All localStorage keys:');
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(\`  \${key}: \${value}\`);
    }
    
    // Remove specific item
    localStorage.removeItem('lastLogin');
    console.log('After removing lastLogin:', localStorage.getItem('lastLogin'));
    
} else {
    console.log('❌ localStorage is not supported');
}

// Working with Objects in LocalStorage
console.log('\\n=== Objects in LocalStorage ===');

const userPreferences = {
    theme: 'dark',
    language: 'en',
    notifications: true,
    layout: {
        sidebar: 'collapsed',
        fontSize: 'medium'
    }
};

// Store object (must stringify)
localStorage.setItem('userPreferences', JSON.stringify(userPreferences));

// Retrieve and parse object
const storedPreferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');
console.log('Stored preferences:', storedPreferences);

// Safe JSON parsing function
function safeJSONParse(jsonString, defaultValue = null) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error('JSON parse error:', error);
        return defaultValue;
    }
}

// Example with error handling
const invalidJSON = localStorage.getItem('invalidItem');
const parsedInvalid = safeJSONParse(invalidJSON, { default: true });
console.log('Safe parsed result:', parsedInvalid);

// SessionStorage
console.log('\\n=== SessionStorage ===');

if (typeof sessionStorage !== 'undefined') {
    console.log('✅ sessionStorage is supported');
    
    // SessionStorage has the same API as localStorage
    sessionStorage.setItem('sessionData', 'This will be cleared when tab closes');
    sessionStorage.setItem('tempSettings', JSON.stringify({
        scrollPosition: 150,
        activeTab: 'overview',
        formData: {
            name: 'Draft Name',
            email: 'draft@example.com'
        }
    }));
    
    console.log('Session data:', sessionStorage.getItem('sessionData'));
    
    const tempSettings = JSON.parse(sessionStorage.getItem('tempSettings') || '{}');
    console.log('Temporary settings:', tempSettings);
    
    // Clear all session storage
    // sessionStorage.clear(); // Uncomment to clear all
}

// Storage Wrapper Class
console.log('\\n=== Storage Wrapper Class ===');

class StorageManager {
    constructor(storageType = 'localStorage') {
        this.storage = storageType === 'sessionStorage' ? sessionStorage : localStorage;
        this.prefix = 'app_';
    }
    
    // Set item with optional expiration
    set(key, value, expirationHours = null) {
        const item = {
            value: value,
            timestamp: Date.now(),
            expiration: expirationHours ? Date.now() + (expirationHours * 60 * 60 * 1000) : null
        };
        
        try {
            this.storage.setItem(this.prefix + key, JSON.stringify(item));
            return true;
        } catch (error) {
            console.error('Storage set error:', error);
            return false;
        }
    }
    
    // Get item with expiration check
    get(key, defaultValue = null) {
        try {
            const item = this.storage.getItem(this.prefix + key);
            if (!item) return defaultValue;
            
            const parsed = JSON.parse(item);
            
            // Check expiration
            if (parsed.expiration && Date.now() > parsed.expiration) {
                this.remove(key);
                return defaultValue;
            }
            
            return parsed.value;
        } catch (error) {
            console.error('Storage get error:', error);
            return defaultValue;
        }
    }
    
    // Remove item
    remove(key) {
        try {
            this.storage.removeItem(this.prefix + key);
            return true;
        } catch (error) {
            console.error('Storage remove error:', error);
            return false;
        }
    }
    
    // Check if item exists and is not expired
    has(key) {
        return this.get(key) !== null;
    }
    
    // Get all keys with prefix
    keys() {
        const keys = [];
        for (let i = 0; i < this.storage.length; i++) {
            const key = this.storage.key(i);
            if (key && key.startsWith(this.prefix)) {
                keys.push(key.substring(this.prefix.length));
            }
        }
        return keys;
    }
    
    // Clear all prefixed items
    clear() {
        const keys = this.keys();
        keys.forEach(key => this.remove(key));
    }
    
    // Get storage size (approximate)
    getSize() {
        let size = 0;
        for (let i = 0; i < this.storage.length; i++) {
            const key = this.storage.key(i);
            if (key && key.startsWith(this.prefix)) {
                size += key.length + (this.storage.getItem(key) || '').length;
            }
        }
        return size;
    }
}

// Using the storage manager
const storage = new StorageManager('localStorage');

storage.set('user', { id: 1, name: 'Alice' });
storage.set('tempData', 'This expires in 1 hour', 1);

console.log('User from storage:', storage.get('user'));
console.log('Temp data:', storage.get('tempData'));
console.log('All keys:', storage.keys());
console.log('Storage size:', storage.getSize(), 'characters');

// Cookies
console.log('\\n=== Cookies ===');

class CookieManager {
    // Set cookie with options
    static set(name, value, options = {}) {
        let cookieString = \`\${encodeURIComponent(name)}=\${encodeURIComponent(value)}\`;
        
        if (options.expires) {
            if (options.expires instanceof Date) {
                cookieString += \`; expires=\${options.expires.toUTCString()}\`;
            } else if (typeof options.expires === 'number') {
                // Expires in days
                const date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
                cookieString += \`; expires=\${date.toUTCString()}\`;
            }
        }
        
        if (options.maxAge) {
            cookieString += \`; max-age=\${options.maxAge}\`;
        }
        
        if (options.domain) {
            cookieString += \`; domain=\${options.domain}\`;
        }
        
        if (options.path) {
            cookieString += \`; path=\${options.path}\`;
        }
        
        if (options.secure) {
            cookieString += '; secure';
        }
        
        if (options.httpOnly) {
            cookieString += '; httpOnly';
        }
        
        if (options.sameSite) {
            cookieString += \`; samesite=\${options.sameSite}\`;
        }
        
        document.cookie = cookieString;
    }
    
    // Get cookie value
    static get(name) {
        const nameEQ = encodeURIComponent(name) + '=';
        const cookies = document.cookie.split(';');
        
        for (let cookie of cookies) {
            let c = cookie.trim();
            if (c.indexOf(nameEQ) === 0) {
                return decodeURIComponent(c.substring(nameEQ.length));
            }
        }
        
        return null;
    }
    
    // Remove cookie
    static remove(name, options = {}) {
        this.set(name, '', {
            ...options,
            expires: new Date(0)
        });
    }
    
    // Get all cookies as object
    static getAll() {
        const cookies = {};
        
        if (document.cookie) {
            document.cookie.split(';').forEach(cookie => {
                const [name, value] = cookie.trim().split('=');
                if (name && value) {
                    cookies[decodeURIComponent(name)] = decodeURIComponent(value);
                }
            });
        }
        
        return cookies;
    }
    
    // Check if cookies are enabled
    static isEnabled() {
        try {
            const testCookie = 'test_cookie';
            this.set(testCookie, 'test');
            const enabled = this.get(testCookie) === 'test';
            this.remove(testCookie);
            return enabled;
        } catch (error) {
            return false;
        }
    }
}

// Using cookies
if (CookieManager.isEnabled()) {
    console.log('✅ Cookies are enabled');
    
    // Set various cookies
    CookieManager.set('session_id', 'abc123', { expires: 1, path: '/' });
    CookieManager.set('preferences', JSON.stringify({ theme: 'dark' }), { expires: 30 });
    CookieManager.set('temp_cookie', 'temporary', { maxAge: 3600 }); // 1 hour
    
    console.log('Session ID:', CookieManager.get('session_id'));
    console.log('All cookies:', CookieManager.getAll());
    
    // Remove cookie
    CookieManager.remove('temp_cookie');
    console.log('After removing temp_cookie:', CookieManager.get('temp_cookie'));
} else {
    console.log('❌ Cookies are disabled');
}

// Storage Events (Cross-tab Communication)
console.log('\\n=== Storage Events ===');

// Listen for storage changes from other tabs
if (typeof window !== 'undefined') {
    window.addEventListener('storage', function(event) {
        console.log('Storage event detected:', {
            key: event.key,
            oldValue: event.oldValue,
            newValue: event.newValue,
            storageArea: event.storageArea === localStorage ? 'localStorage' : 'sessionStorage',
            url: event.url
        });
    });
    
    // Example: Sync user preferences across tabs
    function syncUserPreferences() {
        const preferences = {
            theme: 'light',
            language: 'es',
            lastSync: Date.now()
        };
        
        localStorage.setItem('sync_preferences', JSON.stringify(preferences));
        console.log('Preferences synced - check other tabs!');
    }
    
    // Uncomment to test cross-tab sync
    // setTimeout(syncUserPreferences, 2000);
}

// IndexedDB Basics
console.log('\\n=== IndexedDB Basics ===');

class IndexedDBManager {
    constructor(dbName, version = 1) {
        this.dbName = dbName;
        this.version = version;
        this.db = null;
    }
    
    // Initialize database
    async init(schema) {
        return new Promise((resolve, reject) => {
            if (!window.indexedDB) {
                reject(new Error('IndexedDB not supported'));
                return;
            }
            
            const request = indexedDB.open(this.dbName, this.version);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve(this.db);
            };
            
            request.onupgradeneeded = (event) => {
                this.db = event.target.result;
                
                // Create object stores based on schema
                Object.keys(schema).forEach(storeName => {
                    if (!this.db.objectStoreNames.contains(storeName)) {
                        const store = this.db.createObjectStore(storeName, schema[storeName]);
                        
                        // Create indexes
                        if (schema[storeName].indexes) {
                            schema[storeName].indexes.forEach(index => {
                                store.createIndex(index.name, index.keyPath, index.options || {});
                            });
                        }
                    }
                });
            };
        });
    }
    
    // Add data to object store
    async add(storeName, data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add(data);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }
    
    // Get data by key
    async get(storeName, key) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(key);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }
    
    // Get all data from store
    async getAll(storeName) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }
    
    // Update data
    async update(storeName, data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put(data);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }
    
    // Delete data by key
    async delete(storeName, key) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(key);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }
    
    // Query with index
    async queryByIndex(storeName, indexName, value) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const index = store.index(indexName);
            const request = index.getAll(value);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => resolve(request.result);
        });
    }
}

// Example usage of IndexedDB
async function demonstrateIndexedDB() {
    try {
        const dbManager = new IndexedDBManager('AppDatabase', 1);
        
        // Define schema
        const schema = {
            users: {
                keyPath: 'id',
                autoIncrement: true,
                indexes: [
                    { name: 'email', keyPath: 'email', options: { unique: true } },
                    { name: 'name', keyPath: 'name' }
                ]
            },
            posts: {
                keyPath: 'id',
                autoIncrement: true,
                indexes: [
                    { name: 'userId', keyPath: 'userId' },
                    { name: 'created', keyPath: 'createdAt' }
                ]
            }
        };
        
        // Initialize database
        await dbManager.init(schema);
        console.log('✅ IndexedDB initialized');
        
        // Add some data
        const userId1 = await dbManager.add('users', {
            name: 'Alice',
            email: 'alice@example.com',
            createdAt: new Date()
        });
        
        const userId2 = await dbManager.add('users', {
            name: 'Bob',
            email: 'bob@example.com',
            createdAt: new Date()
        });
        
        console.log('Users added with IDs:', userId1, userId2);
        
        // Add posts
        await dbManager.add('posts', {
            title: 'First Post',
            content: 'Hello IndexedDB!',
            userId: userId1,
            createdAt: new Date()
        });
        
        await dbManager.add('posts', {
            title: 'Second Post',
            content: 'IndexedDB is powerful!',
            userId: userId2,
            createdAt: new Date()
        });
        
        // Query data
        const allUsers = await dbManager.getAll('users');
        console.log('All users:', allUsers);
        
        const alicesPosts = await dbManager.queryByIndex('posts', 'userId', userId1);
        console.log('Alice\\'s posts:', alicesPosts);
        
    } catch (error) {
        console.error('IndexedDB demo error:', error);
    }
}

// Run IndexedDB demo if supported
if (typeof indexedDB !== 'undefined') {
    demonstrateIndexedDB();
} else {
    console.log('❌ IndexedDB not supported');
}

// Storage Limits and Quotas
console.log('\\n=== Storage Limits ===');

async function checkStorageQuota() {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
        try {
            const estimate = await navigator.storage.estimate();
            const usedMB = (estimate.usage / (1024 * 1024)).toFixed(2);
            const quotaMB = (estimate.quota / (1024 * 1024)).toFixed(2);
            const usagePercent = ((estimate.usage / estimate.quota) * 100).toFixed(2);
            
            console.log(\`Storage usage: \${usedMB} MB / \${quotaMB} MB (\${usagePercent}%)\`);
            
            return estimate;
        } catch (error) {
            console.error('Storage estimate error:', error);
        }
    } else {
        console.log('Storage estimation not supported');
    }
}

checkStorageQuota();

// Test storage limits
function testStorageLimits() {
    const testKey = 'storage_test';
    const chunkSize = 1024 * 1024; // 1MB chunks
    let totalStored = 0;
    
    try {
        while (true) {
            const testData = 'x'.repeat(chunkSize);
            localStorage.setItem(\`\${testKey}_\${totalStored}\`, testData);
            totalStored += chunkSize;
            
            if (totalStored > 10 * 1024 * 1024) { // Stop at 10MB for safety
                break;
            }
        }
    } catch (error) {
        console.log(\`Storage limit reached at approximately \${totalStored / (1024 * 1024)} MB\`);
        console.log('Error:', error.name);
    } finally {
        // Cleanup test data
        for (let i = 0; i < totalStored; i += chunkSize) {
            localStorage.removeItem(\`\${testKey}_\${i}\`);
        }
    }
}

// Uncomment to test storage limits (be careful!)
// testStorageLimits();

// Security Considerations
console.log('\\n=== Security Considerations ===');

class SecureStorage {
    constructor(storageType = 'localStorage') {
        this.storage = storageType === 'sessionStorage' ? sessionStorage : localStorage;
    }
    
    // Simple encryption (not for production use!)
    encrypt(data, key = 'default_key') {
        try {
            const jsonString = JSON.stringify(data);
            let encrypted = '';
            
            for (let i = 0; i < jsonString.length; i++) {
                encrypted += String.fromCharCode(
                    jsonString.charCodeAt(i) ^ key.charCodeAt(i % key.length)
                );
            }
            
            return btoa(encrypted); // Base64 encode
        } catch (error) {
            console.error('Encryption error:', error);
            return null;
        }
    }
    
    // Simple decryption (not for production use!)
    decrypt(encryptedData, key = 'default_key') {
        try {
            const encrypted = atob(encryptedData); // Base64 decode
            let decrypted = '';
            
            for (let i = 0; i < encrypted.length; i++) {
                decrypted += String.fromCharCode(
                    encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length)
                );
            }
            
            return JSON.parse(decrypted);
        } catch (error) {
            console.error('Decryption error:', error);
            return null;
        }
    }
    
    // Secure set
    setSecure(key, data, encryptionKey) {
        const encrypted = this.encrypt(data, encryptionKey);
        if (encrypted) {
            this.storage.setItem(key, encrypted);
            return true;
        }
        return false;
    }
    
    // Secure get
    getSecure(key, encryptionKey, defaultValue = null) {
        const encrypted = this.storage.getItem(key);
        if (!encrypted) return defaultValue;
        
        const decrypted = this.decrypt(encrypted, encryptionKey);
        return decrypted !== null ? decrypted : defaultValue;
    }
    
    // Validate data integrity
    setWithHash(key, data) {
        const timestamp = Date.now();
        const payload = { data, timestamp };
        const hash = this.simpleHash(JSON.stringify(payload));
        
        this.storage.setItem(key, JSON.stringify({ ...payload, hash }));
    }
    
    getWithValidation(key, maxAge = Infinity) {
        try {
            const stored = JSON.parse(this.storage.getItem(key) || '{}');
            
            if (!stored.data || !stored.timestamp || !stored.hash) {
                return null;
            }
            
            // Check age
            if (Date.now() - stored.timestamp > maxAge) {
                this.storage.removeItem(key);
                return null;
            }
            
            // Validate hash
            const expectedHash = this.simpleHash(JSON.stringify({
                data: stored.data,
                timestamp: stored.timestamp
            }));
            
            if (stored.hash !== expectedHash) {
                console.warn('Data integrity check failed for key:', key);
                this.storage.removeItem(key);
                return null;
            }
            
            return stored.data;
        } catch (error) {
            console.error('Validation error:', error);
            return null;
        }
    }
    
    // Simple hash function (not cryptographically secure!)
    simpleHash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return hash.toString(36);
    }
}

// Using secure storage
const secureStorage = new SecureStorage();

// Store encrypted data
secureStorage.setSecure('sensitive_data', {
    apiKey: 'secret123',
    userToken: 'abc456'
}, 'my_encryption_key');

// Retrieve encrypted data
const sensitiveData = secureStorage.getSecure('sensitive_data', 'my_encryption_key');
console.log('Decrypted data:', sensitiveData);

// Store with integrity check
secureStorage.setWithHash('important_data', {
    balance: 1000,
    transactions: ['tx1', 'tx2']
});

// Retrieve with validation
const importantData = secureStorage.getWithValidation('important_data');
console.log('Validated data:', importantData);

// Best Practices Summary
console.log('\\n=== Storage Best Practices ===');
console.log('✅ Use localStorage for persistent data across sessions');
console.log('✅ Use sessionStorage for temporary session data');
console.log('✅ Use cookies for server communication and small data');
console.log('✅ Use IndexedDB for large amounts of structured data');
console.log('✅ Always handle storage exceptions (quota exceeded)');
console.log('✅ Implement data expiration for cached content');
console.log('✅ Consider data encryption for sensitive information');
console.log('✅ Validate data integrity for critical information');
console.log('⚠️  Never store sensitive data like passwords in browser storage');
console.log('⚠️  Be aware of storage limits and quota management');

console.log('Browser Storage examples completed');`,

  exercises: [
    {
      question: "Create a shopping cart manager using localStorage with automatic data expiration:",
      solution: `class ShoppingCartManager {
  constructor() {
    this.storageKey = 'shopping_cart';
    this.expirationHours = 24; // Cart expires after 24 hours
  }
  
  addItem(product) {
    const cart = this.getCart();
    const existingItem = cart.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += product.quantity || 1;
    } else {
      cart.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity || 1
      });
    }
    
    this.saveCart(cart);
  }
  
  removeItem(productId) {
    const cart = this.getCart();
    cart.items = cart.items.filter(item => item.id !== productId);
    this.saveCart(cart);
  }
  
  getCart() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (!stored) return this.createEmptyCart();
      
      const cart = JSON.parse(stored);
      
      // Check expiration
      if (Date.now() > cart.expiresAt) {
        this.clearCart();
        return this.createEmptyCart();
      }
      
      return cart;
    } catch (error) {
      return this.createEmptyCart();
    }
  }
  
  saveCart(cart) {
    cart.expiresAt = Date.now() + (this.expirationHours * 60 * 60 * 1000);
    cart.updatedAt = Date.now();
    localStorage.setItem(this.storageKey, JSON.stringify(cart));
  }
  
  createEmptyCart() {
    return {
      items: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
      expiresAt: Date.now() + (this.expirationHours * 60 * 60 * 1000)
    };
  }
  
  clearCart() {
    localStorage.removeItem(this.storageKey);
  }
  
  getTotalPrice() {
    const cart = this.getCart();
    return cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }
}`,
      explanation: "This shopping cart manager automatically handles data expiration, prevents stale cart data, and provides a complete cart management API using localStorage."
    }
  ],

  quiz: [
    {
      question: "What happens when localStorage quota is exceeded?",
      options: [
        "Old data is automatically deleted",
        "A QuotaExceededError is thrown",
        "New data overwrites existing data",
        "The browser crashes"
      ],
      correct: 1,
      explanation: "When localStorage quota is exceeded, browsers throw a QuotaExceededError. Applications should handle this exception gracefully by clearing old data or notifying the user."
    }
  ],

  resources: [
    {
      title: "MDN - Web Storage API",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API"
    },
    {
      title: "MDN - IndexedDB API",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API"
    }
  ],

  nextModules: ['fetch-ajax', 'dom-traversal'],
  prerequisites: ['dom-basics', 'json', 'async-programming']
};