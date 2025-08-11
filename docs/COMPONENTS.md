# Componentes - Hörgen Radio

## Visión General

Los componentes de Hörgen Radio están diseñados siguiendo principios de **modularidad**, **reutilización** y **consistencia visual**. Cada componente tiene una responsabilidad específica y puede ser combinado con otros para crear funcionalidades complejas.

## Estructura de Componentes

```
src/components/
├── BaseHead.astro              # Componente base para SEO y meta tags
├── forms/                      # Componentes de formularios
│   ├── FormInput.astro        # Campo de entrada de texto
│   ├── FormSelect.astro       # Campo de selección
│   └── FormTextarea.astro     # Campo de texto multilínea
├── global/                     # Componentes globales reutilizables
│   ├── DownloadButton.astro   # Botón inteligente de descarga
│   ├── Footer.astro           # Pie de página
│   ├── LanguageSelector.astro # Selector de idioma
│   ├── Navigation.astro       # Navegación principal
│   ├── PlatformIcon.astro     # Iconos de plataforma
│   └── VersionAccordion.astro # Acordeón de versiones
├── landing/                    # Componentes específicos de la página principal
│   ├── Banner.astro           # Banner informativo
│   ├── Cta.astro              # Llamada a la acción
│   ├── Hero.astro             # Sección hero principal
│   ├── Intro.astro            # Introducción de la plataforma
│   ├── Services.astro         # Servicios y características
│   ├── Testimonials.astro     # Testimonios de usuarios
│   └── Work.astro             # Portfolio de trabajo
└── SeoAlternates.astro        # Componente para SEO multilingüe
```

## Componentes Base

### **BaseHead.astro**
**Propósito**: Manejo centralizado de SEO y meta tags para todas las páginas.

**Props**:
```typescript
interface Props {
  title?: string;        // Título de la página
  desc?: string;         // Descripción meta
  lang?: string;         // Idioma de la página
}
```

**Características**:
- Meta tags dinámicos por página
- Soporte para Open Graph
- Configuración de Twitter Cards
- Favicon y manifest automáticos
- Preload de fuentes críticas

**Uso**:
```astro
<BaseHead 
  title="Hörgen Radio - Descargas" 
  desc="Descarga la aplicación Hörgen para tu plataforma"
  lang="es"
/>
```

## Componentes de Formularios

### **FormInput.astro**
**Propósito**: Campo de entrada de texto reutilizable con validación.

**Props**:
```typescript
interface Props {
  type?: "text" | "email" | "password" | "tel";
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  value?: string;
}
```

**Características**:
- Estilos consistentes con Tailwind CSS
- Manejo de estados de error
- Accesibilidad completa (ARIA labels)
- Validación visual

### **FormSelect.astro**
**Propósito**: Campo de selección con opciones predefinidas.

**Props**:
```typescript
interface Props {
  name: string;
  label?: string;
  options: Array<{value: string, label: string}>;
  required?: boolean;
  error?: string;
  selected?: string;
}
```

### **FormTextarea.astro**
**Propósito**: Campo de texto multilínea para comentarios largos.

**Props**:
```typescript
interface Props {
  name: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  error?: string;
  value?: string;
}
```

## Componentes Globales

### **DownloadButton.astro**
**Propósito**: Botón inteligente de descarga que detecta automáticamente la plataforma del usuario.

**Props**:
```typescript
interface Props {
  lang?: string;                    // Idioma para traducciones
  variant?: "primary" | "header" | "secondary";  // Variante visual
  size?: "sm" | "md" | "lg";       // Tamaño del botón
}
```

**Características**:
- **Detección Automática de Plataforma**: Windows, Linux, Android, macOS
- **Adaptación Dinámica**: Texto e iconos según la plataforma
- **URLs Personalizadas**: Enlaces de descarga específicos por plataforma
- **Responsive**: Adaptación del texto según el tamaño de pantalla
- **Estados Visuales**: Hover, focus y estados activos

**Funcionalidades JavaScript**:
```javascript
// Detección de plataforma
function detectPlatform() {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  
  if (/Android/i.test(userAgent)) return "android";
  if (/Windows/i.test(userAgent)) return "windows";
  if (/Linux/i.test(userAgent)) return "linux";
  if (/Mac/i.test(userAgent)) return "macos";
  
  return "windows"; // Fallback
}

// URLs de descarga por plataforma
const downloadUrls = {
  windows: "https://download.hoergen.com/Hoergen-Setup-0.1.4.exe",
  linux: "https://download.hoergen.com/Hoergen-0.1.4-x86_64.AppImage",
  android: "https://download.hoergen.com/app-release.apk",
  macos: "/"
};
```

### **Navigation.astro**
**Propósito**: Navegación principal con selector de idioma integrado.

**Props**:
```typescript
interface Props {
  lang: string;  // Idioma actual de la página
}
```

**Características**:
- Menú de navegación responsive
- Selector de idioma con banderas
- Logo de la marca
- Enlaces a páginas principales
- Navegación móvil con hamburger menu

### **Footer.astro**
**Propósito**: Pie de página con información de la empresa y enlaces legales.

**Props**:
```typescript
interface Props {
  lang: string;  // Idioma para traducciones
}
```

**Características**:
- Información de la empresa
- Enlaces a políticas legales
- Descripción de la marca
- Traducciones multilingües

### **LanguageSelector.astro**
**Propósito**: Selector de idioma con banderas y navegación.

**Características**:
- Banderas de países para cada idioma
- Dropdown responsive
- Navegación automática al cambiar idioma
- Indicador visual del idioma actual

### **PlatformIcon.astro**
**Propósito**: Iconos específicos para cada plataforma de descarga.

**Props**:
```typescript
interface Props {
  platform: "windows" | "linux" | "android" | "macos";
  size?: "sm" | "md" | "lg";
  className?: string;
}
```

**Características**:
- Iconos SVG optimizados
- Tamaños configurables
- Estilos consistentes
- Accesibilidad con alt text

### **VersionAccordion.astro**
**Propósito**: Acordeón expandible para mostrar versiones disponibles.

**Props**:
```typescript
interface Props {
  versions: Array<{
    version: string;
    date: string;
    changes: string[];
    downloads: Record<string, string>;
  }>;
  downloads: Record<string, any>;
  lang: string;
}
```

**Características**:
- Acordeón expandible por versión
- Información detallada de cambios
- Enlaces de descarga por plataforma
- Traducciones multilingües

## Componentes de Landing

### **Hero.astro**
**Propósito**: Sección principal de la página de inicio con mensaje de marca.

**Props**:
```typescript
interface Props {
  lang?: string;  // Idioma para traducciones
}
```

**Características**:
- Título principal de la marca
- Mensaje inspirador
- Integración con Banner y Testimonials
- Diseño minimalista y impactante

### **Banner.astro**
**Propósito**: Banner informativo destacado en la página principal.

**Características**:
- Información importante de la marca
- Diseño llamativo
- Integración con Hero section

### **Testimonials.astro**
**Propósito**: Muestra testimonios reales de usuarios de la plataforma.

**Props**:
```typescript
interface Props {
  lang: string;  // Idioma para traducciones
}
```

**Características**:
- Testimonios de usuarios reales
- Nombres y ubicaciones de usuarios
- Diseño de tarjetas
- Traducciones multilingües

### **Intro.astro**
**Propósito**: Introducción detallada de la plataforma y su comunidad.

**Props**:
```typescript
interface Props {
  lang: string;  // Idioma para traducciones
}
```

**Características**:
- Descripción de la plataforma
- Información sobre la comunidad
- Texto explicativo extenso
- Traducciones multilingües

### **Services.astro**
**Propósito**: Presentación de las características principales del servicio.

**Props**:
```typescript
interface Props {
  lang: string;  // Idioma para traducciones
}
```

**Características**:
- Lista de características principales
- Descripción de cada servicio
- Diseño de tarjetas
- Traducciones multilingües

### **Work.astro**
**Propósito**: Portfolio visual de la aplicación y su trabajo.

**Props**:
```typescript
interface Props {
  lang: string;  // Idioma para traducciones
}
```

**Características**:
- Galería de imágenes de la aplicación
- Portfolio visual del trabajo
- Diseño de grid responsive
- Imágenes optimizadas

### **Cta.astro**
**Propósito**: Llamada a la acción principal para descargar la aplicación.

**Props**:
```typescript
interface Props {
  lang: string;  // Idioma para traducciones
}
```

**Características**:
- Mensaje motivacional
- Botón de descarga principal
- Diseño llamativo
- Traducciones multilingües

## Componentes de SEO

### **SeoAlternates.astro**
**Propósito**: Generación automática de enlaces alternativos para SEO multilingüe.

**Características**:
- Enlaces hreflang automáticos
- Soporte para 5 idiomas
- Configuración de idioma por defecto
- Mejora del SEO internacional

## Patrones de Diseño

### **Consistencia Visual**
- **Paleta de Colores**: Uso consistente de orange, eagle, black y white
- **Tipografía**: Font Display para títulos, Inter para cuerpo
- **Espaciado**: Sistema de espaciado consistente con Tailwind
- **Bordes**: `border-white/20` para separadores sutiles

### **Responsive Design**
- **Mobile First**: Diseño optimizado para móviles
- **Breakpoints**: Uso de breakpoints de Tailwind CSS
- **Adaptación**: Componentes que se adaptan a diferentes tamaños
- **Touch Friendly**: Interacciones optimizadas para touch

### **Accesibilidad**
- **ARIA Labels**: Etiquetas de accesibilidad completas
- **Keyboard Navigation**: Navegación por teclado
- **Screen Reader Support**: Soporte para lectores de pantalla
- **Color Contrast**: Contraste de colores adecuado

### **Performance**
- **Lazy Loading**: Carga diferida de componentes pesados
- **Image Optimization**: Optimización automática de imágenes
- **Code Splitting**: División inteligente de código
- **Tree Shaking**: Eliminación de código no utilizado

## Mejores Prácticas

### **Naming Conventions**
- **Componentes**: PascalCase (ej: `DownloadButton.astro`)
- **Archivos**: kebab-case (ej: `download-button.astro`)
- **Props**: camelCase (ej: `downloadUrl`)
- **Interfaces**: PascalCase con sufijo Props (ej: `DownloadButtonProps`)

### **Props Interface**
- **Siempre definir interfaces**: Para mejor tipado y documentación
- **Props opcionales**: Usar `?` para props no requeridas
- **Valores por defecto**: Proporcionar valores por defecto cuando sea posible
- **Validación**: Validar props en el componente

### **Reutilización**
- **Componentes pequeños**: Crear componentes específicos y reutilizables
- **Composición**: Combinar componentes pequeños para funcionalidades complejas
- **Props flexibles**: Hacer componentes configurables a través de props
- **Evitar duplicación**: Reutilizar componentes existentes

### **Testing**
- **Componentes aislados**: Cada componente debe ser testeable de forma independiente
- **Props testing**: Probar diferentes combinaciones de props
- **Edge cases**: Considerar casos límite y errores
- **Accessibility testing**: Verificar accesibilidad de cada componente

## Ejemplos de Uso

### **Crear un Nuevo Componente**
```astro
---
// src/components/Example.astro
export interface Props {
  title: string;
  description?: string;
  variant?: "primary" | "secondary";
}

const { title, description, variant = "primary" } = Astro.props;
---

<div class={`example-component example-${variant}`}>
  <h2 class="text-white font-display uppercase">{title}</h2>
  {description && <p class="text-eagle">{description}</p>}
</div>

<style>
  .example-component {
    @apply p-6 border border-white/20;
  }
  
  .example-primary {
    @apply bg-orange/10;
  }
  
  .example-secondary {
    @apply bg-eagle/10;
  }
</style>
```

### **Usar un Componente**
```astro
---
import Example from "@/components/Example.astro";
---

<Example 
  title="Título del Ejemplo"
  description="Descripción opcional del ejemplo"
  variant="primary"
/>
```

---

*Esta documentación se actualiza con cada nuevo componente o cambio en la arquitectura.*
