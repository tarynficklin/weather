import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

const root = fileURLToPath(new URL('.', import.meta.url))

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // The cards API (server/server.js) listens on SERVER_PORT (default 4113). loadEnv reads
  // .env the same way the API does, and a SERVER_PORT already set in the shell wins.
  // This replaces Create React App's "proxy" setting.
  const { SERVER_PORT } = loadEnv(mode, root, 'SERVER_')
  const proxy = { '/api': { target: `http://localhost:${SERVER_PORT || 4113}` } }

  return {
    plugins: [react()],
    // Fixed per-app dev port so all the legacy apps can run side by side.
    server: { port: 3113, strictPort: true, proxy },
    preview: { port: 3113, strictPort: true, proxy },
  }
})
