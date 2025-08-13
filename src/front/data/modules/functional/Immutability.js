export default {
  title: 'Immutability',
  duration: '40 min',
  difficulty: 'Advanced',
  overview: 'Master immutability principles in JavaScript. Learn to work with immutable data structures, avoid mutations, and build predictable applications through immutable patterns.',
  
  keyPoints: [
    'Immutable data cannot be changed after creation',
    'Immutability prevents bugs caused by unexpected mutations',
    'Immutable updates create new objects instead of modifying existing ones',
    'Structural sharing optimizes memory usage with immutable data',
    'Immutability enables time travel debugging and undo functionality',
    'Pure functions work best with immutable data'
  ],

  example: `// Understanding Mutability vs Immutability
console.log('=== Mutability vs Immutability ===');

// MUTABLE (AVOID) - Direct modification
const mutableArray = [1, 2, 3];
const mutableObject = { name: 'Alice', age: 25 };

console.log('Before mutation:');
console.log('Array:', mutableArray);
console.log('Object:', mutableObject);

// These operations mutate the original data
mutableArray.push(4);           // Mutates original array
mutableArray[0] = 10;           // Mutates original array
mutableObject.age = 26;         // Mutates original object
mutableObject.city = 'NYC';     // Mutates original object

console.log('After mutation (BAD):');
console.log('Array:', mutableArray);
console.log('Object:', mutableObject);

// IMMUTABLE (GOOD) - Create new data
const originalArray = [1, 2, 3];
const originalObject = { name: 'Bob', age: 30 };

console.log('\\nImmutable operations:');
console.log('Original array:', originalArray);
console.log('Original object:', originalObject);

// Immutable array operations
const newArrayWithItem = [...originalArray, 4];
const newArrayWithModification = originalArray.map((item, index) => 
    index === 0 ? 10 : item
);

// Immutable object operations
const newObjectWithAge = { ...originalObject, age: 31 };
const newObjectWithProperty = { ...originalObject, city: 'LA' };

console.log('New array with item:', newArrayWithItem);
console.log('New array with modification:', newArrayWithModification);
console.log('New object with age:', newObjectWithAge);
console.log('New object with property:', newObjectWithProperty);
console.log('Originals unchanged:', originalArray, originalObject);

// Immutable Array Operations
console.log('\\n=== Immutable Array Operations ===');

const numbers = [1, 2, 3, 4, 5];

// Immutable array utilities
const immutableArrayOps = {
    // Add items
    append: (arr, item) => [...arr, item],
    prepend: (arr, item) => [item, ...arr],
    insert: (arr, index, item) => [
        ...arr.slice(0, index),
        item,
        ...arr.slice(index)
    ],
    
    // Remove items
    removeAt: (arr, index) => [
        ...arr.slice(0, index),
        ...arr.slice(index + 1)
    ],
    removeLast: (arr) => arr.slice(0, -1),
    removeFirst: (arr) => arr.slice(1),
    filter: (arr, predicate) => arr.filter(predicate),
    
    // Update items
    updateAt: (arr, index, newValue) => 
        arr.map((item, i) => i === index ? newValue : item),
    updateWhere: (arr, predicate, updateFn) =>
        arr.map(item => predicate(item) ? updateFn(item) : item),
    
    // Transform
    map: (arr, transform) => arr.map(transform),
    sort: (arr, compareFn) => [...arr].sort(compareFn),
    reverse: (arr) => [...arr].reverse(),
    
    // Combine
    concat: (arr1, arr2) => [...arr1, ...arr2],
    merge: (...arrays) => [].concat(...arrays)
};

console.log('Original numbers:', numbers);
console.log('Append 6:', immutableArrayOps.append(numbers, 6));
console.log('Prepend 0:', immutableArrayOps.prepend(numbers, 0));
console.log('Insert 2.5 at index 2:', immutableArrayOps.insert(numbers, 2, 2.5));
console.log('Remove at index 1:', immutableArrayOps.removeAt(numbers, 1));
console.log('Update index 0 to 10:', immutableArrayOps.updateAt(numbers, 0, 10));
console.log('Double all numbers:', immutableArrayOps.map(numbers, x => x * 2));
console.log('Original unchanged:', numbers);

// Immutable Object Operations
console.log('\\n=== Immutable Object Operations ===');

const user = {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
    preferences: {
        theme: 'dark',
        notifications: true
    },
    tags: ['developer', 'javascript']
};

const immutableObjectOps = {
    // Set properties
    set: (obj, key, value) => ({ ...obj, [key]: value }),
    setMultiple: (obj, updates) => ({ ...obj, ...updates }),
    
    // Remove properties
    omit: (obj, keys) => {
        const result = { ...obj };
        keys.forEach(key => delete result[key]);
        return result;
    },
    pick: (obj, keys) => 
        keys.reduce((result, key) => {
            if (key in obj) result[key] = obj[key];
            return result;
        }, {}),
    
    // Nested updates
    setNested: (obj, path, value) => {
        const [head, ...tail] = path;
        if (tail.length === 0) {
            return { ...obj, [head]: value };
        }
        return {
            ...obj,
            [head]: immutableObjectOps.setNested(obj[head] || {}, tail, value)
        };
    },
    
    updateNested: (obj, path, updateFn) => {
        const [head, ...tail] = path;
        if (tail.length === 0) {
            return { ...obj, [head]: updateFn(obj[head]) };
        }
        return {
            ...obj,
            [head]: immutableObjectOps.updateNested(obj[head] || {}, tail, updateFn)
        };
    },
    
    // Array properties
    appendToArray: (obj, arrayKey, item) => ({
        ...obj,
        [arrayKey]: [...(obj[arrayKey] || []), item]
    }),
    
    removeFromArray: (obj, arrayKey, predicate) => ({
        ...obj,
        [arrayKey]: (obj[arrayKey] || []).filter(item => !predicate(item))
    }),
    
    updateInArray: (obj, arrayKey, predicate, updateFn) => ({
        ...obj,
        [arrayKey]: (obj[arrayKey] || []).map(item => 
            predicate(item) ? updateFn(item) : item
        )
    })
};

console.log('Original user:', user);

const updatedUser1 = immutableObjectOps.set(user, 'name', 'Alice Smith');
console.log('Updated name:', updatedUser1);

const updatedUser2 = immutableObjectOps.setMultiple(user, {
    name: 'Alice Johnson',
    age: 28
});
console.log('Multiple updates:', updatedUser2);

const updatedUser3 = immutableObjectOps.setNested(user, ['preferences', 'theme'], 'light');
console.log('Nested update:', updatedUser3);

const updatedUser4 = immutableObjectOps.appendToArray(user, 'tags', 'react');
console.log('Added tag:', updatedUser4);

const updatedUser5 = immutableObjectOps.removeFromArray(user, 'tags', tag => tag === 'javascript');
console.log('Removed tag:', updatedUser5);

console.log('Original user unchanged:', user);

// Deep Cloning for Immutability
console.log('\\n=== Deep Cloning ===');

class DeepClone {
    static clone(obj) {
        if (obj === null || typeof obj !== 'object') {
            return obj;
        }
        
        if (obj instanceof Date) {
            return new Date(obj.getTime());
        }
        
        if (obj instanceof Array) {
            return obj.map(item => DeepClone.clone(item));
        }
        
        if (typeof obj === 'object') {
            const cloned = {};
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    cloned[key] = DeepClone.clone(obj[key]);
                }
            }
            return cloned;
        }
        
        return obj;
    }
    
    static simpleClone(obj) {
        // Warning: doesn't handle functions, dates, etc.
        return JSON.parse(JSON.stringify(obj));
    }
}

const complexObject = {
    user: {
        name: 'Alice',
        preferences: {
            theme: 'dark',
            settings: {
                autoSave: true,
                notifications: ['email', 'push']
            }
        }
    },
    created: new Date(),
    data: [1, 2, { nested: true }]
};

const deepCloned = DeepClone.clone(complexObject);
console.log('Deep clone created');
console.log('Original === Clone:', complexObject === deepCloned); // false
console.log('Nested object === Clone nested:', 
    complexObject.user.preferences === deepCloned.user.preferences); // false

// Immutable State Management
console.log('\\n=== Immutable State Management ===');

class ImmutableState {
    constructor(initialState = {}) {
        this.state = initialState;
        this.history = [initialState];
        this.currentIndex = 0;
    }
    
    setState(updates) {
        if (typeof updates === 'function') {
            this.state = updates(this.state);
        } else {
            this.state = { ...this.state, ...updates };
        }
        
        // Truncate history if we're not at the end
        this.history = this.history.slice(0, this.currentIndex + 1);
        
        // Add new state to history
        this.history.push(this.state);
        this.currentIndex = this.history.length - 1;
        
        return this.state;
    }
    
    getState() {
        return this.state;
    }
    
    undo() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.state = this.history[this.currentIndex];
        }
        return this.state;
    }
    
    redo() {
        if (this.currentIndex < this.history.length - 1) {
            this.currentIndex++;
            this.state = this.history[this.currentIndex];
        }
        return this.state;
    }
    
    canUndo() {
        return this.currentIndex > 0;
    }
    
    canRedo() {
        return this.currentIndex < this.history.length - 1;
    }
    
    getHistory() {
        return this.history.slice();
    }
    
    reset() {
        this.currentIndex = 0;
        this.state = this.history[0];
        return this.state;
    }
}

// Example usage
const appState = new ImmutableState({
    user: null,
    todos: [],
    filter: 'all'
});

console.log('Initial state:', appState.getState());

// Set user
appState.setState({
    user: { name: 'Alice', id: 1 }
});
console.log('After setting user:', appState.getState());

// Add todos
appState.setState(prevState => ({
    ...prevState,
    todos: [
        ...prevState.todos,
        { id: 1, text: 'Learn immutability', completed: false }
    ]
}));
console.log('After adding todo:', appState.getState());

appState.setState(prevState => ({
    ...prevState,
    todos: [
        ...prevState.todos,
        { id: 2, text: 'Practice functional programming', completed: false }
    ]
}));
console.log('After adding second todo:', appState.getState());

// Undo/Redo
console.log('\\nUndo/Redo:');
console.log('Can undo:', appState.canUndo());
console.log('Undo:', appState.undo());
console.log('Undo again:', appState.undo());
console.log('Redo:', appState.redo());

// Immutable List Implementation
console.log('\\n=== Immutable List Implementation ===');

class ImmutableList {
    constructor(items = []) {
        this.items = [...items];
        Object.freeze(this.items);
    }
    
    get length() {
        return this.items.length;
    }
    
    get(index) {
        return this.items[index];
    }
    
    push(...newItems) {
        return new ImmutableList([...this.items, ...newItems]);
    }
    
    pop() {
        return new ImmutableList(this.items.slice(0, -1));
    }
    
    shift() {
        return new ImmutableList(this.items.slice(1));
    }
    
    unshift(...newItems) {
        return new ImmutableList([...newItems, ...this.items]);
    }
    
    insert(index, ...newItems) {
        return new ImmutableList([
            ...this.items.slice(0, index),
            ...newItems,
            ...this.items.slice(index)
        ]);
    }
    
    remove(index) {
        return new ImmutableList([
            ...this.items.slice(0, index),
            ...this.items.slice(index + 1)
        ]);
    }
    
    update(index, newValue) {
        return new ImmutableList(
            this.items.map((item, i) => i === index ? newValue : item)
        );
    }
    
    map(fn) {
        return new ImmutableList(this.items.map(fn));
    }
    
    filter(predicate) {
        return new ImmutableList(this.items.filter(predicate));
    }
    
    find(predicate) {
        return this.items.find(predicate);
    }
    
    indexOf(item) {
        return this.items.indexOf(item);
    }
    
    includes(item) {
        return this.items.includes(item);
    }
    
    reverse() {
        return new ImmutableList([...this.items].reverse());
    }
    
    sort(compareFn) {
        return new ImmutableList([...this.items].sort(compareFn));
    }
    
    concat(other) {
        const otherItems = other instanceof ImmutableList ? other.items : other;
        return new ImmutableList([...this.items, ...otherItems]);
    }
    
    toArray() {
        return [...this.items];
    }
    
    toString() {
        return 'ImmutableList([' + this.items.join(', ') + '])';
    }
    
    [Symbol.iterator]() {
        return this.items[Symbol.iterator]();
    }
}

// Test immutable list
let list = new ImmutableList([1, 2, 3]);
console.log('Original list:', list.toString());

list = list.push(4, 5);
console.log('After push:', list.toString());

list = list.insert(2, 2.5);
console.log('After insert:', list.toString());

list = list.update(0, 10);
console.log('After update:', list.toString());

const doubled = list.map(x => x * 2);
console.log('Doubled:', doubled.toString());

const evens = list.filter(x => x % 2 === 0);
console.log('Evens:', evens.toString());

// Immutable Record Implementation
console.log('\\n=== Immutable Record Implementation ===');

class ImmutableRecord {
    constructor(properties, values = {}) {
        this.properties = new Set(properties);
        
        // Initialize with default values
        const record = {};
        for (const prop of properties) {
            record[prop] = values[prop] || null;
        }
        
        Object.assign(this, record);
        Object.freeze(this);
    }
    
    set(key, value) {
        if (!this.properties.has(key)) {
            throw new Error('Property ' + key + ' not defined in record');
        }
        
        const values = {};
        for (const prop of this.properties) {
            values[prop] = prop === key ? value : this[prop];
        }
        
        return new this.constructor([...this.properties], values);
    }
    
    update(key, updateFn) {
        return this.set(key, updateFn(this[key]));
    }
    
    merge(updates) {
        const values = {};
        for (const prop of this.properties) {
            values[prop] = updates.hasOwnProperty(prop) ? updates[prop] : this[prop];
        }
        
        return new this.constructor([...this.properties], values);
    }
    
    toObject() {
        const obj = {};
        for (const prop of this.properties) {
            obj[prop] = this[prop];
        }
        return obj;
    }
}

// Create a User record type
class UserRecord extends ImmutableRecord {
    constructor(values = {}) {
        super(['id', 'name', 'email', 'age'], values);
    }
}

let userRecord = new UserRecord({
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
    age: 25
});

console.log('Original record:', userRecord);

const updatedRecord = userRecord.set('age', 26);
console.log('Updated record:', updatedRecord);

const mergedRecord = userRecord.merge({ age: 27, name: 'Alice Smith' });
console.log('Merged record:', mergedRecord);

console.log('Original unchanged:', userRecord);

// Performance Considerations
console.log('\\n=== Performance Considerations ===');

class PerformanceTest {
    static timeFunction(fn, label) {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        console.log(label + ': ' + (end - start).toFixed(2) + 'ms');
        return result;
    }
    
    static testArrayOperations(size = 10000) {
        console.log('Testing with ' + size + ' items:');
        
        // Mutable approach
        PerformanceTest.timeFunction(() => {
            const arr = [];
            for (let i = 0; i < size; i++) {
                arr.push(i);
            }
            return arr;
        }, 'Mutable array creation');
        
        // Immutable approach
        PerformanceTest.timeFunction(() => {
            let arr = [];
            for (let i = 0; i < size; i++) {
                arr = [...arr, i];
            }
            return arr;
        }, 'Immutable array creation (spread)');
        
        // Optimized immutable approach
        PerformanceTest.timeFunction(() => {
            const items = [];
            for (let i = 0; i < size; i++) {
                items.push(i);
            }
            return new ImmutableList(items);
        }, 'Optimized immutable creation');
    }
}

PerformanceTest.testArrayOperations(1000);

// Best Practices
console.log('\\n=== Best Practices ===');

const bestPractices = {
    // 1. Use Object.freeze for simple immutability
    freezeObject: (obj) => {
        Object.freeze(obj);
        return obj;
    },
    
    // 2. Prefer built-in immutable methods
    immutableArrayOps: {
        // Good: returns new array
        add: (arr, item) => arr.concat(item),
        remove: (arr, item) => arr.filter(x => x !== item),
        update: (arr, index, item) => arr.map((x, i) => i === index ? item : x)
    },
    
    // 3. Use libraries for complex immutable operations
    exampleWithLibrary: () => {
        // Example using a hypothetical immutable library
        console.log('Consider using libraries like Immutable.js or Immer for complex scenarios');
    },
    
    // 4. Batch updates when possible
    batchUpdates: (state, updates) => {
        // Instead of multiple setState calls, batch them
        return updates.reduce((currentState, update) => {
            return { ...currentState, ...update };
        }, state);
    }
};

const frozenObject = bestPractices.freezeObject({ name: 'Test', value: 42 });
console.log('Frozen object:', frozenObject);

// Try to modify (will fail silently or throw in strict mode)
try {
    frozenObject.name = 'Modified';
    console.log('Modification attempt (should be unchanged):', frozenObject);
} catch (error) {
    console.log('Modification prevented:', error.message);
}

console.log('\\nImmutability examples completed');`,

  exercises: [
    {
      question: "Create an immutable shopping cart that supports adding, removing, and updating items:",
      solution: `class ImmutableShoppingCart {
  constructor(items = []) {
    this.items = [...items];
    Object.freeze(this.items);
  }
  
  addItem(product) {
    const existingIndex = this.items.findIndex(item => item.id === product.id);
    
    if (existingIndex >= 0) {
      // Update quantity if item exists
      return this.updateQuantity(product.id, 
        this.items[existingIndex].quantity + (product.quantity || 1)
      );
    } else {
      // Add new item
      const newItem = { ...product, quantity: product.quantity || 1 };
      return new ImmutableShoppingCart([...this.items, newItem]);
    }
  }
  
  removeItem(productId) {
    const newItems = this.items.filter(item => item.id !== productId);
    return new ImmutableShoppingCart(newItems);
  }
  
  updateQuantity(productId, newQuantity) {
    if (newQuantity <= 0) {
      return this.removeItem(productId);
    }
    
    const newItems = this.items.map(item => 
      item.id === productId 
        ? { ...item, quantity: newQuantity }
        : item
    );
    
    return new ImmutableShoppingCart(newItems);
  }
  
  getTotal() {
    return this.items.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    );
  }
  
  getItemCount() {
    return this.items.reduce((count, item) => count + item.quantity, 0);
  }
  
  toArray() {
    return [...this.items];
  }
}

// Usage:
let cart = new ImmutableShoppingCart();

cart = cart.addItem({ id: 1, name: 'Laptop', price: 1000, quantity: 1 });
cart = cart.addItem({ id: 2, name: 'Mouse', price: 25, quantity: 2 });
cart = cart.updateQuantity(1, 2);

console.log('Cart items:', cart.toArray());
console.log('Total:', cart.getTotal());
console.log('Item count:', cart.getItemCount());`,
      explanation: "This immutable shopping cart demonstrates how to maintain immutability while providing useful operations. Each method returns a new cart instance instead of modifying the existing one."
    }
  ],

  quiz: [
    {
      question: "Which approach correctly creates an immutable update to an object?",
      options: [
        "object.property = newValue",
        "Object.assign(object, { property: newValue })",
        "{ ...object, property: newValue }",
        "object[property] = newValue"
      ],
      correct: 2,
      explanation: "Using the spread operator ({ ...object, property: newValue }) creates a new object with the updated property, leaving the original object unchanged."
    }
  ],

  resources: [
    {
      title: "Immutable.js Documentation",
      url: "https://immutable-js.github.io/immutable-js/"
    },
    {
      title: "Immer - Immutable State Updates",
      url: "https://immerjs.github.io/immer/"
    },
    {
      title: "MDN - Object.freeze()",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze"
    }
  ],

  nextModules: ['pure-functions', 'composition', 'currying'],
  prerequisites: ['pure-functions', 'objects-basics', 'arrays-basics']
};