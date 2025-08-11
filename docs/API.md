# API y Utilidades - Hörgen Radio

## Visión General

Esta documentación cubre las APIs, utilidades y funciones auxiliares utilizadas en Hörgen Radio para manejar internacionalización, configuración y funcionalidades del sistema.

## Estructura de Utilidades

```
src/utils/
├── api.ts           # Funciones de API y servicios externos
├── i18n.ts          # Sistema de internacionalización
└── i18n-router.ts   # Utilidades de routing multilingüe

src/config/
└── api.ts           # Configuración de APIs y endpoints
```

## Sistema de Internacionalización (i18n)

### **i18n.ts - Sistema Principal**

**Propósito**: Manejo centralizado de traducciones y configuración de idiomas.

#### **Configuración de Idiomas**
```typescript
export const defaultLang = 'es';
export const languages = ['en', 'es', 'de', 'fr', 'ru'] as const;
export type Language = typeof languages[number];

export const languageNames = {
  en: 'English',
  es: 'Español',
  de: 'Deutsch',
  fr: 'Français',
  ru: 'Русский'
} as const;
```

#### **Función de Traducción Principal**
```typescript
export function t(lang: Language, key: string): any {
  try {
    const keys = key.split('.');
    let value = locales[lang] || locales[defaultLang];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  } catch (error) {
    console.warn(`Translation key not found: ${key} for language: ${lang}`);
    return key;
  }
}
```

#### **Detección de Idioma**
```typescript
export function getCurrentLang(pathname: string): Language | undefined {
  const segments = pathname.split('/');
  const lang = segments[1] as Language;
  
  return languages.includes(lang) ? lang : undefined;
}

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  return languages.includes(lang as Language) ? lang as Language : defaultLang;
}
```

#### **Generación de Rutas**
```typescript
export function getRelativeUrl(url: URL, lang: Language): string {
  const [, ...pathSegments] = url.pathname.split('/');
  const path = pathSegments.join('/');
  
  if (lang === defaultLang) {
    return `/${path}`;
  }
  
  return `/${lang}/${path}`;
}

export function getAbsoluteUrl(url: URL, lang: Language): string {
  const relativeUrl = getRelativeUrl(url, lang);
  return `${url.origin}${relativeUrl}`;
}
```

### **i18n-router.ts - Utilidades de Routing**

**Propósito**: Funciones auxiliares para el manejo de rutas multilingües.

#### **Generación de Paths Estáticos**
```typescript
export function getStaticPaths(): Array<{params: {lang: Language}}> {
  return languages.map(lang => ({
    params: { lang }
  }));
}

export function getStaticPathsWithFallback(): Array<{params: {lang: Language}}> {
  return [
    { params: { lang: 'es' } },
    { params: { lang: 'en' } },
    { params: { lang: 'de' } },
    { params: { lang: 'fr' } },
    { params: { lang: 'ru' } }
  ];
}
```

#### **Validación de Idioma**
```typescript
export function isValidLanguage(lang: string): lang is Language {
  return languages.includes(lang as Language);
}

export function getFallbackLanguage(lang: string): Language {
  return isValidLanguage(lang) ? lang : defaultLang;
}
```

## Configuración de API

### **config/api.ts**

**Propósito**: Configuración centralizada de endpoints y servicios externos.

#### **Configuración Base**
```typescript
export const API_CONFIG = {
  baseUrl: process.env.PUBLIC_API_URL || 'https://api.hoergen.com',
  timeout: 10000,
  retries: 3,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
} as const;

export const ENDPOINTS = {
  // Descargas
  downloads: {
    windows: 'https://download.hoergen.com/Hoergen-Setup-0.1.4.exe',
    linux: 'https://download.hoergen.com/Hoergen-0.1.4-x86_64.AppImage',
    android: 'https://download.hoergen.com/app-release.apk',
    macos: 'https://download.hoergen.com/Hoergen-0.1.4.dmg'
  },
  
  // APIs externas
  external: {
    analytics: 'https://analytics.hoergen.com',
    feedback: 'https://feedback.hoergen.com/api',
    status: 'https://status.hoergen.com/api'
  }
} as const;
```

#### **Tipos de Configuración**
```typescript
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export interface DownloadInfo {
  platform: 'windows' | 'linux' | 'android' | 'macos';
  version: string;
  url: string;
  size: string;
  checksum: string;
  releaseDate: string;
}

export interface VersionInfo {
  version: string;
  date: string;
  changes: string[];
  downloads: Record<string, DownloadInfo>;
  isLatest: boolean;
}
```

## Funciones de API

### **utils/api.ts**

**Propósito**: Funciones para interactuar con APIs externas y servicios.

#### **Cliente HTTP Base**
```typescript
class ApiClient {
  private baseUrl: string;
  private timeout: number;
  private headers: Record<string, string>;

  constructor(config: typeof API_CONFIG) {
    this.baseUrl = config.baseUrl;
    this.timeout = config.timeout;
    this.headers = config.headers;
  }

  private async request<T>(
    endpoint: string, 
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(url, {
        ...options,
        headers: { ...this.headers, ...options.headers },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return {
        success: true,
        data,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      clearTimeout(timeoutId);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      };
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data)
    });
  }
}

export const apiClient = new ApiClient(API_CONFIG);
```

#### **Funciones de Descarga**
```typescript
export async function getDownloadInfo(platform: string): Promise<DownloadInfo | null> {
  try {
    const response = await apiClient.get<DownloadInfo>(`/downloads/${platform}`);
    
    if (response.success && response.data) {
      return response.data;
    }
    
    return null;
  } catch (error) {
    console.error(`Error fetching download info for ${platform}:`, error);
    return null;
  }
}

export async function getLatestVersion(): Promise<string | null> {
  try {
    const response = await apiClient.get<{version: string}>('/versions/latest');
    
    if (response.success && response.data) {
      return response.data.version;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching latest version:', error);
    return null;
  }
}

export async function getAllVersions(): Promise<VersionInfo[]> {
  try {
    const response = await apiClient.get<VersionInfo[]>('/versions');
    
    if (response.success && response.data) {
      return response.data;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching versions:', error);
    return [];
  }
}
```

#### **Funciones de Feedback**
```typescript
export interface FeedbackData {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: 'bug' | 'feature' | 'general';
  priority?: 'low' | 'medium' | 'high';
}

export async function submitFeedback(data: FeedbackData): Promise<boolean> {
  try {
    const response = await apiClient.post('/feedback', data);
    return response.success;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return false;
  }
}
```

#### **Funciones de Analytics**
```typescript
export interface AnalyticsEvent {
  event: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  customData?: Record<string, any>;
}

export async function trackEvent(event: AnalyticsEvent): Promise<void> {
  try {
    await apiClient.post('/analytics/track', event);
  } catch (error) {
    console.error('Error tracking analytics event:', error);
  }
}

export async function trackPageView(page: string, lang: string): Promise<void> {
  await trackEvent({
    event: 'page_view',
    category: 'navigation',
    action: 'view',
    label: page,
    customData: { language: lang }
  });
}

export async function trackDownload(platform: string, version: string): Promise<void> {
  await trackEvent({
    event: 'download',
    category: 'engagement',
    action: 'download',
    label: platform,
    customData: { version, platform }
  });
}
```

## Utilidades del Sistema

### **Detección de Plataforma**
```typescript
export function detectPlatform(): 'windows' | 'linux' | 'android' | 'macos' {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;

  if (/Android/i.test(userAgent)) {
    return 'android';
  } else if (/Windows/i.test(userAgent) || /Win/i.test(platform)) {
    return 'windows';
  } else if (/Linux/i.test(userAgent) || /Linux/i.test(platform)) {
    return 'linux';
  } else if (/Mac/i.test(userAgent) || /Mac/i.test(platform)) {
    return 'macos';
  } else {
    return 'windows'; // Fallback
  }
}

export function getPlatformName(platform: string): string {
  const names = {
    windows: 'Windows',
    linux: 'Linux',
    android: 'Android',
    macos: 'macOS'
  };
  
  return names[platform as keyof typeof names] || platform;
}
```

### **Manejo de URLs**
```typescript
export function buildDownloadUrl(platform: string, version: string): string {
  const baseUrls = ENDPOINTS.downloads;
  const platformKey = platform as keyof typeof baseUrls;
  
  if (platformKey in baseUrls) {
    return baseUrls[platformKey];
  }
  
  // Fallback a URL genérica
  return `${ENDPOINTS.external.analytics}/download/${platform}/${version}`;
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

export function getUrlParams(url: string): Record<string, string> {
  try {
    const urlObj = new URL(url);
    const params: Record<string, string> = {};
    
    urlObj.searchParams.forEach((value, key) => {
      params[key] = value;
    });
    
    return params;
  } catch {
    return {};
  }
}
```

### **Validación de Datos**
```typescript
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validateRequired(value: any): boolean {
  return value !== null && value !== undefined && value !== '';
}

export function validateLength(value: string, min: number, max?: number): boolean {
  if (value.length < min) return false;
  if (max && value.length > max) return false;
  return true;
}

export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remover tags HTML básicos
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
```

### **Manejo de Errores**
```typescript
export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function handleApiError(error: any): string {
  if (error instanceof ApiError) {
    return error.message;
  }
  
  if (error.name === 'AbortError') {
    return 'Request timeout. Please try again.';
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred. Please try again.';
}

export function isNetworkError(error: any): boolean {
  return error.name === 'TypeError' && error.message.includes('fetch');
}
```

## Hooks y Utilidades de React (Futuro)

### **useApi Hook**
```typescript
import { useState, useEffect } from 'react';

export function useApi<T>(
  endpoint: string,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiClient.get<T>(endpoint);
        
        if (mounted) {
          if (response.success && response.data) {
            setData(response.data);
          } else {
            setError(response.error || 'Failed to fetch data');
          }
        }
      } catch (err) {
        if (mounted) {
          setError(handleApiError(err));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, dependencies);

  return { data, loading, error, refetch: () => fetchData() };
}
```

### **useLocalStorage Hook**
```typescript
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}
```

## Testing de Utilidades

### **Ejemplo de Test para i18n**
```typescript
// __tests__/utils/i18n.test.ts
import { t, getCurrentLang, getLangFromUrl } from '@/utils/i18n';

describe('i18n utilities', () => {
  test('t function returns correct translation', () => {
    const result = t('es', 'hero.title');
    expect(result).toBe('Sin algoritmos. Solo humanos seleccionando las frecuencias más underground. Entra. Sin poses. Solo esencial.');
  });

  test('t function falls back to key when translation not found', () => {
    const result = t('es', 'nonexistent.key');
    expect(result).toBe('nonexistent.key');
  });

  test('getCurrentLang extracts language from pathname', () => {
    const result = getCurrentLang('/en/downloads');
    expect(result).toBe('en');
  });

  test('getCurrentLang returns undefined for invalid path', () => {
    const result = getCurrentLang('/invalid/path');
    expect(result).toBeUndefined();
  });
});
```

### **Ejemplo de Test para API**
```typescript
// __tests__/utils/api.test.ts
import { detectPlatform, validateEmail, sanitizeInput } from '@/utils/api';

describe('API utilities', () => {
  test('detectPlatform returns correct platform', () => {
    // Mock navigator
    Object.defineProperty(navigator, 'userAgent', {
      value: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
      configurable: true
    });

    const result = detectPlatform();
    expect(result).toBe('windows');
  });

  test('validateEmail validates correct emails', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
  });

  test('sanitizeInput removes dangerous characters', () => {
    const input = '<script>alert("xss")</script>';
    const result = sanitizeInput(input);
    expect(result).not.toContain('<');
    expect(result).not.toContain('>');
  });
});
```

## Consideraciones de Performance

### **Lazy Loading de Traducciones**
```typescript
export async function loadLanguage(lang: Language): Promise<void> {
  if (lang in locales) return; // Ya cargado
  
  try {
    const module = await import(`../locales/${lang}.json`);
    locales[lang] = module.default;
  } catch (error) {
    console.error(`Failed to load language: ${lang}`, error);
    // Fallback al idioma por defecto
    locales[lang] = locales[defaultLang];
  }
}
```

### **Caché de Respuestas API**
```typescript
const apiCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutos

export async function cachedApiRequest<T>(
  endpoint: string,
  ttl: number = CACHE_TTL
): Promise<ApiResponse<T>> {
  const cacheKey = endpoint;
  const cached = apiCache.get(cacheKey);
  
  if (cached && Date.now() - cached.timestamp < ttl) {
    return { success: true, data: cached.data, timestamp: new Date().toISOString() };
  }
  
  const response = await apiClient.get<T>(endpoint);
  
  if (response.success && response.data) {
    apiCache.set(cacheKey, {
      data: response.data,
      timestamp: Date.now()
    });
  }
  
  return response;
}
```

---

*Esta documentación se actualiza con cada nueva funcionalidad o cambio en la API.*
