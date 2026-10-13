export type Professional = {
	slug: string;
	role: string;
	company: string;
	location: string;
	start: string;
	end: string | null; //null means current position
	summary: string;
	highlights: readonly string[];
};

//not exported, accessed through getProfessional()
const professional = [
	{
		slug: 'readality', //becomes '/professional#readality'
		role: 'Unity developer',
		company: 'Readality',
		location: 'Montreal, Canada',
		start: '2026-01',
		end: '2026-07',
		summary: 'Helped the team build and develop new features for their VR Unity project',
		highlights: ['Unity development', 'Development in C#'],
	},
] as const satisfies readonly Professional[];

export function getProfessional(): readonly Professional[] {
	//Sort entries by date - newest first
	return [...professional].sort((a, b) => b.start.localeCompare(a.start));
}
