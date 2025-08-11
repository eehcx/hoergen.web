# Hörgen Radio - Documentación

## Descripción General

**Hörgen Radio** es una aplicación web de transmisión global de cultura House y Techno Underground. La plataforma ofrece una experiencia minimalista y auténtica para descubrir estaciones de radio underground seleccionadas por humanos, sin algoritmos ni contenido mainstream.

## Características Principales

### 🎵 **Transmisión Underground**
- Estaciones de techno alemán y música electrónica underground
- Selección manual de contenido por expertos
- Sin algoritmos ni recomendaciones automatizadas
- Interfaz minimalista y sin distracciones

### 🌍 **Multilingüe**
- Soporte para 5 idiomas: Español, Inglés, Alemán, Francés y Ruso
- Detección automática del idioma del navegador
- Redirección inteligente basada en preferencias del usuario

### 📱 **Multiplataforma**
- Aplicación web responsive
- Aplicación de escritorio Electron para Windows, Linux y macOS
- Aplicación móvil Android
- Interfaz adaptativa para todos los dispositivos

### 🎨 **Diseño Minimalista**
- Interfaz "cruda" e intencional
- Sin likes, filtros o distracciones visuales
- Diseñado como un "club digital"
- Enfoque en la música y la experiencia

## Arquitectura Técnica

### **Stack Tecnológico**
- **Frontend**: Astro + Tailwind CSS
- **Estilos**: Tailwind CSS v4 (beta)
- **Internacionalización**: Sistema i18n personalizado
- **Deployment**: Firebase Hosting
- **PWA**: Soporte para Progressive Web App

### **Estructura del Proyecto**
```
src/
├── components/          # Componentes reutilizables
│   ├── global/         # Componentes globales (navegación, footer)
│   ├── landing/        # Componentes de la página principal
│   └── forms/          # Componentes de formularios
├── layouts/            # Layouts de página
├── pages/              # Páginas de la aplicación
│   └── [lang]/         # Páginas con soporte multilingüe
├── locales/            # Archivos de traducción
├── styles/             # Estilos globales
├── utils/              # Utilidades y helpers
└── types/              # Definiciones de TypeScript
```

## Funcionalidades por Página

### 🏠 **Página Principal (`/`)**
- **Hero Section**: Mensaje principal de la marca
- **Banner**: Información destacada
- **Testimonios**: Opiniones de usuarios reales
- **Introducción**: Descripción de la plataforma
- **Servicios**: Características principales
- **Portfolio de Trabajo**: Muestra visual de la aplicación
- **Call to Action**: Botón de descarga principal

### 📥 **Descargas (`/downloads`)**
- **Detección Automática de Plataforma**: Windows, Linux, Android, macOS
- **Botón de Descarga Inteligente**: Se adapta según el dispositivo
- **Versiones Disponibles**: Historial de versiones con notas de lanzamiento
- **Opciones de Descarga**: Instalador, portable, AppImage, APK

### 👥 **Creadores (`/creators`)**
- Información sobre los creadores de contenido
- Estaciones y DJs destacados
- Comunidad de artistas underground

### 🎧 **Oyentes (`/listeners`)**
- Perfil de la audiencia objetivo
- Comunidad de ravers y amantes del techno
- Experiencias de usuario

### 💬 **Feedback (`/feedback`)**
- Formulario de contacto
- Sistema de reportes
- Sugerencias de mejora

### 📋 **Legal**
- **Política de Privacidad** (`/privacy`)
- **Términos de Servicio** (`/terms`)

## Componentes Principales

### **DownloadButton**
- Detección automática de plataforma
- Adaptación del texto según el dispositivo
- Iconos específicos por plataforma
- URLs de descarga personalizadas

### **Navigation**
- Menú de navegación multilingüe
- Selector de idioma
- Enlaces a páginas principales

### **Footer**
- Información de la empresa
- Enlaces legales
- Descripción de la marca

### **Hero & Landing Components**
- **Banner**: Información destacada
- **Testimonials**: Opiniones de usuarios
- **Intro**: Descripción de la plataforma
- **Services**: Características principales
- **Work**: Portfolio visual
- **CTA**: Llamadas a la acción

## Internacionalización (i18n)

### **Idiomas Soportados**
- 🇪🇸 **Español** (idioma por defecto)
- 🇺🇸 **Inglés**
- 🇩🇪 **Alemán**
- 🇫🇷 **Francés**
- 🇷🇺 **Ruso**

### **Sistema de Routing**
- URLs con prefijo de idioma: `/es/`, `/en/`, `/de/`, etc.
- Redirección automática basada en preferencias del navegador
- Fallback al idioma por defecto (español)

### **Archivos de Traducción**
- Ubicados en `src/locales/`
- Formato JSON estructurado
- Traducciones completas para todas las páginas

## Estilos y Diseño

### **Paleta de Colores**
- **Negro** (`bg-black`): Fondo principal
- **Naranja** (`bg-orange`): Color de acento principal
- **Águila** (`bg-eagle`): Color secundario
- **Blanco** (`text-white`): Texto principal

### **Tipografía**
- **Font Display**: Títulos y encabezados
- **Font Inter**: Texto del cuerpo
- **Uppercase**: Títulos principales
- **Tracking**: Espaciado de letras optimizado

### **Componentes de UI**
- **Bordes**: `border-white/20` para separadores sutiles
- **Gradientes**: Efectos visuales en títulos
- **Animaciones**: Transiciones suaves y efectos hover
- **Responsive**: Diseño adaptativo para todos los dispositivos

## Configuración y Deployment

### **Astro Config**
- **Output**: Static (generación de sitios estáticos)
- **Site**: `https://www.hoergen.com`
- **Compresión HTML**: Habilitada
- **Sitemap**: Generación automática
- **Tailwind CSS**: Integración con Vite

### **Scripts Disponibles**
```bash
npm run dev      # Desarrollo local
npm run build    # Construcción para producción
npm run preview  # Vista previa de la build
```

### **Firebase Hosting**
- Configuración en `firebase.json`
- Deployment automático
- Optimización de rendimiento

## Desarrollo y Contribución

### **Requisitos del Sistema**
- Node.js (versión LTS recomendada)
- npm o yarn
- Git

### **Instalación**
```bash
git clone [repository-url]
cd hoergen.web
npm install
npm run dev
```

### **Estructura de Desarrollo**
- **Componentes**: Reutilizables y modulares
- **Páginas**: Generación estática con Astro
- **Estilos**: Tailwind CSS con clases utilitarias
- **Tipos**: TypeScript para mejor desarrollo

## Roadmap y Futuras Funcionalidades

### **Corto Plazo**
- [ ] Mejoras en la detección de plataforma
- [ ] Optimización de rendimiento
- [ ] Más idiomas soportados

### **Mediano Plazo**
- [ ] Sistema de usuarios y cuentas
- [ ] Historial de escucha personalizado
- [ ] Integración con APIs de música

### **Largo Plazo**
- [ ] Aplicación móvil nativa iOS
- [ ] Sistema de streaming en tiempo real
- [ ] Comunidad social integrada

## Soporte y Contacto

Para soporte técnico, sugerencias o reportes de bugs:
- **Email**: [contact@hoergen.com]
- **Página de Feedback**: `/feedback`
- **Documentación**: Esta carpeta `docs/`

---

*Hörgen Radio - Transmitiendo cultura, no solo ritmos.*
