import type { Line } from '@/content/lines';
import type { Stop } from './types';
import { cn } from '@/lib/cn';
import { StopCard } from './StopCard';

export function LineTrack({ line, stops }: { line: Line; stops: readonly Stop[] }) {
	return (
		<ol className={cn('ml-5 border-l-8', line.borderClass)}>
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
