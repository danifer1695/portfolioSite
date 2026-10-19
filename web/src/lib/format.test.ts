import { describe, expect, it } from 'vitest';
import { formatMonth, formatPeriod } from './format';

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
