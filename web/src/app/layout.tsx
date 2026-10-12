import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { profile } from '@/content/profile';
import { mainNav } from '@/content/navigation';
import { SkipLink } from '@/components/layout/SkipLink';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	metadataBase: new URL(profile.siteURL),
	title: {
		default: `[Portfolio - ${profile.name}]`,
		template: '[Portfolio DFM] - %s',
	},
	description: profile.description,
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
			<body className="min-h-full flex flex-col">
				<SkipLink />
				<Header name={profile.name} nav={mainNav} />
				<main id="main" tabIndex={-1} className="flex-1 outline-none">
					{children}
				</main>
				<Footer name={profile.name} social={profile.social} />
			</body>
		</html>
	);
}
