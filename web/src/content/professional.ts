import { Text, TextList, tr, trList } from '@/i18n/i18n';
import type { GalleryImage } from './media';
import { Locale } from '@/i18n/routings';

//Text type: strings that might need translation.
//plain strings: strings that are identical across languages

export type ProfessionalSource = {
	slug: string;
	role: Text;
	mapLabel?: Text;
	company: string;
	location: Text;
	start: string;
	end: string | null; //null means current position
	summary: Text;
	images?: GalleryImage[];
	highlights: TextList;
};

//Page receives: version of ProfessionalSource with no Text or TextList types
export type Professional = Omit<ProfessionalSource, 'role' | 'mapLabel' | 'location' | 'summary' | 'highlights'> & {
	role: string;
	mapLabel?: string;
	location: string;
	summary: string;
	highlights: readonly string[];
};

//=================NEEDS TRANSLATION=========================
//not exported, accessed through getProfessional()
const professional = [
	{
		slug: 'readality', //becomes '/professional#readality'
		role: {
			en: 'Unity developer',
			fr: 'Unity developer',
		},
		mapLabel: 'Readality', //how it gets displayed on the map
		company: 'Readality',
		location: {
			en: 'Montreal, Canada',
			fr: 'Montreal, Canada',
		},
		start: '2026-01',
		end: '2026-07',
		summary: {
			en: 'Helped the team build and develop new features for their VR Unity project',
			fr: 'Helped the team build and develop new features for their VR Unity project',
		},
		highlights: {
			en: ['Unity development', 'Development in C#'],
			fr: ['Unity development', 'Development in C#'],
		},
	},
	{
		slug: 'freelance', //becomes '/professional#readality'
		role: {
			en: 'Freelance Full-Stack Development',
			fr: 'Freelance Full-Stack Development',
		},
		mapLabel: {
			en: 'Freelance Full-Stack',
			fr: 'Freelance Full-Stack',
		}, //how it gets displayed on the map
		company: 'Self-Employed',
		location: {
			en: 'Lille, Hauts-de-France',
			fr: 'Lille, Hauts-de-France',
		},
		start: '2026-08',
		end: null,
		summary: {
			en: 'I plan, develop and integrate web sites and services for a variety of clients',
			fr: 'I plan, develop and integrate web sites and services for a variety of clients',
		},
		highlights: {
			en: ['Frontend', 'Backend', 'Migration', 'Agentic Development'],
			fr: ['Frontend', 'Backend', 'Migration', 'Agentic Development'],
		},
	},
	{
		slug: 'virtuos', //becomes '/professional#readality'
		role: {
			en: 'Concept Artist',
			fr: 'Concept Artist',
		},
		mapLabel: 'Virtuos', //how it gets displayed on the map
		company: 'Virtuos Montreal',
		location: {
			en: 'Montreal, QC',
			fr: 'Montreal, QC',
		},
		start: '2022-01',
		end: '2024-10',
		summary: {
			en: 'Worked with different clients to help them realize their vision by providing concept art for characters, environments, props and UI',
			fr: 'Worked with different clients to help them realize their vision by providing concept art for characters, environments, props and UI',
		},
		highlights: {
			en: ['Production Design', 'Digital Painting', '3D Modeling', 'Illustration'],
			fr: ['Production Design', 'Digital Painting', '3D Modeling', 'Illustration'],
		},
	},
	{
		slug: 'kabam', //becomes '/professional#readality'
		role: {
			en: '2D Artist',
			fr: '2D Artist',
		},
		mapLabel: 'Kabam', //how it gets displayed on the map
		company: 'Kabam Montreal',
		location: {
			en: 'Longueuil, QC',
			fr: 'Longueuil, QC',
		},
		start: '2020-01',
		end: '2022-01',
		summary: {
			en: 'Was part of the development team for the canceled \"Shadows of Valdora\" mobile-game project. I designed and developed 2D designs both as concepts and in-game assets, and helped steer the project\'s art direction.',
			fr: 'Was part of the development team for the canceled \"Shadows of Valdora\" mobile-game project. I designed and developed 2D designs both as concepts and in-game assets, and helped steer the project\'s art direction.',
		},
		highlights: {
			en: ['Production Design', 'Digital Painting', 'UI', '2D Asset Production', 'Art Direction'],
			fr: ['Production Design', 'Digital Painting', 'UI', '2D Asset Production', 'Art Direction'],
		},
	},
	{
		slug: 'microsoft', //becomes '/professional#readality'
		role: {
			en: 'Localization QA',
			fr: 'Localization QA',
		},
		mapLabel: 'Microsoft',
		company: 'Microsoft',
		location: {
			en: 'Redmond, WA',
			fr: 'Redmond, WA',
		},
		start: '2018-03',
		end: '2018-05',
		summary: {
			en: "For a few months, I worked as a Localization QA tester at Microsoft's Remond campus. I helped localize a variety of Microsoft software from their website, technical documentation, to games like Gears of War. Unfortunately, work ran out a few months in and the entire team as laid off.",
			fr: "For a few months, I worked as a Localization QA tester at Microsoft's Remond campus. I helped localize a variety of Microsoft software from their website, technical documentation, to games like Gears of War. Unfortunately, work ran out a few months in and the entire team as laid off.",
		},
		highlights: {
			en: ['QA', 'Localization', 'Translation'],
			fr: ['QA', 'Localization', 'Translation'],
		},
	},
	{
		slug: 'ta',
		role: {
			en: 'Teaching Assistant',
			fr: 'Teaching Assistant',
		},
		mapLabel: {
			en: 'TA',
			fr: 'TA',
		},
		company: 'DigiPen Institute of Technology',
		location: {
			en: 'Redmond, WA',
			fr: 'Redmond, WA',
		},
		start: '2016-05',
		end: '2017-04',
		summary: {
			en: 'For a few semesters during my final years at DigiPen, I worked as a TA for the Concept Art course. Tasks included coordinating with the teacher and helping the students out with their projects, both during and outside class hours.',
			fr: 'For a few semesters during my final years at DigiPen, I worked as a TA for the Concept Art course. Tasks included coordinating with the teacher and helping the students out with their projects, both during and outside class hours.',
		},
		highlights: {
			en: ['Teaching', 'Concept Art', 'Illustration'],
			fr: ['Teaching', 'Concept Art', 'Illustration'],
		},
	},
] as const satisfies readonly ProfessionalSource[];

export function getProfessional(locale: Locale): readonly Professional[] {
	//Sort entries by date - newest first
	return [...professional]
		.sort((a, b) => b.start.localeCompare(a.start))
		.map((e) => ({
			...e,
			role: tr(e.role, locale),
			mapLabel: e.mapLabel && tr(e.mapLabel, locale),
			location: tr(e.location, locale),
			summary: tr(e.summary, locale),
			highlights: trList(e.highlights, locale),
		}));
}
