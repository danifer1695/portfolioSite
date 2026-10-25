import type { routing } from '@/i18n/routings'
import type messages from '../messages/en.json'

declare module 'next-intl'
{
	interface AppConfig {
		Locale: (typeof routing.locales)[number];
		Messages: typeof messages;
	}
}
