import { tr, trList, type Text, type TextList } from '@/i18n/i18n';
import type { GalleryImage } from './media';
import { Locale } from '@/i18n/routings';

export type ProjectSource = {
	slug: string;
	title: Text;
	mapLabel?: Text;
	summary: Text;
	tech: readonly string[];
	year: string;
	featured: boolean;
	links: {
		repo?: string;
		live?: string;
	};
	images?: GalleryImage[];
	highlights: TextList;
};

export type Project = Omit<ProjectSource, 'title' | 'mapLabel' | 'summary' | 'highlights'> & {
	title: string;
	mapLabel: string;
	summary: string;
	highlights: readonly string[];
};

const projects = [
	{
		slug: 'portfolio-site',
		title: {
			en: 'Portfolio Site (You are here)',
			fr: 'This portfolio',
		},
		mapLabel: {
			en: 'Portfolio Site',
			fr: 'Portfolio Site',
		},
		summary: {
			en: 'This site was build from the ground up in search for a more creative way to showcase my abilities and background. Using the skills gained from my experience as a designer and developer, I put all the tools at my disposal hoping to make something unique that will catch your eye in an ocean of software development portfolio sites.',
			fr: 'Next.js static site + Hono API on Cloudflare Workers.',
		},
		tech: ['Next.js', 'TypeScript', 'Tailwind', 'Hono', 'Cloudflare'],
		year: '2026',
		featured: true,
		links: { repo: 'https://github.com/danifer1695/portfolioSite' },
		highlights: {
			en: ['Full-Stack development', 'Solo-Developped', 'AI-enhanced workflow'],
			fr: ['highlight 1', 'highlight 2'],
		},
	},
	{
		slug: 'shirabeyou',
		title: {
			en: 'Shirabeyou - A kanji-learning Chrome extension',
			fr: 'Shirabeyou - A kanji-learning Chrome extension',
		},
		mapLabel: {
			en: 'Shirabeyou',
			fr: 'Shirabeyou',
		},
		summary: {
			en: "Developed solo end-to-end, this Manifest V3 Chromium extension is born out of my own needs as a japanese learner. Its aim is to make kanji character learning as fluid an experience as possible, and it does that by enabling in-place lookup of any character the user might run into while browsing the web. All they need is to highlight a text containing one or more kanji characters and a small popup will emerge containing detailed information about them. The user can then save the ones they want to learn, and revisit them in the app's main window. This extension also offers a Spaced Repetition learning system where the user is quizzed on their saved kanji, and the app will determine when to revisit them based on their level of mastery. On a more technical level, the app is comprised of the main Chromium client, but also a mobile companion app that is currently in the works. Back end is hosted on Railway, and uses PostgreSQL for user data storage and management.",
			fr: 'A Chromium Manifest V3 extension aimed to make learning kanji a more fluid experience. Front end is divided between a desktop and mobile client, back end is deployed on Railway.',
		},
		tech: ['JavaScript', 'HTML', 'React Native', 'TypeScript', 'PostgreSQL', 'Node.js', 'Express', 'Zod', 'Bcrypt', 'Github'],
		year: '2026',
		featured: true,
		links: { repo: 'https://github.com/danifer1695/kanji_extension' },
		highlights: {
			en: ['Solo-Developped', 'Full-Stack development', 'Published on the Chrome Web Store'],
			fr: ['highlight 1', 'highlight 2'],
		},
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
			en: 'Developed as a group project during my time at Concordia, this is a rework of an outdated Java codebase, upgraded to comply with modern game design principles and efficient graphics logic. Game consists of a reinterpretation of the arcade classic \"Snake\" that incorporates local multi-player leaderboards. Due to my professional background in videogame design and development, i was put in charge of the project\'s game logic and graphics. Although at a much smaller scale, I used my experience working with game engines such as Unity and real-time graphics libraries like OpenGL to maximize performance, scalability, and user experience.',
			fr: 'Reworked an outdated Java codebase to comply with modern game design principles and efficient graphics logic - implemented using Swing. Game consists of a reinterpretation of the arcade classic \"Snake\" that incorporates local multi-player leaderboards. It was built as a team project during my time at Concordia.',
		},
		tech: ['Java', 'Git', 'Maven', 'SQLite', 'Swing'],
		year: '2026',
		featured: true,
		links: { repo: 'https://github.com/lucienfradet/Snake_COMP_5541' },
		highlights: {
			en: ['2D Graphics development', 'Game Design', 'Work with existing codebase', 'Team project'],
			fr: ['Software Engineering', 'Game Design', 'Databases', 'Team Project'],
		},
	},
	{
		slug: 'graphics',
		title: {
			en: 'C++ / OpenGL Custom Graphics Engine',
			fr: 'C++ / OpenGL Custom Graphics Engine',
		},
		mapLabel: {
			en: 'Custom Graphics Engine',
			fr: 'Custom Graphics Engine',
		},
		summary: {
			en: 'As a personal challenge and just for the pleasure of deepening my understanding of 3D graphics, I decided to work on a simple 3D engine built from the ground up. In the past I had had plenty of experience working with engines such as Blender or Maya as a user, so coming in I was already familiar with most of the technical concepts involved, and I knew first hand what type of experience savvy a user will expect. So I put all that knowledge to use, and built this engine while I was studying at Concordia.',
			fr: 'Built a real-time 3D rendering engine from the ground up, using C++ and OpenGL with ImGUI-based UI. Version control with Git, debugging using RenderDoc.',
		},
		tech: ['C++', 'OpenGL', 'GLSL', 'Git', 'ImGui', 'RenderDoc'],
		year: '2025',
		featured: true,
		links: { repo: 'https://github.com/danifer1695/3DEngine' },
		highlights: {
			en: ['Graphics Programming', 'Shader Programming', 'Solo-Developped', 'Self-Taught'],
			fr: ['Graphics Programming', 'Shader Programming'],
		},
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
			highlights: trList(e.highlights, locale),
		}));
}
