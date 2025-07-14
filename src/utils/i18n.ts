interface Translations {
    [key: string]: any;
}

const defaultLang = 'es';
const languages = ['en', 'es', 'de', 'fr', 'ru'];

// Import dinámico de traducciones para todos los idiomas
const translations: Record<string, Translations> = {};
for (const lang of languages) {
    // @ts-ignore
    translations[lang] = await import(`../locales/${lang}.json`);
}

export { defaultLang, languages };

/**
 * Detect preferred language from Accept-Language header
 * @param acceptLanguage Accept-Language header string
 * @returns Detected language code or default language
 */
function detectBrowserLanguage(acceptLanguage?: string): string {
    if (!acceptLanguage) return defaultLang;
    
    // Parse and sort by quality (q-value)
    const preferredLanguages = acceptLanguage
        .split(',')
        .map(lang => {
            const [code, q = 'q=1'] = lang.trim().split(';');
            const quality = parseFloat(q.replace('q=', ''));
            // Extract main language code (e.g., 'en' from 'en-US')
            const langCode = code.trim().split('-')[0].toLowerCase();
            return { code: langCode, quality };
        })
        .sort((a, b) => b.quality - a.quality);
    
    // Find first supported language
    for (const lang of preferredLanguages) {
        if (languages.includes(lang.code)) {
            return lang.code;
        }
    }
    
    return defaultLang;
}

/**
 * Get translation by key with dot notation support
 * @param lang Language code
 * @param key Translation key (supports dot notation like 'nav.title')
 * @returns Translated string
 */
export function t(lang: string, key: string): any {
    const keys = key.split('.');
    let value = translations[lang] || translations[defaultLang];
    
    for (const k of keys) {
        value = value[k];
        if (value === undefined) break;
    }
    
    return value || key;
}

/**
 * Get current language from URL, browser detection, or fallback to default
 * @param url Current URL object
 * @param request Astro request object (optional, for SSR detection)
 * @returns Language code
 */
export function getCurrentLang(url: URL, request?: Request): string {
    const pathname = url.pathname;
    const langCode = pathname.split('/')[1];
    
    // First priority: explicit language in URL path
    if (languages.includes(langCode)) {
        return langCode;
    }
    
    // Second priority: browser language detection (SSR)
    if (request) {
        const acceptLanguage = request.headers.get('accept-language');
        const detectedLang = detectBrowserLanguage(acceptLanguage || undefined);
        return detectedLang;
    }
    
    // Fallback: default language
    return defaultLang;
}

/**
 * Get browser language on client-side
 * @returns Detected language code or default
 */
export function getClientLanguage(): string {
    if (typeof window === 'undefined') return defaultLang;
    
    const browserLang = navigator.language.split('-')[0].toLowerCase();
    return languages.includes(browserLang) ? browserLang : defaultLang;
}

/**
 * Get localized path
 * @param lang Language code
 * @param path Path without language prefix
 * @returns Localized path
 */
export function getLocalizedPath(lang: string, path: string = ''): string {
    // For default language, don't add prefix unless explicitly needed
    if (lang === defaultLang) {
        return path || '/';
    }
    return `/${lang}${path}`;
}

/**
 * Get all language alternatives for current path
 * @param currentPath Current path without language prefix
 * @returns Array of language alternatives with labels
 */
export function getLanguageAlternatives(currentPath: string) {
    const languageLabels: Record<string, string> = {
        'en': 'English',
        'es': 'Español',
        'de': 'Deutsch',
        'fr': 'Français',
        'ru': 'Русский'
    };

    return languages.map(lang => ({
        lang,
        path: getLocalizedPath(lang, currentPath),
        label: languageLabels[lang] || lang.toUpperCase(),
        isDefault: lang === defaultLang
    }));
}

/**
 * Remove language prefix from path
 * @param pathname URL pathname
 * @returns Path without language prefix
 */
export function getPathWithoutLang(pathname: string): string {
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length > 0 && languages.includes(segments[0])) {
        return '/' + segments.slice(1).join('/');
    }
    return pathname;
}

/**
 * Check if path has language prefix
 * @param pathname URL pathname
 * @returns Boolean indicating if path has language prefix
 */
export function hasLangPrefix(pathname: string): boolean {
    const firstSegment = pathname.split('/')[1];
    return languages.includes(firstSegment);
}
