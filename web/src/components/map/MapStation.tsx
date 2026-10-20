import type { MapStationView } from '@/content/map-view';
import { labelPlacement } from '@/lib/map-geometry';

export function MapStation({ x, y, label, href, labelSide }: MapStationView) {
	//deconstruct label elements - direction coords, anchor
	const { dx, dy, anchor } = labelPlacement[labelSide];

	return (
		<a href={href} className="group">
			<circle cx={x} cy={y} r={0.28} className="fill-background stroke-foreground" strokeWidth={0.1} />
			<text x={x + dx} y={y + dy} textAnchor={anchor} fontSize={0.45} className="fill-foreground font-semibold group-hover:underline">
				{label}
			</text>
		</a>
	);
}
