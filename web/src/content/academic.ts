export type Academic = {
	slug: string;
	title: string;
	institution: string;
	location: string;
	start: string;
	end: string | null; //null means current position
	summary: string;
	highlights: readonly string[];
};

//not exported, accessed through getAcademic()
const academic = [
	{
		slug: 'concordia-2025', //becomes '/academic#concordia-2025'
		title: 'Graduate Degree in Computer Science',
		institution: 'Concordia University',
		location: 'Montreal, Canada',
		start: '2025-09',
		end: '2026-08',
		summary: 'Graduated from a Graduate Degree in Computer Science',
		highlights: ['C/C++', 'Java', 'Databases', 'Python', 'Project Management', 'Operating Systems'],
	},
	{
		slug: 'syn-2018',
		title: 'Attestation d\'etudes Universitaires',
		institution: 'Syn Studio',
		location: 'Montreal, Canada',
		start: '2018-09',
		end: '2020-04',
		summary: 'Diploma in Concept Art, aimed to students wishing to join the Videogame industry as designers. Taught by professionals currenly working as professionals at different studios.',
		highlights: ['Concept Art', '3D Art', 'Blender'],
	},
] as const satisfies readonly Academic[];

export function getAcademic(): readonly Academic[] {
	//Sort entries by date - newest first
	return [...academic].sort((a, b) => b.start.localeCompare(a.start));
}
