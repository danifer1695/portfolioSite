export type Project = {
	slug: string;
	title: string;
	summary: string;
	tech: readonly string[];
	year: number;
	featured: boolean;
	links: {
		repo?: string;
		live?: string;
	};
};

export const projects = [
	{
		slug: 'portfolio-site',
		title: 'This portfolio',
		summary: 'Next.js static site + Hono API on Cloudflare Workers.',
		tech: ['Next.js', 'TypeScript', 'Tailwind', 'Hono', 'Cloudflare'],
		year: 2026,
		featured: true,
		links: { repo: 'https://github.com/danifer1695/portfolioSite' },
	},
] as const satisfies readonly Project[];
