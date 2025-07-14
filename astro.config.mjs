import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from "@astrojs/sitemap";
//import AstroPWA from '@vite-pwa/astro';

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://www.hoergen.com',
  compressHTML: true,
  integrations: [
    sitemap(),
    /*
    AstroPWA({
      manifest: {
        name: 'Hoergen',
        short_name: 'Hörgen',
        description: 'Hoergen is a platform for sharing and discovering music.',
        start_url: '/',
        display: 'standalone',
        theme_color: '#121212',
        icons: [
          {
            src: '/avatars/icon.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/avatars/icon.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['/.{js,css,html,png,jpg,svg,json}']
      }
    })
    */
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['en', 'es', 'de', 'fr', 'ru'],
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false
    }
  }
});