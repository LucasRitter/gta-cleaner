import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        VitePWA({
            includeAssets: ['favicon.svg', 'favicon.png', 'robots.txt'],
            manifest: {
                name: 'GTA Cleaner',
                short_name: 'GTA Cleaner',
                description: 'Makes your GTA folder sparkly clean 🧼',
                theme_color: '#24d88d',
                icons: [
                    {
                        src: 'icon-128x128.png',
                        sizes: '128x128',
                        type: 'image/png',
                    },
                    {
                        src: 'icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                    },
                    {
                        src: 'icon-512x512.png',
                        sizes: '512x512',
                        type: 'image/png',
                        purpose: 'any maskable',
                    },
                ],
            },
        }),
    ],
    build: {
        sourcemap: true,
    },
})
