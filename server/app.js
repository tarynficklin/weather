// The cards API: Hono, in place of Express and body-parser. server.js serves it; the tests
// call app.request() directly.
import { Hono } from 'hono';

import controllers from './controllers/controller.js';

const app = new Hono();

const origin = '/api/cards';

//===ENDPOINTS===
app.get   (`${origin}`,      controllers.read  );
app.post  (`${origin}`,      controllers.create);
app.put   (`${origin}/:id`,  controllers.update);
app.delete(`${origin}/:id`,  controllers.delete);
//===ENDPOINTS===

app.notFound((c) => c.json({ error: 'Not found.' }, 404));

export default app;
