import { tr, trList, type Text, type TextList } from '@/i18n/i18n';
import type { GalleryImage } from './media';
import { Locale } from '@/i18n/routings';

export type ProjectSource = {
	slug: string;
	title: Text;
	mapLabel?: Text;
	summary: Text;
	summary_short: Text; //short form for the CV
	tech: readonly string[];
	year: string;
	featured: boolean;
	links: {
		repo?: string;
		live?: string;
	};
	images?: GalleryImage[];
	highlights: TextList;
	featResume: boolean;
};

export type Project = Omit<ProjectSource, 'title' | 'mapLabel' | 'summary' | 'summary_short' | 'highlights'> & {
	title: string;
	mapLabel: string;
	summary: string;
	summary_short: string; //short form for the CV
	highlights: readonly string[];
};

const projects = [
	{
		slug: 'portfolio-site',
		title: {
			en: 'Portfolio Site (You are here)',
			fr: 'Site portfolio (Vous êtes ici)',
		},
		mapLabel: {
			en: 'Portfolio Site',
			fr: 'Site portfolio',
		},
		summary: {
			en: 'This site was built from the ground up in search of a more creative way to showcase my abilities and background. Using the skills gained from my experience as a designer and developer, I put all the tools at my disposal hoping to make something unique that will catch your eye in an ocean of software development portfolio sites.',
			fr: "Ce site a été conçu de A à Z dans le but de trouver une manière plus créative de présenter mes compétences et mon parcours. En m'appuyant sur mon expérience en design et en développement, j'ai mis à profit tous les outils à ma disposition dans l'espoir de créer quelque chose d'unique, qui saura attirer votre regard dans l'océan des portfolios de développement logiciel.",
		},
		summary_short: {
			en: '',
			fr: '',
		},
		tech: ['Next.js', 'TypeScript', 'Tailwind', 'Hono', 'Cloudflare'],
		year: '2026',
		featured: true,
		links: { repo: 'https://github.com/danifer1695/portfolioSite' },
		highlights: {
			en: ['Full-Stack development', 'Solo-Developed', 'AI-enhanced workflow'],
			fr: ['Développement Full-Stack', 'Développé en solo', 'Workflow assisté par IA'],
		},
		featResume: false,
	},
	{
		slug: 'shirabeyou',
		title: {
			en: 'Shirabeyou - A kanji-learning Chrome extension',
			fr: 'Shirabeyou - Une extension Chrome pour apprendre les kanji',
		},
		mapLabel: {
			en: 'Shirabeyou',
			fr: 'Shirabeyou',
		},
		summary: {
			en: "Developed solo end-to-end, this Manifest V3 Chromium extension is born out of my own needs as a Japanese learner. Its aim is to make kanji character learning as fluid an experience as possible, and it does that by enabling in-place lookup of any character the user might run into while browsing the web. All they need is to highlight a text containing one or more kanji characters and a small popup will emerge containing detailed information about them. The user can then save the ones they want to learn, and revisit them in the app's main window. This extension also offers a Spaced Repetition learning system where the user is quizzed on their saved kanji, and the app will determine when to revisit them based on their level of mastery. On a more technical level, the app is comprised of the main Chromium client, but also a mobile companion app that is currently in the works. Back end is hosted on Railway, and uses PostgreSQL for user data storage and management.",
			fr: "Développée en solo de bout en bout, cette extension Chromium Manifest V3 est née de mes propres besoins dans l'apprentissage du japonais. Son objectif est de rendre l'apprentissage des kanji aussi fluide que possible, en permettant de consulter directement n'importe quel caractère rencontré en naviguant sur le web. Il suffit de surligner un texte contenant un ou plusieurs kanji pour qu'une petite fenêtre contextuelle apparaisse avec des informations détaillées à leur sujet. L'utilisateur peut ensuite enregistrer ceux qu'il souhaite apprendre et les retrouver dans la fenêtre principale de l'application. L'extension propose également un système de répétition espacée : l'utilisateur est interrogé sur ses kanji enregistrés, et l'application détermine quand les lui proposer à nouveau en fonction de son niveau de maîtrise. Sur le plan technique, le projet comprend le client Chromium principal, ainsi qu'une application mobile compagnon actuellement en développement. Le back-end est hébergé sur Railway et utilise PostgreSQL pour le stockage et la gestion des données utilisateur.",
		},
		summary_short: {
			en: 'Manifest V3 Chromium application for Japanese language learning. Developed solo end-to-end with self-managed deadlines, and now live on the Chrome Web Store. Web client developed using vanilla JavaScript plus HTML/CSS, mobile client with TypeScript + React Native, back end with JavaScript + Node.js + Express, hosted on Railway.',
			fr: "Application Chromium Manifest V3 dédiée à l'apprentissage du japonais. Développée en solo de bout en bout, avec des échéances autogérées, et désormais disponible sur le Chrome Web Store. Client web développé en JavaScript vanilla avec HTML/CSS, client mobile en TypeScript + React Native, back-end en JavaScript + Node.js + Express, hébergé sur Railway.",
		},
		tech: ['JavaScript', 'HTML', 'React Native', 'TypeScript', 'PostgreSQL', 'Node.js', 'Express', 'Zod', 'Bcrypt', 'Github'],
		year: '2026',
		featured: true,
		links: { repo: 'https://github.com/danifer1695/kanji_extension' },
		highlights: {
			en: ['Solo-Developed', 'Full-Stack development', 'Published on the Chrome Web Store'],
			fr: ['Développé en solo', 'Développement Full-Stack', 'Publié sur le Chrome Web Store'],
		},
		featResume: true,
	},
	{
		slug: 'snake',
		title: {
			en: 'Snake Arcade',
			fr: 'Snake Arcade',
		},
		mapLabel: {
			en: 'Snake Arcade',
			fr: 'Snake Arcade',
		},
		summary: {
			en: 'Developed as a group project during my time at Concordia, this is a rework of an outdated Java codebase, upgraded to comply with modern game design principles and efficient graphics logic. Game consists of a reinterpretation of the arcade classic \"Snake\" that incorporates local multiplayer leaderboards. Due to my professional background in video game design and development, I was put in charge of the project\'s game logic and graphics. Although at a much smaller scale, I used my experience working with game engines such as Unity and real-time graphics libraries like OpenGL to maximize performance, scalability, and user experience.',
			fr: "Développé en équipe dans le cadre de mes études à Concordia, ce projet est la refonte d'une base de code Java obsolète, modernisée pour respecter les principes actuels de game design et reposer sur une logique graphique performante. Le jeu est une réinterprétation du classique d'arcade « Snake » intégrant des classements multijoueurs en local. Compte tenu de mon parcours professionnel dans la conception et le développement de jeux vidéo, la logique de jeu et les graphismes du projet m'ont été confiés. Bien qu'à une échelle beaucoup plus modeste, j'ai mis à profit mon expérience des moteurs de jeu comme Unity et des bibliothèques graphiques temps réel comme OpenGL pour optimiser les performances, l'évolutivité et l'expérience utilisateur.",
		},
		summary_short: {
			en: 'Group project at Concordia University. Developed an arcade version of Snake allowing multiple players to compete for a high score through local servers. Given my previous experience in game development, I was put in charge of the graphics and gameplay code overhaul.',
			fr: "Projet de groupe à l'Université Concordia. Développement d'une version arcade de Snake permettant à plusieurs joueurs de s'affronter pour le meilleur score via des serveurs locaux. Compte tenu de mon expérience en développement de jeux vidéo, la refonte du code graphique et du gameplay m'a été confiée.",
		},
		tech: ['Java', 'Git', 'Maven', 'SQLite', 'Swing'],
		year: '2026',
		featured: true,
		links: { repo: 'https://github.com/lucienfradet/Snake_COMP_5541' },
		highlights: {
			en: ['2D Graphics development', 'Game Design', 'Work with existing codebase', 'Team project'],
			fr: ['Développement graphique 2D', 'Game design', 'Travail sur une base de code existante', "Projet d'équipe"],
		},
		featResume: true,
	},
	{
		slug: 'graphics',
		title: {
			en: 'C++ / OpenGL Custom Graphics Engine',
			fr: 'Moteur graphique C++ / OpenGL sur mesure',
		},
		mapLabel: {
			en: 'Custom Graphics Engine',
			fr: 'Moteur graphique sur mesure',
		},
		summary: {
			en: 'As a personal challenge and just for the pleasure of deepening my understanding of 3D graphics, I decided to work on a simple 3D engine built from the ground up. In the past I had had plenty of experience working with engines such as Blender or Maya as a user, so coming in I was already familiar with most of the technical concepts involved, and I knew first hand what kind of experience a savvy user will expect. So I put all that knowledge to use, and built this engine while I was studying at Concordia.',
			fr: "Par défi personnel, et simplement pour le plaisir d'approfondir ma compréhension du rendu 3D, j'ai décidé de développer un moteur 3D simple, conçu de A à Z. J'avais déjà beaucoup utilisé des logiciels comme Blender ou Maya ; je connaissais donc la plupart des concepts techniques en jeu, et je savais d'expérience à quoi s'attend un utilisateur averti. J'ai mis toutes ces connaissances à profit pour construire ce moteur pendant mes études à Concordia.",
		},
		summary_short: {
			en: 'Real-time 3D rendering engine built from the ground up in C++ and OpenGL. Used my extensive past experience as a user of 3D rendering tools to create an application that remains simple and intuitive to use.',
			fr: "Moteur de rendu 3D temps réel conçu de A à Z en C++ et OpenGL. Ma longue expérience d'utilisation d'outils de rendu 3D m'a permis de créer une application qui reste simple et intuitive.",
		},
		tech: ['C++', 'OpenGL', 'GLSL', 'Git', 'ImGui', 'RenderDoc'],
		year: '2025',
		featured: true,
		links: { repo: 'https://github.com/danifer1695/3DEngine' },
		highlights: {
			en: ['Graphics Programming', 'Shader Programming', 'Solo-Developed', 'Self-Taught'],
			fr: ['Programmation graphique', 'Programmation de shaders', 'Développé en solo', 'Autodidacte'],
		},
		featResume: true,
	},
] as const satisfies readonly ProjectSource[];

export function getProjects(locale: Locale): readonly Project[] {
	return [...projects]
		.sort((a, b) => b.year.localeCompare(a.year))
		.map((e) => ({
			...e,
			title: tr(e.title, locale),
			mapLabel: tr(e.mapLabel, locale),
			summary: tr(e.summary, locale),
			summary_short: tr(e.summary_short, locale),
			highlights: trList(e.highlights, locale),
		}));
}
