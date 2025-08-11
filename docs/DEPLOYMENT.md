# Guía de Deployment - Hörgen Radio

## Visión General

Esta guía cubre el proceso completo de deployment de Hörgen Radio, desde la configuración del entorno de desarrollo hasta el deployment en producción usando Firebase Hosting.

## Requisitos Previos

### **Software Requerido**
- **Node.js**: Versión 18.x o superior (LTS recomendado)
- **npm**: Versión 9.x o superior
- **Git**: Para control de versiones
- **Firebase CLI**: Para deployment

### **Cuentas Necesarias**
- **Firebase**: Cuenta de proyecto para hosting
- **GitHub/GitLab**: Repositorio de código (opcional)

## Configuración del Entorno

### **1. Instalación de Node.js**
```bash
# Verificar versión actual
node --version
npm --version

# Si no está instalado, usar nvm (recomendado)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install --lts
nvm use --lts
```

### **2. Instalación de Firebase CLI**
```bash
# Instalación global
npm install -g firebase-tools

# Verificar instalación
firebase --version

# Login a Firebase
firebase login
```

### **3. Configuración del Proyecto**
```bash
# Clonar repositorio (si aplica)
git clone [repository-url]
cd hoergen.web

# Instalar dependencias
npm install

# Verificar scripts disponibles
npm run
```

## Configuración de Firebase

### **1. Crear Proyecto Firebase**
1. Ir a [Firebase Console](https://console.firebase.google.com/)
2. Crear nuevo proyecto o seleccionar existente
3. Habilitar **Hosting** en la sección de productos

### **2. Configurar Firebase en el Proyecto**
```bash
# Inicializar Firebase en el proyecto
firebase init hosting

# Seleccionar opciones:
# - Use an existing project
# - Seleccionar tu proyecto
# - Public directory: dist
# - Configure as single-page app: No
# - Set up automatic builds: No
# - File dist/404.html already exists: No
```

### **3. Configuración de firebase.json**
```json
{
  "hosting": {
    "public": "dist",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [
      {
        "source": "**",
        "destination": "/index.html"
      }
    ],
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      },
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "max-age=31536000"
          }
        ]
      }
    ]
  }
}
```

## Scripts de Build y Deployment

### **Scripts Disponibles**
```json
{
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "astro": "astro"
  }
}
```

### **Comandos de Desarrollo**
```bash
# Desarrollo local
npm run dev

# Construcción para producción
npm run build

# Vista previa de la build
npm run preview

# Deployment a Firebase
npm run build && firebase deploy
```

## Proceso de Deployment

### **1. Build de Producción**
```bash
# Construir la aplicación
npm run build

# Verificar que se generó la carpeta dist/
ls -la dist/
```

### **2. Deployment a Firebase**
```bash
# Deployment completo
firebase deploy

# Deployment solo de hosting
firebase deploy --only hosting

# Deployment con mensaje personalizado
firebase deploy --only hosting --message "Update landing page"
```

### **3. Verificación Post-Deployment**
```bash
# Ver estado del deployment
firebase hosting:channel:list

# Abrir URL de producción
firebase hosting:open
```

## Configuración de Entornos

### **Variables de Entorno**
```bash
# .env.local (desarrollo)
PUBLIC_SITE_URL=http://localhost:4321
PUBLIC_API_URL=http://localhost:3000

# .env.production (producción)
PUBLIC_SITE_URL=https://www.hoergen.com
PUBLIC_API_URL=https://api.hoergen.com
```

### **Configuración de Astro**
```javascript
// astro.config.mjs
export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://www.hoergen.com',
  output: 'static',
  // ... resto de configuración
});
```

## Optimizaciones de Producción

### **1. Compresión y Minificación**
```javascript
// astro.config.mjs
export default defineConfig({
  compressHTML: true,
  vite: {
    build: {
      minify: 'terser',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            utils: ['lodash', 'moment']
          }
        }
      }
    }
  }
});
```

### **2. Headers de Caché**
```json
// firebase.json
{
  "hosting": {
    "headers": [
      {
        "source": "**/*.@(js|css)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.@(jpg|jpeg|gif|png|svg|webp)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      },
      {
        "source": "**/*.@(woff|woff2|ttf|eot)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "public, max-age=31536000, immutable"
          }
        ]
      }
    ]
  }
}
```

### **3. Optimización de Imágenes**
```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import image from '@astrojs/image';

export default defineConfig({
  integrations: [
    image({
      serviceEntryPoint: '@astrojs/image/sharp',
      cacheDir: './.cache/image'
    })
  ]
});
```

## CI/CD Pipeline

### **GitHub Actions (Recomendado)**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Firebase

on:
  push:
    branches: [ main ]

jobs:
  build_and_deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
      env:
        PUBLIC_SITE_URL: ${{ secrets.PUBLIC_SITE_URL }}
    
    - name: Deploy to Firebase
      uses: FirebaseExtended/action-hosting-deploy@v0
      with:
        repoToken: '${{ secrets.GITHUB_TOKEN }}'
        firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
        channelId: live
        projectId: ${{ secrets.FIREBASE_PROJECT_ID }}
```

### **Variables de Entorno en GitHub**
- `FIREBASE_SERVICE_ACCOUNT`: JSON de cuenta de servicio de Firebase
- `FIREBASE_PROJECT_ID`: ID del proyecto Firebase
- `PUBLIC_SITE_URL`: URL del sitio en producción

## Monitoreo y Analytics

### **1. Firebase Analytics**
```javascript
// Integración con Firebase Analytics
import { getAnalytics, logEvent } from "firebase/analytics";

const analytics = getAnalytics();
logEvent(analytics, 'page_view', {
  page_title: document.title,
  page_location: window.location.href
});
```

### **2. Performance Monitoring**
```javascript
// Core Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log);
getFID(console.log);
getFCP(console.log);
getLCP(console.log);
getTTFB(console.log);
```

### **3. Error Tracking**
```javascript
// Error boundary y logging
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Enviar a servicio de tracking
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Enviar a servicio de tracking
});
```

## Troubleshooting

### **Problemas Comunes**

#### **1. Build Falla**
```bash
# Limpiar caché
rm -rf node_modules package-lock.json
npm install

# Verificar versión de Node.js
node --version

# Verificar dependencias
npm audit
```

#### **2. Deployment Falla**
```bash
# Verificar login de Firebase
firebase login --reauth

# Verificar proyecto seleccionado
firebase projects:list
firebase use [project-id]

# Ver logs de deployment
firebase hosting:channel:list
```

#### **3. Página en Blanco**
```bash
# Verificar build
npm run build
ls -la dist/

# Verificar configuración de hosting
cat firebase.json

# Verificar logs del navegador
# Abrir DevTools > Console
```

### **Comandos de Debug**
```bash
# Ver configuración de Firebase
firebase projects:list
firebase use --add

# Ver estado del hosting
firebase hosting:channel:list

# Ver logs en tiempo real
firebase hosting:channel:open live

# Rollback a versión anterior
firebase hosting:revert [deployment-id]
```

## Seguridad

### **1. Headers de Seguridad**
```json
// firebase.json
{
  "hosting": {
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "X-Content-Type-Options",
            "value": "nosniff"
          },
          {
            "key": "X-Frame-Options",
            "value": "DENY"
          },
          {
            "key": "X-XSS-Protection",
            "value": "1; mode=block"
          },
          {
            "key": "Referrer-Policy",
            "value": "strict-origin-when-cross-origin"
          }
        ]
      }
    ]
  }
}
```

### **2. Content Security Policy**
```html
<!-- En BaseHead.astro -->
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' 'unsafe-eval';
               style-src 'self' 'unsafe-inline';
               img-src 'self' data: https:;
               font-src 'self' data:;">
```

## Backup y Recuperación

### **1. Backup de Configuración**
```bash
# Backup de configuración
cp firebase.json firebase.json.backup
cp astro.config.mjs astro.config.mjs.backup
cp package.json package.json.backup

# Backup de código
git tag backup-$(date +%Y%m%d)
git push origin --tags
```

### **2. Recuperación de Deployment**
```bash
# Listar deployments
firebase hosting:channel:list

# Revertir a deployment anterior
firebase hosting:revert [deployment-id]

# Restaurar configuración
cp firebase.json.backup firebase.json
firebase deploy
```

## Métricas de Performance

### **1. Lighthouse Audit**
```bash
# Instalar Lighthouse CLI
npm install -g lighthouse

# Auditoría local
lighthouse http://localhost:4321 --output html --output-path ./lighthouse-report.html

# Auditoría de producción
lighthouse https://www.hoergen.com --output html --output-path ./lighthouse-production.html
```

### **2. Core Web Vitals**
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### **3. Métricas de Build**
```bash
# Tamaño del bundle
npm run build
du -sh dist/

# Análisis del bundle
npm install -g bundle-analyzer
bundle-analyzer dist/
```

## Consideraciones de Escalabilidad

### **1. CDN y Distribución**
- Firebase Hosting incluye CDN global automáticamente
- Configuración de múltiples regiones si es necesario
- Cache headers optimizados para diferentes tipos de contenido

### **2. Monitoreo de Recursos**
```bash
# Monitoreo de uso de Firebase
firebase projects:list
firebase hosting:channel:list

# Ver métricas en Firebase Console
# Analytics > Dashboard
# Performance > Monitoring
```

---

*Esta guía se actualiza regularmente con las mejores prácticas de deployment.*
