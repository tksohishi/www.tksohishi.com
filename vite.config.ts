import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const usePolling =
  process.env.CHOKIDAR_USEPOLLING === 'true' ||
  process.env.VITE_USE_POLLING === 'true'

const pollingInterval = Number(process.env.CHOKIDAR_INTERVAL ?? 100)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    strictPort: true,
    ...(usePolling
      ? {
          watch: {
            usePolling: true,
            interval: Number.isFinite(pollingInterval) ? pollingInterval : 100,
          },
        }
      : {}),
  },
})
