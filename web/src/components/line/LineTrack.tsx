import { type Line } from '@/content/lines';
import type { Stop } from './types';
import { cn } from '@/lib/cn';
import { StopCard } from './StopCard';

export function LineTrack({ line, stops, intro, title }: { line: Line; intro: string; title: string; stops: readonly Stop[] }) {
	return (
		<ol className={cn('relative ml-5 border-l-8', line.borderClass)}>
			{/*Content header*/}
			<header className="flex items-center gap-4">
				{/*Circle*/}
				<span
					className={cn(
						'absolute left-0 -top-1 -translate-x-1/2 flex size-12 shrink-0 items-center justify-center rounded-full text-xl font-bold',
						line.bgClass,
						line.textClass,
					)}
				>
					{line.code}
				</span>

				{/*Title and such*/}
				<div className="pl-10 pb-10">
					<h1 className="text-4xl font-bold tracking-tight">{title}</h1>
					<p className="text-muted">{intro}</p>
				</div>
			</header>
			{/*Stops*/}
			{stops.map((stop) => {
				return (
					<li key={stop.slug}>
						<StopCard stop={stop} line={line} />
					</li>
				);
			})}
		</ol>
	);
}
