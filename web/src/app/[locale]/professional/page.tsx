import type { Metadata } from 'next';
import { LinePage } from '@/components/line/LinePage';
import { lines } from '@/content/lines';
import { getProfessional } from '@/content/professional';
import { formatPeriod } from '@/lib/format';
import { getTranslations } from 'next-intl/server';
import { initLocale } from '@/i18n/locale';

export async function generateMetadata({ params }: PageProps<'/[locale]/professional'>): Promise<Metadata> {
	const locale = await initLocale(params);
	const t = await getTranslations({ locale, namespace: 'pages.professional' });
	return { title: t('title') };
}

export default async function ProfessionalPage({ params }: PageProps<'/[locale]/professional'>) {
	const locale = await initLocale(params);
	const t = await getTranslations({ locale });

	const stops = getProfessional(locale).map((job) => ({
		slug: job.slug,
		title: job.role,
		subtitle: job.company,
		period: formatPeriod(job.start, job.end, locale, t('common.present')),
		summary: job.summary,
		highlights: job.highlights,
		images: job.images ?? [],
	}));

	return <LinePage line={lines.professional} title={t('pages.professional.title')} intro={t('pages.professional.intro')} stops={stops} />;
}
