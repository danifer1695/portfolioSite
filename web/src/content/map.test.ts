import { describe, expect, it } from 'vitest';
import { linePaths, interchanges, mapGrid, type LineStop } from './map';
import type { LineId } from './lines';
import { getProfessional } from './professional';
import { getProjects } from './projects';
import { getAcademic } from './academic';
import { isOctilinear } from '@/lib/map-geometry';

const contentSlugs: Record<LineId, readonly string[]> = {
	professional: getProfessional().map((e) => e.slug),
	academics: getAcademic().map((e) => e.slug),
	technical: getProjects().map((e) => e.slug),
};

const stops = linePaths.flatMap((line) =>
	line.points.filter((p): p is LineStop => p.kind === 'stop').map((stop) => ({ ...stop, line: line.id })),
);

describe('map data contract', () => {
	it("every stop exists in its own line's content", () => {
		for (const stop of stops) expect(contentSlugs[stop.line], stop.slug).toContain(stop.slug);
	});

	it('slugs are unique across the whole map', () => {
		expect(new Set(stops.map((s) => s.slug)).size).toBe(stops.length);
	});

	it('every segment is octilinear', () => {
		for (const line of linePaths)
			line.points.slice(1).forEach((point, i) => {
				expect(isOctilinear(line.points[i], point), `${line.id} segment ${i}`).toBe(true);
			});
	});

	it('every point is inside the grid', () => {
		for (const p of linePaths.flatMap((l) => l.points)) {
			expect(p.x).toBeGreaterThanOrEqual(0);
			expect(p.x).toBeLessThanOrEqual(mapGrid.width);
			expect(p.y).toBeGreaterThanOrEqual(0);
			expect(p.y).toBeLessThanOrEqual(mapGrid.width);
		}
	});

	it('interchanges join two existing stops on different lines', () => {
		for (const [a, b] of interchanges) {
			const stopA = stops.find((s) => s.slug === a);
			const stopB = stops.find((s) => s.slug === b);
			expect(stopA, a).toBeDefined();
			expect(stopB, b).toBeDefined();
			expect(stopA!.line).not.toBe(stopB!.line);
		}
	});
});
