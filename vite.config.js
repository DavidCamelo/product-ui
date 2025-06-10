import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'
import tailwindcss from "@tailwindcss/vite"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
    name: 'user-ui',
    filename: 'remoteEntry.js',
    exposes: {
      './ProductsPage': './src/pages/ProductsPage.jsx'
    },
    remotes: {
      components_ui: 'https://components-ui.davidcamelo.com/assets/remoteEntry.js'
    },
    shared: ['react']
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
  server: {
    allowedHosts: ['product-ui']
  },
  preview: {
    cors: {
      origin: ['*'],
      methods: ['*'],
      allowedHeaders: ['*']
    },
    allowedHosts: ['product-ui', 'product-ui.davidcamelo.com']
  }
})
