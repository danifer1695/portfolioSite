import type { Metadata } from 'next';
import { LinePage } from '@/components/layout/LinePage';
import { lines } from '@/content/lines';
import { getProfessional } from '@/content/professional';
import { ui } from '@/content/ui';
import { formatPeriod } from '@/lib/format';

export const metadata: Metadata = {
	title: ui.pages.professional.title,
};

export default function ProfessionalPage() {
	const stops = getProfessional().map((job) => ({
		slug: job.slug,
		title: job.role,
		subtitle: job.company,
		period: formatPeriod(job.start, job.end, 'en', ui.common.present),
		summary: job.summary,
	}));

	return <LinePage line={lines.professional} title={ui.pages.professional.title} intro={ui.pages.professional.intro} stops={stops} />;
}
