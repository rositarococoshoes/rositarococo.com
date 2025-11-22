// Form Validation System - Inline Validations
// Replaces popup alerts with inline validation messages

class FormValidator {
    constructor(formId = 'restodelform') {
        this.form = document.getElementById(formId);
        this.errors = new Map();
        this.init();
    }

    init() {
        if (this.form) {
            this.addValidationListeners();
            console.log('✅ Form validator initialized');
        } else {
            console.error('❌ Form not found:', formId);
        }
    }

    // Show validation message for a field
    showFieldError(fieldId, message, scroll = false) {
        const field = document.getElementById(fieldId) || document.querySelector(`[name="${fieldId}"]`);
        if (!field) return;

        // Remove existing error and success styling
        this.clearFieldError(fieldId);
        this.clearFieldSuccess(fieldId);

        // Add error styling
        field.classList.add('input-error');

        // Create or update error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-validation-error';
        errorDiv.id = `${fieldId}-error`;
        errorDiv.textContent = message;

        // Insert error message after the field
        field.parentNode.insertBefore(errorDiv, field.nextSibling);

        // Store error reference
        this.errors.set(fieldId, errorDiv);

        // Smooth scroll to field with error AND focus ONLY if scroll=true
        if (scroll) {
            field.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });
            field.focus();
        }
    }

    // Show success styling for a field
    showFieldSuccess(fieldId) {
        const field = document.getElementById(fieldId) || document.querySelector(`[name="${fieldId}"]`);
        if (!field) return;

        // Remove existing error styling
        field.classList.remove('input-error');

        // Add success styling
        field.classList.add('input-success');
    }

    // Clear validation message for a field
    clearFieldError(fieldId) {
        const field = document.getElementById(fieldId) || document.querySelector(`[name="${fieldId}"]`);
        if (!field) return;

        // Remove error styling
        field.classList.remove('input-error');

        // Remove existing error message
        if (this.errors.has(fieldId)) {
            const errorDiv = this.errors.get(fieldId);
            if (errorDiv && errorDiv.parentNode) {
                errorDiv.parentNode.removeChild(errorDiv);
            }
            this.errors.delete(fieldId);
        }

        // Also remove any existing error div
        const existingError = document.getElementById(`${fieldId}-error`);
        if (existingError && existingError.parentNode) {
            existingError.parentNode.removeChild(existingError);
        }
    }

    // Clear success styling for a field
    clearFieldSuccess(fieldId) {
        const field = document.getElementById(fieldId) || document.querySelector(`[name="${fieldId}"]`);
        if (!field) return;

        // Remove success styling
        field.classList.remove('input-success');
    }

    // Clear all field errors
    clearAllErrors() {
        for (const [fieldId, errorDiv] of this.errors) {
            this.clearFieldError(fieldId);
        }
        this.errors.clear();
    }

    // Clear all field success styling
    clearAllSuccess() {
        const fields = this.form.querySelectorAll('input, select, textarea');
        fields.forEach(field => {
            const fieldId = field.id || field.name;
            this.clearFieldSuccess(fieldId);
        });
    }

    // Validate a single field
    validateField(fieldId, rules) {
        const field = document.getElementById(fieldId);
        if (!field) {
            // Try to find by name if ID doesn't work
            const fieldByName = document.querySelector(`[name="${fieldId}"]`);
            if (!fieldByName) return true;
        }

        const targetField = document.getElementById(fieldId) || document.querySelector(`[name="${fieldId}"]`);
        if (!targetField) return true;

        const value = targetField.value.trim();

        for (const rule of rules) {
            if (!rule.test(value)) {
                this.showFieldError(fieldId, rule.message);
                return false;
            }
        }

        this.clearFieldError(fieldId);
        return true;
    }

    // Validate the entire form (only on submit)
    validateForm() {
        this.clearAllErrors();
        this.clearAllSuccess();
        let isValid = true;
        let firstErrorField = null;

        // Define validation rules for each field - using correct form IDs
        const validationRules = {
            '1465946249': [ // Email
                { test: (v) => v.length > 0, message: 'Por favor, ingresa tu email' },
                { test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), message: 'Email inválido' }
            ],
            '1460904554': [ // Nombre
                { test: (v) => v.length > 0, message: 'Por favor, ingresa tu nombre y apellido' },
                { test: (v) => v.length >= 3, message: 'El nombre debe tener al menos 3 caracteres' }
            ],
            '53830725': [ // WhatsApp
                { test: (v) => v.length > 0, message: 'Por favor, ingresa tu número de WhatsApp' },
                { test: (v) => /^[0-9]{10,11}$/.test(v.replace(/[\s\-()]/g, '')), message: 'Formato de WhatsApp inválido (sin 0 ni 15)' }
            ],
            '951592426': [ // Dirección
                { test: (v) => v.length > 0, message: 'Por favor, ingresa tu dirección' },
                { test: (v) => v.length >= 5, message: 'La dirección debe tener al menos 5 caracteres' }
            ],
            '1005165410': [ // Código Postal
                { test: (v) => v.length > 0, message: 'Por favor, ingresa tu código postal' },
                { test: (v) => /^[0-9]{4,8}$/.test(v), message: 'Código postal inválido' }
            ],
            '1743418466': [ // Localidad
                { test: (v) => v.length > 0, message: 'Por favor, ingresa tu localidad' },
                { test: (v) => v.length >= 3, message: 'La localidad debe tener al menos 3 caracteres' }
            ],
            '59648134': [ // Provincia
                { test: (v) => v.length > 0, message: 'Por favor, selecciona tu provincia' },
                { test: (v) => v !== '-- Selecciona tu Provincia --', message: 'Por favor, selecciona una provincia válida' }
            ],
            '541001873': [ // DNI
                { test: (v) => v.length > 0, message: 'Por favor, ingresa tu DNI' },
                { test: (v) => /^[0-9]{7,8}$/.test(v), message: 'DNI inválido' }
            ],
            'comoabona': [ // Método de pago
                { test: (v) => v.length > 0, message: 'Por favor, selecciona un método de pago' },
                { test: (v) => v !== '-- Selecciona una opción --', message: 'Por favor, selecciona un método de pago válido' }
            ]
        };

        // Check cart has items first
        if (window.cartCount === 0) {
            this.showFieldError('cart-summary', 'No has seleccionado ningún producto. Por favor, elige al menos un par.');
            isValid = false;
            firstErrorField = 'cart-summary';
        }

        // Validate each field and track which ones are valid
        const validFields = [];
        for (const [fieldId, rules] of Object.entries(validationRules)) {
            const field = document.getElementById(fieldId) || document.querySelector(`[name="${fieldId}"]`);
            const value = field ? field.value.trim() : '';

            let fieldValid = true;
            for (const rule of rules) {
                if (!rule.test(value)) {
                    fieldValid = false;
                    break;
                }
            }

            if (fieldValid) {
                validFields.push(fieldId);
            } else {
                isValid = false;
                if (!firstErrorField) {
                    firstErrorField = fieldId;
                }
            }
        }

        // Show errors for invalid fields (with smooth scroll to first error)
        for (const [fieldId, rules] of Object.entries(validationRules)) {
            if (!validFields.includes(fieldId)) {
                this.validateField(fieldId, rules);
                if (fieldId === firstErrorField) {
                    // Show error with smooth scroll for first error field ONLY
                    setTimeout(() => {
                        this.showFieldError(fieldId, rules[0].message, true);
                    }, 100);
                } else {
                    // Show other errors WITHOUT focus
                    setTimeout(() => {
                        this.showFieldError(fieldId, rules[0].message, false);
                    }, 100);
                }
            }
        }

        // Show success for valid fields
        validFields.forEach(fieldId => {
            this.showFieldSuccess(fieldId);
        });

        return isValid;
    }

    // Add validation listeners to form inputs for real-time feedback
    addValidationListeners() {
        if (!this.form) return;

        // Define validation rules for each field - using correct form IDs
        const validationRules = {
            '1465946249': [ // Email
                { test: (v) => v.length > 0, message: 'Por favor, ingresa tu email' },
                { test: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), message: 'Email inválido' }
            ],
            '1460904554': [ // Nombre
                { test: (v) => v.length > 0, message: 'Por favor, ingresa tu nombre y apellido' },
                { test: (v) => v.length >= 3, message: 'El nombre debe tener al menos 3 caracteres' }
            ],
            '53830725': [ // WhatsApp
                { test: (v) => v.length > 0, message: 'Por favor, ingresa tu número de WhatsApp' },
                { test: (v) => /^[0-9]{10,11}$/.test(v.replace(/[\s\-()]/g, '')), message: 'Formato de WhatsApp inválido (sin 0 ni 15)' }
            ],
            '951592426': [ // Dirección
                { test: (v) => v.length > 0, message: 'Por favor, ingresa tu dirección' },
                { test: (v) => v.length >= 5, message: 'La dirección debe tener al menos 5 caracteres' }
            ],
            '1005165410': [ // Código Postal
                { test: (v) => v.length > 0, message: 'Por favor, ingresa tu código postal' },
                { test: (v) => /^[0-9]{4,8}$/.test(v), message: 'Código postal inválido' }
            ],
            '1743418466': [ // Localidad
                { test: (v) => v.length > 0, message: 'Por favor, ingresa tu localidad' },
                { test: (v) => v.length >= 3, message: 'La localidad debe tener al menos 3 caracteres' }
            ],
            '59648134': [ // Provincia
                { test: (v) => v.length > 0, message: 'Por favor, selecciona tu provincia' },
                { test: (v) => v !== '-- Selecciona tu Provincia --', message: 'Por favor, selecciona una provincia válida' }
            ],
            '541001873': [ // DNI
                { test: (v) => v.length > 0, message: 'Por favor, ingresa tu DNI' },
                { test: (v) => /^[0-9]{7,8}$/.test(v), message: 'DNI inválido' }
            ],
            'comoabona': [ // Método de pago
                { test: (v) => v.length > 0, message: 'Por favor, selecciona un método de pago' },
                { test: (v) => v !== '-- Selecciona una opción --', message: 'Por favor, selecciona un método de pago válido' }
            ]
        };

        // Add listeners to all required form inputs
        Object.keys(validationRules).forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field) return;

            const rules = validationRules[fieldId];

            // Validate on input (typing)
            field.addEventListener('input', () => {
                const value = field.value.trim();
                if (value.length > 0) {
                    // If user has typed something, validate it
                    this.validateFieldRealTime(fieldId, rules, value);
                } else {
                    // If field is empty, remove validation styling but don't show error
                    this.clearFieldError(fieldId);
                    this.clearFieldSuccess(fieldId);
                }
            });

            // Validate on change (for selects)
            field.addEventListener('change', () => {
                const value = field.value.trim();
                this.validateFieldRealTime(fieldId, rules, value);
            });

            // Validate on blur (when field loses focus)
            field.addEventListener('blur', () => {
                const value = field.value.trim();
                this.validateFieldRealTime(fieldId, rules, value);
            });
        });
    }

    // Real-time validation for individual field
    validateFieldRealTime(fieldId, rules, value) {
        let isValid = true;
        let errorMessage = '';

        // Check all rules
        for (const rule of rules) {
            if (!rule.test(value)) {
                isValid = false;
                errorMessage = rule.message;
                break;
            }
        }

        if (isValid) {
            // Field is valid - show green border and remove error
            this.clearFieldError(fieldId);
            this.showFieldSuccess(fieldId);
        } else {
            // Field is invalid - show red border and error message
            this.clearFieldSuccess(fieldId);
            this.showFieldError(fieldId, errorMessage, false);
        }

        return isValid;
    }

    // Show general notification
    showNotification(message, type = 'error') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `form-notification ${type}`;
        notification.textContent = message;

        // Add inline styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#dc2626' : '#10b981'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 9999;
            max-width: 300px;
            font-weight: 500;
            font-size: 14px;
            line-height: 1.4;
        `;

        // Add to page
        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 5000);
    }
}

// Replace alert function with inline validator
function showInlineAlert(message, type = 'error') {
    const validator = window.formValidator;
    if (validator) {
        validator.showNotification(message, type);
    } else {
        // Fallback to console if validator not available
        console.warn('Form validator not initialized:', message);
    }
}

// Enhanced alert replacement
const originalAlert = window.alert;
window.alert = function(message) {
    // Check if this is a form-related alert
    if (typeof message === 'string' && (
        message.includes('provincia') ||
        message.includes('campo') ||
        message.includes('obligatorio') ||
        message.includes('inválido') ||
        message.includes('selecciona') ||
        message.includes('completa')
    )) {
        showInlineAlert(message, 'error');
        return;
    }

    // For non-form alerts, show as inline notification
    showInlineAlert(message, 'info');
};

// Initialize validator when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.formValidator = new FormValidator('restodelform');

    // Replace any existing form validation that uses alerts - but only for the main checkout form
    const checkoutForm = document.getElementById('bootstrapForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            if (window.formValidator && !window.formValidator.validateForm()) {
                e.preventDefault();
                e.stopPropagation();
                return false;
            }
        });
    }
});

// Export for global access
window.FormValidator = FormValidator;
window.showInlineAlert = showInlineAlert;