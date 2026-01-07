import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/TRP/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'Health Tracker',
        short_name: 'Health',
        description: 'Track and monitor your vital health metrics including blood pressure, glucose levels, oxygen saturation, heart rate, and weight. Export data to Excel and sync across devices with cloud storage.',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ],
        screenshots: [
          {
            src: 'screenshot.png',
            sizes: '800x600',
            type: 'image/png',
            form_factor: 'wide',
            label: 'Health Tracker Dashboard'
          },
          {
            src: 'screenshot.png',
            sizes: '800x600',
            type: 'image/png',
            label: 'Health Tracker Dashboard'
          }
        ]
      }
    })
  ],
})
