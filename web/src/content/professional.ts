import type { GalleryImage } from './media';

export type Professional = {
	slug: string;
	role: string;
	mapLabel?: string;
	company: string;
	location: string;
	start: string;
	end: string | null; //null means current position
	summary: string;
	images?: GalleryImage[];
	highlights: readonly string[];
};

//not exported, accessed through getProfessional()
const professional = [
	{
		slug: 'readality', //becomes '/professional#readality'
		role: 'Unity developer',
		mapLabel: 'Readality', //how it gets displayed on the map
		company: 'Readality',
		location: 'Montreal, Canada',
		start: '2026-01',
		end: '2026-07',
		summary: 'Helped the team build and develop new features for their VR Unity project',
		highlights: ['Unity development', 'Development in C#'],
	},
	{
		slug: 'freelance', //becomes '/professional#readality'
		role: 'Freelande Full-Stack Development',
		mapLabel: 'Freelance Full-Stack', //how it gets displayed on the map
		company: 'Self-Employed',
		location: 'Lille, Hauts-de-France',
		start: '2026-08',
		end: null,
		summary: 'I plan, develop and integrate web sites and services for a variety of clients',
		highlights: ['Frontend', 'Backend', 'Migration', 'Agentic Development'],
	},
	{
		slug: 'virtuos', //becomes '/professional#readality'
		role: 'Concept Artist',
		mapLabel: 'Virtuos', //how it gets displayed on the map
		company: 'Virtuos Montreal',
		location: 'Montreal, QC',
		start: '2022-01',
		end: '2024-10',
		summary:
			'Worked with different clients to help them realize their vision by providing concept art for characters, environments, props and UI',
		highlights: ['Production Design', 'Digital Painting', '3D Modeling', 'Illustration'],
	},
	{
		slug: 'kabam', //becomes '/professional#readality'
		role: '2D Artist',
		mapLabel: 'Kabam', //how it gets displayed on the map
		company: 'Kabam Montreal',
		location: 'Longueuil, QC',
		start: '2020-01',
		end: '2022-01',
		summary:
			'Was part of the development team for the canceled \"Shadows of Valdora\" mobile-game project. I designed and developed 2D designs both as concepts and in-game assets, and helped steer the project\'s art direction.',
		highlights: ['Production Design', 'Digital Painting', 'UI', '2D Asset Production', 'Art Direction'],
	},
	{
		slug: 'microsoft', //becomes '/professional#readality'
		role: 'Localization QA',
		mapLabel: 'Localization QA',
		company: 'Microsoft',
		location: 'Redmond, WA',
		start: '2018-03',
		end: '2018-05',
		summary:
			"For a few months, I worked as a Localization QA tester at Microsoft's Remond campus. I helped localize a variety of Microsoft software from their website, technical documentation, to games like Gears of War. Unfortunately, work ran out a few months in and the entire team as laid off.",
		highlights: ['QA', 'Localization', 'Translation'],
	},
	{
		slug: 'ta',
		role: 'Teaching Assistant',
		mapLabel: 'TA',
		company: 'DigiPen Institute of Technology',
		location: 'Redmond, WA',
		start: '2016-05',
		end: '2017-04',
		summary:
			'For a few semesters during my final years at DigiPen, I worked as a TA for the Concept Art course. Tasks included coordinating with the teacher and helping the students out with their projects, both during and outside class hours.',
		highlights: ['Teaching', 'Concept Art', 'Illustration'],
	},
] as const satisfies readonly Professional[];

export function getProfessional(): readonly Professional[] {
	//Sort entries by date - newest first
	return [...professional].sort((a, b) => b.start.localeCompare(a.start));
}
