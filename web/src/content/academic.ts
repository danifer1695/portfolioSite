export type Academic = {
	slug: string;
	title: string;
	university: string;
	location: string;
	start: string;
	end: string | null; //null means current position
	summary: string;
	highlights: readonly string[];
};

//not exported, accessed through getProfessional()
const academic = [
	{
		slug: 'concordia-2025', //becomes '/academic#concordia-2025'
		title: 'Graduate Degree in Computer Science',
		university: 'Concordia University',
		location: 'Montreal, Canada',
		start: '2025-09',
		end: '2026-08',
		summary: 'Graduated from a Graduate Degree in Computer Science',
		highlights: ['Unity development', 'Development in C#'],
	},
] as const satisfies readonly Academic[];

export function getProfessional(): readonly Academic[] {
	//Sort entries by date - newest first
	return [...academic].sort((a, b) => b.start.localeCompare(a.start));
}
