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
			en: 'This portfolio',
			fr: 'This portfolio',
		},
		mapLabel: {
			en: 'Portfolio Site',
			fr: 'Portfolio Site',
		},
		summary: {
			en: 'Next.js static site + Hono API on Cloudflare Workers.',
			fr: 'Next.js static site + Hono API on Cloudflare Workers.',
		},
		tech: ['Next.js', 'TypeScript', 'Tailwind', 'Hono', 'Cloudflare'],
		year: '2026',
		featured: true,
		links: { repo: 'https://github.com/danifer1695/portfolioSite' },
		highlights: {
			en: ['highlight 1', 'highlight 2'],
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
			en: 'A Chromium Manifest V3 extension aimed to make learning kanji a more fluid experience. Front end is divided between a desktop and mobile client, back end is deployed on Railway.',
			fr: 'A Chromium Manifest V3 extension aimed to make learning kanji a more fluid experience. Front end is divided between a desktop and mobile client, back end is deployed on Railway.',
		},
		tech: ['JavaScript', 'HTML', 'React Native', 'TypeScript', 'PostgreSQL', 'Node.js', 'Express', 'Zod', 'Bcrypt', 'Github'],
		year: '2026',
		featured: true,
		links: { repo: 'https://github.com/danifer1695/kanji_extension' },
		highlights: {
			en: ['highlight 1', 'highlight 2'],
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
			en: 'Reworked an outdated Java codebase to comply with modern game design principles and efficient graphics logic - implemented using Swing. Game consists of a reinterpretation of the arcade classic \"Snake\" that incorporates local multi-player leaderboards. It was built as a team project during my time at Concordia.',
			fr: 'Reworked an outdated Java codebase to comply with modern game design principles and efficient graphics logic - implemented using Swing. Game consists of a reinterpretation of the arcade classic \"Snake\" that incorporates local multi-player leaderboards. It was built as a team project during my time at Concordia.',
		},
		tech: ['Java', 'Git', 'Maven', 'SQLite', 'Swing'],
		year: '2026',
		featured: true,
		links: { repo: 'https://github.com/lucienfradet/Snake_COMP_5541' },
		highlights: {
			en: ['Software Engineering', 'Game Design', 'Databases', 'Team Project'],
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
			en: 'Built a real-time 3D rendering engine from the ground up, using C++ and OpenGL with ImGUI-based UI. Version control with Git, debugging using RenderDoc.',
			fr: 'Built a real-time 3D rendering engine from the ground up, using C++ and OpenGL with ImGUI-based UI. Version control with Git, debugging using RenderDoc.',
		},
		tech: ['C++', 'OpenGL', 'GLSL', 'Git', 'ImGui', 'RenderDoc'],
		year: '2025',
		featured: true,
		links: { repo: 'https://github.com/danifer1695/3DEngine' },
		highlights: {
			en: ['Graphics Programming', 'Shader Programming'],
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
