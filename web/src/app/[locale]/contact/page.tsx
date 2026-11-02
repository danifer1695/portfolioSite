import { ContactForm } from '@/components/contact/ContactForm';
import { Container } from '@/components/ui/container';
import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { initLocale } from '@/i18n/locale';
import { getProfile } from '@/content/profile';
import MessageBox from '@/components/ui/MessageBox';

export async function generateMetadata({ params }: PageProps<'/[locale]/contact'>): Promise<Metadata> {
	const locale = await initLocale(params);
	const t = await getTranslations({ locale, namespace: 'pages.contact' });
	return { title: t('title') };
}

export default async function ContactPage({ params }: PageProps<'/[locale]/contact'>) {
	const locale = await initLocale(params);
	const profile = getProfile(locale);
	const t = await getTranslations({ locale });

	return (
		<Container className="space-y-4 py-12">
			{/*Messages*/}
			<div className="flex flex-col space-y-2">
				{/*Warning message - WIP*/}
				<MessageBox type="warning">
					<p>{t('temp.wip')}</p>
				</MessageBox>
			</div>

			<h1 className="text-4xl font-bold tracking-tight">{t('pages.contact.title')}</h1>

			{/*Details*/}
			<dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
				<dt className="text-muted">{t('pages.contact.emailLabel')}</dt>
				<dd>
					<a href={`mailto:${profile.email}`} className="underline">
						{profile.email}
					</a>
				</dd>
				<dt className="text-muted">{t('pages.contact.phoneLabel')}</dt>
				<dd>
					<a href={`tel:${profile.phone.replaceAll(' ', '')}`} className="underline">
						{profile.phone}
					</a>
				</dd>
			</dl>

			{/*Form placeholder*/}
			<ContactForm />
		</Container>
	);
}
