import type { Line } from '@/content/lines';
import type { Stop } from './types';
import { cn } from '@/lib/cn';
import { Gallery } from './Gallery';
import { focusRing } from '@/lib/styles';

export function StopCard({ stop, line }: { stop: Stop; line: Line }) {
	return (
		<details id={stop.slug} name="stops" className="group relative pb-10 pl-8">
			{/*Non-collapsible stuff*/}
			<summary className={cn('cursor-pointer list-none [&::-webkit-details-marker]:hidden', focusRing)}>
				{/*Station circle, same visual language as the map*/}
				<span
					aria-hidden="true"
					className={cn(
						'absolute -left-[18px] top-1 size-7 rounded-full border-transparent border-4 motion-safe:transition-all motion-safe:duration-200',
						'scale-75',
						line.bgClass,
						`
							group-open:scale-100
							group-open:border-foreground
							group-open:bg-background
						`,
					)}
				/>

				{/*Main info (not collapsable)*/}
				<h2 className="text-xl font-semibold">{stop.title}</h2>
				<p className="text-muted">{stop.subtitle}</p>
				<p className="text-sm text-muted">{stop.period}</p>
			</summary>

			{/*Collapsable content*/}
			<div className="space-y-4 pt-4">
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
		</details>
	);
}
