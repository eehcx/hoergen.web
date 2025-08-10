// API Configuration
export const API_CONFIG = {
    // Replace with your actual API endpoint
    FEEDBACK_ENDPOINT: 'https://nestjs-kzphduejga-uc.a.run.app/v2/feedback', //import.meta.env.FEEDBACK_API_URL || 
    
    // Request timeout in milliseconds
    TIMEOUT: 10000,
    
    // Default headers for API requests
    HEADERS: {
        'Content-Type': 'application/json',
        // Add authentication headers if needed
        // 'Authorization': `Bearer ${import.meta.env.API_KEY}`,
    },
    
    // Rate limiting (optional)
    RATE_LIMIT: {
        enabled: true,
        maxRequests: 5, // Max requests per window
        windowMs: 15 * 60 * 1000, // 15 minutes
    }
} as const;

// Form validation configuration
export const FORM_CONFIG = {
    NAME: {
        minLength: 2,
        maxLength: 100,
    },
    EMAIL: {
        maxLength: 255,
    },
    MESSAGE: {
        minLength: 10,
        maxLength: 2000,
    },
} as const;
