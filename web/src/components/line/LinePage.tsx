//this component will the the building blocks for the professional, academics and projects pages.
//they all work the same so it does not make sense to write them separately 3 times.

import { Container } from '../ui/container';
import { cn } from '@/lib/cn';
import type { Line } from '@/content/lines';
import { GalleryImage } from '@/content/media';
import { LineTrack } from './LineTrack';

export type Stop = {
	slug: string;
	title: string;
	subtitle: string;
	period: string; //formatted with lib/format's formatPeriod
	summary: string;
	highlights: readonly string[];
	images: readonly GalleryImage[];
};

type Props = {
	line: Line;
	title: string;
	intro: string;
	stops: readonly Stop[];
};

export function LinePage({ line, title, intro, stops }: Props) {
	return (
		<Container className="space-y-10 py-12">
			{/*Content header*/}
			<header className="flex items-center gap-4">
				<span
					className={cn('flex size-12 shrink-0 items-center justify-center rounded-full text-xl font-bold', line.bgClass, line.textClass)}
				>
					{line.code}
				</span>
				<div>
					<h1 className="text-4xl font-bold tracking-tight">{title}</h1>
					<p className="text-muted">{intro}</p>
				</div>
			</header>

			{/*Line - ordered list*/}
			<LineTrack line={line} stops={stops} />
		</Container>
	);
}
