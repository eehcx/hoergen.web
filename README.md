# Hörgen Radio - Transmitiendo cultura, no solo ritmos

[![License: GPL-3.0](https://img.shields.io/badge/License-GPL%203.0-green.svg)](https://opensource.org/licenses/GPL-3.0)
[![Astro](https://img.shields.io/badge/Astro-5.1.6-purple.svg)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0.0%20beta-blue.svg)](https://tailwindcss.com)

## 📻 Acerca de Hörgen Radio

Hörgen Radio es una aplicación web moderna y multilingüe que ofrece una plataforma integral para la transmisión y consumo de contenido de radio cultural. Desarrollada con tecnologías web de vanguardia, proporciona una experiencia de usuario excepcional en múltiples idiomas.

## ✨ Características Principales

- 🌍 **Multilingüe**: Soporte completo para Español, Inglés, Alemán, Francés y Ruso
- 📱 **Progressive Web App (PWA)**: Funciona offline y se instala como aplicación nativa
- 🎨 **Diseño Moderno**: Interfaz elegante y responsiva con Tailwind CSS v4
- ⚡ **Rendimiento Optimizado**: Generación estática con Astro para máxima velocidad
- 🔍 **SEO Avanzado**: Sitemap automático, meta tags optimizados y atributos hreflang
- 📱 **Multiplataforma**: Detección automática del sistema operativo para descargas
- 🚀 **Despliegue en Firebase**: Hosting rápido y escalable

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Cuenta de Firebase (para despliegue)

### Instalación

```bash
# Clonar el repositorio
git clone <tu-repositorio>
cd hoergen.web

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la construcción
npm run preview
```

## 📚 Documentación Completa

Para obtener información detallada sobre todos los aspectos de la aplicación, consulta nuestra documentación completa en la carpeta [`docs/`](./docs/):

- **[📖 README General](./docs/README.md)** - Visión general y características principales
- **[🏗️ Arquitectura](./docs/ARCHITECTURE.md)** - Estructura técnica y decisiones de diseño
- **[🧩 Componentes](./docs/COMPONENTS.md)** - Guía completa de todos los componentes
- **[🚀 Despliegue](./docs/DEPLOYMENT.md)** - Guía de despliegue y configuración
- **[🔌 API y Utilidades](./docs/API.md)** - Funciones de utilidad y patrones de API

## 🛠️ Tecnologías Utilizadas

- **Framework**: [Astro](https://astro.build) - Generación estática moderna
- **CSS**: [Tailwind CSS v4](https://tailwindcss.com) - Framework de utilidades CSS
- **Hosting**: [Firebase Hosting](https://firebase.google.com) - Despliegue y hosting
- **i18n**: Sistema de internacionalización personalizado
- **PWA**: Capacidades de aplicación web progresiva
- **TypeScript**: Tipado estático para mayor robustez

## 📁 Estructura del Proyecto

```
hoergen.web/
├── docs/                 # 📚 Documentación completa
├── public/              # 🌐 Archivos estáticos
├── src/
│   ├── components/      # 🧩 Componentes reutilizables
│   ├── layouts/         # 🎨 Layouts base
│   ├── pages/           # 📄 Páginas de la aplicación
│   ├── locales/         # 🌍 Archivos de idiomas
│   ├── styles/          # 🎨 Estilos globales
│   ├── utils/           # 🔧 Funciones de utilidad
│   └── types/           # 📝 Definiciones de tipos
├── astro.config.mjs     # ⚙️ Configuración de Astro
└── package.json         # 📦 Dependencias y scripts
```

## 🌐 Páginas Principales

- **🏠 Inicio** - Landing page principal con hero, servicios y testimonios
- **📥 Descargas** - Descargas multiplataforma con detección automática de OS
- **👥 Creadores** - Información para creadores de contenido
- **👂 Oyentes** - Recursos para oyentes
- **💬 Feedback** - Sistema de comentarios y sugerencias
- **📄 Legal** - Términos de servicio y política de privacidad

## 🔧 Scripts Disponibles

| Comando | Acción |
|---------|--------|
| `npm run dev` | Inicia servidor de desarrollo en `localhost:3000` |
| `npm run build` | Construye el sitio para producción en `./dist/` |
| `npm run preview` | Vista previa local de la construcción |
| `npm run astro` | Ejecuta comandos CLI de Astro |

## 📄 Licencia

Este proyecto es software de código abierto licenciado bajo la [Licencia GPL-3.0](https://opensource.org/licenses/GPL-3.0). Puedes hacer fork, modificar y usar este código en tus proyectos libremente.

**Nota importante**: Antes de usar esta plantilla públicamente, asegúrate de remover cualquier nombre o enlaces asociados con el autor original.

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Para soporte técnico o preguntas sobre la aplicación:

- 📧 Email: [tu-email@ejemplo.com]
- 🐛 Issues: [Repositorio de GitHub]
- 📖 Documentación: [Carpeta `docs/`](./docs/)

## 🗺️ Roadmap

- [ ] Integración con APIs de radio en tiempo real
- [ ] Sistema de notificaciones push
- [ ] Modo offline mejorado
- [ ] Analytics avanzados
- [ ] Integración con redes sociales

---

**Hörgen Radio** - Transmitiendo cultura, no solo ritmos.

*Desarrollado con ❤️ usando Astro y Tailwind CSS*
