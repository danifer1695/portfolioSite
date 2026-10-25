import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { contact } from './contact';

const app = new Hono<{ Bindings: Env }>().basePath('/api');

//Local dev only: the site runs on :3000 and the API on :8787
//In production both are on danifer.dev, so no CORS is needed and ALLOWED_DEV_ORIGIN is unset
app.use('*', async (c, next) => {
	const origin = c.env.ALLOWED_DEV_ORIGIN;
	return origin ? cors({ origin })(c, next) : next();
});

app.get('/health', (c) => c.json({ status: 'ok' }));
app.route('/contact', contact);

export default app;
