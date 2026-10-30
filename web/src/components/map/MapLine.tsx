import { cn } from '@/lib/cn';

//the graphic element of a subway line. this returns the path object that will render the line data
export function MapLine({
	d,
	strokeClass,
	isMuted,
	onActivate,
	onDeactivate,
}: {
	d: string;
	strokeClass: string;
	isMuted: boolean; //whether this line in particular is currently hovered over / selected
	onActivate: () => void;
	onDeactivate: () => void;
}) {
	return (
		<g onPointerEnter={onActivate} onPointerLeave={onDeactivate}>
			<path
				d={d}
				className={cn('fill-none motion-safe:transition-all motion-safe:duration-200', isMuted ? 'stroke-muted-md' : strokeClass)} //fill-none tells SVG not to fill the space contained by the path
				strokeWidth={0.25}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>

			{/*Hover target, 3x wider for easier selection*/}
			<path d={d} className="fill-none stroke-transparent" strokeWidth={1} />
		</g>
	);
}
