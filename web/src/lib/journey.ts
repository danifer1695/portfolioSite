import { formatDay } from './format';

//Data type for the "Plan our journey" box in the home page
export type Journey = {
	company: string;
	skills: string[];
	from: string;
	to: string;
};

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const MAX_COMPANY = 100; //char limit for company field

export function isEmptyJourney(j: Journey) {
	return !j.company && j.skills.length == 0 && !j.from && !j.to;
}

//Journey to URL query converter
export function toJourneyQuery({ company, skills, from, to }: Journey) {
	const query: Record<string, string> = {};
	if (company.trim()) query.company = company.trim();
	if (skills.length) query.skills = skills.join(',');
	if (from) query.from = from;
	if (to) query.to = to;
	return query;
}

//URL query to Journey converter
export function parseJourney(params: Pick<URLSearchParams, 'get'>, knownSkills: readonly string[]): Journey {
	const date = (key: string) => {
		const value = params.get(key) ?? '';
		return DATE.test(value) ? value : '';
	};

	return {
		company: (params.get('company') ?? '').trim().slice(0, MAX_COMPANY),
		skills: (params.get('skills') ?? '').split(',').filter((s) => knownSkills.includes(s)),
		from: date('from'),
		to: date('to'),
	};
}

type JourneyKey = 'greeting' | 'company' | 'needSkills' | 'needGeneric' | 'fromTo' | 'from' | 'to' | 'closing';
type Translate = (key: JourneyKey, values?: Record<string, string>) => string;

//translate all the different inputs gotten from the home page into a properly redacted message
export function buildJourneyMessage(j: Journey, t: Translate, locale: string): string {
	if (isEmptyJourney(j)) return '';

	const lines = [t('greeting'), ''];
	if (j.company) lines.push(t('company', { company: j.company }));

	const hasDates = Boolean(j.from || j.to);
	if (j.skills.length || hasDates) {
		const need = j.skills.length
			? t('needSkills', { skills: new Intl.ListFormat(locale, { type: 'conjunction' }).format(j.skills) })
			: t('needGeneric');
		lines.push(need + (hasDates ? ' ' + period(j, t, locale) : '') + '.');
	}

	lines.push(t('closing'));

	return lines.join('\n');
}

function period({ from, to }: Journey, t: Translate, locale: string) {
	if (from && to) return t('fromTo', { from: formatDay(from, locale), to: formatDay(to, locale) });
	if (from) return t('from', { from: formatDay(from, locale) });
	return t('to', { to: formatDay(to, locale) });
}
