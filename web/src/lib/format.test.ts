import { describe, expect, it } from 'vitest';
import { formatMonth, formatDay, formatPeriod } from './format';

describe('formatMonth', () => {
	it('reads YYY-MM in the right order', () => {
		expect(formatMonth('2025-09', 'en')).toBe('Sep 2025');
	});
});

describe('formatPeriod', () => {
	it('uses the present label when end is null', () => {
		expect(formatPeriod('2026-08', null, 'en', 'Present')).toBe('Aug 2026 - Present');
	});
});

describe('formatDay', () => {
	it('formats a full date per locale', () => {
		expect(formatDay('2027-01-10', 'en')).toBe('January 10, 2027');
		expect(formatDay('2027-01-10', 'fr')).toBe('10 janvier 2027');
	});
});
