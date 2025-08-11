# Arquitectura Técnica - Hörgen Radio

## Visión General

Hörgen Radio está construido como una **Single Page Application (SPA) estática** utilizando Astro, con un enfoque en rendimiento, accesibilidad y experiencia de usuario minimalista.

## Stack Tecnológico

### **Frontend Framework**
- **Astro v5.1.6**: Framework moderno para sitios web estáticos
- **TypeScript**: Tipado estático para mejor desarrollo y mantenimiento
- **Tailwind CSS v4**: Framework CSS utilitario (versión beta)

### **Build Tools & Bundlers**
- **Vite**: Bundler rápido y moderno
- **@tailwindcss/vite**: Plugin oficial de Tailwind para Vite
- **@astrojs/sitemap**: Generación automática de sitemap

### **Deployment & Hosting**
- **Firebase Hosting**: Plataforma de hosting estático
- **Output Static**: Generación de archivos estáticos para máximo rendimiento

### **Progressive Web App (PWA)**
- **@vite-pwa/astro**: Soporte para PWA con Astro
- **Service Workers**: Funcionalidad offline
- **Manifest**: Configuración de app móvil

## Estructura del Proyecto

```
hoergen.web/
├── public/                 # Archivos estáticos públicos
│   ├── avatars/           # Iconos y avatares
│   ├── fonts/             # Fuentes personalizadas
│   ├── platforms/         # Iconos de plataformas
│   ├── work/              # Imágenes del portfolio
│   └── site.webmanifest   # Configuración PWA
├── src/                   # Código fuente
│   ├── components/        # Componentes reutilizables
│   ├── config/           # Configuraciones
│   ├── layouts/          # Layouts de página
│   ├── locales/          # Archivos de internacionalización
│   ├── pages/            # Páginas de la aplicación
│   ├── styles/           # Estilos globales
│   ├── types/            # Definiciones de TypeScript
│   └── utils/            # Utilidades y helpers
├── astro.config.mjs      # Configuración de Astro
├── firebase.json         # Configuración de Firebase
├── package.json          # Dependencias y scripts
└── tsconfig.json         # Configuración de TypeScript
```

## Arquitectura de Componentes

### **Patrón de Diseño**
- **Componentes Modulares**: Cada componente tiene una responsabilidad específica
- **Props Interface**: Definición clara de propiedades con TypeScript
- **Composición**: Componentes pequeños que se combinan para crear funcionalidades complejas

### **Jerarquía de Componentes**
```
BaseLayout
├── BaseHead (SEO, meta tags)
├── Navigation (Navegación principal)
├── Page Content (Slot dinámico)
└── Footer (Pie de página)
```

### **Componentes Globales**
- **BaseHead**: Manejo de SEO y meta tags
- **Navigation**: Navegación principal con selector de idioma
- **Footer**: Pie de página con enlaces legales
- **DownloadButton**: Botón inteligente de descarga
- **PlatformIcon**: Iconos específicos por plataforma

### **Componentes de Landing**
- **Hero**: Sección principal con mensaje de marca
- **Banner**: Información destacada
- **Testimonials**: Opiniones de usuarios
- **Intro**: Descripción de la plataforma
- **Services**: Características principales
- **Work**: Portfolio visual
- **CTA**: Llamadas a la acción

## Sistema de Internacionalización (i18n)

### **Arquitectura i18n**
- **Archivos JSON**: Traducciones organizadas por idioma
- **Sistema de Claves**: Estructura jerárquica para traducciones
- **Fallback**: Sistema de respaldo para traducciones faltantes

### **Routing Multilingüe**
```typescript
// Configuración en astro.config.mjs
i18n: {
  defaultLocale: 'es',
  locales: ['en', 'es', 'de', 'fr', 'ru'],
  routing: {
    prefixDefaultLocale: true,
    redirectToDefaultLocale: false
  }
}
```

### **Detección de Idioma**
- **Cliente**: JavaScript inline para detección del navegador
- **Servidor**: Generación estática de páginas por idioma
- **Fallback**: Redirección al idioma por defecto

## Sistema de Estilos

### **Tailwind CSS v4**
- **Configuración**: Integración directa con Vite
- **Clases Utilitarias**: Sistema de clases atómicas
- **Responsive Design**: Breakpoints móviles primero
- **Custom Colors**: Paleta personalizada (orange, eagle)

### **Sistema de Diseño**
- **Tipografía**: Font Display para títulos, Inter para cuerpo
- **Espaciado**: Sistema de espaciado consistente
- **Colores**: Paleta limitada para consistencia visual
- **Animaciones**: Transiciones suaves y efectos hover

### **CSS Personalizado**
- **Variables CSS**: Colores y tipografía personalizados
- **Animaciones**: Keyframes personalizados
- **Gradientes**: Efectos visuales avanzados

## Generación Estática

### **Build Process**
1. **Pre-renderizado**: Generación de HTML estático
2. **Optimización**: Compresión y minificación
3. **Assets**: Optimización de imágenes y fuentes
4. **Sitemap**: Generación automática de mapa del sitio

### **Output Optimization**
- **Compresión HTML**: Reducción del tamaño de archivos
- **Tree Shaking**: Eliminación de código no utilizado
- **Code Splitting**: División inteligente de bundles
- **Lazy Loading**: Carga diferida de componentes

## Performance & SEO

### **Optimizaciones de Rendimiento**
- **Static Generation**: HTML pre-generado para máximo rendimiento
- **Image Optimization**: Optimización automática de imágenes
- **Font Loading**: Carga optimizada de fuentes web
- **Critical CSS**: CSS crítico inline

### **SEO Features**
- **Meta Tags**: Configuración dinámica por página
- **Structured Data**: Datos estructurados para motores de búsqueda
- **Sitemap**: Generación automática de sitemap
- **Alternate Languages**: Enlaces hreflang para idiomas

## Seguridad

### **Mejores Prácticas**
- **Content Security Policy**: Headers de seguridad
- **HTTPS Only**: Redirección forzada a HTTPS
- **Input Validation**: Validación de formularios
- **XSS Prevention**: Sanitización de contenido

## Deployment & CI/CD

### **Firebase Hosting**
- **Configuración**: `firebase.json`
- **Build Process**: `npm run build`
- **Deployment**: `firebase deploy`

### **Optimizaciones de Producción**
- **Gzip Compression**: Compresión automática de archivos
- **Cache Headers**: Headers de caché optimizados
- **CDN**: Distribución global de contenido
- **SSL**: Certificados SSL automáticos

## Monitoreo & Analytics

### **Performance Monitoring**
- **Core Web Vitals**: Métricas de rendimiento web
- **Lighthouse**: Auditorías de rendimiento
- **Real User Monitoring**: Métricas de usuarios reales

### **Error Tracking**
- **Console Logging**: Logs del lado cliente
- **Error Boundaries**: Manejo de errores en componentes

## Escalabilidad

### **Arquitectura Escalable**
- **Componentes Reutilizables**: Sistema de componentes modulares
- **Configuración Centralizada**: Configuraciones en archivos centrales
- **Type Safety**: TypeScript para prevenir errores
- **Testing Ready**: Estructura preparada para testing

### **Futuras Mejoras**
- **Micro-frontends**: Arquitectura de micro-frontends
- **API Integration**: Integración con APIs externas
- **Real-time Features**: Funcionalidades en tiempo real
- **Offline Support**: Funcionalidad offline completa

## Consideraciones de Desarrollo

### **Development Workflow**
1. **Local Development**: `npm run dev`
2. **Testing**: Testing de componentes y páginas
3. **Build**: `npm run build`
4. **Preview**: `npm run preview`
5. **Deploy**: `firebase deploy`

### **Code Quality**
- **TypeScript**: Tipado estático para mejor calidad
- **ESLint**: Linting de código
- **Prettier**: Formateo automático
- **Git Hooks**: Hooks pre-commit

### **Documentation**
- **Component Docs**: Documentación de componentes
- **API Docs**: Documentación de APIs
- **Architecture Docs**: Documentación de arquitectura
- **Deployment Guide**: Guía de deployment

---

*Esta documentación se actualiza regularmente con cada nueva versión de la aplicación.*
