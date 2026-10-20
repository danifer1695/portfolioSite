import { describe, expect, it } from 'vitest';
import { isOctilinear, toPathData } from './map-geometry';

describe('toPathData', () => {
	it('starts with M and continues with L', () => {
		expect(
			toPathData([
				{ x: 2, y: 13 },
				{ x: 2, y: 11 },
				{ x: 5, y: 8 },
			]),
		).toBe('M2 13 L2 11 L5 8');
	});
});

describe('isOctilinear', () => {
	it('accepts 0, 90 and 45 degrees', () => {
		expect(isOctilinear({ x: 0, y: 0 }, { x: 3, y: 0 })).toBe(true);
		expect(isOctilinear({ x: 0, y: 0 }, { x: 0, y: 3 })).toBe(true);
		expect(isOctilinear({ x: 0, y: 0 }, { x: 2, y: -2 })).toBe(true);
	});
	it('rejects other angles', () => {
		expect(isOctilinear({ x: 0, y: 0 }, { x: 2, y: 3 })).toBe(false);
	});
});
