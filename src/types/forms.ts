export interface FeedbackFormData {
    userId?: string;
    email: string;
    message: string;
    appPlatform: 'web' | 'mobile' | 'desktop';
}

export interface FormFieldError {
    field: string;
    message: string;
}

export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: string;
    errors?: FormFieldError[];
}

export interface FormValidationRule {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    pattern?: RegExp;
    custom?: (value: string) => boolean | string;
}

export interface FormField {
    name: string;
    label: string;
    type: 'text' | 'email' | 'textarea' | 'select' | 'tel' | 'url' | 'password';
    rules?: FormValidationRule;
    placeholder?: string;
    options?: { value: string; label: string }[];
}
