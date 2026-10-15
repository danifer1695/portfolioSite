import { Container } from '@/components/ui/container';
import { ui } from '@/content/ui';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: ui.pages.resume.title };

export default function ResumePage() {
	return (
		<Container className="space-y-4 py-12">
			<h1 className="text-4xl font-bold tracking-tight">{ui.pages.resume.title}</h1>
			<p className="text-muted">{ui.pages.resume.placeholder}</p>
		</Container>
	);
}
