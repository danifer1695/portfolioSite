import type { MapStationView } from '@/content/map-view';
import { labelPlacement } from '@/lib/map-geometry';
import { cn } from '@/lib/cn';
import { lines } from '@/content/lines';

export function MapStation({
	x,
	y,
	label,
	href,
	labelSide,
	line,
	isActive,
	isMuted,
	onActivate,
	onDeactivate,
}: MapStationView & {
	isActive: boolean;
	isMuted: boolean;
	onActivate: () => void;
	onDeactivate: () => void;
}) {
	//deconstruct label elements - direction coords, anchor
	const { dx, dy, anchor } = labelPlacement[labelSide];

	return (
		<a
			href={href}
			className="outline-none motion-safe:transition-opacity"
			onPointerEnter={onActivate}
			onPointerLeave={onDeactivate}
			onFocus={onActivate}
			onBlur={onDeactivate}
		>
			{/*Invisiable larger hitbox, to make it easier to select*/}
			<circle cx={x} cy={y} r={0.6} className="fill-transparent" />

			{/*Actual stop shape*/}
			<circle
				cx={x}
				cy={y}
				r={0.28}
				strokeWidth={0.1}
				className={cn(
					'origin-center [transform-box:fill-box] motion-safe:transition-all motion-safe:duration-200',
					isMuted
						? 'fill-muted stroke-transparent'
						: isActive
							? 'fill-background stroke-foreground'
							: cn('stroke-transparent', lines[line].fillClass),
				)}
			/>

			{/*Stop Label*/}
			<text
				x={x + dx}
				y={y + dy}
				textAnchor={anchor}
				fontSize={0.35}
				className={cn(
					//paint-order:stroke tells the browser to draw the stroke first, then the fill
					'font-semibold',
					isMuted ? 'fill-muted' : 'fill-foreground',
					isActive && 'underline',
				)}
			>
				{label}
			</text>
		</a>
	);
}
