// src/front/data/modules/dom/FetchAjax.js
export default {
  title: 'Fetch API and AJAX',
  duration: '45 min',
  difficulty: 'Intermediate',
  overview: 'Master modern HTTP requests using the Fetch API. Learn to handle REST APIs, upload files, manage errors, and implement advanced patterns like retries and caching.',
  
  keyPoints: [
    'Fetch API provides modern promise-based HTTP requests',
    'Response object contains status, headers, and body methods',
    'Request configuration includes method, headers, body',
    'Error handling for network and HTTP errors',
    'FormData for file uploads and multipart requests',
    'AbortController for request cancellation'
  ],

  example: `// Basic Fetch Requests
console.log('=== Basic Fetch Requests ===');

// Simple GET request
async function basicGetRequest() {
    try {
        console.log('Making GET request...');
        
        // Using JSONPlaceholder for demonstration
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        console.log('Response headers:', response.headers.get('content-type'));
        
        if (!response.ok) {
            throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        const data = await response.json();
        console.log('Response data:', data);
        
        return data;
    } catch (error) {
        console.error('Fetch error:', error.message);
        throw error;
    }
}

// Execute basic GET request
basicGetRequest();

// Different Response Methods
console.log('\\n=== Response Methods ===');

async function demonstrateResponseMethods() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        
        // Clone response for multiple reads
        const response1 = response.clone();
        const response2 = response.clone();
        const response3 = response.clone();
        
        // Different ways to read response
        const jsonData = await response.json();
        const textData = await response1.text();
        const blobData = await response2.blob();
        const arrayBuffer = await response3.arrayBuffer();
        
        console.log('JSON data:', jsonData);
        console.log('Text data length:', textData.length);
        console.log('Blob size:', blobData.size);
        console.log('ArrayBuffer length:', arrayBuffer.byteLength);
        
    } catch (error) {
        console.error('Response methods error:', error);
    }
}

setTimeout(demonstrateResponseMethods, 1000);

// POST Requests with Different Content Types
console.log('\\n=== POST Requests ===');

// JSON POST request
async function postJSON() {
    try {
        const newPost = {
            title: 'My New Post',
            body: 'This is the content of my new post.',
            userId: 1
        };
        
        const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer your-token-here'
            },
            body: JSON.stringify(newPost)
        });
        
        if (!response.ok) {
            throw new Error(\`HTTP error! status: \${response.status}\`);
        }
        
        const result = await response.json();
        console.log('Created post:', result);
        
        return result;
    } catch (error) {
        console.error('POST JSON error:', error);
        throw error;
    }
}

setTimeout(postJSON, 2000);

// FormData POST request (for file uploads)
async function postFormData() {
    try {
        const formData = new FormData();
        formData.append('title', 'Form Data Post');
        formData.append('content', 'Content sent via FormData');
        formData.append('category', 'test');
        
        // Simulate file upload
        const fileContent = new Blob(['Hello, World!'], { type: 'text/plain' });
        formData.append('file', fileContent, 'hello.txt');
        
        console.log('FormData entries:');
        for (let [key, value] of formData.entries()) {
            console.log(\`  \${key}:\`, value instanceof File ? \`File: \${value.name}\` : value);
        }
        
        // Note: This endpoint doesn't actually handle file uploads
        // In real applications, use your file upload endpoint
        const response = await fetch('https://httpbin.org/post', {
            method: 'POST',
            body: formData
            // Don't set Content-Type header - let browser set it with boundary
        });
        
        const result = await response.json();
        console.log('FormData response:', result.files || 'No files processed');
        
    } catch (error) {
        console.error('POST FormData error:', error);
    }
}

setTimeout(postFormData, 3000);

// URL-encoded POST request
async function postURLEncoded() {
    try {
        const params = new URLSearchParams();
        params.append('username', 'john_doe');
        params.append('email', 'john@example.com');
        params.append('action', 'subscribe');
        
        const response = await fetch('https://httpbin.org/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });
        
        const result = await response.json();
        console.log('URL-encoded response:', result.form);
        
    } catch (error) {
        console.error('POST URL-encoded error:', error);
    }
}

setTimeout(postURLEncoded, 4000);

// Advanced Request Configuration
console.log('\\n=== Advanced Request Configuration ===');

// Custom headers and authentication
async function advancedRequest() {
    try {
        const response = await fetch('https://httpbin.org/headers', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                'X-API-Key': 'your-api-key',
                'User-Agent': 'MyApp/1.0',
                'Accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.9'
            },
            cache: 'no-cache',
            credentials: 'include', // Include cookies
            mode: 'cors',
            redirect: 'follow'
        });
        
        const result = await response.json();
        console.log('Request headers sent:', result.headers);
        
    } catch (error) {
        console.error('Advanced request error:', error);
    }
}

setTimeout(advancedRequest, 5000);

// Error Handling Patterns
console.log('\\n=== Error Handling ===');

class HTTPError extends Error {
    constructor(response, message) {
        super(message || \`HTTP \${response.status}: \${response.statusText}\`);
        this.name = 'HTTPError';
        this.status = response.status;
        this.statusText = response.statusText;
        this.response = response;
    }
}

class NetworkError extends Error {
    constructor(message) {
        super(message || 'Network request failed');
        this.name = 'NetworkError';
    }
}

async function fetchWithErrorHandling(url, options = {}) {
    try {
        console.log(\`Fetching: \${url}\`);
        
        const response = await fetch(url, options);
        
        // Check if response is ok
        if (!response.ok) {
            // Try to get error details from response
            let errorMessage;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorData.error || response.statusText;
            } catch {
                errorMessage = response.statusText;
            }
            
            throw new HTTPError(response, errorMessage);
        }
        
        return response;
        
    } catch (error) {
        if (error instanceof TypeError) {
            // Network error (no response received)
            throw new NetworkError('Network request failed - check your connection');
        } else if (error instanceof HTTPError) {
            // HTTP error (response received but not ok)
            throw error;
        } else {
            // Other errors
            throw new Error(\`Request failed: \${error.message}\`);
        }
    }
}

// Test error handling
async function testErrorHandling() {
    // Test 404 error
    try {
        await fetchWithErrorHandling('https://jsonplaceholder.typicode.com/posts/999999');
    } catch (error) {
        if (error instanceof HTTPError) {
            console.log(\`HTTP Error: \${error.status} - \${error.message}\`);
        }
    }
    
    // Test network error (invalid URL)
    try {
        await fetchWithErrorHandling('https://invalid-domain-that-does-not-exist.com');
    } catch (error) {
        if (error instanceof NetworkError) {
            console.log(\`Network Error: \${error.message}\`);
        }
    }
}

setTimeout(testErrorHandling, 6000);

// Request Cancellation with AbortController
console.log('\\n=== Request Cancellation ===');

async function cancellableRequest() {
    const controller = new AbortController();
    const signal = controller.signal;
    
    // Cancel the request after 2 seconds
    const timeoutId = setTimeout(() => {
        controller.abort();
        console.log('Request cancelled due to timeout');
    }, 2000);
    
    try {
        const response = await fetch('https://httpbin.org/delay/5', {
            signal: signal
        });
        
        clearTimeout(timeoutId);
        const data = await response.json();
        console.log('Request completed:', data);
        
    } catch (error) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
            console.log('Request was aborted');
        } else {
            console.error('Request error:', error);
        }
    }
}

setTimeout(cancellableRequest, 7000);

// Retry Logic
console.log('\\n=== Retry Logic ===');

async function fetchWithRetry(url, options = {}, maxRetries = 3, delay = 1000) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(\`Attempt \${attempt} of \${maxRetries}\`);
            
            const response = await fetch(url, options);
            
            if (!response.ok) {
                throw new HTTPError(response);
            }
            
            console.log(\`Request succeeded on attempt \${attempt}\`);
            return response;
            
        } catch (error) {
            lastError = error;
            
            // Don't retry for certain error types
            if (error instanceof HTTPError && error.status >= 400 && error.status < 500) {
                console.log('Client error - not retrying');
                throw error;
            }
            
            if (attempt === maxRetries) {
                console.log('Max retries reached');
                throw lastError;
            }
            
            console.log(\`Attempt \${attempt} failed, retrying in \${delay}ms...\`);
            await new Promise(resolve => setTimeout(resolve, delay));
            
            // Exponential backoff
            delay *= 2;
        }
    }
    
    throw lastError;
}

// Test retry logic
async function testRetryLogic() {
    try {
        // This will likely fail and retry
        await fetchWithRetry('https://httpbin.org/status/500', {}, 3, 500);
    } catch (error) {
        console.log('Retry failed:', error.message);
    }
}

setTimeout(testRetryLogic, 8000);

// Response Caching
console.log('\\n=== Response Caching ===');

class FetchCache {
    constructor(maxSize = 100, ttl = 5 * 60 * 1000) { // 5 minutes default TTL
        this.cache = new Map();
        this.maxSize = maxSize;
        this.ttl = ttl;
    }
    
    generateKey(url, options) {
        return \`\${options.method || 'GET'}:\${url}:\${JSON.stringify(options.body || '')}\`;
    }
    
    get(key) {
        const cached = this.cache.get(key);
        
        if (!cached) return null;
        
        if (Date.now() > cached.expires) {
            this.cache.delete(key);
            return null;
        }
        
        console.log('Cache hit for:', key);
        return cached.data;
    }
    
    set(key, data) {
        // Remove oldest entries if cache is full
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        this.cache.set(key, {
            data: data,
            expires: Date.now() + this.ttl
        });
        
        console.log('Cached response for:', key);
    }
    
    clear() {
        this.cache.clear();
    }
}

const fetchCache = new FetchCache();

async function cachedFetch(url, options = {}) {
    const key = fetchCache.generateKey(url, options);
    
    // Try to get from cache first
    const cached = fetchCache.get(key);
    if (cached) {
        return cached;
    }
    
    // Fetch from network
    const response = await fetch(url, options);
    
    if (!response.ok) {
        throw new HTTPError(response);
    }
    
    // Clone response for caching
    const responseClone = response.clone();
    const data = await response.json();
    
    // Cache the data
    fetchCache.set(key, data);
    
    return data;
}

// Test caching
async function testCaching() {
    try {
        console.log('First request (will cache):');
        const data1 = await cachedFetch('https://jsonplaceholder.typicode.com/posts/2');
        
        console.log('Second request (from cache):');
        const data2 = await cachedFetch('https://jsonplaceholder.typicode.com/posts/2');
        
        console.log('Data retrieved:', { title: data1.title });
    } catch (error) {
        console.error('Caching test error:', error);
    }
}

setTimeout(testCaching, 9000);

// File Upload with Progress
console.log('\\n=== File Upload with Progress ===');

async function uploadFileWithProgress(file, uploadUrl) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        // Track upload progress
        xhr.upload.addEventListener('progress', (event) => {
            if (event.lengthComputable) {
                const percentComplete = (event.loaded / event.total) * 100;
                console.log(\`Upload progress: \${percentComplete.toFixed(2)}%\`);
            }
        });
        
        // Handle completion
        xhr.addEventListener('load', () => {
            if (xhr.status >= 200 && xhr.status < 300) {
                try {
                    const response = JSON.parse(xhr.responseText);
                    resolve(response);
                } catch (error) {
                    resolve(xhr.responseText);
                }
            } else {
                reject(new Error(\`Upload failed: \${xhr.status} \${xhr.statusText}\`));
            }
        });
        
        // Handle errors
        xhr.addEventListener('error', () => {
            reject(new Error('Upload failed: Network error'));
        });
        
        // Handle abort
        xhr.addEventListener('abort', () => {
            reject(new Error('Upload aborted'));
        });
        
        // Prepare form data
        const formData = new FormData();
        formData.append('file', file);
        formData.append('timestamp', Date.now().toString());
        
        // Start upload
        xhr.open('POST', uploadUrl);
        xhr.send(formData);
    });
}

// Simulate file upload
async function simulateFileUpload() {
    try {
        // Create a mock file
        const fileContent = 'Mock file content for upload demonstration';
        const mockFile = new Blob([fileContent], { type: 'text/plain' });
        mockFile.name = 'test-upload.txt';
        
        console.log('Starting file upload simulation...');
        
        // Use httpbin for testing (doesn't show real progress)
        const result = await uploadFileWithProgress(mockFile, 'https://httpbin.org/post');
        
        console.log('Upload completed successfully');
        
    } catch (error) {
        console.error('Upload error:', error);
    }
}

setTimeout(simulateFileUpload, 10000);

// Batch Requests and Rate Limiting
console.log('\\n=== Batch Requests ===');

class RequestQueue {
    constructor(concurrency = 3, delay = 100) {
        this.concurrency = concurrency;
        this.delay = delay;
        this.queue = [];
        this.running = 0;
    }
    
    async add(requestFn) {
        return new Promise((resolve, reject) => {
            this.queue.push({
                requestFn,
                resolve,
                reject
            });
            
            this.process();
        });
    }
    
    async process() {
        if (this.running >= this.concurrency || this.queue.length === 0) {
            return;
        }
        
        this.running++;
        const { requestFn, resolve, reject } = this.queue.shift();
        
        try {
            const result = await requestFn();
            resolve(result);
        } catch (error) {
            reject(error);
        } finally {
            this.running--;
            
            // Add delay between requests
            setTimeout(() => {
                this.process();
            }, this.delay);
        }
    }
}

// Test batch requests
async function testBatchRequests() {
    const queue = new RequestQueue(2, 500); // 2 concurrent, 500ms delay
    
    const urls = [
        'https://jsonplaceholder.typicode.com/posts/1',
        'https://jsonplaceholder.typicode.com/posts/2',
        'https://jsonplaceholder.typicode.com/posts/3',
        'https://jsonplaceholder.typicode.com/posts/4',
        'https://jsonplaceholder.typicode.com/posts/5'
    ];
    
    console.log('Starting batch requests...');
    
    const promises = urls.map((url, index) => 
        queue.add(async () => {
            console.log(\`Fetching post \${index + 1}...\`);
            const response = await fetch(url);
            const data = await response.json();
            return { id: data.id, title: data.title };
        })
    );
    
    try {
        const results = await Promise.all(promises);
        console.log('Batch results:', results);
    } catch (error) {
        console.error('Batch error:', error);
    }
}

setTimeout(testBatchRequests, 11000);

// API Client Class
console.log('\\n=== API Client Class ===');

class APIClient {
    constructor(baseURL, defaultOptions = {}) {
        this.baseURL = baseURL.replace(/\\/$/, ''); // Remove trailing slash
        this.defaultOptions = {
            headers: {
                'Content-Type': 'application/json'
            },
            ...defaultOptions
        };
    }
    
    async request(endpoint, options = {}) {
        const url = \`\${this.baseURL}\${endpoint}\`;
        
        const config = {
            ...this.defaultOptions,
            ...options,
            headers: {
                ...this.defaultOptions.headers,
                ...options.headers
            }
        };
        
        const response = await fetchWithErrorHandling(url, config);
        
        // Auto-parse JSON responses
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }
        
        return await response.text();
    }
    
    async get(endpoint, params = {}) {
        const searchParams = new URLSearchParams(params);
        const url = searchParams.toString() ? \`\${endpoint}?\${searchParams}\` : endpoint;
        
        return this.request(url, { method: 'GET' });
    }
    
    async post(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data)
        });
    }
    
    async put(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data)
        });
    }
    
    async patch(endpoint, data = {}) {
        return this.request(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(data)
        });
    }
    
    async delete(endpoint) {
        return this.request(endpoint, { method: 'DELETE' });
    }
    
    // Set authentication token
    setAuthToken(token) {
        this.defaultOptions.headers.Authorization = \`Bearer \${token}\`;
    }
    
    // Remove authentication
    clearAuth() {
        delete this.defaultOptions.headers.Authorization;
    }
}

// Using the API client
async function demonstrateAPIClient() {
    const api = new APIClient('https://jsonplaceholder.typicode.com');
    
    try {
        // GET request with parameters
        const posts = await api.get('/posts', { userId: 1 });
        console.log(\`Found \${posts.length} posts for user 1\`);
        
        // POST request
        const newPost = await api.post('/posts', {
            title: 'API Client Test',
            body: 'This post was created using our API client',
            userId: 1
        });
        console.log('Created post:', newPost.id);
        
        // PUT request
        const updatedPost = await api.put(\`/posts/\${newPost.id}\`, {
            ...newPost,
            title: 'Updated API Client Test'
        });
        console.log('Updated post title:', updatedPost.title);
        
    } catch (error) {
        console.error('API Client error:', error);
    }
}

setTimeout(demonstrateAPIClient, 12000);

// Best Practices Summary
setTimeout(() => {
    console.log('\\n=== Fetch API Best Practices ===');
    console.log('✅ Always handle both network and HTTP errors');
    console.log('✅ Use appropriate HTTP methods (GET, POST, PUT, DELETE)');
    console.log('✅ Set correct Content-Type headers');
    console.log('✅ Implement request timeout using AbortController');
    console.log('✅ Add retry logic for network failures');
    console.log('✅ Cache responses when appropriate');
    console.log('✅ Use FormData for file uploads');
    console.log('✅ Validate responses before processing');
    console.log('✅ Include authentication headers when required');
    console.log('⚠️  Never expose sensitive data in URLs');
    console.log('⚠️  Handle CORS properly for cross-origin requests');
    console.log('⚠️  Be mindful of rate limits and implement throttling');
    
    console.log('Fetch API and AJAX examples completed');
}, 13000);`,

  exercises: [
    {
      question: "Create a robust API service that handles authentication, retries, and caching:",
      solution: `class RobustAPIService {
  constructor(baseURL, options = {}) {
    this.baseURL = baseURL;
    this.cache = new Map();
    this.cacheTTL = options.cacheTTL || 5 * 60 * 1000; // 5 minutes
    this.maxRetries = options.maxRetries || 3;
    this.retryDelay = options.retryDelay || 1000;
    this.token = null;
  }
  
  setAuthToken(token) {
    this.token = token;
  }
  
  async request(endpoint, options = {}) {
    const url = \`\${this.baseURL}\${endpoint}\`;
    const cacheKey = \`\${options.method || 'GET'}:\${url}\`;
    
    // Check cache for GET requests
    if ((!options.method || options.method === 'GET') && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey);
      if (Date.now() < cached.expires) {
        return cached.data;
      }
      this.cache.delete(cacheKey);
    }
    
    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: \`Bearer \${this.token}\` }),
        ...options.headers
      }
    };
    
    let lastError;
    for (let attempt = 1; attempt <= this.maxRetries; attempt++) {
      try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Authentication failed');
          }
          if (response.status >= 400 && response.status < 500) {
            throw new Error(\`Client error: \${response.status}\`);
          }
          throw new Error(\`Server error: \${response.status}\`);
        }
        
        const data = await response.json();
        
        // Cache successful GET requests
        if (!options.method || options.method === 'GET') {
          this.cache.set(cacheKey, {
            data,
            expires: Date.now() + this.cacheTTL
          });
        }
        
        return data;
        
      } catch (error) {
        lastError = error;
        
        if (attempt === this.maxRetries || error.message.includes('Authentication')) {
          break;
        }
        
        await new Promise(resolve => 
          setTimeout(resolve, this.retryDelay * attempt)
        );
      }
    }
    
    throw lastError;
  }
  
  async get(endpoint, params = {}) {
    const query = new URLSearchParams(params).toString();
    const url = query ? \`\${endpoint}?\${query}\` : endpoint;
    return this.request(url);
  }
  
  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}`,
      explanation: "This service combines authentication, caching, retry logic, and proper error handling for production-ready API interactions."
    }
  ],

  quiz: [
    {
      question: "What happens if you don't check response.ok before parsing JSON?",
      options: [
        "The JSON will parse successfully",
        "You might parse an error page as JSON",
        "Fetch automatically throws an error",
        "The response is automatically retried"
      ],
      correct: 1,
      explanation: "Fetch doesn't throw errors for HTTP error status codes (4xx, 5xx). You must check response.ok before parsing, or you might try to parse an HTML error page as JSON."
    }
  ],

  resources: [
    {
      title: "MDN - Fetch API",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API"
    },
    {
      title: "MDN - Using Fetch",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch"
    }
  ],

  nextModules: ['async-await', 'promises'],
  prerequisites: ['promises', 'async-await', 'json']
};