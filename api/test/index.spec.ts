import { SELF } from 'cloudflare:test';
import { describe, it, expect } from 'vitest';

describe('API', () => {
	it('GET /api/health returns ok', async () => {
		const res = await SELF.fetch('https://example.com/api/health');
		expect(res.status).toBe(200);
		expect(await res.json()).toEqual({ status: 'ok' });
	});

	it('unknown routes return 404', async () => {
		const res = await SELF.fetch('https://example.com/api/not-real');
		expect(res.status).toBe(404);
	});
});
