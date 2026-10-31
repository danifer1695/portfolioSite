import type { Metadata } from 'next';
import { LinePage } from '@/components/line/LinePage';
import { lines } from '@/content/lines';
import { getProjects } from '@/content/projects';
import { getTranslations } from 'next-intl/server';
import { initLocale } from '@/i18n/locale';

export async function generateMetadata({ params }: PageProps<'/[locale]/technical'>): Promise<Metadata> {
	const locale = await initLocale(params);
	const t = await getTranslations({ locale, namespace: 'pages.technical' });
	return { title: t('title') };
}

export default async function TechnicalPage({ params }: PageProps<'/[locale]/technical'>) {
	const locale = await initLocale(params);
	const t = await getTranslations({ locale, namespace: 'pages.technical' });

	const stops = getProjects(locale).map((project) => ({
		slug: project.slug,
		title: project.title,
		subtitle: project.tech.join(', '),
		period: project.year,
		summary: project.summary,
		highlights: project.highlights,
		links: project.links,
		images: project.images ?? [],
	}));

	return <LinePage line={lines.technical} title={t('title')} intro={t('intro')} stops={stops} />;
}
