import { hasLocale } from 'next-intl';
import { routing, type Locale } from './routings';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

//helper so that typescript does not throw an error when we pass a string to locale, instead
//of "en" | "fr"
export async function initLocale(params: Promise<{ locale: string }>): Promise<Locale> {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) notFound();
	setRequestLocale(locale);
	return locale;
}
