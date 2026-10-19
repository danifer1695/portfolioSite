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
] as const satisfies readonly Project[];

export function getProjects(): readonly Project[] {
	return [...projects].sort((a, b) => b.year.localeCompare(a.year));
}
