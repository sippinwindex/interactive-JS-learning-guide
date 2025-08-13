export default {
  title: 'Form Validation',
  duration: '35 min',
  difficulty: 'Intermediate',
  overview: 'Master client-side form validation techniques. Learn built-in validation, custom validators, real-time feedback, and accessibility best practices.',
  
  keyPoints: [
    'HTML5 provides built-in validation attributes',
    'Custom validation gives complete control',
    'Real-time validation improves user experience',
    'Accessibility ensures forms work for all users',
    'Server-side validation is always required',
    'Error messages should be clear and helpful'
  ],

  example: `// Form Validation Framework
console.log('=== Form Validation Framework ===');

class FormValidator {
    constructor(formElement, options = {}) {
        this.form = formElement;
        this.options = {
            realTimeValidation: true,
            showSuccessMessages: false,
            submitOnValid: false,
            ...options
        };
        this.validators = new Map();
        this.errors = new Map();
        this.isValid = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.createErrorContainer();
        console.log('Form validator initialized');
    }
    
    setupEventListeners() {
        // Prevent default form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validateForm();
        });
        
        if (this.options.realTimeValidation) {
            // Real-time validation on input
            this.form.addEventListener('input', (e) => {
                if (e.target.matches('input, textarea, select')) {
                    this.validateField(e.target);
                }
            });
            
            // Validation on blur
            this.form.addEventListener('blur', (e) => {
                if (e.target.matches('input, textarea, select')) {
                    this.validateField(e.target);
                }
            }, true);
        }
    }
    
    createErrorContainer() {
        if (!this.form.querySelector('.form-errors')) {
            const errorContainer = document.createElement('div');
            errorContainer.className = 'form-errors';
            errorContainer.setAttribute('role', 'alert');
            errorContainer.setAttribute('aria-live', 'polite');
            this.form.insertBefore(errorContainer, this.form.firstChild);
        }
    }
    
    addValidator(fieldName, validator) {
        if (!this.validators.has(fieldName)) {
            this.validators.set(fieldName, []);
        }
        this.validators.get(fieldName).push(validator);
        return this;
    }
    
    validateField(field) {
        const fieldName = field.name || field.id;
        const validators = this.validators.get(fieldName) || [];
        const fieldErrors = [];
        
        // Clear previous errors for this field
        this.errors.delete(fieldName);
        this.clearFieldError(field);
        
        // Built-in HTML5 validation
        if (!field.checkValidity()) {
            fieldErrors.push(field.validationMessage);
        }
        
        // Custom validators
        for (const validator of validators) {
            const result = validator(field.value, field);
            if (result !== true) {
                fieldErrors.push(result);
            }
        }
        
        if (fieldErrors.length > 0) {
            this.errors.set(fieldName, fieldErrors);
            this.showFieldError(field, fieldErrors[0]);
            return false;
        } else {
            this.showFieldSuccess(field);
            return true;
        }
    }
    
    validateForm() {
        const fields = this.form.querySelectorAll('input, textarea, select');
        let formIsValid = true;
        
        this.errors.clear();
        
        fields.forEach(field => {
            const isFieldValid = this.validateField(field);
            if (!isFieldValid) {
                formIsValid = false;
            }
        });
        
        this.isValid = formIsValid;
        this.updateFormErrorDisplay();
        
        if (formIsValid) {
            this.onValidForm();
        } else {
            this.onInvalidForm();
        }
        
        return formIsValid;
    }
    
    showFieldError(field, message) {
        field.classList.add('error');
        field.classList.remove('success');
        field.setAttribute('aria-invalid', 'true');
        
        // Create or update error message
        let errorElement = field.parentNode.querySelector('.field-error');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'field-error';
            errorElement.setAttribute('role', 'alert');
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // Associate error with field for screen readers
        const errorId = field.id + '-error';
        errorElement.id = errorId;
        field.setAttribute('aria-describedby', errorId);
    }
    
    showFieldSuccess(field) {
        if (this.options.showSuccessMessages) {
            field.classList.add('success');
        }
        field.classList.remove('error');
        field.setAttribute('aria-invalid', 'false');
        this.clearFieldError(field);
    }
    
    clearFieldError(field) {
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.style.display = 'none';
            errorElement.textContent = '';
        }
        field.removeAttribute('aria-describedby');
    }
    
    updateFormErrorDisplay() {
        const errorContainer = this.form.querySelector('.form-errors');
        errorContainer.innerHTML = '';
        
        if (this.errors.size > 0) {
            const errorList = document.createElement('ul');
            errorList.className = 'error-list';
            
            for (const [fieldName, fieldErrors] of this.errors) {
                const listItem = document.createElement('li');
                listItem.textContent = fieldErrors[0];
                errorList.appendChild(listItem);
            }
            
            const errorTitle = document.createElement('p');
            errorTitle.textContent = 'Please fix the following errors:';
            errorTitle.className = 'error-title';
            
            errorContainer.appendChild(errorTitle);
            errorContainer.appendChild(errorList);
        }
    }
    
    onValidForm() {
        console.log('Form is valid!');
        
        if (this.options.submitOnValid) {
            this.submitForm();
        }
        
        // Dispatch custom event
        this.form.dispatchEvent(new CustomEvent('formValid', {
            detail: { formData: new FormData(this.form) }
        }));
    }
    
    onInvalidForm() {
        console.log('Form has errors');
        
        // Focus first invalid field
        const firstErrorField = this.form.querySelector('.error');
        if (firstErrorField) {
            firstErrorField.focus();
        }
        
        // Dispatch custom event
        this.form.dispatchEvent(new CustomEvent('formInvalid', {
            detail: { errors: Object.fromEntries(this.errors) }
        }));
    }
    
    submitForm() {
        const formData = new FormData(this.form);
        console.log('Submitting form data:', Object.fromEntries(formData));
        
        // Here you would typically send data to server
        // fetch('/submit', { method: 'POST', body: formData })
    }
    
    getFormData() {
        return new FormData(this.form);
    }
    
    reset() {
        this.form.reset();
        this.errors.clear();
        this.form.querySelectorAll('.error, .success').forEach(field => {
            field.classList.remove('error', 'success');
            field.removeAttribute('aria-invalid');
            this.clearFieldError(field);
        });
        this.updateFormErrorDisplay();
    }
}

// Common Validators
const Validators = {
    required: (message = 'This field is required') => {
        return (value) => {
            return value.trim() !== '' || message;
        };
    },
    
    minLength: (min, message) => {
        return (value) => {
            return value.length >= min || message || 'Minimum ' + min + ' characters required';
        };
    },
    
    maxLength: (max, message) => {
        return (value) => {
            return value.length <= max || message || 'Maximum ' + max + ' characters allowed';
        };
    },
    
    pattern: (regex, message = 'Invalid format') => {
        return (value) => {
            return regex.test(value) || message;
        };
    },
    
    email: (message = 'Please enter a valid email address') => {
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        return (value) => {
            return emailRegex.test(value) || message;
        };
    },
    
    strongPassword: (message = 'Password must contain uppercase, lowercase, number, and special character') => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$/;
        return (value) => {
            return passwordRegex.test(value) || message;
        };
    },
    
    confirmPassword: (passwordFieldName, message = 'Passwords do not match') => {
        return (value, field) => {
            const passwordField = field.form.querySelector('[name="' + passwordFieldName + '"]');
            return passwordField.value === value || message;
        };
    },
    
    numeric: (message = 'Please enter a valid number') => {
        return (value) => {
            return !isNaN(value) && !isNaN(parseFloat(value)) || message;
        };
    },
    
    range: (min, max, message) => {
        return (value) => {
            const num = parseFloat(value);
            const inRange = num >= min && num <= max;
            return inRange || message || 'Value must be between ' + min + ' and ' + max;
        };
    },
    
    custom: (validatorFunction, message = 'Invalid value') => {
        return (value, field) => {
            return validatorFunction(value, field) || message;
        };
    }
};

// Create sample form for demonstration
function createSampleForm() {
    const formHTML = \`
        <form id="demo-form" novalidate>
            <div class="field">
                <label for="firstName">First Name *</label>
                <input type="text" id="firstName" name="firstName" required>
            </div>
            
            <div class="field">
                <label for="lastName">Last Name *</label>
                <input type="text" id="lastName" name="lastName" required>
            </div>
            
            <div class="field">
                <label for="email">Email *</label>
                <input type="email" id="email" name="email" required>
            </div>
            
            <div class="field">
                <label for="phone">Phone Number</label>
                <input type="tel" id="phone" name="phone">
            </div>
            
            <div class="field">
                <label for="age">Age</label>
                <input type="number" id="age" name="age" min="18" max="100">
            </div>
            
            <div class="field">
                <label for="password">Password *</label>
                <input type="password" id="password" name="password" required>
            </div>
            
            <div class="field">
                <label for="confirmPassword">Confirm Password *</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required>
            </div>
            
            <div class="field">
                <label for="website">Website</label>
                <input type="url" id="website" name="website">
            </div>
            
            <div class="field">
                <label for="bio">Bio</label>
                <textarea id="bio" name="bio" rows="4"></textarea>
            </div>
            
            <div class="field">
                <label>
                    <input type="checkbox" name="terms" required>
                    I agree to the terms and conditions *
                </label>
            </div>
            
            <div class="field">
                <button type="submit">Submit</button>
                <button type="button" onclick="validator.reset()">Reset</button>
            </div>
        </form>
    \`;
    
    document.body.insertAdjacentHTML('beforeend', formHTML);
    return document.getElementById('demo-form');
}

// Initialize form validation
const form = createSampleForm();
const validator = new FormValidator(form, {
    realTimeValidation: true,
    showSuccessMessages: true
});

// Add custom validators
validator
    .addValidator('firstName', Validators.required())
    .addValidator('firstName', Validators.minLength(2))
    .addValidator('lastName', Validators.required())
    .addValidator('lastName', Validators.minLength(2))
    .addValidator('email', Validators.required())
    .addValidator('email', Validators.email())
    .addValidator('phone', Validators.pattern(/^\\(?([0-9]{3})\\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 'Please enter a valid phone number'))
    .addValidator('age', Validators.range(18, 100))
    .addValidator('password', Validators.required())
    .addValidator('password', Validators.strongPassword())
    .addValidator('confirmPassword', Validators.required())
    .addValidator('confirmPassword', Validators.confirmPassword('password'))
    .addValidator('bio', Validators.maxLength(500, 'Bio must be 500 characters or less'));

// Add event listeners
form.addEventListener('formValid', (e) => {
    console.log('Form validation passed!', e.detail.formData);
    alert('Form is valid! Check console for data.');
});

form.addEventListener('formInvalid', (e) => {
    console.log('Form validation failed:', e.detail.errors);
});

// Advanced Validation Examples
console.log('\\n=== Advanced Validation Examples ===');

// Async validation (e.g., checking if username is available)
class AsyncValidator {
    static usernameAvailable(message = 'Username is already taken') {
        return async (value) => {
            if (!value) return true; // Skip if empty (handle with required validator)
            
            // Simulate API call
            const isAvailable = await new Promise(resolve => {
                setTimeout(() => {
                    // Simulate some usernames being taken
                    const takenUsernames = ['admin', 'root', 'user', 'test'];
                    resolve(!takenUsernames.includes(value.toLowerCase()));
                }, 500);
            });
            
            return isAvailable || message;
        };
    }
    
    static emailExists(message = 'Email is already registered') {
        return async (value) => {
            if (!value) return true;
            
            // Simulate API call
            const exists = await new Promise(resolve => {
                setTimeout(() => {
                    // Simulate some emails being registered
                    const registeredEmails = ['admin@test.com', 'user@test.com'];
                    resolve(registeredEmails.includes(value.toLowerCase()));
                }, 300);
            });
            
            return !exists || message;
        };
    }
}

// Conditional validation
const ConditionalValidators = {
    requiredIf: (conditionField, conditionValue, message = 'This field is required') => {
        return (value, field) => {
            const conditionElement = field.form.querySelector('[name="' + conditionField + '"]');
            if (conditionElement && conditionElement.value === conditionValue) {
                return value.trim() !== '' || message;
            }
            return true;
        };
    },
    
    requiredIfChecked: (checkboxName, message = 'This field is required') => {
        return (value, field) => {
            const checkbox = field.form.querySelector('[name="' + checkboxName + '"]');
            if (checkbox && checkbox.checked) {
                return value.trim() !== '' || message;
            }
            return true;
        };
    }
};

// File upload validation
const FileValidators = {
    fileSize: (maxSizeMB, message) => {
        return (value, field) => {
            if (!field.files || field.files.length === 0) return true;
            
            const file = field.files[0];
            const maxSizeBytes = maxSizeMB * 1024 * 1024;
            
            return file.size <= maxSizeBytes || 
                   message || 'File size must be less than ' + maxSizeMB + 'MB';
        };
    },
    
    fileType: (allowedTypes, message) => {
        return (value, field) => {
            if (!field.files || field.files.length === 0) return true;
            
            const file = field.files[0];
            const fileType = file.type.toLowerCase();
            
            return allowedTypes.includes(fileType) || 
                   message || 'File type not allowed. Allowed types: ' + allowedTypes.join(', ');
        };
    }
};

// Form validation with steps/wizard
class StepFormValidator extends FormValidator {
    constructor(formElement, steps, options = {}) {
        super(formElement, options);
        this.steps = steps;
        this.currentStep = 0;
        this.stepValidation = new Map();
        
        this.initSteps();
    }
    
    initSteps() {
        this.steps.forEach((step, index) => {
            this.stepValidation.set(index, new Map());
        });
        
        this.showStep(0);
    }
    
    showStep(stepIndex) {
        // Hide all steps
        this.steps.forEach((step, index) => {
            const stepElement = this.form.querySelector(step.selector);
            if (stepElement) {
                stepElement.style.display = index === stepIndex ? 'block' : 'none';
            }
        });
        
        this.currentStep = stepIndex;
        this.updateStepIndicator();
    }
    
    validateCurrentStep() {
        const currentStepSelector = this.steps[this.currentStep].selector;
        const stepElement = this.form.querySelector(currentStepSelector);
        const fields = stepElement.querySelectorAll('input, textarea, select');
        
        let stepIsValid = true;
        fields.forEach(field => {
            if (!this.validateField(field)) {
                stepIsValid = false;
            }
        });
        
        return stepIsValid;
    }
    
    nextStep() {
        if (this.validateCurrentStep() && this.currentStep < this.steps.length - 1) {
            this.showStep(this.currentStep + 1);
        }
    }
    
    previousStep() {
        if (this.currentStep > 0) {
            this.showStep(this.currentStep - 1);
        }
    }
    
    updateStepIndicator() {
        console.log('Current step: ' + (this.currentStep + 1) + ' of ' + this.steps.length);
    }
}

// Real-time field formatting
class FieldFormatter {
    static phoneNumber(field) {
        field.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\\D/g, '');
            if (value.length >= 6) {
                value = value.replace(/(\\d{3})(\\d{3})(\\d{4})/, '($1) $2-$3');
            } else if (value.length >= 3) {
                value = value.replace(/(\\d{3})(\\d{0,3})/, '($1) $2');
            }
            e.target.value = value;
        });
    }
    
    static creditCard(field) {
        field.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\\s/g, '').replace(/\\D/g, '');
            value = value.replace(/(\\d{4})(?=\\d)/g, '$1 ');
            e.target.value = value;
        });
    }
    
    static currency(field) {
        field.addEventListener('input', (e) => {
            let value = e.target.value.replace(/[^\\d.]/g, '');
            if (value) {
                const num = parseFloat(value);
                if (!isNaN(num)) {
                    e.target.value = '$' + num.toFixed(2);
                }
            }
        });
    }
}

// Example usage of formatters
const phoneField = form.querySelector('#phone');
if (phoneField) {
    FieldFormatter.phoneNumber(phoneField);
}

console.log('Form validation examples completed');`,

  exercises: [
    {
      question: "Create a credit card validation system with Luhn algorithm:",
      solution: `const CreditCardValidator = {
  luhnCheck: (cardNumber) => {
    const digits = cardNumber.replace(/\\D/g, '').split('').map(Number);
    let sum = 0;
    let isEven = false;
    
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = digits[i];
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  },
  
  getCardType: (cardNumber) => {
    const number = cardNumber.replace(/\\D/g, '');
    
    if (/^4/.test(number)) return 'Visa';
    if (/^5[1-5]/.test(number)) return 'MasterCard';
    if (/^3[47]/.test(number)) return 'American Express';
    if (/^6(?:011|5)/.test(number)) return 'Discover';
    
    return 'Unknown';
  },
  
  validate: (cardNumber) => {
    const cleaned = cardNumber.replace(/\\D/g, '');
    
    if (cleaned.length < 13 || cleaned.length > 19) {
      return { valid: false, message: 'Invalid card length' };
    }
    
    if (!CreditCardValidator.luhnCheck(cleaned)) {
      return { valid: false, message: 'Invalid card number' };
    }
    
    return {
      valid: true,
      cardType: CreditCardValidator.getCardType(cleaned),
      maskedNumber: cleaned.slice(-4).padStart(cleaned.length, '*')
    };
  }
};

// Usage:
const result = CreditCardValidator.validate('4532015112830366');
console.log(result); // { valid: true, cardType: 'Visa', maskedNumber: '************0366' }`,
      explanation: "Credit card validation using the Luhn algorithm ensures mathematical validity and provides card type detection."
    }
  ],

  quiz: [
    {
      question: "Which is the best practice for client-side form validation?",
      options: [
        "Only use client-side validation for security",
        "Always validate on the server as well",
        "Use only built-in HTML5 validation",
        "Validate only on form submit"
      ],
      correct: 1,
      explanation: "Client-side validation improves user experience, but server-side validation is essential for security as client-side validation can be bypassed."
    }
  ],

  resources: [
    {
      title: "MDN Form Validation",
      url: "https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Constraint_validation"
    },
    {
      title: "Web Content Accessibility Guidelines",
      url: "https://www.w3.org/WAI/WCAG21/quickref/#forms"
    }
  ],

  nextModules: ['timers-intervals', 'security'],
  prerequisites: ['dom-basics', 'events', 'functions-basics']
};