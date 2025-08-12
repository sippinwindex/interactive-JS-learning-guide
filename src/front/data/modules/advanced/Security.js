export default {
  title: 'JavaScript Security Best Practices',
  duration: '40 min',
  difficulty: 'Advanced',
  overview: 'Learn essential security practices for JavaScript applications. Master XSS prevention, CSRF protection, input validation, and secure coding patterns.',
  
  keyPoints: [
    'Input validation prevents malicious data injection',
    'XSS attacks can be prevented with proper sanitization',
    'CSRF tokens protect against cross-site request forgery',
    'Content Security Policy (CSP) adds defense layers',
    'Avoid eval() and similar dangerous functions',
    'Secure authentication and session management'
  ],

  example: `// Input Validation and Sanitization
console.log('=== Input Validation ===');

class InputValidator {
    static email(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    static password(password) {
        // At least 8 chars, 1 uppercase, 1 lowercase, 1 number
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    }
    
    static phoneNumber(phone) {
        // Simple US phone number validation
        const phoneRegex = /^\\(\\d{3}\\) \\d{3}-\\d{4}$/;
        return phoneRegex.test(phone);
    }
    
    static sanitizeString(input) {
        if (typeof input !== 'string') return '';
        
        return input
            .replace(/[<>]/g, '') // Remove potential HTML tags
            .replace(/['"]/g, '') // Remove quotes
            .trim()
            .substring(0, 1000); // Limit length
    }
    
    static validateAndSanitize(data, rules) {
        const result = {
            valid: true,
            errors: [],
            sanitized: {}
        };
        
        for (const [field, value] of Object.entries(data)) {
            const rule = rules[field];
            if (!rule) continue;
            
            // Required field check
            if (rule.required && (!value || value.trim() === '')) {
                result.valid = false;
                result.errors.push(\`\${field} is required\`);
                continue;
            }
            
            // Type validation
            if (rule.type && value) {
                let isValid = true;
                
                switch (rule.type) {
                    case 'email':
                        isValid = this.email(value);
                        break;
                    case 'password':
                        isValid = this.password(value);
                        break;
                    case 'phone':
                        isValid = this.phoneNumber(value);
                        break;
                }
                
                if (!isValid) {
                    result.valid = false;
                    result.errors.push(\`\${field} is not a valid \${rule.type}\`);
                }
            }
            
            // Sanitize the value
            result.sanitized[field] = rule.sanitize ? 
                this.sanitizeString(value) : value;
        }
        
        return result;
    }
}

// Example usage
const userInput = {
    name: '  <script>alert("xss")</script>John Doe  ',
    email: 'john@example.com',
    password: 'WeakPass',
    phone: '(555) 123-4567'
};

const validationRules = {
    name: { required: true, sanitize: true },
    email: { required: true, type: 'email' },
    password: { required: true, type: 'password' },
    phone: { type: 'phone' }
};

const validation = InputValidator.validateAndSanitize(userInput, validationRules);
console.log('Validation result:', validation);

// XSS Prevention
console.log('=== XSS Prevention ===');

class XSSProtection {
    static escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
    
    static sanitizeForAttribute(value) {
        // Remove potentially dangerous characters for HTML attributes
        return value.replace(/[<>"'&\x00-\x1f\x7f-\x9f]/g, '');
    }
    
    static createSafeElement(tag, content, attributes = {}) {
        const allowedTags = ['div', 'span', 'p', 'h1', 'h2', 'h3', 'strong', 'em'];
        
        if (!allowedTags.includes(tag)) {
            throw new Error(\`Tag '\${tag}' not allowed\`);
        }
        
        const safeContent = this.escapeHtml(content);
        const safeAttributes = Object.entries(attributes)
            .map(([key, value]) => \`\${key}="\${this.sanitizeForAttribute(value)}"\`)
            .join(' ');
            
        return \`<\${tag}\${safeAttributes ? ' ' + safeAttributes : ''}>\${safeContent}</\${tag}>\`;
    }
    
    static stripScripts(html) {
        // Remove script tags and event handlers
        return html
            .replace(/<script\\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            .replace(/\\s*on\\w+\\s*=\\s*["'][^"']*["']/gi, '')
            .replace(/javascript:/gi, '');
    }
}

// Example usage
const userContent = '<script>alert("XSS")</script><p onclick="malicious()">Hello World</p>';
console.log('Original:', userContent);
console.log('Escaped:', XSSProtection.escapeHtml(userContent));
console.log('Stripped:', XSSProtection.stripScripts(userContent));

const safeElement = XSSProtection.createSafeElement('div', 'Safe content', { 
    class: 'user-content',
    id: 'content-123'
});
console.log('Safe element:', safeElement);

// CSRF Protection
console.log('=== CSRF Protection ===');

class CSRFProtection {
    constructor() {
        this.tokens = new Map();
        this.tokenExpiry = 3600000; // 1 hour
    }
    
    generateToken(sessionId) {
        const token = this.randomString(32);
        const expiry = Date.now() + this.tokenExpiry;
        
        this.tokens.set(sessionId, { token, expiry });
        
        console.log(\`CSRF token generated for session \${sessionId}\`);
        return token;
    }
    
    validateToken(sessionId, token) {
        const stored = this.tokens.get(sessionId);
        
        if (!stored) {
            console.log('No CSRF token found for session');
            return false;
        }
        
        if (Date.now() > stored.expiry) {
            console.log('CSRF token expired');
            this.tokens.delete(sessionId);
            return false;
        }
        
        if (stored.token !== token) {
            console.log('CSRF token mismatch');
            return false;
        }
        
        console.log('CSRF token valid');
        return true;
    }
    
    cleanupExpiredTokens() {
        const now = Date.now();
        for (const [sessionId, data] of this.tokens.entries()) {
            if (now > data.expiry) {
                this.tokens.delete(sessionId);
            }
        }
    }
    
    randomString(length) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
}

const csrfProtection = new CSRFProtection();

// Simulate form submission with CSRF protection
function simulateFormSubmission(sessionId, formData, csrfToken) {
    console.log('Attempting form submission...');
    
    if (!csrfProtection.validateToken(sessionId, csrfToken)) {
        console.error('CSRF validation failed - request blocked');
        return false;
    }
    
    console.log('CSRF validation passed - processing form');
    console.log('Form data:', formData);
    return true;
}

// Example usage
const sessionId = 'user-session-123';
const token = csrfProtection.generateToken(sessionId);

// Valid submission
simulateFormSubmission(sessionId, { username: 'john', action: 'update' }, token);

// Invalid submission (wrong token)
simulateFormSubmission(sessionId, { username: 'john', action: 'delete' }, 'invalid-token');

// Secure Authentication
console.log('=== Secure Authentication ===');

class SecureAuth {
    constructor() {
        this.sessions = new Map();
        this.sessionTimeout = 1800000; // 30 minutes
        this.maxLoginAttempts = 5;
        this.loginAttempts = new Map();
        this.lockoutDuration = 900000; // 15 minutes
    }
    
    hashPassword(password, salt) {
        // Simplified hash function (use bcrypt in production)
        let hash = 0;
        const input = password + salt;
        for (let i = 0; i < input.length; i++) {
            const char = input.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32-bit integer
        }
        return Math.abs(hash).toString(16);
    }
    
    generateSalt() {
        return Math.random().toString(36).substring(2, 15);
    }
    
    isAccountLocked(username) {
        const attempts = this.loginAttempts.get(username);
        if (!attempts) return false;
        
        const isLocked = attempts.count >= this.maxLoginAttempts && 
                        (Date.now() - attempts.lastAttempt) < this.lockoutDuration;
        
        if (isLocked) {
            console.log(\`Account \${username} is locked\`);
        }
        
        return isLocked;
    }
    
    recordLoginAttempt(username, success) {
        if (success) {
            this.loginAttempts.delete(username);
            return;
        }
        
        const current = this.loginAttempts.get(username) || { count: 0, lastAttempt: 0 };
        
        // Reset count if enough time has passed
        if (Date.now() - current.lastAttempt > this.lockoutDuration) {
            current.count = 0;
        }
        
        current.count++;
        current.lastAttempt = Date.now();
        this.loginAttempts.set(username, current);
        
        console.log(\`Login attempt \${current.count}/\${this.maxLoginAttempts} for \${username}\`);
    }
    
    createSession(userId) {
        const sessionId = this.generateSessionId();
        const session = {
            userId,
            createdAt: Date.now(),
            lastActivity: Date.now(),
            ipAddress: '127.0.0.1', // In real app, get from request
            userAgent: navigator.userAgent
        };
        
        this.sessions.set(sessionId, session);
        console.log(\`Session created for user \${userId}\`);
        return sessionId;
    }
    
    validateSession(sessionId) {
        const session = this.sessions.get(sessionId);
        
        if (!session) {
            console.log('Invalid session ID');
            return null;
        }
        
        if (Date.now() - session.lastActivity > this.sessionTimeout) {
            console.log('Session expired');
            this.sessions.delete(sessionId);
            return null;
        }
        
        // Update last activity
        session.lastActivity = Date.now();
        return session;
    }
    
    logout(sessionId) {
        if (this.sessions.delete(sessionId)) {
            console.log('Session terminated');
        }
    }
    
    generateSessionId() {
        return 'sess_' + Math.random().toString(36).substring(2) + 
               Date.now().toString(36);
    }
}

const auth = new SecureAuth();

// Simulate authentication flow
function attemptLogin(username, password) {
    if (auth.isAccountLocked(username)) {
        return { success: false, reason: 'Account locked' };
    }
    
    // Simplified password check
    const validPassword = password === 'correct_password';
    
    auth.recordLoginAttempt(username, validPassword);
    
    if (validPassword) {
        const sessionId = auth.createSession(username);
        return { success: true, sessionId };
    } else {
        return { success: false, reason: 'Invalid credentials' };
    }
}

// Test authentication
console.log('Login attempt 1:', attemptLogin('testuser', 'wrong_password'));
console.log('Login attempt 2:', attemptLogin('testuser', 'wrong_password'));
console.log('Login attempt 3:', attemptLogin('testuser', 'correct_password'));

// Content Security Policy Helper
console.log('=== Content Security Policy ===');

class CSPHelper {
    static generateNonce() {
        const array = new Uint8Array(16);
        crypto.getRandomValues(array);
        return btoa(String.fromCharCode.apply(null, array));
    }
    
    static createCSPHeader(directives) {
        const cspParts = [];
        
        for (const [directive, values] of Object.entries(directives)) {
            if (Array.isArray(values) && values.length > 0) {
                cspParts.push(\`\${directive} \${values.join(' ')}\`);
            }
        }
        
        return cspParts.join('; ');
    }
    
    static validateCSP(csp) {
        const warnings = [];
        
        if (!csp.includes("default-src")) {
            warnings.push("Missing default-src directive");
        }
        
        if (csp.includes("'unsafe-inline'")) {
            warnings.push("Using 'unsafe-inline' reduces security");
        }
        
        if (csp.includes("'unsafe-eval'")) {
            warnings.push("Using 'unsafe-eval' allows eval() usage");
        }
        
        if (!csp.includes("script-src")) {
            warnings.push("Missing script-src directive");
        }
        
        return warnings;
    }
}

// Generate secure CSP
const nonce = CSPHelper.generateNonce();
const cspDirectives = {
    'default-src': ["'self'"],
    'script-src': ["'self'", \`'nonce-\${nonce}'\`],
    'style-src': ["'self'", "'unsafe-inline'"],
    'img-src': ["'self'", "data:", "https:"],
    'font-src': ["'self'"],
    'connect-src': ["'self'"],
    'frame-ancestors': ["'none'"],
    'base-uri': ["'self'"],
    'form-action': ["'self'"]
};

const cspHeader = CSPHelper.createCSPHeader(cspDirectives);
console.log('CSP Header:', cspHeader);

const cspWarnings = CSPHelper.validateCSP(cspHeader);
if (cspWarnings.length > 0) {
    console.log('CSP Warnings:', cspWarnings);
}

// Secure Data Handling
console.log('=== Secure Data Handling ===');

class SecureDataHandler {
    static encryptData(data, key) {
        // Simplified encryption (use proper crypto libraries in production)
        let encrypted = '';
        for (let i = 0; i < data.length; i++) {
            encrypted += String.fromCharCode(
                data.charCodeAt(i) ^ key.charCodeAt(i % key.length)
            );
        }
        return btoa(encrypted);
    }
    
    static decryptData(encryptedData, key) {
        try {
            const encrypted = atob(encryptedData);
            let decrypted = '';
            for (let i = 0; i < encrypted.length; i++) {
                decrypted += String.fromCharCode(
                    encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length)
                );
            }
            return decrypted;
        } catch (error) {
            console.error('Decryption failed');
            return null;
        }
    }
    
    static secureStore(key, data, expiry = null) {
        const item = {
            data,
            timestamp: Date.now(),
            expiry
        };
        
        try {
            const encrypted = this.encryptData(JSON.stringify(item), 'secret-key');
            localStorage.setItem(key, encrypted);
            console.log(\`Securely stored: \${key}\`);
        } catch (error) {
            console.error('Failed to store data securely');
        }
    }
    
    static secureRetrieve(key) {
        try {
            const encrypted = localStorage.getItem(key);
            if (!encrypted) return null;
            
            const decrypted = this.decryptData(encrypted, 'secret-key');
            if (!decrypted) return null;
            
            const item = JSON.parse(decrypted);
            
            // Check expiry
            if (item.expiry && Date.now() > item.expiry) {
                localStorage.removeItem(key);
                console.log(\`Expired data removed: \${key}\`);
                return null;
            }
            
            return item.data;
        } catch (error) {
            console.error('Failed to retrieve data securely');
            return null;
        }
    }
    
    static sanitizeOutput(data) {
        if (typeof data === 'string') {
            return data.replace(/[<>&"']/g, (char) => {
                const entities = {
                    '<': '&lt;',
                    '>': '&gt;',
                    '&': '&amp;',
                    '"': '&quot;',
                    "'": '&#x27;'
                };
                return entities[char];
            });
        }
        
        if (typeof data === 'object' && data !== null) {
            const sanitized = {};
            for (const [key, value] of Object.entries(data)) {
                sanitized[key] = this.sanitizeOutput(value);
            }
            return sanitized;
        }
        
        return data;
    }
}

// Example usage
const sensitiveData = { 
    creditCard: '4111-1111-1111-1111',
    ssn: '123-45-6789',
    notes: '<script>alert("xss")</script>Personal notes'
};

SecureDataHandler.secureStore('userProfile', sensitiveData, Date.now() + 3600000);
const retrieved = SecureDataHandler.secureRetrieve('userProfile');
console.log('Retrieved data:', retrieved);

const sanitized = SecureDataHandler.sanitizeOutput(retrieved);
console.log('Sanitized for output:', sanitized);

// Rate Limiting
console.log('=== Rate Limiting ===');

class RateLimiter {
    constructor(maxRequests = 100, windowMs = 60000) {
        this.maxRequests = maxRequests;
        this.windowMs = windowMs;
        this.requests = new Map();
    }
    
    isAllowed(identifier) {
        const now = Date.now();
        const windowStart = now - this.windowMs;
        
        if (!this.requests.has(identifier)) {
            this.requests.set(identifier, []);
        }
        
        const userRequests = this.requests.get(identifier);
        
        // Remove old requests outside the window
        const validRequests = userRequests.filter(time => time > windowStart);
        this.requests.set(identifier, validRequests);
        
        if (validRequests.length >= this.maxRequests) {
            console.log(\`Rate limit exceeded for \${identifier}\`);
            return false;
        }
        
        // Add current request
        validRequests.push(now);
        return true;
    }
    
    getRemainingRequests(identifier) {
        const now = Date.now();
        const windowStart = now - this.windowMs;
        const userRequests = this.requests.get(identifier) || [];
        const validRequests = userRequests.filter(time => time > windowStart);
        
        return Math.max(0, this.maxRequests - validRequests.length);
    }
    
    getResetTime(identifier) {
        const userRequests = this.requests.get(identifier) || [];
        if (userRequests.length === 0) return 0;
        
        const oldestRequest = Math.min(...userRequests);
        return oldestRequest + this.windowMs;
    }
}

const rateLimiter = new RateLimiter(5, 10000); // 5 requests per 10 seconds

// Test rate limiting
for (let i = 1; i <= 7; i++) {
    const allowed = rateLimiter.isAllowed('user123');
    console.log(\`Request \${i}: \${allowed ? 'Allowed' : 'Blocked'}\`);
    console.log(\`Remaining: \${rateLimiter.getRemainingRequests('user123')}\`);
}

console.log('Security examples completed');`,

  exercises: [
    {
      question: "Create a secure password validation function that checks for common vulnerabilities:",
      solution: `function validateSecurePassword(password) {
  const requirements = {
    minLength: password.length >= 12,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\\d/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    noCommonPatterns: !/123|abc|password|qwerty/i.test(password),
    noRepeatingChars: !/(.)\\1{2,}/.test(password)
  };
  
  const passed = Object.values(requirements).every(req => req);
  const failedRequirements = Object.entries(requirements)
    .filter(([key, value]) => !value)
    .map(([key]) => key);
  
  return {
    valid: passed,
    requirements,
    failedRequirements,
    strength: calculateStrength(password)
  };
}

function calculateStrength(password) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/\\d/.test(password)) score += 1;
  if (/[^A-Za-z\\d]/.test(password)) score += 1;
  
  const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
  return levels[Math.min(score, levels.length - 1)];
}`,
      explanation: "Comprehensive password validation checks multiple security criteria and provides clear feedback."
    }
  ],

  quiz: [
    {
      question: "Which is the most effective way to prevent XSS attacks?",
      options: [
        "Using HTTPS only",
        "Input validation and output encoding",
        "Strong passwords",
        "Rate limiting"
      ],
      correct: 1,
      explanation: "Input validation and output encoding are the primary defenses against XSS attacks by preventing malicious scripts from executing."
    }
  ],

  resources: [
    {
      title: "OWASP JavaScript Security",
      url: "https://owasp.org/www-project-top-ten/"
    }
  ],

  nextModules: ['testing', 'best-practices'],
  prerequisites: ['functions-basics', 'dom-basics', 'promises']
};