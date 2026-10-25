import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routings';

export default getRequestConfig(async ({ requestLocale }) => {
	const requested = await requestLocale;

	//see if requested locale (ex by the browser's settings) exists and if not, set locale to default
	//set in routings.ts
	const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

	//return the json file containing all messages in the appropriate locale
	return { locale, messages: (await import(`../../messages/${locale}.json`)).default };
});
