import { Container } from '@/components/ui/container';
import { ui } from '@/content/ui';
import Link from 'next/link';

export default function NotFound() {
	return (
		<Container className="space-y-4 py-24">
			<h1 className="text-4xl font-bold tracking-tight">{ui.pages.notFound.title}</h1>
			<p className="text-muted">{ui.pages.notFound.body}</p>
			<Link href="/" className="underline">
				{ui.pages.notFound.backHome}
			</Link>
		</Container>
	);
}
