import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [],
  vite: {
    define: {
      global: 'globalThis',
    },
  },
});
