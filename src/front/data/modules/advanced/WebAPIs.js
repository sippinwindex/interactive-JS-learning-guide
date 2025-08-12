export default {
  title: 'Web APIs and Browser Features',
  duration: '50 min',
  difficulty: 'Advanced',
  overview: 'Explore modern Web APIs and browser features. Learn Fetch API, Web Storage, Geolocation, Web Workers, Service Workers, and more.',
  
  keyPoints: [
    'Fetch API provides modern HTTP requests',
    'Web Storage offers local and session storage',
    'Geolocation API accesses device location',
    'Web Workers enable background processing',
    'Service Workers enable offline functionality',
    'Intersection Observer improves performance'
  ],

  example: `// Fetch API
console.log('=== Fetch API ===');

class HttpClient {
    constructor(baseURL = '') {
        this.baseURL = baseURL;
        this.defaultHeaders = {
            'Content-Type': 'application/json'
        };
    }
    
    async request(url, options = {}) {
        const fullURL = this.baseURL + url;
        const config = {
            headers: { ...this.defaultHeaders, ...options.headers },
            ...options
        };
        
        try {
            console.log(\`Making \${config.method || 'GET'} request to \${fullURL}\`);
            
            // Simulate API call for demo
            const response = await this.simulateRequest(fullURL, config);
            
            if (!response.ok) {
                throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Request failed:', error.message);
            throw error;
        }
    }
    
    async get(url, headers = {}) {
        return this.request(url, { method: 'GET', headers });
    }
    
    async post(url, data, headers = {}) {
        return this.request(url, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });
    }
    
    async put(url, data, headers = {}) {
        return this.request(url, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data)
        });
    }
    
    async delete(url, headers = {}) {
        return this.request(url, { method: 'DELETE', headers });
    }
    
    // Simulate API responses for demo
    async simulateRequest(url, config) {
        await new Promise(resolve => setTimeout(resolve, 200));
        
        const responses = {
            '/users': {
                GET: { users: [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }] },
                POST: { id: 3, name: 'Charlie', created: true }
            },
            '/products': {
                GET: { products: [{ id: 1, name: 'Laptop' }, { id: 2, name: 'Phone' }] }
            }
        };
        
        const method = config.method || 'GET';
        const responseData = responses[url]?.[method] || { message: 'Not found' };
        
        return {
            ok: true,
            status: 200,
            statusText: 'OK',
            json: async () => responseData
        };
    }
}

// Usage
const api = new HttpClient('https://api.example.com');

async function demonstrateFetch() {
    try {
        const users = await api.get('/users');
        console.log('Users:', users);
        
        const newUser = await api.post('/users', { name: 'Charlie', email: 'charlie@example.com' });
        console.log('Created user:', newUser);
        
        const products = await api.get('/products');
        console.log('Products:', products);
    } catch (error) {
        console.error('API Error:', error.message);
    }
}

demonstrateFetch();

// Web Storage API
console.log('\\n=== Web Storage API ===');

class StorageManager {
    static setItem(key, value, useSessionStorage = false) {
        try {
            const storage = useSessionStorage ? sessionStorage : localStorage;
            const data = {
                value,
                timestamp: Date.now(),
                type: typeof value
            };
            
            storage.setItem(key, JSON.stringify(data));
            console.log(\`Stored \${key} in \${useSessionStorage ? 'session' : 'local'} storage\`);
        } catch (error) {
            console.error('Storage error:', error.message);
        }
    }
    
    static getItem(key, useSessionStorage = false) {
        try {
            const storage = useSessionStorage ? sessionStorage : localStorage;
            const item = storage.getItem(key);
            
            if (!item) return null;
            
            const data = JSON.parse(item);
            console.log(\`Retrieved \${key} from \${useSessionStorage ? 'session' : 'local'} storage\`);
            
            return data.value;
        } catch (error) {
            console.error('Storage retrieval error:', error.message);
            return null;
        }
    }
    
    static removeItem(key, useSessionStorage = false) {
        const storage = useSessionStorage ? sessionStorage : localStorage;
        storage.removeItem(key);
        console.log(\`Removed \${key} from \${useSessionStorage ? 'session' : 'local'} storage\`);
    }
    
    static clear(useSessionStorage = false) {
        const storage = useSessionStorage ? sessionStorage : localStorage;
        storage.clear();
        console.log(\`Cleared \${useSessionStorage ? 'session' : 'local'} storage\`);
    }
    
    static getStorageInfo() {
        let localStorageSize = 0;
        let sessionStorageSize = 0;
        
        for (let key in localStorage) {
            if (localStorage.hasOwnProperty(key)) {
                localStorageSize += localStorage[key].length;
            }
        }
        
        for (let key in sessionStorage) {
            if (sessionStorage.hasOwnProperty(key)) {
                sessionStorageSize += sessionStorage[key].length;
            }
        }
        
        return {
            localStorage: {
                keys: Object.keys(localStorage).length,
                size: localStorageSize + ' characters'
            },
            sessionStorage: {
                keys: Object.keys(sessionStorage).length,
                size: sessionStorageSize + ' characters'
            }
        };
    }
}

// Usage
StorageManager.setItem('user', { name: 'Alice', theme: 'dark' });
StorageManager.setItem('tempData', 'This will be removed on browser close', true);

const user = StorageManager.getItem('user');
console.log('Retrieved user:', user);

console.log('Storage info:', StorageManager.getStorageInfo());

// Geolocation API (simulated)
console.log('\\n=== Geolocation API ===');

class GeolocationManager {
    static async getCurrentPosition(options = {}) {
        const defaultOptions = {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000 // 5 minutes
        };
        
        const config = { ...defaultOptions, ...options };
        
        console.log('Getting current position...');
        
        return new Promise((resolve, reject) => {
            // Simulate geolocation (real implementation would use navigator.geolocation)
            setTimeout(() => {
                const mockPosition = {
                    coords: {
                        latitude: 40.7128,
                        longitude: -74.0060,
                        accuracy: 20,
                        altitude: null,
                        altitudeAccuracy: null,
                        heading: null,
                        speed: null
                    },
                    timestamp: Date.now()
                };
                
                console.log('Position obtained:', mockPosition.coords);
                resolve(mockPosition);
            }, 1000);
        });
    }
    
    static async watchPosition(callback, errorCallback, options = {}) {
        console.log('Starting position watch...');
        
        let watchId = setInterval(async () => {
            try {
                const position = await this.getCurrentPosition(options);
                callback(position);
            } catch (error) {
                if (errorCallback) errorCallback(error);
            }
        }, 5000);
        
        return watchId;
    }
    
    static clearWatch(watchId) {
        clearInterval(watchId);
        console.log('Position watch cleared');
    }
    
    static calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in kilometers
        const dLat = this.toRadians(lat2 - lat1);
        const dLon = this.toRadians(lon2 - lon1);
        
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) *
                  Math.sin(dLon / 2) * Math.sin(dLon / 2);
        
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }
    
    static toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
}

// Usage
async function demonstrateGeolocation() {
    try {
        const position = await GeolocationManager.getCurrentPosition();
        console.log('Current location:', position.coords);
        
        // Calculate distance to New York
        const nyLat = 40.7128;
        const nyLon = -74.0060;
        const distance = GeolocationManager.calculateDistance(
            position.coords.latitude,
            position.coords.longitude,
            nyLat,
            nyLon
        );
        
        console.log(\`Distance to New York: \${distance.toFixed(2)} km\`);
    } catch (error) {
        console.error('Geolocation error:', error);
    }
}

demonstrateGeolocation();

// Web Workers (simulated)
console.log('\\n=== Web Workers ===');

class WorkerManager {
    constructor() {
        this.workers = new Map();
    }
    
    createWorker(name, workerFunction) {
        // In real implementation, this would create an actual Web Worker
        // For demo, we'll simulate with async functions
        
        const worker = {
            postMessage: (data) => {
                console.log(\`Sending data to worker '\${name}':\`, data);
                
                // Simulate worker processing
                setTimeout(async () => {
                    try {
                        const result = await workerFunction(data);
                        worker.onmessage({ data: result });
                    } catch (error) {
                        worker.onerror({ error: error.message });
                    }
                }, 100);
            },
            
            terminate: () => {
                console.log(\`Worker '\${name}' terminated\`);
                this.workers.delete(name);
            },
            
            onmessage: null,
            onerror: null
        };
        
        this.workers.set(name, worker);
        console.log(\`Worker '\${name}' created\`);
        return worker;
    }
    
    getWorker(name) {
        return this.workers.get(name);
    }
    
    terminateAll() {
        for (const [name, worker] of this.workers) {
            worker.terminate();
        }
    }
}

// Simulate worker functions
async function heavyComputationWorker(data) {
    console.log('Worker processing heavy computation...');
    
    // Simulate heavy computation
    let result = 0;
    for (let i = 0; i < data.iterations; i++) {
        result += Math.sqrt(i);
    }
    
    return {
        result,
        iterations: data.iterations,
        timestamp: Date.now()
    };
}

async function dataProcessingWorker(data) {
    console.log('Worker processing data...');
    
    // Simulate data processing
    const processed = data.items.map(item => ({
        ...item,
        processed: true,
        processedAt: new Date().toISOString()
    }));
    
    return { processedItems: processed };
}

// Usage
const workerManager = new WorkerManager();

const computeWorker = workerManager.createWorker('compute', heavyComputationWorker);
computeWorker.onmessage = (event) => {
    console.log('Computation result:', event.data);
};
computeWorker.onerror = (event) => {
    console.error('Worker error:', event.error);
};

computeWorker.postMessage({ iterations: 100000 });

const dataWorker = workerManager.createWorker('dataProcessor', dataProcessingWorker);
dataWorker.onmessage = (event) => {
    console.log('Data processing result:', event.data);
};

dataWorker.postMessage({
    items: [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
        { id: 3, name: 'Item 3' }
    ]
});

// Intersection Observer API (simulated)
console.log('\\n=== Intersection Observer ===');

class IntersectionObserverManager {
    constructor(callback, options = {}) {
        this.callback = callback;
        this.options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1,
            ...options
        };
        this.observedElements = new Set();
        this.isObserving = false;
    }
    
    observe(element) {
        if (!element || this.observedElements.has(element)) return;
        
        this.observedElements.add(element);
        console.log('Started observing element:', element.id || 'unnamed');
        
        if (!this.isObserving) {
            this.startObserving();
        }
    }
    
    unobserve(element) {
        if (this.observedElements.has(element)) {
            this.observedElements.delete(element);
            console.log('Stopped observing element:', element.id || 'unnamed');
        }
    }
    
    disconnect() {
        this.observedElements.clear();
        this.isObserving = false;
        console.log('Intersection observer disconnected');
    }
    
    startObserving() {
        this.isObserving = true;
        
        // Simulate intersection checking
        setInterval(() => {
            if (this.observedElements.size === 0) {
                this.isObserving = false;
                return;
            }
            
            const entries = Array.from(this.observedElements).map(element => ({
                target: element,
                isIntersecting: Math.random() > 0.5, // Random for demo
                intersectionRatio: Math.random(),
                boundingClientRect: { top: 100, left: 100, width: 200, height: 200 },
                intersectionRect: { top: 120, left: 120, width: 160, height: 160 },
                rootBounds: { top: 0, left: 0, width: 1920, height: 1080 },
                time: Date.now()
            }));
            
            this.callback(entries);
        }, 1000);
    }
}

// Usage
const intersectionCallback = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log(\`Element '\${entry.target.id}' entered viewport\`);
        } else {
            console.log(\`Element '\${entry.target.id}' left viewport\`);
        }
    });
};

const observer = new IntersectionObserverManager(intersectionCallback, {
    threshold: 0.5
});

// Simulate elements
const element1 = { id: 'section-1' };
const element2 = { id: 'section-2' };

observer.observe(element1);
observer.observe(element2);

// Notification API (simulated)
console.log('\\n=== Notification API ===');

class NotificationManager {
    static async requestPermission() {
        // Simulate permission request
        console.log('Requesting notification permission...');
        
        return new Promise(resolve => {
            setTimeout(() => {
                const permission = Math.random() > 0.5 ? 'granted' : 'denied';
                console.log(\`Notification permission: \${permission}\`);
                resolve(permission);
            }, 500);
        });
    }
    
    static async showNotification(title, options = {}) {
        const permission = await this.requestPermission();
        
        if (permission !== 'granted') {
            console.log('Notification permission denied');
            return null;
        }
        
        const notification = {
            title,
            body: options.body || '',
            icon: options.icon || '',
            tag: options.tag || '',
            timestamp: Date.now(),
            
            close: () => {
                console.log(\`Notification '\${title}' closed\`);
            },
            
            onclick: options.onclick || (() => {
                console.log(\`Notification '\${title}' clicked\`);
            })
        };
        
        console.log(\`Showing notification: \${title}\`);
        
        // Auto-close after 5 seconds
        setTimeout(() => {
            notification.close();
        }, 5000);
        
        return notification;
    }
}

// Usage
async function demonstrateNotifications() {
    const notification = await NotificationManager.showNotification('New Message', {
        body: 'You have a new message from Alice',
        icon: '/icon.png',
        tag: 'message',
        onclick: () => console.log('User clicked notification')
    });
}

demonstrateNotifications();

// Battery API (simulated)
console.log('\\n=== Battery API ===');

class BatteryManager {
    static async getBatteryInfo() {
        console.log('Getting battery information...');
        
        // Simulate battery info
        return new Promise(resolve => {
            setTimeout(() => {
                const batteryInfo = {
                    charging: Math.random() > 0.5,
                    chargingTime: Math.random() * 3600,
                    dischargingTime: Math.random() * 7200,
                    level: Math.random(),
                    
                    addEventListener: (event, handler) => {
                        console.log(\`Battery event listener added: \${event}\`);
                    },
                    
                    removeEventListener: (event, handler) => {
                        console.log(\`Battery event listener removed: \${event}\`);
                    }
                };
                
                console.log('Battery info:', {
                    charging: batteryInfo.charging,
                    level: (batteryInfo.level * 100).toFixed(0) + '%',
                    chargingTime: batteryInfo.chargingTime.toFixed(0) + 's',
                    dischargingTime: batteryInfo.dischargingTime.toFixed(0) + 's'
                });
                
                resolve(batteryInfo);
            }, 200);
        });
    }
    
    static async monitorBattery(callback) {
        const battery = await this.getBatteryInfo();
        
        const monitor = setInterval(() => {
            // Simulate battery changes
            battery.level = Math.max(0, battery.level + (Math.random() - 0.5) * 0.02);
            battery.charging = Math.random() > 0.7;
            
            callback(battery);
        }, 2000);
        
        return monitor;
    }
}

// Usage
async function demonstrateBattery() {
    const battery = await BatteryManager.getBatteryInfo();
    
    const monitor = await BatteryManager.monitorBattery((batteryInfo) => {
        console.log('Battery update:', {
            level: (batteryInfo.level * 100).toFixed(0) + '%',
            charging: batteryInfo.charging
        });
    });
    
    // Stop monitoring after 10 seconds
    setTimeout(() => {
        clearInterval(monitor);
        console.log('Battery monitoring stopped');
    }, 10000);
}

demonstrateBattery();

console.log('\\nWeb APIs examples completed');`,

  exercises: [
    {
      question: "Create a caching system using Web Storage that expires data automatically:",
      solution: `class CacheManager {
  constructor(useSessionStorage = false) {
    this.storage = useSessionStorage ? sessionStorage : localStorage;
  }
  
  set(key, value, ttlMinutes = 60) {
    const item = {
      value,
      timestamp: Date.now(),
      ttl: ttlMinutes * 60 * 1000
    };
    
    this.storage.setItem(key, JSON.stringify(item));
  }
  
  get(key) {
    const item = this.storage.getItem(key);
    if (!item) return null;
    
    const parsed = JSON.parse(item);
    const now = Date.now();
    
    if (now - parsed.timestamp > parsed.ttl) {
      this.storage.removeItem(key);
      return null;
    }
    
    return parsed.value;
  }
  
  remove(key) {
    this.storage.removeItem(key);
  }
  
  clear() {
    this.storage.clear();
  }
  
  cleanup() {
    const keys = Object.keys(this.storage);
    keys.forEach(key => {
      this.get(key); // This will remove expired items
    });
  }
}

// Usage:
const cache = new CacheManager();
cache.set('user', { name: 'Alice' }, 30); // Expires in 30 minutes`,
      explanation: "A caching system with automatic expiration helps manage browser storage efficiently and keeps data fresh."
    }
  ],

  quiz: [
    {
      question: "What is the main advantage of Web Workers?",
      options: [
        "Faster file downloads",
        "Better security",
        "Background processing without blocking the main thread",
        "Automatic caching"
      ],
      correct: 2,
      explanation: "Web Workers allow JavaScript to run in background threads, preventing heavy computations from blocking the main UI thread."
    }
  ],

  resources: [
    {
      title: "MDN Web APIs",
      url: "https://developer.mozilla.org/en-US/docs/Web/API"
    }
  ],

  nextModules: ['security', 'performance'],
  prerequisites: ['promises', 'async-await', 'dom-basics']
};