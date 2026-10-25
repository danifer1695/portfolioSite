import type { Metadata } from 'next';
import { LinePage } from '@/components/line/LinePage';
import { lines } from '@/content/lines';
import { getProfessional } from '@/content/professional';
import { ui } from '@/content/ui';
import { formatPeriod } from '@/lib/format';
import { setRequestLocale } from 'next-intl/server';

export const metadata: Metadata = {
	title: ui.pages.professional.title,
};

export default async function ProfessionalPage({ params }: PageProps<'/[locale]/professional'>) {
	const { locale } = await params;
	setRequestLocale(locale);

	const stops = getProfessional().map((job) => ({
		slug: job.slug,
		title: job.role,
		subtitle: job.company,
		period: formatPeriod(job.start, job.end, 'en', ui.common.present),
		summary: job.summary,
		highlights: job.highlights,
		images: job.images ?? [],
	}));

	return <LinePage line={lines.professional} title={ui.pages.professional.title} intro={ui.pages.professional.intro} stops={stops} />;
}
