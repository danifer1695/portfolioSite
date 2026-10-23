import type { Metadata } from 'next';
import { LinePage } from '@/components/line/LinePage';
import { lines } from '@/content/lines';
import { getAcademic } from '@/content/academic';
import { ui } from '@/content/ui';
import { formatPeriod } from '@/lib/format';

export const metadata: Metadata = {
	title: ui.pages.academics.title,
};

export default function AcademicsPage() {
	const stops = getAcademic().map((study) => ({
		slug: study.slug,
		title: study.title,
		subtitle: study.institution,
		period: formatPeriod(study.start, study.end, 'en', ui.common.present),
		summary: study.summary,
		highlights: study.highlights,
		images: study.images ?? [], //pass an empty array if images are empty
	}));

	return <LinePage line={lines.academics} title={ui.pages.academics.title} intro={ui.pages.academics.intro} stops={stops} />;
}
