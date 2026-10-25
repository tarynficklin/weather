import { fileURLToPath, URL } from 'node:url';
import { loadEnv } from 'vite';

// The backend workspace (../backend) listens on SERVER_PORT, default 4113. Read it from
// backend/.env (or the shell) so the Vite proxy and wait-for-api.js always follow the backend.
const backendDir = fileURLToPath(new URL('../../backend', import.meta.url));

export const apiTarget = (mode = 'development') => {
  const { SERVER_PORT } = loadEnv(mode, backendDir, 'SERVER_');
  return `http://localhost:${Number(SERVER_PORT) || 4113}`;
};
