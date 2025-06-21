import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  // define: {
  //   'window.jQuery': 'jquery',
  //   'jQuery': 'jquery',
  //   '$': 'jquery'
  // },
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss({ config: './tailwind.config.js' }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
