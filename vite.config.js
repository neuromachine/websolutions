import { fileURLToPath, URL } from 'node:url'

import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), '')
    const target = env.VITE_DEPLOY_TARGET || 'local'

    console.log('MODE:', mode)
    console.log('TARGET:', target)

    return {
  // define: {
  //   'window.jQuery': 'jquery',
  //   'jQuery': 'jquery',
  //   '$': 'jquery'
  // },
  plugins: [
    vue(),
    vueDevTools(),
    //tailwindcss({ config: './tailwind.config.js' }),
      createHtmlPlugin({
          inject: {
              data: {
                  TARGET: target
              }
          },
          minify: false
      }),
  ],
    test: {
        globals: true,
        // environment: 'happy-dom',
        environment: 'jsdom',
        setupFiles: './tests/setup.ts',
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
        },
    },
  resolve: {
    alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~tests': fileURLToPath(new URL('./tests', import.meta.url))
    },
  },
}})
