import type { GridPoint, LabelSide, LineCorner, LineStop } from '@/content/map';

//True if the segment a --> b is horizontal, vertical or exactly 45 degrees
export function isOctilinear(a: GridPoint, b: GridPoint): boolean {
	const dx = Math.abs(b.x - a.x);
	const dy = Math.abs(b.y - a.y);
	return dx === 0 || dy === 0 || dx === dy;
}

//Grid points to SVG path data. Ex: "M2 13 L2 11 L5 8"
//Mx y: move the pen here
//Lx y: draw line until here

//Where a label is placed relative to its station (grid units, +y is down)
//NOTE: distances are measure from the baseline, the line the text sits on. This is why
//distances do not look even across elements
export const labelPlacement: Record<LabelSide, { dx: number; dy: number; anchor: 'start' | 'end' | 'middle' }> = {
	n: { dx: 0, dy: -0.5, anchor: 'middle' },
	ne: { dx: 0.45, dy: -0.4, anchor: 'start' },
	e: { dx: 0.5, dy: 0.16, anchor: 'start' },
	se: { dx: 0.45, dy: 0.75, anchor: 'start' },
	s: { dx: 0, dy: 0.85, anchor: 'middle' },
	sw: { dx: -0.45, dy: 0.75, anchor: 'end' },
	w: { dx: -0.5, dy: 0.16, anchor: 'end' },
	nw: { dx: -0.45, dy: -0.4, anchor: 'end' },
};

//Hypothenuse - distance between two points
const dist = (a: GridPoint, b: GridPoint) => Math.hypot(b.x - a.x, b.y - a.y);

//Returs a point that is 'd' units from 'from' towards 'to'
function moveTowards(from: GridPoint, to: GridPoint, d: number): GridPoint {
	const len = dist(from, to);
	return {
		x: from.x + ((to.x - from.x) / len) * d,
		y: from.y + ((to.y - from.y) / len) * d,
	};
}

//Round to 3 decimals so that we are not passing ridiculously long decimals to the SVG
const fmt = (n: number) => String(Number(n.toFixed(3)));

//Similar to toPathData, but every corner becomes a smooth curve
export function toRoundPathData(points: readonly (LineStop | LineCorner)[], radius: number): string {
	//early return in case of an empty point array
	if (points.length === 0) return '';

	//transform first point to SVG coords format
	const parts = [`M${fmt(points[0].x)} ${fmt(points[0].y)}`];

	for (let i = 1; i < points.length; i++) {
		const p = points[i];
		const prev = points[i - 1];
		const next = points[i + 1]; //returns undefined if out of bounds

		//if its a corner format it as a curve
		if (p.kind === 'corner' && next) {
			const r = Math.min(radius, dist(prev, p) / 2, dist(p, next) / 2);
			const start = moveTowards(p, prev, r);
			const end = moveTowards(p, next, r);
			//Q for quadratic bezier curve: draws a line to destination point and curves it towards
			//the control point
			parts.push(
				`L${fmt(start.x)} ${fmt(start.y)}`,
				//Qcx cy x y
				//(cx, cy): control point coords
				//(x, y): destination point
				`Q${fmt(p.x)} ${fmt(p.y)} ${fmt(end.x)} ${fmt(end.y)}`,
			);
		}
		//if not, just format it as a next point
		else {
			parts.push(`L${fmt(p.x)} ${fmt(p.y)}`);
		}
	}

	return parts.join(' ');
}
