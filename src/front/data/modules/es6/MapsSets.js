// src/front/data/modules/es6/MapsSets.js
export default {
  title: 'Maps and Sets',
  duration: '35 min',
  difficulty: 'Intermediate',
  overview: 'Master ES6 Maps and Sets for advanced data structures. Learn when to use them over objects and arrays, and explore their unique capabilities.',
  
  keyPoints: [
    'Maps allow any type of keys, not just strings',
    'Sets store unique values of any type',
    'Both are iterable and have size property',
    'Maps maintain insertion order',
    'WeakMap and WeakSet for memory efficiency',
    'Better performance for frequent additions/deletions'
  ],

  example: `// Map Basics
console.log('=== Map Basics ===');

// Creating Maps
const basicMap = new Map();
const mapWithEntries = new Map([
    ['name', 'Alice'],
    ['age', 30],
    ['city', 'New York']
]);

console.log('Empty map size:', basicMap.size);
console.log('Initialized map size:', mapWithEntries.size);

// Setting and getting values
basicMap.set('language', 'JavaScript');
basicMap.set('year', 2024);
basicMap.set('isAwesome', true);

console.log('Get language:', basicMap.get('language'));
console.log('Get year:', basicMap.get('year'));
console.log('Get non-existent:', basicMap.get('missing')); // undefined

// Check if key exists
console.log('Has language:', basicMap.has('language'));
console.log('Has missing:', basicMap.has('missing'));

// Maps with Different Key Types
console.log('\\n=== Maps with Different Key Types ===');

const mixedKeysMap = new Map();

// String keys
mixedKeysMap.set('stringKey', 'String value');

// Number keys
mixedKeysMap.set(42, 'Number key value');

// Boolean keys
mixedKeysMap.set(true, 'Boolean key value');

// Object keys
const objKey = { id: 1 };
mixedKeysMap.set(objKey, 'Object key value');

// Function keys
const fnKey = function() { return 'hello'; };
mixedKeysMap.set(fnKey, 'Function key value');

// Array keys
const arrKey = [1, 2, 3];
mixedKeysMap.set(arrKey, 'Array key value');

console.log('String key:', mixedKeysMap.get('stringKey'));
console.log('Number key:', mixedKeysMap.get(42));
console.log('Object key:', mixedKeysMap.get(objKey));
console.log('Function key:', mixedKeysMap.get(fnKey));
console.log('Array key:', mixedKeysMap.get(arrKey));

// Key identity matters for objects
const similarObj = { id: 1 };
console.log('Similar object key:', mixedKeysMap.get(similarObj)); // undefined

// Map Iteration
console.log('\\n=== Map Iteration ===');

const iterationMap = new Map([
    ['first', 1],
    ['second', 2],
    ['third', 3]
]);

// Iterate over keys
console.log('Keys:');
for (const key of iterationMap.keys()) {
    console.log('  ', key);
}

// Iterate over values
console.log('Values:');
for (const value of iterationMap.values()) {
    console.log('  ', value);
}

// Iterate over entries
console.log('Entries:');
for (const [key, value] of iterationMap.entries()) {
    console.log(\`  \${key}: \${value}\`);
}

// Direct iteration (same as entries())
console.log('Direct iteration:');
for (const [key, value] of iterationMap) {
    console.log(\`  \${key} = \${value}\`);
}

// Using forEach
console.log('Using forEach:');
iterationMap.forEach((value, key, map) => {
    console.log(\`  \${key} -> \${value} (map size: \${map.size})\`);
});

// Map Methods
console.log('\\n=== Map Methods ===');

const methodsMap = new Map([
    ['a', 1],
    ['b', 2],
    ['c', 3]
]);

console.log('Initial map:', Array.from(methodsMap));

// Delete a key
methodsMap.delete('b');
console.log('After deleting "b":', Array.from(methodsMap));

// Clear all entries
const copyMap = new Map(methodsMap);
copyMap.clear();
console.log('After clear:', copyMap.size);

// Convert to array
const mapArray = Array.from(methodsMap);
console.log('Map as array:', mapArray);

// Convert from array
const arrayToMap = new Map(mapArray);
console.log('Array back to map:', Array.from(arrayToMap));

// Set Basics
console.log('\\n=== Set Basics ===');

// Creating Sets
const basicSet = new Set();
const setWithValues = new Set([1, 2, 3, 4, 5]);

console.log('Empty set size:', basicSet.size);
console.log('Initialized set size:', setWithValues.size);

// Adding values
basicSet.add('apple');
basicSet.add('banana');
basicSet.add('orange');
basicSet.add('apple'); // Duplicate - won't be added

console.log('Set after adding:', Array.from(basicSet));
console.log('Set size:', basicSet.size);

// Check if value exists
console.log('Has apple:', basicSet.has('apple'));
console.log('Has grape:', basicSet.has('grape'));

// Set with Different Types
console.log('\\n=== Set with Different Types ===');

const mixedSet = new Set();

mixedSet.add('string');
mixedSet.add(42);
mixedSet.add(true);
mixedSet.add({ id: 1 });
mixedSet.add([1, 2, 3]);
mixedSet.add(function() {});

console.log('Mixed set size:', mixedSet.size);
console.log('Mixed set values:');
for (const value of mixedSet) {
    console.log('  ', typeof value, ':', value);
}

// Object uniqueness in Set
const obj1 = { name: 'Alice' };
const obj2 = { name: 'Alice' }; // Different object, same content
const objectSet = new Set([obj1, obj2, obj1]);

console.log('Object set size:', objectSet.size); // 2, not 1

// Set Operations
console.log('\\n=== Set Operations ===');

const set1 = new Set([1, 2, 3, 4, 5]);
const set2 = new Set([4, 5, 6, 7, 8]);

// Union (combine sets)
const union = new Set([...set1, ...set2]);
console.log('Union:', Array.from(union));

// Intersection (common elements)
const intersection = new Set([...set1].filter(x => set2.has(x)));
console.log('Intersection:', Array.from(intersection));

// Difference (elements in set1 but not in set2)
const difference = new Set([...set1].filter(x => !set2.has(x)));
console.log('Difference (set1 - set2):', Array.from(difference));

// Symmetric difference (elements in either set, but not both)
const symmetricDiff = new Set([
    ...[...set1].filter(x => !set2.has(x)),
    ...[...set2].filter(x => !set1.has(x))
]);
console.log('Symmetric difference:', Array.from(symmetricDiff));

// Subset check
const isSubset = (subset, superset) => {
    for (const item of subset) {
        if (!superset.has(item)) return false;
    }
    return true;
};

const smallSet = new Set([1, 2]);
console.log('Is [1, 2] subset of set1?', isSubset(smallSet, set1));

// Set Iteration
console.log('\\n=== Set Iteration ===');

const iterationSet = new Set(['red', 'green', 'blue']);

// Values and keys are the same for Sets
console.log('Values:');
for (const value of iterationSet.values()) {
    console.log('  ', value);
}

console.log('Keys (same as values):');
for (const key of iterationSet.keys()) {
    console.log('  ', key);
}

console.log('Entries:');
for (const [key, value] of iterationSet.entries()) {
    console.log(\`  \${key}: \${value}\`); // key === value for Sets
}

// Using forEach
iterationSet.forEach((value1, value2, set) => {
    console.log(\`forEach: \${value1} (value2: \${value2}, size: \${set.size})\`);
});

// Practical Examples
console.log('\\n=== Practical Examples ===');

// 1. User Role Management with Map
class UserRoleManager {
    constructor() {
        this.userRoles = new Map();
        this.permissions = new Map([
            ['admin', new Set(['read', 'write', 'delete', 'manage'])],
            ['editor', new Set(['read', 'write'])],
            ['viewer', new Set(['read'])]
        ]);
    }
    
    addUser(userId, role) {
        if (!this.permissions.has(role)) {
            throw new Error(\`Invalid role: \${role}\`);
        }
        this.userRoles.set(userId, role);
    }
    
    getUserRole(userId) {
        return this.userRoles.get(userId);
    }
    
    getUserPermissions(userId) {
        const role = this.userRoles.get(userId);
        return role ? this.permissions.get(role) : new Set();
    }
    
    hasPermission(userId, permission) {
        const permissions = this.getUserPermissions(userId);
        return permissions.has(permission);
    }
    
    getAllUsers() {
        return Array.from(this.userRoles.keys());
    }
    
    getUsersByRole(role) {
        const users = [];
        for (const [userId, userRole] of this.userRoles) {
            if (userRole === role) {
                users.push(userId);
            }
        }
        return users;
    }
}

const roleManager = new UserRoleManager();
roleManager.addUser('user1', 'admin');
roleManager.addUser('user2', 'editor');
roleManager.addUser('user3', 'viewer');

console.log('User1 role:', roleManager.getUserRole('user1'));
console.log('User1 permissions:', Array.from(roleManager.getUserPermissions('user1')));
console.log('User2 can write:', roleManager.hasPermission('user2', 'write'));
console.log('User3 can delete:', roleManager.hasPermission('user3', 'delete'));
console.log('All editors:', roleManager.getUsersByRole('editor'));

// 2. Unique Visitor Tracking with Set
class VisitorTracker {
    constructor() {
        this.visitors = new Set();
        this.dailyVisitors = new Map();
    }
    
    recordVisit(userId, date = new Date().toDateString()) {
        this.visitors.add(userId);
        
        if (!this.dailyVisitors.has(date)) {
            this.dailyVisitors.set(date, new Set());
        }
        
        this.dailyVisitors.get(date).add(userId);
    }
    
    getTotalUniqueVisitors() {
        return this.visitors.size;
    }
    
    getDailyUniqueVisitors(date) {
        const dayVisitors = this.dailyVisitors.get(date);
        return dayVisitors ? dayVisitors.size : 0;
    }
    
    isFirstTimeVisitor(userId) {
        return !this.visitors.has(userId);
    }
    
    getVisitorsByDate(date) {
        const dayVisitors = this.dailyVisitors.get(date);
        return dayVisitors ? Array.from(dayVisitors) : [];
    }
}

const tracker = new VisitorTracker();
const today = new Date().toDateString();

tracker.recordVisit('user1', today);
tracker.recordVisit('user2', today);
tracker.recordVisit('user1', today); // Duplicate visit
tracker.recordVisit('user3', today);

console.log('Total unique visitors:', tracker.getTotalUniqueVisitors());
console.log('Today\\'s unique visitors:', tracker.getDailyUniqueVisitors(today));
console.log('Is user4 first time?', tracker.isFirstTimeVisitor('user4'));

// 3. Cache with Map
class LRUCache {
    constructor(maxSize = 10) {
        this.maxSize = maxSize;
        this.cache = new Map();
    }
    
    get(key) {
        if (this.cache.has(key)) {
            // Move to end (most recently used)
            const value = this.cache.get(key);
            this.cache.delete(key);
            this.cache.set(key, value);
            return value;
        }
        return null;
    }
    
    set(key, value) {
        if (this.cache.has(key)) {
            // Update existing
            this.cache.delete(key);
        } else if (this.cache.size >= this.maxSize) {
            // Remove least recently used (first item)
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        this.cache.set(key, value);
    }
    
    size() {
        return this.cache.size;
    }
    
    keys() {
        return Array.from(this.cache.keys());
    }
}

const lruCache = new LRUCache(3);
lruCache.set('a', 1);
lruCache.set('b', 2);
lruCache.set('c', 3);

console.log('Cache keys:', lruCache.keys()); // ['a', 'b', 'c']

lruCache.get('a'); // Move 'a' to end
console.log('After accessing a:', lruCache.keys()); // ['b', 'c', 'a']

lruCache.set('d', 4); // Should remove 'b'
console.log('After adding d:', lruCache.keys()); // ['c', 'a', 'd']

// WeakMap and WeakSet
console.log('\\n=== WeakMap and WeakSet ===');

// WeakMap - keys must be objects, no iteration
const weakMap = new WeakMap();

const obj1Weak = { name: 'Alice' };
const obj2Weak = { name: 'Bob' };

weakMap.set(obj1Weak, 'Alice data');
weakMap.set(obj2Weak, 'Bob data');

console.log('WeakMap get obj1:', weakMap.get(obj1Weak));
console.log('WeakMap has obj1:', weakMap.has(obj1Weak));

// WeakMap for private data
class User {
    constructor(name, email) {
        this.name = name;
        User.privateData.set(this, { email, id: Math.random() });
    }
    
    getEmail() {
        return User.privateData.get(this).email;
    }
    
    getId() {
        return User.privateData.get(this).id;
    }
}

User.privateData = new WeakMap();

const user1 = new User('Alice', 'alice@example.com');
const user2 = new User('Bob', 'bob@example.com');

console.log('User1 email:', user1.getEmail());
console.log('User1 ID:', user1.getId());

// Private data is not accessible directly
console.log('Direct access to private data:', User.privateData.get(user1));

// WeakSet - only objects, no iteration
const weakSet = new WeakSet();

const obj1WeakSet = { id: 1 };
const obj2WeakSet = { id: 2 };

weakSet.add(obj1WeakSet);
weakSet.add(obj2WeakSet);

console.log('WeakSet has obj1:', weakSet.has(obj1WeakSet));
console.log('WeakSet has obj2:', weakSet.has(obj2WeakSet));

// WeakSet for tracking
class ElementTracker {
    constructor() {
        this.trackedElements = new WeakSet();
    }
    
    track(element) {
        this.trackedElements.add(element);
        console.log('Element tracked');
    }
    
    isTracked(element) {
        return this.trackedElements.has(element);
    }
    
    untrack(element) {
        return this.trackedElements.delete(element);
    }
}

const elementTracker = new ElementTracker();
const element1 = { type: 'div', id: 'test1' };
const element2 = { type: 'span', id: 'test2' };

elementTracker.track(element1);
console.log('Element1 tracked:', elementTracker.isTracked(element1));
console.log('Element2 tracked:', elementTracker.isTracked(element2));

// Performance Comparison
console.log('\\n=== Performance Comparison ===');

// Map vs Object performance
function compareMapVsObject() {
    const iterations = 100000;
    
    // Object performance
    console.time('Object operations');
    const obj = {};
    for (let i = 0; i < iterations; i++) {
        obj[i] = i;
    }
    for (let i = 0; i < iterations; i++) {
        const value = obj[i];
    }
    for (let i = 0; i < iterations; i++) {
        delete obj[i];
    }
    console.timeEnd('Object operations');
    
    // Map performance
    console.time('Map operations');
    const map = new Map();
    for (let i = 0; i < iterations; i++) {
        map.set(i, i);
    }
    for (let i = 0; i < iterations; i++) {
        const value = map.get(i);
    }
    for (let i = 0; i < iterations; i++) {
        map.delete(i);
    }
    console.timeEnd('Map operations');
}

compareMapVsObject();

// Set vs Array performance for uniqueness
function compareSetVsArray() {
    const items = Array.from({ length: 10000 }, (_, i) => i % 1000);
    
    console.time('Array unique filter');
    const uniqueArray = items.filter((item, index) => items.indexOf(item) === index);
    console.timeEnd('Array unique filter');
    
    console.time('Set unique');
    const uniqueSet = Array.from(new Set(items));
    console.timeEnd('Set unique');
    
    console.log('Array result length:', uniqueArray.length);
    console.log('Set result length:', uniqueSet.length);
}

compareSetVsArray();

// Map vs Object for Non-String Keys
console.log('\\n=== Map vs Object for Non-String Keys ===');

// Object converts all keys to strings
const objectWithKeys = {};
objectWithKeys[1] = 'number key';
objectWithKeys['1'] = 'string key';
objectWithKeys[true] = 'boolean key';

console.log('Object keys:');
console.log('  objectWithKeys[1]:', objectWithKeys[1]);
console.log('  objectWithKeys["1"]:', objectWithKeys["1"]);
console.log('  objectWithKeys[true]:', objectWithKeys[true]);
console.log('  Object.keys():', Object.keys(objectWithKeys));

// Map preserves key types
const mapWithKeys = new Map();
mapWithKeys.set(1, 'number key');
mapWithKeys.set('1', 'string key');
mapWithKeys.set(true, 'boolean key');

console.log('Map keys:');
console.log('  mapWithKeys.get(1):', mapWithKeys.get(1));
console.log('  mapWithKeys.get("1"):', mapWithKeys.get("1"));
console.log('  mapWithKeys.get(true):', mapWithKeys.get(true));
console.log('  Map keys types:', Array.from(mapWithKeys.keys()).map(k => typeof k));

// When to Use Maps vs Objects
console.log('\\n=== When to Use Maps vs Objects ===');

console.log('Use Map when:');
console.log('  ✅ Keys are not strings/symbols');
console.log('  ✅ Need to maintain insertion order');
console.log('  ✅ Frequent additions/deletions');
console.log('  ✅ Need to know the size easily');
console.log('  ✅ Need to iterate over key-value pairs');

console.log('\\nUse Object when:');
console.log('  ✅ Keys are strings/symbols');
console.log('  ✅ Need JSON serialization');
console.log('  ✅ Need property access with dot notation');
console.log('  ✅ Adding methods/functions as properties');
console.log('  ✅ Working with existing APIs that expect objects');

// When to Use Sets vs Arrays
console.log('\\nUse Set when:');
console.log('  ✅ Need unique values only');
console.log('  ✅ Frequent addition/removal of values');
console.log('  ✅ Need to check if value exists quickly');
console.log('  ✅ Set operations (union, intersection, difference)');

console.log('\\nUse Array when:');
console.log('  ✅ Need indexed access');
console.log('  ✅ Order matters and duplicates are allowed');
console.log('  ✅ Need array methods (map, filter, reduce)');
console.log('  ✅ JSON serialization required');

console.log('\\nMaps and Sets examples completed');`,

  exercises: [
    {
      question: "Create a social network friend system using Maps and Sets to track relationships:",
      solution: `class SocialNetwork {
  constructor() {
    this.users = new Map(); // userId -> user data
    this.friends = new Map(); // userId -> Set of friend IDs
    this.friendRequests = new Map(); // userId -> Set of pending request IDs
  }
  
  addUser(userId, userData) {
    if (this.users.has(userId)) {
      throw new Error('User already exists');
    }
    
    this.users.set(userId, userData);
    this.friends.set(userId, new Set());
    this.friendRequests.set(userId, new Set());
  }
  
  sendFriendRequest(fromUserId, toUserId) {
    if (!this.users.has(fromUserId) || !this.users.has(toUserId)) {
      throw new Error('User not found');
    }
    
    if (this.areFriends(fromUserId, toUserId)) {
      throw new Error('Already friends');
    }
    
    this.friendRequests.get(toUserId).add(fromUserId);
  }
  
  acceptFriendRequest(userId, requesterId) {
    const requests = this.friendRequests.get(userId);
    
    if (!requests.has(requesterId)) {
      throw new Error('No friend request found');
    }
    
    // Add to friends
    this.friends.get(userId).add(requesterId);
    this.friends.get(requesterId).add(userId);
    
    // Remove request
    requests.delete(requesterId);
  }
  
  areFriends(userId1, userId2) {
    return this.friends.get(userId1)?.has(userId2) || false;
  }
  
  getFriends(userId) {
    return Array.from(this.friends.get(userId) || []);
  }
  
  getMutualFriends(userId1, userId2) {
    const friends1 = this.friends.get(userId1);
    const friends2 = this.friends.get(userId2);
    
    if (!friends1 || !friends2) return [];
    
    return Array.from(friends1).filter(id => friends2.has(id));
  }
  
  getFriendSuggestions(userId, maxSuggestions = 5) {
    const userFriends = this.friends.get(userId);
    const suggestions = new Map(); // suggestionId -> mutual count
    
    // Count mutual friends for each potential suggestion
    for (const friendId of userFriends) {
      const friendsFriends = this.friends.get(friendId);
      
      for (const suggestionId of friendsFriends) {
        if (suggestionId !== userId && !userFriends.has(suggestionId)) {
          suggestions.set(suggestionId, 
            (suggestions.get(suggestionId) || 0) + 1);
        }
      }
    }
    
    // Sort by mutual friend count and return top suggestions
    return Array.from(suggestions.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxSuggestions)
      .map(([userId, mutualCount]) => ({ userId, mutualCount }));
  }
}`,
      explanation: "This system uses Maps for user data and Sets for relationships, efficiently handling friend connections, requests, and social features like mutual friends and suggestions."
    }
  ],

  quiz: [
    {
      question: "What's the main difference between Map and WeakMap?",
      options: [
        "Map allows any keys, WeakMap only allows strings",
        "Map is iterable, WeakMap is not and allows garbage collection",
        "Map is faster than WeakMap",
        "Map has a size property, WeakMap doesn't"
      ],
      correct: 1,
      explanation: "WeakMap only accepts objects as keys, is not iterable, and allows its keys to be garbage collected when no other references exist. This makes it ideal for private data storage."
    }
  ],

  resources: [
    {
      title: "MDN - Map",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map"
    },
    {
      title: "MDN - Set", 
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set"
    }
  ],

  nextModules: ['symbols', 'modules'],
  prerequisites: ['objects', 'arrays', 'iteration']
};