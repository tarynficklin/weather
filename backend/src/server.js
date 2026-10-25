// Run with `bun run dev` at the repo root (Turborepo starts this and the frontend), or
// `bun run start` in backend/. Bun loads backend/.env, and a PORT already set in the
// shell wins. The frontend's Vite dev server proxies /api here.
import app from './app.js';

const port = Number(process.env.PORT) || 4113;

Bun.serve({ port, fetch: app.fetch });

console.log(`Server is running on port: ${port}`);
