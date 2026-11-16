import { lineIds, lines } from '@/content/lines';
import { getProfile } from '@/content/profile';
import { languageAlternates } from '@/i18n/metadata';
import { routing } from '@/i18n/routings';
import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

//'' will be the locale homepage (/en, /fr)
const paths = ['', ...lineIds.map((id) => lines[id].href), '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
	const { siteURL } = getProfile(routing.defaultLocale);

	return paths.flatMap((path) => {
		const languages = languageAlternates(path, siteURL);
		return routing.locales.map((locale) => ({
			url: languages[locale],
			alternates: { languages },
		}));
	});
}
