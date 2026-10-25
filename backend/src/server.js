// Run with `bun run server` (or `bun run dev` for the API + Vite). Bun loads .env, and a
// SERVER_PORT already set in the shell wins. Vite proxies /api here.
import app from './app.js';

const port = Number(process.env.SERVER_PORT) || 4113;

Bun.serve({ port, fetch: app.fetch });

console.log(`Server is running on port: ${port}`);
