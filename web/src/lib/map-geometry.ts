import type { GridPoint, LabelSide } from '@/content/map';

//True if the segment a --> b is horizontal, vertical or exactly 45 degrees
export function isOctilinear(a: GridPoint, b: GridPoint): boolean {
	const dx = Math.abs(b.x - a.x);
	const dy = Math.abs(b.y - a.y);
	return dx === 0 || dy === 0 || dx === dy;
}

//Grid points to SVG path data. Ex: "M2 13 L2 11 L5 8"
//Mx y: move the pen here
//Lx y: draw line until here
export function toPathData(points: readonly GridPoint[]): string {
	return points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x} ${p.y}`).join(' ');
}

//Where a label is placed relative to its station (grid units, +y is down)
export const labelPlacement: Record<LabelSide, { dx: number; dy: number; anchor: 'start' | 'end' }> = {
	n: { dx: 0, dy: -0.75, anchor: 'start' },
	ne: { dx: 0.45, dy: -0.4, anchor: 'start' },
	e: { dx: 0.75, dy: 0, anchor: 'start' },
	se: { dx: 0.45, dy: 0.75, anchor: 'start' },
	s: { dx: 0, dy: 0.75, anchor: 'end' },
	sw: { dx: -0.45, dy: 0.75, anchor: 'end' },
	w: { dx: -0.75, dy: 0, anchor: 'end' },
	nw: { dx: -0.45, dy: -0.4, anchor: 'end' },
};
