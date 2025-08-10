import { languages, defaultLang } from './i18n';

/**
 * Create route helpers for i18n navigation
 */
export class I18nRouter {
  private static instance: I18nRouter;
  
  public static getInstance(): I18nRouter {
    if (!I18nRouter.instance) {
      I18nRouter.instance = new I18nRouter();
    }
    return I18nRouter.instance;
  }

  /**
   * Get the localized URL for a given path and language
   */
  getLocalizedUrl(path: string, lang: string, baseUrl?: string): string {
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    const langPrefix = lang === defaultLang ? '' : `/${lang}`;
    const localizedPath = `${langPrefix}${cleanPath}`;
    
    if (baseUrl) {
      return new URL(localizedPath, baseUrl).toString();
    }
    
    return localizedPath;
  }

  /**
   * Get all language alternatives for the current page
   */
  getLanguageAlternatives(currentPath: string, baseUrl?: string) {
    const pathWithoutLang = this.removeLanguagePrefix(currentPath);
    
    return languages.map(lang => ({
      lang,
      url: this.getLocalizedUrl(pathWithoutLang, lang, baseUrl),
      hreflang: lang,
      isDefault: lang === defaultLang
    }));
  }

  /**
   * Remove language prefix from path
   */
  removeLanguagePrefix(path: string): string {
    const segments = path.split('/').filter(Boolean);
    
    if (segments.length > 0 && languages.includes(segments[0])) {
      return '/' + segments.slice(1).join('/');
    }
    
    return path;
  }

  /**
   * Extract language from path
   */
  extractLanguageFromPath(path: string): string | null {
    const segments = path.split('/').filter(Boolean);
    
    if (segments.length > 0 && languages.includes(segments[0])) {
      return segments[0];
    }
    
    return null;
  }

  /**
   * Check if a path needs language detection/redirection
   */
  needsLanguageDetection(path: string): boolean {
    // Root path or paths without language prefix need detection
    return path === '/' || !this.extractLanguageFromPath(path);
  }
}

export const i18nRouter = I18nRouter.getInstance();
