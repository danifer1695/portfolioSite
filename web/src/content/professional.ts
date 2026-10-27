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
	summary_short?: Text;	//short format description better suited for the resume
	images?: GalleryImage[];
	highlights: TextList;
	featResume: boolean;
};

//Page receives: version of ProfessionalSource with no Text or TextList types
export type Professional = Omit<ProfessionalSource, 'role' | 'mapLabel' | 'location' | 'summary' | 'summary_short' | 'highlights'> & {
	role: string;
	mapLabel?: string;
	location: string;
	summary: string;
	summary_short?: string;
	highlights: readonly string[];
};

//=================NEEDS TRANSLATION=========================
//not exported, accessed through getProfessional()
const professional = [
	{
		slug: 'readality', //becomes '/professional#readality'
		role: {
			en: 'Unity developer',
			fr: 'Développement Unity',
		},
		mapLabel: 'Readality', //how it gets displayed on the map
		company: 'Readality',
		location: {
			en: 'Montreal, Canada',
			fr: 'Montréal, Canada',
		},
		start: '2026-01',
		end: '2026-07',
		summary: {
			en: 'Helped the team build and develop new features for their VR Unity project',
			fr: "J'ai aidé l'équipe à concevoir et développer de nouvelles fonctionnalités pour son projet de réalité virtuelle sous Unity",
		},
		summary_short: {
			en: 'Onboarded onto a production Unity/C# codebase and shipped new features independently, using Meta\'s XR SDK without disrupting existing architecture. Collaborated with the development team to discuss the feasability and implementation of bug fixes and new functionalities.',
			fr: 'Onboarded onto a production Unity/C# codebase and shipped new features independently, using Meta\'s XR SDK without disrupting existing architecture. Collaborated with the development team to discuss the feasability and implementation of bug fixes and new functionalities.',
		},

		highlights: {
			en: ['Unity development', 'Development in C#'],
			fr: ['Développement Unity', 'Développement en C#'],
		},
		featResume: true,
	},
	{
		slug: 'freelance', //becomes '/professional#readality'
		role: {
			en: 'Freelance Full-Stack Development',
			fr: 'Développement Full-Stack en freelance',
		},
		mapLabel: {
			en: 'Freelance Full-Stack',
			fr: 'Full-Stack freelance',
		}, //how it gets displayed on the map
		company: 'Self-Employed',
		location: {
			en: 'Lille, Hauts-de-France',
			fr: 'Lille, Hauts-de-France',
		},
		start: '2026-08',
		end: null,
		summary: {
			en: 'I plan, develop and integrate websites and services for a variety of clients',
			fr: 'Je conçois, développe et intègre des sites et services web pour une clientèle variée',
		},
		summary_short: {
			en: 'I manage end-to-end client engagements: requirement gathering, technical implementation and handoff. Specialized in development with TypeScript + Next.js / React on the front end and JavaScript + Node.js / Express in the back end.',
			fr: 'I manage end-to-end client engagements: requirement gathering, technical implementation and handoff. Specialized in development with TypeScript + Next.js / React on the front end and JavaScript + Node.js / Express in the back end.',
		},
		highlights: {
			en: ['Frontend', 'Backend', 'Migration', 'Agentic Development'],
			fr: ['Frontend', 'Backend', 'Migration', 'Développement agentique'],
		},
		featResume: true,
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
			fr: 'Montréal, QC',
		},
		start: '2022-01',
		end: '2024-10',
		summary: {
			en: 'Worked with different clients to help them realize their vision by providing concept art for characters, environments, props and UI',
			fr: "J'ai collaboré avec différents clients pour les aider à concrétiser leur vision, en réalisant du concept art pour des personnages, des environnements, des accessoires et des interfaces utilisateur",
		},
		summary_short: {
			en: 'Worked with different clients to help them realize their vision by providing concept art for characters, environments, props and UI',
			fr: "J'ai collaboré avec différents clients pour les aider à concrétiser leur vision, en réalisant du concept art pour des personnages, des environnements, des accessoires et des interfaces utilisateur",
		},
		highlights: {
			en: ['Production Design', 'Digital Painting', '3D Modeling', 'Illustration'],
			fr: ['Conception visuelle', 'Peinture numérique', 'Modélisation 3D', 'Illustration'],
		},
		featResume: true,
	},
	{
		slug: 'kabam', //becomes '/professional#readality'
		role: {
			en: '2D Artist',
			fr: 'Artiste 2D',
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
			fr: "Membre de l'équipe de développement du projet de jeu mobile « Shadows of Valdora », depuis annulé. J'ai conçu et réalisé des visuels 2D, aussi bien sous forme de concepts que d'assets intégrés au jeu, et j'ai contribué à orienter la direction artistique du projet.",
		},
		summary_short: {
			en: 'Was part of the development team for the canceled \"Shadows of Valdora\" mobile-game project. I designed and developed 2D designs both as concepts and in-game assets, and helped steer the project\'s art direction.',
			fr: "Membre de l'équipe de développement du projet de jeu mobile « Shadows of Valdora », depuis annulé. J'ai conçu et réalisé des visuels 2D, aussi bien sous forme de concepts que d'assets intégrés au jeu, et j'ai contribué à orienter la direction artistique du projet.",
		},
		highlights: {
			en: ['Production Design', 'Digital Painting', 'UI', '2D Asset Production', 'Art Direction'],
			fr: ['Conception visuelle', 'Peinture numérique', 'UI', "Production d'assets 2D", 'Direction artistique'],
		},
		featResume: true,
	},
	{
		slug: 'microsoft', //becomes '/professional#readality'
		role: {
			en: 'Localization QA',
			fr: 'QA localisation',
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
			en: "For a few months, I worked as a Localization QA tester at Microsoft's Redmond campus. I helped localize a variety of Microsoft software from their website, technical documentation, to games like Gears of War. Unfortunately, work ran out a few months in and the entire team was laid off.",
			fr: "Pendant quelques mois, j'ai occupé un poste de QA localisation sur le campus de Microsoft à Redmond. J'ai participé à la localisation de nombreux produits Microsoft, de leur site web à leur documentation technique, en passant par des jeux comme Gears of War. Malheureusement, le travail s'est tari au bout de quelques mois et toute l'équipe a été licenciée.",
		},
		summary_short: {
			en: "For a few months, I worked as a Localization QA tester at Microsoft's Redmond campus. I helped localize a variety of Microsoft software from their website, technical documentation, to games like Gears of War. Unfortunately, work ran out a few months in and the entire team was laid off.",
			fr: "Pendant quelques mois, j'ai occupé un poste de QA localisation sur le campus de Microsoft à Redmond. J'ai participé à la localisation de nombreux produits Microsoft, de leur site web à leur documentation technique, en passant par des jeux comme Gears of War. Malheureusement, le travail s'est tari au bout de quelques mois et toute l'équipe a été licenciée.",
		},

		highlights: {
			en: ['QA', 'Localization', 'Translation'],
			fr: ['QA', 'Localisation', 'Traduction'],
		},
		featResume: true,
	},
	{
		slug: 'ta',
		role: {
			en: 'Teaching Assistant',
			fr: 'Assistanat pédagogique',
		},
		mapLabel: {
			en: 'TA',
			fr: 'Assistanat',
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
			fr: "Pendant quelques semestres, au cours de mes dernières années à DigiPen, j'ai assuré l'assistanat pédagogique du cours de Concept Art. Mes missions consistaient à me coordonner avec l'enseignant et à accompagner les étudiants dans leurs projets, pendant et en dehors des heures de cours.",
		},
		summary_short: {
			en: 'For a few semesters during my final years at DigiPen, I worked as a TA for the Concept Art course. Tasks included coordinating with the teacher and helping the students out with their projects, both during and outside class hours.',
			fr: "Pendant quelques semestres, au cours de mes dernières années à DigiPen, j'ai assuré l'assistanat pédagogique du cours de Concept Art. Mes missions consistaient à me coordonner avec l'enseignant et à accompagner les étudiants dans leurs projets, pendant et en dehors des heures de cours.",
		},

		highlights: {
			en: ['Teaching', 'Concept Art', 'Illustration'],
			fr: ['Enseignement', 'Concept Art', 'Illustration'],
		},
		featResume: false,
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
			summary_short: e.summary_short && tr(e.summary_short, locale),
			highlights: trList(e.highlights, locale),
		}));
}
