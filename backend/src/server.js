// Run with `bun run dev` at the repo root (Turborepo starts this and the frontend), or
// `bun run start` in backend/. Bun loads backend/.env, and a SERVER_PORT already set in the
// shell wins. The frontend's Vite dev server proxies /api here.
import app from './app.js';

const port = Number(process.env.SERVER_PORT) || 4113;

Bun.serve({ port, fetch: app.fetch });

console.log(`Server is running on port: ${port}`);
