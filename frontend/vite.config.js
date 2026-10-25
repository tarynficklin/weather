import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { apiTarget } from './scripts/api-target.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // The cards API (../backend) listens on SERVER_PORT (default 4113), read from backend/.env
  // or the shell (see scripts/api-target.js). This replaces Create React App's "proxy" setting.
  const proxy = { '/api': { target: apiTarget(mode) } }

  return {
    plugins: [react()],
    // Fixed per-app dev port so all the legacy apps can run side by side.
    server: { port: 3113, strictPort: true, proxy },
    preview: { port: 3113, strictPort: true, proxy },
  }
})
