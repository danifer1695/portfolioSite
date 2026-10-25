import { ContactForm } from '@/components/contact/ContactForm';
import { Container } from '@/components/ui/container';
import { profile } from '@/content/profile';
import { ui } from '@/content/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: ui.pages.contact.title };

export default function ContactPage() {
	return (
		<Container className="space-y-4 py-12">
			<h1 className="text-4xl font-bold tracking-tight">{ui.pages.contact.title}</h1>

			{/*Details*/}
			<dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
				<dt className="text-muted">{ui.pages.contact.emailLabel}</dt>
				<dd>
					<a href={`mailto:${profile.email}`} className="underline">
						{profile.email}
					</a>
				</dd>
				<dt className="text-muted">{ui.pages.contact.phoneLabel}</dt>
				<dd>
					<a href={`tel:${profile.phone.replaceAll(' ', '')}`} className="underline">
						{profile.phone}
					</a>
				</dd>
			</dl>

			{/*Form placeholder*/}
			<ContactForm labels={ui.pages.contact.form} />
		</Container>
	);
}
