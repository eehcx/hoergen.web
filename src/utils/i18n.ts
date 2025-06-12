interface Translations {
    [key: string]: any;
}

const defaultLang = 'en';
const languages = ['en', 'es'];

// Import dinámico de traducciones para todos los idiomas
const translations: Record<string, Translations> = {};
for (const lang of languages) {
    // @ts-ignore
    translations[lang] = await import(`../locales/${lang}.json`);
}

export { defaultLang, languages };

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
 * Get current language from URL
 * @param url Current URL object
 * @returns Language code
 */
export function getCurrentLang(url: URL): string {
    const pathname = url.pathname;
    const langCode = pathname.split('/')[1];
    return languages.includes(langCode) ? langCode : defaultLang;
}

/**
 * Get localized path
 * @param lang Language code
 * @param path Path without language prefix
 * @returns Localized path
 */
export function getLocalizedPath(lang: string, path: string = ''): string {
    if (lang === defaultLang) {
        return `/${lang}${path}`;
    }
    return `/${lang}${path}`;
}

/**
 * Get all language alternatives for current path
 * @param currentPath Current path without language prefix
 * @returns Array of language alternatives
 */
export function getLanguageAlternatives(currentPath: string) {
    return languages.map(lang => ({
        lang,
        path: getLocalizedPath(lang, currentPath),
        label: lang === 'en' ? 'English' : lang.toUpperCase()
    }));
}
