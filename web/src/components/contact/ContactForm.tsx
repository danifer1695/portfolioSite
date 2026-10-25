'use client';

import { cn } from '@/lib/cn';
import { useState } from 'react';
import { Button } from '../ui/button';
import { focusRing } from '@/lib/styles';

type Labels = {
	name: string;
	email: string;
	company: string;
	message: string;
	submit: string;
	sending: string;
	success: string;
	errors: {
		invalid: string;
		rate_limited: string;
		generic: string;
	};
};

type Status = 'idle' | 'sending' | 'sent' | 'error';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? '';
const field = cn('w-full rounded-md border border-border bg-background px-3 py-2', focusRing);

export function ContactForm({ labels }: { labels: Labels }) {
	const [status, setStatus] = useState<Status>('idle');
	const [errorMessage, setErrorMessage] = useState('');

	//callback for when send is pressed
	async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		//stop the browser's own full-page form submission
		event.preventDefault();
		//capture HTML form element
		const form = event.currentTarget;

		//set status to sending
		setStatus('sending');

		try {
			const res = await fetch(`${API_BASE}/api/contact`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(Object.fromEntries(new FormData(form))),
			});

			//object 'data' contains two elements 'ok' and 'error' of types boolean and string,
			//filled in after res.json()'s promise is fulfilled
			const data: { ok: boolean; error?: string } = await res.json();

			if (data.ok) {
				setStatus('sent');
				form.reset();
			} else {
				setErrorMessage(data.error === 'invalid' || data.error === 'rate_limited' ? labels.errors[data.error] : labels.errors.generic);
				setStatus('error');
			}
		} catch {
			setErrorMessage(labels.errors.generic);
			setStatus('error');
		}
	}

	//REACT component
	return (
		<form onSubmit={handleSubmit} className="max-w-prose space-y-4">
			<label className="block space-y-1">
				<span className="text-sm font-medium">{labels.name}</span>
				<input name="name" required maxLength={100} autoComplete="name" className={field} />
			</label>
			<label className="block space-y-1">
				<span className="text-sm font-medium">{labels.email}</span>
				<input name="email" required maxLength={254} autoComplete="email" className={field} />
			</label>
			<label className="block space-y-1">
				<span className="text-sm font-medium">{labels.company}</span>
				<input name="company" required maxLength={100} autoComplete="organization" className={field} />
			</label>
			<label className="block space-y-1">
				<span className="text-sm font-medium">{labels.message}</span>
				<textarea name="message" required minLength={10} maxLength={5000} rows={6} className={field} />
			</label>

			{/*Honeypot: hidden from people, trap bots*/}
			<div aria-hidden="true" className="absolute -left-[9999px]">
				<input name="website" tabIndex={-1} autoComplete="off" />
			</div>

			{/*Submit button*/}
			<Button type="submit" disabled={status === 'sending'}>
				{status === 'sending' ? labels.sending : labels.submit}
			</Button>

			{/*Status message*/}
			<p aria-live="polite" className={cn('text-sm', status === 'error' && 'text-red-600')}>
				{status === 'sent' && labels.success}
				{status === 'error' && errorMessage}
			</p>
		</form>
	);
}
