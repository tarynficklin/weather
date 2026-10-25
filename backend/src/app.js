// The cards API: Hono, in place of Express and body-parser. server.js serves it; the tests
// call app.request() directly.
import { Hono } from 'hono';
import controllers from './controllers/controller.js';
import cors from './cors.js';

const app = new Hono();
app.use('*', cors()); // browser origins on other domains (ALLOWED_ORIGINS)

const origin = '/api/cards';

//===ENDPOINTS===
app.get(`${origin}`, controllers.read);
app.post(`${origin}`, controllers.create);
app.put(`${origin}/:id`, controllers.update);
app.delete(`${origin}/:id`, controllers.delete);
//===ENDPOINTS===

//for the healthcheck scripts and the frontend's `bun run dev`
app.get('/health', (c) => c.json({ status: 'ok' }));

app.notFound((c) => c.json({ error: 'Not found.' }, 404));

export default app;
