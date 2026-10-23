import { describe, expect, it } from 'vitest';
import { getAcademic } from './academic';
import { getProfessional } from './professional';
import { getProjects } from './projects';
import { existsSync } from 'node:fs';
import { join } from 'node:path';

const allImages = [...getProfessional(), ...getAcademic(), ...getProjects()].flatMap((e) => e.images ?? []);

describe('media contract', () => {
	it('every referenced image exists in public/', () => {
		for (const img of allImages) expect(existsSync(join(process.cwd(), 'public', img.src)), img.src).toBe(true);
	});
	it('every image has alt text', () => {
		for (const img of allImages) expect(img.alt.trim(), img.src).not.toBe('');
	});
});
