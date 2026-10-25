import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/app/globals.css';

import { profile } from '@/content/profile';
import { mainNav } from '@/content/navigation';
import { SkipLink } from '@/components/layout/SkipLink';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { routing } from '@/i18n/routings';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata>
{
	const { locale } = await params
	return {
		metadataBase: new URL(profile.siteURL),
		title: {
			default: `[Portfolio - ${profile.name}]`,
			template: '[DFM] - %s'
		},
		description: profile.description
	}
}

export function generateStaticParams() {
	return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
	const { locale } = await params;

	if (!hasLocale(routing.locales, locale)) notFound();

	return (
		<html lang={locale} className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
			<body className="min-h-full flex flex-col">
				<NextIntlClientProvider>
					<SkipLink />
					<Header initials={profile.initials} nav={mainNav} />
					<main id="main" tabIndex={-1} className="flex-1 outline-none">
						{children}
					</main>
					<Footer
						social={profile.social}
					/>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
