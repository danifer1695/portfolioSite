import type { GridPoint } from '@/content/map';

//Draws the shape that connects two stops at an interchange.
//Arguments:
//- from: GridPoint(x, y)
//- to: GridPoint(x, y)
export function MapInterchange({ from, to }: { from: GridPoint; to: GridPoint }) {
	return (
		<g strokeLinecap="round">
			{/*Interchange shape Outline*/}
			<line x1={from.x} y1={from.y} x2={to.x} y2={to.y} className="stroke-foreground" strokeWidth={0.76} />

			{/*Interchange shape Inside*/}
			<line x1={from.x} y1={from.y} x2={to.x} y2={to.y} className="stroke-foreground" strokeWidth={0.56} />
		</g>
	);
}
