import type { GalleryImage } from './media';

export type Project = {
	slug: string;
	title: string;
	mapLabel?: string;
	summary: string;
	tech: readonly string[];
	year: string;
	featured: boolean;
	links: {
		repo?: string;
		live?: string;
	};
	images?: GalleryImage[];
	highlights: readonly string[];
};

const projects = [
	{
		slug: 'portfolio-site',
		title: 'This portfolio',
		mapLabel: 'Portfolio Site',
		summary: 'Next.js static site + Hono API on Cloudflare Workers.',
		tech: ['Next.js', 'TypeScript', 'Tailwind', 'Hono', 'Cloudflare'],
		year: '2026',
		featured: true,
		links: { repo: 'https://github.com/danifer1695/portfolioSite' },
		highlights: ['highlight 1', 'highlight 2'],
	},
	{
		slug: 'shirabeyou',
		title: 'Shirabeyou - A kanji-learning Chrome extension',
		mapLabel: 'Shirabeyou',
		summary:
			'An Chromium Manifest V3 extension aimed to make learning kanji a more fluid experience. Front end is divided between a desktop and mobile client, back end is deployed on Railway.',
		tech: ['JavaScript', 'HTML', 'React Native', 'TypeScript', 'PostgreSQL', 'Node.js', 'Express', 'Zod', 'Bcrypt', 'Github'],
		year: '2026',
		featured: true,
		links: { repo: 'https://github.com/danifer1695/kanji_extension' },
		highlights: ['highlight 1', 'highlight 2'],
	},
	{
		slug: 'snake',
		title: 'Snake Arcade',
		mapLabel: 'Snake Arcade',
		summary:
			'Reworked an outdated Java codebase to comply with modern game design principles and efficient graphics logic - implemented using Swing. Game consists of a reinterpretation of the arcade classic \"Snake\" that incorporates local multi-player leaderboards. It was built as a team project during my time at Concordia.',
		tech: ['Java', 'Git', 'Maven', 'SQLite', 'Swing'],
		year: '2026',
		featured: true,
		links: { repo: 'https://github.com/lucienfradet/Snake_COMP_5541' },
		highlights: ['Software Engineering', 'Game Design', 'Databases', 'Team Project'],
	},
	{
		slug: 'graphics',
		title: 'C++ / OpenGL Custom Graphics Engine',
		mapLabel: 'Custom Graphics Engine',
		summary:
			'Built a real-time 3D rendering engine from the ground up, using C++ and OpenGL with ImGUI-based UI. Version control with Git, debugging using RenderDoc.',
		tech: ['C++', 'OpenGL', 'GLSL', 'Git', 'ImGui', 'RenderDoc'],
		year: '2025',
		featured: true,
		links: { repo: 'https://github.com/danifer1695/3DEngine' },
		highlights: ['Graphics Programming', 'Shader Programming'],
	},
] as const satisfies readonly Project[];

export function getProjects(): readonly Project[] {
	return [...projects].sort((a, b) => b.year.localeCompare(a.year));
}
