import { defineRouting } from 'next-intl/routing';

//single source of truth for languages
export const routing = defineRouting({
	locales: ['en', 'fr'],
	defaultLocale: 'en',
});

export type Locale = (typeof routing.locales)[number]; //'en' or 'fr'
