import { SELF } from 'cloudflare:test';
import { describe, expect, it } from 'vitest';

const post = (body: unknown) =>
	SELF.fetch('https://example.com/api/contact', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(body),
	});

const valid = { name: 'Ada', email: 'ada@example.com', message: 'Hello, I would like to talk about a role.' };

describe('POST /api/contact', () => {
	it('rejects invalid input with 400', async () => {
		const res = await post({ ...valid, email: 'not-an-email' });
		expect(res.status).toBe(400);
		expect(await res.json()).toEqual({ ok: false, error: 'invalid' });
	});

	it('rejects line breaks in the name', async () => {
		expect((await post({ ...valid, name: 'Ada\nBcc: x@y.z' })).status).toBe(400);
	});

	it('silently accepts honeypot submissions without sending', async () => {
		const res = await post({ ...valid, website: 'spam.example' });
		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ ok: true });
	});
});
