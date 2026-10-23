import { describe, expect, it } from 'vitest';
import { toRoundPathData } from './map-geometry';

describe('toRoundPathData', () => {
	const stop = (x: number, y: number) => ({ kind: 'stop' as const, slug: 's', labelSide: 'ne' as const, x, y });
	const corner = (x: number, y: number) => ({ kind: 'corner' as const, x, y });

	it('curves around a corner', () => {
		expect(toRoundPathData([stop(0, 0), corner(0, 2), stop(2, 2)], 0.5)).toBe('M0 0 L0 1.5 Q0 2 0.5 2 L2 2');
	});

	it('clamps the radius to hallf the shortest neighboring segment', () => {
		expect(toRoundPathData([stop(0, 0), corner(0, 0.6), stop(2, 0.6)], 0.5)).toBe('M0 0 L0 0.3 Q0 0.6 0.3 0.6 L2 0.6');
	});

	it('leaves stations as straight points', () => {
		expect(toRoundPathData([stop(0, 0), stop(0, 2)], 0.5)).toBe('M0 0 L0 2');
	});
});
