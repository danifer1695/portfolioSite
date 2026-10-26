import { describe, it, expect } from 'vitest';
import en from '../../messages/en.json';
import fr from '../../messages/fr.json';

//flattens {a: {b: 'x'}} into ['a.b']
function keys(obj: object, prefix = ''): string[] {
	return Object.entries(obj).flatMap(([k, v]) => (typeof v === 'object' && v !== null ? keys(v, `${prefix}${k}.`) : [`${prefix}${k}`]));
}

describe('messages', () => {
	it('fr has exactly the same keys as en', () => {
		expect(keys(fr).sort()).toEqual(keys(en).sort());
	});
});
