'use client';

import { Line } from '@/content/lines';
import { Stop } from './LinePage';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { StopCard } from './StopCard';

export function LineTrack({ line, stops }: { line: Line; stops: readonly Stop[] }) {
	//undefined: JavaScript has not run yet, show everything
	const [activeSlug, setActiveSlug] = useState<string | null | undefined>(undefined);

	useEffect(() => {
		//when arriving from the map /page#id? start on that id
		const fromHash = decodeURIComponent(window.location.hash.slice(1));
		setActiveSlug(stops.some((s) => s.slug === fromHash) ? fromHash : (stops[0]?.slug ?? null));

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) if (entry.isIntersecting) setActiveSlug(entry.target.id);
			},
			//watch only a thin band across the middle of the screen
			//top: starts looking after 35% of the screen from the top
			//right: looks up to the right edge
			//bottom: starts looking after 45% of the screen from the top
			//left: looks up to the left edge
			{ rootMargin: '-35% 0px -45% 0px' },
		);

		for (const stop of stops) {
			const el = document.getElementById(stop.slug);
			if (el) observer.observe(el);
		}

		//returns a cleanup function, called when the component unmounts
		return () => observer.disconnect();
	}, [stops]);

	return (
		<div className="pb-[40vh]">
			<ol className={cn('ml-5 border-l-8', line.borderClass)}>
				{stops.map((stop) => {
					const isActive = activeSlug === stop.slug;
					return (
						<li key={stop.slug}>
							<StopCard stop={stop} line={line} isActive={isActive} isExpanded={activeSlug === undefined || isActive} />
						</li>
					);
				})}
			</ol>
		</div>
	);
}
