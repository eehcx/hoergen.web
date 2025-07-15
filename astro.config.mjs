import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: 'static',

  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://www.hoergen.com',
  compressHTML: true,
  integrations: [
    sitemap()
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
