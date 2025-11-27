import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://rositarococo.com',
  base: '/astro-ecommerce',
  output: 'static',
  build: {
    assets: '_assets',
  },
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  vite: {
    define: {
      global: 'globalThis',
    },
  },
});
