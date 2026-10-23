import type { Line } from '@/content/lines';
import type { Stop } from './types';
import { cn } from '@/lib/cn';
import { Gallery } from './Gallery';

export function StopCard({ stop, line, isActive, isExpanded }: { stop: Stop; line: Line; isActive: boolean; isExpanded: boolean }) {
	return (
		<section id={stop.slug} className="relative max-h-[60vh] scroll-mt-24 pb-10 pl-8">
			{/*Station node, same visual language as the map*/}
			<span
				aria-hidden="true"
				className={cn(
					'absolute -left-[18px] top-1 size-7 rounded-full border-4 motion-safe:transition-all motion-safe:duration-200',
					isActive ? 'border-foreground bg-background' : cn('border-transparent', line.bgClass),
				)}
			/>

			{/*Main info (not collapsable)*/}
			<h2 className="text-xl font-semibold">{stop.title}</h2>
			<p className="text-muted">{stop.subtitle}</p>
			<p className="text-sm text-muted">{stop.period}</p>

			{/*Collapsable content*/}
			<div
				//removes collapsed content from Tab order and from screen readers, while keeping it in the page
				inert={!isExpanded}
				className={cn(
					'grid motion-safe:transition-[grid-template-rows,opacity] motion-safe:duration-300',
					isExpanded ? 'grid-rows-[1fr] min-h-60 opacity-100' : 'grid-rows-[0fr] min-h-auto opacity-0',
				)}
			>
				<div className="space-y-4 overflow-hidden pt-4">
					<p className="max-w-prose">{stop.summary}</p>

					{/*display each of the highlights in little pills*/}
					<ul className="flex flex-wrap gap-2">
						{stop.highlights.map((h) => (
							<li key={h} className="rounded-full border border-border px-3 py-1 text-sm">
								{h}
							</li>
						))}
					</ul>
					<Gallery images={stop.images} />
				</div>
			</div>
		</section>
	);
}
