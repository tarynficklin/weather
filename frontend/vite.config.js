import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import { apiTarget } from './scripts/api-target.js';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // The cards API (../backend): VITE_API_URL, or the backend's PORT (see scripts/api-target.js).
  // This replaces Create React App's "proxy" setting.
  // PORT (this folder's .env or the shell) moves the dev server and its preview.
  const port = Number(loadEnv(mode, import.meta.dirname, 'PORT').PORT) || 3113;
  const proxy = { '/api': { target: apiTarget(mode) } };

  return {
    plugins: [react()],
    // A fixed default port per app, so all the legacy apps can run side by side.
    server: { port, strictPort: true, proxy },
    preview: { port, strictPort: true, proxy },
  };
});
