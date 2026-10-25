import { Hono } from 'hono';
import { bodyLimit } from 'hono/body-limit';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';

//regex to make sure there are not multiple lines in an input
const singleLine = /^[^\r\n]*$/;

export const contactSchema = z.object({
	name: z.string().trim().min(1).max(100).regex(singleLine),
	email: z.email().max(254),
	company: z.string().trim().max(100).regex(singleLine).optional(),
	message: z.string().trim().min(10).max(5000),
	website: z.string().optional(),
});

export const contact = new Hono<{ Bindings: Env }>();

contact.post(
	//0 - Route
	'/',

	//1 - reject bodies that are too large
	bodyLimit({
		maxSize: 16 * 1024,
		onError: (c) => c.json({ ok: false, error: 'too_large' }, 413),
	}),

	//2 - Rate limit per IP
	async (c, next) => {
		const ip = c.req.header('cf-connecting-ip') ?? 'unknown';
		const { success } = await c.env.CONTACT_LIMITER.limit({ key: ip });
		if (!success) return c.json({ ok: false, error: 'rate_limited' }, 429);
		await next();
	},

	//3 - Validate the shape of the data
	zValidator('json', contactSchema, (result, c) => {
		if (!result.success) return c.json({ ok: false, error: 'invalid' }, 400);
	}),

	//4 - Do the work
	async (c) => {
		const data = c.req.valid('json');

		//Honeypot for bots. Pretend success so they learn nothing
		if (data.website) return c.json({ ok: true });

		const res = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${c.env.RESEND_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				from: 'Portfolio <contact@danifer.dev>',
				to: [c.env.CONTACT_TO],
				reply_to: data.email,
				subject: `Portfolio contact: ${data.name}`,
				text: [`Name: ${data.name}`, `Company: ${data.company || '-'}`, `Email: ${data.email}`, data.message].join('\n'),
			}),
		});

		if (!res.ok) {
			console.error('Resend error', res.status, await res.text()); //Visible in workers logs
			return c.json({ ok: false, error: 'send_failed' }, 502);
		}
		return c.json({ ok: true });
	},
);
