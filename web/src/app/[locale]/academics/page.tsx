import type { Metadata } from 'next';
import { LinePage } from '@/components/line/LinePage';
import { lines } from '@/content/lines';
import { getAcademic } from '@/content/academic';
import { formatPeriod } from '@/lib/format';
import { getTranslations } from 'next-intl/server';
import { initLocale } from '@/i18n/locale';

export async function generateMetadata({ params }: PageProps<'/[locale]/academics'>): Promise<Metadata> {
	const locale = await initLocale(params);
	const t = await getTranslations({ locale, namespace: 'pages.academics' });
	return { title: t('title') };
}

export default async function AcademicsPage({ params }: PageProps<'/[locale]/academics'>) {
	const locale = await initLocale(params);
	const t = await getTranslations({ locale });

	const stops = getAcademic(locale).map((study) => ({
		slug: study.slug,
		title: study.title,
		subtitle: study.institution,
		period: formatPeriod(study.start, study.end, 'en', t('common.present')),
		summary: study.summary,
		highlights: study.highlights,
		images: study.images ?? [], //pass an empty array if images are empty
	}));

	return <LinePage line={lines.academics} title={t('pages.academics.title')} intro={t('pages.academics.intro')} stops={stops} />;
}
