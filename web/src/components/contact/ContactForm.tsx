'use client';

import { cn } from '@/lib/cn';
import { useState } from 'react';
import { Button } from '../ui/button';
import { focusRing } from '@/lib/styles';
import { useLocale, useTranslations } from 'next-intl';
import { buildJourneyMessage, parseJourney } from '@/lib/journey';
import { useSearchParams } from 'next/navigation';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? '';
const field = cn('w-full rounded-md border border-border bg-background px-3 py-2', focusRing);

export function ContactForm({ skills }: { skills: readonly string[] }) {
	const t = useTranslations('pages.contact.form');
	const tJourney = useTranslations('pages.contact.journey');
	const locale = useLocale();

	const journey = parseJourney(useSearchParams(), skills);
	const prefilledMessage = buildJourneyMessage(journey, tJourney, locale);

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
				setErrorMessage(data.error === 'invalid' || data.error === 'rate_limited' ? t(`errors.${data.error}`) : t('errors.generic'));
				setStatus('error');
			}
		} catch {
			setErrorMessage(t('errors.generic'));
			setStatus('error');
		}
	}

	//REACT component
	return (
		<form onSubmit={handleSubmit} className="max-w-prose space-y-4">
			{/*Name*/}
			<label className="block space-y-1">
				<span className="text-sm font-medium">{t('name')}</span>
				<input name="name" required maxLength={100} autoComplete="name" className={field} />
			</label>

			{/*Email*/}
			<label className="block space-y-1">
				<span className="text-sm font-medium">{t('email')}</span>
				<input name="email" required maxLength={254} autoComplete="email" className={field} />
			</label>

			{/*Company*/}
			<label className="block space-y-1">
				<span className="text-sm font-medium">{t('company')}</span>
				<input name="company" maxLength={100} autoComplete="organization" defaultValue={journey.company} className={field} />
			</label>

			{/*Message*/}
			<label className="block space-y-1">
				<span className="text-sm font-medium">{t('message')}</span>
				<textarea name="message" required minLength={1} maxLength={5000} rows={6} defaultValue={prefilledMessage} className={field} />
			</label>

			{/*Honeypot: hidden from people, trap bots*/}
			<div aria-hidden="true" className="absolute -left-[9999px]">
				<input name="website" tabIndex={-1} autoComplete="off" />
			</div>

			{/*Submit button*/}
			<Button type="submit" disabled={status === 'sending'}>
				{status === 'sending' ? t('sending') : t('submit')}
			</Button>

			{/*Status message*/}
			<p aria-live="polite" className={cn('text-sm', status === 'error' && 'text-red-600')}>
				{status === 'sent' && t('success')}
				{status === 'error' && errorMessage}
			</p>
		</form>
	);
}
