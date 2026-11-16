import type { MetadataRoute } from 'next';
import { getProfile } from '@/content/profile';
import { routing } from '@/i18n/routings';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
	const { siteURL } = getProfile(routing.defaultLocale);

	return {
		rules: {
			userAgent: '*',
			allow: '/',
		},
		sitemap: `${siteURL}/sitemap.xml`,
	};
}
