import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  base: '/astrocline/',
  integrations: [tailwind()],
  output: 'static',
  build: {
    format: 'directory'
  },
  trailingSlash: 'never'
});
