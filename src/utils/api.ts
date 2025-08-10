import type { ApiResponse, FeedbackFormData } from '@/types/forms';
import { API_CONFIG } from '@/config/api';

/**
 * Send feedback to your API endpoint
 */
export async function sendFeedback(data: FeedbackFormData): Promise<ApiResponse> {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

        const response = await fetch(API_CONFIG.FEEDBACK_ENDPOINT, {
            method: 'POST',
            headers: API_CONFIG.HEADERS,
            body: JSON.stringify(data),
            signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            return {
                success: false,
                error: errorData.message || `HTTP ${response.status}: ${response.statusText}`,
                errors: errorData.errors || [],
            };
        }

        const result = await response.json();
        return {
            success: true,
            data: result,
        };
    } catch (error) {
        console.error('API Error:', error);
        if (error instanceof Error) {
            if (error.name === 'AbortError') {
                return {
                    success: false,
                    error: 'Request timeout. Please try again.',
                };
            }
            return {
                success: false,
                error: error.message,
            };
        }
        
        return {
            success: false,
            error: 'An unexpected error occurred. Please try again.',
        };
    }
}

/**
 * Validate feedback form data
 */
export function validateFeedbackData(data: Partial<FeedbackFormData>): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!data.email || !isValidEmail(data.email)) {
        errors.push('Valid email is required');
    }

    if (!data.message || data.message.trim().length < 10) {
        errors.push('Message is required and must be at least 10 characters');
    }

    return {
        isValid: errors.length === 0,
        errors,
    };
}

/**
 * Simple email validation
 */
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
}

/**
 * Sanitize form data to prevent XSS
 */
export function sanitizeFeedbackData(data: Partial<FeedbackFormData>): FeedbackFormData {
    return {
        userId: data.userId ? sanitizeString(data.userId) : undefined,
        email: sanitizeString(data.email || ''),
        message: sanitizeString(data.message || ''),
        appPlatform: 'web',
    };
}

/**
 * Basic string sanitization
 */
function sanitizeString(str: string): string {
    return str
        .trim()
        .replace(/[<>\"']/g, '') // Remove potential XSS characters
        .substring(0, 1000); // Limit length
}
