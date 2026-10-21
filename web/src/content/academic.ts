export type Academic = {
	slug: string;
	title: string;
	mapLabel?: string;
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
		mapLabel: 'Concordia',
		institution: 'Concordia University',
		location: 'Montreal, Canada',
		start: '2025-09',
		end: '2026-08',
		summary: 'Graduated from a Graduate Degree in Computer Science',
		highlights: ['C/C++', 'Java', 'Databases', 'Python', 'Project Management', 'Operating Systems'],
	},
	{
		slug: 'syn-2018',
		title: "Attestation d'etudes Universitaires",
		mapLabel: 'Syn Studio',
		institution: 'Syn Studio',
		location: 'Montreal, Canada',
		start: '2018-09',
		end: '2020-04',
		summary:
			'Diploma in Concept Art, aimed to students wishing to join the Videogame industry as designers. Taught by professionals currenly working as professionals at different studios.',
		highlights: ['Concept Art', '3D Art', 'Blender'],
	},
	{
		slug: 'focalpoint',
		title: 'Independent Studies',
		mapLabel: 'Focal Point',
		institution: 'Focal Point School',
		location: 'Gdansk, Poland',
		start: '2018-06',
		end: '2018-09',
		summary: 'Full-time semester in Poland taking Concept Art courses taught by industry giants Darek Zabrocky and Michal Kus',
		highlights: ['Concept Art', 'Illustration', 'Environment Design'],
	},
	{
		slug: 'digipen-2013',
		title: 'Bachelor of Fine Arts in Digital Arts and Animation',
		mapLabel: 'DigiPen',
		institution: 'DigiPen Institute of Technology',
		location: 'Redmond, WA',
		start: '2013-09',
		end: '2017-05',
		summary:
			'Diploma in Concept Art, aimed to students wishing to join the Videogame industry as designers. Taught by professionals currenly working as professionals at different studios.',
		highlights: ['2D Animation', '3D Animation', 'Concept Art', '3D Art', 'Game Development'],
	},
	{
		slug: 'parsons-2013',
		title: 'Independent Studies',
		mapLabel: 'Parsons',
		institution: 'The New School - Parsons School of Design',
		location: 'New York City, NY',
		start: '2012-06',
		end: '2014-09',
		summary:
			'During my last year of High School and first year of college, in the summer semesters of 2012 and 2014, I attender Parsons as an independent student to take some college courses on drawing, painting and illustration.',
		highlights: ['Drawing', 'Paingint', 'Illustration', 'Art'],
	},
] as const satisfies readonly Academic[];

export function getAcademic(): readonly Academic[] {
	//Sort entries by date - newest first
	return [...academic].sort((a, b) => b.start.localeCompare(a.start));
}
