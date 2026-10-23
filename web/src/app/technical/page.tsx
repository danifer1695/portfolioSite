import type { Metadata } from 'next';
import { LinePage } from '@/components/line/LinePage';
import { lines } from '@/content/lines';
import { getProjects } from '@/content/projects';
import { ui } from '@/content/ui';

export const metadata: Metadata = {
	title: ui.pages.technical.title,
};

export default function TechnicalPage() {
	const stops = getProjects().map((project) => ({
		slug: project.slug,
		title: project.title,
		subtitle: project.tech.join(', '),
		period: project.year,
		summary: project.summary,
		highlights: project.highlights,
		images: project.images ?? [],
	}));

	return <LinePage line={lines.technical} title={ui.pages.technical.title} intro={ui.pages.technical.intro} stops={stops} />;
}
