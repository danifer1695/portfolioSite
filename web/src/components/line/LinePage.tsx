//this component will the the building blocks for the professional, academics and projects pages.
//they all work the same so it does not make sense to write them separately 3 times.

import { Container } from '../ui/container';
import { cn } from '@/lib/cn';
import type { Line } from '@/content/lines';
import { LineTrack } from './LineTrack';
import { Stop } from './types';
import { OpenStopFromId } from './OpenStopFromId';

export function LinePage({ line, title, intro, stops }: { line: Line; title: string; intro: string; stops: readonly Stop[] }) {
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
			<OpenStopFromId />
		</Container>
	);
}
