import { tr, trList, type Text, type TextList } from '@/i18n/i18n';
import { GalleryImage } from './media';
import { Locale } from '@/i18n/routings';

export type AcademicSource = {
	slug: string;
	title: Text;
	mapLabel?: Text;
	institution: string;
	location: Text;
	start: string;
	end: string | null; //null means current position
	summary: Text;
	images?: GalleryImage[];
	highlights: TextList;
};

export type Academic = Omit<AcademicSource, 'title' | 'mapLabel' | 'location' | 'summary' | 'highlights'> & {
	title: string;
	mapLabel: string;
	location: string;
	summary: string;
	highlights: readonly string[];
};

//not exported, accessed through getAcademic()
const academic = [
	{
		slug: 'concordia-2025', //becomes '/academic#concordia-2025'
		title: {
			en: 'Graduate Degree in Computer Science',
			fr: 'Graduate Degree in Computer Science',
		},
		mapLabel: {
			en: 'Concordia',
			fr: 'Concordia',
		},
		institution: 'Concordia University',
		location: {
			en: 'Montreal, Canada',
			fr: 'Montreal, Canada',
		},
		start: '2025-09',
		end: '2026-08',
		summary: {
			en: 'Graduated from a Graduate Degree in Computer Science',
			fr: 'Graduated from a Graduate Degree in Computer Science',
		},
		highlights: {
			en: ['C/C++', 'Java', 'Databases', 'Python', 'Project Management', 'Operating Systems'],
			fr: ['C/C++', 'Java', 'Databases', 'Python', 'Project Management', 'Operating Systems'],
		},
	},
	{
		slug: 'syn-2018',
		title: {
			en: "Attestation d'etudes Universitaires",
			fr: "Attestation d'etudes Universitaires",
		},
		mapLabel: {
			en: 'Syn Studio',
			fr: 'Syn Studio',
		},
		institution: 'Syn Studio',
		location: {
			en: 'Montreal, Canada',
			fr: 'Montreal, Canada',
		},
		start: '2018-09',
		end: '2020-04',
		summary: {
			en: 'Diploma in Concept Art, aimed to students wishing to join the Videogame industry as designers. Taught by professionals actively working as professionals at different studios.',
			fr: 'Diploma in Concept Art, aimed to students wishing to join the Videogame industry as designers. Taught by professionals actively working as professionals at different studios.',
		},
		highlights: {
			en: ['Concept Art', '3D Art', 'Blender'],
			fr: ['Concept Art', '3D Art', 'Blender'],
		},
	},
	{
		slug: 'focalpoint',
		title: {
			en: 'Independent Studies',
			fr: 'Independent Studies',
		},
		mapLabel: {
			en: 'Focal Point',
			fr: 'Focal Point',
		},
		institution: 'Focal Point School',
		location: {
			en: 'Gdansk, Poland',
			fr: 'Gdansk, Poland',
		},
		start: '2018-06',
		end: '2018-09',
		summary: {
			en: 'Full-time semester in Poland taking Concept Art courses taught by industry giants Darek Zabrocky and Michal Kus',
			fr: 'Full-time semester in Poland taking Concept Art courses taught by industry giants Darek Zabrocky and Michal Kus',
		},
		highlights: {
			en: ['Concept Art', 'Illustration', 'Environment Design'],
			fr: ['Concept Art', 'Illustration', 'Environment Design'],
		},
	},
	{
		slug: 'digipen-2013',
		title: {
			en: 'Bachelor of Fine Arts in Digital Arts and Animation',
			fr: 'Bachelor of Fine Arts in Digital Arts and Animation',
		},
		mapLabel: {
			en: 'DigiPen',
			fr: 'DigiPen',
		},
		institution: 'DigiPen Institute of Technology',
		location: {
			en: 'Redmond, WA',
			fr: 'Redmond, WA',
		},
		start: '2013-09',
		end: '2017-05',
		summary: {
			en: '4-year career program where we were taught the workflows and techniques that we would be expected to be familiar with when entering the animation or videogame industries. Courses covered topics like 2D animation, 3D animation, 3D modeling, anatomy, drawing, painting, concept art, or project management. Each year, students were expected to group up with other fellow artists and students from other programs to produce a game or animation project that they would be working on from fall to summer semesters.',
			fr: '4-year career program where we were taught the workflows and techniques that we would be expected to be familiar with when entering the animation or videogame industries. Courses covered topics like 2D animation, 3D animation, 3D modeling, anatomy, drawing, painting, concept art, or project management. Each year, students were expected to group up with other fellow artists and students from other programs to produce a game or animation project that they would be working on from fall to summer semesters.',
		},
		highlights: {
			en: ['2D Animation', '3D Animation', 'Concept Art', '3D Art', 'Game Development'],
			fr: ['2D Animation', '3D Animation', 'Concept Art', '3D Art', 'Game Development'],
		},
	},
	{
		slug: 'parsons-2013',
		title: {
			en: 'Independent Studies',
			fr: 'Independent Studies',
		},
		mapLabel: {
			en: 'Parsons',
			fr: 'Parsons',
		},
		institution: 'The New School - Parsons School of Design',
		location: {
			en: 'New York City, NY',
			fr: 'New York City, NY',
		},
		start: '2012-06',
		end: '2014-09',
		summary: {
			en: 'During my last year of High School and first year of college, in the summer semesters of 2012 and 2014, I attender Parsons as an independent student to take some college courses on drawing, painting and illustration.',
			fr: 'During my last year of High School and first year of college, in the summer semesters of 2012 and 2014, I attender Parsons as an independent student to take some college courses on drawing, painting and illustration.',
		},
		highlights: {
			en: ['Drawing', 'Paingint', 'Illustration', 'Art'],
			fr: ['Drawing', 'Paingint', 'Illustration', 'Art'],
		},
	},
] as const satisfies readonly AcademicSource[];

export function getAcademic(locale: Locale): readonly Academic[] {
	//Sort entries by date - newest first
	return [...academic]
		.sort((a, b) => b.start.localeCompare(a.start))
		.map((e) => ({
			...e,
			title: tr(e.title, locale),
			mapLabel: tr(e.mapLabel, locale),
			location: tr(e.location, locale),
			summary: tr(e.summary, locale),
			highlights: trList(e.highlights, locale),
		}));
}
