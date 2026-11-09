import { describe, expect, it } from 'vitest';
import { buildJourneyMessage, parseJourney, toJourneyQuery, type Journey } from './journey';

const skills = ['React', 'C/C++', 'C#'];
//fake translator: shows which key was used and with which values
const t = (key: string, values?: Record<string, string>) => (values ? `${key}(${Object.values(values).join('|')})` : key);
const empty: Journey = { company: '', skills: [], from: '', to: '' };

describe('journey query', () => {
	it('round-trips through a real URL, including + and # in skill names', () => {
		const j: Journey = { company: 'Acme', skills: ['C/C++', 'C#'], from: '2027-01-10', to: '2027-06-30' };
		const url = new URLSearchParams(toJourneyQuery(j)).toString();
		expect(parseJourney(new URLSearchParams(url), skills)).toEqual(j);
	});

	it('drops unknown skills, malformed dates and clamps long companies', () => {
		const params = new URLSearchParams({ company: 'x'.repeat(500), skills: 'React,Hacking', from: 'tomorrow' });
		const j = parseJourney(params, skills);
		expect(j.company).toHaveLength(100);
		expect(j.skills).toEqual(['React']);
		expect(j.from).toBe('');
	});
});

describe('buildJourneyMessage', () => {
	it('is empty when nothing was filled', () => {
		expect(buildJourneyMessage(empty, t, 'en')).toBe('');
	});

	it('picks the right period sentence', () => {
		expect(buildJourneyMessage({ ...empty, from: '2027-01-10' }, t, 'en')).toContain('needGeneric from(January 10, 2027).');
		expect(buildJourneyMessage({ ...empty, to: '2027-01-10' }, t, 'en')).toContain('needGeneric to(');
		expect(buildJourneyMessage({ ...empty, from: '2027-01-10', to: '2027-02-10' }, t, 'en')).toContain('fromTo(');
	});

	it('joins skills naturally', () => {
		expect(buildJourneyMessage({ ...empty, skills: ['React', 'C#'] }, t, 'en')).toContain('needSkills(React and C#).');
	});
});
