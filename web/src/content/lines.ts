export const lineIds = ['professional', 'academics', 'technical'] as const;
export type LineId = (typeof lineIds)[number];

export type Line = {
	code: 'W' | 'A' | 'P';
	href: string;
	bgClass: string; //tailwind class for line's color
	borderClass: string; //tailwind class for line's borders
	fillClass: 'fill-line-p' | 'fill-line-a' | 'fill-line-t';
	textClass: 'text-white' | 'text-black'; //tailwind class for line's text color
	strokeClass: 'stroke-line-p' | 'stroke-line-a' | 'stroke-line-t'; //for the map SVGs
};

//Record<LineId, Line> forces an entry for every id.
export const lines: Record<LineId, Line> = {
	professional: {
		code: 'W',
		href: '/professional',
		bgClass: 'bg-line-p',
		borderClass: 'border-line-p',
		fillClass: 'fill-line-p',
		textClass: 'text-white',
		strokeClass: 'stroke-line-p',
	},
	academics: {
		code: 'A',
		href: '/academics',
		bgClass: 'bg-line-a',
		borderClass: 'border-line-a',
		fillClass: 'fill-line-a',
		textClass: 'text-white',
		strokeClass: 'stroke-line-a',
	},
	technical: {
		code: 'P',
		href: '/technical',
		bgClass: 'bg-line-t',
		borderClass: 'border-line-t',
		fillClass: 'fill-line-t',
		textClass: 'text-black',
		strokeClass: 'stroke-line-t',
	},
};
