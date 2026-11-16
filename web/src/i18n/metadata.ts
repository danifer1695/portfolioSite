import { routing, type Locale } from './routings';
import { Metadata } from 'next';

export function languageAlternates(path: string, base = ''): Record<Locale | 'x-default', string> {
	const byLocale = Object.fromEntries(routing.locales.map((l) => [l, `${base}/${l}${path}`])) as Record<Locale, string>;

	return {
		...byLocale,
		'x-default': `${base}/${routing.defaultLocale}${path}`,
	};
}

export function alternatesFor(path: string, locale: Locale): Metadata['alternates'] {
	return {
		canonical: `/${locale}${path}`,
		languages: languageAlternates(path),
	};
}
