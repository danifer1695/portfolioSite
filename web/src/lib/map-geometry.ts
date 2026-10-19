import type { GridPoint } from '@/content/map';

//True if the segment a --> b is horizontal, vertical or exactly 45 degrees
export function isOctilinear(a: GridPoint, b: GridPoint): boolean {
	const dx = Math.abs(b.x - a.x);
	const dy = Math.abs(b.y - a.y);
	return dx === 0 || dy === 0 || dx === dy;
}
