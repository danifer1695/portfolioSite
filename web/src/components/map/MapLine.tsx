import { cn } from '@/lib/cn';

//the graphic element of a subway line. this returns the path object that will render the line data
export function MapLine({ d, strokeClass }: { d: string; strokeClass: string }) {
	return (
		<path
			d={d}
			className={cn('fill-none', strokeClass)} //fill-none tells SVG not to fill the space contained by the path
			strokeWidth={0.32}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	);
}
