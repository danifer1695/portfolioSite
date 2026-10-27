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
	featResume: boolean;	//use this field to filter entries out from the resume section
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
			fr: 'Diplôme d’études supérieures en Informatique',
		},
		mapLabel: {
			en: 'Concordia',
			fr: 'Concordia',
		},
		institution: 'Concordia University',
		location: {
			en: 'Montreal, Canada',
			fr: 'Montréal, Canada',
		},
		start: '2025-09',
		end: '2026-08',
		summary: {
			en: "This program was aimed at students who wanted to specialize in Computer Science and held a Bachelor's degree but in an unrelated field. It condenses the material taught in a Bachelor's degree into one single year, with classes often combinint two or three undergrad courses' worth of material. During this time, students are expected to complete an array of projects both individual and team-based using languages with which to gain proficiency in languages such as Java, C++, Python, SQL or even Assembly.",
			fr: 'Ce programme s’adressait aux étudiants souhaitant se spécialiser en informatique et titulaires d’un baccalauréat dans un domaine sans rapport. Il condense en une seule année la matière d’un baccalauréat, chaque cours regroupant souvent le contenu de deux ou trois cours de premier cycle. Durant cette période, les étudiants doivent réaliser de nombreux projets, individuels et en équipe, afin d’acquérir une solide maîtrise de langages tels que Java, C++, Python, SQL, voire Assembly.',
		},
		highlights: {
			en: [
				'C++',
				'Java',
				'Python',
				'SQL',
				'Computer Architecture',
				'Discrete Math',
				'Regular Languages',
				'Data Structures',
				'Software Engineering',
				'Project Management',
				'Databases',
				'Technical Writing',
				'Operating Systems',
				'Advanced Programming',
			],
			fr: [
				'C++',
				'Java',
				'Python',
				'SQL',
				'Architecture des ordinateurs',
				'Mathématiques discrètes',
				'Langages réguliers',
				'Structures de données',
				'Génie logiciel',
				'Gestion de projet',
				'Bases de données',
				'Rédaction technique',
				'Systèmes d’exploitation',
				'Programmation avancée',
			],
		},
		featResume: true,
	},
	{
		slug: 'syn-2018',
		title: {
			en: 'Diploma in Concept art (Attestation of College Studies)',
			fr: 'Diplôme en concept art (attestation d’études collégiales)',
		},
		mapLabel: {
			en: 'Syn Studio',
			fr: 'Syn Studio',
		},
		institution: 'Syn Studio',
		location: {
			en: 'Montreal, Canada',
			fr: 'Montréal, Canada',
		},
		start: '2018-09',
		end: '2020-04',
		summary: {
			en: "Intensive program aimed at people looking to join the videgame industry as concept artists. For 18 moths, students would dedicate every waking moment to build their technique, learn new workflows and put together a professional-grade concept art portfolio to showcase to Montreal's many studios. One of the program's biggest strengths was their roster of industry professionals teaching the courses, thanks to whom students would get first-hand knowledge of what would be expected from them once they made it into the industry themselves.",
			fr: 'Programme intensif destiné aux personnes souhaitant intégrer l’industrie du jeu vidéo en tant que concept artists. Pendant 18 mois, les étudiants consacraient chaque instant à perfectionner leur technique, à apprendre de nouveaux flux de travail et à constituer un portfolio de concept art de niveau professionnel à présenter aux nombreux studios montréalais. L’une des grandes forces du programme était son équipe d’enseignants issus de l’industrie, grâce auxquels les étudiants savaient de première main ce que l’on attendrait d’eux une fois entrés à leur tour dans le milieu.',
		},
		highlights: {
			en: ['Concept Art', 'Illustration', 'Game Development', 'Visual Development', '3D Art', 'Blender'],
			fr: ['Concept art', 'Illustration', 'Développement de jeux', 'Développement visuel', 'Art 3D', 'Blender'],
		},
		featResume: true,
	},
	{
		slug: 'focalpoint',
		title: {
			en: 'Independent Studies - Concept Art',
			fr: 'Études indépendantes – Concept art',
		},
		mapLabel: {
			en: 'Focal Point',
			fr: 'Focal Point',
		},
		institution: 'Focal Point School',
		location: {
			en: 'Gdańsk, Poland',
			fr: 'Gdańsk, Pologne',
		},
		start: '2018-06',
		end: '2018-09',
		summary: {
			en: "Unwilling to sit idle during the time before I joined Syn Studio's program, i took a full-time semester at Focal Point School in Gdansk, Poland. Taught by industry giants Darek Zabrocky and Michal Kus, this intensive program taught us to work efficiently while preserving quality in a high-pressure environment, all while adjusting to life as students in a foreign country.",
			fr: 'Ne voulant pas rester inactif avant d’intégrer le programme de Syn Studio, j’ai suivi un semestre à temps plein à la Focal Point School de Gdańsk, en Pologne. Enseigné par des figures majeures de l’industrie, Darek Zabrocky et Michal Kus, ce programme intensif nous a appris à travailler efficacement tout en préservant la qualité dans un environnement sous pression, le tout en nous adaptant à la vie d’étudiant dans un pays étranger.',
		},
		highlights: {
			en: ['Concept Art', 'Illustration', 'Environment Design'],
			fr: ['Concept art', 'Illustration', 'Conception d’environnements'],
		},
		featResume: false,
	},
	{
		slug: 'digipen-2013',
		title: {
			en: 'Bachelor of Fine Arts in Digital Arts and Animation',
			fr: 'Baccalauréat en beaux-arts, arts numériques et animation',
		},
		mapLabel: {
			en: 'DigiPen',
			fr: 'DigiPen',
		},
		institution: 'DigiPen Institute of Technology',
		location: {
			en: 'Redmond, WA',
			fr: 'Redmond, Washington, États-Unis',
		},
		start: '2013-09',
		end: '2017-05',
		summary: {
			en: '4-year career program where we were taught the workflows and techniques that we would be expected to be familiar with when entering the animation or videogame industries. Courses covered topics like 2D animation, 3D animation, 3D modeling, anatomy, drawing, painting, concept art, or project management. Each year, students were expected to group up with other fellow artists and students from other programs to produce a game or animation project that they would be working on from fall to summer semesters.',
			fr: 'Programme professionnalisant de quatre ans au cours duquel nous apprenions les flux de travail et les techniques que l’on attendrait de nous en entrant dans l’industrie de l’animation ou du jeu vidéo. Les cours couvraient des sujets tels que l’animation 2D, l’animation 3D, la modélisation 3D, l’anatomie, le dessin, la peinture, le concept art et la gestion de projet. Chaque année, les étudiants devaient se regrouper avec d’autres artistes et des étudiants d’autres programmes pour produire un jeu ou un projet d’animation, sur lequel ils travaillaient du semestre d’automne au semestre d’été.',
		},
		highlights: {
			en: ['2D Animation', '3D Animation', 'Concept Art', '3D Art', 'Game Development'],
			fr: ['Animation 2D', 'Animation 3D', 'Concept art', 'Art 3D', 'Développement de jeux'],
		},
		featResume: true,
	},
	{
		slug: 'parsons-2013',
		title: {
			en: 'Independent Studies - Drawing and Painting',
			fr: 'Études indépendantes - Dessin et Peinture',
		},
		mapLabel: {
			en: 'Parsons',
			fr: 'Parsons',
		},
		institution: 'The New School - Parsons School of Design',
		location: {
			en: 'New York City, NY',
			fr: 'New York, États-Unis',
		},
		start: '2012-06',
		end: '2014-09',
		summary: {
			en: 'During my last year of High School and first year of college, in the summer semesters of 2012 and 2014, I attender Parsons as an independent student to take some college courses on drawing, painting and illustration.',
			fr: 'Durant ma dernière année de lycée et ma première année d’université, lors des semestres d’été 2012 et 2014, j’ai fréquenté Parsons en tant qu’étudiant indépendant afin de suivre quelques cours universitaires de dessin, de peinture et d’illustration.',
		},
		highlights: {
			en: ['Drawing', 'Paingint', 'Illustration', 'Art'],
			fr: ['Dessin', 'Peinture', 'Illustration', 'Art'],
		},
		featResume: false,
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
