export type Project = {
	slug: string;
	title: string;
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
		summary: 'Next.js static site + Hono API on Cloudflare Workers.',
		tech: ['Next.js', 'TypeScript', 'Tailwind', 'Hono', 'Cloudflare'],
		year: '2026',
		featured: true,
		links: { repo: 'https://github.com/danifer1695/portfolioSite' },
		highlights: ['highlight 1', 'highlight 2'],
	},
] as const satisfies readonly Project[];

export function getProjects(): readonly Project[] {
	return [...projects].sort((a, b) => b.year.localeCompare(a.year));
}
